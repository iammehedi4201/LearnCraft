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
import { LessonNotesDrawer } from "./LessonNotesDrawer";
import { CodeBookmarkButton } from "./CodeBookmarkButton";

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
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  // Global hotkey: Ctrl+J or Cmd+J opens notes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsNotesOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      case "part1":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#090C14] border border-purple-500/20 space-y-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">✨</span>
                  <span>The Big Picture</span>
                </h3>
                <p>{content.part1?.bigPicture}</p>
              </div>

              {content.part1?.breakdownItems && (
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white">
                    {content.part1.breakdownTitle || "Core Breakdown"}
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-slate-300">
                    {content.part1.breakdownItems.map((item, idx) => (
                      <li key={idx}>
                        <strong className="text-white">{item.title}:</strong>{" "}
                        {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        );

      // ─── Part 2: Core Mechanics & Concept Cards ────────────────────────────
      case "part2":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {content.part2?.title}
              </h3>
              <p>{content.part2?.intro}</p>

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
            </div>
          </section>
        );

      // ─── Part 3: Deep Dive & Code Examples ─────────────────────────────────
      case "part3":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {content.part3?.title}
              </h3>
              <p>{content.part3?.intro}</p>

              {content.part3?.points && (
                <div className="space-y-3">
                  {content.part3.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-1"
                    >
                      <span className="text-white font-bold block">
                        {pt.title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {pt.content}
                      </p>
                      {pt.codeSnippet && (
                        <pre className="text-xs bg-black/40 p-3 rounded-lg border border-white/[0.06] text-purple-300 font-mono overflow-x-auto mt-2">
                          {pt.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      // ─── Part 4: Design Patterns (Anti-pattern vs Production) ──────────────
      case "part4":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {content.part4?.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Bad / Anti-Pattern */}
                {content.part4?.bad && (
                  <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                        <span>❌ {content.part4.bad.title}</span>
                      </div>
                      <pre className="text-xs bg-[#090C14] p-3 rounded-xl border border-rose-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                        {content.part4.bad.code}
                      </pre>
                    </div>
                    <p className="text-xs text-rose-300/80 leading-relaxed">
                      {content.part4.bad.explanation}
                    </p>
                  </div>
                )}

                {/* Good / Production Grade */}
                {content.part4?.good && (
                  <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                          <span>✅ {content.part4.good.title}</span>
                        </div>
                        <CodeBookmarkButton
                          trackKey={trackKey}
                          lessonSlug={lesson.slug}
                          title={`${lesson.title}: ${content.part4.good.title}`}
                          code={content.part4.good.code}
                          language="typescript"
                          sectionId="part4"
                        />
                      </div>
                      <pre className="text-xs bg-[#090C14] p-3 rounded-xl border border-emerald-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                        {content.part4.good.code}
                      </pre>
                    </div>
                    <p className="text-xs text-emerald-300/80 leading-relaxed">
                      {content.part4.good.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      // ─── Part 5: Interactive Code Sandbox ──────────────────────────────────
      case "part5":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white">
                  {content.part5?.title}
                </h3>
                {content.part5?.starterCode && (
                  <CodeBookmarkButton
                    trackKey={trackKey}
                    lessonSlug={lesson.slug}
                    title={`${lesson.title}: Starter Code Sandbox`}
                    code={content.part5.starterCode}
                    language={playgroundRuntime}
                    sectionId="part5"
                  />
                )}
              </div>
              <p className="text-sm text-slate-300">{content.part5?.intro}</p>
              <Playground
                key={`${lesson.slug}-${activeSection}`}
                runtime={playgroundRuntime as any}
                starterCode={content.part5?.starterCode || ""}
              />
            </div>
          </section>
        );

      // ─── Part 6: Knowledge Check Interactive Quiz ──────────────────────────
      case "part6":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex)}
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">
                {content.part6?.title}
              </h3>
              {content.part6?.quiz && (
                <div className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-4">
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {content.part6.quiz.question}
                  </p>

                  <div className="space-y-2">
                    {content.part6.quiz.options.map((option, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect =
                        idx === content.part6.quiz.correctIndex;

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
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                            quizSubmitted
                              ? isCorrect
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                                : isSelected
                                ? "bg-rose-500/15 border-rose-500/40 text-rose-300"
                                : "bg-white/[0.02] border-white/[0.06] text-slate-400 opacity-60"
                              : isSelected
                              ? "bg-purple-600/20 border-purple-500 text-white"
                              : "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] text-slate-300 hover:text-white"
                          }`}
                        >
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-3.5 rounded-xl text-xs sm:text-sm animate-in fade-in duration-200 ${
                        selectedQuizAnswer === content.part6.quiz.correctIndex
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/10 border border-rose-500/20 text-rose-300"
                      }`}
                    >
                      <strong className="block mb-1">
                        {selectedQuizAnswer === content.part6.quiz.correctIndex
                          ? "🎉 Correct! +15 XP"
                          : "💡 Not quite:"}
                      </strong>
                      <p>{content.part6.quiz.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );

      // ─── Part 7: Summary & Progression ─────────────────────────────────────
      case "part7":
      default:
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {getSectionLabel(sections[currentIndex], currentIndex) || "Summary & Progression"}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              {content.part7?.takeaways && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🎓</span> Key Takeaways
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
            </div>
          </section>
        );
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-200 relative selection:bg-purple-500/30 selection:text-white">
      <Nav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-6">
        {/* Breadcrumb & Stage Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link
              href={trackHref}
              className="hover:text-purple-400 transition-colors"
            >
              {trackTitle}
            </Link>
            <span>/</span>
            <span className="text-purple-400 font-bold">{lesson.code}</span>
            {stageName && (
              <>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline text-slate-400">
                  {stageName}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsNotesOpen(true)}
              className="px-3 py-1 rounded-lg text-[11px] font-bold bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Open Notes & Bookmarks Drawer (Ctrl+J)"
            >
              <span>📝</span>
              <span>Notes & Bookmarks</span>
              <span className="hidden sm:inline text-[10px] opacity-60 font-mono">Ctrl+J</span>
            </button>
            {(lesson.minutes || lesson.estimatedMinutes) && (
              <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                ⏱️ {lesson.minutes || lesson.estimatedMinutes} min
              </span>
            )}
            {isLessonCompleted && (
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                <span>✓</span> Completed
              </span>
            )}
          </div>
        </div>

        {/* Lesson Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E121B] to-[#121724] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {lesson.code}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lesson.title}
            </h1>
            {lesson.subtitle && (
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {lesson.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Section Tabs Navigator */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/[0.06]">
          {sections.map((sec, idx) => {
            const stepState = getStepState(idx);
            const isActive = sec.id === activeSection;

            return (
              <button
                key={sec.id}
                onClick={() => handleSectionChange(sec.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : stepState === "done"
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                }`}
              >
                <span>{sec.icon || "📖"}</span>
                <span>{getSectionLabel(sec, idx)}</span>
                {stepState === "done" && !isActive && (
                  <span className="text-[10px] font-mono text-emerald-400">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Two-Column Layout: Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3 space-y-6">
            {renderSectionContent()}

            {/* In-lesson Footer Stepper */}
            <div className="p-4 rounded-2xl bg-[#0E121B] border border-white/[0.08] flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:hover:bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                &larr; Previous Part
              </button>

              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {completedSectionsCount} of {sections.length} parts done
              </span>

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
              >
                {currentIndex < sections.length - 1
                  ? "Next Part →"
                  : "Complete Lesson ✓"}
              </button>
            </div>
          </div>

          {/* Quick Nav Sidebar */}
          <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
            <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4 shadow-xl">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Lesson Progress</span>
                  <span className="font-mono text-purple-400 font-bold">
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Parts in this lesson:
                </span>
                {sections.map((sec, idx) => {
                  const isActive = sec.id === activeSection;
                  const stepState = getStepState(idx);

                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSectionChange(sec.id)}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isActive
                          ? "bg-purple-600/20 text-purple-200 border border-purple-500/30 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="truncate pr-2">
                        {idx + 1}. {getSectionLabel(sec, idx)}
                      </span>
                      {stepState === "done" && (
                        <span className="text-emerald-400 text-[10px]">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsNotesOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>📝</span>
                <span>Take Notes & Bookmarks</span>
              </button>

              {!isLessonCompleted && (
                <button
                  onClick={completeLesson}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 border border-white/[0.08] hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Mark Lesson Complete
                </button>
              )}
            </div>

            {/* Track Navigation (Prev / Next Lesson Links) */}
            <div className="p-4 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Course Track Navigation
              </span>
              <div className="flex items-center justify-between gap-2 pt-1">
                {prevLesson ? (
                  <Link
                    href={`${trackHref}/${prevLesson.slug}`}
                    className="text-xs text-slate-400 hover:text-white truncate flex items-center gap-1"
                    title={prevLesson.title}
                  >
                    <span>&larr;</span>
                    <span className="truncate">{prevLesson.code}</span>
                  </Link>
                ) : (
                  <span className="text-xs text-slate-600">Start</span>
                )}

                {nextLesson && (
                  <Link
                    href={`${trackHref}/${nextLesson.slug}`}
                    className="text-xs text-purple-400 hover:text-purple-300 truncate flex items-center gap-1 font-bold"
                    title={nextLesson.title}
                  >
                    <span className="truncate">{nextLesson.code}</span>
                    <span>&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Notes & Bookmarks Button (Bottom Right) */}
      <button
        onClick={() => setIsNotesOpen(true)}
        title="Open Notes & Bookmarks Drawer (Ctrl+J)"
        className="fixed bottom-6 right-6 z-40 px-3.5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 border border-white/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <span className="text-base">📝</span>
        <span className="text-xs font-bold hidden sm:inline">Notes</span>
      </button>

      {/* Interactive Notes & Bookmarks Slide-Over Drawer */}
      <LessonNotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        trackKey={trackKey}
        trackTitle={trackTitle}
        lessonSlug={lesson.slug}
        lessonTitle={lesson.title}
        activeSectionId={activeSection}
        activeSectionLabel={getSectionLabel(sections[currentIndex], currentIndex)}
      />
    </InteractiveGrid>
  );
}
