import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const API_BASE = () => (import.meta.env.VITE_API_URL ?? "/api") as string;

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    fetch(`${API_BASE()}/admin/verify`, { credentials: "include" })
      .then(r => { if (r.ok) setLocation("/admin"); })
      .catch(() => {});
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) { setError("Password wajib diisi"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE()}/admin/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "Login gagal");
      } else {
        setLocation("/admin");
      }
    } catch {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#060608" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-bold text-2xl mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#FAFAFA" }}>
            AI<span style={{ color: "#A855F7" }}>GYPT</span>
          </div>
          <p className="text-sm font-mono" style={{ color: "#52525B", letterSpacing: "0.15em" }}>ADMIN PANEL</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h1 className="text-lg font-semibold mb-6 text-center text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            Masuk sebagai Admin
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "#71717A", letterSpacing: "0.1em" }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                placeholder="Password admin"
                autoFocus
                className="w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Inter',sans-serif",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity"
              style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", fontFamily: "'Space Grotesk',sans-serif", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Masuk..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#3F3F46", fontFamily: "'Inter',sans-serif" }}>
          Lupa password? Ubah di Replit Secrets.
        </p>
      </div>
    </div>
  );
}
