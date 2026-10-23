"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS DYNAMIC LESSON PAGE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Powered by LearnCraft's Unified Data-Driven Lesson View Engine.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useParams } from "next/navigation";
import { DataDrivenLessonView } from "@/components/curriculum";
import {
  getNextjsLessonBySlug,
  getNextjsStageByLessonSlug,
  getAllNextjsLessons,
  getNextNextjsLesson,
  getPrevNextjsLesson,
} from "../data/nextjs-curriculum";
import { getNextjsLessonContent } from "../data/nextjs-lesson-content";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export default function NextjsLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "nx01-what-is-nextjs";

  const lesson = getNextjsLessonBySlug(slug) || getAllNextjsLessons()[0];
  const content = getNextjsLessonContent(slug);
  const stage = getNextjsStageByLessonSlug(lesson.slug);
  const prevLesson = getPrevNextjsLesson(lesson.slug);
  const nextLesson = getNextNextjsLesson(lesson.slug);

  return (
    <DataDrivenLessonView
      trackKey="nextjs"
      trackTitle="Next.js"
      trackHref="/learn/nextjs"
      lesson={{
        slug: lesson.slug,
        code: lesson.code,
        title: lesson.name,
        subtitle: lesson.desc,
        minutes: lesson.estimatedMinutes,
        difficulty: lesson.difficulty,
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
