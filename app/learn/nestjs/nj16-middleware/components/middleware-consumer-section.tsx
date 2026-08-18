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
// MODULE 4 — MIDDLEWARECONSUMER & NESTMODULE CONFIGURATION
// ═══════════════════════════════════════════════════════════

export function MiddlewareConsumerSection() {
  return (
    <SectionContainer number={4} title="MiddlewareConsumer & NestModule Configuration">
      {/* ── 4.1 NestModule & configure() ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Binding Middleware via NestModule"
          description="Modules with middleware implement NestModule and the configure(consumer) method."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎛️</span> Fluent Middleware Configuration
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In NestJS, modules that configure middleware implement the <code>NestModule</code> interface:
          </p>
          <EnhancedCodeBlock
            code={`import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RequestLoggerMiddleware } from './request-logger.middleware';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      // Exclude public endpoints:
      .exclude(
        { path: 'users/public', method: RequestMethod.GET },
        'health',
      )
      // Apply to all routes inside UsersController:
      .forRoutes(UsersController);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What method on MiddlewareConsumer allows you to bypass middleware execution for specific paths?"
          answer="consumer.exclude(...)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
