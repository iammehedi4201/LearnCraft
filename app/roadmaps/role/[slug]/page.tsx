"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ROLE-BASED ROADMAP — /roadmaps/role/[slug]
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays a career path showing skill sequence for a developer role.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { use } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { RoleFlowChart } from "../../components/RoleFlowChart";
import { getRoleRoadmap } from "@/lib/roadmap-data";

export default function RoleRoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const role = getRoleRoadmap(slug);

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
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ds-text-soft mb-6">
          <Link href="/roadmaps" className="hover:text-ds-feature-base transition-colors font-medium">
            Roadmaps
          </Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-ds-text-strong font-bold">{role.title}</span>
        </nav>

        <RoleFlowChart role={role} />
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
