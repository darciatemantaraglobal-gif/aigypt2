import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, accessCodesTable, membersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";

const SESSION_COOKIE = "aigypt_session";
const EXPIRY_DAYS = 30;

const sessionSecretEnv = process.env["SESSION_SECRET"];
if (!sessionSecretEnv) {
  console.warn("[auth/login] WARNING: SESSION_SECRET tidak diset.");
}
const SECRET = new TextEncoder().encode(
  sessionSecretEnv ?? "fallback-not-for-production"
);

const PREVIEW_CODE = process.env["PREVIEW_CODE"]?.trim().toUpperCase();
const MASTER_ACCESS_CODE = process.env["MASTER_ACCESS_CODE"]?.trim();

async function createSessionToken(payload: {
  email: string;
  memberType: string;
  batchNumber: number | null;
  name: string | null;
  isAdminMode?: boolean;
}) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${EXPIRY_DAYS}d`)
    .setIssuedAt()
    .sign(SECRET);
}

function setCookieHeader(token: string): string {
  const maxAge = EXPIRY_DAYS * 24 * 60 * 60;
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Path=/; Secure`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { email, code } = req.body as { email?: string; code?: string };

  if (!email || !code) {
    return res.status(400).json({ error: "Email dan kode akses wajib diisi" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid" });
  }

  const trimmedCode = code.trim();
  const upperCode = trimmedCode.toUpperCase();

  // MASTER CODE — akses penuh, berkali-kali, tidak sentuh DB
  if (MASTER_ACCESS_CODE && trimmedCode === MASTER_ACCESS_CODE) {
    const token = await createSessionToken({
      email: email.toLowerCase(),
      memberType: "kelas",
      batchNumber: 1,
      name: "Admin",
      isAdminMode: true,
    });
    res.setHeader("Set-Cookie", setCookieHeader(token));
    return res.json({ success: true, memberType: "kelas", batchNumber: 1, name: "Admin", isAdminMode: true });
  }

  if (PREVIEW_CODE && upperCode === PREVIEW_CODE) {
    const token = await createSessionToken({
      email: email.toLowerCase(),
      memberType: "kelas",
      batchNumber: 1,
      name: "Preview",
    });
    res.setHeader("Set-Cookie", setCookieHeader(token));
    return res.json({ success: true, memberType: "kelas", batchNumber: 1, name: "Preview" });
  }

  const [accessCode] = await db
    .select()
    .from(accessCodesTable)
    .where(eq(accessCodesTable.code, upperCode));

  if (!accessCode) {
    return res.status(401).json({ error: "Kode akses tidak ditemukan" });
  }

  if (accessCode.isUsed && accessCode.usedByEmail !== email.toLowerCase()) {
    return res.status(401).json({ error: "Kode akses sudah digunakan oleh email lain" });
  }

  if (accessCode.expiresAt && accessCode.expiresAt < new Date()) {
    return res.status(401).json({ error: "Kode akses sudah kadaluarsa" });
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

  res.setHeader("Set-Cookie", setCookieHeader(token));
  return res.json({
    success: true,
    memberType: accessCode.type,
    batchNumber: accessCode.batchNumber ?? null,
    name: member?.name ?? null,
  });
}
