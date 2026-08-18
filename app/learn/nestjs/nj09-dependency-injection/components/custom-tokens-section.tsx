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
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — CUSTOM INJECTION TOKENS
// ═══════════════════════════════════════════════════════════

export function CustomTokensSection() {
  return (
    <SectionContainer number={5} title="Custom Injection Tokens (Strings & Symbols)">
      {/* ── 5.1 Why Custom Tokens? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Why do we need Custom Injection Tokens?"
          description="TypeScript interfaces disappear after compilation. Custom tokens solve this problem!"
          color="primary"
        />

        <InfoCallout emoji="⚠️" title="The TypeScript Interface Problem">
          <p className="text-xs text-ds-text-strong leading-relaxed mb-2">
            In TypeScript, <code>interface</code> is only a compile-time check. When compiled to JavaScript, interfaces vanish completely!
          </p>
          <p className="text-xs text-ds-text-sub">
            If you write <code>constructor(private db: IDatabase)</code>, NestJS cannot see <code>IDatabase</code> at runtime and crashes.
          </p>
        </InfoCallout>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔑</span> The Solution: Custom String &amp; Symbol Tokens
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            We use a constant string or <code>Symbol()</code> as the permanent runtime token:
          </p>
          <EnhancedCodeBlock
            code={`export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

// 1. In Module:
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useValue: { host: 'localhost', port: 5432 },
    },
  ],
})
export class DatabaseModule {}

// 2. In Service:
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly dbConfig: any
  ) {}
}`}
            language="typescript"
          />
        </WhyBox>
      </div>

      <Divider />

      {/* ── 5.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Live Token-Based Registry Simulation"
          description="Test how custom string and symbol tokens resolve values."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Custom Token Resolution</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated DI Container with custom tokens:
const container = new Map<string | symbol, any>();

// 1. Define tokens:
const API_TOKEN = Symbol("API_KEY");
const THEME_TOKEN = "APP_THEME";

// 2. Register values:
container.set(API_TOKEN, "sk_live_992384729384");
container.set(THEME_TOKEN, { dark: true, primaryColor: "#4f46e5" });

// 3. Inject by token:
function resolve(token: string | symbol) {
  return container.get(token);
}

console.log("Resolved API Key:  ", resolve(API_TOKEN));
console.log("Resolved Theme:    ", resolve(THEME_TOKEN));`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="Why can't you use a plain TypeScript interface directly as a dependency injection token in NestJS?"
          answer="Because TypeScript interfaces are stripped out during compilation and do not exist at runtime in JavaScript. String or Symbol tokens must be used instead with @Inject()."
        />
      </div>
    </SectionContainer>
  );
}
