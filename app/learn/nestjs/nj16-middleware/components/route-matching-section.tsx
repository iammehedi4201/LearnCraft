"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — ROUTE MATCHING & METHOD FILTERING
// ═══════════════════════════════════════════════════════════

export function RouteMatchingSection() {
  return (
    <SectionContainer number={5} title="Route Matching & Method Filtering">
      {/* ── 5.1 Matching Strategies ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Targeting Specific Routes and HTTP Verbs"
          description="How to selectively apply middleware to specific routes or entire controllers."
          color="amber"
        />

        <ComparisonTable
          headers={["Target Type", "Example Syntax", "Matching Scope"]}
          rows={[
            ["Controller Class", ".forRoutes(UsersController)", "All routes within UsersController"],
            ["String Route Path", ".forRoutes('users')", "Matches all HTTP methods on '/users'"],
            ["Wildcard Path", ".forRoutes('api/*')", "Matches any route starting with '/api/'"],
            ["Path + HTTP Method", ".forRoutes({ path: 'auth', method: RequestMethod.POST })", "Matches ONLY POST requests to '/auth'"],
          ]}
        />

        <EnhancedCodeBlock
          code={`consumer
  .apply(AuthMiddleware)
  .forRoutes(
    { path: 'orders', method: RequestMethod.POST },
    { path: 'orders/:id', method: RequestMethod.DELETE },
    UsersController,
  );`}
          language="typescript"
        />

        <QuickCheck
          question="How do you restrict a middleware so it ONLY triggers on POST requests to '/checkout'?"
          answer="consumer.apply(MyMiddleware).forRoutes({ path: 'checkout', method: RequestMethod.POST })."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
