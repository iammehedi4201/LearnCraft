"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (DEVOPS & DEPLOYMENT)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: How do you achieve Zero-Downtime rolling deployments with NestJS in Kubernetes?",
      a: "By combining three components: 1) Kubernetes Readiness Probes using @nestjs/terminus so traffic routes only after the app connects to PostgreSQL/Redis; 2) 'app.enableShutdownHooks()' so the old container drains in-flight requests on SIGTERM before stopping; and 3) RollingUpdate deployment strategy with maxSurge: 1, maxUnavailable: 0.",
    },
    {
      q: "Q2: Explain why Multi-Stage Docker builds are critical in production.",
      a: "Multi-stage builds separate the build environment (compilers, npm devDependencies, typescript) from the runtime environment. This produces ultra-small container images (~90MB vs 1.2GB), speeds up Kubernetes image pull times, and reduces the security attack surface.",
    },
    {
      q: "Q3: What is the difference between Liveness and Readiness probes in @nestjs/terminus?",
      a: "A Liveness probe determines if the container process is alive and responsive; if it fails, Kubernetes restarts the pod. A Readiness probe determines if the application is ready to accept incoming user traffic (e.g. database and Redis connections active); if it fails, the load balancer removes the pod from the routing pool.",
    },
    {
      q: "Q4: Why should Node.js containers use dumb-init or tini as PID 1?",
      a: "Node.js was not designed to act as an operating system init process (PID 1). It does not automatically forward Unix signals (SIGTERM, SIGINT) to child processes or reap orphaned zombie child processes. dumb-init properly forwards signals for graceful shutdown.",
    },
    {
      q: "Q5: How should Prisma database migrations be run in automated CI/CD pipelines?",
      a: "Migrations should be executed as a pre-deployment step or Kubernetes Init Container using 'npx prisma migrate deploy'. This applies pending migrations deterministically without interactive prompts and ensures database schema updates complete before new container code starts serving traffic.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Senior DevOps Interview Questions">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior Backend &amp; DevOps Interview Questions"
          description="Master these frequently asked questions on container architecture, Kubernetes lifecycle, and zero-downtime deployments."
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
