"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — PRISMA DB PUSH VS MIGRATE DEV
// ═══════════════════════════════════════════════════════════

export function PrismaDbPushSection() {
  return (
    <SectionContainer number={5} title="Prototyping: prisma db push vs prisma migrate dev">
      {/* ── 5.1 db push vs migrate ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="When to Use db push vs True Migrations"
          description="Understand the difference between instant schema syncing and version-controlled migration files."
          color="rose"
        />

        <ComparisonTable
          headers={["Feature", "npx prisma db push", "npx prisma migrate dev"]}
          rows={[
            ["Generates SQL Files?", "❌ No", "✅ Yes (stored in prisma/migrations)"],
            ["Best For", "Rapid local prototyping & hackathons", "Production teamwork & staging releases"],
            ["Data Loss Risk", "⚠️ High (can drop columns instantly)", "🛡️ Low (prompts and shows exact SQL changes)"],
            ["History Ledger", "Does NOT record in _prisma_migrations", "Records full history with checksums"],
          ]}
        />

        <PredictOutputBox
          code={`# Scenario: You rename column "phoneNumber" to "mobile" in schema.prisma
# And run: npx prisma db push`}
          answer={`Predicted Outcome of db push:\n\nPrisma will detect that "phoneNumber" was removed and "mobile" was added.\nIt will warn: "You are about to drop the column 'phoneNumber' with 500 rows of data."\n\nIf confirmed with --accept-data-loss, all existing phone numbers are permanently deleted!\n(With 'migrate dev', you can customize the generated SQL to rename the column without losing data!)`}
        />

        <QuickCheck
          question="Why should 'prisma db push' NEVER be used on production databases?"
          answer="Because it directly syncs schemas without recording migration history, which can accidentally drop tables or columns and cause permanent data loss."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
