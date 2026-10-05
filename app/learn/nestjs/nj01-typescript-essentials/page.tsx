"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { useModuleProgress } from "../hooks/use-module-progress";

// Section components
import { HeaderSection } from "./components/header-section";
import { SectionBasicTypes } from "./components/section-basic-types";
import { SectionArraysTuples } from "./components/section-arrays-tuples";
import { SectionAnyUnknownNever } from "./components/section-any-unknown-never";
import { SectionEnums } from "./components/section-enums";
import { SectionFunctions } from "./components/section-functions";
import { SectionInterfaces } from "./components/section-interfaces";
import { SectionObjectModifiers } from "./components/section-object-modifiers";
import { SectionUtilityTypes } from "./components/section-utility-types";
import { SectionGenerics } from "./components/section-generics";
import { SectionGenericConstraints } from "./components/section-generic-constraints";
import { SectionTypeNarrowing } from "./components/section-type-narrowing";
import { SectionExpressComparison } from "./components/section-express-comparison";
import { SectionBeginnerMistakes } from "./components/section-beginner-mistakes";
import { SectionConceptTables } from "./components/section-concept-tables";
import { SectionLearningChecks } from "./components/section-learning-checks";
import { SectionCodingExercises } from "./components/section-coding-exercises";
import { SectionFinalProject } from "./components/section-final-project";
import { SectionClosing } from "./components/section-closing";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { NestjsLessonSidebar } from "../components/lesson-sidebar";

const SECTIONS = [
  { id: "part1", label: "Understanding TypeScript", icon: "🚀" },
  { id: "part2", label: "Basic & Primitive Types", icon: "🏷️" },
  { id: "part3", label: "Arrays, Tuples & Readonly", icon: "📦" },
  { id: "part4", label: "any vs unknown vs never", icon: "🛡️" },
  { id: "part5", label: "Enums vs String Unions", icon: "📋" },
  { id: "part6", label: "Functions & Signatures", icon: "⚡" },
  { id: "part7", label: "Interfaces vs Type Aliases", icon: "🏗️" },
  { id: "part8", label: "Object Modifiers", icon: "🔒" },
  { id: "part9", label: "Utility Types: Power Tools", icon: "🎨" },
  { id: "part10", label: "Generics Fundamentals", icon: "🧩" },
  { id: "part11", label: "Generic Constraints & keyof", icon: "🔑" },
  { id: "part12", label: "Type Narrowing & Guards", icon: "🛂" },
  { id: "part13", label: "Express.js vs NestJS", icon: "⚖️" },
  { id: "part14", label: "Beginner Mistakes & Traps", icon: "⚠️" },
  { id: "part15", label: "Concept Tables & Cheatsheet", icon: "📊" },
  { id: "part16", label: "Learning Checks & Quiz", icon: "🧠" },
  { id: "part17", label: "Coding Exercises", icon: "💻" },
  { id: "part18", label: "Final Capstone Project", icon: "🏆" },
  { id: "part19", label: "Summary & Next Steps", icon: "🎓" },
];

export default function NJ01TypeScriptEssentials(): JSX.Element {
  const searchParams = useSearchParams();
  const isImproveMode = searchParams?.get("improveMode") === "true";

  const {
    isAuthenticated,
    activeSection,
    completedSections,
    isLessonCompleted,
    currentIndex,
    progressPercent,
    handleSectionChange,
    completeLesson,
    getStepState,
  } = useModuleProgress({
    lessonSlug: "nj01-typescript-essentials",
    sections: SECTIONS,
  });

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
      case "part1":
        return <HeaderSection />;
      case "part2":
        return <SectionBasicTypes />;
      case "part3":
        return <SectionArraysTuples />;
      case "part4":
        return <SectionAnyUnknownNever />;
      case "part5":
        return <SectionEnums />;
      case "part6":
        return <SectionFunctions />;
      case "part7":
        return <SectionInterfaces />;
      case "part8":
        return <SectionObjectModifiers />;
      case "part9":
        return <SectionUtilityTypes />;
      case "part10":
        return <SectionGenerics />;
      case "part11":
        return <SectionGenericConstraints />;
      case "part12":
        return <SectionTypeNarrowing />;
      case "part13":
        return <SectionExpressComparison />;
      case "part14":
        return <SectionBeginnerMistakes />;
      case "part15":
        return <SectionConceptTables />;
      case "part16":
        return <SectionLearningChecks />;
      case "part17":
        return <SectionCodingExercises />;
      case "part18":
        return <SectionFinalProject />;
      case "part19":
        return <SectionClosing />;
      default:
        return <HeaderSection />;
    }
  };

  return (
    <div className={`min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 ${isImproveMode ? "pt-14" : ""}`}>
      {!isImproveMode && <Nav />}

      <div className="relative z-10 max-w-[95rem] mx-auto px-6 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          {/* Stepper Sidebar */}
          {!isImproveMode && (
            <NestjsLessonSidebar
              moduleCode="NJ-01"
              sections={SECTIONS}
              currentIndex={currentIndex}
              progressPercent={progressPercent}
              completedSectionsCount={completedSections.size}
              isAuthenticated={isAuthenticated}
              isLessonCompleted={isLessonCompleted}
              getStepState={getStepState}
              onSelectSection={handleSectionChange}
              onPrev={() =>
                currentIndex > 0 &&
                handleSectionChange(SECTIONS[currentIndex - 1].id)
              }
              onNext={() => {
                if (currentIndex < SECTIONS.length - 1) {
                  handleSectionChange(SECTIONS[currentIndex + 1].id);
                } else {
                  completeLesson();
                }
              }}
            />
          )}

          {/* Main Content */}
          <main className={`${isImproveMode ? "w-full min-w-0" : "flex-1 min-w-0 max-w-6xl"}`}>
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
              {renderContent()}
              <LessonNavFooter currentSlug="nj01-typescript-essentials" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
