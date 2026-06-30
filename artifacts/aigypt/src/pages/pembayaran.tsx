import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import qrisImg from "@/assets/qris-payment.png";

const PRICE: Record<string, number> = {
  mandiri: 250000,
  kelas: 350000,
};

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function IconWarn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "#F59E0B" }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconSpin() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function Pembayaran() {
  const [, navigate] = useLocation();
  const [params, setParams] = useState({ name: "", email: "", phone: "", type: "kelas" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [fallbackWaLink, setFallbackWaLink] = useState("");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setParams({
      name: sp.get("name") ?? "",
      email: sp.get("email") ?? "",
      phone: sp.get("phone") ?? "",
      type: sp.get("type") === "mandiri" ? "mandiri" : "kelas",
    });
  }, []);

  const price = PRICE[params.type] ?? 350000;
  const memberLabel = params.type === "kelas" ? "Member Kelas — Batch 1" : "Member Mandiri";

  async function handleConfirm() {
    setError("");
    setFallbackWaLink("");
    setLoading(true);

    // Open WA window synchronously during click event to avoid popup blocker
    const waWindow = window.open("", "_blank");

    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "/api";
      const res = await fetch(`${apiBase}/qris/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: params.name,
          email: params.email,
          phone: params.phone,
          memberType: params.type,
        }),
      });
      const data = await res.json() as { orderId?: string; error?: string };
      if (!res.ok || !data.orderId) {
        setError(data.error ?? "Gagal memproses konfirmasi. Coba lagi.");
        setLoading(false);
        if (waWindow) waWindow.close();
        return;
      }

      setConfirmed(true);

      const waNumber = import.meta.env.VITE_WA_NUMBER;
      const memberTypeLabel = params.type === "kelas" ? "Member Kelas" : "Member Mandiri";
      const confirmationMessage =
        `Halo AIGYPT! Saya sudah melakukan pembayaran untuk pendaftaran Batch 1.\n\n` +
        `Nama: ${params.name}\n` +
        `Email: ${params.email}\n` +
        `Paket: ${memberTypeLabel}\n` +
        `Jumlah: ${formatRp(price)}\n` +
        `Order ID: ${data.orderId}\n\n` +
        `Mohon dikonfirmasi ya. Terima kasih!`;

      const encodedMessage = encodeURIComponent(confirmationMessage);
      const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

      if (waWindow) {
        waWindow.location.href = waLink;
      } else {
        // Popup was blocked — show fallback link
        setFallbackWaLink(waLink);
      }

      navigate(`/sukses?order_id=${data.orderId}&transaction_status=pending_qris`);
    } catch {
      setError("Terjadi kesalahan jaringan. Periksa koneksi dan coba lagi.");
      setLoading(false);
      if (waWindow) waWindow.close();
    }
  }

  const missingData = !params.name || !params.email || !params.phone;

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      <section className="relative overflow-hidden pt-16 pb-8 sm:pt-28 sm:pb-16">
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: "70vw", height: "50vh",
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-xl mx-auto px-5 sm:px-8">
          {/* Back */}
          <div className="mb-6">
            <Link href="/daftar">
              <span className="inline-flex items-center gap-1.5 text-sm cursor-pointer transition-colors" style={{ color: "#52525B" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A1A1AA")}
                onMouseLeave={e => (e.currentTarget.style.color = "#52525B")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Kembali ke Pendaftaran
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "#7C3AED", letterSpacing: "0.2em" }}>
              PEMBAYARAN · QRIS
            </p>
            <h1 className="font-display font-semibold mb-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "-0.02em" }}>
              Scan &amp; Transfer
            </h1>
            <p className="text-sm mb-8" style={{ color: "#71717A" }}>
              Gunakan aplikasi e-wallet atau mobile banking kamu untuk melakukan pembayaran.
            </p>

            {/* Order summary */}
            <div
              className="mb-6 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(10,10,15,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)", borderRadius: "16px 16px 0 0" }} />
              <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "#52525B", letterSpacing: "0.12em" }}>RINGKASAN PESANAN</p>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{memberLabel}</p>
                  {params.name && <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>{params.name}</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono font-bold text-xl" style={{ color: "#A855F7", letterSpacing: "-0.01em" }}>{formatRp(price)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#52525B" }}>sekali bayar</p>
                </div>
              </div>
            </div>

            {/* QRIS Card */}
            <div
              className="mb-5 rounded-2xl overflow-hidden"
              style={{ background: "rgba(10,10,15,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="px-5 pt-5 pb-3 text-center">
                <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "#52525B", letterSpacing: "0.12em" }}>SCAN QRIS DI BAWAH</p>
                {/* QR Image */}
                <div className="flex justify-center mb-4">
                  <div className="rounded-2xl overflow-hidden" style={{ background: "white", padding: 12, display: "inline-block" }}>
                    <img
                      src={qrisImg}
                      alt="QRIS Payment Code — TEMANTIKET"
                      style={{ width: 220, height: 220, display: "block", objectFit: "contain" }}
                    />
                  </div>
                </div>
                {/* Merchant info */}
                <div className="space-y-0.5">
                  <p className="font-mono text-xs" style={{ color: "#52525B" }}>Merchant: <span style={{ color: "#71717A" }}>TEMANTIKET</span></p>
                  <p className="font-mono text-xs" style={{ color: "#52525B" }}>NMID: <span style={{ color: "#71717A" }}>ID1025414983672</span></p>
                </div>
              </div>

              {/* Amber warning — nominal manual */}
              <div
                className="mx-5 mb-5 px-4 py-4 rounded-xl"
                style={{
                  background: "rgba(245,158,11,0.07)",
                  border: "1px solid rgba(245,158,11,0.3)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <IconWarn />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#F59E0B" }}>PENTING: Masukkan Nominal Secara Manual</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "#A1A1AA" }}>
                      QR Code ini tidak menyimpan nominal otomatis. Setelah scan, kamu perlu mengetik sendiri jumlah berikut:
                    </p>
                  </div>
                </div>
                <div
                  className="text-center py-3 rounded-xl mb-3"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}
                >
                  <p className="font-mono font-bold" style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#FBBF24", letterSpacing: "-0.01em" }}>
                    {formatRp(price)}
                  </p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>
                  Pastikan nominal yang kamu masukkan <strong style={{ color: "#F59E0B" }}>PERSIS sama</strong> dengan jumlah di atas, agar verifikasi pembayaran berjalan lancar.
                </p>
              </div>

              {/* Step-by-step */}
              <div className="px-5 pb-5">
                <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "#52525B", letterSpacing: "0.12em" }}>LANGKAH PEMBAYARAN</p>
                <ol className="space-y-2.5">
                  {[
                    "Buka aplikasi e-wallet atau mobile banking kamu",
                    "Scan kode QRIS di atas",
                    `Masukkan nominal secara manual: ${formatRp(price)} (lihat peringatan di atas)`,
                    "Periksa kembali nominal sebelum konfirmasi pembayaran di aplikasimu",
                    "Setelah transfer berhasil, klik tombol konfirmasi di bawah",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#A1A1AA" }}>
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                        style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7", marginTop: 1 }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Confirm button */}
            {missingData ? (
              <div
                className="text-center py-3 rounded-xl text-sm mb-4"
                style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
              >
                Data pendaftaran tidak ditemukan.{" "}
                <Link href="/daftar"><span className="underline cursor-pointer">Kembali ke form pendaftaran</span></Link>.
              </div>
            ) : (
              <>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 rounded-xl text-sm mb-4"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  onClick={handleConfirm}
                  disabled={loading || confirmed}
                  className="w-full inline-flex items-center justify-center gap-2 text-base font-medium text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                    borderRadius: "12px",
                    padding: "15px 24px",
                    minHeight: "52px",
                    boxShadow: "0px 4px 20px rgba(124,58,237,0.45)",
                  }}
                >
                  {loading ? (
                    <><IconSpin /> Memproses...</>
                  ) : (
                    <><IconWhatsApp /> Konfirmasi via WhatsApp</>
                  )}
                </button>

                <p className="text-center text-xs mt-3 leading-relaxed" style={{ color: "#3F3F46" }}>
                  Kamu akan diarahkan ke WhatsApp untuk mengirim konfirmasi<br />
                  pembayaran langsung ke admin AIGYPT.
                </p>

                {/* Fallback if popup was blocked */}
                {fallbackWaLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-4 py-3 rounded-xl text-sm text-center"
                    style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}
                  >
                    <p className="mb-2" style={{ color: "#A1A1AA" }}>
                      WhatsApp tidak terbuka otomatis? Klik tombol di bawah:
                    </p>
                    <a
                      href={fallbackWaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium"
                      style={{ color: "#4ADE80" }}
                    >
                      <IconWhatsApp /> Buka WhatsApp Sekarang <IconArrow />
                    </a>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
