import { Router } from "express";
import { db, accessCodesTable, membersTable, materiProgressTable, ordersTable } from "@workspace/db";
import { eq, and, or, ilike, desc, count, inArray } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";

const router = Router();

const adminPasswordEnv = process.env["ADMIN_PASSWORD"];
if (!adminPasswordEnv) {
  if (process.env["NODE_ENV"] === "production") {
    throw new Error("ADMIN_PASSWORD env var must be set in production");
  }
  console.warn("[admin] WARNING: ADMIN_PASSWORD tidak diset. Semua endpoint admin dinonaktifkan sampai env var ini diset.");
}
const ADMIN_PASSWORD = adminPasswordEnv?.trim() ?? "";

const adminSessionSecretEnv = process.env["ADMIN_SESSION_SECRET"];
if (!adminSessionSecretEnv && process.env["NODE_ENV"] === "production") {
  throw new Error("ADMIN_SESSION_SECRET env var must be set in production");
}
const ADMIN_SESSION_SECRET = new TextEncoder().encode(
  adminSessionSecretEnv ?? (ADMIN_PASSWORD || crypto.randomUUID())
);

const ADMIN_COOKIE = "aigypt_admin_session";
const SESSION_HOURS = 8;

async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${SESSION_HOURS}h`)
    .setIssuedAt()
    .sign(ADMIN_SESSION_SECRET);
}

async function verifyAdminSession(req: any): Promise<boolean> {
  if (!ADMIN_PASSWORD) return false;
  const token = req.cookies?.[ADMIN_COOKIE];
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, ADMIN_SESSION_SECRET);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AIGYPT-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function generateUniqueCode(): Promise<string | null> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const candidate = generateCode();
    const [existing] = await db.select().from(accessCodesTable).where(eq(accessCodesTable.code, candidate));
    if (!existing) return candidate;
  }
  return null;
}

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-${ts}-${rand}`;
}

// --- AUTH ---
router.post("/admin/login", async (req, res) => {
  if (!ADMIN_PASSWORD) {
    res.status(503).json({ error: "ADMIN_PASSWORD belum dikonfigurasi" });
    return;
  }
  const { password } = req.body as { password?: string };
  if (!password || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Password salah" });
    return;
  }
  const token = await signAdminToken();
  res.cookie(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    sameSite: "lax",
    maxAge: SESSION_HOURS * 60 * 60 * 1000,
  });
  res.json({ success: true });
});
router.all("/admin/login", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(405).json({ error: "Method Not Allowed" });
});

router.post("/admin/logout", (_req, res) => {
  res.clearCookie(ADMIN_COOKIE);
  res.json({ success: true });
});
router.all("/admin/logout", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(405).json({ error: "Method Not Allowed" });
});

router.get("/admin/verify", async (req, res) => {
  const isAdmin = await verifyAdminSession(req);
  res.status(isAdmin ? 200 : 401).json({ authenticated: isAdmin });
});

// --- DASHBOARD STATS ---
router.get("/admin/dashboard-stats", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const [totalMembers, unusedCodes, pendingOrders, paidOrders, recentOrders] = await Promise.all([
    db.select({ c: count() }).from(membersTable),
    db.select({ c: count() }).from(accessCodesTable).where(eq(accessCodesTable.isUsed, false)),
    db.select({ c: count() }).from(ordersTable).where(eq(ordersTable.status, "pending")),
    db.select({ c: count() }).from(ordersTable).where(eq(ordersTable.status, "paid")),
    db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt)).limit(5),
  ]);

  res.json({
    totalMembers: Number(totalMembers[0]?.c ?? 0),
    unusedCodes: Number(unusedCodes[0]?.c ?? 0),
    pendingOrders: Number(pendingOrders[0]?.c ?? 0),
    paidOrders: Number(paidOrders[0]?.c ?? 0),
    recentOrders: recentOrders.map(o => ({
      orderId: o.orderId,
      name: o.name,
      email: o.email,
      memberType: o.memberType,
      status: o.status,
      grossAmount: o.grossAmount,
      createdAt: o.createdAt.toISOString(),
    })),
  });
});

