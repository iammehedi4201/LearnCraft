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
// MODULE 7 — NODE.JS PRODUCTION RUNTIME TUNING
// ═══════════════════════════════════════════════════════════

export function CiCdGithubActionsSection() {
  return (
    <SectionContainer number={7} title="Node.js Production Runtime Tuning &amp; Memory Limits">
      {/* ── 7.1 Runtime Tuning ── */}
      <div className="mb-16">
        <TopicHeader
          number={7}
          title="Optimizing V8 Flags for NestJS Backends"
          description="How to tune memory limits, enable production sourcemaps, and configure the libuv threadpool."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Recommended Production Execution Command
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Running <code>node dist/main.js</code> with key runtime flags prevents out-of-memory (OOM) crashes and provides crystal-clear error stacks:
          </p>
          <EnhancedCodeBlock
            code={`# package.json
{
  "scripts": {
    "start:prod": "node --enable-source-maps --max-old-space-size=2048 dist/main.js"
  }
}

# Explanation of Flags:
# --enable-source-maps: Translates runtime stack traces from compiled JavaScript back to your original TypeScript line numbers!
# --max-old-space-size=2048: Allocates up to 2GB of V8 heap memory before the garbage collector triggers OOM crashes.`}
            language="bash"
          />

          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mt-4 mb-2">
            <strong>Threadpool Tuning for Crypto:</strong> If your API handles high volumes of password hashing (bcrypt/argon2), increase the default libuv threadpool from 4 to 8 or 16 threads:
          </p>
          <EnhancedCodeBlock
            code={`# Set in environment:
UV_THREADPOOL_SIZE=8 node dist/main.js`}
            language="bash"
          />
        </WhyBox>

        <QuickCheck
          question="Why is '--enable-source-maps' critical in production NestJS environments?"
          answer="Without it, error stack traces in production logs point to compiled dist/main.js line numbers. With source maps enabled, stack traces point directly to your original src/*.ts source code lines."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
