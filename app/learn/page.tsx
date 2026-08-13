"use client";

import { Nav } from "@/components/nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { CoursePaths } from "./components/CoursePaths";
import { PlaygroundShowcase } from "./components/PlaygroundShowcase";
import { CurriculumMatrix } from "./components/CurriculumMatrix";
import { Roadmap } from "./components/Roadmap";
import { Testimonials } from "./components/Testimonials";
import { Community } from "./components/Community";
import { FAQ } from "./components/FAQ";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";

/**
 * LearnHub - The primary landing page for LearnCraft.
 * Redesigned to 100% adherence with the LearnCraft Figma Design System tokens.
 * Features modular sections, live sandbox playgrounds, curriculum matrix, and interactive tools.
 */
export default function LearnHub(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20 overflow-x-hidden transition-colors duration-300">
      {/* Navigation Bar */}
      <Nav />

      {/* Main Content Area */}
      <main className="max-w-[95rem] mx-auto px-6 lg:px-8 space-y-4">
        {/* Hero Section */}
        <Hero />

        {/* Platform Metrics */}
        <Stats />

        {/* Core Specialization Tracks */}
        <CoursePaths />

        {/* In-Browser Playground & Learning Engine Showcase */}
        <PlaygroundShowcase />

        {/* Curriculum Topic Matrix Explorer */}
        <CurriculumMatrix />

        {/* Architect Step-by-Step Roadmap */}
        <Roadmap />

        {/* Engineer Testimonials */}
        <Testimonials />

        {/* Global Developer Community */}
        <Community />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* High-Impact Closing CTA Banner */}
        <CTABanner />
      </main>

      {/* Global Tokenized Footer */}
      <Footer />
    </InteractiveGrid>
  );
}
