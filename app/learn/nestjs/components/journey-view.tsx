"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
} from "./icons";
import {
  PROGRESSION_PHASES,
  getLessonsByPhaseId,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  getActiveLesson,
  toggleLessonComplete,
} from "../data/progress-store";

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
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    borderHover: "hover:border-emerald-500/50",
    glowBg: "group-hover:bg-emerald-500/5",
  },
  "core-arch": {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    borderHover: "hover:border-purple-500/50",
    glowBg: "group-hover:bg-purple-500/5",
  },
  "http-apis": {
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    borderHover: "hover:border-sky-500/50",
    glowBg: "group-hover:bg-sky-500/5",
  },
  lifecycle: {
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    borderHover: "hover:border-amber-500/50",
    glowBg: "group-hover:bg-amber-500/5",
  },
  "error-handling": {
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    borderHover: "hover:border-rose-500/50",
    glowBg: "group-hover:bg-rose-500/5",
  },
  auth: {
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    borderHover: "hover:border-indigo-500/50",
    glowBg: "group-hover:bg-indigo-500/5",
  },
  testing: {
    badge: "bg-teal-500/10 text-teal-300 border-teal-500/20",
    borderHover: "hover:border-teal-500/50",
    glowBg: "group-hover:bg-teal-500/5",
  },
  "best-practices": {
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    borderHover: "hover:border-purple-500/50",
    glowBg: "group-hover:bg-purple-500/5",
  },
  reference: {
    badge: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    borderHover: "hover:border-slate-500/50",
    glowBg: "group-hover:bg-slate-500/5",
  },
};

export function JourneyView({ phaseId }: JourneyViewProps) {
  const phase =
    PROGRESSION_PHASES.find((p) => p.id === phaseId) || PROGRESSION_PHASES[0];

  const lessons = getLessonsByPhaseId(phase.id);
  const activeLesson = getActiveLesson();
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const completedCount = isAuthenticated
    ? lessons.filter((l) => isLessonComplete(l.slug) || isLessonComplete(l.code)).length
    : 0;

  const accent = PHASE_ACCENTS[phase.id] || PHASE_ACCENTS.fundamentals;

  return (
    <div className="space-y-6">
      {/* Current Phase Main Container */}
      <div className="space-y-5">
        {/* Phase Header Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider border px-3 py-1 rounded-xl ${accent.badge}`}
            >
              {phase.tag}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {phase.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-slate-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full">
              {completedCount} / {lessons.length} Completed
            </span>
          </div>
        </div>

        {/* Phase Lessons Grid (Sequential Ordered Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson, idx) => {
            const isDone = Boolean(
              isAuthenticated && (isLessonComplete(lesson.slug) || isLessonComplete(lesson.code))
            );
            const isTarget =
              Boolean(activeLesson &&
              (activeLesson.slug === lesson.slug ||
               activeLesson.code === lesson.code));

            return (
              <Link
                key={lesson.slug}
                href={lesson.path}
                className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0E121B] border transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden ${
                  isTarget
                    ? "border-purple-500/40 ring-1 ring-purple-500/20 bg-purple-500/[0.03]"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div className="relative z-10">
                  {/* Card Header: Step Index, Code & Status */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 bg-white/[0.04] group-hover:text-slate-300 px-2 py-0.5 rounded-md transition-colors duration-200">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs font-black tracking-wider text-white bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] group-hover:border-purple-500/40 group-hover:text-purple-300 transition-colors duration-200">
                        {lesson.code}
                      </span>
                    </div>

                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleLessonComplete(lesson.slug);
                        }}
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer outline-none focus:outline-none ${
                          isDone
                            ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
                            : isTarget
                            ? "text-purple-300 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30"
                            : "text-slate-400 bg-white/[0.04] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                        }`}
                        title={
                          isDone
                            ? "Completed in database — click to unmark"
                            : "Click to mark complete in database"
                        }
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Done</span>
                          </>
                        ) : isTarget ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            <span>Current</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full border border-white/20 group-hover:border-purple-400 inline-block" />
                            <span>Mark Done</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-200 leading-snug tracking-tight">
                    {lesson.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-200 line-clamp-2 mt-2 leading-relaxed font-normal">
                    {lesson.desc}
                  </p>

                  {/* Prerequisite Pill */}
                  {lesson.prerequisite && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-white/[0.04] group-hover:bg-white/[0.06] px-2.5 py-1 rounded-lg transition-colors duration-200 border border-white/[0.04]">
                      <span className="text-slate-400 font-semibold">
                        Requires:
                      </span>
                      <span>{lesson.prerequisite}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between gap-3 mt-6 pt-4 border-t border-white/[0.06] text-xs">
                  <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lesson.estimatedMinutes}m</span>
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.06] group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent font-bold transition-all duration-200 ease-out shadow-sm">
                    <span>
                      {isDone ? "Review" : isTarget ? "Continue" : "Start"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
