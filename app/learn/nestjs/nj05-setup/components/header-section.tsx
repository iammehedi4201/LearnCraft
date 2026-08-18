"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  SummaryBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE: WHY NESTJS SETUP MATTERS
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Project Setup & Architecture">
      {/* ── 1.1 Why NestJS Needs a CLI ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Why Does NestJS Give You a Project Setup?"
          description="In Express, you start with an empty file. In NestJS, you start with a complete, production-ready house."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏗️</span> The Difference Between Express and NestJS Setup
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            In Express.js, setting up a new TypeScript project is hard work. You have to:
          </p>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-xs text-ds-text-sub">
            <li>Run <code>npm init</code> and install 15 different libraries.</li>
            <li>Write your own <code>tsconfig.json</code> and TypeScript compiler settings.</li>
            <li>Decide folder names and file structure all by yourself.</li>
            <li>Configure nodemon, linter, tests, and build scripts.</li>
          </ul>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            NestJS solves this with ONE single command: <code>nest new my-api</code>.
          </p>
          <p className="text-xs text-ds-text-sub mt-1">
            In 30 seconds, you get a full project with TypeScript, hot reload, tests, and clean architecture already set up.
          </p>
        </WhyBox>

        <AnalogyBox emoji="🏡" title="Simple Real-Life Story: Empty Lot vs Pre-built House">
          <p>
            <strong>Express.js</strong> is like buying an empty piece of land with a pile of bricks. You have to lay the foundation, wire the electricity, and build every wall yourself.
          </p>
          <p className="mt-2">
            <strong>NestJS</strong> is like moving into a modern, fully furnished smart home. The water pipes, electricity, and rooms are already connected. You can start living (coding) immediately!
          </p>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 1.2 What you will learn ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="What You Will Master in This Lesson"
          description="By the end of this lesson, you will feel completely at home inside any NestJS project."
          color="sky"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-feature-base text-ds-static-white flex items-center justify-center font-black text-sm">1</span>
              <h5 className="font-bold text-sm text-ds-text-strong">The CLI</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">How to install the NestJS CLI and create new projects effortlessly.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-info-base text-ds-static-white flex items-center justify-center font-black text-sm">2</span>
              <h5 className="font-bold text-sm text-ds-text-strong">File Tour</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">Understand every file generated in <code>src/</code> in plain English.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-success-base text-ds-static-white flex items-center justify-center font-black text-sm">3</span>
              <h5 className="font-bold text-sm text-ds-text-strong">main.ts</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">Learn how the NestJS bootstrap function starts the HTTP server.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-warning-base text-ds-static-white flex items-center justify-center font-black text-sm">4</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Dev Server</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">Run your app with hot-reload using <code>npm run start:dev</code>.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-error-base text-ds-static-white flex items-center justify-center font-black text-sm">5</span>
              <h5 className="font-bold text-sm text-ds-text-strong">CLI Generators</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">Generate modules, controllers, and services with simple commands like <code>nest g co users</code>.</p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: A Simulated NestJS App</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Preview of how NestJS organizes your backend:

class AppService {
  getHello(): string {
    return "Hello World! Welcome to NestJS 🦁";
  }
}

class AppController {
  constructor(private readonly appService: AppService) {}

  handleRequest(): { status: number; message: string } {
    return {
      status: 200,
      message: this.appService.getHello()
    };
  }
}

// In NestJS, the framework wires this up for you:
const service = new AppService();
const controller = new AppController(service);

console.log("Server Response:", controller.handleRequest());`}
            height="360px"
          />
        </div>

        <SummaryBox>
          NestJS gives you a strong, opinionated structure so you can focus on building great features instead of configuring build tools.
        </SummaryBox>

        <QuickCheck
          question="What is the main benefit of using the NestJS CLI to create projects?"
          answer="It creates a complete, production-ready project with TypeScript, hot reload, testing, and clean architecture in just one command."
        />
      </div>
    </SectionContainer>
  );
}
