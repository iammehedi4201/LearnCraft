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
          title="Method Decorator Signature & The 3 Parameters"
          description="Method decorators are attached directly above a method. They receive 3 specific parameters from TypeScript."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 3 Parameters of a Method Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function MethodDecorator(
  target: any,                       // 1. Prototype of class (or constructor for static)
  propertyKey: string,               // 2. Name of the method being decorated
  descriptor: PropertyDescriptor     // 3. Property descriptor containing .value
) {
  // descriptor.value IS the original function!
}`}
          </pre>
        </WhyBox>

        <ComparisonTable
          headers={["Parameter", "For Instance Method", "For Static Method", "Purpose"]}
          rows={[
            ["target", "Class.prototype", "Class constructor function", "The object holding the method"],
            ["propertyKey", '"getUsers"', '"createInstance"', "The method's string name"],
            ["descriptor", "PropertyDescriptor object", "PropertyDescriptor object", "Contains .value, .writable, etc."],
          ]}
        />
      </div>

      <Divider />

      {/* ── 4.2 Understanding PropertyDescriptor ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Understanding PropertyDescriptor"
          description="In JavaScript, every object property has a descriptor that controls its behavior. For a method, descriptor.value holds the actual function."
          color="sky"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-feature-dark block mb-1">descriptor.value</code>
            <p className="text-xs text-ds-text-sub">The function itself. Replace this to intercept method calls.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-info-dark block mb-1">descriptor.writable</code>
            <p className="text-xs text-ds-text-sub">Whether the method can be reassigned with <code>=</code>.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-success-dark block mb-1">descriptor.enumerable</code>
            <p className="text-xs text-ds-text-sub">Whether the method shows up in <code>for...in</code> or <code>Object.keys</code>.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <code className="text-xs font-bold text-ds-warning-dark block mb-1">descriptor.configurable</code>
            <p className="text-xs text-ds-text-sub">Whether the property can be deleted or descriptor modified.</p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Readonly Method Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function ReadonlyMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  // Lock down the method so nobody can overwrite it:
  descriptor.writable = false;
  console.log("🔒 Method " + key + " is now read-only!");
}

class SecurityService {
  @ReadonlyMethod
  verifyToken(token: string) {
    return token === "secret-token-123";
  }
}

const sec = new SecurityService();
console.log("Verify valid:", sec.verifyToken("secret-token-123"));

// Attempting to overwrite the method will fail:
try {
  sec.verifyToken = function () { return true; } as any;
  console.log("Overwritten!");
} catch (e: any) {
  console.log("Blocked by ReadonlyMethod:", e.message);
}`}
            height="360px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 4.3 Method Interception & Wrapping ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Method Interception & Wrapping Pattern"
          description="The most powerful feature of method decorators is replacing descriptor.value with a wrapper function."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live Performance Benchmark Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function MeasureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Step 1: Save the original function reference
  const originalMethod = descriptor.value;

  // Step 2: Replace descriptor.value with our wrapper function
  descriptor.value = function (...args: any[]) {
    console.log("⚡ Executing " + propertyKey + " with args:", args);
    const start = performance.now();

    // Step 3: Run the original method preserving 'this' context
    const result = originalMethod.apply(this, args);

    const duration = (performance.now() - start).toFixed(2);
    console.log("🏁 " + propertyKey + " completed in " + duration + "ms");
    return result;
  };

  return descriptor;
}

class MathOperations {
  @MeasureTime
  calculatePrimes(limit: number) {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) { isPrime = false; break; }
      }
      if (isPrime) primes.push(i);
    }
    return primes.length;
  }
}

const ops = new MathOperations();
const count = ops.calculatePrimes(50000);
console.log("Found primes count:", count);`}
            height="420px"
          />
        </div>

        <QuickCheck
          question="What is stored inside descriptor.value for a method decorator?"
          answer="descriptor.value holds the reference to the actual method function. To intercept or wrap the method, save originalMethod = descriptor.value, assign a new function to descriptor.value, and call originalMethod.apply(this, args) inside your new function."
        />
      </div>
    </SectionContainer>
  );
}
