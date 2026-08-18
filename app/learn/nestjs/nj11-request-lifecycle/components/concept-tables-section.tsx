"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & MASTER COMPARISON MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Master Comparison Matrix">
      {/* ── 12.1 The 5 Pipeline Building Blocks ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 5 NestJS Pipeline Pillars"
          description="Complete side-by-side architectural comparison."
          color="primary"
        />

        <ComparisonTable
          headers={[
            "Component",
            "TypeScript Interface",
            "Context Parameter",
            "Primary Responsibility",
          ]}
          rows={[
            [
              "Middleware",
              "NestMiddleware",
              "req, res, next",
              "Low-level request interception (CORS, body-parser, session cookies)",
            ],
            [
              "Guards",
              "CanActivate",
              "ExecutionContext",
              "Authentication, authorization, and role verification (returns boolean)",
            ],
            [
              "Interceptors",
              "NestInterceptor",
              "ExecutionContext, CallHandler",
              "Aspect-oriented logic before/after execution (timings, caching, mapping)",
            ],
            [
              "Pipes",
              "PipeTransform",
              "value, ArgumentMetadata",
              "Parameter transformation and payload validation (throws 400 Bad Request)",
            ],
            [
              "Exception Filters",
              "ExceptionFilter",
              "exception, ArgumentsHost",
              "Centralized error handling and structured error responses",
            ],
          ]}
        />

        <QuickCheck
          question="Which two components in the pipeline have access to ExecutionContext and Reflector metadata?"
          answer="Guards and Interceptors."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
