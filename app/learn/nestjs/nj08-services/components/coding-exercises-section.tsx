"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your NestJS service and provider skills to the test! Write your code in the interactive playgrounds below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Inventory Service ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Inventory Manager Service</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "svc-ex-01",
              title: "1. Build an Inventory Service",
              instructions: `Implement 'InventoryService':
1. 'addStock(sku: string, qty: number)': Adds qty to the stock for that sku and returns current total.
2. 'getStock(sku: string)': Returns current stock (or 0 if not found).
3. 'hasStock(sku: string, qty: number)': Returns true if stock >= qty, false otherwise.`,
              starterCode: `class InventoryService {
  private stock: Record<string, number> = {};

  // 1. addStock(sku, qty)

  // 2. getStock(sku)

  // 3. hasStock(sku, qty)
}

const service = new InventoryService();
service.addStock("ITEM-1", 10);
console.log("Stock for ITEM-1:", service.getStock("ITEM-1"));
console.log("Has 5 in stock?:", service.hasStock("ITEM-1", 5));`,
              solutionCode: `class InventoryService {
  private stock: Record<string, number> = {};

  addStock(sku: string, qty: number): number {
    this.stock[sku] = (this.stock[sku] || 0) + qty;
    return this.stock[sku];
  }

  getStock(sku: string): number {
    return this.stock[sku] || 0;
  }

  hasStock(sku: string, qty: number): boolean {
    return this.getStock(sku) >= qty;
  }
}

const service = new InventoryService();
service.addStock("ITEM-1", 10);
console.log("Stock for ITEM-1:", service.getStock("ITEM-1"));
console.log("Has 5 in stock?:", service.hasStock("ITEM-1", 5));`,
              hints: [
                "addStock adds qty to this.stock[sku] and returns the new value.",
                "getStock returns this.stock[sku] || 0.",
                "hasStock returns this.getStock(sku) >= qty.",
              ],
              tests: [
                {
                  name: "Adds and gets stock correctly",
                  code: `const s = new InventoryService(); s.addStock("A", 5); s.addStock("A", 3); if (s.getStock("A") !== 8) throw new Error("Stock for A should be 8");`,
                },
                {
                  name: "hasStock checks correctly",
                  code: `const s = new InventoryService(); s.addStock("B", 10); if (!s.hasStock("B", 5) || s.hasStock("B", 15)) throw new Error("hasStock returned invalid boolean");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Tax Calculator & Controller ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Injecting Tax Service into Controller</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "svc-ex-02",
              title: "2. Controller & Service Team",
              instructions: `Implement:
1. 'TaxService': Method 'getTax(amount: number)' returns amount * 0.10.
2. 'CheckoutController': Accepts TaxService in constructor and has method 'calculateTotal(subtotal: number)' returning '{ subtotal, tax, total }' where total = subtotal + tax.`,
              starterCode: `class TaxService {
  // Your code here
}

class CheckoutController {
  // Your code here: receive TaxService via constructor
}

const taxSvc = new TaxService();
const ctrl = new CheckoutController(taxSvc);
console.log("Checkout result:", ctrl.calculateTotal(100));`,
              solutionCode: `class TaxService {
  getTax(amount: number): number {
    return amount * 0.1;
  }
}

class CheckoutController {
  constructor(private readonly taxService: TaxService) {}

  calculateTotal(subtotal: number) {
    const tax = this.taxService.getTax(subtotal);
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  }
}

const taxSvc = new TaxService();
const ctrl = new CheckoutController(taxSvc);
console.log("Checkout result:", ctrl.calculateTotal(100));`,
              hints: [
                "TaxService.getTax(amount) returns amount * 0.1.",
                "CheckoutController constructor takes (private taxService: TaxService).",
                "calculateTotal returns { subtotal, tax, total: subtotal + tax }.",
              ],
              tests: [
                {
                  name: "CheckoutController calculates total correctly",
                  code: `const s = new TaxService(); const c = new CheckoutController(s); const res = c.calculateTotal(200); if (!res || res.tax !== 20 || res.total !== 220) throw new Error("Total calculation mismatch");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
