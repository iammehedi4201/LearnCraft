"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  Divider,
  MistakeBox,
  EasyRuleCard,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 3 — O: OPEN / CLOSED PRINCIPLE
// ═══════════════════════════════════════════════════════════

export function OcpSection() {
  return (
    <SectionContainer number={3} title="O — Open / Closed Principle">
      {/* ── 1. What does it mean? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Does It Mean?"
          description="A useful design lets you extend expected behavior without repeatedly rewriting stable code."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            When a kind of change is expected—such as adding payment methods—put a stable contract in front of it. New implementations can then be added with fewer changes to the code that uses them.
          </p>
        </WhyBox>

        <AnalogyBox emoji="🔌" title="Simple Real-Life Story: The Wall Socket">
          <p>
            Think of the power socket on your wall.
          </p>
          <p className="mt-2">
            When you buy a new phone charger, you do <strong>not</strong> open the wall and change the electric wires! You just plug your new charger in. The wall socket is <strong>closed for modification</strong>, but <strong>open for new devices</strong>.
          </p>
        </AnalogyBox>

        <EasyRuleCard rule="Design extension points for the kinds of change you actually expect." />

        <InfoCallout emoji="🧩" title="Closed Does Not Mean Frozen Forever">
          <p>
            Existing code can still be edited for bug fixes or changed requirements. OCP asks us to avoid reopening the same decision-making code every time a predictable variant is added. A short <code>if</code> or <code>switch</code> for a truly fixed set of cases can still be the clearest choice.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2. Bad Example vs Better Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Bad Example vs Better Example: Payments"
          description="Let's look at a simple payment example."
          color="sky"
        />

        <MistakeBox
          title="Changing Existing Code Every Time"
          description="Every time you add a new payment method (like Nagad), you must edit the pay() function. This risks breaking Card and bKash payments!"
          wrong={`class PaymentService {
  pay(type: string, amount: number) {
    if (type === "card") {
      // card payment logic
      console.log("Paid $" + amount + " with Card");
    }

    if (type === "bkash") {
      // bKash payment logic
      console.log("Paid $" + amount + " with bKash");
    }

    // ⚠️ If we add Nagad, we MUST edit this function again!
  }
}`}
          right={`// 1. Create a simple shared interface
interface PaymentMethod {
  pay(amount: number): void;
}

// 2. Each payment method is its own class
class CardPayment implements PaymentMethod {
  pay(amount: number): void { console.log("Paid $" + amount + " with Card"); }
}

class BkashPayment implements PaymentMethod {
  pay(amount: number): void { console.log("Paid $" + amount + " with bKash"); }
}

// 3. Add Nagad as a new class; existing payment classes stay unchanged:
class NagadPayment implements PaymentMethod {
  pay(amount: number): void { console.log("Paid $" + amount + " with Nagad"); }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Adding a New Payment Method</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// The shared rule for all payments:
interface PaymentMethod {
  pay(amount: number): void;
}

// Payment 1: Card
class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log("💳 Paid $" + amount + " using Credit Card.");
  }
}

// Payment 2: bKash
class BkashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log("📱 Paid $" + amount + " using bKash.");
  }
}

// Payment 3: Brand new method! Notice how easy this is to add:
class NagadPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log("⚡ Paid $" + amount + " using Nagad.");
  }
}

// CheckoutService does not change when another PaymentMethod is added:
class CheckoutService {
  process(payment: PaymentMethod, amount: number): void {
    payment.pay(amount);
  }
}

const checkout = new CheckoutService();
checkout.process(new CardPayment(), 50);
checkout.process(new BkashPayment(), 20);
checkout.process(new NagadPayment(), 35);`}
            height="460px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            If another payment method follows the same contract, you can add its class without changing <code>CheckoutService</code>. That reduces the chance of causing a regression in existing payment paths, although tests are still important.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection"
          description="How NestJS uses the Open/Closed Principle."
          color="emerald"
        />

        <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
          In NestJS, providers and strategy classes can act as extension points. Each strategy follows a shared contract, while a controller can keep delegating to the same service:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-strong mb-6">
          <li>You can add a <code>JwtStrategy</code> for login tokens.</li>
          <li>You can add a <code>GoogleStrategy</code> for Google login.</li>
          <li>Code that consumes the shared strategy contract often does not need to change.</li>
        </ul>

        <QuickCheck
          question="What is the easy rule for the Open/Closed Principle (O)?"
          answer="Create stable extension points for expected variations, so a new implementation can usually be added without rewriting the code that consumes the contract."
        />
      </div>
    </SectionContainer>
  );
}
