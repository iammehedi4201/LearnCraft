"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — DEEP MOCKING PRISMA WITH JEST-MOCK-EXTENDED
// ═══════════════════════════════════════════════════════════

export function MockingPrismaSection() {
  return (
    <SectionContainer number={4} title="Deep Mocking Prisma with jest-mock-extended">
      {/* ── 4.1 Prisma Mocking ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Gold Standard for Prisma Unit Tests"
          description="Automatically generate 100% typed mocks for every Prisma model method with mockDeep."
          color="rose"
        />

        <EnhancedCodeBlock
          code={`# npm install jest-mock-extended --save-dev

// test/prisma-mock.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type MockPrisma = DeepMockProxy<PrismaClient>;
export const createPrismaMock = (): MockPrisma => mockDeep<PrismaClient>();

// In your spec file:
let prismaMock: MockPrisma;

beforeEach(async () => {
  prismaMock = createPrismaMock();

  const module = await Test.createTestingModule({
    providers: [
      UsersService,
      { provide: PrismaService, useValue: prismaMock },
    ],
  }).compile();
});

it('creates user successfully', async () => {
  const user = { id: 10, email: 'bob@test.com', name: 'Bob' };
  prismaMock.user.create.mockResolvedValue(user as any);

  const result = await service.create({ email: 'bob@test.com', name: 'Bob' });
  expect(result.id).toBe(10);
});`}
          language="typescript"
        />

        <PredictOutputBox
          code={`prismaMock.user.findMany.mockResolvedValue([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
] as any);
const users = await service.findAll();
expect(users).toHaveLength(2);`}
          answer={`Predicted Test Result:\n\nPASS! ✓\n\n'prismaMock.user.findMany' instantly returns the 2 mocked objects in 1 millisecond without touching any PostgreSQL database!`}
        />

        <QuickCheck
          question="What problem does 'jest-mock-extended' solve when mocking Prisma in NestJS?"
          answer="It creates a deep, fully type-safe mock proxy of all Prisma models and methods (create, findUnique, update, delete, count) without having to manually define hundreds of jest.fn() stubs."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
