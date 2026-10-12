"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 2 — BASIC & PRIMITIVE TYPES
// ═══════════════════════════════════════════════════════════

export function SectionBasicTypes() {
  return (
    <SectionContainer number={2} title="Basic & Primitive Types">
      {/* ── 2.1 The Core Primitives ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 3 Core Primitives"
          description="Every complex backend data structure is built out of the three fundamental primitives: string, number, and boolean."
          color="primary"
        />

        <AnalogyBox emoji="🏷️" title="Think about it like this">
          Think of variables as labeled storage bins in a warehouse:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>A bin labeled <strong className="text-ds-info-dark">string</strong> only holds text words and characters.</li>
            <li>A bin labeled <strong className="text-ds-info-dark">number</strong> only holds mathematical quantities (integers or decimals).</li>
            <li>A bin labeled <strong className="text-ds-info-dark">boolean</strong> only holds a true / false switch.</li>
          </ul>
          <p className="mt-2">
            If you try to drop a text string into a mathematical number bin, the warehouse manager (TypeScript) stops you right at the door.
          </p>
        </AnalogyBox>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-bold text-ds-feature-base uppercase tracking-wider block mb-1">
              1. string
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Text data wrapped in single quotes, double quotes, or backtick template literals.
            </p>
            <code className="text-[11px] font-mono text-ds-text-strong bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block">
              const email: string = &quot;dev@nest.com&quot;;
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-bold text-ds-feature-base uppercase tracking-wider block mb-1">
              2. number
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              All numbers in JS/TS: integers, floats, negatives, and scientific notation.
            </p>
            <code className="text-[11px] font-mono text-ds-text-strong bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block">
              const price: number = 49.99;
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-bold text-ds-feature-base uppercase tracking-wider block mb-1">
              3. boolean
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Binary logical flags: exactly <code className="text-ds-feature-base">true</code> or <code className="text-ds-feature-base">false</code>.
            </p>
            <code className="text-[11px] font-mono text-ds-text-strong bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block">
              const isVerified: boolean = true;
            </code>
          </div>
        </div>

        <MistakeBox
          title="Uppercase wrapper types (String, Number, Boolean)"
          description="Never use JavaScript's uppercase object wrappers (String, Number, Boolean) as type annotations. Always use the lowercase primitive keywords."
          wrong={`// ❌ WRONG: Refers to the Boxed Object Wrapper
let username: String = "Alice";
let count: Number = 10;`}
          right={`// ✅ RIGHT: Refers to the true primitive types
let username: string = "Alice";
let count: number = 10;`}
        />
      </div>

      <Divider />

      {/* ── 2.2 Type Inference vs Explicit Annotations ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Type Inference vs Explicit Annotations"
          description="TypeScript is smart enough to figure out types on its own without requiring you to manually type everything."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🤖</span> Type Inference (Automatic)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                When you initialize a variable with a value, TypeScript automatically infers its type. You don&apos;t need redundant annotations.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={7}
                code={`// Inferred as number automatically
let score = 100;

// ❌ TypeScript error: string != number
// score = "one hundred";`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>✍️</span> Explicit Annotation (Manual)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Use explicit annotations when declaring uninitialized variables, function parameters, or when enforcing strict interface contracts.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={7}
                code={`// Explicit type for uninitialized var
let totalRevenue: number;

// Function parameters need types
function calculateTax(subtotal: number): number {
  return subtotal * 0.15;
}`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <InfoCallout emoji="💡" title="Best Practice in NestJS">
          <p>
            Let TypeScript <strong>infer</strong> local variables, but <strong>always explicitly annotate</strong> function parameters, function return types, class properties, and DTO fields. This creates crystal-clear self-documenting code.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.3 Literal Types & Nullable Types ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Literal Types & Nullable Values"
          description="Lock down variables to exact permitted values and safely handle missing data with null and undefined."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🎯 Literal Types (Exact Value Constraints)</SectionHeading>
          <p className="text-sm text-ds-text-sub mb-4 leading-relaxed">
            Instead of allowing <em>any</em> string, a <strong>String Literal Type</strong> restricts a variable to a specific set of allowed strings using a union (<code className="text-ds-feature-base">|</code>).
          </p>

          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Define a strict union of string literals
type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

function updateOrderStatus(orderId: number, newStatus: OrderStatus): string {
  return \`📦 Order #\${orderId} is now marked as \${newStatus}\`;
}

// ✅ Valid status
console.log(updateOrderStatus(101, "PAID"));

// Try uncommenting the line below to see TypeScript reject invalid strings:
// updateOrderStatus(101, "PROCESSING"); // ❌ Error! Not in the allowed list.`}
            height="260px"
          />
        </div>

        <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft mb-8">
          <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Handling null and undefined with strictNullChecks
          </h5>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            In modern TypeScript and NestJS, <code className="text-ds-feature-base">null</code> and <code className="text-ds-feature-base">undefined</code> are separate types. A variable will never be silently null unless you explicitly allow it.
          </p>
          <EnhancedCodeBlock
            code={`// User nickname is either a string OR null (if user hasn't set one)
let nickname: string | null = null;

nickname = "NestPro"; // ✅ Allowed
// nickname = 123;     // ❌ Error: number is not assignable to string | null`}
            language="typescript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How Primitive Types are Used in NestJS</SectionHeading>
          <p className="text-sm text-ds-text-sub mb-3">
            In NestJS Controllers and Services, primitive types enforce request query parameters, route parameters, and response structures:
          </p>
          <EnhancedCodeBlock
            code={`import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  // @Param('id') is strictly typed as a string
  @Get(':id')
  getProductById(@Param('id') id: string): string {
    return \`Fetching details for product SKU: \${id}\`;
  }

  // @Query parameters with primitive return types
  @Get()
  searchProducts(
    @Query('keyword') keyword: string,
    @Query('inStock') inStock: boolean
  ): string {
    return \`Searching for "\${keyword}" (In stock only: \${inStock})\`;
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="What happens if you declare `let count = 0;` and then later do `count = 'five';`?"
          answer="TypeScript displays a compile-time error: 'Type string is not assignable to type number.' Because TypeScript used Type Inference to permanently assign the type 'number' to count upon initialization."
        />
      </div>
    </SectionContainer>
  );
}
