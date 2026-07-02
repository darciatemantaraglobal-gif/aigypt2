import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "../../_lib/adminAuth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { search, type, batch } = req.query as Record<string, string>;

  try {
    const sql = neon(process.env["DATABASE_URL"]!);

    const whereClauses: string[] = [];
    const vals: (string | number)[] = [];
    let idx = 1;
    if (type && type !== "all") { whereClauses.push(`member_type = $${idx++}`); vals.push(type); }
    if (batch) { whereClauses.push(`batch_number = $${idx++}`); vals.push(parseInt(batch, 10)); }
    if (search) { whereClauses.push(`(email ILIKE $${idx} OR name ILIKE $${idx})`); vals.push(`%${search}%`); idx++; }
    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const members = await sql.query(`SELECT * FROM members ${whereSql} ORDER BY created_at DESC`, vals) as Record<string, unknown>[];

    const emails = members.map((m) => m["email"] as string);
    let progress: Record<string, unknown>[] = [];
    if (emails.length > 0) {
      progress = await sql.query(
        `SELECT member_email, is_completed FROM materi_progress WHERE member_email = ANY($1)`,
        [emails]
      ) as Record<string, unknown>[];
    }

    const completedByEmail: Record<string, number> = {};
    for (const p of progress) {
      if (p["is_completed"]) {
        const email = p["member_email"] as string;
        completedByEmail[email] = (completedByEmail[email] ?? 0) + 1;
      }
    }

    return res.json({
      members: members.map((m) => ({
        id: m["id"], email: m["email"], name: m["name"], memberType: m["member_type"],
        batchNumber: m["batch_number"], accessCode: m["access_code"],
        completedSessions: completedByEmail[m["email"] as string] ?? 0, totalSessions: 6,
        createdAt: m["created_at"], lastLogin: m["last_login"],
      })),
    });
  } catch (err) {
    console.error("[Members List] Error:", err);
    return res.status(500).json({ error: "Gagal memuat member" });
  }
}
