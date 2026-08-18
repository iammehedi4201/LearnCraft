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
// MODULE 7 — TEST DATABASE ISOLATION & TEARDOWN
// ═══════════════════════════════════════════════════════════

export function TestDatabaseLifecycleSection() {
  return (
    <SectionContainer number={7} title="Test Database Isolation &amp; Teardown">
      {/* ── 7.1 Database Cleanup ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Cleaning State Between Tests"
          description="Ensure test independence by wiping database tables between test suites."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧹</span> Automated Database Truncate Utility
          </h4>
          <EnhancedCodeBlock
            code={`// test/utils/clean-db.ts
import { PrismaClient } from '@prisma/client';

export async function cleanDatabase(prisma: PrismaClient) {
  // ⭐ Truncates all tables and resets auto-increment sequences in milliseconds:
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>\`
    SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename != '_prisma_migrations';
  \`;

  const tables = tablenames
    .map(({ tablename }) => \`"\${tablename}"\`)
    .join(', ');

  if (tables.length > 0) {
    await prisma.$executeRawUnsafe(\`TRUNCATE TABLE \${tables} RESTART IDENTITY CASCADE;\`);
  }
}

// Usage in beforeEach:
beforeEach(async () => {
  await cleanDatabase(prisma);
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is TRUNCATE TABLE ... RESTART IDENTITY CASCADE preferred over DELETE FROM in test cleanup?"
          answer="TRUNCATE is dramatically faster (it deallocates data pages directly rather than deleting row-by-row) and resets auto-incrementing ID primary keys back to 1."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
