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
} from "../data/postgresql-curriculum";
import {
  getPostgresqlLessonContent,
  PostgresqlLessonContent,
} from "../data/postgresql-lesson-content";
import { setCurrentLesson } from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { PostgresqlLessonSidebar } from "../components/lesson-sidebar";
import { usePostgresqlModuleProgress } from "../hooks/use-postgresql-module-progress";

export default function PostgresqlLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "pg01-what-is-postgresql";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta>(() => {
    return getLessonBySlug(slug) || getAllLessons()[0];
  });

  const [lessonContent, setLessonContent] = useState<PostgresqlLessonContent>(() => {
    return getPostgresqlLessonContent(slug);
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setLessonContent(getPostgresqlLessonContent(slug));
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
  } = usePostgresqlModuleProgress({
    lessonSlug: slug,
    sections,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const stage = getStageByLessonSlug(lesson.slug);

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

            {/* Analogy Box */}
            <div className="p-5 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                Intuitive Real-World Mental Model
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {lessonContent.part1.analogy}
              </p>
            </div>

            {/* Visual Diagram */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Relational Architecture Diagram
              </span>
              <pre className="p-5 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08] shadow-inner">
                {lessonContent.part1.diagram}
              </pre>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              {lessonContent.part1.explanation}
            </p>
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

            <div className="space-y-4">
              {lessonContent.part2.concepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {concept.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {concept.desc}
                  </p>
                  {concept.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-white/[0.08]">
                      {concept.codeSnippet}
                    </pre>
                  )}
                </div>
              ))}
            </div>
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
              <span className="text-2xl">🔍</span>
            </div>

            <div className="space-y-6">
              {lessonContent.part3.deepDives.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-white">
                    {item.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.content}
                  </p>
                  {item.bulletPoints && item.bulletPoints.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {item.bulletPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <span className="text-purple-400 font-bold mt-0.5">▸</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
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

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <span className="font-bold">Database Challenge: </span>
              {lessonContent.part4.problem}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Approach */}
              <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    ❌ Suboptimal Approach
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {lessonContent.part4.badApproach.title}
                </h4>
                <pre className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-white/[0.08]">
                  {lessonContent.part4.badApproach.code}
                </pre>
                <p className="text-xs text-rose-300 leading-relaxed">
                  <span className="font-semibold">Flaw: </span>
                  {lessonContent.part4.badApproach.flaw}
                </p>
              </div>

              {/* Better Approach */}
              <div className="p-5 rounded-2xl bg-purple-500/[0.03] border border-purple-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                    ✓ Production-Grade Design
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {lessonContent.part4.betterApproach.title}
                </h4>
                <pre className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-white/[0.08]">
                  {lessonContent.part4.betterApproach.code}
                </pre>
                <p className="text-xs text-purple-300 leading-relaxed">
                  <span className="font-semibold">Benefit: </span>
                  {lessonContent.part4.betterApproach.benefit}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic pt-1">
              {lessonContent.part4.whyItMatters}
            </p>
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
              <span className="text-2xl">💻</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Test and run the interactive database engine simulation below to see PostgreSQL rules,
              query execution plans, or constraint checks in real time.
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

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-5">
              <h3 className="text-base font-bold text-white">
                {quiz.question}
              </h3>

              <div className="space-y-2.5">
                {quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizAnswer === oIdx;
                  let optStyle =
                    "bg-[#090C14] border-white/[0.06] hover:bg-white/[0.04] text-slate-300";

                  if (quizSubmitted) {
                    if (oIdx === quiz.correctIndex) {
                      optStyle =
                        "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold";
                    } else if (isSelected) {
                      optStyle =
                        "bg-rose-500/10 border-rose-500/40 text-rose-300";
                    }
                  } else if (isSelected) {
                    optStyle =
                      "bg-purple-500/10 border-purple-500/40 text-purple-300 font-semibold";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizAnswer(oIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
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
                      ? "bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-md shadow-purple-600/30"
                      : "bg-white/[0.04] text-slate-600 cursor-not-allowed border border-white/[0.06]"
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
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                  >
                    <h4 className="text-xs font-bold text-purple-400">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready for the next step?
              </span>
              <button
                onClick={handleNext}
                disabled={currentIndex === sections.length - 1}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Advance →
              </button>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-purple-500/20 selection:text-purple-200 transition-colors duration-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-6 lg:px-8 py-4">
        {/* =========================================================================
            2-COLUMN LAYOUT: SIDEBAR (LEFT) + CONTENT (RIGHT) MATCHING NESTJS DESIGN
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar on the LEFT */}
          <PostgresqlLessonSidebar
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
