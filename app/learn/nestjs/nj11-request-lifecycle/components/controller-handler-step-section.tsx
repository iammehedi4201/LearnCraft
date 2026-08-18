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
// MODULE 7 — STEP 5: CONTROLLER & SERVICE EXECUTION
// ═══════════════════════════════════════════════════════════

export function ControllerHandlerStepSection() {
  return (
    <SectionContainer number={7} title="Step 5: Controller & Service Execution">
      {/* ── 7.1 Route Handler Execution ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Core Business Logic"
          description="Where the route handler computes data and returns a result."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎯</span> Clean Controller Responsibility
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Because middleware, security, and parameter validation have already succeeded, your controller handler only focuses on orchestrating domain services.
          </p>
          <EnhancedCodeBlock
            code={`@Post()
async create(@Body() createUserDto: CreateUserDto) {
  // Pure, clean business logic execution:
  return await this.usersService.create(createUserDto);
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens when a controller method returns a plain JavaScript object or array?"
          answer="NestJS automatically serializes the object to JSON and sets the Content-Type header to application/json."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
