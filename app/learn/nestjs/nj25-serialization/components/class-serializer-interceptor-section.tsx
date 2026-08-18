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
// MODULE 6 — CLASSSERIALIZERINTERCEPTOR IN NESTJS
// ═══════════════════════════════════════════════════════════

export function ClassSerializerInterceptorSection() {
  return (
    <SectionContainer number={6} title="ClassSerializerInterceptor &amp; Response Shaping">
      {/* ── 6.1 Interceptor Setup ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated Entity Response Transformation"
          description="How NestJS intercepts returned controller instances and applies class-transformer rules."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Global Binding in main.ts
          </h4>
          <EnhancedCodeBlock
            code={`// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ Automatically serialize every returned entity across all controllers:
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Binding ClassSerializerInterceptor globally ensures you never accidentally leak passwordHash or private tokens to clients." />

        <QuickCheck
          question="What library powers ClassSerializerInterceptor under the hood in NestJS?"
          answer="class-transformer (specifically the instanceToPlain function)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
