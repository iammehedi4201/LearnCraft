"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — TEST STATE ISOLATION & LIFECYCLE TEARDOWN
// ═══════════════════════════════════════════════════════════

export function TestDatabaseLifecycleSection() {
  return (
    <SectionContainer number={7} title="Test State Isolation &amp; Lifecycle Teardown">
      {/* ── 7.1 State Isolation ── */}
      <div className="mb-16">
        <TopicHeader
          number={7}
          title="Guaranteeing Test Independence & Clean Teardown"
          description="How to reset in-memory state between tests and close the testing module to avoid memory leaks."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧹</span> Complete Test Lifecycle Harness
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Every test must run in a pristine sandbox. Reset repository collections in <code>beforeEach</code> and gracefully close the testing module in <code>afterAll</code>:
          </p>
          <EnhancedCodeBlock
            code={`describe('CatalogService Integration Harness', () => {
  let app: INestApplication;
  let repo: InMemoryCatalogRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatalogModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    repo = app.get(CATALOG_REPOSITORY);
  });

  // ⭐ Reset state before each individual test case:
  beforeEach(async () => {
    await repo.clear();
  });

  // ⭐ Crucial: Close application to trigger OnModuleDestroy and release sockets:
  afterAll(async () => {
    await app.close();
  });

  it('runs against an empty catalog', async () => {
    const items = await repo.findAll();
    expect(items).toHaveLength(0);
  });
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why must 'await app.close()' be called inside the afterAll() hook of an integration or E2E test?"
          answer="It triggers all OnModuleDestroy and BeforeApplicationShutdown hooks, closes open HTTP listeners, and allows the Jest test runner to exit without hanging indefinitely."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
