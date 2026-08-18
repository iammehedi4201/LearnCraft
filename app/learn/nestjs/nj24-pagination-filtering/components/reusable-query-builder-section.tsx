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
// MODULE 9 — REUSABLE PAGINATION HELPER UTILITY
// ═══════════════════════════════════════════════════════════

export function ReusableQueryBuilderSection() {
  return (
    <SectionContainer number={9} title="Building a Reusable Pagination Helper Utility">
      {/* ── 9.1 Generic Helper ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="DRY Pagination Across All Services"
          description="Build a universal paginate() function that works with any Prisma model."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛠️</span> The Universal paginate() Function
          </h4>
          <EnhancedCodeBlock
            code={`// src/common/utils/prisma-paginator.ts
export async function paginate<T, K>(
  model: {
    findMany: (args: any) => Promise<T[]>;
    count: (args: any) => Promise<number>;
  },
  args: { where?: K; orderBy?: any; page?: number; limit?: number; include?: any },
) {
  const page = Math.max(1, args.page || 1);
  const limit = Math.min(100, Math.max(1, args.limit || 10));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      where: args.where,
      orderBy: args.orderBy,
      include: args.include,
      skip,
      take: limit,
    }),
    model.count({ where: args.where }),
  ]);

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
}

// Consuming in ANY service in 1 clean line:
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PaginationQueryDto) {
    return paginate(this.prisma.user, { page: query.page, limit: query.limit });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the benefit of extracting pagination logic into a universal helper utility?"
          answer="It standardizes paginated response structure across your entire backend while reducing code duplication in every service to a single line."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
