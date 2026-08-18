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
// MODULE 1 — THE BIG PICTURE (PIPES & TRANSFORMATION)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: NestJS Pipes">
      {/* ── 1.1 Why Pipes Exist ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Pipe in NestJS?"
          description="A pipe is a class annotated with @Injectable() that implements the PipeTransform interface."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔍</span> The Core Purpose of Pipes
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In Node.js and Express, all HTTP route parameters and query strings arrive as <strong>plain strings</strong> (e.g. <code>/users/123</code> provides <code>req.params.id = &quot;123&quot;</code>).
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            Developers often forget to validate or cast these strings, causing database bugs or security flaws.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
            NestJS <strong>Pipes</strong> sit directly between the incoming request and your controller method parameters, giving you two superpowers:
            <strong> Transformation</strong> (casting data to desired types) and <strong>Validation</strong> (throwing 400 Bad Request if data is invalid).
          </p>
        </WhyBox>

        <AnalogyBox title="The Airport Luggage Scanner &amp; Currency Exchange">
          <p className="mb-2">
            Think of a Pipe like an <strong>Airport Luggage Scanner and Currency Exchange Counter</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Validation:</strong> The scanner checks if your bag exceeds 20kg. If it does, you are stopped immediately with an error before boarding.
            </li>
            <li>
              <strong>Transformation:</strong> The currency booth converts foreign banknotes into local currency so the destination store can use it immediately without converting it manually.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Pipes have two jobs only: Transform raw input data to target types, or Validate data and throw 400 Bad Request." />

        <QuickCheck
          question="What interface must every NestJS Pipe implement?"
          answer="PipeTransform<T, R> (from '@nestjs/common')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
