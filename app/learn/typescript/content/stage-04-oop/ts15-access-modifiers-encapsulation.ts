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
    title: "Encapsulation & Abstraction: The First Two Pillars",
    bigPicture: "Encapsulation and Abstraction are the protective foundation of OOP. Encapsulation means keeping an object's data protected (like an ATM machine locking cash inside) and only allowing changes through validated 'guard' methods. Abstraction means hiding complex internal steps (like a TV remote or coffee machine) and exposing only simple, clean public buttons.",
    codeSnippet: `class BankAccount {
  // 🔒 Private field: Hidden from outside callers (cash inside the ATM vault)
  private balance: number;

  // Parameter property shortcut: declares & assigns accountNumber in 1 line!
  constructor(public readonly accountNumber: string, initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  // Safe public method: validates rules BEFORE changing balance
  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("❌ Deposit amount must be positive!");
      return;
    }
    this.balance += amount;
    console.log(\`✅ Deposited $\${amount}. New balance: $\${this.balance}\`);
  }

  // Safe public method: prevents overdrafts
  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("❌ Withdrawal amount must be positive!");
      return;
    }
    if (amount > this.balance) {
      console.log(\`❌ Insufficient funds! Current balance: $\${this.balance}\`);
      return;
    }
    this.balance -= amount;
    console.log(\`✅ Withdrew $\${amount}. Remaining balance: $\${this.balance}\`);
  }

  // Read-only getter
  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("ACC-101", 1000);
account.deposit(500);
account.withdraw(200);
account.withdraw(5000); // ❌ Insufficient funds!
console.log("Verified balance:", account.getBalance());

// ❌ TypeScript Error: Property 'balance' is private!
// account.balance = -999;`,
    breakdownTitle: "Encapsulation & Abstraction Compared",
    breakdownItems: [
      {
        title: "1. Pillar 1: Encapsulation (ATM Analogy)",
        desc: "You cannot reach inside an ATM and grab cash. You interact through public buttons (methods) that check your PIN and balance before dispensing.",
      },
      {
        title: "2. Pillar 2: Abstraction (Coffee Machine Analogy)",
        desc: "You press 'makeCoffee()'. You don't need to know how the machine boils water, grinds beans, or brews. Complex internal steps are hidden.",
      },
      {
        title: "3. Encapsulation vs Abstraction Difference",
        desc: "Encapsulation PROTECTS data from corruption (the 'what' is guarded). Abstraction HIDES complexity from the user (the 'how' is hidden).",
      },
      {
        title: "4. TypeScript Access Modifiers",
        desc: "public (accessible anywhere), protected (accessible in class and subclasses), and private (accessible only within this class).",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Encapsulation Invariant Rule",
      content: "Keep mutable state private, validate all mutations inside guard methods, and expose simple, clean public interfaces.",
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
        title: "Pillar 1: Encapsulation",
        description: "Hide internal state behind private so outside code cannot corrupt data or bypass validation rules.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SIMPLICITY",
        title: "Pillar 2: Abstraction",
        description: "Hide intricate implementation details and private helper steps behind intuitive public methods.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how access modifiers and encapsulation safeguard real-world code:",
    points: [
      {
        title: "1. Private fields prevent invalid application state",
        content: "If account balance was public, outside code could write account.balance = -999. Private forces changes through deposit() and withdraw().",
      },
      {
        title: "2. Parameter properties eliminate repetitive boilerplate",
        content: "Instead of declaring fields, parameters, and this.x = x in 3 places, writing constructor(private balance: number) does it in one line.",
      },
      {
        title: "3. Protected enables safe inheritance for subclasses",
        content: "Protected properties allow child classes to reuse internal logic while keeping those details hidden from the rest of the application.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Making Everything Public Out of Laziness",
      code: `class BankAccount {\n  // ❌ Public mutable state allows accidental corruption:\n  public balance: number = 100;\n}\n\nconst acc = new BankAccount();\nacc.balance = -500; // Unsafe! Bypass all business rules`,
      explanation: "Leaving variables public allows outside code to bypass validation rules and corrupt application state.",
    },
    good: {
      title: "Encapsulation with Private Fields & Guard Methods",
      code: `class BankAccount {\n  // ✅ Private state protected by controlled methods:\n  private balance: number = 100;\n\n  deposit(amount: number): void {\n    if (amount > 0) this.balance += amount;\n  }\n\n  getBalance(): number {\n    return this.balance;\n  }\n}`,
      explanation: "Keeping properties private ensures all changes must pass through validated methods with proper business checks.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see how encapsulation and parameter properties protect state:",
    starterCode: `class BankAccount {
  private balance: number;

  constructor(public readonly owner: string, initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("❌ Deposit must be positive!");
      return;
    }
    this.balance += amount;
    console.log(\`✅ Deposited $\${amount}. Balance: $\${this.balance}\`);
  }

  withdraw(amount: number): void {
    if (amount <= 0 || amount > this.balance) {
      console.log(\`❌ Cannot withdraw $\${amount}. Available: $\${this.balance}\`);
      return;
    }
    this.balance -= amount;
    console.log(\`✅ Withdrew $\${amount}. Balance: $\${this.balance}\`);
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Mehedi", 500);
account.deposit(250);
account.withdraw(100);
account.withdraw(1000); // ❌ Overdraft blocked!
console.log("Final balance for " + account.owner + ": $" + account.getBalance());`,
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
        title: "1. Pillar 1: Encapsulation",
        desc: "Protect data by keeping fields private and routing mutations through validated guard methods.",
      },
      {
        title: "2. Pillar 2: Abstraction",
        desc: "Hide complex internal mechanics (like boiling coffee) behind intuitive public methods.",
      },
      {
        title: "3. Access Modifiers",
        desc: "Use private for internal state, protected for inheritance, and public for caller APIs.",
      },
    ],
    nextLessonPreview: {
      title: "Inheritance, Interfaces, and Abstract Classes",
      desc: "Learn how child classes get parent code for free with extends and super().",
    },
  },
};

