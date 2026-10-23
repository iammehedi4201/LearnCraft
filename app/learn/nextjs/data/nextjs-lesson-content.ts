/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS LESSON CONTENT AGGREGATION LAYER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Aggregates and exports all 20 authoritative Next.js App Router lessons
 * across all 5 curriculum stages (NX-01 through NX-20).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent, LessonSectionItem } from "@/components/curriculum/lesson-content-types";
import { ALL_NEXTJS_LESSONS } from "../content";

export const NEXTJS_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
  { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
  { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
  { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
  { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
];

export const NEXTJS_LESSONS_CONTENT: Record<string, StandardLessonContent> = ALL_NEXTJS_LESSONS;

export function getNextjsLessonContent(slug: string): StandardLessonContent {
  const normalized = slug.toLowerCase().trim();
  if (NEXTJS_LESSONS_CONTENT[normalized]) {
    return NEXTJS_LESSONS_CONTENT[normalized];
  }
  const byCode = Object.values(NEXTJS_LESSONS_CONTENT).find(
    (l) => l.code?.toLowerCase() === normalized || l.slug?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  return Object.values(NEXTJS_LESSONS_CONTENT)[0];
}
