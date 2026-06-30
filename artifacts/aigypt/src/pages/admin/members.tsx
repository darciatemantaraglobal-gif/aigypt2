import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { adminFetch } from "@/hooks/use-admin-auth";

interface Member {
  id: string; email: string; name: string | null; memberType: string; batchNumber: number | null;
  accessCode: string | null; completedSessions: number; totalSessions: number;
  createdAt: string; lastLogin: string | null;
}
interface MemberDetail {
  member: { email: string; name: string | null; memberType: string; batchNumber: number | null; accessCode: string | null; createdAt: string; lastLogin: string | null };
  progress: { sesiNumber: number; kelasId: string; isCompleted: boolean; currentStep: number; wasSkipped: boolean; completedAt: string | null }[];
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  color: "#FAFAFA", fontFamily: "'Inter',sans-serif", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none",
};

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterBatch, setFilterBatch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [detail, setDetail] = useState<MemberDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [resetTarget, setResetTarget] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (filterType !== "all") p.set("type", filterType);
    if (filterBatch) p.set("batch", filterBatch);
    try {
      const r = await adminFetch(`/admin/members/list?${p}`);
      const d = await r.json() as { members: Member[] };
      setMembers(d.members);
    } catch { /* handled */ }
    finally { setLoading(false); }
  }, [search, filterType, filterBatch]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleExpand = async (email: string) => {
    if (expanded === email) { setExpanded(null); setDetail(null); return; }
    setExpanded(email); setDetailLoading(true); setDetail(null);
    try {
      const r = await adminFetch(`/admin/members/${encodeURIComponent(email)}/detail`);
      setDetail(await r.json() as MemberDetail);
    } finally { setDetailLoading(false); }
  };

  const handleResetProgress = async () => {
    if (!resetTarget) return;
    setResetting(true);
    try {
      await adminFetch(`/admin/members/${encodeURIComponent(resetTarget)}/reset-progress`, { method: "POST" });
      showToast("Progress direset");
      setDetail(prev => prev ? { ...prev, progress: [] } : prev);
      fetchMembers();
    } finally { setResetting(false); setResetTarget(null); }
  };

  return (
    <AdminLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: "#101018", border: "1px solid rgba(168,85,247,0.4)", color: "#A855F7" }}>
          {toast}
        </div>
      )}
      <ConfirmModal open={!!resetTarget} title="Reset Progress?" message={`Progress belajar ${resetTarget} akan dihapus semua. Aksi ini tidak bisa dibatalkan.`} confirmLabel="Reset Progress" onConfirm={handleResetProgress} onCancel={() => setResetTarget(null)} loading={resetting} />

      <div className="mb-6">
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Member</h1>
        <p className="text-sm mt-1" style={{ color: "#71717A" }}>Kelola semua member yang terdaftar</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama / email..." style={{ ...inputStyle, width: 240 }} />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ ...inputStyle, width: 140, appearance: "none" }}>
          <option value="all">Semua Tipe</option>
          <option value="mandiri">Mandiri</option>
          <option value="kelas">Kelas</option>
        </select>
        <input value={filterBatch} onChange={e => setFilterBatch(e.target.value)} placeholder="Batch #" type="number" style={{ ...inputStyle, width: 90 }} />
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "'Inter',sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Nama / Email", "Tipe", "Batch", "Progress", "Terakhir Login", "Aksi"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono" style={{ color: "#52525B", letterSpacing: "0.08em" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-sm" style={{ color: "#52525B" }}>Memuat...</td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-sm" style={{ color: "#52525B" }}>Tidak ada member ditemukan</td></tr>
              ) : members.map(m => (
                <>
                  <tr key={m.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    className="cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => handleExpand(m.email)}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm" style={{ color: "#FAFAFA" }}>{m.name ?? "—"}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#71717A" }}>{m.email}</div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={m.memberType} /></td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#71717A" }}>{m.batchNumber ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full max-w-16" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full" style={{ background: "#7C3AED", width: `${(m.completedSessions / m.totalSessions) * 100}%` }} />
                        </div>
                        <span className="text-xs font-mono" style={{ color: "#71717A" }}>{m.completedSessions}/{m.totalSessions}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#52525B" }}>{m.lastLogin ? new Date(m.lastLogin).toLocaleDateString("id-ID") : "Belum pernah"}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs" style={{ color: expanded === m.email ? "#A855F7" : "#52525B" }}>{expanded === m.email ? "▲" : "▼"}</span>
                    </td>
                  </tr>
                  {expanded === m.email && (
                    <tr key={`${m.id}-detail`} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td colSpan={6} className="px-6 py-5" style={{ background: "rgba(124,58,237,0.04)" }}>
                        {detailLoading ? (
                          <p className="text-xs" style={{ color: "#52525B" }}>Memuat detail...</p>
                        ) : detail ? (
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-6">
                              <div>
                                <p className="text-xs font-mono mb-1" style={{ color: "#52525B", letterSpacing: "0.08em" }}>KODE AKSES</p>
                                <p className="text-xs font-mono" style={{ color: "#A855F7" }}>{detail.member.accessCode ?? "—"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-mono mb-1" style={{ color: "#52525B", letterSpacing: "0.08em" }}>TERDAFTAR</p>
                                <p className="text-xs" style={{ color: "#A1A1AA" }}>{new Date(detail.member.createdAt).toLocaleDateString("id-ID")}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-mono mb-2" style={{ color: "#52525B", letterSpacing: "0.08em" }}>PROGRESS SESI</p>
                              <div className="flex flex-wrap gap-2">
                                {[...Array(6)].map((_, i) => {
                                  const p = detail.progress.find(x => x.sesiNumber === i + 1);
                                  const status = p?.isCompleted ? "selesai" : p?.wasSkipped ? "skip" : p ? "jalan" : "belum";
                                  const color = { selesai: "#4ade80", skip: "#fbbf24", jalan: "#60a5fa", belum: "#3F3F46" }[status];
                                  return (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono" style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}>
                                        {i + 1}
                                      </div>
                                      <span className="text-xs" style={{ color: "#52525B", fontSize: 10 }}>{status}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <button onClick={() => setResetTarget(m.email)} className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}>
                              Reset Progress
                            </button>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#52525B" }}>{members.length} member</p>
        </div>
      </div>
    </AdminLayout>
  );
}
