import { useState } from "react";
import { useLocation } from "wouter";
import { useLogin, getGetMeQueryKey, getGetProgressQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Masukkan email yang valid.");
      return;
    }
    if (!code.trim()) {
      setError("Kode akses tidak boleh kosong.");
      return;
    }

    try {
      await login.mutateAsync({ data: { email: email.toLowerCase(), code: code.trim().toUpperCase() } });
      await queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
      await queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
      setLocation("/kelas");
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.data?.error || "Kode akses tidak valid atau sudah digunakan.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-[#1E1E2E] bg-[#12121A] p-8 shadow-[0_0_40px_rgba(124,58,237,0.15)]">
            <div className="text-center mb-8">
              <div className="font-display font-bold text-2xl text-white mb-1">
                Masuk ke AI<span className="text-[#A855F7]">GYPT</span>
              </div>
              <p className="text-sm text-[#94A3B8]">Masukkan email dan kode akses yang kamu terima</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kamu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] text-white placeholder-[#475569] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                  Kode Akses
                </label>
                <div className="relative">
                  <input
                    type={showCode ? "text" : "password"}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="AIGYPT-XXXXXX"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] text-white placeholder-[#475569] text-sm font-mono tracking-widest focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
                    aria-label={showCode ? "Sembunyikan kode" : "Tampilkan kode"}
                  >
                    {showCode ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg p-3 border border-red-500/30 bg-red-500/10">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={login.isPending}
                className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2"
              >
                {login.isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi...
                  </>
                ) : "Masuk"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="https://wa.me/628xxxxxxxxxx?text=Halo, saya belum punya kode akses AIGYPT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#94A3B8] hover:text-[#A855F7] transition-colors"
              >
                Belum punya akses? Hubungi kami via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
