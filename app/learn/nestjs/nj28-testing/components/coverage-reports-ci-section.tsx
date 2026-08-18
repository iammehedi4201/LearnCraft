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
// MODULE 9 — CODE COVERAGE & CI/CD GATES
// ═══════════════════════════════════════════════════════════

export function CoverageReportsCiSection() {
  return (
    <SectionContainer number={9} title="Code Coverage Metrics &amp; CI/CD Gates">
      {/* ── 9.1 Coverage ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated Quality Gates in GitHub Actions"
          description="Enforce minimum code coverage thresholds to prevent untested regressions from merging."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`// package.json (Jest configuration)
{
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.ts",
      "!src/main.ts",
      "!src/**/*.module.ts",
      "!src/**/*.dto.ts"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 85,
        "lines": 85,
        "statements": 85
      }
    }
  }
}`}
          language="json"
        />

        <ComparisonTable
          headers={["Coverage Metric", "What it Measures", "Recommended Production Target"]}
          rows={[
            ["Line Coverage", "% of executable lines visited during test runs", ">= 85%"],
            ["Branch Coverage", "% of if / else / switch conditional branches tested", ">= 80%"],
            ["Function Coverage", "% of declared methods called at least once", ">= 90%"],
            ["Statement Coverage", "% of total JavaScript statements executed", ">= 85%"],
          ]}
        />

        <QuickCheck
          question="Why are main.ts, *.module.ts, and *.dto.ts files typically excluded from coverage reports?"
          answer="Because they contain purely declarative configuration and metadata with no executable business logic."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
