"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-24 PAGINATION)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Prisma Migrations & Seeding"
          description="Key takeaways on schema version control, production deployments, and test datasets."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. migrate dev vs deploy</h5>
            <p className="text-xs text-ds-text-sub">Use migrate dev locally to generate SQL files; use migrate deploy in production CI/CD.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. _prisma_migrations Ledger</h5>
            <p className="text-xs text-ds-text-sub">Tracks applied migration directories and SHA-256 checksums to detect tampering.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Idempotent Seeding</h5>
            <p className="text-xs text-ds-text-sub">Always write seed scripts with upsert to avoid duplicate key errors on repeated runs.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Prisma Studio</h5>
            <p className="text-xs text-ds-text-sub">Browse, filter, and inspect data visually on localhost:5555 without third-party SQL clients.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 ⏱️ 🚀</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-23 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered database migrations, deployment workflows, and automated test seeding! Next, learn how to build high-performance Offset &amp; Cursor Pagination, Dynamic Filters, and Sorting in NJ-24!
        </p>

        <Link
          href="/learn/nestjs/nj24-pagination-filtering"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-24: Pagination, Filtering &amp; Sorting →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 05?"
        answer="NJ-24: Pagination, Filtering & Sorting (Offset pagination with skip/take, Cursor-based pagination, dynamic Prisma where filters, and orderBy sorting)."
      />
    </SectionContainer>
  );
}
