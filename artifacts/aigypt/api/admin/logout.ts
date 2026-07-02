import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearAdminCookie } from "../_lib/adminAuth";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  clearAdminCookie(res);
  return res.json({ success: true });
}
