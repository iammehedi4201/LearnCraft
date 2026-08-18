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
// MODULE 9 — HTTP ACCESS LOGGING & CUSTOM SERIALIZERS
// ═══════════════════════════════════════════════════════════

export function HttpAccessLoggingSection() {
  return (
    <SectionContainer number={9} title="HTTP Access Logging &amp; Serializers">
      {/* ── 9.1 Custom Serializers ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated Request/Response Lifecycle Telemetry"
          description="Log HTTP method, route, status code, and latency in milliseconds automatically."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Custom Serializer Configuration
          </h4>
          <EnhancedCodeBlock
            code={`LoggerModule.forRoot({
  pinoHttp: {
    // ⭐ Custom serializers to keep JSON payloads clean and compact:
    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
        query: req.query,
        ip: req.ip,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
    // Custom log message on request completion:
    customSuccessMessage: (req, res, responseTime) => {
      return \`\${req.method} \${req.url} completed with \${res.statusCode} in \${responseTime}ms\`;
    },
  },
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What does customSuccessMessage allow you to configure in nestjs-pino?"
          answer="It formats the human-readable summary string attached to the request completion log (e.g. 'POST /api/orders completed with 201 in 14ms')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
