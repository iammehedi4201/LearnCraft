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
// MODULE 9 — REALISTIC MOCK DATA GENERATION WITH FAKER
// ═══════════════════════════════════════════════════════════

export function SeedFactoriesFakerSection() {
  return (
    <SectionContainer number={9} title="Realistic Mock Data with @faker-js/faker">
      {/* ── 9.1 Faker Integration ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Seeding Hundreds of Realistic Records"
          description="Combine Faker with Prisma to generate realistic test datasets for local development."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎭</span> Automated Data Generation
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Install Faker: <code>npm i @faker-js/faker --save-dev</code>. Generate 50 realistic users with posts:
          </p>
          <EnhancedCodeBlock
            code={`import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const usersData = Array.from({ length: 50 }).map(() => ({
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    passwordHash: 'hashed_password_123',
    posts: {
      create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        published: faker.datatype.boolean(),
      })),
    },
  }));

  for (const user of usersData) {
    await prisma.user.create({ data: user });
  }

  console.log('🎉 Successfully seeded 50 realistic users with posts!');
}

main().finally(() => prisma.$disconnect());`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is seeding realistic mock data with Faker helpful for frontend pair-programming?"
          answer="It allows frontend engineers to test real UI edge cases (such as multi-line names, long paragraphs, and pagination) without waiting for real users to register."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
