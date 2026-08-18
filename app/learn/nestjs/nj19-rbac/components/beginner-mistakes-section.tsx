"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER AUTHORIZATION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Authorization Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with RBAC & Guards"
          description="Avoid these common security oversights when writing authorization guards."
          color="primary"
        />

        <MistakeBox
          title="Using RolesGuard without JwtAuthGuard First"
          description="RolesGuard checks request.user.role. If JwtAuthGuard did not run first to verify the token and populate request.user, role checks will fail."
          wrong={`// ❌ Wrong: RolesGuard runs alone, request.user is undefined!
@UseGuards(RolesGuard)
@Roles([Role.ADMIN])
@Delete(':id')`}
          right={`// ✅ Correct: JwtAuthGuard runs FIRST, then RolesGuard:
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([Role.ADMIN])
@Delete(':id')`}
        />

        <MistakeBox
          title="Using reflector.get() Instead of reflector.getAllAndOverride()"
          description="reflector.get() only looks at the handler. If roles are placed on the Controller class, it ignores them."
          wrong={`// ❌ Misses class-level @Roles decorator:
const roles = this.reflector.get(Roles, context.getHandler());`}
          right={`// ✅ Checks handler first, then falls back to class:
const roles = this.reflector.getAllAndOverride(Roles, [
  context.getHandler(),
  context.getClass(),
]);`}
        />

        <MistakeBox
          title="Using Raw String Literals for Roles"
          description="Raw strings like 'Admin' or 'admin' lead to silent authorization bypasses due to case-sensitivity typos."
          wrong={`// ❌ Prone to typos:
if (user.role === 'Admin') // But DB holds 'admin'!`}
          right={`// ✅ Type-safe:
if (user.role === Role.ADMIN)`}
        />

        <QuickCheck
          question="Why must JwtAuthGuard be executed BEFORE RolesGuard in @UseGuards(JwtAuthGuard, RolesGuard)?"
          answer="Because JwtAuthGuard decodes the token and attaches the authenticated user object to request.user. RolesGuard needs request.user to exist so it can verify the user's role."
        />
      </div>
    </SectionContainer>
  );
}
