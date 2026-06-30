import { Router } from "express";
import { db, materiProgressTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { verifySessionToken } from "./auth";

const router = Router();
const SESSION_COOKIE = "aigypt_session";
const DEFAULT_KELAS = "maksimalkan-ai";

async function getAuthEmail(req: any): Promise<string | null> {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) return null;
  const payload = await verifySessionToken(token);
  return payload?.email ?? null;
}

router.options("/progress", (_req, res) => {
  res.setHeader("Allow", "GET, POST");
  res.status(204).end();
});
router.get("/progress", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const kelasId = (req.query["kelasId"] as string) || undefined;

  const conditions = kelasId
    ? and(eq(materiProgressTable.memberEmail, email), eq(materiProgressTable.kelasId, kelasId))
    : eq(materiProgressTable.memberEmail, email);

  const progress = await db
    .select()
    .from(materiProgressTable)
    .where(conditions);

  res.json(
    progress.map((p) => ({
      sesiNumber: p.sesiNumber,
      kelasId: p.kelasId,
      isCompleted: p.isCompleted,
      completedAt: p.completedAt?.toISOString() ?? null,
      currentStep: p.currentStep,
      wasSkipped: p.wasSkipped,
    }))
  );
});

router.post("/progress", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const { sesiNumber, kelasId: rawKelasId } = req.body as { sesiNumber?: number; kelasId?: string };
  const kelasId = rawKelasId || DEFAULT_KELAS;

  if (!sesiNumber || sesiNumber < 1 || sesiNumber > 6) {
    res.status(400).json({ error: "Nomor sesi tidak valid (1-6)" });
    return;
  }

  await db
    .insert(materiProgressTable)
    .values({
      memberEmail: email,
      kelasId,
      sesiNumber,
      isCompleted: true,
      completedAt: new Date(),
      currentStep: 0,
      wasSkipped: false,
    })
    .onConflictDoNothing();

  await db
    .update(materiProgressTable)
    .set({ isCompleted: true, completedAt: new Date() })
    .where(
      and(
        eq(materiProgressTable.memberEmail, email),
        eq(materiProgressTable.kelasId, kelasId),
        eq(materiProgressTable.sesiNumber, sesiNumber)
      )
    );

  res.json({ success: true });
});

router.all("/progress", (_req, res) => {
  res.setHeader("Allow", "GET, POST, OPTIONS");
  res.status(405).json({ error: "Method Not Allowed" });
});

router.options("/progress/step", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(204).end();
});
router.post("/progress/step", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const { sesiNumber, currentStep, kelasId: rawKelasId } = req.body as {
    sesiNumber?: number;
    currentStep?: number;
    kelasId?: string;
  };
  const kelasId = rawKelasId || DEFAULT_KELAS;

  if (!sesiNumber || sesiNumber < 1 || sesiNumber > 6 || typeof currentStep !== "number") {
    res.status(400).json({ error: "Input tidak valid" });
    return;
  }

  const existing = await db
    .select()
    .from(materiProgressTable)
    .where(
      and(
        eq(materiProgressTable.memberEmail, email),
        eq(materiProgressTable.kelasId, kelasId),
        eq(materiProgressTable.sesiNumber, sesiNumber)
      )
    );

  if (existing.length === 0) {
    await db.insert(materiProgressTable).values({
      memberEmail: email,
      kelasId,
      sesiNumber,
      isCompleted: false,
      currentStep,
      wasSkipped: false,
    });
  } else {
    await db
      .update(materiProgressTable)
      .set({ currentStep })
      .where(
        and(
          eq(materiProgressTable.memberEmail, email),
          eq(materiProgressTable.kelasId, kelasId),
          eq(materiProgressTable.sesiNumber, sesiNumber)
        )
      );
  }

  res.json({ success: true });
});

router.all("/progress/step", (_req, res) => {
  res.setHeader("Allow", "POST, OPTIONS");
  res.status(405).json({ error: "Method Not Allowed" });
});

router.options("/progress/skip", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(204).end();
});
router.post("/progress/skip", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const { sesiNumber, kelasId: rawKelasId } = req.body as { sesiNumber?: number; kelasId?: string };
  const kelasId = rawKelasId || DEFAULT_KELAS;

  if (!sesiNumber || sesiNumber < 1 || sesiNumber > 6) {
    res.status(400).json({ error: "Nomor sesi tidak valid (1-6)" });
    return;
  }

  const existing = await db
    .select()
    .from(materiProgressTable)
    .where(
      and(
        eq(materiProgressTable.memberEmail, email),
        eq(materiProgressTable.kelasId, kelasId),
        eq(materiProgressTable.sesiNumber, sesiNumber)
      )
    );

  if (existing.length === 0) {
    await db.insert(materiProgressTable).values({
      memberEmail: email,
      kelasId,
      sesiNumber,
      isCompleted: false,
      currentStep: 0,
      wasSkipped: true,
    });
  } else {
    await db
      .update(materiProgressTable)
      .set({ wasSkipped: true })
      .where(
        and(
          eq(materiProgressTable.memberEmail, email),
          eq(materiProgressTable.kelasId, kelasId),
          eq(materiProgressTable.sesiNumber, sesiNumber)
        )
      );
  }

  res.json({ success: true });
});
router.all("/progress/skip", (_req, res) => {
  res.setHeader("Allow", "POST, OPTIONS");
  res.status(405).json({ error: "Method Not Allowed" });
});

export default router;
