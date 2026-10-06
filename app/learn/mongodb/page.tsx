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
  Leaf,
} from "./components/icons";
import {
  MONGODB_PROGRESSION_PHASES,
  LessonMeta,
  MONGODB_PREREQUISITES,
  MONGODB_CAPSTONE,
  MONGODB_RELATED_TOPICS,
  getLessonsByPhaseId,
} from "./data/mongodb-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getOverallProgress,
  fetchProgressFromDB,
  isLessonComplete,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";

export default function MongoDBPage() {
  const { data: session } = useSession();
  const [selectedPhase, setSelectedPhaseState] =
    useState<string>("fundamentals");
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [showPrereqs, setShowPrereqs] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 26,
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

  useEffect(() => {
    let isMounted = true;

    const updateLocalState = () => {
      if (!isMounted) return;
      const rec = getNextRecommendedLesson();
      setNextLesson(rec);

      const storedPhase = getGoal();
      if (storedPhase) {
        setSelectedPhaseState(storedPhase);
      } else if (rec) {
        const matchingPhase = MONGODB_PROGRESSION_PHASES.find((p) =>
          p.lessonCodes.includes(rec.code)
        );
        if (matchingPhase) {
          setSelectedPhaseState(matchingPhase.id);
        }
      }

      if (!session?.user) {
        setHasStarted(false);
        setProgressSummary({ completedCount: 0, totalCount: 26, percent: 0 });
        return;
      }

      const summary = getOverallProgress();
      setProgressSummary(summary);
      setHasStarted(summary.completedCount > 0);
    };

    updateLocalState();

    if (session?.user) {
      fetchProgressFromDB().then(() => {
        if (isMounted) updateLocalState();
      });
    }

    const handleProgressUpdated = () => {
      updateLocalState();
    };

    window.addEventListener("learncraft-mongodb-progress-updated", handleProgressUpdated);
    window.addEventListener("learncraft-progress-updated", handleProgressUpdated);

    return () => {
      isMounted = false;
      window.removeEventListener("learncraft-mongodb-progress-updated", handleProgressUpdated);
      window.removeEventListener("learncraft-progress-updated", handleProgressUpdated);
    };
  }, [session]);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  const handleSelectPhase = (phaseId: string) => {
    setSelectedPhaseState(phaseId);
    setGoal(phaseId);
  };

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* =========================================================================
            BREADCRUMB & HERO HEADER
           ========================================================================= */}
        <section className="space-y-6">
          <nav className="flex items-center gap-2 text-xs text-ds-text-soft">
            <Link href="/roadmaps" className="hover:text-ds-feature-dark transition-colors font-medium">
              Roadmaps
            </Link>
            <span>/</span>
            <span className="text-ds-text-sub font-medium">Database</span>
            <span>/</span>
            <span className="text-ds-text-strong font-bold">MongoDB</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-ds-stroke-soft">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Leaf className="w-3.5 h-3.5" />
                <span>Document Database Mastery</span>
                <span className="text-emerald-400">·</span>
                <span>26 Lessons</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight font-display">
                MongoDB Architecture, Querying & Data Modeling
              </h1>

              <p className="text-base sm:text-lg text-ds-text-sub leading-relaxed font-normal">
                Master the document data model, BSON types, high-speed CRUD operations, array updates, schema validation, aggregation pipelines, and compound index performance.
              </p>
            </div>

            {/* Quick Action / Resume Card */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-ds-bg-white p-5 rounded-2xl border border-ds-stroke-soft shadow-sm min-w-[280px]">
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-ds-text-strong">Your Progress</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {session?.user ? `${progressSummary.percent}%` : "Not Started"}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-ds-bg-soft overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${session?.user ? progressSummary.percent : 0}%` }}
                  />
                </div>
                <p className="text-[11px] text-ds-text-soft font-mono">
                  {session?.user
                    ? `${progressSummary.completedCount} of 26 lessons completed`
                    : "Sign in to track progress"}
                </p>
              </div>

              {nextLesson && (
                <Link
                  href={nextLesson.path}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white shadow-sm shadow-ds-feature-base/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{hasStarted ? "Resume Lesson" : "Start Learning"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            PREREQUISITES DRAWER
           ========================================================================= */}
        <section className="rounded-2xl border border-ds-stroke-soft bg-ds-bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setShowPrereqs(!showPrereqs)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-ds-bg-weak/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-ds-feature-lighter flex items-center justify-center text-ds-feature-dark">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ds-text-strong">
                  {MONGODB_PREREQUISITES.title}
                </h3>
                <p className="text-xs text-ds-text-soft">
                  Foundational concepts recommended before starting MongoDB
                </p>
              </div>
            </div>
            <div className="text-ds-text-soft">
              {showPrereqs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {showPrereqs && (
            <div className="px-6 pb-6 pt-2 border-t border-ds-stroke-soft grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
              {MONGODB_PREREQUISITES.items.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ds-text-strong">{item.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      item.required
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-ds-bg-soft text-ds-text-soft border-ds-stroke-soft"
                    }`}>
                      {item.required ? "Required" : "Recommended"}
                    </span>
                  </div>
                  <p className="text-xs text-ds-text-sub leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            HORIZONTAL PHASE STEPPER TABS
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-ds-text-strong tracking-tight">
              Curriculum Roadmap
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollTabs("left")}
                disabled={!canScrollLeft}
                className="w-8 h-8 rounded-lg bg-ds-bg-white border border-ds-stroke-soft flex items-center justify-center text-ds-text-soft hover:text-ds-text-strong disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTabs("right")}
                disabled={!canScrollRight}
                className="w-8 h-8 rounded-lg bg-ds-bg-white border border-ds-stroke-soft flex items-center justify-center text-ds-text-soft hover:text-ds-text-strong disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={tabsRef}
            onWheel={handleTabsWheel}
            className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar"
          >
            {MONGODB_PROGRESSION_PHASES.map((phase) => {
              const isSelected = phase.id === selectedPhase;
              const lessons = getLessonsByPhaseId(phase.id);
              const completedCount = lessons.filter(
                (l) => isLessonComplete(l.slug) || isLessonComplete(l.code)
              ).length;
              const isDone = completedCount === lessons.length && lessons.length > 0;

              return (
                <button
                  key={phase.id}
                  onClick={() => handleSelectPhase(phase.id)}
                  className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer min-w-[240px] max-w-[280px] ${
                    isSelected
                      ? "bg-ds-bg-white border-ds-feature-base shadow-sm ring-1 ring-ds-feature-base/30"
                      : "bg-ds-bg-white/80 border-ds-stroke-soft hover:border-ds-stroke-strong hover:bg-ds-bg-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isSelected
                        ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                        : "bg-ds-bg-weak text-ds-text-soft"
                    }`}
                  >
                    {isDone ? "✓" : phase.phaseNumber.toString().padStart(2, "0")}
                  </div>

                  <div className="overflow-hidden min-w-0">
                    <span className="text-[10px] font-mono text-ds-text-soft uppercase tracking-wider block truncate">
                      Phase {phase.phaseNumber}
                    </span>
                    <h4 className="text-xs font-bold text-ds-text-strong truncate">
                      {phase.name}
                    </h4>
                    <span className="text-[10px] text-ds-text-soft block truncate mt-0.5">
                      {completedCount}/{lessons.length} completed
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            ACTIVE PHASE JOURNEY VIEW
           ========================================================================= */}
        <section>
          <JourneyView phaseId={selectedPhase} onSelectPhase={handleSelectPhase} />
        </section>

        {/* =========================================================================
            CAPSTONE PROJECT HERO BANNER
           ========================================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-ds-stroke-soft">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Capstone Project</span>
                <span className="text-emerald-400">·</span>
                <span>400 XP</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-ds-text-strong tracking-tight font-display">
                {MONGODB_CAPSTONE.title}
              </h3>
              <p className="text-sm text-ds-text-sub leading-relaxed font-normal">
                {MONGODB_CAPSTONE.desc}
              </p>
            </div>

            <Link
              href={MONGODB_CAPSTONE.path}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white shadow-sm shadow-ds-feature-base/20 transition-all cursor-pointer whitespace-nowrap self-start lg:self-center"
            >
              <span>Explore Capstone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONGODB_CAPSTONE.keyFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <p className="text-xs text-ds-text-sub leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            RELATED LEARNING TOPICS
           ========================================================================= */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-ds-text-strong">Related Technologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MONGODB_RELATED_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={topic.path}
                className="group p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-dark transition-colors">
                    {topic.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ds-bg-weak text-ds-text-soft border border-ds-stroke-soft">
                    {topic.badge}
                  </span>
                </div>
                <p className="text-xs text-ds-text-sub leading-relaxed">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
