import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { SignJWT } from "jose";

const SESSION_COOKIE = "aigypt_session";
const EXPIRY_DAYS = 30;
const PREVIEW_CODE = process.env["PREVIEW_CODE"]?.trim().toUpperCase();
const MASTER_ACCESS_CODE = process.env["MASTER_ACCESS_CODE"]?.trim();

const sessionSecretEnv = process.env["SESSION_SECRET"];
if (!sessionSecretEnv) {
  console.warn("[auth/login] WARNING: SESSION_SECRET tidak diset.");
}
const SECRET = new TextEncoder().encode(
  sessionSecretEnv ?? "fallback-not-for-production"
);

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid" });
  }

  const trimmedCode = code.trim();
  const upperCode = trimmedCode.toUpperCase();

  // MASTER CODE
  if (MASTER_ACCESS_CODE && trimmedCode === MASTER_ACCESS_CODE) {
    const token = await createSessionToken({ email: email.toLowerCase(), memberType: "kelas", batchNumber: 1, name: "Admin", isAdminMode: true });
    res.setHeader("Set-Cookie", setCookieHeader(token));
    return res.json({ success: true, memberType: "kelas", batchNumber: 1, name: "Admin", isAdminMode: true });
  }

  // PREVIEW CODE
  if (PREVIEW_CODE && upperCode === PREVIEW_CODE) {
    const token = await createSessionToken({ email: email.toLowerCase(), memberType: "kelas", batchNumber: 1, name: "Preview" });
    res.setHeader("Set-Cookie", setCookieHeader(token));
    return res.json({ success: true, memberType: "kelas", batchNumber: 1, name: "Preview" });
  }

  const sql = neon(process.env["DATABASE_URL"]!);

  const accessCodes = await sql`
    SELECT code, type, batch_number, is_used, used_by_email, expires_at
    FROM access_codes WHERE code = ${upperCode} LIMIT 1
  `;

  if (!accessCodes.length) {
    return res.status(401).json({ error: "Kode akses tidak ditemukan" });
  }

  const accessCode = accessCodes[0]!;
  const normalizedEmail = email.toLowerCase();

  if (accessCode["is_used"] && accessCode["used_by_email"] !== normalizedEmail) {
    return res.status(401).json({ error: "Kode akses sudah digunakan oleh email lain" });
  }
  if (accessCode["expires_at"] && new Date(accessCode["expires_at"] as string) < new Date()) {
    return res.status(401).json({ error: "Kode akses sudah kadaluarsa" });
  }

  await sql`
    UPDATE access_codes SET is_used = true, used_by_email = ${normalizedEmail}, used_at = NOW()
    WHERE code = ${upperCode}
  `;

  await sql`
    INSERT INTO members (email, access_code, member_type, batch_number, last_login)
    VALUES (${normalizedEmail}, ${upperCode}, ${accessCode["type"]}, ${accessCode["batch_number"]}, NOW())
    ON CONFLICT (email) DO UPDATE SET last_login = NOW()
  `;

  const members = await sql`
    SELECT name FROM members WHERE email = ${normalizedEmail} LIMIT 1
  `;
  const memberName = (members[0]?.["name"] as string | null) ?? null;

  const token = await createSessionToken({
    email: normalizedEmail,
    memberType: accessCode["type"] as string,
    batchNumber: accessCode["batch_number"] as number ?? null,
    name: memberName,
  });

  res.setHeader("Set-Cookie", setCookieHeader(token));
  return res.json({
    success: true,
    memberType: accessCode["type"],
    batchNumber: accessCode["batch_number"] ?? null,
    name: memberName,
  });
}
