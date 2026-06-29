import { Router } from "express";
import { db, materiProgressTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { verifySessionToken } from "./auth";

const router = Router();
const SESSION_COOKIE = "aigypt_session";

async function getAuthEmail(req: any): Promise<string | null> {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) return null;
  const payload = await verifySessionToken(token);
  return payload?.email ?? null;
}

router.get("/progress", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const progress = await db
    .select()
    .from(materiProgressTable)
    .where(eq(materiProgressTable.memberEmail, email));

  res.json(
    progress.map((p) => ({
      sesiNumber: p.sesiNumber,
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

  const { sesiNumber } = req.body as { sesiNumber?: number };
  if (!sesiNumber || sesiNumber < 1 || sesiNumber > 6) {
    res.status(400).json({ error: "Nomor sesi tidak valid (1-6)" });
    return;
  }

  await db
    .insert(materiProgressTable)
    .values({
      memberEmail: email,
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
        eq(materiProgressTable.sesiNumber, sesiNumber)
      )
    );

  res.json({ success: true });
});

router.post("/progress/step", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const { sesiNumber, currentStep } = req.body as { sesiNumber?: number; currentStep?: number };
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
        eq(materiProgressTable.sesiNumber, sesiNumber)
      )
    );

  if (existing.length === 0) {
    await db.insert(materiProgressTable).values({
      memberEmail: email,
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
          eq(materiProgressTable.sesiNumber, sesiNumber)
        )
      );
  }

  res.json({ success: true });
});

router.post("/progress/skip", async (req, res) => {
  const email = await getAuthEmail(req);
  if (!email) {
    res.status(401).json({ error: "Tidak terautentikasi" });
    return;
  }

  const { sesiNumber } = req.body as { sesiNumber?: number };
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
        eq(materiProgressTable.sesiNumber, sesiNumber)
      )
    );

  if (existing.length === 0) {
    await db.insert(materiProgressTable).values({
      memberEmail: email,
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
          eq(materiProgressTable.sesiNumber, sesiNumber)
        )
      );
  }

  res.json({ success: true });
});

export default router;
