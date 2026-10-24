/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REACT.JS LESSON CONTENT AGGREGATION LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Cleanly aggregates and exports all 27 authoritative React lessons
 * across all 9 curriculum stages (REACT-01 through REACT-27).
 *
 * Built directly from LearnCraft React Curriculum specifications:
 * - Simple, clear explanations
 * - Syntax-highlighted practical examples
 * - Step-by-step walkthroughs for difficult concepts
 * - Real-world scenario questions with simple model answers
 * - Targeted interview questions on essential topics
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { ALL_REACT_LESSONS } from "../content";

export const REACT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
  { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
];

export const REACT_LESSONS_CONTENT: Record<string, StandardLessonContent> = ALL_REACT_LESSONS;

/**
 * Get lesson content by slug, code, or alias with safe fallback.
 */
export function getReactLessonContent(slug: string): StandardLessonContent {
  const normalized = slug.toLowerCase().trim();
  if (REACT_LESSONS_CONTENT[normalized]) {
    return REACT_LESSONS_CONTENT[normalized];
  }
  const byCode = Object.values(REACT_LESSONS_CONTENT).find(
    (l) => l.code?.toLowerCase() === normalized || l.slug?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  // Fallback if slug not found directly
  return Object.values(REACT_LESSONS_CONTENT)[0];
}
