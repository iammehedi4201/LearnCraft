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
// MODULE 2 — HELMET SECURITY HEADERS
// ═══════════════════════════════════════════════════════════

export function HelmetHeadersSection() {
  return (
    <SectionContainer number={2} title="Helmet Security HTTP Response Headers">
      {/* ── 2.1 Helmet Headers ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated HTTP Header Hardening"
          description="How Helmet automatically adds 15+ security headers to protect browsers."
          color="sky"
        />

        <ComparisonTable
          headers={["Security Header", "What It Does", "Attack It Prevents"]}
          rows={[
            ["X-Frame-Options: DENY", "Disallows embedding in iframes", "Clickjacking"],
            ["X-Content-Type-Options: nosniff", "Forces browser to follow declared MIME type", "MIME-sniffing exploits"],
            ["Strict-Transport-Security (HSTS)", "Enforces HTTPS encryption for 1 year", "Man-in-the-Middle (MITM) attacks"],
            ["Hide Powered-By", "Removes 'X-Powered-By: Express'", "Targeted vulnerability probing"],
            ["Content-Security-Policy (CSP)", "Controls where scripts/images load from", "Cross-Site Scripting (XSS)"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ One line automatically configures all 15+ standard security headers:
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();`}
          language="typescript"
        />

        <QuickCheck
          question="Why does Helmet remove the 'X-Powered-By: Express' header from API responses?"
          answer="To practice 'Security through Obscurity', preventing automated scanners from identifying that your backend runs on Node.js/Express and targeting known framework vulnerabilities."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
