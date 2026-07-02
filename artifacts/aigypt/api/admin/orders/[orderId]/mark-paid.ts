import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { verifyAdmin } from "../../../_lib/adminAuth";

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

  const { orderId } = req.query as { orderId?: string };
  if (!orderId) return res.status(400).json({ error: "Order ID tidak valid" });

  try {
    const sql = neon(process.env["DATABASE_URL"]!);
    const orders = await sql`SELECT * FROM orders WHERE order_id = ${orderId} LIMIT 1`;
    if (!orders.length) return res.status(404).json({ error: "Order tidak ditemukan" });
    const order = orders[0]!;

    if (order["status"] === "paid") {
      return res.json({ success: true, accessCode: order["access_code"] });
    }

    let accessCode = "";
    for (let attempt = 0; attempt < 20; attempt++) {
      const candidate = generateCode();
      const existing = await sql`SELECT id FROM access_codes WHERE code = ${candidate} LIMIT 1`;
      if (existing.length === 0) { accessCode = candidate; break; }
    }
    if (!accessCode) return res.status(500).json({ error: "Gagal generate kode akses" });

    await sql`
      INSERT INTO access_codes (code, type, batch_number, is_used)
      VALUES (${accessCode}, ${order["member_type"]}, ${order["batch_number"]}, false)
    `;
    await sql`
      UPDATE orders SET status = 'paid', access_code = ${accessCode}, paid_at = NOW()
      WHERE order_id = ${orderId}
    `;

    return res.json({ success: true, accessCode });
  } catch (err) {
    console.error("[Mark Paid] Error:", err);
    return res.status(500).json({ error: "Gagal memproses pembayaran" });
  }
}
