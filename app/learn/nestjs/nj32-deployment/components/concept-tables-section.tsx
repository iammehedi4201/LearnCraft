"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & DEVOPS REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Kubernetes Probe Reference">
      {/* ── 12.1 Probes Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Kubernetes Container Probes Matrix"
          description="A complete guide to configuring container lifecycle probes with NestJS Terminus."
          color="primary"
        />

        <ComparisonTable
          headers={["Probe Type", "Endpoint", "What It Checks", "Action On Failure", "Recommended Interval"]}
          rows={[
            ["Liveness Probe", "/health/live", "Node.js process responsiveness & memory heap threshold", "Restarts container immediately", "Every 10 seconds"],
            ["Readiness Probe", "/health/ready", "PostgreSQL database & Redis connectivity", "Stops routing traffic to this container", "Every 5 seconds"],
            ["Startup Probe", "/health/live", "Initial slow application boot completion", "Waits before activating Liveness probe", "Every 2 seconds (up to 30s)"],
          ]}
        />

        <QuickCheck
          question="What happens if a database network glitch causes a Readiness Probe to fail temporarily?"
          answer="Kubernetes temporarily removes the pod from the load balancer pool without restarting the container, and resumes routing traffic as soon as database connectivity returns."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
