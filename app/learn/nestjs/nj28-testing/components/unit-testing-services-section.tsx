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
// MODULE 3 — UNIT TESTING SERVICES WITH JEST
// ═══════════════════════════════════════════════════════════

export function UnitTestingServicesSection() {
  return (
    <SectionContainer number={3} title="Unit Testing Services with Test.createTestingModule">
      {/* ── 3.1 Unit Testing ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Testing Business Logic in Complete Isolation"
          description="Build lightweight test modules and mock external database providers with Jest."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧪</span> Writing users.service.spec.ts
          </h4>
          <EnhancedCodeBlock
            code={`// src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  // Mock object simulating Prisma:
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma }, // ⭐ Inject mock instead of real DB!
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when valid ID is provided', async () => {
    const mockUser = { id: 1, email: 'alice@test.com', name: 'Alice' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.findById(1);
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException when user does not exist', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.findById(999)).rejects.toThrow(NotFoundException);
  });
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why do we call 'jest.clearAllMocks()' in the afterEach block?"
          answer="To reset mock call counters and return values between tests, preventing test pollution where one test affects another."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
