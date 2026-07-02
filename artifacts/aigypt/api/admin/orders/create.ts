import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdmin } from "../../_lib/adminAuth";
import { sql } from "../../_lib/db";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AIGYPT-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-${ts}-${rand}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { name, email, phone, memberType, batchNumber, amount, status } = req.body as {
    name?: string; email?: string; phone?: string; memberType?: string;
    batchNumber?: number; amount?: number; status?: string;
  };
  if (!name || !email || !phone || !memberType || !amount) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }
  if (!["mandiri", "kelas"].includes(memberType)) {
    return res.status(400).json({ error: "Tipe member tidak valid" });
  }

  try {
    const orderId = generateOrderId();
    const normalizedEmail = email.toLowerCase();
    const isPaid = status === "paid";
    const batch = batchNumber ?? 3;
    let accessCode: string | null = null;

    if (isPaid) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const candidate = generateCode();
        const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
        if (existing.length === 0) { accessCode = candidate; break; }
      }
      if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses unik" });
      await sql`INSERT INTO access_codes (code, type, batch_number, is_used) VALUES (${accessCode}, ${memberType}, ${batch}, false)`;

      await sql`
        INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, status, access_code, paid_at)
        VALUES (${orderId}, ${name}, ${normalizedEmail}, ${phone}, ${memberType}, ${batch}, ${amount}, 'paid', ${accessCode}, NOW())
      `;
    } else {
      await sql`
        INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, amount, status)
        VALUES (${orderId}, ${name}, ${normalizedEmail}, ${phone}, ${memberType}, ${batch}, ${amount}, 'pending')
      `;
    }

    return res.json({ success: true, orderId, accessCode });
  } catch (err) {
    console.error("[Orders Create] Error:", err);
    return res.status(500).json({ error: "Gagal membuat order" });
  }
}
