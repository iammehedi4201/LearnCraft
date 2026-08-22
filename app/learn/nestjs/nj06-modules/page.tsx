"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { getAllAnnotations } from "@/lib/revision-storage";

// Section components
import { HeaderSection } from "./components/header-section";
import { DecoratorPropertiesSection } from "./components/decorator-properties-section";
import { RootVsFeatureSection } from "./components/root-vs-feature-section";
import { SharingServicesSection } from "./components/sharing-services-section";
import { GlobalModulesSection } from "./components/global-modules-section";
import { DynamicModulesSection } from "./components/dynamic-modules-section";
import { EncapsulationSection } from "./components/encapsulation-section";
import { CircularDependencySection } from "./components/circular-dependency-section";
import { CliGeneratorsSection } from "./components/cli-generators-section";
import { BeginnerMistakesSection } from "./components/beginner-mistakes-section";
import { ConceptTablesSection } from "./components/concept-tables-section";
import { LearningChecksSection } from "./components/learning-checks-section";
import { CodingExercisesSection } from "./components/coding-exercises-section";
import { ClosingSections } from "./components/closing-sections";
import { QuickRevision } from "../components/quick-revision";
import { LessonNavFooter } from "../components/lesson-nav-footer";

const SECTIONS = [
  { id: "part1",  label: "The Big Picture",          icon: "🚀" },
  { id: "part2",  label: "The 4 @Module Properties", icon: "📦" },
  { id: "part3",  label: "Root vs Feature Modules",  icon: "🌳" },
  { id: "part4",  label: "Sharing Services",         icon: "🤝" },
  { id: "part5",  label: "Global Modules (@Global)", icon: "🌐" },
  { id: "part6",  label: "Dynamic Modules (forRoot)", icon: "⚙️" },
  { id: "part7",  label: "Encapsulation & Re-export", icon: "🛡️" },
  { id: "part8",  label: "Circular Dependencies",    icon: "🔄" },
  { id: "part9",  label: "CLI Generators ('nest g')", icon: "🪄" },
  { id: "part10", label: "Beginner Mistakes",        icon: "⚠️" },
  { id: "part11", label: "Concept Tables & Maps",    icon: "📊" },
  { id: "part12", label: "Learning Checks",          icon: "🧠" },
  { id: "part13", label: "Coding Exercises",         icon: "💻" },
  { id: "part14", label: "Final Review & Next Steps", icon: "🎯" },
];

const NJ06_REVISION_POINTS = [
  "A Module is a class with the @Module() decorator defining providers, controllers, imports, and exports.",
  "Imports declare dependencies on other modules; Exports make providers available to importing modules.",
  "Providers listed in a module are private to that module by default unless explicitly exported.",
  "@Global() makes a module's exports available everywhere without requiring explicit imports in every feature.",
  "Dynamic Modules (register/forRoot/forFeature) allow passing configuration objects at import time.",
  "Circular dependencies between modules should be solved with forwardRef() or refactoring to a shared module.",
];

const PROGRESS_STORAGE_KEY = "learncraft_progress_nj06-modules";

