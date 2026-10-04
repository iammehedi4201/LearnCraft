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
// MODULE 9 — TEST FACTORIES & DETERMINISTIC SEED FIXTURES
// ═══════════════════════════════════════════════════════════

export function SeedFactoriesFakerSection() {
  return (
    <SectionContainer number={9} title="Deterministic Test Factories & Fixture Generators">
      {/* ── 9.1 Test Factories ── */}
      <div className="mb-16">
        <TopicHeader
          number={9}
          title="Building Reusable Entity Seed Factories"
          description="How to write deterministic mock generators to instantiate dozens of domain entities for seeding and integration tests."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎭</span> The Domain Factory Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            A factory function creates valid domain entities with sensible defaults, allowing individual overrides where needed:
          </p>
          <EnhancedCodeBlock
            code={`// test/factories/user.factory.ts
export function createUserEntity(overrides: Partial<UserEntity> = {}): UserEntity {
  const index = Math.floor(Math.random() * 10000);
  return new UserEntity(
    overrides.id ?? \`user-\${index}\`,
    overrides.email ?? \`user\${index}@learncraft.dev\`,
    overrides.username ?? \`dev_\${index}\`,
    overrides.passwordHash ?? 'argon2_hashed_secret',
    overrides.roles ?? ['USER'],
  );
}

// In your SeederService or Unit Tests:
export function generateSeedUsers(count: number): UserEntity[] {
  return Array.from({ length: count }, (_, i) =>
    createUserEntity({
      id: \`seed-user-\${i + 1}\`,
      email: \`user\${i + 1}@learncraft.dev\`,
      username: \`developer_\${i + 1}\`,
    }),
  );
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why are factory functions with 'overrides: Partial<Entity>' preferred over hardcoded fixtures?"
          answer="They provide sensible, valid defaults for all mandatory entity fields while allowing specific tests or seed routines to customize only the properties they care about."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
