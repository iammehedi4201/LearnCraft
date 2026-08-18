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
// MODULE 3 — THE TYPE-SAFE @ROLES() DECORATOR
// ═══════════════════════════════════════════════════════════

export function RolesDecoratorSection() {
  return (
    <SectionContainer number={3} title="The Type-Safe @Roles() Decorator">
      {/* ── 3.1 @Roles Decorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Attaching Required Roles with Metadata"
          description="Build a strongly typed @Roles() decorator using Reflector.createDecorator."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔖</span> Creating the Decorator
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Define your decorator in <code>src/common/decorators/roles.decorator.ts</code>:
          </p>
          <EnhancedCodeBlock
            code={`// src/common/decorators/roles.decorator.ts
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

// Modern type-safe metadata decorator (NestJS 10+):
export const Roles = Reflector.createDecorator<Role[]>();

// Controller Usage:
@Controller('users')
export class UsersController {
  @Delete(':id')
  @Roles([Role.ADMIN, Role.SUPER_ADMIN]) // ⭐ Only Admins can delete users!
  deleteUser(@Param('id') id: string) {
    return { success: true, message: \`User \${id} deleted\` };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How does Reflector.createDecorator<Role[]>() prevent passing invalid role strings to @Roles()?"
          answer="TypeScript enforces that only values defined in the Role enum (e.g. Role.ADMIN) can be passed into the decorator, causing compile-time errors for any invalid strings."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
