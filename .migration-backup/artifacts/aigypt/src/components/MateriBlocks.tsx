import React from "react";

export function TakeHomeBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg p-5 border border-[#6D28D9]" style={{ background: "#0F0F1A" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono text-[#A855F7] uppercase tracking-widest font-semibold">Take-Home Challenge</span>
      </div>
      <div className="text-[#E2E8F0] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg p-5" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(109,40,217,0.4)" }}>
      <div className="text-[#E2E8F0] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function LatihanBox({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-4 rounded-lg p-5 border border-[#334155]" style={{ background: "#111118" }}>
      {title && <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-3">{title}</p>}
      <div className="text-[#E2E8F0] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-display font-semibold text-white mt-8 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-[#7C3AED] rounded-full inline-block" />
      {children}
    </h3>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-[#1E1E2E]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1E1E2E]" style={{ background: "#12121A" }}>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-mono text-[#A855F7] uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#1E1E2E] last:border-0 hover:bg-[#12121A]/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[#94A3B8]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ToolBadge({ name }: { name: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono rounded border border-[#7C3AED]/40 text-[#A855F7] bg-[#7C3AED]/10 mr-1 mb-1">
      {name}
    </span>
  );
}
