"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
} from "./components/icons";
import { PROGRESSION_PHASES, LessonMeta } from "./data/nestjs-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getOverallProgress,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";
import { ReferenceView } from "./components/reference-view";

export default function NestJSPage() {
  const [selectedPhase, setSelectedPhaseState] =
    useState<string>("fundamentals");
  const [nextLesson, setNextLesson] = useState<LessonMeta | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 32,
    percent: 0,
  });

  // Sync state from client storage & custom events
  useEffect(() => {
    const updateLocalState = () => {
      const storedPhase = getGoal() || "fundamentals";
      setSelectedPhaseState(storedPhase);

      const rec = getNextRecommendedLesson();
      setNextLesson(rec);

      const overall = getOverallProgress();
      setProgressSummary(overall);
      setHasStarted(overall.completedCount > 0);
    };

    updateLocalState();

    const handleProgressUpdated = () => {
      updateLocalState();
    };

    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated,
    );
    return () => {
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated,
      );
    };
  }, []);

  const handlePhaseSelect = (phaseId: string) => {
    setSelectedPhaseState(phaseId);
    setGoal(phaseId);
  };

  const getPhaseIcon = (iconType: string) => {
    switch (iconType) {
      case "zap":
        return <Zap className="w-4 h-4 text-ds-feature-base" />;
      case "server":
        return <Server className="w-4 h-4 text-ds-feature-base" />;
      case "shield":
        return <Shield className="w-4 h-4 text-ds-feature-base" />;
      case "layers":
        return <Layers className="w-4 h-4 text-ds-feature-base" />;
      default:
        return <Sparkles className="w-4 h-4 text-ds-feature-base" />;
    }
  };

  // const activePhaseConfig =
  //   PROGRESSION_PHASES.find((p) => p.id === selectedPhase) ||
  //   PROGRESSION_PHASES[0];

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong flex flex-col font-sans selection:bg-ds-feature-light/20 selection:text-ds-feature-dark overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main
        className="flex-1 max-w-[95rem]
       mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10"
      >
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm relative overflow-hidden">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter text-ds-feature-dark text-xs font-mono font-bold mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Backend Learning Path</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight">
              Learn NestJS
            </h1>
            <p className="text-base sm:text-lg text-ds-text-sub mt-2 font-normal">
              Build a real backend API — step by step.
            </p>

            {/* Outcomes Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-7 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-ds-success-base shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Build modular REST APIs with NestJS
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-ds-success-base shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Connect to databases with Prisma & PostgreSQL
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-ds-success-base shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Implement JWT authentication & RBAC guards
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-ds-success-base shrink-0" />
                <span className="text-ds-text-strong font-medium">
                  Test, document, dockerize, and deploy
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-3.5 pt-1">
              {nextLesson && (
                <Link
                  href={nextLesson.path}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-ds-feature-base/10 active:scale-95"
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
                <span className="text-ds-success-dark font-bold bg-ds-success-lighter px-2.5 py-0.5 rounded-full">
                  {progressSummary.completedCount} of{" "}
                  {progressSummary.totalCount} completed
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
            2. PROGRESSION PHASE SELECTOR (FUNDAMENTALS -> INTERMEDIATE -> ADVANCED -> REFERENCE)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-ds-text-strong">
              <Target className="w-4 h-4 text-ds-feature-base" />
              <span>Select Your Learning Phase</span>
            </div>
            <span className="text-xs text-ds-text-soft">
              Progress naturally from core concepts to enterprise production
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRESSION_PHASES.map((phase) => {
              const isSelected = selectedPhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => handlePhaseSelect(phase.id)}
                  className={`group p-5 rounded-2xl text-left transition-all duration-300 ease-out relative cursor-pointer border flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "bg-ds-feature-lighter/20 border-ds-feature-base ring-2 ring-ds-feature-base/20 shadow-md shadow-ds-feature-base/5"
                      : "bg-ds-bg-white hover:bg-ds-bg-weak/70 border-ds-stroke-soft hover:border-ds-feature-base/50 shadow-sm hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div className="relative z-10">
                    {/* Top row: Icon + Scope / Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-ds-bg-weak group-hover:bg-ds-bg-soft flex items-center justify-center border border-ds-stroke-soft group-hover:border-ds-feature-base/30 transition-colors duration-200">
                        {getPhaseIcon(phase.icon)}
                      </div>

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-ds-feature-dark bg-ds-feature-lighter px-2 py-0.5 rounded-full border border-ds-feature-base">
                          <Check className="w-3 h-3 text-ds-feature-base" />
                          Active Phase
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-ds-text-soft group-hover:text-ds-text-sub uppercase tracking-wider transition-colors duration-200">
                          {phase.tag}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors duration-200 leading-snug">
                      {phase.label}
                    </div>

                    <div className="text-xs text-ds-text-sub group-hover:text-ds-text-strong/90 transition-colors duration-200 mt-1 leading-relaxed line-clamp-2">
                      {phase.desc}
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 border-t border-ds-stroke-soft group-hover:border-ds-stroke-soft/80 text-[11px] font-mono text-ds-text-soft group-hover:text-ds-text-sub transition-colors duration-200">
                    {phase.scope}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            3. FOCUSED PHASE CONTENT SECTION
           ========================================================================= */}
        <section>
          {selectedPhase === "reference" ? (
            <ReferenceView />
          ) : (
            <JourneyView
              phaseId={selectedPhase}
              onSelectPhase={handlePhaseSelect}
            />
          )}
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
