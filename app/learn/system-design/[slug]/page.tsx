"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { Playground } from "@/components/playground/Playground";
import {
  getLessonBySlug,
  getStageByLessonSlug,
  getAllLessons,
  LessonMeta,
} from "../data/system-design-curriculum";
import {
  getSystemDesignLessonContent,
  SystemDesignLessonContent,
} from "../data/system-design-lesson-content";
import { setCurrentLesson } from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { SystemDesignLessonSidebar } from "../components/lesson-sidebar";
import { useSystemDesignModuleProgress } from "../hooks/use-system-design-module-progress";

export default function SystemDesignLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "sys01-what-is-system-design";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta>(() => {
    return getLessonBySlug(slug) || getAllLessons()[0];
  });

  const [lessonContent, setLessonContent] = useState<SystemDesignLessonContent>(() => {
    return getSystemDesignLessonContent(slug);
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setLessonContent(getSystemDesignLessonContent(slug));
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
  } = useSystemDesignModuleProgress({
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
        return "text-emerald-300 bg-emerald-500/10 border-emerald-500/20";
      case "cyan":
        return "text-cyan-300 bg-cyan-500/10 border-cyan-500/20";
      case "amber":
        return "text-amber-300 bg-amber-500/10 border-amber-500/20";
      case "rose":
        return "text-rose-300 bg-rose-500/10 border-rose-500/20";
      case "purple":
      default:
        return "text-purple-300 bg-purple-500/10 border-purple-500/20";
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {lessonContent.part1.title}
                </h2>
              </div>
              <span className="text-2xl">💡</span>
            </div>

            <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal bg-purple-500/[0.04] p-5 rounded-2xl border border-purple-500/20">
              {lessonContent.part1.bigPicture}
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {lessonContent.part1.breakdownTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonContent.part1.breakdownItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2 hover:border-purple-500/40 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
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
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
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
                  className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400">
                        {card.number}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${getTagColorClass(
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
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
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
                  className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2 hover:border-purple-500/40 transition-all"
                >
                  <h4 className="text-sm font-bold text-purple-300">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pt.content}
                  </p>
                  {pt.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-purple-200 overflow-x-auto mt-2">
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
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {lessonContent.part4.title}
                </h2>
              </div>
              <span className="text-2xl">⚖️</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bad Architecture */}
              <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-300">
                      ❌ Vulnerable Architecture
                    </span>
                    <span className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
                      Anti-Pattern
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {lessonContent.part4.bad.title}
                  </h4>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/20 text-xs font-mono text-rose-300 overflow-x-auto">
                    <code>{lessonContent.part4.bad.code}</code>
                  </pre>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-rose-500/20">
                  {lessonContent.part4.bad.explanation}
                </p>
              </div>

              {/* Good Architecture */}
              <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      ✓ Resilient Distributed Design
                    </span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      Production-Grade
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {lessonContent.part4.good.title}
                  </h4>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-xs font-mono text-emerald-300 overflow-x-auto">
                    <code>{lessonContent.part4.good.code}</code>
                  </pre>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-emerald-500/20">
                  {lessonContent.part4.good.explanation}
                </p>
              </div>
            </div>
          </section>
        );

      case "part5":
        return (
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {lessonContent.part5.title}
                </h2>
              </div>
              <span className="text-2xl">⚡</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lessonContent.part5.intro}
            </p>

            <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-sm">
              <Playground
                key={`${slug}-${activeSection}`}
                runtime="javascript"
                starterCode={lessonContent.part5.starterCode}
              />
            </div>
          </section>
        );

      case "part6": {
        const quiz = lessonContent.part6.quiz;
        const isCorrect = selectedQuizAnswer === quiz.correctIndex;

        return (
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
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
                          ? "bg-purple-600/20 border-purple-500 text-purple-200 font-bold"
                          : "bg-[#090C14] border-white/[0.06] text-slate-300 hover:border-purple-500/40 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-white/[0.1] flex items-center justify-center text-xs font-mono shrink-0 ml-3 text-slate-400">
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
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
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
          <section className="p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {lessonContent.part7.title}
                </h2>
              </div>
              <span className="text-2xl">🚀</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Key Takeaways
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lessonContent.part7.takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-1.5"
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
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200">
      <Nav />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* =========================================================================
            2-COLUMN LAYOUT: SIDEBAR (LEFT) + CONTENT (RIGHT)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar on the LEFT */}
          <SystemDesignLessonSidebar
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

          {/* Main Content on the RIGHT */}
          <main className="flex-1 min-w-0 max-w-6xl w-full">
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out space-y-8">
              {/* Lesson Hero Header Card */}
              <section className="p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black tracking-wider text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-lg">
                    {lesson.code}
                  </span>
                  {stage && (
                    <span className="text-xs font-mono font-medium text-slate-400 bg-white/[0.03] px-2.5 py-0.5 rounded border border-white/[0.06]">
                      {stage.name}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 bg-white/[0.03] px-2.5 py-0.5 rounded border border-white/[0.06]">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 rounded">
                    ⏱️ {lesson.estimatedMinutes} mins
                  </span>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded font-bold">
                    +{lesson.xpReward} XP
                  </span>
                  {lesson.prerequisite && (
                    <span className="text-xs text-slate-400 bg-white/[0.03] px-2.5 py-0.5 rounded border border-white/[0.06]">
                      Prerequisite: {lesson.prerequisite}
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight font-display">
                    {lesson.name}
                  </h1>
                  <p className="text-base text-slate-300 mt-2 font-normal leading-relaxed">
                    {lesson.desc}
                  </p>
                </div>
              </section>

              {/* Dynamic Active Section Content */}
              <div className="min-h-[300px]">
                {renderSectionContent()}
              </div>

              {/* Inter-Lesson Global Navigation Footer */}
              <LessonNavFooter currentSlug={lesson.slug} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
