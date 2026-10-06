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
  REACT_PROGRESSION_PHASES,
  LessonMeta,
  REACT_PREREQUISITES,
  REACT_CAPSTONE,
  REACT_RELATED_TOPICS,
  getLessonsByPhaseId,
} from "./data/react-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getOverallProgress,
  fetchProgressFromDB,
  isLessonComplete,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";

export default function ReactPage() {
  const { data: session } = useSession();
  const [selectedPhase, setSelectedPhaseState] =
    useState<string>("fundamentals");
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showPrereqs, setShowPrereqs] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 27,
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
        const matchingPhase = REACT_PROGRESSION_PHASES.find((p) =>
          p.lessonCodes.includes(rec.code),
        );
        if (matchingPhase) {
          setSelectedPhaseState(matchingPhase.id);
        }
      }

      if (!session?.user) {
        setProgressSummary({ completedCount: 0, totalCount: 27, percent: 0 });
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
      "learncraft-react-progress-updated",
      handleProgressUpdated,
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated,
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-react-progress-updated",
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

  const isAllComplete = progressSummary.completedCount >= 27;

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

  const currentPhaseIndex = REACT_PROGRESSION_PHASES.findIndex(
    (p) => p.id === selectedPhase,
  );
  const activePhase =
    REACT_PROGRESSION_PHASES[
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
                <span>Pure React.js Mental Model & Practical Mastery</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Learn React.js
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-300 mt-2.5 font-normal leading-relaxed max-w-2xl">
                  A structured, deep-dive curriculum from core mental models and JSX to custom hooks, reconciliation, async UI states, and robust application architecture.
                </p>
              </div>

              {/* Progress Bar & Key Metrics */}
              <div className="space-y-2 pt-1 max-w-xl">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                    <span>9 Phases</span>
                    <span>·</span>
                    <span>27 Lessons</span>
                    <span>·</span>
                    <span>~12 Hours</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">
                    {progressSummary.completedCount} of 27 Completed ({progressSummary.percent}%)
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
                        ? `Continue · Step ${(nextLesson?.stepNumber || 1)} of 27`
                        : "🎯 Start Here · Step 1 of 27"}
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
                      You've Completed All 27 Lessons!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Put your React competencies into practice with the final Capstone Project: Interactive Task & Workflow Dashboard.
                    </p>
                  </div>
                ) : nextLesson ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold">
                      <span>{nextLesson.code}</span>
                      <span>·</span>
                      <span>
                        {REACT_PROGRESSION_PHASES.find((p) => p.lessonCodes.includes(nextLesson.code))?.label || "React Fundamentals"}
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
                      href={REACT_CAPSTONE.path}
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
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROGRESSIVE DISCLOSURE: PREREQUISITES COLLAPSIBLE HELPER
           ========================================================================= */}
        <section className="rounded-2xl bg-[#0E121B] border border-white/[0.08] overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowPrereqs((prev) => !prev)}
            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
            aria-expanded={showPrereqs}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold shrink-0">
                💡
              </span>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>Prerequisites & Foundations</span>
                  <span className="text-[11px] font-normal text-slate-400 font-sans hidden sm:inline">
                    — What should you know before learning React?
                  </span>
                </span>
                <p className="text-xs text-slate-400 mt-0.5 sm:hidden">
                  JavaScript fundamentals & ES6 syntax
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 shrink-0">
              <span>{showPrereqs ? "Hide" : "View Prerequisites"}</span>
              {showPrereqs ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showPrereqs && (
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/[0.04] animate-in fade-in duration-200">
              <p className="text-xs text-slate-400 mb-3">
                React builds on modern JavaScript fundamentals: functions, arrow syntax, destructuring, array methods (.map, .filter), and Promises. Review these prerequisites if you need a refresher:
              </p>
              {REACT_PREREQUISITES.map((prereq) => (
                <Link
                  key={prereq.id}
                  href={prereq.path}
                  className="group p-4 rounded-xl bg-[#090C14] border border-white/[0.05] hover:border-purple-500/40 hover:bg-[#0c101a] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white group-hover:text-purple-300 transition-colors text-sm">
                        {prereq.title}
                      </span>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                        {prereq.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        · {prereq.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {prereq.desc}
                    </p>
                  </div>

                  <div className="shrink-0 text-xs text-purple-400 font-medium flex items-center gap-1.5 group-hover:text-purple-300">
                    <span>Review basics</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            3. STEP-BY-STEP CURRICULUM: 9 PHASES NAVIGATION
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Curriculum Learning Path</span>
                <span className="text-xs font-normal text-slate-400">
                  ({REACT_PROGRESSION_PHASES.length} Guided Phases)
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Follow the sequential roadmap from core mental models and JSX to state, effects, rendering cycles, and the final capstone.
              </p>
            </div>

            {/* Step Counter & Carousel Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="text-xs font-mono text-slate-400 font-semibold px-2.5 py-1 rounded-lg bg-[#0E121B] border border-white/[0.06]">
                Phase {activePhase.phaseNumber.toString().padStart(2, "0")} / {REACT_PROGRESSION_PHASES.length.toString().padStart(2, "0")}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollTabs("left")}
                  disabled={!canScrollLeft}
                  aria-label="Scroll phases left"
                  className="p-2 rounded-xl bg-[#0E121B] border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTabs("right")}
                  disabled={!canScrollRight}
                  aria-label="Scroll phases right"
                  className="p-2 rounded-xl bg-[#0E121B] border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Enclosed Floating Phase Tabs Carousel */}
          <div className="relative rounded-2xl bg-[#0E121B] border border-white/[0.08] p-2 shadow-xl">
            {/* Left Gradient Edge Fade */}
            <div
              className={`absolute left-2 top-2 bottom-2 w-10 bg-gradient-to-r from-[#0E121B] to-transparent pointer-events-none z-10 transition-opacity duration-300 rounded-l-xl ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Scrollable Track (Zero Scrollbar Gutter) */}
            <div
              ref={tabsRef}
              onWheel={handleTabsWheel}
              onScroll={checkScrollability}
              className="flex items-center gap-2 overflow-x-auto py-0.5 px-0.5 scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {REACT_PROGRESSION_PHASES.map((phase) => {
                const isSelected = selectedPhase === phase.id;
                const phaseDone = isPhaseCompleted(phase.id);
                const phaseDoneCount = getPhaseCompletedCount(phase.id);

                return (
                  <button
                    key={phase.id}
                    data-phase-id={phase.id}
                    onClick={() => handlePhaseSelect(phase.id)}
                    className={`group shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-400/40 shadow-lg shadow-purple-600/30 scale-[1.01]"
                        : phaseDone
                        ? "bg-emerald-500/10 text-emerald-300 hover:text-white border-emerald-500/20 hover:bg-emerald-500/15"
                        : "bg-white/[0.02] text-slate-300 hover:text-white border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
                    }`}
                  >
                    {/* Phase Number or Check Icon */}
                    <span
                      className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : phaseDone
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/[0.05] text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {phaseDone ? "✓" : phase.phaseNumber}
                    </span>

                    {/* Phase Label */}
                    <span className="whitespace-nowrap font-medium">
                      {phase.label}
                    </span>

                    {/* Lesson Count Progress Chip */}
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                        isSelected
                          ? "bg-purple-700/60 text-purple-100"
                          : phaseDone
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-white/[0.04] text-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      {phaseDoneCount}/{phase.lessonCodes.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Gradient Edge Fade */}
            <div
              className={`absolute right-2 top-2 bottom-2 w-10 bg-gradient-to-l from-[#0E121B] to-transparent pointer-events-none z-10 transition-opacity duration-300 rounded-r-xl ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </section>

        {/* =========================================================================
            4. ACTIVE PHASE LESSONS JOURNEY VIEW (SEQUENTIAL, CLEAR, STEP-BY-STEP)
           ========================================================================= */}
        <section>
          <JourneyView
            phaseId={selectedPhase}
            onSelectPhase={handlePhaseSelect}
          />
        </section>

        {/* =========================================================================
            5. FINAL CAPSTONE PROJECT BANNER
           ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-md">
                Final Capstone
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                +{REACT_CAPSTONE.xpReward} XP
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {REACT_CAPSTONE.title} — {REACT_CAPSTONE.subtitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {REACT_CAPSTONE.desc}
            </p>
          </div>

          <Link
            href={REACT_CAPSTONE.path}
            className="shrink-0 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>View Capstone Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* =========================================================================
            6. ECOSYSTEM TOPICS (MINIMAL 1-LINE FOOTER)
           ========================================================================= */}
        <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <span>Explore after React:</span>
          {REACT_RELATED_TOPICS.map((topic, i) => (
            <span key={topic.id} className="inline-flex items-center gap-2">
              <Link
                href={topic.path}
                className="text-slate-300 hover:text-purple-400 font-medium transition-colors"
              >
                {topic.title}
              </Link>
              {i < REACT_RELATED_TOPICS.length - 1 && (
                <span className="text-slate-600">·</span>
              )}
            </span>
          ))}
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
