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
// MODULE 9 — PIPE COMPOSITION & CHAINING
// ═══════════════════════════════════════════════════════════

export function PipeCompositionSection() {
  return (
    <SectionContainer number={9} title="Pipe Chaining & Sequential Composition">
      {/* ── 9.1 Pipe Chaining ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Chaining Multiple Pipes on a Single Parameter"
          description="Pass multiple pipe classes or instances comma-separated into a parameter decorator."
          color="primary"
        />

        <EasyRuleCard rule="When multiple pipes are bound to a parameter, they execute sequentially from LEFT to RIGHT. The output of pipe 1 becomes the input of pipe 2." />

        <PredictOutputBox
          code={`// Controller endpoint:
@Get('search')
search(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
) {
  return { page, type: typeof page };
}

// Case A: Client calls GET /search
// Case B: Client calls GET /search?page=5
// Case C: Client calls GET /search?page=invalid`}
          answer={`Predicted Outcomes:\n\nCase A (/search):\n1. DefaultValuePipe sees undefined -> replaces with 1\n2. ParseIntPipe parses 1 -> 1 (number)\nOutcome: { page: 1, type: "number" }\n\nCase B (/search?page=5):\n1. DefaultValuePipe sees "5" -> passes through "5"\n2. ParseIntPipe parses "5" -> 5 (number)\nOutcome: { page: 5, type: "number" }\n\nCase C (/search?page=invalid):\n1. DefaultValuePipe sees "invalid" -> passes through "invalid"\n2. ParseIntPipe fails -> throws HTTP 400 Bad Request`}
        />

        <QuickCheck
          question="If you chain [DefaultValuePipe(10), ParseIntPipe], what happens if the incoming parameter is undefined?"
          answer="DefaultValuePipe intercepts the undefined value, replaces it with 10, and passes 10 to ParseIntPipe, which successfully returns the number 10."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
