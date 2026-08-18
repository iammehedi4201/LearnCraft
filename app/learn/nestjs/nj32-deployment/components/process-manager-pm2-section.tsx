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
// MODULE 6 — PROCESS MANAGEMENT & CLUSTER MODE WITH PM2
// ═══════════════════════════════════════════════════════════

export function ProcessManagerPm2Section() {
  return (
    <SectionContainer number={6} title="Process Management &amp; Cluster Mode with PM2">
      {/* ── 6.1 PM2 Cluster ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Multi-Core Utilization on VMs &amp; Bare-Metal Servers"
          description="Scale single-threaded Node.js across all available CPU cores with zero-downtime reloads."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> ecosystem.config.js
          </h4>
          <EnhancedCodeBlock
            code={`// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'learncraft-api',
      script: 'dist/main.js',
      instances: 'max',       // ⭐ Spawn 1 process per CPU core (e.g. 8 processes on an 8-core VM)
      exec_mode: 'cluster',   // Cluster mode enables Node.js IPC load balancing
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};

# Zero-downtime rolling reload command:
# pm2 reload ecosystem.config.js --env production`}
            language="javascript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the advantage of 'pm2 reload' over 'pm2 restart'?"
          answer="'pm2 reload' performs a zero-downtime rolling reload by restarting workers one by one while keeping the remaining workers active to serve incoming HTTP traffic."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
