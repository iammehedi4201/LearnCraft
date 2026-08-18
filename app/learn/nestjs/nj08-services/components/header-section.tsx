"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  SummaryBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE: WHAT IS A SERVICE?
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: What is a Service?">
      {/* ── 1.1 What is a Service? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Service in NestJS?"
          description="A service is a dedicated worker class where your core business logic, database queries, and calculations live."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Why don't we write everything inside the Controller?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            Controllers should only focus on HTTP requests and responses. If you put 500 lines of database queries, password hashing, and payment calculations inside a controller:
          </p>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-xs text-ds-text-sub">
            <li>Your code becomes impossible to test in unit tests.</li>
            <li>You cannot reuse that calculation in other controllers or background jobs.</li>
            <li>It violates the Single Responsibility Principle (S in SOLID).</li>
          </ul>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            Services give your business logic a clean, reusable home.
          </p>
        </WhyBox>

        <AnalogyBox emoji="👨‍🍳" title="Simple Real-Life Story: The Chef in the Kitchen">
          <p>
            In a great restaurant, the <strong>Waiter (Controller)</strong> stays in the dining room taking orders from customers.
          </p>
          <p className="mt-2">
            The <strong>Chef (Service)</strong> stays in the kitchen preparing the food, following secret recipes, and cooking meals.
          </p>
          <p className="mt-2 font-bold text-ds-info-dark">
            If the restaurant adds home delivery (WebSockets or CLI task), the same Chef can cook for delivery orders too! That is the power of reusable services.
          </p>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 1.2 First Service Preview ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A First Look at a NestJS Service"
          description="A service is a plain class decorated with @Injectable()."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Clean Service & Controller Separation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. The Worker (Service):
class CalculatorService {
  calculateTax(amount: number, taxRate: number = 0.08): number {
    return Number((amount * taxRate).toFixed(2));
  }

  calculateTotal(amount: number): number {
    const tax = this.calculateTax(amount);
    return Number((amount + tax).toFixed(2));
  }
}

// 2. The HTTP Handler (Controller):
class CheckoutController {
  constructor(private readonly calculator: CalculatorService) {}

  getBill(subtotal: number) {
    const tax = this.calculator.calculateTax(subtotal);
    const total = this.calculator.calculateTotal(subtotal);

    return {
      subtotal,
      tax,
      total,
      currency: "USD"
    };
  }
}

const service = new CalculatorService();
const controller = new CheckoutController(service);

console.log("Order Bill:", controller.getBill(100));`}
            height="420px"
          />
        </div>

        <SummaryBox>
          Services are pure TypeScript classes. They don&apos;t know about HTTP headers or status codes — they just take inputs and return processed data.
        </SummaryBox>

        <QuickCheck
          question="What is the primary purpose of a Service in NestJS?"
          answer="To hold business logic, calculations, and data access methods separately from HTTP controllers so the logic is reusable and easily testable."
        />
      </div>
    </SectionContainer>
  );
}
