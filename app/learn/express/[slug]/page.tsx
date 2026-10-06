"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  getLessonBySlug,
  getStageByLessonSlug,
  getAllLessons,
  LessonMeta,
} from "../data/express-curriculum";
import {
  getExpressLessonContent,
  ExpressLessonContent,
} from "../data/express-lesson-content";
import { setCurrentLesson } from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { ExpressLessonSidebar } from "../components/lesson-sidebar";
import { useExpressModuleProgress } from "../hooks/use-express-module-progress";

export default function ExpressLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "exp01-what-is-express";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta>(() => {
    return getLessonBySlug(slug) || getAllLessons()[0];
  });

  const [lessonContent, setLessonContent] = useState<ExpressLessonContent>(() => {
    return getExpressLessonContent(slug);
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(
    null
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setLessonContent(getExpressLessonContent(slug));
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
    getStepState,
  } = useExpressModuleProgress({
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
      case "amber":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "rose":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "purple":
      default:
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part1.title}
                </h2>
              </div>
              <span className="text-2xl">💡</span>
            </div>

            <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal bg-purple-500/5 p-5 rounded-2xl border border-purple-500/20">
              {lessonContent.part1.bigPicture}
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                {lessonContent.part1.breakdownTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonContent.part1.breakdownItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "part2":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part2.title}
                </h2>
              </div>
              <span className="text-2xl">⚙️</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lessonContent.part2.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lessonContent.part2.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400">
                        {card.number}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getTagColorClass(
                          card.color
                        )}`}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {lessonContent.part2.rule && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  ⚠️ {lessonContent.part2.rule.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lessonContent.part2.rule.content}
                </p>
              </div>
            )}
          </section>
        );

      case "part3":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part3.title}
                </h2>
              </div>
              <span className="text-2xl">🧩</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lessonContent.part3.intro}
            </p>

            <div className="space-y-4">
              {lessonContent.part3.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-purple-500/30 transition-all"
                >
                  <h4 className="text-sm font-bold text-purple-300">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pt.content}
                  </p>
                  {pt.codeSnippet && (
                    <pre className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200 overflow-x-auto mt-2">
                      <code>{pt.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "part4":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part4.title}
                </h2>
              </div>
              <span className="text-2xl">⚖️</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bad Code */}
              <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-400">
                      ❌ Avoid This Pattern
                    </span>
                    <span className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      Anti-Pattern
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {lessonContent.part4.bad.title}
                  </h4>
                  <pre className="p-3.5 rounded-xl bg-black/60 border border-rose-500/20 text-xs font-mono text-rose-200 overflow-x-auto">
                    <code>{lessonContent.part4.bad.code}</code>
                  </pre>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-rose-500/10">
                  {lessonContent.part4.bad.explanation}
                </p>
              </div>

              {/* Good Code */}
              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      ✓ Recommended Approach
                    </span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Production-Grade
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {lessonContent.part4.good.title}
                  </h4>
                  <pre className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/20 text-xs font-mono text-emerald-200 overflow-x-auto">
                    <code>{lessonContent.part4.good.code}</code>
                  </pre>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-emerald-500/10">
                  {lessonContent.part4.good.explanation}
                </p>
              </div>
            </div>
          </section>
        );

      case "part5":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part5.title}
                </h2>
              </div>
              <span className="text-2xl">⚡</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lessonContent.part5.intro}
            </p>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Playground
                key={`${slug}-${activeSection}`}
                runtime="typescript"
                starterCode={lessonContent.part5.starterCode}
              />
            </div>
          </section>
        );

      case "part6": {
        const quiz = lessonContent.part6.quiz;
        const isCorrect = selectedQuizAnswer === quiz.correctIndex;

        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part6.title}
                </h2>
              </div>
              <span className="text-2xl">🎯</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {quiz.question}
              </h3>

              <div className="space-y-2.5">
                {quiz.options.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!quizSubmitted) setSelectedQuizAnswer(idx);
                      }}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500/30"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono shrink-0 ml-3">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted && (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={selectedQuizAnswer === null}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    selectedQuizAnswer !== null
                      ? "bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-md shadow-purple-600/20"
                      : "bg-white/[0.04] text-slate-500 cursor-not-allowed border border-white/[0.06]"
                  }`}
                >
                  Submit Answer
                </button>
              )}

              {quizSubmitted && (
                <div
                  className={`p-4 rounded-2xl border space-y-2 animate-in fade-in duration-300 ${
                    isCorrect
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span>{isCorrect ? "✓ Correct!" : "❌ Not quite right"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {quiz.explanation}
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      }

      case "part7":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {lessonContent.part7.title}
                </h2>
              </div>
              <span className="text-2xl">🚀</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Key Takeaways
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lessonContent.part7.takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                  >
                    <h4 className="text-xs font-bold text-purple-300">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {lessonContent.part7.nextLessonPreview && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  Next Step in Curriculum
                </span>
                <h4 className="text-sm font-bold text-white">
                  {lessonContent.part7.nextLessonPreview.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lessonContent.part7.nextLessonPreview.desc}
                </p>
              </div>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Lesson Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-lg">
              {lesson.code}
            </span>
            {stage && (
              <>
                <span className="text-slate-500">·</span>
                <span className="text-xs font-mono text-slate-400">
                  {stage.name}
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {lesson.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
            {lesson.desc}
          </p>
        </div>

        {/* 2-Column Responsive Layout: Content + Navigation Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            {renderSectionContent()}

            {/* Stepper Navigation Buttons (Previous Part / Next Part) */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentIndex > 0
                    ? "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] cursor-pointer"
                    : "bg-white/[0.02] text-slate-600 border border-white/[0.03] cursor-not-allowed"
                }`}
              >
                ← Previous Part
              </button>

              <span className="text-xs font-mono text-slate-500">
                {currentIndex + 1} of {sections.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentIndex === sections.length - 1}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentIndex < sections.length - 1
                    ? "bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-md shadow-purple-600/20"
                    : "bg-white/[0.02] text-slate-600 border border-white/[0.03] cursor-not-allowed"
                }`}
              >
                Next Part →
              </button>
            </div>

            {/* Global Lesson Footer (Previous Lesson, Mark Complete, Next Lesson) */}
            <LessonNavFooter currentSlug={lesson.slug} />
          </div>

          {/* Right Sticky Sidebar */}
          <ExpressLessonSidebar
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
        </div>
      </main>
    </InteractiveGrid>
  );
}
