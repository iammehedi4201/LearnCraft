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
// MODULE 3 — INSTALLING & INITIALIZING PRISMA
// ═══════════════════════════════════════════════════════════

export function PrismaCliInstallSection() {
  return (
    <SectionContainer number={3} title="Installing & Initializing Prisma in NestJS">
      {/* ── 3.1 Setup Steps ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Step-by-Step Setup Guide"
          description="Install the Prisma CLI, runtime client, and generate configuration files."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💻</span> Terminal Setup Commands
          </h4>
          <EnhancedCodeBlock
            code={`# 1. Install Prisma CLI as a development dependency:
npm install prisma --save-dev

# 2. Install the Prisma Client runtime library:
npm install @prisma/client

# 3. Initialize Prisma configured for PostgreSQL:
npx prisma init --datasource-provider postgresql`}
            language="bash"
          />
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mt-4 mb-2">
            This creates two essential files in your repository:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><code>prisma/schema.prisma</code>: The main modeling file.</li>
            <li><code>.env</code>: Contains your database connection string URL.</li>
          </ul>
        </WhyBox>

        <QuickCheck
          question="What is the difference between the 'prisma' package and the '@prisma/client' package?"
          answer="'prisma' is the developer CLI tool (for migrations, formatting, studio). '@prisma/client' is the lightweight runtime library imported by NestJS services to execute queries."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
