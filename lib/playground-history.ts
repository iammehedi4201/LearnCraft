/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PLAYGROUND EXECUTION HISTORY & SNAPSHOT MANAGER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Auto-saves code revisions and execution snapshots to localStorage so
 * learners never lose their code iterations across lessons.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface PlaygroundSnapshot {
  id: string;
  timestamp: string;
  code: string;
  status: "success" | "error" | "tested" | "saved";
  linesCount: number;
  preview: string;
}

const STORAGE_PREFIX = "learncraft_pg_history_";
const MAX_SNAPSHOTS_PER_EXERCISE = 10;

/**
 * Generate a safe storage key for lesson/exercise combination
 */
export function getHistoryStorageKey(contextKey: string): string {
  return `${STORAGE_PREFIX}${contextKey.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

/**
 * Get all snapshots for a given exercise or lesson
 */
export function getPlaygroundSnapshots(contextKey: string): PlaygroundSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getHistoryStorageKey(contextKey));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[PlaygroundHistory] Failed to read snapshots:", err);
    return [];
  }
}

/**
 * Save a new snapshot for a given exercise/lesson
 */
export function savePlaygroundSnapshot(
  contextKey: string,
  code: string,
  status: "success" | "error" | "tested" | "saved" = "saved"
): PlaygroundSnapshot | null {
  if (typeof window === "undefined" || !code.trim()) return null;

  try {
    const current = getPlaygroundSnapshots(contextKey);
    const firstLine = code.split("\n").find((l) => l.trim().length > 0) || "Code snippet";
    const preview = firstLine.trim().slice(0, 60);

    // Skip if identical to most recent snapshot
    if (current.length > 0 && current[0].code.trim() === code.trim()) {
      return current[0];
    }

    const newSnapshot: PlaygroundSnapshot = {
      id: `snap_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      code,
      status,
      linesCount: code.split("\n").length,
      preview,
    };

    const updated = [newSnapshot, ...current].slice(0, MAX_SNAPSHOTS_PER_EXERCISE);
    localStorage.setItem(getHistoryStorageKey(contextKey), JSON.stringify(updated));

    return newSnapshot;
  } catch (err) {
    console.error("[PlaygroundHistory] Failed to save snapshot:", err);
    return null;
  }
}

/**
 * Delete a specific snapshot
 */
export function deletePlaygroundSnapshot(contextKey: string, snapshotId: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getPlaygroundSnapshots(contextKey);
    const filtered = current.filter((s) => s.id !== snapshotId);
    localStorage.setItem(getHistoryStorageKey(contextKey), JSON.stringify(filtered));
  } catch (err) {
    console.error("[PlaygroundHistory] Failed to delete snapshot:", err);
  }
}

/**
 * Clear all history for a specific exercise
 */
export function clearPlaygroundHistory(contextKey: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getHistoryStorageKey(contextKey));
}
