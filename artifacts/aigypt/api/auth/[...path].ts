import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db";
import { SignJWT, jwtVerify } from "jose";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();

  const segments = ([] as string[]).concat((req.query["path"] as string | string[] | undefined) ?? []);
  const [section] = segments;

  // ---- LOGIN ----
  if (section === "login" && req.method === "POST") {
    const { email, code } = req.body as { email?: string; code?: string };
    if (!email || !code) return res.status(400).json({ error: "Email dan kode akses wajib diisi" });

    try {
      const rows = await sql`
        SELECT order_id, name, email, member_type, batch_number, status, access_code
        FROM orders
        WHERE email = ${email.toLowerCase().trim()}
          AND access_code = ${code.trim()}
          AND status = 'paid'
        LIMIT 1
      `;
      if (!rows.length) return res.status(401).json({ error: "Email atau kode akses tidak valid" });

      const order = rows[0]!;
      const jwtSecret = process.env["JWT_SECRET"];
      if (!jwtSecret) return res.status(503).json({ error: "JWT_SECRET belum dikonfigurasi" });
      const secret = new TextEncoder().encode(jwtSecret);
      const token = await new SignJWT({
        orderId: order["order_id"], email: order["email"],
        memberType: order["member_type"], batchNumber: order["batch_number"],
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(secret);

      return res.json({
        token,
        user: {
          orderId: order["order_id"], name: order["name"], email: order["email"],
          memberType: order["member_type"], batchNumber: order["batch_number"], status: order["status"],
        },
      });
    } catch (err) {
      console.error("[Auth Login] Error:", err);
      return res.status(500).json({ error: "Terjadi kesalahan server. Coba lagi." });
    }
  }

  // ---- LOGOUT ----
  if (section === "logout" && req.method === "POST") {
    return res.json({ success: true });
  }

  // ---- ME ----
  if (section === "me" && req.method === "GET") {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.slice(7);

    try {
      const jwtSecret = process.env["JWT_SECRET"];
      if (!jwtSecret) return res.status(503).json({ error: "JWT_SECRET belum dikonfigurasi" });
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jwtVerify(token, secret);
      const orderId = payload["orderId"] as string;

      const rows = await sql`
        SELECT order_id, name, email, member_type, batch_number, status, access_code
        FROM orders WHERE order_id = ${orderId} LIMIT 1
      `;
      if (!rows.length) return res.status(404).json({ error: "Order tidak ditemukan" });

      const order = rows[0]!;
      return res.json({
        orderId: order["order_id"], name: order["name"], email: order["email"],
        memberType: order["member_type"], batchNumber: order["batch_number"],
        status: order["status"], accessCode: order["access_code"] ?? null,
      });
    } catch {
      return res.status(401).json({ error: "Token tidak valid atau sudah expired" });
    }
  }

  return res.status(404).json({ error: "Route tidak ditemukan" });
}
