"use client";

import Link from "next/link";
import { ExpressSectionItem } from "../hooks/use-express-module-progress";

interface ExpressLessonSidebarProps {
  lessonCode: string;
  stageName?: string;
  sections: ExpressSectionItem[];
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

export function ExpressLessonSidebar({
  lessonCode,
  stageName,
  sections,
  currentIndex,
  progressPercent,
  completedSectionsCount: _completedSectionsCount,
  isAuthenticated,
  isLessonCompleted,
  getStepState,
  onSelectSection,
  onPrev: _onPrev,
  onNext: _onNext,
}: ExpressLessonSidebarProps) {
  return (
    <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 max-h-[calc(100vh-7rem)] flex flex-col border border-white/[0.08] rounded-2xl bg-[#0E121B] p-4 shadow-xl">
      {/* Header */}
      <div className="px-2 mb-3 shrink-0 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            {lessonCode} Modules
          </p>
          {stageName && (
            <span className="text-[11px] font-medium text-slate-400 block truncate max-w-[180px]">
              {stageName}
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono text-purple-300 font-bold bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-500/25 shrink-0">
          {sections.length} parts
        </span>
      </div>

      {/* Stepper (Scrollable List) */}
      <nav className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
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
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? "bg-purple-600/15 border border-purple-500/40 shadow-sm shadow-purple-600/10"
                      : isDone
                      ? "hover:bg-white/[0.04] border border-transparent"
                      : !isAuthenticated
                      ? "hover:bg-white/[0.04] border border-transparent"
                      : "opacity-40 cursor-not-allowed border border-transparent"
                  }`}
                >
                  {/* Step indicator circle */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-purple-600 text-white scale-105 shadow-md shadow-purple-600/30 ring-2 ring-purple-500/30"
                        : isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-white/[0.04] text-slate-400 border border-white/[0.08]"
                    }`}
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
                        <polyline points="2.5 7 5.5 10 11.5 4" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Step info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-tight truncate transition-colors duration-200 ${
                        isActive
                          ? "text-purple-200"
                          : isDone
                          ? "text-slate-300 group-hover:text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {section.label}
                    </p>
                    {section.description && (
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {section.description}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Progress Footer */}
      <div className="pt-3 mt-2 border-t border-white/[0.08] shrink-0 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-mono font-medium">Lesson Progress</span>
          <span className="font-bold text-slate-200 font-mono">
            {isAuthenticated
              ? isLessonCompleted
                ? "100%"
                : `${progressPercent}%`
              : `${currentIndex + 1}/${sections.length}`}
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-300"
            style={{
              width: isAuthenticated
                ? isLessonCompleted
                  ? "100%"
                  : `${progressPercent}%`
                : `${((currentIndex + 1) / sections.length) * 100}%`,
            }}
          />
        </div>

        {/* Back to Hub link */}
        <div className="pt-1">
          <Link
            href="/learn/express"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-purple-600/10 text-slate-400 hover:text-purple-300 border border-white/[0.06] hover:border-purple-500/30 text-xs font-semibold transition-all"
          >
            <span>Express.js Roadmap</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
