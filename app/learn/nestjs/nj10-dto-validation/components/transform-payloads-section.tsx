"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — AUTO-TRANSFORMING PAYLOADS (transform: true)
// ═══════════════════════════════════════════════════════════

export function TransformPayloadsSection() {
  return (
    <SectionContainer number={7} title="Auto-Transforming Payloads (transform: true)">
      {/* ── 7.1 The URL String Problem ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Auto-Casting Query Strings and URL Parameters"
          description="HTTP query strings and route params always arrive as strings. transform: true converts them automatically!"
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔄</span> The Problem: URL Query Strings Are Always Strings!
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            When a client requests <code>/products?limit=10&amp;page=2</code>, Express receives <code>&quot;10&quot;</code> and <code>&quot;2&quot;</code> as strings!
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed mb-3">
            If your DTO expects a number with <code>@IsInt()</code>, validation will fail unless you enable <strong>transform: true</strong>!
          </p>
          <EnhancedCodeBlock
            code={`app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true, // ⭐ Automatically casts query params and JSON into typed DTO instances!
  }),
);`}
            language="typescript"
          />
        </WhyBox>
      </div>

      <Divider />

      {/* ── 7.2 Pagination DTO Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A Pagination Query DTO with @Type"
          description="Look at how @Type converts string query params into real JavaScript numbers."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number) // ⭐ Converts string "1" -> number 1
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number) // ⭐ Converts string "10" -> number 10
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}`}
          language="typescript"
        />

        <div className="my-8">
          <SectionHeading>🚀 Try It Yourself: Type Transformation Simulation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function parseQueryPayload(rawQuery: Record<string, string>) {
  const parsed = {
    page: Number(rawQuery.page) || 1,
    limit: Number(rawQuery.limit) || 10,
    isActive: rawQuery.isActive === "true"
  };

  console.log("Raw query (all strings):", rawQuery);
  console.log("Transformed types:      ", {
    pageType: typeof parsed.page,
    limitType: typeof parsed.limit,
    activeType: typeof parsed.isActive
  });

  return parsed;
}

const result = parseQueryPayload({ page: "3", limit: "25", isActive: "true" });
console.log("Final transformed object:", result);`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="What ValidationPipe option automatically converts primitive payload values to their TypeScript target types?"
          answer="'transform: true'"
        />
      </div>
    </SectionContainer>
  );
}
