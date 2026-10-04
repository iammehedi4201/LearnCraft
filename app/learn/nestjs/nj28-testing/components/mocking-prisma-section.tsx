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
// MODULE 4 — MOCKING CUSTOM PROVIDERS & REPOSITORIES
// ═══════════════════════════════════════════════════════════

export function MockingPrismaSection() {
  return (
    <SectionContainer number={4} title="Mocking Custom Providers & Repositories with useValue">
      {/* ── 4.1 Provider Mocking ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Isolating Services with useValue Mocks"
          description="How to replace repository tokens and external dependencies with typed jest.fn() mocks inside Test.createTestingModule."
          color="rose"
        />

        <EnhancedCodeBlock
          code={`import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { USERS_REPOSITORY, IUsersRepository } from './users.repository.interface';
import { UserEntity } from './user.entity';

describe('UsersService Unit Tests', () => {
  let service: UsersService;
  let mockRepo: Partial<Record<keyof IUsersRepository, jest.Mock>>;

  beforeEach(async () => {
    mockRepo = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY,
          useValue: mockRepo, // ⭐ Swaps real repository with in-memory mock
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should find user by id when record exists', async () => {
    const fakeUser = new UserEntity('u-1', 'alex@learncraft.dev', 'alex');
    mockRepo.findById!.mockResolvedValue(fakeUser);

    const result = await service.getUserById('u-1');

    expect(result).toBe(fakeUser);
    expect(mockRepo.findById).toHaveBeenCalledWith('u-1');
    expect(mockRepo.findById).toHaveBeenCalledTimes(1);
  });
});`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// What happens if we test findUserById with a non-existent ID?
mockRepo.findById!.mockResolvedValue(null);
await expect(service.getUserById('missing-99')).rejects.toThrow(NotFoundException);`}
          answer={`Predicted Test Result: PASS ✅

The mock returns null, triggering the service's invariant:
if (!user) throw new NotFoundException('User missing-99 not found');

The test passes cleanly in ~3ms without requiring a live database or network connection!`}
        />

        <QuickCheck
          question="Why is useValue preferred over monkey-patching methods on live service instances?"
          answer="useValue leverages NestJS's native dependency injection container to swap tokens cleanly per test suite, ensuring total test isolation without side-effects."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
