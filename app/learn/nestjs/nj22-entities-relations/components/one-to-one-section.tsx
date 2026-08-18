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
// MODULE 2 — 1-TO-1 RELATIONS IN PRISMA
// ═══════════════════════════════════════════════════════════

export function OneToOneSection() {
  return (
    <SectionContainer number={2} title="1-to-1 Relations (User & Profile)">
      {/* ── 2.1 One-to-One ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Modeling 1-to-1 Relationships"
          description="How to connect two models where each record pairs with at most one other record."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>👤</span> The User &amp; Profile Example
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In 1-to-1 relations, the foreign key column must have <code>@unique</code> so no two profiles can reference the same user:
          </p>
          <EnhancedCodeBlock
            code={`model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  profile Profile? // 1-to-1 virtual relation field (optional)
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?
  
  // Foreign Key column:
  userId Int     @unique // ⭐ @unique ensures true 1-to-1!
  
  // Relation attribute pointing to User.id:
  user   User    @relation(fields: [userId], references: [id])
}`}
            language="prisma"
          />
        </WhyBox>

        <QuickCheck
          question="Why MUST the foreign key column (userId Int) have the '@unique' attribute in a 1-to-1 relation?"
          answer="Without @unique, multiple Profile records could store the same userId, turning the relationship into a 1-to-Many."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
