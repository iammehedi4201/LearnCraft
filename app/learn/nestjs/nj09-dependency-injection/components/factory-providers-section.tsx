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
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — FACTORY PROVIDERS (useFactory & inject)
// ═══════════════════════════════════════════════════════════

export function FactoryProvidersSection() {
  return (
    <SectionContainer number={6} title="Factory Providers: useFactory & inject">
      {/* ── 6.1 What is useFactory? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Dynamic Providers with useFactory"
          description="useFactory lets you run custom code, async initialization, and dynamic logic to create a provider."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    ConfigService,
    {
      provide: 'ASYNC_DATABASE_CONNECTION',
      // ⭐ Factory function that creates the connection:
      useFactory: async (config: ConfigService) => {
        const options = config.getDbConfig();
        const connection = await createDbConnection(options);
        return connection;
      },
      // ⭐ List of dependencies passed into useFactory as arguments:
      inject: [ConfigService],
    },
  ],
})
export class DatabaseModule {}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> How 'inject' works with 'useFactory'
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            The <code>inject: [ConfigService, OtherService]</code> array tells NestJS which providers to look up and pass into the factory function as parameters in exact sequential order!
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 6.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Run an Async Factory Provider Live"
          description="Test how factory providers initialize resources dynamically."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Async Factory Initializer</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated Config Provider:
const configService = {
  getEnvironment: () => "production",
  getApiKey: () => "pk_live_891238479213"
};

// Factory Provider:
async function paymentGatewayFactory(config: typeof configService) {
  console.log("⏳ Initializing Payment Gateway for:", config.getEnvironment());

  return {
    environment: config.getEnvironment(),
    apiKey: config.getApiKey(),
    processCharge: (amount: number) => "Charged $" + amount + " successfully!"
  };
}

async function run() {
  const gateway = await paymentGatewayFactory(configService);
  console.log("✅ Gateway Ready:", gateway.processCharge(49.99));
}

run();`}
            height="420px"
          />
        </div>

        <QuickCheck
          question="What property must you add to a factory provider to pass other injected services into the useFactory function?"
          answer="The 'inject: [...]' array (e.g. inject: [ConfigService, LoggerService])"
        />
      </div>
    </SectionContainer>
  );
}
