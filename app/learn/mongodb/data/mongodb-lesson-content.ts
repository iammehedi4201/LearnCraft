/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MONGODB LESSONS CONTENT REPOSITORY — AUTHORITATIVE IMPLEMENTATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates all 20 official MongoDB lessons mapped directly from
 * the curriculum specification (MDB-01 through MDB-20).
 *
 * Provides backward compatibility lookups for legacy slugs (MDB-01 through MDB-26).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import {
  ALL_MONGODB_LESSONS,
  MONGODB_LESSONS_BY_SLUG,
  getMongodbLessonBySlug,
  MONGODB_LEGACY_SLUG_MAP,
} from "../content";

export type MongodbLessonSection = StandardLessonContent["sections"][number];
export type MongodbLessonContent = StandardLessonContent;

export const MONGODB_SECTIONS = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

/**
 * Dictionary of all 20 MongoDB lesson contents keyed by slug.
 */
export const MONGODB_LESSONS_CONTENT: Record<string, StandardLessonContent> = {
  ...MONGODB_LESSONS_BY_SLUG,
};

/**
 * Retrieves the StandardLessonContent for a MongoDB lesson by slug, code, or legacy alias.
 */
export function getMongodbLessonContent(slugOrCode: string): StandardLessonContent {
  const match = getMongodbLessonBySlug(slugOrCode);
  if (match) return match;

  // Fallback to first lesson if not found
  return ALL_MONGODB_LESSONS[0];
}

export { ALL_MONGODB_LESSONS, MONGODB_LEGACY_SLUG_MAP };
