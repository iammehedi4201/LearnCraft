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
// MODULE 3 — DOCKER-COMPOSE PRODUCTION STACK
// ═══════════════════════════════════════════════════════════

export function DockerComposeProductionSection() {
  return (
    <SectionContainer number={3} title="Full Production Stack with Docker Compose">
      {/* ── 3.1 Docker Compose ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Orchestrating NestJS, PostgreSQL &amp; Redis"
          description="A complete production-ready docker-compose.yml with health checks and persistent volumes."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🐳</span> docker-compose.prod.yml
          </h4>
          <EnhancedCodeBlock
            code={`version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:secretpassword@postgres:5432/learncraft?schema=public
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: learncraft
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
  redisdata:`}
            language="yaml"
          />
        </WhyBox>

        <QuickCheck
          question="Why is 'condition: service_healthy' essential in depends_on?"
          answer="It ensures the NestJS API container does NOT start until PostgreSQL and Redis have fully booted, accepted socket connections, and passed their internal health checks."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
