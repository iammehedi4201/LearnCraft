/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXPRESS.JS LESSONS CONTENT REPOSITORY — AUTHORITATIVE IMPLEMENTATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates all 22 official Express.js lessons mapped directly from
 * the curriculum specification (EXP-01 through EXP-22).
 *
 * Provides backward compatibility lookups for legacy slugs (EXP-01 through EXP-28).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import {
  ALL_EXPRESS_LESSONS,
  EXPRESS_LESSONS_BY_SLUG,
  getExpressLessonBySlug,
  EXPRESS_LEGACY_SLUG_MAP,
} from "../content";

export type ExpressLessonSection = StandardLessonContent["sections"][number];
export type ExpressLessonContent = StandardLessonContent;

export const EXPRESS_SECTIONS = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

/**
 * Dictionary of all 22 Express lesson contents keyed by slug.
 */
export const EXPRESS_LESSONS_CONTENT: Record<string, StandardLessonContent> = {
  ...EXPRESS_LESSONS_BY_SLUG,
};

/**
 * Retrieves the StandardLessonContent for an Express lesson by slug, code, or legacy alias.
 */
export function getExpressLessonContent(slugOrCode: string): StandardLessonContent {
  const match = getExpressLessonBySlug(slugOrCode);
  if (match) return match;

  // Fallback to first lesson if not found
  return ALL_EXPRESS_LESSONS[0];
}

export { ALL_EXPRESS_LESSONS, EXPRESS_LEGACY_SLUG_MAP };
