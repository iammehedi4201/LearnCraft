"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ROLE-BASED ROADMAP — /roadmaps/role/[slug]
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays a career path showing skill sequence for a developer role.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { use, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { RoleFlowChart } from "../../components/RoleFlowChart";
import { Roadmap } from "@/app/learn/components/Roadmap";
import { getRoleRoadmap } from "@/lib/roadmap-data";
import type { JourneyRole } from "@/lib/roadmap-journey-data";

export default function RoleRoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const role = getRoleRoadmap(slug);
  const [viewMode, setViewMode] = useState<"guided" | "flowchart">("guided");

  const isGuidedRole = slug === "backend" || slug === "frontend" || slug === "fullstack";

  if (!role) {
    return (
      <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong">
        <Nav />
        <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🔍</div>
            <h1 className="text-2xl font-bold text-ds-text-strong mb-3">
              Career Path Not Found
            </h1>
            <p className="text-ds-text-sub mb-8">
              The career path you&apos;re looking for doesn&apos;t exist.
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
        {/* Breadcrumb & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs text-ds-text-soft">
            <Link href="/roadmaps" className="hover:text-ds-feature-base transition-colors font-medium">
              Roadmaps
            </Link>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-ds-text-strong font-bold">{role.title}</span>
          </nav>

          {isGuidedRole && (
            <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode("guided")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "guided"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ✨ Guided Journey
              </button>
              <button
                type="button"
                onClick={() => setViewMode("flowchart")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "flowchart"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📊 Technical Flowchart
              </button>
            </div>
          )}
        </div>

        {isGuidedRole && viewMode === "guided" ? (
          <Roadmap initialRole={slug as JourneyRole} showSwitcher={true} />
        ) : (
          <RoleFlowChart role={role} />
        )}
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
