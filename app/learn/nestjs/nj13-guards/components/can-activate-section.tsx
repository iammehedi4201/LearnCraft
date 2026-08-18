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
// MODULE 2 — THE CANACTIVATE INTERFACE
// ═══════════════════════════════════════════════════════════

export function CanActivateSection() {
  return (
    <SectionContainer number={2} title="The CanActivate Interface">
      {/* ── 2.1 Interface Definition ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Implementing CanActivate"
          description="How guards return synchronous or asynchronous boolean decisions."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚖️</span> Synchronous, Promise, or Observable
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            <code>canActivate</code> can be synchronous or asynchronous (e.g., verifying a token with Redis or database lookup):
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SimpleApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    // Return true to allow, or false to trigger automatic 403 Forbidden:
    return apiKey === 'secret-api-key-123';
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens if canActivate() returns false versus throwing new UnauthorizedException()?"
          answer="Returning false causes NestJS to throw a 403 Forbidden error. Throwing new UnauthorizedException() explicitly returns a 401 Unauthorized error."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