function NJ06ModulesContent(): JSX.Element {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get("highlightId");
  const sectionParam = searchParams?.get("section");

  const [activeSection, setActiveSection] = useState<string>("part1");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (sectionParam && SECTIONS.some((s) => s.id === sectionParam)) {
      setActiveSection(sectionParam);
      const targetIdx = SECTIONS.findIndex((s) => s.id === sectionParam);
      if (targetIdx > 0) {
        setCompletedSections((prev) => {
          const next = new Set(prev);
          for (let i = 0; i < targetIdx; i++) {
            next.add(SECTIONS[i].id);
          }
          return next;
        });
      }
      return;
    }

    if (highlightId) {
      const all = getAllAnnotations();
      const target = all.find(
        (a) =>
          a.id === highlightId ||
          a.id === `rev_${highlightId}` ||
          `rev-highlight-${a.id}` === highlightId
      );
      if (target?.sectionId && SECTIONS.some((s) => s.id === target.sectionId)) {
        setActiveSection(target.sectionId);
        const targetIdx = SECTIONS.findIndex((s) => s.id === target.sectionId);
        if (targetIdx > 0) {
          setCompletedSections((prev) => {
            const next = new Set(prev);
            for (let i = 0; i < targetIdx; i++) {
              next.add(SECTIONS[i].id);
            }
            return next;
          });
        }
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("highlightId");
          url.searchParams.set("section", target.sectionId);
          window.history.replaceState(null, "", url.toString());
        }
        return;
      }
    }

    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeSection && SECTIONS.some((s) => s.id === parsed.activeSection)) {
          setActiveSection(parsed.activeSection);
        }
        if (Array.isArray(parsed.completedSections)) {
          setCompletedSections(new Set(parsed.completedSections));
        }
      }
    } catch {}
  }, [highlightId, sectionParam]);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const handleSectionChange = (sectionId: string) => {
    const nextCompleted = new Set([...completedSections, activeSection]);
    setCompletedSections(nextCompleted);
    setActiveSection(sectionId);

    try {
      localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify({
          activeSection: sectionId,
          completedSections: Array.from(nextCompleted),
        })
      );
    } catch {}

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("highlightId");
      url.searchParams.set("section", sectionId);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const getStepState = (index: number): "done" | "active" | "todo" => {
    const section = SECTIONS[index];
    if (section.id === activeSection) return "active";
    if (completedSections.has(section.id) || index < currentIndex)
      return "done";
    return "todo";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "part1":  return <HeaderSection />;
      case "part2":  return <DecoratorPropertiesSection />;
      case "part3":  return <RootVsFeatureSection />;
      case "part4":  return <SharingServicesSection />;
      case "part5":  return <GlobalModulesSection />;
      case "part6":  return <DynamicModulesSection />;
      case "part7":  return <EncapsulationSection />;
      case "part8":  return <CircularDependencySection />;
      case "part9":  return <CliGeneratorsSection />;
      case "part10": return <BeginnerMistakesSection />;
      case "part11": return <ConceptTablesSection />;
      case "part12": return <LearningChecksSection />;
      case "part13": return <CodingExercisesSection />;
      case "part14": return <ClosingSections />;
      default:       return <HeaderSection />;
    }
  };

  return (
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          <aside className="lg:w-[280px] shrink-0 lg:sticky lg:top-20 max-h-[calc(100vh-7rem)] flex flex-col border border-ds-stroke-soft rounded-2xl bg-ds-bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="px-2 mb-3 shrink-0">
              <p className="text-[10px] font-black text-ds-text-soft uppercase tracking-[0.3em]">
                Steps
              </p>
            </div>

            {/* Stepper (Unlocked Navigation) */}
            <nav className="flex-1 overflow-y-auto pr-1 space-y-1">
              <ol className="space-y-1.5 relative">
                {SECTIONS.map((section, index) => {
                  const state = getStepState(index);
                  const isActive = state === "active";
                  const isDone = state === "done";

                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionChange(section.id)}
                        className={`
                          group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                          transition-all duration-200 text-left cursor-pointer
                          ${
                            isActive
                              ? "bg-ds-feature-lighter border border-ds-feature-base"
                              : isDone
                                ? "hover:bg-ds-bg-weak"
                                : "hover:bg-ds-bg-weak opacity-80"
                          }
                        `}
                      >
                        {/* Step indicator circle */}
                        <div
                          className={`
                            relative z-10 flex-shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center
                            text-[11px] font-bold transition-all duration-200
                            ${
                              isActive
                                ? "bg-ds-feature-base text-ds-static-white scale-105 shadow-sm shadow-ds-feature-base/10"
                                : isDone
                                  ? "bg-ds-success-base text-ds-static-white"
                                  : "bg-ds-bg-weak text-ds-text-disabled border border-ds-stroke-soft"
                            }
                          `}
                        >
                          {isDone ? (
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 14 14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="2,7 5.5,10.5 12,3.5" />
                            </svg>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        {/* Label area */}
                        <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                          <span
                            className={`
                              text-[13px] font-semibold leading-tight truncate transition-colors duration-200
                              ${
                                isActive
                                  ? "text-ds-feature-dark font-black"
                                  : isDone
                                    ? "text-ds-text-strong group-hover:text-ds-feature-base"
                                    : "text-ds-text-sub group-hover:text-ds-text-strong"
                              }
                            `}
                          >
                            {section.label}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-medium text-ds-feature-base">
                              Active
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] text-ds-success-dark font-medium">
                              Done
                            </span>
                          )}
                        </div>

                        {/* Active indicator dot */}
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-ds-feature-base shrink-0" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Progress box */}
            <div className="mt-4 shrink-0 px-4 py-3.5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-ds-text-soft uppercase tracking-widest">
                  Progress
                </span>
                <span className="text-[12px] font-bold text-ds-text-strong">
                  {Math.round(((currentIndex + 1) / SECTIONS.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-ds-bg-soft rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out bg-ds-feature-base"
                  style={{
                    width: `${((currentIndex + 1) / SECTIONS.length) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-[10px] text-ds-text-soft">
                {currentIndex + 1} of {SECTIONS.length} steps
              </p>
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-3 shrink-0 flex gap-2">
              <button
                onClick={() =>
                  currentIndex > 0 &&
                  handleSectionChange(SECTIONS[currentIndex - 1].id)
                }
                disabled={currentIndex === 0}
                className="flex-1 py-2.5 rounded-xl text-[12px] font-bold border border-ds-stroke-soft text-ds-text-sub bg-ds-bg-white hover:bg-ds-bg-weak hover:text-ds-text-strong disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>
              <button
                onClick={() =>
                  currentIndex < SECTIONS.length - 1 &&
                  handleSectionChange(SECTIONS[currentIndex + 1].id)
                }
                disabled={currentIndex === SECTIONS.length - 1}
                className="flex-1 py-2.5 rounded-xl text-[12px] font-bold text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-ds-feature-base/10"
              >
                Next →
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-5xl">
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
              {renderContent()}

              {/* Quick Revision Section */}
              <QuickRevision
                title="Quick Revision: NestJS Modules"
                points={NJ06_REVISION_POINTS}
                takeaway="Modules encapsulate related features into self-contained units with explicit boundaries using imports and exports."
              />

              {/* Lesson Nav Footer */}
              <LessonNavFooter currentSlug="nj06-modules" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function NJ06Modules(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
          Loading lesson...
        </div>
      }
    >
      <NJ06ModulesContent />
    </Suspense>
  );
}
