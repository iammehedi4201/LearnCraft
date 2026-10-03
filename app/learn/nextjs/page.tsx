"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Zap,
  Server,
  Shield,
  Layers,
  Check,
  Clock,
  Award,
  Database,
} from "./components/icons";
import {
  NEXTJS_STAGES,
  NextjsLessonMeta,
} from "./data/nextjs-curriculum";
import {
  setStage,
  getStage,
  getNextRecommendedLesson,
  getOverallProgress,
  fetchProgressFromDB,
  isLessonComplete,
  getActiveLesson,
  toggleLessonComplete,
  getCompletionByStage,
} from "./data/progress-store";

export default function NextJsHub(): JSX.Element {
  const { data: session } = useSession();
  const [selectedStageId, setSelectedStageId] = useState<string>("stage-1");
  const [nextLesson, setNextLesson] = useState<NextjsLessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 22,
    percent: 0,
  });

  const isAuthenticated = Boolean(session?.user);

  // Sync state from database & custom events
  useEffect(() => {
    const updateLocalState = () => {
      const storedStage = getStage() || "stage-1";
      setSelectedStageId(storedStage);

      const rec = getNextRecommendedLesson();
      setNextLesson(rec);

      if (!session?.user) {
        setProgressSummary({ completedCount: 0, totalCount: 22, percent: 0 });
        setHasStarted(false);
      } else {
        const overall = getOverallProgress();
        setProgressSummary(overall);
        setHasStarted(overall.completedCount > 0);
      }
    };

    // Load fresh progress directly from PostgreSQL database
    fetchProgressFromDB().then(() => {
      updateLocalState();
    });

    updateLocalState();

    const handleProgressUpdated = () => {
      updateLocalState();
    };

    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "nextjs-progress-updated",
      handleProgressUpdated
    );
    return () => {
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "nextjs-progress-updated",
        handleProgressUpdated
      );
    };
  }, [session?.user]);

  const handleStageSelect = (stageId: string) => {
    setSelectedStageId(stageId);
    setStage(stageId);
  };

  const activeStage =
    NEXTJS_STAGES.find((s) => s.id === selectedStageId) || NEXTJS_STAGES[0];
  const activeLesson = getActiveLesson();
  const stageStats = getCompletionByStage(activeStage.id);

  const getStageIcon = (stageNumber: number) => {
    switch (stageNumber) {
      case 1:
        return <Layers className="w-4 h-4 text-purple-400" />;
      case 2:
        return <Server className="w-4 h-4 text-sky-400" />;
      case 3:
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 4:
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 5:
        return <Shield className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10">
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold mb-5 border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next.js 15 App Router Learning Path</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight">
              Learn Next.js
            </h1>
            <p className="text-base sm:text-lg text-ds-text-sub mt-2 font-normal">
              From App Router foundations to Server Actions, Streaming, Caching & Production Deployment.
            </p>

            {/* Outcomes Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-7 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Master App Router, nested layouts, client navigation & dynamic segments
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Bridge Server & Client Components (RSC) with Suspense streaming
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Mutate data with Server Actions, form state & optimistic UI
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Optimize with 4-layer caching, on-demand ISR & Edge Middleware
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-3.5 pt-1">
              {nextLesson && (
                <Link
                  href={nextLesson.path}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-purple-600/20 active:scale-95"
                >
                  <span>
                    {hasStarted
                      ? `Continue: ${nextLesson.name}`
                      : `Start Learning: ${nextLesson.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {hasStarted && nextLesson && (
              <div className="mt-5 flex items-center gap-2 text-xs text-ds-text-sub">
                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {progressSummary.completedCount} of {progressSummary.totalCount} completed
                </span>
                <span>·</span>
                <span>
                  Next:{" "}
                  <strong className="text-ds-text-strong">
                    {nextLesson.name}
                  </strong>{" "}
                  ({nextLesson.code})
                </span>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            2. 5-STAGE PROGRESSION SELECTOR
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-ds-text-strong">
              <Target className="w-4 h-4 text-purple-500" />
              <span>5-Stage Professional Curriculum</span>
            </div>
            <span className="text-xs text-ds-text-soft">
              Curated progression from core UI primitives to enterprise deployment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {NEXTJS_STAGES.map((stage) => {
              const isSelected = selectedStageId === stage.id;
              const stats = getCompletionByStage(stage.id);

              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`group p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 ease-out relative cursor-pointer border flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "bg-ds-bg-white border-purple-500 ring-2 ring-purple-500/20 shadow-md shadow-purple-500/5"
                      : "bg-ds-bg-white hover:bg-ds-bg-weak/70 border-ds-stroke-soft hover:border-purple-500/40 shadow-sm hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div className="relative z-10">
                    {/* Top row: Icon + Stage / Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-ds-bg-weak group-hover:bg-ds-bg-soft flex items-center justify-center border border-ds-stroke-soft group-hover:border-purple-500/30 transition-colors duration-200">
                        {getStageIcon(stage.stageNumber)}
                      </div>

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                          <Check className="w-3 h-3 text-purple-500" />
                          Stage {stage.stageNumber}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-ds-text-soft group-hover:text-ds-text-sub uppercase tracking-wider transition-colors duration-200">
                          STAGE 0{stage.stageNumber}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-ds-text-strong group-hover:text-purple-500 transition-colors duration-200 leading-snug">
                      {stage.name}
                    </div>

                    <div className="text-xs text-ds-text-sub group-hover:text-ds-text-strong/90 transition-colors duration-200 mt-1 leading-relaxed line-clamp-2">
                      {stage.subtitle}
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 border-t border-ds-stroke-soft flex items-center justify-between text-[11px] font-mono text-ds-text-soft">
                    <span>{stage.lessons.length} Lessons</span>
                    {isAuthenticated && stats.completed > 0 && (
                      <span className="text-emerald-500 font-bold">
                        {stats.completed}/{stats.total}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            3. FOCUSED STAGE CONTENT & LESSONS GRID
           ========================================================================= */}
        <section className="space-y-6">
          {/* Stage Header Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500 border border-purple-500/20 px-3 py-1 rounded-xl">
                  STAGE 0{activeStage.stageNumber}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-ds-text-strong tracking-tight">
                  {activeStage.name}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-ds-text-sub font-normal">
                {activeStage.milestone}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold text-ds-text-sub bg-ds-bg-weak px-3 py-1 rounded-full border border-ds-stroke-soft">
                {stageStats.completed} / {activeStage.lessons.length} Completed
              </span>
            </div>
          </div>

          {/* Lessons Grid (Sequential Ordered Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeStage.lessons.map((lesson, idx) => {
              const isDone = Boolean(
                isAuthenticated &&
                  (isLessonComplete(lesson.slug) || isLessonComplete(lesson.code))
              );
              const isTarget = Boolean(
                activeLesson &&
                  (activeLesson.slug === lesson.slug ||
                    activeLesson.code === lesson.code)
              );

              return (
                <Link
                  key={lesson.slug}
                  href={lesson.path}
                  className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0E121B] border transition-all duration-300 ease-out shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden ${
                    isTarget
                      ? "border-purple-500/40 ring-1 ring-purple-500/20 bg-purple-500/[0.03]"
                      : "border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="relative z-10">
                    {/* Card Header: Step Index, Code & Completion Toggle */}
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400 bg-white/[0.04] group-hover:text-slate-300 px-2 py-0.5 rounded-md transition-colors duration-200">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-xs font-black tracking-wider text-white bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] group-hover:border-purple-500/40 group-hover:text-purple-300 transition-colors duration-200">
                          {lesson.code}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.03] text-slate-400">
                          {lesson.tag}
                        </span>
                      </div>

                      {isAuthenticated && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleLessonComplete(lesson.slug);
                          }}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer outline-none focus:outline-none ${
                            isDone
                              ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
                              : isTarget
                              ? "text-purple-300 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30"
                              : "text-slate-400 bg-white/[0.04] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                          }`}
                          title={
                            isDone
                              ? "Completed in database — click to unmark"
                              : "Click to mark complete in database"
                          }
                        >
                          {isDone ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Done</span>
                            </>
                          ) : isTarget ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                              <span>Current</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full border border-white/20 group-hover:border-purple-400 inline-block" />
                              <span>Mark Done</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors duration-200 leading-snug tracking-tight">
                      {lesson.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-200 line-clamp-2 mt-2 leading-relaxed font-normal">
                      {lesson.desc}
                    </p>

                    {/* Prerequisite Pill */}
                    {lesson.prerequisite && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-white/[0.03] group-hover:bg-white/[0.06] px-2.5 py-1 rounded-lg transition-colors duration-200 border border-white/[0.04]">
                        <span className="text-slate-500 font-semibold">
                          Requires:
                        </span>
                        <span>{lesson.prerequisite}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 flex items-center justify-between gap-3 mt-6 pt-4 border-t border-white/[0.06] text-xs">
                    <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lesson.estimatedMinutes}m</span>
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.06] group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent font-bold transition-all duration-200 ease-out shadow-sm">
                      <span>
                        {isDone ? "Review" : isTarget ? "Continue" : "Start"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stage Capstone Milestone Card */}
          {activeStage.capstone && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-purple-500/30 hover:border-purple-500/50 shadow-xl relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {activeStage.capstone.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      +{activeStage.capstone.xpReward} XP
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08]">
                      {activeStage.capstone.estimatedMinutes} mins
                    </span>
                    {isLessonComplete(activeStage.capstone.slug) && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Completed ✅</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeStage.capstone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {activeStage.capstone.desc}
                  </p>

                  {/* Skills Taught */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeStage.capstone.skillsTaught.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 font-mono"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <Link
                    href={activeStage.capstone.path}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/25 active:scale-95 whitespace-nowrap"
                  >
                    <Award className="w-4 h-4" />
                    <span>Launch Stage {activeStage.stageNumber} Capstone</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
