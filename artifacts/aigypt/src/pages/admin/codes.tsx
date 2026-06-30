import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CopyButton } from "@/components/admin/CopyButton";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/hooks/use-admin-auth";

interface Code {
  id: string; code: string; type: string; batchNumber: number | null;
  isUsed: boolean; usedByEmail: string | null; usedAt: string | null;
  createdAt: string; orderId: string | null;
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  color: "#FAFAFA", fontFamily: "'Inter',sans-serif", borderRadius: 8, padding: "8px 12px", fontSize: 13, width: "100%", outline: "none",
};

export default function AdminCodes() {
  const [type, setType] = useState("mandiri");
  const [batchNum, setBatchNum] = useState(1);
  const [genCount, setGenCount] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [newCodes, setNewCodes] = useState<string[]>([]);

  const [codes, setCodes] = useState<Code[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState("all");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const fetchCodes = useCallback(async (p = page) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(p) });
    if (filterType !== "all") params.set("type", filterType);
    if (filterBatch) params.set("batch", filterBatch);
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search) params.set("search", search);
    try {
      const r = await adminFetch(`/admin/codes/list?${params}`);
      const d = await r.json() as { codes: Code[]; total: number; page: number };
      setCodes(d.codes); setTotal(d.total); setPage(p);
    } catch { /* redirect handled in adminFetch */ }
    finally { setLoading(false); }
  }, [filterType, filterBatch, filterStatus, search, page]);

  useEffect(() => { fetchCodes(1); }, [filterType, filterBatch, filterStatus, search]); // eslint-disable-line

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault(); setGenError(""); setGenerating(true);
    try {
      const r = await adminFetch("/admin/codes/generate", { method: "POST", body: JSON.stringify({ type, batchNumber: batchNum, count: genCount }) });
      const d = await r.json() as { codes?: string[]; error?: string };
      if (!r.ok) { setGenError(d.error ?? "Gagal generate"); return; }
      setNewCodes(d.codes ?? []);
      showToast(`${d.codes?.length ?? 0} kode berhasil dibuat`);
      fetchCodes(1);
    } finally { setGenerating(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const r = await adminFetch(`/admin/codes/${deleteTarget}`, { method: "DELETE" });
      const d = await r.json() as { success?: boolean; error?: string };
      if (!r.ok) { showToast(d.error ?? "Gagal hapus"); }
      else { showToast("Kode dihapus"); fetchCodes(page); }
    } finally { setDeleting(false); setDeleteTarget(null); }
  };

  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <AdminLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: "#101018", border: "1px solid rgba(168,85,247,0.4)", color: "#A855F7" }}>
          {toast}
        </div>
      )}
      <ConfirmModal open={!!deleteTarget} title="Hapus Kode?" message={`Kode ${deleteTarget} akan dihapus permanen.`} confirmLabel="Hapus" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />

      <div className="mb-6">
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Kode Akses</h1>
        <p className="text-sm mt-1" style={{ color: "#71717A" }}>Generate dan kelola kode akses member</p>
      </div>

      {/* Generate */}
      <div className="rounded-xl p-6 mb-6" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Generate Kode Baru</h2>
        <form onSubmit={handleGenerate} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-32">
            <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>TIPE</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
              <option value="mandiri">Mandiri</option>
              <option value="kelas">Kelas</option>
            </select>
          </div>
          <div className="w-28">
            <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>BATCH</label>
            <input type="number" min={1} value={batchNum} onChange={e => setBatchNum(+e.target.value)} style={inputStyle} />
          </div>
          <div className="w-28">
            <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>JUMLAH</label>
            <input type="number" min={1} max={50} value={genCount} onChange={e => setGenCount(+e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" disabled={generating}
            className="px-6 py-2 rounded-lg text-sm font-semibold text-white transition-opacity"
            style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", opacity: generating ? 0.7 : 1, fontFamily: "'Space Grotesk',sans-serif", whiteSpace: "nowrap" }}>
            {generating ? "Generating..." : "Generate"}
          </button>
        </form>
        {genError && <p className="text-xs mt-3" style={{ color: "#f87171" }}>{genError}</p>}

        {newCodes.length > 0 && (
          <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-mono" style={{ color: "#A855F7" }}>{newCodes.length} kode baru</p>
              <CopyButton text={newCodes.join("\n")} label="Salin Semua" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {newCodes.map(c => (
                <div key={c} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <span className="font-mono text-xs" style={{ color: "#A855F7", letterSpacing: "0.05em" }}>{c}</span>
                  <CopyButton text={c} label="Salin" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kode / email..." style={{ ...inputStyle, width: 220 }} />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ ...inputStyle, width: 130, appearance: "none" }}>
          <option value="all">Semua Tipe</option>
          <option value="mandiri">Mandiri</option>
          <option value="kelas">Kelas</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: 150, appearance: "none" }}>
          <option value="all">Semua Status</option>
          <option value="unused">Tersedia</option>
          <option value="used">Terpakai</option>
        </select>
        <input value={filterBatch} onChange={e => setFilterBatch(e.target.value)} placeholder="Batch #" type="number" style={{ ...inputStyle, width: 90 }} />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "'Inter',sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Kode", "Tipe", "Batch", "Status", "Digunakan Oleh", "Dibuat", "Aksi"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono" style={{ color: "#52525B", letterSpacing: "0.08em" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-10 text-sm" style={{ color: "#52525B" }}>Memuat...</td></tr>
              ) : codes.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-sm" style={{ color: "#52525B" }}>Tidak ada kode ditemukan</td></tr>
              ) : codes.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs" style={{ color: "#A855F7", letterSpacing: "0.05em" }}>{c.code}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={c.type} /></td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#71717A" }}>{c.batchNumber ?? "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.isUsed ? "used" : "unused"} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#A1A1AA", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.usedByEmail ?? "—"}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#52525B" }}>{new Date(c.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-3">
                    {!c.isUsed && (
                      <button onClick={() => setDeleteTarget(c.code)} className="text-xs px-2.5 py-1 rounded transition-colors" style={{ color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}>
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs" style={{ color: "#52525B" }}>{total} kode total</p>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => fetchCodes(page - 1)} className="px-3 py-1 rounded text-xs disabled:opacity-30" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#A1A1AA" }}>← Prev</button>
              <span className="px-3 py-1 text-xs" style={{ color: "#71717A" }}>{page}/{totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => fetchCodes(page + 1)} className="px-3 py-1 rounded text-xs disabled:opacity-30" style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#A1A1AA" }}>Next →</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
