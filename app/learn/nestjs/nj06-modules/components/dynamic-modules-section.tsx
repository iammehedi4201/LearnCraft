"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  WhyBox,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — DYNAMIC MODULES (forRoot & forFeature)
// ═══════════════════════════════════════════════════════════

export function DynamicModulesSection() {
  return (
    <SectionContainer number={6} title="Dynamic Modules: forRoot() & forFeature()">
      {/* ── 6.1 What is a Dynamic Module? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Dynamic Module?"
          description="A Dynamic Module is a module that accepts custom configuration options when you import it."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Static vs Dynamic Modules
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            A <strong>static module</strong> (like <code>UsersModule</code>) is imported as a plain class: <code>imports: [UsersModule]</code>. It always has the exact same configuration.
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            A <strong>dynamic module</strong> allows you to pass custom settings (like database credentials, port numbers, or API keys):
          </p>
          <div className="mt-2 font-mono text-xs text-ds-feature-dark font-bold">
            ConfigModule.forRoot({`{ isGlobal: true }`})
          </div>
        </WhyBox>

        <ComparisonTable
          headers={["Method Name", "Convention in NestJS", "Typical Example"]}
          rows={[
            ["forRoot()", "Configures a module globally once in AppModule", "TypeOrmModule.forRoot({ host: 'localhost', port: 5432 })"],
            ["forFeature()", "Registers specific items in a feature module", "TypeOrmModule.forFeature([User, Order])"],
            ["register()", "Configures a module for a single caller", "JwtModule.register({ secret: 'my-jwt-secret' })"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 6.2 Code Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How a Dynamic Module Works Internally"
          description="Dynamic modules have a static method that returns a DynamicModule object."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static forRoot(connectionUrl: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DB_CONNECTION',
          useValue: connectionUrl,
        },
      ],
      exports: ['DB_CONNECTION'],
    };
  }
}`}
          language="typescript"
        />

        <div className="my-8">
          <SectionHeading>🚀 Try It Yourself: Dynamic Module Simulation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulating a Dynamic Module:
class ConfigModule {
  static forRoot(options: { apiKey: string; isDev: boolean }) {
    console.log("⚙️ ConfigModule configured with:");
    console.log("   - API Key: " + options.apiKey);
    console.log("   - Dev Mode: " + options.isDev);

    return {
      module: "ConfigModule",
      apiKey: options.apiKey,
      isDev: options.isDev
    };
  }
}

// In AppModule imports:
const dynamicConfig = ConfigModule.forRoot({
  apiKey: "secret_live_9988",
  isDev: true
});

console.log("Ready to use in NestJS:", dynamicConfig);`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="What is the difference between a static module and a dynamic module?"
          answer="A static module is imported directly (e.g. imports: [UsersModule]) with hardcoded settings, while a dynamic module accepts parameters (e.g. imports: [ConfigModule.forRoot({ isGlobal: true })]) to configure its behavior dynamically."
        />
      </div>
    </SectionContainer>
  );
}
