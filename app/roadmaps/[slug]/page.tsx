"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INDIVIDUAL SKILL ROADMAP — /roadmaps/[slug]
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays the full visual roadmap for a single skill.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { use } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { SkillRoadmapView } from "../components/SkillRoadmapView";
import { getSkillRoadmap } from "@/lib/roadmap-data";

export default function SkillRoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const skill = getSkillRoadmap(slug);

  if (!skill || skill.status !== "available") {
    return (
      <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong">
        <Nav />
        <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🚧</div>
            <h1 className="text-2xl font-bold text-ds-text-strong mb-3">
              {skill ? `${skill.title} — Coming Soon` : "Roadmap Not Found"}
            </h1>
            <p className="text-ds-text-sub mb-8">
              {skill
                ? "This roadmap is currently being developed. Check back soon!"
                : "The roadmap you're looking for doesn't exist."}
            </p>
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Browse All Roadmaps
            </Link>
          </div>
        </main>
        <Footer />
      </InteractiveGrid>
    );
  }

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ds-text-soft mb-6">
          <Link href="/roadmaps" className="hover:text-ds-feature-base transition-colors font-medium">
            Roadmaps
          </Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-ds-text-strong font-bold">{skill.title}</span>
        </nav>

        <SkillRoadmapView skill={skill} />
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
