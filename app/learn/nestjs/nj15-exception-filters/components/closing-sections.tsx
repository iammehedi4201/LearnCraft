"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-16 MIDDLEWARE)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Exception Filters"
          description="Everything you need to remember about centralized error handling."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Typed Exceptions</h5>
            <p className="text-xs text-ds-text-sub">Throw built-in classes like NotFoundException rather than returning custom error objects.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. @Catch() Catch-All</h5>
            <p className="text-xs text-ds-text-sub">Catches raw runtime errors and database crashes without crashing the process.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Structured Error Schema</h5>
            <p className="text-xs text-ds-text-sub">Format all errors with statusCode, timestamp, path, error, and traceId.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. APP_FILTER Token</h5>
            <p className="text-xs text-ds-text-sub">Binds global filters in AppModule while keeping access to Dependency Injection.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🚨 🛡️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-15 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered universal error handling and exception formatting in NestJS. Next, explore the foundational entry point of the pipeline: NestJS Middleware!
        </p>

        <Link
          href="/learn/nestjs/nj16-middleware"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-16: Middleware (Phase 03 Finale) →
        </Link>
      </div>

      <QuickCheck
        question="What is the final lesson in Phase 03 (Request Pipeline)?"
        answer="NJ-16: Middleware (Express compatibility, functional vs class middleware, Morgan logging, and Helmet integration)."
      />
    </SectionContainer>
  );
}
