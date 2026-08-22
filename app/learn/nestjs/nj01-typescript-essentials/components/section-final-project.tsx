"use client";

import { Collapsible } from "./collapsible";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  SummaryBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 18 — FINAL CAPSTONE PROJECT
// ═══════════════════════════════════════════════════════════

export function SectionFinalProject() {
  return (
    <SectionContainer number={18} title="Final Capstone Project: Enterprise Type Engine">
      <div className="mb-10 p-6 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏆</span>
          <h3 className="text-xl font-black text-ds-text-strong">
            Build an Enterprise E-Commerce Type Engine
          </h3>
        </div>
        <p className="text-sm text-ds-text-sub leading-relaxed">
          In this capstone project, you will build a complete, production-grade TypeScript engine for an E-Commerce backend. This project utilizes <strong>ALL TypeScript concepts</strong> covered in this module: Primitives, String Enums, Interfaces, Utility Types (<code className="text-ds-feature-base">Omit</code>, <code className="text-ds-feature-base">Partial</code>, <code className="text-ds-feature-base">Pick</code>), Generics (<code className="text-ds-feature-base">&lt;T&gt;</code>), Constraints (<code className="text-ds-feature-base">extends</code>), Discriminated Unions, and Custom Type Guards.
        </p>
      </div>

      {/* ── Step 1: Enums & Constants ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Step 1 — Enums & Primitives"
          description="Define strict enums for product categories, order statuses, and payment gateways."
          color="primary"
        />

        <Collapsible title="📝 Step 1 Requirements">
          <ul className="text-xs text-ds-text-sub space-y-1 list-disc pl-5">
            <li>String Enum <code className="text-ds-feature-base">ProductCategory</code>: &apos;ELECTRONICS&apos;, &apos;CLOTHING&apos;, &apos;BOOKS&apos;, &apos;HOME&apos;</li>
            <li>String Enum <code className="text-ds-feature-base">OrderStatus</code>: &apos;PENDING&apos;, &apos;PROCESSING&apos;, &apos;SHIPPED&apos;, &apos;DELIVERED&apos;</li>
          </ul>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 2: DTO Pipeline ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Step 2 — Master Entities & DTO Pipeline"
          description="Define the master ProductEntity and derive Create and Update DTOs with utility types."
          color="sky"
        />

        <Collapsible title="📝 Step 2 Requirements">
          <ul className="text-xs text-ds-text-sub space-y-1 list-disc pl-5">
            <li><code className="text-ds-feature-base">ProductEntity</code>: id (string), name (string), price (number), category (ProductCategory), stock (number), createdAt (Date).</li>
            <li><code className="text-ds-feature-base">CreateProductDto</code>: Omit id and createdAt.</li>
            <li><code className="text-ds-feature-base">UpdateProductDto</code>: Partial of CreateProductDto.</li>
          </ul>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 3: Generic API Wrapper & Discriminated Payments ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Step 3 — Generic Wrappers & Discriminated Unions"
          description="Build a universal ApiResponse<T> wrapper and a type-safe payment processor."
          color="purple"
        />

        <Collapsible title="📝 Step 3 Requirements">
          <ul className="text-xs text-ds-text-sub space-y-1 list-disc pl-5">
            <li><code className="text-ds-feature-base">ApiResponse&lt;T&gt;</code>: success (boolean), data: T, timestamp: string</li>
            <li>Discriminated Union <code className="text-ds-feature-base">PaymentMethod</code>: Credit Card, PayPal, or Crypto</li>
            <li>Type Guard function <code className="text-ds-feature-base">isCreditCardPayment</code></li>
          </ul>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Full Interactive Playground ── */}
      <div className="mb-16">
        <SectionHeading>🚀 Live Interactive Project Runner</SectionHeading>
        <p className="text-sm text-ds-text-sub mb-4">
          The complete, runnable E-Commerce Type Engine is loaded below. Experiment with adding products, updating inventory, and executing orders:
        </p>

        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`// ─── 1. Enums ───
enum ProductCategory {
  ELECTRONICS = "ELECTRONICS",
  CLOTHING = "CLOTHING",
  BOOKS = "BOOKS",
}

enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
}

// ─── 2. Master Product Entity & DTOs ───
interface ProductEntity {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: Date;
}

type CreateProductDto = Omit<ProductEntity, "id" | "createdAt">;
type UpdateProductDto = Partial<CreateProductDto>;

// ─── 3. Generic API Response Wrapper ───
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

// ─── 4. Discriminated Union for Payments ───
type PaymentMethod =
  | { type: "CARD"; cardNumber: string; expiry: string }
  | { type: "PAYPAL"; email: string }
  | { type: "CRYPTO"; walletAddress: string };

function processPayment(method: PaymentMethod, amount: number): string {
  switch (method.type) {
    case "CARD":
      return \`💳 Charged $\${amount} to Card ending in \${method.cardNumber.slice(-4)}\`;
    case "PAYPAL":
      return \`🅿️ Charged $\${amount} to PayPal account \${method.email}\`;
    case "CRYPTO":
      return \`₿ Transferred $\${amount} in Crypto to \${method.walletAddress}\`;
  }
}

// ─── 5. Test the Complete Type Engine ───
const newProduct: CreateProductDto = {
  name: "NestJS Architecture Handbook",
  price: 39.99,
  category: ProductCategory.BOOKS,
  stock: 120,
};

const response = createApiResponse(newProduct);
console.log("📦 API Response Wrapper:", response);

const paymentReceipt = processPayment(
  { type: "CARD", cardNumber: "4111-2222-3333-4444", expiry: "12/28" },
  newProduct.price
);
console.log("🧾 Payment Receipt:", paymentReceipt);`}
          height="420px"
        />

        <div className="mt-8">
          <SummaryBox>
            🎉 <strong>Congratulations!</strong> You have successfully built a full-stack TypeScript engine with strict DTOs, generic wrappers, and polymorphic payment handlers.
          </SummaryBox>
        </div>
      </div>
    </SectionContainer>
  );
}
