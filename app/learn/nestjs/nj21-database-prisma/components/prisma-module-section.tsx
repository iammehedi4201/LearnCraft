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
// MODULE 6 — GLOBAL PRISMAMODULE & DEPENDENCY INJECTION
// ═══════════════════════════════════════════════════════════

export function PrismaModuleSection() {
  return (
    <SectionContainer number={6} title="The Global PrismaModule for Dependency Injection">
      {/* ── 6.1 PrismaModule ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Making Database Access Universal"
          description="Annotate PrismaModule with @Global() to make PrismaService available anywhere."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌐</span> The Global Decorator Pattern
          </h4>
          <EnhancedCodeBlock
            code={`// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ⭐ Makes PrismaService accessible in all modules without re-importing!
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// Consuming in any service (e.g. UsersService):
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} // ⭐ Injected effortlessly!

  async findAll() {
    return await this.prisma.user.findMany();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Decorate PrismaModule with @Global() so you only have to import it once in AppModule." />

        <QuickCheck
          question="What is the benefit of adding the @Global() decorator to PrismaModule?"
          answer="It eliminates the boilerplate of importing PrismaModule into every single feature module (UsersModule, PostsModule, AuthModule, etc.)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
