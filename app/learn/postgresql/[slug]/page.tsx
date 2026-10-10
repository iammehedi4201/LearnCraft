"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * POSTGRESQL DYNAMIC LESSON PAGE
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
} from "../data/postgresql-curriculum";
import { getPostgresqlLessonContent } from "../data/postgresql-lesson-content";
import { markLessonComplete, isLessonComplete } from "../data/progress-store";

export default function PostgresqlLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "pg01-what-is-postgresql";

  const lesson = getLessonBySlug(slug) || getAllLessons()[0];
  const content = getPostgresqlLessonContent(slug);
  const phase = getStageByLessonSlug(lesson.slug);
  const prevLesson = getPrevLesson(lesson.slug);
  const nextLesson = getNextLesson(lesson.slug);

  return (
    <DataDrivenLessonView
      trackKey="postgresql"
      trackTitle="PostgreSQL"
      trackHref="/learn/postgresql"
      lesson={{
        slug: lesson.slug,
        code: lesson.code,
        title: lesson.name,
        subtitle: lesson.desc,
        minutes: lesson.estimatedMinutes,
      }}
      content={content as any}
      stageName={phase?.name}
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
      playgroundRuntime="sql"
    />
  );
}
