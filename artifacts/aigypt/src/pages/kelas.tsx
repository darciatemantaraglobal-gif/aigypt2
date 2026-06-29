import { useState, useRef, useEffect, useCallback } from "react";
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
  size?: "card" | "hero" | "modal";
}) {
  const isHero = size === "hero";
  const isModal = size === "modal";

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
          bottom: isHero ? "20%" : "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: isHero ? "80%" : "70%",
          height: isHero ? "60%" : "50%",
          background: `radial-gradient(ellipse at center, ${kelas.accentColor}22 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
      />
      {/* Icon */}
      <div
        className="absolute"
        style={{
          top: isHero ? "30%" : "22%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isHero ? 0.18 : 0.2,
        }}
      >
        <svg
          width={isHero ? 160 : isModal ? 120 : 80}
          height={isHero ? 160 : isModal ? 120 : 80}
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
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Class Card ───────────────────────────────────────────────────────────────

function KelasCard({
  kelas,
  onDetail,
}: {
  kelas: KelasItem;
  onDetail: (k: KelasItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [tapExpanded, setTapExpanded] = useState(false);
  const [, setLocation] = useLocation();
  const isAvailable = kelas.status === "available";

  // On touch devices, first tap shows the overlay; second tap or explicit button navigates
  const handleClick = () => {
    if (window.matchMedia("(hover: none)").matches) {
      // Touch device: toggle detail overlay so buttons are accessible
      setTapExpanded((prev) => !prev);
    } else {
      // Pointer device: navigate directly (hover overlay already shows buttons)
      if (isAvailable && kelas.route) {
        setLocation(kelas.route);
      } else {
        onDetail(kelas);
      }
    }
  };

  const showOverlay = hovered || tapExpanded;

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{ width: "clamp(180px, 22vw, 260px)", aspectRatio: "2/3" }}
      whileHover={{ scale: 1.04, y: -6, zIndex: 10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Cover */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px ${kelas.accentColor}33`
            : "0 4px 20px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.25s ease",
        }}
      >
        <KelasGradientCover kelas={kelas} size="card" />

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          {kelas.status === "available" && (
            <span
              className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(124,58,237,0.8)",
                color: "#FAFAFA",
                border: "1px solid rgba(168,85,247,0.5)",
              }}
            >
              TERSEDIA
            </span>
          )}
          {kelas.status === "new" && (
            <span
              className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{
                background: "rgba(52,211,153,0.2)",
                color: "#34D399",
                border: "1px solid rgba(52,211,153,0.4)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#34D399" }}
              />
              BARU
            </span>
          )}
          {kelas.status === "coming-soon" && (
            <span
              className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(30,30,46,0.9)",
                color: "#71717A",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              SEGERA HADIR
            </span>
          )}
        </div>

        {/* Level badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#A1A1AA",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {kelas.level}
          </span>
        </div>

        {/* Coming-soon lock overlay */}
        {kelas.status === "coming-soon" && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
          <p
            className="font-display font-semibold text-white leading-tight text-sm mb-1"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
          >
            {kelas.title}
          </p>
          <p className="font-mono text-[10px]" style={{ color: "#71717A" }}>
            {kelas.sesiCount} SESI · {kelas.duration.replace("/sesi", "/SESI")}
          </p>
        </div>

        {/* Hover / tap overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-20 flex flex-col justify-end p-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)",
              }}
            >
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#D4D4D8" }}>
                {kelas.tagline}
              </p>
              <div className="flex gap-2">
                {isAvailable ? (
                  <>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-display font-semibold text-white transition-colors"
                      style={{ background: "#7C3AED" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (kelas.route) setLocation(kelas.route);
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 3l14 9-14 9V3z" />
                      </svg>
                      Mulai
                    </button>
                    <button
                      className="px-3 py-2 rounded-lg text-xs font-display font-medium transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        color: "#FAFAFA",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDetail(kelas);
                      }}
                    >
                      Detail
                    </button>
                  </>
                ) : (
                  <button
                    className="flex-1 py-2 rounded-lg text-xs font-display font-medium transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "#A1A1AA",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetail(kelas);
                    }}
                  >
                    Beri Tahu Saya
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Horizontal Row ───────────────────────────────────────────────────────────

function KelasRow({
  title,
  items,
  onDetail,
}: {
  title: string;
  items: KelasItem[];
  onDetail: (k: KelasItem) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHoveringRow, setIsHoveringRow] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
  }, [updateArrows]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHoveringRow(true)}
      onMouseLeave={() => setIsHoveringRow(false)}
    >
      <p
        className="font-display font-semibold text-white mb-4 px-6 sm:px-10"
        style={{ fontSize: "1.05rem" }}
      >
        {title}
      </p>

      <div className="relative">
        {/* Left arrow */}
        <AnimatePresence>
          {isHoveringRow && canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-12"
              style={{ background: "linear-gradient(to right, rgba(6,6,8,0.9), transparent)" }}
              onClick={() => scroll("left")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FAFAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right arrow */}
        <AnimatePresence>
          {isHoveringRow && canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-12"
              style={{ background: "linear-gradient(to left, rgba(6,6,8,0.9), transparent)" }}
              onClick={() => scroll("right")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FAFAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "none",
            paddingLeft: "clamp(1.5rem, 2.5vw, 2.5rem)",
            paddingRight: "clamp(1.5rem, 2.5vw, 2.5rem)",
          }}
          onScroll={updateArrows}
        >
          {items.map((kelas) => (
            <KelasCard key={kelas.id} kelas={kelas} onDetail={onDetail} />
          ))}
          {/* Trailing spacer to peek next */}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({
  kelas,
  onClose,
}: {
  kelas: KelasItem;
  onClose: () => void;
}) {
  const [, setLocation] = useLocation();
  const isAvailable = kelas.status === "available";

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
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      />

      {/* Modal panel — full-screen on mobile, card on desktop */}
      <motion.div
        className="relative w-full sm:max-w-lg sm:rounded-2xl overflow-hidden rounded-t-2xl"
        style={{
          background: "rgba(16,16,24,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Cover */}
        <div className="relative w-full" style={{ height: "200px" }}>
          <KelasGradientCover kelas={kelas} size="modal" />
          <div
            className="absolute inset-0 flex items-end p-6"
            style={{
              background: "linear-gradient(to top, rgba(16,16,24,1) 0%, transparent 60%)",
            }}
          >
            <div>
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: kelas.accentColor }}
              >
                {kelas.status === "available" ? "TERSEDIA" : "SEGERA HADIR"}
              </span>
            </div>
          </div>
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#A1A1AA",
            }}
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2
            className="font-display font-semibold text-white leading-tight mb-2"
            style={{ fontSize: "1.25rem" }}
          >
            {kelas.title}
          </h2>
          <p className="font-mono text-xs mb-4" style={{ color: "#52525B" }}>
            {kelas.sesiCount} SESI · {kelas.duration.toUpperCase()} · {kelas.level.toUpperCase()}
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#A1A1AA" }}>
            {kelas.description}
          </p>

          {/* What you learn */}
          <div className="mb-6">
            <p
              className="font-mono text-xs tracking-widest mb-3"
              style={{ color: "#52525B", letterSpacing: "0.12em" }}
            >
              YANG AKAN KAMU PELAJARI
            </p>
            <ul className="space-y-2">
              {kelas.whatYouLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#D4D4D8" }}>
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={kelas.accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          {isAvailable ? (
            <button
              className="w-full py-3 rounded-xl font-display font-semibold text-sm text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                boxShadow: "0 0 30px rgba(124,58,237,0.35)",
              }}
              onClick={() => { if (kelas.route) setLocation(kelas.route); onClose(); }}
            >
              Mulai Belajar
            </button>
          ) : (
            <div className="space-y-2">
              <button
                disabled
                className="w-full py-3 rounded-xl font-display font-semibold text-sm cursor-not-allowed"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "#52525B",
                  border: "1px solid rgba(255,255,255,0.06)",
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
  const [, setLocation] = useLocation();
  const [activePersona, setActivePersona] = useState("Semua");
  const [modalKelas, setModalKelas] = useState<KelasItem | null>(null);
  const [navSolid, setNavSolid] = useState(false);

  const flagship = kelasList.find((k) => k.status === "available") ?? kelasList[0];

  const available = kelasList.filter((k) => k.status === "available" || k.status === "new");
  const comingSoon = kelasList.filter((k) => k.status === "coming-soon");

  const byPersona =
    activePersona === "Semua"
      ? kelasList
      : kelasList.filter((k) => k.personas.includes(activePersona));

  // Scroll-triggered nav
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      {/* ── Sticky nav (transparent → solid) ── */}
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
      {/* Offset so page starts behind the navbar */}
      <div style={{ marginTop: "-64px" }} />

      {/* ── HERO — FEATURED ── */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ minHeight: "72vh", paddingBottom: "5rem" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <KelasGradientCover kelas={flagship} size="hero" />
          {/* Breathing glow animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(124,58,237,0.12) 0%, transparent 60%)",
            }}
          />
          {/* Bottom fade to page bg */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "45%",
              background:
                "linear-gradient(to top, #060608 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-mono text-xs tracking-widest mb-4"
              style={{ color: "#A855F7", letterSpacing: "0.2em" }}
            >
              KELAS UNGGULAN · TERSEDIA SEKARANG
            </p>
            <h1
              className="font-display font-semibold leading-tight mb-4"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
                maxWidth: "600px",
              }}
            >
              Maksimalkan AI untuk
              <br />
              <span style={{ color: "#A855F7" }}>Menghasilkan Solusimu</span>
            </h1>
            <p
              className="font-mono text-xs tracking-widest mb-4"
              style={{ color: "#52525B" }}
            >
              6 SESI · 60 MENIT/SESI · SEMUA LEVEL · BAHASA INDONESIA
            </p>
            <p
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "#A1A1AA", fontWeight: 300 }}
            >
              Dari sekadar bertanya pada AI, hingga membangun aplikasi nyata
              dengan tanganmu sendiri. Kelas transformatif yang dirancang
              khusus untuk masisir.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                }}
                onClick={() => setLocation("/kurikulum")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                Mulai Belajar
              </button>
              <button
                className="flex items-center gap-2 px-7 py-3 rounded-full font-display font-medium text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#FAFAFA",
                  backdropFilter: "blur(8px)",
                }}
                onClick={() => setModalKelas(flagship)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                Lihat Detail
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NETFLIX ROWS ── */}
      <section className="pb-20 space-y-12">
        <KelasRow
          title="Tersedia Sekarang"
          items={available}
          onDetail={setModalKelas}
        />

        <KelasRow
          title="Segera Hadir"
          items={comingSoon}
          onDetail={setModalKelas}
        />

        {/* ── Persona filter + row ── */}
        <div>
          <div className="flex items-center justify-between mb-4 px-6 sm:px-10 flex-wrap gap-3">
            <p className="font-display font-semibold text-white" style={{ fontSize: "1.05rem" }}>
              Pilih Berdasarkan Jalurmu
            </p>
            <div className="flex gap-2 flex-wrap">
              {personas.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePersona(p)}
                  className="font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background:
                      activePersona === p
                        ? "rgba(124,58,237,0.8)"
                        : "rgba(255,255,255,0.05)",
                    color: activePersona === p ? "#FAFAFA" : "#71717A",
                    border:
                      activePersona === p
                        ? "1px solid rgba(168,85,247,0.5)"
                        : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div
            className="flex gap-3 overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              paddingLeft: "clamp(1.5rem, 2.5vw, 2.5rem)",
              paddingRight: "clamp(1.5rem, 2.5vw, 2.5rem)",
            }}
          >
            {byPersona.length > 0 ? (
              byPersona.map((kelas) => (
                <KelasCard key={kelas.id} kelas={kelas} onDetail={setModalKelas} />
              ))
            ) : (
              <div
                className="flex-1 flex items-center justify-center py-16 rounded-xl"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-mono text-xs" style={{ color: "#52525B" }}>
                  Belum ada kelas untuk jalur ini
                </p>
              </div>
            )}
            <div className="flex-shrink-0 w-4" />
          </div>
        </div>
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
