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
// MODULE 5 — CREATING THE PRISMASERVICE
// ═══════════════════════════════════════════════════════════

export function PrismaServiceSection() {
  return (
    <SectionContainer number={5} title="Creating the PrismaService with Lifecycle Hooks">
      {/* ── 5.1 PrismaService ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Connecting PrismaClient to NestJS"
          description="Build an @Injectable() service that manages database connection lifecycles."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔌</span> The PrismaService Class
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Create <code>src/prisma/prisma.service.ts</code>. By implementing <code>OnModuleInit</code> and <code>OnModuleDestroy</code>, the database connection connects when the app boots and disconnects gracefully when shutting down:
          </p>
          <EnhancedCodeBlock
            code={`// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  // 1. Establish database connection on application boot:
  async onModuleInit() {
    await this.$connect();
    this.logger.log('🐘 PostgreSQL database connected successfully via Prisma');
  }

  // 2. Disconnect cleanly when NestJS process receives SIGINT/SIGTERM:
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should PrismaService implement the OnModuleInit interface?"
          answer="So that NestJS eagerly connects to the database during application startup (await this.$connect()), catching any database connection errors immediately before serving traffic."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
