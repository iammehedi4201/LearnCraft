import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts14ClassesAndImplementsContent: StandardLessonContent = {
  slug: "ts14-classes-and-implements",
  code: "TS-14",
  title: "Classes and implements",
  subtitle: "Master the 4 core pillars of Object-Oriented Programming (OOP) in TypeScript.",
  difficulty: "Moderate",
  scenario: {
    question: "Several classes must have an `id` number. How could an interface help you check that each class follows this rule?",
    answer: "Create an interface such as `interface HasId { id: number }`, then have each class use `implements HasId`. TypeScript will report an error if a class does not provide the required `id` number.",
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
    title: "The 4 Core Pillars of OOP",
    bigPicture: "Object-Oriented Programming (OOP) is built on 4 foundational pillars: 1) Encapsulation (protecting data like an ATM machine), 2) Abstraction (hiding complexity like a coffee machine), 3) Inheritance (reusing code like family traits), and 4) Polymorphism (different objects responding to the same method in many forms).",
    codeSnippet: `// 1. ABSTRACTION: An interface hides complex details and defines the public contract
interface Payment {
  processPayment(amount: number): void;
}

// 2. ENCAPSULATION: Hiding sensitive internal data with 'private'
class CreditCardPayment implements Payment {
  // Private field: locked safe (like cash inside an ATM)
  private balance: number = 1000;

  constructor(private readonly cardNumber: string) {}

  processPayment(amount: number): void {
    if (amount <= 0 || amount > this.balance) {
      console.log("❌ Transaction declined: Invalid amount or insufficient balance.");
      return;
    }
    this.balance -= amount;
    const last4 = this.cardNumber.slice(-4);
    console.log(\`💳 Charged $\${amount} to card ending in \${last4}. Balance: $\${this.balance}\`);
  }
}

// 3. INHERITANCE: CashPayment inherits base structure
class CashPayment implements Payment {
  processPayment(amount: number): void {
    console.log(\`💵 Received $\${amount} in physical cash.\`);
  }
}

// 4. POLYMORPHISM: checkout() handles ANY Payment form identically without if/else!
function checkout(paymentMethod: Payment, amount: number): void {
  paymentMethod.processPayment(amount);
}

const card = new CreditCardPayment("4111222233334444");
const cash = new CashPayment();

checkout(card, 150); // 💳 Charged $150 to card ending in 4444.
checkout(cash, 50);  // 💵 Received $50 in physical cash.`,
    breakdownTitle: "The 4 Pillars in Easy Words",
    breakdownItems: [
      {
        title: "1. Pillar 1: Encapsulation (ATM Analogy)",
        desc: "You cannot reach inside an ATM and grab cash. You interact through public buttons (methods) that check your PIN and balance before dispensing.",
      },
      {
        title: "2. Pillar 2: Abstraction (Coffee Machine Analogy)",
        desc: "Pressing 'makeCoffee()' gives you hot espresso without needing to understand the complex internal boilers, grinders, and pressure pumps.",
      },
      {
        title: "3. Pillar 3: Inheritance (Family Trait Analogy)",
        desc: "Children inherit traits from parents. Child classes use 'extends' and 'super()' to get parent methods and properties for free without copying code.",
      },
      {
        title: "4. Pillar 4: Polymorphism ('Many Forms')",
        desc: "Different classes share the same method name (like processPayment()), each executing its own specialized behavior without type checking.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The OOP Design Principle",
      content: "Protect state with encapsulation, define predictable contracts with abstraction, eliminate duplicate code with inheritance, and write flexible functions using polymorphism.",
    },
    cards: [
      {
        number: "01",
        tag: "PROTECTION",
        title: "Encapsulation",
        description: "Use 'private' and 'readonly' so internal state cannot be tampered with or corrupted from the outside.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CONTRACTS",
        title: "Abstraction & implements",
        description: "Interfaces guarantee that classes implement required methods, establishing clear rules across your codebase.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "REUSE & FLEXIBILITY",
        title: "Inheritance & Polymorphism",
        description: "Share common logic with 'extends' and override methods so each class can express its own distinct behavior.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how each pillar improves real-world application code:",
    points: [
      {
        title: "1. Encapsulation prevents invalid state",
        content: "If a BankAccount balance was public, anyone could write account.balance = -999. With private balance and a deposit() method, you enforce validation.",
      },
      {
        title: "2. Abstraction makes code interchangeable",
        content: "When code depends on an interface like Payment or Notifier, callers only care that .processPayment() exists, not the inner machinery.",
      },
      {
        title: "3. Inheritance removes boilerplate",
        content: "Common properties (like name, age, id, createdAt) live in a Base class, and child classes inherit them automatically.",
      },
      {
        title: "4. Polymorphism eliminates massive if/else chains",
        content: "A single checkout(paymentMethod: Payment) function works with cards, mobile wallets, or cash without checking types manually.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Making Everything Public Out of Laziness",
      code: `class BankAccount {\n  // ❌ Public state allows accidental corruption:\n  public balance: number = 100;\n}\n\nconst acc = new BankAccount();\nacc.balance = -500; // Unsafe!`,
      explanation: "Leaving variables public allows outside code to bypass validation rules and corrupt application state.",
    },
    good: {
      title: "Encapsulation with Private Fields & Guard Methods",
      code: `class BankAccount {\n  // ✅ Private state protected by controlled methods:\n  private balance: number = 100;\n\n  deposit(amount: number) {\n    if (amount > 0) this.balance += amount;\n  }\n\n  getBalance() { return this.balance; }\n}`,
      explanation: "Keeping properties private ensures all changes must pass through validated guard methods.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see all 4 OOP pillars (Encapsulation, Abstraction, Inheritance, and Polymorphism) in action:",
    starterCode: `// 1. ABSTRACTION (Interface Contract)
interface Vehicle {
  start(): void;
}

// 2. ENCAPSULATION (Private state)
class Car implements Vehicle {
  private fuel: number = 50; // Hidden from outside

  constructor(public readonly name: string) {}

  start(): void {
    this.fuel -= 10;
    console.log(\`\${this.name} engine roars to life! (Fuel: \${this.fuel}L)\`);
  }
}

// 3. INHERITANCE (Child extends Parent)
class ElectricCar extends Car {
  constructor(name: string, public battery: number) {
    super(name);
  }

  // 4. POLYMORPHISM (Different behavior for the same method)
  override start(): void {
    console.log(\`\${this.name} starts silently! (Battery: \${this.battery}%)\`);
  }
}

// Polymorphic function: Works with ANY Vehicle!
function testDrive(vehicle: Vehicle) {
  vehicle.start();
}

const gasCar = new Car("Toyota Corolla");
const ev = new ElectricCar("Tesla Model 3", 95);

testDrive(gasCar); // Output: Toyota Corolla engine roars to life!
testDrive(ev);     // Output: Tesla Model 3 starts silently!`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which OOP concept allows a child class to inherit properties and methods from a parent class using 'extends'?",
      options: [
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
        "Deconstruction",
      ],
      correctIndex: 0,
      explanation: "Inheritance allows a child class to extend a parent class, reusing its properties and methods without duplicating code.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. Pillar 1: Encapsulation",
        desc: "Protect sensitive state with 'private' and control updates with validated guard methods.",
      },
      {
        title: "2. Pillar 2: Abstraction",
        desc: "Hide complex internal mechanics behind clean interfaces and public methods.",
      },
      {
        title: "3. Pillar 3: Inheritance",
        desc: "Use 'extends' and 'super()' to share logic across parent and child classes for free.",
      },
      {
        title: "4. Pillar 4: Polymorphism",
        desc: "Share method signatures so different classes handle actions in their own unique way.",
      },
    ],
    nextLessonPreview: {
      title: "Modules and Type Imports",
      desc: "Learn how to organize code cleanly across files and use type-only imports.",
    },
  },
};

