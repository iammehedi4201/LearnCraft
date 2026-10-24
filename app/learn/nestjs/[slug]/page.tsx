"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NESTJS DYNAMIC LESSON PAGE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Powered by LearnCraft's Unified Data-Driven Lesson View Engine.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useParams } from "next/navigation";
import { DataDrivenLessonView } from "@/components/curriculum";
import {
  getNestjsLessonBySlug,
  getNestjsStageByLessonSlug,
  getAllNestjsLessons,
  getNextNestjsLesson,
  getPrevNestjsLesson,
} from "../data/nestjs-curriculum";
import { getNestjsLessonContent } from "../data/nestjs-lesson-content";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export default function NestjsLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "nj01-what-is-nestjs";

  const lesson = getNestjsLessonBySlug(slug) || getAllNestjsLessons()[0];
  const content = getNestjsLessonContent(slug);
  const stage = getNestjsStageByLessonSlug(lesson.slug);
  const prevLesson = getPrevNestjsLesson(lesson.slug);
  const nextLesson = getNextNestjsLesson(lesson.slug);

  return (
    <DataDrivenLessonView
      trackKey="nestjs"
      trackTitle="NestJS"
      trackHref="/learn/nestjs"
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
