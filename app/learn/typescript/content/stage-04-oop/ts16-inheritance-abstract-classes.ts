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
    title: "Inheritance & Abstract Classes: The 3rd Pillar of OOP",
    bigPicture: "Inheritance allows a 'child' class to automatically receive all data and methods from a 'parent' class for free (like children inheriting traits from parents). Child classes use 'extends' and 'super()'. When a parent class should never be instantiated on its own, an 'abstract class' lets you share common methods while forcing child classes to implement specific abstract methods.",
    codeSnippet: `// 1. Abstract Base Class: Shared code + required abstract contracts
abstract class Animal {
  constructor(public name: string, public age: number) {}

  // Shared concrete methods: all child classes get these for free!
  eat(): void {
    console.log(\`\${this.name} is eating 🍖 (inherited)\`);
  }

  sleep(): void {
    console.log(\`\${this.name} is sleeping 😴 (inherited)\`);
  }

  // Abstract method: every animal MUST implement its own sound!
  abstract makeSound(): string;
}

// 2. Dog extends Animal: inherits name, age, eat(), sleep()
class Dog extends Animal {
  constructor(name: string, age: number, public breed: string) {
    super(name, age); // Calls parent constructor!
  }

  makeSound(): string {
    return "Woof! Woof! 🐕";
  }

  bark(): void {
    console.log(\`\${this.name} (\${this.breed}) says: \${this.makeSound()}\`);
  }
}

// 3. Cat extends Animal: inherits common logic, defines unique sound
class Cat extends Animal {
  makeSound(): string {
    return "Meow! 🐱";
  }
}

const myDog = new Dog("Buddy", 3, "Golden Retriever");
myDog.eat();   // Inherited from Animal!
myDog.sleep(); // Inherited from Animal!
myDog.bark();  // Dog's own method

const myCat = new Cat("Whiskers", 2);
myCat.eat();   // Inherited from Animal!
console.log(\`\${myCat.name} says: \${myCat.makeSound()}\`);`,
    breakdownTitle: "Inheritance & Contracts Breakdown",
    breakdownItems: [
      {
        title: "1. Pillar 3: Inheritance (Family Trait Analogy)",
        desc: "Children inherit traits from parents. In code, a child class uses 'extends' to get all parent properties and methods without copying code.",
      },
      {
        title: "2. The super() Constructor Call",
        desc: "Inside child constructors, super(...) calls the parent constructor to safely initialize inherited properties before child code runs.",
      },
      {
        title: "3. Abstract Classes (Blueprints for Blueprints)",
        desc: "An abstract class cannot be instantiated with 'new'. It bundles shared concrete methods with required abstract methods child classes must implement.",
      },
      {
        title: "4. Interfaces (Pure Contracts)",
        desc: "While abstract classes can contain real implemented code, interfaces define pure shapes with zero runtime code.",
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
        title: "1. Eliminating duplicate code across related entities",
        content: "Common properties (like name, age, id, timestamps) live in a single parent class, so child classes stay lean and focused.",
      },
      {
        title: "2. Guaranteed implementation with abstract methods",
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
        title: "1. Pillar 3: Inheritance",
        desc: "Child classes inherit all parent fields and methods using 'extends' and 'super()'.",
      },
      {
        title: "2. Abstract Classes",
        desc: "Base classes that cannot be instantiated directly; mix concrete and abstract methods.",
      },
      {
        title: "3. Interfaces",
        desc: "Pure type contracts that contain no runtime code; enforced with 'implements'.",
      },
    ],
    nextLessonPreview: {
      title: "Polymorphism, Composition, and Dependency Injection",
      desc: "Learn how objects work together, swap behaviors, and receive dependencies cleanly.",
    },
  },
};

