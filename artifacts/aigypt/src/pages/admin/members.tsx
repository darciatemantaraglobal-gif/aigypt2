import { useEffect, useState, useCallback, Fragment } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { CopyButton } from "@/components/admin/CopyButton";
import { adminFetch } from "@/hooks/use-admin-auth";

interface Member {
  id: string; email: string; name: string | null; username: string | null; memberType: string; batchNumber: number | null;
  accessCode: string | null; completedSessions: number; totalSessions: number;
  createdAt: string; lastLogin: string | null; accessRevoked: boolean;
}
interface MemberDetail {
  member: { email: string; name: string | null; username: string | null; memberType: string; batchNumber: number | null; accessCode: string | null; createdAt: string; lastLogin: string | null };
  progress: { sesiNumber: number; kelasId: string; isCompleted: boolean; currentStep: number; wasSkipped: boolean; completedAt: string | null }[];
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  color: "#FAFAFA", fontFamily: "'Inter',sans-serif", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none",
};

function isPlaceholderMember(m: { email: string }): boolean {
  return m.email.endsWith("@placeholder.aigypt.id");
}

function buildMemberWaText(m: { name: string | null; email: string; memberType: string; batchNumber: number | null; accessCode: string | null }): string {
  const type = m.memberType === "kelas" ? "Member Kelas" : "Member Mandiri";
  return `Halo ${m.name}! Ini info login AIGYPT kamu.\n\nPaket: ${type} - Batch ${m.batchNumber ?? "—"}\nEmail: ${m.email}\nKode Akses: ${m.accessCode ?? "(belum ada kode akses)"}\n\nCara login:\n1. Buka aigypt.id/login\n2. Masukkan email di atas\n3. Masukkan kode akses di atas\n\nSelamat belajar! 🎉`;
}

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
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [result, setResult] = useState<{ accessCode: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorDetail(null);
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
        setErrorDetail(d.detail ?? null);
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
              <div className="mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>
                {errorDetail && <p className="text-xs mt-1 font-mono" style={{ color: "#71717A" }}>{errorDetail}</p>}
              </div>
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
  onStaleRefresh,
}: {
  member: Member;
  onClose: () => void;
  onSaved: (updated: { email: string }) => void;
  onStaleRefresh: () => void;
}) {
  const [name, setName] = useState(member.name ?? "");
  const [email, setEmail] = useState(member.email);
  const [username, setUsername] = useState(member.username ?? "");
  const [memberType, setMemberType] = useState<"kelas" | "mandiri">(member.memberType as "kelas" | "mandiri");
  const [batchNumber, setBatchNumber] = useState(String(member.batchNumber ?? ""));
  const [accessCode, setAccessCode] = useState(member.accessCode ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Guard eksplisit tambahan selain disabled={saving} di tombol — mencegah
    // request kedua terkirim kalau ada race condition (klik cepat / re-render).
    if (saving) return;
    setError("");
    setErrorDetail(null);
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
        if (r.status === 404 && typeof d.error === "string" && d.error.includes("tidak ditemukan")) {
          // Kemungkinan besar percobaan submit sebelumnya sudah berhasil dan email
          // member ini sudah berubah, jadi lookup dengan email lama gagal. Beri
          // pesan yang jelas dan refresh list di background supaya admin melihat
          // kondisi data yang sebenarnya tanpa perlu reload manual.
          setError("Member ini sudah tidak ditemukan dengan email lama — kemungkinan perubahan sebelumnya sudah tersimpan. Silakan refresh halaman untuk melihat data terbaru.");
          onStaleRefresh();
          return;
        }
        setError(d.error ?? "Gagal menyimpan perubahan");
        setErrorDetail(d.detail ?? null);
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
            <div className="mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>
              {errorDetail && <p className="text-xs mt-1 font-mono" style={{ color: "#71717A" }}>{errorDetail}</p>}
            </div>
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
  const [debouncedSearch, setDebouncedSearch] = useState("");
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
  const [revokeTarget, setRevokeTarget] = useState<Member | null>(null);
  const [revoking, setRevoking] = useState(false);
  const [restoringEmail, setRestoringEmail] = useState<string | null>(null);
  const [showAutoPanel, setShowAutoPanel] = useState(false);
  const [autoType, setAutoType] = useState<"kelas" | "mandiri">("kelas");
  const [autoCount, setAutoCount] = useState(1);
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoError, setAutoError] = useState("");
  const [autoResult, setAutoResult] = useState<{ accessCode: string; email: string; orderId: string }[]>([]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  // Debounce: tunda request 400ms setelah user berhenti mengetik
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(id);
  }, [search]);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (debouncedSearch) p.set("search", debouncedSearch);
    if (filterType !== "all") p.set("type", filterType);
    if (filterBatch) p.set("batch", filterBatch);
    try {
      const r = await adminFetch(`/admin/members/list?${p}`);
      const d = await r.json() as { members?: Member[] };
      setMembers(d.members ?? []);
    } catch { /* redirect handled in adminFetch */ }
    finally { setLoading(false); }
  }, [debouncedSearch, filterType, filterBatch]);

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

  const handleRevokeAccess = async () => {
    if (!revokeTarget) return;
    setRevoking(true);
    try {
      await adminFetch(`/admin/members/${encodeURIComponent(revokeTarget.email)}/revoke-access`, { method: "POST" });
      showToast(`Akses ${revokeTarget.name ?? revokeTarget.email} dicabut`);
      fetchMembers();
    } finally { setRevoking(false); setRevokeTarget(null); }
  };

  const handleRestoreAccess = async (m: Member) => {
    setRestoringEmail(m.email);
    try {
      await adminFetch(`/admin/members/${encodeURIComponent(m.email)}/restore-access`, { method: "POST" });
      showToast(`Akses ${m.name ?? m.email} diaktifkan kembali`);
      fetchMembers();
    } finally { setRestoringEmail(null); }
  };

  return (
    <AdminLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: "#101018", border: "1px solid rgba(168,85,247,0.4)", color: "#A855F7" }}>
          {toast}
        </div>
      )}
      <ConfirmModal open={!!resetTarget} title="Reset Progress?" message={`Progress belajar ${resetTarget} akan dihapus semua. Aksi ini tidak bisa dibatalkan.`} confirmLabel="Reset Progress" onConfirm={handleResetProgress} onCancel={() => setResetTarget(null)} loading={resetting} />
      <ConfirmModal
        open={!!revokeTarget}
        title="Cabut Akses?"
        message={`Akses ${revokeTarget?.name ?? revokeTarget?.email} akan dicabut. Dia tidak akan bisa login lagi, termasuk sesi yang sedang aktif. Lanjutkan?`}
        confirmLabel="Cabut Akses"
        onConfirm={handleRevokeAccess}
        onCancel={() => setRevokeTarget(null)}
        loading={revoking}
      />
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
          onStaleRefresh={fetchMembers}
        />
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Member</h1>
          <p className="text-sm mt-1" style={{ color: "#71717A" }}>Kelola semua member yang terdaftar</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const eligible = members.filter(m => !isPlaceholderMember(m));
              if (eligible.length === 0) {
                showToast("Tidak ada member dengan data lengkap untuk disalin");
                return;
              }
              const combined = eligible.map(m => buildMemberWaText(m)).join("\n----------\n");
              navigator.clipboard.writeText(combined).then(() => {
                showToast(`${eligible.length} pesan disalin`);
              }).catch(() => {
                const el = document.createElement("textarea");
                el.value = combined;
                document.body.appendChild(el);
                el.select();
                document.execCommand("copy");
                document.body.removeChild(el);
                showToast(`${eligible.length} pesan disalin`);
              });
            }}
            className="text-sm px-4 py-2.5 rounded-xl font-medium transition-colors"
            style={{ background: "transparent", border: "1px solid rgba(124,58,237,0.5)", color: "#A855F7" }}
          >
            Copy Semua
          </button>
          <button
            onClick={() => { setShowAutoPanel(p => !p); setAutoResult([]); setAutoError(""); }}
            className="text-sm px-4 py-2.5 rounded-xl font-medium transition-colors"
            style={{ background: "transparent", border: "1px solid rgba(124,58,237,0.5)", color: "#A855F7" }}
          >
            Auto Tambah
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-sm px-4 py-2.5 rounded-xl text-white font-medium transition-colors"
            style={{ background: "#7C3AED" }}
          >
            + Tambah Member
          </button>
        </div>
      </div>

      {/* Panel Auto Tambah */}
      {showAutoPanel && (
        <div className="rounded-xl p-6 mb-6" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Auto Tambah Member</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setAutoError(""); setAutoResult([]); setAutoLoading(true);
              try {
                const r = await adminFetch("/admin/members/auto-create", {
                  method: "POST",
                  body: JSON.stringify({ memberType: autoType, count: autoCount, batchNumber: 3 }),
                });
                const d = await r.json() as { created?: { accessCode: string; email: string; orderId: string }[]; error?: string };
                if (!r.ok || d.error) { setAutoError(d.error ?? "Gagal membuat slot member"); return; }
                setAutoResult(d.created ?? []);
                fetchMembers();
              } catch { setAutoError("Gagal terhubung ke server"); }
              finally { setAutoLoading(false); }
            }}
            className="flex flex-wrap gap-4 items-end"
          >
            <div className="flex-1 min-w-32">
              <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>TIPE</label>
              <select value={autoType} onChange={e => setAutoType(e.target.value as "kelas" | "mandiri")} style={{ ...inputStyle, appearance: "none" }}>
                <option value="kelas">Kelas</option>
                <option value="mandiri">Mandiri</option>
              </select>
            </div>
            <div className="w-28">
              <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>JUMLAH</label>
              <input type="number" min={1} max={20} value={autoCount} onChange={e => setAutoCount(+e.target.value)} style={inputStyle} />
            </div>
            <button type="submit" disabled={autoLoading}
              className="px-6 py-2 rounded-lg text-sm font-semibold text-white transition-opacity"
              style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", opacity: autoLoading ? 0.7 : 1, fontFamily: "'Space Grotesk',sans-serif", whiteSpace: "nowrap" }}>
              {autoLoading ? "Membuat..." : "Buat Slot"}
            </button>
          </form>
          {autoError && <p className="text-xs mt-3" style={{ color: "#f87171" }}>{autoError}</p>}

          {autoResult.length > 0 && (
            <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono" style={{ color: "#A855F7" }}>{autoResult.length} slot baru dibuat</p>
                <CopyButton text={autoResult.map(r => r.accessCode).join("\n")} label="Salin Semua" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {autoResult.map(r => (
                  <div key={r.accessCode} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                    <span className="font-mono text-xs" style={{ color: "#A855F7", letterSpacing: "0.05em" }}>{r.accessCode}</span>
                    <CopyButton text={r.accessCode} label="Salin" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
                <Fragment key={m.id}>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    className="cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => handleExpand(m.email)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm" style={{ color: "#FAFAFA" }}>{m.name ?? "—"}</span>
                        {m.email.endsWith("@placeholder.aigypt.id") && (
                          <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.25)" }}>Belum diisi</span>
                        )}
                        {m.accessRevoked && (
                          <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}>Akses Dicabut</span>
                        )}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: m.email.endsWith("@placeholder.aigypt.id") ? "#52525B" : "#71717A" }}>{m.email}</div>
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
                        {!isPlaceholderMember(m) && (
                          <span onClick={e => e.stopPropagation()}>
                            <CopyButton text={buildMemberWaText(m)} label="Salin Pesan" />
                          </span>
                        )}
                        {!isPlaceholderMember(m) && (
                          m.accessRevoked ? (
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); handleRestoreAccess(m); }}
                              disabled={restoringEmail === m.email}
                              className="text-xs px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50"
                              style={{ color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)" }}
                            >
                              {restoringEmail === m.email ? "Memproses..." : "Aktifkan Lagi"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); setRevokeTarget(m); }}
                              className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                              style={{ color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)" }}
                            >
                              Cabut Akses
                            </button>
                          )
                        )}
                        <span className="text-xs" style={{ color: expanded === m.email ? "#A855F7" : "#52525B" }}>{expanded === m.email ? "▲" : "▼"}</span>
                      </div>
                    </td>
                  </tr>
                  {expanded === m.email && (
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
                </Fragment>
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
