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
// MODULE 5 — TYPE-SAFE CONFIGSERVICE USAGE
// ═══════════════════════════════════════════════════════════

export function ConfigServiceTypedSection() {
  return (
    <SectionContainer number={5} title="Type-Safe ConfigService Injection">
      {/* ── 5.1 Type-Safe Get ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Strict TypeScript Auto-Complete on Config Keys"
          description="Enforce type inference on configService.get() to eliminate spelling mistakes."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💉</span> Constructor Injection in Services
          </h4>
          <EnhancedCodeBlock
            code={`import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AppConfig {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService<AppConfig, true>) {}

  getJwtSecret(): string {
    // ⭐ Strict auto-complete for 'JWT_SECRET' and return type is guaranteed 'string' (not undefined):
    return this.configService.get('JWT_SECRET', { infer: true });
  }

  getPort(): number {
    return this.configService.get('PORT', { infer: true });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What does passing '{ infer: true }' to configService.get() do?"
          answer="It instructs TypeScript to infer the exact return type based on the generic interface without needing manual type assertions (e.g. returns number instead of string | undefined)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
