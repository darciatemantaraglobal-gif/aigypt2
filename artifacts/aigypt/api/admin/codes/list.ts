import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "../../_lib/adminAuth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { type, batch, status, search, page = "1" } = req.query as Record<string, string>;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = 20;
  const offset = (pageNum - 1) * pageSize;

  try {
    const sql = neon(process.env["DATABASE_URL"]!);

    const whereClauses: string[] = [];
    const vals: (string | number)[] = [];
    let idx = 1;
    if (type && type !== "all") { whereClauses.push(`type = $${idx++}`); vals.push(type); }
    if (batch) { whereClauses.push(`batch_number = $${idx++}`); vals.push(parseInt(batch, 10)); }
    if (status === "used") whereClauses.push(`is_used = true`);
    if (status === "unused") whereClauses.push(`is_used = false`);
    if (search) { whereClauses.push(`(code ILIKE $${idx} OR used_by_email ILIKE $${idx})`); vals.push(`%${search}%`); idx++; }

    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const codes = await sql.query(
      `SELECT * FROM access_codes ${whereSql} ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${offset}`,
      vals
    );
    const totalRes = await sql.query(`SELECT COUNT(*)::int AS c FROM access_codes ${whereSql}`, vals);

    return res.json({
      codes: (codes as Record<string, unknown>[]).map((c) => ({
        id: c["id"], code: c["code"], type: c["type"], batchNumber: c["batch_number"],
        isUsed: c["is_used"], usedByEmail: c["used_by_email"], usedAt: c["used_at"],
        createdAt: c["created_at"], orderId: null,
      })),
      total: (totalRes as Record<string, unknown>[])[0]?.["c"] ?? 0,
      page: pageNum,
      pageSize,
    });
  } catch (err) {
    console.error("[Codes List] Error:", err);
    return res.status(500).json({ error: "Gagal memuat kode" });
  }
}
