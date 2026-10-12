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
// MODULE 3 — PRODUCTION CONFIGURATION HARDENING
// ═══════════════════════════════════════════════════════════

export function DockerComposeProductionSection() {
  return (
    <SectionContainer number={3} title="Production Configuration &amp; Environment Hardening">
      {/* ── 3.1 Production Config ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Validating Production Environment Invariants"
          description="How to configure ConfigModule with strict validation to ensure the server never starts with missing or insecure variables."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Strict Production Config Validation
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In production, failing to provide a required secret (e.g. <code>JWT_SECRET</code>) must crash the server during bootstrap with a clear error message, rather than failing later during user requests:
          </p>
          <EnhancedCodeBlock
            code={`import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true, // ⭐ Caches process.env lookups in memory for high performance
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('production'),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().min(32).required(), // ⭐ Crash on startup if secret is missing or too short
        API_PREFIX: Joi.string().default('api/v1'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false, // Report all missing variables at once
      },
    }),
  ],
})
export class AppModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why enable 'cache: true' in ConfigModule for production?"
          answer="Reading from Node.js 'process.env' is surprisingly slow because it performs system calls. 'cache: true' caches variable values in memory, speeding up lookups by up to 10x."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
