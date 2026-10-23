"use client";

import React, { useState } from "react";

function CopyIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export interface CurriculumCodeBlockProps {
  code: string;
  title?: string;
  variant?: "default" | "output" | "bad" | "clean";
  showLineNumbers?: boolean;
  language?: string;
  className?: string;
}

export function CurriculumCodeBlock({
  code,
  title,
  variant = "default",
  showLineNumbers = true,
  language = "typescript",
  className = "",
}: CurriculumCodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback or ignore
    }
  };

  const lines = code.trim().split("\n");

  const borderClass =
    variant === "bad"
      ? "border-red-500/40"
      : variant === "clean"
      ? "border-emerald-500/40"
      : variant === "output"
      ? "border-purple-500/30"
      : "border-[#284888]/50";

  const headerBgClass =
    variant === "bad"
      ? "bg-red-950/40 border-b border-red-500/30 text-red-200"
      : variant === "clean"
      ? "bg-emerald-950/40 border-b border-emerald-500/30 text-emerald-200"
      : variant === "output"
      ? "bg-[#182060] border-b border-[#284888]/40 text-purple-200"
      : "bg-[#182060] border-b border-[#284888]/40 text-slate-200";

  return (
    <div
      className={`rounded-xl overflow-hidden border ${borderClass} bg-[#0c102b] shadow-lg flex flex-col font-mono text-xs ${className}`}
    >
      {(title || language) && (
        <div
          className={`px-4 py-2 flex items-center justify-between text-xs font-semibold ${headerBgClass}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            {title && <span className="ml-2 font-mono text-xs">{title}</span>}
          </div>
          <div className="flex items-center gap-3">
            {language && (
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                {language}
              </span>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy code"
              aria-label="Copy code"
            >
              {copied ? (
                <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <CopyIcon className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
        {showLineNumbers ? (
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03]">
                  <td className="w-8 pr-3 text-right select-none text-slate-500 text-[11px] align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre font-mono text-[12px]">{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre font-mono text-[12px] m-0">{code}</pre>
        )}
      </div>
    </div>
  );
}
