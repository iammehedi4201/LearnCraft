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
// MODULE 5 — TYPE-SAFE PAGINATION QUERY DTOS
// ═══════════════════════════════════════════════════════════

export function PaginationDtoSection() {
  return (
    <SectionContainer number={5} title="Type-Safe Pagination Query DTOs">
      {/* ── 5.1 Pagination DTO ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Validating & Transforming Query Parameters"
          description="Transform string query params ('?page=2&limit=25') into validated integers with class-transformer."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> The PaginationQueryDto Class
          </h4>
          <EnhancedCodeBlock
            code={`// src/common/dto/pagination-query.dto.ts
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number) // ⭐ Converts string "2" from URL into integer 2
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100) // ⭐ Prevents clients from requesting 100,000 items and crashing server!
  limit: number = 10;
}

// Controller usage:
@Get()
async findAll(@Query() query: PaginationQueryDto) {
  return this.postsService.findPaginated(query.page, query.limit);
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is @Type(() => Number) necessary on query DTO fields in NestJS?"
          answer="Because HTTP URL query parameters always arrive as strings in Express ('?page=2'); @Type(() => Number) transforms them into real JavaScript numbers before validation."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
