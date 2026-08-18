"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER CACHING MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Caching Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Redis Caching &amp; Invalidation Pitfalls"
          description="Avoid these common mistakes that serve stale user data or exhaust Redis memory."
          color="primary"
        />

        <MistakeBox
          title="Static Cache Keys on Parameterized Routes"
          description="Using a static key on an endpoint like /users/:id causes all users to receive user #1's profile data!"
          wrong={`// ❌ User 2 gets User 1's profile data!
@Get(':id')
@CacheKey('user_profile')
getUser(@Param('id') id: string)`}
          right={`// ✅ Dynamic key based on route parameter:
@Get(':id')
// Default key is automatically req.url: /users/1, /users/2
getUser(@Param('id') id: string)`}
        />

        <MistakeBox
          title="Forgetting Cache Invalidation on Mutations"
          description="Updating or deleting a database record without calling cache.del() results in stale ghost data."
          wrong={`// ❌ Database updated, but cache still serves old name:
async update(id: number, data: any) {
  return this.prisma.user.update({ where: { id }, data });
}`}
          right={`// ✅ Cache invalidated immediately on update:
async update(id: number, data: any) {
  const res = await this.prisma.user.update({ where: { id }, data });
  await this.cache.del(\`user:\${id}\`);
  return res;
}`}
        />

        <MistakeBox
          title="Omitting TTL Expiration Times"
          description="Caching keys indefinitely without TTL eventually fills Redis RAM to 100%, causing Out-Of-Memory eviction crashes."
          wrong={`// ❌ Key lives in Redis forever:
this.cache.set('orders', data);`}
          right={`// ✅ Explicit TTL with jitter:
this.cache.set('orders', data, 60 * 1000);`}
        />

        <QuickCheck
          question="Why should every cached Redis key have an explicit TTL expiration set?"
          answer="To prevent Redis RAM from leaking over time and ensure that if a cache invalidation hook fails, the system automatically self-heals when the TTL expires."
        />
      </div>
    </SectionContainer>
  );
}
