"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (TESTING IN NESTJS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Automated Testing in NestJS">
      {/* ── 1.1 Why Testing Matters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Confidence to Refactor &amp; Deploy Daily"
          description="How Unit, Integration, and E2E test suites catch critical bugs before your customers ever do."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The Fear of Deploying on Friday
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Without automated tests, every code change is a terrifying gamble: &quot;Did changing the User service break the Auth login? Did editing the DTO break checkout?&quot;
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            NestJS provides first-class testing infrastructure built around <strong>Jest</strong> and <code>Test.createTestingModule()</code>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Unit Tests (10ms):</strong> Test isolated service business logic using fake mock databases.</li>
            <li><strong>E2E Tests (100ms):</strong> Test real HTTP request lifecycles (Guards, Pipes, Controllers, Interceptors) with Supertest.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Car Crash Test Facility">
          <p className="mb-2">
            Think of automated software testing like testing a new automobile:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Unit Test (Component Bench Test):</strong> Testing the alternator on a workbench to verify it produces 14V independently.
            </li>
            <li>
              <strong>Integration Test (Assembly Test):</strong> Connecting the engine to the transmission and gas pedal to make sure they communicate.
            </li>
            <li>
              <strong>E2E Test (Full Test Track Drive):</strong> Putting a crash dummy in the driver&apos;s seat, hitting the ignition, accelerating to 60mph, and braking to ensure the entire car works together in the real world!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Aim for 70% Unit Tests (fast logic checks), 20% Integration Tests (database queries), and 10% E2E Tests (critical HTTP user flows)." />

        <QuickCheck
          question="What testing utility does NestJS provide to create isolated dependency injection containers for tests?"
          answer="Test.createTestingModule() from '@nestjs/testing'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
