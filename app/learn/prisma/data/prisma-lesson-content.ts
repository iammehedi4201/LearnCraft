/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PRISMA LESSONS CONTENT REPOSITORY — AUTHORITATIVE IMPLEMENTATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates all 20 official Prisma ORM lessons mapped directly from
 * the curriculum specification (PRI-01 through PRI-20).
 *
 * Provides backward compatibility lookups for legacy slugs (PRI-01 through PRI-27).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import {
  ALL_PRISMA_LESSONS,
  PRISMA_LESSONS_BY_SLUG,
  getPrismaLessonBySlug,
} from "../content";

export { PRISMA_LEGACY_SLUG_MAP } from "../content";

export type PrismaLessonSection = StandardLessonContent["sections"][number];
export type PrismaLessonContent = StandardLessonContent;

export const PRISMA_SECTIONS = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

/**
 * Dictionary of all 20 Prisma lesson contents keyed by slug.
 */
export const PRISMA_LESSONS_CONTENT: Record<string, StandardLessonContent> = {
  ...PRISMA_LESSONS_BY_SLUG,
};

/**
 * Retrieves the StandardLessonContent for a Prisma lesson by slug, code, or legacy alias.
 */
export function getPrismaLessonContent(slugOrCode: string): StandardLessonContent {
  const match = getPrismaLessonBySlug(slugOrCode);
  if (match) return match;

  // Fallback to first lesson if not found
  return ALL_PRISMA_LESSONS[0];
}
