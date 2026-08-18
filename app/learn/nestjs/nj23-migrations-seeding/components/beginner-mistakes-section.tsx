"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER MIGRATION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Migration Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Migration & Seeding Errors"
          description="Avoid these common pitfalls that break production deployments."
          color="primary"
        />

        <MistakeBox
          title="Running prisma migrate dev in Production"
          description="migrate dev is an interactive tool that can prompt to reset the database. In CI/CD pipelines and production, it will abort."
          wrong={`# ❌ In production deployment scripts:
npx prisma migrate dev`}
          right={`# ✅ In production deployment scripts:
npx prisma migrate deploy`}
        />

        <MistakeBox
          title="Manually Editing Applied migration.sql Files"
          description="Editing an SQL file that was already applied triggers a Checksum Mismatch error on subsequent migrations."
          wrong={`// ❌ Manually changing an old migration.sql file to fix a typo`}
          right={`// ✅ Generate a NEW migration (npx prisma migrate dev) with the fix`}
        />

        <MistakeBox
          title="Using create Instead of upsert in Seed Scripts"
          description="Using create causes the seed script to fail on the second run because unique fields (like email) will throw duplicate key errors."
          wrong={`// ❌ Fails on second seed run:
await prisma.user.create({ data: { email: 'admin@test.com' } });`}
          right={`// ✅ Safe and idempotent:
await prisma.user.upsert({
  where: { email: 'admin@test.com' },
  update: {},
  create: { email: 'admin@test.com' },
});`}
        />

        <QuickCheck
          question="Why should you create a new migration instead of editing an existing migration.sql file?"
          answer="Because Prisma computes a cryptographic SHA-256 checksum for every applied migration; altering an existing file breaks the checksum validation and halts future deployments."
        />
      </div>
    </SectionContainer>
  );
}
