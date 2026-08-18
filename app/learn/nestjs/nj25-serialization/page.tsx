/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-25 — Transactions, Repositories & Serialization
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Advanced database & response engineering in NestJS:
 * Sequential ($transaction([])) and interactive ($transaction(async))
 * ACID database transactions, optimistic locking with version counters,
 * the Repository Pattern with custom DI tokens, ClassSerializerInterceptor
 * response shaping, @Exclude() password redaction, and PrismaClientExceptionFilter.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { getAllAnnotations } from "@/lib/revision-storage";

// Section components
import { HeaderSection } from "./components/header-section";
import { TransactionsSequentialSection } from "./components/transactions-sequential-section";
import { TransactionsInteractiveSection } from "./components/transactions-interactive-section";
import { OptimisticLockingSection } from "./components/optimistic-locking-section";
import { RepositoryPatternSection } from "./components/repository-pattern-section";
import { ClassSerializerInterceptorSection } from "./components/class-serializer-interceptor-section";
import { ExcludeExposeDecoratorsSection } from "./components/exclude-expose-decorators-section";
import { CustomTransformDecoratorsSection } from "./components/custom-transform-decorators-section";
import { DatabaseExceptionMappingSection } from "./components/database-exception-mapping-section";
import { BeginnerMistakesSection } from "./components/beginner-mistakes-section";
import { InterviewQaSection } from "./components/interview-qa-section";
import { ConceptTablesSection } from "./components/concept-tables-section";
import { CodingExercisesSection } from "./components/coding-exercises-section";
import { ClosingSections } from "./components/closing-sections";

const SECTIONS = [
  { id: "part1",  label: "The Big Picture",             icon: "🚀" },
  { id: "part2",  label: "Sequential $transaction",     icon: "⚡" },
  { id: "part3",  label: "Interactive $transaction",    icon: "🏦" },
  { id: "part4",  label: "Optimistic Locking",          icon: "🎟️" },
  { id: "part5",  label: "The Repository Pattern",      icon: "🏛️" },
  { id: "part6",  label: "ClassSerializerInterceptor",  icon: "⚙️" },
  { id: "part7",  label: "@Exclude & @Expose",          icon: "🔒" },
  { id: "part8",  label: "@Transform Custom Formatters", icon: "🎭" },
  { id: "part9",  label: "Prisma Error Filters (P2002)", icon: "🛡️" },
  { id: "part10", label: "Top 5 Beginner Mistakes",     icon: "⚠️" },
  { id: "part11", label: "Top 5 Interview Q&As",        icon: "💡" },
  { id: "part12", label: "Error & Decorators Matrix",   icon: "📊" },
  { id: "part13", label: "Transaction Coding Exercises", icon: "💻" },
  { id: "part14", label: "Phase 05 Grand Finale",       icon: "🎓" },
];

const PROGRESS_STORAGE_KEY = "learncraft_progress_nj25-serialization";

export default function NJ25Serialization(): JSX.Element {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get("highlightId");
  const sectionParam = searchParams?.get("section");

  const [activeSection, setActiveSection] = useState<string>("part1");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set(),
  );

  // Initialize from URL, highlight, or localStorage on mount
  useEffect(() => {
    // 1. URL search param has highest priority
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

    // 2. Highlight deep-link lookup
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

    // 3. Restore persisted progress from localStorage on page refresh
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

    // Persist to localStorage
    try {
      localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify({
          activeSection: sectionId,
          completedSections: Array.from(nextCompleted),
        })
      );
    } catch {}

    // Synchronize URL search param without full reload
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
      case "part2":  return <TransactionsSequentialSection />;
      case "part3":  return <TransactionsInteractiveSection />;
      case "part4":  return <OptimisticLockingSection />;
      case "part5":  return <RepositoryPatternSection />;
      case "part6":  return <ClassSerializerInterceptorSection />;
      case "part7":  return <ExcludeExposeDecoratorsSection />;
      case "part8":  return <CustomTransformDecoratorsSection />;
      case "part9":  return <DatabaseExceptionMappingSection />;
      case "part10": return <BeginnerMistakesSection />;
      case "part11": return <InterviewQaSection />;
      case "part12": return <ConceptTablesSection />;
      case "part13": return <CodingExercisesSection />;
      case "part14": return <ClosingSections />;
      default:       return <HeaderSection />;
    }
  };

  return (
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-6 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
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
                        disabled={isTodo}
                        className={`
                          group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                          transition-all duration-200 text-left
                          ${
                            isActive
                              ? "bg-ds-feature-lighter border border-ds-feature-base"
                              : isDone
                                ? "hover:bg-ds-bg-weak cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
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
                {currentIndex + 1} of {SECTIONS.length} modules
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
          <main className="flex-1 min-w-0 max-w-6xl">
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
