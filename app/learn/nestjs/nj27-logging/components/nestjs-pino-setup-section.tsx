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
// MODULE 3 — NESTJS-PINO INSTALLATION & SETUP
// ═══════════════════════════════════════════════════════════

export function NestjsPinoSetupSection() {
  return (
    <SectionContainer number={3} title="Installing &amp; Configuring nestjs-pino">
      {/* ── 3.1 Installation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Complete Setup in AppModule &amp; main.ts"
          description="Replace the default NestJS console logger with nestjs-pino in 3 steps."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💻</span> Step-by-Step Installation
          </h4>
          <EnhancedCodeBlock
            code={`# Step 1: Install packages
npm install nestjs-pino pino-http
npm install pino-pretty --save-dev

# Step 2: Register LoggerModule in AppModule
// src/app.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true, singleLine: true } }
            : undefined,
      },
    }),
  ],
})
export class AppModule {}

# Step 3: Route NestJS internal bootstrap logs through Pino in main.ts:
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger)); // ⭐ Route all Nest logs to Pino!
  await app.listen(3000);
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is 'bufferLogs: true' passed into NestFactory.create() when setting up nestjs-pino?"
          answer="It buffers early startup log messages until Pino initializes, ensuring that early boot events are formatted using Pino rather than default plain text."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
