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
// MODULE 8 — DYNAMIC SORTING & ORDERING
// ═══════════════════════════════════════════════════════════

export function DynamicSortingSection() {
  return (
    <SectionContainer number={8} title="Dynamic Sorting & Whitelisting">
      {/* ── 8.1 Sorting ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Safe Dynamic Multi-Field Sorting"
          description="Allow clients to sort by price, date, or popularity while preventing SQL injection on column names."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📊</span> Whitelist-Validated Sorting Service
          </h4>
          <EnhancedCodeBlock
            code={`const ALLOWED_SORT_FIELDS = ['createdAt', 'title', 'price', 'views'] as const;
type SortField = typeof ALLOWED_SORT_FIELDS[number];

function buildOrderBy(sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc') {
  // ⭐ Security: Fallback to safe default if client passes invalid field name:
  const field: SortField = ALLOWED_SORT_FIELDS.includes(sortBy as any)
    ? (sortBy as SortField)
    : 'createdAt';

  return { [field]: sortOrder };
}

// In service findMany:
const products = await this.prisma.product.findMany({
  orderBy: buildOrderBy(query.sortBy, query.sortOrder),
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why must you always whitelist allowed sort field names before passing them to Prisma's orderBy?"
          answer="To prevent clients from requesting sorting on private columns (e.g. 'passwordHash') or throwing unhandled database errors on non-existent column names."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
