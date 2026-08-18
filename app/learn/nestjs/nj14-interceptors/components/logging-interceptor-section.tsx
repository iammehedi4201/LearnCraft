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
// MODULE 3 — LOGGING & PERFORMANCE STOPWATCH (TAP OPERATOR)
// ═══════════════════════════════════════════════════════════

export function LoggingInterceptorSection() {
  return (
    <SectionContainer number={3} title="Logging & Performance Benchmarking with tap()">
      {/* ── 3.1 Performance Stopwatch ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Measuring API Latency Declaratively"
          description="Use the RxJS tap() operator to measure exact route handler execution time."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⏱️</span> The Logging Stopwatch Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            <code>tap()</code> invokes a side-effect (like logging) when the stream emits a value or terminates, without altering the response payload:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now;
        this.logger.log(\`[\${method}] \${url} + \${elapsed}ms\`);
      }),
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Does the RxJS tap() operator mutate or transform the response payload returned to the client?"
          answer="No. The tap() operator only performs side-effects (like logging or metrics emission); it leaves the response data completely untouched."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
