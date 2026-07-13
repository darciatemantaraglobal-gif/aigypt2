import { jwtVerify, SignJWT } from "jose";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const MEMBER_COOKIE = "aigypt_session";
const SESSION_DAYS = 30;

export interface MemberPayload {
  orderId: string;
  email: string;
  memberType: string;
  batchNumber: number | null;
}

function getSecret() {
  const secretEnv = process.env["JWT_SECRET"] ?? "";
  return new TextEncoder().encode(secretEnv);
}

/** Tandatangani JWT berisi identitas member, dipakai untuk cookie sesi & Bearer fallback. */
export async function signMemberToken(payload: MemberPayload): Promise<string> {
  return new SignJWT({
    orderId: payload.orderId,
    email: payload.email,
    memberType: payload.memberType,
    batchNumber: payload.batchNumber,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${SESSION_DAYS}d`)
    .setIssuedAt()
    .sign(getSecret());
}

function parseCookies(header?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  header.split(";").forEach((pair) => {
    const idx = pair.indexOf("=");
    if (idx === -1) return;
    const k = pair.slice(0, idx).trim();
    const v = pair.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  });
  return out;
}

export function setMemberCookie(res: VercelResponse, token: string) {
  const isProd = process.env["VERCEL_ENV"] === "production";
  res.setHeader(
    "Set-Cookie",
    `${MEMBER_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${SESSION_DAYS * 86400}; SameSite=Lax${isProd ? "; Secure" : ""}`
  );
}

export function clearMemberCookie(res: VercelResponse) {
  res.setHeader("Set-Cookie", `${MEMBER_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
}

/**
 * Verifikasi member dari request. Coba cookie HttpOnly dulu (alur web),
 * lalu fallback ke header Authorization: Bearer (klien lama / non-browser)
 * supaya tidak ada yang rusak untuk klien yang sudah ada.
 */
export async function verifyMember(req: VercelRequest): Promise<MemberPayload | null> {
  const cookies = parseCookies(req.headers.cookie);
  let token = cookies[MEMBER_COOKIE];

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) token = authHeader.slice(7);
  }

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload["email"] || !payload["orderId"]) return null;
    return {
      orderId: payload["orderId"] as string,
      email: payload["email"] as string,
      memberType: payload["memberType"] as string,
      batchNumber: (payload["batchNumber"] as number) ?? null,
    };
  } catch {
    return null;
  }
}
