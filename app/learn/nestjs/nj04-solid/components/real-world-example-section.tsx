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
              note: "PaymentMethod is a small interface with only one method: pay(amount).",
            },
            {
              label: "[O] Open / Closed",
              note: "To add a new payment type (like Nagad), just write a new class without editing existing code.",
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
              note: "OrderService receives PaymentMethod from outside via constructor injection.",
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
  pay(amount: number) {
    console.log("💳 Paid $" + amount + " using Credit Card");
  }
}

class BkashPayment implements PaymentMethod {
  pay(amount: number) {
    console.log("📱 Paid $" + amount + " using bKash");
  }
}

// 3. Service receives the payment method via Dependency Injection
class OrderService {
  constructor(private paymentMethod: PaymentMethod) {}

  completeOrder(amount: number) {
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
          answer="You don't need to change any existing code! You simply create a new class: 'class PaypalPayment implements PaymentMethod { pay(amount) { ... } }'."
        />
      </div>
    </SectionContainer>
  );
}
