"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (PRODUCTION BUILD & HEALTH)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Production Build &amp; Health Checks">
      {/* ── 1.1 Why Production Build ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="From Development Server to Production-Ready Node.js Runtime"
          description="Compiling NestJS with nest build, executing optimized JavaScript with node dist/main.js, and monitoring uptime with @nestjs/terminus."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> Production Readiness in NestJS
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In development, <code>npm run start:dev</code> continuously reloads your TypeScript source code. In production, your application must operate reliably at enterprise scale:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>Compiled Execution:</strong> Build with <code>nest build</code> and execute pre-compiled JavaScript with <code>node dist/main.js</code> for maximum V8 performance.</li>
            <li><strong>Automated Health Probes:</strong> Expose liveness and readiness endpoints with <code>@nestjs/terminus</code> to allow orchestrators to monitor memory and responsiveness.</li>
            <li><strong>Graceful Shutdown:</strong> Drain in-flight HTTP requests and close socket handles cleanly on termination signals.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Airplane Pre-Flight &amp; Cruising Altitude">
          <p className="mb-2">
            Think of the transition to production like an airplane journey:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Development (Hangar Maintenance):</strong> Engineers test engines, change parts, and tweak settings while the plane is parked.
            </li>
            <li>
              <strong>Compilation &amp; Build (Pre-Flight Checklist):</strong> All tools are packed away, doors seal shut, and flight systems lock into flight mode (<code>nest build</code>).
            </li>
            <li>
              <strong>Production Cruising (In Flight):</strong> The airplane cruises efficiently on twin engines with avionics continuously reporting health telemetry (<code>@nestjs/terminus</code>).
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Never run 'start:dev' in production. Always build first with 'nest build', execute 'node dist/main.js', and configure @nestjs/terminus health endpoints." />

        <QuickCheck
          question="Why must you compile NestJS before running in production rather than using ts-node?"
          answer="ts-node compiles TypeScript in-memory on every startup, consuming significant RAM and slowing boot times. 'node dist/main.js' executes pre-compiled JavaScript instantly with full V8 optimization."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
