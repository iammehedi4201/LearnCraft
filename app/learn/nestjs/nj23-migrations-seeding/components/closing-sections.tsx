"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — MILESTONE SUMMARY & NEXT STEP (NJ-15 PAGINATION)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={14}
          title="Summary of NestJS Lifecycle & State Seeding"
          description="Key takeaways on bootstrap hooks, headless contexts, and graceful termination."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Async Initialization via OnModuleInit</h5>
            <p className="text-xs text-ds-text-sub">Never perform async queries in constructors; execute asynchronous setup cleanly inside OnModuleInit.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Headless Contexts for CLI Jobs</h5>
            <p className="text-xs text-ds-text-sub">Use NestFactory.createApplicationContext() to run seeders and batch scripts without starting an HTTP listener.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Idempotent State Seeding</h5>
            <p className="text-xs text-ds-text-sub">Check for natural key existence before insertion so re-running seeds never creates duplicates or crashes.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Graceful Teardown</h5>
            <p className="text-xs text-ds-text-sub">Enable app.enableShutdownHooks() in main.ts and clear intervals in onModuleDestroy() to avoid zombie processes.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 ⏱️ 🌱</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-14 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered NestJS lifecycle hooks, application bootstrapping, and idempotent state seeding! Next, learn how to build high-performance Pagination, Dynamic Filtering, and Sorting in NJ-15!
        </p>

        <Link
          href="/learn/nestjs/nj24-pagination-filtering"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-15: Pagination, Filtering &amp; Sorting →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in the NestJS Building HTTP APIs progression?"
        answer="NJ-15: Pagination, Filtering & Sorting (Offset vs Cursor pagination, DTO validation for query parameters, and dynamic filtering algorithms)."
      />
    </SectionContainer>
  );
}
