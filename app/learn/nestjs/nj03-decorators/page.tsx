/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-03 — Decorators Deep Dive
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Decorators are special functions that attach metadata to classes, methods,
 * properties, or parameters. They use the @ syntax and are THE defining feature
 * of NestJS. Without understanding decorators, NestJS code looks like magic.
 *
 * WHY THIS MATTERS FOR NESTJS
 * ───────────────────────────
 * Every NestJS concept uses decorators:
 * @Module, @Controller, @Injectable, @Get, @Post, @Body, @Param, @UseGuards...
 * They tell NestJS HOW to wire your classes together.
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express has no decorators. You wire everything manually with app.get(),
 * app.use(), etc. NestJS decorators are declarative — they describe WHAT
 * your code does, not HOW to wire it.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { getAllAnnotations } from "@/lib/revision-storage";
import { PageSidebar } from "@/components/page-sidebar";
import { PageHeader } from "./components/PageHeader";
import { Section1WhatAreDecorators } from "./components/Section1WhatAreDecorators";
import { Section2ClassDecorators } from "./components/Section2ClassDecorators";
import { Section3MethodDecorators } from "./components/Section3MethodDecorators";
import { Section4ParameterDecorators } from "./components/Section4ParameterDecorators";
import { Section5PropertyDecorators } from "./components/Section5PropertyDecorators";
import { Section6ExpressVsNestJS } from "./components/Section6ExpressVsNestJS";
import { MiniChallenge } from "./components/MiniChallenge";
import { CommonMistakes } from "./components/CommonMistakes";
import { Summary } from "./components/Summary";
import { NextStep } from "./components/NextStep";

const SECTIONS = [
  { id: "intro", label: "Welcome", icon: "🚀" },
  { id: "what-are-decorators", label: "What Are Decorators", icon: "🎁" },
  { id: "class-decorators", label: "Class Decorators", icon: "📦" },
  { id: "method-decorators", label: "Method Decorators", icon: "🔧" },
  { id: "parameter-decorators", label: "Parameter Decorators", icon: "📥" },
  { id: "property-decorators", label: "Property Decorators", icon: "🏷️" },
  { id: "express-vs-nestjs", label: "Express vs NestJS", icon: "⚖️" },
  { id: "challenge", label: "Challenge & Review", icon: "🏆" },
];

const PROGRESS_STORAGE_KEY = "learncraft_progress_nj03-decorators";

export default function NJ03Decorators(): JSX.Element {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get("highlightId");
  const sectionParam = searchParams?.get("section");

  const [activeSection, setActiveSection] = useState<string>("intro");
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
        // Clean highlightId from URL so refresh does not force-jump to this note
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

    // Synchronize URL search param without full reload and delete highlightId
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("highlightId");
      url.searchParams.set("section", sectionId);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "intro":
        return <PageHeader />;
      case "what-are-decorators":
        return <Section1WhatAreDecorators />;
      case "class-decorators":
        return <Section2ClassDecorators />;
      case "method-decorators":
        return <Section3MethodDecorators />;
      case "parameter-decorators":
        return <Section4ParameterDecorators />;
      case "property-decorators":
        return <Section5PropertyDecorators />;
      case "express-vs-nestjs":
        return <Section6ExpressVsNestJS />;
      case "challenge":
        return (
          <>
            <MiniChallenge />
            <CommonMistakes />
            <Summary />
            <NextStep />
          </>
        );
      default:
        return <PageHeader />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] text-slate-900 dark:text-slate-300">
      <Nav />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-0 py-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-7 items-start justify-center">
          {/* Sidebar */}
          <PageSidebar
            sections={SECTIONS}
            activeSection={activeSection}
            completedSections={completedSections}
            onSectionChange={handleSectionChange}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-5xl pb-12">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
