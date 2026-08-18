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
// MODULE 2 — CACHE-MANAGER SETUP & IN-MEMORY STORE
// ═══════════════════════════════════════════════════════════

export function CacheManagerSetupSection() {
  return (
    <SectionContainer number={2} title="Installing &amp; Configuring CacheModule">
      {/* ── 2.1 CacheModule Setup ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Global In-Memory Cache Registration"
          description="Install @nestjs/cache-manager and configure default TTLs across all services."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> In-Memory Cache Configuration
          </h4>
          <EnhancedCodeBlock
            code={`# Step 1: Install official NestJS cache packages
npm install @nestjs/cache-manager cache-manager

// Step 2: Register globally in src/app.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,      // ⭐ Makes CACHE_MANAGER injectable everywhere!
      ttl: 30 * 1000,      // Default TTL: 30 seconds (milliseconds in CacheManager v5)
      max: 100,            // Max number of distinct items in memory (LRU eviction)
    }),
  ],
})
export class AppModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What happens when the in-memory cache reaches its 'max: 100' capacity limit?"
          answer="It uses the Least Recently Used (LRU) eviction algorithm to discard the oldest, least-accessed items to make room for new entries without exceeding RAM limits."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
