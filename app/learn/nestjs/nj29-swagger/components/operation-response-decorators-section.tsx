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
// MODULE 4 — OPERATION & RESPONSE DECORATORS
// ═══════════════════════════════════════════════════════════

export function OperationResponseDecoratorsSection() {
  return (
    <SectionContainer number={4} title="Operation &amp; Response Status Decorators">
      {/* ── 4.1 Response Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Documenting HTTP Verbs &amp; Status Codes"
          description="Annotate controllers with precise HTTP status codes and typed response entities."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📡</span> Annotated Controller Method
          </h4>
          <EnhancedCodeBlock
            code={`import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user account',
    description: 'Validates input, hashes passwords, and saves the new user entity to PostgreSQL.',
  })
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'User was registered successfully.',
  })
  @ApiConflictResponse({
    description: 'A user with this email address already exists (409 Conflict).',
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation rules (400 Bad Request).',
  })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should you pass 'type: UserResponseDto' to @ApiCreatedResponse()?"
          answer="It tells Swagger UI to render the full schema blueprint and example JSON of the returned object in the response documentation section."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
