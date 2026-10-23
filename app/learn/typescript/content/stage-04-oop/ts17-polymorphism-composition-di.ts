import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts17PolymorphismCompositionDiContent: StandardLessonContent = {
  slug: "ts17-polymorphism-composition-di",
  code: "TS-17",
  title: "Polymorphism, Composition, and Dependency Injection",
  subtitle: "Build flexible systems with interchangeable objects, composition, and injected dependencies.",
  difficulty: "Difficult",
  scenario: {
    question: "You have a `NotificationService` that needs to send SMS messages. How can you apply dependency injection so you can easily test it without sending real text messages?",
    answer: "Define an interface `SmsProvider` with a `sendSms()` method. Make `NotificationService` receive `SmsProvider` through its constructor. In production, pass a real SMS service; in tests, pass a mock provider.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Polymorphism, Composition, and Dependency Injection",
    bigPicture: "Polymorphism lets different classes share the same contract. Composition builds objects using helper objects ('has-a'). Dependency Injection provides those helper objects through constructor parameters instead of hardcoding 'new', making systems modular and easily testable.",
    codeSnippet: `// 1. The Contract (Interface)
interface PaymentProcessor {
  processPayment(amount: number): boolean;
}

// 2. Polymorphic Implementation A (Real)
class StripeProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(\`Charged $\${amount} via Stripe.\`);
    return true;
  }
}

// 3. Polymorphic Implementation B (Test Mock)
class MockProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(\`[MOCK] Simulated payment of $\${amount}.\`);
    return true;
  }
}

// 4. Composition & Dependency Injection
class OrderService {
  // Dependency Injection: OrderService receives processor via constructor
  // Composition: OrderService 'has a' PaymentProcessor
  constructor(private readonly paymentProcessor: PaymentProcessor) {}

  checkout(orderId: string, total: number): void {
    console.log(\`Starting checkout for order \${orderId}...\`);
    const success = this.paymentProcessor.processPayment(total);
    if (success) {
      console.log(\`Order \${orderId} successfully completed!\`);
    }
  }
}

// Production:
const realOrder = new OrderService(new StripeProcessor());
realOrder.checkout("ORD-1", 120);

// Automated Testing: Swap implementation with zero changes to OrderService!
const testOrder = new OrderService(new MockProcessor());
testOrder.checkout("ORD-TEST", 50);`,
    breakdownTitle: "The 3 Concepts Explained",
    breakdownItems: [
      {
        title: "1. Polymorphism (Many Shapes)",
        desc: "StripeProcessor and MockProcessor both implement PaymentProcessor, so OrderService works identically with either.",
      },
      {
        title: "2. Composition ('Has-A')",
        desc: "OrderService 'has a' PaymentProcessor instead of inheriting from it, avoiding fragile inheritance hierarchies.",
      },
      {
        title: "3. Dependency Injection (DI)",
        desc: "Instead of calling 'new StripeProcessor()' inside OrderService, dependencies are passed into the constructor from outside.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Loose Coupling Rule",
      content: "Do not hardcode dependencies with 'new' inside classes. Receive dependencies through constructor parameters against interfaces.",
    },
    cards: [
      {
        number: "01",
        tag: "FLEXIBILITY",
        title: "Polymorphism",
        description: "Write functions and classes that depend on interface contracts rather than concrete implementations.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ARCHITECTURE",
        title: "Composition Over Inheritance",
        description: "Combine small, focused helper objects ('has-a') instead of building deep, fragile class inheritance chains.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "TESTABILITY",
        title: "Dependency Injection",
        description: "Pass dependencies in through constructors so you can easily swap real services with mocks in unit tests.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is why these concepts are central to modern TypeScript architecture:",
    points: [
      {
        title: "1. Classes become isolated and testable",
        content: "Because OrderService receives its processor from the outside, you can test it without making real network or payment calls.",
      },
      {
        title: "2. Swapping providers requires zero code changes",
        content: "If you switch payment providers or database drivers, your business logic classes remain untouched.",
      },
      {
        title: "3. Composition prevents deep hierarchy bugs",
        content: "Inheritance creates rigid 'is-a' relationships. Composition allows assembling dynamic behavior by combining independent objects.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Hardcoding Dependencies with 'new'",
      code: `class OrderService {\n  private processor: StripeProcessor;\n\n  constructor() {\n    // ❌ Hardcoded 'new' permanently locks OrderService to Stripe:\n    this.processor = new StripeProcessor();\n  }\n}`,
      explanation: "Creating dependencies with 'new' inside a class makes it impossible to substitute mock objects during automated testing.",
    },
    good: {
      title: "Constructor Dependency Injection",
      code: `class OrderService {\n  // ✅ Injected via constructor parameter:\n  constructor(private readonly processor: PaymentProcessor) {}\n}`,
      explanation: "Accepting an interface dependency through constructor parameters keeps your class loosely coupled and easily testable.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see how polymorphism and dependency injection allow swappable behavior:",
    starterCode: `interface MessageService {
  sendMessage(to: string, text: string): void;
}

class EmailService implements MessageService {
  sendMessage(to: string, text: string): void {
    console.log(\`[Email] Sent to \${to}: \${text}\`);
  }
}

class SmsService implements MessageService {
  sendMessage(to: string, text: string): void {
    console.log(\`[SMS] Sent to \${to}: \${text}\`);
  }
}

class UserNotifier {
  // Dependency Injection: UserNotifier accepts any MessageService
  constructor(private readonly messageService: MessageService) {}

  notifyUser(user: string, message: string): void {
    this.messageService.sendMessage(user, message);
  }
}

const emailNotifier = new UserNotifier(new EmailService());
emailNotifier.notifyUser("rina@example.com", "Your order has shipped!");

const smsNotifier = new UserNotifier(new SmsService());
smsNotifier.notifyUser("+1-555-0199", "Your verification code is 4920.");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is receiving a dependency through a constructor better than creating it with 'new' inside the class?",
      options: [
        "It decouples the class, making it easy to swap implementations and pass mocks during testing",
        "It forces the computer to run TypeScript twice as fast",
        "It prevents JavaScript from creating objects in memory",
        "It automatically writes database queries without SQL",
      ],
      correctIndex: 0,
      explanation: "Constructor dependency injection decouples your class from concrete implementations, making it easy to test and maintain.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. Polymorphism",
        desc: "Different classes share the same interface contract and can be used interchangeably.",
      },
      {
        title: "2. Composition",
        desc: "Prefer 'has-a' composition over deep inheritance trees for flexible architecture.",
      },
      {
        title: "3. Dependency Injection",
        desc: "Pass dependencies into constructors so classes are modular and easily testable.",
      },
    ],
    nextLessonPreview: {
      title: "Modules and Type Imports",
      desc: "Learn how to organize code cleanly across files and use type-only imports.",
    },
  },
};
