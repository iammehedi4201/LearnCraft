"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — RUNNING & DEVELOPING (NPM SCRIPTS)
// ═══════════════════════════════════════════════════════════

export function NpmScriptsSection() {
  return (
    <SectionContainer number={5} title="Running & Developing: NPM Scripts">
      {/* ── 5.1 Package.json Scripts ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Essential NPM Scripts"
          description="Every NestJS project comes with pre-configured scripts in package.json to run, build, and test your code."
          color="primary"
        />

        <ComparisonTable
          headers={["Script Command", "What It Does", "When to Use It"]}
          rows={[
            ["npm run start:dev", "Starts server in watch mode (auto-reloads on file save)", "Everyday development (99% of the time!)"],
            ["npm run build", "Compiles TypeScript files in src/ into JavaScript in dist/", "Before deploying to production"],
            ["npm run start:prod", "Runs compiled JavaScript from dist/main.js at full speed", "In production servers (Docker, AWS, Render)"],
            ["npm run start", "Starts the server once without auto-reloading", "Quick one-off runs"],
            ["npm run test", "Runs unit tests using Jest", "To verify your code is working properly"],
          ]}
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Why is 'npm run start:dev' so popular?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            In development, you want your server to restart immediately whenever you edit and save a file. <code>npm run start:dev</code> watches your <code>src/</code> folder and recompiles in milliseconds, so you don&apos;t have to manually stop and restart your terminal!
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 5.2 Behind the Scenes: The dist/ Folder ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Behind the Scenes: The dist/ Folder"
          description="Node.js cannot run TypeScript directly. NestJS compiles your TypeScript into plain JavaScript."
          color="sky"
        />

        <InfoCallout emoji="📂" title="Where Does Your Code Go When Built?">
          <p className="text-xs text-ds-text-strong leading-relaxed">
            When you run <code>npm run build</code>, NestJS reads all <code>.ts</code> files in <code>src/</code> and generates plain <code>.js</code> files inside a new folder called <code>dist/</code>.
          </p>
          <div className="mt-3 p-3 bg-[#0B0E17] dark:bg-[#07090E] rounded-xl font-mono text-xs text-[#F1F5F9] border border-ds-stroke-soft">
            <p>src/main.ts <span className="text-ds-feature-base">──(compiles to)──▶</span> dist/main.js</p>
            <p>src/app.module.ts <span className="text-ds-feature-base">──(compiles to)──▶</span> dist/app.module.js</p>
          </div>
          <p className="text-xs text-ds-text-sub mt-2">
            In production, Node.js runs <code>node dist/main.js</code>, which starts instantly without needing a TypeScript compiler!
          </p>
        </InfoCallout>

        <QuickCheck
          question="Which command should you always use while writing code locally on your laptop?"
          answer="npm run start:dev (It watches for file changes and restarts automatically whenever you save)."
        />
      </div>
    </SectionContainer>
  );
}
