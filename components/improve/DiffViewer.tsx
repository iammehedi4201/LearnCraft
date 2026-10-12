"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DiffViewer — Side-by-Side & Unified Diff Display
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Renders a visual diff between two versions of a section file.
 * Supports two display modes:
 *   - "split"   — Side-by-side panels (old | new)
 *   - "unified" — Inline unified diff
 *
 * Features:
 *   - Syntax-aware line coloring (added=green, removed=red, unchanged=muted)
 *   - Line number gutter on both sides
 *   - Separator markers ("...") for collapsed unchanged regions
 *   - Change stats badge (lines added/removed/changed)
 *   - Copy button for both panels
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useMemo } from "react";
import { generateDiff, computeDiffStats, type DiffLine, type DiffStats } from "@/lib/improvement-history";

// ─── Props ────────────────────────────────────────────────────────────────────

interface DiffViewerProps {
  oldContent: string;
  newContent: string;
  oldLabel?: string;
  newLabel?: string;
  className?: string;
}

// ─── Stats Badge ──────────────────────────────────────────────────────────────

function StatsBadge({ stats }: { stats: DiffStats }) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      {stats.linesAdded > 0 && (
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <span className="text-emerald-500">+</span>{stats.linesAdded}
        </span>
      )}
      {stats.linesRemoved > 0 && (
        <span className="flex items-center gap-1 text-red-400 font-semibold">
          <span className="text-red-500">−</span>{stats.linesRemoved}
        </span>
      )}
      {stats.linesAdded === 0 && stats.linesRemoved === 0 && (
        <span className="text-slate-500 italic">No changes</span>
      )}
      <span className="text-slate-500">
        {stats.totalLinesOld}→{stats.totalLinesNew} lines
      </span>
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-150"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

// ─── Line renderer ────────────────────────────────────────────────────────────

function DiffLineRow({
  line,
  showOld,
  showNew,
}: {
  line: DiffLine;
  showOld: boolean;
  showNew: boolean;
}) {
  const isSeparator = line.type === "unchanged" && line.content === "...";

  if (isSeparator) {
    return (
      <div className="flex items-center gap-0 py-0.5 bg-slate-800/40">
        {showOld && <div className="w-12 shrink-0 text-center text-slate-600 text-[10px] select-none font-mono">···</div>}
        <div className="flex-1 px-3 text-slate-600 text-[10px] font-mono italic select-none">
          ━━━ unchanged lines hidden ━━━
        </div>
        {showNew && <div className="w-12 shrink-0 text-center text-slate-600 text-[10px] select-none font-mono">···</div>}
      </div>
    );
  }

  const bg =
    line.type === "added"
      ? "bg-emerald-950/50 border-l-2 border-emerald-500"
      : line.type === "removed"
      ? "bg-red-950/50 border-l-2 border-red-500"
      : "border-l-2 border-transparent";

  const textColor =
    line.type === "added"
      ? "text-emerald-200"
      : line.type === "removed"
      ? "text-red-200"
      : "text-slate-300";

  const prefix =
    line.type === "added" ? "+" : line.type === "removed" ? "−" : " ";

  const prefixColor =
    line.type === "added"
      ? "text-emerald-500 font-bold"
      : line.type === "removed"
      ? "text-red-500 font-bold"
      : "text-slate-700";

  return (
    <div className={`flex items-start min-w-0 ${bg} hover:brightness-110 transition-all`}>
      {showOld && (
        <div className="w-10 shrink-0 text-right pr-2 text-slate-600 text-[10px] select-none font-mono py-0.5 leading-5">
          {line.type !== "added" ? line.lineNumberOld ?? "" : ""}
        </div>
      )}
      {showNew && (
        <div className="w-10 shrink-0 text-right pr-2 text-slate-600 text-[10px] select-none font-mono py-0.5 leading-5">
          {line.type !== "removed" ? line.lineNumberNew ?? "" : ""}
        </div>
      )}
      <span className={`w-4 shrink-0 text-center text-[11px] font-mono py-0.5 leading-5 ${prefixColor}`}>
        {prefix}
      </span>
      <pre
        className={`flex-1 min-w-0 font-mono text-[12px] py-0.5 leading-5 whitespace-pre-wrap break-all ${textColor}`}
      >
        {line.content}
      </pre>
    </div>
  );
}

// ─── Split view (side-by-side) ────────────────────────────────────────────────

