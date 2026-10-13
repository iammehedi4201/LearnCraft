"use client";

import { InteractiveGrid } from "@/components/interactive-grid";

export function MockInterviewSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-white/[0.05]" />
          <span className="text-white/[0.2]">/</span>
          <div className="h-4 w-28 rounded bg-white/[0.05]" />
          <span className="text-white/[0.2]">/</span>
          <div className="h-4 w-24 rounded bg-purple-500/20" />
        </div>

        {/* Hero Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-4">
          <div className="h-6 w-52 rounded-full bg-purple-500/15 border border-purple-500/25" />
          <div className="h-9 sm:h-11 w-3/4 max-w-lg rounded-2xl bg-white/[0.1]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.04]" />
        </div>

        {/* Configuration Sections Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-8">
          {/* Track Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-44 rounded bg-white/[0.08]" />
              <div className="h-4 w-24 rounded bg-white/[0.04]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center px-3 gap-2"
                >
                  <div className="w-5 h-5 rounded-md bg-white/[0.06]" />
                  <div className="h-3 w-16 rounded bg-white/[0.06]" />
                </div>
              ))}
            </div>
          </div>

          {/* Question Count & Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
            <div className="space-y-3">
              <div className="h-4 w-36 rounded bg-white/[0.08]" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-14 rounded-xl bg-white/[0.04] border border-white/[0.06]" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 w-36 rounded bg-white/[0.08]" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-14 rounded-xl bg-white/[0.04] border border-white/[0.06]" />
                ))}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="h-12 w-full rounded-2xl bg-purple-600/30 border border-purple-500/30" />
          </div>
        </div>
      </div>
    </InteractiveGrid>
  );
}

export default MockInterviewSkeleton;

