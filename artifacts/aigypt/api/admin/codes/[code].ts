import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdmin } from "../../_lib/adminAuth";
import { sql } from "../../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { code } = req.query as { code?: string };
  if (!code) return res.status(400).json({ error: "Kode tidak valid" });

  try {
    const existing = await sql`SELECT is_used FROM access_codes WHERE code = ${code} LIMIT 1`;
    if (!existing.length) return res.status(404).json({ error: "Kode tidak ditemukan" });
    if (existing[0]!["is_used"]) return res.status(400).json({ error: "Kode yang sudah dipakai tidak bisa dihapus" });

    await sql`DELETE FROM access_codes WHERE code = ${code}`;
    return res.json({ success: true });
  } catch (err) {
    console.error("[Codes Delete] Error:", err);
    return res.status(500).json({ error: "Gagal menghapus kode" });
  }
}
