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
// MODULE 4 — TERMINUS HEALTH CHECKS (KUBERNETES PROBES)
// ═══════════════════════════════════════════════════════════

export function TerminusHealthChecksSection() {
  return (
    <SectionContainer number={4} title="Terminus Health Checks &amp; Probes">
      {/* ── 4.1 Terminus Health ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Liveness &amp; Readiness Probes with @nestjs/terminus"
          description="Expose /health endpoints that report database connectivity, memory, and disk health."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🩺</span> HealthController Implementation
          </h4>
          <EnhancedCodeBlock
            code={`# Install Terminus health package:
npm install @nestjs/terminus

// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private memory: MemoryHealthIndicator,
  ) {}

  // 1. Liveness Probe (Kubernetes checks if container process is alive):
  @Get('live')
  @HealthCheck()
  checkLiveness() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024), // Max 300MB heap
    ]);
  }

  // 2. Readiness Probe (Load balancer checks if app is ready to take traffic):
  @Get('ready')
  @HealthCheck()
  checkReadiness() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database', this.prisma), // Pings PostgreSQL
    ]);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the difference between a Liveness Probe and a Readiness Probe in Kubernetes?"
          answer="A Liveness probe checks if the container is alive (restarts it if frozen); a Readiness probe checks if the app is connected to dependencies like PostgreSQL (routes traffic only when ready)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
