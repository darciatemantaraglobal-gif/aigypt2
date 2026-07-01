import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "aigypt_session";
const PREVIEW_CODE = process.env["PREVIEW_CODE"]?.trim().toUpperCase();

const sessionSecretEnv = process.env["SESSION_SECRET"];
if (!sessionSecretEnv) {
  console.warn("[auth/me] WARNING: SESSION_SECRET tidak diset.");
}
const SECRET = new TextEncoder().encode(
  sessionSecretEnv ?? "fallback-not-for-production"
);

function parseCookie(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = parseCookie(req.headers.cookie, SESSION_COOKIE);
  if (!token) return res.status(401).json({ error: "Tidak terautentikasi" });

  let payload: { email: string; memberType: string; batchNumber: number | null; name: string | null; isAdminMode?: boolean };
  try {
    const { payload: p } = await jwtVerify(token, SECRET);
    payload = p as typeof payload;
  } catch {
    return res.status(401).json({ error: "Sesi tidak valid atau sudah kadaluarsa" });
  }

  // Admin/preview — kembalikan dari JWT langsung
  if (payload.isAdminMode || PREVIEW_CODE) {
    return res.json({
      email: payload.email,
      name: payload.name ?? null,
      memberType: payload.memberType,
      batchNumber: payload.batchNumber ?? null,
      isAdminMode: payload.isAdminMode ?? false,
    });
  }

  const sql = neon(process.env["DATABASE_URL"]!);
  const rows = await sql`
    SELECT email, name, member_type, batch_number
    FROM members WHERE email = ${payload.email} LIMIT 1
  `;

  if (!rows.length) return res.status(401).json({ error: "Member tidak ditemukan" });

  const member = rows[0]!;
  return res.json({
    email: member["email"],
    name: member["name"] ?? null,
    memberType: member["member_type"],
    batchNumber: member["batch_number"] ?? null,
    isAdminMode: false,
  });
}
