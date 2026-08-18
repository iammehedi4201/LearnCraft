"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  StepList,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — CLI INSTALLATION & PROJECT CREATION
// ═══════════════════════════════════════════════════════════

export function CliInstallationSection() {
  return (
    <SectionContainer number={2} title="Installing the CLI & Creating Projects">
      {/* ── 2.1 Installing the CLI ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Installing the NestJS CLI"
          description="The NestJS CLI is a helper tool you install on your computer to create and manage NestJS projects."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> Step 1: Install Globally with NPM
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            Open your terminal (PowerShell, Command Prompt, or Terminal) and run:
          </p>
          <EnhancedCodeBlock
            code={`npm install -g @nestjs/cli`}
            language="bash"
          />
          <p className="text-xs text-ds-text-soft mt-3">
            <strong>Note:</strong> The <code>-g</code> flag means &quot;global&quot;. It allows you to run the <code>nest</code> command from any folder on your computer.
          </p>
        </WhyBox>

        <InfoCallout emoji="💡" title="Alternative: Don't Want to Install Globally?">
          <p>
            You can also create a new project without installing the CLI globally by using <code>npx</code>:
          </p>
          <div className="mt-2 font-mono text-xs text-ds-feature-dark font-bold">
            npx @nestjs/cli new my-api
          </div>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.2 Creating a Project ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Creating Your First Project Step by Step"
          description="Follow these simple steps to scaffold and start your new backend."
          color="sky"
        />

        <StepList
          steps={[
            {
              label: "Run the new command",
              note: "Replace 'my-first-api' with whatever name you want for your project.",
              code: "nest new my-first-api",
            },
            {
              label: "Choose your package manager",
              note: "The CLI will ask you: Which package manager would you like to use? Choose 'npm' (or pnpm/yarn).",
              code: "? Which package manager would you like to use? > npm",
            },
            {
              label: "Enter the project folder",
              note: "Navigate into the newly created project folder.",
              code: "cd my-first-api",
            },
            {
              label: "Start the development server",
              note: "Starts the server in watch mode so it automatically reloads when you change files.",
              code: "npm run start:dev",
            },
          ]}
        />

        <div className="mb-8 p-5 rounded-2xl bg-ds-success-lighter border border-ds-success-base">
          <h5 className="font-bold text-sm text-ds-success-dark mb-2 flex items-center gap-2">
            <span>🎉</span> Test Your Server in Your Browser!
          </h5>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            Open your web browser and go to:
          </p>
          <div className="mt-2 p-2.5 rounded-xl bg-ds-bg-white border border-ds-success-base font-mono text-xs font-bold text-ds-success-dark">
            http://localhost:3000
          </div>
          <p className="text-xs text-ds-text-strong mt-2">
            You will see the famous message: <strong>&quot;Hello World!&quot;</strong>
          </p>
        </div>

        <QuickCheck
          question="What command do you run to create a brand new NestJS project called 'store-backend'?"
          answer="nest new store-backend (or npx @nestjs/cli new store-backend)"
        />
      </div>
    </SectionContainer>
  );
}
