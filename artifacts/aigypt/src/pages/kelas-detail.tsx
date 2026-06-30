import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useParams, useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useGetProgress, getGetProgressQueryKey } from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";
import { kelasList, type KelasItem } from "@/lib/classesData";

// ─── Session data for each kelas ─────────────────────────────────────────────

const sessionsByKelas: Record<string, Array<{
  num: string;
  title: string;
  essence: string;
  mastery: string[];
  tools: string[];
  mission: string;
}>> = {
  "maksimalkan-ai": [
    {
      num: "01",
      title: "AI Itu Bukan Sulap, Tapi Hampir",
      essence: "Membangun fondasi mental dan memahami lanskap kecerdasan buatan.",
      mastery: [
        "Memahami cara kerja AI tanpa istilah teknis yang membingungkan",
        "Mengenali perbedaan ChatGPT, Claude, dan Gemini — kapan memakai yang mana",
        "Menyaksikan langsung: satu masalah, tiga AI, tiga hasil berbeda",
        "Menyadari mengapa cara bertanya menentukan segalanya",
      ],
      tools: ["ChatGPT", "Claude", "Gemini"],
      mission: "Ajukan satu masalah nyata pada dua AI berbeda. Amati perbedaannya.",
    },
    {
      num: "02",
      title: "Seni Berdialog dengan Kecerdasan",
      essence: "Menguasai prompting — keterampilan inti yang membedakan amatir dan ahli.",
      mastery: [
        "Formula menyusun perintah yang tajam dan menghasilkan output berkualitas",
        "Mengubah pertanyaan biasa menjadi instruksi yang presisi",
        "Teknik bertanya bertahap untuk hasil yang kompleks",
        "Membangun koleksi prompt pribadi yang bisa dipakai berulang",
      ],
      tools: ["Claude", "ChatGPT"],
      mission: "Susun tiga perintah presisi untuk tiga kebutuhan berbeda dalam hidupmu.",
    },
    {
      num: "03",
      title: "Asisten untuk Ilmu dan Amanah",
      essence: "Menerapkan AI pada dunia akademik dan organisasi.",
      mastery: [
        "Menulis dan menyempurnakan makalah berbahasa Arab",
        "Menerjemahkan dan memahami kitab klasik yang rumit",
        "Merangkum jurnal panjang dan menemukan celah penelitian",
        "Menyusun proposal, notulensi, dan laporan secara otomatis",
      ],
      tools: ["Claude", "NotebookLM", "TurboScribe", "DeepL"],
      mission: "Selesaikan satu tugas akademik atau organisasi nyata dengan AI. Catat waktu yang kamu hemat.",
    },
    {
      num: "04",
      title: "Kecerdasan yang Menghasilkan",
      essence: "Memanfaatkan AI untuk bisnis dan karya kreatif.",
      mastery: [
        "Meriset produk dan pasar dengan cermat",
        "Menulis copywriting yang benar-benar menjual",
        "Merancang kalender konten dan naskah dalam hitungan menit",
        "Mengubah satu konten menjadi banyak format untuk banyak kanal",
      ],
      tools: ["Claude", "Canva AI", "CapCut AI"],
      mission: "Ciptakan satu konten atau materi promosi dengan AI, dari ide hingga visual.",
    },
    {
      num: "05",
      title: "Tangan yang Mencipta",
      essence: "Membangun aplikasi dan solusi nyata melalui vibe coding.",
      mastery: [
        "Memahami vibe coding — membangun tanpa perlu menjadi programmer",
        "Menciptakan aplikasi web dari sekadar deskripsi",
        "Menghasilkan skrip otomatis untuk tugas yang berulang",
        "Merangkai alur kerja otomatis yang berjalan sendiri",
      ],
      tools: ["Lovable", "Bolt", "v0", "Replit", "n8n"],
      mission: "Rumuskan satu masalah nyata dan solusi yang kamu bayangkan. Inilah benih karyamu.",
    },
    {
      num: "06",
      title: "Pembuktian",
      essence: "Demo Day — mempersembahkan karya yang lahir dari perjalananmu.",
      mastery: [
        "Mempresentasikan solusi: dari masalah, proses, hingga hasil nyata",
        "Menerima dan memberi umpan balik yang membangun",
        "Mendokumentasikan karyamu sebagai portofolio pertama",
        "Merancang langkah selanjutnya untuk mengembangkan solusimu",
      ],
      tools: ["Seluruh tools yang telah dikuasai"],
      mission: "Dokumentasikan karyamu. Ini menjadi bukti nyata kemampuanmu.",
    },
  ],
};

