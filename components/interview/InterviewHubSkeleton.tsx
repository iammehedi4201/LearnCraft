"use client";

import { InteractiveGrid } from "@/components/interactive-grid";

export function InterviewHubSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Top Breadcrumb & Mock Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-white/[0.05]" />
            <span className="text-white/[0.2]">/</span>
            <div className="h-4 w-24 rounded bg-purple-500/20" />
          </div>

          <div className="h-9 w-44 rounded-xl bg-purple-600/25 border border-purple-500/30" />
        </div>

        {/* Hero Card */}
        <div className="relative rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-10 overflow-hidden backdrop-blur-xl space-y-6">
          <div className="space-y-4 max-w-3xl">
            <div className="h-6 w-64 rounded-full bg-purple-500/15 border border-purple-500/30" />
            <div className="h-10 sm:h-12 w-3/4 max-w-xl rounded-2xl bg-white/[0.1]" />
            <div className="space-y-2 max-w-2xl">
              <div className="h-4 w-full rounded bg-white/[0.05]" />
              <div className="h-4 w-4/5 rounded bg-white/[0.04]" />
            </div>
          </div>

          {/* Quick Stats Bar (4 columns) */}
          <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Questions", color: "bg-white/[0.08]" },
              { label: "Due for Review", color: "bg-white/[0.08]" },
              { label: "Mastered Questions", color: "bg-white/[0.08]" },
              { label: "Overall Mastery", color: "bg-purple-500/25" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2"
              >
                <div className="h-3 w-20 rounded bg-white/[0.05]" />
                <div className={`h-7 w-12 rounded-lg ${stat.color}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="h-10 w-full max-w-md rounded-xl bg-[#0E121B] border border-white/[0.08] flex items-center px-3.5 gap-2.5">
            <div className="w-4 h-4 rounded-full bg-white/[0.08]" />
            <div className="h-3.5 w-52 rounded bg-white/[0.04]" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-40 rounded-xl bg-white/[0.03] border border-white/[0.08]" />
            <div className="h-4 w-28 rounded bg-white/[0.04]" />
          </div>
        </div>

        {/* Topic Cards Grid (6 Cards Wireframe) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between space-y-5"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08]" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-28 rounded bg-white/[0.09]" />
                      <div className="h-3 w-20 rounded bg-white/[0.04]" />
                    </div>
                  </div>
                  <div className="h-5 w-14 rounded-full bg-purple-500/15 border border-purple-500/25" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/[0.04]" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.04]" />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <div className="h-4 w-14 rounded bg-white/[0.04] border border-white/[0.06]" />
                  <div className="h-4 w-16 rounded bg-white/[0.04] border border-white/[0.06]" />
                  <div className="h-4 w-12 rounded bg-white/[0.04] border border-white/[0.06]" />
                </div>
              </div>

              {/* Mastery Bar & Buttons */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 w-12 rounded bg-white/[0.04]" />
                    <div className="h-3 w-16 rounded bg-white/[0.06]" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                  <div className="h-8 rounded-xl bg-purple-600/30 border border-purple-500/30" />
                  <div className="h-8 rounded-xl bg-white/[0.04] border border-white/[0.06]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InteractiveGrid>
  );
}

export default InterviewHubSkeleton;
