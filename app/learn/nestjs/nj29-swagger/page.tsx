/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-29 — Swagger & OpenAPI Documentation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Automated API documentation and contract engineering in NestJS:
 * @nestjs/swagger, DocumentBuilder, SwaggerModule.setup at /api/docs,
 * @ApiProperty DTO annotations, @ApiOperation, @ApiResponse,
 * @ApiBearerAuth JWT lock, the Swagger CLI AST compiler plugin,
 * multi-version docs, and exporting openapi.json for SDK generators.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";
import { LayoutGrid } from "../components/icons";

import Link from "next/link";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { useModuleProgress } from "../hooks/use-module-progress";
import { LessonNavFooter } from "../components/lesson-nav-footer";

// Section components
import { HeaderSection } from "./components/header-section";
import { SwaggerSetupBootstrapSection } from "./components/swagger-setup-bootstrap-section";
import { DtoApiPropertySection } from "./components/dto-api-property-section";
import { OperationResponseDecoratorsSection } from "./components/operation-response-decorators-section";
import { JwtBearerAuthSwaggerSection } from "./components/jwt-bearer-auth-swagger-section";
import { CliPluginAutoGenerationSection } from "./components/cli-plugin-auto-generation-section";
import { TaggingGroupingRoutesSection } from "./components/tagging-grouping-routes-section";
import { ExportingOpenapiJsonSection } from "./components/exporting-openapi-json-section";
import { CustomizingSwaggerUiSection } from "./components/customizing-swagger-ui-section";
import { BeginnerMistakesSection } from "./components/beginner-mistakes-section";
import { InterviewQaSection } from "./components/interview-qa-section";
import { ConceptTablesSection } from "./components/concept-tables-section";
import { CodingExercisesSection } from "./components/coding-exercises-section";
import { ClosingSections } from "./components/closing-sections";

const SECTIONS = [
  { id: "part1",  label: "The Big Picture",             icon: "🚀" },
  { id: "part2",  label: "Installing Swagger UI",       icon: "⚙️" },
  { id: "part3",  label: "DTOs & @ApiProperty",         icon: "📝" },
  { id: "part4",  label: "Operation & Response Types",  icon: "📡" },
  { id: "part5",  label: "JWT Bearer Authorization",    icon: "🔒" },
  { id: "part6",  label: "Swagger CLI Compiler Plugin", icon: "⚡" },
  { id: "part7",  label: "Route Tagging & Versioning",  icon: "🏷️" },
  { id: "part8",  label: "Exporting openapi.json",      icon: "💾" },
  { id: "part9",  label: "Customizing Swagger UI Theme", icon: "🎨" },
  { id: "part10", label: "Top 5 Beginner Mistakes",     icon: "⚠️" },
  { id: "part11", label: "Top 5 Interview Q&As",        icon: "💡" },
  { id: "part12", label: "Swagger Decorators Matrix",   icon: "📊" },
  { id: "part13", label: "Swagger Coding Practice",     icon: "💻" },
  { id: "part14", label: "Summary & Next Steps",        icon: "🎓" },
];


export default function NJ29Swagger(): JSX.Element {
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
    lessonSlug: "nj29-swagger",
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
      case "part1":  return <HeaderSection />;
      case "part2":  return <SwaggerSetupBootstrapSection />;
      case "part3":  return <DtoApiPropertySection />;
      case "part4":  return <OperationResponseDecoratorsSection />;
      case "part5":  return <JwtBearerAuthSwaggerSection />;
      case "part6":  return <CliPluginAutoGenerationSection />;
      case "part7":  return <TaggingGroupingRoutesSection />;
      case "part8":  return <ExportingOpenapiJsonSection />;
      case "part9":  return <CustomizingSwaggerUiSection />;
      case "part10": return <BeginnerMistakesSection />;
      case "part11": return <InterviewQaSection />;
      case "part12": return <ConceptTablesSection />;
      case "part13": return <CodingExercisesSection />;
      case "part14": return <ClosingSections />;
      default:       return <HeaderSection />;
    }
  };

  return (
    <div className={`min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 ${isImproveMode ? "pt-14" : ""}`}>
      {!isImproveMode && <Nav />}

      <div className="relative z-10 max-w-[95rem] mx-auto px-6 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          {!isImproveMode && (
<aside className="lg:w-[280px] shrink-0 lg:sticky lg:top-20 max-h-[calc(100vh-7rem)] flex flex-col border border-ds-stroke-soft rounded-2xl bg-ds-bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="px-2 mb-3 shrink-0">
              <p className="text-[10px] font-black text-ds-text-soft uppercase tracking-[0.3em]">
                Modules
              </p>
            </div>

            {/* Stepper (Scrollable List) */}
            <nav className="flex-1 overflow-y-auto pr-1 space-y-1">
              <ol className="space-y-1.5 relative">
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
                        className={`
                          group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                          transition-all duration-200 text-left
                          ${
                            isActive
                              ? "bg-ds-feature-lighter border border-ds-feature-base"
                              : isDone
                                ? "hover:bg-ds-bg-weak cursor-pointer"
                                : !isAuthenticated ? "hover:bg-ds-bg-weak cursor-pointer" : "opacity-50 cursor-not-allowed"
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
                                    : "text-ds-text-disabled"
                              }
                            `}
                          >
                            {section.label}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-medium text-ds-feature-base">
                              In progress
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] text-ds-success-dark font-medium">
                              Completed
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
                  {isAuthenticated ? `${progressPercent}%` : "0%"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-ds-bg-soft rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out bg-ds-feature-base"
                  style={{
                    width: `${isAuthenticated ? progressPercent : 0}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-[10px] text-ds-text-soft">
                {isAuthenticated ? `${completedSections.size} of ${SECTIONS.length} modules completed` : "Sign in to save progress"}
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
                type="button"
                onClick={() => {
                  if (currentIndex < SECTIONS.length - 1) {
                    handleSectionChange(SECTIONS[currentIndex + 1].id);
                  } else {
                    completeLesson();
                  }
                }}
                className="flex-1 py-2.5 rounded-xl text-[12px] font-bold text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-ds-feature-base/10 cursor-pointer"
              >
                {currentIndex === SECTIONS.length - 1
                  ? isLessonCompleted
                    ? "Completed ✓"
                    : "Finish Lesson ✓"
                  : "Next →"}
              </button>
            </div>
            {/* Course Hub link */}
            <div className="mt-3 pt-3 shrink-0 border-t border-ds-stroke-soft text-center">
              <Link
                href="/learn/nestjs"
                className="inline-flex items-center gap-1.5 text-xs text-ds-text-sub hover:text-ds-feature-dark transition-colors font-semibold"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>NestJS Curriculum</span>
              </Link>
            </div>
          </aside>
)}

          {/* Main Content */}
          <main className={`${isImproveMode ? "w-full min-w-0" : "flex-1 min-w-0 max-w-6xl"}`}>
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
              {renderContent()}
            </div>
            <LessonNavFooter currentSlug="nj29-swagger" />
          </main>
        </div>
      </div>
    </div>
  );
}
