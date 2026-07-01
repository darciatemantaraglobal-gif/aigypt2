import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { kelasList, personas, type KelasItem } from "@/lib/classesData";

// ─── Cover Art ────────────────────────────────────────────────────────────────

function KelasGradientCover({
  kelas,
  size = "card",
}: {
  kelas: KelasItem;
  size?: "card" | "modal";
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: kelas.gradient }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute"
        style={{
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "50%",
          background: `radial-gradient(ellipse at center, ${kelas.accentColor}22 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
      />
      {/* Decorative icon */}
      <div
        className="absolute"
        style={{
          top: size === "modal" ? "22%" : "18%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.18,
        }}
      >
        <svg
          width={size === "modal" ? 120 : 72}
          height={size === "modal" ? 120 : 72}
          viewBox="0 0 24 24"
          fill="none"
          stroke={kelas.accentColor}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={kelas.iconPath} />
        </svg>
      </div>
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "65%",
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Kelas Card (Portrait — Komik Style) ──────────────────────────────────────

function KelasCard({
  kelas,
  onDetail,
}: {
  kelas: KelasItem;
  onDetail: (k: KelasItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [, setLocation] = useLocation();
  const isAvailable = kelas.status === "available" || kelas.status === "new";

  return (
    <motion.div
      className="relative cursor-pointer select-none group"
      style={{ aspectRatio: "2/3" }}
      whileHover={{ scale: 1.03, y: -4, zIndex: 10 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => {
        if (isAvailable) setLocation(`/kelas/${kelas.id}`);
        else onDetail(kelas);
      }}
    >
      {/* Cover */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? `0px 20px 40px rgba(0,0,0,0.6), 0 0 0 1px ${kelas.accentColor}44`
            : "0px 4px 16px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.22s ease",
        }}
      >
        <KelasGradientCover kelas={kelas} size="card" />

        {/* Status badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {kelas.status === "available" && (
            <span
              className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(124,58,237,0.85)",
                color: "#FAFAFA",
                border: "1px solid rgba(168,85,247,0.5)",
              }}
            >
              TERSEDIA
            </span>
          )}
          {kelas.status === "new" && (
            <span
              className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{
                background: "rgba(52,211,153,0.2)",
                color: "#34D399",
                border: "1px solid rgba(52,211,153,0.4)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#34D399" }} />
              BARU
            </span>
          )}
          {kelas.status === "coming-soon" && (
            <span
              className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(30,30,46,0.9)",
                color: "#52525B",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              SEGERA
            </span>
          )}
        </div>

        {/* Level badge top-right */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span
            className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "#71717A",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {kelas.level}
          </span>
        </div>

        {/* Coming-soon lock */}
        {kelas.status === "coming-soon" && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.32)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
          <p
            className="font-display font-semibold text-white leading-tight mb-1"
            style={{ fontSize: "0.8rem", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
          >
            {kelas.title}
          </p>
          <p className="font-mono text-[9px]" style={{ color: "#52525B" }}>
            {kelas.sesiCount} SESI · {kelas.duration.replace("/sesi", "/SESI")}
          </p>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-20 flex flex-col justify-end p-3"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.1) 100%)",
              }}
            >
              <p className="text-[11px] leading-relaxed mb-3" style={{ color: "#D4D4D8" }}>
                {kelas.tagline}
              </p>
              {isAvailable ? (
                <button
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-white"
                  style={{
                    background: "#7C3AED",
                    borderRadius: "7px",
                    padding: "8px 10px",
                    minHeight: "34px",
                  }}
                  onClick={(e) => { e.stopPropagation(); setLocation(`/kelas/${kelas.id}`); }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  Mulai
                </button>
              ) : (
                <button
                  className="w-full text-xs font-normal"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "#71717A",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "7px",
                    padding: "8px 10px",
                    minHeight: "34px",
                  }}
                  onClick={(e) => { e.stopPropagation(); onDetail(kelas); }}
                >
                  Beri Tahu Saya
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ kelas, onClose }: { kelas: KelasItem; onClose: () => void }) {
  const [, setLocation] = useLocation();
  const isAvailable = kelas.status === "available" || kelas.status === "new";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      />
      <motion.div
        className="relative w-full sm:max-w-lg overflow-hidden"
        style={{
          background: "rgba(16,16,24,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          boxShadow: "0px 16px 32px rgba(0,0,0,0.5)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full" style={{ height: "200px" }}>
          <KelasGradientCover kelas={kelas} size="modal" />
          <div
            className="absolute inset-0 flex items-end p-6"
            style={{ background: "linear-gradient(to top, rgba(16,16,24,1) 0%, transparent 60%)" }}
          >
            <span className="font-mono text-xs tracking-widest" style={{ color: kelas.accentColor }}>
              {kelas.status === "available" ? "TERSEDIA" : "SEGERA HADIR"}
            </span>
          </div>
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", borderRadius: "14px", color: "#A1A1AA" }}
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h2 className="font-display font-semibold text-white leading-tight mb-2" style={{ fontSize: "1.25rem" }}>
            {kelas.title}
          </h2>
          <p className="font-mono text-xs mb-4" style={{ color: "#52525B" }}>
            {kelas.sesiCount} SESI · {kelas.duration.toUpperCase()} · {kelas.level.toUpperCase()}
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#A1A1AA" }}>
            {kelas.description}
          </p>
          <div className="mb-6">
            <p className="font-mono text-xs tracking-widest mb-3" style={{ color: "#52525B", letterSpacing: "0.12em" }}>
              YANG AKAN KAMU PELAJARI
            </p>
            <ul className="space-y-2">
              {kelas.whatYouLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#D4D4D8" }}>
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={kelas.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {isAvailable ? (
            <button
              className="w-full text-base font-medium text-white flex items-center justify-center"
              style={{ background: "#7C3AED", borderRadius: "12px", padding: "15px 24px", minHeight: "48px" }}
              onClick={() => { setLocation(`/kelas/${kelas.id}`); onClose(); }}
            >
              Mulai Belajar
            </button>
          ) : (
            <div className="space-y-2">
              <button
                disabled
                className="w-full text-base font-normal cursor-not-allowed flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#52525B",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "15px 24px",
                  minHeight: "48px",
                }}
              >
                Segera Hadir
              </button>
              <p className="text-center text-xs" style={{ color: "#52525B" }}>
                Kelas ini sedang disiapkan. Pantau terus pengumuman komunitas.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KelasPage() {
  const [activePersona, setActivePersona] = useState("Semua");
  const [modalKelas, setModalKelas] = useState<KelasItem | null>(null);
  const [navSolid, setNavSolid] = useState(false);

  const available = kelasList.filter((k) => k.status === "available" || k.status === "new");
  const comingSoon = kelasList.filter((k) => k.status === "coming-soon");

  const byPersona =
    activePersona === "Semua"
      ? kelasList
      : kelasList.filter((k) => k.personas.includes(activePersona));

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>

      {/* ── Sticky nav ── */}
      <div
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: navSolid ? "rgba(6,6,8,0.95)" : "transparent",
          backdropFilter: navSolid ? "blur(16px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <Navbar />
      </div>

      {/* ── HERO — Centered, seperti landing page ── */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient glow */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70vw",
            height: "60vh",
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.13) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content — rata tengah */}
        <motion.div
          className="relative max-w-3xl mx-auto px-6 sm:px-10 text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono text-xs tracking-widest mb-6"
            style={{ color: "#7C3AED", letterSpacing: "0.2em" }}
          >
            AIGYPT · KELAS & PROGRAM
          </p>
          <h1
            className="font-display font-semibold leading-[1.08] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", letterSpacing: "-0.025em" }}
          >
            Kuasai AI,{" "}
            <span style={{ color: "#A855F7" }}>mulai dari mana kamu berada.</span>
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "#A1A1AA", fontWeight: 300 }}
          >
            Program belajar AI yang dirancang khusus untuk masisir. Dari pemula
            hingga membangun produk nyata, pilih jalur yang sesuai dengan tujuanmu.
          </p>

          {/* Stats row */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 mb-2">
            {[`${kelasList.length} KELAS`, `${available.length} TERSEDIA`, "BAHASA INDONESIA"].map((t) => (
              <span key={t} className="font-mono text-xs tracking-widest" style={{ color: "#3F3F46", letterSpacing: "0.15em" }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── KATALOG — Comic Grid ── */}
      <section id="katalog-kelas" className="max-w-6xl mx-auto px-6 sm:px-10 pb-24">

        {/* ── Filter Persona ── */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => setActivePersona(p)}
              className="font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: activePersona === p ? "rgba(124,58,237,0.8)" : "rgba(255,255,255,0.04)",
                color: activePersona === p ? "#FAFAFA" : "#52525B",
                border: activePersona === p ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* ── Grid Tersedia ── */}
        {available.length > 0 && activePersona === "Semua" && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <p className="font-display font-semibold text-white" style={{ fontSize: "1rem" }}>
                Tersedia Sekarang
              </p>
              <span
                className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: "rgba(124,58,237,0.2)", color: "#A855F7", border: "1px solid rgba(168,85,247,0.3)" }}
              >
                {available.length} KELAS
              </span>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {available.map((kelas) => (
                <KelasCard key={kelas.id} kelas={kelas} onDetail={setModalKelas} />
              ))}
            </div>
          </div>
        )}

        {/* ── Grid Segera Hadir ── */}
        {comingSoon.length > 0 && activePersona === "Semua" && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <p className="font-display font-semibold" style={{ fontSize: "1rem", color: "#52525B" }}>
                Segera Hadir
              </p>
              <span
                className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", color: "#3F3F46", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {comingSoon.length} KELAS
              </span>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {comingSoon.map((kelas) => (
                <KelasCard key={kelas.id} kelas={kelas} onDetail={setModalKelas} />
              ))}
            </div>
          </div>
        )}

        {/* ── Grid Filter Persona ── */}
        {activePersona !== "Semua" && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="font-display font-semibold text-white" style={{ fontSize: "1rem" }}>
                Jalur: {activePersona}
              </p>
              <span
                className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", color: "#52525B", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {byPersona.length} KELAS
              </span>
            </div>
            {byPersona.length > 0 ? (
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {byPersona.map((kelas) => (
                  <KelasCard key={kelas.id} kelas={kelas} onDetail={setModalKelas} />
                ))}
              </div>
            ) : (
              <div
                className="flex items-center justify-center py-20 rounded-xl"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-mono text-xs" style={{ color: "#3F3F46" }}>
                  Belum ada kelas untuk jalur ini
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {modalKelas && (
          <DetailModal kelas={modalKelas} onClose={() => setModalKelas(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
