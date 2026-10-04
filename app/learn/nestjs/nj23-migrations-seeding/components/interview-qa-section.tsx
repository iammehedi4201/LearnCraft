"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (LIFECYCLE & SEEDING)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Walk through the complete lifecycle sequence of a NestJS application from startup to shutdown.",
      a: "1. Module graph compilation and dependency resolution.\n2. onModuleInit() called on each provider and module in dependency order.\n3. onApplicationBootstrap() called once all modules are initialized.\n4. app.listen() starts the HTTP server listening on the configured port.\n5. Upon receiving SIGINT/SIGTERM (with enableShutdownHooks), beforeApplicationShutdown() fires.\n6. onModuleDestroy() and beforeApplicationShutdown() hooks clean up resources.\n7. Server closes and the process terminates cleanly.",
    },
    {
      q: "Q2: When would you use OnApplicationBootstrap instead of OnModuleInit?",
      a: "Use OnApplicationBootstrap when your initialization logic depends on other modules having already finished their own OnModuleInit routines (e.g., when an Auth module needs to verify that the Roles module has already seeded all default permission sets).",
    },
    {
      q: "Q3: How do you build a standalone CLI seeder without launching an HTTP listener?",
      a: "Use NestFactory.createApplicationContext(AppModule). This instantiates the full NestJS dependency injection container and executes OnModuleInit hooks without binding to a network port. You then resolve your SeederService, execute your seed, and call await app.close().",
    },
    {
      q: "Q4: Why does NestJS require an explicit call to app.enableShutdownHooks()?",
      a: "Listening to OS signals (SIGINT, SIGTERM) consumes system event listeners and can conflict with process managers (like PM2 or Docker). NestJS keeps shutdown hooks opt-in so developers have full control over signal handling.",
    },
    {
      q: "Q5: How do you ensure state seeding is strictly idempotent across test runs?",
      a: "By querying the repository for existing unique natural keys (such as email, username, or role name) before creating records, or by implementing an atomic upsert operation that updates existing records rather than failing on duplicate keys.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on NestJS Lifecycle">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={11}
          title="Senior-Level Architecture Questions"
          description="Master these frequently asked questions on lifecycle hooks, bootstrap sequence, and headless context."
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
