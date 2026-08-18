"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & JEST MATCHERS MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Jest Matchers Matrix">
      {/* ── 12.1 Jest Matchers ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Essential Jest Assertion Matchers"
          description="A complete reference guide of Jest assertion methods for testing NestJS services."
          color="primary"
        />

        <ComparisonTable
          headers={["Jest Matcher", "Assertion Purpose", "Example Use Case"]}
          rows={[
            ["toBe(value)", "Exact primitive strict equality (===)", "expect(user.id).toBe(1)"],
            ["toEqual(object)", "Deep object/array value equality", "expect(result).toEqual({ id: 1, name: 'Alice' })"],
            ["toHaveBeenCalledWith(...args)", "Verifies mock was called with exact arguments", "expect(prisma.user.create).toHaveBeenCalledWith({ data })"],
            ["rejects.toThrow(Exception)", "Verifies async promise rejects with exception", "await expect(service.findById(99)).rejects.toThrow(NotFoundException)"],
            ["toHaveLength(number)", "Checks array length", "expect(items).toHaveLength(10)"],
            ["toBeDefined() / toBeNull()", "Checks nullish properties", "expect(res.body.token).toBeDefined()"],
          ]}
        />

        <QuickCheck
          question="What is the difference between expect(a).toBe(b) and expect(a).toEqual(b)?"
          answer="'toBe' checks referential identity (===) for primitives; 'toEqual' deeply compares all properties of objects and arrays."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
