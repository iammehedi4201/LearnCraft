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
// MODULE 1 — THE BIG PICTURE (CONFIGURATION & ENVIRONMENTS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Configuration &amp; Environments">
      {/* ── 1.1 Why Config Matters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 12-Factor App Configuration Rule"
          description="Strict separation of code and configuration — running the exact same Docker image across local, staging, and production."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔌</span> Never Hardcode Environment Constants
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Hardcoding database passwords, API keys, or port numbers inside your TypeScript files (<code>const port = 3000</code>) creates two massive vulnerabilities:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>Security Breach:</strong> Committing real secrets to Git repos leaks production database passwords.</li>
            <li><strong>Inflexibility:</strong> You have to recompile and rewrite code every time you switch between local laptop testing, staging, and production servers.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Chameleon &amp; Universal Travel Adapter">
          <p className="mb-2">
            Think of environment configuration like a <strong>Universal Travel Adapter</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Your App is the Laptop:</strong> The laptop hardware and software stay 100% identical wherever you fly in the world.
            </li>
            <li>
              <strong>The Environment is the Wall Outlet:</strong> In London it plugs into 230V UK sockets; in Tokyo it plugs into 100V Japan sockets.
            </li>
            <li>
              <strong>The ConfigModule is the Adapter:</strong> It safely reads local wall power variables (<code>PORT</code>, <code>DATABASE_URL</code>, <code>REDIS_HOST</code>) and feeds your app the exact clean data it needs to run anywhere!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Import ConfigModule.forRoot({ isGlobal: true }) in AppModule, and validate every single variable at startup so the app fails fast if a secret is missing." />

        <QuickCheck
          question="What is the 12-Factor App principle regarding configuration?"
          answer="Store all configuration in environment variables, completely separated from source code, so the exact same build artifact runs unchanged in any environment."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
