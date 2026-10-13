"use client";

import { InteractiveGrid } from "@/components/interactive-grid";

export function TrackBrowseSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-white/[0.05]" />
            <span className="text-white/[0.2]">/</span>
            <div className="h-4 w-24 rounded bg-white/[0.05]" />
            <span className="text-white/[0.2]">/</span>
            <div className="h-4 w-20 rounded bg-purple-500/20" />
          </div>

          <div className="h-9 w-36 rounded-xl bg-purple-600/25 border border-purple-500/30" />
        </div>

        {/* Hero Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08]" />
              <div className="space-y-2">
                <div className="h-6 sm:h-7 w-64 sm:w-80 rounded-xl bg-white/[0.1]" />
                <div className="h-4 w-44 rounded bg-white/[0.04]" />
              </div>
            </div>
            <div className="h-6 w-24 rounded-full bg-white/[0.05]" />
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
          {/* Search Bar */}
          <div className="h-10 w-full rounded-xl bg-black/40 border border-white/[0.06] flex items-center px-3.5 gap-2.5">
            <div className="w-4 h-4 rounded-full bg-white/[0.08]" />
            <div className="h-3.5 w-64 rounded bg-white/[0.04]" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="h-7 w-14 rounded-lg bg-purple-500/20 border border-purple-500/40" />
            <div className="h-7 w-24 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
            <div className="h-7 w-28 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
            <div className="h-7 w-20 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
          </div>
        </div>

        {/* Q&A Accordion Items (5 items wireframe) */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-16 rounded bg-emerald-500/15 border border-emerald-500/25" />
                    <div className="h-4 w-24 rounded bg-white/[0.04]" />
                  </div>
                  <div className="h-5 w-4/5 rounded-lg bg-white/[0.09]" />
                </div>
                <div className="w-6 h-6 rounded bg-white/[0.04] shrink-0" />
              </div>

              {/* Tags & Footer */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
                <div className="h-4 w-16 rounded bg-white/[0.03]" />
                <div className="h-4 w-14 rounded bg-white/[0.03]" />
                <div className="h-4 w-20 rounded bg-white/[0.03]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </InteractiveGrid>
  );
}

export default TrackBrowseSkeleton;

