"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface CurriculumCardCodeProps {
  code: string;
  title?: string;
  defaultWrap?: boolean;
  heightClass?: string;
  className?: string;
  onExpand?: () => void;
  showExpand?: boolean;
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

export function WrapIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h13a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H10" />
      <polyline points="7 16 3 12 7 8" />
    </svg>
  );
}

export function CopyIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ExpandIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

export function CloseIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export interface Token {
  type: "keyword" | "string" | "literal" | "type" | "comment" | "plain";
  text: string;
}

export function highlightLine(line: string): Token[] {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
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
  onExpand,
  showExpand = false,
}: CurriculumCardCodeProps): JSX.Element {
  const [isWrapped, setIsWrapped] = useState<boolean>(defaultWrap);
  const [copied, setCopied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCopied, setModalCopied] = useState<boolean>(false);
  const [isModalWrapped, setIsModalWrapped] = useState<boolean>(defaultWrap);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lines = useMemo(() => {
    if (!code) return [];
    return code.split("\n");
  }, [code]);

  // Detect whether the code block overflows vertically
  useEffect(() => {
    const checkScrollable = () => {
      if (preRef.current) {
        const { scrollHeight, clientHeight } = preRef.current;
        const overflows = scrollHeight > clientHeight + 3;
        const hasManyLines = lines.length >= 8;
        setIsScrollable(overflows || hasManyLines);
      }
    };

    checkScrollable();
    const timer = setTimeout(checkScrollable, 60);

    window.addEventListener("resize", checkScrollable);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [code, lines.length, isWrapped]);

  // Handle ESC key and body scroll lock when modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

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

  const handleModalCopy = async () => {
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
      setModalCopied(true);
      setTimeout(() => setModalCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code in modal", err);
    }
  };

  return (
    <>
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

          {/* Action Controls: Expand (if vertically scrollable) | Word Wrap Toggle | Copy */}
          <div className="flex items-center gap-1.5">
            {/* Expand Feature: Displays when code is vertically scrollable or showExpand is set */}
            {(isScrollable || showExpand) && (
              <button
                type="button"
                onClick={() => {
                  if (onExpand) {
                    onExpand();
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                title={onExpand ? "Expand side-by-side comparison (Esc to close)" : "Expand full code in wide modal (Esc to close)"}
                aria-label="Expand code view"
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-all border bg-purple-500/10 text-purple-300 border-purple-500/25 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/40 cursor-pointer shadow-sm active:scale-95"
              >
                <ExpandIcon className="w-3 h-3 text-purple-300" />
                <span>Expand</span>
              </button>
            )}

            {/* Word Wrap Toggle */}
            <button
              type="button"
              onClick={() => setIsWrapped((prev) => !prev)}
              aria-pressed={isWrapped}
              title={isWrapped ? "Word wrap is ON (click to disable)" : "Word wrap is OFF (click to wrap)"}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors border cursor-pointer ${
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
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors border cursor-pointer ${
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
          ref={preRef}
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

      {/* ─── Expandable Full-View Code Modal ─── */}
      {isModalOpen && mounted && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md transition-opacity duration-200"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="expanded-code-title"
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-[#070913] border border-purple-500/30 shadow-2xl shadow-purple-950/60 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="h-12 px-4 sm:px-6 bg-[#0B0F1E] border-b border-white/[0.08] flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-white/10" />
                <h3 id="expanded-code-title" className="text-xs sm:text-sm font-mono font-bold text-slate-200">
                  {title}
                </h3>
                <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                  {lines.length} lines
                </span>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-2">
                {/* Modal Word Wrap */}
                <button
                  type="button"
                  onClick={() => setIsModalWrapped((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                    isModalWrapped
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/30 font-semibold"
                      : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200 hover:bg-white/[0.08]"
                  }`}
                  title={isModalWrapped ? "Word wrap is ON (click to disable)" : "Word wrap is OFF (click to wrap)"}
                >
                  <WrapIcon className={`w-3.5 h-3.5 ${isModalWrapped ? "text-purple-300" : "text-slate-400"}`} />
                  <span className="hidden sm:inline">Wrap</span>
                </button>

                {/* Modal Copy Button */}
                <button
                  type="button"
                  onClick={handleModalCopy}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                    modalCopied
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold"
                      : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200 hover:bg-white/[0.08]"
                  }`}
                  title="Copy full code"
                >
                  {modalCopied ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-colors cursor-pointer"
                  title="Close modal (Esc)"
                >
                  <CloseIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Close</span>
                  <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-white/[0.08] text-slate-400 border border-white/[0.08]">
                    ESC
                  </kbd>
                </button>
              </div>
            </div>

            {/* Modal Code Viewer with Line Numbers */}
            <div className="flex-1 max-h-[78vh] overflow-y-auto p-4 sm:p-6 bg-[#04060C] text-xs sm:text-sm font-mono leading-relaxed text-slate-200 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
              {lines.map((line, lineIdx) => {
                const tokens = highlightLine(line);
                return (
                  <div key={lineIdx} className="flex gap-4 min-h-[1.4rem] hover:bg-white/[0.02] rounded px-1 -mx-1 group">
                    {/* Line Number */}
                    <span className="select-none text-slate-600 group-hover:text-slate-400 font-mono text-xs w-9 text-right shrink-0 pt-0.5 border-r border-white/[0.06] pr-3 transition-colors">
                      {lineIdx + 1}
                    </span>

                    {/* Syntax Highlighted Code Line */}
                    <div
                      className={`flex-1 ${
                        isModalWrapped
                          ? "whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                          : "whitespace-pre overflow-x-auto"
                      }`}
                    >
                      {tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokens.map((token, tIdx) => {
                          let tokenClass = "text-slate-200";
                          if (token.type === "keyword") tokenClass = "text-purple-400 font-semibold";
                          else if (token.type === "string") tokenClass = "text-amber-300";
                          else if (token.type === "literal") tokenClass = "text-cyan-300 font-medium";
                          else if (token.type === "type") tokenClass = "text-sky-300";
                          else if (token.type === "comment") tokenClass = "text-emerald-400/90 italic font-sans text-xs sm:text-sm";

                          return (
                            <span key={tIdx} className={tokenClass}>
                              {token.text}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

