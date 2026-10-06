"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  ArrowRight,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
} from "./components/icons";
import {
  EXPRESS_PROGRESSION_PHASES,
  LessonMeta,
  EXPRESS_PREREQUISITES,
  EXPRESS_CAPSTONE,
  EXPRESS_RELATED_TOPICS,
  getLessonsByPhaseId,
} from "./data/express-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getOverallProgress,
  fetchProgressFromDB,
  isLessonComplete,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";

export default function ExpressPage() {
  const { data: session } = useSession();
  const [selectedPhase, setSelectedPhaseState] =
    useState<string>("fundamentals");
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showPrereqs, setShowPrereqs] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 28,
    percent: 0,
  });

  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScrollability = useCallback(() => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollability, 300);
    }
  };

  const handleTabsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (tabsRef.current && e.deltaY !== 0) {
      tabsRef.current.scrollLeft += e.deltaY;
      checkScrollability();
    }
  };

  // Sync state from database & custom events
  useEffect(() => {
    let isMounted = true;

    const updateLocalState = () => {
      if (!isMounted) return;
      const rec = getNextRecommendedLesson();
      setNextLesson(rec);

      // Determine active phase from next lesson or stored goal
      const storedPhase = getGoal();
      if (storedPhase) {
        setSelectedPhaseState(storedPhase);
      } else if (rec) {
        const matchingPhase = EXPRESS_PROGRESSION_PHASES.find((p) =>
          p.lessonCodes.includes(rec.code)
        );
        if (matchingPhase) {
          setSelectedPhaseState(matchingPhase.id);
        }
      }

      if (!session?.user) {
        setProgressSummary({ completedCount: 0, totalCount: 28, percent: 0 });
        setHasStarted(false);
      } else {
        const overall = getOverallProgress();
        setProgressSummary(overall);
        setHasStarted(overall.completedCount > 0);
      }
    };

    fetchProgressFromDB().then(() => {
      if (isMounted) {
        updateLocalState();
      }
    });

    updateLocalState();

    const handleProgressUpdated = () => {
      if (isMounted) {
        updateLocalState();
      }
    };

    window.addEventListener(
      "learncraft-express-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-express-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated
      );
    };
  }, [session?.user]);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  // Auto-scroll selected phase tab into view
  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.querySelector(
        `[data-phase-id="${selectedPhase}"]`
      ) as HTMLElement | null;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
      checkScrollability();
    }
  }, [selectedPhase, checkScrollability]);

  const handlePhaseSelect = (phaseId: string) => {
    setSelectedPhaseState(phaseId);
    setGoal(phaseId);
  };

  const isAllComplete = progressSummary.completedCount >= 28;

  // Helper to check if an entire phase is completed
  const isPhaseCompleted = (phaseId: string) => {
    const phaseLessons = getLessonsByPhaseId(phaseId);
    if (!phaseLessons.length) return false;
    return phaseLessons.every(
      (l) => isLessonComplete(l.slug) || isLessonComplete(l.code)
    );
  };

  // Helper to check how many lessons in a phase are done
  const getPhaseCompletedCount = (phaseId: string) => {
    const phaseLessons = getLessonsByPhaseId(phaseId);
    return phaseLessons.filter(
      (l) => isLessonComplete(l.slug) || isLessonComplete(l.code)
    ).length;
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* =========================================================================
            1. HERO WITH INTEGRATED "START HERE / NEXT STEP" SPOTLIGHT CARD
           ========================================================================= */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Course Overview & Progress */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pure Express.js Web Layer & REST API Mastery</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Learn Express.js
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-300 mt-2.5 font-normal leading-relaxed max-w-2xl">
                  A structured, deep-dive curriculum from Node.js web layer foundations and the middleware pipeline to REST API design, robust error handling, JWT authentication, and scalable application architecture.
                </p>
              </div>

              {/* Progress Bar & Key Metrics */}
              <div className="space-y-2 pt-1 max-w-xl">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                    <span>10 Phases</span>
                    <span>·</span>
                    <span>28 Lessons</span>
                    <span>·</span>
                    <span>~12 Hours</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">
                    {progressSummary.completedCount} of 28 Completed ({progressSummary.percent}%)
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden border border-white/[0.04]">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(progressSummary.percent, 0)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Focused "Start Here" / "Continue Learning" Guided Card */}
            <div className="lg:col-span-5">
              <div className="relative p-6 sm:p-7 rounded-2xl bg-[#090C14] border border-purple-500/30 ring-1 ring-purple-500/20 shadow-xl shadow-purple-950/20 space-y-4">
                {/* Step indicator header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-purple-400" />
                    <span>
                      {isAllComplete
                        ? "🎉 Curriculum Complete"
                        : hasStarted
                        ? `Continue · Step ${(nextLesson?.stepNumber || 1)} of 28`
                        : "🎯 Start Here · Step 1 of 28"}
                    </span>
                  </div>

                  {nextLesson && (
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{nextLesson.estimatedMinutes}m</span>
                    </span>
                  )}
                </div>

                {/* Lesson Details */}
                {nextLesson && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
                      <span>{nextLesson.code}</span>
                      <span>·</span>
                      <span className="text-slate-400 truncate">
                        {EXPRESS_PROGRESSION_PHASES.find((p) => p.id === nextLesson.phaseId)?.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {nextLesson.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {nextLesson.desc}
                    </p>
                  </div>
                )}

                {/* Direct Action Button */}
                <div>
                  <Link
                    href={nextLesson ? nextLesson.path : "/learn/express/exp01-what-is-express"}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 transition-all duration-200 group cursor-pointer"
                  >
                    <span>
                      {isAllComplete
                        ? "Review Final Capstone"
                        : hasStarted
                        ? `Continue Step ${(nextLesson?.stepNumber || 1)}: ${nextLesson?.name}`
                        : `Start Step 1: ${nextLesson?.name || "What Is Express.js"}`}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PREREQUISITES & FOUNDATIONAL KNOWLEDGE ACCORDION / PILL
           ========================================================================= */}
        <section className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span>📚</span>
                <span>{EXPRESS_PREREQUISITES.title}</span>
              </span>
              <div className="flex items-center gap-1.5">
                {EXPRESS_PREREQUISITES.items.map((item) => (
                  <span
                    key={item.name}
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                      item.required
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/20 font-semibold"
                        : "bg-white/[0.04] text-slate-400 border-white/[0.06]"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowPrereqs(!showPrereqs)}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{showPrereqs ? "Hide Details" : "View Details"}</span>
              {showPrereqs ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showPrereqs && (
            <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-3">
              {EXPRESS_PREREQUISITES.items.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">
                      {item.name}
                    </span>
                    {item.required ? (
                      <span className="text-[10px] text-amber-400 font-mono">
                        Required
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">
                        Helpful
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                  {item.path && (
                    <Link
                      href={item.path}
                      className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:underline pt-1"
                    >
                      <span>Go to topic</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            3. PROGRESSION JOURNEY — HORIZONTAL TABS & CURRENT PHASE SPOTLIGHT
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Progression Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                10 sequenced phases designed to take you from web layer fundamentals to production REST APIs.
              </p>
            </div>

            {/* Horizontal Scroll Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => scrollTabs("left")}
                disabled={!canScrollLeft}
                className={`p-2 rounded-xl border transition-all ${
                  canScrollLeft
                    ? "bg-[#0E121B] border-white/10 text-white hover:bg-white/10 cursor-pointer"
                    : "bg-white/[0.02] border-white/[0.04] text-slate-600 cursor-not-allowed"
                }`}
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTabs("right")}
                disabled={!canScrollRight}
                className={`p-2 rounded-xl border transition-all ${
                  canScrollRight
                    ? "bg-[#0E121B] border-white/10 text-white hover:bg-white/10 cursor-pointer"
                    : "bg-white/[0.02] border-white/[0.04] text-slate-600 cursor-not-allowed"
                }`}
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Navigation Carousel */}
          <div
            ref={tabsRef}
            onWheel={handleTabsWheel}
            className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x"
          >
            {EXPRESS_PROGRESSION_PHASES.map((phase) => {
              const isSelected = selectedPhase === phase.id;
              const isDone = isPhaseCompleted(phase.id);
              const doneCount = getPhaseCompletedCount(phase.id);
              const totalPhaseLessons = phase.lessonCodes.length;

              return (
                <button
                  key={phase.id}
                  data-phase-id={phase.id}
                  onClick={() => handlePhaseSelect(phase.id)}
                  className={`snap-start shrink-0 px-5 py-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer min-w-[220px] max-w-[260px] ${
                    isSelected
                      ? "bg-purple-600/15 border-purple-500 shadow-lg shadow-purple-600/20 ring-1 ring-purple-500/40"
                      : isDone
                      ? "bg-[#0E121B] border-emerald-500/30 hover:border-emerald-500/50"
                      : "bg-[#0E121B] border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Phase {phase.phaseNumber.toString().padStart(2, "0")}
                    </span>
                    {isDone ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        ✓ Complete
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">
                        {doneCount}/{totalPhaseLessons}
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold truncate ${
                      isSelected
                        ? "text-purple-200"
                        : isDone
                        ? "text-slate-200"
                        : "text-slate-300"
                    }`}
                  >
                    {phase.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Detailed View */}
          <div className="mt-4">
            <JourneyView phaseId={selectedPhase} onSelectPhase={handlePhaseSelect} />
          </div>
        </section>

        {/* =========================================================================
            4. FINAL CAPSTONE PROJECT SPOTLIGHT BANNER
           ========================================================================= */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0E121B] via-[#090C14] to-[#120D1E] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Final Capstone Project</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                  +{EXPRESS_CAPSTONE.xpReward} XP
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>~{EXPRESS_CAPSTONE.estimatedMinutes} mins</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {EXPRESS_CAPSTONE.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
                  {EXPRESS_CAPSTONE.desc}
                </p>
              </div>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {EXPRESS_CAPSTONE.keyFeatures.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-start gap-2 text-xs text-slate-300"
                  >
                    <span className="text-purple-400 mt-0.5">✦</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href={EXPRESS_CAPSTONE.path}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-200 cursor-pointer"
              >
                <span>Launch Capstone Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. NEXT IN LEARNCRAFT CURRICULUM
           ========================================================================= */}
        <section className="space-y-4 pt-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Next in the LearnCraft Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Apply your Express foundations to enterprise architecture, static typing, and full-stack applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXPRESS_RELATED_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={topic.path}
                className="group p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    {topic.title}
                  </span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                    {topic.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {topic.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