// --- CODES ---
router.post("/admin/codes/generate", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { type, batchNumber, count: countReq } = req.body as {
    type?: string; batchNumber?: number; count?: number;
  };
  if (!type || !["mandiri", "kelas"].includes(type)) {
    res.status(400).json({ error: "Tipe harus 'mandiri' atau 'kelas'" }); return;
  }
  const n = Number(countReq);
  if (!n || n < 1 || n > 50) {
    res.status(400).json({ error: "Jumlah kode harus antara 1 dan 50" }); return;
  }

  const codes: string[] = [];
  for (let i = 0; i < n; i++) {
    const code = await generateUniqueCode();
    if (!code) break;
    await db.insert(accessCodesTable).values({ code, type, batchNumber: batchNumber ?? 1, isUsed: false });
    codes.push(code);
  }
  res.json({ codes });
});

router.get("/admin/codes/list", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { type, batch, status, search, page = "1" } = req.query as Record<string, string>;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = 20;
  const offset = (pageNum - 1) * pageSize;

  const conds: ReturnType<typeof eq>[] = [];
  if (type && type !== "all") conds.push(eq(accessCodesTable.type, type));
  if (batch) conds.push(eq(accessCodesTable.batchNumber, parseInt(batch, 10)));
  if (status === "used") conds.push(eq(accessCodesTable.isUsed, true));
  if (status === "unused") conds.push(eq(accessCodesTable.isUsed, false));

  const baseWhere = conds.length > 0 ? and(...conds) : undefined;

  const searchWhere = search
    ? or(ilike(accessCodesTable.code, `%${search}%`), ilike(accessCodesTable.usedByEmail, `%${search}%`))
    : undefined;

  const whereClause = baseWhere && searchWhere ? and(baseWhere, searchWhere)
    : baseWhere ?? searchWhere ?? undefined;

  const [codes, totalRes] = await Promise.all([
    db.select().from(accessCodesTable).where(whereClause).orderBy(desc(accessCodesTable.createdAt)).limit(pageSize).offset(offset),
    db.select({ c: count() }).from(accessCodesTable).where(whereClause),
  ]);

  res.json({
    codes: codes.map(c => ({
      id: c.id, code: c.code, type: c.type, batchNumber: c.batchNumber,
      isUsed: c.isUsed, usedByEmail: c.usedByEmail, usedAt: c.usedAt?.toISOString() ?? null,
      createdAt: c.createdAt.toISOString(), orderId: c.orderId,
    })),
    total: Number(totalRes[0]?.c ?? 0),
    page: pageNum,
    pageSize,
  });
});

router.delete("/admin/codes/:code", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const code = req.params.code;
  const [existing] = await db.select().from(accessCodesTable).where(eq(accessCodesTable.code, code));
  if (!existing) { res.status(404).json({ error: "Kode tidak ditemukan" }); return; }
  if (existing.isUsed) { res.status(400).json({ error: "Kode yang sudah dipakai tidak bisa dihapus" }); return; }

  await db.delete(accessCodesTable).where(eq(accessCodesTable.code, code));
  res.json({ success: true });
});

// --- MEMBERS ---
router.get("/admin/members/list", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { search, type, batch } = req.query as Record<string, string>;
  const conds: ReturnType<typeof eq>[] = [];
  if (type && type !== "all") conds.push(eq(membersTable.memberType, type));
  if (batch) conds.push(eq(membersTable.batchNumber, parseInt(batch, 10)));
  if (search) conds.push(or(ilike(membersTable.email, `%${search}%`), ilike(membersTable.name, `%${search}%`)) as any);

  const whereClause = conds.length > 0 ? and(...conds) : undefined;
  const members = await db.select().from(membersTable).where(whereClause).orderBy(desc(membersTable.createdAt));

  const emails = members.map(m => m.email);
  const progress = emails.length > 0
    ? await db.select().from(materiProgressTable).where(inArray(materiProgressTable.memberEmail, emails))
    : [];

  const completedByEmail: Record<string, number> = {};
  for (const p of progress) {
    if (p.isCompleted) completedByEmail[p.memberEmail] = (completedByEmail[p.memberEmail] ?? 0) + 1;
  }

  res.json({
    members: members.map(m => ({
      id: m.id, email: m.email, name: m.name, memberType: m.memberType,
      batchNumber: m.batchNumber, accessCode: m.accessCode,
      completedSessions: completedByEmail[m.email] ?? 0, totalSessions: 6,
      createdAt: m.createdAt.toISOString(), lastLogin: m.lastLogin?.toISOString() ?? null,
    })),
  });
});

