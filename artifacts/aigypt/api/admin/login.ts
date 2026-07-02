import type { VercelRequest, VercelResponse } from "@vercel/node";
import { signAdminToken, setAdminCookie } from "../_lib/adminAuth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ADMIN_PASSWORD = (process.env["ADMIN_PASSWORD"] ?? "").trim();
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: "ADMIN_PASSWORD belum dikonfigurasi" });
  }

  const { password } = req.body as { password?: string };
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Password salah" });
  }

  const token = await signAdminToken();
  setAdminCookie(res, token);
  return res.json({ success: true });
}
