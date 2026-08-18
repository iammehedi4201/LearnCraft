"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — CONCEPT TABLES & VALIDATION CHEAT SHEET
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={11} title="Concept Tables & Validation Cheat Sheet">
      {/* ── ValidationPipe Options ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="ValidationPipe Options Master Reference"
          description="Key configuration flags to pass into new ValidationPipe({...})."
          color="primary"
        />

        <ComparisonTable
          headers={["Option Flag", "Type", "Security / Functional Purpose"]}
          rows={[
            ["whitelist: true", "boolean", "Automatically strips away any incoming property not defined on the DTO"],
            ["forbidNonWhitelisted: true", "boolean", "Throws a 400 Bad Request error if any unrecognized property is sent"],
            ["transform: true", "boolean", "Automatically converts query strings and primitives into typed class instances"],
            ["disableErrorMessages: true", "boolean", "Hides detailed validation messages in production for extra security"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Validation Decorators Cheat Sheet ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Top 10 Validation Decorators Cheat Sheet"
          description="Most frequently used class-validator decorators."
          color="sky"
        />

        <ComparisonTable
          headers={["Decorator", "Target Rule", "Example Use Case"]}
          rows={[
            ["@IsString()", "Value must be a string", "User names, titles, descriptions"],
            ["@IsEmail()", "Value must be a valid email format", "Account signup, contact forms"],
            ["@IsNotEmpty()", "Value cannot be empty string or null", "Required form fields"],
            ["@IsInt() / @IsNumber()", "Value must be integer/number", "Prices, quantities, age"],
            ["@Min(x) / @Max(y)", "Value must be in numeric range", "Age limits, pagination limit (max 100)"],
            ["@IsEnum(Enum)", "Value must match enum values", "Order status, user roles"],
            ["@IsOptional()", "Field is optional", "Bio, profile avatar URL"],
            ["@ValidateNested()", "Validates child object/array", "Order items, shipping address"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
