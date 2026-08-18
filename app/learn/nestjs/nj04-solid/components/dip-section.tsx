"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  MistakeBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 6 — D: DEPENDENCY INVERSION PRINCIPLE
// ═══════════════════════════════════════════════════════════

export function DipSection() {
  return (
    <SectionContainer number={6} title="D — Dependency Inversion Principle">
      {/* ── 1. What does it mean? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Does It Mean?"
          description="Don't create your dependencies inside your class. Receive them from the outside!"
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            If your class needs a helper (like an email sender), do <strong>not</strong> write <code>new EmailService()</code> inside your class. Instead, ask for it in your constructor. Someone outside will create it and give it to you.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Don't create your dependencies yourself; receive them from outside." />
      </div>

      <Divider />

      {/* ── 2. Bad Example vs Better Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Bad Example vs Better Example: The Email Service"
          description="Let's see why creating objects with 'new' inside a class causes problems."
          color="sky"
        />

        <MistakeBox
          title="Creating the Helper Inside the Class"
          description="UserService is directly creating EmailService. It is tightly glued to EmailService, so you cannot easily test or replace it."
          wrong={`class EmailService {
  sendEmail() {
    console.log("Email sent!");
  }
}

class UserService {
  // ❌ Problem: UserService creates EmailService directly!
  private emailService = new EmailService();

  notifyUser() {
    this.emailService.sendEmail();
  }
}`}
          right={`class EmailService {
  sendEmail() {
    console.log("Email sent!");
  }
}

class UserService {
  // ✅ Better: UserService receives EmailService from outside!
  constructor(private emailService: EmailService) {}

  notifyUser() {
    this.emailService.sendEmail();
  }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Passing Dependencies from Outside</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class EmailService {
  sendEmail(message: string) {
    console.log("📨 [REAL EMAIL] " + message);
  }
}

// In unit tests, you can make a fake tester:
class FakeEmailService {
  sendEmail(message: string) {
    console.log("🧪 [TEST FAKE] Logged message for testing.");
  }
}

class UserService {
  // Receives the email helper in constructor:
  constructor(private emailService: any) {}

  notifyUser(name: string) {
    this.emailService.sendEmail("Hello " + name + "! Welcome.");
  }
}

// 1. In real production:
const realMailer = new EmailService();
const realUser = new UserService(realMailer);
realUser.notifyUser("Mehedi");

// 2. In automated tests:
const fakeMailer = new FakeEmailService();
const testUser = new UserService(fakeMailer);
testUser.notifyUser("TestUser");`}
            height="440px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            The dependency is provided from outside instead of being created inside the class. This makes testing easy and allows you to swap helpers without changing <code>UserService</code>.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection: Dependency Injection"
          description="How NestJS automates this principle for you."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🦁</span> NestJS Dependency Injection
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            In NestJS, you write:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-4 rounded-xl text-xs font-mono border border-ds-stroke-soft mb-3">
{`@Injectable()
export class UserService {
  constructor(
    private readonly emailService: EmailService
  ) {}
}`}
          </pre>
          <p className="text-xs text-ds-feature-dark font-bold">
            NestJS creates the dependency and gives it to UserService automatically!
          </p>
          <p className="text-xs text-ds-text-sub mt-1">
            You never have to call <code>new EmailService()</code> yourself. NestJS handles everything behind the scenes.
          </p>
        </WhyBox>

        <QuickCheck
          question="What is the easy rule for the Dependency Inversion Principle (D)?"
          answer="Don't create your dependencies yourself; receive them from outside."
        />
      </div>
    </SectionContainer>
  );
}
