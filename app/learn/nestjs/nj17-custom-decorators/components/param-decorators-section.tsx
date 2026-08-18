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
// MODULE 2 — CREATEPARAMDECORATOR() EXPLAINED
// ═══════════════════════════════════════════════════════════

export function ParamDecoratorsSection() {
  return (
    <SectionContainer number={2} title="createParamDecorator() Explained">
      {/* ── 2.1 createParamDecorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How createParamDecorator Works"
          description="The helper function that extracts data from the HTTP request and injects it into a method argument."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> The 2 Parameters of createParamDecorator
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            <code>createParamDecorator</code> takes a callback function with two arguments:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>1. data:</strong> Whatever value you pass inside the decorator parentheses (e.g., <code>@User(&apos;email&apos;)</code> sets <code>data = &apos;email&apos;</code>).</li>
            <li><strong>2. ctx (ExecutionContext):</strong> Gives you access to the HTTP request using <code>ctx.switchToHttp().getRequest()</code>.</li>
          </ul>
          <EnhancedCodeBlock
            code={`import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // 1. Get the Express Request object:
    const request = ctx.switchToHttp().getRequest();
    
    // 2. Return the user attached by your AuthGuard:
    return request.user;
  },
);`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What are the two arguments passed into the createParamDecorator callback function?"
          answer="data (any value passed into the decorator call) and ctx (the ExecutionContext)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
