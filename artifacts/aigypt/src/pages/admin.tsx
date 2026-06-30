import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/hooks/use-admin-auth";

interface DashboardStats {
  totalMembers: number;
  unusedCodes: number;
  pendingOrders: number;
  paidOrders: number;
  recentOrders: { orderId: string; name: string; email: string; memberType: string; status: string; grossAmount: number; createdAt: string }[];
}

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
      <p className="text-xs font-mono mb-2" style={{ color: "#52525B", letterSpacing: "0.1em" }}>{label}</p>
      <p className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#FAFAFA" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "#71717A" }}>{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/admin/dashboard-stats")
      .then(r => r.json())
      .then(d => setStats(d as DashboardStats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#71717A", fontFamily: "'Inter',sans-serif" }}>Ringkasan data AIGYPT</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl animate-pulse" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)", height: 100 }} />
          ))}
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="TOTAL MEMBER" value={stats.totalMembers} />
            <StatCard label="KODE TERSEDIA" value={stats.unusedCodes} sub="Belum terpakai" />
            <StatCard label="PESANAN PENDING" value={stats.pendingOrders} sub="Menunggu konfirmasi" />
            <StatCard label="PESANAN LUNAS" value={stats.paidOrders} sub="Sudah dibayar" />
          </div>

          <div className="rounded-xl" style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>5 Pesanan Terbaru</h2>
              <Link href="/admin/orders">
                <a className="text-xs font-mono" style={{ color: "#A855F7" }}>Lihat Semua →</a>
              </Link>
            </div>
            {stats.recentOrders.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm" style={{ color: "#52525B" }}>Belum ada pesanan</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: "'Inter',sans-serif" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Nama", "Email", "Paket", "Status", "Jumlah", "Tanggal"].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-mono" style={{ color: "#52525B", letterSpacing: "0.08em" }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map(o => (
                      <tr key={o.orderId} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td className="px-5 py-3 font-medium" style={{ color: "#FAFAFA" }}>{o.name}</td>
                        <td className="px-5 py-3 text-xs" style={{ color: "#A1A1AA" }}>{o.email}</td>
                        <td className="px-5 py-3"><StatusBadge status={o.memberType} /></td>
                        <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                        <td className="px-5 py-3 font-mono text-xs" style={{ color: "#A1A1AA" }}>Rp {o.grossAmount.toLocaleString("id-ID")}</td>
                        <td className="px-5 py-3 text-xs" style={{ color: "#52525B" }}>{new Date(o.createdAt).toLocaleDateString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-sm" style={{ color: "#52525B" }}>Gagal memuat data</div>
      )}
    </AdminLayout>
  );
}
