import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SignJWT } from "jose";
import { sql } from "../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, accessCode } = req.body as { email?: string; accessCode?: string };
  if (!email || !accessCode) {
    return res.status(400).json({ error: "Email dan kode akses wajib diisi" });
  }

  try {
    const rows = await sql`
      SELECT order_id, name, email, member_type, batch_number, status, access_code
      FROM orders
      WHERE email = ${email.toLowerCase().trim()}
        AND access_code = ${accessCode.trim()}
        AND status = 'paid'
      LIMIT 1
    `;

    if (!rows.length) {
      return res.status(401).json({ error: "Email atau kode akses tidak valid" });
    }

    const order = rows[0]!;
    const secret = new TextEncoder().encode(process.env["JWT_SECRET"] ?? "aigypt-secret-key");
    const token = await new SignJWT({
      orderId: order["order_id"],
      email: order["email"],
      memberType: order["member_type"],
      batchNumber: order["batch_number"],
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    return res.json({
      token,
      user: {
        orderId: order["order_id"],
        name: order["name"],
        email: order["email"],
        memberType: order["member_type"],
        batchNumber: order["batch_number"],
        status: order["status"],
      },
    });
  } catch (err) {
    console.error("[Login] Error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server. Coba lagi." });
  }
}
