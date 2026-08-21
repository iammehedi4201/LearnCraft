"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 8 — REAL-WORLD PATTERN: LOGGING & PERFORMANCE
// ═══════════════════════════════════════════════════════════

export function LoggingPerformanceSection() {
  return (
    <SectionContainer number={8} title="Real-World Pattern: Logging & Performance">
      {/* ── 8.1 Building a Synchronous @Log Decorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automatic Method Logging with @Log"
          description="Logging what arguments a method was called with, what it returned, and how long it took is one of the most useful everyday tasks for decorators."
          color="primary"
        />

        <AnalogyBox emoji="⏱️" title="The Stopwatch & Receipt Analogy">
          <p>
            Think of <code>@Log</code> like an automatic stopwatch and receipt printer for every function.
          </p>
          <p className="mt-2">
            When someone calls the function, the stopwatch starts (<code>performance.now()</code>), records the incoming parameters, waits for the result, and prints a clean summary with the exact elapsed time!
          </p>
        </AnalogyBox>

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Synchronous @Log Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Click Run to see how <code>@Log</code> automatically records calls, return values, and errors:
          </p>
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
      console.error("💥 [ERROR] " + key + " failed: " + error.message);
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
    if (b === 0) throw new Error("Cannot divide by zero!");
    return a / b;
  }
}

const calc = new Calculator();
calc.add(15, 30);

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
          title="Timing Asynchronous (Async/Await) Methods"
          description="In real backend APIs, database queries and HTTP requests are asynchronous. A regular function won't wait for the promise — so we must use an 'async function' wrapper with 'await'."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Asynchronous @LogAsync Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Notice how <code>await original.apply(this, args)</code> correctly waits for the 150ms database delay before recording the elapsed time:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function LogAsync(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  // The wrapper function MUST be async to await the promise!
  descriptor.value = async function (...args: any[]) {
    console.log("⏳ [ASYNC START] " + key + " started with args:", args);
    const start = performance.now();

    try {
      // Wait for the asynchronous promise to resolve:
      const result = await original.apply(this, args);
      const time = (performance.now() - start).toFixed(2);
      console.log("✅ [ASYNC SUCCESS] " + key + " finished in " + time + "ms:", result);
      return result;
    } catch (error: any) {
      const time = (performance.now() - start).toFixed(2);
      console.error("❌ [ASYNC ERROR] " + key + " failed after " + time + "ms:", error.message);
      throw error;
    }
  };
}

class ProductService {
  @LogAsync
  async fetchProduct(id: number) {
    // Simulate a database delay of 150ms:
    await new Promise(resolve => setTimeout(resolve, 150));
    return { id, title: "Wireless Headphones", price: 99 };
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
          question="Why can't we use a regular synchronous try/catch block inside a decorator to log async methods?"
          answer="Because an async function returns a Promise immediately before the async work actually finishes. If you don't use 'async/await' inside your decorator wrapper, the try block finishes instantly (measuring 0ms), and any later errors will bypass your catch block."
        />
      </div>
    </SectionContainer>
  );
}
