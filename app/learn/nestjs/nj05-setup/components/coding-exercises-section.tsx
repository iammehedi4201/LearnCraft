"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={11} title="Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Test your NestJS setup knowledge live! Write your solutions in the interactive playgrounds below and click <strong>Check</strong> to verify your work.
        </p>
      </div>

      {/* ── Exercise 1: Customizing bootstrap() ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Customizing main.ts</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "setup-ex-01",
              title: "1. Configure Server Port & API Prefix",
              instructions: `Implement the 'bootstrapServer' function:
1. Call 'app.setGlobalPrefix("api/v2")'.
2. Call 'app.enableCors()'.
3. Call 'app.listen(8080)' and return the result.`,
              starterCode: `class MockApp {
  public prefix = "";
  public cors = false;
  public port = 0;

  setGlobalPrefix(p: string) { this.prefix = p; }
  enableCors() { this.cors = true; }
  listen(port: number) { this.port = port; return "Running on " + port; }
}

function bootstrapServer(app: MockApp) {
  // Your code here:
}

const app = new MockApp();
bootstrapServer(app);
console.log("Configured:", app);`,
              solutionCode: `class MockApp {
  public prefix = "";
  public cors = false;
  public port = 0;

  setGlobalPrefix(p: string) { this.prefix = p; }
  enableCors() { this.cors = true; }
  listen(port: number) { this.port = port; return "Running on " + port; }
}

function bootstrapServer(app: MockApp) {
  app.setGlobalPrefix("api/v2");
  app.enableCors();
  return app.listen(8080);
}

const app = new MockApp();
bootstrapServer(app);
console.log("Configured:", app);`,
              hints: [
                "Call app.setGlobalPrefix('api/v2').",
                "Call app.enableCors().",
                "Call app.listen(8080).",
              ],
              tests: [
                {
                  name: "Global prefix is set to api/v2",
                  code: `const a = new MockApp(); bootstrapServer(a); if (a.prefix !== "api/v2") throw new Error("Prefix should be api/v2");`,
                },
                {
                  name: "CORS is enabled",
                  code: `const a = new MockApp(); bootstrapServer(a); if (!a.cors) throw new Error("CORS must be enabled");`,
                },
                {
                  name: "Port is set to 8080",
                  code: `const a = new MockApp(); bootstrapServer(a); if (a.port !== 8080) throw new Error("Port must be 8080");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: HealthCheck Service & Controller ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Health Check Endpoint</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "setup-ex-02",
              title: "2. Health Check Controller & Service",
              instructions: `Build a HealthCheck setup:
1. 'HealthService': Has method 'getStatus()' returning '{ status: "ok", uptime: 100 }'.
2. 'HealthController': Accepts HealthService in constructor and has method 'check()' that calls and returns healthService.getStatus().`,
              starterCode: `class HealthService {
  // Your code here
}

class HealthController {
  // Your code here: receive HealthService in constructor
}

const service = new HealthService();
const controller = new HealthController(service);
console.log("Health check:", controller.check());`,
              solutionCode: `class HealthService {
  getStatus() {
    return { status: "ok", uptime: 100 };
  }
}

class HealthController {
  constructor(private healthService: HealthService) {}

  check() {
    return this.healthService.getStatus();
  }
}

const service = new HealthService();
const controller = new HealthController(service);
console.log("Health check:", controller.check());`,
              hints: [
                "HealthService.getStatus() returns { status: 'ok', uptime: 100 }.",
                "HealthController has constructor(private healthService: HealthService).",
                "HealthController.check() calls this.healthService.getStatus().",
              ],
              tests: [
                {
                  name: "HealthController returns health status",
                  code: `const s = new HealthService(); const c = new HealthController(s); const res = c.check(); if (!res || res.status !== "ok" || res.uptime !== 100) throw new Error("check() must return { status: 'ok', uptime: 100 }");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
