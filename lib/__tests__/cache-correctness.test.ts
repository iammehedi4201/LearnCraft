import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  reconcileCloudProgress,
  clearProgressCache,
} from "../progress-sync";
import {
  syncGamificationWithCloud,
  clearGamificationCache,
} from "../gamification";
import {
  syncNotesWithCloud,
  clearNotesCache,
  invalidateNotesSync,
  syncBookmarksWithCloud,
  clearBookmarksCache,
  invalidateBookmarksSync,
} from "../notes-bookmarks";

describe("Cache Correctness, User Isolation, and In-Flight Synchronization", () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    const localStorageMock = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
      length: 0,
      key: () => null,
    };

    (global as any).window = {
      dispatchEvent: vi.fn(),
    };
    (global as any).localStorage = localStorageMock;

    clearProgressCache();
    clearGamificationCache();
    clearNotesCache();
    clearBookmarksCache();
    vi.restoreAllMocks();
  });

  it("reconcileCloudProgress deduplicates concurrent in-flight requests into a single network call", async () => {
    let fetchCount = 0;
    global.fetch = vi.fn().mockImplementation(async () => {
      fetchCount++;
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: [{ module: "react-basics", completed: true, score: 100 }],
        }),
      };
    }) as any;

    // Trigger two simultaneous concurrent calls
    const [p1, p2] = await Promise.all([
      reconcileCloudProgress(false, "user-1"),
      reconcileCloudProgress(false, "user-1"),
    ]);

    expect(fetchCount).toBe(1);
    expect(p1.cloudItems).toHaveLength(1);
    expect(p2.cloudItems).toHaveLength(1);
  });

  it("reconcileCloudProgress isolates caches by userId and purges previous user cache on user change", async () => {
    let fetchCalls: string[] = [];
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      fetchCalls.push(url);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          data: [{ module: "lesson-a", completed: true }],
        }),
      };
    }) as any;

    // Call as user-1
    await reconcileCloudProgress(false, "user-1");
    expect(fetchCalls.length).toBe(1);

    // Call as user-1 again within TTL -> hits cache (no new fetch)
    await reconcileCloudProgress(false, "user-1");
    expect(fetchCalls.length).toBe(1);

    // Call as user-2 -> detected user switch, cache purged, triggers fresh network fetch
    await reconcileCloudProgress(false, "user-2");
    expect(fetchCalls.length).toBe(2);
  });

  it("clears cached progress data when API returns 401 Unauthorized", async () => {
    global.fetch = vi.fn().mockImplementation(async () => {
      return {
        ok: false,
        status: 401,
        json: async () => ({ error: "Unauthorized" }),
      };
    }) as any;

    const res = await reconcileCloudProgress(false, "user-1");
    expect(res.syncedCount).toBe(0);
    expect(res.cloudItems).toHaveLength(0);
  });

  it("gamification cloud sync purges cache on user change", async () => {
    let fetchCount = 0;
    global.fetch = vi.fn().mockImplementation(async () => {
      fetchCount++;
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          state: { totalXP: 100, currentStreak: 5 },
        }),
      };
    }) as any;

    await syncGamificationWithCloud(false, "user-1");
    expect(fetchCount).toBe(1);

    // Second call for user-1 within TTL returns cached state
    await syncGamificationWithCloud(false, "user-1");
    expect(fetchCount).toBe(1);

    // Call for user-2 purges cache and refetches
    await syncGamificationWithCloud(false, "user-2");
    expect(fetchCount).toBe(2);
  });

  it("notes and bookmarks sync invalidates TTL cache immediately on mutations", async () => {
    let getFetchCount = 0;
    global.fetch = vi.fn().mockImplementation(async (url: string, init?: any) => {
      if (url === "/api/notes" && (!init || init.method === "GET")) {
        getFetchCount++;
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          notes: [{ id: "n1", content: "hello", trackKey: "t", lessonSlug: "l", createdAt: 1, updatedAt: 1 }],
        }),
      };
    }) as any;

    await syncNotesWithCloud(false, "user-1");
    expect(getFetchCount).toBe(1);

    // Second call within TTL -> hits cache (no new GET fetch)
    await syncNotesWithCloud(false, "user-1");
    expect(getFetchCount).toBe(1);

    // Note mutation invalidates TTL cache
    invalidateNotesSync();

    // Next sync must hit network again
    await syncNotesWithCloud(false, "user-1");
    expect(getFetchCount).toBe(2);
  });

  it("bookmarks sync invalidates TTL cache immediately on bookmark mutations", async () => {
    let getFetchCount = 0;
    global.fetch = vi.fn().mockImplementation(async (url: string, init?: any) => {
      if (url === "/api/bookmarks" && (!init || init.method === "GET")) {
        getFetchCount++;
      }
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          bookmarks: [{ id: "b1", code: "const x = 1;", trackKey: "t", lessonSlug: "l", title: "t", createdAt: 1 }],
        }),
      };
    }) as any;

    await syncBookmarksWithCloud(false, "user-1");
    expect(getFetchCount).toBe(1);

    // Second call within TTL -> hits cache
    await syncBookmarksWithCloud(false, "user-1");
    expect(getFetchCount).toBe(1);

    // Mutation invalidates cache
    invalidateBookmarksSync();

    await syncBookmarksWithCloud(false, "user-1");
    expect(getFetchCount).toBe(2);
  });
});
