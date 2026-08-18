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
// MODULE 2 — PRISMA MIGRATE DEV WORKFLOW
// ═══════════════════════════════════════════════════════════

export function PrismaMigrateDevSection() {
  return (
    <SectionContainer number={2} title="Development Migrations with prisma migrate dev">
      {/* ── 2.1 Migrate Dev ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Local Migration Command"
          description="How npx prisma migrate dev diffs your schema, generates SQL, applies changes, and updates TypeScript types in one step."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💻</span> Running prisma migrate dev
          </h4>
          <EnhancedCodeBlock
            code={`# Step 1: Edit your prisma/schema.prisma file
# Step 2: Run the migration command with a descriptive name:
npx prisma migrate dev --name add_profile_table

# Output:
# Prisma Migrate created and applied the following migration(s):
#   └─ 20260818153000_add_profile_table/migration.sql
# 
# ✔ Generated Prisma Client (v5.x)`}
            language="bash"
          />
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mt-3">
            Behind the scenes, Prisma generated pure SQL that was committed to your repository:
          </p>
          <EnhancedCodeBlock
            code={`-- prisma/migrations/20260818153000_add_profile_table/migration.sql
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;`}
            language="sql"
          />
        </WhyBox>

        <QuickCheck
          question="What 4 things happen automatically when you run 'npx prisma migrate dev'?"
          answer="1. Diffs schema against DB, 2. Generates an SQL migration file, 3. Applies the SQL to the local database, 4. Runs 'prisma generate' to rebuild TypeScript types."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
