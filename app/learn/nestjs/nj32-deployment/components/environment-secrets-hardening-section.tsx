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
// MODULE 8 — PRODUCTION SECURITY HARDENING
// ═══════════════════════════════════════════════════════════

export function EnvironmentSecretsHardeningSection() {
  return (
    <SectionContainer number={8} title="Production Security Hardening &amp; Secrets">
      {/* ── 8.1 Hardening ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Helmet, Rate Limiting &amp; Secure Cloud Secrets"
          description="Lock down HTTP response headers and protect against brute-force DDoS attacks."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Complete main.ts Production Hardening
          </h4>
          <EnhancedCodeBlock
            code={`import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Security Headers (HSTS, CSP, X-Frame-Options):
  app.use(helmet());

  // 2. Strict CORS Whitelist:
  app.enableCors({
    origin: ['https://learncraft.dev', 'https://admin.learncraft.dev'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // 3. Graceful shutdown:
  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What security headers does helmet() attach to HTTP responses in NestJS?"
          answer="Helmet sets critical security headers including Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (clickjacking protection), and X-Content-Type-Options (MIME sniffing prevention)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
