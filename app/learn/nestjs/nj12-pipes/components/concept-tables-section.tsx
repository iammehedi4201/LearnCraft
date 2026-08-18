"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & PIPES MASTER REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Built-in Pipes Master Reference">
      {/* ── 12.1 Built-in Pipes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="All 9 Built-in Pipes Quick Reference"
          description="Every built-in pipe exported from @nestjs/common."
          color="primary"
        />

        <ComparisonTable
          headers={["Pipe Name", "Target Input", "Returns", "Error Code"]}
          rows={[
            ["ValidationPipe", "DTO Class Object", "Validated DTO instance", "400 Bad Request"],
            ["ParseIntPipe", "String numeric param ('42')", "number (42)", "400 Bad Request"],
            ["ParseFloatPipe", "String float param ('3.14')", "number (3.14)", "400 Bad Request"],
            ["ParseBoolPipe", "String boolean ('true' / 'false')", "boolean", "400 Bad Request"],
            ["ParseArrayPipe", "Comma-separated string ('a,b,c')", "Array (['a', 'b', 'c'])", "400 Bad Request"],
            ["ParseUUIDPipe", "UUID string ('123e4567-e89b...')", "string", "400 Bad Request"],
            ["ParseEnumPipe", "Enum string value", "Enum member", "400 Bad Request"],
            ["DefaultValuePipe", "undefined / null", "Default value", "Never throws (fallback)"],
            ["ParseFilePipe", "Uploaded file stream", "Express.Multer.File", "400 / 422 Unprocessable"],
          ]}
        />

        <QuickCheck
          question="Which built-in pipe never throws a 400 Bad Request error because it only provides a fallback value?"
          answer="DefaultValuePipe."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
