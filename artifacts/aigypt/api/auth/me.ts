import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, membersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "aigypt_session";
const EXPIRY_DAYS = 30;

const sessionSecretEnv = process.env["SESSION_SECRET"];
if (!sessionSecretEnv) {
  console.warn("[auth/me] WARNING: SESSION_SECRET tidak diset.");
}
const SECRET = new TextEncoder().encode(
  sessionSecretEnv ?? "fallback-not-for-production"
);

const PREVIEW_CODE = process.env["PREVIEW_CODE"]?.trim().toUpperCase();

async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as {
      email: string;
      memberType: string;
      batchNumber: number | null;
      name: string | null;
      isAdminMode?: boolean;
    };
  } catch {
    return null;
  }
}

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

  const cookieHeader = req.headers.cookie;
  const token = parseCookie(cookieHeader, SESSION_COOKIE);

  if (!token) {
    return res.status(401).json({ error: "Tidak terautentikasi" });
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Sesi tidak valid atau sudah kadaluarsa" });
  }

  // Admin mode atau preview mode — kembalikan dari JWT langsung tanpa sentuh DB
  if (payload.isAdminMode || PREVIEW_CODE) {
    return res.json({
      email: payload.email,
      name: payload.name ?? null,
      memberType: payload.memberType,
      batchNumber: payload.batchNumber ?? null,
      isAdminMode: payload.isAdminMode ?? false,
    });
  }

  const [member] = await db
    .select()
    .from(membersTable)
    .where(eq(membersTable.email, payload.email));

  if (!member) {
    return res.status(401).json({ error: "Member tidak ditemukan" });
  }

  return res.json({
    email: member.email,
    name: member.name ?? null,
    memberType: member.memberType,
    batchNumber: member.batchNumber ?? null,
    isAdminMode: false,
  });
}
