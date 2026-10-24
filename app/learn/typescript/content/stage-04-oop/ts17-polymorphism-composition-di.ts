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
    title: "Polymorphism: The 4th Pillar of OOP & Loose Coupling",
    bigPicture: "Polymorphism literally means 'many forms'. It allows different child classes to share the exact same method signature (like processPayment(amount)), while each executes its own distinct behavior. In modern TypeScript architecture, Polymorphism combines with Composition ('has-a') and Dependency Injection (DI) to build flexible, testable systems without brittle if/else chains.",
    codeSnippet: `// 1. The Base Contract: All payments share this interface
abstract class Payment {
  abstract processPayment(amount: number): void;
}

// 2. Concrete Form A: Credit Card
class CreditCardPayment extends Payment {
  constructor(private cardNumber: string) {
    super();
  }

  override processPayment(amount: number): void {
    const last4 = this.cardNumber.slice(-4);
    console.log(\`💳 Charging $\${amount} to card ending in \${last4}\`);
  }
}

// 3. Concrete Form B: Mobile Payment (bKash)
class MobilePayment extends Payment {
  constructor(private phone: string) {
    super();
  }

  override processPayment(amount: number): void {
    console.log(\`📱 Sending $\${amount} via mobile wallet to \${this.phone}\`);
  }
}

// 4. Concrete Form C: Cash
class CashPayment extends Payment {
  override processPayment(amount: number): void {
    console.log(\`💵 Received $\${amount} in physical cash\`);
  }
}

// Polymorphic function: works with ANY Payment form!
function checkout(paymentMethod: Payment, amount: number): void {
  paymentMethod.processPayment(amount);
}

// Single loop, different behaviors — zero if/else needed!
const payments: Payment[] = [
  new CreditCardPayment("4111222233334444"),
  new MobilePayment("+8801700000000"),
  new CashPayment(),
];

payments.forEach((p) => checkout(p, 99.99));`,
    breakdownTitle: "Polymorphism & Architecture Explained",
    breakdownItems: [
      {
        title: "1. Pillar 4: Polymorphism ('Many Forms')",
        desc: "CreditCard, MobilePayment, and CashPayment all implement processPayment(), so the checkout function handles any of them seamlessly.",
      },
      {
        title: "2. Eliminating if/else Chains",
        desc: "Instead of checking 'if (type === \"card\")' with a 20-line ladder, you let each object handle its own behavior directly.",
      },
      {
        title: "3. Composition Over Inheritance ('Has-A')",
        desc: "An OrderService 'has a' Payment processor instead of inheriting from it, keeping classes small, focused, and loosely coupled.",
      },
      {
        title: "4. Dependency Injection (DI)",
        desc: "Dependencies are passed into constructors from the outside rather than created with hardcoded 'new', making testing effortless.",
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
        title: "Pillar 4: Polymorphism",
        description: "Write functions and classes that depend on base contracts rather than concrete implementations.",
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
        title: "1. Eliminating massive if/else chains",
        content: "When you add a 4th payment method (like CryptoPayment), you don't touch existing checkout code. You simply create a new class.",
      },
      {
        title: "2. Classes become isolated and testable",
        content: "Because OrderService receives its processor from the outside, you can test it without making real network or payment calls.",
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
      title: "Using Massive if/else Chains Instead of Polymorphism",
      code: `function checkout(type: string, amount: number) {\n  // ❌ Fragile type-checking ladder:\n  if (type === "card") chargeCard(amount);\n  else if (type === "mobile") sendMobile(amount);\n  else if (type === "cash") acceptCash(amount);\n}`,
      explanation: "Checking types manually creates brittle if/else chains that must be updated every time a new payment method is introduced.",
    },
    good: {
      title: "Clean Polymorphic Dispatch",
      code: `function checkout(paymentMethod: Payment, amount: number): void {\n  // ✅ The object handles its own behavior!\n  paymentMethod.processPayment(amount);\n}`,
      explanation: "With polymorphism, adding a new payment class requires zero changes to existing checkout or business logic functions.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see how polymorphism and dependency injection allow swappable behavior:",
    starterCode: `abstract class Payment {
  abstract processPayment(amount: number): void;
}

class CreditCardPayment extends Payment {
  constructor(private cardNumber: string) {
    super();
  }

  processPayment(amount: number): void {
    console.log(\`💳 Paid $\${amount} with Card ending in \${this.cardNumber.slice(-4)}\`);
  }
}

class MobilePayment extends Payment {
  constructor(private phone: string) {
    super();
  }

  processPayment(amount: number): void {
    console.log(\`📱 Paid $\${amount} via Mobile Wallet (\${this.phone})\`);
  }
}

class CashPayment extends Payment {
  processPayment(amount: number): void {
    console.log(\`💵 Paid $\${amount} in Cash\`);
  }
}

// OrderService uses Dependency Injection to receive any Payment
class OrderService {
  constructor(private readonly paymentMethod: Payment) {}

  completeOrder(orderId: string, total: number): void {
    console.log(\`Processing order \${orderId}...\`);
    this.paymentMethod.processPayment(total);
    console.log(\`Order \${orderId} complete! ✅\`);
  }
}

const order1 = new OrderService(new CreditCardPayment("4111222233334444"));
order1.completeOrder("ORD-101", 149.99);

const order2 = new OrderService(new MobilePayment("+8801700000000"));
order2.completeOrder("ORD-102", 45.00);`,
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
        title: "1. Pillar 4: Polymorphism",
        desc: "Different classes share the same method contract and can be used interchangeably without type checks.",
      },
      {
        title: "2. Composition",
        desc: "Assemble systems with 'has-a' helper objects instead of deep, fragile inheritance trees.",
      },
      {
        title: "3. Dependency Injection",
        desc: "Pass dependencies into constructors so classes remain decoupled, modular, and easily testable.",
      },
    ],
    nextLessonPreview: {
      title: "Modules and Type Imports",
      desc: "Learn how to organize code cleanly across files and use type-only imports.",
    },
  },
};

