import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth, useLogoutAction } from "@/hooks/use-auth";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { handleLogout, isPending } = useLogoutAction();
  const [location] = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("aigypt-bar-dismissed")) {
      setBarVisible(true);
    }
  }, []);

  function dismissBar() {
    sessionStorage.setItem("aigypt-bar-dismissed", "1");
    setBarVisible(false);
  }

  return (
    <div className="sticky top-0 z-50">
      {barVisible && (
        <div className="relative flex items-center justify-center gap-3 py-2 px-6 text-center" style={{ background: "#7C3AED" }}>
          <p className="font-mono text-xs tracking-widest text-white" style={{ letterSpacing: "0.15em" }}>
            PENDAFTARAN BATCH 1 DIBUKA · KELAS DIMULAI 5 JULI 2026 · TEMPAT TERBATAS
          </p>
          <button
            onClick={dismissBar}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Tutup"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    <nav className="border-b border-[#1E1E2E] bg-[#0A0A0F]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link href={isAuthenticated ? "/kelas" : "/"}>
            <span className="font-display font-bold text-xl text-white tracking-tight cursor-pointer">
              AI<span className="text-[#A855F7]">GYPT</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/kurikulum">
              <span className={`text-base font-normal px-4 py-2 transition-colors cursor-pointer ${location === "/kurikulum" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                Kurikulum
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/kelas">
                  <span className={`text-base font-normal px-4 py-2 transition-colors cursor-pointer ${location === "/kelas" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                    Kelas
                  </span>
                </Link>
                <Link href="/dashboard">
                  <span className={`text-base font-normal px-4 py-2 transition-colors cursor-pointer ${location === "/dashboard" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                    Belajar Saya
                  </span>
                </Link>
                <Link href="/toolbox">
                  <span className={`text-base font-normal px-4 py-2 transition-colors cursor-pointer ${location === "/toolbox" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                    Toolbox
                  </span>
                </Link>
                {user?.name && (
                  <span className="text-xs text-[#94A3B8] border border-[#1E1E2E] rounded-full px-3 py-1 font-mono ml-2">
                    {user.memberType === "kelas" ? `Batch ${user.batchNumber}` : "Mandiri"}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="text-base font-normal px-4 py-2 text-[#94A3B8] hover:text-white transition-colors disabled:opacity-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link href="/login">
                <span
                  className="text-base font-medium text-white cursor-pointer transition-all duration-200 ml-4"
                  style={{
                    background: "#7C3AED",
                    borderRadius: "12px",
                    padding: "15px 24px",
                    display: "inline-block",
                    minHeight: "48px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6D28D9")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#7C3AED")}
                >
                  Masuk
                </span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
            style={{ borderRadius: "14px", background: "rgba(255,255,255,0.1)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#1E1E2E] py-4 flex flex-col gap-2">
            <Link href="/kurikulum" onClick={() => setMenuOpen(false)}>
              <span className="block text-base font-normal px-4 py-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Kurikulum</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/kelas" onClick={() => setMenuOpen(false)}>
                  <span className="block text-base font-normal px-4 py-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Kelas</span>
                </Link>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <span className="block text-base font-normal px-4 py-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Belajar Saya</span>
                </Link>
                <Link href="/toolbox" onClick={() => setMenuOpen(false)}>
                  <span className="block text-base font-normal px-4 py-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Toolbox</span>
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-left text-base font-normal px-4 py-2 text-[#94A3B8] hover:text-white transition-colors"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <span className="block text-base font-medium px-4 py-2 text-[#A855F7] cursor-pointer">Masuk</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
    </div>
  );
}
