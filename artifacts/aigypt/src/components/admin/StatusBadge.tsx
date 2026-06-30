const CONFIGS: Record<string, { label: string; bg: string; border: string; color: string }> = {
  paid: { label: "Lunas", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", color: "#4ade80" },
  pending: { label: "Pending", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", color: "#fbbf24" },
  cancelled: { label: "Dibatalkan", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", color: "#f87171" },
  failed: { label: "Gagal", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", color: "#f87171" },
  unused: { label: "Tersedia", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", color: "#4ade80" },
  used: { label: "Terpakai", bg: "rgba(113,113,122,0.1)", border: "rgba(113,113,122,0.2)", color: "#71717A" },
  mandiri: { label: "Mandiri", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.25)", color: "#A855F7" },
  kelas: { label: "Kelas", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", color: "#60a5fa" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = CONFIGS[status] ?? { label: status, bg: "rgba(113,113,122,0.1)", border: "rgba(113,113,122,0.2)", color: "#71717A" };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
