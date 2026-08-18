"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & STORAGE STRATEGY MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; File Storage Matrix">
      {/* ── 12.1 Storage Strategies ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="File Storage Architecture Comparison"
          description="A complete architectural matrix comparing Local Disk, Server S3, and Direct Pre-Signed S3."
          color="primary"
        />

        <ComparisonTable
          headers={["Architecture Pattern", "Server RAM Usage", "Server Bandwidth", "Container Scalability", "Best Use Case"]}
          rows={[
            ["Local Disk (/uploads)", "🔴 High if buffers held", "🔴 High", "❌ Fails in multi-container setups", "Prototyping / local development only"],
            ["Server-Mediated S3", "🟡 Moderate (buffers in RAM)", "🔴 High (streamed twice)", "✅ 100% Stateless & Scalable", "Small files (< 5MB) requiring on-the-fly Sharp resizing"],
            ["Direct Pre-Signed S3", "🟢 Zero (bypasses server)", "🟢 Zero (direct to AWS)", "✅ 100% Stateless & Scalable", "Large files (> 20MB videos, zip archives, high-res photos)"],
          ]}
        />

        <QuickCheck
          question="Why is Direct Pre-Signed S3 upload preferred for user video uploads?"
          answer="Because a 1GB video upload would saturate your backend server's network bandwidth and memory for several minutes if routed through NestJS."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
