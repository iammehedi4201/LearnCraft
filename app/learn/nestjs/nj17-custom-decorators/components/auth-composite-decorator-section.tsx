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
// MODULE 6 — BUILDING THE COMPOSITE @AUTH() DECORATOR
// ═══════════════════════════════════════════════════════════

export function AuthCompositeDecoratorSection() {
  return (
    <SectionContainer number={6} title="Building a Composite @Auth() Decorator">
      {/* ── 6.1 Composite Auth Decorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Master @Auth(...) Decorator"
          description="How to combine role metadata, guards, and Swagger documentation in one file."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Full Composite Implementation
          </h4>
          <EnhancedCodeBlock
            code={`// src/common/decorators/auth.decorator.ts
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(
    // 1. Attach roles metadata for RolesGuard:
    SetMetadata('roles', roles),
    // 2. Bind both JWT authentication and RBAC guards:
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

// Controller Usage:
@Controller('finance')
export class FinanceController {
  // Secured with JWT AuthGuard + verified for 'admin' & 'manager' roles:
  @Get('reports')
  @Auth('admin', 'manager')
  getReports() {
    return { revenue: 150000 };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Can applyDecorators() combine both method decorators (like @UseGuards) and metadata decorators (like SetMetadata)?"
          answer="Yes! applyDecorators() can combine any standard NestJS method or class decorators together."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
