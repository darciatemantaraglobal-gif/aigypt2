import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Coupon {
  code: string;
  discountAmount: number;
  applicableTo: "kelas" | "mandiri" | "all";
  validUntil: string;
  description: string;
}

const ACTIVE_COUPONS: Coupon[] = [
  {
    code: "AIGYPT26",
    discountAmount: 51000,
    applicableTo: "kelas",
    validUntil: "2026-07-15T23:59:59+07:00",
    description: "Diskon spesial pendaftaran Batch 3",
  },
];

function validateCoupon(code: string, memberType: "kelas" | "mandiri") {
  const coupon = ACTIVE_COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );
  if (!coupon) return { valid: false, error: "Kode kupon tidak ditemukan" };

  const now = new Date();
  const expiry = new Date(coupon.validUntil);
  if (now > expiry) return { valid: false, error: "Kode kupon sudah tidak berlaku" };

  if (coupon.applicableTo !== "all" && coupon.applicableTo !== memberType) {
    return { valid: false, error: "Kupon ini hanya berlaku untuk Member Kelas" };
  }

  return { valid: true, coupon };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ valid: false, error: "Method not allowed" });

  const { code, email, memberType } = req.body as {
    code?: string;
    email?: string;
    memberType?: string;
  };

  if (!code || !email || !memberType) {
    return res.status(400).json({ valid: false, error: "Data tidak lengkap" });
  }

  const result = validateCoupon(code, memberType as "kelas" | "mandiri");
  if (!result.valid) {
    return res.json({ valid: false, error: result.error });
  }

  return res.json({ valid: true, coupon: result.coupon });
}
