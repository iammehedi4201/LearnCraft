"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — SCOPE EXECUTION ORDER
// ═══════════════════════════════════════════════════════════

export function ScopeOrderSection() {
  return (
    <SectionContainer number={10} title="Scope Execution Order (Global → Controller → Method)">
      {/* ── 10.1 Hierarchy Rules ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How Binding Scopes Execute"
          description="Understand the exact priority when guards, pipes, or interceptors are bound at multiple levels."
          color="primary"
        />

        <ComparisonTable
          headers={["Component Type", "Execution Order Across Scopes"]}
          rows={[
            ["Middleware", "Global Middleware → Module Middleware"],
            ["Guards", "Global Guards → Controller Guards → Method Guards"],
            ["Interceptors (Pre)", "Global Interceptors → Controller Interceptors → Method Interceptors"],
            ["Pipes", "Global Pipes → Controller Pipes → Method Pipes → Parameter Pipes"],
            ["Route Handler", "Executes once all previous checks have passed"],
            ["Interceptors (Post)", "Method Interceptors → Controller Interceptors → Global Interceptors (Inside-Out)"],
            ["Exception Filters", "Method Filters → Controller Filters → Global Filters (Most specific first)"],
          ]}
        />

        <EasyRuleCard rule="Inbound checks execute Outside-In (Global first). Outbound responses & error filters execute Inside-Out (Most specific first)." />

        <PredictOutputBox
          code={`// main.ts
app.useGlobalGuards(new GlobalGuard()); // prints "1. Global Guard"

// users.controller.ts
@UseGuards(ControllerGuard) // prints "2. Controller Guard"
@Controller('users')
export class UsersController {
  @UseGuards(MethodGuard) // prints "3. Method Guard"
  @Get()
  findAll() {
    return ["Alice", "Bob"];
  }
}`}
          answer={`Predicted Execution Output:\n1. Global Guard\n2. Controller Guard\n3. Method Guard\n\nAll three guards run in order from most general (Global) to most specific (Method). If any guard returns false, subsequent guards and the handler are aborted!`}
        />

        <QuickCheck
          question="In what order do Exception Filters execute when catching an error?"
          answer="Method-level filters run first. If unhandled, Controller-level filters run second. Finally, Global filters run as the ultimate fallback."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
