"use client";

import { Nav } from "@/components/nav";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { CoursePaths } from "./components/CoursePaths";
import { Roadmap } from "./components/Roadmap";
import { Testimonials } from "./components/Testimonials";
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
    <div className="min-h-screen  bg-background text-foreground selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <Nav />

      <main className="max-w-7xl mx-auto">
        {/* Hero Section - High impact entry point with interactive code snippets */}
        <Hero />

        {/* Stats Section - Social proof and platform scale */}
        <Stats />

        {/* Course Paths - Interactive entry points to curriculums */}
        <CoursePaths />

        {/* Roadmap Section - Visual progression guide */}
        <Roadmap />

        {/* Testimonials - Trusted by industry experts */}
        <Testimonials />

        {/* Community Hub - Discord and GitHub integration */}
        <Community />

        {/* FAQ - Addressing common student inquiries */}
        <FAQ />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Background Decorative Glows */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] -mr-96 -mt-96" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] -ml-96 -mb-96" />
      </div>
    </div>
  );
}
