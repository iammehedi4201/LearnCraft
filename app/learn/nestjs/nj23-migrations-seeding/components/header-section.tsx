"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (DATABASE MIGRATIONS & SEEDING)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Migrations & Seeding in Prisma">
      {/* ── 1.1 Why Migrations ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Version Control for Your Database"
          description="How migrations track schema changes over time across your entire team and production servers."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⏱️</span> Why Can't We Just Edit the Database Directly?
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If you manually add a column via a database GUI on your local laptop, your teammates&apos; computers and your production server won&apos;t receive that change.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            <strong>Database Migrations</strong> are like Git commits for your database structure:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li>Every change generates a timestamped SQL file (e.g. <code>20260818_add_phone_number/migration.sql</code>).</li>
            <li>You commit this SQL file to Git alongside your NestJS code.</li>
            <li>Production CI/CD pipelines automatically apply pending migrations on deployment with zero downtime!</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Architectural Blueprint Revision History">
          <p className="mb-2">
            Think of database migrations like <strong>Architectural Construction Blueprints</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Initial Build (Migration 1):</strong> &quot;Pour foundation and build 2 floors&quot; (Create initial tables).
            </li>
            <li>
              <strong>Revision 2 (Migration 2):</strong> &quot;Add an elevator shaft and fire escape&quot; (Add new columns and foreign key indexes).
            </li>
            <li>
              <strong>Every Construction Worker is Synchronized:</strong> Because every engineer follows the numbered blueprint changelog in order, every building is identical!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="In development: npx prisma migrate dev. In production CI/CD: npx prisma migrate deploy." />

        <QuickCheck
          question="What is the primary purpose of a database migration?"
          answer="To record and apply incremental schema changes (adding tables/columns) in a reproducible, version-controlled way across local, staging, and production databases."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
