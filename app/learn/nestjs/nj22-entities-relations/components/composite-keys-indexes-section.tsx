"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — VALUE OBJECTS VS DOMAIN ENTITIES
// ═══════════════════════════════════════════════════════════

export function CompositeKeysIndexesSection() {
  return (
    <SectionContainer number={8} title="Value Objects vs Entities (Identity vs Value)">
      {/* ── 8.1 Value Objects ── */}
      <div className="mb-16">
        <TopicHeader
          number={8}
          title="Modeling Immutable Attributes as Value Objects"
          description="How to differentiate between objects with distinct identity (Entities) and objects defined by their values."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> The Money Value Object Example
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Not everything in your domain needs an <code>id</code>. An amount of money ($50 USD) has no identity; any $50 USD bill is equal to any other:
          </p>
          <EnhancedCodeBlock
            code={`export class Money {
  constructor(
    public readonly amountCents: number,
    public readonly currency: "USD" | "EUR" | "GBP",
  ) {
    if (amountCents < 0) {
      throw new Error("Money amount cannot be negative");
    }
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(\`Currency mismatch: \${this.currency} vs \${other.currency}\`);
    }
    return new Money(this.amountCents + other.amountCents, this.currency);
  }

  equals(other: Money): boolean {
    return this.amountCents === other.amountCents && this.currency === other.currency;
  }
}

// In your ProductEntity:
export class ProductEntity {
  constructor(
    public readonly id: string, // ⭐ Entity has identity
    public title: string,
    public price: Money,        // ⭐ Price is an immutable Value Object
  ) {}
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the primary difference between a Domain Entity and a Value Object?"
          answer="An Entity is defined by its unique identity (ID) and changes over time, while a Value Object is immutable and defined entirely by the equality of its attributes."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
