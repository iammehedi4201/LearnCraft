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
// MODULE 3 — 1-TO-MANY RELATIONS (USER & POSTS)
// ═══════════════════════════════════════════════════════════

export function OneToManySection() {
  return (
    <SectionContainer number={3} title="1-to-Many Relations (Authors & Posts)">
      {/* ── 3.1 One-to-Many ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Most Common Database Relationship"
          description="Model parent-child records like Users having multiple Posts or Orders."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📝</span> Author &amp; Posts Schema
          </h4>
          <EnhancedCodeBlock
            code={`model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[] // ⭐ Array type indicates 1-to-Many relation
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)

  // Foreign Key column:
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}

// In your NestJS Service (Fetching user WITH their posts):
async getUserWithPosts(userId: number) {
  return await this.prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true }, // ⭐ Eager-loads relational posts array!
  });
}`}
            language="prisma"
          />
        </WhyBox>

        <QuickCheck
          question="How do you tell Prisma to load related posts when fetching a user in TypeScript?"
          answer="Pass 'include: { posts: true }' inside the findUnique or findMany query."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
