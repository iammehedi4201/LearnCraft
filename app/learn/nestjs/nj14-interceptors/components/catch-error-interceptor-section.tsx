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
// MODULE 5 — TIMEOUTS & EXCEPTION OVERRIDES (CATCHERROR)
// ═══════════════════════════════════════════════════════════

export function CatchErrorInterceptorSection() {
  return (
    <SectionContainer number={5} title="Timeouts & Exception Overrides (catchError & timeout)">
      {/* ── 5.1 Timeout Pattern ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Preventing Hanging Requests with timeout()"
          description="Cancel slow queries or hanging downstream services automatically."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⌛</span> The Request Timeout Interceptor
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If a database query or external microservice hangs indefinitely, your Node.js event loop resources get exhausted.
            The <code>timeout()</code> operator terminates the stream after a specified duration:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Abort request if it takes longer than 5000ms (5 seconds):
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException('Request timed out after 5000ms'));
        }
        return throwError(() => err);
      }),
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What exception does the TimeoutInterceptor throw when an operation exceeds the timeout threshold?"
          answer="RequestTimeoutException (HTTP 408 Request Timeout)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
