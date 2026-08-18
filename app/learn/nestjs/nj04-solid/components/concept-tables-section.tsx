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
            ["S", "Single Responsibility", "A class has only one main job", "Files with > 500 lines doing DB, email, and calculations", "One class = one main job."],
            ["O", "Open / Closed", "Open for extension, closed for modification", "Long switch(type) or if/else chains when adding features", "Add new behavior without breaking old code."],
            ["L", "Liskov Substitution", "Subtypes must behave correctly as parents", "Child classes throwing 'Not supported' errors on inherited methods", "A child class must behave like its parent."],
            ["I", "Interface Segregation", "Classes shouldn't depend on unused methods", "Classes with empty stub methods that throw 'Not implemented'", "Give a class only the methods it actually needs."],
            ["D", "Dependency Inversion", "Depend on abstractions, inject dependencies", "Calling 'new Service()' directly inside classes", "Don't create dependencies; receive them via DI."],
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
            <p className="text-xs text-ds-text-sub">Classes know very little about the internal implementation of other classes, interacting only through interfaces (follows Dependency Inversion).</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">Inversion of Control (IoC)</h5>
            <p className="text-xs text-ds-text-sub">A framework (like NestJS) controls the program flow and object creation rather than your custom code calling 'new'.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">Polymorphism</h5>
            <p className="text-xs text-ds-text-sub">The ability of different classes (e.g. CardPayment, BkashPayment) to respond to the same method call (pay()) in their own specific way.</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
