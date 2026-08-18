"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — CASCADE DELETES & REFERENTIAL ACTIONS
// ═══════════════════════════════════════════════════════════

export function ReferentialActionsSection() {
  return (
    <SectionContainer number={6} title="Cascade Deletes & Referential Actions">
      {/* ── 6.1 Referential Actions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Controlling What Happens When Parents are Deleted"
          description="Configure onDelete: Cascade, SetNull, and Restrict in @relation."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`model User {
  id      Int      @id @default(autoincrement())
  posts   Post[]
  profile Profile?
}

model Profile {
  id     Int  @id @default(autoincrement())
  userId Int  @unique
  // ⭐ If User is deleted, their Profile is deleted automatically:
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
}`}
          language="prisma"
        />

        <ComparisonTable
          headers={["onDelete Action", "Database Behavior", "Ideal Use Case"]}
          rows={[
            ["Cascade", "Automatically deletes all child records when parent is deleted", "User profile, Post comments, Order items"],
            ["SetNull", "Sets foreign key column to NULL on child records", "Audit logs, Author re-assignment on deleted staff"],
            ["Restrict", "Blocks deletion of parent if any child records still exist", "Categories with existing products, Bank accounts with transactions"],
            ["NoAction", "Throws database foreign key constraint error", "Strict relational integrity checks"],
          ]}
        />

        <EasyRuleCard rule="Use onDelete: Cascade for tightly coupled child data (profiles, comments); use Restrict or SetNull for financial records and audit histories." />

        <QuickCheck
          question="What happens when you delete a User whose related posts have 'onDelete: Cascade' configured?"
          answer="All posts authored by that user are automatically deleted from the database in the same transaction."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
