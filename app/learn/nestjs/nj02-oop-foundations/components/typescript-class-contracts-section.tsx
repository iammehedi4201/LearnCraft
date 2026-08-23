"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  ComparisonTable,
  Divider,
  InfoCallout,
  SectionContainer,
  SectionHeading,
  SummaryBox,
  TopicHeader,
} from "./shared-components";

export function TypeScriptClassContractsSection() {
  return (
    <SectionContainer number={16} title="TypeScript Class Contracts">
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Readonly Properties"
          description="A readonly property gets its value when the object is created and cannot be assigned a different value later. Use it for dependencies and identity values that should stay fixed."
          color="primary"
        />

        <InfoCallout emoji="🔒" title="Readonly does one simple job">
          <p>
            <code>private</code> controls <strong>who can access</strong> a
            property. <code>readonly</code> controls whether code can
            <strong> assign a new value</strong> after construction. You can use
            them together as <code>private readonly</code>.
          </p>
        </InfoCallout>

        <div className="mt-6">
          <SectionHeading>Try It: A Dependency That Cannot Be Replaced</SectionHeading>
          <p className="mb-3 text-xs leading-relaxed text-ds-text-sub">
            This is the same constructor style you will often see in NestJS
            services and controllers.
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class MessageService {
  send(text: string) {
    return "Sent: " + text;
  }
}

class NotificationController {
  constructor(private readonly messages: MessageService) {}

  notifyUser() {
    return this.messages.send("Welcome!");
  }
}

const controller = new NotificationController(new MessageService());
console.log(controller.notifyUser());

// This would be an error because messages is private and readonly:
// controller.messages = new MessageService();`}
            height="330px"
          />
        </div>

        <InfoCallout emoji="💡" title="Readonly is not deep freezing">
          <p>
            If a readonly property holds an object or array, the property cannot
            point to a different object. The contents of that object may still
            change. Use <code>Object.freeze()</code> when you need runtime
            freezing.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Interfaces and implements"
          description="An interface is a contract that describes what an object must provide. A class uses implements to ask TypeScript to check that it follows that contract."
          color="sky"
        />

        <InfoCallout emoji="📋" title="Think of an interface as a checklist">
          <p>
            The checklist says which properties and methods are required, but it
            does not contain the working code. Different classes can follow the
            same checklist in their own way.
          </p>
        </InfoCallout>

        <div className="mt-6">
          <SectionHeading>Try It: Two Classes, One Contract</SectionHeading>
          <p className="mb-3 text-xs leading-relaxed text-ds-text-sub">
            Start with one small method. Both notifier classes promise that they
            can send a message, so the same function can work with either one.
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`interface Notifier {
  send(message: string): string;
}

class EmailNotifier implements Notifier {
  send(message: string): string {
    return "Email: " + message;
  }
}

class SmsNotifier implements Notifier {
  send(message: string): string {
    return "SMS: " + message;
  }
}

function welcomeUser(notifier: Notifier) {
  console.log(notifier.send("Welcome to LearnCraft!"));
}

welcomeUser(new EmailNotifier());
welcomeUser(new SmsNotifier());`}
            height="390px"
          />
        </div>

        <SummaryBox>
          <strong>Why this matters:</strong> code can depend on a small contract
          instead of one specific class. That makes implementations easier to
          replace and test. This is a common idea behind dependency injection.
        </SummaryBox>

        <InfoCallout emoji="ℹ️" title="Interfaces exist only during type checking">
          <p>
            TypeScript removes interfaces when it creates JavaScript. You cannot
            use <code>new Notifier()</code> or check
            <code> value instanceof Notifier</code> at runtime. Create an object
            from a real class instead.
          </p>
        </InfoCallout>

        <QuickCheck
          question="If EmailNotifier says 'implements Notifier' but forgets the send() method, what happens?"
          answer="TypeScript reports an error before the program runs. implements asks TypeScript to verify that the class contains every required property and method from the interface."
        />
      </div>

      <Divider />

      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Abstract Classes"
          description="An abstract class is a partial blueprint. It can share real properties and methods, while requiring child classes to finish specific methods."
          color="amber"
        />

        <InfoCallout emoji="🏗️" title="A blueprint that is not a finished object">
          <p>
            You cannot create an object directly from an abstract class. Extend
            it with a child class, implement every abstract method, and create
            the child object instead.
          </p>
        </InfoCallout>

        <div className="mt-6">
          <SectionHeading>Try It: Shared Payment Rules</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`abstract class PaymentMethod {
  constructor(protected readonly name: string) {}

  abstract pay(amount: number): string;

  printName() {
    return "Payment method: " + this.name;
  }
}

class CardPayment extends PaymentMethod {
  constructor() {
    super("Card");
  }

  pay(amount: number): string {
    return "Paid $" + amount + " by card";
  }
}

class MobilePayment extends PaymentMethod {
  constructor() {
    super("Mobile Wallet");
  }

  pay(amount: number): string {
    return "Paid $" + amount + " by mobile wallet";
  }
}

const payment: PaymentMethod = new CardPayment();
console.log(payment.printName());
console.log(payment.pay(50));

// Not allowed: new PaymentMethod("Unknown");`}
            height="500px"
          />
        </div>

        <ComparisonTable
          headers={["Tool", "Best use", "Contains working code?", "Can create directly?"]}
          rows={[
            ["Interface", "Describe a contract", "No", "No"],
            ["Abstract class", "Share a base plus required steps", "Yes", "No"],
            ["Regular class", "Create complete objects", "Yes", "Yes"],
          ]}
        />

        <QuickCheck
          question="When should you choose an abstract class instead of an interface?"
          answer="Choose an abstract class when related child classes need shared state or working methods from one base class. Choose an interface when you only need a contract that unrelated classes can follow."
        />
      </div>

      <SummaryBox>
        Learn these tools in order: use <code>readonly</code> for values that
        should not be reassigned, use an <code>interface</code> to describe a
        contract, and use an <code>abstract class</code> when child classes need
        both a contract and shared implementation.
      </SummaryBox>
    </SectionContainer>
  );
}
