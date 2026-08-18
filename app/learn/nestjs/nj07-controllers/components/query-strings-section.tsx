"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  ComparisonTable,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — QUERY STRINGS WITH @Query()
// ═══════════════════════════════════════════════════════════

export function QueryStringsSection() {
  return (
    <SectionContainer number={6} title="Query Strings with @Query()">
      {/* ── 6.1 What are Query Strings? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Reading Query Strings with @Query()"
          description="Query strings are optional key-value pairs added to the end of a URL after the question mark (?)."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔍</span> What are Query Strings used for?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            Query strings are used for <strong>searching, filtering, sorting, and pagination</strong>:
          </p>
          <div className="p-2.5 rounded-xl bg-ds-bg-white border border-ds-stroke-soft font-mono text-xs text-ds-feature-dark font-bold">
            GET /products?category=laptops&amp;limit=10&amp;sort=asc
          </div>
        </WhyBox>

        <EnhancedCodeBlock
          code={`import { Controller, Get, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  // Matches: GET /products?category=phones&limit=5
  @Get()
  findAll(
    @Query('category') category: string,
    @Query('limit') limit: number
  ) {
    return "Fetching " + (limit || 10) + " items in category: " + (category || "All");
  }

  // Or extract all queries into one object:
  @Get('search')
  search(@Query() query: any) {
    return query; // { q: "nest", page: "1" }
  }
}`}
          language="typescript"
        />

        <div className="mt-8">
          <ComparisonTable
            headers={["Type", "Example URL", "NestJS Decorator", "Best For"]}
            rows={[
              ["Route Parameter", "/users/42", "@Param('id')", "Identifying a specific single resource"],
              ["Query Parameter", "/users?role=admin", "@Query('role')", "Filtering, sorting, and pagination"],
            ]}
          />
        </div>
      </div>

      <Divider />

      {/* ── 6.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Filtering Data with Query Strings Live"
          description="Test how query parameters filter an array of products."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Product Filter by Category</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`const catalog = [
  { id: 1, name: "MacBook Pro", category: "laptop", price: 1999 },
  { id: 2, name: "Dell XPS", category: "laptop", price: 1499 },
  { id: 3, name: "iPhone 16", category: "phone", price: 999 },
  { id: 4, name: "Galaxy S24", category: "phone", price: 899 },
  { id: 5, name: "iPad Air", category: "tablet", price: 599 }
];

function filterProducts(query: { category?: string; maxPrice?: number }) {
  let results = catalog;

  if (query.category) {
    results = results.filter(p => p.category === query.category);
  }

  if (query.maxPrice) {
    results = results.filter(p => p.price <= query.maxPrice!);
  }

  return results;
}

console.log("All Laptops:        ", filterProducts({ category: "laptop" }));
console.log("Phones under $950:  ", filterProducts({ category: "phone", maxPrice: 950 }));`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="In the URL 'http://localhost:3000/orders?status=shipped&page=2', how do you extract the 'status' query param in NestJS?"
          answer="@Query('status') status: string"
        />
      </div>
    </SectionContainer>
  );
}
