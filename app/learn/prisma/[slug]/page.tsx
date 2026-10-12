"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PRISMA ORM DYNAMIC LESSON PAGE
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
} from "../data/prisma-curriculum";
import { getPrismaLessonContent } from "../data/prisma-lesson-content";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export default function PrismaLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "pri01-what-is-prisma";

  const lesson = getLessonBySlug(slug) || getAllLessons()[0];
  const content = getPrismaLessonContent(slug);
  const stage = getStageByLessonSlug(lesson.slug);
  const prevLesson = getPrevLesson(lesson.slug);
  const nextLesson = getNextLesson(lesson.slug);

  return (
    <DataDrivenLessonView
      trackKey="prisma"
      trackTitle="Prisma ORM"
      trackHref="/learn/prisma"
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
