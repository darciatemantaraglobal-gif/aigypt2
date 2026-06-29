import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth, useLogoutAction } from "@/hooks/use-auth";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { handleLogout, isPending } = useLogoutAction();
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1E1E2E] bg-[#0A0A0F]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <span className="font-display font-bold text-xl text-white tracking-tight cursor-pointer">
              AI<span className="text-[#A855F7]">GYPT</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/kurikulum">
              <span className={`text-sm font-medium transition-colors cursor-pointer ${location === "/kurikulum" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                Kurikulum
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/kelas">
                  <span className={`text-sm font-medium transition-colors cursor-pointer ${location === "/kelas" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                    Kelas
                  </span>
                </Link>
                <Link href="/dashboard">
                  <span className={`text-sm font-medium transition-colors cursor-pointer ${location === "/dashboard" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                    Dashboard
                  </span>
                </Link>
                <Link href="/toolbox">
                  <span className={`text-sm font-medium transition-colors cursor-pointer ${location === "/toolbox" ? "text-[#A855F7]" : "text-[#94A3B8] hover:text-white"}`}>
                    Toolbox
                  </span>
                </Link>
                {user?.name && (
                  <span className="text-xs text-[#94A3B8] border border-[#1E1E2E] rounded-full px-3 py-1 font-mono">
                    {user.memberType === "kelas" ? `Batch ${user.batchNumber}` : "Mandiri"}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="text-sm text-[#94A3B8] hover:text-white transition-colors disabled:opacity-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link href="/login">
                <span className="text-sm font-medium px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                  Masuk
                </span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#94A3B8] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden border-t border-[#1E1E2E] py-4 flex flex-col gap-4">
            <Link href="/kurikulum" onClick={() => setMenuOpen(false)}>
              <span className="block text-sm font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Kurikulum</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/kelas" onClick={() => setMenuOpen(false)}>
                  <span className="block text-sm font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Kelas</span>
                </Link>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <span className="block text-sm font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Dashboard</span>
                </Link>
                <Link href="/toolbox" onClick={() => setMenuOpen(false)}>
                  <span className="block text-sm font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer">Toolbox</span>
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-left text-sm text-[#94A3B8] hover:text-white transition-colors"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <span className="block text-sm font-medium text-[#A855F7] cursor-pointer">Masuk</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
