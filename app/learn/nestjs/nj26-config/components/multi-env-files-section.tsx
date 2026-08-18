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
// MODULE 7 — MULTI-ENVIRONMENT FILE LOADING
// ═══════════════════════════════════════════════════════════

export function MultiEnvFilesSection() {
  return (
    <SectionContainer number={7} title="Multi-Environment File Loading">
      {/* ── 7.1 Multi-Env ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Cascading .env File Hierarchy"
          description="Support .env.development, .env.test, and .env.production seamlessly."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔄</span> Cascading File Order
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Pass an array to <code>envFilePath</code>. Prisma and NestJS search files from left to right:
          </p>
          <EnhancedCodeBlock
            code={`// src/app.module.ts
const env = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // ⭐ Priority from left to right (first found value wins):
      envFilePath: [
        \`.env.\${env}.local\`, // 1. Local overrides (git-ignored)
        \`.env.\${env}\`,       // 2. Environment specific (.env.test, .env.development)
        '.env',               // 3. Fallback default
      ],
    }),
  ],
})
export class AppModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="In the envFilePath array above, if PORT is defined in both .env.development and .env, which value takes precedence?"
          answer=".env.development takes precedence because it appears earlier (to the left) in the array."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
