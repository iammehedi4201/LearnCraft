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
// MODULE 8 — DISTRIBUTED LOCKING WITH REDIS
// ═══════════════════════════════════════════════════════════

export function DistributedLockingRedisSection() {
  return (
    <SectionContainer number={8} title="Distributed Locking with Redis (Redlock)">
      {/* ── 8.1 Distributed Lock ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Preventing Multi-Server Race Conditions"
          description="Enforce mutual exclusion across 10+ Docker containers for payments, inventory, and seat booking."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔐</span> Distributed Mutex Pattern
          </h4>
          <EnhancedCodeBlock
            code={`import { Injectable, ConflictException } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class SeatBookingService {
  private redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

  async bookConcertSeat(seatId: string, userId: string) {
    const lockKey = \`lock:seat:\${seatId}\`;
    const lockToken = \`user:\${userId}:\${Date.now()}\`;

    // ⭐ Atomic SET NX PX: Set key only if it DOES NOT exist (NX) with 10s expiration (PX 10000):
    const acquired = await this.redis.set(lockKey, lockToken, 'PX', 10000, 'NX');

    if (!acquired) {
      throw new ConflictException('This seat is currently being booked by another customer.');
    }

    try {
      // Execute payment and database mutation safely:
      return await this.finalizeBooking(seatId, userId);
    } finally {
      // Safe Lua script to release lock ONLY if token still matches (prevents deleting another user's lock):
      const unlockLua = \`
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      \`;
      await this.redis.eval(unlockLua, 1, lockKey, lockToken);
    }
  }

  private async finalizeBooking(seatId: string, userId: string) {
    return { status: 'CONFIRMED', seatId, userId };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why must distributed lock releases use a Lua script verifying the token rather than a simple 'redis.del(lockKey)'?"
          answer="If an operation takes longer than the lock TTL, the lock auto-expires and another client acquires it; using a Lua script ensures you only release the lock if you still own it."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
