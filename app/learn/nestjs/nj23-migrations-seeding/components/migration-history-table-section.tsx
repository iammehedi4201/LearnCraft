"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — THE _PRISMA_MIGRATIONS TABLE & CHECKSUMS
// ═══════════════════════════════════════════════════════════

export function MigrationHistoryTableSection() {
  return (
    <SectionContainer number={3} title="The _prisma_migrations Table & Checksums">
      {/* ── 3.1 Migration History ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How Prisma Tracks Applied Migrations"
          description="The hidden PostgreSQL ledger that ensures migrations never run twice."
          color="emerald"
        />

        <ComparisonTable
          headers={["Column in _prisma_migrations", "Data Type", "Purpose"]}
          rows={[
            ["id", "VARCHAR(36)", "Unique migration execution ID"],
            ["checksum", "VARCHAR(64)", "SHA-256 cryptographic hash of the migration.sql file to detect tampering"],
            ["finished_at", "TIMESTAMPTZ", "Exact timestamp when the migration finished execution"],
            ["migration_name", "VARCHAR(255)", "The timestamped directory name (e.g. 20260818_init)"],
            ["rolled_back_at", "TIMESTAMPTZ", "Timestamp if this migration was recorded as rolled back"],
          ]}
        />

        <QuickCheck
          question="Why does Prisma throw a 'Migration Checksum Mismatch' error if you manually edit an already-applied migration.sql file?"
          answer="Because the SHA-256 hash of the modified file no longer matches the checksum recorded in the database's _prisma_migrations table, signaling that the migration history was altered."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
