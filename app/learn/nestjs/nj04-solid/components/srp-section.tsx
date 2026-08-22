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
  InfoCallout,
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
          description="A class or module should own one cohesive responsibility—one main reason to change."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            Do not make one class own unrelated work. If registration rules, database storage, and email delivery change for different reasons, give those responsibilities clear boundaries.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Keep things that change for the same reason together; separate things that change for different reasons." />

        <InfoCallout emoji="💡" title="One Responsibility Does Not Mean One Method">
          <p>
            A focused class may have several methods. For example, <code>UserRepository</code> can have <code>save()</code>, <code>findById()</code>, and <code>delete()</code> because all three belong to user persistence.
          </p>
        </InfoCallout>
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
          description="This registration service owns business rules, persistence details, and email delivery. A change to any one of those concerns forces us to edit the same class."
          wrong={`type NewUser = { name: string; email: string };

class UserRegistrationService {
  register(user: NewUser): void {
    // Business rule
    if (!user.email.includes("@")) throw new Error("Invalid email");

    // Database detail
    console.log("INSERT user:", user.name);

    // Email delivery detail
    console.log("SMTP welcome email to:", user.email);
  }
}`}
          right={`type NewUser = { name: string; email: string };

class UserRepository {
  save(user: NewUser): void {
    console.log("INSERT user:", user.name);
  }
}

class WelcomeEmailSender {
  sendTo(email: string): void {
    console.log("SMTP welcome email to:", email);
  }
}

class UserRegistrationService {
  constructor(
    private users: UserRepository,
    private welcomeEmail: WelcomeEmailSender
  ) {}

  register(user: NewUser): void {
    if (!user.email.includes("@")) throw new Error("Invalid email");
    this.users.save(user);
    this.welcomeEmail.sendTo(user.email);
  }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Clean Separation in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`type NewUser = {
  name: string;
  email: string;
};

type SavedUser = NewUser & {
  id: number;
};

// Responsibility 1: user persistence
class UserRepository {
  save(user: NewUser): SavedUser {
    const saved = { ...user, id: 1 };
    console.log("💾 Saved " + saved.name + " to the database.");
    return saved;
  }
}

// Responsibility 2: welcome-email delivery
class WelcomeEmailSender {
  sendTo(email: string): void {
    console.log("📨 Sent welcome email to " + email);
  }
}

// Responsibility 3: the registration use case
class UserRegistrationService {
  constructor(
    private userRepo: UserRepository,
    private welcomeEmail: WelcomeEmailSender
  ) {}

  register(user: NewUser): SavedUser {
    console.log("👤 Registering user: " + user.name);
    const savedUser = this.userRepo.save(user);
    this.welcomeEmail.sendTo(savedUser.email);
    return savedUser;
  }
}

const repo = new UserRepository();
const mailer = new WelcomeEmailSender();
const registration = new UserRegistrationService(repo, mailer);

const user = registration.register({
  name: "Mehedi",
  email: "mehedi@learncraft.dev"
});

console.log("✅ Registration complete for user #" + user.id);`}
            height="460px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li>Persistence changes are kept inside <code>UserRepository</code>.</li>
            <li>Email-provider or template changes are kept inside <code>WelcomeEmailSender</code>.</li>
            <li><code>UserRegistrationService</code> stays focused on the order of the registration steps.</li>
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
            ["Controller (@Controller)", "Translates HTTP input/output and normally delegates the use case instead of containing persistence details."],
            ["Service (@Injectable)", "Coordinates business rules and use cases without depending on HTTP-specific objects."],
            ["Repository / gateway", "Hides database or external-service details behind a focused API."],
          ]}
        />

        <InfoCallout emoji="🏷️" title="What Those Decorators Mean Here">
          <p>
            <code>@Controller()</code> tells NestJS that a class handles routes. <code>@Injectable()</code> adds metadata that lets NestJS manage a provider. The decorators describe framework roles; SRP still comes from what you choose to put inside each class.
          </p>
        </InfoCallout>

        <QuickCheck
          question="What is the simple rule for the Single Responsibility Principle (S)?"
          answer="Keep one cohesive responsibility in a class or module. Several related methods are fine; unrelated reasons to change should usually be separated."
        />
      </div>
    </SectionContainer>
  );
}
