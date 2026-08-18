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
// MODULE 4 — VALIDATION WITH CLASS-VALIDATOR
// ═══════════════════════════════════════════════════════════

export function EnvValidationClassValidatorSection() {
  return (
    <SectionContainer number={4} title="Validation with class-validator &amp; DTO Classes">
      {/* ── 4.1 Class Validator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Alternative: Pure TypeScript Class Validation"
          description="Validate environment variables using familiar class-validator decorators."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📐</span> Environment Class DTO Pattern
          </h4>
          <EnhancedCodeBlock
            code={`// src/config/env.validation.ts
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  PORT: number = 3000;

  @IsString()
  DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

// In AppModule:
ConfigModule.forRoot({ validate });`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the advantage of using class-validator for environment variables instead of Joi?"
          answer="It reuses the exact same class-validator decorators and DTO patterns you already use throughout your NestJS controllers and services."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
