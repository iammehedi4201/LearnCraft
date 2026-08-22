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
// PART 11 — GENERIC CONSTRAINTS & KEYOF
// ═══════════════════════════════════════════════════════════

export function SectionGenericConstraints() {
  return (
    <SectionContainer number={11} title="Generic Constraints & keyof">
      {/* ── 11.1 Constraining Types with extends ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Generic Constraints (<T extends Base>)"
          description="Sometimes you want a generic function to accept any type, BUT with one condition: it must have certain required properties (like an 'id' or 'length')."
          color="primary"
        />

        <AnalogyBox emoji="🛂" title="Think about it like this">
          Think of an International Airport VIP Lounge. Anyone from any country is welcome (<code className="text-ds-info-dark">Generic &lt;T&gt;</code>), <em>provided</em> they hold a valid Gold Loyalty Card (<code className="text-ds-info-dark">extends HasLoyaltyCard</code>).
          <p className="mt-2">
            The constraint ensures that whatever object arrives, you can safely access <code className="text-ds-info-dark">item.id</code> or <code className="text-ds-info-dark">item.name</code> without TypeScript complaining.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Generic Constraints with extends</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`interface HasId {
  id: string | number;
}

// T can be ANY type, as long as it has an 'id' property!
function printEntitySummary<T extends HasId>(entity: T): string {
  return \`📌 Entity ID: #\${entity.id} (Type: \${typeof entity.id})\`;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: string;
  total: number;
}

console.log(printEntitySummary<Product>({ id: 101, name: "Keyboard", price: 99 }));
console.log(printEntitySummary<Order>({ id: "ord_9901", total: 450 }));

// Try passing an object without an 'id' to see TypeScript stop you:
// printEntitySummary({ title: "No ID here!" }); // ❌ Error! Property 'id' is missing.`}
            height="310px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 11.2 The 'keyof' Operator & Type-Safe Property Access ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The 'keyof' Operator & Safe Property Extractors"
          description="'keyof T' extracts all the property names of an interface into a strict union of string literals, preventing typo bugs when reading object properties dynamically."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🔑</span> What is keyof T?
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Extracts the literal keys of an object:
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={11}
                code={`interface User {
  id: number;
  username: string;
  email: string;
}

// UserKeys is: "id" | "username" | "email"
type UserKeys = keyof User;

let key: UserKeys = "email"; // ✅ Valid
// key = "password"; // ❌ Error`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🛡️</span> Safe getProperty&lt;T, K&gt;
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Guarantees the key exists on the object and infers the exact return type:
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={11}
                code={`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 101, username: "mehedi" };
const username = getProperty(user, "username"); // Inferred string!`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How keyof is Used in NestJS Query Filters</SectionHeading>
          <EnhancedCodeBlock
            code={`// Type-safe sorting query helper
export interface SortOptions<T> {
  sortBy: keyof T; // Can only sort by real columns on entity T!
  order: 'ASC' | 'DESC';
}

interface ArticleEntity {
  id: number;
  title: string;
  viewCount: number;
  createdAt: Date;
}

// ✅ Valid sort options:
const validSort: SortOptions<ArticleEntity> = {
  sortBy: 'createdAt',
  order: 'DESC',
};`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="What does `<T, K extends keyof T>` mean in a function signature?"
          answer="It means: `T` is an object type, and `K` must be one of the exact property names existing on `T`. It prevents passing non-existent property names and lets TypeScript guarantee the exact return type `T[K]`."
        />
      </div>
    </SectionContainer>
  );
}
