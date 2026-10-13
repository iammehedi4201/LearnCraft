"use client";

import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";

export function DashboardSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 flex flex-col selection:bg-purple-500/20 font-sans">
      <Nav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8 animate-pulse">
        {/* 1. Hero Banner Skeleton */}
        <div className="relative rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="h-5 w-48 rounded-full bg-white/[0.08]" />
                <div className="h-4 w-32 rounded-full bg-white/[0.04]" />
              </div>
              <div className="h-9 w-72 rounded-xl bg-white/[0.1]" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded-md bg-white/[0.05]" />
                <div className="h-4 w-4/5 rounded-md bg-white/[0.04]" />
              </div>
            </div>

            {/* Level Card Widget Skeleton */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4 shrink-0 max-w-sm w-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.08] shrink-0" />
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-28 rounded bg-white/[0.08]" />
                  <div className="h-4 w-16 rounded bg-purple-500/20" />
                </div>
                <div className="h-2 w-full rounded-full bg-white/[0.08]" />
                <div className="flex justify-between">
                  <div className="h-3 w-24 rounded bg-white/[0.04]" />
                  <div className="h-3 w-8 rounded bg-white/[0.04]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Continue Learning Recommendation Card Skeleton */}
        <div className="relative rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-7 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 shrink-0" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-32 rounded bg-purple-500/20" />
                  <div className="h-4 w-20 rounded bg-white/[0.04]" />
                </div>
                <div className="h-6 w-64 sm:w-80 rounded-lg bg-white/[0.1]" />
                <div className="h-3.5 w-44 rounded bg-white/[0.05]" />
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden sm:block space-y-1 text-right">
                <div className="h-3 w-16 rounded bg-white/[0.04] ml-auto" />
                <div className="h-4 w-12 rounded bg-purple-400/20 ml-auto" />
              </div>
              <div className="h-11 w-44 rounded-xl bg-purple-600/30 border border-purple-500/30" />
            </div>
          </div>
        </div>

        {/* 3. Charts Row: XP Progression (2 cols) + Track Mastery Donut (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* XP Line Chart Skeleton */}
          <div className="lg:col-span-2 rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 space-y-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-5 w-44 rounded bg-white/[0.1]" />
                <div className="h-3.5 w-60 rounded bg-white/[0.04]" />
              </div>
              <div className="h-8 w-24 rounded-lg bg-white/[0.05]" />
            </div>
            {/* Chart Area Wireframe */}
            <div className="h-64 sm:h-72 w-full rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-end p-4 gap-3">
              {[30, 45, 25, 60, 50, 75, 40, 85, 70, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/[0.05] rounded-t-lg transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Donut Chart Skeleton */}
          <div className="lg:col-span-1 rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-1.5">
              <div className="h-5 w-36 rounded bg-white/[0.1]" />
              <div className="h-3.5 w-48 rounded bg-white/[0.04]" />
            </div>
            {/* Circular Donut Placeholder */}
            <div className="h-48 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-8 border-white/[0.06] border-t-purple-500/30 border-r-blue-500/30 flex items-center justify-center">
                <div className="w-16 h-4 rounded bg-white/[0.08]" />
              </div>
            </div>
            {/* Legend Skeletons */}
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-white/[0.04]" />
              <div className="h-3 w-4/5 rounded bg-white/[0.03]" />
              <div className="h-3 w-2/3 rounded bg-white/[0.03]" />
            </div>
          </div>
        </div>

        {/* 4. Activity & Streak Heatmap Skeleton */}
        <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="h-5 w-52 rounded bg-white/[0.1]" />
              <div className="h-3.5 w-64 rounded bg-white/[0.04]" />
            </div>
            <div className="flex gap-4">
              <div className="h-9 w-28 rounded-xl bg-white/[0.05]" />
              <div className="h-9 w-28 rounded-xl bg-white/[0.05]" />
            </div>
          </div>

          {/* 52-column calendar grid dots */}
          <div className="h-28 w-full rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3 flex flex-wrap gap-1.5 overflow-hidden">
            {Array.from({ length: 120 }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded bg-white/[0.04]" />
            ))}
          </div>
        </div>

        {/* 5. Spaced Repetition / Readiness Skeleton */}
        <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-48 rounded bg-white/[0.1]" />
            <div className="h-7 w-24 rounded bg-white/[0.05]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] space-y-2">
                <div className="h-3.5 w-16 rounded bg-white/[0.05]" />
                <div className="h-6 w-12 rounded bg-white/[0.1]" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </InteractiveGrid>
  );
}
