import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, ordersTable, couponUsageTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

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

const PRICE: Record<string, number> = {
  mandiri: 200000,
  kelas: 150000,
};

const BATCH_NUMBER = parseInt(process.env["BATCH_NUMBER"] ?? "3", 10);
const FONNTE_TOKEN = process.env["FONNTE_TOKEN"] ?? "";
const ADMIN_WA_NUMBER = process.env["ADMIN_WA_NUMBER"] ?? "";

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-QRIS-${ts}-${rand}`;
}

function validateCoupon(code: string, memberType: "kelas" | "mandiri") {
  const coupon = ACTIVE_COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );
  if (!coupon) return { valid: false, error: "Kode kupon tidak ditemukan" };
  const now = new Date();
  if (now > new Date(coupon.validUntil)) return { valid: false, error: "Kode kupon sudah tidak berlaku" };
  if (coupon.applicableTo !== "all" && coupon.applicableTo !== memberType) {
    return { valid: false, error: "Kupon ini hanya berlaku untuk Member Kelas" };
  }
  return { valid: true, coupon };
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
    console.error("[QRIS WA] Gagal kirim:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
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
    const couponResult = validateCoupon(codeUpper, memberType as "kelas" | "mandiri");
    if (!couponResult.valid || !couponResult.coupon) {
      return res.status(400).json({ error: couponResult.error ?? "Kode kupon tidak valid" });
    }

    // Cek apakah email sudah pernah pakai kupon ini
    try {
      const alreadyUsed = await db
        .select({ id: couponUsageTable.id })
        .from(couponUsageTable)
        .where(and(
          eq(couponUsageTable.couponCode, codeUpper),
          eq(couponUsageTable.email, normalizedEmail)
        ))
        .limit(1);

      if (alreadyUsed.length > 0) {
        return res.status(400).json({ error: "Kupon ini sudah pernah kamu gunakan" });
      }
    } catch (err) {
      // DB unreachable — skip duplicate check, lanjut dengan kupon
      console.warn("[QRIS] Gagal cek duplikasi kupon:", (err as Error)?.message);
    }

    appliedCouponCode = codeUpper;
    discountAmount = couponResult.coupon.discountAmount;
    finalAmount = Math.max(0, grossAmount - discountAmount);
  }

  const orderId = generateOrderId();
  const memberLabel = memberType === "kelas"
    ? `Member Kelas - Batch ${BATCH_NUMBER}`
    : `Member Mandiri - Batch ${BATCH_NUMBER}`;

  try {
    await db.insert(ordersTable).values({
      orderId,
      name,
      email: normalizedEmail,
      phone: normalizedPhone,
      memberType,
      batchNumber: BATCH_NUMBER,
      grossAmount,
      couponCode: appliedCouponCode,
      discountAmount,
      finalAmount,
      status: "pending_qris",
      snapToken: null,
    });

    if (appliedCouponCode) {
      try {
        await db.insert(couponUsageTable).values({
          couponCode: appliedCouponCode,
          email: normalizedEmail,
          orderId,
          discountAmount,
        });
      } catch (err) {
        console.error("[QRIS Coupon] Gagal catat usage:", err);
      }
    }

    if (ADMIN_WA_NUMBER) {
      const rpFinal = `Rp ${finalAmount.toLocaleString("id-ID")}`;
      const couponInfo = appliedCouponCode
        ? `\nKupon: ${appliedCouponCode} (-Rp ${discountAmount.toLocaleString("id-ID")})`
        : "";
      const adminMsg =
        `[AIGYPT QRIS] Konfirmasi Pembayaran Baru\n\n` +
        `Nama: ${name}\nEmail: ${email}\nWhatsApp: ${normalizedPhone}\n` +
        `Paket: ${memberLabel}${couponInfo}\nNominal: ${rpFinal}\nOrder ID: ${orderId}\n\n` +
        `Mohon verifikasi transfer QRIS Temantiket dan kirimkan kode akses ke peserta.`;
      await sendWhatsApp(ADMIN_WA_NUMBER, adminMsg);
    }

    return res.json({ orderId, status: "pending_qris", finalAmount, discountAmount, couponCode: appliedCouponCode });
  } catch (err) {
    console.error("[QRIS] Error:", err);
    return res.status(500).json({ error: "Gagal menyimpan konfirmasi. Coba lagi." });
  }
}
