import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function IconSuccess() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="rgba(124,58,237,0.15)" />
      <circle cx="28" cy="28" r="20" stroke="rgba(124,58,237,0.5)" strokeWidth="1" fill="none" />
      <polyline points="18,28 25,35 38,21" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IconPending() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="rgba(245,158,11,0.1)" />
      <circle cx="28" cy="28" r="20" stroke="rgba(245,158,11,0.4)" strokeWidth="1" fill="none" />
      <circle cx="28" cy="28" r="9" stroke="#F59E0B" strokeWidth="2" fill="none" />
      <path d="M28 23v5l3 3" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconError() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill="rgba(239,68,68,0.1)" />
      <circle cx="28" cy="28" r="20" stroke="rgba(239,68,68,0.35)" strokeWidth="1" fill="none" />
      <path d="M22 22l12 12M34 22l-12 12" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

type Scenario = "success" | "pending" | "error";

export default function Sukses() {
  const [scenario, setScenario] = useState<Scenario>("pending");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionStatus = params.get("transaction_status");
    const status = params.get("status");
    const orderIdParam = params.get("order_id");

    if (orderIdParam) setOrderId(orderIdParam);

    if (status === "error") {
      setScenario("error");
    } else if (transactionStatus === "settlement" || transactionStatus === "capture") {
      setScenario("success");
    } else if (transactionStatus === "pending" || status === "pending") {
      setScenario("pending");
    } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
      setScenario("error");
    } else {
      setScenario("pending");
    }
  }, []);

  const content = {
    success: {
      icon: <IconSuccess />,
      glowColor: "rgba(124,58,237,0.25)",
      badge: "PEMBAYARAN BERHASIL",
      badgeColor: "#A855F7",
      badgeBg: "rgba(124,58,237,0.12)",
      badgeBorder: "rgba(124,58,237,0.25)",
      heading: "Selamat, kamu resmi bergabung!",
      sub: "Kode akses sedang dikirimkan ke WhatsApp kamu.",
      info: "Proses pengiriman maksimal 5 menit. Cek WhatsApp kamu dan pastikan nomormu aktif.",
      action: { label: "Masuk ke AIGYPT", href: "/login" },
      actionStyle: { background: "#7C3AED" } as React.CSSProperties,
    },
    pending: {
      icon: <IconPending />,
      glowColor: "rgba(245,158,11,0.15)",
      badge: "MENUNGGU PEMBAYARAN",
      badgeColor: "#F59E0B",
      badgeBg: "rgba(245,158,11,0.08)",
      badgeBorder: "rgba(245,158,11,0.2)",
      heading: "Selesaikan Pembayaranmu",
      sub: "Ikuti instruksi pembayaran yang diberikan oleh Midtrans.",
      info: "Kode akses akan dikirim ke WhatsApp kamu segera setelah pembayaran dikonfirmasi oleh sistem.",
      action: { label: "Kembali ke Beranda", href: "/" },
      actionStyle: { border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA" } as React.CSSProperties,
    },
    error: {
      icon: <IconError />,
      glowColor: "rgba(239,68,68,0.12)",
      badge: "PEMBAYARAN GAGAL",
      badgeColor: "#EF4444",
      badgeBg: "rgba(239,68,68,0.07)",
      badgeBorder: "rgba(239,68,68,0.2)",
      heading: "Pembayaran Tidak Berhasil",
      sub: "Terjadi masalah dengan pembayaran kamu.",
      info: "Tidak ada biaya yang dikenakan. Kamu bisa mencoba kembali kapan saja.",
      action: { label: "Coba Lagi", href: "/daftar" },
      actionStyle: { background: "#7C3AED" } as React.CSSProperties,
    },
  };

  const c = content[scenario];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="relative max-w-md w-full">
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "400px",
              height: "300px",
              background: `radial-gradient(ellipse at center, ${c.glowColor} 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center px-5 py-8 sm:px-8 sm:py-10"
            style={{
              background: "rgba(10,10,15,0.9)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c.badgeBorder}, transparent)`, borderRadius: "20px 20px 0 0" }}
            />

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
              className="flex justify-center mb-6"
            >
              {c.icon}
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block font-mono text-xs tracking-widest px-3 py-1 rounded-full mb-5"
              style={{ background: c.badgeBg, color: c.badgeColor, border: `1px solid ${c.badgeBorder}`, letterSpacing: "0.15em" }}
            >
              {c.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display font-semibold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", letterSpacing: "-0.01em" }}
            >
              {c.heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm leading-relaxed mb-2"
              style={{ color: "#A1A1AA" }}
            >
              {c.sub}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-xs leading-relaxed mb-6"
              style={{ color: "#52525B" }}
            >
              {c.info}
            </motion.p>

            {orderId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 px-4 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-mono text-xs" style={{ color: "#52525B" }}>
                  Order ID: <span style={{ color: "#71717A" }}>{orderId}</span>
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Link href={c.action.href}>
                <span
                  className="inline-flex items-center justify-center gap-2 w-full text-base font-medium text-white transition-all duration-200 cursor-pointer"
                  style={{
                    ...c.actionStyle,
                    borderRadius: "12px",
                    padding: "14px 24px",
                    minHeight: "48px",
                    boxShadow: scenario !== "pending" ? "0px 4px 12px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  {c.action.label}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
