"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — RBAC & ROLESGUARD IMPLEMENTATION
// ═══════════════════════════════════════════════════════════

export function RolesGuardSection() {
  return (
    <SectionContainer number={6} title="Role-Based Access Control (RBAC)">
      {/* ── 6.1 End-to-End RBAC ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Complete End-to-End RBAC Flow"
          description="Enforce fine-grained user permissions across your application."
          color="primary"
        />

        <StepList
          steps={[
            { step: "1", title: "Define Role Enum", desc: "Create type-safe enum constants for User, Admin, SuperAdmin." },
            { step: "2", title: "Apply @Roles() Decorator", desc: "Tag controller methods with required role permissions." },
            { step: "3", title: "Execute AuthGuard First", desc: "Verify token and attach decoded user to request.user." },
            { step: "4", title: "Execute RolesGuard Second", desc: "Compare request.user.role with required roles from Reflector." },
          ]}
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Controller Implementation with RBAC
          </h4>
          <EnhancedCodeBlock
            code={`export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // ⭐ Both guards applied in sequence!
export class UsersController {
  // Accessible by all authenticated users (Role.USER or Role.ADMIN):
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Accessible ONLY by users with ADMIN role:
  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why must JwtAuthGuard execute BEFORE RolesGuard?"
          answer="RolesGuard inspects request.user.role to check permissions. If JwtAuthGuard doesn't run first to decode the token and attach request.user, request.user will be undefined!"
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
