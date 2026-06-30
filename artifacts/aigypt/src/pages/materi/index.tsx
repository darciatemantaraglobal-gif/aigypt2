import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useParams, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  useGetProgress,
  useMarkComplete,
  getGetProgressQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { materiByKelas, type MateriStep, type SesiMateri } from "@/lib/materiContent";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProgressEntry {
  sesiNumber: number;
  kelasId?: string;
  isCompleted: boolean;
  completedAt: string | null;
  currentStep?: number;
  wasSkipped?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isUnlocked(sesiNum: number, progress: ProgressEntry[]): boolean {
  if (sesiNum === 1) return true;
  const prev = progress.find((p) => p.sesiNumber === sesiNum - 1);
  return !!prev && (prev.isCompleted || !!prev.wasSkipped);
}

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all font-mono ${
        copied
          ? "text-green-400 bg-green-400/10 border-green-400/30"
          : "text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/30 hover:bg-[#7C3AED]/20"
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          Tersalin
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ─── Concept Slide ────────────────────────────────────────────────────────────

function ConceptSlide({ step }: { step: MateriStep }) {
  const cardColors: Record<string, string> = {
    purple: "border-[#7C3AED]/30 bg-[#7C3AED]/10",
    blue: "border-blue-500/30 bg-blue-500/10",
    green: "border-green-500/30 bg-green-500/10",
    red: "border-red-500/30 bg-red-500/10",
  };
  const titleColors: Record<string, string> = {
    purple: "text-[#A855F7]",
    blue: "text-blue-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-2xl mx-auto px-6 py-8 overflow-y-auto">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
            {step.title}
          </h2>
          {step.subtitle && (
            <p className="text-[#94A3B8] text-sm font-medium">{step.subtitle}</p>
          )}
        </div>

        {/* Content */}
        {step.content && (
          <p className="text-[#E2E8F0] text-sm leading-relaxed">{step.content}</p>
        )}

        {/* Quote */}
        {step.quote && (
          <div className="rounded-xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 p-4">
            <p className="text-white text-sm font-medium italic leading-relaxed">
              "{step.quote}"
            </p>
          </div>
        )}

        {/* Bullets */}
        {step.bullets && step.bullets.length > 0 && (
          <ul className="space-y-2.5">
            {step.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                </span>
                <p className="text-sm text-[#E2E8F0] leading-relaxed">{bullet}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Cards */}
        {step.cards && step.cards.length > 0 && (
          <div
            className={`grid gap-3 ${
              step.cards.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : step.cards.length >= 4
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {step.cards.map((card, i) => {
              const accent = card.accent || "purple";
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${cardColors[accent] || cardColors.purple}`}
                >
                  <p className={`text-xs font-mono font-semibold mb-2.5 uppercase tracking-wide ${titleColors[accent] || titleColors.purple}`}>
                    {card.title}
                  </p>
                  <ul className="space-y-1.5">
                    {card.items.map((item, j) => (
                      <li key={j} className="text-xs text-[#94A3B8] leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Table */}
        {step.table && (
          <div className="overflow-x-auto rounded-xl border border-[#1E1E2E]">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1E1E2E] bg-[#12121A]">
                  {step.table.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2.5 text-left font-mono text-[#A855F7] uppercase tracking-wide text-[10px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.table.rows.map((row, i) => (
                  <tr key={i} className={`border-b border-[#1E1E2E] last:border-0 ${i % 2 === 0 ? "bg-[#0A0A0F]" : "bg-[#12121A]"}`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 ${j === 0 ? "text-white font-medium" : "text-[#94A3B8]"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Practice Panel ───────────────────────────────────────────────────────────

function PracticePanel({ step }: { step: MateriStep }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Header (sticky-ish, we'll handle in parent) */}
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
            {step.title}
          </h2>
          {step.subtitle && (
            <p className="text-[#94A3B8] text-sm">{step.subtitle}</p>
          )}
        </div>

        {/* Content */}
        {step.content && (
          <p className="text-[#E2E8F0] text-sm leading-relaxed">{step.content}</p>
        )}

        {/* Table */}
        {step.table && (
          <div className="overflow-x-auto rounded-xl border border-[#1E1E2E]">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1E1E2E] bg-[#12121A]">
                  {step.table.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2.5 text-left font-mono text-[#A855F7] uppercase tracking-wide text-[10px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.table.rows.map((row, i) => (
                  <tr key={i} className={`border-b border-[#1E1E2E] last:border-0 ${i % 2 === 0 ? "bg-[#0A0A0F]" : "bg-[#12121A]"}`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 leading-snug ${j === 0 ? "text-white font-medium" : "text-[#94A3B8]"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Prompt blocks */}
        {step.prompts && step.prompts.map((p, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#7C3AED]/30 overflow-hidden hover:border-[#7C3AED]/50 transition-colors group"
            style={{ background: "#0D0D18" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E2E] bg-[#12121A]">
              <span className="text-xs font-mono text-[#A855F7] font-semibold">{p.label}</span>
              <CopyButton text={p.prompt} />
            </div>
            <div className="px-4 py-4 border-l-2 border-[#7C3AED]/40 ml-2">
              <pre className="text-xs text-[#94A3B8] font-mono whitespace-pre-wrap leading-relaxed">
                {p.prompt}
              </pre>
            </div>
          </div>
        ))}

        {/* Note */}
        {step.note && (
          <p className="text-xs text-[#94A3B8] italic border-l-2 border-[#7C3AED]/30 pl-3">
            {step.note}
          </p>
        )}

        {/* Scroll fade indicator space */}
        <div className="h-8" />
      </div>
    </div>
  );
}

// ─── Skip Modal ───────────────────────────────────────────────────────────────

function SkipModal({
  sesiNum,
  onConfirm,
  onCancel,
}: {
  sesiNum: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border border-[#1E1E2E] bg-[#12121A] p-6 max-w-sm w-full shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-white">Sesi {sesiNum} Terkunci</h3>
        </div>
        <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
          Sesi ini lebih bagus dipelajari setelah sesi sebelumnya. Tapi kalau lo udah ngerti
          dasarnya, boleh lanjut.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-[#1E1E2E] text-sm text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/40 transition-colors"
          >
            Tetap di Sini
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-sm text-white font-medium transition-colors"
          >
            Lewati & Buka
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Completion Celebration ───────────────────────────────────────────────────

function CompletionCelebration({
  sesiNum,
  onNext,
  onDashboard,
}: {
  sesiNum: number;
  onNext: () => void;
  onDashboard: () => void;
}) {
  const hasNext = sesiNum < 6; // max 6 sesi for current content
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        className="rounded-2xl border border-[#7C3AED]/50 bg-[#12121A] p-8 max-w-sm w-full text-center shadow-[0_0_60px_rgba(124,58,237,0.3)]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(124,58,237,0.6)]"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          Sesi {sesiNum} Selesai!
        </h3>
        <p className="text-sm text-[#94A3B8] mb-7 leading-relaxed">
          {hasNext
            ? `Keren! Lo udah selesaikan Sesi ${sesiNum}. Lanjut ke Sesi ${sesiNum + 1}?`
            : "Luar biasa! Lo sudah menyelesaikan semua 6 sesi AIGYPT. Lo sekarang adalah builder AI yang sesungguhnya."}
        </p>

        <div className="flex flex-col gap-3">
          {hasNext && (
            <button
              onClick={onNext}
              className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              Lanjut ke Sesi {sesiNum + 1}
            </button>
          )}
          <button
            onClick={onDashboard}
            className="w-full py-3 border border-[#1E1E2E] text-[#94A3B8] hover:text-white hover:border-[#7C3AED]/40 rounded-xl transition-all text-sm"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Dots Navigation ──────────────────────────────────────────────────────────

function DotsNav({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (i: number) => void;
}) {
  const visible = total <= 12 ? total : 12;
  const dots = Array.from({ length: Math.min(total, visible) }, (_, i) => i);
  return (
    <div className="flex items-center gap-1.5">
      {dots.map((i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`rounded-full transition-all duration-200 ${
            i === current
              ? "w-5 h-2 bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.6)]"
              : "w-2 h-2 bg-[#1E1E2E] hover:bg-[#7C3AED]/40"
          }`}
          aria-label={`Step ${i + 1}`}
        />
      ))}
      {total > visible && (
        <span className="text-[10px] text-[#475569] font-mono ml-1">
          {current + 1}/{total}
        </span>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  currentSesi,
  kelasId,
  progress,
  onSesiClick,
  open,
  onClose,
}: {
  currentSesi: number;
  kelasId: string;
  progress: ProgressEntry[];
  onSesiClick: (n: number) => void;
  open: boolean;
  onClose: () => void;
}) {
  const sesiList = materiByKelas[kelasId] ?? [];

  const sesiStatus = (n: number) => {
    const p = progress.find((x) => x.sesiNumber === n);
    if (p?.isCompleted) return "completed";
    if (n === currentSesi) return "active";
    if (p?.wasSkipped) return "skipped";
    if (isUnlocked(n, progress)) return "unlocked";
    return "locked";
  };

  const statusIcon = (status: string) => {
    if (status === "completed")
      return (
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      );
    if (status === "locked")
      return (
        <svg className="w-3.5 h-3.5 text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    if (status === "active")
      return <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />;
    return <span className="w-2 h-2 rounded-full bg-[#475569]" />;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0D0D14] border-r border-[#1E1E2E]">
      <div className="p-4 border-b border-[#1E1E2E] flex items-center justify-between">
        <span className="font-display font-bold text-sm text-white">
          AI<span className="text-[#A855F7]">GYPT</span>
        </span>
        <button onClick={onClose} className="md:hidden text-[#475569] hover:text-white transition-colors p-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-3 px-2">
        {sesiList.map((sesi) => {
          const status = sesiStatus(sesi.sesiNumber);
          const isActive = sesi.sesiNumber === currentSesi;
          return (
            <button
              key={sesi.sesiNumber}
              onClick={() => onSesiClick(sesi.sesiNumber)}
              className={`w-full text-left rounded-xl px-3 py-3 mb-1 flex items-center gap-3 transition-all duration-200 ${
                isActive
                  ? "bg-[#7C3AED]/15 border border-[#7C3AED]/40 shadow-[0_0_12px_rgba(124,58,237,0.15)]"
                  : "border border-transparent hover:bg-[#12121A] hover:border-[#1E1E2E]"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  status === "completed"
                    ? "bg-[#7C3AED]"
                    : isActive
                    ? "bg-[#7C3AED]/20 border border-[#7C3AED]/40"
                    : "bg-[#12121A] border border-[#1E1E2E]"
                }`}
              >
                {statusIcon(status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-mono mb-0.5 ${isActive ? "text-[#A855F7]" : "text-[#475569]"}`}>
                  SESI {String(sesi.sesiNumber).padStart(2, "0")}
                </p>
                <p className={`text-xs leading-snug truncate ${isActive ? "text-white font-medium" : status === "locked" ? "text-[#475569]" : "text-[#94A3B8]"}`}>
                  {sesi.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="p-3 border-t border-[#1E1E2E]">
        <Link href={`/kelas/${kelasId}`}>
          <span className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer px-2 py-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Kelas
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-56 flex-shrink-0 flex-col h-full">{sidebarContent}</div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MateriPage() {
  const params = useParams<{ kelasId: string; sesi: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const kelasId = params.kelasId || "maksimalkan-ai";
  const sesiNum = parseInt(params.sesi?.replace("sesi-", "") || "0");
  const kelasMateri = materiByKelas[kelasId] ?? [];
  const totalSesi = kelasMateri.length;
  const isValid = sesiNum >= 1 && sesiNum <= (totalSesi || 6);

  const { data: rawProgress } = useGetProgress({
    query: { queryKey: getGetProgressQueryKey(), enabled: isAuthenticated },
  });
  const markComplete = useMarkComplete();

  const allProgress: ProgressEntry[] = (Array.isArray(rawProgress) ? rawProgress : []) as ProgressEntry[];
  // Filter to only this class's progress (fall back to all if kelasId not yet in entry, e.g. old data)
  const progress: ProgressEntry[] = allProgress.filter(
    (p) => !p.kelasId || p.kelasId === kelasId
  );
  const sesiData: SesiMateri | undefined = kelasMateri.find(
    (s) => s.sesiNumber === sesiNum
  );

  // Step state
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [skipModal, setSkipModal] = useState<number | null>(null);

  // Restore saved step position
  useEffect(() => {
    const savedStep = progress.find((p) => p.sesiNumber === sesiNum)?.currentStep;
    if (savedStep && savedStep > 0 && sesiData && savedStep < sesiData.steps.length) {
      setCurrentStep(savedStep);
    } else {
      setCurrentStep(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesiNum]);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) setLocation("/login");
  }, [authLoading, isAuthenticated, setLocation]);

  // Debounced step auto-save
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveStep = useCallback(
    (step: number) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        fetch("/api/progress/step", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ kelasId, sesiNumber: sesiNum, currentStep: step }),
        }).catch(() => {});
      }, 800);
    },
    [sesiNum]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0F" }}>
        <svg className="animate-spin w-8 h-8 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  // No materi for this class yet (coming-soon) or invalid sesi — redirect to class detail
  if (!isValid || !sesiData) {
    setLocation(`/kelas/${kelasId}`, { replace: true });
    return null;
  }

  // Guard: sesi valid but steps array is empty (content not yet ready)
  if (!sesiData.steps || sesiData.steps.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: "#0A0A0F" }}
      >
        <div className="text-[#A855F7] text-5xl mb-4">⚙</div>
        <h2 className="text-2xl font-semibold text-[#FAFAFA] mb-2">
          Materi Sedang Disiapkan
        </h2>
        <p className="text-[#A1A1AA] max-w-md">
          Konten untuk sesi ini sedang dalam proses penyusunan.
          Silakan kembali lagi nanti atau lanjut ke sesi yang sudah tersedia.
        </p>
        <button
          onClick={() => setLocation(`/kelas/${kelasId}`)}
          className="mt-6 px-6 py-2.5 rounded-lg bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition"
        >
          Kembali ke Daftar Sesi
        </button>
      </div>
    );
  }

  const steps = sesiData.steps;
  const totalSteps = steps.length;
  const safeStepIndex = Math.min(Math.max(currentStep, 0), totalSteps - 1);
  const step = steps[safeStepIndex];

  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0F" }}>
        <svg className="animate-spin w-8 h-8 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  const completedSet = new Set(progress.filter((p) => p.isCompleted).map((p) => p.sesiNumber));
  const isSesiCompleted = completedSet.has(sesiNum);
  const progressPct = ((safeStepIndex + 1) / totalSteps) * 100;

  function goTo(index: number) {
    if (index < 0 || index >= totalSteps) return;
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
    saveStep(index);
  }

  function goNext() {
    if (currentStep < totalSteps - 1) {
      goTo(currentStep + 1);
    }
  }

  function goPrev() {
    if (currentStep > 0) {
      goTo(currentStep - 1);
    }
  }

  async function handleComplete() {
    try {
      await markComplete.mutateAsync({ data: { kelasId, sesiNumber: sesiNum } });
      queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
      setShowCompletion(true);
    } catch {
      // silent
    }
  }

  function handleSesiClick(n: number) {
    setSidebarOpen(false);
    if (n === sesiNum) return;
    if (!isUnlocked(n, progress)) {
      setSkipModal(n);
      return;
    }
    setLocation(`/kelas/${kelasId}/materi/sesi-${n}`);
  }

  async function handleSkipConfirm(n: number) {
    setSkipModal(null);
    await fetch("/api/progress/skip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ kelasId, sesiNumber: n - 1 }),
    }).catch(() => {});
    queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
    setLocation(`/kelas/${kelasId}/materi/sesi-${n}`);
  }

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* ── TOP BAR ── */}
      <div className="flex-shrink-0 flex items-center h-12 border-b border-[#1E1E2E] bg-[#0D0D14] px-3 gap-3 z-30">
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-[#94A3B8] hover:text-white transition-colors p-1 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Session info */}
        <div className="flex-shrink-0 hidden md:block">
          <span className="text-xs font-mono text-[#475569]">
            SESI {String(sesiNum).padStart(2, "0")}: 
          </span>
          <span className="text-xs text-[#94A3B8] hidden lg:inline">{sesiData.title}</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-[#1E1E2E] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#475569] flex-shrink-0">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>

        {/* Step type badge */}
        <span
          className={`flex-shrink-0 hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded border ${
            step.type === "concept"
              ? "text-[#A855F7] bg-[#7C3AED]/10 border-[#7C3AED]/30"
              : "text-blue-400 bg-blue-400/10 border-blue-400/30"
          }`}
        >
          {step.type === "concept" ? "KONSEP" : "PRAKTEK"}
        </span>

        {/* Exit */}
        <Link href={`/kelas/${kelasId}`}>
          <span className="flex-shrink-0 flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-[#12121A]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="hidden sm:inline">Keluar</span>
          </span>
        </Link>
      </div>

      {/* ── MAIN ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentSesi={sesiNum}
          kelasId={kelasId}
          progress={progress}
          onSesiClick={handleSesiClick}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Dot-grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(124,58,237,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Step content with animation */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    x: d > 0 ? 40 : -40,
                    opacity: 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({
                    x: d > 0 ? -40 : 40,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 overflow-hidden"
              >
                {step.type === "concept" ? (
                  <ConceptSlide step={step} />
                ) : (
                  <PracticePanel step={step} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── BOTTOM NAV ── */}
          <div className="flex-shrink-0 border-t border-[#1E1E2E] bg-[#0D0D14] px-4 py-3 flex items-center gap-4 z-10">
            {/* Prev */}
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-2 rounded-lg hover:bg-[#12121A] flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            {/* Dots */}
            <div className="flex-1 flex justify-center">
              <DotsNav
                total={totalSteps}
                current={currentStep}
                onDotClick={goTo}
              />
            </div>

            {/* Next / Complete */}
            {isLastStep ? (
              isSesiCompleted ? (
                <div className="flex items-center gap-2 text-xs text-green-400 font-mono px-3 py-2 rounded-lg border border-green-400/30 bg-green-400/10 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Selesai
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={markComplete.isPending}
                  className="flex items-center gap-2 text-sm text-white font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 px-4 py-2 rounded-lg transition-all shadow-[0_0_16px_rgba(124,58,237,0.3)] flex-shrink-0"
                >
                  {markComplete.isPending ? (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="hidden sm:inline">Selesaikan Sesi</span>
                      <span className="sm:hidden">Selesai</span>
                    </>
                  )}
                </button>
              )
            ) : (
              <button
                onClick={goNext}
                className="flex items-center gap-2 text-sm text-[#A855F7] hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-[#12121A] flex-shrink-0"
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {skipModal !== null && (
          <SkipModal
            sesiNum={skipModal}
            onConfirm={() => handleSkipConfirm(skipModal)}
            onCancel={() => setSkipModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCompletion && (
          <CompletionCelebration
            sesiNum={sesiNum}
            onNext={() => {
              setShowCompletion(false);
              setLocation(`/kelas/${kelasId}/materi/sesi-${sesiNum + 1}`);
            }}
            onDashboard={() => {
              setShowCompletion(false);
              setLocation(`/kelas/${kelasId}`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
