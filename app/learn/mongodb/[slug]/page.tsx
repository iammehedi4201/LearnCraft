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
} from "../data/mongodb-curriculum";
import {
  getMongodbLessonContent,
  MongodbLessonContent,
} from "../data/mongodb-lesson-content";
import { setCurrentLesson } from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { MongodbLessonSidebar } from "../components/lesson-sidebar";
import { useMongodbModuleProgress } from "../hooks/use-mongodb-module-progress";

export default function MongodbLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "mdb01-what-is-mongodb";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta>(() => {
    return getLessonBySlug(slug) || getAllLessons()[0];
  });

  const [lessonContent, setLessonContent] = useState<MongodbLessonContent>(() => {
    return getMongodbLessonContent(slug);
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setLessonContent(getMongodbLessonContent(slug));
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
  } = useMongodbModuleProgress({
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
        return "text-ds-success-dark bg-ds-success-lighter border-ds-success-base/30";
      case "cyan":
        return "text-ds-info-dark bg-ds-info-lighter border-ds-info-base/30";
      case "amber":
        return "text-ds-warning-dark bg-ds-warning-lighter border-ds-warning-base/30";
      case "rose":
        return "text-ds-error-dark bg-ds-error-lighter border-ds-error-base/30";
      case "purple":
      default:
        return "text-ds-feature-dark bg-ds-feature-lighter border-ds-feature-base/30";
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part1.title}
                </h2>
              </div>
              <span className="text-2xl">🍃</span>
            </div>

            <div className="text-sm sm:text-base text-ds-text-strong leading-relaxed font-normal bg-ds-feature-lighter p-5 rounded-2xl border border-ds-feature-base/20">
              {lessonContent.part1.bigPicture}
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-ds-text-strong uppercase tracking-wider">
                {lessonContent.part1.breakdownTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonContent.part1.breakdownItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft space-y-2 hover:border-ds-feature-base/40 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-ds-feature-base text-ds-static-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-ds-text-strong">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-ds-text-sub leading-relaxed">
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
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part2.title}
                </h2>
              </div>
              <span className="text-2xl">⚙️</span>
            </div>

            <p className="text-sm text-ds-text-sub leading-relaxed">
              {lessonContent.part2.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lessonContent.part2.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft space-y-3 hover:border-ds-feature-base/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-ds-feature-dark">
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
                    <h4 className="text-sm font-bold text-ds-text-strong leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-xs text-ds-text-sub leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {lessonContent.part2.rule && (
              <div className="p-4 rounded-2xl bg-ds-warning-lighter border border-ds-warning-base/30 space-y-1">
                <span className="text-xs font-bold text-ds-warning-dark uppercase tracking-wider block">
                  ⚠️ {lessonContent.part2.rule.title}
                </span>
                <p className="text-xs text-ds-text-strong leading-relaxed">
                  {lessonContent.part2.rule.content}
                </p>
              </div>
            )}
          </section>
        );

      case "part3":
        return (
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part3.title}
                </h2>
              </div>
              <span className="text-2xl">🧩</span>
            </div>

            <p className="text-sm text-ds-text-sub leading-relaxed">
              {lessonContent.part3.intro}
            </p>

            <div className="space-y-4">
              {lessonContent.part3.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft space-y-2 hover:border-ds-feature-base/40 transition-all"
                >
                  <h4 className="text-sm font-bold text-ds-feature-dark">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-ds-text-strong leading-relaxed">
                    {pt.content}
                  </p>
                  {pt.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-ds-bg-soft border border-ds-stroke-soft text-xs font-mono text-ds-text-strong overflow-x-auto mt-2">
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
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part4.title}
                </h2>
              </div>
              <span className="text-2xl">⚖️</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bad Code */}
              <div className="p-5 rounded-2xl bg-ds-error-lighter border border-ds-error-base/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ds-error-dark">
                      ❌ Avoid This Pattern
                    </span>
                    <span className="text-[10px] text-ds-error-dark bg-ds-error-lighter px-2 py-0.5 rounded border border-ds-error-base/30 font-bold">
                      Anti-Pattern
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ds-text-strong">
                    {lessonContent.part4.bad.title}
                  </h4>
                  <pre className="p-3.5 rounded-xl bg-ds-bg-white border border-ds-error-base/30 text-xs font-mono text-ds-error-dark overflow-x-auto">
                    <code>{lessonContent.part4.bad.code}</code>
                  </pre>
                </div>
                <p className="text-xs text-ds-text-sub leading-relaxed pt-2 border-t border-ds-error-base/20">
                  {lessonContent.part4.bad.explanation}
                </p>
              </div>

              {/* Good Code */}
              <div className="p-5 rounded-2xl bg-ds-success-lighter border border-ds-success-base/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ds-success-dark">
                      ✓ Recommended Approach
                    </span>
                    <span className="text-[10px] text-ds-success-dark bg-ds-success-lighter px-2 py-0.5 rounded border border-ds-success-base/30 font-bold">
                      Production-Grade
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ds-text-strong">
                    {lessonContent.part4.good.title}
                  </h4>
                  <pre className="p-3.5 rounded-xl bg-ds-bg-white border border-ds-success-base/30 text-xs font-mono text-ds-success-dark overflow-x-auto">
                    <code>{lessonContent.part4.good.code}</code>
                  </pre>
                </div>
                <p className="text-xs text-ds-text-sub leading-relaxed pt-2 border-t border-ds-success-base/20">
                  {lessonContent.part4.good.explanation}
                </p>
              </div>
            </div>
          </section>
        );

      case "part5":
        return (
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part5.title}
                </h2>
              </div>
              <span className="text-2xl">⚡</span>
            </div>

            <p className="text-sm text-ds-text-sub leading-relaxed">
              {lessonContent.part5.intro}
            </p>

            <div className="rounded-2xl overflow-hidden border border-ds-stroke-soft shadow-sm">
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
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part6.title}
                </h2>
              </div>
              <span className="text-2xl">🎯</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-ds-text-strong leading-snug">
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
                          ? "bg-ds-feature-lighter border-2 border-ds-feature-base text-ds-feature-dark font-bold"
                          : "bg-ds-bg-weak border-ds-stroke-soft text-ds-text-strong hover:border-ds-feature-base/40 hover:bg-ds-feature-lighter/30"
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-ds-stroke-soft flex items-center justify-center text-xs font-mono shrink-0 ml-3">
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
                      ? "bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white cursor-pointer shadow-md shadow-ds-feature-base/20"
                      : "bg-ds-bg-weak text-ds-text-disabled cursor-not-allowed border border-ds-stroke-soft"
                  }`}
                >
                  Submit Answer
                </button>
              )}

              {quizSubmitted && (
                <div
                  className={`p-4 rounded-2xl border space-y-2 animate-in fade-in duration-300 ${
                    isCorrect
                      ? "bg-ds-success-lighter border-ds-success-base/40 text-ds-success-dark"
                      : "bg-ds-error-lighter border-ds-error-base/40 text-ds-error-dark"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span>{isCorrect ? "✓ Correct!" : "❌ Not quite right"}</span>
                  </div>
                  <p className="text-xs text-ds-text-strong leading-relaxed">
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
          <section className="p-8 lg:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <div className="border-b border-ds-stroke-soft pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold bg-ds-feature-lighter px-2.5 py-0.5 rounded-full border border-ds-feature-base/20 inline-block">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-2xl font-bold text-ds-text-strong mt-2">
                  {lessonContent.part7.title}
                </h2>
              </div>
              <span className="text-2xl">🚀</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-ds-text-strong uppercase tracking-wider">
                Key Takeaways
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lessonContent.part7.takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft space-y-1.5"
                  >
                    <h4 className="text-xs font-bold text-ds-feature-dark">
                      {item.title}
                    </h4>
                    <p className="text-xs text-ds-text-sub leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {lessonContent.part7.nextLessonPreview && (
              <div className="p-5 rounded-2xl bg-ds-feature-lighter border border-ds-feature-base/30 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold block">
                  Next Step in Curriculum
                </span>
                <h4 className="text-sm font-bold text-ds-text-strong">
                  {lessonContent.part7.nextLessonPreview.title}
                </h4>
                <p className="text-xs text-ds-text-sub leading-relaxed">
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
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 transition-colors duration-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-6 lg:px-8 py-2">
        {/* =========================================================================
            2-COLUMN LAYOUT: SIDEBAR (LEFT) + CONTENT (RIGHT) MATCHING NESTJS DESIGN
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar on the LEFT */}
          <MongodbLessonSidebar
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
              <section className="p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-lg">
                    {lesson.code}
                  </span>
                  {stage && (
                    <span className="text-xs font-mono font-medium text-ds-text-soft bg-ds-bg-weak px-2.5 py-0.5 rounded border border-ds-stroke-soft">
                      {stage.name}
                    </span>
                  )}
                  <span className="text-xs text-ds-text-soft bg-ds-bg-weak px-2.5 py-0.5 rounded border border-ds-stroke-soft">
                    Part {currentIndex + 1} of {sections.length}
                  </span>
                  <span className="text-xs font-mono text-ds-text-soft bg-ds-bg-weak border border-ds-stroke-soft px-2.5 py-0.5 rounded">
                    ⏱️ {lesson.estimatedMinutes} mins
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded font-bold">
                    +{lesson.xpReward} XP
                  </span>
                  {lesson.prerequisite && (
                    <span className="text-xs text-ds-text-soft bg-ds-bg-weak px-2.5 py-0.5 rounded border border-ds-stroke-soft">
                      Prerequisite: {lesson.prerequisite}
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ds-text-strong leading-tight font-display">
                    {lesson.name}
                  </h1>
                  <p className="text-base text-ds-text-sub mt-2 font-normal leading-relaxed">
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
