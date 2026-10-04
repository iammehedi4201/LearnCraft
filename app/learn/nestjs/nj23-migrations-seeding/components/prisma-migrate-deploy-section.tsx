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
// MODULE 4 — STANDALONE SCRIPTS WITH NESTFACTORY
// ═══════════════════════════════════════════════════════════

export function PrismaMigrateDeploySection() {
  return (
    <SectionContainer number={4} title="Standalone Scripts with NestFactory.createApplicationContext">
      {/* ── 4.1 Standalone Context ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Running CLI &amp; Seeding Tasks Without an HTTP Server"
          description="How to use createApplicationContext to instantiate the NestJS DI container for command-line jobs."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> Headless NestJS Application Context
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Often you need to seed data, run database cleanup, or execute one-off batch jobs from npm scripts. Instead of starting an HTTP server with <code>NestFactory.create()</code>, use <code>NestFactory.createApplicationContext()</code>:
          </p>
          <EnhancedCodeBlock
            code={`// src/scripts/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeederService } from '../seeder/seeder.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SeedRunner');
  logger.log('Starting headless NestJS application context...');

  // ⭐ Instantiates DI container WITHOUT binding an HTTP listener:
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const seeder = app.get(SeederService);
    await seeder.seedAll();
    logger.log('✨ Database seeding completed successfully.');
  } catch (err) {
    logger.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    // ⭐ Closes all database connections and triggers OnModuleDestroy:
    await app.close();
  }
}

bootstrap();`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Use createApplicationContext() for CLI jobs, migration runners, and seed scripts. Always call await app.close() in a finally block to avoid hung Node.js processes." />

        <QuickCheck
          question="What is the advantage of using createApplicationContext() over writing a plain raw script?"
          answer="It boots your actual NestJS modules and dependency injection container, giving your script direct access to all configured repositories, config services, and encryption utilities."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
