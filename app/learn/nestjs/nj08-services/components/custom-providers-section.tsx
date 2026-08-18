"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  ComparisonTable,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — CUSTOM PROVIDERS (useValue, useFactory, useClass)
// ═══════════════════════════════════════════════════════════

export function CustomProvidersSection() {
  return (
    <SectionContainer number={7} title="Custom Providers: useValue & useFactory">
      {/* ── 7.1 Custom Provider Types ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Beyond Standard Services: Custom Providers"
          description="Did you know? 'providers: [UsersService]' is actually a shortcut!"
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🪄</span> The Full Provider Syntax
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            When you write <code>providers: [UsersService]</code>, NestJS expands it behind the scenes to:
          </p>
          <div className="p-3 bg-[#0B0E17] dark:bg-[#07090E] rounded-xl font-mono text-xs text-[#F1F5F9] border border-ds-stroke-soft">
            {`{ provide: UsersService, useClass: UsersService }`}
          </div>
        </WhyBox>

        <ComparisonTable
          headers={["Provider Type", "Syntax", "Typical Use Case"]}
          rows={[
            ["useValue", "{ provide: 'CONFIG', useValue: { env: 'prod' } }", "Injecting constant objects, API keys, or mock test objects"],
            ["useClass", "{ provide: LoggerService, useClass: ProductionLogger }", "Swapping implementations based on environment"],
            ["useFactory", "{ provide: 'DB', useFactory: async () => await connect() }", "Creating dynamic objects with async initialization"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 7.2 useValue & String Tokens ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Injecting Values with String Tokens (@Inject)"
          description="When your token is a string (instead of a class name), use @Inject('TOKEN')."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`// 1. In your Module:
@Module({
  providers: [
    {
      provide: 'APP_CONFIG',
      useValue: { apiUrl: 'https://api.learncraft.dev', timeout: 5000 },
    },
  ],
})
export class AppModule {}

// 2. In your Service / Controller:
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ApiClientService {
  constructor(
    @Inject('APP_CONFIG') private readonly config: { apiUrl: string; timeout: number }
  ) {
    console.log("Config loaded:", this.config.apiUrl);
  }
}`}
          language="typescript"
        />

        <div className="my-8">
          <SectionHeading>🚀 Try It Yourself: Custom Value Injection</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated Custom Provider with useValue:
const mockConfigProvider = {
  provide: "DATABASE_URL",
  useValue: "postgresql://admin:secret@localhost:5432/main_db"
};

class DatabaseService {
  constructor(private dbUrl: string) {}

  connect() {
    console.log("🔌 Connected to database at: " + this.dbUrl);
  }
}

// In NestJS, the IoC container matches the token and passes useValue:
const db = new DatabaseService(mockConfigProvider.useValue);
db.connect();`}
            height="360px"
          />
        </div>

        <QuickCheck
          question="What decorator do you use to inject a provider that uses a string token like 'API_KEY'?"
          answer="@Inject('API_KEY') (e.g. constructor(@Inject('API_KEY') private key: string))"
        />
      </div>
    </SectionContainer>
  );
}
