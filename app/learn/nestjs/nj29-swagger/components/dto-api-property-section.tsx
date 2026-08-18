"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — DTO DOCUMENTATION WITH @APIPROPERTY
// ═══════════════════════════════════════════════════════════

export function DtoApiPropertySection() {
  return (
    <SectionContainer number={3} title="DTO Documentation with @ApiProperty">
      {/* ── 3.1 DTO Annotations ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Describing Data Types, Examples &amp; Enums"
          description="Annotate DTO classes with real-world examples and enum options for Swagger UI."
          color="emerald"
        />

        <EnhancedCodeBlock
          code={`import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @ApiProperty({
    example: 'alex.smith@learncraft.dev',
    description: 'Unique email address of the new user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SuperSecurePass123!',
    description: 'Password must be at least 8 characters long',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    example: 'Alex Smith',
    description: 'Full display name of the user',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.USER,
    description: 'Assigned system role',
  })
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// CreateUserDto has @ApiProperty({ example: 'alex.smith@learncraft.dev' })
// When Swagger UI loads at /api/docs:`}
          answer={`Predicted Swagger UI Behavior:\n\n1. The request body example box is automatically pre-filled with:\n   {\n     "email": "alex.smith@learncraft.dev",\n     "password": "SuperSecurePass123!",\n     "fullName": "Alex Smith",\n     "role": "USER"\n   }\n2. The 'role' field renders as a drop-down selector with ['USER', 'ADMIN'].\n3. Developers can click 'Try it out' -> 'Execute' immediately without typing JSON!`}
        />

        <QuickCheck
          question="What is the difference between @ApiProperty() and @ApiPropertyOptional()?"
          answer="@ApiProperty() marks the property as 'required: true' in the OpenAPI schema; @ApiPropertyOptional() sets 'required: false'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
