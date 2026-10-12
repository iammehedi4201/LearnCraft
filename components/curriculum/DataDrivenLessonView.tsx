"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DATA-DRIVEN LESSON VIEW ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal, responsive, high-aesthetic curriculum lesson renderer.
 * Eliminates thousands of lines of copy-pasted UI across all learning modules.
 * Includes interactive section stepper, live code sandbox playground,
 * bad vs good architecture comparisons, and XP-awarding interactive quizzes.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect } from "react";
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
import { LayoutGrid } from "@/app/learn/nextjs/components/icons";

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
  stageName,
  prevLesson,
  nextLesson,
  onLessonComplete,
  isInitiallyComplete = false,
  playgroundRuntime = "typescript",
}: DataDrivenLessonViewProps): JSX.Element {
  const sections = content.sections || [];

  const {
    isAuthenticated,
    activeSection,
    currentIndex,
    progressPercent,
    completedSectionsCount,
    isLessonCompleted,
    handleSectionChange,
    handlePrev,
    handleNext,
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

  // Reset quiz state when section changes
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  }, [activeSection, lesson.slug]);

  // Scroll to top of lesson content on section switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  // Global custom event navigation listener
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: "prev" | "next" }>;
      if (customEvent.detail?.direction === "prev" && currentIndex > 0) {
        handleSectionChange(sections[currentIndex - 1].id);
      } else if (
        customEvent.detail?.direction === "next" &&
        currentIndex < sections.length - 1
      ) {
        handleSectionChange(sections[currentIndex + 1].id);
      }
    };

    window.addEventListener("learncraft-navigate", handleNavigate);
    return () => {
      window.removeEventListener("learncraft-navigate", handleNavigate);
    };
  }, [currentIndex, sections, handleSectionChange]);

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
    return sec.label || sec.title || (defaultIdx !== undefined ? `Part ${defaultIdx + 1}` : "Section");
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      // ─── Part 1: The Big Picture & Architecture Breakdown ─────────────────
      case "part1": {
        const title = content.part1?.title || getSectionLabel(sections[currentIndex], currentIndex);
        const explanation = content.part1?.explanation || content.part1?.bigPicture;
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>✨</span>
                <span>PART 01 · CORE CONCEPT</span>
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

            {/* PostgreSQL Analogy Callout Box */}
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

            {/* PostgreSQL Architecture / Relational Diagram */}
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
                      <strong className="text-white">{item.title}:</strong> {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      }

      // ─── Part 2: Core Mechanics & Concept Cards ────────────────────────────
      case "part2":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>🧩</span>
                <span>PART 02 · CORE MECHANICS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {content.part2?.title || getSectionLabel(sections[currentIndex], currentIndex)}
              </h2>
              {content.part2?.intro && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {content.part2.intro}
                </p>
              )}
            </div>

            {/* PostgreSQL Concepts */}
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
                        {concept.desc}
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
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {content.part2?.rule && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs sm:text-sm">
                <strong className="text-white">
                  {content.part2.rule.title}:
                </strong>{" "}
                {content.part2.rule.content}
              </div>
            )}
          </section>
        );

      // ─── Part 3: Deep Dive & Code Examples ─────────────────────────────────
      case "part3":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>💻</span>
                <span>PART 03 · DEEP DIVE & CODE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {content.part3?.title || getSectionLabel(sections[currentIndex], currentIndex)}
              </h2>
              {content.part3?.intro && (
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {content.part3.intro}
                </p>
              )}
            </div>

            {/* PostgreSQL Deep Dives */}
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
                      {pt.content}
                    </p>
                    {pt.codeSnippet && (
                      <pre className="text-xs bg-black/50 p-4 rounded-xl border border-white/[0.06] text-purple-300 font-mono overflow-x-auto mt-2">
                        {pt.codeSnippet}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        );

      // ─── Part 4: Design Patterns (Anti-pattern vs Production) ──────────────
      case "part4": {
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
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>⚠️</span>
                <span>PART 04 · PATTERNS & TRAPS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {content.part4?.title || getSectionLabel(sections[currentIndex], currentIndex)}
              </h2>
            </div>

            {/* PostgreSQL Architectural Problem Callout */}
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
                    {badComparison.explanation}
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
                    {goodComparison.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* PostgreSQL Why It Matters Callout */}
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
      }

      // ─── Part 5: Interactive Code Sandbox ──────────────────────────────────
      case "part5": {
        const effectiveRuntime = playgroundRuntime === "sql" ? "javascript" : playgroundRuntime;
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>⚡</span>
                <span>PART 05 · INTERACTIVE SANDBOX</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {content.part5?.title || getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
              {content.part5?.intro && (
                <p className="text-sm text-slate-300 leading-relaxed">{content.part5.intro}</p>
              )}
            </div>

            <Playground
              key={`${lesson.slug}-${activeSection}`}
              runtime={effectiveRuntime as any}
              starterCode={content.part5?.starterCode || ""}
            />
          </section>
        );
      }

      // ─── Part 6: Knowledge Check Interactive Quiz ──────────────────────────
      case "part6": {
        const quiz = content.part6?.quiz;
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>🧠</span>
                <span>PART 06 · KNOWLEDGE CHECK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {content.part6?.title || "Check Your Understanding"}
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
                  {quiz.options.map((option, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === quiz.correctIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedQuizAnswer(idx);
                          setQuizSubmitted(true);
                          if (isCorrect) {
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
              </div>
            )}
          </section>
        );
      }

      // ─── Part 7: Summary & Progression ─────────────────────────────────────
      case "part7":
      default:
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <span>🎓</span>
                <span>PART 07 · SUMMARY & NEXT STEPS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {content.part7?.title || getSectionLabel(sections[currentIndex], currentIndex) || "Summary & Progression"}
              </h2>
            </div>

            {content.part7?.takeaways && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>✨</span> Key Takeaways
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.part7.takeaways.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-1"
                    >
                      <strong className="text-white text-xs sm:text-sm block">
                        {item.title}
                      </strong>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.part7?.nextLessonPreview && nextLesson && (
              <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Up Next: {nextLesson.code}
                </div>
                <h4 className="text-base font-bold text-white">
                  {nextLesson.title}
                </h4>
                <p className="text-xs text-purple-200/80">
                  {content.part7.nextLessonPreview.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href={`${trackHref}/${nextLesson.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>Proceed to {nextLesson.code}</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            )}
          </section>
        );
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* 2-Column Layout: Sidebar Stepper + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 max-h-[calc(100vh-7rem)] flex flex-col border border-white/[0.08] rounded-2xl bg-[#0E121B] p-4 shadow-xl">
            {/* Header */}
            <div className="px-2 mb-3 shrink-0 flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                {lesson.code} Modules
              </p>
              <span className="shrink-0 whitespace-nowrap text-[10px] font-mono text-purple-300 font-bold bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/25 leading-normal">
                {sections.length} parts
              </span>
            </div>

            {/* Stepper (Scrollable List) */}
            <nav className="flex-1 overflow-y-auto pr-1 space-y-1">
              <ol className="space-y-1.5 relative">
                {sections.map((section, index) => {
                  const state = getStepState(index);
                  const isActive = section.id === activeSection;
                  const isDone = state === "done";
                  const isTodo = state === "todo";

                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionChange(section.id)}
                        disabled={isAuthenticated && isTodo && index > currentIndex + 1}
                        className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                          isActive
                            ? "bg-purple-600/15 border border-purple-500/40 shadow-sm shadow-purple-600/10"
                            : isDone
                            ? "hover:bg-white/[0.04]"
                            : !isAuthenticated
                            ? "hover:bg-white/[0.04]"
                            : "opacity-40 cursor-not-allowed"
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
                              <polyline points="2,7 5.5,10.5 12,3.5" />
                            </svg>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        {/* Label area */}
                        <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                          <span
                            className={`text-xs font-semibold leading-tight truncate transition-colors duration-200 ${
                              isActive
                                ? "text-purple-300 font-bold"
                                : isDone
                                ? "text-slate-200 group-hover:text-purple-300"
                                : "text-slate-400 group-hover:text-slate-200"
                            }`}
                          >
                            {getSectionLabel(section, index)}
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
                          <div className="ml-auto w-2 h-2 rounded-full bg-purple-400 shrink-0 animate-pulse" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Progress box */}
            <div className="mt-4 shrink-0 px-4 py-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  PROGRESS
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {`${progressPercent}%`}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out bg-purple-600"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                {`${completedSectionsCount} of ${sections.length} parts completed`}
              </p>
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-3 shrink-0 flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex-1 py-2 rounded-xl text-xs font-bold border border-white/[0.08] text-slate-300 bg-white/[0.02] hover:bg-white/[0.06] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                ← Prev
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-purple-600/20 cursor-pointer"
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
                href={trackHref}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-300 transition-colors font-medium"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{trackTitle} Curriculum</span>
              </Link>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 min-w-0 max-w-5xl space-y-8">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-8">
              <header className="space-y-2 border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    {lesson.code}
                  </span>
                  {stageName && (
                    <span className="text-[11px] font-mono text-purple-300/70 border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 rounded-full">
                      {stageName}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">
                    {getSectionLabel(sections[currentIndex], currentIndex)}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {lesson.title}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lesson.subtitle || lesson.description}
                </p>
              </header>

              {renderSectionContent()}
            </div>

            {/* Footer Navigation Bar */}
            <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-xl flex items-center justify-between gap-4">
              {/* Left Side: Previous Lesson */}
              <div>
                {prevLesson ? (
                  <Link
                    href={`${trackHref}/${prevLesson.slug}`}
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-white/[0.08] text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] transition-colors flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>Previous: {prevLesson.code}</span>
                  </Link>
                ) : (
                  <span className="text-xs font-mono text-slate-500 px-3 py-2">Start of Course</span>
                )}
              </div>

              {/* Right Side: Next Lesson (Automatically marks lesson complete when proceeding) */}
              <div>
                {nextLesson ? (
                  <Link
                    href={`${trackHref}/${nextLesson.slug}`}
                    onClick={() => completeLesson()}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600/20 hover:bg-purple-600/35 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-2 font-mono cursor-pointer"
                  >
                    <span>Next: {nextLesson.code}</span>
                    <span>→</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => completeLesson()}
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
                  >
                    <span>Course Completed 🎓</span>
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
