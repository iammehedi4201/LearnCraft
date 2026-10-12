"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 9 — REAL-WORLD PATTERN: VALIDATION DECORATORS
// ═══════════════════════════════════════════════════════════

export function ValidationDecoratorSection() {
  return (
    <SectionContainer number={11} title="Real-World Pattern: Validation">
      {/* ── 9.1 Declarative Validation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automatic Data Validation with Decorators"
          description="In NestJS applications, incoming request data (DTOs) is validated using property decorators like @IsEmail and @MinLength from class-validator."
          color="primary"
        />

        <AnalogyBox emoji="📋" title="The Passport Application Checklist">
          <p>
            Think of validation decorators like the required checkboxes on a visa application form:
          </p>
          <p className="mt-2">
            The form template says: <em>&quot;Email is required&quot;</em> and <em>&quot;Password must be at least 6 characters&quot;</em>.
          </p>
          <p className="mt-2">
            When a user hands in their filled form, the inspector (NestJS <code>ValidationPipe</code>) checks each rule against the submitted answers and rejects incomplete forms!
          </p>
        </AnalogyBox>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The Two Parts of a Validation System:
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-2">
            1. <strong>Property Decorators (@IsEmail, @MinLength)</strong>: Attach validation rule functions to a metadata list for each property.
          </p>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            2. <strong>The validate(object) function</strong>: Inspects the object, runs the registered rules, and returns any error messages.
          </p>
        </WhyBox>

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Complete Validation System from Scratch</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Click Run to test how invalid data is caught and rejected by our custom validation engine:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: Storage for validation rules
interface ValidationRule {
  property: string;
  validator: (value: any) => boolean;
  message: string;
}

const validationRules = new Map<any, ValidationRule[]>();

function addRule(target: any, rule: ValidationRule) {
  const constructor = target.constructor;
  const rules = validationRules.get(constructor) || [];
  rules.push(rule);
  validationRules.set(constructor, rules);
}

// Step 2: Decorators that register rules
function IsNotEmpty(message?: string) {
  return function (target: any, propertyKey: string) {
    addRule(target, {
      property: propertyKey,
      validator: val => val !== undefined && val !== null && String(val).trim().length > 0,
      message: message || propertyKey + " cannot be empty",
    });
  };
}

function MinLength(min: number) {
  return function (target: any, propertyKey: string) {
    addRule(target, {
      property: propertyKey,
      validator: val => typeof val === "string" && val.length >= min,
      message: propertyKey + " must be at least " + min + " characters long",
    });
  };
}

function IsEmail() {
  return function (target: any, propertyKey: string) {
    addRule(target, {
      property: propertyKey,
      validator: val => typeof val === "string" && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val),
      message: propertyKey + " must be a valid email address",
    });
  };
}

// Step 3: The validate() function (What NestJS ValidationPipe runs!)
function validate(dto: any): string[] {
  const rules = validationRules.get(dto.constructor) || [];
  const errors: string[] = [];

  for (const rule of rules) {
    const value = dto[rule.property];
    if (!rule.validator(value)) {
      errors.push(rule.message);
    }
  }

  return errors;
}

// Step 4: Use it on a DTO class!
class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string = "";

  @IsNotEmpty()
  @IsEmail()
  email: string = "";
}

// Test 1: Invalid data
const badDto = new RegisterUserDto();
badDto.username = "al";           // Too short!
badDto.email = "not-an-email";     // Invalid email format!

console.log("❌ Errors for badDto:", validate(badDto));

// Test 2: Valid data
const goodDto = new RegisterUserDto();
goodDto.username = "mehedi";
goodDto.email = "mehedi@learncraft.dev";

console.log("✅ Errors for goodDto (Empty = Valid!):", validate(goodDto));`}
            height="520px"
          />
        </div>

        <QuickCheck
          question="Why don't validation decorators throw an error immediately when applied to a property?"
          answer="Because decorators run when the class is defined, before any real user data has been submitted. The decorators simply attach the validation rules to metadata. Later, when an HTTP request arrives, NestJS runs validate(submittedData) against those pre-stored rules."
        />
      </div>
    </SectionContainer>
  );
}
