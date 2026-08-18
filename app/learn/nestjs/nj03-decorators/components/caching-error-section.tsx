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
// PART 11 — REAL-WORLD PATTERN: CACHING & ERROR HANDLING
// ═══════════════════════════════════════════════════════════

export function CachingErrorSection() {
  return (
    <SectionContainer number={11} title="Real-World Pattern: Caching & Error Handling">
      {/* ── 11.1 Method Caching / Memoization ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Method Result Caching (Memoization)"
          description="Caching the return value of expensive database queries or mathematical calculations saves CPU cycles and improves API response times."
          color="primary"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live In-Memory Cache Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function CacheResult(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    // Generate a unique cache key from the arguments
    const cacheKey = JSON.stringify(args);

    if (cache.has(cacheKey)) {
      console.log("⚡ [CACHE HIT] Returning cached result for key:", cacheKey);
      return cache.get(cacheKey);
    }

    console.log("🐢 [CACHE MISS] Computing expensive result for key:", cacheKey);
    const result = original.apply(this, args);
    cache.set(cacheKey, result);
    return result;
  };
}

class ProductRepository {
  @CacheResult
  findProductById(id: number) {
    // Simulate expensive database query:
    console.log("   --> Querying database for Product #" + id + "...");
    return { id, title: "Mechanical Keyboard", price: 89 };
  }
}

const repo = new ProductRepository();

// Call 1: Misses cache -> runs query
repo.findProductById(1);

// Call 2: Hits cache -> instant return!
repo.findProductById(1);

// Call 3: Different ID -> misses cache
repo.findProductById(2);

// Call 4: Hits cache again!
repo.findProductById(1);`}
            height="460px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 11.2 Centralized Error Handling ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Centralized Error Handling with @CatchError"
          description="Instead of wrapping every method in repetitive try/catch blocks, an error-handling decorator catches exceptions, logs them, and returns safe fallback values."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Safe Fallback Error Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function SafeAsync(fallbackValue: any = null) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (err: any) {
        console.error("🛡️ [SAFE ASYNC CAUGHT] Error in " + key + ":", err.message);
        return fallbackValue;
      }
    };
  };
}

class AnalyticsService {
  @SafeAsync({ trackingEnabled: false, events: [] })
  async fetchAnalytics(userId: number) {
    // Simulate failing 3rd party API call:
    throw new Error("External Analytics API timeout (504)");
  }
}

async function runTest() {
  const analytics = new AnalyticsService();
  const data = await analytics.fetchAnalytics(101);
  console.log("Returned Safe Data (App didn't crash!):", data);
}

runTest();`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="Why do we convert arguments to a JSON string using JSON.stringify(args) to create a cache key?"
          answer='JavaScript Map compares object and array keys by reference, not value. If two calls pass [1, "active"] and [1, "active"], they are two distinct array instances. Converting them to JSON strings guarantees that identical arguments map to the exact same cache entry string key.'
        />
      </div>
    </SectionContainer>
  );
}
