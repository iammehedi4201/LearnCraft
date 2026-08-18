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
// MODULE 4 — IMPLICIT MANY-TO-MANY RELATIONS
// ═══════════════════════════════════════════════════════════

export function ManyToManyImplicitSection() {
  return (
    <SectionContainer number={4} title="Implicit Many-to-Many Relations (Posts & Tags)">
      {/* ── 4.1 Implicit M-to-N ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Zero-Boilerplate Many-to-Many"
          description="Let Prisma automatically manage the underlying join table."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> Clean Many-to-Many Syntax
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Simply declare arrays on both sides of the relationship:
          </p>
          <EnhancedCodeBlock
            code={`model Post {
  id    Int    @id @default(autoincrement())
  title String
  tags  Tag[]  // ⭐ Array of Tags
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[] // ⭐ Array of Posts
}

// Prisma automatically creates the PostgreSQL join table: "_PostToTag"
// Querying a post with its tags:
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: { tags: true },
});`}
            language="prisma"
          />
        </WhyBox>

        <QuickCheck
          question="What is an 'implicit' many-to-many relationship in Prisma?"
          answer="A many-to-many relation where you define arrays on both models without creating a dedicated join model; Prisma automatically creates and manages the intermediate SQL table behind the scenes."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