router.get("/admin/members/:email/detail", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const email = decodeURIComponent(req.params.email);
  const [member] = await db.select().from(membersTable).where(eq(membersTable.email, email));
  if (!member) { res.status(404).json({ error: "Member tidak ditemukan" }); return; }

  const progress = await db.select().from(materiProgressTable)
    .where(eq(materiProgressTable.memberEmail, email))
    .orderBy(materiProgressTable.sesiNumber);

  res.json({
    member: {
      id: member.id, email: member.email, name: member.name, memberType: member.memberType,
      batchNumber: member.batchNumber, accessCode: member.accessCode,
      createdAt: member.createdAt.toISOString(), lastLogin: member.lastLogin?.toISOString() ?? null,
    },
    progress: progress.map(p => ({
      sesiNumber: p.sesiNumber, kelasId: p.kelasId, isCompleted: p.isCompleted,
      currentStep: p.currentStep, wasSkipped: p.wasSkipped, completedAt: p.completedAt?.toISOString() ?? null,
    })),
  });
});

router.post("/admin/members/:email/reset-progress", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const email = decodeURIComponent(req.params.email);
  await db.delete(materiProgressTable).where(eq(materiProgressTable.memberEmail, email));
  res.json({ success: true });
});

// --- ORDERS ---
router.post("/admin/orders/create", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { name, email, phone, memberType, batchNumber, amount, status } = req.body as {
    name?: string; email?: string; phone?: string; memberType?: string;
    batchNumber?: number; amount?: number; status?: string;
  };
  if (!name || !email || !phone || !memberType || !amount) {
    res.status(400).json({ error: "Semua field wajib diisi" }); return;
  }
  if (!["mandiri", "kelas"].includes(memberType)) {
    res.status(400).json({ error: "Tipe member tidak valid" }); return;
  }

  const orderId = generateOrderId();
  const normalizedEmail = email.toLowerCase();
  const isPaid = status === "paid";
  let accessCode: string | null = null;

  if (isPaid) {
    accessCode = await generateUniqueCode();
    if (!accessCode) { res.status(500).json({ error: "Gagal generate kode akses unik" }); return; }
    await db.insert(accessCodesTable).values({
      code: accessCode, type: memberType, batchNumber: batchNumber ?? 1, isUsed: false, orderId,
    });
  }

  await db.insert(ordersTable).values({
    orderId, name, email: normalizedEmail, phone, memberType,
    batchNumber: batchNumber ?? 1, grossAmount: amount,
    status: isPaid ? "paid" : "pending",
    ...(accessCode ? { accessCode } : {}),
    ...(isPaid ? { paidAt: new Date() } : {}),
  });

  res.json({ success: true, orderId, accessCode });
});

router.get("/admin/orders/list", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { status, type } = req.query as Record<string, string>;
  const conds: ReturnType<typeof eq>[] = [];
  if (status && status !== "all") conds.push(eq(ordersTable.status, status));
  if (type && type !== "all") conds.push(eq(ordersTable.memberType, type));

  const whereClause = conds.length > 0 ? and(...conds) : undefined;
  const orders = await db.select().from(ordersTable).where(whereClause).orderBy(desc(ordersTable.createdAt));

  res.json({
    orders: orders.map(o => ({
      id: o.id, orderId: o.orderId, name: o.name, email: o.email, phone: o.phone,
      memberType: o.memberType, batchNumber: o.batchNumber, grossAmount: o.grossAmount,
      status: o.status, accessCode: o.accessCode, paidAt: o.paidAt?.toISOString() ?? null,
      createdAt: o.createdAt.toISOString(),
    })),
  });
});

router.post("/admin/orders/:orderId/mark-paid", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { orderId } = req.params;
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId));
  if (!order) { res.status(404).json({ error: "Order tidak ditemukan" }); return; }
  if (order.status === "paid") { res.json({ success: true, accessCode: order.accessCode }); return; }

  const accessCode = await generateUniqueCode();
  if (!accessCode) { res.status(500).json({ error: "Gagal generate kode akses" }); return; }

  await db.insert(accessCodesTable).values({
    code: accessCode, type: order.memberType, batchNumber: order.batchNumber, isUsed: false, orderId,
  });
  await db.update(ordersTable).set({ status: "paid", accessCode, paidAt: new Date() })
    .where(eq(ordersTable.orderId, orderId));

  res.json({ success: true, accessCode });
});

router.post("/admin/orders/:orderId/cancel", async (req, res) => {
  if (!await verifyAdminSession(req)) { res.status(401).json({ error: "Unauthorized" }); return; }

  const { orderId } = req.params;
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId));
  if (!order) { res.status(404).json({ error: "Order tidak ditemukan" }); return; }

  await db.update(ordersTable).set({ status: "cancelled" }).where(eq(ordersTable.orderId, orderId));
  res.json({ success: true });
});

export default router;
