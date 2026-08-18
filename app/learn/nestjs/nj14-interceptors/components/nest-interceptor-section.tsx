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
// MODULE 2 — NESTINTERCEPTOR & CALLHANDLER
// ═══════════════════════════════════════════════════════════

export function NestInterceptorSection() {
  return (
    <SectionContainer number={2} title="The NestInterceptor Interface & CallHandler">
      {/* ── 2.1 next.handle() ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How Interceptors Control Execution"
          description="Understand the role of CallHandler.handle() and RxJS Observables."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> The intercept() Method Blueprint
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Every interceptor implements <code>intercept(context, next)</code> and returns an RxJS <code>Observable</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PassThroughInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('1. [BEFORE] Pre-controller execution logic');

    // ⭐ next.handle() invokes the route handler and returns an Observable stream!
    return next.handle();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens if an Interceptor does not call next.handle()?"
          answer="The controller route handler is never invoked, and the request will hang (or return whatever Observable the interceptor returned instead)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
