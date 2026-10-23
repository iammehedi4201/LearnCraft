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
    bigPicture: "Object-Oriented Programming (OOP) is built on 4 foundational pillars: 1) Encapsulation (protecting data), 2) Abstraction (hiding complexity), 3) Inheritance (reusing code), and 4) Polymorphism (different objects responding to the same method).",
    codeSnippet: `// 1. ABSTRACTION: An interface defines the contract
interface Vehicle {
  start(): void;
}

// 2. ENCAPSULATION: Hiding internal data with 'private'
class Car implements Vehicle {
  // Private variable: outsiders cannot directly change fuel
  private fuel: number = 50;

  constructor(public readonly model: string) {}

  start(): void {
    if (this.fuel > 0) {
      this.fuel -= 5;
      console.log(\`\${this.model} engine started! Remaining fuel: \${this.fuel}L\`);
    } else {
      console.log(\`\${this.model} has no fuel!\`);
    }
  }

  getFuel(): number {
    return this.fuel;
  }
}

// 3. INHERITANCE: ElectricCar inherits model and structure from Car
class ElectricCar extends Car {
  constructor(model: string, public batteryPercent: number) {
    super(model); // Calls Car's constructor
  }

  // 4. POLYMORPHISM: Overrides start() with electric-specific behavior
  override start(): void {
    console.log(\`\${this.model} hums silently to life! Battery: \${this.batteryPercent}%\`);
  }
}`,
    breakdownTitle: "The 4 Pillars in Easy Words",
    breakdownItems: [
      {
        title: "1. Encapsulation (Protecting Data)",
        desc: "Wrapping data and methods inside a class and using 'private' so external code cannot mutate critical properties directly.",
      },
      {
        title: "2. Abstraction (Hiding Complexity)",
        desc: "Using 'interface' and 'implements' to define what an object can do, without exposing the complex internal machinery.",
      },
      {
        title: "3. Inheritance (Reusing Code)",
        desc: "Using 'extends' and 'super()' so child classes automatically inherit properties and methods from parent classes without copying code.",
      },
      {
        title: "4. Polymorphism (Many Shapes)",
        desc: "Allowing different classes to share the same method name (like start()) while each implementing its own unique behavior.",
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
        content: "When code depends on an interface like Notifier or Vehicle, you only care that .send() or .start() exists, not the inner details.",
      },
      {
        title: "3. Inheritance removes boilerplate",
        content: "Common properties (like id, createdAt, updatedAt) live in a BaseEntity, and child entities inherit them automatically.",
      },
      {
        title: "4. Polymorphism enables flexible functions",
        content: "A single testDrive(v: Vehicle) function can run on regular cars, trucks, or electric cars without needing separate functions for each.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Exposing Public Mutable State",
      code: `class BankAccount {\n  // ❌ Public state allows accidental corruption:\n  public balance: number = 100;\n}\n\nconst acc = new BankAccount();\nacc.balance = -500; // Unsafe!`,
      explanation: "Leaving variables public allows outside code to bypass validation rules and corrupt application state.",
    },
    good: {
      title: "Encapsulation with Private Fields & Methods",
      code: `class BankAccount {\n  // ✅ Private state protected by controlled methods:\n  private balance: number = 100;\n\n  deposit(amount: number) {\n    if (amount > 0) this.balance += amount;\n  }\n\n  getBalance() { return this.balance; }\n}`,
      explanation: "Keeping properties private ensures all changes must pass through validated methods.",
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
        title: "1. Encapsulation",
        desc: "Hide sensitive state with 'private' and control updates with methods.",
      },
      {
        title: "2. Abstraction",
        desc: "Use interfaces and 'implements' to define clear rules for what classes must do.",
      },
      {
        title: "3. Inheritance",
        desc: "Use 'extends' and 'super()' to share logic across parent and child classes.",
      },
      {
        title: "4. Polymorphism",
        desc: "Override methods so different classes can respond to the same action in their own unique way.",
      },
    ],
    nextLessonPreview: {
      title: "Modules and Type Imports",
      desc: "Learn how to organize code cleanly across files and use type-only imports.",
    },
  },
};
