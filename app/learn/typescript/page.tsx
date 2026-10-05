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
} from "./components/icons";
import {
  TYPESCRIPT_PROGRESSION_PHASES,
  LessonMeta,
  TYPESCRIPT_PREREQUISITES,
  TYPESCRIPT_CAPSTONE,
  TYPESCRIPT_RELATED_TOPICS,
} from "./data/typescript-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getOverallProgress,
  fetchProgressFromDB,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";

export default function TypeScriptPage() {
  const { data: session } = useSession();
  const [selectedPhase, setSelectedPhaseState] =
    useState<string>("fundamentals");
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 32,
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
    const updateLocalState = () => {
      const rec = getNextRecommendedLesson();
      setNextLesson(rec);

      // Determine active phase from next lesson or stored goal
      const storedPhase = getGoal();
      if (storedPhase) {
        setSelectedPhaseState(storedPhase);
      } else if (rec) {
        const matchingPhase = TYPESCRIPT_PROGRESSION_PHASES.find((p) =>
          p.lessonCodes.includes(rec.code),
        );
        if (matchingPhase) {
          setSelectedPhaseState(matchingPhase.id);
        }
      }

      if (!session?.user) {
        setProgressSummary({ completedCount: 0, totalCount: 32, percent: 0 });
        setHasStarted(false);
      } else {
        const overall = getOverallProgress();
        setProgressSummary(overall);
        setHasStarted(overall.completedCount > 0);
      }
    };

    fetchProgressFromDB().then(() => {
      updateLocalState();
    });

    updateLocalState();

    const handleProgressUpdated = () => {
      updateLocalState();
    };

    window.addEventListener(
      "learncraft-ts-progress-updated",
      handleProgressUpdated,
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated,
    );
    return () => {
      window.removeEventListener(
        "learncraft-ts-progress-updated",
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

  const isAllComplete = progressSummary.completedCount >= 32;

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* =========================================================================
            1. HERO (EXPANSIVE, COMFORTABLE, STUDIO GRADE — PURPLE THEME)
           ========================================================================= */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl relative overflow-hidden">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core TypeScript Mastery</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Learn TypeScript
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-2 font-normal leading-relaxed max-w-3xl">
                Master modern static typing, advanced type system mechanics, generics, and compiler configuration for industrial-grade web applications.
              </p>
            </div>

            {/* Metrics & Progress Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span>32 Lessons</span>
              <span>·</span>
              <span>~16 Hours</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold font-mono">
                {progressSummary.completedCount} of 32 completed ({progressSummary.percent}%)
              </span>
            </div>

            {/* Single Primary Action CTA */}
            <div className="pt-2">
              {isAllComplete ? (
                <Link
                  href={TYPESCRIPT_CAPSTONE.path}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Launch TypeScript Capstone Project →</span>
                </Link>
              ) : nextLesson ? (
                <Link
                  href={nextLesson.path}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95 cursor-pointer"
                >
                  <span>
                    {hasStarted
                      ? `Continue: ${nextLesson.name}`
                      : `Start: ${nextLesson.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PREREQUISITES (FULL-WIDTH EXPANSIVE CARD)
           ========================================================================= */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Prerequisites
              </span>
              <span className="text-xs text-slate-400">
                Recommended foundation to learn before starting TypeScript:
              </span>
            </div>
          </div>

          <div className="pt-1">
            {TYPESCRIPT_PREREQUISITES.map((prereq) => (
              <Link
                key={prereq.id}
                href={prereq.path}
                className="group p-4 sm:p-5 rounded-xl bg-[#090C14] border border-white/[0.05] hover:border-purple-500/40 hover:bg-[#0c101a] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-purple-300 transition-colors text-sm sm:text-base">
                      {prereq.title}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                      {prereq.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      · {prereq.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
                    {prereq.desc}
                  </p>
                </div>

                <div className="shrink-0 text-xs sm:text-sm text-purple-400 font-medium flex items-center gap-2 group-hover:text-purple-300">
                  <span>Review topic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. CLEAN PHASE SELECTOR (SMOOTH SCROLLING & ARROW NAVIGATION)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Curriculum (9 Phases)
            </span>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollTabs("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll phases left"
                className="p-1.5 rounded-lg bg-[#0E121B] border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                disabled={!canScrollRight}
                aria-label="Scroll phases right"
                className="p-1.5 rounded-lg bg-[#0E121B] border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Scrollable Horizontal Phase Tabs */}
          <div
            ref={tabsRef}
            onWheel={handleTabsWheel}
            onScroll={checkScrollability}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-purple-500/30 cursor-grab active:cursor-grabbing"
          >
            {TYPESCRIPT_PROGRESSION_PHASES.map((phase) => {
              const isSelected = selectedPhase === phase.id;
              return (
                <button
                  key={phase.id}
                  data-phase-id={phase.id}
                  onClick={() => handlePhaseSelect(phase.id)}
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-purple-600 text-white border-purple-500 font-bold shadow-md shadow-purple-600/20 scale-[1.02]"
                      : "bg-[#0E121B] text-slate-300 hover:text-white border-white/[0.06] hover:border-white/[0.15]"
                  }`}
                >
                  <span>
                    {phase.phaseNumber}. {phase.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            4. ACTIVE CURRICULUM LESSONS (SPACIOUS & FOCUSED)
           ========================================================================= */}
        <section>
          <JourneyView
            phaseId={selectedPhase}
            onSelectPhase={handlePhaseSelect}
          />
        </section>

        {/* =========================================================================
            5. FINAL CAPSTONE PROJECT (CLEAN & SIMPLE)
           ========================================================================= */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                Final Capstone
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-emerald-400">+{TYPESCRIPT_CAPSTONE.xpReward} XP</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {TYPESCRIPT_CAPSTONE.title} — {TYPESCRIPT_CAPSTONE.subtitle}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {TYPESCRIPT_CAPSTONE.desc}
            </p>
          </div>

          <Link
            href={TYPESCRIPT_CAPSTONE.path}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>View Capstone Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* =========================================================================
            6. ECOSYSTEM TOPICS (MINIMAL 1-LINE FOOTER)
           ========================================================================= */}
        <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <span>Explore after TypeScript:</span>
          {TYPESCRIPT_RELATED_TOPICS.map((topic, i) => (
            <span key={topic.id} className="inline-flex items-center gap-2">
              <Link
                href={topic.path}
                className="text-slate-300 hover:text-purple-400 font-medium transition-colors"
              >
                {topic.title}
              </Link>
              {i < TYPESCRIPT_RELATED_TOPICS.length - 1 && (
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

