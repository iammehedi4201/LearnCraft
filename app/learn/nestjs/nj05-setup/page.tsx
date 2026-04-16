/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-05 — Project Setup & Architecture
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * NestJS provides a CLI to scaffold projects with a clean, opinionated folder
 * structure. Unlike Express where you build everything from scratch, NestJS
 * gives you a production-ready architecture from day one.
 *
 * NESTJS CONCEPT
 * ──────────────
 * nest new project-name creates a project with modules, controllers, services,
 * testing setup, linting, and TypeScript configuration out of the box.
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express: npm init + manually create folders + install 15 packages + configure TS.
 * NestJS: nest new → full project ready in 30 seconds.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ05Setup(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-05</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Project Setup & Architecture</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div>
                  <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">NestJS Concept</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS CLI scaffolds a full project with modules, controllers, services, testing, linting, and TypeScript configuration out of the box.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div>
                  <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express: npm init + manually create folders + install packages + configure TS. NestJS: one command → full project ready.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div>
                  <h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Under the Hood</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS uses Express (or Fastify) under the hood as the HTTP server. It's a framework ON TOP of Express, not a replacement.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div>
                  <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Set up a NestJS project, understand the file structure, and see how it compares to an Express project.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
        </div>

        {/* Step 1: Installation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Install NestJS CLI & Create Project</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`# Install NestJS CLI globally
npm install -g @nestjs/cli

# Create new project
nest new my-api

# Select package manager when prompted:
# > npm / yarn / pnpm

# Start development server
cd my-api
npm run start:dev    # Hot-reload on file changes

# Server runs at http://localhost:3000
# Visit http://localhost:3000 → "Hello World!"`}
            </pre>
          </div>
        </section>

        {/* Step 2: Project Structure */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Project Structure Explained</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`my-api/
├── src/
│   ├── app.controller.ts      # Handles HTTP requests (routes)
│   ├── app.controller.spec.ts  # Unit tests for controller
│   ├── app.module.ts           # Root module — wires everything together
│   ├── app.service.ts          # Business logic
│   └── main.ts                 # Entry point — bootstraps the app
├── test/
│   ├── app.e2e-spec.ts         # End-to-end tests
│   └── jest-e2e.json           # E2E test config
├── node_modules/
├── nest-cli.json               # NestJS CLI configuration
├── package.json
├── tsconfig.json               # TypeScript configuration
├── tsconfig.build.json         # Build-specific TS config
└── .eslintrc.js                # Linting rules`}
            </pre>
          </div>
        </section>

        {/* Step 3: Entry Point */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Entry Point — main.ts</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// src/main.ts — the entry point of every NestJS app
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the NestJS application from the root module
  const app = await NestFactory.create(AppModule);
  
  // Listen on port 3000
  await app.listen(3000);
  console.log('Application running on http://localhost:3000');
}
bootstrap();

// 🔑 Key Concept:
// NestFactory.create() reads AppModule, discovers all modules,
// controllers, services, and wires them together automatically.
// This is Dependency Injection at work!`}
            </pre>
          </div>
        </section>

        {/* Step 4: The Module-Controller-Service Triangle */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. The Module → Controller → Service Triangle</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Every NestJS feature follows this pattern. Understanding it is understanding 80% of NestJS.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// 1️⃣ SERVICE — Business logic
// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()               // ← Marks as injectable (can be injected into other classes)
export class AppService {
  getHello(): string {
    return 'Hello World!';   // ← Pure business logic, no HTTP concerns
  }
}

// 2️⃣ CONTROLLER — HTTP layer
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()               // ← Marks as a controller (handles HTTP)
export class AppController {
  constructor(private readonly appService: AppService) {}
  // ☝️ Dependency Injection — NestJS automatically creates and injects AppService

  @Get()                     // ← Maps to GET /
  getHello(): string {
    return this.appService.getHello();
  }
}

// 3️⃣ MODULE — Wires it all together
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],               // Other modules this module depends on
  controllers: [AppController],  // Controllers this module provides
  providers: [AppService],    // Services/providers available for injection
})
export class AppModule {}`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-400">🔑 The Flow</h3>
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>HTTP Request → Controller</strong> (routes & params) <strong>→ Service</strong> (business logic) <strong>→ Response</strong>. The Module wires Controller and Service together. This separation is SRP in action.
            </p>
          </div>
        </section>

        {/* Express vs NestJS */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Express vs NestJS — Project Setup</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express Setup (manual)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`# 10+ manual steps
mkdir my-app && cd my-app
npm init -y
npm i express
npm i -D typescript ts-node nodemon
npm i -D @types/express @types/node
npx tsc --init
# Manually create folders:
mkdir src routes controllers services
# Create tsconfig.json manually
# Create nodemon.json manually
# Wire everything together manually

// src/index.ts
import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(3000);`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS Setup (1 command)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`# 1 command
nest new my-app

# ✅ You get:
# - TypeScript configured
# - ESLint configured
# - Jest testing configured
# - Hot-reload (start:dev)
# - Module/Controller/Service pattern
# - E2E test setup
# - Clean folder structure
# - .gitignore

// Everything is wired and ready
npm run start:dev
// → http://localhost:3000
// → "Hello World!"`}
              </pre>
            </div>
          </div>
        </section>

        {/* CLI Commands */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">6. Essential CLI Commands</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`# Generate a complete module (controller + service + module)
nest generate resource users
# Creates:
#   src/users/users.module.ts
#   src/users/users.controller.ts
#   src/users/users.service.ts
#   src/users/users.controller.spec.ts
#   src/users/users.service.spec.ts
#   src/users/dto/create-user.dto.ts
#   src/users/dto/update-user.dto.ts
#   src/users/entities/user.entity.ts

# Generate individual files
nest g controller users    # Just a controller
nest g service users       # Just a service
nest g module users        # Just a module
nest g guard auth          # A guard
nest g pipe validation     # A pipe
nest g interceptor logging # An interceptor

# Useful shortcuts
nest g res products        # resource (full CRUD)
nest g co orders           # controller
nest g s payments          # service`}
            </pre>
          </div>
        </section>

        {/* Mini Challenge */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Install NestJS CLI and create a new project called <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">task-api</code></li>
            <li>Run <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">nest generate resource tasks</code> to scaffold a Tasks module</li>
            <li>Start the dev server and verify you can hit <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">GET /tasks</code></li>
            <li>Explore the generated files — identify the Module, Controller, and Service</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Forgetting to add new modules to the <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">imports</code> array of AppModule — your routes won't work.</li>
            <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">npm run start</code> instead of <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">npm run start:dev</code> — you won't get hot-reload.</li>
            <li>Not understanding that NestJS uses Express under the hood — you can still access <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">req</code> and <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">res</code> when needed.</li>
          </ul>
        </section>

        {/* Next Step */}
        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            Your NestJS project is running! Move to <Link href="/learn/nestjs/nj06-modules" className="font-bold underline hover:text-emerald-600">NJ-06 — Modules</Link> to deep-dive into NestJS's organizational backbone.
          </p>
        </section>
      </div>
    </>
  );
}
