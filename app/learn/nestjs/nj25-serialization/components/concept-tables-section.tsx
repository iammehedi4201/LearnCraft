"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & PRISMA ERROR MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Error Mapping Matrix">
      {/* ── 12.1 Error Codes Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Prisma Error Codes &amp; HTTP Status Mapping"
          description="A complete reference matrix of database errors and their corresponding REST responses."
          color="primary"
        />

        <ComparisonTable
          headers={["Prisma Code", "Database Meaning", "Mapped HTTP Status", "Recommended Exception"]}
          rows={[
            ["P2002", "Unique constraint failed (e.g. duplicate email)", "409 Conflict", "ConflictException"],
            ["P2025", "Record not found (update/delete on missing ID)", "404 Not Found", "NotFoundException"],
            ["P2003", "Foreign key constraint violation", "400 Bad Request", "BadRequestException"],
            ["P2000", "Provided value too long for column type", "400 Bad Request", "BadRequestException"],
            ["P2034", "Transaction failed due to write conflict / deadlock", "409 Conflict", "ConflictException (retry)"],
          ]}
        />

        <QuickCheck
          question="Which Prisma error code indicates that a record update/delete failed because the target ID does not exist?"
          answer="Error code P2025 (maps to 404 Not Found)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
