"use client";

import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-12 mb-8">
      <div className="rounded-3xl bg-ds-bg-white border border-ds-stroke-soft p-8 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden text-center">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter">
            <span className="text-xs font-bold tracking-wider text-ds-feature-dark uppercase">
              Start Learning Today
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-ds-text-strong">
            Ready to Build Production-Grade Web Systems?
          </h2>

          <p className="text-sm sm:text-base text-ds-text-sub leading-relaxed max-w-xl mx-auto">
            Choose your specialization track below and master modern architectural patterns with interactive in-browser exercises.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/learn/nextjs"
              className="px-6 py-3 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold rounded-xl shadow-md shadow-ds-feature-base/15 transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2"
            >
              Start Next.js Track
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/learn/tanstack"
              className="px-6 py-3 bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong font-bold rounded-xl border border-ds-stroke-soft transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2"
            >
              Start TanStack Query Track
            </Link>

            <Link
              href="/learn/nestjs"
              className="px-6 py-3 bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong font-bold rounded-xl border border-ds-stroke-soft transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2"
            >
              Start NestJS Track
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
