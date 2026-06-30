import { useState } from "react";

export function CopyButton({ text, label = "Salin", className = "" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-2.5 py-1 rounded text-xs font-mono transition-all duration-150 ${className}`}
      style={{
        background: copied ? "rgba(34,197,94,0.12)" : "rgba(124,58,237,0.12)",
        border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(124,58,237,0.3)"}`,
        color: copied ? "#4ade80" : "#A855F7",
      }}
    >
      {copied ? "✓ Tersalin" : label}
    </button>
  );
}
