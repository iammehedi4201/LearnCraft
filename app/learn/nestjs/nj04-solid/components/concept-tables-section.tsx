"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 11 — CONCEPT TABLES & CHEATSHEET
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={11} title="Concept Tables & Cheatsheet">
      {/* ── 11.1 Master Cheatsheet ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Master SOLID Quick Reference Guide"
          description="A complete one-page reference table summarizing all 5 principles, their code smells, and easy rules."
          color="primary"
        />

        <ComparisonTable
          headers={["Letter", "Principle", "What It Means", "Code Smell / Warning Sign", "Easy Rule"]}
          rows={[
            ["S", "Single Responsibility", "Keep one cohesive reason to change", "One class mixes business rules, SQL, email, and formatting", "Separate unrelated reasons to change."],
            ["O", "Open / Closed", "Provide extension points for expected variation", "The same type switch grows whenever a new strategy is added", "Extend predictable variants through a stable contract."],
            ["L", "Liskov Substitution", "Every subtype keeps its contract", "An implementation rejects valid input or throws an unexpected 'not supported' error", "Keep the promises callers rely on."],
            ["I", "Interface Segregation", "Clients depend only on capabilities they use", "Classes contain empty or fake methods required by a large interface", "Prefer small, client-focused contracts."],
            ["D", "Dependency Inversion", "High-level policy depends on abstractions", "Business code imports and constructs a specific database or vendor SDK", "Choose concrete tools at the composition boundary."],
          ]}
        />
      </div>

      <Divider />

      {/* ── 11.2 Key Architecture Terminology ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Essential Software Architecture Vocabulary"
          description="Master the key architectural terms used by senior developers and architects."
          color="sky"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">High Cohesion</h5>
            <p className="text-xs text-ds-text-sub">Methods and data in a class are closely related to a single well-defined task (follows Single Responsibility).</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">Loose Coupling</h5>
            <p className="text-xs text-ds-text-sub">Parts interact through small contracts—interfaces, abstract classes, function types, or provider tokens—without knowing unnecessary implementation details.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">Inversion of Control (IoC)</h5>
            <p className="text-xs text-ds-text-sub">Control such as object construction is handed to a framework or container. Dependency injection is one form of IoC.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">Polymorphism</h5>
            <p className="text-xs text-ds-text-sub">The ability of different classes (e.g. CardPayment, BkashPayment) to respond to the same method call (pay()) in their own specific way.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-error-dark mb-1">Composition Root</h5>
            <p className="text-xs text-ds-text-sub">The application boundary where concrete objects are created and connected. A NestJS module and its provider registrations often fill this role.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">Runtime Token</h5>
            <p className="text-xs text-ds-text-sub">A string, symbol, or class NestJS can look up at runtime. Interfaces need a separate token because TypeScript removes them during compilation.</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
