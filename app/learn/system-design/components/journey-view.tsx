"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  SYSTEM_DESIGN_PROGRESSION_PHASES,
  getLessonsByPhaseId,
  LessonMeta,
} from "../data/system-design-curriculum";
import {
  isLessonComplete,
  toggleLessonComplete,
  getNextRecommendedLesson,
} from "../data/progress-store";
import {
  CheckCircle2,
  ArrowRight,
  Target,
} from "./icons";

interface JourneyViewProps {
  phaseId: string;
  onSelectPhase?: (phaseId: string) => void;
}

export function JourneyView({ phaseId }: JourneyViewProps) {
  const [lessons, setLessons] = useState<LessonMeta[]>([]);
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [, setRefreshCount] = useState(0);

  const phase = SYSTEM_DESIGN_PROGRESSION_PHASES.find((p) => p.id === phaseId);

  useEffect(() => {
    setLessons(getLessonsByPhaseId(phaseId));
    setNextLesson(getNextRecommendedLesson());
  }, [phaseId]);

  useEffect(() => {
    const handleUpdate = () => {
      setLessons(getLessonsByPhaseId(phaseId));
      setNextLesson(getNextRecommendedLesson());
      setRefreshCount((c) => c + 1);
    };

    window.addEventListener(
      "learncraft-system-design-progress-updated",
      handleUpdate
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "learncraft-system-design-progress-updated",
        handleUpdate
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleUpdate
      );
    };
  }, [phaseId]);

  if (!phase) return null;

  return (
    <div className="space-y-6">
      {/* Active Phase Banner */}
      <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
              Phase {phase.phaseNumber}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-mono text-slate-400">
              {lessons.length} Lessons
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {phase.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            {phase.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl font-bold">
            {phase.tagline}
          </span>
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => {
          const completed = isLessonComplete(lesson.slug) || isLessonComplete(lesson.code);
          const isNext = nextLesson?.code === lesson.code;

          return (
            <div
              key={lesson.code}
              className={`group relative p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
                completed
                  ? "bg-[#0E121B]/80 border-emerald-500/30 hover:border-emerald-500/50"
                  : isNext
                  ? "bg-[#090C14] border-purple-500/40 ring-1 ring-purple-500/30 shadow-lg shadow-purple-950/20"
                  : "bg-[#0E121B] border-white/[0.08] hover:border-purple-500/30 hover:bg-[#0E121B]/90"
              }`}
            >
              {/* Header Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                        completed
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : isNext
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                          : "bg-white/[0.04] text-slate-400 border-white/[0.06]"
                      }`}
                    >
                      {lesson.code}
                    </span>
                    {isNext && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-full animate-pulse">
                        <Target className="w-3 h-3 text-purple-400" />
                        Next Up
                      </span>
                    )}
                  </div>

                  {/* Manual Mark Complete Toggle */}
                  <button
                    type="button"
                    title={completed ? "Mark incomplete" : "Mark completed"}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleLessonComplete(lesson.slug);
                    }}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      completed
                        ? "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25"
                        : "text-slate-600 bg-white/[0.02] border border-white/[0.06] hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Lesson Info */}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {lesson.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {lesson.desc}
                  </p>
                </div>
              </div>

              {/* Footer Meta & Action */}
              <div className="pt-4 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                  <span>⏱️ {lesson.estimatedMinutes}m</span>
                  <span>·</span>
                  <span className="text-purple-400 font-semibold">
                    +{lesson.xpReward} XP
                  </span>
                </div>

                <Link
                  href={lesson.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    completed
                      ? "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]"
                      : isNext
                      ? "bg-purple-600 text-white hover:bg-purple-500 shadow-md shadow-purple-600/30"
                      : "bg-white/[0.04] text-purple-300 hover:bg-purple-600 hover:text-white border border-white/[0.06]"
                  }`}
                >
                  <span>{completed ? "Review" : "Start"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
