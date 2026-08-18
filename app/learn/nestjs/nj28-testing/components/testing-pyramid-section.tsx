"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — THE TESTING PYRAMID
// ═══════════════════════════════════════════════════════════

export function TestingPyramidSection() {
  return (
    <SectionContainer number={2} title="The Testing Pyramid: Unit vs Integration vs E2E">
      {/* ── 2.1 Testing Pyramid ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Balancing Speed, Cost &amp; Confidence"
          description="Understand the distinct purpose, execution speed, and scope of each test tier."
          color="sky"
        />

        <ComparisonTable
          headers={["Test Tier", "Scope", "Execution Speed", "Database State", "Tooling Used"]}
          rows={[
            ["Unit Test", "Single class / method in isolation", "⚡ ~5ms - 15ms per test", "100% Mocked (No DB)", "Jest / Test.createTestingModule"],
            ["Integration Test", "Service + Real Database queries", "⏱️ ~50ms - 200ms per test", "Real PostgreSQL Test DB", "Jest + Testcontainers"],
            ["E2E Test", "Full HTTP request pipeline (Guards, Pipes, Filters)", "⏱️ ~150ms - 500ms per test", "Real PostgreSQL / Supertest", "Supertest + INestApplication"],
          ]}
        />

        <QuickCheck
          question="Why shouldn't you write 100% of your test suite as E2E tests?"
          answer="Because E2E tests are significantly slower to run, harder to debug when they fail, and resource-intensive to maintain compared to fast isolated unit tests."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
