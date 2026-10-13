"use client";

import { InteractiveGrid } from "@/components/interactive-grid";

export function TrackPracticeSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white/[0.06]" />
            <div className="h-3.5 w-24 rounded bg-white/[0.05]" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-28 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
            <div className="h-7 w-20 rounded-full bg-purple-500/15 border border-purple-500/25" />
          </div>
        </div>

        {/* Progress & Track Header */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08]" />
              <div className="space-y-1.5">
                <div className="h-4 w-40 rounded bg-white/[0.1]" />
                <div className="h-3 w-32 rounded bg-white/[0.04]" />
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="h-4 w-12 rounded bg-white/[0.08] ml-auto" />
              <div className="h-2.5 w-14 rounded bg-white/[0.04] ml-auto" />
            </div>
          </div>

          <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
        </div>

        {/* Flashcard Skeleton */}
        <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-8 lg:p-10 space-y-8 min-h-[420px] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Badges: Difficulty, Category, SM-2 interval */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-5 w-20 rounded-full bg-purple-500/15 border border-purple-500/25" />
                <div className="h-5 w-24 rounded bg-white/[0.04]" />
              </div>
              <div className="h-5 w-28 rounded-full bg-white/[0.04]" />
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <div className="h-6 w-4/5 rounded-lg bg-white/[0.1]" />
              <div className="h-6 w-3/5 rounded-lg bg-white/[0.08]" />
            </div>

            {/* Code Block Wireframe */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.06] space-y-2 font-mono">
              <div className="h-3.5 w-2/3 rounded bg-white/[0.06]" />
              <div className="h-3.5 w-1/2 rounded bg-white/[0.04] ml-4" />
              <div className="h-3.5 w-3/4 rounded bg-white/[0.04]" />
            </div>
          </div>

          {/* Action / Reveal Button Wireframe */}
          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
            <div className="h-3.5 w-36 rounded bg-white/[0.04]" />
            <div className="h-11 w-44 rounded-xl bg-purple-600/30 border border-purple-500/30" />
          </div>
        </div>
      </div>
    </InteractiveGrid>
  );
}

export default TrackPracticeSkeleton;
