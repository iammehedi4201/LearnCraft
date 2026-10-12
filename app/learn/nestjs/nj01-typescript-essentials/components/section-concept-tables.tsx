"use client";

import {
  SectionContainer,
  SectionHeading,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 15 — CONCEPT TABLES & CHEAT SHEETS
// ═══════════════════════════════════════════════════════════

export function SectionConceptTables() {
  return (
    <SectionContainer number={15} title="Concept Tables & Cheat Sheets">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Quick reference tables for all major TypeScript concepts used in NestJS. Bookmark this section as your quick cheat sheet.
        </p>
      </div>

      {/* ── Table 1: Core Vocabulary ── */}
      <div className="mb-12">
        <SectionHeading>📊 Core TypeScript Vocabulary</SectionHeading>
        <ComparisonTable
          headers={["Keyword / Concept", "Meaning in Plain English", "Code Example"]}
          rows={[
            ["string, number, boolean", "Core primitive data types", "const age: number = 24;"],
            ["Type Annotation", "Explicitly labeling the type after colon", "let name: string = 'Alice';"],
            ["Type Inference", "TypeScript automatically guessing the type", "let score = 100; // number"],
            ["Tuple", "Fixed-length array with ordered types", "const point: [number, number] = [10, 20];"],
            ["Enum", "Named set of constants (dropdown)", "enum Role { ADMIN = 'ADMIN' }"],
            ["interface", "Object blueprint / contract", "interface User { id: number; }"],
            ["type Alias", "Custom name for any type or union", "type ID = string | number;"],
            ["Union (|)", "Can be either Type A OR Type B", "status: 'pending' | 'success'"],
            ["Intersection (&)", "Combines all properties of A and B", "type FullUser = User & Auth;"],
            ["Generic (<T>)", "Fill-in-the-blank type parameter", "interface Box<T> { item: T; }"],
            ["keyof", "Extracts literal keys of an object", "type UserKeys = keyof User;"],
            ["readonly", "Immutable property modifier", "readonly id: string;"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Table 2: Utility Types ── */}
      <div className="mb-12">
        <SectionHeading>📊 Utility Types Cheatsheet</SectionHeading>
        <ComparisonTable
          headers={["Utility Type", "Action", "Common NestJS Use Case"]}
          rows={[
            ["Omit<T, Keys>", "Removes specified keys from T", "Create DTOs (remove id, createdAt, secret keys)"],
            ["Partial<T>", "Makes all properties optional", "Update / PATCH DTOs"],
            ["Pick<T, Keys>", "Extracts only specified keys from T", "Lightweight preview and card listings"],
            ["Required<T>", "Makes all properties mandatory", "Validating full config objects before server start"],
            ["Record<K, V>", "Map/Dictionary with keys K and values V", "HTTP headers, environment variable dictionaries"],
            ["Readonly<T>", "Deeply makes all properties read-only", "Freezing master app configuration"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Table 3: Type Guards ── */}
      <div className="mb-10">
        <SectionHeading>📊 Type Guards & Narrowing Quick Reference</SectionHeading>
        <ComparisonTable
          headers={["Operator", "When to Use", "Example Condition"]}
          rows={[
            ["typeof", "Primitives (string, number, boolean, undefined)", "if (typeof val === 'string')"],
            ["instanceof", "Class instances & Errors (HttpException, Date)", "if (err instanceof HttpException)"],
            ["in", "Checking property existence in object unions", "if ('token' in request)"],
            ["is (Predicate)", "Custom boolean validation functions", "function isUser(x: any): x is User"],
            ["Discriminated Union", "Objects with a shared literal tag ('kind' or 'type')", "switch (event.type) { case 'PAY': ... }"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
