import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { adminFetch } from "@/hooks/use-admin-auth";

interface Member {
  id: string; email: string; name: string | null; username: string | null; memberType: string; batchNumber: number | null;
  accessCode: string | null; completedSessions: number; totalSessions: number;
  createdAt: string; lastLogin: string | null;
}
interface MemberDetail {
  member: { email: string; name: string | null; username: string | null; memberType: string; batchNumber: number | null; accessCode: string | null; createdAt: string; lastLogin: string | null };
  progress: { sesiNumber: number; kelasId: string; isCompleted: boolean; currentStep: number; wasSkipped: boolean; completedAt: string | null }[];
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  color: "#FAFAFA", fontFamily: "'Inter',sans-serif", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none",
};

function AddMemberModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [memberType, setMemberType] = useState<"kelas" | "mandiri">("kelas");
  const [accessCode, setAccessCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ accessCode: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const r = await adminFetch("/admin/members/create", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          username: username.trim() || undefined,
          memberType,
          accessCode: accessCode.trim() || undefined,
        }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error ?? "Gagal menambahkan member");
        return;
      }
      setResult({ accessCode: d.accessCode });
      onCreated();
    } catch {
      setError("Gagal menambahkan member");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.accessCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl border p-6 max-w-sm w-full" style={{ background: "#101018", borderColor: "rgba(255,255,255,0.08)" }}>
        {result ? (
          <div>
            <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Member Ditambahkan</h3>
            <p className="text-xs mb-4" style={{ color: "#71717A" }}>Kirim kode akses ini ke peserta lewat WhatsApp.</p>
            <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 mb-4" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)" }}>
              <span className="font-mono text-sm" style={{ color: "#A855F7" }}>{result.accessCode}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs px-3 py-1.5 rounded-lg font-mono"
                style={{ color: copied ? "#4ade80" : "#A855F7", border: "1px solid rgba(124,58,237,0.3)" }}
              >
                {copied ? "Tersalin" : "Copy"}
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-sm text-white font-medium"
              style={{ background: "#7C3AED" }}
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Tambah Member</h3>
            {error && (
              <p className="text-xs mb-3 px-3 py-2 rounded-lg" style={{ color: "#f87171", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>NAMA</label>
                <input required value={name} onChange={e => setName(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
              </div>
              <div>
                <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>EMAIL</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
              </div>
              <div>
                <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>USERNAME (opsional)</label>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Otomatis dari email jika dikosongkan" style={{ ...inputStyle, width: "100%" }} />
              </div>
              <div>
                <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>TIPE MEMBER</label>
                <select value={memberType} onChange={e => setMemberType(e.target.value as "kelas" | "mandiri")} style={{ ...inputStyle, width: "100%", appearance: "none" }}>
                  <option value="kelas">Kelas</option>
                  <option value="mandiri">Mandiri</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>KODE AKSES (opsional)</label>
                <input value={accessCode} onChange={e => setAccessCode(e.target.value)} placeholder="Otomatis jika dikosongkan" style={{ ...inputStyle, width: "100%" }} />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border text-sm"
                style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm text-white font-medium disabled:opacity-50"
                style={{ background: "#7C3AED" }}
              >
                {saving ? "Menyimpan..." : "Tambah"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function EditMemberModal({
  member,
  onClose,
  onSaved,
}: {
  member: Member;
  onClose: () => void;
  onSaved: (updated: { email: string }) => void;
}) {
  const [name, setName] = useState(member.name ?? "");
  const [email, setEmail] = useState(member.email);
  const [username, setUsername] = useState(member.username ?? "");
  const [memberType, setMemberType] = useState<"kelas" | "mandiri">(member.memberType as "kelas" | "mandiri");
  const [batchNumber, setBatchNumber] = useState(String(member.batchNumber ?? ""));
  const [accessCode, setAccessCode] = useState(member.accessCode ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const r = await adminFetch(`/admin/members/${encodeURIComponent(member.email)}/update`, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          username: username.trim() || undefined,
          memberType,
          batchNumber: batchNumber ? Number(batchNumber) : undefined,
          accessCode: accessCode.trim() || undefined,
        }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error ?? "Gagal menyimpan perubahan");
        return;
      }
      onSaved({ email: d.email });
      onClose();
    } catch {
      setError("Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl border p-6 max-w-sm w-full" style={{ background: "#101018", borderColor: "rgba(255,255,255,0.08)" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Edit Member</h3>
          {error && (
            <p className="text-xs mb-3 px-3 py-2 rounded-lg" style={{ color: "#f87171", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              {error}
            </p>
          )}
          <div className="space-y-3 mb-5">
            <div>
              <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>NAMA</label>
              <input required value={name} onChange={e => setName(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
            </div>
            <div>
              <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>EMAIL</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
            </div>
            <div>
              <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>USERNAME</label>
              <input value={username} onChange={e => setUsername(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
            </div>
            <div>
              <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>TIPE MEMBER</label>
              <select value={memberType} onChange={e => setMemberType(e.target.value as "kelas" | "mandiri")} style={{ ...inputStyle, width: "100%", appearance: "none" }}>
                <option value="kelas">Kelas</option>
                <option value="mandiri">Mandiri</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>BATCH</label>
              <input type="number" value={batchNumber} onChange={e => setBatchNumber(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
            </div>
            <div>
              <label className="text-xs font-mono block mb-1" style={{ color: "#52525B" }}>KODE AKSES</label>
              <input value={accessCode} onChange={e => setAccessCode(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border text-sm"
              style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-sm text-white font-medium disabled:opacity-50"
              style={{ background: "#7C3AED" }}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Member | null>(null);

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
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onCreated={() => { showToast("Member ditambahkan"); fetchMembers(); }}
        />
      )}
      {editTarget && (
        <EditMemberModal
          member={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={() => { showToast("Perubahan member disimpan"); setExpanded(null); setDetail(null); fetchMembers(); }}
        />
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Member</h1>
          <p className="text-sm mt-1" style={{ color: "#71717A" }}>Kelola semua member yang terdaftar</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="text-sm px-4 py-2.5 rounded-xl text-white font-medium transition-colors"
          style={{ background: "#7C3AED" }}
        >
          + Tambah Member
        </button>
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
                      {m.username && <div className="text-xs mt-0.5 font-mono" style={{ color: "#52525B" }}>@{m.username}</div>}
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
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); setEditTarget(m); }}
                          className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                          style={{ color: "#A855F7", border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.06)" }}
                        >
                          Edit
                        </button>
                        <span className="text-xs" style={{ color: expanded === m.email ? "#A855F7" : "#52525B" }}>{expanded === m.email ? "▲" : "▼"}</span>
                      </div>
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
                                <p className="text-xs font-mono mb-1" style={{ color: "#52525B", letterSpacing: "0.08em" }}>USERNAME</p>
                                <p className="text-xs font-mono" style={{ color: "#A1A1AA" }}>{detail.member.username ? `@${detail.member.username}` : "—"}</p>
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
