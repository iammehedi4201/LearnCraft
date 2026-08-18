"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON CACHING)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Cache-Aside &amp; TTL Eviction">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your caching and eviction algorithms to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: In-Memory TTL Cache ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: In-Memory TTL Cache Engine</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "caching-ex-01",
              title: "1. Build In-Memory TTL Cache Engine",
              instructions: `Implement 'createTtlCache()':
Returns an object with:
- 'set(key: string, value: any, ttlMs: number)': stores value with expiry timestamp.
- 'get(key: string)': returns value if current time < expiry, otherwise deletes key and returns null.
- 'del(key: string)': deletes key.`,
              starterCode: `function createTtlCache() {
  // Your code here:
}

const cache = createTtlCache();
cache.set("user_1", { name: "Alice" }, 1000);
console.log("Cached:", cache.get("user_1"));`,
              solutionCode: `function createTtlCache() {
  const store = new Map<string, { value: any; expiresAt: number }>();

  return {
    set(key: string, value: any, ttlMs: number) {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
    },
    get(key: string) {
      const item = store.get(key);
      if (!item) return null;
      if (Date.now() > item.expiresAt) {
        store.delete(key);
        return null;
      }
      return item.value;
    },
    del(key: string) {
      store.delete(key);
    }
  };
}

const cache = createTtlCache();
cache.set("user_1", { name: "Alice" }, 1000);
console.log("Cached:", cache.get("user_1"));`,
              hints: [
                "Store { value, expiresAt: Date.now() + ttlMs } in a Map.",
                "In get(), check Date.now() > item.expiresAt.",
              ],
              tests: [
                {
                  name: "Retrieves active cache item and returns null for expired items",
                  code: `const c = createTtlCache(); c.set("k", "v", 5000); if (c.get("k") !== "v") throw new Error("Get failed"); c.set("exp", "old", -100); if (c.get("exp") !== null) throw new Error("Expired item not evicted");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Cache-Aside Wrapper ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Cache-Aside Fetch Wrapper</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "caching-ex-02",
              title: "2. Build Cache-Aside Lazy Loader",
              instructions: `Implement 'cacheAside(cache: any, key: string, fetchFn: () => Promise<any>, ttlMs: number)':
1. Reads key from cache. If found, returns it directly.
2. If not found, awaits fetchFn(), saves result into cache with ttlMs, and returns the fresh result.`,
              starterCode: `async function cacheAside(cache: any, key: string, fetchFn: () => Promise<any>, ttlMs: number): Promise<any> {
  // Your code here:
}

const mockCache = {
  data: {} as Record<string, any>,
  async get(k: string) { return this.data[k]; },
  async set(k: string, v: any) { this.data[k] = v; }
};

let dbCalls = 0;
const dbQuery = async () => { dbCalls++; return { id: 42, title: "NestJS Guide" }; };

(async () => {
  console.log("Call 1:", await cacheAside(mockCache, "post:42", dbQuery, 5000));
  console.log("Call 2:", await cacheAside(mockCache, "post:42", dbQuery, 5000));
  console.log("Total DB Queries:", dbCalls);
})();`,
              solutionCode: `async function cacheAside(cache: any, key: string, fetchFn: () => Promise<any>, ttlMs: number): Promise<any> {
  const cached = await cache.get(key);
  if (cached !== undefined && cached !== null) {
    return cached;
  }
  const fresh = await fetchFn();
  await cache.set(key, fresh, ttlMs);
  return fresh;
}

const mockCache = {
  data: {} as Record<string, any>,
  async get(k: string) { return this.data[k]; },
  async set(k: string, v: any) { this.data[k] = v; }
};

let dbCalls = 0;
const dbQuery = async () => { dbCalls++; return { id: 42, title: "NestJS Guide" }; };

(async () => {
  console.log("Call 1:", await cacheAside(mockCache, "post:42", dbQuery, 5000));
  console.log("Call 2:", await cacheAside(mockCache, "post:42", dbQuery, 5000));
  console.log("Total DB Queries:", dbCalls);
})();`,
              hints: [
                "Check cached !== undefined && cached !== null before calling fetchFn().",
              ],
              tests: [
                {
                  name: "Executes fetchFn only on cache miss",
                  code: `let count = 0; const c = { d: {} as any, async get(k: string) { return this.d[k]; }, async set(k: string, v: any) { this.d[k] = v; } }; const fn = async () => { count++; return 100; }; const run = async () => { await cacheAside(c, "a", fn, 1000); await cacheAside(c, "a", fn, 1000); if (count !== 1) throw new Error("Query was executed multiple times"); }; run();`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
