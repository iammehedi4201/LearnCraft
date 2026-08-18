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
// MODULE 6 — SHORT-CIRCUITING & CACHING (OF OPERATOR)
// ═══════════════════════════════════════════════════════════

export function CachingInterceptorSection() {
  return (
    <SectionContainer number={6} title="Short-Circuiting Execution with Caching (of operator)">
      {/* ── 6.1 Short-Circuiting ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Bypassing the Controller with Cached Data"
          description="How returning an RxJS of() observable skips the route handler entirely."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> The Short-Circuiting Cache Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If an Interceptor returns <code>of(cachedValue)</code> without calling <code>next.handle()</code>, NestJS immediately returns the cached payload to the client, completely bypassing database queries and controller logic:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const key = req.url;

    // 1. Cache HIT: Return immediately without calling controller!
    if (this.cache.has(key)) {
      console.log(\`[Cache HIT] Returning cached response for \${key}\`);
      return of(this.cache.get(key));
    }

    // 2. Cache MISS: Execute controller and save result into cache:
    return next.handle().pipe(
      tap((response) => {
        console.log(\`[Cache MISS] Storing fresh response for \${key}\`);
        this.cache.set(key, response);
      }),
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What RxJS function creates an immediate Observable from a static value to bypass next.handle()?"
          answer="The 'of()' function from 'rxjs' (e.g. return of(cachedData))."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
