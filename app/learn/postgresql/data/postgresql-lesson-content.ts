/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * POSTGRESQL LESSONS CONTENT REPOSITORY — AUTHORITATIVE IMPLEMENTATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates all 22 official PostgreSQL lessons mapped directly from
 * the curriculum specification (PG-01 through PG-22).
 *
 * Provides backward compatibility lookups for legacy slugs (PG-01 through PG-29).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import {
  ALL_POSTGRESQL_LESSONS,
  POSTGRESQL_LESSONS_BY_SLUG,
  getPostgresqlLessonBySlug,
} from "../content";

export { POSTGRESQL_LEGACY_SLUG_MAP } from "../content";

export type PostgresqlLessonSection = StandardLessonContent["sections"][number];
export type PostgresqlLessonContent = StandardLessonContent;

export const POSTGRESQL_SECTIONS = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

/**
 * Dictionary of all 22 PostgreSQL lesson contents keyed by slug.
 */
export const POSTGRESQL_LESSONS_CONTENT: Record<string, StandardLessonContent> = {
  ...POSTGRESQL_LESSONS_BY_SLUG,
};

/**
 * Retrieves the StandardLessonContent for a PostgreSQL lesson by slug, code, or legacy alias.
 */
export function getPostgresqlLessonContent(slugOrCode: string): StandardLessonContent {
  const match = getPostgresqlLessonBySlug(slugOrCode);
  if (match) return match;

  // Fallback to first lesson if not found
  return ALL_POSTGRESQL_LESSONS[0];
}
