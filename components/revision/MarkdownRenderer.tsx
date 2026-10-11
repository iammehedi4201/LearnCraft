"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MARKDOWN RENDERER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Lightweight zero-dependency Markdown → styled React elements.
 * Provides compact, modern micro-typography with clear hierarchy.
 * Enhanced with Question & Answer styling, code snippet copy, and callouts.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import React, { useState } from "react";

// ─── Helpers ───────────────────────────────────────────────────────────────
function renderWithLineBreaks(text: string, keyPrefix: string): React.ReactNode[] {
  const lines = text.split("\n");
  if (lines.length === 1) return [text];
  const out: React.ReactNode[] = [];
  lines.forEach((line, i) => {
    if (i > 0) out.push(<br key={`${keyPrefix}-br-${i}`} />);
    if (line) out.push(line);
  });
  return out;
}

// ─── Inline Markdown Parser ────────────────────────────────────────────────
function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  // Supports single-line and multi-line markdown tokens
  const pattern = /(`[^`]+`|\*\*\*[\s\S]+?\*\*\*|\*\*[\s\S]+?\*\*|\*[\s\S]+?\*|___[\s\S]+?___|__[\s\S]+?__|_[^_]+_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  pattern.lastIndex = 0;

  while ((match = pattern.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        ...renderWithLineBreaks(
          remaining.slice(lastIndex, match.index),
          `${keyPrefix}-txt-${idx}`
        )
      );
    }

    const token = match[0];
    const key = `${keyPrefix}-inline-${idx++}`;

    if (token.startsWith("`")) {
      // Inline code
      parts.push(
        <code
          key={key}
          className="px-1 py-0.5 rounded bg-ds-feature-lighter/30 font-mono text-[0.88em] text-ds-feature-dark font-medium"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("***") || token.startsWith("___")) {
      // Bold + Italic
      parts.push(
        <strong key={key} className="font-semibold italic text-ds-text-strong text-[0.95em]">
          {renderWithLineBreaks(token.slice(3, -3), key)}
        </strong>
      );
    } else if (token.startsWith("**") || token.startsWith("__")) {
      // Bold
      parts.push(
        <strong key={key} className="font-semibold text-ds-text-strong text-[0.95em]">
          {renderWithLineBreaks(token.slice(2, -2), key)}
        </strong>
      );
    } else if (token.startsWith("*") || token.startsWith("_")) {
      // Italic
      parts.push(
        <em key={key} className="italic text-ds-text-sub font-normal">
          {renderWithLineBreaks(token.slice(1, -1), key)}
        </em>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < remaining.length) {
    parts.push(
      ...renderWithLineBreaks(
        remaining.slice(lastIndex),
        `${keyPrefix}-txt-${idx}`
      )
    );
  }

  return parts.length > 0 ? parts : [text];
}

// ─── Block Token Types ─────────────────────────────────────────────────────
type BlockToken =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "hr" }
  | { type: "code_block"; lang: string; code: string }
  | { type: "bullet_list"; items: string[] }
  | { type: "ordered_list"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "paragraph"; text: string };

