"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — NESTED OBJECT VALIDATION (@ValidateNested)
// ═══════════════════════════════════════════════════════════

export function NestedValidationSection() {
  return (
    <SectionContainer number={8} title="Nested Object Validation (@ValidateNested)">
      {/* ── 8.1 Validating Sub-Objects ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Validating Deeply Nested Objects and Arrays"
          description="How to validate child objects like addresses, profiles, or array items."
          color="primary"
        />

        <InfoCallout emoji="⚠️" title="The 2 Required Decorators for Nested Validation">
          <p className="text-xs text-ds-text-strong leading-relaxed mb-2">
            Whenever you have a nested DTO property, you <strong>MUST</strong> use both of these decorators together:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-ds-text-strong">
            <li><code>@ValidateNested()</code>: Tells validator to check the inside of the object.</li>
            <li><code>@Type(() =&gt; ChildDto)</code>: Tells transformer which class to instantiate so decorators can be read!</li>
          </ol>
        </InfoCallout>

        <EnhancedCodeBlock
          code={`import { IsString, IsNotEmpty, IsInt, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// 1. Child DTO (Address):
export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  zipCode: string;
}

// 2. Parent DTO (User with nested Address):
export class CreateUserWithAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // ⭐ Both @ValidateNested AND @Type are mandatory here:
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 8.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Live Nested Validation Simulation"
          description="Test how parent and child validations trigger together."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Nested Object Validator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function validateNestedUser(payload: any) {
  const errors: string[] = [];

  if (!payload.name) errors.push("name is required");

  if (!payload.address || typeof payload.address !== "object") {
    errors.push("address must be an object");
  } else {
    if (!payload.address.street) errors.push("address.street is required");
    if (!payload.address.city) errors.push("address.city is required");
  }

  return { isValid: errors.length === 0, errors };
}

console.log("Valid Nested:  ", validateNestedUser({
  name: "Mehedi",
  address: { street: "123 Tech Lane", city: "Dhaka" }
}));

console.log("Invalid Nested:", validateNestedUser({
  name: "Mehedi",
  address: { street: "", city: "" }
}));`}
            height="420px"
          />
        </div>

        <QuickCheck
          question="What 2 decorators must always be used together when validating a nested sub-object in a DTO?"
          answer="@ValidateNested() (from class-validator) and @Type(() => ChildDto) (from class-transformer)"
        />
      </div>
    </SectionContainer>
  );
}
