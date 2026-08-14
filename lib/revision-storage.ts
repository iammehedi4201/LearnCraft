/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REVISION STORAGE & PERSISTENCE ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles high-reliability storage, multi-tab sync, querying, filtering,
 * importing, and exporting of user highlights and personal notes.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { AnnotationItem, RevisionStats } from "@/types/revision";

const STORAGE_KEY = "learncraft_revisions_v1";
const REVISION_EVENT_NAME = "learncraft:revision-sync";

// Default initial seed data to give users an immediate delightful experience
// if they haven't highlighted anything yet!
const INITIAL_SAMPLE_ANNOTATIONS: AnnotationItem[] = [
  {
    id: "sample_rev_01",
    userId: "user_default",
    topicId: "nestjs",
    topicTitle: "NestJS",
    lessonId: "nj02-oop-foundations",
    lessonTitle: "OOP Foundations",
    lessonPath: "/learn/nestjs/nj02-oop-foundations",
    sectionId: "part5",
    selectedText: "Encapsulation is the concept of bundling data and methods together inside a class while restricting direct access to internal state.",
    contextBefore: "Let's explore the core pillars.",
    contextAfter: "This prevents accidental corruption.",
    question: "What is Encapsulation in Object-Oriented Programming?",
    note: "Encapsulation = Private fields (# or private) + controlled getter/setter methods.",
    color: "feature",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    isFavorite: true,
    mastered: false,
  },
  {
    id: "sample_rev_02",
    userId: "user_default",
    topicId: "tanstack",
    topicTitle: "TanStack Query",
    lessonId: "tq04-staletime-gctime",
    lessonTitle: "staleTime vs gcTime Deep Dive",
    lessonPath: "/learn/tanstack/tq04-staletime-gctime",
    sectionId: "part2",
    selectedText: "staleTime defines how long data is considered fresh before a background refetch is triggered. gcTime defines how long inactive cached data remains in memory.",
    contextBefore: "Key cache lifecycle rule:",
    contextAfter: "Default staleTime is 0ms, gcTime is 5 minutes.",
    question: "What is the key difference between staleTime and gcTime in TanStack Query?",
    note: "staleTime = when to refetch. gcTime = garbage collection timer after unmount.",
    color: "info",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    isFavorite: true,
    mastered: false,
  },
  {
    id: "sample_rev_03",
    userId: "user_default",
    topicId: "nextjs",
    topicTitle: "Next.js",
    lessonId: "nx03-server-client",
    lessonTitle: "Server vs Client Components",
    lessonPath: "/learn/nextjs/nx03-server-client",
    sectionId: "part1",
    selectedText: "React Server Components run only on the server, have direct database access, zero bundle size overhead, and cannot use useState or browser APIs.",
    contextBefore: "Understanding the boundary:",
    contextAfter: "Add 'use client' at the top when interactivity is needed.",
    question: "What are the primary characteristics and limitations of React Server Components?",
    note: "Default is Server Component. Only use 'use client' for hooks, event listeners, and browser APIs.",
    color: "feature",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    isFavorite: false,
    mastered: true,
  },
  {
    id: "sample_rev_04",
    userId: "user_default",
    topicId: "typescript",
    topicTitle: "TypeScript",
    lessonId: "nj01-typescript-essentials",
    lessonTitle: "TypeScript Essentials",
    lessonPath: "/learn/nestjs/nj01-typescript-essentials",
    sectionId: "part3",
    selectedText: "Generics allow writing flexible, reusable code that works with multiple types while maintaining complete type safety without resorting to any.",
    question: "Why and when should you use Generics in TypeScript?",
    note: "Think of Generics <T> as passing type arguments into a function definition.",
    color: "away",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    isFavorite: true,
    mastered: false,
  },
];

/**
 * Dispatch cross-component and cross-tab update event
 */
function notifyUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(REVISION_EVENT_NAME));
}

/**
 * Read all stored annotations
 */
export function getAllAnnotations(): AnnotationItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial samples on first launch
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ANNOTATIONS));
      return INITIAL_SAMPLE_ANNOTATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[RevisionStorage] Failed to read revisions from localStorage:", err);
    return [];
  }
}

/**
 * Save array of annotations to localStorage
 */
function saveAllAnnotations(items: AnnotationItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    notifyUpdate();
  } catch (err) {
    console.error("[RevisionStorage] Failed to save revisions to localStorage:", err);
  }
}

/**
 * Add a new highlight or note
 */
export function addAnnotation(
  data: Omit<AnnotationItem, "id" | "createdAt" | "updatedAt">
): AnnotationItem {
  const now = new Date().toISOString();
  const newItem: AnnotationItem = {
    ...data,
    id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    createdAt: now,
    updatedAt: now,
    isFavorite: data.isFavorite ?? false,
    mastered: data.mastered ?? false,
  };

  const current = getAllAnnotations();
  const updated = [newItem, ...current];
  saveAllAnnotations(updated);
  return newItem;
}

/**
 * Update an existing annotation
 */
