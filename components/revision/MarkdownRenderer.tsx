/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MARKDOWN RENDERER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Lightweight zero-dependency Markdown → styled React elements.
 * Provides compact, modern micro-typography with clear hierarchy.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import React from "react";

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
      paragraphLines.push(lines[i]);
      i++;
    }
    if (paragraphLines.length > 0) {
      tokens.push({ type: "paragraph", text: paragraphLines.join("\n") });
    }
  }

  return tokens;
}

// ─── Token → React Renderer ────────────────────────────────────────────────
function renderToken(token: BlockToken, idx: number, compact: boolean): React.ReactNode {
  const key = `md-block-${idx}`;

  switch (token.type) {
    case "heading": {
      const inlined = parseInline(token.text, `${key}-h`);
      if (token.level === 1) {
        return (
          <h1
            key={key}
            className={`font-bold text-ds-text-strong tracking-tight border-b border-ds-stroke-soft/60 pb-1.5 mt-1 first:mt-0 ${
              compact ? "text-[13px]" : "text-[13.5px] sm:text-[14px]"
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
            className={`font-bold text-ds-text-strong tracking-tight mt-1 first:mt-0 ${
              compact ? "text-[11.5px]" : "text-[12px] sm:text-[12.5px]"
            }`}
          >
            {inlined}
          </h2>
        );
      }
      return (
        <h3
          key={key}
          className={`font-bold text-ds-feature-base uppercase tracking-wider mt-1 first:mt-0 ${
            compact ? "text-[9.5px]" : "text-[10px]"
          }`}
        >
          {inlined}
        </h3>
      );
    }

    case "blockquote":
      return (
        <div
          key={key}
          className="border-l-[3px] border-ds-feature-base bg-ds-feature-lighter/25 dark:bg-ds-feature-lighter/10 rounded-r-xl px-3 py-1.5 text-[9.5px] sm:text-[10px] text-ds-text-strong leading-[1.55] font-sans shadow-sm"
        >
          {parseInline(token.text, `${key}-bq`)}
        </div>
      );

    case "hr":
      return <hr key={key} className="border-0 border-t border-ds-stroke-soft my-1" />;

    case "code_block":
      return (
        <div
          key={key}
          className="rounded-xl overflow-hidden bg-[#0d1117] border border-slate-800 shadow-sm"
        >
          {/* Sleek Terminal Header */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#161b22] border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              {token.lang || "code"}
            </span>
          </div>
          {/* Code Content */}
          <pre className="p-2.5 overflow-x-auto text-[9.5px] sm:text-[10px] font-mono leading-relaxed text-emerald-300/90 whitespace-pre selection:bg-emerald-900/40">
            <code>{token.code}</code>
          </pre>
        </div>
      );

    case "bullet_list":
      return (
        <ul key={key} className="space-y-0.5 pl-0 list-none font-sans m-0">
          {token.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-1.5 text-ds-text-sub font-normal leading-[1.55] tracking-[0.01em] antialiased ${
                compact ? "text-[9.5px]" : "text-[9.5px] sm:text-[10px]"
              }`}
            >
              <span className="mt-1.5 w-1 h-1 rounded-full bg-ds-feature-base shrink-0" />
              <span>{parseInline(item, `${key}-li-${i}`)}</span>
            </li>
          ))}
        </ul>
      );

    case "ordered_list":
      return (
        <ol key={key} className="space-y-0.5 pl-0 list-none font-sans m-0">
          {token.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-1.5 text-ds-text-sub font-normal leading-[1.55] tracking-[0.01em] antialiased ${
                compact ? "text-[9.5px]" : "text-[9.5px] sm:text-[10px]"
              }`}
            >
              <span className="shrink-0 w-3 text-right font-mono text-[8.5px] font-bold text-ds-feature-dark mt-0.5">
                {i + 1}.
              </span>
              <span>{parseInline(item, `${key}-oli-${i}`)}</span>
            </li>
          ))}
        </ol>
      );

    case "paragraph":
      return (
        <p
          key={key}
          className={`font-sans font-normal text-ds-text-sub leading-[1.55] tracking-[0.01em] antialiased m-0 ${
            compact ? "text-[9.5px]" : "text-[9.5px] sm:text-[10px]"
          }`}
        >
          {parseInline(token.text, `${key}-p`)}
        </p>
      );

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
