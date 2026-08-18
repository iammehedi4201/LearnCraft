"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — THIRD-PARTY MIDDLEWARE (HELMET, COOKIES, CORS)
// ═══════════════════════════════════════════════════════════

export function ThirdPartyMiddlewareSection() {
  return (
    <SectionContainer number={7} title="Third-Party Middleware (Helmet, Cookies, CORS)">
      {/* ── 7.1 Express Ecosystem ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Leveraging the Express Ecosystem"
          description="NestJS is fully compatible with standard Express middleware packages."
          color="emerald"
        />

        <ComparisonTable
          headers={["Middleware Package", "Command", "Security / Performance Role"]}
          rows={[
            ["helmet", "npm i helmet", "Sets security HTTP response headers (XSS protection, CSP, HSTS)"],
            ["cookie-parser", "npm i cookie-parser @types/cookie-parser", "Parses Cookie headers into req.cookies object"],
            ["compression", "npm i compression @types/compression", "Gzip/Brotli compresses outgoing responses to save bandwidth"],
            ["cors", "app.enableCors()", "Built-in NestJS CORS configuration for cross-origin frontend apps"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Security Headers:
  app.use(helmet());

  // 2. Cookie Parser:
  app.use(cookieParser());

  // 3. Response Compression:
  app.use(compression());

  // 4. Enable Cross-Origin Resource Sharing:
  app.enableCors({ origin: 'https://learncraft.dev', credentials: true });

  await app.listen(3000);
}
bootstrap();`}
          language="typescript"
        />

        <QuickCheck
          question="What middleware package should be added to every production NestJS app to automatically configure secure HTTP headers?"
          answer="helmet (app.use(helmet()))."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