export function updateAnnotation(
  id: string,
  updates: Partial<AnnotationItem>
): AnnotationItem | null {
  const current = getAllAnnotations();
  let found: AnnotationItem | null = null;

  const updated = current.map((item) => {
    if (item.id === id) {
      found = {
        ...item,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return found;
    }
    return item;
  });

  if (found) {
    saveAllAnnotations(updated);
  }
  return found;
}

/**
 * Delete an annotation by ID
 */
export function deleteAnnotation(id: string): boolean {
  const current = getAllAnnotations();
  const filtered = current.filter((item) => item.id !== id);
  if (filtered.length !== current.length) {
    saveAllAnnotations(filtered);
    return true;
  }
  return false;
}

/**
 * Get annotations matching a specific lesson path
 */
export function getAnnotationsForLesson(lessonPath: string): AnnotationItem[] {
  const cleanPath = lessonPath.split("?")[0].split("#")[0].replace(/\/+$/, "");
  const all = getAllAnnotations();
  return all.filter((item) => {
    const itemCleanPath = item.lessonPath.split("?")[0].split("#")[0].replace(/\/+$/, "");
    return itemCleanPath === cleanPath;
  });
}

/**
 * Get single annotation by ID
 */
export function getAnnotationById(id: string): AnnotationItem | null {
  const all = getAllAnnotations();
  return all.find((item) => item.id === id) || null;
}

/**
 * Compute revision statistics for dashboard and progress badges
 */
export function computeRevisionStats(items: AnnotationItem[]): RevisionStats {
  const topicBreakdown: Record<string, { topicTitle: string; count: number; notesCount: number }> = {};
  let notesCount = 0;
  let highlightsCount = 0;

  items.forEach((item) => {
    const hasNote = Boolean(
      (item.note && item.note.trim().length > 0) ||
      (item.question && item.question.trim().length > 0)
    );
    if (hasNote) {
      notesCount++;
    } else {
      highlightsCount++;
    }

    if (!topicBreakdown[item.topicId]) {
      topicBreakdown[item.topicId] = {
        topicTitle: item.topicTitle,
        count: 0,
        notesCount: 0,
      };
    }
    topicBreakdown[item.topicId].count++;
    if (hasNote) {
      topicBreakdown[item.topicId].notesCount++;
    }
  });

  return {
    total: items.length,
    highlightsCount,
    notesCount,
    topicsCount: Object.keys(topicBreakdown).length,
    topicBreakdown,
  };
}

/**
 * Export annotations as downloadable JSON string
 */
export function exportAnnotationsAsJson(): string {
  const all = getAllAnnotations();
  return JSON.stringify(
    {
      version: "1.0.0",
      app: "LearnCraft",
      exportedAt: new Date().toISOString(),
      annotations: all,
    },
    null,
    2
  );
}

/**
 * Export annotations formatted as clean Markdown revision cheatsheet
 */
export function exportAnnotationsAsMarkdown(): string {
  const all = getAllAnnotations();
  const stats = computeRevisionStats(all);

  let md = `# LearnCraft — Quick Revision Notes\n\n`;
  md += `*Generated on ${new Date().toLocaleDateString()} | Total Saved: ${stats.total} (${stats.notesCount} notes, ${stats.highlightsCount} highlights)*\n\n---\n\n`;

  // Group by topic
  const grouped: Record<string, AnnotationItem[]> = {};
  all.forEach((item) => {
    if (!grouped[item.topicTitle]) grouped[item.topicTitle] = [];
    grouped[item.topicTitle].push(item);
  });

  Object.entries(grouped).forEach(([topicTitle, items]) => {
    md += `## ${topicTitle}\n\n`;
    items.forEach((item, idx) => {
      md += `### ${idx + 1}. ${item.lessonTitle}\n`;
      md += `> "${item.selectedText}"\n\n`;
      if (item.note && item.note.trim()) {
        md += `**💡 Note:** ${item.note}\n\n`;
      }
      md += `*Lesson: [${item.lessonTitle}](${item.lessonPath})*\n\n`;
    });
    md += `---\n\n`;
  });

  return md;
}

/**
 * Import annotations from JSON string
 */
export function importAnnotationsFromJson(jsonStr: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    const itemsToImport: AnnotationItem[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.annotations)
      ? parsed.annotations
      : [];

    if (!itemsToImport.length) {
      return { success: false, count: 0, error: "No valid annotations found in import data." };
    }

    const current = getAllAnnotations();
    const currentIds = new Set(current.map((i) => i.id));

    // Deduplicate and merge
    const newItems = itemsToImport.filter((item) => !currentIds.has(item.id));
    const merged = [...newItems, ...current];
    saveAllAnnotations(merged);

    return { success: true, count: newItems.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || "Invalid JSON format" };
  }
}

/**
 * Clear all annotations (with option to restore defaults)
 */
export function clearAllAnnotations(restoreDefaults = false): void {
  if (typeof window === "undefined") return;
  if (restoreDefaults) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ANNOTATIONS));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  notifyUpdate();
}

export { REVISION_EVENT_NAME };
