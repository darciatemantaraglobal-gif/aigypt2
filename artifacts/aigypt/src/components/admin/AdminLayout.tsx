import { useLocation, Link } from "wouter";
import { useAdminAuth, adminFetch } from "@/hooks/use-admin-auth";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⬛" },
  { href: "/admin/codes", label: "Kode Akses", icon: "🔑" },
  { href: "/admin/members", label: "Member", icon: "👥" },
  { href: "/admin/orders", label: "Pesanan", icon: "📋" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAdmin } = useAdminAuth();
  const [location, setLocation] = useLocation();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#060608" }}>
        <div className="w-6 h-6 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!isAdmin) return null;

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await adminFetch("/admin/logout", { method: "POST" });
      setLocation("/admin/login");
    } catch {
      setLocation("/admin/login");
    }
  };

  const Sidebar = ({ mobile }: { mobile?: boolean }) => (
    <div
      className={`flex flex-col h-full ${mobile ? "" : ""}`}
      style={{ background: "#0A0A0F", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          AI<span style={{ color: "#A855F7" }}>GYPT</span>{" "}
          <span className="text-xs font-mono font-normal" style={{ color: "#52525B" }}>ADMIN</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(n => {
          const active = location === n.href;
          return (
            <Link key={n.href} href={n.href}>
              <a
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
                style={{
                  background: active ? "rgba(124,58,237,0.15)" : "transparent",
                  color: active ? "#A855F7" : "#A1A1AA",
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: active ? 600 : 400,
                }}
              >
                <span className="text-base leading-none" style={{ filter: active ? "none" : "grayscale(1) opacity(0.5)" }}>{n.icon}</span>
                {n.label}
              </a>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
          style={{ color: "#52525B", fontFamily: "'Inter',sans-serif" }}
        >
          <span>↪</span>
          {logoutLoading ? "Keluar..." : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#060608", color: "#FAFAFA" }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-56 shrink-0 fixed inset-y-0 left-0 z-20">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-56">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b" style={{ background: "#0A0A0F", borderColor: "rgba(255,255,255,0.06)" }}>
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded" style={{ color: "#A1A1AA" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="font-bold text-sm" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            AI<span style={{ color: "#A855F7" }}>GYPT</span> Admin
          </span>
        </div>
        <main className="flex-1 p-5 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
