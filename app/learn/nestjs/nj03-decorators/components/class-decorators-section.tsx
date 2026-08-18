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
          title="Class Decorator Signature & How It Works"
          description="A class decorator is placed directly above a class declaration. It receives a single argument: the class's constructor function."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            Signature of a Class Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`type ClassDecorator = <TFunction extends Function>(
  target: TFunction // The class constructor function itself
) => TFunction | void;`}
          </pre>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Inspecting the Class Constructor</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function InspectClass(constructor: Function) {
  console.log("Decorating Class Name:", constructor.name);
  console.log("Prototype Methods:", Object.getOwnPropertyNames(constructor.prototype));
}

@InspectClass
class PaymentService {
  processPayment() {}
  refundPayment() {}
}

const payment = new PaymentService();
console.log("Instance created successfully!");`}
            height="320px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 3.2 Adding Properties & Methods via Prototype ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Adding Properties via the Prototype"
          description="Because the decorator receives the constructor, you can attach properties or helper methods directly to constructor.prototype so all instances inherit them."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Adding CreatedAt Timestamp</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function Timestamped(constructor: Function) {
  // Attach a timestamp property to the prototype
  constructor.prototype.createdAt = new Date().toISOString();
  constructor.prototype.getTimestamp = function () {
    return "Created at: " + this.createdAt;
  };
}

@Timestamped
class OrderModel {
  constructor(public id: number, public total: number) {}
}

const order = new OrderModel(101, 49.99);
console.log("Order ID:", order.id);
console.log("Order Timestamp:", (order as any).createdAt);
console.log((order as any).getTimestamp());`}
            height="340px"
          />
        </div>

        <InfoCallout emoji="💡" title="TypeScript Typings for Added Properties">
          <p>
            When a decorator adds properties dynamically to a prototype, TypeScript&apos;s static compiler doesn&apos;t automatically know about them. In strict TypeScript, you can use interface merging or class inheritance to tell TypeScript about the new properties.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 3.3 Returning a Subclass (Class Wrapper Pattern) ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Returning a New Class (Subclassing Pattern)"
          description="A class decorator can return a new constructor that extends the original class. This allows you to override constructor logic or inject state on instantiation."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Constructor Override Pattern</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function TrackInstances<T extends { new (...args: any[]): {} }>(constructor: T) {
  let instanceCount = 0;

  // Return a new anonymous class that extends the original:
  return class extends constructor {
    instanceId: number;

    constructor(...args: any[]) {
      super(...args);
      instanceCount++;
      this.instanceId = instanceCount;
      console.log("✨ Instantiated " + constructor.name + " (Instance #" + this.instanceId + ")");
    }
  };
}

@TrackInstances
class DatabaseConnection {
  constructor(public dbName: string) {}
}

const db1 = new DatabaseConnection("main_db");
const db2 = new DatabaseConnection("analytics_db");
console.log("DB1 ID:", (db1 as any).instanceId);
console.log("DB2 ID:", (db2 as any).instanceId);`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="What parameters does a Class Decorator receive in TypeScript?"
          answer="A Class Decorator receives exactly 1 parameter: the class's constructor function (e.g. Function or { new (...args: any[]): any }). If it returns a new class, that returned class completely replaces the original constructor."
        />
      </div>
    </SectionContainer>
  );
}
