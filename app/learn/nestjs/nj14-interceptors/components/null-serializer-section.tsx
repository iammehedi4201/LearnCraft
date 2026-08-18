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
// MODULE 7 — NULL SERIALIZATION & PAYLOAD REFINEMENT
// ═══════════════════════════════════════════════════════════

export function NullSerializerSection() {
  return (
    <SectionContainer number={7} title="Null Serialization & Response Refinement">
      {/* ── 7.1 Exclude Nulls ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Sanitizing Null and Undefined Responses"
          description="Automatically convert null values to empty strings or default fallbacks before JSON serialization."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧹</span> Cleaning Response Bodies
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Some mobile and frontend clients crash when receiving <code>null</code> fields. An interceptor can recursively sanitize output payloads:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => (value === null ? '' : value)),
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How can an Interceptor prevent null values from being sent to mobile clients?"
          answer="By using the map() operator on the next.handle() stream to replace null values with empty strings or default fallback objects."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
