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
// MODULE 9 — THE INTERCEPTOR ONION ARCHITECTURE
// ═══════════════════════════════════════════════════════════

export function ExecutionOrderSection() {
  return (
    <SectionContainer number={9} title="The Interceptor Onion Architecture">
      {/* ── 9.1 The Onion Model ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Outside-In (Request) and Inside-Out (Response)"
          description="Understand how multiple nested interceptors wrap around each other."
          color="primary"
        />

        <EasyRuleCard rule="Inbound requests travel Outside-In (Global → Controller → Method). Outbound responses travel Inside-Out (Method → Controller → Global)." />

        <PredictOutputBox
          code={`// Interceptor A (Global)
intercept(context, next) {
  console.log("1. Interceptor A [BEFORE]");
  return next.handle().pipe(
    tap(() => console.log("6. Interceptor A [AFTER]"))
  );
}

// Interceptor B (Method-level)
intercept(context, next) {
  console.log("2. Interceptor B [BEFORE]");
  return next.handle().pipe(
    tap(() => console.log("5. Interceptor B [AFTER]"))
  );
}

// Handler
@Get()
@UseInterceptors(InterceptorB)
findAll() {
  console.log("3. Route Handler Executed");
  return ["data"];
}`}
          answer={`Predicted Console Execution Flow:\n\n1. Interceptor A [BEFORE] (Global)\n2. Interceptor B [BEFORE] (Method)\n3. Route Handler Executed\n4. (Controller returns payload)\n5. Interceptor B [AFTER] (Method)\n6. Interceptor A [AFTER] (Global)\n\nThe outer interceptor starts first and finishes last!`}
        />

        <QuickCheck
          question="Which interceptor's post-handler tap() or map() operator runs first: the global interceptor or the method interceptor?"
          answer="The method interceptor runs first on the response (Inside-Out), and the global interceptor runs last."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
