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
// MODULE 4 — RATE LIMITING WITH @NESTJS/THROTTLER
// ═══════════════════════════════════════════════════════════

export function RateLimitingThrottlerSection() {
  return (
    <SectionContainer number={4} title="Rate-Limiting & DDoS Prevention with Throttler">
      {/* ── 4.1 ThrottlerModule ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Preventing Brute-Force and API Floods"
          description="Configure @nestjs/throttler to cap incoming requests per IP address."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⏱️</span> Multi-Tier Rate Limiting Configuration
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Install the official module: <code>npm i @nestjs/throttler</code>.
            Configure multiple tiers (short, medium, long) in <code>AppModule</code>:
          </p>
          <EnhancedCodeBlock
            code={`// src/app.module.ts
import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,   // 1 second window
        limit: 3,    // Max 3 requests per second
      },
      {
        name: 'medium',
        ttl: 10000,  // 10 seconds window
        limit: 20,   // Max 20 requests per 10 seconds
      },
      {
        name: 'long',
        ttl: 60000,  // 1 minute window
        limit: 100,  // Max 100 requests per minute
      },
    ]),
  ],
  providers: [
    // ⭐ Bind ThrottlerGuard globally across ALL endpoints:
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What HTTP status code is automatically returned to a client when they exceed the rate limit threshold?"
          answer="HTTP 429 Too Many Requests."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
