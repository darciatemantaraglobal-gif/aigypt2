import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { verifyAdmin, signAdminToken, setAdminCookie, clearAdminCookie } from "../_lib/adminAuth.js";
import { getSegments, getBody, getQuery } from "../_lib/route.js";
import type postgres from "postgres";

// Type alias yang menerima baik koneksi biasa maupun objek transaksi (sql.begin).
// Keduanya (Sql dan TransactionSql) extend ISql<{}>, sehingga ini adalah tipe paling tepat.
type Executor = postgres.ISql<{}>;

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AIGYPT-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-${ts}-${rand}`;
}

function sanitizeUsername(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 30);
}

/**
 * Generate username unik dari email (bagian sebelum @) kalau admin tidak
 * mengisi username secara manual. Kalau sudah dipakai, tambahkan angka.
 */
async function generateUniqueUsername(seed: string): Promise<string> {
  const base = sanitizeUsername(seed.split("@")[0] ?? seed) || "member";
  for (let i = 0; i < 30; i++) {
    const candidate = i === 0 ? base : `${base}${i}`;
    const existing = await sql`SELECT id FROM members WHERE username = ${candidate} LIMIT 1`;
    if (existing.length === 0) return candidate;
  }
  return `${base}${Date.now()}`;
}

/**
 * Tabel `members` tidak pernah ditulis oleh kode manapun sebelumnya:
 * hanya dibaca oleh dashboard-stats dan halaman Member, sehingga selalu
 * kosong. Setiap kali order dilunasi dan kode akses terbit, member harus
 * ikut tercatat di sini.
 *
 * Kolom `username` SENGAJA tidak dimasukkan ke sini karena kolom tersebut
 * mungkin belum ada di DB produksi. Gunakan trySetUsername() setelah
 * transaksi selesai.
 */
async function upsertMember(args: {
  email: string; name: string; accessCode: string;
  memberType: string; batchNumber: number;
}, tx: Executor = sql) {
  await tx`
    INSERT INTO members (email, name, access_code, member_type, batch_number)
    VALUES (${args.email}, ${args.name}, ${args.accessCode}, ${args.memberType}, ${args.batchNumber})
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      access_code = EXCLUDED.access_code,
      member_type = EXCLUDED.member_type,
      batch_number = EXCLUDED.batch_number
  `;
  await tx`
    UPDATE access_codes
    SET is_used = true, used_by_email = ${args.email}, used_at = NOW()
    WHERE code = ${args.accessCode}
  `;
}

/**
 * Set username member secara opsional, TERPISAH dari transaksi utama.
 * Dibungkus try/catch karena kolom ini mungkin belum ada di DB produksi.
 * Jika kolom belum ada, tambahkan dulu lewat Supabase SQL Editor:
 *   ALTER TABLE members ADD COLUMN username varchar(50);
 * Hanya mengisi jika username masih NULL (tidak overwrite yang sudah ada).
 */
async function trySetUsername(email: string, preferredUsername?: string): Promise<void> {
  const username = preferredUsername?.trim()
    ? sanitizeUsername(preferredUsername)
    : await generateUniqueUsername(email);
  try {
    await sql`UPDATE members SET username = ${username} WHERE email = ${email} AND username IS NULL`;
  } catch {
    // Kolom "username" belum ada di DB — abaikan, member tetap terbuat.
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();

  const segments = getSegments(req, "/api/admin/");
  const [section, sub1, sub2] = segments;

  // ---- ROUTES TANPA SESSION (login) ----
  if (section === "login" && req.method === "POST") {
    const ADMIN_PASSWORD = (process.env["ADMIN_PASSWORD"] ?? "").trim();
    if (!ADMIN_PASSWORD) return res.status(503).json({ error: "ADMIN_PASSWORD belum dikonfigurasi" });
    const { password } = getBody<{ password?: string }>(req);
    if (!password || password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Password salah" });
    const token = await signAdminToken();
    setAdminCookie(res, token);
    return res.json({ success: true });
  }

  if (section === "logout" && req.method === "POST") {
    clearAdminCookie(res);
    return res.json({ success: true });
  }

  if (section === "verify" && req.method === "GET") {
    const isAdmin = await verifyAdmin(req);
    return res.status(isAdmin ? 200 : 401).json({ authenticated: isAdmin });
  }

  // ---- SEMUA ROUTE DI BAWAH INI WAJIB SESSION ADMIN ----
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  try {
    // ---- DASHBOARD ----
    if (section === "dashboard-stats" && req.method === "GET") {
      const [totalMembers, unusedCodes, pendingOrders, paidOrders, recentOrders] = await Promise.all([
        sql`SELECT COUNT(*)::int AS c FROM members WHERE email NOT LIKE '%@placeholder.aigypt.id'`,
        sql`SELECT COUNT(*)::int AS c FROM access_codes WHERE is_used = false`,
        sql`SELECT COUNT(*)::int AS c FROM orders WHERE status IN ('pending', 'pending_qris')`,
        sql`SELECT COUNT(*)::int AS c FROM orders WHERE status = 'paid' AND email NOT LIKE '%@placeholder.aigypt.id'`,
        sql`SELECT order_id, name, email, member_type, status, COALESCE(final_amount, amount) AS amount, created_at FROM orders ORDER BY created_at DESC LIMIT 5`,
      ]);
      return res.json({
        totalMembers: totalMembers[0]?.["c"] ?? 0,
        unusedCodes: unusedCodes[0]?.["c"] ?? 0,
        pendingOrders: pendingOrders[0]?.["c"] ?? 0,
        paidOrders: paidOrders[0]?.["c"] ?? 0,
        recentOrders: recentOrders.map((o) => ({
          orderId: o["order_id"], name: o["name"], email: o["email"], memberType: o["member_type"],
          status: o["status"], grossAmount: o["amount"], createdAt: o["created_at"],
        })),
      });
    }

    // ---- CODES: GENERATE ----
    if (section === "codes" && sub1 === "generate" && req.method === "POST") {
      const { type, batchNumber, count: countReq } = getBody<{ type?: string; batchNumber?: number; count?: number }>(req);
      if (!type || !["mandiri", "kelas"].includes(type)) return res.status(400).json({ error: "Tipe harus 'mandiri' atau 'kelas'" });
      const n = Number(countReq);
      if (!n || n < 1 || n > 50) return res.status(400).json({ error: "Jumlah kode harus antara 1 dan 50" });

      const batch = batchNumber ?? 3;
      const codes: string[] = [];
      for (let i = 0; i < n; i++) {
        let code = "";
        for (let attempt = 0; attempt < 20; attempt++) {
          const candidate = generateCode();
          const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
          if (existing.length === 0) { code = candidate; break; }
        }
        if (!code) break;
        await sql`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${code}, ${type}, ${batch}, false)`;
        codes.push(code);
      }
      return res.json({ codes });
    }

    // ---- CODES: LIST ----
    if (section === "codes" && sub1 === "list" && req.method === "GET") {
      const { type, batch, status, search, page = "1" } = getQuery(req);
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const pageSize = 20;
      const offset = (pageNum - 1) * pageSize;

      const whereClauses: string[] = [];
      const vals: (string | number)[] = [];
      let idx = 1;
      if (type && type !== "all") { whereClauses.push(`type = $${idx++}`); vals.push(type); }
      if (batch) { whereClauses.push(`batch_number = $${idx++}`); vals.push(parseInt(batch, 10)); }
      if (status === "used") whereClauses.push(`is_used = true`);
      if (status === "unused") whereClauses.push(`is_used = false`);
      if (search) { whereClauses.push(`(code ILIKE $${idx} OR used_by_email ILIKE $${idx})`); vals.push(`%${search}%`); idx++; }
      const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

      const codes = await sql.unsafe(
        `SELECT * FROM access_codes ${whereSql} ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${offset}`,
        vals
      );
      const totalRes = await sql.unsafe(`SELECT COUNT(*)::int AS c FROM access_codes ${whereSql}`, vals);

      return res.json({
        codes: (codes as unknown as Record<string, unknown>[]).map((c) => ({
          id: c["id"], code: c["code"], type: c["type"], batchNumber: c["batch_number"],
          isUsed: c["is_used"], usedByEmail: c["used_by_email"], usedAt: c["used_at"],
          createdAt: c["created_at"], orderId: null,
        })),
        total: (totalRes as unknown as Record<string, unknown>[])[0]?.["c"] ?? 0,
        page: pageNum, pageSize,
      });
    }

    // ---- CODES: DELETE ----
    if (section === "codes" && sub1 && !sub2 && req.method === "DELETE") {
      const code = sub1;
      const existing = await sql`SELECT is_used FROM access_codes WHERE code = ${code} LIMIT 1`;
      if (!existing.length) return res.status(404).json({ error: "Kode tidak ditemukan" });
      if (existing[0]!["is_used"]) return res.status(400).json({ error: "Kode yang sudah dipakai tidak bisa dihapus" });
      await sql`DELETE FROM access_codes WHERE code = ${code}`;
      return res.json({ success: true });
    }

    // ---- MEMBERS: CREATE ----
    if (section === "members" && sub1 === "create" && req.method === "POST") {
      const { name, email, memberType, batchNumber, accessCode: providedCode, username } = getBody<{
        name?: string; email?: string; memberType?: string; batchNumber?: number; accessCode?: string; username?: string;
      }>(req);
      if (!name || !email || !memberType) return res.status(400).json({ error: "Nama, email, dan tipe member wajib diisi" });
      if (!["mandiri", "kelas"].includes(memberType)) return res.status(400).json({ error: "Tipe member tidak valid" });

      const normalizedEmail = email.toLowerCase().trim();
      const batch = batchNumber ?? 3;

      if (username?.trim()) {
        const cleanUsername = sanitizeUsername(username);
        const existingUsername = await sql`SELECT id FROM members WHERE username = ${cleanUsername} LIMIT 1`;
        if (existingUsername.length > 0) return res.status(400).json({ error: "Username sudah dipakai member lain" });
      }

      let accessCode = providedCode?.trim();
      // Cek apakah kode yang disediakan admin sudah dipakai member lain.
      // Kode yang sudah ada tapi is_used = false (pre-generated) tetap boleh dipakai.
      let accessCodeAlreadyInDb = false;
      if (accessCode) {
        const existing = await sql`SELECT is_used FROM access_codes WHERE code = ${accessCode} LIMIT 1`;
        if (existing.length > 0) {
          if (existing[0]!["is_used"]) {
            return res.status(400).json({ error: "Kode akses sudah dipakai member lain" });
          }
          // Kode ada di DB tapi belum dipakai → gunakan langsung, jangan INSERT lagi.
          accessCodeAlreadyInDb = true;
        }
      } else {
        for (let attempt = 0; attempt < 20; attempt++) {
          const candidate = generateCode();
          const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
          if (existing.length === 0) { accessCode = candidate; break; }
        }
        if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses unik" });
      }

      const orderId = generateOrderId();

      // Urutan wajib: access_codes dulu, baru members — members.access_code
      // punya foreign key ke access_codes.code.
      // Dibungkus transaction: kalau salah satu gagal, semuanya rollback.
      await sql.begin(async (tx) => {
        if (!accessCodeAlreadyInDb) {
          await tx`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${accessCode}, ${memberType}, ${batch}, false)`;
        }
        await tx`
          INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, final_amount, status, access_code, paid_at)
          VALUES (${orderId}, ${name}, ${normalizedEmail}, ${"-"}, ${memberType}, ${batch}, 0, 0, 'paid', ${accessCode}, NOW())
        `;
        await upsertMember({ email: normalizedEmail, name, accessCode, memberType, batchNumber: batch }, tx);
      });
      // Username disimpan terpisah dari transaksi karena kolom mungkin belum ada di DB.
      await trySetUsername(normalizedEmail, username);

      return res.json({ success: true, orderId, accessCode });
    }

    // ---- MEMBERS: AUTO-CREATE ----
    if (section === "members" && sub1 === "auto-create" && req.method === "POST") {
      const { memberType = "kelas", batchNumber, count = 1 } = getBody<{
        memberType?: string; batchNumber?: number; count?: number;
      }>(req);
      if (!["mandiri", "kelas"].includes(memberType))
        return res.status(400).json({ error: "Tipe harus 'mandiri' atau 'kelas'" });
      if (!Number.isInteger(count) || count < 1 || count > 20)
        return res.status(400).json({ error: "Jumlah harus antara 1 sampai 20" });
      const batch = batchNumber ?? 3;

      const created: { accessCode: string; email: string; orderId: string }[] = [];

      for (let i = 0; i < count; i++) {
        let accessCode: string | null = null;
        for (let attempt = 0; attempt < 20; attempt++) {
          const candidate = generateCode();
          const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
          if (existing.length === 0) { accessCode = candidate; break; }
        }
        if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses unik" });

        // Email placeholder diturunkan dari bagian kode setelah tanda hubung, dijadikan huruf kecil.
        // Format ini lolos validasi input email tapi mudah dikenali sebagai belum diisi.
        const codeSuffix = accessCode.replace(/^AIGYPT-/, "").toLowerCase();
        const placeholderEmail = `aigypt-${codeSuffix}@placeholder.aigypt.id`;
        const placeholderName = "Belum Diisi";
        const orderId = generateOrderId();
        const code: string = accessCode;

        await sql.begin(async (tx) => {
          await tx`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${code}, ${memberType}, ${batch}, false)`;
          await tx`
            INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, final_amount, status, access_code, paid_at)
            VALUES (${orderId}, ${placeholderName}, ${placeholderEmail}, ${"-"}, ${memberType}, ${batch}, 0, 0, 'paid', ${code}, NOW())
          `;
          await upsertMember({ email: placeholderEmail, name: placeholderName, accessCode: code, memberType, batchNumber: batch }, tx);
        });
        await trySetUsername(placeholderEmail);
        created.push({ accessCode, email: placeholderEmail, orderId });
      }

      return res.json({ created });
    }

    // ---- MEMBERS: UPDATE ----
    if (section === "members" && sub1 && sub2 === "update" && req.method === "POST") {
      const currentEmail = decodeURIComponent(sub1);
      const { name, email, username, memberType, batchNumber, accessCode } = getBody<{
        name?: string; email?: string; username?: string; memberType?: string; batchNumber?: number; accessCode?: string;
      }>(req);
      if (!name || !email || !memberType) return res.status(400).json({ error: "Nama, email, dan tipe member wajib diisi" });
      if (!["mandiri", "kelas"].includes(memberType)) return res.status(400).json({ error: "Tipe member tidak valid" });

      const newEmail = email.toLowerCase().trim();

      const existingRows = await sql`SELECT * FROM members WHERE email = ${currentEmail} LIMIT 1`;
      if (!existingRows.length) {
        // currentEmail sudah tidak ada — kemungkinan besar submit sebelumnya sudah berhasil
        // dan email member ini sudah berubah jadi newEmail. Cek dulu sebelum menyerah dengan error:
        // kalau member dengan newEmail sudah ada dan datanya identik dengan yang mau disubmit,
        // anggap ini idempotent retry (double-submit / race condition), bukan kegagalan.
        const alreadyAppliedRows = await sql`SELECT * FROM members WHERE email = ${newEmail} LIMIT 1`;
        if (alreadyAppliedRows.length > 0) {
          const already = alreadyAppliedRows[0]!;
          const batchMatches = batchNumber === undefined || Number(already["batch_number"]) === Number(batchNumber);
          const codeMatches = !accessCode?.trim() || already["access_code"] === accessCode.trim();
          if (
            already["name"] === name &&
            already["member_type"] === memberType &&
            batchMatches &&
            codeMatches
          ) {
            return res.json({
              success: true,
              email: already["email"] as string,
              accessCode: already["access_code"] as string,
              username: already["username"] as string | null,
            });
          }
        }
        return res.status(404).json({ error: "Member tidak ditemukan" });
      }
      const existing = existingRows[0]!;

      const batch = batchNumber ?? (existing["batch_number"] as number) ?? 3;

      // --- Validasi semua sebelum transaksi dimulai ---
      if (newEmail !== currentEmail) {
        const clash = await sql`SELECT id FROM members WHERE email = ${newEmail} LIMIT 1`;
        if (clash.length > 0) return res.status(400).json({ error: "Email sudah dipakai member lain" });
      }

      let newUsername = existing["username"] as string | null;
      if (username?.trim()) {
        const cleanUsername = sanitizeUsername(username);
        if (cleanUsername !== (existing["username"] as string | null)) {
          const clashUsername = await sql`SELECT id FROM members WHERE username = ${cleanUsername} LIMIT 1`;
          if (clashUsername.length > 0) return res.status(400).json({ error: "Username sudah dipakai member lain" });
        }
        newUsername = cleanUsername;
      }

      const currentAccessCode = existing["access_code"] as string;
      let newAccessCode = currentAccessCode;
      let codeIsNewAndNotInDb = false;
      const accessCodeChanged = accessCode?.trim() && accessCode.trim() !== currentAccessCode;

      if (accessCodeChanged) {
        newAccessCode = accessCode!.trim();
        const codeRows = await sql`SELECT is_used, used_by_email FROM access_codes WHERE code = ${newAccessCode} LIMIT 1`;
        if (codeRows.length > 0 && codeRows[0]!["is_used"] && codeRows[0]!["used_by_email"] !== currentEmail) {
          return res.status(400).json({ error: "Kode akses sudah dipakai member lain" });
        }
        if (codeRows.length === 0) codeIsNewAndNotInDb = true;
      }

      // --- Semua penulisan ke DB dalam satu transaction ---
      // Urutan wajib: access_codes baru dulu (FK), baru members, baru bebaskan/tandai kode, baru orders.
      await sql.begin(async (tx) => {
        // 1. INSERT kode akses baru kalau belum ada (FK members.access_code → access_codes.code)
        if (accessCodeChanged && codeIsNewAndNotInDb) {
          await tx`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${newAccessCode}, ${memberType}, ${batch}, false)`;
        }

        // 2. Update baris members (tanpa username — ditangani trySetUsername setelah tx)
        await tx`
          UPDATE members
          SET name = ${name}, email = ${newEmail}, member_type = ${memberType},
              batch_number = ${batch}, access_code = ${newAccessCode}
          WHERE email = ${currentEmail}
        `;

        // 3. Update status is_used di access_codes
        if (accessCodeChanged) {
          // Bebaskan kode lama, aktifkan kode baru
          await tx`UPDATE access_codes SET is_used = false, used_by_email = NULL, used_at = NULL WHERE code = ${currentAccessCode}`;
          await tx`UPDATE access_codes SET is_used = true, used_by_email = ${newEmail}, used_at = NOW() WHERE code = ${newAccessCode}`;
        } else if (newEmail !== currentEmail) {
          // Kode sama tapi email berubah → update used_by_email supaya sinkron
          await tx`UPDATE access_codes SET used_by_email = ${newEmail} WHERE code = ${currentAccessCode}`;
        }

        // 4. Sinkronkan tabel orders (supaya login lewat orders tetap konsisten)
        await tx`
          UPDATE orders
          SET name = ${name}, email = ${newEmail}, member_type = ${memberType},
              batch_number = ${batch}, access_code = ${newAccessCode}
          WHERE email = ${currentEmail} AND access_code = ${currentAccessCode}
        `;
        // Catatan: materi_progress TIDAK perlu diupdate manual.
        // FK materi_progress_member_email_fkey sudah ON UPDATE CASCADE —
        // Postgres memindahkan email-nya sendiri saat members.email berubah.
      });

      // Username dihandle terpisah karena kolom mungkin belum ada di DB produksi.
      if (newUsername !== null) {
        try {
          await sql`UPDATE members SET username = ${newUsername} WHERE email = ${newEmail}`;
        } catch { /* kolom username belum ada */ }
      }

      return res.json({ success: true, email: newEmail, accessCode: newAccessCode, username: newUsername });
    }

    // ---- MEMBERS: LIST ----
    if (section === "members" && sub1 === "list" && req.method === "GET") {
      const { search, type, batch } = getQuery(req);
      const whereClauses: string[] = [];
      const vals: (string | number)[] = [];
      let idx = 1;
      if (type && type !== "all") { whereClauses.push(`member_type = $${idx++}`); vals.push(type); }
      if (batch) { whereClauses.push(`batch_number = $${idx++}`); vals.push(parseInt(batch, 10)); }
      if (search) { whereClauses.push(`(email ILIKE $${idx} OR name ILIKE $${idx})`); vals.push(`%${search}%`); idx++; }
      const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

      const members = await sql.unsafe(`SELECT * FROM members ${whereSql} ORDER BY created_at DESC`, vals) as unknown as Record<string, unknown>[];
      const emails = members.map((m) => m["email"] as string);
      let progress: Record<string, unknown>[] = [];
      if (emails.length > 0) {
        progress = await sql.unsafe(
          `SELECT member_email, is_completed FROM materi_progress WHERE member_email = ANY($1)`,
          [emails]
        ) as unknown as Record<string, unknown>[];
      }
      const completedByEmail: Record<string, number> = {};
      for (const p of progress) {
        if (p["is_completed"]) {
          const email = p["member_email"] as string;
          completedByEmail[email] = (completedByEmail[email] ?? 0) + 1;
        }
      }
      return res.json({
        members: members.map((m) => ({
          id: m["id"], email: m["email"], name: m["name"], username: m["username"] ?? null, memberType: m["member_type"],
          batchNumber: m["batch_number"], accessCode: m["access_code"],
          completedSessions: completedByEmail[m["email"] as string] ?? 0, totalSessions: 6,
          createdAt: m["created_at"], lastLogin: m["last_login"],
        })),
      });
    }

    // ---- MEMBERS: DETAIL ----
    if (section === "members" && sub1 && sub2 === "detail" && req.method === "GET") {
      const email = decodeURIComponent(sub1);
      const members = await sql`SELECT * FROM members WHERE email = ${email} LIMIT 1`;
      if (!members.length) return res.status(404).json({ error: "Member tidak ditemukan" });
      const member = members[0]!;
      const progress = await sql`
        SELECT sesi_number, kelas_id, is_completed, current_step, was_skipped, completed_at
        FROM materi_progress WHERE member_email = ${email} ORDER BY sesi_number
      `;
      return res.json({
        member: {
          id: member["id"], email: member["email"], name: member["name"], username: member["username"] ?? null,
          memberType: member["member_type"], batchNumber: member["batch_number"], accessCode: member["access_code"],
          createdAt: member["created_at"], lastLogin: member["last_login"],
        },
        progress: progress.map((p) => ({
          sesiNumber: p["sesi_number"], kelasId: p["kelas_id"], isCompleted: p["is_completed"],
          currentStep: p["current_step"], wasSkipped: p["was_skipped"], completedAt: p["completed_at"],
        })),
      });
    }

    // ---- MEMBERS: RESET PROGRESS ----
    if (section === "members" && sub1 && sub2 === "reset-progress" && req.method === "POST") {
      const email = decodeURIComponent(sub1);
      await sql`DELETE FROM materi_progress WHERE member_email = ${email}`;
      return res.json({ success: true });
    }

    // ---- ORDERS: LIST ----
    if (section === "orders" && sub1 === "list" && req.method === "GET") {
      const { status, type } = getQuery(req);
      const whereClauses: string[] = [];
      const vals: string[] = [];
      let idx = 1;
      if (status && status !== "all") { whereClauses.push(`status = $${idx++}`); vals.push(status); }
      if (type && type !== "all") { whereClauses.push(`member_type = $${idx++}`); vals.push(type); }
      const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
      const orders = await sql.unsafe(`SELECT * FROM orders ${whereSql} ORDER BY created_at DESC`, vals) as unknown as Record<string, unknown>[];
      return res.json({
        orders: orders.map((o) => ({
          id: o["id"], orderId: o["order_id"], name: o["name"], email: o["email"], phone: o["phone"],
          memberType: o["member_type"], batchNumber: o["batch_number"], grossAmount: o["amount"],
          couponCode: o["coupon_code"], discountAmount: o["discount_amount"], finalAmount: o["final_amount"],
          status: o["status"], accessCode: o["access_code"], paidAt: o["paid_at"], createdAt: o["created_at"],
        })),
      });
    }

    // ---- ORDERS: CREATE ----
    if (section === "orders" && sub1 === "create" && req.method === "POST") {
      const { name, email, phone, memberType, batchNumber, amount, status } = getBody<{
        name?: string; email?: string; phone?: string; memberType?: string;
        batchNumber?: number; amount?: number; status?: string;
      }>(req);
      if (!name || !email || !phone || !memberType || !amount) return res.status(400).json({ error: "Semua field wajib diisi" });
      if (!["mandiri", "kelas"].includes(memberType)) return res.status(400).json({ error: "Tipe member tidak valid" });

      const orderId = generateOrderId();
      const normalizedEmail = email.toLowerCase();
      const isPaid = status === "paid";
      const batch = batchNumber ?? 3;
      let accessCode: string | null = null;

      if (isPaid) {
        for (let attempt = 0; attempt < 20; attempt++) {
          const candidate = generateCode();
          const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
          if (existing.length === 0) { accessCode = candidate; break; }
        }
        if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses unik" });
        // Salin ke konstanta agar TypeScript tidak kehilangan penyempitan tipe di dalam closure sql.begin
        const code: string = accessCode;
        await sql.begin(async (tx) => {
          await tx`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${code}, ${memberType}, ${batch}, false)`;
          await tx`
            INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, final_amount, status, access_code, paid_at)
            VALUES (${orderId}, ${name}, ${normalizedEmail}, ${phone}, ${memberType}, ${batch}, ${amount}, ${amount}, 'paid', ${code}, NOW())
          `;
          await upsertMember({ email: normalizedEmail, name, accessCode: code, memberType, batchNumber: batch }, tx);
        });
        await trySetUsername(normalizedEmail);
      } else {
        // Simpan status persis seperti yang dikirim frontend ('pending').
        // Jangan tulis 'pending_qris' dari route admin — itu hanya untuk flow QRIS publik.
        await sql`
          INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, final_amount, status)
          VALUES (${orderId}, ${name}, ${normalizedEmail}, ${phone}, ${memberType}, ${batch}, ${amount}, ${amount}, 'pending')
        `;
      }
      return res.json({ success: true, orderId, accessCode });
    }

    // ---- ORDERS: MARK PAID ----
    if (section === "orders" && sub1 && sub2 === "mark-paid" && req.method === "POST") {
      const orderId = sub1;
      const orders = await sql`SELECT * FROM orders WHERE order_id = ${orderId} LIMIT 1`;
      if (!orders.length) return res.status(404).json({ error: "Order tidak ditemukan" });
      const order = orders[0]!;
      if (order["status"] === "paid") return res.json({ success: true, accessCode: order["access_code"] });

      const existingCode = (order["access_code"] as string | null)?.trim() || null;

      if (existingCode) {
        // Order sudah punya kode akses (dari flow lain) → pakai kode itu, jangan generate baru.
        await sql.begin(async (tx) => {
          // Pastikan kode ada di tabel access_codes (mungkin diisi manual lewat SQL Editor)
          // agar FK dari members.access_code tidak gagal. ON CONFLICT DO NOTHING = idempoten.
          await tx`
            INSERT INTO access_codes (code, type, batch_number, is_used)
            VALUES (${existingCode}, ${order["member_type"]}, ${order["batch_number"]}, false)
            ON CONFLICT (code) DO NOTHING
          `;
          await tx`UPDATE orders SET status = 'paid', paid_at = NOW() WHERE order_id = ${orderId}`;
          await upsertMember({
            email: order["email"] as string,
            name: order["name"] as string,
            accessCode: existingCode,
            memberType: order["member_type"] as string,
            batchNumber: (order["batch_number"] as number) ?? 3,
          }, tx);
        });
        await trySetUsername(order["email"] as string);
        return res.json({ success: true, accessCode: existingCode });
      }

      // Order belum punya kode akses → generate kode baru.
      let accessCode = "";
      for (let attempt = 0; attempt < 20; attempt++) {
        const candidate = generateCode();
        const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
        if (existing.length === 0) { accessCode = candidate; break; }
      }
      if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses" });

      await sql.begin(async (tx) => {
        await tx`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${accessCode}, ${order["member_type"]}, ${order["batch_number"]}, false)`;
        await tx`UPDATE orders SET status = 'paid', access_code = ${accessCode}, paid_at = NOW() WHERE order_id = ${orderId}`;
        await upsertMember({
          email: order["email"] as string,
          name: order["name"] as string,
          accessCode,
          memberType: order["member_type"] as string,
          batchNumber: (order["batch_number"] as number) ?? 3,
        }, tx);
      });
      await trySetUsername(order["email"] as string);
      return res.json({ success: true, accessCode });
    }

    // ---- ORDERS: CANCEL ----
    if (section === "orders" && sub1 && sub2 === "cancel" && req.method === "POST") {
      const orderId = sub1;
      const orders = await sql`SELECT id FROM orders WHERE order_id = ${orderId} LIMIT 1`;
      if (!orders.length) return res.status(404).json({ error: "Order tidak ditemukan" });
      await sql`UPDATE orders SET status = 'cancelled' WHERE order_id = ${orderId}`;
      return res.json({ success: true });
    }

    return res.status(404).json({ error: "Route tidak ditemukan" });
  } catch (err) {
    console.error("[Admin API] Error:", err);
    return res.status(500).json({
      error: "Terjadi kesalahan server",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
