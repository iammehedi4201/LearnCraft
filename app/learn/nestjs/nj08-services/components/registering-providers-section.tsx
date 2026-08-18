"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  WhyBox,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — REGISTERING PROVIDERS IN @Module()
// ═══════════════════════════════════════════════════════════

export function RegisteringProvidersSection() {
  return (
    <SectionContainer number={5} title="Registering Providers in @Module()">
      {/* ── 5.1 The Providers Array ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Registering Services in the Providers Array"
          description="NestJS must know which module owns each service so it can instantiate it properly."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  // ⭐ Tell NestJS to manage and instantiate UsersService:
  providers: [UsersService],
})
export class UsersModule {}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>❓</span> Why is this step necessary?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            NestJS does not automatically scan your entire hard drive searching for classes. It only creates and manages services that are explicitly registered inside the <code>providers: [...]</code> array of an active module.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 5.2 The Dreaded Error Message ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The Most Common NestJS Error Explained"
          description="What happens when you forget to register a service in providers."
          color="sky"
        />

        <InfoCallout emoji="⚠️" title="Nest can't resolve dependencies of the UsersController (?)">
          <p className="text-xs text-ds-text-strong leading-relaxed mb-2">
            If you inject <code>UsersService</code> in your controller but forget to add it to <code>providers: [UsersService]</code>, NestJS will throw this error when your server starts:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-ds-error-base p-3 rounded-xl text-xs font-mono border border-ds-stroke-soft overflow-x-auto whitespace-pre-wrap">
            Error: Nest can&apos;t resolve dependencies of the UsersController (?).
            Please make sure that the argument UsersService at index [0] is available in the UsersModule context.
          </pre>
          <p className="text-xs text-ds-text-sub mt-2">
            <strong>The Fix:</strong> Open <code>users.module.ts</code> and add <code>UsersService</code> to the <code>providers: [...]</code> array!
          </p>
        </InfoCallout>

        <QuickCheck
          question="If your terminal shows 'Nest can't resolve dependencies of the XController (?)', what is the most likely cause?"
          answer="The service injected into XController was forgotten and not added to the 'providers: [...]' array of the corresponding module."
        />
      </div>
    </SectionContainer>
  );
}
