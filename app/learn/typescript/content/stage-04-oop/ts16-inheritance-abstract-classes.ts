import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts16InheritanceAbstractClassesContent: StandardLessonContent = {
  slug: "ts16-inheritance-abstract-classes",
  code: "TS-16",
  title: "Inheritance, Interfaces, and Abstract Classes",
  subtitle: "Reuse code with extends, define contracts with interfaces, and build base classes.",
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
    title: "Inheritance, Interfaces, and Abstract Classes",
    bigPicture: "Inheritance lets a child class reuse code from a parent with 'extends' and 'super()'. Interfaces define pure contracts with no code. Abstract classes act as blueprints that can provide both shared completed methods and required abstract methods.",
    codeSnippet: `// 1. Interface: Pure contract (no implementation)
interface Logger {
  log(message: string): void;
}

// 2. Abstract Class: Cannot be instantiated with 'new'
abstract class BaseNotifier implements Logger {
  constructor(public senderName: string) {}

  // Shared completed method
  log(message: string): void {
    console.log(\`[\${this.senderName}] Audit: \${message}\`);
  }

  // Abstract method: Child classes MUST implement this!
  abstract send(recipient: string, message: string): void;
}

// 3. Child Class inheriting from the abstract class
class EmailNotifier extends BaseNotifier {
  constructor(senderName: string, public emailServer: string) {
    super(senderName); // Calls BaseNotifier constructor
  }

  // Implementing the required abstract method
  send(recipient: string, message: string): void {
    this.log(\`Dispatching email to \${recipient}\`);
    console.log(\`Sent via \${this.emailServer}: "\${message}"\`);
  }
}

const notifier = new EmailNotifier("LearnCraft", "mail.server.com");
notifier.send("rina@example.com", "Welcome to OOP!");`,
    breakdownTitle: "Key Differences",
    breakdownItems: [
      {
        title: "1. Inheritance (extends)",
        desc: "Child class inherits all parent properties and methods, and calls super() to run the parent constructor.",
      },
      {
        title: "2. Interface (implements)",
        desc: "Defines a strict contract for property names and method signatures with zero runtime code.",
      },
      {
        title: "3. Abstract Class",
        desc: "A partially implemented base class that child classes extend. Cannot be instantiated with 'new'.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Contract vs Implementation Rule",
      content: "Use interfaces when you only need a contract. Use abstract classes when multiple children must share common implemented methods alongside required abstract methods.",
    },
    cards: [
      {
        number: "01",
        tag: "REUSE",
        title: "Inheritance (extends)",
        description: "Share common logic across classes without copy-pasting code.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CONTRACT",
        title: "Interface (implements)",
        description: "Enforce required methods and shapes across independent classes.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "BASE CLASS",
        title: "Abstract Classes",
        description: "Combine shared concrete logic with abstract methods child classes must implement.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how inheritance and abstract contracts organize code:",
    points: [
      {
        title: "1. Eliminating duplicate code",
        content: "Common logging, timestamping, or validation logic is written once in a base class and inherited by all children.",
      },
      {
        title: "2. Guaranteed implementation with abstract",
        content: "Marking a method 'abstract' forces every child class to provide its own implementation before TypeScript allows compilation.",
      },
      {
        title: "3. Interfaces keep components decoupled",
        content: "Other parts of your system depend only on the interface contract, making classes easy to swap or mock.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Directly Instantiating an Abstract Class",
      code: `abstract class BaseWorker {\n  abstract work(): void;\n}\n\n// ❌ TypeScript error: Cannot create an instance of an abstract class!\nconst worker = new BaseWorker();`,
      explanation: "Abstract classes are incomplete blueprints designed solely to be inherited, not directly instantiated.",
    },
    good: {
      title: "Extending the Abstract Base Class",
      code: `abstract class BaseWorker {\n  abstract work(): void;\n}\n\n// ✅ Extend and implement required methods:\nclass Developer extends BaseWorker {\n  work(): void {\n    console.log("Writing clean TypeScript code.");\n  }\n}\n\nconst dev = new Developer();`,
      explanation: "Child classes extend the abstract base class and implement all abstract methods before creation.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see inheritance, super(), and abstract methods in action:",
    starterCode: `abstract class Animal {
  constructor(public readonly name: string) {}

  // Concrete method shared by all animals
  sleep(): void {
    console.log(\`\${this.name} is sleeping...\`);
  }

  // Abstract method: every animal must implement its own sound!
  abstract makeSound(): string;
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // Call parent constructor
  }

  makeSound(): string {
    return "Woof! Woof!";
  }
}

class Cat extends Animal {
  makeSound(): string {
    return "Meow!";
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Luna");

dog.sleep();
console.log(\`\${dog.name} says: \${dog.makeSound()}\`);
console.log(\`\${cat.name} says: \${cat.makeSound()}\`);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if a concrete child class extends an abstract class but fails to implement an abstract method?",
      options: [
        "TypeScript produces a compile-time error and prevents execution",
        "The browser ignores the missing method and continues",
        "The abstract class automatically generates random code",
        "The computer crashes with a memory leak",
      ],
      correctIndex: 0,
      explanation: "TypeScript strictly requires concrete child classes to implement all abstract methods declared in their parent abstract class.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. extends & super()",
        desc: "Use extends for inheritance and super() to run the parent class constructor.",
      },
      {
        title: "2. Interfaces",
        desc: "Pure type contracts that contain no runtime code; enforced with 'implements'.",
      },
      {
        title: "3. Abstract Classes",
        desc: "Base classes that cannot be instantiated directly; mix concrete and abstract methods.",
      },
    ],
    nextLessonPreview: {
      title: "Polymorphism, Composition, and Dependency Injection",
      desc: "Learn how objects work together, swap behaviors, and receive dependencies cleanly.",
    },
  },
};
