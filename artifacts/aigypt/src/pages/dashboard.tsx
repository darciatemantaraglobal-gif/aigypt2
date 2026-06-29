import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useGetProgress, getGetProgressQueryKey } from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sessions = [
  { num: 1, title: "AI Itu Bukan Sulap, Tapi Hampir" },
  { num: 2, title: "Ngomong yang Bener, Dapet yang Bener" },
  { num: 3, title: "AI Jadi Asisten Akademik & Organisasi Lo" },
  { num: 4, title: "AI Jadi Mesin Cuan Lo" },
  { num: 5, title: "Lo Bisa Bikin Aplikasi Sendiri" },
  { num: 6, title: "Ini Solusi Gue" },
];

function ProgressCircle({ num, status }: { num: number; status: "completed" | "current" | "locked" }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
          status === "completed"
            ? "bg-[#7C3AED] text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]"
            : status === "current"
            ? "border-2 border-[#7C3AED] text-[#A855F7] animate-pulse bg-[#7C3AED]/10"
            : "border border-[#1E1E2E] text-[#475569] bg-[#12121A]"
        }`}
      >
        {status === "completed" ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          String(num).padStart(2, "0")
        )}
      </div>
      <span className="text-[10px] font-mono text-[#475569]">S{num}</span>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { data: progress, isLoading: progressLoading } = useGetProgress({
    query: { queryKey: getGetProgressQueryKey(), enabled: isAuthenticated },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0F" }}>
        <div className="text-center">
          <svg className="animate-spin w-8 h-8 text-[#7C3AED] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-[#94A3B8] text-sm">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) return null;

  const completedSet = new Set((progress || []).filter((p) => p.isCompleted).map((p) => p.sesiNumber));
  const totalCompleted = completedSet.size;

  const getSessionStatus = (num: number): "completed" | "current" | "locked" => {
    if (completedSet.has(num)) return "completed";
    if (num === totalCompleted + 1 || totalCompleted === 0 && num === 1) return "current";
    return "locked";
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
            Ahlan, {user.name || user.email.split("@")[0]}!
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-[#7C3AED]/40 text-[#A855F7] bg-[#7C3AED]/10">
              {user.memberType === "kelas" ? `Member Kelas — Batch ${user.batchNumber}` : "Member Mandiri"}
            </span>
            <span className="text-xs text-[#94A3B8]">{totalCompleted}/6 sesi selesai</span>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="border border-[#1E1E2E] bg-[#12121A] p-5 mb-8" style={{ borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)" }}>
          <h2 className="font-display font-semibold text-white text-sm mb-5">Progress Belajar</h2>
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2">
            {sessions.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <ProgressCircle num={s.num} status={getSessionStatus(s.num)} />
                {i < sessions.length - 1 && (
                  <div className={`hidden sm:block h-0.5 w-8 rounded-full transition-colors duration-300 ${completedSet.has(s.num) ? "bg-[#7C3AED]" : "bg-[#1E1E2E]"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-1.5 rounded-full bg-[#1E1E2E] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] transition-all duration-500"
                style={{ width: `${(totalCompleted / 6) * 100}%` }}
              />
            </div>
            <p className="text-xs text-[#94A3B8] mt-2">{Math.round((totalCompleted / 6) * 100)}% selesai</p>
          </div>
        </div>

        {/* Session cards */}
        <h2 className="font-display font-semibold text-white text-sm mb-4">Materi Kelas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((s) => {
            const status = getSessionStatus(s.num);
            const isCompleted = status === "completed";
            const isCurrent = status === "current";

            return (
              <div
                key={s.num}
                className={`group border p-5 transition-all duration-300 ${
                  isCompleted
                    ? "border-[#7C3AED]/40 bg-[#12121A] hover:border-[#7C3AED]/60"
                    : isCurrent
                    ? "border-[#7C3AED]/50 bg-[#12121A]"
                    : "border-[#1E1E2E] bg-[#12121A]/50"
                }`}
                style={{
                  borderRadius: "12px",
                  boxShadow: isCurrent ? "0px 4px 12px rgba(0,0,0,0.3)" : "none",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#7C3AED] tracking-widest">SESI {String(s.num).padStart(2, "0")}</span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? "text-green-400 bg-green-400/10 border border-green-400/30"
                        : isCurrent
                        ? "text-[#A855F7] bg-[#7C3AED]/10 border border-[#7C3AED]/30"
                        : "text-[#475569] bg-[#1E1E2E] border border-[#1E1E2E]"
                    }`}
                  >
                    {isCompleted ? "Selesai" : isCurrent ? "Aktif" : "Terkunci"}
                  </span>
                </div>
                <h3 className={`font-display font-semibold text-sm mb-4 leading-tight ${isCompleted || isCurrent ? "text-white" : "text-[#475569]"}`}>
                  {s.title}
                </h3>
                {(isCompleted || isCurrent) ? (
                  <Link href={`/kelas/maksimalkan-ai/materi/sesi-${s.num}`}>
                    <span
                      className={`block text-center text-base font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
                        isCompleted ? "text-[#A855F7]" : "text-white"
                      }`}
                      style={{
                        background: isCompleted ? "transparent" : "#7C3AED",
                        border: isCompleted ? "1px solid rgba(124,58,237,0.3)" : "none",
                        borderRadius: "12px",
                        padding: "15px 24px",
                        minHeight: "48px",
                        boxShadow: isCompleted ? "none" : "0px 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {isCompleted ? "Buka Lagi" : "Mulai Belajar"}
                    </span>
                  </Link>
                ) : (
                  <span className="block text-center text-base font-medium border border-[#1E1E2E] text-[#475569] cursor-not-allowed flex items-center justify-center" style={{ borderRadius: "12px", padding: "15px 24px", minHeight: "48px" }}>
                    Belum Dimulai
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Kelas info */}
        {user.memberType === "kelas" && (
          <div className="mt-8 border border-[#7C3AED]/30 p-5" style={{ background: "rgba(124,58,237,0.08)", borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0,0,0,0.3)" }}>
            <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-2">Info Batch {user.batchNumber}</p>
            <p className="text-sm text-[#94A3B8]">
              Jadwal sesi live akan dikomunikasikan melalui grup WhatsApp batch lo. Pastikan lo sudah tergabung di grup alumni AIGYPT Batch {user.batchNumber}.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
