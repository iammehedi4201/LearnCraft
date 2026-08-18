"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (CUSTOM DECORATORS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Custom Decorators in NestJS">
      {/* ── 1.1 Why Custom Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Are Custom Decorators?"
          description="Custom shortcuts that cleanly extract request properties or bundle multiple decorators together."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Build Custom Decorators?
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In standard NestJS controllers, getting the logged-in user often looks messy:
          </p>
          <div className="p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft font-mono text-xs text-ds-error-dark mb-3">
            @Get(&apos;profile&apos;) <br />
            getProfile(@Req() req: Request) &#123; const user = req[&apos;user&apos;]; ... &#125;
          </div>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            This is ugly and tightly couples your controller to the Express <code>req</code> object.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            With custom decorators, you write a clean, readable helper:
          </p>
          <div className="p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft font-mono text-xs text-ds-success-dark">
            @Get(&apos;profile&apos;) <br />
            getProfile(@CurrentUser() user: UserEntity) &#123; return user; &#125;
          </div>
        </WhyBox>

        <AnalogyBox title="The Personalized VIP Name Badge">
          <p className="mb-2">
            Imagine attending a large conference:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Without a badge (Raw @Req()):</strong> Every time you talk to someone, they have to search through a giant 500-page guest list folder (the raw <code>req</code> object) to find your name, email, and company.
            </li>
            <li>
              <strong>With a badge (@CurrentUser()):</strong> You wear a simple name tag with your details clearly printed. Anyone can read your name instantly without touching the heavy guest list folder!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Custom decorators make controllers clean and readable by hiding raw request extraction logic behind simple @Tags." />

        <QuickCheck
          question="What function from '@nestjs/common' is used to create custom parameter decorators?"
          answer="createParamDecorator()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
