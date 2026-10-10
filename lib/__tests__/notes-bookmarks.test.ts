import { describe, it, expect } from "vitest";
import {
  mergeNotesStates,
  mergeBookmarksStates,
  syncLegacyAnnotationsIntoNotes,
} from "../notes-bookmarks";
import type { UserNote, CodeBookmark } from "@/types/notes-bookmarks";

describe("Notes & Bookmarks Synchronization Engine", () => {
  it("should merge notes using latest-write-wins (LWW) conflict resolution", () => {
    const localNotes: UserNote[] = [
      {
        id: "note-1",
        trackKey: "react",
        lessonSlug: "react01",
        content: "Old local content",
        createdAt: 1000,
        updatedAt: 2000,
      },
      {
        id: "note-2",
        trackKey: "nodejs",
        lessonSlug: "node01",
        content: "Local only note",
        createdAt: 1500,
        updatedAt: 1500,
      },
    ];

    const remoteNotes: UserNote[] = [
      {
        id: "note-1",
        trackKey: "react",
        lessonSlug: "react01",
        content: "New remote updated content",
        createdAt: 1000,
        updatedAt: 3000, // Newer timestamp
      },
      {
        id: "note-3",
        trackKey: "typescript",
        lessonSlug: "ts01",
        content: "Remote only note",
        createdAt: 2500,
        updatedAt: 2500,
      },
    ];

    const merged = mergeNotesStates(localNotes, remoteNotes);

    expect(merged).toHaveLength(3);
    const note1 = merged.find((n) => n.id === "note-1");
    expect(note1?.content).toBe("New remote updated content");
    expect(note1?.updatedAt).toBe(3000);

    // Note 2 and 3 should both be present
    expect(merged.some((n) => n.id === "note-2")).toBe(true);
    expect(merged.some((n) => n.id === "note-3")).toBe(true);

    // Should be sorted by updatedAt descending
    expect(merged[0].id).toBe("note-1");
    expect(merged[1].id).toBe("note-3");
    expect(merged[2].id).toBe("note-2");
  });

  it("should preserve local note if local timestamp is newer", () => {
    const localNotes: UserNote[] = [
      {
        id: "note-1",
        trackKey: "react",
        lessonSlug: "react01",
        content: "Latest local note",
        createdAt: 1000,
        updatedAt: 5000,
      },
    ];

    const remoteNotes: UserNote[] = [
      {
        id: "note-1",
        trackKey: "react",
        lessonSlug: "react01",
        content: "Stale remote note",
        createdAt: 1000,
        updatedAt: 4000,
      },
    ];

    const merged = mergeNotesStates(localNotes, remoteNotes);
    expect(merged[0].content).toBe("Latest local note");
  });

  it("should merge code bookmarks by union of unique IDs", () => {
    const localBookmarks: CodeBookmark[] = [
      {
        id: "bm-1",
        trackKey: "react",
        lessonSlug: "react01",
        title: "UseEffect Pattern",
        code: "useEffect(() => {}, [])",
        createdAt: 2000,
      },
      {
        id: "bm-2",
        trackKey: "typescript",
        lessonSlug: "ts01",
        title: "Strict Type",
        code: "type Config = { id: string }",
        createdAt: 1000,
      },
    ];

    const remoteBookmarks: CodeBookmark[] = [
      {
        id: "bm-1", // duplicate ID
        trackKey: "react",
        lessonSlug: "react01",
        title: "UseEffect Pattern",
        code: "useEffect(() => {}, [])",
        createdAt: 2000,
      },
      {
        id: "bm-3", // new remote
        trackKey: "postgresql",
        lessonSlug: "pg01",
        title: "CTE Query",
        code: "WITH t AS (SELECT * FROM users) SELECT * FROM t;",
        createdAt: 3000,
      },
    ];

    const merged = mergeBookmarksStates(localBookmarks, remoteBookmarks);

    expect(merged).toHaveLength(3);
    // Should be sorted by createdAt descending
    expect(merged[0].id).toBe("bm-3");
    expect(merged[1].id).toBe("bm-1");
    expect(merged[2].id).toBe("bm-2");
  });

  it("should bridge legacy annotations into UserNotes without duplicates", () => {
    const mockStorage: Record<string, string> = {
      learncraft_revisions_v1: JSON.stringify([
        {
          id: "sample_rev_01",
          topicId: "nestjs",
          topicTitle: "NestJS",
          lessonId: "nj02-oop-foundations",
          lessonTitle: "OOP Foundations",
          lessonPath: "/learn/nestjs/nj02-oop-foundations",
          question: "What is Encapsulation?",
          note: "Private fields with public getters.",
          selectedText: "Encapsulation bundles data and methods.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "sample_rev_02",
          topicId: "tanstack",
          topicTitle: "TanStack Query",
          lessonId: "tq04-staletime-gctime",
          lessonTitle: "staleTime vs gcTime",
          lessonPath: "/learn/tanstack/tq04-staletime-gctime",
          selectedText: "staleTime defines freshness window.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]),
    };

    // Mock global window and localStorage
    const originalWindow = global.window;
    (global as any).window = {
      localStorage: {
        getItem: (key: string) => mockStorage[key] || null,
        setItem: (key: string, val: string) => {
          mockStorage[key] = val;
        },
      },
      dispatchEvent: () => true,
    };
    (global as any).localStorage = (global as any).window.localStorage;

    const currentNotes: UserNote[] = [];

    const result = syncLegacyAnnotationsIntoNotes(currentNotes);
    expect(result.hasChanges).toBe(true);
    expect(result.merged).toHaveLength(2);

    const note1 = result.merged.find((n: UserNote) => n.id === "sample_rev_01");
    expect(note1?.trackKey).toBe("nestjs");
    expect(note1?.lessonSlug).toBe("nj02-oop-foundations");
    expect(note1?.title).toBe("What is Encapsulation?");
    expect(note1?.content).toContain("Private fields with public getters.");
    expect(note1?.content).toContain('> "Encapsulation bundles data and methods."');

    // Running again with the merged notes should result in 0 new changes
    const secondPass = syncLegacyAnnotationsIntoNotes(result.merged);
    expect(secondPass.hasChanges).toBe(false);
    expect(secondPass.merged).toHaveLength(2);

    if (originalWindow) {
      (global as any).window = originalWindow;
    } else {
      delete (global as any).window;
      delete (global as any).localStorage;
    }
  });
});
