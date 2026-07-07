export interface Coupon {
  code: string;
  discountAmount: number;
  applicableTo: "kelas" | "mandiri" | "all";
  validUntil: string;
  description: string;
  multiUse?: boolean; // jika true, bisa dipakai berkali-kali oleh email berbeda
}

export const ACTIVE_COUPONS: Coupon[] = [
  {
    code: "AIGYPT26",
    discountAmount: 51000,
    applicableTo: "kelas",
    validUntil: "2026-07-13T23:59:59+07:00",
    description: "Diskon spesial pendaftaran Batch 3",
  },
  {
    code: "HIFEST26",
    discountAmount: 74000,
    applicableTo: "kelas",
    validUntil: "2026-07-13T23:59:59+07:00",
    description: "Kupon HIFEST — diskon spesial Member Kelas Batch 3",
    multiUse: true,
  },
];

export function validateCoupon(
  code: string,
  memberType: "kelas" | "mandiri"
): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = ACTIVE_COUPONS.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );

  if (!coupon) {
    return { valid: false, error: "Kode kupon tidak ditemukan" };
  }

  const now = new Date();
  const expiry = new Date(coupon.validUntil);
  if (now > expiry) {
    return { valid: false, error: "Kode kupon sudah tidak berlaku" };
  }

  if (coupon.applicableTo !== "all" && coupon.applicableTo !== memberType) {
    return {
      valid: false,
      error: "Kupon ini hanya berlaku untuk Member Kelas",
    };
  }

  return { valid: true, coupon };
}
