"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordLessonStart, fetchProgressFromDB } from "../data/progress-store";

/**
 * NestJSProgressTracker
 * - Automatically fetches user progress from PostgreSQL on mount.
 * - Detects active lesson path (e.g. /learn/nestjs/nj01-typescript-essentials).
 * - Saves lesson start (completed: false) directly to Neon PostgreSQL.
 */
export function NestJSProgressTracker({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Hydrate progress state directly from PostgreSQL database
    fetchProgressFromDB().catch(() => {});
  }, []);

  useEffect(() => {
    if (!pathname) return;

    // Detect lesson navigation: e.g. /learn/nestjs/nj01-typescript-essentials
    const match = pathname.match(/\/learn\/nestjs\/(nj\d+-[a-z0-9-]+)/i);
    if (match && match[1]) {
      const lessonSlug = match[1];
      // Save to Neon PostgreSQL: user has started this lesson
      recordLessonStart(lessonSlug);
    }
  }, [pathname]);

  return <>{children}</>;
}
