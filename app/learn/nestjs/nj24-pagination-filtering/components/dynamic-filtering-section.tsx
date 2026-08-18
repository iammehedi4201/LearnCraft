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
// MODULE 7 — DYNAMIC QUERY FILTERING IN PRISMA
// ═══════════════════════════════════════════════════════════

export function DynamicFilteringSection() {
  return (
    <SectionContainer number={7} title="Dynamic Query Filtering in Prisma">
      {/* ── 7.1 Dynamic Filters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Building Flexible Search & Filter Queries"
          description="Support case-insensitive text search, status filters, date ranges, and boolean toggles."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔍</span> Constructing Dynamic Where Clauses
          </h4>
          <EnhancedCodeBlock
            code={`// Building dynamic Prisma where object in NestJS Service:
import { Prisma } from '@prisma/client';

async searchArticles(filter: { search?: string; authorId?: number; published?: boolean }) {
  const where: Prisma.ArticleWhereInput = {};

  // 1. Partial case-insensitive text search on title or content:
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { content: { contains: filter.search, mode: 'insensitive' } },
    ];
  }

  // 2. Exact match filter on author:
  if (filter.authorId) {
    where.authorId = filter.authorId;
  }

  // 3. Boolean toggle:
  if (filter.published !== undefined) {
    where.published = filter.published;
  }

  return await this.prisma.article.findMany({ where });
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What does 'mode: insensitive' do when querying strings with Prisma in PostgreSQL?"
          answer="It performs case-insensitive search (matching 'nestjs', 'NestJS', and 'NESTJS' identically)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
