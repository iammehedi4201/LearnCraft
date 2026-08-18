"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  ComparisonTable,
  MistakeBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 2 — S: SINGLE RESPONSIBILITY PRINCIPLE
// ═══════════════════════════════════════════════════════════

export function SrpSection() {
  return (
    <SectionContainer number={2} title="S — Single Responsibility Principle">
      {/* ── 1. What does it mean? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Does It Mean?"
          description="A class should have only one main job. It should have only one reason to change."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            Do not make one class do everything. If a class is managing user information, it should not also be saving to the database and sending emails. Give each job to its own class.
          </p>
        </WhyBox>

        <EasyRuleCard rule="One class = one main job." />
      </div>

      <Divider />

      {/* ── 2. Bad Example vs Better Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Bad Example vs Better Example"
          description="Let's see what happens when one class tries to do too many jobs."
          color="sky"
        />

        <MistakeBox
          title="One Class Doing 3 Different Jobs"
          description="This User class has 3 different jobs: creating user data, database saving, and sending emails. If any of those 3 things change, you have to edit this same class!"
          wrong={`class User {
  createUser() {
    // 1. Creates user in memory
    console.log("User created");
  }

  saveToDatabase() {
    // 2. Database query
    console.log("Saving to database...");
  }

  sendEmail() {
    // 3. Email sending
    console.log("Sending email...");
  }
}`}
          right={`// 1. Job 1: Handles user business logic
class UserService {
  createUser() { console.log("User created"); }
}

// 2. Job 2: Handles only database operations
class UserRepository {
  saveToDatabase() { console.log("Saving to database..."); }
}

// 3. Job 3: Handles only sending emails
class EmailService {
  sendEmail() { console.log("Sending email..."); }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Clean Separation in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Job 1: Only handles database storage
class UserRepository {
  save(name: string, email: string) {
    console.log("💾 Saved " + name + " to the database.");
  }
}

// Job 2: Only handles sending emails
class EmailService {
  sendWelcome(email: string) {
    console.log("📨 Sent welcome email to " + email);
  }
}

// Job 3: Only coordinates the user signup flow
class UserService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService
  ) {}

  register(name: string, email: string) {
    console.log("👤 Registering user: " + name);
    this.userRepo.save(name, email);
    this.emailService.sendWelcome(email);
    console.log("✅ Registration complete!");
  }
}

// Run the clean code:
const repo = new UserRepository();
const mailer = new EmailService();
const userService = new UserService(repo, mailer);

userService.register("Mehedi", "mehedi@learncraft.dev");`}
            height="460px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li>If you change your database from MySQL to MongoDB, you only change <code>UserRepository</code>.</li>
            <li>If you change your email design, you only change <code>EmailService</code>.</li>
            <li><code>UserService</code> stays safe and never breaks!</li>
          </ul>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection"
          description="How NestJS uses Single Responsibility in every application."
          color="emerald"
        />

        <p className="text-sm text-ds-text-sub leading-relaxed mb-4">
          NestJS splits your application into clean, separate parts:
        </p>

        <ComparisonTable
          headers={["NestJS File", "Its Only Job"]}
          rows={[
            ["Controller (@Controller)", "Receives HTTP requests and sends back answers. It does NOT talk to the database."],
            ["Service (@Injectable)", "Does the business logic and calculations. It does NOT handle HTTP request headers."],
            ["Repository / Entity", "Reads and writes data in the database."],
          ]}
        />

        <QuickCheck
          question="What is the simple rule for the Single Responsibility Principle (S)?"
          answer="One class = one main job."
        />
      </div>
    </SectionContainer>
  );
}
