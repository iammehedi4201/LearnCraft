"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DATA-DRIVEN LESSON VIEW ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal, responsive, high-aesthetic curriculum lesson renderer.
 * Renders all 7 module parts stacked vertically on one scrolling page:
 * 1. Overview & Real-Life Analogy
 * 2. Core Concepts & Mechanics
 * 3. Mental Model & Structure
 * 4. Bad Code vs Clean Code
 * 5. Interactive Code Sandbox
 * 6. Summary & Key Takeaways
 * 7. Knowledge Check Quiz
 *
 * Includes floating sticky scroll-spy PartStepper with auto-hiding navbar
 * coordination, automatic reading completion timers, live sandbox execution
 * tracking, and quiz verification.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import { useLessonProgress } from "./use-lesson-progress";
import {
  StandardLessonContent,
  LessonContentCard,
  LessonSectionItem,
} from "./lesson-content-types";
import { recordActivity } from "@/lib/gamification";
import { PartStepper } from "./PartStepper";
import {
  CurriculumCardCode,
  highlightLine,
  WrapIcon,
  CopyIcon,
  CheckIcon,
  ExpandIcon,
  CloseIcon,
} from "./CurriculumCardCode";

function renderFormattedText(text?: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/`([^`]+)`/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="px-1.5 py-0.5 rounded bg-white/[0.08] text-purple-300 font-mono text-[11px] sm:text-xs border border-white/[0.08]"
      >
        {part}
      </code>
    ) : (
      part
    )
  );
}

interface ComparisonSideData {
  title: string;
  code: string;
  explanation: string;
}

interface SideBySideComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  bad: ComparisonSideData;
  good: ComparisonSideData;
  problem?: string;
  whyItMatters?: string;
}

function SideBySideComparisonModal({
  isOpen,
  onClose,
  bad,
  good,
  problem,
  whyItMatters,
}: SideBySideComparisonModalProps): JSX.Element | null {
  const [isWrapped, setIsWrapped] = useState<boolean>(true);
  const [badCopied, setBadCopied] = useState<boolean>(false);
  const [goodCopied, setGoodCopied] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key and lock body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const badLines = useMemo(() => (bad.code ? bad.code.split("\n") : []), [bad.code]);
  const goodLines = useMemo(() => (good.code ? good.code.split("\n") : []), [good.code]);

  const handleCopyCode = async (code: string, isBad: boolean) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      if (isBad) {
        setBadCopied(true);
        setTimeout(() => setBadCopied(false), 2000);
      } else {
        setGoodCopied(true);
        setTimeout(() => setGoodCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy comparison code", err);
    }
  };

  if (!isOpen || !mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
    >
      <div
        className="relative w-full max-w-7xl max-h-[94vh] flex flex-col rounded-2xl bg-[#070913] border border-purple-500/30 shadow-2xl shadow-purple-950/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="h-12 px-4 sm:px-6 bg-[#0B0F1E] border-b border-white/[0.08] flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold text-sm hidden sm:inline">⚡</span>
              <h3
                id="comparison-modal-title"
                className="text-xs sm:text-sm font-mono font-bold text-slate-100 tracking-wide"
              >
                Side-by-Side Comparison: Anti-Pattern vs Production Solution
              </h3>
            </div>
            <span className="hidden md:inline-flex text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
              Interactive Diff
            </span>
          </div>

          {/* Modal Header Actions: Wrap & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsWrapped((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                isWrapped
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30 font-semibold"
                  : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200 hover:bg-white/[0.08]"
              }`}
              title={isWrapped ? "Word wrap is ON (click to disable)" : "Word wrap is OFF (click to wrap)"}
            >
              <WrapIcon className={`w-3.5 h-3.5 ${isWrapped ? "text-purple-300" : "text-slate-400"}`} />
              <span className="hidden sm:inline">Wrap</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-colors cursor-pointer"
              title="Close comparison modal (Esc)"
            >
              <CloseIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Close</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-white/[0.08] text-slate-400 border border-white/[0.08]">
                ESC
              </kbd>
            </button>
          </div>
        </div>

        {/* Optional Problem Banner */}
        {problem && (
          <div className="px-4 sm:px-6 py-2.5 bg-amber-500/[0.07] border-b border-amber-500/20 text-amber-200 text-xs flex items-center gap-2 select-none shrink-0">
            <span className="text-amber-400 font-bold shrink-0">⚠️ Core Architectural Challenge:</span>
            <span className="text-slate-300 truncate sm:whitespace-normal">{problem}</span>
          </div>
        )}

        {/* Side-by-Side Code Viewport Grid */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4 bg-[#04060C]">
          {/* Left Column: Anti-Pattern */}
          <div className="flex flex-col rounded-xl bg-rose-950/10 border border-rose-500/30 overflow-hidden shadow-lg shadow-rose-950/20">
            <div className="h-10 px-3 sm:px-4 bg-rose-950/30 border-b border-rose-500/20 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wide truncate">
                  ❌ {bad.title || "Anti-Pattern"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(bad.code, true)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors border border-rose-500/25 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                title="Copy anti-pattern code"
              >
                {badCopied ? (
                  <>
                    <CheckIcon className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3 h-3 text-rose-300" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code lines with line numbers */}
            <div className="flex-1 max-h-[48vh] sm:max-h-[54vh] overflow-y-auto p-3 sm:p-4 bg-[#060812] text-xs font-mono leading-relaxed text-slate-200 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              {badLines.map((line, idx) => {
                const tokens = highlightLine(line);
                return (
                  <div key={idx} className="flex gap-3 min-h-[1.35rem] hover:bg-rose-500/[0.04] rounded px-1 -mx-1 group">
                    <span className="select-none text-rose-400/40 group-hover:text-rose-400/70 font-mono text-xs w-7 sm:w-8 text-right shrink-0 pt-0.5 border-r border-rose-500/20 pr-2 transition-colors">
                      {idx + 1}
                    </span>
                    <div
                      className={`flex-1 ${
                        isWrapped
                          ? "whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                          : "whitespace-pre overflow-x-auto"
                      }`}
                    >
                      {tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokens.map((token, tIdx) => {
                          let tokenClass = "text-slate-200";
                          if (token.type === "keyword") tokenClass = "text-purple-400 font-semibold";
                          else if (token.type === "string") tokenClass = "text-amber-300";
                          else if (token.type === "literal") tokenClass = "text-cyan-300 font-medium";
                          else if (token.type === "type") tokenClass = "text-sky-300";
                          else if (token.type === "comment") tokenClass = "text-emerald-400/85 italic font-sans text-[11px] sm:text-xs";

                          return (
                            <span key={tIdx} className={tokenClass}>
                              {token.text}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Anti-Pattern Explanation Footer */}
            <div className="p-3.5 bg-rose-950/25 border-t border-rose-500/20 text-xs text-rose-200/90 leading-relaxed mt-auto">
              <strong className="text-rose-300 block mb-1 font-bold uppercase tracking-wider text-[11px]">
                ⚠️ Why This Fails:
              </strong>
              <p>{renderFormattedText(bad.explanation)}</p>
            </div>
          </div>

          {/* Right Column: Production Solution */}
          <div className="flex flex-col rounded-xl bg-emerald-950/10 border border-emerald-500/30 overflow-hidden shadow-lg shadow-emerald-950/20">
            <div className="h-10 px-3 sm:px-4 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wide truncate">
                  ✅ {good.title || "Production Solution"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(good.code, false)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
                title="Copy production solution code"
              >
                {goodCopied ? (
                  <>
                    <CheckIcon className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3 h-3 text-emerald-300" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code lines with line numbers */}
            <div className="flex-1 max-h-[48vh] sm:max-h-[54vh] overflow-y-auto p-3 sm:p-4 bg-[#060812] text-xs font-mono leading-relaxed text-slate-200 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              {goodLines.map((line, idx) => {
                const tokens = highlightLine(line);
                return (
                  <div key={idx} className="flex gap-3 min-h-[1.35rem] hover:bg-emerald-500/[0.04] rounded px-1 -mx-1 group">
                    <span className="select-none text-emerald-400/40 group-hover:text-emerald-400/70 font-mono text-xs w-7 sm:w-8 text-right shrink-0 pt-0.5 border-r border-emerald-500/20 pr-2 transition-colors">
                      {idx + 1}
                    </span>
                    <div
                      className={`flex-1 ${
                        isWrapped
                          ? "whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                          : "whitespace-pre overflow-x-auto"
                      }`}
                    >
                      {tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokens.map((token, tIdx) => {
                          let tokenClass = "text-slate-200";
                          if (token.type === "keyword") tokenClass = "text-purple-400 font-semibold";
                          else if (token.type === "string") tokenClass = "text-amber-300";
                          else if (token.type === "literal") tokenClass = "text-cyan-300 font-medium";
                          else if (token.type === "type") tokenClass = "text-sky-300";
                          else if (token.type === "comment") tokenClass = "text-emerald-400/85 italic font-sans text-[11px] sm:text-xs";

                          return (
                            <span key={tIdx} className={tokenClass}>
                              {token.text}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Production Solution Explanation Footer */}
            <div className="p-3.5 bg-emerald-950/25 border-t border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed mt-auto">
              <strong className="text-emerald-300 block mb-1 font-bold uppercase tracking-wider text-[11px]">
                🛡️ Production Solution Benefit:
              </strong>
              <p>{renderFormattedText(good.explanation)}</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0B0F1E] border-t border-white/[0.08] flex items-center justify-between text-xs select-none shrink-0">
          {whyItMatters ? (
            <div className="flex items-center gap-2 text-purple-200 truncate pr-4">
              <span className="text-purple-400 font-bold shrink-0">💡 Production Impact:</span>
              <span className="text-slate-300 truncate">{whyItMatters}</span>
            </div>
          ) : (
            <span className="text-slate-400">Architectural Side-by-Side Comparison</span>
          )}
          <span className="text-slate-500 text-[11px] shrink-0 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-300 border border-white/[0.08]">Esc</kbd> to return
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export interface DataDrivenLessonViewProps {
  trackKey: string;
  trackTitle: string;
  trackHref: string;
  lesson: {
    slug: string;
    code: string;
    title: string;
    subtitle?: string;
    minutes?: number;
    estimatedMinutes?: number;
    [key: string]: any;
  };
  content: StandardLessonContent;
  stageName?: string;
  prevLesson?: { slug: string; code: string; title: string } | null;
  nextLesson?: { slug: string; code: string; title: string } | null;
  onLessonComplete?: () => void;
  isInitiallyComplete?: boolean;
  playgroundRuntime?: "typescript" | "javascript" | "sql" | "json";
}

export function DataDrivenLessonView({
  trackKey,
  trackTitle,
  trackHref,
  lesson,
  content,
  stageName: _stageName,
  prevLesson: _prevLesson,
  nextLesson,
  onLessonComplete,
  isInitiallyComplete = false,
  playgroundRuntime = "typescript",
}: DataDrivenLessonViewProps): JSX.Element {
  // Normalize sections without forcing generic labels over topic-specific custom labels
  const sections = useMemo(() => {
    const rawSections = content.sections || [];
    return rawSections.map((sec, idx) => ({
      ...sec,
      label: sec.label || sec.title || `Part ${idx + 1}`,
      icon: sec.icon || (sec.id === "part7" ? "🎯" : sec.id === "part6" ? "🎓" : sec.id === "part5" ? "💻" : "📄"),
    }));
  }, [content.sections]);

  const {
    activeSection,
    completedSections,
    currentIndex,
    progressPercent,
    isLessonCompleted: _isLessonCompleted,
    setActiveSectionId,
    markSectionComplete,
    markSectionsUpToIndex,
    completeLesson,
    getStepState,
  } = useLessonProgress({
    trackKey,
    lessonSlug: lesson.slug,
    sections,
    onLessonCompleted: onLessonComplete,
    isLessonInitiallyComplete: isInitiallyComplete,
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);

  // Active section ref to prevent redundant re-renders during scrolling
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  // Initialize CSS variable fallback on mount if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.documentElement.style.getPropertyValue("--navbar-offset")) {
        document.documentElement.style.setProperty("--navbar-offset", "56px");
      }
    }
  }, []);

  // 1. Initial Hash Navigation: scroll to #part-X if present in URL
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash && hash.startsWith("#part-")) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        setTimeout(() => {
          targetEl.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }, 150);
      }
    }
  }, []);

  // 2. IntersectionObserver: Sticky scroll-spy & natural sequential progress tracking
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const getSectionByDomId = (domId: string) => {
      const match = domId.match(/^part-(\d+)$/);
      if (match) {
        const idx = parseInt(match[1], 10) - 1;
        return { section: sections[idx], index: idx };
      }
      return null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let bestCandidateDomId: string | null = null;
        let bestVisibleHeight = 0;

        for (const entry of entries) {
          const domId = entry.target.id;
          const intersectionHeight = entry.intersectionRect.height;

          if (entry.isIntersecting && intersectionHeight > bestVisibleHeight) {
            bestVisibleHeight = intersectionHeight;
            bestCandidateDomId = domId;
          }
        }

        // Update active section and advance progress smoothly as learner scrolls
        if (bestCandidateDomId) {
          const mapped = getSectionByDomId(bestCandidateDomId);
          if (mapped?.section) {
            if (mapped.section.id !== activeSectionRef.current) {
              setActiveSectionId(mapped.section.id);
              try {
                if (window.location.hash !== `#${bestCandidateDomId}`) {
                  window.history.replaceState(null, "", `#${bestCandidateDomId}`);
                }
              } catch {}
            }
            // Mark all parts up to the currently reached section as completed
            markSectionsUpToIndex(mapped.index);
          }
        }
      },
      {
        root: null,
        rootMargin: "-60px 0px -20% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    // Observe all sections
    for (let i = 1; i <= sections.length; i++) {
      const el = document.getElementById(`part-${i}`);
      if (el) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sections, markSectionsUpToIndex, setActiveSectionId]);

  // Global custom event navigation listener for shortcuts
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: "prev" | "next" }>;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (customEvent.detail?.direction === "prev" && currentIndex > 0) {
        const prevTarget = document.getElementById(`part-${currentIndex}`);
        if (prevTarget) {
          prevTarget.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          setActiveSectionId(sections[currentIndex - 1].id);
        }
      } else if (
        customEvent.detail?.direction === "next" &&
        currentIndex < sections.length - 1
      ) {
        const nextTarget = document.getElementById(`part-${currentIndex + 2}`);
        if (nextTarget) {
          nextTarget.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          setActiveSectionId(sections[currentIndex + 1].id);
        }
      }
    };

    window.addEventListener("learncraft-navigate", handleNavigate);
    return () => {
      window.removeEventListener("learncraft-navigate", handleNavigate);
    };
  }, [currentIndex, sections, setActiveSectionId]);

  const getTagColorClass = (color?: string) => {
    switch (color) {
      case "emerald":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "cyan":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      case "amber":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "rose":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "blue":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "indigo":
        return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      case "purple":
      default:
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    }
  };

  const getSectionLabel = (sec?: LessonSectionItem, defaultIdx?: number): string => {
    if (!sec) return defaultIdx !== undefined ? `Part ${defaultIdx + 1}` : "";
    return sec.label || sec.title || (defaultIdx !== undefined ? `Part ${defaultIdx + 1}` : "Part");
  };

  // Common section attributes: scrollMarginTop dynamically accounts for stepper height + offset
  const sectionProps = {
    style: { scrollMarginTop: "calc(var(--navbar-offset, 64px) + 76px)" },
    className: "scroll-mt-36 sm:scroll-mt-40 space-y-6",
  };

  // ─── Part 1: Overview & Real-Life Analogy ───────────────────────────────────
  const renderPart1 = (sec: LessonSectionItem, index: number) => {
    const title = content.part1?.title || sec.label || getSectionLabel(sec, index);
    const explanation = content.part1?.explanation || content.part1?.bigPicture;
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "✨"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · CORE CONCEPT`}</span>
            </div>
            <div className="flex items-center gap-2">
              {(content.difficulty || lesson.difficulty) && (
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  (content.difficulty || lesson.difficulty)?.toLowerCase() === "easy"
                    ? "text-emerald-400 bg-emerald-500/15 border-emerald-500/25"
                    : (content.difficulty || lesson.difficulty)?.toLowerCase() === "moderate"
                    ? "text-amber-400 bg-amber-500/15 border-amber-500/25"
                    : "text-rose-400 bg-rose-500/15 border-rose-500/25"
                }`}>
                  Difficulty: {(content.difficulty || lesson.difficulty)}
                </span>
              )}
              {isCompleted && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  ✓ Read
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {title}
          </h1>
          {explanation && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {explanation}
            </p>
          )}
        </div>

        {/* Core Code Snippet */}
        {content.part1?.codeSnippet && (
          <div className="pt-2">
            <CurriculumCardCode
              code={content.part1.codeSnippet}
              title="Code Example"
              defaultWrap={true}
              heightClass="min-h-[140px] max-h-[300px] h-auto"
            />
          </div>
        )}

        {/* Real-World Analogy Callout Box */}
        {content.part1?.analogy && (
          <div className="p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              <span>💡 Real-World Analogy</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {content.part1.analogy}
            </p>
          </div>
        )}

        {/* Architecture / Diagram */}
        {content.part1?.diagram && (
          <div className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.08] shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
              <span>📐 Architecture & Topology</span>
            </div>
            <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
              {content.part1.diagram}
            </pre>
          </div>
        )}

        {/* Standard Breakdown Items */}
        {content.part1?.breakdownItems && (
          <div className="p-6 rounded-2xl bg-[#090C14] border border-white/[0.08] shadow-lg relative overflow-hidden space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-purple-400">✨</span>
              <span>{content.part1.breakdownTitle || "Core Breakdown"}</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5 list-disc pl-5">
              {content.part1.breakdownItems.map((item, idx) => (
                <li key={idx}>
                  <strong className="text-white">{item.title}:</strong> {renderFormattedText(item.desc)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  };

  // ─── Part 2: Core Concepts & Mechanics ─────────────────────────────────────
  const renderPart2 = (sec: LessonSectionItem, index: number) => {
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "🧩"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · CORE MECHANICS`}</span>
            </div>
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Read
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {content.part2?.title || sec.label || getSectionLabel(sec, index)}
          </h2>
          {content.part2?.intro && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {content.part2.intro}
            </p>
          )}
        </div>

        {/* Concepts Grid */}
        {content.part2?.concepts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 items-stretch">
            {content.part2.concepts.map((concept, idx) => (
              <div
                key={idx}
                className="group relative p-5 rounded-2xl bg-[#090C14] border border-white/[0.08] hover:border-purple-500/30 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/[0.03]"
              >
                <div className="flex-1 flex flex-col mb-4">
                  <div className="inline-block font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border text-purple-400 bg-purple-500/10 border-purple-500/20 w-fit mb-2">
                    Concept {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                    {concept.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {renderFormattedText(concept.desc)}
                  </p>
                </div>
                {concept.codeSnippet && (
                  <div className="mt-auto w-full pt-1">
                    <CurriculumCardCode
                      code={concept.codeSnippet}
                      title="Example"
                      defaultWrap={true}
                      heightClass="h-[195px]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Standard Cards */}
        {content.part2?.cards && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4 items-stretch">
            {content.part2.cards.map((card: LessonContentCard, idx: number) => (
              <div
                key={idx}
                className="group relative p-5 rounded-2xl bg-[#090C14] border border-white/[0.08] hover:border-purple-500/30 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/[0.03]"
              >
                <div className="flex-1 flex flex-col mb-4">
                  <div className="mb-2">
                    <div
                      className={`inline-block font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border mb-2 ${getTagColorClass(
                        card.color
                      )}`}
                    >
                      {card.number} · {card.tag}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {renderFormattedText(card.description)}
                  </p>
                </div>
                {card.codeSnippet && (
                  <div className="mt-auto w-full pt-1">
                    <CurriculumCardCode
                      code={card.codeSnippet}
                      title="Example"
                      defaultWrap={true}
                      heightClass="h-[195px]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {content.part2?.rule && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs sm:text-sm">
            <strong className="text-white">
              {content.part2.rule.title}:
            </strong>{" "}
            {renderFormattedText(content.part2.rule.content)}
          </div>
        )}
      </section>
    );
  };

  // ─── Part 3: How It Works in Practice ──────────────────────────────────────
  const renderPart3 = (sec: LessonSectionItem, index: number) => {
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "🎯"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · DEEP DIVE & STRUCTURE`}</span>
            </div>
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Read
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {content.part3?.title || sec.label || getSectionLabel(sec, index)}
          </h2>
          {content.part3?.intro && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {content.part3.intro}
            </p>
          )}
        </div>

        {/* Deep Dives */}
        {content.part3?.deepDives && (
          <div className="space-y-4">
            {content.part3.deepDives.map((dive, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    {dive.heading}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {dive.content}
                </p>
                {dive.bulletPoints && dive.bulletPoints.length > 0 && (
                  <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc pl-5 pt-1">
                    {dive.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="leading-relaxed">
                        {bp}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Standard Points */}
        {content.part3?.points && (
          <div className="space-y-4">
            {content.part3.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white font-bold text-base">
                    {pt.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {renderFormattedText(pt.content)}
                </p>
                {pt.codeSnippet && (
                  <div className="pt-2">
                    <CurriculumCardCode
                      code={pt.codeSnippet}
                      title="Code Breakdown"
                      defaultWrap={true}
                      heightClass="min-h-[140px] max-h-[260px] h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Real-World Scenario Question & Easy-Word Answer */}
        {content.scenario && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/25 via-[#090C14] to-cyan-950/25 border border-purple-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-mono font-bold border border-purple-500/30">
                <span>🎯</span>
                <span>REAL-WORLD SCENARIO</span>
              </div>
              {(content.difficulty || lesson.difficulty) && (
                <span className="text-xs font-mono text-slate-400">
                  Difficulty: <strong className="text-purple-300">{content.difficulty || lesson.difficulty}</strong>
                </span>
              )}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {renderFormattedText(content.scenario.question)}
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/[0.08] border border-purple-500/25 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300 uppercase tracking-wide">
                <span>💡</span>
                <span>Simple Answer</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {renderFormattedText(content.scenario.answer)}
              </p>
            </div>
          </div>
        )}

        {/* Common Interview Question & Easy-English Sample Answer */}
        {content.interviewQuestion && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/25 via-[#090C14] to-purple-950/25 border border-amber-500/30 shadow-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
              <span>💼</span>
              <span>COMMON INTERVIEW QUESTION</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {renderFormattedText(content.interviewQuestion.question)}
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/25 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                <span>💬</span>
                <span>Sample Interview Answer (Easy English)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {renderFormattedText(content.interviewQuestion.answer)}
              </p>
            </div>
          </div>
        )}
      </section>
    );
  };

  // ─── Part 4: Bad Code vs Clean Code ────────────────────────────────────────
  const renderPart4 = (sec: LessonSectionItem, index: number) => {
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    const badComparison =
      content.part4?.bad ||
      (content.part4?.badApproach
        ? {
            title: content.part4.badApproach.title,
            code: content.part4.badApproach.code,
            explanation: content.part4.badApproach.flaw || "",
          }
        : undefined);

    const goodComparison =
      content.part4?.good ||
      (content.part4?.betterApproach
        ? {
            title: content.part4.betterApproach.title,
            code: content.part4.betterApproach.code,
            explanation: content.part4.betterApproach.benefit || "",
          }
        : undefined);

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "⚠️"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · PATTERNS & TRAPS`}</span>
            </div>
            <div className="flex items-center gap-2">
              {badComparison && goodComparison && (
                <button
                  type="button"
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 hover:text-white hover:border-purple-500/50 transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Expand side-by-side comparison (Esc to close)"
                >
                  <ExpandIcon className="w-3.5 h-3.5 text-purple-300" />
                  <span>Expand Side-by-Side</span>
                </button>
              )}
              {isCompleted && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  ✓ Read
                </span>
              )}
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {content.part4?.title || sec.label || getSectionLabel(sec, index)}
          </h2>
        </div>

        {/* Architectural Problem Callout */}
        {content.part4?.problem && (
          <div className="p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
            <span className="text-amber-400 font-bold text-base leading-none">⚠️</span>
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold uppercase tracking-wide text-xs">
                Core Architectural Challenge
              </strong>
              <p className="text-slate-300">{content.part4.problem}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Bad / Anti-Pattern */}
          {badComparison && (
            <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 flex flex-col h-full justify-between">
              <div className="space-y-3 flex-1 flex flex-col mb-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span>❌ {badComparison.title}</span>
                </div>
                <div className="mt-auto pt-1 w-full">
                  <CurriculumCardCode
                    code={badComparison.code}
                    title="Anti-Pattern"
                    modalTitle={`❌ Anti-Pattern: ${badComparison.title}`}
                    heightClass="h-[180px]"
                    defaultWrap={true}
                    showExpand={true}
                  />
                </div>
              </div>
              <p className="text-xs text-rose-300/80 leading-relaxed mt-auto">
                {renderFormattedText(badComparison.explanation)}
              </p>
            </div>
          )}

          {/* Good / Production Grade */}
          {goodComparison && (
            <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 flex flex-col h-full justify-between">
              <div className="space-y-3 flex-1 flex flex-col mb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>✅ {goodComparison.title}</span>
                </div>
                <div className="mt-auto pt-1 w-full">
                  <CurriculumCardCode
                    code={goodComparison.code}
                    title="Production Solution"
                    modalTitle={`✅ Production Solution: ${goodComparison.title}`}
                    heightClass="h-[180px]"
                    defaultWrap={true}
                    showExpand={true}
                  />
                </div>
              </div>
              <p className="text-xs text-emerald-300/80 leading-relaxed mt-auto">
                {renderFormattedText(goodComparison.explanation)}
              </p>
            </div>
          )}
        </div>

        {/* Why It Matters Callout */}
        {content.part4?.whyItMatters && (
          <div className="p-4 rounded-xl bg-purple-500/[0.08] border border-purple-500/20 text-purple-200 text-xs sm:text-sm flex items-start gap-2.5">
            <span className="text-purple-400 font-bold text-base leading-none">💡</span>
            <div>
              <strong className="text-purple-300 block mb-0.5 font-bold uppercase tracking-wide text-xs">
                Why This Matters in Production
              </strong>
              <p className="text-slate-300">{content.part4.whyItMatters}</p>
            </div>
          </div>
        )}

        {/* Side-by-Side Comparison Expand Modal */}
        {badComparison && goodComparison && (
          <SideBySideComparisonModal
            isOpen={isComparisonModalOpen}
            onClose={() => setIsComparisonModalOpen(false)}
            bad={badComparison}
            good={goodComparison}
            problem={content.part4?.problem}
            whyItMatters={content.part4?.whyItMatters}
          />
        )}
      </section>
    );
  };

  // ─── Part 5: Interactive Code Sandbox ──────────────────────────────────────
  const renderPart5 = (sec: LessonSectionItem, index: number) => {
    const effectiveRuntime = playgroundRuntime === "sql" ? "javascript" : playgroundRuntime;
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "⚡"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · INTERACTIVE SANDBOX`}</span>
            </div>
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Run Verified
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {content.part5?.title || sec.label || getSectionLabel(sec, index)}
          </h2>
          {content.part5?.intro && (
            <p className="text-sm text-slate-300 leading-relaxed">{content.part5.intro}</p>
          )}
        </div>

        <Playground
          key={lesson.slug}
          runtime={effectiveRuntime as any}
          starterCode={content.part5?.starterCode || ""}
          onRun={() => {
            markSectionComplete(sec.id);
          }}
        />
      </section>
    );
  };

  // ─── Part 6 / Takeaways Renderer ──────────────────────────────────────────
  const renderPart6 = (sec: LessonSectionItem, index: number) => {
    const takeaways = (sec.id === "part7" ? content.part7?.takeaways : content.part6?.takeaways) || content.part6?.takeaways || content.part7?.takeaways;
    const title = (sec.id === "part7" ? content.part7?.title : content.part6?.title) || sec.label || "Summary & Key Takeaways";
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "🎓"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · SUMMARY & KEY TAKEAWAYS`}</span>
            </div>
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Read
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {title || getSectionLabel(sec, index) || "Summary & Key Takeaways"}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Review the core mental models and best practices from {lesson.title}:
          </p>
        </div>

        {takeaways && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>✨</span> Key Takeaways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {takeaways.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-1"
                >
                  <strong className="text-white text-xs sm:text-sm block">
                    {item.title}
                  </strong>
                  <p className="text-xs text-slate-400">{renderFormattedText(item.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  };

  // ─── Part 7 / Quiz Renderer ──────────────────────────────────────────────
  const renderPart7 = (sec: LessonSectionItem, index: number) => {
    const quiz = (sec.id === "part6" ? content.part6?.quiz : content.part7?.quiz) || content.part7?.quiz || content.part6?.quiz || (content as any).quiz;
    const quizTitle = (sec.id === "part6" ? content.part6?.title : content.part7?.title) || sec.label || "Knowledge Check Quiz";
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "🎯"}</span>
              <span>{sec.tag ? `PART 0${index + 1} · ${sec.tag}` : `PART 0${index + 1} · KNOWLEDGE CHECK QUIZ`}</span>
            </div>
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Passed
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {quizTitle || "Check Your Understanding"}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Test your comprehension of {lesson.title} core principles:
          </p>
        </div>

        {quiz && (
          <div className="p-6 rounded-2xl bg-[#090C14] border border-white/[0.08] space-y-4">
            <h3 className="text-base font-bold text-white">
              {quiz.question}
            </h3>

            <div className="space-y-2">
              {quiz.options.map((option: string, idx: number) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === quiz.correctIndex;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedQuizAnswer(idx);
                      setQuizSubmitted(true);
                      if (isCorrect) {
                        markSectionComplete(sec.id);
                        recordActivity("exercise_pass", `Passed Quiz on ${lesson.title}`, {
                          lessonSlug: lesson.slug,
                          trackKey,
                        });
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-mono transition-all cursor-pointer flex items-center justify-between ${
                      quizSubmitted
                        ? isCorrect
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : isSelected
                          ? "bg-rose-500/20 border-rose-500 text-rose-300"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 opacity-60"
                        : isSelected
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{option}</span>
                    {quizSubmitted && isSelected && (
                      <span className="font-bold text-xs">
                        {isCorrect ? "✓ Correct! (+15 XP)" : "✗ Try again"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm animate-in fade-in duration-200 ${
                  selectedQuizAnswer === quiz.correctIndex
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                }`}
              >
                <strong className="block mb-1">
                  {selectedQuizAnswer === quiz.correctIndex
                    ? "🎉 Excellent!"
                    : "💡 Explanation:"}
                </strong>
                <p>{quiz.explanation}</p>
              </div>
            )}

            {/* Extended Assessment CTA */}
            <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs">
              <span className="text-slate-400">Ready for full code prediction & challenge questions?</span>
              <Link
                href={`/quiz/${trackKey}/${lesson.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 font-bold transition-all cursor-pointer"
              >
                <span>Take Full {lesson.code} Quiz</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </section>
    );
  };

  // ─── End of Page: Single "Next lesson →" button ─────────────────────────────
  const renderEndOfPageCTA = () => {
    const nextLessonUrl = nextLesson ? `${trackHref}/${nextLesson.slug}` : trackHref;

    return (
      <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          <span className="text-emerald-400 font-medium flex items-center gap-1.5">
            <span>✓</span> All {sections.length} parts completed! Ready for the next lesson.
          </span>
        </div>

        {nextLesson ? (
          <Link
            href={nextLessonUrl}
            onClick={() => {
              completeLesson();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 cursor-pointer hover:scale-[1.02]"
          >
            <span>Next lesson →</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              completeLesson();
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 cursor-pointer hover:scale-[1.02]"
          >
            <span>Complete Course 🎓</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <div className="relative z-10 max-w-6xl xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Modern Glassmorphic Module Header & Breadcrumb Bar */}
        <div className="mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-md shadow-lg shadow-black/20 hover:border-white/[0.12] transition-colors">
          {/* Left: Interactive Breadcrumb Navigation */}
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <Link
              href={trackHref}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-purple-500/15 border border-white/[0.08] hover:border-purple-500/30 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-300 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>{trackTitle} Curriculum</span>
            </Link>

            {_stageName && (
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-3 h-3 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span className="text-xs text-slate-400 font-medium truncate max-w-[140px] sm:max-w-[200px]" title={_stageName}>
                  {_stageName}
                </span>
              </div>
            )}

            <div className="hidden lg:flex items-center gap-2 min-w-0">
              <svg className="w-3 h-3 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-xs text-slate-200 font-semibold truncate max-w-[220px]" title={lesson.title}>
                {lesson.title}
              </span>
            </div>
          </div>

          {/* Right: Cohesive Metadata Badges Cluster */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Lesson Code Pill */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-mono text-[11px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/25 shadow-sm shadow-purple-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>{lesson.code}</span>
            </span>

            {/* Difficulty Pill */}
            {(content.difficulty || lesson.difficulty) && (() => {
              const diff = (content.difficulty || lesson.difficulty);
              const isEasy = diff?.toLowerCase() === "easy";
              const isModerate = diff?.toLowerCase() === "moderate";
              return (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-mono text-[11px] font-bold border shadow-sm ${
                  isEasy
                    ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/25 shadow-emerald-500/5"
                    : isModerate
                    ? "text-amber-300 bg-amber-500/10 border-amber-500/25 shadow-amber-500/5"
                    : "text-rose-300 bg-rose-500/10 border-rose-500/25 shadow-rose-500/5"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isEasy ? "bg-emerald-400" : isModerate ? "bg-amber-400" : "bg-rose-400"
                  }`} />
                  <span>{diff}</span>
                </span>
              );
            })()}

            {/* Reading / Study Time Pill */}
            {lesson.minutes && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-mono text-[11px] font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] shadow-sm">
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{lesson.minutes} min</span>
              </span>
            )}
          </div>
        </div>

        {/* Floating Sticky PartStepper */}
        <PartStepper
          sections={sections}
          activeSectionId={activeSection}
          currentIndex={currentIndex}
          onSelectPart={(secId) => {
            setActiveSectionId(secId);
          }}
          getStepState={getStepState}
          progressPercent={progressPercent}
          getPartTitle={getSectionLabel}
          floating={true}
          className="mb-6"
        />

        {/* Focused Centered Lesson Card */}
        <main className="w-full flex flex-col rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative">
          {/* Card Content: Dynamic Sections rendered in configured order */}
          <div className="p-6 sm:p-8 lg:p-10 flex-1 space-y-12 sm:space-y-14">
            {sections.map((sec, idx) => {
              let partNode: JSX.Element | null = null;
              if (sec.id === "part1") partNode = renderPart1(sec, idx);
              else if (sec.id === "part2") partNode = renderPart2(sec, idx);
              else if (sec.id === "part3") partNode = renderPart3(sec, idx);
              else if (sec.id === "part4") partNode = renderPart4(sec, idx);
              else if (sec.id === "part5") partNode = renderPart5(sec, idx);
              else if (sec.id === "part6") {
                partNode = content.part6?.quiz ? renderPart7(sec, idx) : renderPart6(sec, idx);
              } else if (sec.id === "part7") {
                partNode = content.part7?.takeaways ? renderPart6(sec, idx) : renderPart7(sec, idx);
              }

              if (!partNode) return null;

              return (
                <div key={sec.id}>
                  {idx > 0 && <hr className="border-t border-white/[0.08] mb-12 sm:mb-14" />}
                  {partNode}
                </div>
              );
            })}

            {/* End of Page Next Lesson CTA */}
            {renderEndOfPageCTA()}
          </div>
        </main>
      </div>
    </InteractiveGrid>
  );
}
