export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
  loading = false,
  danger = true,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  danger?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div
        className="relative w-full max-w-sm rounded-2xl p-6"
        style={{ background: "#101018", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: "#A1A1AA", fontFamily: "'Inter',sans-serif" }}>
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.08)", background: "transparent" }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: danger ? "rgba(239,68,68,0.15)" : "rgba(124,58,237,0.15)",
              border: `1px solid ${danger ? "rgba(239,68,68,0.3)" : "rgba(124,58,237,0.3)"}`,
              color: danger ? "#f87171" : "#A855F7",
            }}
          >
            {loading ? "Memproses..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
