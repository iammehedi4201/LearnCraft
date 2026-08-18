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
// MODULE 2 — THE 9 BUILT-IN NESTJS PIPES
// ═══════════════════════════════════════════════════════════

export function BuiltinPipesSection() {
  return (
    <SectionContainer number={2} title="The 9 Built-in NestJS Pipes">
      {/* ── 2.1 Overview ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Out-of-the-Box Primitives"
          description="NestJS provides 9 built-in pipes ready to use in any route handler without custom code."
          color="sky"
        />

        <ComparisonTable
          headers={["Built-in Pipe", "Input Example", "Transformed Output", "Invalid Case Behavior"]}
          rows={[
            ["ParseIntPipe", "'42'", "42 (number)", "Throws 400 if input is 'abc'"],
            ["ParseFloatPipe", "'19.99'", "19.99 (number)", "Throws 400 if input is 'hello'"],
            ["ParseBoolPipe", "'true' or '1'", "true (boolean)", "Throws 400 if input is 'yes'"],
            ["ParseArrayPipe", "'1,2,3'", "[1, 2, 3] (array)", "Throws 400 if items fail type rules"],
            ["ParseUUIDPipe", "'c9a...'", "Valid UUID string", "Throws 400 if not valid UUID format"],
            ["ParseEnumPipe", "'ADMIN'", "Role.ADMIN (enum)", "Throws 400 if value not in Enum"],
            ["DefaultValuePipe", "undefined", "'default_value'", "Provides fallback default value"],
            ["ParseFilePipe", "Uploaded File", "Express.Multer.File", "Throws 400 if file too big/wrong type"],
            ["ValidationPipe", "{ title: '' }", "Validated DTO class", "Throws 400 with validation errors"],
          ]}
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, Param, Query, ParseIntPipe, ParseBoolPipe, ParseUUIDPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  // 1. Auto-parse Integer:
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return { id, isNumber: typeof id === 'number' }; // id is guaranteed to be a number!
  }

  // 2. Auto-parse Boolean:
  @Get()
  findAll(@Query('active', ParseBoolPipe) active: boolean) {
    return { active, isBoolean: typeof active === 'boolean' };
  }

  // 3. Auto-validate UUID:
  @Get('profile/:uuid')
  findByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return { uuid };
  }
}`}
          language="typescript"
        />

        <QuickCheck
          question="What happens if a client makes a GET request to /users/hello where the route handler is defined as findOne(@Param('id', ParseIntPipe) id: number)?"
          answer="NestJS automatically responds with HTTP 400 Bad Request: 'Validation failed (numeric string is expected)' without ever executing the findOne() method."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
