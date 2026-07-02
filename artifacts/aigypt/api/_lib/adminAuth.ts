import { jwtVerify, SignJWT } from "jose";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ADMIN_COOKIE = "aigypt_admin_session";
const SESSION_HOURS = 8;

function getSecret() {
  const pw = process.env["ADMIN_PASSWORD"] ?? "";
  const secretEnv = process.env["ADMIN_SESSION_SECRET"] ?? pw;
  return new TextEncoder().encode(secretEnv);
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${SESSION_HOURS}h`)
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

export async function verifyAdmin(req: VercelRequest): Promise<boolean> {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[ADMIN_COOKIE];
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload["role"] === "admin";
  } catch {
    return false;
  }
}

export function setAdminCookie(res: VercelResponse, token: string) {
  const isProd = process.env["VERCEL_ENV"] === "production";
  res.setHeader(
    "Set-Cookie",
    `${ADMIN_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${SESSION_HOURS * 3600}; SameSite=Lax${isProd ? "; Secure" : ""}`
  );
}

export function clearAdminCookie(res: VercelResponse) {
  res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
}
