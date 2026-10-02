"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { useModuleProgress } from "../hooks/use-module-progress";

import { ModuleGuide } from "@/components/module-guide";
import { AuthSecuritySection } from "./components/auth-security-section";
import { BeginnerMistakesSection } from "./components/beginner-mistakes-section";
import { CachingErrorSection } from "./components/caching-error-section";
import {
  AdvancedClassDecoratorsSection,
  ClassDecoratorsSection,
} from "./components/class-decorators-section";
import { ClosingSections } from "./components/closing-sections";
import { CodingExercisesSection } from "./components/coding-exercises-section";
import { CompositionOrderSection } from "./components/composition-order-section";
import { ConceptTablesSection } from "./components/concept-tables-section";
import { DecoratorFactoriesSection } from "./components/decorator-factories-section";
import { FinalProjectSection } from "./components/final-project-section";
import { HeaderSection } from "./components/header-section";
import { LearningChecksSection } from "./components/learning-checks-section";
import { LoggingPerformanceSection } from "./components/logging-performance-section";
import { MetadataReflectionSection } from "./components/metadata-reflection-section";
import { MethodDecoratorsSection } from "./components/method-decorators-section";
import { ModernVsLegacySection } from "./components/modern-vs-legacy-section";
import { NestjsDeepDiveSection } from "./components/nestjs-deep-dive-section";
import { ParameterDecoratorsSection } from "./components/parameter-decorators-section";
import { PropertyDecoratorsSection } from "./components/property-decorators-section";
import { SyntaxPrerequisitesSection } from "./components/syntax-prerequisites-section";
import { ValidationDecoratorSection } from "./components/validation-decorator-section";

type LearningModule = {
  id: string;
  stage: string;
  label: string;
  description: string;
  lessons: string[];
  optional?: boolean;
};

const SECTIONS: LearningModule[] = [
  {
    id: "fundamentals",
    stage: "Fundamentals",
    label: "Start with the Basics",
    description:
      "Learn why decorators exist, what the @ sign means, when decorators run, and the small JavaScript ideas they build on.",
    lessons: [
      "Why decorators exist and what they do",
      "Setup, wrapper functions, closures, and this",
    ],
  },
  {
    id: "core-concepts",
    stage: "Core Concepts",
    label: "Learn the Four Types",
    description:
      "Take each decorator type one at a time, then learn how factories add options. Finish with common mistakes and a quick reference.",
    lessons: [
      "Class decorators",
      "Method decorators",
      "Property decorators",
      "Parameter decorators",
      "Decorator factories",
      "Common beginner mistakes",
      "Concept tables and vocabulary",
    ],
  },
  {
    id: "practical-usage",
    stage: "Practical Usage",
    label: "Use Decorators in Real Code",
    description:
      "Apply the core ideas to familiar backend tasks. Start with logging, then move through validation, security, caching, and guided practice.",
    lessons: [
      "Logging and performance",
      "Validation",
      "Authorization and security",
      "Caching and error handling",
      "Learning checks",
      "Coding exercises",
    ],
  },
  {
    id: "advanced",
    stage: "Advanced",
    label: "Explore How Frameworks Work",
    description:
      "Optional material for when you want to understand decorator internals, NestJS startup, metadata, standards, and framework design.",
    lessons: [
      "Replacing a class with a subclass",
      "Composition and execution order",
      "Metadata and reflection",
      "Modern and legacy decorators",
      "How NestJS uses decorators",
      "Final mini-framework project",
      "Express vs NestJS and final review",
    ],
    optional: true,
  },
];

// Keep old bookmarks, revision notes, and saved progress working after regrouping.
const LEGACY_SECTION_TO_MODULE: Record<string, string> = {
  part1: "fundamentals",
  part2: "fundamentals",
  part3: "core-concepts",
  part4: "core-concepts",
  part5: "core-concepts",
  part6: "core-concepts",
  part7: "core-concepts",
  part8: "practical-usage",
  part9: "practical-usage",
  part10: "practical-usage",
  part11: "practical-usage",
  part12: "advanced",
  part13: "advanced",
  part14: "advanced",
  part15: "advanced",
  part16: "core-concepts",
  part17: "core-concepts",
  part18: "practical-usage",
  part19: "practical-usage",
  part20: "advanced",
  part21: "advanced",
};

const CORE_MODULE_COUNT = 3;

