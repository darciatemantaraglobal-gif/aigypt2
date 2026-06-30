import { Router } from "express";
import { db, ordersTable } from "@workspace/db";

const router = Router();

const PRICE_MANDIRI = parseInt(process.env["PRICE_MANDIRI"] ?? "250000", 10);
const PRICE_KELAS = parseInt(process.env["PRICE_KELAS"] ?? "350000", 10);
const BATCH_NUMBER = parseInt(process.env["BATCH_NUMBER"] ?? "1", 10);
const FONNTE_TOKEN = process.env["FONNTE_TOKEN"] ?? "";
const ADMIN_WA_NUMBER = process.env["ADMIN_WA_NUMBER"] ?? "";

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-QRIS-${ts}-${rand}`;
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

router.options("/qris/confirm", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(204).end();
});

router.post("/qris/confirm", async (req, res) => {
  const { name, email, phone, memberType } = req.body as {
    name?: string; email?: string; phone?: string; memberType?: string;
  };

  if (!name || !email || !phone || !memberType) {
    res.status(400).json({ error: "Semua field wajib diisi" });
    return;
  }

  if (!["mandiri", "kelas"].includes(memberType)) {
    res.status(400).json({ error: "Tipe member tidak valid" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Format email tidak valid" });
    return;
  }

  const grossAmount = memberType === "kelas" ? PRICE_KELAS : PRICE_MANDIRI;
  const orderId = generateOrderId();
  const normalizedPhone = phone.replace(/^\+62/, "0").replace(/^62/, "0").replace(/\D/g, "");
  const memberLabel = memberType === "kelas" ? "Member Kelas - Batch 1" : "Member Mandiri - Batch 1";

  try {
    await db.insert(ordersTable).values({
      orderId,
      name,
      email: email.toLowerCase(),
      phone: normalizedPhone,
      memberType,
      batchNumber: BATCH_NUMBER,
      grossAmount,
      status: "pending_qris",
      snapToken: null,
    });

    if (ADMIN_WA_NUMBER) {
      const rpAmount = `Rp ${grossAmount.toLocaleString("id-ID")}`;
      const adminMsg =
        `[AIGYPT QRIS] Konfirmasi Pembayaran Baru\n\n` +
        `Nama: ${name}\n` +
        `Email: ${email}\n` +
        `WhatsApp: ${normalizedPhone}\n` +
        `Paket: ${memberLabel}\n` +
        `Nominal: ${rpAmount}\n` +
        `Order ID: ${orderId}\n\n` +
        `Mohon verifikasi transfer QRIS Temantiket dan kirimkan kode akses ke peserta.`;
      await sendWhatsApp(ADMIN_WA_NUMBER, adminMsg);
    }

    res.json({ orderId, status: "pending_qris" });
  } catch (err) {
    console.error("[QRIS] Error:", err);
    res.status(500).json({ error: "Gagal menyimpan konfirmasi. Coba lagi." });
  }
});

export default router;
