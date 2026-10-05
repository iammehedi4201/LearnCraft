"use client";

import Link from "next/link";
import { LayoutGrid } from "./icons";

export interface NestjsSectionItem {
  id: string;
  label: string;
  [key: string]: any;
}

interface NestjsLessonSidebarProps {
  moduleCode: string;
  sections: NestjsSectionItem[];
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

export function NestjsLessonSidebar({
  moduleCode,
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
}: NestjsLessonSidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-20 max-h-[calc(100vh-7rem)] flex flex-col border border-ds-stroke-soft rounded-2xl bg-ds-bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="px-2 mb-3 shrink-0 flex items-center justify-between">
        <p className="text-[10px] font-black text-ds-text-soft uppercase tracking-[0.3em]">
          {moduleCode} Modules
        </p>
        <span className="text-[10px] font-mono text-ds-feature-dark font-bold bg-ds-feature-lighter px-2 py-0.5 rounded-full border border-ds-feature-base/20 shrink-0">
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
                        ? "bg-ds-feature-lighter border border-ds-feature-base"
                        : isDone
                        ? "hover:bg-ds-bg-weak cursor-pointer"
                        : !isAuthenticated
                        ? "hover:bg-ds-bg-weak cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
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
                          ? "bg-ds-feature-base text-ds-static-white scale-105 shadow-sm shadow-ds-feature-base/10"
                          : isDone
                          ? "bg-ds-success-base text-ds-static-white"
                          : "bg-ds-bg-weak text-ds-text-disabled border border-ds-stroke-soft"
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
                            ? "text-ds-feature-dark font-black"
                            : isDone
                            ? "text-ds-text-strong group-hover:text-ds-feature-base"
                            : "text-ds-text-sub group-hover:text-ds-text-strong"
                        }
                      `}
                    >
                      {section.label}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-medium text-ds-feature-base">
                        In progress
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] text-ds-success-dark font-medium">
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-ds-feature-base shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Progress box */}
      <div className="mt-4 shrink-0 px-4 py-3.5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-black text-ds-text-soft uppercase tracking-widest">
            Progress
          </span>
          <span className="text-[12px] font-bold text-ds-text-strong">
            {isAuthenticated ? `${progressPercent}%` : "0%"}
          </span>
        </div>
        <div className="h-1.5 w-full bg-ds-bg-soft rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out bg-ds-feature-base"
            style={{
              width: `${isAuthenticated ? progressPercent : 0}%`,
            }}
          />
        </div>
        <p className="mt-2 text-[10px] text-ds-text-soft">
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
          className="flex-1 py-2.5 rounded-xl text-[12px] font-bold border border-ds-stroke-soft text-ds-text-sub bg-ds-bg-white hover:bg-ds-bg-weak hover:text-ds-text-strong disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          ← Prev
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-2.5 rounded-xl text-[12px] font-bold text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-ds-feature-base/10 cursor-pointer"
        >
          {currentIndex === sections.length - 1
            ? isLessonCompleted
              ? "Completed ✓"
              : "Finish Lesson ✓"
            : "Next →"}
        </button>
      </div>

      {/* Course Hub link */}
      <div className="mt-3 pt-3 shrink-0 border-t border-ds-stroke-soft text-center">
        <Link
          href="/learn/nestjs"
          className="inline-flex items-center gap-1.5 text-xs text-ds-text-sub hover:text-ds-feature-dark transition-colors font-semibold"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>NestJS Curriculum</span>
        </Link>
      </div>
    </aside>
  );
}
