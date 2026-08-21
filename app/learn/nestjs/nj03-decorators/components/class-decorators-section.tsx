"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 3 — CLASS DECORATORS
// ═══════════════════════════════════════════════════════════

export function ClassDecoratorsSection() {
  return (
    <SectionContainer number={3} title="Class Decorators">
      {/* ── 3.1 Class Decorator Signature ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Class Decorator?"
          description="A class decorator is placed directly above a class. TypeScript gives it exactly 1 argument: the class constructor function itself."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The Shape of a Class Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function MyClassDecorator(
  constructor: Function // The class constructor function itself
) {
  // You can inspect it, add properties to its prototype, or replace it!
}`}
          </pre>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Inspecting a Class</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            In this simple example, the decorator reads the class name and prints out all the method names defined on its prototype:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function InspectClass(constructor: Function) {
  console.log("🔍 Decorating Class:", constructor.name);
  // List all methods defined on this class:
  const methods = Object.getOwnPropertyNames(constructor.prototype);
  console.log("📋 Available methods:", methods);
}

@InspectClass
class PaymentService {
  processPayment() {
    return "payment processed";
  }
  refundPayment() {
    return "refund issued";
  }
}

const payment = new PaymentService();
console.log("Instance created successfully!");`}
            height="340px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 3.2 Adding Properties & Methods via Prototype ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Adding Shared Properties to All Instances"
          description="Because the decorator receives the constructor, you can attach properties directly to constructor.prototype. Every instance created from that class will automatically share them!"
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Adding a Creation Timestamp</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            The <code>@Timestamped</code> decorator adds a <code>createdAt</code> date and a helper method to every order:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function Timestamped(constructor: Function) {
  // Attach new helper data to the prototype:
  constructor.prototype.createdAt = new Date().toISOString();
  constructor.prototype.getTimestamp = function () {
    return "🕒 Created at: " + this.createdAt;
  };
}

@Timestamped
class OrderModel {
  constructor(public id: number, public total: number) {}
}

const order = new OrderModel(101, 49.99);
console.log("Order ID:", order.id);
console.log("Total:", "$" + order.total);

// Access the properties added by our decorator:
console.log("Order Timestamp:", (order as any).createdAt);
console.log((order as any).getTimestamp());`}
            height="360px"
          />
        </div>

        <InfoCallout emoji="💡" title="Why did we write '(order as any)' in the example?">
          <p>
            TypeScript checks your code at <strong>compile-time</strong> based on what you wrote in <code>class OrderModel</code>. Because our decorator adds <code>createdAt</code> dynamically when the program runs, TypeScript doesn&apos;t see it in the class definition by default. Using <code>(order as any)</code> tells TypeScript: <em>&quot;Trust me, this property exists at runtime!&quot;</em>
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 3.3 Returning a Subclass (Class Wrapper Pattern) ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Replacing a Class with a Subclass (Advanced)"
          description="If a class decorator returns a new class, that new class completely replaces the original one. This is how you can inject extra logic whenever new instances are created."
          color="emerald"
        />

        <InfoCallout emoji="📖" title="Understanding the Generic Type in Plain Words">
          <p>
            You will often see <code>&lt;T extends &#123; new (...args: any[]): &#123;&#125; &#125;&gt;</code>. In plain English, this just tells TypeScript: <em>&quot;T must be a class constructor that can be instantiated with the <code>new</code> keyword.&quot;</em>
          </p>
        </InfoCallout>

        <div className="mb-8 mt-4">
          <SectionHeading>🚀 Try It Yourself: Automatic Instance Counter</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Every time someone creates a new <code>DatabaseConnection</code>, our wrapper class assigns a unique ID and logs it:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// T is any class constructor:
function TrackInstances<T extends { new (...args: any[]): {} }>(originalConstructor: T) {
  let count = 0;

  // Return a new class that extends the original one:
  return class extends originalConstructor {
    instanceId: number;

    constructor(...args: any[]) {
      super(...args); // Call original constructor
      count++;
      this.instanceId = count;
      console.log("✨ Created " + originalConstructor.name + " (Instance #" + this.instanceId + ")");
    }
  };
}

@TrackInstances
class DatabaseConnection {
  constructor(public dbName: string) {}
}

const db1 = new DatabaseConnection("users_db");
const db2 = new DatabaseConnection("orders_db");

console.log("DB 1 ID:", (db1 as any).instanceId);
console.log("DB 2 ID:", (db2 as any).instanceId);`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="What parameters does a Class Decorator receive in TypeScript?"
          answer="A Class Decorator receives exactly 1 parameter: the class constructor function itself. If the decorator returns a new class constructor, that returned class will replace the original class."
        />
      </div>
    </SectionContainer>
  );
}
