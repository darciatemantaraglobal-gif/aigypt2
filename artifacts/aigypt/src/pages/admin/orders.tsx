import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CopyButton } from "@/components/admin/CopyButton";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { adminFetch } from "@/hooks/use-admin-auth";

interface Order {
  id: string; orderId: string; name: string; email: string; phone: string;
  memberType: string; batchNumber: number | null; grossAmount: number;
  couponCode?: string | null; discountAmount?: number | null; finalAmount?: number | null;
  status: string; accessCode: string | null; paidAt: string | null; createdAt: string;
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  color: "#FAFAFA", fontFamily: "'Inter',sans-serif", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none",
};

function buildWaText(o: { name: string; email: string; phone: string; memberType: string; accessCode: string | null }): string {
  const type = o.memberType === "kelas" ? "Member Kelas" : "Member Mandiri";
  return `Halo ${o.name}! Pembayaran AIGYPT kamu sudah dikonfirmasi.\n\nPaket: ${type}\nKode Akses: ${o.accessCode ?? "(belum ada)"}\n\nCara login:\n1. Buka aigypt.vercel.app/login\n2. Masukkan email: ${o.email}\n3. Masukkan kode akses di atas\n\nSelamat belajar! 🎉`;
}

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", memberType: "mandiri", batchNumber: "1", amount: "", status: "paid" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [lastCreated, setLastCreated] = useState<{ orderId: string; accessCode: string | null; name: string; email: string; phone: string; memberType: string } | null>(null);

  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [markPaidTarget, setMarkPaidTarget] = useState<string | null>(null);
  const [markingPaid, setMarkingPaid] = useState(false);
  const [toast, setToast] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (filterStatus !== "all") p.set("status", filterStatus);
    if (filterType !== "all") p.set("type", filterType);
    try {
      const r = await adminFetch(`/admin/orders/list?${p}`);
      const d = await r.json() as { orders: Order[] };
      setOrders(d.orders);
    } catch { /* handled */ }
    finally { setLoading(false); }
  }, [filterStatus, filterType]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setFormError(""); setSubmitting(true);
    try {
      const r = await adminFetch("/admin/orders/create", {
        method: "POST",
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, memberType: form.memberType, batchNumber: +form.batchNumber, amount: +form.amount.replace(/\D/g, ""), status: form.status }),
      });
      const d = await r.json() as { success?: boolean; orderId?: string; accessCode?: string | null; error?: string };
      if (!r.ok) { setFormError(d.error ?? "Gagal menyimpan"); return; }
      setLastCreated({ orderId: d.orderId!, accessCode: d.accessCode ?? null, name: form.name, email: form.email, phone: form.phone, memberType: form.memberType });
      showToast("Pesanan dicatat!");
      setForm({ name: "", email: "", phone: "", memberType: "mandiri", batchNumber: "1", amount: "", status: "paid" });
      fetchOrders();
    } finally { setSubmitting(false); }
  };

  const handleMarkPaid = async () => {
    if (!markPaidTarget) return;
    setMarkingPaid(true);
    try {
      const r = await adminFetch(`/admin/orders/${markPaidTarget}/mark-paid`, { method: "POST" });
      const d = await r.json() as { success?: boolean; accessCode?: string; error?: string };
      if (!r.ok) { showToast(d.error ?? "Gagal"); return; }
      showToast(`Lunas! Kode: ${d.accessCode}`);
      fetchOrders();
    } finally { setMarkingPaid(false); setMarkPaidTarget(null); }
  };

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await adminFetch(`/admin/orders/${cancelTarget}/cancel`, { method: "POST" });
      showToast("Pesanan dibatalkan");
      fetchOrders();
    } finally { setCancelling(false); setCancelTarget(null); }
  };

  return (
    <AdminLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm font-medium max-w-xs" style={{ background: "#101018", border: "1px solid rgba(168,85,247,0.4)", color: "#A855F7" }}>
          {toast}
        </div>
      )}
      <ConfirmModal open={!!markPaidTarget} title="Tandai Lunas?" message="Pesanan akan ditandai lunas dan kode akses akan digenerate otomatis." confirmLabel="Tandai Lunas" onConfirm={handleMarkPaid} onCancel={() => setMarkPaidTarget(null)} loading={markingPaid} danger={false} />
      <ConfirmModal open={!!cancelTarget} title="Batalkan Pesanan?" message="Pesanan akan dibatalkan. Kode akses yang sudah dikirim tetap valid." confirmLabel="Batalkan" onConfirm={handleCancel} onCancel={() => setCancelTarget(null)} loading={cancelling} />

      <div className="mb-6">
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Pesanan</h1>
        <p className="text-sm mt-1" style={{ color: "#71717A" }}>Tracking pembayaran manual transfer bank</p>
      </div>

      {/* Add order form */}
      <div className="rounded-xl mb-6" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => setShowForm(v => !v)} className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          <span>+ Catat Pesanan Manual</span>
          <span style={{ color: "#52525B" }}>{showForm ? "▲" : "▼"}</span>
        </button>
        {showForm && (
          <div className="px-5 pb-6 pt-2">
            <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "NAMA", key: "name", placeholder: "Nama lengkap", type: "text" },
                { label: "EMAIL", key: "email", placeholder: "email@contoh.com", type: "email" },
                { label: "WHATSAPP", key: "phone", placeholder: "6281234567890", type: "text" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ ...inputStyle, width: "100%" }} required />
                </div>
              ))}
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>TIPE MEMBER</label>
                <select value={form.memberType} onChange={e => setForm(v => ({ ...v, memberType: e.target.value }))} style={{ ...inputStyle, width: "100%", appearance: "none" }}>
                  <option value="mandiri">Mandiri</option>
                  <option value="kelas">Kelas</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>BATCH</label>
                <input type="number" min={1} value={form.batchNumber} onChange={e => setForm(v => ({ ...v, batchNumber: e.target.value }))} style={{ ...inputStyle, width: "100%" }} />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>JUMLAH TRANSFER (RP)</label>
                <input type="text" value={form.amount} onChange={e => setForm(v => ({ ...v, amount: e.target.value }))} placeholder="500000" style={{ ...inputStyle, width: "100%" }} required />
              </div>
              <div>
                <label className="block text-xs font-mono mb-1.5" style={{ color: "#52525B", letterSpacing: "0.1em" }}>STATUS</label>
                <select value={form.status} onChange={e => setForm(v => ({ ...v, status: e.target.value }))} style={{ ...inputStyle, width: "100%", appearance: "none" }}>
                  <option value="paid">Lunas</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-3">
                {formError && <p className="text-xs" style={{ color: "#f87171" }}>{formError}</p>}
                <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white self-start"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", opacity: submitting ? 0.7 : 1, fontFamily: "'Space Grotesk',sans-serif" }}>
                  {submitting ? "Menyimpan..." : "Catat Pesanan & Generate Kode"}
                </button>
              </div>
            </form>

            {lastCreated && (
              <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <p className="text-xs font-mono mb-3" style={{ color: "#4ade80", letterSpacing: "0.1em" }}>✓ PESANAN DICATAT</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <p className="text-xs" style={{ color: "#71717A" }}>Order ID</p>
                    <p className="font-mono text-sm" style={{ color: "#FAFAFA" }}>{lastCreated.orderId}</p>
                  </div>
                  {lastCreated.accessCode && (
                    <div>
                      <p className="text-xs" style={{ color: "#71717A" }}>Kode Akses</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm" style={{ color: "#A855F7" }}>{lastCreated.accessCode}</p>
                        <CopyButton text={lastCreated.accessCode} label="Salin" />
                      </div>
                    </div>
                  )}
                  {lastCreated.accessCode && (
                    <a
                      href={`https://wa.me/${lastCreated.phone.replace(/\D/g, "")}?text=${encodeURIComponent(buildWaText(lastCreated))}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium"
                      style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80" }}
                    >
                      Buka WhatsApp → Kirim Kode
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: 160, appearance: "none" }}>
          <option value="all">Semua Status</option>
          <option value="pending_qris">Menunggu QRIS</option>
          <option value="pending">Pending</option>
          <option value="paid">Lunas</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ ...inputStyle, width: 140, appearance: "none" }}>
          <option value="all">Semua Tipe</option>
          <option value="mandiri">Mandiri</option>
          <option value="kelas">Kelas</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "'Inter',sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Nama / Email", "Tipe", "Jumlah", "Kupon", "Status", "Kode Akses", "Tanggal", "Aksi"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono" style={{ color: "#52525B", letterSpacing: "0.08em" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-10 text-sm" style={{ color: "#52525B" }}>Memuat...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-sm" style={{ color: "#52525B" }}>Tidak ada pesanan</td></tr>
              ) : orders.map(o => {
                const isExpanded = expandedOrder === o.id;
                const hasCoupon = !!(o.couponCode && o.discountAmount && o.discountAmount > 0);
                const displayAmount = o.finalAmount ?? o.grossAmount;

                return (
                  <>
                    <tr
                      key={o.id}
                      style={{ borderBottom: isExpanded ? "none" : "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
                      onClick={() => setExpandedOrder(isExpanded ? null : o.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm" style={{ color: "#FAFAFA" }}>{o.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#71717A" }}>{o.email}</div>
                        {o.phone && <div className="text-xs" style={{ color: "#52525B" }}>{o.phone}</div>}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={o.memberType} /></td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-xs" style={{ color: "#A1A1AA" }}>{formatRp(displayAmount)}</div>
                        {hasCoupon && (
                          <div className="font-mono text-xs line-through" style={{ color: "#52525B" }}>{formatRp(o.grossAmount)}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {hasCoupon ? (
                          <span className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.12)", color: "#A855F7", border: "1px solid rgba(124,58,237,0.2)" }}>
                            {o.couponCode}
                          </span>
                        ) : (
                          <span style={{ color: "#3F3F46" }}>—</span>
                        )}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                      <td className="px-4 py-3">
                        {o.accessCode ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs" style={{ color: "#A855F7" }}>{o.accessCode}</span>
                            <CopyButton text={o.accessCode} label="Salin" />
                            <a href={`https://wa.me/${o.phone.replace(/\D/g, "")}?text=${encodeURIComponent(buildWaText(o))}`} target="_blank" rel="noopener noreferrer"
                              className="text-xs px-2 py-0.5 rounded" style={{ color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.06)" }}>WA</a>
                          </div>
                        ) : <span style={{ color: "#3F3F46" }}>—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#52525B" }}>{new Date(o.createdAt).toLocaleDateString("id-ID")}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          {(o.status === "pending" || o.status === "pending_qris") && (
                            <>
                              <button onClick={() => setMarkPaidTarget(o.orderId)} className="text-xs px-2.5 py-1 rounded whitespace-nowrap" style={{ color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.06)" }}>Tandai Lunas</button>
                              <button onClick={() => setCancelTarget(o.orderId)} className="text-xs px-2.5 py-1 rounded" style={{ color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}>Batal</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && hasCoupon && (
                      <tr key={`${o.id}-detail`} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td colSpan={8} className="px-4 pb-4 pt-0">
                          <div className="rounded-xl p-3 text-xs space-y-1.5" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}>
                            <p className="font-mono mb-2" style={{ color: "#7C3AED", letterSpacing: "0.08em" }}>RINCIAN HARGA</p>
                            <div className="flex justify-between" style={{ color: "#71717A" }}>
                              <span>Harga Normal</span>
                              <span className="font-mono">{formatRp(o.grossAmount)}</span>
                            </div>
                            <div className="flex justify-between" style={{ color: "#A855F7" }}>
                              <span>Diskon ({o.couponCode})</span>
                              <span className="font-mono">- {formatRp(o.discountAmount!)}</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-1" style={{ color: "#FAFAFA", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                              <span>Total Diterima</span>
                              <span className="font-mono" style={{ color: "#A855F7" }}>{formatRp(o.finalAmount ?? displayAmount)}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#52525B" }}>{orders.length} pesanan</p>
        </div>
      </div>
    </AdminLayout>
  );
}
