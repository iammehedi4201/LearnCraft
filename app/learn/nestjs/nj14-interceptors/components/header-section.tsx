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
// MODULE 1 — THE BIG PICTURE (INTERCEPTORS & AOP)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: NestJS Interceptors">
      {/* ── 1.1 Why Interceptors Exist ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is an Interceptor in NestJS?"
          description="Interceptors are inspired by Aspect-Oriented Programming (AOP) techniques to wrap route handler execution with extra capabilities."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔄</span> The Dual Nature of Interceptors
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Guards and Pipes only run <strong>before</strong> the controller handler executes.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            <strong>Interceptors</strong> are unique: they have the power to run logic <strong>BEFORE</strong> the route handler starts AND <strong>AFTER</strong> the route handler returns a response!
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Before:</strong> Start execution stopwatches, check in-memory / Redis cache, inspect request parameters.</li>
            <li><strong>After:</strong> Transform output responses into standard JSON envelopes (<code>{`{ success: true, data, timestamp }`}</code>), log execution duration, compress payloads, or override exceptions.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Stopwatch Referee &amp; Gift Wrapping Station">
          <p className="mb-2">
            Think of an Interceptor like a <strong>Race Referee &amp; Luxury Packaging Service</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Before Handler (Stopwatch Start):</strong> The referee clicks the stopwatch when the runner leaves the starting line.
            </li>
            <li>
              <strong>During Handler:</strong> The runner (your controller method + database query) runs the race.
            </li>
            <li>
              <strong>After Handler (Stopwatch Stop &amp; Gift Wrap):</strong> When the runner finishes, the referee clicks the stopwatch to log the duration (e.g. <code>42ms</code>) and places the trophy inside a beautiful gift box (standard JSON envelope) before handing it to the client.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Interceptors wrap around the route handler like an onion layer, executing code both BEFORE and AFTER the controller runs." />

        <QuickCheck
          question="What interface must every NestJS Interceptor implement?"
          answer="NestInterceptor (from '@nestjs/common')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
