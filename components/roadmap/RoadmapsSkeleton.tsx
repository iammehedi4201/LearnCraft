"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";

export function RoadmapsSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16 animate-pulse">
        {/* Page Header Skeleton */}
        <section className="max-w-3xl space-y-4">
          <div className="h-6 w-36 rounded-full bg-purple-500/15 border border-purple-500/25" />
          <div className="h-10 sm:h-12 w-72 sm:w-96 rounded-2xl bg-white/[0.1]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.04]" />
        </section>

        {/* Skill Roadmaps Section Skeleton */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="h-7 w-48 rounded-xl bg-white/[0.09]" />
              <div className="h-3.5 w-64 rounded bg-white/[0.04]" />
            </div>
          </div>

          {/* Filters: Search & Category Chips */}
          <div className="space-y-4">
            <div className="h-11 w-full max-w-md rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center px-4 gap-3">
              <div className="w-4 h-4 rounded-full bg-white/[0.08]" />
              <div className="h-3.5 w-44 rounded bg-white/[0.04]" />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-14 rounded-xl bg-purple-500/20 border border-purple-500/30" />
              {[
                "w-20",
                "w-20",
                "w-24",
                "w-16",
                "w-28",
                "w-24",
                "w-20",
              ].map((w, i) => (
                <div
                  key={i}
                  className={`h-8 ${w} rounded-xl bg-white/[0.03] border border-white/[0.06]`}
                />
              ))}
            </div>
          </div>

          {/* Skills Grid (8 Cards Wireframe) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08]" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-24 rounded bg-white/[0.09]" />
                      <div className="h-2.5 w-16 rounded bg-white/[0.04]" />
                    </div>
                  </div>
                  <div className="h-5 w-18 rounded-full bg-white/[0.05] border border-white/[0.06]" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/[0.04]" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.04]" />
                </div>

                {/* Milestones / Progress */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                  <div className="flex justify-between">
                    <div className="h-2.5 w-20 rounded bg-white/[0.04]" />
                    <div className="h-2.5 w-8 rounded bg-white/[0.06]" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}

export default RoadmapsSkeleton;

