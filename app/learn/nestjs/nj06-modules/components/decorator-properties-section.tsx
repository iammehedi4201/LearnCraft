"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — THE @Module() DECORATOR PROPERTIES
// ═══════════════════════════════════════════════════════════

export function DecoratorPropertiesSection() {
  return (
    <SectionContainer number={2} title="The 4 @Module() Properties">
      {/* ── 2.1 The 4 Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 4 Properties of @Module()"
          description="The @Module() decorator takes an object with up to 4 simple properties."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],       // 1. What modules do we borrow from?
  controllers: [UsersController],   // 2. What HTTP routes belong here?
  providers: [UsersService],       // 3. What internal services belong here?
  exports: [UsersService],         // 4. What services do we share with others?
})
export class UsersModule {}`}
          language="typescript"
        />

        <div className="mt-8">
          <ComparisonTable
            headers={["Property", "Simple Question to Ask", "What It Does"]}
            rows={[
              ["controllers", "Which HTTP routes belong here?", "Lists the controllers defined in this module that should receive requests."],
              ["providers", "Which services do our controllers need?", "Lists the services created and used inside this module."],
              ["imports", "Do we need services from another module?", "Lists other modules whose exported services we want to use."],
              ["exports", "Do other modules want to borrow our service?", "Lists services from this module that should be available to other modules."],
            ]}
          />
        </div>

        <EasyRuleCard rule="Controllers handle requests. Providers do the work. Imports borrow tools. Exports share tools." />
      </div>

      <Divider />

      {/* ── 2.2 Why Are Providers Private by Default? ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Why Are Providers Private by Default?"
          description="In NestJS, a service in UsersModule is invisible to AuthModule unless you explicitly export it."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔒</span> Encapsulation: Keeping Code Safe
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            Imagine if every variable in your code was global — any file could accidentally change any variable! That would cause chaos.
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            NestJS keeps all services <strong>private to their own module</strong> by default. If another module wants to use <code>UsersService</code>, you must explicitly put <code>UsersService</code> into the <code>exports: [...]</code> array.
          </p>
        </WhyBox>

        <QuickCheck
          question="If AuthModule wants to use UsersService, what TWO things must happen?"
          answer="1. UsersModule must add UsersService to its 'exports' array.\n2. AuthModule must add UsersModule to its 'imports' array."
        />
      </div>
    </SectionContainer>
  );
}
