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
// MODULE 4 — EXCEPTION FILTER ANATOMY & ARGUMENTSHOST
// ═══════════════════════════════════════════════════════════

export function ExceptionFilterAnatomySection() {
  return (
    <SectionContainer number={4} title="ExceptionFilter Anatomy & ArgumentsHost">
      {/* ── 4.1 Filter Anatomy ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Anatomy of a Custom Exception Filter"
          description="Understand the ExceptionFilter interface and ArgumentsHost wrapper."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🩺</span> The catch() Method &amp; ArgumentsHost
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            The <code>catch(exception, host)</code> method receives the thrown exception and the <code>ArgumentsHost</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch(HttpException) catches ONLY instances of HttpException:
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: typeof errorResponse === 'object' ? errorResponse : { message: errorResponse },
    });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What decorator tells NestJS which exception types a filter should bind to?"
          answer="@Catch(...) (e.g. @Catch(HttpException) or @Catch() for all errors)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
