"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — THE 4 PIPE BINDING SCOPES
// ═══════════════════════════════════════════════════════════

export function PipeScopesSection() {
  return (
    <SectionContainer number={5} title="The 4 Pipe Binding Scopes">
      {/* ── 5.1 The 4 Scopes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Where Can You Bind a Pipe?"
          description="Pipes can be scoped to an individual parameter, a method, a controller, or globally across the app."
          color="primary"
        />

        <ComparisonTable
          headers={["Scope Level", "Syntax Example", "Scope of Effect"]}
          rows={[
            ["1. Parameter Scope", "@Param('id', ParseIntPipe)", "Applies only to that specific method argument"],
            ["2. Method Scope", "@UsePipes(ValidationPipe) @Post()", "Applies to all arguments of that route handler"],
            ["3. Controller Scope", "@UsePipes(TrimPipe) @Controller()", "Applies to all route handlers inside that controller"],
            ["4. Global Scope", "app.useGlobalPipes(...) in main.ts", "Applies to every single route in the entire application"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// 1️⃣ Parameter Scope:
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {}

// 2️⃣ Method Scope:
@Post()
@UsePipes(new ValidationPipe({ whitelist: true }))
create(@Body() dto: CreateUserDto) {}

// 3️⃣ Controller Scope:
@Controller('users')
@UsePipes(TrimStringsPipe)
export class UsersController {}

// 4️⃣ Global Scope (in main.ts):
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));`}
          language="typescript"
        />

        <EasyRuleCard rule="Execution order of Pipes: Global Pipes → Controller Pipes → Method Pipes → Parameter Pipes." />

        <QuickCheck
          question="What is the recommended way to register a global pipe when the pipe itself requires Dependency Injection from another module?"
          answer="Register it as a provider in AppModule using: { provide: APP_PIPE, useClass: CustomPipe }."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
