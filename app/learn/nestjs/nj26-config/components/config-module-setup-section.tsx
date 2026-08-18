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
// MODULE 2 — CONFIGMODULE SETUP & ISGLOBAL
// ═══════════════════════════════════════════════════════════

export function ConfigModuleSetupSection() {
  return (
    <SectionContainer number={2} title="ConfigModule Setup &amp; isGlobal">
      {/* ── 2.1 ConfigModule ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Installing &amp; Bootstrapping ConfigModule"
          description="Install @nestjs/config and configure universal global injection across your application."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Setup Commands &amp; AppModule Registration
          </h4>
          <EnhancedCodeBlock
            code={`# 1. Install official NestJS Config package:
npm install @nestjs/config

# 2. Register in AppModule:
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ⭐ Makes ConfigService available everywhere without re-importing!
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens when you set 'isGlobal: true' in ConfigModule.forRoot()?"
          answer="You won't need to import ConfigModule into your feature modules (AuthModule, UsersModule, etc.); ConfigService becomes universally injectable across all providers."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
