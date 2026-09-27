"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ROADMAPS HUB PAGE — /roadmaps
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Discovery page for all role-based and skill-based roadmaps.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { RoadmapFilter } from "./components/RoadmapFilter";
import { SkillCard } from "./components/SkillCard";
import {
  SKILL_ROADMAPS,
  getSkillsByCategory,
} from "@/lib/roadmap-data";
import type { SkillCategory } from "@/lib/roadmap-data";

function RoadmapsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");

  useEffect(() => {
    if (categoryParam) {
      if (categoryParam === "all") {
        setActiveCategory("all");
      } else if (
        ["frontend", "backend", "database", "devops", "architecture", "language"].includes(
          categoryParam,
        )
      ) {
        setActiveCategory(categoryParam as SkillCategory);
      }
    }
  }, [categoryParam]);

  const filteredSkills = useMemo(() => {
    let skills =
      activeCategory === "all"
        ? SKILL_ROADMAPS
        : getSkillsByCategory(activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      skills = skills.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }

    // Sort: available first, then coming-soon
    return [...skills].sort((a, b) => {
      if (a.status === "available" && b.status !== "available") return -1;
      if (a.status !== "available" && b.status === "available") return 1;
      return 0;
    });
  }, [searchQuery, activeCategory]);

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
        {/* ═══════════════════════════════════════════════════════════════
            PAGE HEADER
           ═══════════════════════════════════════════════════════════════ */}
        <section className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter text-ds-feature-dark text-xs font-bold border border-ds-feature-light mb-5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span>Learning Roadmaps</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ds-text-strong leading-tight">
            Explore Roadmaps
          </h1>
          <p className="text-base sm:text-lg text-ds-text-sub mt-2">
            Structured learning paths to guide your developer journey from
            fundamentals to production mastery.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SKILL ROADMAPS
           ═══════════════════════════════════════════════════════════════ */}
        <section id="skill-roadmaps" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ds-text-strong tracking-tight">
                Skill Roadmaps
              </h2>
              <p className="text-sm text-ds-text-sub mt-1">
                Deep-dive into individual technologies and frameworks.
              </p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-ds-stroke-soft to-transparent hidden md:block mb-3" />
          </div>

          {/* Filters */}
          <div className="mb-8">
            <RoadmapFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-16">
              <p className="text-ds-text-soft text-sm">
                No roadmaps match your search.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}

export default function RoadmapsPage() {
  return (
    <Suspense fallback={null}>
      <RoadmapsContent />
    </Suspense>
  );
}
