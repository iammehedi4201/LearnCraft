"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  Sparkles,
} from "../components/icons";
import {
  getLessonBySlug,
  getStageByLessonSlug,
  getAllLessons,
  LessonMeta,
} from "../data/react-curriculum";
import {
  getReactLessonContent,
  ReactLessonContent,
} from "../data/react-lesson-content";
import {
  setCurrentLesson,
} from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { ReactLessonSidebar } from "../components/lesson-sidebar";
import {
  useReactModuleProgress,
} from "../hooks/use-react-module-progress";

export default function ReactLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "react01-what-is-react";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta>(() => {
    return getLessonBySlug(slug) || getAllLessons()[0];
  });

  const [lessonContent, setLessonContent] = useState<ReactLessonContent>(() => {
    return getReactLessonContent(slug);
  });

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(
    null
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setLessonContent(getReactLessonContent(slug));
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
  } = useReactModuleProgress({
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
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#090C14] border border-purple-500/20 space-y-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>The Big Picture</span>
                </h3>
                <p>{lessonContent.part1.bigPicture}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white">
                  {lessonContent.part1.breakdownTitle}
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-300">
                  {lessonContent.part1.breakdownItems.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.title}:</strong> {item.desc}
                    </li>
                  ))}
                </ul>
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
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {lessonContent.part2.title}
              </h3>
              <p>{lessonContent.part2.intro}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {lessonContent.part2.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2 flex flex-col justify-between"
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
                    <p className="text-xs text-slate-400">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs sm:text-sm">
                <strong>{lessonContent.part2.rule.title}:</strong>{" "}
                {lessonContent.part2.rule.content}
              </div>
            </div>
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
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {lessonContent.part3.title}
              </h3>
              <p>{lessonContent.part3.intro}</p>

              <div className="space-y-3">
                {lessonContent.part3.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-1"
                  >
                    <span className="text-white font-bold block">
                      {pt.title}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {pt.content}
                    </p>
                    {pt.codeSnippet && (
                      <pre className="text-xs bg-black/40 p-2.5 rounded-lg border border-white/[0.06] text-purple-300 font-mono overflow-x-auto mt-2">
                        {pt.codeSnippet}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
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
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {lessonContent.part4.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Bad Design */}
                <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                      <span>{lessonContent.part4.bad.title}</span>
                    </div>
                    <pre className="text-xs bg-[#090C14] p-3 rounded-xl border border-rose-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                      {lessonContent.part4.bad.code}
                    </pre>
                  </div>
                  <p className="text-xs text-rose-300/80">
                    {lessonContent.part4.bad.explanation}
                  </p>
                </div>

                {/* Improved Design */}
                <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <span>{lessonContent.part4.good.title}</span>
                    </div>
                    <pre className="text-xs bg-[#090C14] p-3 rounded-xl border border-emerald-500/20 overflow-x-auto text-slate-300 font-mono leading-relaxed">
                      {lessonContent.part4.good.code}
                    </pre>
                  </div>
                  <p className="text-xs text-emerald-300/80">
                    {lessonContent.part4.good.explanation}
                  </p>
                </div>
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
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                {lessonContent.part5.title}
              </h3>
              <p className="text-sm text-slate-300">
                {lessonContent.part5.intro}
              </p>
              <Playground
                key={`${slug}-${activeSection}`}
                runtime="typescript"
                starterCode={lessonContent.part5.starterCode}
              />
            </div>
          </section>
        );

      case "part6":
        return (
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">
                {lessonContent.part6.title}
              </h3>
              <div className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-4">
                <p className="text-sm font-semibold text-white">
                  {lessonContent.part6.quiz.question}
                </p>

                <div className="space-y-2">
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
                    className={`p-3.5 rounded-xl text-xs sm:text-sm ${
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
          <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-6">
            <div className="border-b border-white/[0.06] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Part {currentIndex + 1} of {sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {sections[currentIndex]?.label}
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-white">
                {lessonContent.part7.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lessonContent.part7.takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-1"
                  >
                    <div className="text-white font-bold">{item.title}</div>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              {lessonContent.part7.nextLessonPreview && (
                <div className="mt-6 p-5 rounded-2xl bg-purple-500/[0.06] border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                      Up Next in Curriculum
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {lessonContent.part7.nextLessonPreview.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
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
          <ReactLessonSidebar
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
                    {stage?.name || "React"}
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
            <LessonNavFooter currentSlug={lesson.slug} />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
