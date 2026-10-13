"use client";

import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import { SkeletonCodeBlock } from "@/components/ui/skeleton";

export function LessonSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* 2-Column Layout: Sidebar Stepper + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center animate-pulse">
          {/* Stepper Sidebar Skeleton */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 sticky top-20 rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 shadow-xl space-y-4">
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="h-6 w-24 rounded-full bg-purple-500/15 border border-purple-500/25" />
              <div className="h-4 w-16 rounded bg-white/[0.04]" />
            </div>

            {/* Stepper Items List (7 steps wireframe matching lesson modules) */}
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl flex items-center gap-3 border ${
                    i === 1
                      ? "bg-purple-500/15 border-purple-500/30"
                      : "bg-white/[0.02] border-white/[0.04]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center ${
                      i === 1 ? "bg-purple-500/30 text-purple-300 text-xs font-bold" : "bg-white/[0.05]"
                    }`}
                  >
                    {i === 1 && <span className="text-[10px] text-purple-300">1</span>}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div
                      className={`h-3.5 rounded ${
                        i === 1 ? "w-36 bg-purple-300/30" : "w-28 bg-white/[0.06]"
                      }`}
                    />
                    <div className="h-2.5 w-16 rounded bg-white/[0.03]" />
                  </div>
                  {i === 1 && (
                    <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0 animate-ping" />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
              <div className="flex justify-between">
                <div className="h-2.5 w-16 rounded bg-white/[0.04]" />
                <div className="h-3 w-8 rounded bg-white/[0.08]" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
              <div className="h-2.5 w-32 rounded bg-white/[0.04]" />
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex gap-2 pt-1">
              <div className="flex-1 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
              <div className="flex-1 h-9 rounded-xl bg-purple-600/30 border border-purple-500/30" />
            </div>

            {/* Curriculum Hub link */}
            <div className="pt-3 border-t border-white/[0.06] text-center">
              <div className="h-3.5 w-36 mx-auto rounded bg-white/[0.04]" />
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 min-w-0 max-w-5xl space-y-8">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl space-y-8">
              {/* Lesson Header */}
              <header className="space-y-3 border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 rounded-full bg-purple-500/15 border border-purple-500/25" />
                  <div className="h-4 w-36 rounded bg-white/[0.04]" />
                </div>
                <div className="h-8 sm:h-10 w-3/4 max-w-xl rounded-xl bg-white/[0.1]" />
                <div className="h-4 w-full max-w-2xl rounded bg-white/[0.04]" />
              </header>

              {/* Part 1 Content Skeleton */}
              <div className="space-y-6">
                <div className="h-5 w-40 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-7 w-2/3 rounded-lg bg-white/[0.09]" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-white/[0.04]" />
                  <div className="h-4 w-5/6 rounded bg-white/[0.04]" />
                  <div className="h-4 w-3/4 rounded bg-white/[0.04]" />
                </div>

                {/* Concept Callout Box — Clean Dark Glassmorphic Design (NO yellow) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-purple-500/20 border border-purple-500/30" />
                    <div className="h-4 w-36 rounded bg-purple-400/25" />
                  </div>
                  <div className="space-y-2 pl-7">
                    <div className="h-3.5 w-full rounded bg-white/[0.05]" />
                    <div className="h-3.5 w-5/6 rounded bg-white/[0.04]" />
                    <div className="h-3.5 w-3/4 rounded bg-white/[0.04]" />
                  </div>
                </div>

                {/* Architecture Comparison Table Skeleton */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c101a] p-4 space-y-3">
                  <div className="h-4 w-48 rounded bg-white/[0.08]" />
                  <div className="grid grid-cols-3 gap-3 border-b border-white/[0.06] pb-2">
                    <div className="h-3 w-16 rounded bg-white/[0.05]" />
                    <div className="h-3 w-20 rounded bg-white/[0.04]" />
                    <div className="h-3 w-24 rounded bg-purple-400/20" />
                  </div>
                  {[1, 2, 3].map((r) => (
                    <div key={r} className="grid grid-cols-3 gap-3 py-1">
                      <div className="h-3 w-24 rounded bg-white/[0.06]" />
                      <div className="h-3 w-28 rounded bg-white/[0.04]" />
                      <div className="h-3 w-32 rounded bg-white/[0.06]" />
                    </div>
                  ))}
                </div>

                {/* Code Block Mockup */}
                <SkeletonCodeBlock lines={6} />
              </div>
            </div>

            {/* Footer Navigation Bar */}
            <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-xl flex items-center justify-between gap-4">
              <div className="h-10 w-36 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
              <div className="h-10 w-36 rounded-xl bg-purple-600/30 border border-purple-500/30" />
            </div>
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}

export default LessonSkeleton;
