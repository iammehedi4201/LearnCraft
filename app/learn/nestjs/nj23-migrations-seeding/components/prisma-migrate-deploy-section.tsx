"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — PRODUCTION DEPLOYMENT (PRISMA MIGRATE DEPLOY)
// ═══════════════════════════════════════════════════════════

export function PrismaMigrateDeploySection() {
  return (
    <SectionContainer number={4} title="Production Deployment with prisma migrate deploy">
      {/* ── 4.1 Production Deploy ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Safe Non-Interactive Migrations in CI/CD"
          description="How to apply pending SQL migrations in production without prompting for inputs."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> Production CI/CD &amp; Docker Startup
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In production (Docker, Kubernetes, AWS, Railway), run <code>prisma migrate deploy</code> before starting the application:
          </p>
          <EnhancedCodeBlock
            code={`# package.json
{
  "scripts": {
    "build": "nest build",
    "prisma:generate": "prisma generate",
    "prisma:deploy": "prisma migrate deploy",
    "start:prod": "node dist/main.js"
  }
}

# Production Container Entrypoint:
# Runs pending SQL migrations first, then starts the NestJS server:
npm run prisma:deploy && npm run start:prod`}
            language="json"
          />
        </WhyBox>

        <EasyRuleCard rule="NEVER run 'prisma migrate dev' in production. Always use 'npx prisma migrate deploy' in deployment scripts." />

        <QuickCheck
          question="What happens if 'npx prisma migrate deploy' encounters an unapplied migration during a production release?"
          answer="It executes the pending SQL migration files sequentially in transaction blocks, updates the _prisma_migrations table, and exits with code 0 on success."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
