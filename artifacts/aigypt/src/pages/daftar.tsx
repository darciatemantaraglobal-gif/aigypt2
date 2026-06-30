import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { validateCoupon } from "@/lib/coupons";

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess?: (result: { order_id: string; transaction_status: string }) => void;
        onPending?: (result: { order_id: string; transaction_status: string }) => void;
        onError?: (result: unknown) => void;
        onClose?: () => void;
      }) => void;
    };
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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

const tiers = [
  {
    id: "mandiri",
    name: "Member Mandiri",
    tag: "Fleksibel",
    desc: "Belajar dengan kecepatan sendiri, akses penuh selamanya.",
    features: [
      "Akses penuh seluruh materi 6 sesi",
      "Kode keanggotaan eksklusif",
      "Pembaruan materi selamanya",
      "Akses Vibe Coding Toolbox",
    ],
    highlight: false,
  },
  {
    id: "kelas",
    name: "Member Kelas",
    tag: "BATCH 1 · DIBUKA",
    desc: "Bimbingan penuh, komunitas aktif, dan sertifikat.",
    features: [
      "Semua yang ada di Member Mandiri",
      "4 pertemuan live bersama mentor (6, 8, 11, 13 Juli 2026)",
      "Bimbingan dan feedback langsung",
      "Komunitas eksklusif Batch 1",
      "Sertifikat penyelesaian",
    ],
    highlight: true,
  },
];

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function Daftar() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultType = searchParams.get("type") === "mandiri" ? "mandiri" : "kelas";

  const [selectedType, setSelectedType] = useState<"mandiri" | "kelas">(defaultType);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snapReady, setSnapReady] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);

  useEffect(() => {
    const isProduction = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === "true";
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY ?? "";
    const snapUrl = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    const existing = document.getElementById("midtrans-snap");
    if (existing) {
      setSnapReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "midtrans-snap";
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => setSnapReady(true);
    script.onerror = () => console.error("[Snap] Gagal memuat Midtrans Snap.js");
    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (appliedCoupon && appliedCoupon.code) {
      const validation = validateCoupon(appliedCoupon.code, selectedType);
      if (!validation.valid) {
        setAppliedCoupon(null);
        setCouponInput("");
        setCouponError("Kupon tidak berlaku untuk paket ini");
      }
    }
  }, [selectedType, appliedCoupon]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Semua field wajib diisi.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid.");
      return false;
    }
    const phoneClean = form.phone.replace(/\D/g, "");
    if (phoneClean.length < 9 || phoneClean.length > 15) {
      setError("Nomor WhatsApp tidak valid.");
      return false;
    }
    return true;
  };

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setCouponError("");
    setCouponLoading(true);

    const clientValidation = validateCoupon(code, selectedType);
    if (!clientValidation.valid) {
      setCouponError(clientValidation.error ?? "Kode kupon tidak valid");
      setCouponLoading(false);
      return;
    }

    if (!form.email.trim()) {
      setCouponError("Isi email terlebih dahulu sebelum menerapkan kupon");
      setCouponLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setCouponError("Format email tidak valid");
      setCouponLoading(false);
      return;
    }

    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "/api";
      const res = await fetch(`${apiBase}/coupons/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, email: form.email.trim().toLowerCase(), memberType: selectedType }),
      });
      const data = await res.json() as { valid: boolean; error?: string; coupon?: { discountAmount: number } };
      if (!data.valid) {
        setCouponError(data.error ?? "Kode kupon tidak valid");
      } else {
        setAppliedCoupon({ code, discountAmount: data.coupon?.discountAmount ?? clientValidation.coupon!.discountAmount });
        setCouponError("");
      }
    } catch {
      setCouponError("Gagal memvalidasi kupon. Coba lagi.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleQris = () => {
    setError("");
    if (!validateForm()) return;
    const params = new URLSearchParams({
      type: selectedType,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
    });
    if (appliedCoupon) {
      params.set("couponCode", appliedCoupon.code);
      params.set("discountAmount", String(appliedCoupon.discountAmount));
    }
    setLocation(`/daftar/pembayaran?${params.toString()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid.");
      return;
    }
    const phoneClean = form.phone.replace(/\D/g, "");
    if (phoneClean.length < 9 || phoneClean.length > 15) {
      setError("Nomor WhatsApp tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "/api";
      const res = await fetch(`${apiBase}/midtrans/create-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          memberType: selectedType,
        }),
      });

      const data = await res.json() as { snapToken?: string; orderId?: string; error?: string };

      if (!res.ok || !data.snapToken) {
        setError(data.error ?? "Gagal memulai pembayaran. Coba lagi.");
        setLoading(false);
        return;
      }

      if (!snapReady || typeof window.snap === "undefined") {
        setError("Sistem pembayaran belum siap. Refresh halaman dan coba lagi.");
        setLoading(false);
        return;
      }

      setLoading(false);

      window.snap.pay(data.snapToken, {
        onSuccess: (result) => {
          setLocation(`/sukses?order_id=${result.order_id}&transaction_status=${result.transaction_status}`);
        },
        onPending: (result) => {
          setLocation(`/sukses?order_id=${result.order_id}&transaction_status=pending`);
        },
        onError: () => {
          setLocation(`/sukses?status=error`);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("[Daftar] Error:", err);
      setError("Terjadi kesalahan jaringan. Periksa koneksi dan coba lagi.");
      setLoading(false);
    }
  };

  const PRICES: Record<string, number> = { mandiri: 250000, kelas: 350000 };
  const basePrice = PRICES[selectedType] ?? 350000;
  const finalPrice = appliedCoupon ? Math.max(0, basePrice - appliedCoupon.discountAmount) : basePrice;

  const inputBaseStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "16px",
    minHeight: "48px",
  };

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      <section className="relative overflow-hidden pt-20 pb-8 sm:pt-32 sm:pb-12">
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "60vh",
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-widest mb-6"
              style={{ color: "#7C3AED", letterSpacing: "0.2em" }}
            >
              PENDAFTARAN · BATCH 1
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display font-semibold leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              Pilih Paketmu,{" "}
              <br />
              <span style={{ color: "#A855F7" }}>Mulai Perjalananmu</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed max-w-xl mx-auto"
              style={{ color: "#71717A", fontWeight: 300 }}
            >
              Pertemuan pertama Batch 1 pada 6 Juli 2026. Kuota sangat terbatas. Amankan tempatmu sekarang.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          >
            {tiers.map((tier) => {
              const isSelected = selectedType === tier.id;
              const tierBasePrice = PRICES[tier.id] ?? 350000;
              const tierFinalPrice = (appliedCoupon && tier.id === "kelas")
                ? Math.max(0, tierBasePrice - appliedCoupon.discountAmount)
                : tierBasePrice;
              const hasDiscount = tier.id === "kelas" && appliedCoupon;

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedType(tier.id as "mandiri" | "kelas")}
                  className="relative cursor-pointer transition-all duration-200"
                  style={{
                    background: isSelected ? "rgba(20,12,36,0.95)" : "rgba(10,10,15,0.7)",
                    border: isSelected ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "14px",
                    boxShadow: isSelected ? "0px 0px 24px rgba(124,58,237,0.15)" : "none",
                    padding: "20px 20px 18px",
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.7), transparent)", borderRadius: "14px 14px 0 0" }}
                    />
                  )}

                  {tier.id === "kelas" && (
                    <div className="mb-3 flex items-center gap-2 flex-wrap">
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(124,58,237,0.15)",
                          color: "#A855F7",
                          border: "1px solid rgba(124,58,237,0.3)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        GUNAKAN KODE AIGYPT26 · HEMAT Rp 51.000
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-white text-lg mb-1">{tier.name}</h3>
                      <p className="text-sm" style={{ color: "#71717A" }}>{tier.desc}</p>
                      <div className="mt-2 flex items-center gap-2">
                        {hasDiscount && (
                          <span className="font-mono text-xs line-through" style={{ color: "#52525B" }}>
                            {formatRp(tierBasePrice)}
                          </span>
                        )}
                        <span className="font-mono font-bold text-sm" style={{ color: hasDiscount ? "#A855F7" : "#A1A1AA" }}>
                          {formatRp(tierFinalPrice)}
                        </span>
                        {hasDiscount && (
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(124,58,237,0.15)", color: "#A855F7" }}>
                            -{formatRp(appliedCoupon!.discountAmount)}
                          </span>
                        )}
                        {!hasDiscount && (
                          <span className="text-xs" style={{ color: "#52525B" }}>sekali bayar</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-3">
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          background: tier.highlight ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.05)",
                          color: tier.highlight ? "#A855F7" : "#52525B",
                          border: tier.highlight ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {tier.tag}
                      </span>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          background: isSelected ? "#7C3AED" : "transparent",
                          border: isSelected ? "none" : "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: isSelected ? "#A1A1AA" : "#52525B" }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: isSelected ? "#7C3AED" : "#3F3F46" }}>
                          <IconCheck />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="relative p-5 sm:p-8"
            style={{
              background: "rgba(10,10,15,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)", borderRadius: "16px 16px 0 0" }}
            />
            <p className="font-mono text-xs tracking-widest mb-6" style={{ color: "#7C3AED", letterSpacing: "0.15em" }}>
              DATA PENDAFTARAN
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#A1A1AA" }}>Nama Lengkap</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Nama kamu" autoComplete="name"
                  className="w-full px-4 py-3 text-white rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600"
                  style={inputBaseStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#A1A1AA" }}>Email Aktif</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="email@kamu.com" autoComplete="email"
                  className="w-full px-4 py-3 text-white rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600"
                  style={inputBaseStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <p className="text-xs mt-1.5" style={{ color: "#52525B" }}>Gunakan email yang sama saat login nanti</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#A1A1AA" }}>Nomor WhatsApp</label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="08xxxxxxxxxx" autoComplete="tel"
                  className="w-full px-4 py-3 text-white rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600"
                  style={inputBaseStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <p className="text-xs mt-1.5" style={{ color: "#52525B" }}>Kode akses akan dikirimkan ke WhatsApp ini setelah pembayaran</p>
              </div>

              {/* Coupon field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#A1A1AA" }}>
                  Punya kode kupon? <span className="font-normal" style={{ color: "#52525B" }}>(opsional)</span>
                </label>
                {appliedCoupon ? (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)" }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#A855F7" }}>
                        Kupon <span className="font-mono">{appliedCoupon.code}</span> diterapkan
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#7C3AED" }}>
                        Potongan {formatRp(appliedCoupon.discountAmount)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setAppliedCoupon(null); setCouponInput(""); setCouponError(""); }}
                      className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                      style={{ color: "#52525B", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      Hapus
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        if (couponError) setCouponError("");
                      }}
                      placeholder="Masukkan kode kupon"
                      className="flex-1 px-4 py-3 text-white rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600 font-mono uppercase"
                      style={{ ...inputBaseStyle, letterSpacing: "0.05em" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyCoupon(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        color: "#A855F7",
                      }}
                    >
                      {couponLoading ? <IconSpin /> : "Terapkan"}
                    </button>
                  </div>
                )}
                {couponError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs mt-2"
                    style={{ color: "#F87171" }}
                  >
                    {couponError}
                  </motion.p>
                )}
              </div>

              {/* Price summary if coupon applied */}
              {appliedCoupon && selectedType === "kelas" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 rounded-xl text-sm space-y-1.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex justify-between" style={{ color: "#71717A" }}>
                    <span>Harga {selectedType === "kelas" ? "Member Kelas" : "Member Mandiri"}</span>
                    <span className="font-mono">{formatRp(basePrice)}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "#A855F7" }}>
                    <span>Kupon {appliedCoupon.code}</span>
                    <span className="font-mono">- {formatRp(appliedCoupon.discountAmount)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-1" style={{ color: "#FAFAFA", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <span>Total yang dibayar</span>
                    <span className="font-mono" style={{ color: "#A855F7" }}>{formatRp(finalPrice)}</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
                >
                  {error}
                </motion.div>
              )}

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 text-base font-medium text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "#7C3AED",
                    borderRadius: "12px",
                    padding: "15px 24px",
                    minHeight: "52px",
                    boxShadow: "0px 4px 16px rgba(124,58,237,0.35)",
                  }}
                >
                  {loading ? (
                    <><IconSpin />Memproses...</>
                  ) : (
                    <>Bayar via Midtrans <IconArrow /></>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span className="text-xs font-mono" style={{ color: "#3F3F46" }}>atau</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleQris}
                  className="w-full inline-flex items-center justify-center gap-2 text-base font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "15px 24px",
                    minHeight: "52px",
                    color: "#A1A1AA",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "#FAFAFA"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#A1A1AA"; }}
                >
                  Bayar via QRIS <IconArrow />
                </button>

                <p className="text-center text-xs pt-1" style={{ color: "#52525B" }}>
                  Dengan mendaftar, kamu menyetujui syarat & ketentuan AIGYPT.{" "}
                  <Link href="/"><span className="underline cursor-pointer" style={{ color: "#71717A" }}>Kembali ke beranda</span></Link>
                </p>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            {["Pembayaran aman via Midtrans", "Kode akses via WhatsApp", "Akses selamanya"].map((t) => (
              <span key={t} className="font-mono text-xs tracking-widest flex items-center gap-2" style={{ color: "#3F3F46" }}>
                <span style={{ color: "rgba(124,58,237,0.4)" }}>✓</span> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
