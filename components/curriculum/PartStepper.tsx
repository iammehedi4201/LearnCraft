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
        document.getElementById(targetId) || document.getElementById(section.id);
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

  // Floating bar styling: rounded corners, 1px border, subtle shadow, ~95% opaque dark background with blur
  const floatingStyles = floating
    ? "sticky z-30 transition-[top] duration-300 ease-out motion-reduce:transition-none rounded-2xl border border-white/[0.08] bg-[#0E121B]/95 backdrop-blur-md shadow-xl shadow-black/30 px-5 sm:px-6 py-3 sm:py-3.5"
    : sticky
    ? "sticky top-0 sm:top-14 z-30 bg-[#0E121B]/95 backdrop-blur-md border-b border-white/[0.08]"
    : "";

  return (
    <div
      style={floating ? { top: "var(--navbar-offset, 0px)" } : undefined}
      className={`space-y-2.5 transition-colors ${floatingStyles} ${className}`}
    >
      {/* Label Row: Current Part title on left, Progress % on right */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 min-w-0 font-medium">
          <span className="text-slate-400 font-mono text-[11px] sm:text-xs shrink-0">
            Part {currentIndex + 1} of {sections.length}
          </span>
          <span className="text-slate-600 font-normal">·</span>
          <span className="text-purple-300 font-semibold truncate">
            {currentTitle}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 font-mono text-xs font-bold text-slate-400">
          <span>{progressPercent}%</span>
        </div>
      </div>

      {/* Segments Row: 7 equal-width clickable segments */}
      <nav aria-label="Lesson parts" className="w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 w-full">
          {sections.map((section, index) => {
            const state = getStepState(index);
            const isActive = index === currentIndex;
            const isDone = state === "done";
            const isDisabled = isPartDisabled ? isPartDisabled(index) : false;

            const partTitle = getPartTitle
              ? getPartTitle(section, index)
              : section.label || section.title || `Part ${index + 1}`;

            // Segment styling:
            // - Completed: filled with purple
            // - Current: highlighted with bright purple and glow
            // - Upcoming: muted/dim
            let segmentStyle = "bg-white/[0.08] hover:bg-white/[0.18]";
            if (isActive) {
              segmentStyle =
                "bg-purple-400 ring-2 ring-purple-400/60 shadow-[0_0_12px_rgba(192,132,252,0.65)]";
            } else if (isDone) {
              segmentStyle = "bg-purple-600 hover:bg-purple-500";
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
                className={`group relative flex-1 min-w-0 h-1.5 sm:h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E121B] ${
                  isDisabled ? "opacity-35 cursor-not-allowed" : ""
                } ${segmentStyle}`}
              >
                {/* Desktop hover tooltip */}
                <div
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden md:group-hover:flex flex-col items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <div className="px-2.5 py-1 rounded-md bg-[#161C28] border border-white/10 text-[11px] font-medium text-slate-200 whitespace-nowrap shadow-xl">
                    Part {index + 1} · {partTitle}
                  </div>
                  <div className="w-2 h-2 bg-[#161C28] rotate-45 -mt-1 border-r border-b border-white/10" />
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
