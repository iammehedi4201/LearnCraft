"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — OFFSET VS CURSOR PERFORMANCE DEEP DIVE
// ═══════════════════════════════════════════════════════════

export function OffsetVsCursorSection() {
  return (
    <SectionContainer number={4} title="Performance Deep Dive: Offset vs Cursor">
      {/* ── 4.1 Performance Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Why Offset Degrades on Large Datasets"
          description="Benchmark comparison on a PostgreSQL table with 10,000,000 rows."
          color="rose"
        />

        <ComparisonTable
          headers={["Metric", "Offset Pagination (skip/take)", "Cursor Pagination (cursor/take)"]}
          rows={[
            ["Page 1 (Items 1–20)", "⚡ ~1.2ms (B-Tree index)", "⚡ ~1.1ms (B-Tree index)"],
            ["Page 1,000 (Items 20,000–20,020)", "⏱️ ~14ms (Scans & discards 20,000 rows)", "⚡ ~1.2ms (Index seek)"],
            ["Page 50,000 (Items 1,000,000+)", "🐢 ~450ms+ (Severe disk & CPU load)", "⚡ ~1.3ms (Consistent index seek)"],
            ["Data Drift (Row added while browsing)", "⚠️ Rows duplicate or shift into next page", "🛡️ Rock solid; zero shift"],
            ["Jump to Arbitrary Page (e.g. Page 8)", "✅ Trivial (page=8)", "❌ Cannot jump directly (requires cursor chain)"],
            ["Ideal Use Case", "Admin tables, e-commerce catalog search", "Social feeds, mobile infinite scroll, chat histories"],
          ]}
        />

        <QuickCheck
          question="Why does 'OFFSET 1000000' perform slowly in PostgreSQL?"
          answer="Because PostgreSQL must scan and discard all 1,000,000 preceding rows in memory before returning the requested 10 rows."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
