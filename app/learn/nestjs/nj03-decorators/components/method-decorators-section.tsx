"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 4 — METHOD DECORATORS
// ═══════════════════════════════════════════════════════════

export function MethodDecoratorsSection() {
  return (
    <SectionContainer number={4} title="Method Decorators">
      {/* ── 4.1 Signature & 3 Parameters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Method Decorators & The 3 Parameters"
          description="Method decorators are placed directly above a method. TypeScript automatically passes 3 clear arguments to your decorator function."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 3 Parameters of a Method Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function MyMethodDecorator(
  target: any,                       // 1. The class prototype (holding the method)
  propertyKey: string,               // 2. The method name as text (e.g. "greet")
  descriptor: PropertyDescriptor     // 3. The settings box (descriptor.value is the function!)
) {
  // You can modify descriptor.value to wrap or intercept calls!
}`}
          </pre>
        </WhyBox>

        <ComparisonTable
          headers={["Parameter", "What it receives", "Plain English Explanation"]}
          rows={[
            ["target", "Class.prototype", "The object where this method lives"],
            ["propertyKey", '"calculateTotal"', "The name of the method as a string"],
            ["descriptor", "{ value: fn, writable: true, ... }", "The property descriptor holding the actual function inside .value"],
          ]}
        />

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Step 1: Your First Simple Method Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Here is the simplest possible method decorator. It intercepts a greeting method and prints a message before and after:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function SimpleAnnounce(target: any, key: string, descriptor: PropertyDescriptor) {
  // 1. Grab the original method:
  const original = descriptor.value;

  // 2. Replace it with a friendly wrapper function:
  descriptor.value = function (...args: any[]) {
    console.log("📣 Calling method: " + key + " with input:", ...args);
    
    // 3. Run the original method:
    const result = original.apply(this, args);
    
    console.log("🎉 " + key + " finished successfully!");
    return result;
  };
}

class Greeter {
  @SimpleAnnounce
  sayHello(name: string) {
    return "Hello, " + name + "!";
  }
}

const g = new Greeter();
const message = g.sayHello("Mehedi");
console.log("Returned output:", message);`}
            height="380px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 4.2 Understanding PropertyDescriptor ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Understanding PropertyDescriptor"
          description="In JavaScript, every property and method on an object has a descriptor object that controls its behavior and permissions."
          color="sky"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-feature-dark block mb-1">descriptor.value</code>
            <p className="text-xs text-ds-text-sub">The function itself. Replace this to intercept or wrap method calls.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-info-dark block mb-1">descriptor.writable</code>
            <p className="text-xs text-ds-text-sub">Set to <code>false</code> to make the method read-only so nobody can overwrite it.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-success-dark block mb-1">descriptor.enumerable</code>
            <p className="text-xs text-ds-text-sub">Whether the method shows up when looping over the object keys.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-warning-dark block mb-1">descriptor.configurable</code>
            <p className="text-xs text-ds-text-sub">Whether the method can be deleted or its settings changed later.</p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Making a Method Read-Only</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            By setting <code>descriptor.writable = false</code>, you lock down the method so other code cannot accidentally replace it:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function ReadonlyMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  // Lock the method so it cannot be replaced:
  descriptor.writable = false;
  console.log("🔒 Method " + key + " is now read-only!");
}

class SecurityService {
  @ReadonlyMethod
  verifyPin(pin: string) {
    return pin === "1234";
  }
}

const sec = new SecurityService();
console.log("Check PIN 1234:", sec.verifyPin("1234"));

// Trying to overwrite the method will fail:
try {
  sec.verifyPin = function () { return true; } as any;
  console.log("Overwritten!");
} catch (error: any) {
  console.log("Blocked by @ReadonlyMethod:", error.message);
}`}
            height="360px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 4.3 Timing & Performance ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Practical Pattern: Timing Method Speed"
          description="One of the most popular uses for method decorators is measuring performance to find slow database queries or calculations."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live Speed Benchmarking</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            <code>@MeasureTime</code> calculates how many milliseconds any function takes to complete:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function MeasureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log("⚡ Running " + propertyKey + "...");
    const start = performance.now();

    // Call the original method
    const result = originalMethod.apply(this, args);

    const time = (performance.now() - start).toFixed(2);
    console.log("⏱️ " + propertyKey + " completed in " + time + "ms");
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @MeasureTime
  sumNumbers(limit: number) {
    let total = 0;
    for (let i = 1; i <= limit; i++) {
      total += i;
    }
    return total;
  }
}

const processor = new DataProcessor();
const sum = processor.sumNumbers(1000000);
console.log("Sum result:", sum);`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="What is stored inside descriptor.value for a method decorator?"
          answer="descriptor.value holds the reference to the actual method function. To intercept or wrap the method, save originalMethod = descriptor.value, assign a new wrapper function to descriptor.value, and call originalMethod.apply(this, args) inside your new function."
        />
      </div>
    </SectionContainer>
  );
}
