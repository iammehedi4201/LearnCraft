/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * IMPROVEMENT HISTORY — Version Management Engine
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Manages version history for lesson content improvements.
 * All history is persisted to improvement-history.json at the project root.
 *
 * API:
 *   loadHistory()              — Read all improvement records
 *   saveImprovement(record)    — Append a new record with previous content
 *   undoImprovement(id)        — Restore previous content, mark undone
 *   redoImprovement(id)        — Re-apply undone improvement
 *   getHistoryForLesson(slug)  — Filter records by lesson slug
 *   getHistoryForSection(path) — Filter records by file path
 *   computeDiffStats(a, b)     — Line-level change statistics
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImprovementRecord {
  /** UUID v4 */
  id: string;
  /** ISO 8601 timestamp of when this improvement was applied */
  timestamp: string;
  topic: {
    id: string;
    title: string;
  };
  lesson: {
    slug: string;
    name: string;
  };
  section: {
    fileName: string;
    exportName: string;
    title: string;
    sectionNumber: number;
  };
  /** Relative path from project root, e.g. "app/learn/nestjs/nj02-oop-foundations/components/methods-section.tsx" */
  filePath: string;
  /** Complete file content BEFORE this improvement was applied */
  previousContent: string;
  /** Complete file content AFTER this improvement was applied */
  newContent: string;
  /** Optional human-readable description of what changed */
  description: string;
  /** Whether this improvement was reverted via undo */
  undone: boolean;
  /** Change stats (computed at save time) */
  stats: DiffStats;
}

export interface DiffStats {
  linesAdded: number;
  linesRemoved: number;
  linesChanged: number;
  totalLinesOld: number;
  totalLinesNew: number;
}

export interface ImprovementHistoryFile {
  version: 1;
  records: ImprovementRecord[];
}

// ─── UUID generator (no external deps) ───────────────────────────────────────

export function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── Diff stats computation ───────────────────────────────────────────────────

/**
 * Compute line-level diff statistics between two versions of content.
 * Uses a simple LCS-based diff for accurate line change detection.
 */
export function computeDiffStats(oldContent: string, newContent: string): DiffStats {
  const oldLines = oldContent.split("\n");
  const newLines = newContent.split("\n");

  // Build LCS (Longest Common Subsequence) via DP
  const m = oldLines.length;
  const n = newLines.length;

  // For large files, use a simplified approach (heuristic)
  if (m * n > 100_000) {
    // Approximate: count non-matching lines
    const oldSet = new Set(oldLines);
    const newSet = new Set(newLines);
    const removed = oldLines.filter((l) => !newSet.has(l)).length;
    const added = newLines.filter((l) => !oldSet.has(l)).length;
    return {
      linesAdded: added,
      linesRemoved: removed,
      linesChanged: Math.min(removed, added),
      totalLinesOld: m,
      totalLinesNew: n,
    };
  }

  // Standard LCS DP
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcsLength = dp[m][n];
  const removed = m - lcsLength;
  const added = n - lcsLength;
  const changed = Math.min(removed, added); // Lines that were modified (not purely added/removed)

  return {
    linesAdded: added,
    linesRemoved: removed,
    linesChanged: changed,
    totalLinesOld: m,
    totalLinesNew: n,
  };
}

// ─── Unified diff generation ──────────────────────────────────────────────────

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
  lineNumberOld?: number;
  lineNumberNew?: number;
}

/**
 * Generate a unified diff between two versions of content.
 * Returns an array of DiffLine objects for rendering.
 * Context lines controls how many unchanged lines to show around each change.
 */
