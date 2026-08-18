"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — PINO-PRETTY VS PRODUCTION TRANSPORTS
// ═══════════════════════════════════════════════════════════

export function PinoPrettyTransportsSection() {
  return (
    <SectionContainer number={8} title="pino-pretty in Dev vs Cloud Transports">
      {/* ── 8.1 Transports ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Human-Friendly Development vs Raw Cloud JSON"
          description="Colorized terminal formatting locally; raw fast JSON in production Docker containers."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎨</span> Environment-Conditional Transport
          </h4>
          <EnhancedCodeBlock
            code={`// src/config/pino.config.ts
export const pinoConfig = {
  pinoHttp: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    // ⭐ Only format with pino-pretty in local development:
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
              ignore: 'pid,hostname',
              singleLine: true,
            },
          }
        : undefined, // In production: Output ultra-fast raw JSON to stdout!
  },
};`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="NEVER use pino-pretty in production. Pretty-printing consumes heavy CPU cycles; production log shippers (Datadog, Loki) require raw JSON." />

        <QuickCheck
          question="Why is running pino-pretty in production considered an anti-pattern?"
          answer="Because ANSI color formatting wastes substantial CPU cycles and transforms structured JSON into unparsable plain text for cloud logging tools."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
