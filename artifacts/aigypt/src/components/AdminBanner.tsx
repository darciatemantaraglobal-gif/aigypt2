export function AdminBanner({ isAdminMode }: { isAdminMode?: boolean }) {
  if (!isAdminMode) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "rgba(168,85,247,0.12)",
        borderBottom: "1px solid rgba(168,85,247,0.3)",
        color: "#C084FC",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.05em",
        textAlign: "center",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#A855F7",
          display: "inline-block",
          flexShrink: 0,
          animation: "adminDotPulse 1.8s ease-in-out infinite",
        }}
      />
      MODE ADMIN / TESTING — Akses penuh aktif. Ini bukan sesi peserta.
    </div>
  );
}
