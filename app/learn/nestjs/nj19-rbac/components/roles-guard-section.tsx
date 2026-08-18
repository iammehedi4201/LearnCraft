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
// MODULE 4 — BUILDING THE ROLESGUARD (CANACTIVATE)
// ═══════════════════════════════════════════════════════════

export function RolesGuardSection() {
  return (
    <SectionContainer number={4} title="Building the RolesGuard (CanActivate)">
      {/* ── 4.1 RolesGuard Implementation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The RBAC Enforcement Engine"
          description="A custom CanActivate Guard that compares user roles against endpoint metadata."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚪</span> Complete RolesGuard Implementation
          </h4>
          <EnhancedCodeBlock
            code={`// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Read required roles from method or controller class:
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. If no @Roles() decorator is attached, allow access:
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3. Get authenticated user from request:
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      return false; // Rejects with 403 Forbidden!
    }

    // 4. Check if user's role matches any required role:
    return requiredRoles.includes(user.role);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why do we use reflector.getAllAndOverride([context.getHandler(), context.getClass()])?"
          answer="So that a method-level @Roles() decorator overrides a controller-level @Roles() decorator, allowing specific routes to define tighter or looser access rules."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
