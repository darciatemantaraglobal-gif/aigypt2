import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useGetProgress, useMarkComplete, getGetProgressQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { lazy, Suspense } from "react";

const sesiComponents = [
  lazy(() => import("./sesi-1")),
  lazy(() => import("./sesi-2")),
  lazy(() => import("./sesi-3")),
  lazy(() => import("./sesi-4")),
  lazy(() => import("./sesi-5")),
  lazy(() => import("./sesi-6")),
];

const sesiMeta = [
  { num: 1, title: "AI Itu Bukan Sulap, Tapi Hampir" },
  { num: 2, title: "Ngomong yang Bener, Dapet yang Bener" },
  { num: 3, title: "AI Jadi Asisten Akademik & Organisasi Lo" },
  { num: 4, title: "AI Jadi Mesin Cuan Lo" },
  { num: 5, title: "Lo Bisa Bikin Aplikasi Sendiri" },
  { num: 6, title: "Ini Solusi Gue" },
];

export default function MateriPage() {
  const params = useParams<{ sesi: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [markSuccess, setMarkSuccess] = useState(false);

  const sesiNum = parseInt(params.sesi?.replace("sesi-", "") || "0");
  const isValid = sesiNum >= 1 && sesiNum <= 6;

  const { data: progress } = useGetProgress({
    query: { queryKey: getGetProgressQueryKey(), enabled: isAuthenticated },
  });
  const markComplete = useMarkComplete();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0F" }}>
        <div className="text-center">
          <svg className="animate-spin w-8 h-8 text-[#7C3AED] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-[#94A3B8] text-sm">Memuat materi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isValid) return null;

  const completedSet = new Set((progress || []).filter((p) => p.isCompleted).map((p) => p.sesiNumber));
  const isCompleted = completedSet.has(sesiNum);
  const meta = sesiMeta[sesiNum - 1];
  const SesiComponent = sesiComponents[sesiNum - 1];

  const prevSesi = sesiNum > 1 ? sesiNum - 1 : null;
  const nextSesi = sesiNum < 6 ? sesiNum + 1 : null;
  const prevLocked = prevSesi ? false : false;
  const nextLocked = nextSesi ? !completedSet.has(sesiNum) : false;

  const handleMarkComplete = async () => {
    if (isCompleted) return;
    try {
      await markComplete.mutateAsync({ data: { sesiNumber: sesiNum } });
      queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
      setMarkSuccess(true);
      setTimeout(() => setMarkSuccess(false), 3000);
    } catch {
      // silent
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-8">
          <Link href="/dashboard">
            <span className="hover:text-white transition-colors cursor-pointer">Dashboard</span>
          </Link>
          <span>/</span>
          <span className="text-[#A855F7]">Sesi {String(sesiNum).padStart(2, "0")}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#7C3AED] tracking-widest font-bold uppercase">
              Sesi {String(sesiNum).padStart(2, "0")}
            </span>
            {isCompleted && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 border border-green-400/30">
                Selesai
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">{meta.title}</h1>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm">
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-6 h-6 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          }>
            <SesiComponent />
          </Suspense>
        </div>

        {/* Mark complete & navigation */}
        <div className="mt-12 pt-8 border-t border-[#1E1E2E]">
          {!isCompleted ? (
            <div className="mb-6">
              <button
                onClick={handleMarkComplete}
                disabled={markComplete.isPending}
                className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 text-white font-semibold rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
              >
                {markComplete.isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Menyimpan...
                  </>
                ) : markSuccess ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Sesi Ditandai Selesai!
                  </>
                ) : (
                  "Tandai Sesi Ini Selesai"
                )}
              </button>
            </div>
          ) : (
            <div className="mb-6 flex items-center gap-2 p-3 rounded-lg border border-green-500/30 bg-green-500/10">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-green-400 font-medium">Sesi ini sudah ditandai selesai</p>
            </div>
          )}

          <div className="flex justify-between gap-4">
            {prevSesi ? (
              <Link href={`/materi/sesi-${prevSesi}`}>
                <span className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Sesi {prevSesi}
                </span>
              </Link>
            ) : <span />}

            {nextSesi ? (
              nextLocked ? (
                <span className="flex items-center gap-2 text-sm text-[#475569] cursor-not-allowed">
                  Sesi {nextSesi}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              ) : (
                <Link href={`/materi/sesi-${nextSesi}`}>
                  <span className="flex items-center gap-2 text-sm text-[#A855F7] hover:text-white transition-colors cursor-pointer">
                    Sesi {nextSesi}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              )
            ) : (
              <Link href="/dashboard">
                <span className="flex items-center gap-2 text-sm text-[#A855F7] hover:text-white transition-colors cursor-pointer">
                  Kembali ke Dashboard
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
