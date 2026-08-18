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
// MODULE 3 — CURSOR-BASED PAGINATION (KEYS/BOOKMARKS)
// ═══════════════════════════════════════════════════════════

export function CursorPaginationSection() {
  return (
    <SectionContainer number={3} title="Cursor-Based Pagination (Infinite Scrolls)">
      {/* ── 3.1 Cursor Pagination ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="High-Performance Sequential Scrolling"
          description="How to paginate using unique IDs (cursors) without scanning skipped rows."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔖</span> Cursor Pagination Service Implementation
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Fetch <code>limit + 1</code> items. If <code>items.length &gt; limit</code>, pop the extra item and use its ID as the <code>nextCursor</code>:
          </p>
          <EnhancedCodeBlock
            code={`@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async getInfiniteFeed(cursor?: number, limit: number = 20) {
    const items = await this.prisma.post.findMany({
      take: limit + 1, // ⭐ Request 1 extra item to check if next page exists
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0, // ⭐ Skip the cursor item itself on subsequent pages
      orderBy: { id: 'desc' },
    });

    let nextCursor: number | null = null;
    if (items.length > limit) {
      const nextItem = items.pop(); // Remove the extra item
      nextCursor = nextItem!.id;
    }

    return {
      data: items,
      nextCursor,
      hasMore: nextCursor !== null,
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why do we fetch 'limit + 1' items in cursor-based pagination?"
          answer="To determine whether a next page exists (and extract the next cursor ID) without executing a separate expensive count() query."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
