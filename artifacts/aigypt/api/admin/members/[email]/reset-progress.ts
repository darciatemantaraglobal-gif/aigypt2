import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "../../../_lib/adminAuth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { email: emailParam } = req.query as { email?: string };
  const email = decodeURIComponent(emailParam ?? "");
  if (!email) return res.status(400).json({ error: "Email tidak valid" });

  try {
    const sql = neon(process.env["DATABASE_URL"]!);
    await sql`DELETE FROM materi_progress WHERE member_email = ${email}`;
    return res.json({ success: true });
  } catch (err) {
    console.error("[Reset Progress] Error:", err);
    return res.status(500).json({ error: "Gagal reset progress" });
  }
}
