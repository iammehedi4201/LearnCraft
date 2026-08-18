"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 8 — REAL-WORLD PATTERN: LOGGING & PERFORMANCE
// ═══════════════════════════════════════════════════════════

export function LoggingPerformanceSection() {
  return (
    <SectionContainer number={8} title="Real-World Pattern: Logging & Performance">
      {/* ── 8.1 Building a Production-Ready @Log ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Building a Production-Grade Synchronous @Log Decorator"
          description="Logging method execution, parameters, and return values is one of the most common real-world uses of method decorators."
          color="primary"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Synchronous @Log Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log("➡️ [CALL] " + key + "(" + args.map(a => JSON.stringify(a)).join(", ") + ")");
    const start = performance.now();

    try {
      const result = original.apply(this, args);
      const time = (performance.now() - start).toFixed(2);
      console.log("⬅️ [RETURN] " + key + " -> " + JSON.stringify(result) + " (" + time + "ms)");
      return result;
    } catch (error: any) {
      console.error("💥 [ERROR] " + key + " threw: " + error.message);
      throw error;
    }
  };
}

class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b;
  }

  @Log
  divide(a: number, b: number) {
    if (b === 0) throw new Error("Division by zero!");
    return a / b;
  }
}

const calc = new Calculator();
calc.add(10, 25);

try {
  calc.divide(10, 0);
} catch {}`}
            height="440px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 8.2 Handling Async Methods with @LogAsync ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Handling Async Methods with @LogAsync"
          description="In real backend APIs, database and HTTP calls are asynchronous. A sync decorator won't measure promise resolution accurately — you need an async wrapper with await."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Asynchronous @LogAsync Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function LogAsync(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  // The wrapper function MUST be async to await the promise!
  descriptor.value = async function (...args: any[]) {
    console.log("⏳ [ASYNC START] " + key + " with args:", args);
    const start = performance.now();

    try {
      const result = await original.apply(this, args); // Await the promise!
      const time = (performance.now() - start).toFixed(2);
      console.log("✅ [ASYNC RESOLVED] " + key + " in " + time + "ms:", result);
      return result;
    } catch (error: any) {
      const time = (performance.now() - start).toFixed(2);
      console.error("❌ [ASYNC REJECTED] " + key + " failed after " + time + "ms:", error.message);
      throw error;
    }
  };
}

class ProductService {
  @LogAsync
  async fetchProduct(id: number) {
    // Simulate a database delay of 150ms:
    await new Promise(resolve => setTimeout(resolve, 150));
    return { id, title: "MacBook Pro M3", price: 1999 };
  }
}

async function runDemo() {
  const service = new ProductService();
  await service.fetchProduct(42);
}

runDemo();`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="Why can't we use a standard synchronous try/catch block inside a decorator to log async methods?"
          answer="Because an async function returns a Promise immediately before the asynchronous work finishes. If you don't use 'async/await' in your decorator wrapper, the try block finishes instantly, measuring 0ms, and any subsequent errors (rejections) will bypass your catch block."
        />
      </div>
    </SectionContainer>
  );
}
