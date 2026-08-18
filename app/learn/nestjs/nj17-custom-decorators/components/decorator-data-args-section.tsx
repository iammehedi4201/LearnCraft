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
// MODULE 4 — PASSING ARGUMENTS TO CUSTOM DECORATORS
// ═══════════════════════════════════════════════════════════

export function DecoratorDataArgsSection() {
  return (
    <SectionContainer number={4} title="Passing Arguments to Custom Decorators">
      {/* ── 4.1 Decorator Arguments ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Extracting Specific Properties Dynamically"
          description="Allow developers to request specific fields like @CurrentUser('id') or @CurrentUser('email')."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎯</span> The Flexible Key-Lookup Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Check the <code>data</code> parameter inside <code>createParamDecorator</code>. If a key is passed, return just that property:
          </p>
          <EnhancedCodeBlock
            code={`export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // ⭐ If a specific property was requested (e.g. 'email'), return it:
    if (data && user) {
      return user[data];
    }

    // Otherwise, return the full user object:
    return user;
  },
);

// Controller Usage Options:
@Controller('account')
export class AccountController {
  // Option A: Extract single property (number):
  @Get('id')
  getMyId(@CurrentUser('id') userId: number) {
    return { userId };
  }

  // Option B: Extract full user object:
  @Get('all')
  getAll(@CurrentUser() user: UserPayload) {
    return user;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="In @CurrentUser('email') email: string, what value is received by the 'data' argument in createParamDecorator?"
          answer="The string 'email'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
