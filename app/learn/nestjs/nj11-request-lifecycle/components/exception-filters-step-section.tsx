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
// MODULE 9 — STEP 7: EXCEPTION FILTERS (THE SAFETY NET)
// ═══════════════════════════════════════════════════════════

export function ExceptionFiltersStepSection() {
  return (
    <SectionContainer number={9} title="Step 7: Exception Filters (The Emergency Safety Net)">
      {/* ── 9.1 Exception Filters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Catching and Formatting Errors Universally"
          description="If an error occurs anywhere in the pipeline, Exception Filters catch it and return a clean response."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚨</span> The Final Catch Block
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Whether a database query crashes, a guard throws <code>UnauthorizedException</code>, or a pipe throws <code>BadRequestException</code>, Exception Filters catch the exception before it crashes the server.
          </p>
          <EnhancedCodeBlock
            code={`import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: (exception as any)?.message || 'Internal server error',
    });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What decorator is required on an Exception Filter class to catch ALL unhandled exceptions?"
          answer="@Catch() (with empty parentheses)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
