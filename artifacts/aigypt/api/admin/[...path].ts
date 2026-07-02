import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { verifyAdmin, signAdminToken, setAdminCookie, clearAdminCookie } from "../_lib/adminAuth";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();

  const segments = ([] as string[]).concat((req.query["path"] as string | string[] | undefined) ?? []);
  const [section, sub1, sub2] = segments;

  // ---- ROUTES TANPA SESSION (login) ----
  if (section === "login" && req.method === "POST") {
    const ADMIN_PASSWORD = (process.env["ADMIN_PASSWORD"] ?? "").trim();
    if (!ADMIN_PASSWORD) return res.status(503).json({ error: "ADMIN_PASSWORD belum dikonfigurasi" });
    const { password } = req.body as { password?: string };
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
        sql`SELECT COUNT(*)::int AS c FROM members`,
        sql`SELECT COUNT(*)::int AS c FROM access_codes WHERE is_used = false`,
        sql`SELECT COUNT(*)::int AS c FROM orders WHERE status = 'pending_qris'`,
        sql`SELECT COUNT(*)::int AS c FROM orders WHERE status = 'paid'`,
        sql`SELECT order_id, name, email, member_type, status, amount, created_at FROM orders ORDER BY created_at DESC LIMIT 5`,
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
      const { type, batchNumber, count: countReq } = req.body as { type?: string; batchNumber?: number; count?: number };
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
      const { type, batch, status, search, page = "1" } = req.query as Record<string, string>;
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

    // ---- MEMBERS: LIST ----
    if (section === "members" && sub1 === "list" && req.method === "GET") {
      const { search, type, batch } = req.query as Record<string, string>;
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
          id: m["id"], email: m["email"], name: m["name"], memberType: m["member_type"],
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
          id: member["id"], email: member["email"], name: member["name"], memberType: member["member_type"],
          batchNumber: member["batch_number"], accessCode: member["access_code"],
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
      const { status, type } = req.query as Record<string, string>;
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
      const { name, email, phone, memberType, batchNumber, amount, status } = req.body as {
        name?: string; email?: string; phone?: string; memberType?: string;
        batchNumber?: number; amount?: number; status?: string;
      };
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
        await sql`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${accessCode}, ${memberType}, ${batch}, false)`;
        await sql`
          INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, status, access_code, paid_at)
          VALUES (${orderId}, ${name}, ${normalizedEmail}, ${phone}, ${memberType}, ${batch}, ${amount}, 'paid', ${accessCode}, NOW())
        `;
      } else {
        await sql`
          INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, status)
          VALUES (${orderId}, ${name}, ${normalizedEmail}, ${phone}, ${memberType}, ${batch}, ${amount}, 'pending')
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

      let accessCode = "";
      for (let attempt = 0; attempt < 20; attempt++) {
        const candidate = generateCode();
        const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
        if (existing.length === 0) { accessCode = candidate; break; }
      }
      if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses" });

      await sql`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${accessCode}, ${order["member_type"]}, ${order["batch_number"]}, false)`;
      await sql`UPDATE orders SET status = 'paid', access_code = ${accessCode}, paid_at = NOW() WHERE order_id = ${orderId}`;
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
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
