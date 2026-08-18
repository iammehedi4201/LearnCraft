"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — METADATA REFLECTION & REFLECTOR
// ═══════════════════════════════════════════════════════════

export function ReflectorMetadataSection() {
  return (
    <SectionContainer number={5} title="Metadata Reflection with Reflector">
      {/* ── 5.1 Setting & Reading Metadata ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Attaching Custom Metadata to Routes"
          description="How to write custom decorators with SetMetadata and read them inside Guards using Reflector."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> Step 1: Create the @Roles() Decorator
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Instead of calling <code>SetMetadata</code> directly in your controllers, wrap it in a clean custom decorator:
          </p>
          <EnhancedCodeBlock
            code={`// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Usage on a route handler:
@Roles('admin', 'manager')
@Delete(':id')
deleteUser() {}`}
            language="typescript"
          />
        </WhyBox>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> Step 2: Read Metadata with Reflector
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Inject <code>Reflector</code> into your Guard and use <code>getAllAndOverride</code> to inspect both the method and the controller class:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Looks for @Roles() on the method first, falls back to controller class:
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no @Roles() metadata was set on this route, allow access by default:
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user?.role);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Use reflector.getAllAndOverride() to check the method-level decorator first, falling back to the controller-level decorator." />

        <QuickCheck
          question="What Reflector method inspects metadata at the method level first and falls back to the controller class if absent?"
          answer="reflector.getAllAndOverride(KEY, [context.getHandler(), context.getClass()])."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
