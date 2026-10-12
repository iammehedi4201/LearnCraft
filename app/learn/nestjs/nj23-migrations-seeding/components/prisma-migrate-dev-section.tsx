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
// MODULE 2 — NESTJS LIFECYCLE HOOKS (ONMODULEINIT)
// ═══════════════════════════════════════════════════════════

export function PrismaMigrateDevSection() {
  return (
    <SectionContainer number={2} title="NestJS Lifecycle Hooks: OnModuleInit & OnApplicationBootstrap">
      {/* ── 2.1 OnModuleInit ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Executing Asynchronous Setup with OnModuleInit"
          description="How implementing the OnModuleInit interface lets providers run asynchronous setup as soon as dependencies are ready."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💻</span> Implementing the OnModuleInit Interface
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            NestJS calls the <code>onModuleInit()</code> method automatically once all dependencies of that module have been resolved and injected:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class StateInitializationService implements OnModuleInit {
  private readonly logger = new Logger(StateInitializationService.name);

  constructor(private readonly usersRepo: UsersRepository) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Executing OnModuleInit: verifying seed state...');
    
    // Check if initial admin user exists; if not, seed it:
    const adminExists = await this.usersRepo.findByEmail('admin@learncraft.dev');
    if (!adminExists) {
      await this.usersRepo.create({
        email: 'admin@learncraft.dev',
        username: 'superadmin',
        roles: ['ADMIN'],
      });
      this.logger.log('✅ Default superadmin seeded successfully.');
    } else {
      this.logger.log('ℹ️ Admin user already exists. Skipping seed.');
    }
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Does NestJS begin listening for HTTP requests before or after all onModuleInit() promises resolve?"
          answer="After! NestJS awaits all onModuleInit() and onApplicationBootstrap() hooks before app.listen() opens the network port to client requests."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
