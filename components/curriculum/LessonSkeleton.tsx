"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LESSON SKELETON LOADER — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal wireframe placeholder displayed while dynamic lesson pages are loading.
 * Accurately mirrors DataDrivenLessonView's full 7-part vertical layout:
 * 1. Overview & Real-Life Analogy
 * 2. Core Concepts & Mechanics
 * 3. Mental Model & Architecture
 * 4. Common Pitfalls vs Clean Solution (Side-by-Side Comparison)
 * 5. Interactive Code Sandbox (Editor + Console output)
 * 6. Summary & Key Takeaways
 * 7. Knowledge Check Quiz
 * + Bottom Navigation Footer
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
            <div className="h-3.5 w-3 rounded bg-white/[0.04]" />
            <div className="h-4 w-24 rounded bg-white/[0.06]" />
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

        {/* Full Comprehensive 7-Part Lesson Card Skeleton */}
        <main className="w-full flex flex-col rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative mb-12">
          <div className="p-6 sm:p-8 lg:p-10 flex-1 space-y-12 sm:space-y-14">

            {/* ─── Part 1: Overview & Real-Life Analogy ─── */}
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

            {/* ─── Part 2: Core Concepts (3-Card Grid) ─── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-48 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-7 sm:h-8 w-1/2 rounded-xl bg-white/[0.09]" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="p-5 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3">
                    <div className="h-4 w-28 rounded bg-white/[0.08]" />
                    <div className="h-3.5 w-full rounded bg-white/[0.04]" />
                    <div className="h-3.5 w-4/5 rounded bg-white/[0.03]" />
                    <div className="h-24 rounded-xl bg-black/40 border border-white/[0.04]" />
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                <div className="h-4 w-32 rounded bg-purple-400/30" />
                <div className="h-3.5 w-3/4 rounded bg-purple-300/20" />
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* ─── Part 3: Deep Dive & Architectural Structure ─── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-52 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-7 sm:h-8 w-1/2 rounded-xl bg-white/[0.09]" />
              <div className="space-y-4">
                {[1, 2].map((dive) => (
                  <div key={dive} className="p-5 sm:p-6 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-500/15" />
                      <div className="h-4 w-48 rounded bg-white/[0.09]" />
                    </div>
                    <div className="h-3.5 w-full rounded bg-white/[0.04]" />
                    <div className="h-3.5 w-5/6 rounded bg-white/[0.04]" />
                    <div className="space-y-1.5 pl-4 pt-1">
                      <div className="h-3 w-4/5 rounded bg-white/[0.03]" />
                      <div className="h-3 w-3/4 rounded bg-white/[0.03]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* ─── Part 4: Common Pitfalls vs Clean Solution (Side-by-Side) ─── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-56 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-7 w-36 rounded-full bg-purple-500/15 border border-purple-500/30" />
              </div>
              <div className="h-7 sm:h-8 w-1/2 rounded-xl bg-white/[0.09]" />
              {/* Core Challenge Callout */}
              <div className="p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 space-y-1">
                <div className="h-3.5 w-44 rounded bg-amber-400/30" />
                <div className="h-3.5 w-4/5 rounded bg-amber-300/20" />
              </div>
              {/* 2-Column Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {/* Bad / Anti-Pattern Card */}
                <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 w-48 rounded bg-rose-500/30" />
                    <div className="h-[180px] rounded-xl bg-black/50 border border-white/[0.06]" />
                  </div>
                  <div className="h-3.5 w-5/6 rounded bg-rose-400/20 pt-2" />
                </div>
                {/* Good / Clean Solution Card */}
                <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 w-48 rounded bg-emerald-500/30" />
                    <div className="h-[180px] rounded-xl bg-black/50 border border-white/[0.06]" />
                  </div>
                  <div className="h-3.5 w-5/6 rounded bg-emerald-400/20 pt-2" />
                </div>
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* ─── Part 5: Interactive Code Sandbox ─── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-52 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-24 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-7 sm:h-8 w-1/2 rounded-xl bg-white/[0.09]" />
              <div className="h-4 w-2/3 rounded bg-white/[0.05]" />
              {/* Sandbox Editor & Console Frame */}
              <div className="rounded-2xl bg-[#090C14] border border-white/[0.08] overflow-hidden">
                <div className="h-10 px-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/40" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                    <div className="h-3.5 w-20 rounded bg-white/[0.06] ml-2" />
                  </div>
                  <div className="h-7 w-20 rounded-lg bg-purple-600/30" />
                </div>
                <div className="p-4">
                  <SkeletonCodeBlock lines={8} />
                </div>
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* ─── Part 6: Key Takeaways & Summary ─── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-48 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-7 sm:h-8 w-1/2 rounded-xl bg-white/[0.09]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((t) => (
                  <div key={t} className="p-4 rounded-xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20" />
                      <div className="h-3.5 w-32 rounded bg-white/[0.08]" />
                    </div>
                    <div className="h-3 w-5/6 rounded bg-white/[0.04]" />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-t border-white/[0.08]" />

            {/* ─── Part 7: Knowledge Check Quiz ─── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-48 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-16 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-7 sm:h-8 w-1/2 rounded-xl bg-white/[0.09]" />
              {/* Quiz Card */}
              <div className="p-6 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-4">
                <div className="h-4 w-3/4 rounded bg-white/[0.08]" />
                <div className="space-y-2.5 pt-2">
                  {[1, 2, 3, 4].map((opt) => (
                    <div key={opt} className="h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center px-4 gap-3">
                      <div className="w-4 h-4 rounded-full bg-white/[0.08]" />
                      <div className="h-3.5 w-2/3 rounded bg-white/[0.05]" />
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <div className="h-10 w-32 rounded-xl bg-purple-600/30" />
                </div>
              </div>
            </div>

            {/* ─── Lesson Navigation Footer Banner ─── */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="h-10 w-36 rounded-xl bg-white/[0.04] border border-white/[0.08]" />
              <div className="h-4 w-40 rounded bg-white/[0.04]" />
              <div className="h-12 w-44 rounded-xl bg-purple-600/40 border border-purple-500/40" />
            </div>

          </div>
        </main>
      </div>
    </InteractiveGrid>
  );
}

export default LessonSkeleton;
