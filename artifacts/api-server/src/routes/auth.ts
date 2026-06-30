import { Router } from "express";
import { db, accessCodesTable, membersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";

const router = Router();

const SESSION_COOKIE = "aigypt_session";

const sessionSecretEnv = process.env["SESSION_SECRET"];
if (!sessionSecretEnv) {
  if (process.env["NODE_ENV"] === "production") {
    throw new Error("SESSION_SECRET env var must be set in production");
  }
  console.warn("[auth] WARNING: SESSION_SECRET tidak diset. Menggunakan nilai acak — sesi tidak akan bertahan setelah restart server.");
}
const SECRET = new TextEncoder().encode(
  sessionSecretEnv ?? crypto.randomUUID() + crypto.randomUUID()
);
const EXPIRY_DAYS = 30;

export async function createSessionToken(payload: {
  email: string;
  memberType: string;
  batchNumber: number | null;
  name: string | null;
}) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${EXPIRY_DAYS}d`)
    .setIssuedAt()
    .sign(SECRET);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as {
      email: string;
      memberType: string;
      batchNumber: number | null;
      name: string | null;
    };
  } catch {
    return null;
  }
}

router.post("/auth/login", async (req, res) => {
  const { email, code } = req.body as { email?: string; code?: string };

  if (!email || !code) {
    res.status(400).json({ error: "Email dan kode akses wajib diisi" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Format email tidak valid" });
    return;
  }

  const upperCode = code.toUpperCase().trim();

  const [accessCode] = await db
    .select()
    .from(accessCodesTable)
    .where(eq(accessCodesTable.code, upperCode));

  if (!accessCode) {
    res.status(401).json({ error: "Kode akses tidak ditemukan" });
    return;
  }

  if (accessCode.isUsed && accessCode.usedByEmail !== email.toLowerCase()) {
    res.status(401).json({ error: "Kode akses sudah digunakan oleh email lain" });
    return;
  }

  if (accessCode.expiresAt && accessCode.expiresAt < new Date()) {
    res.status(401).json({ error: "Kode akses sudah kadaluarsa" });
    return;
  }

  const normalizedEmail = email.toLowerCase();

  await db
    .update(accessCodesTable)
    .set({ isUsed: true, usedByEmail: normalizedEmail, usedAt: new Date() })
    .where(eq(accessCodesTable.code, upperCode));

  await db
    .insert(membersTable)
    .values({
      email: normalizedEmail,
      accessCode: upperCode,
      memberType: accessCode.type,
      batchNumber: accessCode.batchNumber,
      lastLogin: new Date(),
    })
    .onConflictDoUpdate({
      target: membersTable.email,
      set: { lastLogin: new Date() },
    });

  const [member] = await db
    .select()
    .from(membersTable)
    .where(eq(membersTable.email, normalizedEmail));

  const token = await createSessionToken({
    email: normalizedEmail,
    memberType: accessCode.type,
    batchNumber: accessCode.batchNumber ?? null,
    name: member?.name ?? null,
  });

  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    sameSite: "lax",
    maxAge: EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    memberType: accessCode.type,
    batchNumber: accessCode.batchNumber ?? null,
    name: member?.name ?? null,
  });
});

router.post("/auth/logout", (_req, res) => {
  res.clearCookie(SESSION_COOKIE);
  res.json({ success: true });
});

router.get("/auth/me", async (req, res) => {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    res.status(401).json({ error: "Sesi tidak valid atau sudah kadaluarsa" });
    return;
  }

  const [member] = await db
    .select()
    .from(membersTable)
    .where(eq(membersTable.email, payload.email));

  if (!member) {
    res.status(401).json({ error: "Member tidak ditemukan" });
    return;
  }

  res.json({
    email: member.email,
    name: member.name ?? null,
    memberType: member.memberType,
    batchNumber: member.batchNumber ?? null,
  });
});

export default router;
