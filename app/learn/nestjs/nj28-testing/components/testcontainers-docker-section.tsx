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
// MODULE 8 — REAL DATABASE TESTING WITH TESTCONTAINERS
// ═══════════════════════════════════════════════════════════

export function TestcontainersDockerSection() {
  return (
    <SectionContainer number={8} title="Real Database Testing with Testcontainers">
      {/* ── 8.1 Testcontainers ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Ephemeral Docker Databases for CI/CD"
          description="Spin up a real PostgreSQL Docker container on the fly during Jest integration tests."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🐳</span> The Testcontainers Pattern
          </h4>
          <EnhancedCodeBlock
            code={`# npm install @testcontainers/postgresql --save-dev

import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

describe('Integration with Real PostgreSQL Container', () => {
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    // 1. Spin up ephemeral PostgreSQL container in Docker:
    container = await new PostgreSqlContainer('postgres:16-alpine').start();
    const dbUrl = container.getConnectionUri();

    process.env.DATABASE_URL = dbUrl;

    // 2. Run Prisma migrations on the ephemeral container:
    execSync('npx prisma migrate deploy', { env: process.env });
  }, 30000); // 30s timeout for Docker spin-up

  afterAll(async () => {
    // 3. Destroy container cleanly:
    await container.stop();
  });

  it('runs true PostgreSQL queries with real constraints', async () => {
    // True database testing!
  });
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the benefit of Testcontainers over mocking Prisma in integration tests?"
          answer="Testcontainers runs tests against a real PostgreSQL engine, verifying true SQL syntax, foreign key constraints, triggers, and transactions that mocks cannot accurately simulate."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
