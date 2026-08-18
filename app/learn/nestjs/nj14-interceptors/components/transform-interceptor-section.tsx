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
// MODULE 4 — RESPONSE TRANSFORMATION (MAP OPERATOR)
// ═══════════════════════════════════════════════════════════

export function TransformInterceptorSection() {
  return (
    <SectionContainer number={4} title="Global Response Envelope Mapping with map()">
      {/* ── 4.1 Response Envelope ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Wrapping Responses in a Standard Envelope"
          description="Transform any return value from your controllers into a consistent API response structure."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> The Enterprise Response Envelope Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In enterprise apps, frontend teams expect every single API endpoint to return a predictable schema:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: res.statusCode || 200,
        data, // ⭐ The original data returned by your controller!
        timestamp: new Date().toISOString(),
      })),
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Use map() in a global Interceptor so your controllers can return clean domain objects without manually building wrapper objects." />

        <QuickCheck
          question="What is the advantage of using a TransformInterceptor instead of wrapping objects in controllers manually?"
          answer="It keeps controller code DRY and clean. Controller methods can return raw entities, and the interceptor uniformly wraps everything before sending it to the client."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
