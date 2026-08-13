"use client";

import { Nav } from "@/components/nav";
import { Hero } from "./components/Hero";
import { CoursePaths } from "./components/CoursePaths";
import { Roadmap } from "./components/Roadmap";
import { Community } from "./components/Community";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";

/**
 * LearnHub - The primary landing page for LearnCraft.
 * Redesigned for a premium, studio-grade experience.
 * Modularized into smaller, focused components.
 * Features an interactive Hero section with live code examples.
 */
export default function LearnHub(): JSX.Element {
  return (
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <Nav />

      <main className="max-w-[95rem] mx-auto px-6 lg:px-8">
        <Hero />

        <CoursePaths />

        <Roadmap />

        <Community />

        <FAQ />
      </main>

      {/* Global Footer */}
      <Footer />
    
    </div>
  );
}
