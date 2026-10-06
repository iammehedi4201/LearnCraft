"use client";

import Link from "next/link";
import { BookOpen } from "./icons";
import { ReduxSectionItem } from "../hooks/use-redux-module-progress";

interface ReduxLessonSidebarProps {
  lessonCode: string;
  stageName?: string;
  sections: ReduxSectionItem[];
  currentIndex: number;
  progressPercent: number;
  completedSectionsCount: number;
  isAuthenticated: boolean;
  isLessonCompleted: boolean;
  getStepState: (index: number) => "done" | "active" | "todo";
  onSelectSection: (sectionId: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ReduxLessonSidebar({
  lessonCode,
  stageName: _stageName,
  sections,
  currentIndex,
  progressPercent,
  completedSectionsCount,
  isAuthenticated,
  isLessonCompleted,
  getStepState,
  onSelectSection,
  onPrev,
  onNext,
}: ReduxLessonSidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-20 max-h-[calc(100vh-7rem)] flex flex-col border border-white/[0.08] rounded-2xl bg-[#0E121B] p-4 shadow-xl">
      {/* Header */}
      <div className="px-2 mb-3 shrink-0 flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          {lessonCode} Modules
        </p>
        <span className="text-[10px] font-mono text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shrink-0">
          {sections.length} parts
        </span>
      </div>

      {/* Stepper (Scrollable List) */}
      <nav className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-1">
        <ol className="space-y-1.5 relative">
          {sections.map((section, index) => {
            const state = getStepState(index);
            const isActive = state === "active";
            const isDone = state === "done";
            const isTodo = state === "todo";

            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelectSection(section.id)}
                  disabled={
                    isAuthenticated && isTodo && index > currentIndex + 1
                  }
                  className={`
                    group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200 text-left
                    ${
                      isActive
                        ? "bg-purple-600/15 border border-purple-500/40 text-white shadow-sm"
                        : isDone
                        ? "hover:bg-white/[0.04] cursor-pointer text-slate-300"
                        : !isAuthenticated
                        ? "hover:bg-white/[0.04] cursor-pointer text-slate-400"
                        : "opacity-40 cursor-not-allowed text-slate-500"
                    }
                  `}
                >
                  {/* Step indicator circle */}
                  <div
                    className={`
                      relative z-10 flex-shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center
                      text-[11px] font-bold transition-all duration-200
                      ${
                        isActive
                          ? "bg-purple-600 text-white scale-105 shadow-md shadow-purple-600/30"
                          : isDone
                          ? "bg-emerald-500 text-white"
                          : "bg-white/[0.04] text-slate-400 border border-white/[0.08]"
                      }
                    `}
                  >
                    {isDone ? (
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="2,7 5.5,10.5 12,3.5" />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Label area */}
                  <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                    <span
                      className={`
                        text-[13px] font-semibold leading-tight truncate transition-colors duration-200
                        ${
                          isActive
                            ? "text-purple-200 font-bold"
                            : isDone
                            ? "text-slate-200 group-hover:text-purple-300"
                            : "text-slate-400 group-hover:text-slate-200"
                        }
                      `}
                    >
                      {section.label}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-medium text-purple-400">
                        In progress
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Progress box */}
      <div className="mt-4 shrink-0 px-4 py-3.5 rounded-xl bg-[#090C14] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            Progress
          </span>
          <span className="text-[12px] font-bold text-white">
            {isAuthenticated ? `${progressPercent}%` : "0%"}
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 to-emerald-400"
            style={{
              width: `${isAuthenticated ? progressPercent : 0}%`,
            }}
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-400">
          {isAuthenticated
            ? `${completedSectionsCount} of ${sections.length} modules completed`
            : "Sign in to save progress"}
        </p>
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-3 shrink-0 flex gap-2">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex-1 py-2.5 rounded-xl text-[12px] font-bold border border-white/[0.08] text-slate-400 bg-white/[0.02] hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          ← Prev
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-2.5 rounded-xl text-[12px] font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-purple-600/20 cursor-pointer"
        >
          {currentIndex === sections.length - 1
            ? isLessonCompleted
              ? "Completed ✓"
              : "Finish Lesson ✓"
            : "Next →"}
        </button>
      </div>

      {/* Course Hub link */}
      <div className="mt-3 pt-3 shrink-0 border-t border-white/[0.06] text-center">
        <Link
          href="/learn/redux"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-300 transition-colors font-semibold"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Redux Curriculum</span>
        </Link>
      </div>
    </aside>
  );
}
