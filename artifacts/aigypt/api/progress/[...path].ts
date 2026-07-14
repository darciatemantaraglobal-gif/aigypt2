import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";
import { getSegments, getBody } from "../_lib/route.js";
import { verifyMember, isOrderRevoked } from "../_lib/memberAuth.js";

/**
 * Upsert manual (SELECT lalu UPDATE/INSERT) karena belum dipastikan ada
 * unique constraint pada (member_email, kelas_id, sesi_number) di tabel
 * materi_progress. Lihat docs/migration-progress.sql — begitu constraint
 * itu dijalankan manual di Supabase, logika ini bisa disederhanakan jadi
 * INSERT ... ON CONFLICT ... DO UPDATE.
 */
async function upsertProgress(
  memberEmail: string,
  kelasId: string,
  sesiNumber: number,
  patch: Partial<{ isCompleted: boolean; completedAt: Date; currentStep: number; wasSkipped: boolean }>
) {
  const existing = await sql`
    SELECT id FROM materi_progress
    WHERE member_email = ${memberEmail} AND kelas_id = ${kelasId} AND sesi_number = ${sesiNumber}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const id = existing[0]!["id"];
    if (patch.isCompleted !== undefined) {
      await sql`UPDATE materi_progress SET is_completed = ${patch.isCompleted}, completed_at = ${patch.completedAt ?? null} WHERE id = ${id}`;
    }
    if (patch.currentStep !== undefined) {
      await sql`UPDATE materi_progress SET current_step = ${patch.currentStep} WHERE id = ${id}`;
    }
    if (patch.wasSkipped !== undefined) {
      await sql`UPDATE materi_progress SET was_skipped = ${patch.wasSkipped} WHERE id = ${id}`;
    }
    return;
  }

  await sql`
    INSERT INTO materi_progress (member_email, kelas_id, sesi_number, is_completed, completed_at, current_step, was_skipped)
    VALUES (
      ${memberEmail}, ${kelasId}, ${sesiNumber},
      ${patch.isCompleted ?? false}, ${patch.completedAt ?? null},
      ${patch.currentStep ?? 0}, ${patch.wasSkipped ?? false}
    )
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();

  const member = await verifyMember(req);
  if (!member) return res.status(401).json({ error: "Unauthorized" });

  if (await isOrderRevoked(member.orderId)) {
    return res.status(401).json({ error: "Akses kamu sudah tidak aktif. Hubungi admin AIGYPT untuk info lebih lanjut." });
  }

  const segments = getSegments(req, "/api/progress/");
  const [section] = segments;

  try {
    // ---- GET /api/progress (segmen kosong) ----
    if (segments.length === 0 && req.method === "GET") {
      const rows = await sql`
        SELECT sesi_number, kelas_id, is_completed, current_step, was_skipped, completed_at
        FROM materi_progress
        WHERE member_email = ${member.email}
        ORDER BY kelas_id, sesi_number
      `;
      return res.json(
        rows.map((p) => ({
          sesiNumber: p["sesi_number"],
          kelasId: p["kelas_id"],
          isCompleted: p["is_completed"],
          currentStep: p["current_step"],
          wasSkipped: p["was_skipped"],
          completedAt: p["completed_at"],
        }))
      );
    }

    // ---- POST /api/progress (segmen kosong): tandai sesi selesai ----
    if (segments.length === 0 && req.method === "POST") {
      const { kelasId, sesiNumber } = getBody<{ kelasId?: string; sesiNumber?: number }>(req);
      if (!kelasId || !sesiNumber) return res.status(400).json({ error: "kelasId dan sesiNumber wajib diisi" });
      await upsertProgress(member.email, kelasId, sesiNumber, { isCompleted: true, completedAt: new Date() });
      return res.json({ success: true });
    }

    // ---- POST /api/progress/step: auto-save posisi step ----
    if (section === "step" && req.method === "POST") {
      const { kelasId, sesiNumber, currentStep } = getBody<{
        kelasId?: string; sesiNumber?: number; currentStep?: number;
      }>(req);
      if (!kelasId || !sesiNumber || currentStep === undefined) {
        // Auto-save yang sering dipanggil — jangan lempar error yang mengganggu UI.
        return res.json({ success: false });
      }
      try {
        await upsertProgress(member.email, kelasId, sesiNumber, { currentStep });
        return res.json({ success: true });
      } catch (err) {
        console.error("[Progress Step] Error:", err);
        return res.json({ success: false });
      }
    }

    // ---- POST /api/progress/skip: tandai sesi dilewati ----
    if (section === "skip" && req.method === "POST") {
      const { kelasId, sesiNumber } = getBody<{ kelasId?: string; sesiNumber?: number }>(req);
      if (!kelasId || !sesiNumber) return res.status(400).json({ error: "kelasId dan sesiNumber wajib diisi" });
      await upsertProgress(member.email, kelasId, sesiNumber, { wasSkipped: true });
      return res.json({ success: true });
    }

    return res.status(404).json({ error: "Route tidak ditemukan" });
  } catch (err) {
    console.error("[Progress API] Error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
