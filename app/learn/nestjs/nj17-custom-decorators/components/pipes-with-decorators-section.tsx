"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — PIPES WITH CUSTOM PARAM DECORATORS
// ═══════════════════════════════════════════════════════════

export function PipesWithDecoratorsSection() {
  return (
    <SectionContainer number={9} title="Using Pipes with Custom Param Decorators">
      {/* ── 9.1 Pipes with Custom Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Applying Pipes to Custom Injected Values"
          description="Pipes can transform or validate values extracted by custom parameter decorators."
          color="primary"
        />

        <EasyRuleCard rule="Custom parameter decorators support pipes just like built-in @Param() and @Query() decorators." />

        <PredictOutputBox
          code={`// Custom decorator extracting query header
export const CustomUserId = createParamDecorator((data, ctx) => {
  return ctx.switchToHttp().getRequest().headers['x-user-id']; // Returns string "42"
});

// Controller:
@Get('orders')
getOrders(@CustomUserId(ParseIntPipe) userId: number) {
  return { userId, isNumber: typeof userId === 'number' };
}`}
          answer={`Predicted Outcome:\n\n1. CustomUserId extracts "42" (string) from request headers.\n2. ParseIntPipe runs on "42" and transforms it into 42 (number).\n3. Handler method receives: { userId: 42, isNumber: true }.\n\nIf 'x-user-id' is missing or non-numeric (e.g. 'abc'), ParseIntPipe throws HTTP 400 Bad Request automatically!`}
        />

        <QuickCheck
          question="Can you pass ParseIntPipe to a custom parameter decorator?"
          answer="Yes! e.g. @CurrentUser('id', ParseIntPipe) userId: number."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
