"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 9 — REAL-WORLD PATTERN: VALIDATION DECORATORS
// ═══════════════════════════════════════════════════════════

export function ValidationDecoratorSection() {
  return (
    <SectionContainer number={9} title="Real-World Pattern: Validation">
      {/* ── 9.1 Declarative Validation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Declarative Property Validation"
          description="In NestJS applications, incoming request data (DTOs) is validated using property decorators from class-validator. Here is how that system works from scratch."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The Two Parts of a Validation System:
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-2">
            1. <strong>Property Decorators (@IsEmail, @MinLength)</strong>: Store validation rule functions into a metadata registry for each property.
          </p>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            2. <strong>The validate(object) function</strong>: Inspects the object, looks up the registered rules, and returns an array of error messages.
          </p>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Complete Validation System from Scratch</SectionHeading>
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
      message: message || propertyKey + " should not be empty",
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

// Step 4: Use it on a DTO!
class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string = "";

  @IsNotEmpty()
  @IsEmail()
  email: string = "";
}

// Test with invalid data:
const badDto = new RegisterUserDto();
badDto.username = "al";
badDto.email = "not-an-email";

console.log("❌ Errors for badDto:", validate(badDto));

// Test with valid data:
const goodDto = new RegisterUserDto();
goodDto.username = "mehedi";
goodDto.email = "mehedi@learncraft.dev";

console.log("✅ Errors for goodDto:", validate(goodDto));`}
            height="520px"
          />
        </div>

        <QuickCheck
          question="Why don't validation decorators throw an error immediately when applied to a property?"
          answer="Because decorators run when the class is defined, before any user data has been created or submitted. The decorators only attach the validation rules to metadata. Later, when an HTTP request arrives, the framework's ValidationPipe calls validate(requestData) against those pre-stored rules."
        />
      </div>
    </SectionContainer>
  );
}
