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
// MODULE 1 — THE BIG PICTURE (EXCEPTION FILTERS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: NestJS Exception Filters">
      {/* ── 1.1 Why Exception Filters Exist ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is an Exception Filter?"
          description="A centralized layer that catches all unhandled exceptions across the application and formats structured responses."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚨</span> The Danger of Unhandled Errors
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In standard Node.js applications, an uncaught error in a route handler or database query can leak internal stack traces, expose database passwords, or crash the entire server process.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            NestJS provides an automated <strong>Exceptions Layer</strong>. When code anywhere throws an exception, NestJS catches it and delegates control to an <strong>Exception Filter</strong>.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
            Exception Filters let you format every single error into a clean, predictable JSON schema that hides sensitive server internals while helping client applications display user-friendly error dialogs.
          </p>
        </WhyBox>

        <AnalogyBox title="The Hospital Emergency Room &amp; Triage Desk">
          <p className="mb-2">
            Think of Exception Filters like an <strong>Emergency Room Triage Unit</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>The Incident:</strong> A patient has an accident anywhere in the city (a database query fails or a validation rule is violated).
            </li>
            <li>
              <strong>The Triage Doctor (ExceptionFilter):</strong> Examines the injury, categorizes the severity (HTTP 400, 404, or 500), treats the patient, and writes a calm, clear medical report for the family (structured JSON response) rather than panicking.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Never let errors crash your server. Throw typed HttpExceptions and let Exception Filters format clean, structured JSON responses." />

        <QuickCheck
          question="What interface must every NestJS Exception Filter implement?"
          answer="ExceptionFilter<T> (from '@nestjs/common')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
