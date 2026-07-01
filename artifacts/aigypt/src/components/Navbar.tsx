import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth, useLogoutAction } from "@/hooks/use-auth";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { handleLogout, isPending } = useLogoutAction();
  const [location, navigate] = useLocation();

  function handleLogoClick() {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }

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
        <div className="flex items-center py-2 pl-0 pr-3" style={{ background: "#7C3AED" }}>
          <div className="announcement-bar-outer">
            <div className="announcement-bar-track">
              <span className="announcement-text">
                PENDAFTARAN BATCH 3 DIBUKA &nbsp;·&nbsp; PERTEMUAN PERTAMA 6 JULI 2026 &nbsp;·&nbsp; TEMPAT TERBATAS &nbsp;&nbsp;
              </span>
              <span className="announcement-text">
                PENDAFTARAN BATCH 3 DIBUKA &nbsp;·&nbsp; PERTEMUAN PERTAMA 6 JULI 2026 &nbsp;·&nbsp; TEMPAT TERBATAS &nbsp;&nbsp;
              </span>
            </div>
          </div>
          <button
            onClick={dismissBar}
            className="flex-shrink-0 ml-2 text-white/70 hover:text-white transition-colors"
            aria-label="Tutup"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Gradient accent line at top of nav */}
      <div style={{ height: 3, width: "100%", background: "linear-gradient(90deg, #7C3AED, #A855F7, #7C3AED)" }} />

      <nav className="border-b border-[#1E1E2E] bg-[#0A0A0F]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <button onClick={handleLogoClick} className="relative cursor-pointer" aria-label="Ke halaman utama">
              {/* Logo glow effect */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  width: 120,
                  height: 36,
                  background: "radial-gradient(ellipse, rgba(124,58,237,0.2), transparent 70%)",
                  filter: "blur(12px)",
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
              <Logo variant="full" />
            </button>

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
                <div className="flex items-center gap-3 ml-2">
                  {/* Batch badge — desktop */}
                  <span
                    className="font-mono font-semibold"
                    style={{
                      background: "rgba(168,85,247,0.15)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "#C084FC",
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 6,
                      letterSpacing: "0.05em",
                    }}
                  >
                    BATCH 3
                  </span>
                  <Link href="/login">
                    <span
                      className="text-base font-medium text-white cursor-pointer transition-all duration-200"
                      style={{
                        background: "#7C3AED",
                        borderRadius: "12px",
                        padding: "12px 24px",
                        display: "inline-block",
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#6D28D9")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#7C3AED")}
                    >
                      Masuk
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile right side: badge + hamburger */}
            <div className="md:hidden flex items-center gap-3">
              {!isAuthenticated && (
                <span
                  className="font-mono font-semibold"
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    border: "1px solid rgba(168,85,247,0.3)",
                    color: "#C084FC",
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: "0.05em",
                  }}
                >
                  BATCH 3
                </span>
              )}

              {/* Hamburger button */}
              <button
                className="flex items-center justify-center transition-colors"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "#16161F",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: menuOpen ? "#A855F7" : "#A1A1AA",
                  flexShrink: 0,
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="transition-transform duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  {menuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu drawer */}
          {menuOpen && (
            <div className="md:hidden border-t border-[#1E1E2E] py-4 flex flex-col gap-1">
              {/* Logo in drawer */}
              <div className="px-4 pb-3 mb-1 border-b border-[#1E1E2E]">
                <Logo variant="full" />
              </div>

              <Link href="/kurikulum" onClick={() => setMenuOpen(false)}>
                <span className="block text-base font-normal px-4 py-2.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                  Kurikulum
                </span>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/kelas" onClick={() => setMenuOpen(false)}>
                    <span className="block text-base font-normal px-4 py-2.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                      Kelas
                    </span>
                  </Link>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                    <span className="block text-base font-normal px-4 py-2.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                      Belajar Saya
                    </span>
                  </Link>
                  <Link href="/toolbox" onClick={() => setMenuOpen(false)}>
                    <span className="block text-base font-normal px-4 py-2.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
                      Toolbox
                    </span>
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="text-left text-base font-normal px-4 py-2.5 text-[#94A3B8] hover:text-white transition-colors"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <div className="px-4 pt-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <span
                      className="block text-center text-base font-medium text-white cursor-pointer transition-all duration-200"
                      style={{
                        background: "#7C3AED",
                        borderRadius: 12,
                        padding: "12px 24px",
                      }}
                    >
                      Masuk
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
