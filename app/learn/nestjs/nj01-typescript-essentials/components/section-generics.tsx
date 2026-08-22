"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 10 — GENERICS FUNDAMENTALS
// ═══════════════════════════════════════════════════════════

export function SectionGenerics() {
  return (
    <SectionContainer number={10} title="Generics Fundamentals">
      {/* ── 10.1 The Power of Generics ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Type Parameters (<T>): Fill-in-the-Blank Types"
          description="Generics allow you to write reusable functions, interfaces, and classes that work with any data type while preserving 100% type safety and autocomplete."
          color="primary"
        />

        <AnalogyBox emoji="📦" title="Think about it like this">
          Think of a standard Shipping Container. The container itself has a standard shape, locking mechanism, and transport tracking (<code className="text-ds-info-dark">ApiResponse&lt;T&gt;</code>).
          <p className="mt-2">
            You can load the container with laptops, coffee beans, or cars. But the shipping manifest strictly specifies <code className="text-ds-info-dark">Container&lt;Laptops&gt;</code>, so when the destination port opens it, they know with 100% certainty that laptops are inside — not random unknown goods!
          </p>
        </AnalogyBox>

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-error-light/30 flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-error-dark mb-2 flex items-center gap-2">
                <span>😫</span> Without Generics (Pain &amp; Repetition)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                You must duplicate the response structure for every single database entity:
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                code={`interface UserResponse {
  success: boolean;
  data: User;
}

interface ProductResponse {
  success: boolean;
  data: Product;
}

interface OrderResponse {
  success: boolean;
  data: Order;
}`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-success-light/30 flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-success-dark mb-2 flex items-center gap-2">
                <span>✨</span> With Generics (One Definition for All)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Define ONE wrapper, and pass the specific payload type inside the angle brackets:
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                code={`interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

// Reused effortlessly for any entity:
type UserResponse    = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
type OrderResponse   = ApiResponse<Order>;`}
                language="typescript"
              />
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 10.2 Generic Functions & Classes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Generic Functions & Data Stores"
          description="Write utility functions and in-memory stores that adapt to whatever type they are given."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Generic Memory Cache</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Universal Generic Memory Cache
class MemoryCache<T> {
  private store = new Map<string, T>();

  set(key: string, value: T): void {
    this.store.set(key, value);
    console.log(\`📦 Cached key: "\${key}"\`);
  }

  get(key: string): T | undefined {
    return this.store.get(key);
  }
}

interface UserProfile {
  id: number;
  name: string;
}

// 1. Create a cache strictly for UserProfiles
const userCache = new MemoryCache<UserProfile>();
userCache.set("user:101", { id: 101, name: "Mehedi" });

const cachedUser = userCache.get("user:101");
if (cachedUser) {
  console.log(\`✅ Autocomplete works! User: \${cachedUser.name}\`);
}

// 2. Create a cache strictly for numeric counters
const counterCache = new MemoryCache<number>();
counterCache.set("pageViews", 45200);
console.log(\`✅ Counter: \${counterCache.get("pageViews")}\`);`}
            height="320px"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How Generics are Used in NestJS Repositories</SectionHeading>
          <EnhancedCodeBlock
            code={`import { Injectable } from '@nestjs/common';

// Standard NestJS Paginated Response Wrapper
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class BaseDataService<T> {
  protected items: T[] = [];

  findAll(): PaginatedResult<T> {
    return {
      items: this.items,
      total: this.items.length,
      page: 1,
      pageSize: 10,
    };
  }

  create(item: T): T {
    this.items.push(item);
    return item;
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="What is the difference between using a Generic `<T>` and using `any`?"
          answer="With `any`, TypeScript disables type checking and forgets what data is inside. With a Generic `<T>`, TypeScript remembers the exact type you passed (e.g. `ApiResponse<User>`) and provides full autocomplete, refactoring safety, and compile-time validation on `response.data`."
        />
      </div>
    </SectionContainer>
  );
}
