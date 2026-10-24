"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PART STEPPER COMPONENT — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Slim horizontal progress stepper displayed at the top of each lesson module.
 * Serves as a sticky scroll-spy header that highlights the current part,
 * displays completed progress percentage, and smooth-scrolls to parts on click.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { LessonSectionItem } from "./lesson-content-types";

export interface PartStepperProps {
  /** Array of lesson parts (typically 7 parts) */
  sections: LessonSectionItem[];
  /** ID of the currently active part (e.g. "part1" or "part-1") */
  activeSectionId: string;
  /** 0-based index of the currently active part */
  currentIndex: number;
  /** Callback fired when the learner clicks/taps a part segment */
  onSelectPart: (sectionId: string, index?: number) => void;
  /** Determines the state of each part ("done" | "active" | "todo") */
  getStepState: (index: number) => "done" | "active" | "todo";
  /** Overall completion percentage (0 - 100) */
  progressPercent: number;
  /** Function to resolve human-readable title of a part */
  getPartTitle?: (section: LessonSectionItem, index: number) => string;
  /** Optional callback to disable navigation to locked upcoming steps */
  isPartDisabled?: (index: number) => boolean;
  /** Optional custom class name */
  className?: string;
  /** Whether the stepper is sticky at the top */
  sticky?: boolean;
  /** Whether the stepper is rendered as a floating bar */
  floating?: boolean;
}

export function PartStepper({
  sections,
  activeSectionId: _activeSectionId,
  currentIndex,
  onSelectPart,
  getStepState,
  progressPercent,
  getPartTitle,
  isPartDisabled,
  className = "",
  sticky = true,
  floating = true,
}: PartStepperProps): JSX.Element {
  const currentSection = sections[currentIndex];
  const currentTitle = currentSection
    ? getPartTitle
      ? getPartTitle(currentSection, currentIndex)
      : currentSection.label || currentSection.title || `Part ${currentIndex + 1}`
    : `Part ${currentIndex + 1}`;

  const handleSegmentClick = (section: LessonSectionItem, index: number) => {
    onSelectPart(section.id, index);

    if (typeof window !== "undefined") {
      const targetId = `part-${index + 1}`;
      const targetEl =
        document.getElementById(targetId) ||
        document.getElementById(section.id) ||
        document.querySelector(`[data-section-id="${section.id}"]`);
      if (targetEl) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }

      // Sync navbar visibility: only show navbar when reaching Part 1 (first section)
      if (index === 0) {
        window.dispatchEvent(new CustomEvent("learncraft-show-nav"));
      } else {
        window.dispatchEvent(new CustomEvent("learncraft-hide-nav"));
      }

      // Sync URL hash without polluting browser history
      try {
        window.history.replaceState(null, "", `#part-${index + 1}`);
      } catch {}
    }
  };

  // Floating bar styling: rounded corners, borderless, subtle shadow, ~95% opaque dark background with blur
  const floatingStyles = floating
    ? "sticky z-30 transition-[top] duration-300 ease-out motion-reduce:transition-none rounded-2xl bg-[#0E121B]/95 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.14] shadow-xl shadow-black/40 px-4 sm:px-6 py-3 sm:py-3.5 relative overflow-hidden"
    : sticky
    ? "sticky top-0 sm:top-14 z-30 bg-[#0E121B]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/30 px-4 sm:px-6 py-3"
    : "relative rounded-2xl bg-[#0E121B]/95 backdrop-blur-xl border border-white/[0.08] p-4";

  return (
    <div
      style={floating ? { top: "var(--navbar-offset, 0px)" } : undefined}
      className={`space-y-3 transition-colors ${floatingStyles} ${className}`}
    >
      {/* Label Row: Current Part title on left, Progress % on right */}
      <div className="relative flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 min-w-0">
          {/* Pill Badge for Step Count */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-200 font-mono text-[11px] font-medium tracking-wide shrink-0 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            Part {currentIndex + 1} of {sections.length}
          </span>
          <span className="text-white/20 select-none">·</span>
          <div className="flex items-center gap-1.5 min-w-0">
            {currentSection?.icon && (
              <span className="text-sm select-none shrink-0" aria-hidden="true">
                {currentSection.icon}
              </span>
            )}
            <span className="text-white font-semibold text-xs sm:text-sm tracking-tight truncate drop-shadow-sm">
              {currentTitle}
            </span>
          </div>
        </div>

        {/* Progress % Pill (Monochrome) */}
        <div className="flex items-center shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-200 font-mono text-xs font-semibold shrink-0 shadow-sm">
            {progressPercent === 100 ? (
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            )}
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Segments Row: 7 equal-width clickable segments */}
      <nav aria-label="Lesson parts" className="relative w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 w-full">
          {sections.map((section, index) => {
            const state = getStepState(index);
            const isActive = index === currentIndex;
            const isDone = state === "done";
            const isDisabled = isPartDisabled ? isPartDisabled(index) : false;

            const partTitle = getPartTitle
              ? getPartTitle(section, index)
              : section.label || section.title || `Part ${index + 1}`;

            // Minimalist Monochrome Segment Styling (Vercel / Apple style)
            let segmentStyle = "bg-white/[0.08] hover:bg-white/[0.16]";
            if (isActive) {
              segmentStyle =
                "bg-white ring-2 ring-white/60 shadow-[0_0_12px_rgba(255,255,255,0.7)]";
            } else if (isDone) {
              segmentStyle = "bg-white/40 hover:bg-white/60";
            }

            return (
              <button
                key={section.id || index}
                type="button"
                onClick={() => handleSegmentClick(section, index)}
                disabled={isDisabled}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Part ${index + 1}: ${partTitle}`}
                title={`Part ${index + 1}: ${partTitle}`}
                className={`group relative flex-1 min-w-0 h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E121B] hover:scale-y-125 ${
                  isDisabled ? "opacity-35 cursor-not-allowed" : ""
                } ${segmentStyle}`}
              >
                {/* Desktop hover tooltip */}
                <div
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden md:group-hover:flex flex-col items-center z-40 opacity-0 group-hover:opacity-100 transition-all duration-150 transform group-hover:-translate-y-0.5"
                >
                  <div className="px-3 py-1.5 rounded-xl bg-[#141822]/95 backdrop-blur-xl border border-white/10 text-[11px] font-medium text-slate-200 whitespace-nowrap shadow-2xl flex items-center gap-2">
                    {section.icon && (
                      <span className="text-xs select-none" aria-hidden="true">
                        {section.icon}
                      </span>
                    )}
                    <span className="font-semibold text-white">Part {index + 1}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 max-w-[180px] truncate">{partTitle}</span>
                    {isDone && (
                      <span className="text-[10px] text-white/80 bg-white/10 px-1.5 py-0.5 rounded font-mono font-medium">
                        ✓ Done
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[10px] text-white bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-[#141822] rotate-45 -mt-1 border-r border-b border-white/10" />
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
