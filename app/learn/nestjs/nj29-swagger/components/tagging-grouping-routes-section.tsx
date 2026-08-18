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
// MODULE 7 — TAGGING & API VERSIONING IN SWAGGER
// ═══════════════════════════════════════════════════════════

export function TaggingGroupingRoutesSection() {
  return (
    <SectionContainer number={7} title="Route Tagging &amp; API Versioning">
      {/* ── 7.1 Tags & Versions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Organizing Enterprise APIs into Logical Domains"
          description="Group 100+ endpoints into collapsible domain sections and generate version-specific API docs."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> Grouping with @ApiTags
          </h4>
          <EnhancedCodeBlock
            code={`import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Billing & Subscriptions') // ⭐ Groups all methods under this header in Swagger UI
@Controller({ path: 'billing', version: '1' })
export class BillingController {
  @Get('invoices')
  @ApiOperation({ summary: 'List customer invoices' })
  getInvoices() {
    return [];
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens when you apply @ApiTags('Analytics') to a Controller class?"
          answer="All endpoints declared inside that controller will be visually grouped under a dedicated collapsible 'Analytics' section in Swagger UI."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
