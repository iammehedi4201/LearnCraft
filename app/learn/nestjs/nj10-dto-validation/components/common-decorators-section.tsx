"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — COMMON VALIDATION DECORATORS
// ═══════════════════════════════════════════════════════════

export function CommonDecoratorsSection() {
  return (
    <SectionContainer number={5} title="Common Validation Decorators">
      {/* ── 5.1 Decorator Categories ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Most Popular Validation Decorators"
          description="class-validator provides hundreds of battle-tested decorators for every data type."
          color="primary"
        />

        <ComparisonTable
          headers={["Decorator", "Checks That The Field...", "Example Valid Value"]}
          rows={[
            ["@IsString()", "Is a JavaScript string primitive", "'Alice'"],
            ["@IsNotEmpty()", "Is not empty ('', null, undefined)", "'Developer'"],
            ["@IsEmail()", "Is a valid email address format", "'alice@learncraft.dev'"],
            ["@IsNumber() / @IsInt()", "Is a valid number or integer", "42"],
            ["@Min(18) / @Max(100)", "Is within the numerical range", "25"],
            ["@MinLength(8)", "Has a minimum string character length", "'myStrongPassword!'"],
            ["@IsEnum(Role)", "Is one of the specified enum values", "Role.ADMIN"],
            ["@IsOptional()", "Can be omitted/undefined without error", "undefined or 'Bio text'"],
            ["@IsBoolean()", "Is a boolean true or false", "true"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 5.2 Complete Example DTO ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A Complete Real-World User DTO"
          description="Look at how multiple decorators combine to form ironclad validation rules."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (min 8 chars)!' })
  password: string;

  @IsInt()
  @Min(18)
  @Max(120)
  age: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}`}
          language="typescript"
        />

        <div className="my-8">
          <SectionHeading>🚀 Try It Yourself: Complex DTO Validation Rules</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`enum UserRole { ADMIN = "admin", USER = "user" }

function validateUserPayload(data: any) {
  const errors: string[] = [];

  if (typeof data.name !== "string" || !data.name) errors.push("name must be a non-empty string");
  if (!data.email || !data.email.includes("@")) errors.push("email must be valid");
  if (!data.password || data.password.length < 8) errors.push("password must be at least 8 chars");
  if (typeof data.age !== "number" || data.age < 18 || data.age > 120) errors.push("age must be between 18 and 120");
  if (data.role && !Object.values(UserRole).includes(data.role)) errors.push("role must be 'admin' or 'user'");

  return { isValid: errors.length === 0, errors };
}

console.log("Valid Signup:  ", validateUserPayload({
  name: "Mehedi", email: "mehedi@learncraft.dev", password: "securePassword123", age: 25, role: UserRole.ADMIN
}));

console.log("Invalid Signup:", validateUserPayload({
  name: "", email: "bad", password: "123", age: 14, role: "superhero"
}));`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="What decorator makes a field optional so that omitting it doesn't cause a validation error?"
          answer="@IsOptional() (imported from 'class-validator')"
        />
      </div>
    </SectionContainer>
  );
}
