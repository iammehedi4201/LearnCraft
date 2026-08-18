"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — CLI GENERATION MASTERY (nest g s)
// ═══════════════════════════════════════════════════════════

export function CliGeneratorsSection() {
  return (
    <SectionContainer number={9} title="Generating Services with the CLI">
      {/* ── 9.1 Commands ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Generating Services with 'nest g s'"
          description="Never write service boilerplate manually. Use the CLI to create and register services in seconds."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Quick Generator Commands
          </h4>
          <div className="space-y-4 text-xs text-ds-text-sub leading-relaxed">
            <div>
              <p className="font-bold text-ds-text-strong mb-1">1. Generate a Standard Service:</p>
              <EnhancedCodeBlock code={`nest g s users`} language="bash" />
              <p className="mt-1 text-ds-text-soft">Creates <code>src/users/users.service.ts</code> and registers it in <code>users.module.ts</code>.</p>
            </div>

            <div>
              <p className="font-bold text-ds-text-strong mb-1">2. Generate Without Test File:</p>
              <EnhancedCodeBlock code={`nest g s products --no-spec`} language="bash" />
            </div>
          </div>
        </WhyBox>

        <QuickCheck
          question="What 2 actions does 'nest g s auth' perform automatically?"
          answer="1. Creates 'src/auth/auth.service.ts' with @Injectable().\n2. Adds AuthService to the 'providers: [...]' array in AuthModule."
        />
      </div>
    </SectionContainer>
  );
}
