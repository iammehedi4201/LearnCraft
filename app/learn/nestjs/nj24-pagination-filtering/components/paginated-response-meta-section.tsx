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
// MODULE 6 — STANDARDIZED PAGINATED RESPONSE ENVELOPE
// ═══════════════════════════════════════════════════════════

export function PaginatedResponseMetaSection() {
  return (
    <SectionContainer number={6} title="Standardized Paginated Response Envelope">
      {/* ── 6.1 Meta Envelope ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Consistent API Response Envelope"
          description="Build reusable generic metadata envelopes for all paginated endpoints across your application."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`createPaginatedResponse([/* 10 items */], 95, 10, 10);`}
          answer={`Predicted Return Meta:\n{\n  data: [...],\n  meta: {\n    total: 95,\n    page: 10,\n    limit: 10,\n    totalPages: 10,\n    hasNextPage: false,\n    hasPrevPage: true\n  }\n}`}
        />

        <QuickCheck
          question="Why is wrapping paginated arrays inside a { data, meta } envelope better than returning raw arrays?"
          answer="Because it provides frontend clients with total item counts, total pages, and navigation booleans needed to render pagination buttons without extra API calls."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
