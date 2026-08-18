"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — APPLYDECORATORS() & COMPOSITION
// ═══════════════════════════════════════════════════════════

export function ApplyDecoratorsSection() {
  return (
    <SectionContainer number={5} title="Composing Multiple Decorators with applyDecorators()">
      {/* ── 5.1 applyDecorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Solving 'Decorator Hell'"
          description="Bundle 4 or 5 different decorators into a single reusable custom decorator."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> Before vs After applyDecorators()
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Without composition, securing an endpoint requires repeating multiple decorators on every route:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-error-dark bg-ds-error-lighter px-2.5 py-1 rounded-md border border-ds-error-light mb-2 w-fit">
                ❌ Verbose &amp; Repetitive
              </span>
              <EnhancedCodeBlock
                code={`@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
@ApiResponse({ status: 403, description: 'Forbidden' })
@Delete(':id')
remove(@Param('id') id: string) {}`}
                language="typescript"
              />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-success-dark bg-ds-success-lighter px-2.5 py-1 rounded-md border border-ds-success-light mb-2 w-fit">
                ✅ Clean &amp; Composed
              </span>
              <EnhancedCodeBlock
                code={`@Auth('admin') // ⭐ All 4 decorators in 1 clean tag!
@Delete(':id')
remove(@Param('id') id: string) {}`}
                language="typescript"
              />
            </div>
          </div>
        </WhyBox>

        <EasyRuleCard rule="Use applyDecorators() to bundle common combinations of @UseGuards, @Roles, and Swagger metadata into a single clean decorator." />

        <QuickCheck
          question="What function from '@nestjs/common' is used to compose multiple method or class decorators into one?"
          answer="applyDecorators()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
