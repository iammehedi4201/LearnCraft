"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  Sparkles,
  CheckCircle2,
} from "../components/icons";
import {
  getLessonBySlug,
  getStageByLessonSlug,
  getAllLessons,
  LessonMeta,
} from "../data/javascript-curriculum";
import {
  getJSLessonContent,
  JSLessonContent,
} from "../data/javascript-lesson-content";
import { setCurrentLesson } from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { JSLessonSidebar } from "../components/lesson-sidebar";
import { useJSModuleProgress } from "../hooks/use-javascript-module-progress";

export default function JSLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "js01-how-js-runs";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta>(() => {
    return getLessonBySlug(slug) || getAllLessons()[0];
  });

  const [lessonContent, setLessonContent] = useState<JSLessonContent>(() => {
    return getJSLessonContent(slug);
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(
    null
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setLessonContent(getJSLessonContent(slug));
    setCurrentLesson(foundLesson.slug);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  }, [slug]);

  const sections = lessonContent.sections;

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
  } = useJSModuleProgress({
    lessonSlug: slug,
    sections,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const stage = getStageByLessonSlug(lesson.slug);

  const getTagColorClass = (color?: string) => {
    switch (color) {
      case "emerald":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "cyan":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      case "rose":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "indigo":
        return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      case "blue":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "amber":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "purple":
      default:
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            {/* Section Header with Step Counter */}
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              {/* Analogy Callout Box (NestJS / OOP style) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#090C14] border border-purple-500/25 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>The Real-World Analogy & Mental Model</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-normal">
                  {lessonContent.part1.bigPicture}
                </p>
              </div>

              {/* Core Breakdown List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {lessonContent.part1.breakdownTitle}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {lessonContent.part1.breakdownItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] flex items-start gap-3.5 hover:border-white/10 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-white font-bold block text-sm mb-0.5">
                          {item.title}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case "part2":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {lessonContent.part2.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lessonContent.part2.intro}
                </p>
              </div>

              {/* Concepts Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {lessonContent.part2.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3 flex flex-col justify-between hover:border-purple-500/30 transition-all group"
                  >
                    <div>
                      <div
                        className={`inline-block font-mono font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border mb-2 ${getTagColorClass(
                          card.color
                        )}`}
                      >
                        {card.number} · {card.tag}
                      </div>
                      <div className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {card.title}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Golden Rule Banner */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-200 text-xs sm:text-sm flex items-start gap-3">
                <span className="text-lg">⭐</span>
                <div>
                  <strong className="text-purple-300 font-bold block mb-0.5">
                    {lessonContent.part2.rule.title}
                  </strong>
                  <span>{lessonContent.part2.rule.content}</span>
                </div>
              </div>
            </div>
          </section>
        );

      case "part3":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {lessonContent.part3.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lessonContent.part3.intro}
                </p>
              </div>

              <div className="space-y-3">
                {lessonContent.part3.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-2 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/[0.05] text-slate-300 text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-white font-bold block text-sm">
                        {pt.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                      {pt.content}
                    </p>
                    {pt.codeSnippet && (
                      <div className="pl-7 pt-1">
                        <pre className="text-xs bg-black/50 p-3 rounded-lg border border-white/[0.06] overflow-x-auto text-purple-300 font-mono">
                          {pt.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "part4":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {lessonContent.part4.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comparing common mistakes vs recommended production code:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Bad Code Box (MistakeBox style) */}
                <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                      <span>{lessonContent.part4.bad.title}</span>
                    </div>
                    <pre className="text-xs bg-[#090C14] p-3.5 rounded-xl border border-rose-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                      {lessonContent.part4.bad.code}
                    </pre>
                  </div>
                  <p className="text-xs text-rose-300/80 leading-relaxed pt-2">
                    {lessonContent.part4.bad.explanation}
                  </p>
                </div>

                {/* Good / Clean Code Box */}
                <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <span>{lessonContent.part4.good.title}</span>
                    </div>
                    <pre className="text-xs bg-[#090C14] p-3.5 rounded-xl border border-emerald-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                      {lessonContent.part4.good.code}
                    </pre>
                  </div>
                  <p className="text-xs text-emerald-300/80 leading-relaxed pt-2">
                    {lessonContent.part4.good.explanation}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "part5":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                  {lessonContent.part5.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lessonContent.part5.intro}
                </p>
              </div>

              {/* Code Sandbox */}
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#090C14] p-2">
                <Playground
                  key={`${slug}-${activeSection}`}
                  runtime="typescript"
                  starterCode={lessonContent.part5.starterCode}
                />
              </div>
            </div>
          </section>
        );

      case "part6":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                  {lessonContent.part6.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select the best answer to verify your understanding:
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-4">
                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {lessonContent.part6.quiz.question}
                </p>

                <div className="space-y-2.5">
                  {lessonContent.part6.quiz.options.map((option, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect =
                      idx === lessonContent.part6.quiz.correctIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedQuizAnswer(idx);
                          setQuizSubmitted(true);
                        }}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${
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
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      selectedQuizAnswer ===
                      lessonContent.part6.quiz.correctIndex
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    }`}
                  >
                    {selectedQuizAnswer ===
                    lessonContent.part6.quiz.correctIndex ? (
                      <span>
                        🎉 <strong>Correct!</strong>{" "}
                        {lessonContent.part6.quiz.explanation}
                      </span>
                    ) : (
                      <span>
                        ❌ <strong>Not quite.</strong>{" "}
                        {lessonContent.part6.quiz.explanation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "part7":
        return (
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-600/30">
                  {currentIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {sections[currentIndex]?.label}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                  {lessonContent.part7.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Core competencies mastered in this module:
                </p>
              </div>

              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lessonContent.part7.takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-1 hover:border-purple-500/20 transition-colors"
                  >
                    <div className="text-white font-bold text-sm">{item.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Up Next in Curriculum Box */}
              {lessonContent.part7.nextLessonPreview && (
                <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-500/[0.08] via-[#0E121B] to-purple-500/[0.03] border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      Up Next in Curriculum
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">
                      {lessonContent.part7.nextLessonPreview.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lessonContent.part7.nextLessonPreview.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 transition-colors duration-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        {/* =========================================================================
            2-COLUMN LAYOUT: SIDEBAR (LEFT) + CONTENT (RIGHT)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          <JSLessonSidebar
            lessonCode={lesson.code}
            stageName={stage?.name}
            sections={sections}
            currentIndex={currentIndex}
            progressPercent={progressPercent}
            completedSectionsCount={completedSectionsCount}
            isAuthenticated={isAuthenticated}
            isLessonCompleted={isLessonCompleted}
            getStepState={getStepState}
            onSelectSection={handleSectionChange}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* Right Side Main Content */}
          <main className="flex-1 min-w-0 max-w-6xl w-full space-y-8">
            {/* Lesson Header Hero Card */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black tracking-wider text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-lg">
                    {lesson.code}
                  </span>
                  <span className="text-xs font-mono font-medium text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                    {stage?.name || "JavaScript"}
                  </span>
                  <span className="text-xs text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded">
                    ⏱️ {lesson.estimatedMinutes} mins
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                    +100 XP
                  </span>
                  {lesson.prerequisite && (
                    <span className="text-xs text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]">
                      Prerequisite: {lesson.prerequisite}
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    {lesson.name}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
                    {lesson.desc}
                  </p>
                </div>
              </div>
            </section>

            {/* Dynamic Active Section Content */}
            <div className="min-h-[300px]">
              {renderSectionContent()}
            </div>

            {/* Inter-Lesson Global Navigation Footer */}
            <LessonNavFooter
              currentSlug={lesson.slug}
              isLessonCompleted={isLessonCompleted}
              canComplete={currentIndex === sections.length - 1}
              onLessonComplete={completeLesson}
            />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
