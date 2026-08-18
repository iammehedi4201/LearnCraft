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
// MODULE 3 — THE @CURRENTUSER() DECORATOR IN PRACTICE
// ═══════════════════════════════════════════════════════════

export function CurrentUserSection() {
  return (
    <SectionContainer number={3} title="The @CurrentUser() Decorator in Action">
      {/* ── 3.1 Practical Implementation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Building and Consuming @CurrentUser()"
          description="How to write a type-safe user extraction decorator for your controllers."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>👤</span> Full Production Example
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            First, define your user decorator in a shared folder (e.g. <code>src/common/decorators/current-user.decorator.ts</code>):
          </p>
          <EnhancedCodeBlock
            code={`// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
  id: number;
  email: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// src/users/users.controller.ts
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  @Get('me')
  getProfile(@CurrentUser() user: UserPayload) {
    // ⭐ Clean, strongly typed, and decoupled from Express!
    return {
      message: 'Here is your profile',
      userId: user.id,
      userEmail: user.email,
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why does using @CurrentUser() make unit testing your controller methods much easier?"
          answer="Because you can pass a plain mock user object (e.g. { id: 1, email: 'alice@test.com' }) directly into getProfile(mockUser) without having to construct a fake Express Request object!"
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
