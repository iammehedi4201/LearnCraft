"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (CACHING & REDIS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how NestJS integrates Redis caching using CacheModule.",
      a: "NestJS uses '@nestjs/cache-manager' with 'cache-manager-redis-yet'. CacheModule.registerAsync() configures a shared Redis store using REDIS_URL. The CACHE_MANAGER token can then be injected into services, or routes can use CacheInterceptor for automatic HTTP response caching.",
    },
    {
      q: "Q2: What is the Cache Stampede (Thundering Herd) problem and how is it mitigated?",
      a: "Cache stampede occurs when a hot cache key expires and thousands of concurrent requests all experience a cache miss at the same millisecond, hammering the database with identical queries. It is mitigated by using Mutex locks (SET NX) so only one request recomputes the cache, and by applying TTL Jitter.",
    },
    {
      q: "Q3: What is the difference between Cache-Aside and Write-Through caching?",
      a: "Cache-Aside is reactive (data is loaded into cache only when a cache miss occurs); Write-Through is proactive (data is written to the database and the cache simultaneously on every write).",
    },
    {
      q: "Q4: How does Distributed Locking work with Redis?",
      a: "It uses atomic Redis commands like 'SET lock_key token NX PX 10000' to acquire an exclusive lock across multiple servers with a safety expiration time, and releases the lock using an atomic Lua script verifying the token.",
    },
    {
      q: "Q5: How do you invalidate cache entries across multiple Kubernetes pods when using in-memory caches?",
      a: "By using Redis Pub/Sub: when a mutation occurs on one pod, it broadcasts an invalidation event over a Redis channel, prompting all other pods to purge their local in-memory L1 cache keys.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Caching &amp; Redis">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on Redis architecture, distributed locking, and cache invalidation strategies."
          color="amber"
        />

        <div className="space-y-3">
          {qas.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm transition-all"
            >
              <div
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                <h4 className="font-bold text-xs sm:text-sm text-ds-text-strong">
                  {item.q}
                </h4>
                <button className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
                  {openIdx === idx ? "Hide" : "Answer"}
                </button>
              </div>

              {openIdx === idx && (
                <div className="mt-3 pt-3 border-t border-ds-stroke-soft text-xs sm:text-sm text-ds-text-sub whitespace-pre-wrap leading-relaxed animate-in fade-in duration-200">
                  <strong className="text-ds-text-strong block mb-1">Interview-Winning Answer:</strong>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </SectionContainer>
  );
}
