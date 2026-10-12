"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TYPESCRIPT DYNAMIC LESSON PAGE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Powered by LearnCraft's Unified Data-Driven Lesson View Engine.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useParams } from "next/navigation";
import { DataDrivenLessonView } from "@/components/curriculum";
import {
  getLessonBySlug,
  getStageByLessonSlug,
  getAllLessons,
  getNextLesson,
  getPrevLesson,
} from "../data/typescript-curriculum";
import { getTypeScriptLessonContent } from "../data/typescript-lesson-content";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export default function TypeScriptLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "ts01-mental-model";

  const lesson = getLessonBySlug(slug) || getAllLessons()[0];
  const content = getTypeScriptLessonContent(slug);
  const stage = getStageByLessonSlug(lesson.slug);
  const prevLesson = getPrevLesson(lesson.slug);
  const nextLesson = getNextLesson(lesson.slug);

  return (
    <DataDrivenLessonView
      trackKey="typescript"
      trackTitle="TypeScript"
      trackHref="/learn/typescript"
      lesson={{
        slug: lesson.slug,
        code: lesson.code,
        title: lesson.name,
        subtitle: lesson.desc,
        minutes: lesson.estimatedMinutes,
      }}
      content={content as any}
      stageName={stage?.name}
      prevLesson={
        prevLesson
          ? {
              slug: prevLesson.slug,
              code: prevLesson.code,
              title: prevLesson.name,
            }
          : null
      }
      nextLesson={
        nextLesson
          ? {
              slug: nextLesson.slug,
              code: nextLesson.code,
              title: nextLesson.name,
            }
          : null
      }
      onLessonComplete={() => markLessonComplete(lesson.slug)}
      isInitiallyComplete={isLessonComplete(lesson.slug)}
      playgroundRuntime="typescript"
    />
  );
}
