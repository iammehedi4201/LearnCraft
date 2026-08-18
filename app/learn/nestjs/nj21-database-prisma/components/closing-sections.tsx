"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-22 RELATIONS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS & Prisma Setup"
          description="Key takeaways on schema modeling, PrismaService, and type safety."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Single Source of Truth</h5>
            <p className="text-xs text-ds-text-sub">All database models and constraints live cleanly inside prisma/schema.prisma.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. PrismaService Lifecycle</h5>
            <p className="text-xs text-ds-text-sub">Connects on bootstrap with OnModuleInit and disconnects cleanly on shutdown.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Global PrismaModule</h5>
            <p className="text-xs text-ds-text-sub">Decorated with @Global() to make database access available across all feature services.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. 100% Type Safety</h5>
            <p className="text-xs text-ds-text-sub">prisma generate creates TypeScript interfaces matching every column and model.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🗄️ 🐘</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-21 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered Prisma setup, schema modeling, and dependency injection in NestJS! Next, learn how to model 1-to-1, 1-to-many, and many-to-many database relations in NJ-22!
        </p>

        <Link
          href="/learn/nestjs/nj22-entities-relations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-22: Entities, Relations &amp; Modeling →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 05?"
        answer="NJ-22: Entities, Relations & Schema Modeling (1-to-1, 1-to-Many, Many-to-Many relations, foreign keys, and onDelete cascade behavior)."
      />
    </SectionContainer>
  );
}
