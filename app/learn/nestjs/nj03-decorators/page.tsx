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
import { Nav } from "@/components/nav";
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

export default function NJ03Decorators(): JSX.Element {
  const [activeSection, setActiveSection] = useState("intro");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const handleSectionChange = (sectionId: string) => {
    setCompletedSections((prev) => new Set([...prev, activeSection]));
    setActiveSection(sectionId);
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
