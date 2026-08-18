"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — AUTO HTTP CACHING WITH CACHEINTERCEPTOR
// ═══════════════════════════════════════════════════════════

export function AutoCachingInterceptorsSection() {
  return (
    <SectionContainer number={4} title="Auto HTTP Caching with CacheInterceptor">
      {/* ── 4.1 CacheInterceptor ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Zero-Boilerplate Route Response Caching"
          description="Automatically cache GET responses using CacheInterceptor, @CacheKey, and @CacheTTL."
          color="rose"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ProductsService } from './products.service';

@Controller('products')
@UseInterceptors(CacheInterceptor) // ⭐ Automatically caches all GET routes in this controller
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('featured')
  @CacheKey('featured_products_list') // Custom static Redis cache key
  @CacheTTL(120 * 1000)               // Cache for 2 minutes (120,000 ms)
  async getFeaturedProducts() {
    // This heavy database query only runs ONCE every 2 minutes:
    return this.productsService.computeHeavyTrendingCatalog();
  }

  @Get(':id')
  // Dynamic default cache key based on route path: /products/42
  async getProductById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// 10,000 concurrent users request GET /products/featured over 30 seconds.
// How many times is 'computeHeavyTrendingCatalog()' executed?`}
          answer={`Predicted Execution Outcome:\n\nExecuted EXACTLY 1 time!\n\nThe 1st request computes the catalog and writes it to Redis. The remaining 9,999 requests hit CacheInterceptor and return the JSON response from Redis in 0.8ms without touching PostgreSQL or the service!`}
        />

        <QuickCheck
          question="Does CacheInterceptor automatically cache POST, PUT, or DELETE requests?"
          answer="No, CacheInterceptor strictly caches safe HTTP GET requests by default, preventing mutation routes from caching."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
