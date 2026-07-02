import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdmin } from "../../_lib/adminAuth";
import { sql } from "../../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  const { status, type } = req.query as Record<string, string>;

  try {
    const whereClauses: string[] = [];
    const vals: string[] = [];
    let idx = 1;
    if (status && status !== "all") { whereClauses.push(`status = $${idx++}`); vals.push(status); }
    if (type && type !== "all") { whereClauses.push(`member_type = $${idx++}`); vals.push(type); }
    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const orders = await sql.unsafe(`SELECT * FROM orders ${whereSql} ORDER BY created_at DESC`, vals) as unknown as Record<string, unknown>[];

    return res.json({
      orders: orders.map((o) => ({
        id: o["id"], orderId: o["order_id"], name: o["name"], email: o["email"], phone: o["phone"],
        memberType: o["member_type"], batchNumber: o["batch_number"], grossAmount: o["amount"],
        couponCode: o["coupon_code"], discountAmount: o["discount_amount"], finalAmount: o["final_amount"],
        status: o["status"], accessCode: o["access_code"], paidAt: o["paid_at"], createdAt: o["created_at"],
      })),
    });
  } catch (err) {
    console.error("[Orders List] Error:", err);
    return res.status(500).json({ error: "Gagal memuat order" });
  }
}
