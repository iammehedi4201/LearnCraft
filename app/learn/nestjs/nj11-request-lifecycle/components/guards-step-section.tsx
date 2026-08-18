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
// MODULE 4 — STEP 2: GUARDS (AUTHENTICATION & AUTHORIZATION)
// ═══════════════════════════════════════════════════════════

export function GuardsStepSection() {
  return (
    <SectionContainer number={4} title="Step 2: Guards (Passport Control)">
      {/* ── 4.1 What Guards Do ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Security Gatekeeper"
          description="Guards determine whether a request has permission to proceed to the controller."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛂</span> Role of Guards (CanActivate)
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Guards have a single responsibility: <strong>Access Control</strong>. They inspect JWT tokens, sessions, or user roles.
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    
    // Return true to allow, or false to block with 403 Forbidden
    return Boolean(token);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Guards run before Pipes and Interceptors. If a guard returns false, NestJS stops immediately and never touches the controller." />

        <QuickCheck
          question="What HTTP status code is automatically returned when a Guard returns false?"
          answer="403 Forbidden (HttpException: Forbidden resource)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
