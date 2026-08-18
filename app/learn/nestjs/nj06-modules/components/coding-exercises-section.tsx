"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your NestJS module knowledge into practice! Write your code in the interactive playgrounds and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Shared NotificationModule ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Shared Notification Service</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "module-ex-01",
              title: "1. Create & Export Notification Service",
              instructions: `Implement the following:
1. 'NotificationService': Has a method 'send(to: string, msg: string)' returning 'Sent to \${to}: \${msg}'.
2. 'NotificationModule': A class with properties 'providers: [NotificationService]' and 'exports: [NotificationService]'.`,
              starterCode: `class NotificationService {
  // Your code here
}

class NotificationModule {
  // Your code here: define providers and exports arrays
}`,
              solutionCode: `class NotificationService {
  send(to: string, msg: string) {
    return "Sent to " + to + ": " + msg;
  }
}

class NotificationModule {
  providers = [NotificationService];
  exports = [NotificationService];
}

const service = new NotificationService();
console.log(service.send("mehedi", "Welcome to NestJS!"));`,
              hints: [
                "NotificationService has send(to: string, msg: string) returning 'Sent to ' + to + ': ' + msg.",
                "NotificationModule class has providers = [NotificationService] and exports = [NotificationService].",
              ],
              tests: [
                {
                  name: "NotificationService sends messages",
                  code: `const s = new NotificationService(); if (s.send("alice", "hi") !== "Sent to alice: hi") throw new Error("send() output mismatch");`,
                },
                {
                  name: "NotificationModule exports the service",
                  code: `const m = new NotificationModule(); if (!m.exports || !m.exports.includes(NotificationService)) throw new Error("NotificationModule must export NotificationService");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Dynamic Mailer Module ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Dynamic MailerModule.forRoot()</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "module-ex-02",
              title: "2. Dynamic Mailer Module",
              instructions: `Implement dynamic configuration:
Create a class 'MailerModule' with a static method 'forRoot(options: { apiKey: string })' returning '{ module: "MailerModule", apiKey: options.apiKey, isConfigured: true }'.`,
              starterCode: `class MailerModule {
  // Your code here: static forRoot method
}

const config = MailerModule.forRoot({ apiKey: "sendgrid_12345" });
console.log("Configured:", config);`,
              solutionCode: `class MailerModule {
  static forRoot(options: { apiKey: string }) {
    return {
      module: "MailerModule",
      apiKey: options.apiKey,
      isConfigured: true,
    };
  }
}

const config = MailerModule.forRoot({ apiKey: "sendgrid_12345" });
console.log("Configured:", config);`,
              hints: [
                "Define static forRoot(options: { apiKey: string }).",
                "Return an object with module: 'MailerModule', apiKey: options.apiKey, and isConfigured: true.",
              ],
              tests: [
                {
                  name: "MailerModule.forRoot returns dynamic config",
                  code: `const res = MailerModule.forRoot({ apiKey: "test_key" }); if (!res || res.apiKey !== "test_key" || res.isConfigured !== true) throw new Error("forRoot did not return expected object");`,
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
