"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={12} title="Learning Checks & Quizzes">
      {/* ── Validation Puzzles ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Predict Validation Outcome Puzzles"
          description="Look at the DTO and incoming payload, then predict if it will pass or fail."
          color="primary"
        />

        <PredictOutputBox
          code={`export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}

// Incoming Payload:
const payload = { name: "Wireless Earbuds", price: -15 };`}
          answer={`Outcome: ❌ FAILS with 400 Bad Request\n\nReason: 'price' is -15, which violates the @Min(0) constraint!`}
        />

        <PredictOutputBox
          code={`export class SignupDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  referralCode?: string;
}

// Incoming Payload:
const payload = { email: "alice@learncraft.dev" };`}
          answer={`Outcome: ✅ PASSES with 200/201\n\nReason: 'referralCode' is marked with @IsOptional(), so omitting it is completely valid!`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Validation Security Scenarios"
          description="Test your security knowledge with real-world scenarios."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: A client sends an unauthorized field { isSuperAdmin: true } to your POST /register endpoint. If 'whitelist: true' is enabled on ValidationPipe, what will happen?"
            answer="ValidationPipe will silently strip and remove the 'isSuperAdmin' field before the request reaches the controller or database, protecting your system from mass assignment."
          />

          <QuickCheck
            question="Scenario 2: You have a CreateArticleDto. What is the cleanest, most maintainable way to create an UpdateArticleDto where all fields are optional?"
            answer="export class UpdateArticleDto extends PartialType(CreateArticleDto) {} (using PartialType from '@nestjs/mapped-types')"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
