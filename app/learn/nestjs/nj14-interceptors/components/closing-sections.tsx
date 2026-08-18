"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-15 EXCEPTION FILTERS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Interceptors"
          description="Everything you need to remember about AOP and response transformation."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Wraps Before &amp; After</h5>
            <p className="text-xs text-ds-text-sub">Executes code both before the controller starts and after it returns data.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. RxJS map() &amp; tap()</h5>
            <p className="text-xs text-ds-text-sub">Use map() to shape response envelopes and tap() for performance logging.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Short-Circuiting with of()</h5>
            <p className="text-xs text-ds-text-sub">Bypass controller methods entirely when serving cached responses.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. The Onion Model</h5>
            <p className="text-xs text-ds-text-sub">Inbound runs Outside-In (Global first), outbound runs Inside-Out (Method first).</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🔄 ⚡</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-14 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You now know how to intercept, benchmark, cache, and transform API responses using NestJS Interceptors. Next, learn how Exception Filters catch and format all server errors uniformly!
        </p>

        <Link
          href="/learn/nestjs/nj15-exception-filters"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-15: Exception Filters →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 03?"
        answer="NJ-15: Exception Filters (Catching errors globally, custom exception hierarchies, and standardized error schemas)."
      />
    </SectionContainer>
  );
}