function SplitView({
  diffLines,
  oldContent,
  newContent,
  oldLabel,
  newLabel,
}: {
  diffLines: DiffLine[];
  oldContent: string;
  newContent: string;
  oldLabel: string;
  newLabel: string;
}) {
  const rows: { oldLine?: DiffLine; newLine?: DiffLine }[] = [];
  let i = 0;
  
  while (i < diffLines.length) {
    const line = diffLines[i];
    if (line.type === "unchanged") {
      rows.push({ oldLine: line, newLine: line });
      i++;
    } else {
      const removed: DiffLine[] = [];
      const added: DiffLine[] = [];
      
      while (i < diffLines.length && diffLines[i].type !== "unchanged") {
        if (diffLines[i].type === "removed") removed.push(diffLines[i]);
        if (diffLines[i].type === "added") added.push(diffLines[i]);
        i++;
      }
      
      const len = Math.max(removed.length, added.length);
      for (let j = 0; j < len; j++) {
        rows.push({
          oldLine: removed[j],
          newLine: added[j],
        });
      }
    }
  }

  const renderCell = (line: DiffLine | undefined, isOld: boolean) => {
    if (!line) {
      return (
        <>
          <td className="w-10 align-top bg-slate-800/10 border-l-2 border-transparent"></td>
          <td className="w-4 align-top bg-slate-800/10"></td>
          <td className="align-top bg-slate-800/10"></td>
        </>
      );
    }

    if (line.type === "unchanged" && line.content === "...") {
      return (
        <>
          <td className="w-10 bg-slate-800/40 py-0.5 text-center text-slate-600 text-[10px] select-none font-mono align-top border-l-2 border-transparent">···</td>
          <td colSpan={2} className="px-3 bg-slate-800/40 py-0.5 text-slate-600 text-[10px] font-mono italic select-none align-top border-r border-slate-700/50">
            ━━━ unchanged lines hidden ━━━
          </td>
        </>
      );
    }

    const bg =
      line.type === "added"
        ? "bg-emerald-950/50"
        : line.type === "removed"
        ? "bg-red-950/50"
        : "bg-transparent";

    const border =
      line.type === "added"
        ? "border-l-2 border-emerald-500"
        : line.type === "removed"
        ? "border-l-2 border-red-500"
        : "border-l-2 border-transparent";

    const textColor =
      line.type === "added"
        ? "text-emerald-200"
        : line.type === "removed"
        ? "text-red-200"
        : "text-slate-300";

    const prefix =
      line.type === "added" ? "+" : line.type === "removed" ? "−" : " ";

    const prefixColor =
      line.type === "added"
        ? "text-emerald-500 font-bold"
        : line.type === "removed"
        ? "text-red-500 font-bold"
        : "text-slate-700";

    const lineNum = isOld ? line.lineNumberOld : line.lineNumberNew;
    // Don't show line numbers for removed lines in the 'new' pane or added lines in the 'old' pane
    const displayNum = line.type === (isOld ? "added" : "removed") ? "" : lineNum ?? "";
    const borderRight = isOld ? "border-r border-slate-700/50" : "";

    return (
      <>
        <td className={`w-10 text-right pr-2 text-slate-600 text-[10px] select-none font-mono py-0.5 align-top ${bg} ${border}`}>
          {displayNum}
        </td>
        <td className={`w-4 text-center text-[11px] font-mono py-0.5 align-top select-none ${bg} ${prefixColor}`}>
          {prefix}
        </td>
        <td className={`align-top py-0.5 px-2 ${bg} ${borderRight}`}>
          <pre className={`font-mono text-[12px] leading-5 whitespace-pre-wrap break-all ${textColor}`}>
            {line.content}
          </pre>
        </td>
      </>
    );
  };

  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden flex flex-col">
      {/* Header row - synced width using grid */}
      <div className="grid grid-cols-2 gap-0 border-b border-slate-700/50">
        <div className="flex items-center justify-between px-3 py-2 bg-red-950/30 border-r border-slate-700/50">
          <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            {oldLabel}
          </span>
          <CopyButton content={oldContent} />
        </div>
        <div className="flex items-center justify-between px-3 py-2 bg-emerald-950/30">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            {newLabel}
          </span>
          <CopyButton content={newContent} />
        </div>
      </div>

      {/* Synchronized diff content */}
      <div className="overflow-x-auto bg-[#0d1117]">
        <table className="w-full border-collapse table-fixed text-left min-w-[800px]">
          <colgroup>
            <col className="w-10" />
            <col className="w-4" />
            <col />
            <col className="w-10" />
            <col className="w-4" />
            <col />
          </colgroup>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-all">
                {renderCell(row.oldLine, true)}
                {renderCell(row.newLine, false)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Unified view ─────────────────────────────────────────────────────────────

function UnifiedView({
  diffLines,
  newContent,
}: {
  diffLines: DiffLine[];
  newContent: string;
}) {
  return (
    <div className="border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-800/60 border-b border-slate-700/50">
        <span className="text-xs font-bold text-slate-400">Unified Diff</span>
        <CopyButton content={newContent} />
      </div>
      <div className="overflow-x-auto bg-[#0d1117]">
        {diffLines.map((line, i) => (
          <DiffLineRow key={i} line={line} showOld={true} showNew={true} />
        ))}
      </div>
    </div>
  );
}

// ─── Main DiffViewer ──────────────────────────────────────────────────────────

export function DiffViewer({
  oldContent,
  newContent,
  oldLabel = "Current Version",
  newLabel = "Improved Version",
  className = "",
}: DiffViewerProps) {
  const [mode, setMode] = useState<"split" | "unified">("split");

  const diffLines = useMemo(
    () => generateDiff(oldContent, newContent, 3),
    [oldContent, newContent]
  );

  const stats = useMemo(
    () => computeDiffStats(oldContent, newContent),
    [oldContent, newContent]
  );

  const hasChanges = stats.linesAdded > 0 || stats.linesRemoved > 0;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <StatsBadge stats={stats} />

        {hasChanges && (
          <div className="flex items-center gap-1 p-0.5 bg-slate-800/60 rounded-lg border border-slate-700/40">
            {(["split", "unified"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-md text-[11px] font-bold capitalize transition-all duration-150 ${
                  mode === m
                    ? "bg-slate-700 text-slate-100 shadow"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* No changes state */}
      {!hasChanges && (
        <div className="flex items-center justify-center py-12 rounded-xl border border-slate-700/40 bg-slate-800/20 text-slate-500 text-sm gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          The pasted content is identical to the current file — no changes detected.
        </div>
      )}

      {/* Diff display */}
      {hasChanges && mode === "split" && (
        <SplitView
          diffLines={diffLines}
          oldContent={oldContent}
          newContent={newContent}
          oldLabel={oldLabel}
          newLabel={newLabel}
        />
      )}
      {hasChanges && mode === "unified" && (
        <UnifiedView diffLines={diffLines} newContent={newContent} />
      )}
    </div>
  );
}
