"use client";

import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";

export function CurriculumHubSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-6 lg:px-8 space-y-16 py-8 md:py-12 animate-pulse">
        {/* Hero Section Skeleton */}
        <section className="pt-8 pb-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl flex-1">
            <div className="h-6 w-48 rounded-full bg-purple-500/15 border border-purple-500/25" />
            <div className="space-y-3">
              <div className="h-10 sm:h-14 w-full rounded-2xl bg-white/[0.1]" />
              <div className="h-10 sm:h-14 w-4/5 rounded-2xl bg-white/[0.08]" />
            </div>
            <div className="space-y-2 max-w-xl">
              <div className="h-4 w-full rounded bg-white/[0.04]" />
              <div className="h-4 w-5/6 rounded bg-white/[0.04]" />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="h-11 w-40 rounded-xl bg-purple-600/30 border border-purple-500/30" />
              <div className="h-11 w-36 rounded-xl bg-white/[0.04] border border-white/[0.08]" />
            </div>
          </div>

          {/* Interactive Code Preview Window Mockup */}
          <div className="flex-1 max-w-xl w-full">
            <div className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                <div className="h-3 w-32 rounded bg-white/[0.05] ml-2" />
              </div>
              <div className="space-y-2.5 font-mono">
                <div className="h-3.5 w-3/4 rounded bg-white/[0.08]" />
                <div className="h-3.5 w-1/2 rounded bg-white/[0.05] ml-4" />
                <div className="h-3.5 w-2/3 rounded bg-white/[0.05] ml-4" />
                <div className="h-3.5 w-1/3 rounded bg-white/[0.05] ml-8" />
                <div className="h-3.5 w-4/5 rounded bg-white/[0.05] ml-4" />
                <div className="h-3.5 w-1/4 rounded bg-white/[0.05]" />
              </div>
            </div>
          </div>
        </section>

        {/* Role & Skill Paths Section Skeleton */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="h-5 w-36 rounded-full bg-purple-500/15" />
            <div className="h-8 w-64 rounded-xl bg-white/[0.1]" />
            <div className="h-4 w-96 rounded bg-white/[0.04]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08]" />
                  <div className="h-5 w-20 rounded-full bg-white/[0.04]" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-44 rounded bg-white/[0.1]" />
                  <div className="h-3.5 w-full rounded bg-white/[0.04]" />
                  <div className="h-3.5 w-4/5 rounded bg-white/[0.04]" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 rounded-md bg-white/[0.04]" />
                  <div className="h-6 w-16 rounded-md bg-white/[0.04]" />
                  <div className="h-6 w-16 rounded-md bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </InteractiveGrid>
  );
}

export default CurriculumHubSkeleton;

