"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — DOMAIN MODELING MASTER MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Domain Modeling Master Matrix">
      {/* ── 12.1 Modeling Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={12}
          title="Architectural Comparison Matrix"
          description="A reference guide comparing DTOs, Domain Entities, Value Objects, and Aggregate Roots."
          color="primary"
        />

        <ComparisonTable
          headers={["Concept", "Primary Responsibility", "Identity & Mutability", "Validation Mechanism"]}
          rows={[
            ["DTO", "Network serialization across HTTP boundary", "No identity, purely transient payload", "class-validator decorators (@IsString, @IsEmail)"],
            ["Domain Entity", "Core business state, operations, and lifecycle", "Has unique ID, mutable through methods", "Entity methods and constructor assertions"],
            ["Value Object", "Immutable descriptive attribute without identity", "No ID, immutable, compared by value", "Constructor validation during instantiation"],
            ["Aggregate Root", "Transaction boundary for a cluster of entities", "Has unique ID, root access point", "Enforces cross-entity business consistency"],
          ]}
        />

        <QuickCheck
          question="Can a Value Object contain other Value Objects?"
          answer="Yes! For example, an Address value object can be composed of Street, PostalCode, and City value objects."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