export default function NJ03Decorators(): JSX.Element {
  const searchParams = useSearchParams();
  const isImproveMode = searchParams?.get("improveMode") === "true";

  const {
    isAuthenticated,
    activeSection,
    completedSections,
    isLessonCompleted,
    currentIndex,
    handleSectionChange,
    completeLesson,
    getStepState,
  } = useModuleProgress({
    lessonSlug: "nj03-decorators",
    sections: SECTIONS,
    legacyMap: LEGACY_SECTION_TO_MODULE,
  });

  const currentModule = SECTIONS[currentIndex];
  const completedCoreCount = SECTIONS.slice(0, CORE_MODULE_COUNT).filter((s) =>
    completedSections.has(s.id)
  ).length;
  const coreProgress = isAuthenticated
    ? Math.min((completedCoreCount / CORE_MODULE_COUNT) * 100, 100)
    : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.direction === "prev" && currentIndex > 0) {
        handleSectionChange(SECTIONS[currentIndex - 1].id);
      } else if (customEvent.detail?.direction === "next" && currentIndex < SECTIONS.length - 1) {
        handleSectionChange(SECTIONS[currentIndex + 1].id);
      }
    };
    window.addEventListener("lc-navigate-module", handleNavigate);
    return () => window.removeEventListener("lc-navigate-module", handleNavigate);
  }, [currentIndex, handleSectionChange]);

  const renderContent = () => {
    switch (activeSection) {
      case "fundamentals":
        return (
          <>
            <HeaderSection />
            <SyntaxPrerequisitesSection />
          </>
        );
      case "core-concepts":
        return (
          <>
            <ClassDecoratorsSection />
            <MethodDecoratorsSection />
            <PropertyDecoratorsSection />
            <ParameterDecoratorsSection />
            <DecoratorFactoriesSection />
            <BeginnerMistakesSection />
            <ConceptTablesSection />
          </>
        );
      case "practical-usage":
        return (
          <>
            <LoggingPerformanceSection />
            <ValidationDecoratorSection />
            <AuthSecuritySection />
            <CachingErrorSection />
            <LearningChecksSection />
            <CodingExercisesSection />
          </>
        );
      case "advanced":
        return (
          <>
            <AdvancedClassDecoratorsSection />
            <CompositionOrderSection />
            <MetadataReflectionSection />
            <ModernVsLegacySection />
            <NestjsDeepDiveSection />
            <FinalProjectSection />
            <ClosingSections />
          </>
        );
      default:
        return <HeaderSection />;
    }
  };

  return (
    <div className={`min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 ${isImproveMode ? "pt-14" : ""}`}>
      {!isImproveMode && <Nav />}

      <div className={`relative z-10 mx-auto ${isImproveMode ? "w-full px-4 py-4" : "max-w-[95rem] px-6 py-2 lg:px-8"}`}>
        <div className={`flex flex-col items-start justify-center ${isImproveMode ? "" : "gap-8 lg:flex-row"}`}>
          {!isImproveMode && (
<aside className="flex max-h-[calc(100vh-7rem)] shrink-0 flex-col rounded-2xl border border-ds-stroke-soft bg-ds-bg-white p-4 shadow-sm lg:sticky lg:top-20 lg:w-[300px]">
              <div className="mb-3 shrink-0 px-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ds-text-soft">
                Learning Path
              </p>
              <p className="mt-1 text-[11px] leading-5 text-ds-text-sub">
                Complete the first three modules. Advanced work is optional.
              </p>
            </div>

            <nav className="flex-1 overflow-y-auto pr-1">
              <ol className="relative space-y-1.5">
                {SECTIONS.map((section, index) => {
                  const state = getStepState(index);
                  const isActive = state === "active";
                  const isDone = state === "done";
                  const isTodo = state === "todo";

                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionChange(section.id)}
                        disabled={isAuthenticated && isTodo && index > currentIndex + 1}
                        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                          isActive
                            ? "border border-ds-feature-base bg-ds-feature-lighter"
                            : isDone
                              ? "cursor-pointer hover:bg-ds-bg-weak"
                              : !isAuthenticated
                              ? "cursor-pointer hover:bg-ds-bg-weak"
                              : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        <div
                          className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                            isActive
                              ? "scale-105 bg-ds-feature-base text-ds-static-white shadow-sm"
                              : isDone
                                ? "bg-ds-success-base text-ds-static-white"
                                : "border border-ds-stroke-soft bg-ds-bg-weak text-ds-text-disabled"
                          }`}
                        >
                          {isDone ? "✓" : index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span
                            className={`block text-[10px] font-black uppercase tracking-wider ${
                              isActive
                                ? "text-ds-feature-base"
                                : "text-ds-text-soft"
                            }`}
                          >
                            {section.stage}
                            {section.optional ? " · Optional" : ""}
                          </span>
                          <span
                            className={`block truncate text-[13px] font-semibold leading-tight ${
                              isActive
                                ? "font-black text-ds-feature-dark"
                                : isDone
                                  ? "text-ds-text-strong group-hover:text-ds-feature-base"
                                  : "text-ds-text-disabled"
                            }`}
                          >
                            {section.label}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="mt-4 shrink-0 rounded-xl border border-ds-stroke-soft bg-ds-bg-weak px-4 py-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-ds-text-soft">
                  Core Progress
                </span>
                <span className="text-xs font-bold text-ds-text-strong">
                  {isAuthenticated ? `${Math.round(coreProgress)}%` : "0%"}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ds-bg-soft">
                <div
                  className="h-full rounded-full bg-ds-feature-base transition-all duration-500"
                  style={{ width: `${isAuthenticated ? coreProgress : 0}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-ds-text-soft">
                {!isAuthenticated
                  ? "Sign in to save progress"
                  : completedCoreCount >= CORE_MODULE_COUNT
                  ? "Core complete · exploring optional material"
                  : `${completedCoreCount} of ${CORE_MODULE_COUNT} core modules completed`}
              </p>
            </div>

            <div className="mt-3 flex shrink-0 gap-2">
              <button
                onClick={() =>
                  currentIndex > 0 &&
                  handleSectionChange(SECTIONS[currentIndex - 1].id)
                }
                disabled={currentIndex === 0}
                className="flex-1 rounded-xl border border-ds-stroke-soft bg-ds-bg-white py-2.5 text-xs font-bold text-ds-text-sub transition-all hover:bg-ds-bg-weak disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  if (currentIndex < SECTIONS.length - 1) {
                    handleSectionChange(SECTIONS[currentIndex + 1].id);
                  } else {
                    completeLesson();
                  }
                }}
                className="flex-1 rounded-xl bg-ds-feature-base py-2.5 text-xs font-bold text-ds-static-white shadow-md transition-all hover:bg-ds-feature-dark disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
              >
                {currentIndex === SECTIONS.length - 1
                  ? isLessonCompleted
                    ? "Completed ✓"
                    : "Finish Lesson ✓"
                  : "Next →"}
              </button>
            </div>
          </aside>
)}

          <main className={`min-w-0 flex-1 ${isImproveMode ? "w-full" : "max-w-6xl"}`}>
            <ModuleGuide module={currentModule} moduleNumber={currentIndex + 1} />

            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
              {renderContent()}
            </div>

            <section
              className={`mb-12 rounded-3xl border p-7 lg:p-9 ${
                activeSection === "practical-usage"
                  ? "border-ds-success-base bg-ds-success-lighter"
                  : "border-ds-stroke-soft bg-ds-bg-white"
              }`}
            >
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-ds-text-soft">
                {activeSection === "practical-usage"
                  ? "Core topic complete"
                  : activeSection === "advanced"
                    ? "Full learning path complete"
                    : "Module complete"}
              </p>
              <h2 className="mb-2 text-xl font-black text-ds-text-strong">
                {activeSection === "practical-usage"
                  ? "You now know the decorator skills needed for everyday NestJS learning."
                  : activeSection === "advanced"
                    ? "You have finished both the core and optional decorator material."
                    : `Next: ${SECTIONS[currentIndex + 1]?.stage}`}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-ds-text-sub">
                {activeSection === "practical-usage"
                  ? "You may stop here and continue to the next main topic. Open Advanced only when you want a deeper look at framework internals."
                  : activeSection === "advanced"
                    ? "Use the final review as your checklist, then continue to SOLID principles."
                    : SECTIONS[currentIndex + 1]?.description}
              </p>
              {currentIndex < SECTIONS.length - 1 ? (
                <button
                  onClick={() =>
                    handleSectionChange(SECTIONS[currentIndex + 1].id)
                  }
                  className="rounded-xl bg-ds-feature-base px-5 py-3 text-xs font-black text-ds-static-white shadow-sm transition-all hover:bg-ds-feature-dark cursor-pointer"
                >
                  {activeSection === "practical-usage"
                    ? "Explore Advanced (Optional) →"
                    : `Continue to ${SECTIONS[currentIndex + 1]?.stage} →`}
                </button>
              ) : (
                <button
                  onClick={completeLesson}
                  className="rounded-xl bg-ds-success-base px-5 py-3 text-xs font-black text-ds-static-white shadow-sm transition-all hover:bg-ds-success-dark cursor-pointer"
                >
                  {isLessonCompleted ? "Lesson Completed ✓" : "Finish & Complete Lesson ✓"}
                </button>
              )}
            </section>

            <LessonNavFooter currentSlug="nj03-decorators" />
          </main>
        </div>
      </div>
    </div>
  );
}
