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
// MODULE 8 — COMPOSITE KEYS & COMPOUND INDEXES
// ═══════════════════════════════════════════════════════════

export function CompositeKeysIndexesSection() {
  return (
    <SectionContainer number={8} title="Composite Keys & Compound Indexes">
      {/* ── 8.1 Indexes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Multi-Column Constraints & Query Performance"
          description="Accelerate queries and enforce unique pairs with @@id, @@unique, and @@index."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Schema Index Attributes
          </h4>
          <EnhancedCodeBlock
            code={`model Article {
  id        Int      @id @default(autoincrement())
  authorId  Int
  status    String   // "DRAFT", "PUBLISHED"
  createdAt DateTime @default(now())

  // ⭐ Compound Index: Speeds up queries like "WHERE authorId = 10 AND status = 'PUBLISHED'":
  @@index([authorId, status])
}

model OrganizationMember {
  orgId  Int
  userId Int

  // ⭐ Multi-column Unique Constraint (User can only join an org once):
  @@unique([orgId, userId])
}`}
            language="prisma"
          />
        </WhyBox>

        <QuickCheck
          question="Why are compound indexes (@@index([authorId, status])) important in large database tables?"
          answer="They allow PostgreSQL to jump directly to the matching rows in milliseconds instead of scanning millions of rows sequentially."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
