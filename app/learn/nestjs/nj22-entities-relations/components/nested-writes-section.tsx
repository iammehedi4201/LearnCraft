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
// MODULE 7 — AGGREGATE ROOTS & ATOMIC COMPOSITION
// ═══════════════════════════════════════════════════════════

export function NestedWritesSection() {
  return (
    <SectionContainer number={7} title="Aggregate Roots & Atomic Multi-Entity Composition">
      {/* ── 7.1 Aggregate Roots ── */}
      <div className="mb-16">
        <TopicHeader
          number={7}
          title="Atomic Composition of Related Entities"
          description="How Aggregate Roots group multiple related domain entities into a single transaction boundary."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> The Order &amp; OrderItem Aggregate
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In domain-driven design, child entities like <code>OrderItem</code> should not be saved independently without validating the parent <code>Order</code> total and customer credit limit:
          </p>
          <EnhancedCodeBlock
            code={`export class OrderItemEntity {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPriceCents: number,
  ) {
    if (quantity <= 0) throw new Error("Quantity must be positive");
    if (unitPriceCents < 0) throw new Error("Price cannot be negative");
  }

  get totalCents(): number {
    return this.quantity * this.unitPriceCents;
  }
}

export class OrderAggregate {
  private readonly _items: OrderItemEntity[] = [];
  public status: "PENDING" | "PAID" | "CANCELLED" = "PENDING";

  constructor(
    public readonly id: string,
    public readonly customerId: string,
  ) {}

  addItem(productId: string, quantity: number, unitPriceCents: number): void {
    if (this.status !== "PENDING") {
      throw new Error("Cannot add items to a non-pending order");
    }
    this._items.push(new OrderItemEntity(productId, quantity, unitPriceCents));
  }

  get items(): readonly OrderItemEntity[] {
    return Object.freeze([...this._items]);
  }

  get subtotalCents(): number {
    return this._items.reduce((sum, item) => sum + item.totalCents, 0);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is an Aggregate Root in NestJS domain modeling?"
          answer="An Aggregate Root is the main parent entity (e.g. Order) that controls access, modifications, and consistency invariants for all its internal child entities (e.g. OrderItems)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
