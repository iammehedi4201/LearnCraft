"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — PRODUCTION COMPILATION WITH NEST BUILD
// ═══════════════════════════════════════════════════════════

export function MultiStageDockerfileSection() {
  return (
    <SectionContainer number={2} title="Production Compilation with nest build">
      {/* ── 2.1 Production Compilation ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Transpiling TypeScript to Optimized JavaScript"
          description="How nest build transpiles decorator metadata, bundles assets, and creates an optimized dist/ artifact."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`# Run in terminal:
npm run build

# Output generated in project root:
# dist/
# ├── app.module.js
# ├── app.module.d.ts
# ├── app.module.js.map
# ├── main.js
# ├── main.js.map
# └── users/
#     ├── users.controller.js
#     ├── users.service.js
#     └── users.module.js

# Accelerated Build with SWC (10x-20x faster compilation):
nest build -b swc`}
          language="bash"
        />

        <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mt-3 mb-4">
          In production, Node.js never executes TypeScript files directly with <code>ts-node</code>. Instead, it runs the compiled JavaScript output using the native V8 engine:
        </p>

        <EnhancedCodeBlock
          code={`// package.json scripts:
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main.js"
  }
}`}
          language="json"
        />

        <PredictOutputBox
          code={`// Why is running 'node dist/main.js' significantly faster than 'ts-node src/main.ts'?`}
          answer={`Predicted Performance Difference:

1. ts-node compiles TypeScript in-memory on every single server startup, adding 5-15 seconds of boot latency and consuming 150MB+ extra RAM.
2. 'node dist/main.js' executes pre-compiled, optimized plain V8 JavaScript with zero startup compilation overhead (~100ms boot time).`}
        />

        <EasyRuleCard rule="Always run 'nest build' before deploying and execute 'node dist/main.js' in production environments." />

        <QuickCheck
          question="What does the SWC builder flag ('nest build -b swc') do?"
          answer="It replaces the standard TypeScript tsc compiler with the Rust-based SWC compiler, reducing compilation times by up to 20x while preserving decorator metadata."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
