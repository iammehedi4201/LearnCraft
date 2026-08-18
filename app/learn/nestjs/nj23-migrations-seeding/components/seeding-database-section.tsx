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
// MODULE 6 — DATABASE SEEDING WITH PRISMA/SEED.TS
// ═══════════════════════════════════════════════════════════

export function SeedingDatabaseSection() {
  return (
    <SectionContainer number={6} title="Database Seeding with prisma/seed.ts">
      {/* ── 6.1 Database Seeding ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Populating Initial & Test Data Automatically"
          description="Write idempotent seed scripts with upsert to create admin accounts and default categories."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌱</span> Writing the Seed Script
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Create <code>prisma/seed.ts</code> using <code>upsert</code> so re-running the seed never duplicates records:
          </p>
          <EnhancedCodeBlock
            code={`// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  // ⭐ Use upsert: Updates if exists, creates if missing (idempotent):
  const admin = await prisma.user.upsert({
    where: { email: 'admin@learncraft.dev' },
    update: {},
    create: {
      email: 'admin@learncraft.dev',
      name: 'Super Administrator',
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('✅ Seeded super admin:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });`}
            language="typescript"
          />
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed my-3">
            Configure the seed command in <code>package.json</code>:
          </p>
          <EnhancedCodeBlock
            code={`// package.json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}`}
            language="json"
          />
        </WhyBox>

        <QuickCheck
          question="Why should database seed scripts use 'upsert' instead of 'create'?"
          answer="Because 'upsert' is idempotent: running the seed script multiple times will safely update or skip existing records without crashing with duplicate unique key errors."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
