"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { getAllAnnotations } from "@/lib/revision-storage";

import { BeginnerMistakesSection } from "./components/beginner-mistakes-section";
import { ClassesObjectsSection } from "./components/classes-objects-section";
import { ClosingSections } from "./components/closing-sections";
import { CodingExercisesSection } from "./components/coding-exercises-section";
import { CompositionSection } from "./components/composition-section";
import { ConceptTablesSection } from "./components/concept-tables-section";
import { ConstructorSection } from "./components/constructor-section";
import { FinalProjectSection } from "./components/final-project-section";
import { HeaderSection } from "./components/header-section";
import { ImportantConceptsSection } from "./components/important-concepts-section";
import { LearningChecksSection } from "./components/learning-checks-section";
import { MethodsSection } from "./components/methods-section";
import { OopInProjectsSection } from "./components/oop-in-projects-section";
import { OopPrinciplesSection } from "./components/oop-principles-section";
import { OopVsProceduralSection } from "./components/oop-vs-procedural-section";
import { RealWorldExamplesSection } from "./components/real-world-examples-section";
import { ThinkInOopSection } from "./components/think-in-oop-section";
import { TypeScriptClassContractsSection } from "./components/typescript-class-contracts-section";

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
    label: "Build Your First Objects",
    description:
      "Start with the reason OOP exists. Then create simple objects and learn how constructors and methods give them data and behavior.",
    lessons: [
      "OOP overview and your first class",
      "Classes, objects, and object literals",
      "Constructors and new",
      "Methods and this",
    ],
  },
  {
    id: "core-concepts",
    stage: "Core Concepts",
    label: "Understand Good Object Design",
    description:
      "Learn the four OOP principles, useful class features, and how objects work together. Finish with mistakes and a compact reference.",
    lessons: [
      "The four OOP principles",
      "this/new recap, static members, getters, and setters",
      "Composition and object relationships",
      "Common beginner mistakes",
      "Concept tables and vocabulary",
    ],
  },
  {
    id: "practical-usage",
    stage: "Practical Usage",
    label: "Design and Practice Real Systems",
    description:
      "Compare OOP with simple functions, study familiar examples, turn requirements into classes, and practice the skills in backend-style code.",
    lessons: [
      "OOP compared with procedural code",
      "Easy real-world examples",
      "How to think in OOP",
      "OOP in backend projects",
      "Learning checks",
      "Coding exercises",
    ],
  },
  {
    id: "advanced",
    stage: "Advanced",
    label: "Explore TypeScript OOP Tools",
    description:
      "Optional material for learners who want stronger TypeScript contracts and a larger capstone before moving into NestJS.",
    lessons: [
      "Readonly, interfaces, and abstract classes",
      "Final e-commerce project",
      "Express vs NestJS and final review",
    ],
    optional: true,
  },
];

// Preserve old bookmarks, saved progress, and revision-note section IDs.
const LEGACY_SECTION_TO_MODULE: Record<string, string> = {
  part1: "fundamentals",
  part2: "fundamentals",
  part3: "fundamentals",
  part4: "fundamentals",
  part5: "core-concepts",
  part6: "core-concepts",
  part7: "core-concepts",
  part8: "practical-usage",
  part9: "practical-usage",
  part10: "practical-usage",
  part11: "core-concepts",
  part12: "practical-usage",
  part13: "core-concepts",
  part14: "practical-usage",
  part15: "practical-usage",
  part16: "advanced",
  part17: "advanced",
};

const CORE_MODULE_COUNT = 3;
const PROGRESS_STORAGE_KEY = "learncraft_progress_nj02-oop-foundations";

function resolveModuleId(sectionId?: string | null): string | null {
  if (!sectionId) return null;
  if (SECTIONS.some((section) => section.id === sectionId)) return sectionId;
  return LEGACY_SECTION_TO_MODULE[sectionId] ?? null;
}

