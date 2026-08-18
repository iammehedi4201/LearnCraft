"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER PRISMA RELATION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Relation Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Relational Pitfalls"
          description="Avoid these common mistakes when defining relationships and querying data."
          color="primary"
        />

        <MistakeBox
          title="Missing @unique on 1-to-1 Foreign Key"
          description="Without @unique on userId, Prisma treats the relationship as a 1-to-Many."
          wrong={`// ❌ Wrong: Missing @unique allows multiple profiles per user:
model Profile {
  id     Int  @id
  userId Int
  user   User @relation(fields: [userId], references: [id])
}`}
          right={`// ✅ Correct: @unique guarantees exactly 1 profile per user:
model Profile {
  id     Int  @id
  userId Int  @unique
  user   User @relation(fields: [userId], references: [id])
}`}
        />

        <MistakeBox
          title="Expecting Relational Fields Without include / select"
          description="Prisma does not load relation fields by default to avoid slow automatic join penalties."
          wrong={`// ❌ posts array is undefined:
const user = await prisma.user.findUnique({ where: { id: 1 } });
console.log(user.posts.length); // TypeError: Cannot read property 'length' of undefined`}
          right={`// ✅ Eager-loads relational posts:
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
});`}
        />

        <MistakeBox
          title="Deleting Parents with Orphaned Children (No Cascade)"
          description="Deleting a User when foreign key constraints have no onDelete rule throws a Foreign Key Constraint Failed error."
          wrong={`user User @relation(fields: [userId], references: [id]) // Fails when User is deleted`}
          right={`user User @relation(fields: [userId], references: [id], onDelete: Cascade) // Auto-cleans children`}
        />

        <QuickCheck
          question="Why does user.posts return undefined if you don't provide 'include: { posts: true }'?"
          answer="Because Prisma query engine avoids slow hidden database joins by default, returning only scalar columns unless explicitly instructed to include relations."
        />
      </div>
    </SectionContainer>
  );
}
