"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-23 MIGRATIONS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Prisma Relations & Modeling"
          description="Key takeaways on 1:1, 1:N, and N:M relational structures."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. 1-to-1 Requires @unique</h5>
            <p className="text-xs text-ds-text-sub">Always place @unique on the foreign key column to prevent multi-profile bugs.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Eager Loading with include</h5>
            <p className="text-xs text-ds-text-sub">Pass include: &#123; posts: true &#125; to fetch related models in a single optimized query.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Implicit vs Explicit M:N</h5>
            <p className="text-xs text-ds-text-sub">Use implicit arrays for simple tags; use explicit join models when storing metadata.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Cascade Deletes</h5>
            <p className="text-xs text-ds-text-sub">Configure onDelete: Cascade to auto-cleanup tightly coupled child rows.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🔗 🗄️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-22 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered relational data modeling, foreign keys, and nested writes in Prisma! Next, learn how to manage database schema migrations and seed test data in NJ-23!
        </p>

        <Link
          href="/learn/nestjs/nj23-migrations-seeding"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-23: Migrations &amp; Database Seeding →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 05?"
        answer="NJ-23: Migrations & Database Seeding (Prisma Migrate dev vs deploy, migration history, rollbacks, and automated seed scripts)."
      />
    </SectionContainer>
  );
}
