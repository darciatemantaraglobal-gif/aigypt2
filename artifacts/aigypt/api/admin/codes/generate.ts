import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "../../_lib/adminAuth";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AIGYPT-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { type, batchNumber, count: countReq } = req.body as {
    type?: string; batchNumber?: number; count?: number;
  };
  if (!type || !["mandiri", "kelas"].includes(type)) {
    return res.status(400).json({ error: "Tipe harus 'mandiri' atau 'kelas'" });
  }
  const n = Number(countReq);
  if (!n || n < 1 || n > 50) {
    return res.status(400).json({ error: "Jumlah kode harus antara 1 dan 50" });
  }

  try {
    const sql = neon(process.env["DATABASE_URL"]!);
    const batch = batchNumber ?? 3;
    const codes: string[] = [];

    for (let i = 0; i < n; i++) {
      let code = "";
      for (let attempt = 0; attempt < 20; attempt++) {
        const candidate = generateCode();
        const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
        if (existing.length === 0) { code = candidate; break; }
      }
      if (!code) break;
      await sql`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${code}, ${type}, ${batch}, false)`;
      codes.push(code);
    }
    return res.json({ codes });
  } catch (err) {
    console.error("[Codes Generate] Error:", err);
    return res.status(500).json({ error: "Gagal generate kode" });
  }
}
