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
// MODULE 8 — HTTPADAPTERHOST (EXPRESS & FASTIFY COMPATIBILITY)
// ═══════════════════════════════════════════════════════════

export function HttpAdapterHostSection() {
  return (
    <SectionContainer number={8} title="Universal HttpAdapterHost (Express & Fastify)">
      {/* ── 8.1 HttpAdapterHost ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Platform-Agnostic Error Replies"
          description="Write exception filters that work identically across Express and Fastify adapters."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔌</span> The HttpAdapterHost Solution
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If you write <code>response.status().json()</code>, your filter is coupled directly to Express.
            By injecting <code>HttpAdapterHost</code>, NestJS abstracts the underlying platform:
          </p>
          <EnhancedCodeBlock
            code={`import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
@Injectable()
export class UniversalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    // ⭐ Platform-agnostic reply (works on Express, Fastify, etc.):
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What class from '@nestjs/core' allows an Exception Filter to send responses without depending directly on Express or Fastify APIs?"
          answer="HttpAdapterHost."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
