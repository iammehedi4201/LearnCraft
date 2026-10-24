/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NESTJS LESSON CONTENT AGGREGATION LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates and exports all 20 authoritative NestJS lessons
 * across all 5 curriculum stages (NJ-01 through NJ-20).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { ALL_NESTJS_LESSONS } from "../content";

export const NESTJS_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

export const NESTJS_LESSONS_CONTENT: Record<string, StandardLessonContent> = ALL_NESTJS_LESSONS;

export function getNestjsLessonContent(slug: string): StandardLessonContent {
  if (!slug) return Object.values(NESTJS_LESSONS_CONTENT)[0];
  const normalized = slug.toLowerCase().trim();
  if (NESTJS_LESSONS_CONTENT[normalized]) {
    return NESTJS_LESSONS_CONTENT[normalized];
  }
  const byCode = Object.values(NESTJS_LESSONS_CONTENT).find(
    (l) => l.code?.toLowerCase() === normalized || l.slug?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  return Object.values(NESTJS_LESSONS_CONTENT)[0];
}
