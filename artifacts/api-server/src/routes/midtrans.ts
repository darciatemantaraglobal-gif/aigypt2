import { Router } from "express";
import { db, ordersTable, accessCodesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { createHash } from "crypto";

const router = Router();

const MIDTRANS_SERVER_KEY = process.env["MIDTRANS_SERVER_KEY"] ?? "";
const MIDTRANS_IS_PRODUCTION = process.env["MIDTRANS_IS_PRODUCTION"] === "true";
const FONNTE_TOKEN = process.env["FONNTE_TOKEN"] ?? "";
const ADMIN_WA_NUMBER = process.env["ADMIN_WA_NUMBER"] ?? "";
const PRICE_MANDIRI = parseInt(process.env["PRICE_MANDIRI"] ?? "250000", 10);
const PRICE_KELAS = parseInt(process.env["PRICE_KELAS"] ?? "350000", 10);
const BATCH_NUMBER = parseInt(process.env["BATCH_NUMBER"] ?? "1", 10);

const SNAP_BASE_URL = MIDTRANS_IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1"
  : "https://app.sandbox.midtrans.com/snap/v1";

function generateOrderId(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AIGYPT-${ts}-${rand}`;
}

function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AIGYPT-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function sendWhatsApp(target: string, message: string): Promise<void> {
  if (!FONNTE_TOKEN) {
    console.log("[WhatsApp] FONNTE_TOKEN tidak diset, skip:", target);
    return;
  }
  try {
    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: FONNTE_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target, message }),
    });
    const data = await res.json();
    console.log("[WhatsApp] Terkirim ke", target, ":", data);
  } catch (err) {
    console.error("[WhatsApp] Gagal kirim:", err);
  }
}

router.options("/midtrans/create-transaction", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(204).end();
});
router.post("/midtrans/create-transaction", async (req, res) => {
  const { name, email, phone, memberType } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    memberType?: string;
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

  if (!MIDTRANS_SERVER_KEY) {
    res.status(500).json({ error: "Payment gateway belum dikonfigurasi" });
    return;
  }

  const grossAmount = memberType === "kelas" ? PRICE_KELAS : PRICE_MANDIRI;
  const orderId = generateOrderId();
  const normalizedPhone = phone.replace(/^\+62/, "0").replace(/^62/, "0").replace(/\D/g, "");
  const memberLabel = memberType === "kelas" ? "AIGYPT Member Kelas - Batch 1" : "AIGYPT Member Mandiri - Batch 1";

  const payload = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: name,
      email: email.toLowerCase(),
      phone: normalizedPhone,
    },
    item_details: [
      {
        id: memberType,
        price: grossAmount,
        quantity: 1,
        name: memberLabel,
      },
    ],
    callbacks: {
      finish: `${process.env["FRONTEND_URL"] ?? ""}/sukses`,
      error: `${process.env["FRONTEND_URL"] ?? ""}/sukses?status=error`,
      pending: `${process.env["FRONTEND_URL"] ?? ""}/sukses?status=pending`,
    },
  };

  const authHeader = "Basic " + Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");

  try {
    const snapRes = await fetch(`${SNAP_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!snapRes.ok) {
      const errText = await snapRes.text();
      console.error("[Midtrans] Snap error:", errText);
      res.status(500).json({ error: "Gagal membuat transaksi pembayaran" });
      return;
    }

    const snapData = (await snapRes.json()) as { token: string; redirect_url: string };

    await db.insert(ordersTable).values({
      orderId,
      name,
      email: email.toLowerCase(),
      phone: normalizedPhone,
      memberType,
      batchNumber: BATCH_NUMBER,
      grossAmount,
      status: "pending",
      snapToken: snapData.token,
    });

    res.json({
      snapToken: snapData.token,
      orderId,
      snapUrl: snapData.redirect_url,
    });
  } catch (err) {
    console.error("[Midtrans] Error:", err);
    res.status(500).json({ error: "Gagal menghubungi payment gateway" });
  }
});

router.all("/midtrans/create-transaction", (_req, res) => {
  res.setHeader("Allow", "POST, OPTIONS");
  res.status(405).json({ error: "Method Not Allowed" });
});

