import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdmin } from "../_lib/adminAuth";
import { sql } from "../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!(await verifyAdmin(req))) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [totalMembers, unusedCodes, pendingOrders, paidOrders, recentOrders] = await Promise.all([
      sql`SELECT COUNT(*)::int AS c FROM members`,
      sql`SELECT COUNT(*)::int AS c FROM access_codes WHERE is_used = false`,
      sql`SELECT COUNT(*)::int AS c FROM orders WHERE status = 'pending_qris'`,
      sql`SELECT COUNT(*)::int AS c FROM orders WHERE status = 'paid'`,
      sql`SELECT order_id, name, email, member_type, status, amount, created_at FROM orders ORDER BY created_at DESC LIMIT 5`,
    ]);

    return res.json({
      totalMembers: totalMembers[0]?.["c"] ?? 0,
      unusedCodes: unusedCodes[0]?.["c"] ?? 0,
      pendingOrders: pendingOrders[0]?.["c"] ?? 0,
      paidOrders: paidOrders[0]?.["c"] ?? 0,
      recentOrders: recentOrders.map((o) => ({
        orderId: o["order_id"],
        name: o["name"],
        email: o["email"],
        memberType: o["member_type"],
        status: o["status"],
        grossAmount: o["amount"],
        createdAt: o["created_at"],
      })),
    });
  } catch (err) {
    console.error("[Admin Dashboard] Error:", err);
    return res.status(500).json({ error: "Gagal memuat statistik" });
  }
}
