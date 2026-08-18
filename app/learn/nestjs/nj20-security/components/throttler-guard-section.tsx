"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — THROTTLER DECORATORS (@THROTTLE & @SKIPTHROTTLE)
// ═══════════════════════════════════════════════════════════

export function ThrottlerGuardSection() {
  return (
    <SectionContainer number={5} title="Fine-Tuning Rates with @Throttle() & @SkipThrottle()">
      {/* ── 5.1 Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Customizing Limits per Route"
          description="Apply strict limits on login endpoints and skip throttling on health checks."
          color="rose"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Post, Get } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller()
export class AppController {
  // 1. Strict protection: Max 5 login attempts per 60 seconds (brute-force defense):
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('auth/login')
  login() {
    return { token: 'jwt...' };
  }

  // 2. High-frequency health check: Skip throttling entirely:
  @SkipThrottle()
  @Get('health')
  healthCheck() {
    return { status: 'healthy' };
  }
}`}
          language="typescript"
        />

        <EasyRuleCard rule="Always apply a strict @Throttle({ default: { limit: 5, ttl: 60000 } }) on login and password-reset routes to prevent credential stuffing attacks." />

        <PredictOutputBox
          code={`// Route: @Throttle({ default: { limit: 2, ttl: 10000 } }) -> Max 2 requests per 10s

// An attacker sends 4 requests within 3 seconds:
// Request 1: POST /auth/login
// Request 2: POST /auth/login
// Request 3: POST /auth/login
// Request 4: POST /auth/login`}
          answer={`Predicted Responses:\n\nRequest 1: HTTP 200 OK (Remaining: 1)\nRequest 2: HTTP 200 OK (Remaining: 0)\nRequest 3: HTTP 429 Too Many Requests: { "statusCode": 429, "message": "ThrottlerException: Too Many Requests" }\nRequest 4: HTTP 429 Too Many Requests`}
        />

        <QuickCheck
          question="What decorator completely disables rate limiting for a specific endpoint like /health?"
          answer="@SkipThrottle()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
