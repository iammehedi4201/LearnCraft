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
// MODULE 1 — THE BIG PICTURE (OBSERVABILITY & STRUCTURED LOGS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Structured Logging with Pino">
      {/* ── 1.1 Observability ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Why console.log is Prohibited in Production"
          description="How high-throughput structured JSON logs enable millisecond debugging in Datadog, Grafana, and ELK."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚨</span> The Unstructured Log Nightmare
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In development, <code>console.log(&apos;User logged in: &apos; + userId)</code> feels simple. But in production processing 5,000 requests per second:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>Synchronous Blocking:</strong> <code>console.log</code> in Node.js blocks the single-threaded Event Loop when stdout buffers fill up, causing API latency spikes.</li>
            <li><strong>Unsearchable Text:</strong> Cloud log parsers (Datadog, AWS CloudWatch) cannot filter unstructured text strings.</li>
          </ul>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            <strong>Structured JSON Logging (Pino)</strong> logs every event as an indexed JSON object (<code>&#123; &quot;level&quot;: &quot;info&quot;, &quot;userId&quot;: 42, &quot;reqId&quot;: &quot;abc-123&quot;, &quot;latencyMs&quot;: 12 &#125;</code>) at 5x the speed of Winston and 10x the speed of Bunyan with zero Event Loop blocking!
          </p>
        </WhyBox>

        <AnalogyBox title="The Airplane Flight Data Black Box">
          <p className="mb-2">
            Think of structured logging like a <strong>Commercial Aircraft Flight Black Box</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Unstructured Text:</strong> Like a pilot scribbling notes on random paper napkins. If something breaks mid-air, finding the error is nearly impossible.
            </li>
            <li>
              <strong>Structured JSON (Pino):</strong> Continuously records exact numeric telemetry (altitude, engine temperature, timestamps, pilot ID) in high-speed digital format. When an incident occurs, engineers filter by <code>reqId</code> and reconstruct the exact millisecond timeline instantly!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="In production backends, log only JSON objects to stdout via Pino. Let log collectors (Datadog, Grafana Loki) ingest and index the JSON stream." />

        <QuickCheck
          question="Why is Pino significantly faster than traditional logging libraries like Winston?"
          answer="Pino minimizes processing overhead and offloads formatting to separate worker threads/transports, outputting compact JSON without blocking Node.js event loop cycles."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
