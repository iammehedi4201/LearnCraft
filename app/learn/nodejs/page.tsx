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
  NODEJS_PROGRESSION_PHASES,
  LessonMeta,
  NODEJS_PREREQUISITES,
  NODEJS_CAPSTONE,
  NODEJS_RELATED_TOPICS,
  getLessonsByPhaseId,
} from "./data/nodejs-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getOverallProgress,
  fetchProgressFromDB,
  isLessonComplete,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";

export default function NodejsPage() {
  const { data: session } = useSession();
  const [selectedPhase, setSelectedPhaseState] =
    useState<string>("fundamentals");
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showPrereqs, setShowPrereqs] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 24,
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
        const matchingPhase = NODEJS_PROGRESSION_PHASES.find((p) =>
          p.lessonCodes.includes(rec.code),
        );
        if (matchingPhase) {
          setSelectedPhaseState(matchingPhase.id);
        }
      }

      if (!session?.user) {
        setProgressSummary({ completedCount: 0, totalCount: 24, percent: 0 });
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
      "learncraft-nodejs-progress-updated",
      handleProgressUpdated,
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated,
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-nodejs-progress-updated",
        handleProgressUpdated,
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated,
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
        `[data-phase-id="${selectedPhase}"]`,
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

  const isAllComplete = progressSummary.completedCount >= 24;

  // Helper to check if an entire phase is completed
  const isPhaseCompleted = (phaseId: string) => {
    const phaseLessons = getLessonsByPhaseId(phaseId);
    if (!phaseLessons.length) return false;
    return phaseLessons.every(
      (l) => isLessonComplete(l.slug) || isLessonComplete(l.code),
    );
  };

  // Helper to check how many lessons in a phase are done
  const getPhaseCompletedCount = (phaseId: string) => {
    const phaseLessons = getLessonsByPhaseId(phaseId);
    return phaseLessons.filter(
      (l) => isLessonComplete(l.slug) || isLessonComplete(l.code),
    ).length;
  };

  const currentPhaseIndex = NODEJS_PROGRESSION_PHASES.findIndex(
    (p) => p.id === selectedPhase,
  );
  const activePhase =
    NODEJS_PROGRESSION_PHASES[
      currentPhaseIndex >= 0 ? currentPhaseIndex : 0
    ];

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
                <span>Pure Node.js Runtime & Asynchronous Server Mastery</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Learn Node.js
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-300 mt-2.5 font-normal leading-relaxed max-w-2xl">
                  A structured, deep-dive curriculum from runtime architecture and the Event Loop to streams, native HTTP servers, process signals, and robust modular application design.
                </p>
              </div>

              {/* Progress Bar & Key Metrics */}
              <div className="space-y-2 pt-1 max-w-xl">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                    <span>8 Phases</span>
                    <span>·</span>
                    <span>24 Lessons</span>
                    <span>·</span>
                    <span>~10 Hours</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">
                    {progressSummary.completedCount} of 24 Completed ({progressSummary.percent}%)
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
                        ? `Continue · Step ${(nextLesson?.stepNumber || 1)} of 24`
                        : "🎯 Start Here · Step 1 of 24"}
                    </span>
                  </div>

                  {nextLesson && (
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{nextLesson.estimatedMinutes}m</span>
                    </span>
                  )}
                </div>

                {/* Lesson Title & Brief description */}
                {isAllComplete ? (
                  <div className="space-y-1.5">
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      You've Completed All 24 Lessons!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Put your Node.js competencies into practice with the final Capstone Project: File & Task Management Server.
                    </p>
                  </div>
                ) : nextLesson ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
                      <span>{nextLesson.code}</span>
                      <span>·</span>
                      <span>
                        {NODEJS_PROGRESSION_PHASES.find((p) => p.lessonCodes.includes(nextLesson.code))?.label || "Node.js Fundamentals"}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {nextLesson.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {nextLesson.desc}
                    </p>
                  </div>
                ) : null}

                {/* Primary Action Button */}
                <div className="pt-2">
                  {isAllComplete ? (
                    <Link
                      href={NODEJS_CAPSTONE.path}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-[0.98] cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Launch Capstone Project →</span>
                    </Link>
                  ) : nextLesson ? (
                    <Link
                      href={nextLesson.path}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-[0.98] cursor-pointer"
                    >
                      <span>
                        {hasStarted
                          ? `Continue: ${nextLesson.name}`
                          : `Start Step 1: ${nextLesson.name}`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/learn/nodejs/node01-what-is-nodejs"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Start Node.js Curriculum</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. COLLAPSIBLE PREREQUISITES BANNER
           ========================================================================= */}
        <section className="rounded-2xl bg-[#0E121B] border border-white/[0.08] overflow-hidden transition-all duration-300">
          <button
            type="button"
            onClick={() => setShowPrereqs(!showPrereqs)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-base sm:text-lg">📚</span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Prerequisites & Foundational Knowledge</span>
                  <span className="text-[11px] font-mono font-normal text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    JavaScript Assumed
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Node.js assumes familiarity with JavaScript functions, closures, Promises, and async/await.
                </p>
              </div>
            </div>

            <div className="text-slate-400 hover:text-white p-1 rounded-lg bg-white/[0.04]">
              {showPrereqs ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showPrereqs && (
            <div className="p-5 pt-0 border-t border-white/[0.06] mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {NODEJS_PREREQUISITES.map((prereq) => (
                <div
                  key={prereq.id}
                  className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {prereq.title}
                      </span>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.2 rounded">
                        {prereq.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {prereq.desc}
                    </p>
                  </div>
                  <Link
                    href={prereq.path}
                    className="shrink-0 text-xs text-purple-400 hover:text-purple-300 font-semibold hover:underline mt-1"
                  >
                    Review →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            3. PROGRESSION PHASES TABS CAROUSEL
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Progression Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                8 sequential phases designed to take you from runtime fundamentals to a full server architecture.
              </p>
            </div>

            {/* Scroll navigation arrows for tabs */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollTabs("left")}
                disabled={!canScrollLeft}
                className="p-2 rounded-xl bg-[#0E121B] border border-white/[0.08] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all cursor-pointer"
                title="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                disabled={!canScrollRight}
                className="p-2 rounded-xl bg-[#0E121B] border border-white/[0.08] text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.04] transition-all cursor-pointer"
                title="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontally scrollable Phase Tabs with smooth snapping */}
          <div
            ref={tabsRef}
            onScroll={checkScrollability}
            onWheel={handleTabsWheel}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {NODEJS_PROGRESSION_PHASES.map((phase) => {
              const isSelected = phase.id === selectedPhase;
              const isDone = isPhaseCompleted(phase.id);
              const doneCount = getPhaseCompletedCount(phase.id);
              const totalInPhase = phase.lessonCodes.length;

              return (
                <button
                  key={phase.id}
                  data-phase-id={phase.id}
                  type="button"
                  onClick={() => handlePhaseSelect(phase.id)}
                  className={`shrink-0 flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-purple-600/15 border-purple-500 ring-2 ring-purple-500/25 text-white shadow-lg shadow-purple-950/30"
                      : isDone
                      ? "bg-emerald-500/10 border-emerald-500/30 text-slate-300 hover:bg-emerald-500/15"
                      : "bg-[#0E121B] border-white/[0.07] text-slate-400 hover:text-slate-200 hover:border-white/[0.15] hover:bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs border ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-400/50 shadow-md shadow-purple-600/40"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-white/[0.04] text-slate-400 border-white/[0.06]"
                    }`}
                  >
                    {isDone ? "✓" : String(phase.phaseNumber).padStart(2, "0")}
                  </div>

                  <div className="space-y-0.5 min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
                        Phase {phase.phaseNumber.toString().padStart(2, "0")}
                      </span>
                      {isDone && (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          Done
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px]">
                      {phase.label}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {doneCount}/{totalInPhase} Completed
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            4. ACTIVE PHASE ROADMAP VIEW (JOURNEY VIEW)
           ========================================================================= */}
        <section className="space-y-4">
          <JourneyView phaseId={activePhase.id} />
        </section>

        {/* =========================================================================
            5. FINAL CAPSTONE PROJECT SPOTLIGHT BANNER
           ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E121B] via-[#090C14] to-[#0E121B] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider">
                  Final Capstone Project
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  +300 XP
                </span>
                <span className="text-xs font-mono text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]">
                  ⏱️ ~60 mins
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {NODEJS_CAPSTONE.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {NODEJS_CAPSTONE.desc}
                </p>
              </div>

              {/* Skills Taught Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {NODEJS_CAPSTONE.skillsTaught.slice(0, 4).map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-300"
                  >
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
              <Link
                href={NODEJS_CAPSTONE.path}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-[0.98] cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Open Capstone Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. ECOSYSTEM & RELATED TOPICS FOOTER
           ========================================================================= */}
        <section className="space-y-4 pt-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Next in the LearnCraft Curriculum
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Technologies and frameworks built directly on top of Node.js:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {NODEJS_RELATED_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={topic.path}
                className="group p-5 rounded-2xl bg-[#0E121B] border border-white/[0.07] hover:border-purple-500/40 hover:bg-purple-500/[0.02] transition-all duration-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {topic.title}
                    </h4>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                      {topic.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {topic.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 group-hover:translate-x-0.5 transition-transform">
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
