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
// MODULE 2 — OFFSET-BASED PAGINATION (SKIP & TAKE)
// ═══════════════════════════════════════════════════════════

export function OffsetPaginationSection() {
  return (
    <SectionContainer number={2} title="Offset-Based Pagination (skip & take)">
      {/* ── 2.1 Offset Pagination ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Standard Page-Number Pattern"
          description="How to calculate skip and take with Promise.all for parallel total count."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📄</span> Service Implementation with Parallel Total Count
          </h4>
          <EnhancedCodeBlock
            code={`// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    // ⭐ Run query and count in parallel for maximum speed:
    const [data, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.post.count(),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is Promise.all() recommended when executing the findMany query and the count() query?"
          answer="Because both queries execute in parallel over the database connection pool simultaneously, cutting total HTTP response time in half."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
