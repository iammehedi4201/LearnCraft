"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
} from "./icons";
import {
  PRISMA_PROGRESSION_PHASES,
  getLessonsByPhaseId,
} from "../data/prisma-curriculum";
import {
  isLessonComplete,
  getActiveLesson,
  toggleLessonComplete,
} from "../data/progress-store";

interface JourneyViewProps {
  phaseId: string;
  onSelectPhase?: (phaseId: string) => void;
}

export function JourneyView({
  phaseId,
  onSelectPhase: _onSelectPhase,
}: JourneyViewProps) {
  const phase =
    PRISMA_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    PRISMA_PROGRESSION_PHASES[0];

  const lessons = getLessonsByPhaseId(phase.id);
  const activeLesson = getActiveLesson();

  const completedCount = lessons.filter(
    (l) => isLessonComplete(l.slug) || isLessonComplete(l.code)
  ).length;
  const isPhaseAllDone = completedCount === lessons.length && lessons.length > 0;

  return (
    <div className="space-y-5">
      {/* Unified Phase Context Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-lg">
              Phase {phase.phaseNumber.toString().padStart(2, "0")} of 10
            </span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-xs font-mono text-slate-400 font-medium">
              {phase.scope}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {phase.label}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
            {phase.desc}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <span
            className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border transition-colors ${
              isPhaseAllDone
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-white/[0.04] text-slate-300 border-white/[0.08]"
            }`}
          >
            {isPhaseAllDone
              ? "✓ Phase Completed"
              : `${completedCount} of ${lessons.length} Completed`}
          </span>
        </div>
      </div>

      {/* Sequential Ordered Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {lessons.map((lesson, idx) => {
          const isDone = isLessonComplete(lesson.slug) || isLessonComplete(lesson.code);
          const isTarget = Boolean(
            activeLesson &&
              (activeLesson.slug === lesson.slug ||
                activeLesson.code === lesson.code)
          );
          const stepNumber = lesson.stepNumber || idx + 1;

          return (
            <div
              key={lesson.slug}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0E121B] border transition-all duration-300 ease-out shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
                isTarget
                  ? "border-purple-500 ring-2 ring-purple-500/25 bg-purple-500/[0.03] shadow-purple-950/20"
                  : isDone
                  ? "border-emerald-500/30 bg-emerald-500/[0.02] hover:border-emerald-500/50"
                  : "border-white/[0.07] hover:border-white/[0.15]"
              }`}
            >
              {/* Card Header: Step number, Code badge, Status & Mark Done */}
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md">
                      Step {String(stepNumber).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-mono text-xs font-black tracking-wider px-2 py-0.5 rounded-md border ${
                        isTarget
                          ? "bg-purple-500/20 text-purple-200 border-purple-500/40"
                          : isDone
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-white/[0.04] text-slate-300 border-white/[0.08]"
                      }`}
                    >
                      {lesson.code}
                    </span>
                  </div>

                  {/* Status Indicator / Mark Complete Toggle */}
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleLessonComplete(lesson.slug);
                        }}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all cursor-pointer"
                        title="Completed — click to toggle"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Done</span>
                      </button>
                    ) : isTarget ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full text-purple-300 bg-purple-500/15 border border-purple-500/30 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        <span>Current</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded-md">
                        Step {stepNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lesson Title */}
                <Link href={lesson.path} className="block group-hover:underline">
                  <h4
                    className={`text-base font-bold transition-colors duration-200 leading-snug tracking-tight ${
                      isTarget
                        ? "text-white group-hover:text-purple-300"
                        : isDone
                        ? "text-slate-100 group-hover:text-emerald-300"
                        : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {lesson.name}
                  </h4>
                </Link>

                {/* Lesson Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {lesson.desc}
                </p>
              </div>

              {/* Card Footer: Metadata badges & Action Link */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{lesson.estimatedMinutes}m</span>
                  </span>
                  <span>·</span>
                  <span className="text-purple-300 font-semibold">
                    +{lesson.xpReward} XP
                  </span>
                </div>

                <Link
                  href={lesson.path}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    isTarget
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 hover:bg-purple-500"
                      : isDone
                      ? "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                      : "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                  }`}
                >
                  <span>{isDone ? "Review" : isTarget ? "Continue" : "Start Step"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
