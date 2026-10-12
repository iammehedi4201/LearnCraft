"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  SummaryBox,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 9 — REAL-WORLD EXAMPLE: PAYMENT SYSTEM
// ═══════════════════════════════════════════════════════════

export function RealWorldExampleSection() {
  return (
    <SectionContainer number={9} title="Real-World Example: Payment System">
      {/* ── 9.1 Simple Payment System ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="A Simple Real-World Payment System"
          description="Here is a small example that combines multiple SOLID principles together."
          color="primary"
        />

        <StepList
          steps={[
            {
              label: "[I] Interface Segregation",
              note: "OrderService depends only on pay(amount); it is not forced to know about refunds, gateway reports, or other unrelated capabilities.",
            },
            {
              label: "[O] Open / Closed",
              note: "A new payment class can be added without rewriting OrderService; the application wiring still selects the implementation.",
            },
            {
              label: "[L] Liskov Substitution",
              note: "Both CreditCardPayment and BkashPayment work everywhere PaymentMethod is expected.",
            },
            {
              label: "[S] Single Responsibility",
              note: "Each payment class only handles its own payment processing.",
            },
            {
              label: "[D] Dependency Inversion",
              note: "The high-level OrderService depends on the PaymentMethod contract and receives an implementation through constructor injection.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* ── 9.2 Code Playground ── */}
      <div className="mb-16">
        <SectionHeading>🚀 Try It Yourself: Live Payment Example</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`// 1. Simple Interface
interface PaymentMethod {
  pay(amount: number): void;
}

// 2. Separate payment methods (Open for extension)
class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log("💳 Paid $" + amount + " using Credit Card");
  }
}

class BkashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log("📱 Paid $" + amount + " using bKash");
  }
}

// 3. Service receives the payment method via Dependency Injection
class OrderService {
  constructor(private readonly paymentMethod: PaymentMethod) {}

  completeOrder(amount: number): void {
    this.paymentMethod.pay(amount);
    console.log("✅ Order finished!");
  }
}

// Testing with Credit Card:
const cardOrder = new OrderService(new CreditCardPayment());
cardOrder.completeOrder(100);

// Testing with bKash:
const bkashOrder = new OrderService(new BkashPayment());
bkashOrder.completeOrder(50);`}
          height="480px"
        />

        <SummaryBox>
          This small example shows how SOLID principles make code clean, easy to read, and simple to expand.
        </SummaryBox>

        <QuickCheck
          question="If you want to add PayPal payment to this system, what code do you need to change?"
          answer="Create 'class PaypalPayment implements PaymentMethod' with 'pay(amount: number): void'. OrderService does not change. The composition root or NestJS provider configuration must still be updated so the application can select PayPal."
        />
      </div>
    </SectionContainer>
  );
}
