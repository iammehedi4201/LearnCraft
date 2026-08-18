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
// MODULE 8 — CORRELATION ID & REQUEST CONTEXT TAGGING
// ═══════════════════════════════════════════════════════════

export function RequestContextInjectionSection() {
  return (
    <SectionContainer number={8} title="Correlation ID & Request Tracing Middleware">
      {/* ── 8.1 Correlation ID ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Tracing Requests Across Microservices"
          description="Tag every incoming request with a unique correlation ID for end-to-end observability."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> The Correlation ID Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            When multiple concurrent users send requests, tracking logs for a specific request is impossible without a unique ID.
            Middleware can assign an <code>x-correlation-id</code> to the request and echo it back in the response headers:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Read existing ID from upstream gateway, or generate a fresh UUID:
    const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();

    // 2. Attach to request object:
    req['correlationId'] = correlationId;

    // 3. Set on outgoing response header:
    res.setHeader('x-correlation-id', correlationId);

    next();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should a Correlation ID be returned in response headers (res.setHeader('x-correlation-id', id))?"
          answer="So that when client applications report an error or issue, they can send the correlation ID to your engineering team to immediately filter server logs."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
