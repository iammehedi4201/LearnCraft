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
// MODULE 2 — CLASS-BASED MIDDLEWARE (NESTMIDDLEWARE)
// ═══════════════════════════════════════════════════════════

export function ClassMiddlewareSection() {
  return (
    <SectionContainer number={2} title="Class-Based Middleware with @Injectable()">
      {/* ── 2.1 Class Middleware ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Building a Class Middleware with Dependency Injection"
          description="How to implement the NestMiddleware interface to access injected services."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> The NestMiddleware Interface
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Class-based middleware is annotated with <code>@Injectable()</code> and implements <code>use(req, res, next)</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    this.logger.log(\`Incoming \${method} \${originalUrl} - IP: \${ip} - Agent: \${userAgent}\`);

    // ⭐ Must call next() to pass control to the next handler!
    next();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the primary advantage of class-based middleware over simple functional middleware?"
          answer="Class-based middleware supports full NestJS Dependency Injection, allowing you to inject services (like Logger, ConfigService, or database helpers) into the constructor."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
