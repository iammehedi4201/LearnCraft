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
// MODULE 7 — NESTED WRITES & RELATIONAL MUTATIONS
// ═══════════════════════════════════════════════════════════

export function NestedWritesSection() {
  return (
    <SectionContainer number={7} title="Nested Writes (create, connect, connectOrCreate)">
      {/* ── 7.1 Nested Writes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Atomic Multi-Table Mutations"
          description="Create, connect, or update related records in a single database operation."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> 3 Powerful Nested Write Patterns
          </h4>
          <EnhancedCodeBlock
            code={`// 1. Nested Create (Creates User AND Profile simultaneously):
const userWithProfile = await prisma.user.create({
  data: {
    email: 'alice@learncraft.dev',
    passwordHash: 'hashed...',
    profile: {
      create: { bio: 'Full-stack TypeScript developer' },
    },
  },
});

// 2. Nested Connect (Attaches new Post to an existing Author):
const newPost = await prisma.post.create({
  data: {
    title: 'Mastering NestJS 2026',
    author: {
      connect: { id: 42 }, // Links to User with id 42
    },
  },
});

// 3. Nested connectOrCreate (Finds existing tag or creates a new one):
const taggedPost = await prisma.post.create({
  data: {
    title: 'Prisma Guide',
    author: { connect: { id: 42 } },
    tags: {
      connectOrCreate: [
        {
          where: { name: 'nestjs' },
          create: { name: 'nestjs' },
        },
      ],
    },
  },
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the advantage of 'connectOrCreate' when adding tags or categories to a post?"
          answer="It avoids duplicate tag entries by linking to an existing tag if one already exists, or creating a new tag if it doesn't."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
