import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdmin } from "../_lib/adminAuth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  const isAdmin = await verifyAdmin(req);
  return res.status(isAdmin ? 200 : 401).json({ authenticated: isAdmin });
}
