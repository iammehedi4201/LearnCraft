"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER PAGINATION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Pagination Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Query & Pagination Pitfalls"
          description="Avoid these common performance and validation blunders in NestJS APIs."
          color="primary"
        />

        <MistakeBox
          title="Omitting @Max Limit on Query DTOs (DoS Risk)"
          description="Without @Max(100), malicious clients can send ?limit=10000000 and exhaust server memory."
          wrong={`// ❌ Vulnerable to Denial of Service:
export class PaginationDto {
  @IsOptional()
  limit: number = 10;
}`}
          right={`// ✅ Capped at 100 max records per request:
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Max(100)
  limit: number = 10;
}`}
        />

        <MistakeBox
          title="Executing findMany and count Sequentially (Slow)"
          description="Awaiting queries sequentially doubles database round-trip latency."
          wrong={`// ❌ Slow: 2 sequential round-trips:
const data = await this.prisma.post.findMany({ skip, take });
const total = await this.prisma.post.count();`}
          right={`// ✅ Fast: Parallel execution cuts latency in half:
const [data, total] = await Promise.all([
  this.prisma.post.findMany({ skip, take }),
  this.prisma.post.count(),
]);`}
        />

        <MistakeBox
          title="Missing @Type(() => Number) on Query DTOs"
          description="In Express, URL query strings arrive as strings; skip calculation produces NaN or string bugs without Type transformer."
          wrong={`export class QueryDto { page: number; } // page is actually a string ("2")!`}
          right={`export class QueryDto { @Type(() => Number) page: number; } // page is integer (2)`}
        />

        <QuickCheck
          question="Why should every pagination DTO include a strict @Max(100) constraint on the limit field?"
          answer="To prevent client requests from asking for millions of records at once, protecting the backend against Out-Of-Memory crashes and database connection pool starvation."
        />
      </div>
    </SectionContainer>
  );
}
