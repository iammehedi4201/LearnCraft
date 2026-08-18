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
    <SectionContainer number={12} title="Concept Tables & Guards Master Matrix">
      {/* ── 12.1 Middleware vs Guards ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Middleware vs Guards Side-by-Side"
          description="Detailed comparison between Express-style middleware and NestJS Guards."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature / Capability", "NestJS Middleware", "NestJS Guards"]}
          rows={[
            ["Primary Purpose", "Raw request logging, CORS, body-parsing", "Authentication & Authorization"],
            ["Interface", "NestMiddleware (use(req, res, next))", "CanActivate (canActivate(context))"],
            ["ExecutionContext Access", "❌ No (blind to route handler)", "✅ Yes (knows controller & handler)"],
            ["Metadata Reflection (Reflector)", "❌ No access to @Roles() decorators", "✅ Full access to Reflector"],
            ["Control Flow", "Must call next()", "Returns boolean or throws HttpException"],
            ["Failed Access Result", "Manually send res.status(403)", "Automatic 403 Forbidden on false"],
          ]}
        />

        <QuickCheck
          question="Why are Guards preferred over Middleware for protecting administrative endpoints?"
          answer="Guards have access to ExecutionContext and Reflector, enabling declarative permissions like @Roles('admin') rather than hardcoded route URL checking in middleware."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
