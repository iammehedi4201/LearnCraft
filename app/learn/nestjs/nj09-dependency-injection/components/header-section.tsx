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
// MODULE 1 — THE BIG PICTURE: WHAT IS DEPENDENCY INJECTION?
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: What is Dependency Injection?">
      {/* ── 1.1 What is Dependency Injection? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is Dependency Injection (DI)?"
          description="Dependency Injection means: Don't create your tools inside your class. Let someone hand them to you from the outside!"
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> The Problem DI Solves
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            Imagine if every class in your application had to create its own database connection, email sender, and payment gateway using <code>new Database()</code>.
          </p>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            If you change your database settings, you would have to edit 50 different files!
          </p>
          <p className="text-xs text-ds-text-sub mt-2">
            With <strong>Dependency Injection</strong>, NestJS creates the database connection <em>once</em> and hands that same connection to every service that asks for it.
          </p>
        </WhyBox>

        <AnalogyBox emoji="🚗" title="Simple Real-Life Story: The Car Assembly Line">
          <p>
            When a car is being built in a factory, the car body does <strong>not</strong> build its own engine or tires from scratch.
          </p>
          <p className="mt-2">
            Instead, the factory supply line <strong>delivers (injects)</strong> the finished engine and tires directly into the car chassis.
          </p>
          <p className="mt-2 font-bold text-ds-info-dark">
            NestJS is the smart factory supply line for your code!
          </p>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 1.2 Live Preview ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Tight Coupling vs Dependency Injection"
          description="See the difference in code."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Manual vs Injected Dependencies</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. A reusable tool (Provider)
class EmailNotifier {
  send(message: string) {
    console.log("📨 [EMAIL ALERT] " + message);
  }
}

// 2. Class receives tool from outside (Dependency Injection!)
class UserRegistrationService {
  constructor(private readonly notifier: EmailNotifier) {}

  register(username: string) {
    console.log("👤 Registered user: " + username);
    this.notifier.send("Welcome, " + username + "!");
  }
}

// The NestJS IoC container does this wiring automatically:
const emailTool = new EmailNotifier();
const service = new UserRegistrationService(emailTool);

service.register("Mehedi");`}
            height="400px"
          />
        </div>

        <SummaryBox>
          Dependency Injection gives you clean, modular, and loosely coupled code that is easy to test and swap.
        </SummaryBox>

        <QuickCheck
          question="What is the core rule of Dependency Injection in simple words?"
          answer="Don't create your dependencies inside your class with 'new'. Receive them from the outside (via constructor or property injection)!"
        />
      </div>
    </SectionContainer>
  );
}
