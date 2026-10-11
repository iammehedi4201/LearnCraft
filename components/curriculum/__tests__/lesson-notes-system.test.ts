import { describe, it, expect, beforeEach, vi, beforeAll } from "vitest";
import {
  normalizeUserNote,
  serializeQAEntriesToMarkdown,
  serializeCodeNoteToMarkdown,
  serializeNotebookToMarkdown,
  createDefaultTextBlock,
  createDefaultQABlock,
  createDefaultCodeBlock,
  reorderNotebookBlocks,
  getLocalNotes,
  upsertNote,
  getNoteForLesson,
  deleteNote,
} from "@/lib/notes-bookmarks";
import type { QAEntry, CodeNoteData, LessonNoteBlock } from "@/types/notes-bookmarks";

// In-memory mock for Node test environment
const mockStorage: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, val: string) => {
    mockStorage[key] = String(val);
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k in mockStorage) delete mockStorage[k];
  },
};

describe("Lesson Notes System — Structured Content Types & Backward Compatibility", () => {
  beforeAll(() => {
    // Provide localStorage and window mocks for Node test environment
    (global as any).localStorage = localStorageMock;
    (global as any).window = {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });

  beforeEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  describe("1. Backward Compatibility & Normalization", () => {
    it("safely normalizes legacy notes without noteType to noteType='text'", () => {
      const legacyNote = {
        id: "legacy-note-1",
        trackKey: "javascript",
        lessonSlug: "js01-variables",
        title: "Variables Note",
        content: "var is function scoped, let is block scoped.",
        createdAt: 1700000000000,
        updatedAt: 1700000000000,
      };

      const normalized = normalizeUserNote(legacyNote);
      expect(normalized.id).toBe("legacy-note-1");
      expect(normalized.noteType).toBe("text");
      expect(normalized.content).toBe("var is function scoped, let is block scoped.");
      expect(normalized.trackKey).toBe("javascript");
      expect(normalized.lessonSlug).toBe("js01-variables");
    });

    it("handles malformed, empty, or null legacy data safely without throwing", () => {
      const nullNormalized = normalizeUserNote(null);
      expect(nullNormalized.noteType).toBe("text");
      expect(nullNormalized.content).toBe("");
      expect(nullNormalized.id).toBeTruthy();

      const malformed = normalizeUserNote({ id: 123, content: null });
      expect(malformed.id).toBe("123");
      expect(malformed.content).toBe("");
      expect(malformed.noteType).toBe("text");
    });

    it("loads legacy notes from localStorage and automatically normalizes them", () => {
      const rawLegacyNotes = [
        {
          id: "note-old-1",
          trackKey: "typescript",
          lessonSlug: "primitive-types",
          content: "Use unknown instead of any for type safety.",
          createdAt: 1700000000000,
          updatedAt: 1700000000000,
        },
      ];
      localStorage.setItem("learncraft_notes_v1", JSON.stringify(rawLegacyNotes));

      const notes = getLocalNotes();
      expect(notes).toHaveLength(1);
      expect(notes[0].noteType).toBe("text");
      expect(notes[0].content).toBe("Use unknown instead of any for type safety.");
    });
  });

  describe("2. Q&A Content Type & Serialization", () => {
    it("serializes single and multiple Q&A entries to readable Markdown", () => {
      const entries: QAEntry[] = [
        {
          id: "qa-1",
          question: "What is closure?",
          answer: "A function bundled with references to its lexical scope.",
          explanation: "Enables data privacy and factory functions.",
        },
        {
          id: "qa-2",
          question: "What is hoisting?",
          answer: "Declarations moved to the top during compilation.",
        },
      ];

      const markdown = serializeQAEntriesToMarkdown(entries);
      expect(markdown).toContain("### ❓ Q1: What is closure?");
      expect(markdown).toContain("> **Answer:** A function bundled with references to its lexical scope.");
      expect(markdown).toContain("> 💡 **Explanation:** Enables data privacy and factory functions.");
      expect(markdown).toContain("### ❓ Q2: What is hoisting?");
      expect(markdown).toContain("> **Answer:** Declarations moved to the top during compilation.");
    });

    it("returns empty string when Q&A entries list is empty", () => {
      expect(serializeQAEntriesToMarkdown([])).toBe("");
    });

    it("manages multiple Q&A entries independently (add, edit, delete, reorder)", () => {
      const initialEntries: QAEntry[] = [
        { id: "1", question: "Q1", answer: "A1" },
        { id: "2", question: "Q2", answer: "A2" },
        { id: "3", question: "Q3", answer: "A3" },
      ];

      // Add
      const added = [...initialEntries, { id: "4", question: "Q4", answer: "A4" }];
      expect(added).toHaveLength(4);

      // Edit
      const edited = added.map((e) => (e.id === "2" ? { ...e, answer: "Updated A2" } : e));
      expect(edited.find((e) => e.id === "2")?.answer).toBe("Updated A2");

      // Delete
      const deleted = edited.filter((e) => e.id !== "1");
      expect(deleted).toHaveLength(3);
      expect(deleted.find((e) => e.id === "1")).toBeUndefined();

      // Reorder (move "3" up above "2")
      const reordered = [...deleted];
      const item3Index = reordered.findIndex((e) => e.id === "3");
      const [item3] = reordered.splice(item3Index, 1);
      reordered.splice(item3Index - 1, 0, item3);
      expect(reordered[0].id).toBe("3");
    });
  });

  describe("3. Code Snippet Content Type & Serialization", () => {
    it("serializes code snippet data with language, code, title, and notes to Markdown", () => {
      const codeData: CodeNoteData = {
        title: "useDebounce Hook",
        language: "typescript",
        code: "function useDebounce<T>(value: T, delay: number): T {\n  return value;\n}",
        explanation: "Delays updating value until delay period expires.",
      };

      const markdown = serializeCodeNoteToMarkdown(codeData);
      expect(markdown).toContain("### 💻 useDebounce Hook");
      expect(markdown).toContain("```typescript");
      expect(markdown).toContain("function useDebounce<T>");
      expect(markdown).toContain("> 💡 **Notes:** Delays updating value until delay period expires.");
    });

    it("serializes code snippets without title or explanation cleanly", () => {
      const codeData: CodeNoteData = {
        language: "javascript",
        code: "console.log('Hello');",
      };

      const markdown = serializeCodeNoteToMarkdown(codeData);
      expect(markdown).toBe("```javascript\nconsole.log('Hello');\n```");
    });
  });

  describe("4. Non-Destructive Content Type Switching", () => {
    it("preserves textDraft and qaEntries when switching between content types", () => {
      const noteInput = {
        trackKey: "react",
        lessonSlug: "use-effect-basics",
        noteType: "qa" as const,
        content: "",
        textDraft: "My original text notes from yesterday.",
        qaEntries: [
          {
            id: "qa-react-1",
            question: "When does useEffect run?",
            answer: "After the component renders.",
          },
        ],
      };

      const saved = upsertNote(noteInput);
      expect(saved.noteType).toBe("qa");
      expect(saved.textDraft).toBe("My original text notes from yesterday.");
      expect(saved.qaEntries).toHaveLength(1);
      // Content is serialized for search & preview
      expect(saved.content).toContain("When does useEffect run?");

      // Switch to Code without losing Q&A or textDraft
      const switchedToCode = upsertNote({
        ...saved,
        noteType: "code",
        codeData: {
          title: "Timer Cleanup",
          language: "typescript",
          code: "useEffect(() => { const t = setTimeout(() => {}, 100); return () => clearTimeout(t); }, []);",
        },
      });

      expect(switchedToCode.noteType).toBe("code");
      expect(switchedToCode.textDraft).toBe("My original text notes from yesterday.");
      expect(switchedToCode.qaEntries).toHaveLength(1);
      expect(switchedToCode.codeData?.title).toBe("Timer Cleanup");
      expect(switchedToCode.content).toContain("Timer Cleanup");
    });
  });

  describe("5. Autosave, Lesson Association & Storage", () => {
    it("associates notes with correct track and lesson slug", () => {
      const jsNote = upsertNote({
        trackKey: "javascript",
        lessonSlug: "prototypal-inheritance",
        content: "Prototypes link objects via __proto__ or Object.getPrototypeOf",
      });

      const pgNote = upsertNote({
        trackKey: "postgresql",
        lessonSlug: "indexes-btree",
        content: "B-Tree indexes speed up equality and range queries",
      });

      expect(getNoteForLesson("javascript", "prototypal-inheritance")?.id).toBe(jsNote.id);
      expect(getNoteForLesson("postgresql", "indexes-btree")?.id).toBe(pgNote.id);
      expect(getNoteForLesson("javascript", "indexes-btree")).toBeNull();
    });

    it("updates existing note on rapid edits without creating duplicates", () => {
      const first = upsertNote({
        trackKey: "nextjs",
        lessonSlug: "server-components",
        content: "Draft 1",
      });

      const second = upsertNote({
        id: first.id,
        trackKey: "nextjs",
        lessonSlug: "server-components",
        content: "Draft 2 — updated",
      });

      expect(second.id).toBe(first.id);
      const allNotes = getLocalNotes();
      expect(allNotes.filter((n) => n.id === first.id)).toHaveLength(1);
      expect(allNotes[0].content).toBe("Draft 2 — updated");
    });

    it("deletes note cleanly when requested", () => {
      const note = upsertNote({
        trackKey: "nestjs",
        lessonSlug: "dependency-injection",
        content: "Providers decorated with @Injectable()",
      });

      expect(getNoteForLesson("nestjs", "dependency-injection")).not.toBeNull();
      deleteNote(note.id);
      expect(getNoteForLesson("nestjs", "dependency-injection")).toBeNull();
    });
  });

  describe("6. Unified Notebook Model & Mixed Ordered Blocks", () => {
    it("serializes mixed ordered blocks (text, qa, code) into Markdown in exact block sequence", () => {
      const blocks: LessonNoteBlock[] = [
        {
          id: "b1",
          type: "text",
          order: 0,
          content: "## What is the Next.js App Router?\nThe App Router is a file-system based router.",
          createdAt: 1000,
          updatedAt: 1000,
        },
        {
          id: "b2",
          type: "qa",
          order: 1,
          question: "What is a Layout?",
          answer: "UI that is shared between multiple routes and preserves state.",
          explanation: "Layouts do not re-render on navigation.",
          createdAt: 1000,
          updatedAt: 1000,
        },
        {
          id: "b3",
          type: "code",
          order: 2,
          title: "Root Layout Component",
          language: "typescript",
          code: "export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html><body>{children}</body></html>;\n}",
          explanation: "Required in the app directory.",
          createdAt: 1000,
          updatedAt: 1000,
        },
        {
          id: "b4",
          type: "text",
          order: 3,
          content: "Remember that layout components cannot receive route params directly in parent templates.",
          createdAt: 1000,
          updatedAt: 1000,
        },
      ];

      const markdown = serializeNotebookToMarkdown(blocks);

      // Verify sequence matches exact block ordering
      const text1Pos = markdown.indexOf("## What is the Next.js App Router?");
      const qaPos = markdown.indexOf("### ❓ Q: What is a Layout?");
      const codePos = markdown.indexOf("### 💻 Root Layout Component");
      const text2Pos = markdown.indexOf("Remember that layout components");

      expect(text1Pos).toBeGreaterThanOrEqual(0);
      expect(qaPos).toBeGreaterThan(text1Pos);
      expect(codePos).toBeGreaterThan(qaPos);
      expect(text2Pos).toBeGreaterThan(codePos);

      expect(markdown).toContain("> **Answer:** UI that is shared between multiple routes and preserves state.");
      expect(markdown).toContain("> 💡 **Explanation:** Layouts do not re-render on navigation.");
      expect(markdown).toContain("```typescript");
      expect(markdown).toContain("RootLayout");
    });

    it("reorders blocks predictably and updates order indices without mutating block identities", () => {
      const initialBlocks: LessonNoteBlock[] = [
        createDefaultTextBlock("First Block", 0),
        createDefaultQABlock("Question 2", "Answer 2", undefined, 1),
        createDefaultCodeBlock("console.log(3)", "javascript", "Code 3", undefined, 2),
      ];

      // Move code block (index 2) up to index 1
      const reordered = reorderNotebookBlocks(initialBlocks, 2, 1);
      expect(reordered).toHaveLength(3);
      expect(reordered[0].id).toBe(initialBlocks[0].id);
      expect(reordered[0].order).toBe(0);

      expect(reordered[1].id).toBe(initialBlocks[2].id); // Code block now at index 1
      expect(reordered[1].order).toBe(1);

      expect(reordered[2].id).toBe(initialBlocks[1].id); // QA block now at index 2
      expect(reordered[2].order).toBe(2);

      // Move block 0 down to index 2
      const movedDown = reorderNotebookBlocks(reordered, 0, 2);
      expect(movedDown[0].id).toBe(initialBlocks[2].id);
      expect(movedDown[1].id).toBe(initialBlocks[1].id);
      expect(movedDown[2].id).toBe(initialBlocks[0].id);
      expect(movedDown.map((b) => b.order)).toEqual([0, 1, 2]);
    });

    it("saves and retrieves unified notebook blocks with upsertNote", () => {
      const testBlocks: LessonNoteBlock[] = [
        createDefaultTextBlock("Intro to Docker", 0),
        createDefaultQABlock("What is an image?", "A read-only template.", undefined, 1),
      ];

      const saved = upsertNote({
        trackKey: "system-design",
        lessonSlug: "docker-containers",
        title: "Docker Notes",
        blocks: testBlocks,
        content: "",
      });

      expect(saved.blocks).toHaveLength(2);
      expect(saved.blocks?.[0].type).toBe("text");
      expect(saved.blocks?.[1].type).toBe("qa");
      // Markdown content is automatically serialized from blocks
      expect(saved.content).toContain("Intro to Docker");
      expect(saved.content).toContain("What is an image?");

      // Retrieve from store
      const loaded = getNoteForLesson("system-design", "docker-containers");
      expect(loaded?.blocks).toHaveLength(2);
      expect(loaded?.blocks?.[0].id).toBe(testBlocks[0].id);
      expect(loaded?.blocks?.[1].id).toBe(testBlocks[1].id);
    });
  });

  describe("7. Backward-Compatible Migration to Unified Notebook", () => {
    it("migrates legacy plain text note to a single TextNoteBlock", () => {
      const legacyNote = {
        id: "note-legacy-text",
        trackKey: "javascript",
        lessonSlug: "event-loop",
        content: "Call stack, Web APIs, Task Queue, Microtask Queue.",
        createdAt: 1700000000,
        updatedAt: 1700000000,
      };

      const normalized = normalizeUserNote(legacyNote);
      expect(normalized.blocks).toBeDefined();
      expect(normalized.blocks).toHaveLength(1);
      expect(normalized.blocks![0].type).toBe("text");
      expect((normalized.blocks![0] as any).content).toBe("Call stack, Web APIs, Task Queue, Microtask Queue.");
    });

    it("migrates legacy Q&A note with qaEntries to ordered QABlocks", () => {
      const legacyQANote = {
        id: "note-legacy-qa",
        trackKey: "javascript",
        lessonSlug: "closures",
        noteType: "qa",
        qaEntries: [
          { id: "qa-e1", question: "Q1", answer: "A1" },
          { id: "qa-e2", question: "Q2", answer: "A2", explanation: "Exp2" },
        ],
        createdAt: 1700000000,
        updatedAt: 1700000000,
      };

      const normalized = normalizeUserNote(legacyQANote);
      expect(normalized.blocks).toBeDefined();
      expect(normalized.blocks).toHaveLength(2);
      expect(normalized.blocks![0].type).toBe("qa");
      expect((normalized.blocks![0] as any).question).toBe("Q1");
      expect((normalized.blocks![1] as any).explanation).toBe("Exp2");
      expect(normalized.blocks![0].order).toBe(0);
      expect(normalized.blocks![1].order).toBe(1);
    });

    it("migrates legacy Code note to a CodeBlock", () => {
      const legacyCodeNote = {
        id: "note-legacy-code",
        trackKey: "typescript",
        lessonSlug: "generics",
        noteType: "code",
        codeData: {
          title: "Identity function",
          language: "typescript",
          code: "function id<T>(x: T): T { return x; }",
          explanation: "Returns same type as passed.",
        },
        createdAt: 1700000000,
        updatedAt: 1700000000,
      };

      const normalized = normalizeUserNote(legacyCodeNote);
      expect(normalized.blocks).toBeDefined();
      expect(normalized.blocks).toHaveLength(1);
      expect(normalized.blocks![0].type).toBe("code");
      expect((normalized.blocks![0] as any).title).toBe("Identity function");
      expect((normalized.blocks![0] as any).language).toBe("typescript");
    });

    it("is idempotent: normalizing an already-migrated note produces identical blocks and does not duplicate", () => {
      const existing = {
        id: "note-already-notebook",
        trackKey: "react",
        lessonSlug: "use-state",
        blocks: [
          createDefaultTextBlock("Hook rules", 0),
          createDefaultQABlock("Can hooks be inside loops?", "No.", undefined, 1),
        ],
        createdAt: 1700000000,
        updatedAt: 1700000000,
      };

      const norm1 = normalizeUserNote(existing);
      const norm2 = normalizeUserNote(norm1);

      expect(norm2.blocks).toHaveLength(2);
      expect(norm2.blocks![0].id).toBe(norm1.blocks![0].id);
      expect(norm2.blocks![1].id).toBe(norm1.blocks![1].id);
      expect(norm2.content).toBe(norm1.content);
    });
  });

  describe("8. Single Continuous Document Editor with Inline Q&A and Code Snippets", () => {
    it("allows text, Q&A, and code snippets to coexist in one continuous document note", () => {
      const documentContent =
        "**What is the Next.js App Router?**\n\n" +
        "The App Router is Next.js's file-system-based routing system. It uses folders to define routes and special files to define pages and layouts.\n\n" +
        "**Question:** What is a layout?\n" +
        "**Answer:** A layout is a shared UI that wraps pages and can preserve common elements across navigation.\n\n" +
        "**Example: A basic page component**\n\n" +
        "```tsx\n" +
        "export default function Page() {\n" +
        "  return <h1>Hello, Next.js!</h1>;\n" +
        "}\n" +
        "```";

      const saved = upsertNote({
        trackKey: "nextjs",
        lessonSlug: "nx01-app-router",
        title: "The App Router Architecture",
        content: documentContent,
      });

      expect(saved.content).toBe(documentContent);
      expect(saved.content).toContain("**Question:** What is a layout?");
      expect(saved.content).toContain("**Answer:** A layout is a shared UI");
      expect(saved.content).toContain("```tsx");

      // Verify loaded note maintains exact document order
      const loaded = getNoteForLesson("nextjs", "nx01-app-router");
      expect(loaded?.content).toBe(documentContent);

      const qPos = loaded!.content.indexOf("**Question:** What is a layout?");
      const aPos = loaded!.content.indexOf("**Answer:** A layout is a shared UI");
      const codePos = loaded!.content.indexOf("```tsx");

      expect(qPos).toBeGreaterThanOrEqual(0);
      expect(aPos).toBeGreaterThan(qPos);
      expect(codePos).toBeGreaterThan(aPos);
    });

    it("preserves code content and language formatting across saves", () => {
      const tsCodeNote =
        "## Type Inference\n\n" +
        "TypeScript infers return types automatically:\n\n" +
        "```typescript\n" +
        "function add(a: number, b: number) {\n" +
        "  return a + b;\n" +
        "}\n" +
        "```\n\n" +
        "> 💡 **Key Insight:** Avoid redundant type annotations when inference is obvious.";

      const saved = upsertNote({
        trackKey: "typescript",
        lessonSlug: "type-inference",
        content: tsCodeNote,
      });

      expect(saved.content).toContain("```typescript");
      expect(saved.content).toContain("function add(a: number, b: number)");
      expect(saved.content).toContain("> 💡 **Key Insight:**");
    });
  });
});
