"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  StepList,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — THE INVERSION OF CONTROL (IoC) CONTAINER
// ═══════════════════════════════════════════════════════════

export function IocContainerSection() {
  return (
    <SectionContainer number={2} title="The Inversion of Control (IoC) Container">
      {/* ── 2.1 What is IoC? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How NestJS Wires Everything Automatically"
          description="Inversion of Control means you don't control the creation of objects — NestJS does!"
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧠</span> The 3-Step IoC Lifecycle
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-4">
            When your NestJS server boots up, the IoC Container runs a smart 3-step sequence:
          </p>

          <StepList
            steps={[
              {
                label: "1. Scan & Register",
                note: "NestJS reads all @Module({ providers, controllers }) declarations.",
              },
              {
                label: "2. Build Dependency Tree",
                note: "NestJS inspects constructor types to see who needs whom.",
              },
              {
                label: "3. Instantiate from Leaf to Root",
                note: "Creates bottom-level dependencies first (e.g. ConfigService), then passes them into higher-level classes (e.g. UsersController).",
              },
            ]}
          />
        </WhyBox>
      </div>

      <Divider />

      {/* ── 2.2 Dependency Tree Diagram ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The Dependency Graph Resolution"
          description="Look at how NestJS resolves dependencies in order."
          color="sky"
        />

        <div className="p-5 rounded-2xl bg-[#0B0E17] dark:bg-[#07090E] border border-ds-stroke-soft font-mono text-xs text-[#F1F5F9] mb-6 leading-relaxed">
          <div className="text-ds-feature-light font-bold mb-2">📦 Dependency Resolution Order:</div>
          <div>1. [Leaf] DatabaseService (has no dependencies) → Created first ✅</div>
          <div>2. [Mid]  UsersService (needs DatabaseService) → Injected with DatabaseService ✅</div>
          <div>3. [Root] UsersController (needs UsersService) → Injected with UsersService ✅</div>
        </div>

        <QuickCheck
          question="What is the Inversion of Control (IoC) container in NestJS?"
          answer="It is the core engine inside NestJS that scans classes, builds a dependency graph, creates instances in the correct order, and automatically passes them to constructors."
        />
      </div>
    </SectionContainer>
  );
}
