"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER TESTING MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Testing Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Unit &amp; E2E Testing Pitfalls"
          description="Avoid these common mistakes that lead to flaky test suites and hanging CI processes."
          color="primary"
        />

        <MistakeBox
          title="Forgetting await on Async Assertions"
          description="Omitting await on expect(...).rejects.toThrow() causes the test to pass prematurely without verifying the error."
          wrong={`// ❌ Test passes falsely even if service doesn't throw:
it('fails on missing user', () => {
  expect(service.findById(99)).rejects.toThrow();
});`}
          right={`// ✅ Correctly awaits the promise rejection:
it('fails on missing user', async () => {
  await expect(service.findById(99)).rejects.toThrow();
});`}
        />

        <MistakeBox
          title="Forgetting app.close() in E2E afterAll"
          description="Failing to shut down the Nest application leaves open database and HTTP server sockets, causing Jest to hang in CI/CD."
          wrong={`// ❌ Leaves open handles; Jest hangs:
afterAll(async () => {});`}
          right={`// ✅ Closes all sockets and connections cleanly:
afterAll(async () => {
  await app.close();
});`}
        />

        <MistakeBox
          title="Not Clearing Mocks Between Tests"
          description="Mock counters (toHaveBeenCalledTimes) accumulate between tests unless reset in afterEach."
          wrong={`// ❌ Second test fails because findUnique was called in previous test`}
          right={`// ✅ Reset mock state cleanly:
afterEach(() => {
  jest.clearAllMocks();
});`}
        />

        <QuickCheck
          question="Why does Jest output a 'A worker process has failed to exit gracefully' warning?"
          answer="Because an asynchronous resource (such as a database connection or NestJS HTTP server) was not closed with 'await app.close()' in the afterAll teardown."
        />
      </div>
    </SectionContainer>
  );
}
