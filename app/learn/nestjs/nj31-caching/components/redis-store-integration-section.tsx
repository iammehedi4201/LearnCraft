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
// MODULE 3 — REDIS STORE INTEGRATION (DISTRIBUTED CACHE)
// ═══════════════════════════════════════════════════════════

export function RedisStoreIntegrationSection() {
  return (
    <SectionContainer number={3} title="Distributed Redis Store Integration">
      {/* ── 3.1 Redis Store ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Connecting to Centralized Redis Instances"
          description="Share cache state across 20+ backend Docker containers with cache-manager-redis-yet."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔴</span> Async Redis Cache Registration
          </h4>
          <EnhancedCodeBlock
            code={`# Install modern Redis store for cache-manager v5:
npm install cache-manager-redis-yet redis

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          url: config.get<string>('REDIS_URL', 'redis://localhost:6379'),
          ttl: 60 * 1000, // 60 seconds default TTL
        });
        return { store };
      },
    }),
  ],
})
export class AppModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is a centralized Redis store required when running multiple replicas of your NestJS application in production?"
          answer="Because an in-memory cache is isolated to a single Node.js process; a central Redis cluster allows all container instances to share and invalidate the exact same cached data."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
