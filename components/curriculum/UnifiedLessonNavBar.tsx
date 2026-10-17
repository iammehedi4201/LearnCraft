"use client";

import { useState } from "react";
import Link from "next/link";

export interface UnifiedLessonNavBarProps {
  /** 0-based index of the currently active lesson / section */
  currentIndex: number;
  /** Total count of lessons / sections in the current module */
  totalLessons: number;
  /** Handler to navigate to previous lesson */
  onPrevLesson: () => void;
  /** Handler to navigate to next lesson */
  onNextLesson: () => void;
  /** Whether the module is already marked completed */
  isLessonCompleted: boolean;
  /** Handler invoked when user completes the module on final lesson */
  onCompleteModule?: () => void;
  /** Next module URL (presented only after module is completed on final lesson) */
  nextModuleHref?: string | null;
  /** Next module short code, e.g. "NX-04" */
  nextModuleCode?: string | null;
  /** Next module human readable title */
  nextModuleName?: string | null;
  /** Whether user has met requirements to complete (e.g. passed required quiz) */
  canCompleteModule?: boolean;
  /** Callback to direct learner to quiz if requirement not satisfied */
  onDirectToQuiz?: () => void;
  /** Optional custom class name */
  className?: string;
  /** Label for position and button actions (e.g. 'Lesson' or 'Part') */
  itemLabel?: "Lesson" | "Part";
  /** Display variant: 'floating' (standalone card with margin) or 'docked' (embedded within card footer) */
  variant?: "floating" | "docked";
}

export function UnifiedLessonNavBar({
  currentIndex,
  totalLessons,
  onPrevLesson,
  onNextLesson,
  isLessonCompleted,
  onCompleteModule,
  nextModuleHref,
  nextModuleCode,
  nextModuleName: _nextModuleName,
  canCompleteModule = true,
  onDirectToQuiz,
  className = "",
  itemLabel = "Lesson",
  variant = "floating",
}: UnifiedLessonNavBarProps): JSX.Element {
  const [showQuizNotice, setShowQuizNotice] = useState<boolean>(false);

  const safeTotal = Math.max(totalLessons, 1);
  const safeCurrent = Math.min(Math.max(currentIndex, 0), safeTotal - 1);
  const isFirstLesson = safeCurrent === 0;
  const isFinalLesson = safeTotal > 0 && safeCurrent === safeTotal - 1;

  const handleCompleteClick = () => {
    if (!canCompleteModule) {
      setShowQuizNotice(true);
      if (onDirectToQuiz) {
        onDirectToQuiz();
      }
      return;
    }

    setShowQuizNotice(false);
    if (onCompleteModule) {
      onCompleteModule();
    }
  };

  const isDocked = variant === "docked";
  const labelText = itemLabel === "Part" ? "Part" : "Lesson";

  return (
    <div className={`${isDocked ? "space-y-3" : "space-y-3 mt-8 sm:mt-12"} ${className}`}>
      {/* Required Quiz Inline Notice if user tries to complete before passing quiz */}
      {showQuizNotice && !isLessonCompleted && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>Please complete the required Knowledge Check Quiz above before finishing this module.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onDirectToQuiz) onDirectToQuiz();
            }}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold font-mono text-[11px] whitespace-nowrap cursor-pointer transition-colors"
          >
            Jump to Quiz ↑
          </button>
        </div>
      )}

      {/* Unified Single Navigation Bar */}
      <nav
        aria-label="Lesson navigation"
        className={
          isDocked
            ? "py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-4"
            : "p-4 sm:p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-xl flex items-center justify-between gap-3 sm:gap-4"
        }
      >
        {/* Left Action: Previous Lesson / Part */}
        <div className="flex-1 flex justify-start">
          <button
            type="button"
            onClick={onPrevLesson}
            disabled={isFirstLesson}
            aria-label={`Previous ${labelText.toLowerCase()}`}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-1.5 select-none ${
              isFirstLesson
                ? "border-white/[0.04] text-slate-600 bg-white/[0.01] cursor-not-allowed opacity-35"
                : "border-white/[0.08] text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
            }`}
          >
            <span aria-hidden="true">←</span>
            <span>{`Previous ${labelText.toLowerCase()}`}</span>
          </button>
        </div>

        {/* Center: Dynamic Current Position Indicator */}
        <div className="shrink-0 flex items-center justify-center text-center px-2 select-none">
          <span
            data-testid="lesson-position-indicator"
            className="text-xs sm:text-sm font-mono text-slate-300 font-semibold tracking-wide"
          >
            {labelText} {safeCurrent + 1} of {safeTotal}
          </span>
        </div>

        {/* Right Action: Next Lesson / Part OR Complete Module / Next Module */}
        <div className="flex-1 flex justify-end">
          {!isFinalLesson ? (
            <button
              type="button"
              onClick={onNextLesson}
              aria-label={`Next ${labelText.toLowerCase()}`}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{`Next ${labelText.toLowerCase()}`}</span>
              <span aria-hidden="true">→</span>
            </button>
          ) : isLessonCompleted ? (
            nextModuleHref ? (
              <Link
                href={nextModuleHref}
                aria-label={nextModuleCode ? `Next module: ${nextModuleCode}` : "Next module"}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>{nextModuleCode ? `Next module: ${nextModuleCode}` : "Next module"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 select-none whitespace-nowrap">
                <span>Course completed</span>
                <span aria-hidden="true">🎓</span>
              </span>
            )
          ) : (
            <button
              type="button"
              onClick={handleCompleteClick}
              aria-label="Complete module"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Complete module</span>
              <span aria-hidden="true">✓</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
