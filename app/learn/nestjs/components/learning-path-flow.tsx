"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Target,
} from "./icons";
import {
  PROGRESSION_PHASES,
  getLessonsByPhaseId,
  LessonMeta,
  STAGE_1_CAPSTONE,
} from "../data/nestjs-curriculum";
import {
  isLessonComplete,
  toggleLessonComplete,
} from "../data/progress-store";

interface LearningPathFlowProps {
  activePhaseId: string;
  nextLesson: LessonMeta | null;
  onSelectPhase?: (phaseId: string) => void;
}

export function LearningPathFlow({
  activePhaseId,
  nextLesson,
  onSelectPhase,
}: LearningPathFlowProps) {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  // Default: only the active phase is expanded; completed and upcoming are collapsed
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    [activePhaseId]: true,
  });

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
    if (onSelectPhase) {
      onSelectPhase(phaseId);
    }
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    PROGRESSION_PHASES.forEach((p) => {
      allExpanded[p.id] = true;
    });
    setExpandedPhases(allExpanded);
  };

  const collapseToActive = () => {
    setExpandedPhases({ [activePhaseId]: true });
  };

  const isAllExpanded = PROGRESSION_PHASES.every((p) => expandedPhases[p.id]);

  return (
    <div className="space-y-6">
      {/* Section Header with Quick View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-200">
            <Target className="w-4 h-4 text-purple-400" />
            <span>Learning Path (8 Phases)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Follow the guided step-by-step path. Only your active phase is expanded to keep cognitive load low.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={isAllExpanded ? collapseToActive : expandAll}
            className="text-xs font-semibold text-slate-400 hover:text-purple-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {isAllExpanded ? "Focus Active Phase" : "Expand All Phases"}
          </button>
        </div>
      </div>

      {/* 8 Progressive Phase Containers */}
      <div className="space-y-4">
        {PROGRESSION_PHASES.map((phase) => {
          const lessons = getLessonsByPhaseId(phase.id);
          const completedCount = isAuthenticated
            ? lessons.filter((l) => isLessonComplete(l.slug) || isLessonComplete(l.code)).length
            : 0;
          const isPhaseCompleted = lessons.length > 0 && completedCount === lessons.length;
          const isPhaseActive = phase.id === activePhaseId;
          const isExpanded = Boolean(expandedPhases[phase.id]);

          return (
            <div
              key={phase.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                isPhaseActive
                  ? "bg-[#0E121B] border-purple-500/40 shadow-xl shadow-purple-500/5 ring-1 ring-purple-500/20"
                  : isPhaseCompleted
                  ? "bg-[#0A0E17]/80 border-emerald-500/20"
                  : "bg-[#0A0D14]/60 border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {/* Phase Header Banner (Click to toggle expand/collapse) */}
              <button
                type="button"
                onClick={() => togglePhase(phase.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer outline-none focus:outline-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border text-xs font-bold ${
                      isPhaseCompleted
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : isPhaseActive
                        ? "bg-purple-500/15 text-purple-300 border-purple-500/40 ring-2 ring-purple-500/20"
                        : "bg-white/[0.04] text-slate-400 border-white/[0.06]"
                    }`}
                  >
                    {isPhaseCompleted ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : isPhaseActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                    ) : (
                      <span className="text-[11px] font-mono">{String(phase.phaseNumber).padStart(2, "0")}</span>
                    )}
                  </div>

                  {/* Title and Scope */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {phase.tag}
                      </span>
                      <span className="text-slate-400">·</span>
                      <h3
                        className={`text-sm sm:text-base font-bold truncate ${
                          isPhaseActive ? "text-white" : isPhaseCompleted ? "text-slate-200" : "text-slate-300"
                        }`}
                      >
                        {phase.label}
                      </h3>
                      {isPhaseActive && (
                        <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                          Active Phase
                        </span>
                      )}
                      {isPhaseCompleted && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Completed ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-normal">
                      {phase.desc}
                    </p>
                  </div>
                </div>

                {/* Right controls: Progress pill & Collapse toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border ${
                      isPhaseCompleted
                        ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
                        : isPhaseActive
                        ? "text-purple-300 bg-purple-500/15 border-purple-500/30"
                        : "text-slate-400 bg-white/[0.04] border-white/[0.06]"
                    }`}
                  >
                    {isPhaseCompleted
                      ? `${lessons.length}/${lessons.length} Done`
                      : isPhaseActive
                      ? `${completedCount}/${lessons.length} In Progress`
                      : `${lessons.length} Lessons`}
                  </span>

                  <div className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Collapsible Lessons Grid */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-white/[0.06] space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {lessons.map((lesson, idx) => {
                      const isDone = Boolean(
                        isAuthenticated && (isLessonComplete(lesson.slug) || isLessonComplete(lesson.code))
                      );
                      const isCurrentNext = Boolean(
                        nextLesson && (nextLesson.slug === lesson.slug || nextLesson.code === lesson.code)
                      );

                      return (
                        <Link
                          key={lesson.slug}
                          href={lesson.path}
                          className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-[#090C14] border transition-all duration-200 cursor-pointer overflow-hidden ${
                            isCurrentNext
                              ? "border-purple-500/50 ring-1 ring-purple-500/30 bg-purple-500/[0.04] shadow-md shadow-purple-500/10"
                              : isDone
                              ? "border-emerald-500/20 hover:border-emerald-500/40"
                              : "border-white/[0.06] hover:border-white/[0.15]"
                          }`}
                        >
                          <div>
                            {/* Card Header: Step Index & Status */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="font-mono text-xs font-bold text-white bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] group-hover:text-purple-300">
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
                                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                                    isDone
                                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                                      : isCurrentNext
                                      ? "text-purple-300 bg-purple-500/15 border border-purple-500/30"
                                      : "text-slate-400 bg-white/[0.04] border border-white/[0.06]"
                                  }`}
                                  title={isDone ? "Completed — click to toggle" : "Mark as completed"}
                                >
                                  {isDone ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>Done</span>
                                    </>
                                  ) : isCurrentNext ? (
                                    <>
                                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                      <span>Next Up</span>
                                    </>
                                  ) : (
                                    <span>Mark Done</span>
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Title */}
                            <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                              {lesson.name}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                              {lesson.desc}
                            </p>
                          </div>

                          {/* Footer: Time & Action */}
                          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/[0.06] text-xs">
                            <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{lesson.estimatedMinutes}m</span>
                            </span>

                            <div
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                                isCurrentNext
                                  ? "bg-purple-600 text-white hover:bg-purple-500"
                                  : isDone
                                  ? "bg-white/[0.04] text-slate-300 hover:text-white"
                                  : "bg-white/[0.04] text-slate-300 hover:bg-purple-600 hover:text-white"
                              }`}
                            >
                              <span>{isDone ? "Review" : isCurrentNext ? "Continue" : "Start"}</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Stage 1 Practice Challenge Banner for Fundamentals */}
                  {phase.id === "fundamentals" && (
                    <div className="p-4 sm:p-5 rounded-xl bg-purple-500/[0.05] border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                            Practice Lab
                          </span>
                          <span className="text-xs font-bold text-white">
                            {STAGE_1_CAPSTONE.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {STAGE_1_CAPSTONE.desc}
                        </p>
                      </div>

                      <Link
                        href={STAGE_1_CAPSTONE.path}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition-all cursor-pointer"
                      >
                        <span>Start Practice Lab</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
