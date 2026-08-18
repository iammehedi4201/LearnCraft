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
// MODULE 3 — SCHEMA VALIDATION WITH JOI
// ═══════════════════════════════════════════════════════════

export function EnvValidationJoiSection() {
  return (
    <SectionContainer number={3} title="Fail-Fast Validation with Joi">
      {/* ── 3.1 Joi Validation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Preventing Startup with Missing Secrets"
          description="Validate environment variable types, defaults, and mandatory requirements with Joi."
          color="emerald"
        />

        <EnhancedCodeBlock
          code={`# npm install joi

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().min(32).required(),
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
      }),
    }),
  ],
})
export class AppModule {}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// .env has NO DATABASE_URL provided.
// When you run: npm run start:dev`}
          answer={`Predicted Application Startup Outcome:\n\nError: Config validation error: "DATABASE_URL" is required\nProcess exits immediately with code 1!\n\nThis fail-fast mechanism prevents broken Docker containers from serving half-dead traffic!`}
        />

        <QuickCheck
          question="Why is validating environment variables at application startup considered a mission-critical production best practice?"
          answer="It enforces 'Fail-Fast': if a mandatory secret like DATABASE_URL or JWT_SECRET is missing, the server crashes immediately during deployment rather than failing silently when a user triggers an API route."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