export function generateDiff(
  oldContent: string,
  newContent: string,
  contextLines = 3
): DiffLine[] {
  const oldLines = oldContent.split("\n");
  const newLines = newContent.split("\n");
  const m = oldLines.length;
  const n = newLines.length;

  // Simplified Myers-like diff for display purposes
  // For large files, limit to first 500 lines to keep UI fast
  const maxLines = 500;
  const oldSlice = oldLines.slice(0, maxLines);
  const newSlice = newLines.slice(0, maxLines);

  const sm = oldSlice.length;
  const sn = newSlice.length;

  // Build DP table
  const dp: number[][] = Array.from({ length: sm + 1 }, () => new Array(sn + 1).fill(0));
  for (let i = 1; i <= sm; i++) {
    for (let j = 1; j <= sn; j++) {
      if (oldSlice[i - 1] === newSlice[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Traceback to build diff
  const rawDiff: DiffLine[] = [];
  let i = sm;
  let j = sn;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldSlice[i - 1] === newSlice[j - 1]) {
      rawDiff.unshift({
        type: "unchanged",
        content: oldSlice[i - 1],
        lineNumberOld: i,
        lineNumberNew: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawDiff.unshift({
        type: "added",
        content: newSlice[j - 1],
        lineNumberNew: j,
      });
      j--;
    } else {
      rawDiff.unshift({
        type: "removed",
        content: oldSlice[i - 1],
        lineNumberOld: i,
      });
      i--;
    }
  }

  // Apply context collapsing — keep only `contextLines` around changes
  const hasChange = rawDiff.map((l) => l.type !== "unchanged");

  // Mark lines that are within context distance of a change
  const keepLine = rawDiff.map((_, idx) => {
    if (hasChange[idx]) return true;
    for (let c = Math.max(0, idx - contextLines); c <= Math.min(rawDiff.length - 1, idx + contextLines); c++) {
      if (hasChange[c]) return true;
    }
    return false;
  });

  const result: DiffLine[] = [];
  let prevKept = true;

  for (let k = 0; k < rawDiff.length; k++) {
    if (keepLine[k]) {
      if (!prevKept && k > 0) {
        // Insert a separator marker using a special "unchanged" line
        result.push({ type: "unchanged", content: "...", lineNumberOld: undefined, lineNumberNew: undefined });
      }
      result.push(rawDiff[k]);
      prevKept = true;
    } else {
      prevKept = false;
    }
  }

  // If file was truncated, add a note
  if (m > maxLines || n > maxLines) {
    result.push({
      type: "unchanged",
      content: `... (file truncated for display, showing first ${maxLines} lines)`,
    });
  }

  return result;
}

// ─── History API (Client-Side, via /api/improve/* endpoints) ─────────────────
// Note: These functions call the Next.js API routes. They do not read/write
// the filesystem directly (that's the server's job).

/**
 * Fetch all improvement records from the server.
 */
export async function loadHistory(): Promise<ImprovementRecord[]> {
  const res = await fetch("/api/improve/history");
  if (!res.ok) throw new Error(`Failed to load history: ${res.statusText}`);
  const data: ImprovementHistoryFile = await res.json();
  return data.records;
}

/**
 * Fetch improvement records filtered by lesson slug.
 */
export async function loadHistoryForLesson(lessonSlug: string): Promise<ImprovementRecord[]> {
  const res = await fetch(`/api/improve/history?lesson=${encodeURIComponent(lessonSlug)}`);
  if (!res.ok) throw new Error(`Failed to load history: ${res.statusText}`);
  const data: ImprovementHistoryFile = await res.json();
  return data.records;
}

/**
 * Apply an improvement: write the new content to the file and record history.
 */
export async function applyImprovement(payload: {
  filePath: string;
  newContent: string;
  topic: ImprovementRecord["topic"];
  lesson: ImprovementRecord["lesson"];
  section: ImprovementRecord["section"];
  description: string;
}): Promise<ImprovementRecord> {
  const res = await fetch("/api/improve?action=apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Failed to apply improvement");
  }
  return res.json();
}

/**
 * Undo an improvement: restore the previous file content.
 */
export async function undoImprovement(recordId: string): Promise<{ ok: boolean }> {
  const res = await fetch("/api/improve?action=undo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: recordId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Failed to undo improvement");
  }
  return res.json();
}

/**
 * Re-apply an undone improvement.
 */
export async function redoImprovement(recordId: string): Promise<{ ok: boolean }> {
  const res = await fetch("/api/improve?action=redo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: recordId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Failed to redo improvement");
  }
  return res.json();
}

// generateId and ImprovementHistoryFile are exported inline above.
