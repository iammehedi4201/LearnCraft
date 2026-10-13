import { describe, it, expect, beforeEach } from "vitest";
import {
  fuzzyMatch,
  buildStaticSearchIndex,
  searchLearnCraft,
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  QUICK_ACTIONS,
} from "../search-engine";

describe("Global Search & Fuzzy Match Engine", () => {
  describe("fuzzyMatch", () => {
    it("should score exact match highest", () => {
      const result = fuzzyMatch("Next.js", "Next.js");
      expect(result.matched).toBe(true);
      expect(result.score).toBe(1000);
      expect(result.highlightIndices).toEqual([[0, 7]]);
    });

    it("should score prefix match very high", () => {
      const result = fuzzyMatch("postgre", "PostgreSQL Track");
      expect(result.matched).toBe(true);
      expect(result.score).toBeGreaterThan(800);
    });

    it("should match word boundary substring", () => {
      const result = fuzzyMatch("Router", "The App Router Architecture");
      expect(result.matched).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(650);
    });

    it("should match acronyms (e.g. 'sd' for 'System Design')", () => {
      const result = fuzzyMatch("sd", "System Design");
      expect(result.matched).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(600);
    });

    it("should match character sequences fuzzily", () => {
      const result = fuzzyMatch("apprtr", "App Router");
      expect(result.matched).toBe(true);
      expect(result.score).toBeGreaterThan(0);
    });

    it("should return matched: false for completely unrelated queries", () => {
      const result = fuzzyMatch("xyz12345", "System Design");
      expect(result.matched).toBe(false);
      expect(result.score).toBe(0);
    });
  });

  describe("buildStaticSearchIndex", () => {
    it("should index quick actions, curriculum tracks, lessons, and roadmaps", () => {
      const index = buildStaticSearchIndex();
      expect(index.length).toBeGreaterThan(50);

      // Check actions
      const actions = index.filter((i) => i.category === "actions");
      expect(actions.length).toBe(QUICK_ACTIONS.length);

      // Check tracks
      const tracks = index.filter((i) => i.category === "tracks");
      expect(tracks.length).toBeGreaterThanOrEqual(13);

      // Check lessons
      const lessons = index.filter((i) => i.category === "lessons");
      expect(lessons.length).toBeGreaterThan(30);

      // Check roadmaps
      const roadmaps = index.filter((i) => i.category === "roadmaps");
      expect(roadmaps.length).toBeGreaterThan(5);
    });
  });

  describe("searchLearnCraft", () => {
    it("should return top ranked results when searching for a curriculum track", () => {
      const results = searchLearnCraft("Next.js");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title.toLowerCase()).toContain("next");
    });

    it("should find lessons by code (e.g., 'SYS-01')", () => {
      const results = searchLearnCraft("SYS-01");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.badge === "SYS-01")).toBe(true);
    });

    it("should filter results by category", () => {
      const lessonResults = searchLearnCraft("Design", "lessons");
      expect(lessonResults.every((r) => r.category === "lessons")).toBe(true);

      const actionResults = searchLearnCraft("Dashboard", "actions");
      expect(actionResults.every((r) => r.category === "actions")).toBe(true);
    });

    it("should return quick actions when searching for common verbs like 'Theme' or 'Dashboard'", () => {
      const themeResults = searchLearnCraft("Theme", "actions");
      expect(themeResults.some((r) => r.actionId === "toggle-theme")).toBe(true);

      const dashResults = searchLearnCraft("Dashboard", "actions");
      expect(dashResults.some((r) => r.actionId === "nav-dashboard")).toBe(true);
    });
  });

  describe("Recent Searches", () => {
    beforeEach(() => {
      // Ensure localStorage exists in test environment
      if (typeof globalThis.localStorage === "undefined" || !globalThis.localStorage.getItem) {
        const store: Record<string, string> = {};
        (globalThis as any).localStorage = {
          getItem: (key: string) => store[key] || null,
          setItem: (key: string, val: string) => {
            store[key] = val;
          },
          removeItem: (key: string) => {
            delete store[key];
          },
          clear: () => {
            for (const k in store) delete store[k];
          },
        };
      }
      clearRecentSearches();
    });

    it("should save and retrieve recent searches", () => {
      saveRecentSearch({
        id: "lesson-test-1",
        title: "Test Lesson",
        category: "lessons",
        icon: "📖",
        href: "/learn/nextjs/test",
      });

      const recents = getRecentSearches();
      expect(recents.length).toBe(1);
      expect(recents[0].title).toBe("Test Lesson");
    });

    it("should remove individual recent searches", () => {
      saveRecentSearch({
        id: "item-1",
        title: "Item 1",
        category: "actions",
        icon: "⚡",
      });
      saveRecentSearch({
        id: "item-2",
        title: "Item 2",
        category: "actions",
        icon: "📊",
      });

      removeRecentSearch("item-1");
      const recents = getRecentSearches();
      expect(recents.length).toBe(1);
      expect(recents[0].id).toBe("item-2");
    });

    it("should clear all recent searches", () => {
      saveRecentSearch({
        id: "item-1",
        title: "Item 1",
        category: "actions",
        icon: "⚡",
      });
      clearRecentSearches();
      expect(getRecentSearches()).toEqual([]);
    });
  });
});