router.options("/midtrans/webhook", (_req, res) => {
  res.setHeader("Allow", "POST");
  res.status(204).end();
});
router.post("/midtrans/webhook", async (req, res) => {
  const body = req.body as {
    order_id?: string;
    status_code?: string;
    gross_amount?: string;
    signature_key?: string;
    transaction_status?: string;
    fraud_status?: string;
    transaction_id?: string;
  };

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    fraud_status,
    transaction_id,
  } = body;

  const respond = () => res.status(200).json({ success: true });

  if (!order_id || !status_code || !gross_amount || !signature_key) {
    console.error("[Webhook] Field tidak lengkap:", body);
    respond();
    return;
  }

  const expected = createHash("sha512")
    .update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
    .digest("hex");

  if (expected !== signature_key) {
    console.error("[Webhook] Signature tidak valid untuk order:", order_id);
    respond();
    return;
  }

  let order;
  try {
    [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, order_id));
  } catch (err) {
    console.error("[Webhook] DB error:", err);
    respond();
    return;
  }

  if (!order) {
    console.error("[Webhook] Order tidak ditemukan:", order_id);
    respond();
    return;
  }

  if (order.status === "paid") {
    console.log("[Webhook] Order sudah dibayar (idempotent):", order_id);
    respond();
    return;
  }

  const isPaid =
    (transaction_status === "settlement" || transaction_status === "capture") &&
    fraud_status !== "deny";
  const isFailed =
    transaction_status === "expire" ||
    transaction_status === "cancel" ||
    transaction_status === "deny";

  if (isPaid) {
    let accessCode = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 20) {
      const candidate = generateAccessCode();
      try {
        const [existing] = await db
          .select()
          .from(accessCodesTable)
          .where(eq(accessCodesTable.code, candidate));
        if (!existing) {
          accessCode = candidate;
          isUnique = true;
        }
      } catch {
        break;
      }
      attempts++;
    }

    if (!accessCode) {
      console.error("[Webhook] Gagal generate kode akses unik untuk:", order_id);
      respond();
      return;
    }

    try {
      await db.insert(accessCodesTable).values({
        code: accessCode,
        type: order.memberType,
        batchNumber: order.batchNumber,
        isUsed: false,
        orderId: order_id,
      });

      await db
        .update(ordersTable)
        .set({
          status: "paid",
          accessCode,
          midtransTransactionId: transaction_id,
          paidAt: new Date(),
        })
        .where(eq(ordersTable.orderId, order_id));
    } catch (err) {
      console.error("[Webhook] Gagal simpan ke DB:", err);
      respond();
      return;
    }

    const memberLabel = order.memberType === "kelas" ? "Member Kelas" : "Member Mandiri";

    const pesertaMessage =
      `Assalamualaikum ${order.name}! 🎉\n\n` +
      `Pembayaran AIGYPT Class Batch 1 kamu sudah dikonfirmasi.\n\n` +
      `Paket: *${memberLabel}*\n` +
      `Kode Akses: *${accessCode}*\n\n` +
      `Cara login:\n` +
      `1. Buka aigypt.id/login\n` +
      `2. Masukkan email: ${order.email}\n` +
      `3. Masukkan kode akses di atas\n\n` +
      `Simpan kode ini baik-baik ya. Selamat belajar! 🚀\n\n` +
      `— Tim AIGYPT`;

    await sendWhatsApp(order.phone, pesertaMessage);

    if (ADMIN_WA_NUMBER) {
      const adminMessage =
        `✅ *Pembayaran Baru AIGYPT*\n\n` +
        `Nama: ${order.name}\n` +
        `Email: ${order.email}\n` +
        `WA: ${order.phone}\n` +
        `Paket: ${memberLabel}\n` +
        `Amount: Rp ${parseInt(gross_amount).toLocaleString("id-ID")}\n` +
        `Kode: ${accessCode}\n` +
        `Order ID: ${order_id}`;
      await sendWhatsApp(ADMIN_WA_NUMBER, adminMessage);
    }
  } else if (isFailed) {
    try {
      await db
        .update(ordersTable)
        .set({ status: transaction_status ?? "failed" })
        .where(eq(ordersTable.orderId, order_id));
    } catch (err) {
      console.error("[Webhook] Gagal update status failed:", err);
    }
  }

  respond();
});
router.all("/midtrans/webhook", (_req, res) => {
  res.setHeader("Allow", "POST, OPTIONS");
  res.status(405).json({ error: "Method Not Allowed" });
});

export default router;
