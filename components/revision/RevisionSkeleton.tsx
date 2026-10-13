"use client";

import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";

export function RevisionSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 animate-pulse space-y-6">
        {/* Simple Page Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 rounded-xl bg-white/[0.1]" />
            <div className="h-4 w-72 rounded bg-white/[0.04]" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-28 rounded-xl bg-white/[0.04] border border-white/[0.06]" />
            <div className="h-9 w-36 rounded-xl bg-purple-600/30 border border-purple-500/30" />
          </div>
        </div>

        {/* Sync Status Banner Skeleton */}
        <div className="h-10 w-full rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/20" />
            <div className="h-3 w-72 rounded bg-white/[0.05]" />
          </div>
          <div className="h-4 w-20 rounded bg-white/[0.04]" />
        </div>

        {/* View Toggle & Topic Filter */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl gap-1">
            <div className="h-7 w-24 rounded-lg bg-purple-600/30" />
            <div className="h-7 w-24 rounded-lg bg-white/[0.02]" />
          </div>
          <div className="h-8 w-32 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
        </div>

        {/* Flashcard Area Skeleton */}
        <div className="space-y-4 w-full">
          {/* Progress bar and counter */}
          <div className="flex items-center justify-between text-xs">
            <div className="h-4 w-16 rounded bg-white/[0.06]" />
            <div className="h-5 w-24 rounded-full bg-purple-500/15 border border-purple-500/25" />
          </div>

          <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />

          {/* Large Interactive Flashcard Card */}
          <div className="min-h-[320px] sm:min-h-[360px] p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-2xl flex flex-col justify-between">
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <div className="h-3.5 w-16 rounded bg-purple-400/30" />
              </div>
              <div className="h-3 w-36 rounded bg-white/[0.04]" />
            </div>

            {/* Question Text Wireframe */}
            <div className="py-8 my-auto space-y-3 max-w-3xl">
              <div className="h-7 sm:h-9 w-4/5 rounded-xl bg-white/[0.1]" />
              <div className="h-6 sm:h-7 w-3/5 rounded-lg bg-white/[0.08]" />
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
              <div className="h-3.5 w-44 rounded bg-white/[0.04]" />
              <div className="h-3.5 w-20 rounded bg-purple-400/30" />
            </div>
          </div>

          {/* SM-2 Grading Buttons Wireframe */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { label: "Again", tint: "border-rose-500/20 bg-rose-500/5" },
              { label: "Hard", tint: "border-white/[0.08] bg-white/[0.03]" },
              { label: "Good", tint: "border-purple-500/20 bg-purple-500/5" },
              { label: "Easy", tint: "border-emerald-500/20 bg-emerald-500/5" },
            ].map((btn, i) => (
              <div
                key={i}
                className={`py-3 px-3 rounded-2xl border ${btn.tint} flex flex-col items-center justify-center space-y-1.5`}
              >
                <div className="h-3.5 w-12 rounded bg-white/[0.08]" />
                <div className="h-2.5 w-8 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </InteractiveGrid>
  );
}

export default RevisionSkeleton;
