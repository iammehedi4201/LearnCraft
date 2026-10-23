"use client";

import { useState, useMemo } from "react";

interface CurriculumCardCodeProps {
  code: string;
  title?: string;
  defaultWrap?: boolean;
  heightClass?: string;
  className?: string;
}

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while", "switch",
  "case", "break", "continue", "default", "class", "extends", "super", "new", "this",
  "import", "export", "from", "as", "satisfies", "type", "interface", "public", "private",
  "protected", "readonly", "static", "abstract", "async", "await", "try", "catch", "finally",
  "throw", "typeof", "keyof", "infer", "in", "of"
]);

const LITERALS = new Set(["true", "false", "null", "undefined"]);

const TYPES = new Set([
  "string", "number", "boolean", "any", "unknown", "never", "void", "object", "symbol", "bigint",
  "Promise", "Record", "Array", "Map", "Set", "Partial", "Required", "Pick", "Omit"
]);

function WrapIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h13a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H10" />
      <polyline points="7 16 3 12 7 8" />
    </svg>
  );
}

function CopyIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface Token {
  type: "keyword" | "string" | "literal" | "type" | "comment" | "plain";
  text: string;
}

function highlightLine(line: string): Token[] {
  const trimmed = line.trim();
  if (trimmed.startsWith("//")) {
    return [{ type: "comment", text: line }];
  }

  let codePart = line;
  let commentPart = "";
  const commentIndex = line.indexOf("//");
  if (commentIndex !== -1) {
    codePart = line.substring(0, commentIndex);
    commentPart = line.substring(commentIndex);
  }

  const parts: Token[] = [];
  const regex = /("[^"]*"|'[^']*'|`[^`]*`|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+|\s+|[^\s\w])/g;
  let match;
  while ((match = regex.exec(codePart)) !== null) {
    const token = match[0];
    if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
      parts.push({ type: "string", text: token });
    } else if (KEYWORDS.has(token)) {
      parts.push({ type: "keyword", text: token });
    } else if (LITERALS.has(token) || /^[0-9]+$/.test(token)) {
      parts.push({ type: "literal", text: token });
    } else if (TYPES.has(token)) {
      parts.push({ type: "type", text: token });
    } else {
      parts.push({ type: "plain", text: token });
    }
  }

  if (commentPart) {
    parts.push({ type: "comment", text: commentPart });
  }

  return parts;
}

export function CurriculumCardCode({
  code,
  title = "Example",
  defaultWrap = true,
  heightClass = "h-[195px]",
  className = "",
}: CurriculumCardCodeProps): JSX.Element {
  const [isWrapped, setIsWrapped] = useState<boolean>(defaultWrap);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  const lines = useMemo(() => {
    if (!code) return [];
    return code.split("\n");
  }, [code]);

  return (
    <div
      className={`w-full flex flex-col rounded-xl bg-[#060810] border border-white/[0.08] shadow-inner overflow-hidden ${heightClass} ${className}`}
    >
      {/* Code Header Bar */}
      <div className="h-8 px-3 bg-[#0B0F19] border-b border-white/[0.06] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          {/* Subtle IDE window indicators */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/60" />
            <span className="w-2 h-2 rounded-full bg-amber-500/60" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 pl-1">
            {title}
          </span>
        </div>

        {/* Action Controls: Word Wrap Toggle & Copy */}
        <div className="flex items-center gap-1">
          {/* Word Wrap Toggle */}
          <button
            type="button"
            onClick={() => setIsWrapped((prev) => !prev)}
            aria-pressed={isWrapped}
            title={isWrapped ? "Word wrap is ON (click to disable)" : "Word wrap is OFF (click to wrap)"}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
              isWrapped
                ? "bg-purple-500/20 text-purple-300 border-purple-500/30 font-semibold"
                : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:text-slate-200 hover:bg-white/[0.06]"
            }`}
          >
            <WrapIcon className={`w-3 h-3 ${isWrapped ? "text-purple-300" : "text-slate-400"}`} />
            <span>Wrap</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy code to clipboard"
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
              copied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold"
                : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:text-slate-200 hover:bg-white/[0.06]"
            }`}
          >
            {copied ? (
              <>
                <CheckIcon className="w-3 h-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-3 h-3 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <pre
        className={`flex-1 p-3 text-xs font-mono leading-relaxed overflow-y-auto text-slate-200 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent ${
          isWrapped
            ? "whitespace-pre-wrap break-words [overflow-wrap:anywhere] overflow-x-hidden"
            : "whitespace-pre overflow-x-auto"
        }`}
      >
        {lines.map((line, lineIdx) => {
          const tokens = highlightLine(line);
          return (
            <div key={lineIdx} className="min-h-[1.25rem]">
              {tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                tokens.map((token, tIdx) => {
                  let tokenClass = "text-slate-200";
                  if (token.type === "keyword") tokenClass = "text-purple-400 font-semibold";
                  else if (token.type === "string") tokenClass = "text-amber-300";
                  else if (token.type === "literal") tokenClass = "text-cyan-300 font-medium";
                  else if (token.type === "type") tokenClass = "text-sky-300";
                  else if (token.type === "comment") tokenClass = "text-emerald-400/85 italic font-sans text-[11px] sm:text-xs";

                  return (
                    <span key={tIdx} className={tokenClass}>
                      {token.text}
                    </span>
                  );
                })
              )}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
