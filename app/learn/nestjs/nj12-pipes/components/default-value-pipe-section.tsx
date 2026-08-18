"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — DEFAULTVALUEPIPE & OPTIONAL PARAMETERS
// ═══════════════════════════════════════════════════════════

export function DefaultValuePipeSection() {
  return (
    <SectionContainer number={6} title="DefaultValuePipe & Optional Query Parameters">
      {/* ── 6.1 DefaultValuePipe ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Handling Optional Query Parameters Safely"
          description="How to provide sensible defaults for optional pagination and filter parameters."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> The Problem with Optional Numbers
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If a client calls <code>GET /products</code> without query params, <code>@Query(&apos;page&apos;, ParseIntPipe)</code> will receive <code>undefined</code> and throw a <strong>400 Bad Request</strong>!
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            Pairing <code>new DefaultValuePipe(defaultValue)</code> with <code>ParseIntPipe</code> solves this cleanly:
          </p>
          <EnhancedCodeBlock
            code={`import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAll(
    // If 'page' is missing from the query string, default to 1, then parse to number:
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    // If 'limit' is missing, default to 20, then parse to number:
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    // Default sorting string:
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
  ) {
    return this.productsService.findAll({ page, limit, sortBy });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="In what order should DefaultValuePipe and ParseIntPipe be specified in the decorator argument list?"
          answer="DefaultValuePipe MUST come FIRST (e.g. @Query('page', new DefaultValuePipe(1), ParseIntPipe)) so that undefined values are replaced with the default before ParseIntPipe attempts conversion."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
