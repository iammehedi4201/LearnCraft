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
// MODULE 8 — STEP 6: INTERCEPTORS (POST-CONTROLLER / RESPONSE)
// ═══════════════════════════════════════════════════════════

export function InterceptorsPostStepSection() {
  return (
    <SectionContainer number={8} title="Step 6: Interceptors (Post-Controller Response)">
      {/* ── 8.1 Response Transformation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Shaping the Outgoing Response"
          description="Intercept the returned value using RxJS operators before sending to the client."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> The Post-Execution Phase
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            By piping the observable from <code>next.handle()</code>, you can mutate the response or log execution metrics.
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next.handle().pipe(
      // 1. Calculate duration:
      tap(() => console.log(\`[Execution Time] \${Date.now() - start}ms\`)),
      // 2. Wrap output in standard enterprise envelope:
      map((data) => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What RxJS operator is used inside an Interceptor to wrap every API response in a standard { data, success: true } envelope?"
          answer="The 'map()' operator from 'rxjs/operators'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
