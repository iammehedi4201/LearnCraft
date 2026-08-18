"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — CORRELATION IDS & DISTRIBUTED TRACING
// ═══════════════════════════════════════════════════════════

export function CorrelationRequestIdsSection() {
  return (
    <SectionContainer number={4} title="Correlation IDs &amp; Distributed Tracing">
      {/* ── 4.1 Correlation IDs ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Tracking Requests Across Distributed Microservices"
          description="Assign a unique UUID (X-Request-Id) to every inbound HTTP request."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🆔</span> The genReqId Configuration
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Configure <code>genReqId</code> in <code>LoggerModule.forRoot</code>:
          </p>
          <EnhancedCodeBlock
            code={`import * as crypto from 'crypto';

LoggerModule.forRoot({
  pinoHttp: {
    // ⭐ Extract existing client trace ID or generate a fresh UUID:
    genReqId: (req, res) => {
      const existingId = req.headers['x-request-id'];
      if (existingId) return existingId;

      const id = crypto.randomUUID();
      res.setHeader('x-request-id', id); // Attach to outbound response header
      return id;
    },
  },
});`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Every log line generated during a request automatically includes { req: { id: 'uuid-123' } }, making production incident debugging take seconds in Datadog." />

        <QuickCheck
          question="Why should you return res.setHeader('x-request-id', id) when generating a request ID?"
          answer="So that frontend clients and API consumers receive the ID in response headers; when users report an error, support agents can search that exact ID in log dashboards."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
