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
// MODULE 2 — SWAGGER SETUP IN MAIN.TS
// ═══════════════════════════════════════════════════════════

export function SwaggerSetupBootstrapSection() {
  return (
    <SectionContainer number={2} title="Installing &amp; Bootstrapping Swagger in main.ts">
      {/* ── 2.1 Swagger Setup ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="DocumentBuilder &amp; SwaggerModule.setup"
          description="Mount interactive API documentation at /api/docs with 4 lines of code."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Complete Bootstrap Configuration
          </h4>
          <EnhancedCodeBlock
            code={`# Step 1: Install packages
npm install @nestjs/swagger swagger-ui-express

// Step 2: Configure in src/main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ Build OpenAPI Document configuration:
  const config = new DocumentBuilder()
    .setTitle('LearnCraft Production API')
    .setDescription('Enterprise REST API documentation with OpenAPI 3.0')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth', // Security name referenced by @ApiBearerAuth()
    )
    .addTag('Auth', 'User authentication and JWT token lifecycle')
    .addTag('Users', 'User profile management & RBAC roles')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // ⭐ Mount UI at http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the default endpoint path recommended for Swagger UI in NestJS?"
          answer="'api/docs' or 'api/swagger', configured via the first argument of SwaggerModule.setup('api/docs', app, document)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
