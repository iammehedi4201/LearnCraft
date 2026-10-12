"use client";

import Link from "next/link";
import { Award, ArrowRight, CheckCircle2, Sparkles } from "./icons";
import { StageMeta, LessonMeta } from "../data/nestjs-curriculum";

interface MilestoneCelebrationProps {
  stage: StageMeta;
  nextLesson?: LessonMeta | null;
  onDismiss?: () => void;
}

export function MilestoneCelebration({
  stage,
  nextLesson,
  onDismiss,
}: MilestoneCelebrationProps) {
  return (
    <div className="my-8 rounded-3xl bg-ds-bg-white p-6 md:p-8 shadow-lg relative overflow-hidden border border-ds-stroke-soft">
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-ds-success-lighter text-ds-success-dark flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-ds-success-dark uppercase tracking-wider">
                Stage {stage.stageNumber} Milestone Achieved
              </span>
              <Sparkles className="w-3.5 h-3.5 text-ds-success-base" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-ds-text-strong tracking-tight">
              {stage.name} Completed
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-ds-success-base shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-ds-text-strong">
                {stage.milestone}
              </p>
              <p className="text-xs text-ds-text-sub mt-1">
                You&apos;ve mastered all {stage.lessons.length} core competencies in this stage.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {nextLesson ? (
            <div className="text-xs text-ds-text-sub">
              <span>Up next: </span>
              <span className="font-bold text-ds-text-strong">{nextLesson.name}</span>
              <span className="text-ds-text-soft"> ({nextLesson.estimatedMinutes} min)</span>
            </div>
          ) : (
            <span className="text-xs font-bold text-ds-success-dark">Path completed!</span>
          )}

          <div className="flex items-center gap-3">
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="px-4 py-2 text-xs font-semibold text-ds-text-sub hover:text-ds-text-strong transition-colors"
              >
                Dismiss
              </button>
            )}

            {nextLesson ? (
              <Link
                href={nextLesson.path}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs transition-all shadow-md shadow-ds-feature-base/10"
              >
                <span>Continue to {nextLesson.code}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/learn/nestjs"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong font-bold text-xs border border-ds-stroke-soft transition-all"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
