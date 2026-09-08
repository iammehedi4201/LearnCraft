"use client";

/**
 * SkillRoadmapView — Main renderer for individual skill roadmaps.
 * Shows a hero header with progress, followed by collapsible stages with lesson nodes.
 */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StageSection } from "./StageSection";
import { NodeStatus } from "./RoadmapNode";
import type { SkillRoadmap } from "@/lib/roadmap-data";
import { TechIcon } from "@/components/roadmap/TechIcon";

interface SkillRoadmapViewProps {
  skill: SkillRoadmap;
}

/** NestJS progress helpers — only imported dynamically for nestjs skill */
function getNestJSProgressHelpers() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const store = require("@/app/learn/nestjs/data/progress-store");
    return {
      isComplete: (slugOrCode: string) => store.isLessonComplete(slugOrCode) as boolean,
      getOverall: () => store.getOverallProgress() as { completedCount: number; totalCount: number; percent: number },
      getNext: () => store.getNextRecommendedLesson() as { name: string; path: string; code: string } | null,
    };
  } catch {
    return null;
  }
}

export function SkillRoadmapView({ skill }: SkillRoadmapViewProps) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());
  const [overallProgress, setOverallProgress] = useState({ completedCount: 0, totalCount: skill.totalLessons, percent: 0 });
  const [nextLesson, setNextLesson] = useState<{ name: string; path: string; code: string } | null>(null);
  const [firstIncompleteStage, setFirstIncompleteStage] = useState<number>(0);

  // Load progress from store (NestJS only for now)
  useEffect(() => {
    if (skill.slug === "nestjs") {
      const helpers = getNestJSProgressHelpers();
      if (helpers) {
        const allLessons = skill.stages.flatMap((s) => s.lessons);
        const completed = new Set<string>();
        allLessons.forEach((l) => {
          if (helpers.isComplete(l.slug) || helpers.isComplete(l.code)) {
            completed.add(l.slug);
          }
        });
        setCompletedSlugs(completed);
        setOverallProgress(helpers.getOverall());
        setNextLesson(helpers.getNext());
      }
    }

    // Find first stage with incomplete lessons
    let foundFirst = false;
    for (let i = 0; i < skill.stages.length; i++) {
      const stage = skill.stages[i];
      const stageComplete = stage.lessons.every((l) => completedSlugs.has(l.slug));
      if (!stageComplete && !foundFirst) {
        setFirstIncompleteStage(i);
        foundFirst = true;
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill.slug]);

  // Listen for progress updates (NestJS fires custom events)
  useEffect(() => {
    const handleUpdate = () => {
      if (skill.slug === "nestjs") {
        const helpers = getNestJSProgressHelpers();
        if (helpers) {
          const allLessons = skill.stages.flatMap((s) => s.lessons);
          const completed = new Set<string>();
          allLessons.forEach((l) => {
            if (helpers.isComplete(l.slug) || helpers.isComplete(l.code)) {
              completed.add(l.slug);
            }
          });
          setCompletedSlugs(completed);
          setOverallProgress(helpers.getOverall());
          setNextLesson(helpers.getNext());
        }
      }
    };

    window.addEventListener("learncraft-progress-updated", handleUpdate);
    return () => window.removeEventListener("learncraft-progress-updated", handleUpdate);
  }, [skill.slug, skill.stages]);

  const getLessonStatus = useCallback(
    (slug: string, code: string): NodeStatus => {
      if (completedSlugs.has(slug)) return "completed";
      if (nextLesson && (nextLesson.code === code || nextLesson.path.includes(slug))) return "current";
      return "not-started";
    },
    [completedSlugs, nextLesson]
  );

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm relative overflow-hidden">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${skill.badgeColor}`}>
              <TechIcon slug={skill.slug} className="w-4 h-4" />
              <span>{skill.title} Roadmap</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ds-text-soft">
              {skill.totalLessons} Lessons • {skill.stages.length} Stages
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight">
            Learn {skill.title}
          </h1>
          <p className="text-base sm:text-lg text-ds-text-sub mt-2 max-w-2xl">
            {skill.description}
          </p>

          {/* Progress bar */}
          {overallProgress.totalCount > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 max-w-xs h-2 bg-ds-bg-soft rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-ds-feature-base transition-all duration-700"
                  style={{ width: `${overallProgress.percent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-ds-text-sub">
                {overallProgress.completedCount} of {overallProgress.totalCount} completed
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-3 mt-6">
            {nextLesson ? (
              <Link
                href={nextLesson.path}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-ds-feature-base/10 active:scale-95"
              >
                <span>
                  {overallProgress.completedCount > 0
                    ? `Continue: ${nextLesson.name}`
                    : `Start: ${nextLesson.name}`}
                </span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            ) : (
              <Link
                href={skill.stages[0]?.lessons[0]?.path || skill.learnPath}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-ds-feature-base/10 active:scale-95"
              >
                <span>Start Learning</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}

            <Link
              href={skill.learnPath}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-ds-stroke-soft bg-ds-bg-white hover:bg-ds-bg-weak text-ds-text-sub hover:text-ds-text-strong font-bold text-xs sm:text-sm transition-all"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Stage Sections */}
      <div className="space-y-6">
        {skill.stages.map((stage, idx) => (
          <StageSection
            key={stage.id}
            stageNumber={stage.stageNumber}
            name={stage.name}
            subtitle={stage.subtitle}
            description={stage.description}
            lessons={stage.lessons}
            getLessonStatus={getLessonStatus}
            defaultExpanded={idx === firstIncompleteStage}
            isLast={idx === skill.stages.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
