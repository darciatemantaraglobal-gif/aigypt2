import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "../../../_lib/adminAuth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { email: emailParam } = req.query as { email?: string };
  const email = decodeURIComponent(emailParam ?? "");
  if (!email) return res.status(400).json({ error: "Email tidak valid" });

  try {
    const sql = neon(process.env["DATABASE_URL"]!);
    const members = await sql`SELECT * FROM members WHERE email = ${email} LIMIT 1`;
    if (!members.length) return res.status(404).json({ error: "Member tidak ditemukan" });
    const member = members[0]!;

    const progress = await sql`
      SELECT sesi_number, kelas_id, is_completed, current_step, was_skipped, completed_at
      FROM materi_progress WHERE member_email = ${email} ORDER BY sesi_number
    `;

    return res.json({
      member: {
        id: member["id"], email: member["email"], name: member["name"], memberType: member["member_type"],
        batchNumber: member["batch_number"], accessCode: member["access_code"],
        createdAt: member["created_at"], lastLogin: member["last_login"],
      },
      progress: progress.map((p) => ({
        sesiNumber: p["sesi_number"], kelasId: p["kelas_id"], isCompleted: p["is_completed"],
        currentStep: p["current_step"], wasSkipped: p["was_skipped"], completedAt: p["completed_at"],
      })),
    });
  } catch (err) {
    console.error("[Member Detail] Error:", err);
    return res.status(500).json({ error: "Gagal memuat detail member" });
  }
}
