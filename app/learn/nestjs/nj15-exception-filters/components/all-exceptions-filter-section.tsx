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
// MODULE 5 — THE GLOBAL ALL-EXCEPTIONS FILTER BLUEPRINT
// ═══════════════════════════════════════════════════════════

export function AllExceptionsFilterSection() {
  return (
    <SectionContainer number={5} title="The Global All-Exceptions Catch-All Filter">
      {/* ── 5.1 The Universal Catch-All ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Universal Error Catch-All Filter"
          description="A production-ready blueprint that catches every unexpected error in your app."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The Ultimate Safety Net
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Using <code>@Catch()</code> without arguments intercepts everything: unhandled database connection errors, third-party library crashes, and HTTP exceptions alike:
          </p>
          <EnhancedCodeBlock
            code={`import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // ⭐ Empty @Catch() catches ALL errors!
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error occurred';

    // Log internal error with stack trace for backend debugging:
    this.logger.error(
      \`[HTTP \${httpStatus}] \${request.method} \${request.url}\`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    // Send clean, secure JSON response to client (never leak stack trace!):
    response.status(httpStatus).json({
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="In production, log full error stack traces on your server with Logger, but NEVER send raw stack traces to the frontend." />

        <QuickCheck
          question="What happens if a database query throws a raw 'Connection Lost' Error in an app with an AllExceptionsFilter?"
          answer="The AllExceptionsFilter catches the Error, logs the stack trace internally, and returns a safe HTTP 500 'Internal server error occurred' JSON payload without crashing the Node.js process."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
