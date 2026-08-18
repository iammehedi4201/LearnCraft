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
// MODULE 7 — @EXCLUDE() & @EXPOSE() DECORATORS
// ═══════════════════════════════════════════════════════════

export function ExcludeExposeDecoratorsSection() {
  return (
    <SectionContainer number={7} title="@Exclude() &amp; @Expose() Decorators">
      {/* ── 7.1 Entity Serialization ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Stripping Secrets &amp; Adding Computed Fields"
          description="Build robust entity classes that redact sensitive columns and expose calculated virtual properties."
          color="amber"
        />

        <EnhancedCodeBlock
          code={`// src/users/entities/user.entity.ts
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;

  // ⭐ Secret column is stripped from JSON responses:
  @Exclude()
  passwordHash: string;

  @Exclude()
  refreshTokenHash: string | null;

  // ⭐ Virtual computed getter exposed in public JSON:
  @Expose()
  get fullName(): string {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

// Controller usage:
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  const user = await this.usersService.findById(id);
  return new UserEntity(user); // ⭐ Wrap in entity class!
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`const entity = new UserEntity({
  id: 1,
  email: 'alice@test.com',
  firstName: 'Alice',
  lastName: 'Smith',
  passwordHash: '$2b$10$supersecret',
  refreshTokenHash: 'token_abc',
});
// When serialized by ClassSerializerInterceptor:`}
          answer={`Predicted Return JSON:\n{\n  "id": 1,\n  "email": "alice@test.com",\n  "firstName": "Alice",\n  "lastName": "Smith",\n  "fullName": "Alice Smith"\n}\n\nNotice that passwordHash and refreshTokenHash were completely stripped!`}
        />

        <QuickCheck
          question="Why must you return 'new UserEntity(user)' instead of returning the raw plain Prisma object?"
          answer="Because ClassSerializerInterceptor inspects TypeScript class metadata (decorators like @Exclude); plain JavaScript objects have no class metadata and won't be filtered."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