function ModuleGuide({
  module,
  moduleNumber,
}: {
  module: LearningModule;
  moduleNumber: number;
}) {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-ds-bg-white shadow-sm">
      <div className="p-6 lg:p-8">
        <div className="mb-7 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ds-feature-lighter px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-ds-feature-dark">
              Module {moduleNumber}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-ds-text-soft">
              {module.stage}
            </span>
            {module.optional && (
              <span className="rounded-full bg-ds-bg-weak px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-ds-text-sub">
                Optional
              </span>
            )}
          </div>

          <h1 className="mb-3 font-display text-3xl font-black tracking-tight text-ds-text-strong lg:text-4xl">
            {module.label}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-ds-text-sub lg:text-base">
            {module.description}
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-ds-text-soft">
            Learn in this order
          </p>
          <ol className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {module.lessons.map((lesson, index) => (
              <li
                key={lesson}
                className="flex min-h-12 items-center gap-3 rounded-xl bg-ds-bg-weak px-3.5 py-3 text-[10px] font-semibold leading-4 text-ds-text-strong"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ds-bg-white text-[10px] font-black text-ds-feature-dark shadow-sm">
                  {index + 1}
                </span>
                {lesson}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function NJ02OOP(): JSX.Element {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get("highlightId");
  const sectionParam = searchParams?.get("section");

  const [activeSection, setActiveSection] = useState("fundamentals");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const requestedModule = resolveModuleId(sectionParam);
    if (requestedModule) {
      setActiveSection(requestedModule);
      const targetIndex = SECTIONS.findIndex(
        (section) => section.id === requestedModule,
      );
      setCompletedSections((previous) => {
        const next = new Set(previous);
        for (let index = 0; index < targetIndex; index++) {
          next.add(SECTIONS[index].id);
        }
        return next;
      });
      return;
    }

    if (highlightId) {
      const target = getAllAnnotations().find(
        (annotation) =>
          annotation.id === highlightId ||
          annotation.id === `rev_${highlightId}` ||
          `rev-highlight-${annotation.id}` === highlightId,
      );
      const targetModule = resolveModuleId(target?.sectionId);

      if (targetModule) {
        setActiveSection(targetModule);
        const targetIndex = SECTIONS.findIndex(
          (section) => section.id === targetModule,
        );
        setCompletedSections((previous) => {
          const next = new Set(previous);
          for (let index = 0; index < targetIndex; index++) {
            next.add(SECTIONS[index].id);
          }
          return next;
        });

        const url = new URL(window.location.href);
        url.searchParams.delete("highlightId");
        url.searchParams.set("section", targetModule);
        window.history.replaceState(null, "", url.toString());
        return;
      }
    }

    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      const savedModule = resolveModuleId(parsed.activeSection);
      if (savedModule) setActiveSection(savedModule);

      if (Array.isArray(parsed.completedSections)) {
        const migratedSections = parsed.completedSections
          .map((section: unknown) =>
            typeof section === "string" ? resolveModuleId(section) : null,
          )
          .filter((section: string | null): section is string => Boolean(section));
        setCompletedSections(new Set(migratedSections));
      }
    } catch {}
  }, [highlightId, sectionParam]);

  const currentIndex = Math.max(
    0,
    SECTIONS.findIndex((section) => section.id === activeSection),
  );
  const currentModule = SECTIONS[currentIndex];
  const coreProgress = Math.min(
    ((currentIndex + 1) / CORE_MODULE_COUNT) * 100,
    100,
  );

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
        }),
      );
    } catch {}

    const url = new URL(window.location.href);
    url.searchParams.delete("highlightId");
    url.searchParams.set("section", sectionId);
    window.history.replaceState(null, "", url.toString());
  };

  const getStepState = (index: number): "done" | "active" | "todo" => {
    const section = SECTIONS[index];
    if (section.id === activeSection) return "active";
    if (completedSections.has(section.id) || index < currentIndex) return "done";
    return "todo";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "fundamentals":
        return (
          <>
            <HeaderSection />
            <ClassesObjectsSection />
            <ConstructorSection />
            <MethodsSection />
          </>
        );
      case "core-concepts":
        return (
          <>
            <OopPrinciplesSection />
            <ImportantConceptsSection />
            <CompositionSection />
            <BeginnerMistakesSection />
            <ConceptTablesSection />
          </>
        );
      case "practical-usage":
        return (
          <>
            <OopVsProceduralSection />
            <RealWorldExamplesSection />
            <ThinkInOopSection />
            <OopInProjectsSection />
            <LearningChecksSection />
            <CodingExercisesSection />
          </>
        );
      case "advanced":
        return (
          <>
            <TypeScriptClassContractsSection />
            <FinalProjectSection />
            <ClosingSections />
          </>
        );
      default:
        return <HeaderSection />;
    }
  };

  return (
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20">
      <Nav />

      <div className="relative z-10 mx-auto max-w-[95rem] px-6 py-2 lg:px-8">
        <div className="flex flex-col items-start justify-center gap-8 lg:flex-row">
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
                        disabled={isTodo}
                        className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                          isActive
                            ? "border border-ds-feature-base bg-ds-feature-lighter"
                            : isDone
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
                  {Math.round(coreProgress)}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ds-bg-soft">
                <div
                  className="h-full rounded-full bg-ds-feature-base transition-all duration-500"
                  style={{ width: `${coreProgress}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-ds-text-soft">
                {currentIndex >= CORE_MODULE_COUNT
                  ? "Core complete · exploring optional material"
                  : `${currentIndex + 1} of ${CORE_MODULE_COUNT} core modules`}
              </p>
            </div>

            <div className="mt-3 flex shrink-0 gap-2">
              <button
                onClick={() =>
                  currentIndex > 0 &&
                  handleSectionChange(SECTIONS[currentIndex - 1].id)
                }
                disabled={currentIndex === 0}
                className="flex-1 rounded-xl border border-ds-stroke-soft bg-ds-bg-white py-2.5 text-xs font-bold text-ds-text-sub transition-all hover:bg-ds-bg-weak disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Previous
              </button>
              <button
                onClick={() =>
                  currentIndex < SECTIONS.length - 1 &&
                  handleSectionChange(SECTIONS[currentIndex + 1].id)
                }
                disabled={currentIndex === SECTIONS.length - 1}
                className="flex-1 rounded-xl bg-ds-feature-base py-2.5 text-xs font-bold text-ds-static-white shadow-md transition-all hover:bg-ds-feature-dark disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </aside>

          <main className="min-w-0 max-w-6xl flex-1">
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
                  ? "You now have the OOP foundation needed for everyday NestJS learning."
                  : activeSection === "advanced"
                    ? "You have finished both the core and optional OOP material."
                    : `Next: ${SECTIONS[currentIndex + 1]?.stage}`}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-ds-text-sub">
                {activeSection === "practical-usage"
                  ? "You may continue to the next main topic now. Open Advanced when you want TypeScript contracts and a larger capstone project."
                  : activeSection === "advanced"
                    ? "Use the final review as your checklist, then continue to TypeScript decorators."
                    : SECTIONS[currentIndex + 1]?.description}
              </p>
              {currentIndex < SECTIONS.length - 1 && (
                <button
                  onClick={() =>
                    handleSectionChange(SECTIONS[currentIndex + 1].id)
                  }
                  className="rounded-xl bg-ds-feature-base px-5 py-3 text-xs font-black text-ds-static-white shadow-sm transition-all hover:bg-ds-feature-dark"
                >
                  {activeSection === "practical-usage"
                    ? "Explore Advanced (Optional) →"
                    : `Continue to ${SECTIONS[currentIndex + 1].stage} →`}
                </button>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