// ─── Tokenizer ─────────────────────────────────────────────────────────────
function tokenize(markdown: string): BlockToken[] {
  const lines = markdown.split("\n");
  const tokens: BlockToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank lines: simply advance without creating empty ghost tokens
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Fenced code block
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      tokens.push({ type: "code_block", lang, code: codeLines.join("\n") });
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length, 3) as 1 | 2 | 3;
      tokens.push({ type: "heading", level, text: headingMatch[2] });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      tokens.push({ type: "hr" });
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      tokens.push({ type: "blockquote", text: quoteLines.join("\n") });
      continue;
    }

    // Bullet list
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s+/, ""));
        i++;
      }
      tokens.push({ type: "bullet_list", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      tokens.push({ type: "ordered_list", items });
      continue;
    }

    // Paragraph (collect non-empty lines belonging to the same paragraph)
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}\s|```|[-*+]\s|\d+\.\s|>|(-{3,}|\*{3,}|_{3,})\s*$)/.test(lines[i])
    ) {
      if (
        paragraphLines.length > 0 &&
        /^(\*\*Question:\*\*|Question:|\*\*Answer:\*\*|Answer:|\*\*Q:\*\*|\*\*A:\*\*)/i.test(lines[i].trim())
      ) {
        break;
      }
      paragraphLines.push(lines[i]);
      i++;
      if (/^(\*\*Question:\*\*|Question:|\*\*Q:\*\*)/i.test(paragraphLines[0].trim())) {
        break;
      }
    }
    if (paragraphLines.length > 0) {
      tokens.push({ type: "paragraph", text: paragraphLines.join("\n") });
    }
  }

  return tokens;
}

// ─── Interactive Code Block with Copy ──────────────────────────────────────
function CodeBlockView({
  lang,
  code,
  compact,
}: {
  lang: string;
  code: string;
  compact: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0a0d14] border border-white/[0.08] shadow-md my-2 group">
      {/* Sleek Terminal Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0f1422] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold text-purple-300 uppercase tracking-wider">
            {lang || "code"}
          </span>
          <button
            onClick={handleCopy}
            type="button"
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
      {/* Code Content */}
      <pre
        className={`p-3.5 overflow-x-auto font-mono leading-relaxed text-emerald-300/90 whitespace-pre selection:bg-purple-900/50 ${
          compact ? "text-[11px]" : "text-xs sm:text-[13px]"
        }`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Token → React Renderer ────────────────────────────────────────────────
function renderToken(token: BlockToken, idx: number, compact: boolean): React.ReactNode {
  const key = `md-block-${idx}`;

  switch (token.type) {
    case "heading": {
      const trimmedText = token.text.trim();
      const isQuestion = /^(❓|\*\*Q:|\bQ:|\bQuestion:)/i.test(trimmedText);

      if (isQuestion) {
        const cleanQuestion = trimmedText.replace(/^(❓|\*\*Q:\*\*|\bQ:|\bQuestion:)\s*(Question:\s*)?/i, "");
        return (
          <div
            key={key}
            className="rounded-xl p-3 sm:p-4 bg-purple-950/25 border border-purple-500/30 text-purple-100 my-2 shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-purple-300 mb-1">
              <span>❓</span>
              <span>QUESTION</span>
            </div>
            <div className="font-semibold text-sm sm:text-base text-white leading-snug">
              {parseInline(cleanQuestion, `${key}-q`)}
            </div>
          </div>
        );
      }

      const inlined = parseInline(token.text, `${key}-h`);
      if (token.level === 1) {
        return (
          <h1
            key={key}
            className={`font-bold text-white tracking-tight border-b border-white/[0.08] pb-1.5 mt-2 first:mt-0 ${
              compact ? "text-[15px]" : "text-base sm:text-[17px]"
            }`}
          >
            {inlined}
          </h1>
        );
      }
      if (token.level === 2) {
        return (
          <h2
            key={key}
            className={`font-bold text-white tracking-tight mt-2 first:mt-0 ${
              compact ? "text-[13px]" : "text-[14px] sm:text-[15px]"
            }`}
          >
            {inlined}
          </h2>
        );
      }
      return (
        <h3
          key={key}
          className={`font-bold text-purple-300 uppercase tracking-wider mt-2 first:mt-0 ${
            compact ? "text-[11px]" : "text-[11.5px] sm:text-[12px]"
          }`}
        >
          {inlined}
        </h3>
      );
    }

    case "blockquote": {
      const trimmed = token.text.trim();
      const isAnswer = /^(\*\*Answer:\*\*|✓\s*Answer:|Answer:|A:)/i.test(trimmed);
      const isKeyInsight = /^(\*\*Key (Concept|Takeaway):\*\*|💡)/i.test(trimmed);

      if (isAnswer) {
        const cleanAnswer = trimmed.replace(/^(\*\*Answer:\*\*|✓\s*Answer:|Answer:|A:)\s*/i, "");
        return (
          <div
            key={key}
            className="rounded-xl p-3.5 bg-emerald-950/20 border border-emerald-500/30 text-emerald-100 my-2 shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 mb-1">
              <span>✓</span>
              <span>ANSWER</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {parseInline(cleanAnswer, `${key}-ans`)}
            </div>
          </div>
        );
      }

      if (isKeyInsight) {
        const cleanInsight = trimmed.replace(/^(\*\*Key (Concept|Takeaway):\*\*|💡)\s*/i, "");
        return (
          <div
            key={key}
            className="rounded-xl p-3.5 bg-amber-950/20 border border-amber-500/30 text-amber-100 my-2 shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-amber-400 mb-1">
              <span>💡</span>
              <span>KEY INSIGHT</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {parseInline(cleanInsight, `${key}-ki`)}
            </div>
          </div>
        );
      }

      return (
        <div
          key={key}
          className={`border-l-[3px] border-purple-500/60 bg-purple-500/[0.06] rounded-r-xl px-3.5 py-2 text-slate-200 font-sans shadow-sm ${
            compact ? "text-[11px] leading-[1.6]" : "text-[12px] sm:text-[12.5px] leading-[1.65]"
          }`}
        >
          {parseInline(token.text, `${key}-bq`)}
        </div>
      );
    }

    case "hr":
      return <hr key={key} className="border-0 border-t border-white/[0.08] my-1.5" />;

    case "code_block":
      return (
        <CodeBlockView
          key={key}
          lang={token.lang}
          code={token.code}
          compact={compact}
        />
      );

    case "bullet_list":
      return (
        <ul key={key} className="space-y-1 pl-0 list-none font-sans m-0">
          {token.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 text-ds-text-sub font-normal tracking-[0.01em] antialiased ${
                compact ? "text-[11px] leading-[1.6]" : "text-[12px] sm:text-[12.5px] leading-[1.65]"
              }`}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ds-feature-base shrink-0" />
              <span>{parseInline(item, `${key}-li-${i}`)}</span>
            </li>
          ))}
        </ul>
      );

    case "ordered_list":
      return (
        <ol key={key} className="space-y-1 pl-0 list-none font-sans m-0">
          {token.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 text-ds-text-sub font-normal tracking-[0.01em] antialiased ${
                compact ? "text-[11px] leading-[1.6]" : "text-[12px] sm:text-[12.5px] leading-[1.65]"
              }`}
            >
              <span className="shrink-0 w-3.5 text-right font-mono text-[10px] font-bold text-ds-feature-dark mt-0.5">
                {i + 1}.
              </span>
              <span>{parseInline(item, `${key}-oli-${i}`)}</span>
            </li>
          ))}
        </ol>
      );

    case "paragraph": {
      const trimmed = token.text.trim();
      const isQuestion = /^(\*\*Question:\*\*|Question:|\*\*Q:\*\*|\bQ:)/i.test(trimmed);
      const isAnswer = /^(\*\*Answer:\*\*|Answer:|\*\*A:\*\*|\bA:)/i.test(trimmed);

      if (isQuestion) {
        const cleanQuestion = trimmed.replace(/^(\*\*Question:\*\*|Question:|\*\*Q:\*\*|\bQ:)\s*/i, "");
        return (
          <div
            key={key}
            className="rounded-xl p-3 sm:p-4 bg-purple-950/25 border border-purple-500/30 text-purple-100 my-2.5 shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-purple-300 mb-1">
              <span>❓</span>
              <span>QUESTION</span>
            </div>
            <div className="font-semibold text-sm sm:text-base text-white leading-snug">
              {parseInline(cleanQuestion, `${key}-q`)}
            </div>
          </div>
        );
      }

      if (isAnswer) {
        const cleanAnswer = trimmed.replace(/^(\*\*Answer:\*\*|Answer:|\*\*A:\*\*|\bA:)\s*/i, "");
        return (
          <div
            key={key}
            className="rounded-xl p-3.5 bg-emerald-950/20 border border-emerald-500/30 text-emerald-100 my-2.5 shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 mb-1">
              <span>✓</span>
              <span>ANSWER</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {parseInline(cleanAnswer, `${key}-ans`)}
            </div>
          </div>
        );
      }

      return (
        <p
          key={key}
          className={`font-sans font-normal text-ds-text-sub tracking-[0.01em] antialiased m-0 ${
            compact ? "text-[11px] leading-[1.6]" : "text-[12px] sm:text-[12.5px] leading-[1.65]"
          }`}
        >
          {parseInline(token.text, `${key}-p`)}
        </p>
      );
    }

    default:
      return null;
  }
}

// ─── Public Component ──────────────────────────────────────────────────────
interface MarkdownRendererProps {
  /** Raw Markdown string to render */
  content: string;
  /** Optional extra className on the wrapper div */
  className?: string;
  /** If true, formats with compact typography for card grids */
  compact?: boolean;
}

export function MarkdownRenderer({
  content,
  className = "",
  compact = false,
}: MarkdownRendererProps): JSX.Element {
  const source = compact
    ? content.replace(/\n{3,}/g, "\n\n").trim()
    : content.trim();

  const tokens = tokenize(source);
  const nodes = tokens.map((token, i) => renderToken(token, i, compact));

  return (
    <div className={`markdown-content flex flex-col gap-2 ${className}`}>
      {nodes}
    </div>
  );
}
