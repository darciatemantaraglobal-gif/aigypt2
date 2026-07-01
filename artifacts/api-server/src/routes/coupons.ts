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
    // DB unreachable (e.g. ETIMEDOUT, table not yet created) — coupon itself is
    // already valid from validateCoupon above, so return valid rather than
    // blocking the user. Duplicate-use check is best-effort only.
    console.warn("[Coupons] DB check failed, falling back to valid:", (err as Error)?.message ?? err);
    res.json({
      valid: true,
      coupon: clientValidation.coupon,
    });
  }
});

export default router;
