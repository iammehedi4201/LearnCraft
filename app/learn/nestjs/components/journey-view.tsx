"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
} from "./icons";
import {
  PROGRESSION_PHASES,
  getLessonsByPhaseId,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  getNextRecommendedLesson,
} from "../data/progress-store";
import { ContentTagBadge } from "./content-tag-badge";

interface JourneyViewProps {
  phaseId: string;
  onSelectPhase?: (phaseId: string) => void;
}

const PHASE_ACCENTS: Record<
  string,
  {
    badge: string;
    borderHover: string;
    glowBg: string;
  }
> = {
  fundamentals: {
    badge: "bg-ds-success-lighter text-ds-success-dark border-ds-stroke-soft",
    borderHover: "hover:border-ds-success-base/60",
    glowBg: "group-hover:bg-ds-success-base/10",
  },
  intermediate: {
    badge: "bg-ds-info-lighter text-ds-info-dark border-ds-stroke-soft",
    borderHover: "hover:border-ds-info-base/60",
    glowBg: "group-hover:bg-ds-info-base/10",
  },
  advanced: {
    badge: "bg-ds-feature-lighter text-ds-feature-dark border-ds-stroke-soft",
    borderHover: "hover:border-ds-feature-base/60",
    glowBg: "group-hover:bg-ds-feature-base/10",
  },
  reference: {
    badge: "bg-ds-highlighted-lighter text-ds-highlighted-dark border-ds-stroke-soft",
    borderHover: "hover:border-ds-highlighted-base/60",
    glowBg: "group-hover:bg-ds-highlighted-base/10",
  },
};

export function JourneyView({
  phaseId,
  onSelectPhase,
}: JourneyViewProps) {
  const phase =
    PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    PROGRESSION_PHASES[0];

  const lessons = getLessonsByPhaseId(phase.id);
  const nextRecommended = getNextRecommendedLesson();

  const completedCount = lessons.filter(
    (l) => isLessonComplete(l.slug) || isLessonComplete(l.code)
  ).length;

  const currentPhaseIndex = PROGRESSION_PHASES.findIndex((p) => p.id === phase.id);
  const prevPhase = currentPhaseIndex > 0 ? PROGRESSION_PHASES[currentPhaseIndex - 1] : null;
  const nextPhase =
    currentPhaseIndex >= 0 && currentPhaseIndex < PROGRESSION_PHASES.length - 2
      ? PROGRESSION_PHASES[currentPhaseIndex + 1]
      : null;

  const accent = PHASE_ACCENTS[phase.id] || PHASE_ACCENTS.fundamentals;

  return (
    <div className="space-y-6">
      {/* Current Phase Main Container */}
      <div className="space-y-5">
        {/* Phase Header Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider border px-3 py-1 rounded-xl ${accent.badge}`}
            >
              {phase.tag}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-ds-text-strong tracking-tight">
                {phase.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-ds-text-sub bg-ds-bg-weak px-3 py-1 rounded-full border border-ds-stroke-soft">
              {completedCount} / {lessons.length} Completed
            </span>
          </div>
        </div>

        {/* Phase Lessons Grid (Sequential Ordered Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson, idx) => {
            const isDone =
              isLessonComplete(lesson.slug) ||
              isLessonComplete(lesson.code);
            const isTarget =
              nextRecommended.slug === lesson.slug ||
              nextRecommended.code === lesson.code;

            return (
              <Link
                key={lesson.slug}
                href={lesson.path}
                className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-ds-bg-white border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden ${
                  isTarget
                    ? "border-ds-feature-base ring-2 ring-ds-feature-base/20 bg-ds-feature-lighter/[0.06] shadow-md shadow-ds-feature-base/5"
                    : `border-ds-stroke-soft ${accent.borderHover}`
                }`}
              >
                {/* Ambient Corner Glow on Hover */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100 ${accent.glowBg}`}
                />

                <div className="relative z-10">
                  {/* Card Header: Step Index, Code & Status */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-ds-text-soft bg-ds-bg-weak px-2 py-0.5 rounded-md">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs font-black tracking-wider text-ds-text-strong bg-ds-bg-weak px-2.5 py-1 rounded-lg border border-ds-stroke-soft group-hover:border-ds-feature-base/40 group-hover:text-ds-feature-base transition-colors">
                        {lesson.code}
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ds-success-dark bg-ds-success-lighter px-2.5 py-0.5 rounded-full border border-ds-stroke-soft">
                          <CheckCircle2 className="w-3.5 h-3.5 text-ds-success-base" />
                          Done
                        </span>
                      ) : isTarget ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ds-feature-dark bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-ds-feature-base" />
                          Current
                        </span>
                      ) : null}
                    </div>

                    <ContentTagBadge tag={lesson.tag} size="sm" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors leading-snug tracking-tight">
                    {lesson.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ds-text-sub group-hover:text-ds-text-strong/90 transition-colors line-clamp-2 mt-2 leading-relaxed font-normal">
                    {lesson.desc}
                  </p>

                  {/* Prerequisite Pill - Clean Borderless Design */}
                  {lesson.prerequisite && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-ds-text-sub bg-ds-bg-weak px-2.5 py-1 rounded-lg">
                      <span className="text-ds-text-soft font-semibold">Requires:</span>
                      <span>{lesson.prerequisite}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between gap-3 mt-6 pt-4 border-t border-ds-stroke-soft text-xs">
                  <span className="inline-flex items-center gap-1.5 text-ds-text-soft font-medium">
                    <Clock className="w-3.5 h-3.5 text-ds-icon-sub" />
                    <span>{lesson.estimatedMinutes}m</span>
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ds-bg-weak text-ds-text-sub border border-ds-stroke-soft group-hover:bg-ds-feature-base group-hover:text-ds-static-white group-hover:border-ds-feature-base font-bold transition-all duration-300 shadow-sm">
                    <span>
                      {isDone ? "Review" : isTarget ? "Continue" : "Start"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Phase Navigation Footer (Prev / Next Phase) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevPhase ? (
            <button
              onClick={() => onSelectPhase && onSelectPhase(prevPhase.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-sub hover:text-ds-text-strong border border-ds-stroke-soft text-xs font-bold transition-all w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevPhase.tag}: {prevPhase.label}</span>
            </button>
          ) : (
            <div />
          )}

          {nextPhase ? (
            <button
              onClick={() => onSelectPhase && onSelectPhase(nextPhase.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white text-xs font-bold transition-all shadow-sm active:scale-95 w-full sm:w-auto justify-center"
            >
              <span>Next: {nextPhase.tag} ({nextPhase.label})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ds-success-lighter text-ds-success-dark text-xs font-bold border border-ds-stroke-soft">
              <Award className="w-4 h-4 text-ds-success-base" />
              <span>Final Learning Phase</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
