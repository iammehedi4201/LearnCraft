"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — CLASS PROVIDERS & ALIASES (useClass & useExisting)
// ═══════════════════════════════════════════════════════════

export function ClassProvidersSection() {
  return (
    <SectionContainer number={8} title="Class Providers & Aliases (useClass & useExisting)">
      {/* ── 8.1 useClass ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Swapping Implementations with useClass"
          description="useClass allows you to dynamically resolve a token to a specific class."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Module } from '@nestjs/common';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  providers: [
    {
      provide: LoggerService,
      // ⭐ Uses DevLogger in development, ProdLogger in production:
      useClass: isDev ? DevelopmentLogger : ProductionLogger,
    },
  ],
})
export class LoggingModule {}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔗</span> Aliasing Providers with useExisting
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            If you want two different tokens to point to the exact same singleton instance, use <code>useExisting</code>:
          </p>
          <EnhancedCodeBlock
            code={`@Module({
  providers: [
    UsersService,
    {
      provide: 'ALIEN_USERS_SERVICE',
      useExisting: UsersService, // ⭐ Reuses the exact same UsersService instance!
    },
  ],
})
export class UsersModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the difference between 'useClass' and 'useExisting'?"
          answer="'useClass' instantiates a new class instance for the token, while 'useExisting' creates an alias that reuses an already existing provider's instance."
        />
      </div>
    </SectionContainer>
  );
}
