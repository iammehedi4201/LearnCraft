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
// MODULE 9 — ACCESSING CONFIG IN MAIN.TS BOOTSTRAP
// ═══════════════════════════════════════════════════════════

export function ConfigInMainBootstrapSection() {
  return (
    <SectionContainer number={9} title="Accessing Configuration in main.ts">
      {/* ── 9.1 main.ts Config ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Dynamic Port &amp; CORS Setup in Bootstrap"
          description="How to retrieve validated ConfigService instances before the HTTP server starts listening."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> app.get(ConfigService) Pattern
          </h4>
          <EnhancedCodeBlock
            code={`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // ⭐ Extract ConfigService from NestJS IoC container:
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3000);
  const frontendUrl = configService.get<string>('FRONTEND_URL', 'http://localhost:3000');

  app.enableCors({ origin: frontendUrl, credentials: true });

  await app.listen(port);
  logger.log(\`🚀 Server running on http://localhost:\${port}\`);
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How do you obtain a reference to ConfigService inside main.ts before app.listen() is called?"
          answer="Using 'const configService = app.get(ConfigService)'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
