"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — PHASE 05 GRAND FINALE & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Phase 05 Grand Finale &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Database Engineering in NestJS"
          description="Key takeaways on ACID transactions, clean repositories, and response serialization."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Atomic Transactions</h5>
            <p className="text-xs text-ds-text-sub">Use prisma.$transaction() for multi-step mutations to guarantee all-or-nothing rollback safety.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Optimistic Locking</h5>
            <p className="text-xs text-ds-text-sub">Add version numbers to models to prevent concurrent seat overbooking without heavy row locks.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Repository Pattern</h5>
            <p className="text-xs text-ds-text-sub">Abstract Prisma behind interfaces to decouple business logic and simplify unit testing.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Response Serialization</h5>
            <p className="text-xs text-ds-text-sub">Use ClassSerializerInterceptor and @Exclude() to eliminate password leaks from JSON responses.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Phase 05 Capstone Celebration ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🏆 🐘 🗄️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Phase 05 (Database Layer &amp; Prisma) Complete!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          Phenomenal achievement! You have mastered all 5 database lessons:
          <strong> Prisma Setup (NJ-21)</strong>, <strong>Relations &amp; Modeling (NJ-22)</strong>, <strong>Migrations &amp; Seeding (NJ-23)</strong>, <strong>Pagination &amp; Filters (NJ-24)</strong>, and <strong>Transactions &amp; Serialization (NJ-25)</strong>!
        </p>

        <Link
          href="/learn/nestjs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Return to NestJS Roadmap Hub 🏠
        </Link>
      </div>

      <QuickCheck
        question="What is the next and final phase in the complete NestJS curriculum?"
        answer="Phase 06: Production Engineering & DevOps (NJ-26 Config & Env, NJ-27 Pino Logging, NJ-28 Unit & E2E Testing, NJ-29 Swagger OpenAPI, NJ-30 S3 File Uploads, NJ-31 Redis Caching, NJ-32 Docker Deployment)!"
      />
    </SectionContainer>
  );
}
