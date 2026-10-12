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
  InfoCallout,
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
          description="High-level business rules should depend on stable abstractions, not directly on low-level tools."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            A registration use case should care that it can send a message, not whether the message uses SMTP, SMS, or a test recorder. Both the use case and the concrete sender depend on a small TypeScript contract.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Let business logic depend on a contract; choose the concrete tool at the application boundary." />

        <InfoCallout emoji="🔁" title="DIP and DI Are Related, but Different">
          <p>
            <strong>Dependency Inversion</strong> is the design choice to depend on an abstraction. <strong>Dependency Injection</strong> is one technique for supplying an object from outside. Constructor injection of a concrete class is DI, but it becomes DIP only when the important code depends on a suitable abstraction.
          </p>
          <p className="mt-2">
            Using <code>new</code> is normal in a composition root—the place where an application is assembled—and for ordinary value objects. The warning sign is business logic constructing a replaceable infrastructure service internally.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2. Bad Example vs Better Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Bad Example vs Better Example: Message Delivery"
          description="Let's move a business service from a hard-coded SMTP tool to a small TypeScript contract."
          color="sky"
        />

        <MistakeBox
          title="Business Logic Chooses Its Own Infrastructure"
          description="UserService creates a concrete SMTP sender. Replacing email with SMS—or avoiding a real network call in a unit test—now requires editing UserService."
          wrong={`class SmtpEmailSender {
  send(message: string): void {
    console.log("SMTP email:", message);
  }
}

class UserService {
  // High-level code is tied to one low-level detail.
  private sender = new SmtpEmailSender();

  notifyUser(name: string): void {
    this.sender.send("Welcome, " + name);
  }
}`}
          right={`interface MessageSender {
  send(message: string): void;
}

class SmtpEmailSender implements MessageSender {
  send(message: string): void {
    console.log("SMTP email:", message);
  }
}

class UserService {
  constructor(private sender: MessageSender) {}

  notifyUser(name: string): void {
    this.sender.send("Welcome, " + name);
  }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Depending on a Contract</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`interface MessageSender {
  send(message: string): void;
}

class EmailMessageSender implements MessageSender {
  send(message: string): void {
    console.log("📨 [EMAIL] " + message);
  }
}

// A test double follows the same contract without sending anything.
class RecordingMessageSender implements MessageSender {
  readonly messages: string[] = [];

  send(message: string): void {
    this.messages.push(message);
  }
}

class UserService {
  constructor(private readonly sender: MessageSender) {}

  notifyUser(name: string): void {
    this.sender.send("Hello " + name + "! Welcome.");
  }
}

// The composition root chooses the production implementation.
const productionUsers = new UserService(new EmailMessageSender());
productionUsers.notifyUser("Mehedi");

// A test chooses a recording implementation.
const recorder = new RecordingMessageSender();
const testUsers = new UserService(recorder);
testUsers.notifyUser("TestUser");

console.log("🧪 Recorded:", recorder.messages);`}
            height="440px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            <code>UserService</code> knows only the <code>MessageSender</code> contract. Production and test code can choose different implementations without changing the business use case.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection: Dependency Injection"
          description="How NestJS wires a TypeScript abstraction to a runtime provider."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🦁</span> NestJS Dependency Injection
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            TypeScript interfaces disappear after compilation, so NestJS cannot use <code>MessageSender</code> itself as a runtime lookup key. Give the abstraction a token and connect that token to an implementation in a module:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-4 rounded-xl overflow-x-auto text-xs font-mono border border-ds-stroke-soft mb-3 whitespace-pre leading-relaxed">
{`import { Inject, Injectable, Module } from "@nestjs/common";

export interface MessageSender {
  send(message: string): void;
}

export const MESSAGE_SENDER = Symbol("MESSAGE_SENDER");

@Injectable()
export class EmailMessageSender implements MessageSender {
  send(message: string): void {
    console.log("Email:", message);
  }
}

@Injectable()
export class UserService {
  constructor(
    @Inject(MESSAGE_SENDER)
    private readonly sender: MessageSender
  ) {}

  notify(name: string): void {
    this.sender.send("Welcome, " + name);
  }
}

@Module({
  providers: [
    UserService,
    { provide: MESSAGE_SENDER, useClass: EmailMessageSender }
  ]
})
export class UsersModule {}`}
          </pre>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li><code>@Injectable()</code> marks a class that NestJS can manage as a provider.</li>
            <li><code>@Inject(MESSAGE_SENDER)</code> tells NestJS which runtime token the constructor parameter needs.</li>
            <li><code>@Module()</code> connects the token to <code>EmailMessageSender</code> at the application boundary.</li>
          </ul>
        </WhyBox>

        <InfoCallout emoji="🔌" title="Changing the Implementation">
          <p>
            To use SMS, create <code>SmsMessageSender implements MessageSender</code> and change the module binding to <code>useClass: SmsMessageSender</code>. <code>UserService</code> remains unchanged because it depends on the contract.
          </p>
        </InfoCallout>

        <QuickCheck
          question="What is the easy rule for the Dependency Inversion Principle (D)?"
          answer="High-level code should depend on an abstraction, while concrete implementations are selected and injected at the composition boundary. DI supplies the object; the abstraction is what makes the design follow DIP."
        />
      </div>
    </SectionContainer>
  );
}
