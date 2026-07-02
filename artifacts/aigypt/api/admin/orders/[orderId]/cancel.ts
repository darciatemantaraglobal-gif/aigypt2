import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdmin } from "../../../_lib/adminAuth";
import { sql } from "../../../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { orderId } = req.query as { orderId?: string };
  if (!orderId) return res.status(400).json({ error: "Order ID tidak valid" });

  try {
    const orders = await sql`SELECT id FROM orders WHERE order_id = ${orderId} LIMIT 1`;
    if (!orders.length) return res.status(404).json({ error: "Order tidak ditemukan" });

    await sql`UPDATE orders SET status = 'cancelled' WHERE order_id = ${orderId}`;
    return res.json({ success: true });
  } catch (err) {
    console.error("[Cancel Order] Error:", err);
    return res.status(500).json({ error: "Gagal membatalkan order" });
  }
}
