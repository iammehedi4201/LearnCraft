"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * GUIDED ROADMAP JOURNEY — REDESIGNED FOR BEGINNER CLARITY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Replaces information overload with a calm, progressive disclosure journey:
 * 1. Compact Header with role switcher, friendly metadata (time, level, steps).
 * 2. Visual Progress Bar showing learner's current milestone status.
 * 3. Collapsed Steps showing ONLY 6 essential items (number, title, outcome,
 *    time estimate, status badge, expand trigger). Zero clutter.
 * 4. Progressive Disclosure: Expanding reveals "What you'll learn",
 *    decision points ("Choose ONE — You only need one"), and course links.
 * 5. Distinct Advanced Topics section with visually lower priority.
 * 6. Motivational Bottom CTA ("Ready to start building? Start with Step 1").
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TechIcon, RoleIcon } from "@/components/roadmap/TechIcon";
import {
  JOURNEY_ROADMAPS,
  type JourneyRole,
} from "@/lib/roadmap-journey-data";

interface RoadmapProps {
  initialRole?: JourneyRole;
  showSwitcher?: boolean;
}

export function Roadmap({
  initialRole = "backend",
  showSwitcher = true,
}: RoadmapProps) {
  const [selectedRole, setSelectedRole] = useState<JourneyRole>(initialRole);
  const [expandedStepId, setExpandedStepId] = useState<string | null>("be-step-1");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    "be-step-1": true,
    "fe-step-1": true,
    "fs-step-1": true,
  });

  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sync role if prop changes
  useEffect(() => {
    setSelectedRole(initialRole);
  }, [initialRole]);

  // Load completed steps from localStorage for persistent learner experience
  useEffect(() => {
    try {
      const saved = localStorage.getItem("learncraft_roadmap_progress");
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch {
      // Ignore local storage read errors
    }
  }, []);

  const saveCompletedSteps = (updated: Record<string, boolean>) => {
    setCompletedSteps(updated);
    try {
      localStorage.setItem("learncraft_roadmap_progress", JSON.stringify(updated));
    } catch {
      // Ignore local storage write errors
    }
  };

  const toggleStepCompleted = (stepId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = {
      ...completedSteps,
      [stepId]: !completedSteps[stepId],
    };
    saveCompletedSteps(updated);
  };

  const currentRoadmap = JOURNEY_ROADMAPS[selectedRole];
  const steps = currentRoadmap.steps;

  // When role changes, expand the first step of that roadmap if not set
  const handleRoleChange = (role: JourneyRole) => {
    setSelectedRole(role);
    const firstStep = JOURNEY_ROADMAPS[role].steps[0];
    if (firstStep) {
      setExpandedStepId(firstStep.id);
    }
  };

  // Calculate progress
  const completedCount = steps.filter((s) => completedSteps[s.id]).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  // Determine current active step (first uncompleted step, or step 1)
  const currentStepId = steps.find((s) => !completedSteps[s.id])?.id || steps[0]?.id;

  const handleToggleExpand = (stepId: string) => {
    setExpandedStepId((prev) => (prev === stepId ? null : stepId));
  };

  const handleStartStepOne = () => {
    const firstStep = steps[0];
    if (firstStep) {
      setExpandedStepId(firstStep.id);
      const element = stepRefs.current[firstStep.id];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <section id="roadmap-preview" className="pt-16 pb-20 lg:pt-24 lg:pb-28 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* ═══════════════════════════════════════════════════════════════
            PAGE HEADER & ROLE SWITCHER
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Guided Learning Journey
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {currentRoadmap.title}
          </h2>

          {/* Single clean outcome subtitle */}
          <p className="text-base sm:text-lg text-gray-300 mt-3 leading-relaxed max-w-2xl mx-auto font-normal">
            {currentRoadmap.subtitle}
          </p>

          {/* Compact Metadata Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {currentRoadmap.experienceLevel}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-gray-300 border border-white/10 text-xs font-medium">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {currentRoadmap.durationEstimate}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-gray-300 border border-white/10 text-xs font-medium">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {currentRoadmap.totalCoreSteps} core steps
            </span>
          </div>

          {/* Roadmap Switcher */}
          {showSwitcher && (
            <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 mt-8 gap-1.5 shadow-lg shadow-black/20">
              <button
                onClick={() => handleRoleChange("backend")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedRole === "backend"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <RoleIcon role="backend" className="w-4 h-4 text-purple-200" />
                <span>Backend Engineering</span>
              </button>

              <button
                onClick={() => handleRoleChange("frontend")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedRole === "frontend"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <RoleIcon role="frontend" className="w-4 h-4 text-purple-200" />
                <span>Frontend Engineering</span>
              </button>

              <button
                onClick={() => handleRoleChange("fullstack")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedRole === "fullstack"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <RoleIcon role="fullstack" className="w-4 h-4 text-purple-200" />
                <span>Full-Stack Engineering</span>
              </button>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            LEARNER PROGRESS TRACKER
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/20 via-white/[0.02] to-purple-950/20 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">
                Your progress — <span className="text-purple-300 font-bold">{completedCount}</span> of {steps.length} steps completed
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                {progressPercent}% Complete
              </span>
              {completedCount > 0 && (
                <button
                  onClick={() => {
                    const updated = { ...completedSteps };
                    steps.forEach((s) => delete updated[s.id]);
                    saveCompletedSteps(updated);
                  }}
                  className="text-[11px] text-gray-400 hover:text-gray-200 transition-colors underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full h-2.5 bg-white/[0.06] rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CORE ROADMAP JOURNEY (Vertical Step-by-Step Flow)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step, idx) => {
            const isExpanded = expandedStepId === step.id;
            const isCompleted = !!completedSteps[step.id];
            const isCurrent = step.id === currentStepId && !isCompleted;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[step.id] = el;
                }}
                className="relative"
              >
                {/* ─────────────────────────────────────────────────────────
                    CARD (Collapsed or Expanded)
                   ───────────────────────────────────────────────────────── */}
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isExpanded
                      ? "bg-[#0E121B] border-purple-500/40 shadow-xl shadow-purple-950/30 ring-1 ring-purple-500/20"
                      : isCompleted
                      ? "bg-white/[0.015] border-emerald-500/25 hover:border-emerald-500/40 hover:bg-white/[0.03]"
                      : isCurrent
                      ? "bg-gradient-to-b from-purple-950/20 to-white/[0.02] border-purple-500/50 shadow-lg shadow-purple-950/20"
                      : "bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Collapsed Step Header (Always Visible) */}
                  <div
                    onClick={() => handleToggleExpand(step.id)}
                    className="p-5 sm:p-6 cursor-pointer select-none flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0">
                      {/* 1. Prominent Step Number */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-lg transition-all ${
                          isCompleted
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : isCurrent
                            ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                            : "bg-white/[0.05] text-gray-300 border border-white/10"
                        }`}
                      >
                        {isCompleted ? (
                          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step.number
                        )}
                      </div>

                      {/* 2. Short Title + 3. Outcome Sentence */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {step.title}
                          </h3>
                        </div>

                        {/* One simple sentence explaining the outcome */}
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                          {step.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Right side: 4. Duration, 5. Status, 6. Expand Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 sm:shrink-0">
                      {/* Duration */}
                      <span className="text-xs font-medium text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                        {step.duration}
                      </span>

                      {/* Status Indicator */}
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Done</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-gray-400 px-2.5 py-1 rounded-full bg-white/[0.04]">
                          Upcoming
                        </span>
                      )}

                      {/* Clear CTA / Expand Control */}
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse step details" : "Expand step details"}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isExpanded
                            ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                            : "bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* ─────────────────────────────────────────────────────────
                      PROGRESSIVE DISCLOSURE (Expanded Content)
                     ───────────────────────────────────────────────────────── */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-6 animate-fadeIn">
                      {/* What you'll learn */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                            What you&apos;ll learn
                          </span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {step.whatYoullLearn.map((item, topicIdx) => (
                            <li
                              key={topicIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed bg-white/[0.02] p-2.5 rounded-xl border border-white/5"
                            >
                              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold mt-0.5">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Decision Point (When choices exist, explicitly state learner needs only ONE) */}
                      {step.decisionPoint && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30">
                          <div className="mb-3">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-300">
                                ⚖️ Decision Point
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                                Pick Only One
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-white mt-1">
                              {step.decisionPoint.title}
                            </h4>
                            <p className="text-xs text-purple-200/80 mt-0.5 italic">
                              &ldquo;{step.decisionPoint.explanation}&rdquo;
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                            {step.decisionPoint.options.map((opt) => (
                              <div
                                key={opt.name}
                                className={`p-4 rounded-xl border transition-all ${
                                  opt.isRecommended
                                    ? "bg-purple-900/30 border-purple-500/50 shadow-md shadow-purple-950/40 ring-1 ring-purple-500/30"
                                    : "bg-white/[0.02] border-white/10"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <TechIcon slug={opt.slug || opt.name} className="w-5 h-5" />
                                    <span className="text-sm font-bold text-white">
                                      {opt.name}
                                    </span>
                                  </div>

                                  {opt.isRecommended ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                      Recommended
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-medium text-gray-400 px-2 py-0.5 rounded bg-white/[0.05]">
                                      Alternative
                                    </span>
                                  )}
                                </div>

                                <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
                                  {opt.desc}
                                </p>

                                <span className="text-[10px] font-semibold text-gray-400">
                                  {opt.tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Course Link and Completion Toggle */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                        {step.courseLink ? (
                          <Link
                            href={`/roadmaps/${step.courseLink.slug}`}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20"
                          >
                            <span>Explore {step.courseLink.title}</span>
                            <span className="px-1.5 py-0.5 rounded bg-purple-700/50 text-[10px]">
                              {step.courseLink.lessons} Lessons
                            </span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        ) : (
                          <div className="text-xs text-gray-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>Core Milestone in the curriculum</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={(e) => toggleStepCompleted(step.id, e)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            isCompleted
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20"
                              : "bg-white/[0.05] text-gray-300 border border-white/10 hover:bg-white/[0.1] hover:text-white"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Completed • Click to Undo</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full border border-gray-400" />
                              <span>Mark Step as Completed</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Vertical Connector Arrow between Steps */}
                {!isLast && (
                  <div className="flex justify-center py-2 relative z-0">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-3 bg-white/10" />
                      <svg
                        className="w-4 h-4 text-purple-400/60 -mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ADVANCED TOPICS SECTION (Separated, Visually Lower Priority)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-white/10">
          <div className="text-center sm:text-left mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] text-gray-400 text-xs font-semibold border border-white/10 mb-2">
              <span>🚀 Beyond the Core Journey</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {currentRoadmap.advancedTopicsTitle}
            </h3>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              {currentRoadmap.advancedTopicsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentRoadmap.advancedTopics.map((adv) => (
              <div
                key={adv.id}
                className="p-5 rounded-2xl bg-white/[0.015] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-purple-300 transition-colors">
                    <TechIcon slug={adv.iconSlug || adv.title} className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {adv.title}
                  </h4>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  {adv.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {adv.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.03] text-gray-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM MOTIVATIONAL CTA
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-purple-950/30 via-white/[0.02] to-white/[0.01] border border-purple-500/25 text-center shadow-xl shadow-purple-950/20">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ready to start building?
          </h3>
          <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto mt-2 mb-8 leading-relaxed">
            You don&apos;t need to learn everything at once. Start with Step 1 and progress one skill at a time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStartStepOne}
              className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <span>Start Step 1</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <Link
              href="/roadmaps"
              className="px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 hover:text-white font-bold text-sm transition-colors border border-white/10"
            >
              View Full Curriculum
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
