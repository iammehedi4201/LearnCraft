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
// MODULE 8 — EXPORTING OPENAPI JSON FOR SDK GENERATORS
// ═══════════════════════════════════════════════════════════

export function ExportingOpenapiJsonSection() {
  return (
    <SectionContainer number={8} title="Exporting OpenAPI JSON for Frontend SDKs">
      {/* ── 8.1 OpenAPI Export ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Auto-Generating Frontend TypeScript Clients"
          description="Export swagger.json during build to generate 100% typed React Query / Axios SDKs."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💾</span> Exporting swagger.json to Disk
          </h4>
          <EnhancedCodeBlock
            code={`// scripts/generate-swagger-spec.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from '../src/app.module';

async function generateSpec() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('LearnCraft API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ⭐ Save OpenAPI 3.0 specification to JSON:
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  console.log('✅ Generated openapi.json successfully!');
  await app.close();
}
generateSpec();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What frontend tools can ingest the exported openapi.json to generate client API code automatically?"
          answer="Tools like 'Orval', 'openapi-typescript-codegen', and 'openapi-generator' automatically generate fully-typed React Query hooks, fetch calls, and TypeScript interfaces."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
