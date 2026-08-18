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
// MODULE 7 — ENTERPRISE STRUCTURED ERROR SCHEMA
// ═══════════════════════════════════════════════════════════

export function StructuredErrorSchemaSection() {
  return (
    <SectionContainer number={7} title="Enterprise Standard Error JSON Schema">
      {/* ── 7.1 Error Schema ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Predictable Error Responses for Clients"
          description="Design an enterprise-grade error schema with timestamps, error codes, and trace IDs."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📋</span> The Standard Enterprise Error Payload
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Frontend and mobile clients require a uniform JSON contract when errors occur:
          </p>
          <EnhancedCodeBlock
            code={`// Sample formatted 400 Bad Request JSON response:
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    "email must be an email",
    "password must be at least 8 characters"
  ],
  "path": "/api/v1/users/register",
  "timestamp": "2026-08-18T15:30:00.000Z",
  "traceId": "req-9842a-481b"
}`}
            language="json"
          />
        </WhyBox>

        <QuickCheck
          question="Why is including a 'traceId' in the error response valuable in production?"
          answer="When a user encounters a bug, they can share the 'traceId' with support. Engineers can search server logs for that exact ID to instantly locate the full error trace."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
