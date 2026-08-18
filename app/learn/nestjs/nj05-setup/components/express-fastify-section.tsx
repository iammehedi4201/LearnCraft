"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  AnalogyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — UNDER THE HOOD: EXPRESS VS FASTIFY
// ═══════════════════════════════════════════════════════════

export function ExpressFastifySection() {
  return (
    <SectionContainer number={6} title="Under the Hood: Express vs Fastify">
      {/* ── 6.1 HTTP Adapters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="NestJS Uses Express Under the Hood"
          description="NestJS is not a replacement for Express. It sits ON TOP of Express as a structured layer."
          color="primary"
        />

        <AnalogyBox emoji="🚗" title="Simple Real-Life Story: The Luxury Car Body and Engine">
          <p>
            Think of <strong>Express</strong> as a reliable, proven car engine.
          </p>
          <p className="mt-2">
            <strong>NestJS</strong> is the luxury car built around that engine: with leather seats, GPS navigation, climate control, and smart safety features. You get all the power of Express, plus a high-end structured framework.
          </p>
        </AnalogyBox>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> What is Fastify?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            NestJS also supports <strong>Fastify</strong>, an alternative HTTP engine designed for extreme speed and high throughput (handling up to 2x more requests per second than Express).
          </p>
          <p className="text-xs text-ds-text-strong">
            Because NestJS abstracts the HTTP layer, your controllers and services work the same whether you use Express or Fastify!
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 6.2 Comparison & When to Use Which ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Express vs Fastify: Which One Should You Choose?"
          description="A quick guide to help you decide."
          color="sky"
        />

        <ComparisonTable
          headers={["Engine", "Default in NestJS?", "Best For", "Pros & Cons"]}
          rows={[
            ["Express.js", "✅ Yes (Default)", "95% of standard backend applications", "Thousands of community plugins & tutorials. Extremely stable."],
            ["Fastify", "❌ Optional install", "Ultra high-traffic APIs & microservices", "Nearly 2x faster benchmarks, but fewer 3rd-party Express middlewares."],
          ]}
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔄</span> How Easy Is It to Switch to Fastify?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
            Just install <code>@nestjs/platform-fastify</code> and change two lines in <code>main.ts</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  // Use FastifyAdapter instead of default Express:
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Which HTTP server engine does NestJS use by default when you create a new project?"
          answer="Express.js (@nestjs/platform-express)."
        />
      </div>
    </SectionContainer>
  );
}
