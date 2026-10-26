/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NODE.JS LESSON CONTENT AGGREGATION LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates and exports all 20 authoritative Node.js lessons
 * across all 6 curriculum stages (NODE-01 through NODE-20).
 *
 * Implements the full LearnCraft-NodeJS-Content-Concept-and-Scenarios specification:
 * - Simple, clear explanations
 * - Syntax-highlighted practical examples
 * - Step-by-step walkthroughs for difficult concepts
 * - Real-world scenario questions with simple model answers
 * - Targeted interview questions on essential topics
 * - Pure Node.js runtime focus (no external frameworks/databases/Docker)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { ALL_NODEJS_LESSONS } from "../content";

// Re-export types for backward compatibility
export type NodejsLessonContent = StandardLessonContent;
export type NodejsLessonSection = LessonSectionItem;

export const NODEJS_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

export const NODEJS_LESSONS_CONTENT: Record<string, StandardLessonContent> = ALL_NODEJS_LESSONS;

/**
 * Get lesson content by slug, code, or alias with safe fallback.
 */
export function getNodejsLessonContent(slug: string): StandardLessonContent {
  if (!slug) return Object.values(NODEJS_LESSONS_CONTENT)[0];
  const normalized = slug.toLowerCase().trim();

  if (NODEJS_LESSONS_CONTENT[normalized]) {
    return NODEJS_LESSONS_CONTENT[normalized];
  }

  // Lookup by code or slug case-insensitively
  const byCodeOrSlug = Object.values(NODEJS_LESSONS_CONTENT).find(
    (l) =>
      l.code?.toLowerCase() === normalized ||
      l.slug?.toLowerCase() === normalized ||
      l.code?.toLowerCase().replace("-", "") === normalized
  );
  if (byCodeOrSlug) return byCodeOrSlug;

  // Safe fallback to first lesson
  return Object.values(NODEJS_LESSONS_CONTENT)[0];
}
