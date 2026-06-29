import { useState } from "react";

interface PromptBlockProps {
  children: string;
  label?: string;
}

export function PromptBlock({ children, label }: PromptBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border-l-4 border-[#7C3AED]" style={{ background: "#0D0D18" }}>
      {label && (
        <div className="px-4 pt-3 pb-1">
          <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <pre className="px-4 py-3 text-sm text-[#E2E8F0] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs text-[#94A3B8] hover:text-white transition-colors font-mono bg-[#1E1E2E] px-2 py-1 rounded"
      >
        {copied ? "Tersalin" : "Salin"}
      </button>
    </div>
  );
}
