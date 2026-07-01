import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

interface Coupon {
  code: string;
  discountAmount: number;
  applicableTo: "kelas" | "mandiri" | "all";
  validUntil: string;
}

const ACTIVE_COUPONS: Coupon[] = [
  {
    code: "AIGYPT26",
    discountAmount: 51000,
    applicableTo: "kelas",
    validUntil: "2026-07-15T23:59:59+07:00",
  },
];

const PRICE: Record<string, number> = { mandiri: 200000, kelas: 150000 };
const BATCH_NUMBER = 3;
const FONNTE_TOKEN = process.env["FONNTE_TOKEN"] ?? "";
const ADMIN_WA_NUMBER = process.env["ADMIN_WA_NUMBER"] ?? "";

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-QRIS-${ts}-${rand}`;
}

function validateCoupon(code: string, memberType: "kelas" | "mandiri") {
  const coupon = ACTIVE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) return { valid: false as const, error: "Kode kupon tidak ditemukan" };
  if (new Date() > new Date(coupon.validUntil)) return { valid: false as const, error: "Kode kupon sudah tidak berlaku" };
  if (coupon.applicableTo !== "all" && coupon.applicableTo !== memberType) {
    return { valid: false as const, error: "Kupon ini hanya berlaku untuk Member Kelas" };
  }
  return { valid: true as const, coupon };
}

async function sendWhatsApp(target: string, message: string): Promise<void> {
  if (!FONNTE_TOKEN || !target) return;
  try {
    await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: { Authorization: FONNTE_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ target, message }),
    });
  } catch (err) {
    console.error("[WA] Gagal kirim:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, memberType, couponCode } = req.body as {
    name?: string; email?: string; phone?: string; memberType?: string; couponCode?: string;
  };

  if (!name || !email || !phone || !memberType) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }
  if (!["mandiri", "kelas"].includes(memberType)) {
    return res.status(400).json({ error: "Tipe member tidak valid" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid" });
  }

  const grossAmount = PRICE[memberType] ?? 150000;
  const normalizedEmail = email.toLowerCase();
  const normalizedPhone = phone.replace(/^\+62/, "0").replace(/^62/, "0").replace(/\D/g, "");

  let appliedCouponCode: string | null = null;
  let discountAmount = 0;
  let finalAmount = grossAmount;

  if (couponCode?.trim()) {
    const codeUpper = couponCode.trim().toUpperCase();
    const result = validateCoupon(codeUpper, memberType as "kelas" | "mandiri");
    if (!result.valid || !result.coupon) {
      return res.status(400).json({ error: result.error ?? "Kode kupon tidak valid" });
    }
    appliedCouponCode = codeUpper;
    discountAmount = result.coupon.discountAmount;
    finalAmount = Math.max(0, grossAmount - discountAmount);
  }

  const orderId = generateOrderId();
  const memberLabel = memberType === "kelas"
    ? `Member Kelas - Batch ${BATCH_NUMBER}`
    : `Member Mandiri - Batch ${BATCH_NUMBER}`;

  try {
    const sql = neon(process.env["DATABASE_URL"]!);

    await sql`
      INSERT INTO orders (order_id, name, email, phone, member_type, batch_number, gross_amount, coupon_code, discount_amount, final_amount, status)
      VALUES (${orderId}, ${name}, ${normalizedEmail}, ${normalizedPhone}, ${memberType}, ${BATCH_NUMBER}, ${grossAmount}, ${appliedCouponCode}, ${discountAmount}, ${finalAmount}, 'pending_qris')
    `;

    if (appliedCouponCode) {
      try {
        await sql`
          INSERT INTO coupon_usage (coupon_code, email, order_id, discount_amount)
          VALUES (${appliedCouponCode}, ${normalizedEmail}, ${orderId}, ${discountAmount})
        `;
      } catch (err) {
        console.error("[Coupon Usage] Gagal catat:", err);
      }
    }

    if (ADMIN_WA_NUMBER) {
      const rpFinal = `Rp ${finalAmount.toLocaleString("id-ID")}`;
      const couponInfo = appliedCouponCode
        ? `\nKupon: ${appliedCouponCode} (-Rp ${discountAmount.toLocaleString("id-ID")})`
        : "";
      await sendWhatsApp(
        ADMIN_WA_NUMBER,
        `[AIGYPT QRIS] Order Baru\n\nNama: ${name}\nEmail: ${email}\nWA: ${normalizedPhone}\nPaket: ${memberLabel}${couponInfo}\nNominal: ${rpFinal}\nOrder ID: ${orderId}\n\nMohon verifikasi dan kirim kode akses.`
      );
    }

    return res.json({ orderId, status: "pending_qris", finalAmount, discountAmount, couponCode: appliedCouponCode });
  } catch (err) {
    console.error("[QRIS] Error:", err);
    return res.status(500).json({ error: "Gagal menyimpan order. Coba lagi." });
  }
}
