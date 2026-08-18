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
// MODULE 5 — PROGRAMMATIC CACHEMANAGER SERVICE INJECTION
// ═══════════════════════════════════════════════════════════

export function ProgrammaticCacheServiceSection() {
  return (
    <SectionContainer number={5} title="Programmatic Cache Injection in Services">
      {/* ── 5.1 Programmatic Cache ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Direct Key-Value Cache Manipulation"
          description="Inject the CACHE_MANAGER token for fine-grained cache reading, setting, and manual deletion."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💉</span> Service Cache-Aside Pattern
          </h4>
          <EnhancedCodeBlock
            code={`import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly prisma: PrismaService,
  ) {}

  async getUserProfile(userId: number) {
    const cacheKey = \`user_profile:\${userId}\`;

    // 1. Try reading from cache:
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    // 2. Cache Miss: Fetch from PostgreSQL:
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    // 3. Save to Redis with 5-minute TTL (300,000ms):
    await this.cache.set(cacheKey, user, 300 * 1000);
    return user;
  }

  async updateUser(userId: number, data: any) {
    const updated = await this.prisma.user.update({ where: { id: userId }, data });

    // ⭐ Cache Invalidation: Delete stale cached entry:
    await this.cache.del(\`user_profile:\${userId}\`);
    return updated;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the Cache-Aside pattern (also known as Lazy Loading)?"
          answer="The service first attempts to read data from the cache. On a cache hit, it returns immediately; on a cache miss, it reads from the database, writes the result to the cache, and returns it."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
