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
// MODULE 9 — SERIALIZATION & DTO MAPPING IN NESTJS
// ═══════════════════════════════════════════════════════════

export function EnumsInPrismaSection() {
  return (
    <SectionContainer number={9} title="Entity Serialization & Secure Field Masking">
      {/* ── 9.1 Serialization ── */}
      <div className="mb-16">
        <TopicHeader
          number={9}
          title="Mapping Domain Entities to Safe API Responses"
          description="Never expose internal domain entity fields (like password hashes or salt) directly to HTTP clients."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public username: string,
    @Exclude() public passwordHash: string, // ⭐ Excluded from JSON responses
    @Exclude() public securityToken: string,
  ) {}

  @Expose()
  get displayName(): string {
    return \`@\${this.username}\`;
  }
}

// In your UsersController:
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // ⭐ Automatically applies @Exclude()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findById(id);
  }
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// When the HTTP client calls GET /users/123:
// What will the returned JSON object contain?`}
          answer={`Predicted JSON Output:

{
  "id": "123",
  "email": "alex@learncraft.dev",
  "username": "alex",
  "displayName": "@alex"
}

Notice that 'passwordHash' and 'securityToken' are completely omitted from the HTTP response because of @Exclude() and ClassSerializerInterceptor!`}
        />

        <QuickCheck
          question="Why is ClassSerializerInterceptor preferred over manually deleting properties with 'delete user.passwordHash'?"
          answer="'delete' mutates the in-memory entity object, degrades V8 engine optimization, and is prone to human oversight if a developer forgets to delete sensitive fields."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
