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
// MODULE 6 — THE SEEDERMODULE & SEEDERSERVICE PATTERN
// ═══════════════════════════════════════════════════════════

export function SeedingDatabaseSection() {
  return (
    <SectionContainer number={6} title="Designing a Dedicated SeederModule & SeederService">
      {/* ── 6.1 Seeder Service ── */}
      <div className="mb-16">
        <TopicHeader
          number={6}
          title="Modular State Seeding Architecture"
          description="How to encapsulate initialization logic into a dedicated SeederModule with injected domain repositories."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌱</span> Modular Seeder Architecture
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Rather than spreading ad-hoc insertion scripts across individual controllers, encapsulate domain data seeding into a dedicated <code>SeederService</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CategoriesRepository } from '../catalog/categories.repository';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async seedAll(): Promise<void> {
    this.logger.log('Starting full domain seeding sequence...');
    await this.seedCategories();
    await this.seedDefaultAdmin();
    this.logger.log('✅ All seed sequences finished.');
  }

  private async seedCategories(): Promise<void> {
    const defaultCategories = ['Engineering', 'Design', 'Architecture', 'Security'];
    for (const name of defaultCategories) {
      const exists = await this.categoriesRepo.findByName(name);
      if (!exists) {
        await this.categoriesRepo.create({ name });
      }
    }
    this.logger.log(\`Processed \${defaultCategories.length} categories.\`);
  }

  private async seedDefaultAdmin(): Promise<void> {
    const admin = await this.usersRepo.findByEmail('admin@learncraft.dev');
    if (!admin) {
      await this.usersRepo.create({
        email: 'admin@learncraft.dev',
        username: 'sysadmin',
        roles: ['ADMIN'],
      });
      this.logger.log('Created default administrator account.');
    }
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should SeederService inject repositories instead of manipulating raw files or global state directly?"
          answer="Injecting repositories leverages NestJS dependency injection, ensures domain entity validation methods run, and allows mock repositories to be used during tests."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
