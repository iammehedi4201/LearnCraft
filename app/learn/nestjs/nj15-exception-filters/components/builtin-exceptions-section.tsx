"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — BUILT-IN HTTP EXCEPTIONS
// ═══════════════════════════════════════════════════════════

export function BuiltinExceptionsSection() {
  return (
    <SectionContainer number={2} title="The Built-in NestJS HttpExceptions">
      {/* ── 2.1 Built-in Exceptions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Out-of-the-Box Exception Classes"
          description="NestJS provides a rich hierarchy of standard HTTP exception classes derived from HttpException."
          color="sky"
        />

        <ComparisonTable
          headers={["Exception Class", "HTTP Status Code", "Common Real-World Use Case"]}
          rows={[
            ["BadRequestException", "400 Bad Request", "Invalid form input, validation failure"],
            ["UnauthorizedException", "401 Unauthorized", "Missing or expired JWT authentication token"],
            ["ForbiddenException", "403 Forbidden", "Authenticated user lacks permission / role"],
            ["NotFoundException", "404 Not Found", "Database record with specified ID not found"],
            ["ConflictException", "409 Conflict", "Duplicate unique email or username on registration"],
            ["UnprocessableEntityException", "422 Unprocessable", "Payload syntax is valid but semantic rules fail"],
            ["InternalServerErrorException", "500 Internal Server", "Unexpected database crash or unhandled server bug"],
            ["ServiceUnavailableException", "503 Service Unavailable", "External third-party payment gateway is down"],
          ]}
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, Param, ParseIntPipe, NotFoundException, ConflictException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      // ⭐ Throws clean HTTP 404:
      throw new NotFoundException(\`User with ID \${id} does not exist\`);
    }
    return user;
  }
}`}
          language="typescript"
        />

        <QuickCheck
          question="What exception should you throw when a user tries to register with an email address that is already registered in the database?"
          answer="ConflictException (HTTP 409 Conflict)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
