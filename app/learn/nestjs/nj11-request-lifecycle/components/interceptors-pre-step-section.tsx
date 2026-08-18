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
// MODULE 5 — STEP 3: INTERCEPTORS (PRE-CONTROLLER PHASE)
// ═══════════════════════════════════════════════════════════

export function InterceptorsPreStepSection() {
  return (
    <SectionContainer number={5} title="Step 3: Interceptors (Pre-Controller)">
      {/* ── 5.1 Interceptors Pre-Phase ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Aspect-Oriented Request Interception"
          description="Interceptors wrap around the controller method to bind extra logic before and after execution."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⏱️</span> The Pre-Execution Phase
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Everything before <code>next.handle()</code> executes <strong>before</strong> the route handler method runs.
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log('[Interceptor PRE] Request received, starting stopwatch...');

    // next.handle() invokes the route handler!
    return next.handle();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Can an Interceptor completely skip calling the controller and return a cached response directly?"
          answer="Yes! By returning an RxJS observable (e.g. of(cachedData)) instead of calling next.handle(), the interceptor short-circuits the request and skips the controller."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