// ─── Cover ────────────────────────────────────────────────────────────────────

function KelasHeroCover({ kelas }: { kelas: KelasItem }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: kelas.gradient }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: "55%", height: "55%",
          background: `radial-gradient(ellipse at center, ${kelas.accentColor}18 0%, transparent 70%)`,
          filter: "blur(32px)",
        }}
      />
      <svg
        className="absolute"
        style={{ top: "25%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.12 }}
        width="200" height="200" viewBox="0 0 24 24"
        fill="none" stroke={kelas.accentColor} strokeWidth="0.6"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d={kelas.iconPath} />
      </svg>
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "60%", background: "linear-gradient(to top, #060608 0%, transparent 100%)" }}
      />
    </div>
  );
}

// ─── Expandable session row ───────────────────────────────────────────────────

type SessionStatus = "completed" | "active" | "unlocked" | "locked";

function SessionRow({
  session,
  index,
  status,
  kelasId,
}: {
  session: typeof sessionsByKelas["maksimalkan-ai"][0];
  index: number;
  status: SessionStatus;
  kelasId: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [, setLocation] = useLocation();

  const sesiNum = parseInt(session.num);

  const statusColor: Record<SessionStatus, string> = {
    completed: "#34D399",
    active: "#A855F7",
    unlocked: "#71717A",
    locked: "#3F3F46",
  };

  const statusLabel: Record<SessionStatus, string> = {
    completed: "SELESAI",
    active: "LANJUTKAN",
    unlocked: "MULAI",
    locked: "TERKUNCI",
  };

  const isAccessible = status !== "locked";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative transition-all duration-200"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-sm"
          style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.04) 0%, transparent 60%)" }}
        />

        {/* Row header */}
        <div
          className="relative flex items-center gap-5 px-5 sm:px-8 py-5 cursor-pointer"
          onClick={() => isAccessible && setOpen(!open)}
        >
          {/* Status indicator */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <span
              className="font-mono font-bold leading-none select-none"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "rgba(124,58,237,0.3)", letterSpacing: "-0.02em" }}
            >
              {session.num}
            </span>
          </div>

          {/* Title + essence */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-display font-semibold leading-tight mb-0.5"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: status === "locked" ? "#52525B" : "#FAFAFA",
              }}
            >
              {session.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: status === "locked" ? "#3F3F46" : "#71717A" }}>
              {session.essence}
            </p>
          </div>

          {/* Right side: status + toggle */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <span
              className="hidden sm:block font-mono text-[10px] tracking-widest"
              style={{ color: statusColor[status], letterSpacing: "0.12em" }}
            >
              {statusLabel[status]}
            </span>

            {status === "locked" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3F3F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            ) : status === "completed" ? (
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            ) : (
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="w-6 h-6 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: open ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.1)", color: open ? "#A855F7" : "#52525B" }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {open && isAccessible && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="px-5 sm:px-8 pb-6 pl-[calc(1.25rem+clamp(1.75rem,4vw,2.75rem)+1.25rem)]">
                {/* Mastery */}
                <div className="mb-4">
                  <p className="font-mono text-[10px] tracking-widest mb-3" style={{ color: "#52525B", letterSpacing: "0.12em" }}>
                    YANG AKAN KAMU KUASAI
                  </p>
                  <ul className="space-y-2">
                    {session.mastery.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs" style={{ color: "#A1A1AA" }}>
                        <span className="flex-shrink-0 font-mono text-xs mt-0.5" style={{ color: "rgba(124,58,237,0.5)" }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {session.tools.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ border: "1px solid rgba(124,58,237,0.2)", color: "#A855F7", background: "rgba(124,58,237,0.07)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Mission + CTA */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="rounded-lg px-4 py-3 flex-1" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                    <p className="font-mono text-[10px] mb-1.5" style={{ color: "#7C3AED", letterSpacing: "0.1em" }}>MISI MINGGU INI</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#D4D4D8" }}>{session.mission}</p>
                  </div>
                  <button
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-display font-semibold text-white transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 0 16px rgba(124,58,237,0.3)" }}
                    onClick={() => setLocation(`/kelas/${kelasId}/materi/sesi-${sesiNum}`)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>
                    {status === "completed" ? "Buka Lagi" : "Mulai"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KelasDetailPage() {
  const params = useParams<{ kelasId: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const kelasId = params.kelasId || "";
  const kelas: KelasItem | undefined = kelasList.find((k) => k.id === kelasId);

  const { data: rawProgress } = useGetProgress({
    query: { queryKey: getGetProgressQueryKey(), enabled: isAuthenticated },
  });

  const allProgress = (Array.isArray(rawProgress) ? rawProgress : []) as Array<{
    sesiNumber: number;
    kelasId?: string;
    isCompleted: boolean;
    wasSkipped?: boolean;
    currentStep?: number;
  }>;
  // Filter to this class's progress (old rows without kelasId fall through to default class)
  const progress = allProgress.filter((p) => !p.kelasId || p.kelasId === kelasId);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060608" }}>
        <svg className="animate-spin w-8 h-8 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  // 404 — unknown kelasId
  if (!kelas) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6" style={{ background: "#060608" }}>
        <p className="font-mono text-xs tracking-widest" style={{ color: "#52525B", letterSpacing: "0.2em" }}>404</p>
        <h1 className="font-display font-semibold text-2xl text-white text-center">Kelas tidak ditemukan</h1>
        <p className="text-sm text-center" style={{ color: "#71717A" }}>Kelas yang kamu cari tidak tersedia.</p>
        <button
          className="px-6 py-3 rounded-full font-display font-semibold text-sm text-white"
          style={{ background: "#7C3AED" }}
          onClick={() => setLocation("/kelas")}
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const sessions = sessionsByKelas[kelasId];
  const isAvailable = kelas.status === "available" || kelas.status === "new";

  const completedSet = new Set(progress.filter((p) => p.isCompleted).map((p) => p.sesiNumber));
  const totalCompleted = completedSet.size;
  const progressPct = sessions ? Math.round((totalCompleted / sessions.length) * 100) : 0;

  // Find next sesi to continue
  const nextSesi = sessions
    ? (sessions.find((_, i) => !completedSet.has(i + 1))?.num ?? sessions[0]?.num ?? "1")
    : "1";

  const getSessionStatus = (index: number): SessionStatus => {
    const num = index + 1;
    if (completedSet.has(num)) return "completed";
    if (num === totalCompleted + 1 || (totalCompleted === 0 && num === 1)) return "active";
    const prevSkipped = progress.find((p) => p.sesiNumber === num - 1)?.wasSkipped;
    if (prevSkipped) return "unlocked";
    return "locked";
  };

  return (
    <div className="min-h-screen" style={{ background: "#060608", color: "#FAFAFA" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "50vh" }}>
        <div className="absolute inset-0">
          <KelasHeroCover kelas={kelas} />
        </div>

        {/* Back button */}
        <div className="relative px-6 sm:px-10 pt-8">
          <Link href="/kelas">
            <span className="inline-flex items-center gap-2 text-xs font-mono cursor-pointer transition-colors" style={{ color: "#52525B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#A1A1AA")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#52525B")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              KATALOG KELAS
            </span>
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 pt-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <span
              className="inline-block font-mono text-xs tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{
                color: kelas.status === "coming-soon" ? "#71717A" : "#A855F7",
                background: kelas.status === "coming-soon" ? "rgba(255,255,255,0.05)" : "rgba(124,58,237,0.12)",
                border: `1px solid ${kelas.status === "coming-soon" ? "rgba(255,255,255,0.08)" : "rgba(124,58,237,0.3)"}`,
                letterSpacing: "0.15em",
              }}
            >
              {kelas.status === "coming-soon" ? "SEGERA HADIR" : "TERSEDIA SEKARANG"}
            </span>

            <h1
              className="font-display font-semibold leading-tight mb-3"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em", maxWidth: "640px" }}
            >
              {kelas.title}
            </h1>
            <p className="text-base mb-6 max-w-xl" style={{ color: "#A1A1AA", fontWeight: 300 }}>
              {kelas.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-5 flex-wrap mb-8">
              {[
                `${kelas.sesiCount} SESI`,
                kelas.duration.toUpperCase(),
                kelas.level.toUpperCase(),
                "BAHASA INDONESIA",
              ].map((m, i) => (
                <span key={i} className="font-mono text-xs" style={{ color: "#52525B" }}>
                  {m}
                </span>
              ))}
            </div>

            {/* Progress bar (if started) */}
            {isAvailable && sessions && totalCompleted > 0 && (
              <div className="mb-6 max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs" style={{ color: "#52525B" }}>PROGRESS</span>
                  <span className="font-mono text-xs" style={{ color: "#A855F7" }}>{progressPct}%</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #7C3AED, #A855F7)" }}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            {isAvailable && sessions ? (
              <div className="flex gap-3 flex-wrap">
                <button
                  className="flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm text-white transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}
                  onClick={() => setLocation(`/kelas/${kelasId}/materi/sesi-${nextSesi}`)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>
                  {totalCompleted > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
                </button>
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-medium text-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#52525B" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Materi segera hadir
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── SESSION LIST ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
        {isAvailable && sessions ? (
          <>
            <div className="mb-8">
              <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "#52525B", letterSpacing: "0.18em" }}>
                ISI KELAS
              </p>
              <h2 className="font-display font-semibold text-white" style={{ fontSize: "1.25rem" }}>
                {sessions.length} Sesi Pembelajaran
              </h2>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(16,16,24,0.6)" }}
            >
              {sessions.map((session, i) => (
                <SessionRow
                  key={session.num}
                  session={session}
                  index={i}
                  status={getSessionStatus(i)}
                  kelasId={kelasId}
                />
              ))}
            </div>
          </>
        ) : (
          /* Coming-soon state */
          <div className="text-center py-16">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-white text-lg mb-3">Materi Sedang Disiapkan</h3>
            <p className="text-sm max-w-sm mx-auto mb-8" style={{ color: "#71717A" }}>
              Kelas ini masih dalam pengembangan. Pantau terus pengumuman komunitas untuk info pembukaan.
            </p>
            <div className="space-y-2">
              {kelas.whatYouLearn.map((item, i) => (
                <div key={i} className="flex items-center gap-3 justify-center text-sm" style={{ color: "#52525B" }}>
                  <span className="font-mono text-xs" style={{ color: "rgba(124,58,237,0.4)" }}>—</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── BOTTOM CTA ── */}
      {isAvailable && sessions && (
        <section className="py-16 text-center">
          <div
            className="max-w-5xl mx-auto px-6 sm:px-10 py-12 rounded-2xl mx-6 sm:mx-10"
            style={{
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(124,58,237,0.15)",
            }}
          >
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: "#52525B", letterSpacing: "0.15em" }}>
              SIAP MEMULAI?
            </p>
            <h3 className="font-display font-semibold text-white text-xl mb-6">
              {totalCompleted > 0
                ? `Kamu sudah menyelesaikan ${totalCompleted} dari ${sessions.length} sesi.`
                : "Perjalananmu dimulai dari satu langkah pertama."}
            </h3>
            <button
              className="px-8 py-3 rounded-full font-display font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 0 24px rgba(124,58,237,0.35)" }}
              onClick={() => setLocation(`/kelas/${kelasId}/materi/sesi-${nextSesi}`)}
            >
              {totalCompleted > 0 ? "Lanjutkan" : "Mulai Sekarang"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
