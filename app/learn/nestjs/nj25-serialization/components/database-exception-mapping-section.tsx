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
// MODULE 9 — PRISMA ERROR CODE EXCEPTION FILTER
// ═══════════════════════════════════════════════════════════

export function DatabaseExceptionMappingSection() {
  return (
    <SectionContainer number={9} title="Prisma Exception Filter &amp; Error Mapping">
      {/* ── 9.1 Prisma Errors ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Mapping Prisma Codes to Clean HTTP Statuses"
          description="Convert P2002, P2025, and P2003 database errors into 409 Conflict, 404 Not Found, and 400 Bad Request."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The PrismaClientExceptionFilter
          </h4>
          <EnhancedCodeBlock
            code={`// src/common/filters/prisma-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const target = (exception.meta?.target as string[])?.join(', ') || 'field';
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: \`Duplicate entry: \${target} already exists\`,
          error: 'Conflict',
        });
      }

      case 'P2025': {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Requested record does not exist',
          error: 'Not Found',
        });
      }

      default: {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database operation failed',
        });
      }
    }
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What does Prisma error code 'P2002' mean and what HTTP status code should your API return?"
          answer="P2002 means a Unique Constraint Violation (e.g. email already exists); your API should return HTTP 409 Conflict."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
