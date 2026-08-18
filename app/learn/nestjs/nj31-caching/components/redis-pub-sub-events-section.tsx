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
// MODULE 9 — MULTI-TIER CACHING & REDIS PUB/SUB
// ═══════════════════════════════════════════════════════════

export function RedisPubSubEventsSection() {
  return (
    <SectionContainer number={9} title="Multi-Tier Caching &amp; Redis Pub/Sub Sync">
      {/* ── 9.1 Pub/Sub Sync ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Synchronizing In-Memory Caches Across Microservice Replicas"
          description="Broadcast cache invalidation events across all Kubernetes pods in real time."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📡</span> Redis Pub/Sub Invalidation Subscriber
          </h4>
          <EnhancedCodeBlock
            code={`import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheSyncService implements OnModuleInit {
  private publisher = new Redis(process.env.REDIS_URL);
  private subscriber = new Redis(process.env.REDIS_URL);
  private localMemoryCache = new Map<string, any>();

  onModuleInit() {
    // ⭐ Subscribe to central invalidation broadcast channel:
    this.subscriber.subscribe('cache:invalidation:channel');

    this.subscriber.on('message', (channel, key) => {
      // Invalidate local in-memory L1 cache immediately when any server pod broadcasts:
      this.localMemoryCache.delete(key);
    });
  }

  async broadcastInvalidation(key: string) {
    this.localMemoryCache.delete(key);
    // Notify all other running pods across the cluster:
    await this.publisher.publish('cache:invalidation:channel', key);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is an L1/L2 multi-tier cache architecture?"
          answer="L1 is ultra-fast in-memory cache inside the Node.js process (0.01ms); L2 is a centralized shared Redis cache (1ms). Redis Pub/Sub synchronizes L1 invalidations across all instances."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
