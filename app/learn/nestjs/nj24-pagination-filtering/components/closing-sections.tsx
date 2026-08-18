"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-25 TRANSACTIONS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Pagination, Filtering & Sorting"
          description="Key takeaways on query performance, offset vs cursor pagination, and DTO transformation."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Offset vs Cursor</h5>
            <p className="text-xs text-ds-text-sub">Use Offset for page-numbered search results; use Cursor for infinite scrolls and massive tables.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Parallel Querying</h5>
            <p className="text-xs text-ds-text-sub">Always run findMany and count in Promise.all to cut database response time in half.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Strict DTO Max Caps</h5>
            <p className="text-xs text-ds-text-sub">Enforce @Max(100) on limits to prevent memory exhaustion and server crashes.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Sort Whitelisting</h5>
            <p className="text-xs text-ds-text-sub">Validate sort column names against allowed arrays to prevent errors and leakage.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 📄 ⚡</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-24 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered high-performance database pagination, dynamic multi-field filtering, and safe sorting! Next, finish Phase 05 with Database Transactions, Clean Repository Patterns, and Response Serialization in NJ-25!
        </p>

        <Link
          href="/learn/nestjs/nj25-serialization"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-25: Transactions, Repositories &amp; Serialization →
        </Link>
      </div>

      <QuickCheck
        question="What is the final lesson in Phase 05?"
        answer="NJ-25: Transactions, Repositories & Serialization (Interactive $transaction, optimistic locking, Repository pattern abstraction, and ClassSerializerInterceptor)."
      />
    </SectionContainer>
  );
}
