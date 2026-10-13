"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";

export function TopicCurriculumSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 overflow-x-hidden">
      <Nav />

      <main className="flex-1 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-[28px] animate-pulse">
        {/* 1. Course Header */}
        <header className="space-y-3">
          <div className="h-4 w-48 rounded bg-purple-500/20" />
          <div className="h-10 sm:h-12 w-64 sm:w-80 rounded-2xl bg-white/[0.1]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.04]" />
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="h-4 w-20 rounded bg-white/[0.04]" />
            <div className="h-4 w-24 rounded bg-white/[0.04]" />
            <div className="h-4 w-16 rounded bg-white/[0.04]" />
            <div className="h-4 w-36 rounded bg-white/[0.04]" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] mt-2" />
        </header>

        {/* 2. Prerequisite Checklist Card Wireframe */}
        <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/25" />
            <div className="space-y-1">
              <div className="h-4 w-48 rounded bg-white/[0.09]" />
              <div className="h-3 w-64 rounded bg-white/[0.04]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3"
              >
                <div className="w-4 h-4 rounded bg-white/[0.06]" />
                <div className="h-3.5 w-28 rounded bg-white/[0.05]" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Active Next Step Card Wireframe (CurrentStepCard) */}
        <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-purple-500/20" />
                <div className="h-6 w-64 sm:w-80 rounded-lg bg-white/[0.1]" />
                <div className="h-3.5 w-48 rounded bg-white/[0.04]" />
              </div>
            </div>
            <div className="h-11 w-44 rounded-xl bg-purple-600/30 border border-purple-500/30 shrink-0" />
          </div>
        </div>

        {/* 4. Phased Learning Path Timeline Wireframe */}
        <div className="space-y-4">
          {/* Phase 1 Header */}
          <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 rounded-md bg-purple-500/15 border border-purple-500/25" />
              <div className="h-5 w-48 rounded bg-white/[0.09]" />
            </div>
            <div className="h-4 w-20 rounded bg-white/[0.04]" />
          </div>

          {/* Phase 1 Lessons List */}
          <div className="pl-4 sm:pl-6 space-y-2.5 border-l-2 border-white/[0.06] ml-4 sm:ml-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#0c101a] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] shrink-0" />
                  <div className="space-y-1">
                    <div className="h-4 w-44 sm:w-60 rounded bg-white/[0.08]" />
                    <div className="h-3 w-28 rounded bg-white/[0.04]" />
                  </div>
                </div>
                <div className="h-7 w-20 rounded-lg bg-white/[0.04]" />
              </div>
            ))}
          </div>

          {/* Phase 2 Header */}
          <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 rounded-md bg-white/[0.05]" />
              <div className="h-5 w-44 rounded bg-white/[0.06]" />
            </div>
            <div className="h-4 w-20 rounded bg-white/[0.04]" />
          </div>

          {/* Phase 3 Header */}
          <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 rounded-md bg-white/[0.05]" />
              <div className="h-5 w-40 rounded bg-white/[0.06]" />
            </div>
            <div className="h-4 w-20 rounded bg-white/[0.04]" />
          </div>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}

export default TopicCurriculumSkeleton;
