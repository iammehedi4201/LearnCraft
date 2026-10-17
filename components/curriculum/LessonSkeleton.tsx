"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LESSON SKELETON LOADER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Wireframe placeholder displayed while dynamic lesson pages are loading.
 * Accurately mirrors DataDrivenLessonView's single-column vertical stacked
 * layout with top borderless PartStepper and centered card.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import { SkeletonCodeBlock } from "@/components/ui/skeleton";

export function LessonSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <div className="relative z-10 max-w-6xl xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 animate-pulse">
        {/* Module Header & Breadcrumb Row */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 rounded bg-white/[0.06]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-28 rounded bg-white/[0.04] hidden sm:inline-block" />
            <div className="h-5 w-16 rounded-full bg-purple-500/15 border border-purple-500/25" />
            <div className="h-4 w-44 rounded bg-white/[0.08]" />
            <div className="h-4 w-16 rounded bg-white/[0.04] hidden sm:inline-block" />
          </div>
        </div>

        {/* Top Borderless Stepper Skeleton (matching PartStepper) */}
        <div className="rounded-2xl bg-[#0E121B]/95 backdrop-blur-md shadow-xl shadow-black/30 px-5 sm:px-6 py-3 sm:py-3.5 mb-6 space-y-2.5">
          {/* Label Row */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-24 rounded bg-white/[0.08]" />
              <div className="h-3.5 w-3 rounded bg-white/[0.04]" />
              <div className="h-3.5 w-44 rounded bg-purple-400/20" />
            </div>
            <div className="h-3.5 w-10 rounded bg-white/[0.06]" />
          </div>

          {/* 7 Horizontal Equal Segments */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 sm:h-2 rounded-full ${
                  i === 1
                    ? "bg-purple-400 ring-2 ring-purple-400/40"
                    : "bg-white/[0.08]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Focused Centered Lesson Card Skeleton */}
        <main className="w-full flex flex-col rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative">
          <div className="p-6 sm:p-8 lg:p-10 flex-1 space-y-12 sm:space-y-14">
            {/* Part 1 Skeleton */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-44 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-8 sm:h-10 w-2/3 rounded-xl bg-white/[0.1]" />
              <div className="space-y-2 max-w-3xl">
                <div className="h-4 w-full rounded bg-white/[0.05]" />
                <div className="h-4 w-5/6 rounded bg-white/[0.04]" />
                <div className="h-4 w-3/4 rounded bg-white/[0.04]" />
              </div>

              {/* Analogy Box Skeleton */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="h-4 w-36 rounded bg-amber-400/20" />
                <div className="h-3.5 w-full rounded bg-white/[0.04]" />
                <div className="h-3.5 w-4/5 rounded bg-white/[0.03]" />
              </div>

              {/* Breakdown Items Box */}
              <div className="p-6 rounded-2xl bg-[#090C14] border border-white/[0.08] space-y-3">
                <div className="h-4 w-32 rounded bg-purple-400/20" />
                <div className="space-y-2.5">
                  <div className="h-3.5 w-full rounded bg-white/[0.04]" />
                  <div className="h-3.5 w-5/6 rounded bg-white/[0.04]" />
                  <div className="h-3.5 w-4/6 rounded bg-white/[0.04]" />
                </div>
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* Part 2 Skeleton: 3-Card Grid */}
            <div className="space-y-6">
              <div className="h-6 w-48 rounded-full bg-purple-500/15 border border-purple-500/25" />
              <div className="h-7 w-1/2 rounded-xl bg-white/[0.09]" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3">
                    <div className="h-4 w-28 rounded bg-white/[0.08]" />
                    <div className="h-3.5 w-full rounded bg-white/[0.04]" />
                    <div className="h-20 rounded-xl bg-black/40 border border-white/[0.04]" />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* Part 5 / Code Block Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-52 rounded-full bg-purple-500/15 border border-purple-500/25" />
              <SkeletonCodeBlock lines={6} />
            </div>

            {/* End of Page Single CTA */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="h-4 w-64 rounded bg-white/[0.05]" />
              <div className="h-11 w-40 rounded-xl bg-purple-600/30 border border-purple-500/30" />
            </div>
          </div>
        </main>
      </div>
    </InteractiveGrid>
  );
}

export default LessonSkeleton;
