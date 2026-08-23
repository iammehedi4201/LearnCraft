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
// PART 11 — REAL-WORLD PATTERN: CACHING & ERROR HANDLING
// ═══════════════════════════════════════════════════════════

export function CachingErrorSection() {
  return (
    <SectionContainer number={13} title="Real-World Pattern: Caching & Error Handling">
      {/* ── 11.1 Method Caching (Saving Results) ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Remembering Past Results (Caching)"
          description="Caching means storing the answer to a slow query or heavy calculation. If someone asks for the exact same data again, you can return the saved answer instantly without redoing the work!"
          color="primary"
        />

        <AnalogyBox emoji="🧠" title="The Shortcut Notebook Analogy">
          <p>
            Imagine a customer asks a shopkeeper: <em>&quot;How much does Item #42 cost with tax and shipping?&quot;</em>
          </p>
          <p className="mt-2">
            The shopkeeper calculates the math for 10 seconds, gives the answer ($89), and writes it down in a notebook.
          </p>
          <p className="mt-2">
            When another customer asks for Item #42 five minutes later, the shopkeeper simply glances at the notebook and answers immediately!
          </p>
        </AnalogyBox>

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Live In-Memory Cache Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Notice how the 1st call does the slow database search, while subsequent calls return instantly from memory:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function CacheResult(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  // A memory map to store past results:
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    // Create a key from the arguments (e.g. "[1]")
    const cacheKey = JSON.stringify(args);

    if (cache.has(cacheKey)) {
      console.log("⚡ [CACHE HIT] Found saved answer for ID:", cacheKey);
      return cache.get(cacheKey);
    }

    console.log("🐢 [CACHE MISS] Doing slow calculation/query for:", cacheKey);
    const result = original.apply(this, args);
    cache.set(cacheKey, result); // Save to notebook
    return result;
  };
}

class ProductCatalog {
  @CacheResult
  findProduct(id: number) {
    // Simulate slow database lookup:
    console.log("   --> [DATABASE] Searching disk for Product #" + id + "...");
    return { id, title: "Mechanical Keyboard", price: 89 };
  }
}

const catalog = new ProductCatalog();

// Call 1: Misses cache -> searches database
catalog.findProduct(1);

// Call 2: Hits cache -> instant return!
catalog.findProduct(1);

// Call 3: Different ID -> searches database
catalog.findProduct(2);

// Call 4: Hits cache again for ID 1!
catalog.findProduct(1);`}
            height="480px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 11.2 Centralized Error Handling ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Safe Fallback Error Handling with @SafeAsync"
          description="Instead of writing try/catch blocks inside every method, an error-handling decorator catches unexpected crashes, logs the issue, and returns a safe default value."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Safe Fallback Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Even though the external API fails with an error, the decorator prevents the entire app from crashing:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function SafeAsync(fallbackValue: any = null) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (error: any) {
        console.error("🛡️ [SAFE SHIELD CAUGHT ERROR] in " + key + ":", error.message);
        return fallbackValue; // Return safe default instead of crashing
      }
    };
  };
}

class WeatherService {
  @SafeAsync({ temp: "N/A", status: "Service temporarily unavailable" })
  async getLiveWeather(city: string) {
    // Simulate a failing 3rd-party weather server:
    throw new Error("External Weather API connection timeout (504)");
  }
}

async function test() {
  const weather = new WeatherService();
  const data = await weather.getLiveWeather("Dhaka");
  console.log("Safe returned data (App kept running!):", data);
}

test();`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="Why do we convert arguments to JSON strings (JSON.stringify(args)) when building cache keys?"
          answer="In JavaScript, objects and arrays are compared by memory reference, not by value. If two calls pass [1] and [1], JavaScript sees them as two different array objects. Converting them to a string like '[1]' guarantees that matching inputs find the exact same cached result."
        />
      </div>
    </SectionContainer>
  );
}
