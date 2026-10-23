import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts15AccessModifiersEncapsulationContent: StandardLessonContent = {
  slug: "ts15-access-modifiers-encapsulation",
  code: "TS-15",
  title: "Access Modifiers and Encapsulation",
  subtitle: "Control visibility with public, private, protected, and protect state with encapsulation.",
  difficulty: "Moderate",
  scenario: {
    question: "A user profile should allow anyone to read the user's ID, but only the class itself should be able to update their hashed password. How would you declare these two properties?",
    answer: "Declare the user ID as public readonly id: string, and declare the password as private passwordHash: string.",
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
    title: "Access Modifiers and Encapsulation",
    bigPicture: "Access modifiers control who can read or change class fields: public (anywhere), private (class only), and protected (class and subclasses). Encapsulation means hiding internal data and requiring updates to pass through validated methods.",
    codeSnippet: `class BankAccount {
  // 'private': completely hidden from outside callers
  private balance: number = 0;

  // Parameter property shortcut: declares and assigns 'accountNumber' in one step!
  constructor(public readonly accountNumber: string) {}

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("ACC-101");
account.deposit(250);
console.log(account.accountNumber); // "ACC-101" (public readonly)
console.log(account.getBalance());   // 250 (safe read)

// ❌ TypeScript Error: Property 'balance' is private!
// account.balance = -100;`,
    breakdownTitle: "Access Modifiers at a Glance",
    breakdownItems: [
      {
        title: "1. public (Default)",
        desc: "Accessible from anywhere. Anyone can read and call it outside the class.",
      },
      {
        title: "2. private",
        desc: "Only accessible inside the declaring class. Prevents direct outside modification.",
      },
      {
        title: "3. protected & readonly",
        desc: "Protected allows subclasses to access the field; readonly prevents reassigning values after creation.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Encapsulation Invariant Rule",
      content: "Keep mutable state private, validate all mutations inside methods, and expose read-only access where appropriate.",
    },
    cards: [
      {
        number: "01",
        tag: "VISIBILITY",
        title: "Access Control",
        description: "Choose public, private, or protected to strictly control who can read and write properties.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PROTECTION",
        title: "Encapsulation",
        description: "Hide internal state so outside callers cannot corrupt data or bypass business validation rules.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SHORTCUT",
        title: "Parameter Properties",
        description: "Adding public, private, or readonly directly inside constructor arguments declares and sets fields in 1 line.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how access modifiers protect your application state:",
    points: [
      {
        title: "1. Private fields prevent invalid states",
        content: "If account balance was public, outside code could write account.balance = -999. Private forces changes through deposit().",
      },
      {
        title: "2. Parameter properties eliminate repetitive code",
        content: "Instead of declaring fields, parameters, and this.x = x in 3 places, writing constructor(private x: number) does it in one line.",
      },
      {
        title: "3. Protected enables safe inheritance",
        content: "Protected methods allow child classes to reuse internal logic while keeping it hidden from the rest of the application.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Exposing Public Mutable State",
      code: `class UserProfile {\n  // ❌ Public mutable state allows accidental corruption:\n  public passwordHash: string;\n\n  constructor(hash: string) {\n    this.passwordHash = hash;\n  }\n}\n\nconst user = new UserProfile("secret123");\nuser.passwordHash = ""; // Invalid!`,
      explanation: "Leaving sensitive properties public allows outside code to bypass validation and corrupt object data.",
    },
    good: {
      title: "Encapsulation with Private Fields & Methods",
      code: `class UserProfile {\n  // ✅ Private field with controlled update logic:\n  constructor(private passwordHash: string) {}\n\n  changePassword(oldPass: string, newPass: string): boolean {\n    if (this.verify(oldPass) && newPass.length >= 8) {\n      this.passwordHash = this.hash(newPass);\n      return true;\n    }\n    return false;\n  }\n  private verify(p: string) { return true; }\n  private hash(p: string) { return "hashed_" + p; }\n}`,
      explanation: "Private fields force all changes to go through validated methods with proper security checks.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see how encapsulation and parameter properties work:",
    starterCode: `class Counter {
  // 'private' count, initialized to 0
  private count: number = 0;

  // Parameter property: step is public and readonly
  constructor(public readonly step: number = 1) {}

  increment(): void {
    this.count += this.step;
  }

  getCount(): number {
    return this.count;
  }
}

const counter = new Counter(5);
counter.increment();
counter.increment();

console.log("Current step:", counter.step); // 5 (public)
console.log("Total count:", counter.getCount()); // 10 (via getter)`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which access modifier allows a property to be accessed only within its class and child classes that inherit from it?",
      options: [
        "protected",
        "private",
        "public",
        "readonly",
      ],
      correctIndex: 0,
      explanation: "'protected' allows access inside the declaring class and its subclasses, but prevents access from outside callers.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. Access Modifiers",
        desc: "Use private for internal secrets, protected for subclasses, and public for caller APIs.",
      },
      {
        title: "2. Encapsulation",
        desc: "Hide raw data and expose validated methods to maintain data integrity.",
      },
      {
        title: "3. Parameter Properties",
        desc: "Write constructor(private name: string) to declare and assign fields in one line.",
      },
    ],
    nextLessonPreview: {
      title: "Inheritance, Interfaces, and Abstract Classes",
      desc: "Learn how to reuse code with extends, define contracts with interfaces, and build base classes.",
    },
  },
};
