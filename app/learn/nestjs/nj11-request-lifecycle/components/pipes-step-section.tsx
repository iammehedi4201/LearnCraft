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
// MODULE 6 — STEP 4: PIPES (VALIDATION & TRANSFORMATION)
// ═══════════════════════════════════════════════════════════

export function PipesStepSection() {
  return (
    <SectionContainer number={6} title="Step 4: Pipes (Luggage Scanner)">
      {/* ── 6.1 What Pipes Do ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Sanitizing and Validating Parameters"
          description="Pipes operate directly on arguments right before they are passed into the controller method."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔍</span> The Two Jobs of Pipes
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            1. <strong>Transformation:</strong> Convert input data to the desired type (e.g. String to Number).
            <br />
            2. <strong>Validation:</strong> Evaluate input data against rules and throw a <code>400 Bad Request</code> if invalid.
          </p>
          <EnhancedCodeBlock
            code={`@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  // id is guaranteed to be a valid JavaScript number here!
  // If the user visited /users/abc, ParseIntPipe threw 400 before this line!
  return this.usersService.findOne(id);
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why do Pipes execute AFTER Guards and Interceptor pre-hooks?"
          answer="Because validating data takes CPU time. There is no point validating a payload if the user is not authenticated or not authorized in the first place!"
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
