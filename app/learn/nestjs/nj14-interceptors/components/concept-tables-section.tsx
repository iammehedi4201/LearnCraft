"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & RXJS OPERATORS MASTER REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & RxJS Operators Reference">
      {/* ── 12.1 RxJS Operators in NestJS ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common RxJS Operators in Interceptors"
          description="The 5 most useful RxJS operators for building enterprise NestJS interceptors."
          color="primary"
        />

        <ComparisonTable
          headers={["RxJS Operator", "Purpose", "Example NestJS Use Case"]}
          rows={[
            ["map()", "Mutates or wraps the returned data", "Wrapping payloads in { success: true, data }"],
            ["tap()", "Executes side effects without modifying data", "Performance stopwatch logging (Date.now() - start)"],
            ["catchError()", "Catches errors and transforms/re-throws them", "Overriding database errors with clean HTTP exceptions"],
            ["timeout()", "Aborts request if no response within duration", "Cancelling hanging queries after 5000ms"],
            ["of()", "Creates immediate Observable stream", "Short-circuiting controller with cached Redis responses"],
          ]}
        />

        <QuickCheck
          question="Which RxJS operator should you use if you want to log the execution time of a request without changing the response body?"
          answer="The 'tap()' operator from 'rxjs/operators'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
