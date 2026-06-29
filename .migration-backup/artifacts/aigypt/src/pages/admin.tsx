import { useState } from "react";
import { useGenerateCodes, useListCodes, getListCodesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [type, setType] = useState<"mandiri" | "kelas">("mandiri");
  const [batchNumber, setBatchNumber] = useState<number>(1);
  const [count, setCount] = useState<number>(5);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [generateError, setGenerateError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const generateCodes = useGenerateCodes();
  const { data: codes, isLoading } = useListCodes({
    query: { queryKey: getListCodesQueryKey(), enabled: authed },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        setAuthError("");
      } else {
        setAuthError("Password salah.");
      }
    } catch {
      setAuthError("Gagal terhubung ke server.");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerateError("");
    try {
      const result = await generateCodes.mutateAsync({
        data: {
          type,
          batchNumber: type === "kelas" ? batchNumber : null,
          count,
        },
      });
      setGeneratedCodes(result.codes);
      queryClient.invalidateQueries({ queryKey: getListCodesQueryKey() });
    } catch (err: any) {
      setGenerateError(err?.response?.data?.error || err?.data?.error || "Gagal generate kode.");
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(generatedCodes.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0F" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <div className="rounded-2xl border border-[#1E1E2E] bg-[#12121A] p-8">
              <h1 className="font-display font-bold text-xl text-white mb-1">Admin Panel</h1>
              <p className="text-xs text-[#94A3B8] mb-6">Masukkan password admin untuk melanjutkan</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full px-4 py-3 rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
                {authError && <p className="text-xs text-red-400">{authError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-sm transition-all"
                >
                  Masuk
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0F" }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <h1 className="font-display font-bold text-2xl text-white mb-8">Admin — Generate Kode Akses</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generate form */}
          <div className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-6">
            <h2 className="font-display font-semibold text-white text-sm mb-5">Generate Kode Baru</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Tipe Member</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "mandiri" | "kelas")}
                  className="w-full px-4 py-3 rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
                >
                  <option value="mandiri">Member Mandiri</option>
                  <option value="kelas">Member Kelas</option>
                </select>
              </div>

              {type === "kelas" && (
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Nomor Batch</label>
                  <input
                    type="number"
                    min={1}
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(parseInt(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">Jumlah Kode (1–100)</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[#1E1E2E] bg-[#0A0A0F] text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
              </div>

              {generateError && <p className="text-xs text-red-400">{generateError}</p>}

              <button
                type="submit"
                disabled={generateCodes.isPending}
                className="w-full py-3 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-all"
              >
                {generateCodes.isPending ? "Generating..." : "Generate Kode"}
              </button>
            </form>

            {generatedCodes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono text-[#A855F7]">{generatedCodes.length} kode berhasil dibuat</p>
                  <button onClick={copyAll} className="text-xs text-[#94A3B8] hover:text-white transition-colors font-mono">
                    {copied === "all" ? "Tersalin semua" : "Salin semua"}
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {generatedCodes.map((code) => (
                    <div key={code} className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#1E1E2E] bg-[#0A0A0F]">
                      <span className="font-mono text-sm text-[#A855F7] tracking-widest">{code}</span>
                      <button onClick={() => copyCode(code)} className="text-xs text-[#94A3B8] hover:text-white transition-colors ml-2 font-mono">
                        {copied === code ? "Tersalin" : "Salin"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* All codes list */}
          <div className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-6">
            <h2 className="font-display font-semibold text-white text-sm mb-5">
              Semua Kode ({codes?.length ?? 0})
            </h2>
            {isLoading ? (
              <p className="text-xs text-[#94A3B8]">Memuat...</p>
            ) : (
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1E1E2E]">
                      {["Kode", "Tipe", "Status", "Email"].map((h) => (
                        <th key={h} className="px-2 py-2 text-left font-mono text-[#7C3AED] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(codes || []).map((code) => (
                      <tr key={code.id} className="border-b border-[#1E1E2E]/50 last:border-0">
                        <td className="px-2 py-2 font-mono text-[#A855F7] tracking-wider">{code.code}</td>
                        <td className="px-2 py-2 text-[#94A3B8]">{code.type}{code.batchNumber ? ` B${code.batchNumber}` : ""}</td>
                        <td className="px-2 py-2">
                          <span className={`font-mono px-1.5 py-0.5 rounded ${code.isUsed ? "text-green-400 bg-green-400/10" : "text-[#94A3B8] bg-[#1E1E2E]"}`}>
                            {code.isUsed ? "Terpakai" : "Kosong"}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-[#94A3B8] truncate max-w-[100px]">{code.usedByEmail || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
