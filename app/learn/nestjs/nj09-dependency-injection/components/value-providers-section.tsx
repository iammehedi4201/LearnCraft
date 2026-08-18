"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — VALUE PROVIDERS (useValue)
// ═══════════════════════════════════════════════════════════

export function ValueProvidersSection() {
  return (
    <SectionContainer number={7} title="Value Providers: useValue & Unit Testing">
      {/* ── 7.1 What is useValue? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Injecting Constants and Mock Objects with useValue"
          description="useValue lets you inject any static value, configuration object, or test mock."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Module } from '@nestjs/common';

const appConfig = {
  appName: 'LearnCraft Backend',
  version: '2.0.0',
  port: 4000,
};

@Module({
  providers: [
    {
      provide: 'APP_CONFIG',
      useValue: appConfig, // ⭐ Injects static object directly!
    },
  ],
})
export class AppModule {}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧪</span> Killer Feature: Mocking in Unit Tests
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            In automated unit tests, you don&apos;t want to connect to a real database. With <code>useValue</code>, you can effortlessly swap the real service with a fake mock object:
          </p>
          <EnhancedCodeBlock
            code={`// In a Jest unit test:
const mockUsersService = {
  findAll: () => [{ id: 1, name: 'Mock Alice' }],
};

const moduleRef = await Test.createTestingModule({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useValue: mockUsersService, // ⭐ Real database replaced by mock!
    },
  ],
}).compile();`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is 'useValue' especially popular when writing automated unit tests?"
          answer="Because it allows developers to easily replace real database/external services with lightweight mock objects that return instant fake test data."
        />
      </div>
    </SectionContainer>
  );
}
