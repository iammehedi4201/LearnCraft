"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — MODULE ENCAPSULATION & RE-EXPORTING
// ═══════════════════════════════════════════════════════════

export function EncapsulationSection() {
  return (
    <SectionContainer number={7} title="Module Encapsulation & Re-exporting">
      {/* ── 7.1 Encapsulation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Module Encapsulation"
          description="In NestJS, modules act as security barriers. Providers are private by default."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Private vs Public Services
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            If <code>UsersModule</code> has <code>UsersService</code> (public) and <code>PasswordHasherService</code> (private internal helper), you only add <code>UsersService</code> to <code>exports: [...]</code>.
          </p>
          <p className="text-xs text-ds-text-strong">
            Other modules can never accidentally call or touch <code>PasswordHasherService</code> directly. This keeps your internal logic protected!
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 7.2 Module Re-exporting ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Re-exporting Entire Modules"
          description="A module can re-export another module it imported, passing all its services forward."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`@Module({
  imports: [CommonModule],
  // ⭐ Re-exporting CommonModule passes all its services forward:
  exports: [CommonModule],
})
export class CoreModule {}`}
          language="typescript"
        />

        <p className="text-xs text-ds-text-sub mt-4 mb-6">
          Now, any module that imports <code>CoreModule</code> automatically gets access to everything inside <code>CommonModule</code> too!
        </p>

        <QuickCheck
          question="Why are providers in a NestJS module private by default?"
          answer="To enforce encapsulation. Internal helper services stay private to their module, preventing other modules from tightly coupling to or modifying internal implementation details."
        />
      </div>
    </SectionContainer>
  );
}
