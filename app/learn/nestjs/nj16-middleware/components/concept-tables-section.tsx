"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & LIFECYCLE MASTER COMPARISON
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Master Comparison Matrix">
      {/* ── 12.1 Lifecycle Components Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Complete 5-Pillar Architectural Matrix"
          description="How Middleware, Guards, Interceptors, Pipes, and Exception Filters work together."
          color="primary"
        />

        <ComparisonTable
          headers={["Building Block", "Interface", "Access to Reflector?", "Primary Mission"]}
          rows={[
            ["Middleware", "NestMiddleware", "❌ No", "Low-level request tagging, CORS, body parsing, cookies"],
            ["Guards", "CanActivate", "✅ Yes", "Authentication & Role-Based Access Control (RBAC)"],
            ["Interceptors", "NestInterceptor", "✅ Yes", "Stopwatch timing, response envelope wrapping, caching"],
            ["Pipes", "PipeTransform", "❌ No (has ArgumentMetadata)", "Parameter casting and DTO input validation"],
            ["Exception Filters", "ExceptionFilter", "❌ No (has ArgumentsHost)", "Centralized error formatting and stack trace protection"],
          ]}
        />

        <QuickCheck
          question="Which building blocks execute BEFORE the route handler versus AFTER the route handler?"
          answer="BEFORE: Middleware, Guards, Interceptor pre-hooks, Pipes. AFTER: Route Handler, Interceptor post-hooks, Exception Filters (on error)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
