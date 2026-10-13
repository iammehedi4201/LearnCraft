"use client";

import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";

export function NotesSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 pb-24">
      <Nav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-pulse">
        {/* 1. Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-10 sm:pt-14 pb-2">
          <div className="space-y-2.5">
            <div className="h-10 sm:h-12 w-56 sm:w-72 rounded-2xl bg-white/[0.1]" />
            <div className="h-4 w-64 sm:w-80 rounded bg-white/[0.04]" />
          </div>

          <div className="h-11 w-32 rounded-2xl bg-purple-500/25 border border-purple-500/30" />
        </div>

        {/* 2. Search Bar */}
        <div className="mt-8">
          <div className="h-12 w-full rounded-xl bg-[#0e121d] border border-white/[0.08] flex items-center px-4 gap-3">
            <div className="w-4 h-4 rounded-full bg-white/[0.1] shrink-0" />
            <div className="h-3.5 w-64 sm:w-96 rounded bg-white/[0.05]" />
          </div>
        </div>

        {/* 3. Filter Chips (Uniform subtle styling, no random harsh colors) */}
        <div className="flex flex-wrap items-center gap-2 py-2 mt-5">
          <div className="h-7 w-14 rounded-full bg-purple-500/20 border border-purple-500/40" />
          {[
            "w-20",
            "w-24",
            "w-24",
            "w-20",
            "w-22",
            "w-28",
            "w-24",
            "w-20",
          ].map((w, i) => (
            <div
              key={i}
              className={`h-7 ${w} rounded-full bg-white/[0.03] border border-white/[0.06]`}
            />
          ))}
        </div>

        {/* 4. Notes Grid (6 Cards Wireframe) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 items-stretch">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-[#0c101a] border border-white/[0.08] rounded-2xl p-6 min-h-[280px] flex flex-col justify-between space-y-4"
            >
              {/* Card Header: Badges & Dots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 rounded-md bg-white/[0.08]" />
                    <div className="h-4 w-24 rounded bg-white/[0.04]" />
                  </div>
                  <div className="w-5 h-5 rounded bg-white/[0.05]" />
                </div>

                {/* Note Title */}
                <div className="space-y-1.5">
                  <div className="h-5 w-4/5 rounded bg-white/[0.09]" />
                  <div className="h-3 w-1/3 rounded bg-white/[0.04]" />
                </div>

                {/* Excerpt Content or Code Mockup */}
                {i % 2 === 0 ? (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05] space-y-2">
                    <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
                    <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <div className="h-3.5 w-full rounded bg-white/[0.05]" />
                    <div className="h-3.5 w-11/12 rounded bg-white/[0.04]" />
                    <div className="h-3.5 w-4/5 rounded bg-white/[0.04]" />
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="h-3 w-20 rounded bg-white/[0.04]" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/[0.04]" />
                  <div className="w-6 h-6 rounded-lg bg-white/[0.04]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </InteractiveGrid>
  );
}

export default NotesSkeleton;
