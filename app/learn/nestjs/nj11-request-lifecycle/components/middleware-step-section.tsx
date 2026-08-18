"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — STEP 1: MIDDLEWARE IN THE PIPELINE
// ═══════════════════════════════════════════════════════════

export function MiddlewareStepSection() {
  return (
    <SectionContainer number={3} title="Step 1: Middleware (The Front Gate)">
      {/* ── 3.1 What Middleware Does ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The First Line of Processing"
          description="Middleware runs before any NestJS routing context is established."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Role of Middleware
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Middleware is identical to Express.js middleware. It receives the raw <code>req</code> and <code>res</code> objects and must call <code>next()</code> to pass control to the next handler.
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`[Inbound Request] \${req.method} \${req.originalUrl}\`);
    next(); // Pass control to the next step
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <InfoCallout type="warning" title="Critical Architectural Limitation of Middleware">
          Middleware has <strong>NO knowledge</strong> of which controller class or route handler method will ultimately handle the request. It does NOT have access to NestJS <code>ExecutionContext</code> or metadata reflection.
        </InfoCallout>

        <QuickCheck
          question="Why can't you inspect controller method decorators (like @Roles('admin')) inside a Middleware?"
          answer="Because Middleware runs before the NestJS router identifies the target controller method. To read method reflection metadata, you must use Guards or Interceptors which have access to ExecutionContext."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
