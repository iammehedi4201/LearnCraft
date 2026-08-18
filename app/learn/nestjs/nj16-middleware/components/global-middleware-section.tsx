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
// MODULE 6 — GLOBAL MIDDLEWARE IN MAIN.TS
// ═══════════════════════════════════════════════════════════

export function GlobalMiddlewareSection() {
  return (
    <SectionContainer number={6} title="Global Middleware with app.use()">
      {/* ── 6.1 app.use() in main.ts ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Registering Global Functional Middleware"
          description="Apply middleware to every incoming request using app.use() in bootstrap."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌐</span> Global Middleware Registration
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If you have a functional middleware that should run on every single HTTP route across the entire server, bind it directly in <code>main.ts</code>:
          </p>
          <EnhancedCodeBlock
            code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { simpleLogger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ Global functional middleware runs on EVERY incoming route:
  app.use(simpleLogger);

  await app.listen(3000);
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Can you pass a class-based middleware directly into app.use() in main.ts?"
          answer="No. app.use() only accepts raw Express functional middleware. To use class-based middleware with Dependency Injection, configure it in AppModule via NestModule."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
