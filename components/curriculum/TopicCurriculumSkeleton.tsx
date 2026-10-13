"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";

export function TopicCurriculumSkeleton(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 overflow-x-hidden">
      <Nav />

      <main className="flex-1 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-[28px] animate-pulse">
        {/* =========================================================================
            1. COURSE HEADER
           ========================================================================= */}
        <header className="space-y-2">
          {/* Category Eyebrow */}
          <div className="h-3.5 w-72 rounded bg-purple-400/20" />

          {/* Title */}
          <div className="h-9 sm:h-11 md:h-12 w-64 sm:w-80 rounded-2xl bg-white/[0.1] mt-1" />

          {/* Subtitle */}
          <div className="h-4 sm:h-5 w-full max-w-xl rounded bg-white/[0.04] mt-2" />

          {/* Metrics Row (e.g. 8 phases · 24 lessons · ~12 hours · 0 of 24 completed) */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="h-3.5 w-16 rounded bg-white/[0.05]" />
            <div className="h-3.5 w-20 rounded bg-white/[0.05]" />
            <div className="h-3.5 w-16 rounded bg-white/[0.05]" />
            <div className="h-3.5 w-32 rounded bg-white/[0.05]" />
          </div>
        </header>

        {/* =========================================================================
            2. PREREQUISITES CARD (BLOCK 1)
           ========================================================================= */}
        <div className="w-full rounded-[16px] bg-[#12121b] border border-[#23233a] p-6 sm:p-7 shadow-xl shadow-black/20 space-y-4">
          {/* Top Header Row: BEFORE YOU START badge + Quick self-check */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-5 w-32 rounded-md bg-purple-500/20 border border-purple-500/30" />
            <div className="h-3.5 w-24 rounded bg-white/[0.04]" />
          </div>

          {/* Heading */}
          <div className="h-6 w-64 sm:w-72 rounded-lg bg-white/[0.09]" />

          {/* Checklist items: 3 rows with checkmark box + text line */}
          <div className="mt-4 space-y-2.5 pt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-md bg-[#171428] border border-purple-500/30 shrink-0 mt-0.5" />
                <div
                  className={`h-4 rounded bg-white/[0.05] ${
                    i === 1 ? "w-3/4 max-w-md" : i === 2 ? "w-5/6 max-w-lg" : "w-2/3 max-w-sm"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Action Row: Yes, I'm ready button + refresher link */}
          <div className="mt-6 pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="h-11 w-36 rounded-xl bg-[#23233a] border border-[#2a2a44]" />
            <div className="h-4 w-56 rounded bg-purple-400/20" />
          </div>
        </div>

        {/* =========================================================================
            3. CURRENT STEP SPOTLIGHT CARD (BLOCK 2)
           ========================================================================= */}
        <div className="w-full rounded-[16px] bg-[#171428] border border-[#7c3aed]/40 p-6 sm:p-7 shadow-2xl shadow-purple-950/20 space-y-4">
          {/* Top Meta Line: Chip & Minutes */}
          <div className="flex items-center justify-between gap-3">
            <div className="h-6 w-44 rounded-md bg-purple-500/25 border border-purple-500/40" />
            <div className="h-3.5 w-14 rounded bg-white/[0.04]" />
          </div>

          {/* Big Lesson Title */}
          <div className="h-7 sm:h-8 md:h-9 w-3/4 max-w-2xl rounded-xl bg-white/[0.1]" />

          {/* Description */}
          <div className="space-y-1.5 max-w-4xl">
            <div className="h-4 w-full rounded bg-white/[0.05]" />
            <div className="h-4 w-4/5 rounded bg-white/[0.04]" />
          </div>

          {/* Action Button & Requires */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="h-11 w-40 rounded-xl bg-[#7c3aed]/60 border border-[#7c3aed]" />
            <div className="h-3.5 w-28 rounded bg-white/[0.04]" />
          </div>
        </div>

        {/* =========================================================================
            4. CURRENT PHASE SECTION (BLOCK 3)
           ========================================================================= */}
        <div className="w-full space-y-4">
          {/* Phase Header */}
          <div className="space-y-2.5">
            <div className="h-3.5 w-28 rounded bg-purple-400/20" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="h-6 sm:h-7 w-60 rounded-lg bg-white/[0.09]" />
              <div className="h-3.5 w-32 rounded bg-white/[0.04]" />
            </div>

            {/* 6px Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#23233a] overflow-hidden" />
          </div>

          {/* Lesson List (Rows matching LessonRow.tsx) */}
          <div className="space-y-3 pt-1">
            {/* Row 1: Current Step (highlighted border + button) */}
            <div className="w-full min-h-[56px] rounded-[12px] bg-[#171428] border border-[#7c3aed]/50 p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md shadow-purple-950/20">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#7c3aed]/70 border border-[#7c3aed] shrink-0" />
                <div className="space-y-1 min-w-0">
                  <div className="h-4 w-60 sm:w-80 rounded bg-white/[0.09]" />
                  <div className="h-3 w-28 rounded bg-purple-400/25" />
                </div>
              </div>
              <div className="h-8 w-28 rounded-lg bg-purple-600/40 border border-purple-500/40 shrink-0 self-end sm:self-auto" />
            </div>

            {/* Row 2: Next Step */}
            <div className="w-full min-h-[56px] rounded-[12px] bg-[#12121b] border border-[#23233a] p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#23233a] shrink-0" />
                <div className="space-y-1 min-w-0">
                  <div className="h-4 w-52 sm:w-72 rounded bg-white/[0.07]" />
                  <div className="h-3 w-28 rounded bg-white/[0.04]" />
                </div>
              </div>
              <div className="h-5 w-16 rounded bg-white/[0.05] shrink-0 self-end sm:self-auto" />
            </div>

            {/* Row 3: Locked Step */}
            <div className="w-full min-h-[56px] rounded-[12px] bg-[#0e0e16] border border-[#1b1b2b] opacity-60 p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#181822] shrink-0" />
                <div className="space-y-1 min-w-0">
                  <div className="h-4 w-56 sm:w-76 rounded bg-white/[0.05]" />
                  <div className="h-3 w-28 rounded bg-white/[0.03]" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                <div className="w-3.5 h-3.5 rounded bg-white/[0.05]" />
                <div className="h-3 w-12 rounded bg-white/[0.04]" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. ROADMAP TOGGLE (BLOCK 4)
           ========================================================================= */}
        <div className="w-full rounded-[16px] bg-[#12121b] border border-[#23233a] overflow-hidden">
          <div className="w-full min-h-[48px] px-5 py-3.5 flex items-center justify-between">
            <div className="h-4 w-60 rounded bg-white/[0.07]" />
            <div className="h-3 w-3 rounded bg-white/[0.05]" />
          </div>
        </div>

        {/* =========================================================================
            6. CAPSTONE CARD (BLOCK 5)
           ========================================================================= */}
        <div className="w-full rounded-[16px] bg-[#12121b] border border-dashed border-[#23233a] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Flag Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#171724] border border-[#23233a] shrink-0" />

            <div className="space-y-1.5 min-w-0">
              <div className="h-3 w-48 rounded bg-white/[0.04]" />
              <div className="h-5 w-56 sm:w-72 rounded bg-white/[0.08]" />
              <div className="h-3.5 w-full max-w-xl rounded bg-white/[0.04]" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <div className="w-3.5 h-3.5 rounded bg-white/[0.05]" />
            <div className="h-3 w-12 rounded bg-white/[0.04]" />
          </div>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}

export default TopicCurriculumSkeleton;
