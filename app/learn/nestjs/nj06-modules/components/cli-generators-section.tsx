"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — CLI GENERATION MASTERY
// ═══════════════════════════════════════════════════════════

export function CliGeneratorsSection() {
  return (
    <SectionContainer number={9} title="Generating Modules with the CLI">
      {/* ── 9.1 Commands ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Generating Modules with 'nest g mo'"
          description="Create clean, registered modules in 1 second using the CLI."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Quick Generator Commands
          </h4>
          <div className="space-y-4 text-xs text-ds-text-sub leading-relaxed">
            <div>
              <p className="font-bold text-ds-text-strong mb-1">1. Generate a Top-Level Feature Module:</p>
              <EnhancedCodeBlock code={`nest g mo products`} language="bash" />
              <p className="mt-1 text-ds-text-soft">Creates <code>src/products/products.module.ts</code> and adds it to <code>AppModule</code> imports.</p>
            </div>

            <div>
              <p className="font-bold text-ds-text-strong mb-1">2. Generate a Sub-Module Inside a Feature:</p>
              <EnhancedCodeBlock code={`nest g mo users/avatar`} language="bash" />
              <p className="mt-1 text-ds-text-soft">Creates <code>src/users/avatar/avatar.module.ts</code> and links it inside <code>UsersModule</code>.</p>
            </div>
          </div>
        </WhyBox>

        <QuickCheck
          question="What command generates a new module called 'billing' and automatically adds it to AppModule?"
          answer="nest g mo billing (or nest generate module billing)"
        />
      </div>
    </SectionContainer>
  );
}
