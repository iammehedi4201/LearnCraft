/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT LESSON CONTENT AGGREGATION LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Cleanly aggregates and exports all 18 authoritative TypeScript lessons
 * across all 4 curriculum stages (TS-01 through TS-18).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { ALL_TYPESCRIPT_LESSONS } from "../content";

export const TYPESCRIPT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

export const TYPESCRIPT_LESSONS_CONTENT: Record<string, StandardLessonContent> = ALL_TYPESCRIPT_LESSONS;

export function getTypeScriptLessonContent(slug: string): StandardLessonContent {
  const normalized = slug.toLowerCase().trim();
  if (TYPESCRIPT_LESSONS_CONTENT[normalized]) {
    return TYPESCRIPT_LESSONS_CONTENT[normalized];
  }
  const byCode = Object.values(TYPESCRIPT_LESSONS_CONTENT).find(
    (l) => l.code?.toLowerCase() === normalized || l.slug?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  return Object.values(TYPESCRIPT_LESSONS_CONTENT)[0];
}
