"use client";

import Link from "next/link";
import { BookOpen } from "./icons";
import { SystemDesignSectionItem } from "../hooks/use-system-design-module-progress";

interface SystemDesignLessonSidebarProps {
  lessonCode: string;
  stageName?: string;
  sections: SystemDesignSectionItem[];
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

export function SystemDesignLessonSidebar({
  lessonCode,
  stageName: _stageName,
  sections,
  currentIndex,
  progressPercent,
  completedSectionsCount: _completedSectionsCount,
  isAuthenticated: _isAuthenticated,
  isLessonCompleted: _isLessonCompleted,
  getStepState,
  onSelectSection,
  onPrev,
  onNext,
}: SystemDesignLessonSidebarProps) {
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

            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelectSection(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer border ${
                    isActive
                      ? "bg-purple-600 text-white border-purple-400/40 shadow-md shadow-purple-600/30 scale-[1.01]"
                      : isDone
                      ? "bg-[#090C14] text-slate-200 border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.04]"
                      : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Step Number / Icon */}
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/[0.05] text-slate-400"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </span>

                  {/* Title & Badge */}
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{section.title}</span>
                    {section.badge && (
                      <span className="text-[10px] text-purple-300/80 font-mono block">
                        {section.badge}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Progress Footer */}
      <div className="pt-4 mt-3 border-t border-white/[0.08] space-y-3 shrink-0">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 text-[11px]">Lesson Progress</span>
            <span className="text-purple-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all border ${
              currentIndex > 0
                ? "bg-white/[0.04] text-slate-200 border-white/[0.08] hover:bg-white/[0.08] cursor-pointer"
                : "bg-white/[0.01] text-slate-600 border-white/[0.04] cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === sections.length - 1}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all border ${
              currentIndex < sections.length - 1
                ? "bg-purple-600 text-white border-purple-500/40 hover:bg-purple-500 shadow-sm cursor-pointer"
                : "bg-white/[0.01] text-slate-600 border-white/[0.04] cursor-not-allowed"
            }`}
          >
            Next Part
          </button>
        </div>

        {/* Course Return Link */}
        <Link
          href="/learn/system-design"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all border border-transparent hover:border-white/[0.06]"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Overview</span>
        </Link>
      </div>
    </aside>
  );
}
