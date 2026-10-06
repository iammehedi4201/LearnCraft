"use client";

import Link from "next/link";
import { LayoutGrid } from "./icons";
import { PostgresqlSectionItem } from "../hooks/use-postgresql-module-progress";

interface PostgresqlLessonSidebarProps {
  lessonCode: string;
  stageName?: string;
  sections: PostgresqlSectionItem[];
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

export function PostgresqlLessonSidebar({
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
}: PostgresqlLessonSidebarProps) {
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
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group relative cursor-pointer ${
                    isActive
                      ? "bg-purple-600/15 text-purple-200 font-semibold border border-purple-500/30"
                      : isDone
                      ? "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                      : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                  }`}
                >
                  {/* Step status circle */}
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors ${
                      isActive
                        ? "bg-purple-600 text-white ring-2 ring-purple-400/40"
                        : isDone
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                        : "bg-white/[0.04] text-slate-500 border border-white/[0.06] group-hover:border-white/[0.12]"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs truncate block leading-snug">
                        {section.label}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shrink-0" />
                      )}
                    </div>
                    {section.description && (
                      <p
                        className={`text-[10px] truncate mt-0.5 ${
                          isActive
                            ? "text-purple-300/80"
                            : isTodo
                            ? "text-slate-500/70"
                            : "text-slate-400"
                        }`}
                      >
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

      {/* Progress & Controls (Footer) */}
      <div className="pt-3 border-t border-white/[0.06] shrink-0 space-y-3 mt-2">
        <div>
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
            <span>
              {completedSectionsCount} of {sections.length} parts
            </span>
            <span className="font-bold text-purple-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/[0.04] h-1.5 rounded-full overflow-hidden border border-white/[0.04]">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Prev / Next controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-center transition-colors ${
              currentIndex === 0
                ? "border-white/[0.04] text-slate-600 bg-white/[0.02] cursor-not-allowed"
                : "border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:text-white cursor-pointer"
            }`}
          >
            ← Prev
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === sections.length - 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-center transition-colors ${
              currentIndex === sections.length - 1
                ? "border border-white/[0.04] text-slate-600 bg-white/[0.02] cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-sm cursor-pointer"
            }`}
          >
            Next →
          </button>
        </div>

        {/* Sync Indicator */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAuthenticated ? "bg-emerald-400" : "bg-slate-600"
              }`}
            />
            {isAuthenticated ? "Synced to cloud" : "Saved locally"}
          </span>
          {isLessonCompleted && (
            <span className="text-purple-400 font-bold flex items-center gap-1">
              ✓ Lesson Done
            </span>
          )}
        </div>

        {/* All Lessons Link */}
        <Link
          href="/learn/postgresql"
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white text-xs font-medium transition-all group"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" />
          <span>All PostgreSQL Lessons</span>
        </Link>
      </div>
    </aside>
  );
}
