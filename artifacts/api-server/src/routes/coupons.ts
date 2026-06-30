import { Router } from "express";
import { db, couponUsageTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { validateCoupon } from "../lib/coupons";

const router = Router();

router.options("/coupons/check", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(204).end();
});

router.post("/coupons/check", async (req, res) => {
  const { code, email, memberType } = req.body as {
    code?: string;
    email?: string;
    memberType?: string;
  };

  if (!code || !email || !memberType) {
    res.status(400).json({ valid: false, error: "Data tidak lengkap" });
    return;
  }

  const clientValidation = validateCoupon(code, memberType as "kelas" | "mandiri");
  if (!clientValidation.valid) {
    res.status(200).json({ valid: false, error: clientValidation.error });
    return;
  }

  try {
    const existing = await db
      .select({ id: couponUsageTable.id })
      .from(couponUsageTable)
      .where(
        and(
          eq(couponUsageTable.couponCode, code.toUpperCase()),
          eq(couponUsageTable.email, email.toLowerCase())
        )
      )
      .limit(1);

    if (existing.length > 0) {
      res.status(200).json({
        valid: false,
        error: "Kupon ini sudah pernah kamu gunakan",
      });
      return;
    }

    res.json({
      valid: true,
      coupon: clientValidation.coupon,
    });
  } catch (err) {
    console.error("[Coupons] Error:", err);
    res.status(500).json({ valid: false, error: "Gagal memvalidasi kupon. Coba lagi." });
  }
});

export default router;
