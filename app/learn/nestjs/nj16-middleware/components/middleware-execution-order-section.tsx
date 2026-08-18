"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — MIDDLEWARE EXECUTION ORDER
// ═══════════════════════════════════════════════════════════

export function MiddlewareExecutionOrderSection() {
  return (
    <SectionContainer number={9} title="Middleware Sequential Execution Order">
      {/* ── 9.1 Execution Sequence ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How Multiple Middlewares Run"
          description="Global middleware executes first, followed by module middleware in sequential order."
          color="primary"
        />

        <EasyRuleCard rule="Global middleware (app.use) always executes first. Module middleware executes strictly in the order listed inside apply()." />

        <PredictOutputBox
          code={`// 1. main.ts
app.use((req, res, next) => {
  console.log("1. Global Middleware");
  next();
});

// 2. app.module.ts
configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(MiddlewareA, MiddlewareB)
    .forRoutes('*');
}

// Middleware A: prints "2. Module Middleware A"
// Middleware B: prints "3. Module Middleware B"`}
          answer={`Predicted Console Log Output:\n1. Global Middleware\n2. Module Middleware A\n3. Module Middleware B\n4. (Request proceeds to Guards, Pipes, Controller)`}
        />

        <QuickCheck
          question="If you register consumer.apply(MiddlewareA, MiddlewareB), which one runs first?"
          answer="MiddlewareA runs first, and MiddlewareB runs second once MiddlewareA calls next()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
