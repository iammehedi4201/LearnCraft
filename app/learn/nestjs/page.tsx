"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles,
  Target,
  BookOpen,
} from "./components/icons";
import { NESTJS_STAGES, StageMeta, LessonMeta } from "./data/nestjs-curriculum";
import {
  setGoal,
  getGoal,
  getNextRecommendedLesson,
  getCurrentActiveStage,
  getOverallProgress,
} from "./data/progress-store";
import { JourneyView } from "./components/journey-view";
import { FullRoadmap } from "./components/full-roadmap";

const GOAL_OPTIONS = [
  {
    id: "basics",
    label: "Understand the basics",
    tag: "Fast track",
    desc: "Core patterns & basics",
  },
  {
    id: "build-api",
    label: "Build my first API",
    tag: "Recommended",
    desc: "Hands-on CRUD & Architecture",
  },
  {
    id: "job-ready",
    label: "Become job-ready",
    tag: "Comprehensive",
    desc: "Auth, Databases, Pro practices",
  },
  {
    id: "browse",
    label: "Browse full curriculum",
    tag: "All modules",
    desc: "All 32 specialized lessons",
  },
];

export default function NestJSPage() {
  const [activeTab, setActiveTab] = useState<"journey" | "roadmap">("journey");
  const [selectedGoal, setSelectedGoalState] = useState<string>("build-api");
  const [currentStage, setCurrentStage] = useState<StageMeta>(NESTJS_STAGES[0]);
  const [nextLesson, setNextLesson] = useState<LessonMeta>(
    NESTJS_STAGES[0].lessons[0],
  );
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [progressSummary, setProgressSummary] = useState({
    completedCount: 0,
    totalCount: 32,
    percent: 0,
  });

  // Sync state from client storage
  useEffect(() => {
    const updateLocalState = () => {
      const storedGoal = getGoal() || "build-api";
      setSelectedGoalState(storedGoal);

      const rec = getNextRecommendedLesson();
      setNextLesson(rec);

      const activeStg = getCurrentActiveStage();
      setCurrentStage(activeStg);

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

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoalState(goalId);
    setGoal(goalId);
    if (goalId === "browse") {
      setActiveTab("roadmap");
    }
  };

  const handleStageSelect = (stageId: string) => {
    const found = NESTJS_STAGES.find((s) => s.id === stageId);
    if (found) {
      setCurrentStage(found);
      setActiveTab("journey");
    }
  };

  return (
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong flex flex-col selection:bg-ds-feature-light/20 selection:text-ds-feature-dark">
      <Nav />

      {/* Expansive Parent Section Width */}
      <main className="flex-1 max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {/* Destination-First Hero */}
        <section className="py-8 md:py-12 border-b border-ds-stroke-soft">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter text-ds-feature-dark text-xs font-mono font-bold mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Backend Learning Path</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight">
              Learn NestJS
            </h1>
            <p className="text-lg md:text-xl text-ds-text-sub mt-2 font-normal">
              Build a real backend API — step by step.
            </p>

            {/* Outcomes Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-7 text-sm">
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

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href={nextLesson.path}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-sm transition-all shadow-md shadow-ds-feature-base/10 active:scale-95"
              >
                <span>
                  {hasStarted ? "Continue Learning" : "Start Learning"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() =>
                  setActiveTab(activeTab === "roadmap" ? "journey" : "roadmap")
                }
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-ds-bg-white hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft hover:border-ds-feature-base font-bold text-sm transition-all shadow-sm active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-ds-icon-sub" />
                <span>
                  {activeTab === "roadmap"
                    ? "Switch to Focused Journey"
                    : "Browse Full Curriculum"}
                </span>
              </button>
            </div>

            {hasStarted && (
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

        {/* Goal Selector Section */}
        <section className="py-7 border-b border-ds-stroke-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-ds-text-sub">
              <Target className="w-3.5 h-3.5 text-ds-feature-base" />
              <span>What is your primary goal?</span>
            </div>
            <span className="text-xs text-ds-text-soft">
              Personalizes your recommended learning pace
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {GOAL_OPTIONS.map((goal) => {
              const isSelected = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 relative cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-ds-feature-lighter text-ds-feature-dark border border-ds-feature-base"
                      : "bg-ds-bg-white hover:bg-ds-bg-soft text-ds-text-sub hover:text-ds-text-strong border border-ds-stroke-soft hover:border-ds-feature-base"
                  }`}
                >
                  <div className="text-sm font-bold text-ds-text-strong">
                    {goal.label}
                  </div>
                  <div className="text-xs text-ds-text-soft mt-1 line-clamp-1">
                    {goal.desc}
                  </div>
                  <div className="text-[10px] text-ds-feature-dark font-mono font-bold mt-2.5 inline-block px-2 py-0.5 rounded bg-ds-feature-lighter">
                    {goal.tag}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Dual View Toggle & Content Section */}
        <section className="py-8">
          {/* View Mode Tabs */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm">
              <button
                onClick={() => setActiveTab("journey")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "journey"
                    ? "bg-ds-bg-strong text-ds-text-white shadow-sm"
                    : "text-ds-text-sub hover:text-ds-text-strong"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>My Journey (Focused)</span>
              </button>
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "roadmap"
                    ? "bg-ds-bg-strong text-ds-text-white shadow-sm"
                    : "text-ds-text-sub hover:text-ds-text-strong"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Full Curriculum (All 6 Stages)</span>
              </button>
            </div>
          </div>

          {/* Active View Component */}
          {activeTab === "journey" ? (
            <JourneyView
              currentStage={currentStage}
              onSelectStage={handleStageSelect}
              onViewFullRoadmap={() => setActiveTab("roadmap")}
            />
          ) : (
            <FullRoadmap initialExpandedStageId={currentStage.id} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
