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
// MODULE 7 — TROUBLESHOOTING & MIGRATION RESOLUTION
// ═══════════════════════════════════════════════════════════

export function RollbackTroubleshootingSection() {
  return (
    <SectionContainer number={7} title="Troubleshooting Failed Migrations & Reset">
      {/* ── 7.1 Migration Troubleshooting ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Resolving Failed Migrations with prisma migrate resolve"
          description="How to recover when a migration fails halfway on production."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛠️</span> Migration Recovery Commands
          </h4>
          <EnhancedCodeBlock
            code={`# 1. If a production migration failed and you reverted the SQL manually:
# Tell Prisma to mark the migration as rolled back:
npx prisma migrate resolve --rolled-back "20260818120000_add_column"

# 2. If you fixed the SQL manually on the database:
# Tell Prisma to mark the migration as successfully applied:
npx prisma migrate resolve --applied "20260818120000_add_column"

# 3. In LOCAL DEVELOPMENT ONLY:
# Completely wipe the DB, rerun all migrations from scratch, and execute seed:
npx prisma migrate reset`}
            language="bash"
          />
        </WhyBox>

        <EasyRuleCard rule="Use 'npx prisma migrate reset' locally to recreate a clean development database and seed fresh mock data in 5 seconds." />

        <QuickCheck
          question="What does 'npx prisma migrate reset' do in local development?"
          answer="It drops the entire local database, recreates it, executes every migration file in order from step 1, and automatically executes the seed script."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
