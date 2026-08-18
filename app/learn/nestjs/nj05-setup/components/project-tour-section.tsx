"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  AnalogyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — PROJECT TOUR: EVERY FILE EXPLAINED
// ═══════════════════════════════════════════════════════════

export function ProjectTourSection() {
  return (
    <SectionContainer number={3} title="Project Tour: Every File Explained">
      {/* ── 3.1 The Project File Tree ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Anatomy of a NestJS Project"
          description="When you create a project, NestJS sets up a clean, organized folder structure."
          color="primary"
        />

        <div className="mb-8 p-5 bg-[#0B0E17] dark:bg-[#07090E] rounded-2xl border border-ds-stroke-soft font-mono text-xs text-[#F1F5F9] leading-relaxed shadow-inner">
          <p className="text-ds-feature-base font-bold mb-2">📁 my-first-api/</p>
          <p>├── 📁 <span className="text-ds-info-base font-bold">src/</span> <span className="text-ds-text-soft"># All your application code lives here</span></p>
          <p>│   ├── 📄 <strong className="text-ds-feature-dark">main.ts</strong> <span className="text-ds-text-soft"># The entry point (Starts the server)</span></p>
          <p>│   ├── 📄 <strong className="text-ds-info-dark">app.module.ts</strong> <span className="text-ds-text-soft"># The root module (Central hub)</span></p>
          <p>│   ├── 📄 <strong className="text-ds-success-dark">app.controller.ts</strong> <span className="text-ds-text-soft"># Handles HTTP routes (GET /)</span></p>
          <p>│   ├── 📄 <strong className="text-ds-warning-dark">app.service.ts</strong> <span className="text-ds-text-soft"># Business logic (Returns data)</span></p>
          <p>│   └── 📄 <strong className="text-ds-text-disabled">app.controller.spec.ts</strong> <span className="text-ds-text-soft"># Unit test for the controller</span></p>
          <p>├── 📁 <span className="text-ds-text-soft font-bold">test/</span> <span className="text-ds-text-soft"># End-to-end (e2e) integration tests</span></p>
          <p>├── 📄 <span className="text-ds-text-strong font-bold">nest-cli.json</span> <span className="text-ds-text-soft"># NestJS CLI build configuration</span></p>
          <p>├── 📄 <span className="text-ds-text-strong font-bold">package.json</span> <span className="text-ds-text-soft"># Project scripts and dependencies</span></p>
          <p>└── 📄 <span className="text-ds-text-strong font-bold">tsconfig.json</span> <span className="text-ds-text-soft"># TypeScript compiler settings</span></p>
        </div>

        <AnalogyBox emoji="🏢" title="Simple Real-Life Story: The Office Building">
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-strong">
            <li><code>main.ts</code> is the <strong>Front Entrance</strong> where the building power turns on.</li>
            <li><code>app.module.ts</code> is the <strong>Main Switchboard</strong> connecting all departments.</li>
            <li><code>app.controller.ts</code> is the <strong>Front Desk Receptionist</strong> greeting visitors.</li>
            <li><code>app.service.ts</code> is the <strong>Office Worker</strong> getting the actual work done in the back.</li>
          </ul>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 3.2 Detailed File Explanations ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Every File in the 'src/' Folder"
          description="Let's look at what each core file in src/ does in simple English."
          color="sky"
        />

        <ComparisonTable
          headers={["File Name", "Role in Plain English", "What It Contains"]}
          rows={[
            ["main.ts", "The Entry Point", "Creates the Nest application using NestFactory and starts listening on port 3000."],
            ["app.module.ts", "The Root Module", "Groups controllers and providers together so NestJS knows they exist."],
            ["app.controller.ts", "The Route Handler", "Defines HTTP endpoints (like @Get()) and returns responses."],
            ["app.service.ts", "The Business Service", "Contains functions that do calculations or fetch data (like getHello())."],
            ["app.controller.spec.ts", "The Unit Test", "Automated Jest test to verify that the controller returns 'Hello World!'."],
          ]}
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Important Config Files in the Root
          </h4>
          <div className="space-y-3 text-xs text-ds-text-sub leading-relaxed">
            <p>
              <strong>tsconfig.json:</strong> Configures TypeScript. It automatically enables <code>&quot;experimentalDecorators&quot;: true</code> and <code>&quot;emitDecoratorMetadata&quot;: true</code>, which are required for NestJS decorators to work.
            </p>
            <p>
              <strong>nest-cli.json:</strong> Tells the Nest CLI how to build your project and where source files live (<code>&quot;sourceRoot&quot;: &quot;src&quot;</code>).
            </p>
          </div>
        </WhyBox>

        <QuickCheck
          question="Which file in a NestJS project is the actual starting entry point where the server boots up?"
          answer="src/main.ts (it contains the bootstrap() function that calls NestFactory.create(AppModule) and app.listen(3000))."
        />
      </div>
    </SectionContainer>
  );
}
