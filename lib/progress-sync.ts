/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LOCAL-FIRST SYNC ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Bridges browser localStorage with Neon Serverless Postgres via Prisma.
 * - Local-First: Updates local storage immediately for zero-latency, offline UI.
 * - Cloud Sync: Bi-directional synchronization upon authentication.
 *   1. Pushes local completed lessons to /api/progress
 *   2. Pulls remote progress and hydrates local cache
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface ModuleProgress {
  module: string;
  completed: boolean;
  score?: number | null;
  updatedAt?: string;
}

const LOCAL_STORAGE_PREFIX = "learncraft_progress_";
const SYNC_EVENT_NAME = "learncraft:progress-sync";

/**
 * Scan localStorage for all lesson progress entries
 */
export function getLocalProgressList(): ModuleProgress[] {
  if (typeof window === "undefined") return [];

  const results: ModuleProgress[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(LOCAL_STORAGE_PREFIX)) {
        const moduleId = key.replace(LOCAL_STORAGE_PREFIX, "");
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const data = JSON.parse(raw);
            const isCompleted =
              data.completed === true ||
              (Array.isArray(data.completedSections) && data.completedSections.length > 0);

            results.push({
              module: moduleId,
              completed: isCompleted,
              score: data.score ?? null,
            });
          } catch {
            // If raw boolean or string was stored
            results.push({
              module: moduleId,
              completed: raw === "true",
            });
          }
        }
      }
    }
    // Also include global NestJS curriculum progress
    const nestjsRaw = localStorage.getItem("learncraft_nestjs_global_progress");
    if (nestjsRaw) {
      try {
        const parsed = JSON.parse(nestjsRaw);
        if (Array.isArray(parsed.completedLessons)) {
          for (const slug of parsed.completedLessons) {
            if (!results.some((r) => r.module === slug)) {
              results.push({
                module: slug,
                completed: true,
              });
            }
          }
        }
      } catch {}
    }
  } catch (err) {
    console.warn("[ProgressSync] Failed to read localStorage:", err);
  }

  return results;
}

let cachedCloudItems: ModuleProgress[] | null = null;
let lastReconcileTimestamp = 0;
const RECONCILE_CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL
let reconcileInFlightPromise: Promise<{
  syncedCount: number;
  cloudItems: ModuleProgress[];
}> | null = null;

/**
 * Save progress directly to Neon PostgreSQL database
 */
export async function recordProgress(
  moduleId: string,
  completed: boolean = true,
  score?: number,
  _isAuthenticated: boolean = true
): Promise<void> {
  if (typeof window === "undefined") return;

  // Invalidate progress reconcile cache on mutation so next fetch gets fresh state
  lastReconcileTimestamp = 0;

  // Dispatch custom event for multi-component reactive updates
  window.dispatchEvent(
    new CustomEvent(SYNC_EVENT_NAME, {
      detail: { moduleId, completed, score },
    })
  );

  // Directly save to Neon PostgreSQL via /api/progress
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: moduleId, completed, score }),
    });
  } catch (err) {
    console.warn("[ProgressSync] DB progress record failed:", err);
  }
}

/**
 * Fetch authoritative progress directly from Neon PostgreSQL
 * Optimized with in-flight deduplication and 60s in-memory TTL cache to eliminate redundant network hits during page navigation.
 */
export async function reconcileCloudProgress(force: boolean = false): Promise<{
  syncedCount: number;
  cloudItems: ModuleProgress[];
}> {
  if (typeof window === "undefined") return { syncedCount: 0, cloudItems: [] };

  const now = Date.now();
  // Return cached result if fresh and not explicitly forced
  if (!force && cachedCloudItems !== null && now - lastReconcileTimestamp < RECONCILE_CACHE_TTL_MS) {
    return { syncedCount: cachedCloudItems.length, cloudItems: cachedCloudItems };
  }

  // Deduplicate concurrent requests
  if (reconcileInFlightPromise) {
    return reconcileInFlightPromise;
  }

  reconcileInFlightPromise = (async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (!res.ok) {
        return { syncedCount: cachedCloudItems?.length || 0, cloudItems: cachedCloudItems || [] };
      }

      const { data } = await res.json();
      if (!Array.isArray(data)) {
        return { syncedCount: cachedCloudItems?.length || 0, cloudItems: cachedCloudItems || [] };
      }

      cachedCloudItems = data;
      lastReconcileTimestamp = Date.now();

      const completedSlugs = data
        .filter((d: { completed: boolean }) => d.completed)
        .map((d: { module: string }) => d.module);

      window.dispatchEvent(
        new CustomEvent("learncraft-progress-updated", {
          detail: { completedLessons: completedSlugs },
        })
      );

      window.dispatchEvent(
        new CustomEvent(SYNC_EVENT_NAME, {
          detail: { action: "reconciled", count: data.length },
        })
      );

      return { syncedCount: data.length, cloudItems: data };
    } catch (err) {
      console.error("[ProgressSync] Error reconciling progress with DB:", err);
      return { syncedCount: cachedCloudItems?.length || 0, cloudItems: cachedCloudItems || [] };
    } finally {
      reconcileInFlightPromise = null;
    }
  })();

  return reconcileInFlightPromise;
}

