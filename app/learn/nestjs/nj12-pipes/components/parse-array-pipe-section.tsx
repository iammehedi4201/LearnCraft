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
// MODULE 7 — PARSEARRAYPIPE & BULK OPERATIONS
// ═══════════════════════════════════════════════════════════

export function ParseArrayPipeSection() {
  return (
    <SectionContainer number={7} title="ParseArrayPipe & Bulk Data Queries">
      {/* ── 7.1 ParseArrayPipe ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Parsing Comma-Separated Lists & Arrays"
          description="Convert query strings like ?ids=1,2,3 into typed arrays automatically."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📋</span> Bulk IDs &amp; Comma-Separated Values
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Clients frequently pass lists in URLs: <code>GET /orders?ids=101,102,103</code>.
            Using <code>ParseArrayPipe</code>, NestJS splits the string by comma and validates every single item against the specified type constructor:
          </p>
          <EnhancedCodeBlock
            code={`import { Controller, Get, Query, ParseArrayPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('bulk')
  findBulk(
    // Parses "?ids=1,2,3" into [1, 2, 3] of type number[]:
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return this.ordersService.findBulk(ids);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens if a client passes ?ids=1,abc,3 to the findBulk endpoint above?"
          answer="ParseArrayPipe throws a 400 Bad Request because 'abc' cannot be converted to a Number."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
