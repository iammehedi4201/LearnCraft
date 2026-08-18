"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-29 SWAGGER)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Automated Testing in NestJS"
          description="Key takeaways on Jest unit testing, deep Prisma mocks, and Supertest E2E suites."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Test.createTestingModule</h5>
            <p className="text-xs text-ds-text-sub">Instantiates lightweight in-memory DI containers for fast, isolated unit test execution.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. jest-mock-extended</h5>
            <p className="text-xs text-ds-text-sub">Deep-mocks all Prisma models and methods with 100% type safety in 1 line of code.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Supertest E2E</h5>
            <p className="text-xs text-ds-text-sub">Executes true HTTP requests testing Guards, Pipes, Controllers, and Exception Filters end-to-end.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Test Database Cleanup</h5>
            <p className="text-xs text-ds-text-sub">Use TRUNCATE CASCADE in beforeEach to guarantee complete isolation between test suites.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🧪 🛡️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-28 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered Unit testing, Prisma mocking, and Supertest E2E lifecycles! Next, learn how to auto-generate interactive API documentation with Swagger &amp; OpenAPI in NJ-29!
        </p>

        <Link
          href="/learn/nestjs/nj29-swagger"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-29: Swagger &amp; OpenAPI Documentation →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 06?"
        answer="NJ-29: Swagger & OpenAPI Documentation (@nestjs/swagger, DocumentBuilder, @ApiProperty, @ApiResponse, @ApiBearerAuth, and Swagger UI at /api/docs)."
      />
    </SectionContainer>
  );
}
