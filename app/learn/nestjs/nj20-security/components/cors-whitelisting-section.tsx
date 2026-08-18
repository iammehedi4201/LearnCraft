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
// MODULE 3 — CORS CONFIGURATION & ORIGIN WHITELISTING
// ═══════════════════════════════════════════════════════════

export function CorsWhitelistingSection() {
  return (
    <SectionContainer number={3} title="CORS Configuration & Origin Whitelisting">
      {/* ── 3.1 Production CORS ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Restricting Cross-Origin Access in Production"
          description="How to configure a secure CORS origin whitelist for your frontend applications."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌐</span> Secure CORS Configuration in main.ts
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In development, <code>origin: true</code> or <code>origin: &apos;*&apos;</code> is common. But in production, you must whitelist only your trusted domains:
          </p>
          <EnhancedCodeBlock
            code={`// src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'https://learncraft.dev',
    'https://admin.learncraft.dev',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl) or in whitelist:
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id'],
    credentials: true, // Allow cookies and auth headers
    maxAge: 3600,      // Cache preflight OPTIONS response for 1 hour
  });

  await app.listen(3000);
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Never use origin: '*' together with credentials: true in production, as modern browsers will reject the response." />

        <QuickCheck
          question="Why does the browser send an HTTP OPTIONS request before a POST or DELETE request across different origins?"
          answer="It is a 'preflight' check asking the server which HTTP methods and headers are permitted before sending the actual request body."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
