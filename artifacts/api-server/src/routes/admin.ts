import { Router } from "express";
import { db, accessCodesTable } from "@workspace/db";

const router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "aigypt-admin-2025";

function checkAdminAuth(req: any): boolean {
  const authHeader = req.headers["authorization"];
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7) === ADMIN_PASSWORD;
  }
  const cookiePassword = req.cookies?.["aigypt_admin"];
  return cookiePassword === ADMIN_PASSWORD;
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `AIGYPT-${code}`;
}

router.post("/admin/generate-codes", async (req, res) => {
  if (!checkAdminAuth(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { type, batchNumber, count } = req.body as {
    type?: string;
    batchNumber?: number | null;
    count?: number;
  };

  if (!type || !["mandiri", "kelas"].includes(type)) {
    res.status(400).json({ error: "Tipe harus 'mandiri' atau 'kelas'" });
    return;
  }

  if (!count || count < 1 || count > 100) {
    res.status(400).json({ error: "Jumlah kode harus antara 1 dan 100" });
    return;
  }

  const codes: string[] = [];
  const maxAttempts = count * 10;
  let attempts = 0;

  while (codes.length < count && attempts < maxAttempts) {
    attempts++;
    const code = generateCode();
    try {
      await db.insert(accessCodesTable).values({
        code,
        type,
        batchNumber: batchNumber ?? null,
        isUsed: false,
      });
      codes.push(code);
    } catch {
    }
  }

  res.json({ codes });
});

router.get("/admin/codes", async (req, res) => {
  if (!checkAdminAuth(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const codes = await db
    .select()
    .from(accessCodesTable)
    .orderBy(accessCodesTable.createdAt);

  res.json(
    codes.map((c) => ({
      id: c.id,
      code: c.code,
      type: c.type,
      batchNumber: c.batchNumber ?? null,
      isUsed: c.isUsed,
      usedByEmail: c.usedByEmail ?? null,
      usedAt: c.usedAt?.toISOString() ?? null,
      createdAt: c.createdAt.toISOString(),
      expiresAt: c.expiresAt?.toISOString() ?? null,
    }))
  );
});

router.post("/admin/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (password === ADMIN_PASSWORD) {
    res.cookie("aigypt_admin", password, {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Password salah" });
  }
});

export default router;
