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
    isLessonCompleted,
    setActiveSectionId,
    markSectionComplete,
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

  // 2. IntersectionObserver: Sticky scroll-spy & 1.5s reading timer completion
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const timers: Record<string, NodeJS.Timeout> = {};

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

          // Reading completion tracking: 60% visible for 1.5s
          // (Only triggers for conceptual reading parts; interactive sandbox & quiz require explicit action)
          const mapped = getSectionByDomId(domId);
          const secId = mapped?.section?.id;
          const secIdx = mapped?.index ?? -1;

          // Sequential check: cannot complete reading for a section if previous sections are not completed!
          const canReadComplete =
            secIdx >= 0 &&
            sections.slice(0, secIdx).every((s) => completedSections.has(s.id));

          if (
            secId &&
            secId !== "part5" &&
            secId !== "part7" &&
            !completedSections.has(secId) &&
            canReadComplete
          ) {
            const isMostlyVisible =
              entry.isIntersecting &&
              (entry.intersectionRatio >= 0.55 ||
                entry.intersectionRect.height / (window.innerHeight || 800) >= 0.5);

            if (isMostlyVisible) {
              if (!timers[domId]) {
                timers[domId] = setTimeout(() => {
                  markSectionComplete(secId);
                  delete timers[domId];
                }, 1500);
              }
            } else {
              if (timers[domId]) {
                clearTimeout(timers[domId]);
                delete timers[domId];
              }
            }
          }
        }

        // Update active section only when changed (Performance requirement)
        if (bestCandidateDomId) {
          const mapped = getSectionByDomId(bestCandidateDomId);
          if (mapped?.section && mapped.section.id !== activeSectionRef.current) {
            setActiveSectionId(mapped.section.id);
            try {
              if (window.location.hash !== `#${bestCandidateDomId}`) {
                window.history.replaceState(null, "", `#${bestCandidateDomId}`);
              }
            } catch {}
          }
        }
      },
      {
        root: null,
        // Match the sticky stepper height (~66px) when scrolling through sections
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.25, 0.55, 0.75, 1.0],
      }
    );

    // Observe all 7 sections
    for (let i = 1; i <= sections.length; i++) {
      const el = document.getElementById(`part-${i}`);
      if (el) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
      Object.values(timers).forEach((t) => clearTimeout(t));
    };
  }, [sections, completedSections, markSectionComplete, setActiveSectionId]);

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
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Read
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {title}
          </h2>
          {explanation && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {explanation}
            </p>
          )}
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {content.part2.concepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3 flex flex-col justify-between hover:border-purple-500/30 transition-colors"
              >
                <div className="space-y-2">
                  <div className="inline-block font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border text-purple-400 bg-purple-500/10 border-purple-500/20">
                    Concept {idx + 1}
                  </div>
                  <div className="text-base font-bold text-white">
                    {concept.name}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {renderFormattedText(concept.desc)}
                  </p>
                </div>
                {concept.codeSnippet && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Example</span>
                    </div>
                    <pre className="text-xs bg-black/60 p-3 rounded-xl border border-white/[0.06] text-purple-300 font-mono overflow-x-auto leading-relaxed">
                      {concept.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Standard Cards */}
        {content.part2?.cards && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {content.part2.cards.map((card: LessonContentCard, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2 flex flex-col justify-between hover:border-purple-500/30 transition-colors"
              >
                <div>
                  <div
                    className={`inline-block font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border mb-2 ${getTagColorClass(
                      card.color
                    )}`}
                  >
                    {card.number} · {card.tag}
                  </div>
                  <div className="text-base font-bold text-white">
                    {card.title}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {renderFormattedText(card.description)}
                </p>
                {card.codeSnippet && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Example</span>
                    </div>
                    <pre className="text-xs bg-black/60 p-3 rounded-xl border border-white/[0.06] text-purple-300 font-mono overflow-x-auto leading-relaxed">
                      {card.codeSnippet}
                    </pre>
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

  // ─── Part 3: Mental Model & Structure ──────────────────────────────────────
  const renderPart3 = (sec: LessonSectionItem, index: number) => {
    const isCompleted = completedSections.has(sec.id);
    const domId = `part-${index + 1}`;

    return (
      <section id={domId} data-section-id={sec.id} {...sectionProps}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
              <span>{sec.icon || "🧠"}</span>
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
                  <pre className="text-xs bg-black/50 p-4 rounded-xl border border-white/[0.06] text-purple-300 font-mono overflow-x-auto mt-2 leading-relaxed">
                    {pt.codeSnippet}
                  </pre>
                )}
              </div>
            ))}
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
            {isCompleted && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                ✓ Read
              </span>
            )}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bad / Anti-Pattern */}
          {badComparison && (
            <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <span>❌ {badComparison.title}</span>
                </div>
                <pre className="text-xs bg-[#090C14] p-3 rounded-xl border border-rose-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                  {badComparison.code}
                </pre>
              </div>
              <p className="text-xs text-rose-300/80 leading-relaxed">
                {renderFormattedText(badComparison.explanation)}
              </p>
            </div>
          )}

          {/* Good / Production Grade */}
          {goodComparison && (
            <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>✅ {goodComparison.title}</span>
                </div>
                <pre className="text-xs bg-[#090C14] p-3 rounded-xl border border-emerald-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                  {goodComparison.code}
                </pre>
              </div>
              <p className="text-xs text-emerald-300/80 leading-relaxed">
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

  // ─── Part 6: Summary & Key Takeaways ──────────────────────────────────────
  const renderPart6 = (sec: LessonSectionItem, index: number) => {
    const takeaways = content.part6?.takeaways || content.part7?.takeaways;
    const title = content.part6?.takeaways
      ? (content.part6?.title || sec.label || "Summary & Key Takeaways")
      : content.part7?.title && !content.part7.title.toLowerCase().includes("quiz")
      ? content.part7.title
      : sec.label || "Summary & Key Takeaways";
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

  // ─── Part 7: Knowledge Check Quiz ──────────────────────────────────────────
  const renderPart7 = (sec: LessonSectionItem, index: number) => {
    const quiz = content.part7?.quiz || content.part6?.quiz || (content as any).quiz;
    const quizTitle = content.part7?.quiz
      ? (content.part7?.title || sec.label || "Knowledge Check Quiz")
      : content.part6?.quiz
      ? (content.part6?.title || sec.label || "Knowledge Check Quiz")
      : sec.label || "Knowledge Check Quiz";
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
    const allPartsCompleted =
      sections.length > 0 && completedSections.size >= sections.length;
    const canProceed = isLessonCompleted || allPartsCompleted;
    const nextLessonUrl = nextLesson ? `${trackHref}/${nextLesson.slug}` : trackHref;

    return (
      <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          {canProceed ? (
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span>✓</span> All {sections.length} parts completed! Ready for the next lesson.
            </span>
          ) : (
            <span>
              Complete all {sections.length} parts to unlock the next lesson ({completedSections.size}/{sections.length} completed).
            </span>
          )}
        </div>

        {nextLesson ? (
          <Link
            href={nextLessonUrl}
            onClick={() => {
              if (canProceed) completeLesson();
            }}
            aria-disabled={!canProceed}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              canProceed
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 cursor-pointer hover:scale-[1.02]"
                : "bg-white/[0.06] text-slate-500 border border-white/[0.06] cursor-not-allowed opacity-60"
            }`}
          >
            <span>Next lesson →</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (canProceed) completeLesson();
            }}
            disabled={!canProceed}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              canProceed
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 cursor-pointer hover:scale-[1.02]"
                : "bg-white/[0.06] text-slate-500 border border-white/[0.06] cursor-not-allowed opacity-60"
            }`}
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
        {/* Module Header & Breadcrumb Row */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link
            href={trackHref}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors font-medium group"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>{trackTitle} Curriculum</span>
          </Link>
          <div className="flex items-center gap-2">
            {_stageName && (
              <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                {_stageName} ·
              </span>
            )}
            <span className="text-[10px] font-mono text-purple-300 font-bold bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/25">
              {lesson.code}
            </span>
            <span className="text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-lg md:max-w-xl">
              {lesson.title}
            </span>
            {lesson.minutes && (
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                ⏱️ {lesson.minutes} min
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
              else if (sec.id === "part6") partNode = renderPart6(sec, idx);
              else if (sec.id === "part7") partNode = renderPart7(sec, idx);

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
