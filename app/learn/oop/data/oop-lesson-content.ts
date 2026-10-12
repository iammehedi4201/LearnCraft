/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OOP LESSONS CONTENT REPOSITORY — SIMPLE, CLEAR & INTUITIVE EXPLANATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Beginner-friendly explanations, real-world analogies, and practical examples
 * for all 16 Object-Oriented Programming (OOP) lessons.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface OOPLessonSection {
  id: string;
  label: string;
  icon: string;
}

export interface OOPLessonCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "purple" | "emerald" | "amber" | "cyan" | "rose" | "indigo" | "blue";
}

export interface OOPMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface OOPCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface OOPQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface OOPLessonTakeaway {
  title: string;
  desc: string;
}

export interface OOPLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  sections: OOPLessonSection[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards: OOPLessonCard[];
    rule: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: OOPMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: OOPCodeComparison;
    good: OOPCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: OOPQuizData;
  };
  part7: {
    title: string;
    takeaways: OOPLessonTakeaway[];
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
}

export const OOP_LESSONS_CONTENT: Record<string, OOPLessonContent> = {
  // ─────────────────────────────────────────────────────────────
  // OOP-01: Object-Oriented Thinking
  // ─────────────────────────────────────────────────────────────
  "oop01-why-oop": {
    slug: "oop01-why-oop",
    code: "OOP-01",
    title: "Object-Oriented Thinking: Objects, Classes, State & Behavior",
    subtitle: "Think in real-world objects: bundle your data and actions together into organized building blocks.",
    sections: [
      { id: "part1", label: "Why Do We Need OOP?", icon: "💡" },
      { id: "part2", label: "The 2 Parts of an Object", icon: "📦" },
      { id: "part3", label: "Classes vs Objects (Blueprints)", icon: "🏗️" },
      { id: "part4", label: "Messy Code vs Clean OOP Code", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Quick Check Quiz", icon: "🎯" },
      { id: "part7", label: "Key Summary & Next Step", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & Real-Life Context",
      bigPicture: "Imagine a messy kitchen where flour, eggs, and sugar are scattered on the floor, and 10 different people are randomly stirring bowls. That is how traditional code works without OOP! Object-Oriented Programming (OOP) puts ingredients (data) and recipes (functions) together into clean, neat containers called Objects.",
      breakdownTitle: "Common Problems When You Don't Use OOP:",
      breakdownItems: [
        { title: "Loose Variables Everywhere", desc: "Anyone can accidentally change a bank balance to -$500 or set a user's name to an empty text." },
        { title: "Repeating the Same Checks", desc: "You have to write 'if (balance > 0)' in 20 different files because the data doesn't protect itself." },
        { title: "Hard to Understand", desc: "When your project grows, finding which function modifies which piece of data becomes confusing." },
      ],
    },
    part2: {
      title: "The 2 Things Every Object Has",
      intro: "Think of a real-world object like a Dog or a Car. Every object has two simple things:",
      cards: [
        { number: "01", tag: "Data (State)", title: "What It Knows", description: "Information stored inside the object (e.g. Car color: 'Red', speed: 60 mph, fuel: 80%).", color: "purple" },
        { number: "02", tag: "Actions (Behavior)", title: "What It Does", description: "Things the object can do (e.g. Car can accelerate(), brake(), and turnOnHeadlights()).", color: "emerald" },
      ],
      rule: {
        title: "💡 Simple Rule",
        content: "An object is not just a bag of raw data. It is a smart helper that owns its data and knows how to use it safely.",
      },
    },
    part3: {
      title: "Class vs Object (The Blueprint Analogy)",
      intro: "A Class is the architectural blueprint on paper; an Object is the actual house built from that blueprint:",
      points: [
        { title: "1. The Class (Blueprint)", content: "Written once in code. Defines what fields and methods every house will have (e.g. number of bedrooms, turnOnLights())." },
        { title: "2. The Object (Instance)", content: "The real house created in computer memory using 'new House()'. You can build 100 separate houses from one single blueprint!" },
        { title: "3. Identity", content: "Even if two houses have the exact same color and 3 bedrooms, House A and House B are two different houses on different streets." },
      ],
    },
    part4: {
      title: "Messy Code vs Clean OOP Code",
      bad: {
        title: "❌ Messy Code: Data is unprotected",
        code: `// Loose data object
const account = {
  owner: "Alice",
  balance: 100
};

// Any code can accidentally break rules:
account.balance = -99999; // 💥 Nobody stopped this!`,
        explanation: "Anyone can change the balance to a negative number or corrupt the data because there are no rules guarding it.",
      },
      good: {
        title: "✅ Clean OOP Code: The Object guards itself",
        code: `class BankAccount {
  private _balance: number;

  constructor(public readonly owner: string, initialDeposit: number) {
    if (initialDeposit < 0) throw new Error("Deposit cannot be negative");
    this._balance = initialDeposit;
  }

  public withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this._balance) {
      console.log("❌ Not enough money or invalid amount!");
      return false;
    }
    this._balance -= amount;
    return true;
  }

  public get balance(): number {
    return this._balance;
  }
}`,
        explanation: "The BankAccount object manages its own balance. It is impossible for an outsider to set a negative balance.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Run the code below to see how a BankAccount object safely protects its balance from invalid withdrawals:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMPLE OOP EXAMPLE: BANK ACCOUNT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class BankAccount {
  private _balance: number;

  constructor(public readonly ownerName: string, startingMoney: number) {
    if (startingMoney < 0) {
      throw new Error("Cannot open an account with negative money!");
    }
    this._balance = startingMoney;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit must be more than 0!");
      return;
    }
    this._balance += amount;
    console.log(\`✅ Deposited $\${amount}. New balance: $\${this._balance}\`);
  }

  public withdraw(amount: number): void {
    if (amount > this._balance) {
      console.log(\`❌ Cannot withdraw $\${amount}. You only have $\${this._balance}!\`);
      return;
    }
    this._balance -= amount;
    console.log(\`💵 Withdrew $\${amount}. Remaining: $\${this._balance}\`);
  }

  public get balance(): number {
    return this._balance;
  }
}

// Create an account for Alex
const alexAccount = new BankAccount("Alex", 200);

alexAccount.deposit(50);     // Balance becomes 250
alexAccount.withdraw(100);   // Balance becomes 150
alexAccount.withdraw(500);   // Blocked! Not enough money

console.log("Final balance:", alexAccount.balance);
`,
    },
    part6: {
      title: "Quick Check Quiz",
      quiz: {
        question: "What is the main difference between a Class and an Object?",
        options: [
          "A Class is written in TypeScript, but an Object is written in Python.",
          "A Class is the blueprint or template, while an Object is the actual living instance created from that blueprint.",
          "A Class cannot hold functions, but an Object can.",
          "There is no difference, they are exact synonyms.",
        ],
        correctIndex: 1,
        explanation: "A Class is the recipe or blueprint. An Object is the actual cake baked in memory using that recipe.",
      },
    },
    part7: {
      title: "Key Summary & Next Step",
      takeaways: [
        { title: "1. Group Data & Actions", desc: "Objects keep related variables and functions together in one neat box." },
        { title: "2. Classes are Blueprints", desc: "Write the class once, and create as many objects from it as you need." },
        { title: "3. Objects Protect Themselves", desc: "Never let external code directly corrupt an object's internal variables." },
        { title: "4. Next: Encapsulation", desc: "In OOP-02, we learn how to hide internal secrets using private keywords." },
      ],
      nextLessonPreview: {
        title: "OOP-02: Encapsulation: Protecting State & Invariants",
        desc: "Learn how to use private fields so nobody can tamper with your object's internal data.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-02: Encapsulation
  // ─────────────────────────────────────────────────────────────
  "oop02-encapsulation": {
    slug: "oop02-encapsulation",
    code: "OOP-02",
    title: "Encapsulation: Protecting State & Invariants",
    subtitle: "Keep internal secrets hidden: use private fields and clear methods so outsiders cannot tamper with your data.",
    sections: [
      { id: "part1", label: "The Capsule Pill Analogy", icon: "💊" },
      { id: "part2", label: "Public vs Private Controls", icon: "🔒" },
      { id: "part3", label: "'Tell, Don't Ask' Rule", icon: "🗣️" },
      { id: "part4", label: "Unprotected vs Encapsulated Code", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Encapsulation Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Best Habits", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Capsule Analogy",
      bigPicture: "Think of a medicine capsule pill. The medicine powder inside is protected by a shell. You don't open the pill and touch the raw chemical powder with dirty hands; you swallow the capsule cleanly. Encapsulation in code is the exact same idea: wrap your data inside a protective shell and only allow safe actions through designated buttons.",
      breakdownTitle: "Real-Life Examples of Encapsulation:",
      breakdownItems: [
        { title: "The Bank ATM", desc: "You don't walk into the bank vault to grab dollar bills. You type your PIN on the ATM keypad, and the ATM dispenses cash safely." },
        { title: "A TV Remote", desc: "You press the 'Volume Up' button. You don't open the back of the TV with a screwdriver to twist the internal speaker wires!" },
        { title: "A Car Gas Tank", desc: "The car won't let you start driving with an open fuel leak; it checks safety rules before running." },
      ],
    },
    part2: {
      title: "Public vs Private (Visibility Controls)",
      intro: "TypeScript gives you simple keywords to choose who can see and touch your data:",
      cards: [
        { number: "01", tag: "Private", title: "private (Hidden Inside)", description: "Secret internal variables only accessible inside the class (e.g. passwordHash, rawBalance).", color: "rose" },
        { number: "02", tag: "Public", title: "public (Open Buttons)", description: "Safe methods anyone can call (e.g. changePassword(), depositMoney()).", color: "emerald" },
      ],
      rule: {
        title: "💡 The Golden Habit",
        content: "Make all internal variables 'private' by default. Only make methods 'public' when callers truly need to click that button.",
      },
    },
    part3: {
      title: "The 'Tell, Don't Ask' Principle",
      intro: "Instead of asking an object for its private variables and doing calculations outside, tell the object what action to take:",
      points: [
        { title: "❌ Bad (Asking)", content: "if (wallet.balance >= itemPrice) { wallet.balance = wallet.balance - itemPrice; } // Risky!" },
        { title: "✅ Good (Telling)", content: "wallet.pay(itemPrice); // The wallet checks its own balance and handles receipts inside!" },
        { title: "Why it helps", content: "If you add sales tax or a discount coupon later, you update only the wallet.pay() method, instead of changing 50 different pages." },
      ],
    },
    part4: {
      title: "Unprotected vs Encapsulated Code",
      bad: {
        title: "❌ Bad: Anyone can tamper with variables",
        code: `class SmartLock {
  public isLocked: boolean = true;
}

const doorLock = new SmartLock();
// An unauthorized person can unlock the door without a passcode!
doorLock.isLocked = false; // 💥 Security bypassed!`,
        explanation: "Because isLocked is public, anyone can bypass the security check and unlock the door without entering a passcode.",
      },
      good: {
        title: "✅ Good: Protected by passcode verification",
        code: `class SmartLock {
  private _isLocked: boolean = true;
  private readonly _correctPin: string = "4321";

  public unlock(enteredPin: string): boolean {
    if (enteredPin === this._correctPin) {
      this._isLocked = false;
      console.log("🔓 Door unlocked successfully!");
      return true;
    }
    console.log("❌ Incorrect PIN! Alarm triggered.");
    return false;
  }

  public get isLocked(): boolean {
    return this._isLocked;
  }
}`,
        explanation: "The lock is private. The only way to unlock it is by calling unlock(pin) with the right code.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a Digital Wallet that protects its balance and enforces a maximum daily spending limit:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENCAPSULATION DEMO: DIGITAL WALLET
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class DigitalWallet {
  // 🔒 Private variables: cannot be modified from outside
  private _balance: number;
  private _dailySpent: number = 0;
  private readonly _dailyLimit: number;

  constructor(startingMoney: number, dailyMaxLimit: number = 300) {
    this._balance = startingMoney;
    this._dailyLimit = dailyMaxLimit;
  }

  // 🟢 Public safe method
  public buyItem(itemName: string, price: number): boolean {
    if (price <= 0) {
      console.log("Price must be greater than 0!");
      return false;
    }
    if (price > this._balance) {
      console.log(\`❌ Not enough money to buy \${itemName} (Cost: $\${price}, Balance: $\${this._balance})\`);
      return false;
    }
    if (this._dailySpent + price > this._dailyLimit) {
      console.log(\`⚠️ Spending limit reached! Daily limit is $\${this._dailyLimit}\`);
      return false;
    }

    this._balance -= price;
    this._dailySpent += price;
    console.log(\`🛍️ Bought \${itemName} for $\${price}. Remaining balance: $\${this._balance}\`);
    return true;
  }

  public get balance(): number {
    return this._balance;
  }
}

const myWallet = new DigitalWallet(500, 200);

myWallet.buyItem("Headphones", 80);   // Works! ($420 left)
myWallet.buyItem("Keyboard", 100);    // Works! ($320 left)
myWallet.buyItem("Monitor", 50);      // Blocked! Daily limit ($200) reached.
`,
    },
    part6: {
      title: "Encapsulation Quiz",
      quiz: {
        question: "Why should we use 'private' for internal variables instead of making everything 'public'?",
        options: [
          "To speed up internet download speeds.",
          "To prevent external code from tampering with data and breaking business rules.",
          "Because TypeScript will refuse to compile without private keywords.",
          "To make the variables invisible in the browser window.",
        ],
        correctIndex: 1,
        explanation: "Private fields ensure that outside code cannot bypass validation rules or put your object into a broken state.",
      },
    },
    part7: {
      title: "Summary & Best Habits",
      takeaways: [
        { title: "1. Hide the Wiring", desc: "Keep variables private. Only provide clean, safe public methods." },
        { title: "2. Validate Everything", desc: "Check rules inside your methods before changing any values." },
        { title: "3. Tell, Don't Ask", desc: "Call myWallet.buyItem() instead of pulling raw balance numbers out." },
        { title: "4. Next: Abstraction", desc: "In OOP-03, we learn how to simplify complex systems using Interfaces." },
      ],
      nextLessonPreview: {
        title: "OOP-03: Abstraction & Interfaces: Contracts Over Implementations",
        desc: "Learn how to hide complicated gears and expose simple buttons with Interfaces.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-03: Abstraction
  // ─────────────────────────────────────────────────────────────
  "oop03-abstraction": {
    slug: "oop03-abstraction",
    code: "OOP-03",
    title: "Abstraction & Interfaces: Contracts Over Implementations",
    subtitle: "Hide the complicated machinery: expose simple, clear buttons with Interfaces so you can switch tools easily.",
    sections: [
      { id: "part1", label: "The Car Pedal Analogy", icon: "🚗" },
      { id: "part2", label: "What is an Interface?", icon: "🔌" },
      { id: "part3", label: "Plugging in Different Tools", icon: "🧩" },
      { id: "part4", label: "Direct Coupling vs Clean Interface", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Abstraction Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Car Pedal Analogy",
      bigPicture: "When you drive a car, you press the gas pedal to speed up and the brake pedal to stop. You don't need to know how the engine injects gasoline or how brake fluid pressurizes the wheels. That is Abstraction: showing you simple controls while hiding the complicated machinery underneath!",
      breakdownTitle: "Everyday Examples of Abstraction:",
      breakdownItems: [
        { title: "A Light Switch", desc: "You flip a switch up for ON and down for OFF. You don't manage copper wires inside the wall." },
        { title: "Universal USB-C Port", desc: "You plug a cable in to charge. Your phone doesn't care whether the charger is made by Apple, Samsung, or Anker as long as it fits the USB-C standard." },
        { title: "Ordering Food on an App", desc: "You tap 'Order Pizza'. You don't need to know which highway the delivery driver takes to your house." },
      ],
    },
    part2: {
      title: "What is a TypeScript Interface?",
      intro: "An Interface is a promise or contract. It lists the methods a class MUST provide, without caring how it does them:",
      cards: [
        { number: "01", tag: "The Contract", title: "Interface (The Agreement)", description: "Says: 'Anyone who wants to be a PaymentGateway must have a processPayment(amount) method.'", color: "cyan" },
        { number: "02", tag: "The Tool", title: "Class (The Actual Worker)", description: "StripePayment, PayPalPayment, or ApplePay - each implements the contract in its own way.", color: "purple" },
      ],
      rule: {
        title: "💡 Golden Rule of Interfaces",
        content: "Program to an interface, not to a concrete tool. If your code asks for 'PaymentGateway', you can swap Stripe for PayPal in 1 second without breaking anything.",
      },
    },
    part3: {
      title: "Mental Model: Swappable Plugs",
      intro: "Interfaces let you swap different implementations without changing your main application code:",
      points: [
        { title: "1. Standard Plug", content: "interface INotifier { send(message: string): void; }" },
        { title: "2. Multiple Implementations", content: "EmailNotifier, SmsNotifier, and DiscordNotifier all implement INotifier." },
        { title: "3. Easy Unit Testing", content: "In testing, you can plug in a FakeNotifier that doesn't send real emails or charge real credit cards!" },
      ],
    },
    part4: {
      title: "Direct Coupling vs Clean Interface",
      bad: {
        title: "❌ Bad: Tightly locked to one vendor",
        code: `class CheckoutManager {
  public checkout(amount: number) {
    // 💥 Hardcoded directly to Stripe!
    const stripe = new StripeDirectSdk("key_123");
    stripe.sendRawHttpCharge(amount * 100);
  }
}`,
        explanation: "If your company wants to add PayPal or test the store offline, you must rewrite CheckoutManager because Stripe was hardcoded inside.",
      },
      good: {
        title: "✅ Good: Works with ANY payment method",
        code: `interface IPaymentMethod {
  pay(amount: number): boolean;
}

class CheckoutManager {
  // Accepts ANY payment method that follows the interface!
  constructor(private paymentTool: IPaymentMethod) {}

  public checkout(amount: number) {
    this.paymentTool.pay(amount);
  }
}`,
        explanation: "CheckoutManager doesn't care whether you pass Stripe, PayPal, or Crypto. As long as it has a pay() method, it works seamlessly.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with an abstract Notification System supporting Email, SMS, and Slack messages:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ABSTRACTION DEMO: NOTIFICATION SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Interface (The Contract)
interface INotificationService {
  sendMessage(user: string, message: string): void;
}

// 2. Implementation A: Email
class EmailNotification implements INotificationService {
  sendMessage(user: string, message: string): void {
    console.log(\`📧 Sending EMAIL to \${user}: "\${message}"\`);
  }
}

// 3. Implementation B: SMS Text Message
class SmsNotification implements INotificationService {
  sendMessage(user: string, message: string): void {
    console.log(\`📱 Sending SMS to \${user}: "\${message}"\`);
  }
}

// 4. Main App (Doesn't care which one is used!)
class OrderAlertSystem {
  constructor(private notifier: INotificationService) {}

  public orderShipped(customerName: string, orderNumber: string): void {
    this.notifier.sendMessage(customerName, \`Your order #\${orderNumber} is on the way!\`);
  }
}

// Try using Email:
const emailAlerts = new OrderAlertSystem(new EmailNotification());
emailAlerts.orderShipped("Sarah", "ORD-101");

// Try swapping to SMS with zero code changes in OrderAlertSystem!
const smsAlerts = new OrderAlertSystem(new SmsNotification());
smsAlerts.orderShipped("John", "ORD-202");
`,
    },
    part6: {
      title: "Abstraction Quiz",
      quiz: {
        question: "What is the main benefit of using an Interface in your code?",
        options: [
          "It makes your JavaScript code run 10x faster.",
          "It defines a standard contract so you can switch tools or mock tests without rewriting your main business logic.",
          "It eliminates the need for constructors.",
          "It prevents any user from viewing the web page.",
        ],
        correctIndex: 1,
        explanation: "Interfaces create a standard contract, letting you swap implementations (like changing from Email to SMS, or Stripe to PayPal) effortlessly.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Focus on What, Not How", desc: "Show users what a tool does without overwhelming them with internal details." },
        { title: "2. Interfaces are Contracts", desc: "Use interfaces to define the required methods for any worker class." },
        { title: "3. Easy to Swap", desc: "When you program to interfaces, switching vendors or mocking tests takes seconds." },
        { title: "4. Next: Inheritance", desc: "In OOP-04, we learn how child classes can share common traits from parent classes." },
      ],
      nextLessonPreview: {
        title: "OOP-04: Inheritance: Sharing Common Traits ('Is-A' Relationship)",
        desc: "Learn how base and child classes share code using extends and super.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-04: Inheritance
  // ─────────────────────────────────────────────────────────────
  "oop04-inheritance": {
    slug: "oop04-inheritance",
    code: "OOP-04",
    title: "Inheritance: Sharing Common Traits ('Is-A' Relationship)",
    subtitle: "Share common traits: create specialized child classes based on a parent class so you don't repeat yourself.",
    sections: [
      { id: "part1", label: "The 'Is-A' Relationship", icon: "🧬" },
      { id: "part2", label: "Parent & Child Classes", icon: "👨‍👦" },
      { id: "part3", label: "When NOT to Inherit", icon: "⚠️" },
      { id: "part4", label: "Duplicated Code vs Inheritance", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Inheritance Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Next Step", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The 'Is-A' Test",
      bigPicture: "In the real world, things belong to families. A Dog is an Animal. A Tesla is a Car. A Manager is an Employee. Because a Dog is an Animal, it automatically has general animal traits like breathing and eating. In OOP, Inheritance lets a child class inherit all fields and methods from a parent class so you don't have to re-type them.",
      breakdownTitle: "The Golden 'Is-A' Test:",
      breakdownItems: [
        { title: "ElectricCar IS-A Car (Valid)", desc: "ElectricCar has wheels, steering, and brakes like any car, plus extra battery features." },
        { title: "SavingsAccount IS-A BankAccount (Valid)", desc: "SavingsAccount deposits and withdraws like any account, plus adds monthly interest." },
        { title: "User IS-A Database (Invalid!)", desc: "A User is NOT a Database. A User HAS A database connection. Don't use inheritance here!" },
      ],
    },
    part2: {
      title: "Parent & Child Classes in TypeScript",
      intro: "TypeScript uses `extends` to inherit and `super()` to call the parent's setup:",
      cards: [
        { number: "01", tag: "Parent (Base)", title: "Parent Class (General)", description: "Contains shared properties that every child will need (e.g. Animal: name, eat()).", color: "purple" },
        { number: "02", tag: "Child (Derived)", title: "Child Class (Specialized)", description: "Adds special extra properties and behaviors (e.g. Dog: bark(), fetchBall()).", color: "emerald" },
      ],
      rule: {
        title: "💡 The super() Keyword",
        content: "When a child class constructor runs, it calls super() first to let the parent initialize its own fields properly.",
      },
    },
    part3: {
      title: "Common Inheritance Mistakes",
      intro: "Inheritance is powerful, but don't overuse it just to share 3 lines of code:",
      points: [
        { title: "1. Only Inherit for True Types", content: "Use inheritance only when the child is genuinely a specialized version of the parent." },
        { title: "2. Don't Build Giant Family Trees", content: "Having Class A -> Class B -> Class C -> Class D -> Class E creates fragile code that breaks easily." },
        { title: "3. Never Remove Parent Guarantees", content: "A child class must not disable or break the methods that the parent promised to do." },
      ],
    },
    part4: {
      title: "Duplicated Code vs Inheritance",
      bad: {
        title: "❌ Bad: Copy-pasting the same code into 3 classes",
        code: `class FullTimeEmployee {
  constructor(public name: string, public salary: number) {}
  public clockIn() { console.log(this.name + " clocked in"); }
}

class ContractorEmployee {
  // Duplicating the exact same constructor and clockIn method!
  constructor(public name: string, public hourlyRate: number) {}
  public clockIn() { console.log(this.name + " clocked in"); }
}`,
        explanation: "Copying and pasting the same fields and methods across multiple classes creates maintenance headaches when rules change.",
      },
      good: {
        title: "✅ Good: Shared base class with specialized children",
        code: `abstract class Employee {
  constructor(public readonly name: string) {}
  public clockIn() { console.log(this.name + " clocked in."); }
  public abstract calculateMonthlyPay(): number;
}

class FullTimeEmployee extends Employee {
  constructor(name: string, private salary: number) {
    super(name);
  }
  public calculateMonthlyPay() { return this.salary; }
}

class HourlyContractor extends Employee {
  constructor(name: string, private rate: number, private hours: number) {
    super(name);
  }
  public calculateMonthlyPay() { return this.rate * this.hours; }
}`,
        explanation: "Both employees inherit name and clockIn() from Employee, while providing their own custom pay calculation.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a Vehicle hierarchy featuring regular Cars and specialized Electric Cars:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INHERITANCE DEMO: VEHICLES & ELECTRIC CARS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Base Parent Class
class Vehicle {
  constructor(public readonly brand: string, public readonly model: string) {}

  public startEngine(): void {
    console.log(\`🚗 \${this.brand} \${this.model}: Engine started! Vroom!\`);
  }

  public honk(): void {
    console.log("📢 Beep beep!");
  }
}

// 2. Child Class inheriting from Vehicle
class ElectricCar extends Vehicle {
  private batteryPercent: number;

  constructor(brand: string, model: string, startingBattery: number = 100) {
    super(brand, model); // Call parent constructor
    this.batteryPercent = startingBattery;
  }

  // Override parent method with silent electric start
  public override startEngine(): void {
    console.log(\`⚡ \${this.brand} \${this.model}: Silent electric power ON (\${this.batteryPercent}% battery)\`);
  }

  public charge(): void {
    this.batteryPercent = 100;
    console.log(\`🔋 \${this.brand} \${this.model} is now fully charged!\`);
  }
}

const gasCar = new Vehicle("Toyota", "Corolla");
gasCar.startEngine();
gasCar.honk();

const tesla = new ElectricCar("Tesla", "Model 3", 85);
tesla.startEngine(); // Uses electric sound!
tesla.honk();        // Inherited from Vehicle!
tesla.charge();      // Specific to ElectricCar!
`,
    },
    part6: {
      title: "Inheritance Quiz",
      quiz: {
        question: "When should you use Class Inheritance (extends)?",
        options: [
          "Whenever you want to copy a single helper function between two unrelated classes.",
          "When a child class truly 'is a' specialized version of the parent class (e.g. Dog is an Animal).",
          "To bypass private variables in JavaScript.",
          "When you want to avoid writing constructors.",
        ],
        correctIndex: 1,
        explanation: "Inheritance should only be used when a genuine 'is-a' relationship exists, ensuring the child fulfills all parent promises.",
      },
    },
    part7: {
      title: "Summary & Next Step",
      takeaways: [
        { title: "1. The 'Is-A' Rule", desc: "Only inherit when Class B is truly a type of Class A." },
        { title: "2. Reuse with super()", desc: "Call super() to let the parent initialize its shared properties." },
        { title: "3. Override When Needed", desc: "Child classes can customize parent methods using the override keyword." },
        { title: "4. Next: Polymorphism", desc: "In OOP-05, we learn how one method call can produce different results automatically." },
      ],
      nextLessonPreview: {
        title: "OOP-05: Polymorphism: Eliminating Conditionals with Dynamic Dispatch",
        desc: "Learn how one method call triggers different behaviors without messy if/else statements.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-05: Polymorphism
  // ─────────────────────────────────────────────────────────────
  "oop05-polymorphism": {
    slug: "oop05-polymorphism",
    code: "OOP-05",
    title: "Polymorphism: Eliminating Conditionals with Dynamic Dispatch",
    subtitle: "One command, many behaviors: tell different objects to do an action, and each one handles it in its own way.",
    sections: [
      { id: "part1", label: "The Universal Remote Analogy", icon: "📺" },
      { id: "part2", label: "How Polymorphism Works", icon: "🎭" },
      { id: "part3", label: "Killing Ugly Switch Statements", icon: "🧹" },
      { id: "part4", label: "Switch-Case vs Polymorphism", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Polymorphism Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & 4 Pillars Complete!", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Universal Remote Analogy",
      bigPicture: "The word Polymorphism comes from Greek: 'Poly' (many) and 'Morph' (forms). It means one single command can take many different forms. Think of a universal 'Play' button on your computer. When you play a Song, it plays audio through speakers. When you play a Movie, it shows video on screen. When you play a Game, it opens a 3D window. You just click 'Play' — the object knows what to do!",
      breakdownTitle: "Real-Life Examples of Polymorphism:",
      breakdownItems: [
        { title: "The 'Speak' Command", desc: "If you tell a Dog to speak, it says 'Woof!'. If you tell a Cat to speak, it says 'Meow!'. If you tell a Cow, it says 'Moo!'." },
        { title: "Print Document Button", desc: "Whether you print a PDF, Word Document, or Photo, you just click 'Print'." },
        { title: "Draw Shapes", desc: "You loop over an array of shapes and call shape.draw(). Circles draw curves, Rectangles draw 4 corners." },
      ],
    },
    part2: {
      title: "Why Polymorphism Makes Code Easy to Extend",
      intro: "Without polymorphism, every time you add a new feature, you must edit 10 different switch/case statements across your app:",
      cards: [
        { number: "01", tag: "One Loop", title: "Uniform Execution", description: "You can put Dogs, Cats, and Birds in one single array and call animal.makeSound() on all of them.", color: "purple" },
        { number: "02", tag: "Easy to Add", title: "Add Without Breaking", description: "To add a new Lion, just create a Lion class. You don't edit a single line of existing code!", color: "emerald" },
      ],
      rule: {
        title: "💡 The Anti-Switch Heuristic",
        content: "Whenever you find yourself writing a giant switch(type) with 10 cases, replace it with polymorphism!",
      },
    },
    part3: {
      title: "Mental Model: Clean Shapes Example",
      intro: "Look how easy it is to calculate total area of different shapes using polymorphism:",
      points: [
        { title: "1. Common Contract", content: "interface IShape { getArea(): number; }" },
        { title: "2. Circle calculates", content: "Math.PI * radius * radius" },
        { title: "3. Rectangle calculates", content: "width * height" },
        { title: "4. The Caller", content: "shapes.reduce((total, s) => total + s.getArea(), 0); // Clean and simple!" },
      ],
    },
    part4: {
      title: "Switch-Case vs Polymorphism",
      bad: {
        title: "❌ Bad: Fragile switch-case everywhere",
        code: `function calculateTax(country: string, amount: number) {
  // 💥 Every time a new country is added, this function must be edited!
  switch (country) {
    case "US": return amount * 0.07;
    case "UK": return amount * 0.20;
    case "CA": return amount * 0.13;
    default: throw new Error("Unknown country");
  }
}`,
        explanation: "Adding a new country forces you to find and edit every switch statement across the codebase, risking new bugs.",
      },
      good: {
        title: "✅ Good: Pluggable tax strategy classes",
        code: `interface ITaxStrategy {
  calculate(amount: number): number;
}

class UsTax implements ITaxStrategy {
  calculate(amount: number) { return amount * 0.07; }
}

class UkTax implements ITaxStrategy {
  calculate(amount: number) { return amount * 0.20; }
}

// Adding Germany requires only a new class:
class GermanyTax implements ITaxStrategy {
  calculate(amount: number) { return amount * 0.19; }
}`,
        explanation: "To add Germany, you just create a GermanyTax class. Existing code is completely untouched and safe.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with different payment methods (Credit Card, PayPal, Crypto) responding to the same processPayment command:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POLYMORPHISM DEMO: PAYMENT PROCESSORS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface IPaymentProcessor {
  name: string;
  pay(amount: number): void;
}

class CreditCardProcessor implements IPaymentProcessor {
  public name = "Credit Card (Visa)";
  public pay(amount: number): void {
    console.log(\`💳 Charging $\${amount} to Credit Card with 2% fee.\`);
  }
}

class PayPalProcessor implements IPaymentProcessor {
  public name = "PayPal";
  public pay(amount: number): void {
    console.log(\`🅿️ Redirecting to PayPal login to authorize $\${amount}.\`);
  }
}

class CryptoProcessor implements IPaymentProcessor {
  public name = "Bitcoin Lightning";
  public pay(amount: number): void {
    console.log(\`⚡ Generating instant Bitcoin Lightning invoice for $\${amount}.\`);
  }
}

// We can put all different payment tools in one array!
const paymentOptions: IPaymentProcessor[] = [
  new CreditCardProcessor(),
  new PayPalProcessor(),
  new CryptoProcessor()
];

// Execute payment on all of them using one clean loop:
const orderPrice = 100;
paymentOptions.forEach(option => {
  console.log(\`\\n--- Trying \${option.name} ---\`);
  option.pay(orderPrice);
});
`,
    },
    part6: {
      title: "Polymorphism Quiz",
      quiz: {
        question: "How does Polymorphism help you when adding a new feature to your app?",
        options: [
          "It forces you to rewrite all existing files from scratch.",
          "It allows you to add a new class that implements the existing interface without having to modify existing tested code.",
          "It encrypts your source code files.",
          "It reduces the number of variables in JavaScript memory.",
        ],
        correctIndex: 1,
        explanation: "Polymorphism lets you extend your app simply by adding a new class. Existing dispatch loops work automatically without edits.",
      },
    },
    part7: {
      title: "Summary & 4 Pillars Complete!",
      takeaways: [
        { title: "1. The 4 Pillars Mastered", desc: "You now know Encapsulation, Abstraction, Inheritance, and Polymorphism!" },
        { title: "2. One Command, Many Forms", desc: "Call the same method name, and each object executes its own specialized behavior." },
        { title: "3. No More Giant Switches", desc: "Replace fragile switch/case ladders with clean polymorphic classes." },
        { title: "4. Next: Object Relationships", desc: "In Stage 2, we explore how multiple objects connect and work together." },
      ],
      nextLessonPreview: {
        title: "OOP-06: Object Relationships: Association, Aggregation & Composition",
        desc: "Learn how objects link together: uses-a, has-a, and whole-part relationships.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-06: Object Relationships
  // ─────────────────────────────────────────────────────────────
  "oop06-object-relationships": {
    slug: "oop06-object-relationships",
    code: "OOP-06",
    title: "Object Relationships: Association, Aggregation & Composition",
    subtitle: "How objects work together: the 3 simple ways objects connect with each other.",
    sections: [
      { id: "part1", label: "The 3 Types of Relationships", icon: "🔗" },
      { id: "part2", label: "Friends vs Parts (Lifecycles)", icon: "🤝" },
      { id: "part3", label: "Composition: Whole & Parts", icon: "🧩" },
      { id: "part4", label: "Messy Coupling vs Clean Relationships", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Relationships Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Best Habits", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The 3 Relationships",
      bigPicture: "In real life, people and things connect in different ways. You 'know' your doctor (Association). A university 'has' students (Aggregation — if the university closes, students still exist). A house 'has' rooms (Composition — if the house is demolished, the rooms are destroyed too!). Understanding these 3 connections helps you design clean systems without memory leaks.",
      breakdownTitle: "The 3 Ways Objects Connect:",
      breakdownItems: [
        { title: "1. Association ('Uses-A')", desc: "Loose connection. A Doctor uses a Stethoscope. Both exist independently." },
        { title: "2. Aggregation ('Has-A' Independent)", desc: "A Shopping Cart has Items. If you delete the cart, the products in the store catalog still exist." },
        { title: "3. Composition ('Has-A' Bound Together)", desc: "A Human Body has a Heart. The heart cannot exist or function without the body." },
      ],
    },
    part2: {
      title: "How to Tell Aggregation from Composition",
      intro: "Ask this simple question: 'If I delete the parent object, should the child object be deleted too?'",
      cards: [
        { number: "01", tag: "Independent", title: "Aggregation (Shared)", description: "Parent holds a reference to items created elsewhere. Items survive if the parent is deleted.", color: "purple" },
        { number: "02", tag: "Bound", title: "Composition (Owned)", description: "Parent creates and owns the child. If the parent is destroyed, the child is destroyed too.", color: "emerald" },
      ],
      rule: {
        title: "💡 The Lifecycle Test",
        content: "House demolished -> Rooms destroyed = Composition. Classroom dismissed -> Students go home = Aggregation.",
      },
    },
    part3: {
      title: "Mental Model: An E-Commerce Order",
      intro: "Look at how an Order connects to other objects:",
      points: [
        { title: "Customer (Aggregation)", content: "The Order references a Customer. If the order is deleted, the Customer account still exists." },
        { title: "OrderLineItem (Composition)", content: "The Order owns its LineItems. If the Order is deleted, those specific line items are deleted too." },
        { title: "EmailService (Association)", content: "The Order uses an EmailService to send a receipt, then forgets about it." },
      ],
    },
    part4: {
      title: "Messy Coupling vs Clean Relationships",
      bad: {
        title: "❌ Bad: Direct messy access to internal children",
        code: `class Order {
  // Exposing raw array of items to anyone:
  public items: any[] = [];
}

const order = new Order();
// Anyone can push invalid fake items without checking prices!
order.items.push({ name: "Hacked Item", price: -500 });`,
        explanation: "Exposing internal child items allows callers to bypass validation and corrupt order totals.",
      },
      good: {
        title: "✅ Good: Controlled composition through the parent",
        code: `class OrderItem {
  constructor(public readonly name: string, public readonly price: number) {
    if (price <= 0) throw new Error("Price must be positive");
  }
}

class Order {
  private _items: OrderItem[] = [];

  public addItem(name: string, price: number): void {
    const item = new OrderItem(name, price);
    this._items.push(item);
  }

  public get items(): ReadonlyArray<OrderItem> {
    return [...this._items];
  }
}`,
        explanation: "Order manages item creation and returns a safe read-only copy of items so callers cannot tamper with them.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a Computer model demonstrating Composition (CPU) and Aggregation (USB Mouse):",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OBJECT RELATIONSHIPS: COMPUTER & PERIPHERALS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Internal Part (Composition)
class CPU {
  constructor(public model: string) {}
  compute() { console.log(\`⚡ CPU (\${this.model}) executing calculations.\`); }
}

// 2. External Plug-in Part (Aggregation)
interface IUsbDevice {
  name: string;
  connect(): void;
}

class Computer {
  // 🧩 COMPOSITION: CPU is created and owned inside the computer
  private cpu: CPU;

  // 🤝 AGGREGATION: USB devices are plugged in from the outside
  private usbDevices: IUsbDevice[] = [];

  constructor(cpuModel: string) {
    this.cpu = new CPU(cpuModel);
  }

  public plugInUsb(device: IUsbDevice): void {
    this.usbDevices.push(device);
    device.connect();
  }

  public powerOn(): void {
    console.log("🖥️ Computer turning on...");
    this.cpu.compute();
    console.log(\`✅ Ready with \${this.usbDevices.length} USB device(s) connected.\`);
  }
}

const myPC = new Computer("Intel Core i9");
myPC.plugInUsb({ name: "Gaming Mouse", connect: () => console.log("🖱️ Mouse connected.") });
myPC.plugInUsb({ name: "Keyboard", connect: () => console.log("⌨️ Keyboard connected.") });

myPC.powerOn();
`,
    },
    part6: {
      title: "Relationships Quiz",
      quiz: {
        question: "Which of the following is the best real-world example of COMPOSITION?",
        options: [
          "A Teacher and the Students in a school.",
          "A House and the Rooms inside it (rooms cannot exist without the house).",
          "A Driver and the rental car they drive for a day.",
          "A Customer and the ATM machine they use.",
        ],
        correctIndex: 1,
        explanation: "Rooms are created for the house and have no independent existence if the house is destroyed. That is strict Composition.",
      },
    },
    part7: {
      title: "Summary & Best Habits",
      takeaways: [
        { title: "1. Association", desc: "Objects simply use each other temporarily (uses-a)." },
        { title: "2. Aggregation", desc: "Parent has independent items created from the outside." },
        { title: "3. Composition", desc: "Parent creates and owns child parts with tied lifecycles." },
        { title: "4. Next: Composition Over Inheritance", desc: "In OOP-07, we see why assembling Lego blocks beats building giant class hierarchies." },
      ],
      nextLessonPreview: {
        title: "OOP-07: Favor Composition Over Inheritance",
        desc: "Learn why building with Lego-like components is better than deep inheritance trees.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-07: Composition Over Inheritance
  // ─────────────────────────────────────────────────────────────
  "oop07-composition-over-inheritance": {
    slug: "oop07-composition-over-inheritance",
    code: "OOP-07",
    title: "Favor Composition Over Inheritance",
    subtitle: "Build with Lego blocks: assemble small pluggable components instead of deep, fragile family trees.",
    sections: [
      { id: "part1", label: "The Lego Brick Philosophy", icon: "🧱" },
      { id: "part2", label: "Why Deep Inheritance Breaks", icon: "💥" },
      { id: "part3", label: "Delegation in Action", icon: "🤝" },
      { id: "part4", label: "Class Explosion vs Pluggable Components", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Composition Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Lego Analogy",
      bigPicture: "Think of playing with Lego bricks. You don't glue all your bricks into one permanent statue. If you want a car that flies, you snap wings onto your car. If you want it to float on water, you snap boat hulls underneath. That is Composition: assembling small, interchangeable components together! Gang of Four Principle: 'Favor object composition over class inheritance.'",
      breakdownTitle: "Why Deep Inheritance Hierarchies Cause Pain:",
      breakdownItems: [
        { title: "Too Many Subclasses", desc: "Need a FlyingMonster, SwimmingMonster, and FlyingSwimmingMonster? With inheritance, you need 8 different classes!" },
        { title: "Locked at Build Time", desc: "You cannot change an object's parent class while the game or app is running." },
        { title: "The Gorilla-Banana Problem", desc: "You wanted a simple banana, but you got a gorilla holding the banana and the entire jungle." },
      ],
    },
    part2: {
      title: "The Fragile Base Class Problem",
      intro: "When you change one line in a parent class, 20 child classes can break without warning:",
      cards: [
        { number: "01", tag: "Inheritance", title: "Tight Coupling (Rigid)", description: "Child is permanently welded to the parent's internal code. If parent changes, child breaks.", color: "rose" },
        { number: "02", tag: "Composition", title: "Loose Coupling (Flexible)", description: "Object holds a helper component. If you need new behavior, just swap the helper!", color: "emerald" },
      ],
      rule: {
        title: "💡 Simple Question",
        content: "Ask: 'Is this an IS-A relationship (Dog is Animal) or a CAN-DO capability (Robot can Fly)?' If it's a capability, use Composition!",
      },
    },
    part3: {
      title: "Mental Model: Swapping Tools at Runtime",
      intro: "Look how a Video Game Character swaps weapons using composition:",
      points: [
        { title: "1. Character Class", content: "Holds a 'weapon' field (interface IWeapon)." },
        { title: "2. Sword & Bow", content: "Sword and Bow each implement IWeapon." },
        { title: "3. Instant Swap", content: "hero.setWeapon(new Bow()) — the character changes weapon instantly without creating a new 'BowHero' class!" },
      ],
    },
    part4: {
      title: "Class Explosion vs Pluggable Components",
      bad: {
        title: "❌ Bad: Creating a class for every combination",
        code: `class Robot {}
class FlyingRobot extends Robot {}
class SwimmingRobot extends Robot {}
// 💥 What if a robot flies AND swims?
class FlyingSwimmingRobot extends FlyingRobot {
  // Must copy-paste all SwimmingRobot code!
}`,
        explanation: "Inheritance forces you to create messy combinations of classes with duplicated code.",
      },
      good: {
        title: "✅ Good: Pluggable movement components",
        code: `interface IMovement { move(): void; }

class FlyMovement implements IMovement {
  move() { console.log("Flying in the sky!"); }
}

class SwimMovement implements IMovement {
  move() { console.log("Swimming in water!"); }
}

class Robot {
  constructor(private movement: IMovement) {}

  public setMovement(m: IMovement) { this.movement = m; }
  public move() { this.movement.move(); }
}`,
        explanation: "Robot holds any movement tool. You can switch from flying to swimming with one line of code.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with an Audio Player that can swap its music decoder (MP3 vs Lossless FLAC) at runtime:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPOSITION OVER INHERITANCE DEMO: AUDIO PLAYER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Pluggable Decoder Component
interface IAudioDecoder {
  name: string;
  decode(fileName: string): string;
}

class Mp3Decoder implements IAudioDecoder {
  public name = "MP3 (Standard)";
  public decode(file: string) { return \`[MP3 Decoded Sound: \${file}]\`; }
}

class FlacDecoder implements IAudioDecoder {
  public name = "FLAC (High Quality)";
  public decode(file: string) { return \`[FLAC Studio Master Sound: \${file}]\`; }
}

// 2. Audio Player composed of a Decoder
class AudioPlayer {
  constructor(private decoder: IAudioDecoder) {}

  public setDecoder(newDecoder: IAudioDecoder): void {
    this.decoder = newDecoder;
    console.log(\`🔄 Audio Player switched to: \${newDecoder.name}\`);
  }

  public play(songName: string): void {
    const soundData = this.decoder.decode(songName);
    console.log(\`🔊 Playing: \${soundData}\`);
  }
}

const player = new AudioPlayer(new Mp3Decoder());
player.play("song_01.mp3");

// Switch to FLAC on the fly without making a new Player class!
player.setDecoder(new FlacDecoder());
player.play("orchestra_live.flac");
`,
    },
    part6: {
      title: "Composition Quiz",
      quiz: {
        question: "Why is Composition usually preferred over deep Class Inheritance?",
        options: [
          "Because Composition allows you to swap and combine behaviors at runtime without creating dozens of rigid subclasses.",
          "Because Inheritance is not supported in modern TypeScript.",
          "Because Composition makes files 100x smaller.",
          "Because private variables cannot be used with inheritance.",
        ],
        correctIndex: 0,
        explanation: "Composition lets you snap interchangeable components together like Lego bricks, giving you maximum flexibility.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Build Like Lego", desc: "Combine small helper components instead of creating giant family trees." },
        { title: "2. Swap at Runtime", desc: "You can change an object's behavior simply by swapping its helper component." },
        { title: "3. Avoid Fragile Base Classes", desc: "Changing one component won't break unrelated parts of your app." },
        { title: "4. Next: Coupling & Cohesion", desc: "In OOP-08, we learn how to keep components independent and focused." },
      ],
      nextLessonPreview: {
        title: "OOP-08: Coupling & Cohesion: The Twin Metrics of Clean Design",
        desc: "Learn how to write focused classes (high cohesion) with loose connections (low coupling).",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-08: Coupling & Cohesion
  // ─────────────────────────────────────────────────────────────
  "oop08-coupling-and-cohesion": {
    slug: "oop08-coupling-and-cohesion",
    code: "OOP-08",
    title: "Coupling & Cohesion: The Twin Metrics of Clean Design",
    subtitle: "Do one job well (High Cohesion) and keep loose connections (Low Coupling) so changes are easy.",
    sections: [
      { id: "part1", label: "The Two Golden Rules", icon: "⚖️" },
      { id: "part2", label: "High Cohesion Explained", icon: "🎯" },
      { id: "part3", label: "The Law of Demeter", icon: "🛡️" },
      { id: "part4", label: "Train Wreck vs Clean Calls", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Coupling & Cohesion Quiz", icon: "🎯" },
      { id: "part7", label: "Stage 2 Summary & Next Step", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Two Golden Rules",
      bigPicture: "How do you know if code is written well? It comes down to two simple concepts: Cohesion (how focused a class is on doing its own job) and Coupling (how tightly connected classes are to each other). The secret to clean software is: High Cohesion + Low Coupling!",
      breakdownTitle: "The Simple Definitions:",
      breakdownItems: [
        { title: "High Cohesion (Good)", desc: "A class does ONE main job and does it completely (e.g. a Chef cooks food; they don't also do tax accounting and fix the roof)." },
        { title: "Low Coupling (Good)", desc: "Classes have loose connections (like Bluetooth headphones — you can change your phone without throwing away your headphones)." },
        { title: "Shotgun Surgery (Bad)", desc: "When one small business change forces you to edit 15 different files because everything is tangled together." },
      ],
    },
    part2: {
      title: "Cohesion vs Coupling in Pictures",
      intro: "Aim for focused workers with clean, loose handshakes:",
      cards: [
        { number: "01", tag: "Cohesion", title: "Focused Purpose", description: "All methods in the class directly relate to its single goal. Easy to read, test, and debug.", color: "emerald" },
        { number: "02", tag: "Coupling", title: "Loose Handshakes", description: "Classes talk through simple interfaces. If Class A changes, Class B doesn't care.", color: "purple" },
      ],
      rule: {
        title: "💡 The Law of Demeter",
        content: "Also called 'Don't talk to strangers'. A method should only talk to its immediate friends, not its friend's cousin's neighbor's dog!",
      },
    },
    part3: {
      title: "Mental Model: Stop the Train Wrecks",
      intro: "Avoid long dot-chain calls across multiple nested objects (train wrecks):",
      points: [
        { title: "❌ Train Wreck (High Coupling)", content: "user.getAccount().getWallet().getCard().getBank().getAddress().getZip(); // If anything changes, code crashes!" },
        { title: "✅ Clean Handshake (Low Coupling)", content: "user.getBillingZipCode(); // Ask user directly, let user coordinate internally." },
      ],
    },
    part4: {
      title: "Train Wreck vs Clean Calls",
      bad: {
        title: "❌ Bad: Digging 4 levels deep into internal objects",
        code: `class OrderProcessor {
  public payOrder(customer: any) {
    // 💥 Train wreck digging into customer internals:
    if (customer.wallet.cards[0].issuer.isBlocked) {
      throw new Error("Card blocked");
    }
    customer.wallet.cards[0].balance -= 50;
  }
}`,
        explanation: "OrderProcessor knows way too much about customer's wallet, card array, and bank issuer. Super fragile.",
      },
      good: {
        title: "✅ Good: Ask the direct friend to do the job",
        code: `class Customer {
  public charge(amount: number): boolean {
    // Customer handles its own wallet internally!
    return this.wallet.charge(amount);
  }
}

class OrderProcessor {
  public payOrder(customer: Customer, amount: number) {
    // Talks only to customer!
    const success = customer.charge(amount);
    if (!success) throw new Error("Payment failed");
  }
}`,
        explanation: "OrderProcessor only talks to Customer. Internal wallet structures can change without breaking OrderProcessor.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with refactoring a tangled checkout call to follow the Law of Demeter:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LAW OF DEMETER & HIGH COHESION DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class Address {
  constructor(public city: string, public zip: string) {}
}

class CustomerProfile {
  constructor(
    public name: string,
    private address: Address
  ) {}

  // Encapsulated method honoring Law of Demeter
  public getShippingCity(): string {
    return this.address.city;
  }
}

class DeliveryDispatcher {
  public sendPackage(customer: CustomerProfile, trackingCode: string): void {
    // Clean call: does not reach into customer.address.city
    const targetCity = customer.getShippingCity();
    console.log(\`📦 Package \${trackingCode} dispatched to \${customer.name} in \${targetCity}\`);
  }
}

const customer = new CustomerProfile("Jane Doe", new Address("Austin", "78701"));
const dispatcher = new DeliveryDispatcher();
dispatcher.sendPackage(customer, "TRK-9901");
`,
    },
    part6: {
      title: "Coupling & Cohesion Quiz",
      quiz: {
        question: "Which of the following lines of code is a direct violation of the Law of Demeter (Train Wreck)?",
        options: [
          "calculator.add(5, 10);",
          "order.getCustomer().getAccount().getWallet().getCard().charge(50);",
          "const total = order.calculateTotal();",
          "logger.log('Payment successful');",
        ],
        correctIndex: 1,
        explanation: "Chaining through 5 nested object layers (order -> customer -> account -> wallet -> card) tightly couples your code and violates the Law of Demeter.",
      },
    },
    part7: {
      title: "Stage 2 Summary & Next Step",
      takeaways: [
        { title: "1. High Cohesion", desc: "Give each class a single clear job to do." },
        { title: "2. Low Coupling", desc: "Connect classes loosely through simple interfaces." },
        { title: "3. Don't Talk to Strangers", desc: "Avoid chaining 5 dots across nested objects (Law of Demeter)." },
        { title: "4. Next: The SOLID Principles", desc: "In Stage 3 (OOP-09 to OOP-13), we master the famous SOLID rules of architecture!" },
      ],
      nextLessonPreview: {
        title: "OOP-09: Single Responsibility Principle (SRP)",
        desc: "Learn why every class should have only one reason to change.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-09: Single Responsibility Principle (SRP)
  // ─────────────────────────────────────────────────────────────
  "oop09-single-responsibility": {
    slug: "oop09-single-responsibility",
    code: "OOP-09",
    title: "Single Responsibility Principle (SRP)",
    subtitle: "One class, one job: a class should have one, and only one, reason to change.",
    sections: [
      { id: "part1", label: "The S in SOLID", icon: "1️⃣" },
      { id: "part2", label: "The Chef Analogy", icon: "👨‍🍳" },
      { id: "part3", label: "Separating Business, DB & UI", icon: "📐" },
      { id: "part4", label: "Giant Multi-Job Class vs SRP", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "SRP Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Chef Analogy",
      bigPicture: "In a great restaurant, the Chef cooks food, the Waiter takes orders, and the Accountant manages the financial books. Imagine if the Chef had to cook, deliver food, fix the plumbing, and write monthly tax reports all at once — the restaurant would collapse! The Single Responsibility Principle (SRP) says: Every class in your code should have ONE job and ONE reason to change.",
      breakdownTitle: "Warning Signs of an Overloaded Class:",
      breakdownItems: [
        { title: "The 2,000-Line Mega Class", desc: "One file handles business validation, runs database SQL queries, and formats HTML emails." },
        { title: "Multiple Teams Editing the Same File", desc: "The design team touches the file for HTML changes while backend developers touch it for database queries." },
        { title: "Merge Conflicts", desc: "Developers constantly get merge conflicts because unrelated features touch the same file." },
      ],
    },
    part2: {
      title: "How to Split Responsibilities Cleanly",
      intro: "Separate your code into 3 distinct worker roles:",
      cards: [
        { number: "01", tag: "Business Rules", title: "Domain Entity (Order)", description: "Calculates prices, applies discounts, checks item stock.", color: "purple" },
        { number: "02", tag: "Database", title: "Repository (OrderRepo)", description: "Saves and loads orders to PostgreSQL or MongoDB.", color: "cyan" },
        { number: "03", tag: "Presentation", title: "Formatter (InvoicePdf)", description: "Formats the order into a printable PDF or HTML receipt.", color: "emerald" },
      ],
      rule: {
        title: "💡 The Stakeholder Test",
        content: "If the Finance team changes tax rules, only InvoiceCalculator changes. If the DBA changes database tables, only InvoiceRepository changes.",
      },
    },
    part3: {
      title: "Mental Model: 3 Focused Collaborators",
      intro: "Instead of 1 giant class doing everything, create 3 small focused friends:",
      points: [
        { title: "1. User Entity", content: "Holds user profile data and validates email format." },
        { title: "2. UserRepository", content: "Saves the user to the database." },
        { title: "3. WelcomeEmailService", content: "Sends the welcome email to the user's inbox." },
      ],
    },
    part4: {
      title: "Giant Multi-Job Class vs SRP",
      bad: {
        title: "❌ Bad: One class doing 3 unrelated jobs",
        code: `class User {
  public name: string;
  public email: string;

  // Job 1: Business rule
  public changeEmail(newEmail: string) { /* ... */ }

  // Job 2: Database saving
  public saveToDatabase() {
    db.query("INSERT INTO users VALUES (...)");
  }

  // Job 3: Email template rendering
  public sendWelcomeEmail() {
    smtp.sendHtml("<h1>Welcome to our app!</h1>");
  }
}`,
        explanation: "This class changes when business rules change, when SQL database queries change, and when email templates change. 3 reasons to change.",
      },
      good: {
        title: "✅ Good: 3 classes with 1 job each",
        code: `class User {
  constructor(public id: string, public email: string) {}
}

class UserRepository {
  public save(user: User) {
    db.query("INSERT INTO users VALUES (...)");
  }
}

class UserEmailService {
  public sendWelcome(user: User) {
    smtp.sendHtml(user.email, "Welcome!");
  }
}`,
        explanation: "Each class has 1 job. Database changes only touch UserRepository. Email changes only touch UserEmailService.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with an SRP-compliant invoice system separating calculation, database storage, and receipt printing:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SINGLE RESPONSIBILITY PRINCIPLE (SRP) DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Role 1: Business Calculations
class Invoice {
  constructor(
    public readonly id: string,
    public readonly items: Array<{ name: string; price: number }>
  ) {}

  public calculateTotal(taxRate: number): number {
    const subtotal = this.items.reduce((sum, item) => sum + item.price, 0);
    return subtotal + subtotal * taxRate;
  }
}

// Role 2: Database Saving
class InvoiceRepository {
  public save(invoice: Invoice): void {
    console.log(\`💾 [DATABASE]: Invoice \${invoice.id} saved to PostgreSQL.\`);
  }
}

// Role 3: Printing / Presentation
class InvoicePrinter {
  public printReceipt(invoice: Invoice, total: number): void {
    console.log(\`🧾 [RECEIPT #\${invoice.id}]: Total Charged = $\${total.toFixed(2)}\`);
  }
}

const invoice = new Invoice("INV-500", [{ name: "Course Access", price: 99 }, { name: "Certificate", price: 20 }]);
const total = invoice.calculateTotal(0.08);

const repo = new InvoiceRepository();
repo.save(invoice);

const printer = new InvoicePrinter();
printer.printReceipt(invoice, total);
`,
    },
    part6: {
      title: "SRP Quiz",
      quiz: {
        question: "What does the Single Responsibility Principle mean in practice?",
        options: [
          "Every file must contain only one line of code.",
          "A class should have only one main job and only one reason to change.",
          "Every function must take only one single parameter.",
          "Only one developer is allowed to edit a file at a time.",
        ],
        correctIndex: 1,
        explanation: "SRP means a class should focus on a single responsibility, so changes to one business feature won't break unrelated features.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. One Class, One Job", desc: "Keep classes small and focused on a single responsibility." },
        { title: "2. Separate Data from UI", desc: "Don't mix database queries, HTML templates, and business calculations in one file." },
        { title: "3. Easy to Test", desc: "Single-job classes can be unit-tested in seconds without complex setups." },
        { title: "4. Next: Open/Closed Principle", desc: "In OOP-10, we learn how to add new features without modifying old code." },
      ],
      nextLessonPreview: {
        title: "OOP-10: Open/Closed Principle (OCP)",
        desc: "Learn how to make code open for new features, but closed for breaking existing code.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-10: Open/Closed Principle (OCP)
  // ─────────────────────────────────────────────────────────────
  "oop10-open-closed": {
    slug: "oop10-open-closed",
    code: "OOP-10",
    title: "Open/Closed Principle (OCP)",
    subtitle: "Open for extension, closed for modification: add new features without breaking existing, tested code.",
    sections: [
      { id: "part1", label: "The App Store Analogy", icon: "📱" },
      { id: "part2", label: "Extension vs Modification", icon: "🔌" },
      { id: "part3", label: "Plugin Architecture", icon: "🧩" },
      { id: "part4", label: "Editing Old Code vs Adding Plugins", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "OCP Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The App Store Analogy",
      bigPicture: "Think of your smartphone. When you want to play a new game or use a new chat app, you don't take your phone apart with a soldering iron to rewire the operating system. You simply download a new app from the App Store! The phone's core OS is 'Closed for modification', but 'Open for extension' through apps. That is the Open/Closed Principle!",
      breakdownTitle: "Why We Don't Want to Modify Old Code:",
      breakdownItems: [
        { title: "Old Code is Battle-Tested", desc: "Code that has run in production for 2 years without bugs shouldn't be edited if you can avoid it." },
        { title: "Accidental Regressions", desc: "Editing a 500-line calculation function to add a Black Friday discount might accidentally break regular discounts." },
        { title: "Safe Additions", desc: "When you add a new feature as a separate new file, there is 0% risk of breaking existing features." },
      ],
    },
    part2: {
      title: "How to Build Open/Closed Systems",
      intro: "Combine Interfaces with Strategy classes to create extension points:",
      cards: [
        { number: "01", tag: "Closed Core", title: "Core Engine (Unchanged)", description: "Calls a standard interface method. You never need to touch this file again.", color: "purple" },
        { number: "02", tag: "Open Extensions", title: "Plugin Strategies", description: "Each new feature is a new class implementing the interface.", color: "emerald" },
      ],
      rule: {
        title: "💡 The OCP Goal",
        content: "When a manager asks for a new discount rule, shipping carrier, or payment method, you should write a NEW class, not edit old files.",
      },
    },
    part3: {
      title: "Mental Model: Discount Rules Plugin",
      intro: "Look how easy it is to add new discount tiers without touching the core CheckoutEngine:",
      points: [
        { title: "1. The Contract", content: "interface IDiscount { apply(price: number): number; }" },
        { title: "2. Existing Rules", content: "RegularDiscount (0%), PremiumDiscount (10%), VipDiscount (20%)." },
        { title: "3. Adding BlackFriday", content: "Create BlackFridayDiscount implements IDiscount. Plug it in! Zero edits to old files." },
      ],
    },
    part4: {
      title: "Editing Old Code vs Adding Plugins",
      bad: {
        title: "❌ Bad: Editing giant if/else every time a tier is added",
        code: `class DiscountCalculator {
  public calculate(tier: string, price: number): number {
    // 💥 Every single marketing campaign requires editing this file!
    if (tier === "REGULAR") return price;
    if (tier === "PREMIUM") return price * 0.9;
    if (tier === "VIP") return price * 0.8;
    // Next month: if (tier === "SUMMER_SALE") ...
    return price;
  }
}`,
        explanation: "Every new promotion forces you to edit this file, risking breaking existing discounts.",
      },
      good: {
        title: "✅ Good: New tiers are independent new classes",
        code: `interface IDiscountStrategy {
  apply(price: number): number;
}

class RegularDiscount implements IDiscountStrategy {
  apply(price: number) { return price; }
}

class VipDiscount implements IDiscountStrategy {
  apply(price: number) { return price * 0.8; }
}

// Adding Summer Sale is 100% safe in a new class!
class SummerSaleDiscount implements IDiscountStrategy {
  apply(price: number) { return price * 0.7; }
}`,
        explanation: "The core checkout system is closed for modification. New discounts are created as independent classes.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with an extensible Tax Calculator that registers new country tax rules without editing the engine:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OPEN/CLOSED PRINCIPLE (OCP) DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ITaxRule {
  countryCode: string;
  calculateTax(subtotal: number): number;
}

class UsTaxRule implements ITaxRule {
  public countryCode = "US";
  public calculateTax(subtotal: number) { return subtotal * 0.07; }
}

class EuTaxRule implements ITaxRule {
  public countryCode = "EU";
  public calculateTax(subtotal: number) { return subtotal * 0.20; }
}

class TaxEngine {
  private rules = new Map<string, ITaxRule>();

  public registerRule(rule: ITaxRule): void {
    this.rules.set(rule.countryCode.toUpperCase(), rule);
  }

  public compute(country: string, amount: number): number {
    const rule = this.rules.get(country.toUpperCase());
    if (!rule) throw new Error(\`No tax rule for: \${country}\`);
    return rule.calculateTax(amount);
  }
}

const engine = new TaxEngine();
engine.registerRule(new UsTaxRule());
engine.registerRule(new EuTaxRule());

console.log("US Tax on $100:", engine.compute("US", 100));
console.log("EU Tax on $100:", engine.compute("EU", 100));
`,
    },
    part6: {
      title: "OCP Quiz",
      quiz: {
        question: "What does 'Open for extension, closed for modification' mean?",
        options: [
          "You should lock your computer with a password at the end of the day.",
          "You should be able to add new features by creating new classes without editing existing tested code.",
          "All files must be read-only on your hard drive.",
          "Open-source code must not be shared with anyone.",
        ],
        correctIndex: 1,
        explanation: "OCP means designing your code so new features are added as new plugins/classes without risking breaking old code.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Protect Tested Code", desc: "Don't constantly edit old working files to add new features." },
        { title: "2. Use Strategy Plugins", desc: "Create an interface and implement new features as separate classes." },
        { title: "3. Zero Regressions", desc: "New features cannot break old code if old code wasn't touched!" },
        { title: "4. Next: Liskov Substitution", desc: "In OOP-11, we learn how child classes must honor their parent's promises." },
      ],
      nextLessonPreview: {
        title: "OOP-11: Liskov Substitution Principle (LSP)",
        desc: "Ensure child classes can substitute parent classes without crashing.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-11: Liskov Substitution Principle (LSP)
  // ─────────────────────────────────────────────────────────────
  "oop11-liskov-substitution": {
    slug: "oop11-liskov-substitution",
    code: "OOP-11",
    title: "Liskov Substitution Principle (LSP)",
    subtitle: "No surprises: any child class should be able to substitute for its parent without crashing or breaking rules.",
    sections: [
      { id: "part1", label: "The Rubber Duck Analogy", icon: "🦆" },
      { id: "part2", label: "The Substitution Promise", icon: "📜" },
      { id: "part3", label: "The Classic Square-Rectangle Trap", icon: "📐" },
      { id: "part4", label: "Broken Subclass vs True Subclass", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "LSP Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Rubber Duck Analogy",
      bigPicture: "If it looks like a duck and quacks like a duck, but it needs batteries to work, you probably have the wrong abstraction! Barbara Liskov created this principle: If class B extends class A, anywhere in your program that expects an instance of A must work seamlessly when passed an instance of B. A child class must never surprise the caller by throwing 'Not supported' errors!",
      breakdownTitle: "Common Ways Child Classes Break LSP:",
      breakdownItems: [
        { title: "Throwing 'Not Supported' Errors", desc: "Parent Bird has fly(). Child Penguin extends Bird and throws Error('Penguins cannot fly!'). This breaks caller loops!" },
        { title: "Violating Parent Rules", desc: "Parent Rectangle allows setting width and height independently; Square overrides setWidth and secretly changes height too." },
        { title: "Demanding Stricter Inputs", desc: "Child class suddenly crashes on valid inputs that the parent handled fine." },
      ],
    },
    part2: {
      title: "The Substitution Rules",
      intro: "When you create a child class, you must honor all promises made by the parent:",
      cards: [
        { number: "01", tag: "Honor Promises", title: "No Unexpected Errors", description: "Do not override a method just to throw 'Feature Not Supported'.", color: "rose" },
        { number: "02", tag: "Seamless Replacement", title: "Safe in Loops", description: "Callers should be able to loop over parent references without checking 'if (child instanceof X)'.", color: "emerald" },
      ],
      rule: {
        title: "💡 Simple Heuristic",
        content: "If a child class cannot do something that the parent promises, it should NOT inherit from that parent!",
      },
    },
    part3: {
      title: "Mental Model: The Bird & Penguin Example",
      intro: "Instead of forcing Penguin to inherit fly(), separate birds by capability:",
      points: [
        { title: "1. Base Animal/Bird", content: "abstract class Bird { abstract eat(): void; }" },
        { title: "2. Flying Capability", content: "interface IFlyingBird { fly(): void; } (Implemented by Sparrow and Eagle)" },
        { title: "3. Swimming Capability", content: "interface ISwimmingBird { swim(): void; } (Implemented by Penguin)" },
      ],
    },
    part4: {
      title: "Broken Subclass vs True Subclass",
      bad: {
        title: "❌ Bad: Subclass throws error on promised parent method",
        code: `class Bird {
  public fly() { console.log("Flying in the sky!"); }
}

class Penguin extends Bird {
  public override fly() {
    // 💥 Breaks caller loops!
    throw new Error("Penguins cannot fly!");
  }
}

function makeAllBirdsFly(birds: Bird[]) {
  birds.forEach(b => b.fly()); // Crashes on Penguin!
}`,
        explanation: "Penguin violates the contract of Bird. Callers iterating over Bird[] crash unexpectedly.",
      },
      good: {
        title: "✅ Good: Only capable birds implement flying",
        code: `abstract class Bird {
  abstract eat(): void;
}

interface IFlyable {
  fly(): void;
}

class Sparrow extends Bird implements IFlyable {
  eat() { console.log("Eating seeds"); }
  fly() { console.log("Flying high!"); }
}

class Penguin extends Bird {
  eat() { console.log("Eating fish"); }
  swim() { console.log("Swimming in water!"); }
}`,
        explanation: "Penguin does not inherit impossible fly() contracts. No crashes, no broken promises.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with clean Shape classes where all subtypes fulfill their getArea() contracts faithfully:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LISKOV SUBSTITUTION PRINCIPLE (LSP) DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface IShape {
  getArea(): number;
}

class Rectangle implements IShape {
  constructor(public width: number, public height: number) {}
  public getArea(): number { return this.width * this.height; }
}

class Square implements IShape {
  constructor(public side: number) {}
  public getArea(): number { return this.side * this.side; }
}

class Circle implements IShape {
  constructor(public radius: number) {}
  public getArea(): number { return Math.PI * this.radius * this.radius; }
}

// Any shape can substitute IShape with zero surprises!
function printTotalArea(shapes: IShape[]) {
  const total = shapes.reduce((sum, s) => sum + s.getArea(), 0);
  console.log("Total area of all shapes:", total.toFixed(2));
}

printTotalArea([
  new Rectangle(10, 5), // 50
  new Square(4),        // 16
  new Circle(3)         // 28.27
]);
`,
    },
    part6: {
      title: "LSP Quiz",
      quiz: {
        question: "Which of the following is a direct violation of the Liskov Substitution Principle?",
        options: [
          "A subclass adds a new helper method.",
          "A subclass overrides a parent method and throws a 'Feature Not Supported' error.",
          "A subclass executes its calculations faster than the parent.",
          "A subclass has its own constructor.",
        ],
        correctIndex: 1,
        explanation: "Throwing 'Not Supported' on a method promised by the parent breaks caller expectations and violates LSP.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. No Surprises", desc: "Child classes must honor all promises and behaviors of the parent." },
        { title: "2. Don't Throw Unsupported Errors", desc: "If a class cannot do a parent action, do not inherit from that parent." },
        { title: "3. Use Interfaces for Capabilities", desc: "Separate capabilities like Flying vs Swimming into clean interfaces." },
        { title: "4. Next: Interface Segregation", desc: "In OOP-12, we learn why small, focused interfaces beat giant menus." },
      ],
      nextLessonPreview: {
        title: "OOP-12: Interface Segregation Principle (ISP)",
        desc: "Keep interfaces small and focused so clients aren't forced to implement methods they don't need.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-12: Interface Segregation Principle (ISP)
  // ─────────────────────────────────────────────────────────────
  "oop12-interface-segregation": {
    slug: "oop12-interface-segregation",
    code: "OOP-12",
    title: "Interface Segregation Principle (ISP)",
    subtitle: "Keep menus small: don't force classes to implement methods they never use.",
    sections: [
      { id: "part1", label: "The Giant Menu Analogy", icon: "📖" },
      { id: "part2", label: "Fat vs Focused Interfaces", icon: "✂️" },
      { id: "part3", label: "Combining Small Interfaces", icon: "🧩" },
      { id: "part4", label: "Bloated Interface vs ISP Clean", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "ISP Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Giant Menu Analogy",
      bigPicture: "Imagine going to a coffee shop where you just want a black coffee, but the cashier forces you to sign a 50-page legal contract agreeing to repair their espresso machine, roast Colombian beans, and manage their delivery fleet. That is ridiculous! The Interface Segregation Principle (ISP) says: Keep interfaces small and focused. Never force a class to depend on methods it does not care about.",
      breakdownTitle: "Problems with Fat Monolithic Interfaces:",
      breakdownItems: [
        { title: "Empty Dummy Methods", desc: "Classes filled with dummy methods like 'scan() { /* not supported */ }' just to satisfy a bloated interface." },
        { title: "Unnecessary Re-Testing", desc: "Modifying a fax method in a giant interface forces printer and scanner modules to be recompiled." },
        { title: "Messy Autocomplete", desc: "Your IDE suggests 30 irrelevant methods that your class doesn't even support." },
      ],
    },
    part2: {
      title: "Fat Interface vs Role Interfaces",
      intro: "Break oversized interfaces into small, role-specific contracts:",
      cards: [
        { number: "01", tag: "Bloated (Bad)", title: "Fat Interface", description: "Bundles print, scan, fax, staple, and email into one 20-method monster.", color: "rose" },
        { number: "02", tag: "Focused (Good)", title: "Role Interfaces", description: "Small, specific contracts: IPrinter, IScanner, IFax. Implement only what you need!", color: "emerald" },
      ],
      rule: {
        title: "💡 Golden Rule",
        content: "Interfaces belong to the client that calls them. Only put methods in an interface that the caller genuinely needs.",
      },
    },
    part3: {
      title: "Mental Model: Combining Small Interfaces",
      intro: "In TypeScript, a class can implement multiple small interfaces together like Lego pieces:",
      points: [
        { title: "Simple Printer", content: "class SimplePrinter implements IPrinter { print() { ... } }" },
        { title: "All-in-One Office Hub", content: "class OfficeHub implements IPrinter, IScanner, IFax { ... }" },
        { title: "Client Safety", content: "A report function only asks for IPrinter — it doesn't care about scanning or faxing." },
      ],
    },
    part4: {
      title: "Bloated Interface vs ISP Clean",
      bad: {
        title: "❌ Bad: Simple printer forced to implement faxing",
        code: `interface IMultiFunctionMachine {
  print(doc: string): void;
  scan(): void;
  fax(doc: string, phone: string): void;
}

// 💥 Simple Inkjet printer has no fax hardware!
class SimpleInkjet implements IMultiFunctionMachine {
  print(doc: string) { console.log("Printing:", doc); }
  scan() { throw new Error("No scanner built in!"); }
  fax() { throw new Error("No fax modem!"); }
}`,
        explanation: "SimpleInkjet is forced to write throwaway dummy methods for features it physically cannot do.",
      },
      good: {
        title: "✅ Good: Segregated role interfaces",
        code: `interface IPrinter {
  print(doc: string): void;
}

interface IScanner {
  scan(): void;
}

// Implements only what it actually supports!
class SimpleInkjet implements IPrinter {
  print(doc: string) { console.log("Printing:", doc); }
}

class OfficeHub implements IPrinter, IScanner {
  print(doc: string) { console.log("Printing:", doc); }
  scan() { console.log("Scanning document..."); }
}`,
        explanation: "Each device implements only the contracts it actually supports. Zero dummy error methods.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with segregated media streaming interfaces (Playable, Recordable, Downloadable):",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INTERFACE SEGREGATION PRINCIPLE (ISP) DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface IPlayable {
  play(): void;
  pause(): void;
}

interface IDownloadable {
  download(url: string): void;
}

// A Live FM Radio stream can only PLAY, not download offline
class RadioStream implements IPlayable {
  play() { console.log("📻 Live FM Radio playing."); }
  pause() { console.log("🔇 Radio muted."); }
}

// A Podcast App can PLAY AND DOWNLOAD
class PodcastApp implements IPlayable, IDownloadable {
  play() { console.log("🎙️ Playing podcast episode."); }
  pause() { console.log("⏸️ Paused podcast."); }
  download(url: string) { console.log(\`⬇️ Downloaded episode from \${url}\`); }
}

function enjoyMusic(player: IPlayable) {
  player.play();
  player.pause();
}

enjoyMusic(new RadioStream());
enjoyMusic(new PodcastApp());
`,
    },
    part6: {
      title: "ISP Quiz",
      quiz: {
        question: "What is the main sign that an interface is violating the Interface Segregation Principle?",
        options: [
          "The interface has more than 2 parameters in a method.",
          "Implementing classes are leaving several methods empty or throwing 'Not Implemented' errors.",
          "The interface name starts with the letter 'I'.",
          "The interface is exported in TypeScript.",
        ],
        correctIndex: 1,
        explanation: "When classes are forced to create empty or error-throwing dummy methods, the interface is bloated and should be split.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Small & Focused", desc: "Design role-based interfaces with 1-3 methods." },
        { title: "2. Combine When Needed", desc: "A class can implement multiple small interfaces simultaneously." },
        { title: "3. No Dummy Methods", desc: "Never force a class to implement functions it cannot physically support." },
        { title: "4. Next: Dependency Inversion", desc: "In OOP-13, we complete SOLID with the famous Dependency Inversion Principle!" },
      ],
      nextLessonPreview: {
        title: "OOP-13: Dependency Inversion Principle (DIP)",
        desc: "Plug into standard wall sockets rather than hardwiring cables directly into the power grid.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-13: Dependency Inversion Principle (DIP)
  // ─────────────────────────────────────────────────────────────
  "oop13-dependency-inversion": {
    slug: "oop13-dependency-inversion",
    code: "OOP-13",
    title: "Dependency Inversion Principle (DIP)",
    subtitle: "Use standard sockets: plug tools into your code using interfaces instead of hardwiring them.",
    sections: [
      { id: "part1", label: "The Wall Socket Analogy", icon: "🔌" },
      { id: "part2", label: "Inverting the Connection", icon: "🔄" },
      { id: "part3", label: "Constructor Injection", icon: "💉" },
      { id: "part4", label: "Hardwired Code vs Injected Interface", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "DIP Quiz", icon: "🎯" },
      { id: "part7", label: "SOLID Principles Mastery!", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & The Wall Socket Analogy",
      bigPicture: "Think of an electrical wall socket in your room. Your Lamp plugs into the standard wall outlet. You don't solder the lamp's copper wires directly into the city power station! If the lamp breaks, you unplug it and plug in a new one. The Dependency Inversion Principle (DIP) is the wall socket of software: High-level business logic should plug into standard interfaces, not be hardwired to concrete databases or third-party APIs.",
      breakdownTitle: "Why Hardwiring Tools Breaks Code:",
      breakdownItems: [
        { title: "Locked to Specific Databases", desc: "If your OrderService creates 'new PostgresDatabase()' inside its constructor, you cannot run your code without a live PostgreSQL server." },
        { title: "Impossible Automated Testing", desc: "You cannot write fast unit tests because running a test accidentally tries to charge real credit cards or write real database rows." },
        { title: "Vendor Lock-In", desc: "Switching from SendGrid to AWS SES requires rewriting your entire user registration workflow." },
      ],
    },
    part2: {
      title: "Inversion of Control (Pass Tools In)",
      intro: "Instead of letting a class create its own tools with 'new', pass the tools into its constructor:",
      cards: [
        { number: "01", tag: "Standard Socket", title: "Interface (The Contract)", description: "IDatabaseRepository or IPaymentGateway defined by your domain.", color: "purple" },
        { number: "02", tag: "Pluggable Tool", title: "Implementation (The Tool)", description: "PostgresDB in production, MockDB in automated tests. Both plug into the socket!", color: "cyan" },
      ],
      rule: {
        title: "💡 The Golden Rule of DIP",
        content: "Never use 'new ConcreteService()' inside your business logic classes. Pass dependencies in through constructor parameters!",
      },
    },
    part3: {
      title: "Mental Model: Effortless Unit Testing",
      intro: "Look how easy it is to test your code when you use Dependency Inversion:",
      points: [
        { title: "Production Mode", content: "const userService = new UserService(new PostgresUserDb()); // Live database" },
        { title: "Unit Test Mode", content: "const testService = new UserService(new FakeInMemoryUserDb()); // Runs in 2 milliseconds with no database needed!" },
      ],
    },
    part4: {
      title: "Hardwired Code vs Injected Interface",
      bad: {
        title: "❌ Bad: Hardwired directly to concrete PostgreSQL library",
        code: `import { PostgresConnection } from "postgres-driver";

class UserService {
  private db = new PostgresConnection("conn_string"); // 💥 Hardwired!

  public register(email: string) {
    this.db.query("INSERT INTO users VALUES (...)");
  }
}`,
        explanation: "UserService cannot be tested without a running PostgreSQL database server. You cannot mock it.",
      },
      good: {
        title: "✅ Good: Plugs into an abstract interface",
        code: `interface IUserRepository {
  save(email: string): void;
}

class UserService {
  // Receives the tool from the outside!
  constructor(private userRepo: IUserRepository) {}

  public register(email: string) {
    this.userRepo.save(email);
  }
}`,
        explanation: "UserService knows zero details about PostgreSQL. You can pass PostgresUserRepository or MockUserRepository freely.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a UserService tested with a fast In-Memory mock repository:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEPENDENCY INVERSION PRINCIPLE (DIP) DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Standard Interface Socket
interface IUserRepository {
  saveUser(user: { id: string; email: string }): void;
}

// 2. High-Level Business Service (Depends on Interface!)
class UserService {
  constructor(private repo: IUserRepository) {}

  public registerUser(id: string, email: string): void {
    if (!email.includes("@")) {
      console.log("❌ Invalid email format!");
      return;
    }
    this.repo.saveUser({ id, email });
    console.log(\`🎉 User \${email} registered successfully!\`);
  }
}

// 3. Fast In-Memory Mock for Testing (No database needed!)
class MockUserRepo implements IUserRepository {
  public savedUsers: Array<{ id: string; email: string }> = [];

  public saveUser(user: { id: string; email: string }): void {
    this.savedUsers.push(user);
    console.log(\`💾 [Mock Storage]: Saved user \${user.email} in memory.\`);
  }
}

// Test our service instantly:
const testRepo = new MockUserRepo();
const userService = new UserService(testRepo);

userService.registerUser("u1", "alex@learncraft.io");
console.log("Total users in memory:", testRepo.savedUsers.length);
`,
    },
    part6: {
      title: "DIP Quiz",
      quiz: {
        question: "How does Dependency Inversion help you write lightning-fast automated tests?",
        options: [
          "It forces TypeScript to execute in Google Cloud.",
          "It lets you pass lightweight mock/fake tools into your class constructors instead of connecting to real databases and networks.",
          "It disables all error logging during tests.",
          "It converts all asynchronous code into synchronous loops.",
        ],
        correctIndex: 1,
        explanation: "By depending on interfaces, you can pass instant in-memory fake repositories during tests without touching real databases.",
      },
    },
    part7: {
      title: "SOLID Principles Mastery!",
      takeaways: [
        { title: "1. All 5 SOLID Rules Complete", desc: "You have mastered SRP, OCP, LSP, ISP, and DIP!" },
        { title: "2. Standard Sockets", desc: "Depend on abstract interfaces, never on concrete vendor libraries." },
        { title: "3. Pass Tools In", desc: "Use constructor injection (constructor(private tool: ITool))." },
        { title: "4. Next: Avoiding Common Mistakes", desc: "In Stage 4 (OOP-14), we explore common anti-patterns like God Objects." },
      ],
      nextLessonPreview: {
        title: "OOP-14: Common OOP Anti-Patterns & Code Smells",
        desc: "Learn how to spot God objects, anemic models, and know when NOT to use OOP.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-14: Common OOP Anti-Patterns & Code Smells
  // ─────────────────────────────────────────────────────────────
  "oop14-design-smells": {
    slug: "oop14-design-smells",
    code: "OOP-14",
    title: "Common OOP Anti-Patterns & Code Smells",
    subtitle: "Avoid common traps: recognize God objects, anemic models, and know when simple functions are better than classes.",
    sections: [
      { id: "part1", label: "What are Code Smells?", icon: "🦨" },
      { id: "part2", label: "God Objects vs Anemic Models", icon: "👾" },
      { id: "part3", label: "Value Objects (Money, Email)", icon: "💰" },
      { id: "part4", label: "Tangled Code vs Clean Refactoring", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Anti-Patterns Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & What is a Code Smell?",
      bigPicture: "Just like milk starts to smell slightly sour before it goes completely bad, code has 'smells' — subtle signs that your design is starting to rot. Knowing what NOT to do is just as important as knowing what to do. In this lesson, we look at the top bad habits in OOP and how to easily fix them.",
      breakdownTitle: "The Top 3 OOP Anti-Patterns:",
      breakdownItems: [
        { title: "1. The God Object", desc: "A giant 4,000-line 'AppManager' class that does everything while all other classes are dumb helpers." },
        { title: "2. The Anemic Model", desc: "Classes with only getters and setters with zero rules, while all business logic is scattered in procedural files." },
        { title: "3. Primitive Obsession", desc: "Using raw numbers for Money (15.5) or raw strings for Email ('test@') instead of dedicated smart objects." },
      ],
    },
    part2: {
      title: "The Two Extremes of Bad OOP",
      intro: "Avoid both extremes by keeping objects balanced:",
      cards: [
        { number: "01", tag: "Too Much", title: "God Object (The Monster)", description: "Does 50 unrelated jobs. Break it into small focused classes!", color: "rose" },
        { number: "02", tag: "Too Little", title: "Anemic Model (Empty Shell)", description: "Just a bag of getters/setters. Put the business validation methods inside the entity!", color: "amber" },
      ],
      rule: {
        title: "💡 When NOT to use OOP",
        content: "If you just need a pure math function (e.g. clampNumber(val, min, max)) or a data transformation pipeline, write a simple function! Don't create an unnecessary class.",
      },
    },
    part3: {
      title: "Mental Model: Value Objects (Money Example)",
      intro: "Instead of passing raw numbers for currency, use a Money Value Object:",
      points: [
        { title: "❌ Raw Number", content: "let price = 50; // Is it USD? EUR? Can it be negative? Who knows!" },
        { title: "✅ Money Object", content: "const price = new Money(50, 'USD'); // Validates currency and prevents adding EUR to USD!" },
      ],
    },
    part4: {
      title: "Tangled Code vs Clean Refactoring",
      bad: {
        title: "❌ Bad: Feature Envy (Reaching into other objects)",
        code: `class Customer {
  public street: string;
  public city: string;
  public zip: string;
}

class InvoicePrinter {
  // 💥 Reaching deep inside customer to format text:
  public printLabel(c: Customer) {
    return c.street + ", " + c.city + " (" + c.zip + ")";
  }
}`,
        explanation: "InvoicePrinter is envious of Customer's fields. The logic to format an address belongs inside Address or Customer.",
      },
      good: {
        title: "✅ Good: Object formats its own data",
        code: `class Address {
  constructor(public street: string, public city: string, public zip: string) {}

  public formatLabel(): string {
    return \`\${this.street}, \${this.city} (\${this.zip})\`;
  }
}`,
        explanation: "Behavior lives with the data. You simply call customer.address.formatLabel().",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a Money Value Object that protects amounts and prevents mixing currencies:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VALUE OBJECT DEMO: MONEY & CURRENCY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class Money {
  constructor(public readonly amount: number, public readonly currency: "USD" | "EUR") {
    if (amount < 0) throw new Error("Money amount cannot be negative!");
  }

  public add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(\`❌ Cannot add \${this.currency} and \${other.currency} without currency conversion!\`);
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  public format(): string {
    const symbol = this.currency === "USD" ? "$" : "€";
    return \`\${symbol}\${this.amount.toFixed(2)}\`;
  }
}

const price1 = new Money(45.50, "USD");
const price2 = new Money(14.50, "USD");
const combined = price1.add(price2);

console.log("Combined Total:", combined.format()); // $60.00
`,
    },
    part6: {
      title: "Anti-Patterns Quiz",
      quiz: {
        question: "What is a 'God Object' in programming?",
        options: [
          "An object that connects to the database.",
          "A single giant class that does almost everything in the application, holding all data and logic.",
          "A class created with the new keyword.",
          "An object that has zero methods.",
        ],
        correctIndex: 1,
        explanation: "A God Object is an oversized class that tries to do everything, destroying modularity and cohesion.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Avoid God Objects", desc: "Split mammoth manager classes into small focused workers." },
        { title: "2. Use Value Objects", desc: "Wrap important data like Money or Email into smart, validated objects." },
        { title: "3. Simple Functions are OK", desc: "Don't force a class when a pure 3-line function is simpler." },
        { title: "4. Next: Strategy & Factory Patterns", desc: "In OOP-15, we learn the 2 most popular design patterns used in real jobs." },
      ],
      nextLessonPreview: {
        title: "OOP-15: Pragmatic Design Patterns: Strategy & Factory in Practice",
        desc: "Master the two most useful patterns in modern software engineering.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-15: Pragmatic Design Patterns: Strategy & Factory
  // ─────────────────────────────────────────────────────────────
  "oop15-pragmatic-patterns": {
    slug: "oop15-pragmatic-patterns",
    code: "OOP-15",
    title: "Pragmatic Design Patterns: Strategy & Factory in Practice",
    subtitle: "The two patterns you will use every day: Strategy (swappable ways of doing things) and Factory (creating objects cleanly).",
    sections: [
      { id: "part1", label: "Why Patterns Matter", icon: "🏛️" },
      { id: "part2", label: "The Strategy Pattern (Maps Analogy)", icon: "🗺️" },
      { id: "part3", label: "The Factory Pattern (Barista Analogy)", icon: "☕" },
      { id: "part4", label: "Hardcoded Setup vs Clean Patterns", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Design Patterns Quiz", icon: "🎯" },
      { id: "part7", label: "Summary & Progression", icon: "🎓" },
    ],
    part1: {
      title: "What You'll Learn & Why Patterns Matter",
      bigPicture: "Design patterns are proven, time-tested recipes for solving common software problems. While there are over 23 classical patterns, in modern TypeScript programming, two patterns give you 80% of the daily benefit: the Strategy Pattern (for switching algorithms) and the Factory Pattern (for creating objects cleanly).",
      breakdownTitle: "The 2 Essential Patterns:",
      breakdownItems: [
        { title: "1. Strategy Pattern", desc: "Think of Google Maps navigation: you can toggle between Driving, Walking, or Biking. The destination is the same, but the travel strategy changes." },
        { title: "2. Factory Pattern", desc: "Think of ordering coffee at a cafe: you say 'Make Latte', and the barista handles milk steaming, espresso brewing, and cup sizing for you." },
      ],
    },
    part2: {
      title: "The Strategy Pattern in Action",
      intro: "Swap how a task is performed without rewriting your application:",
      cards: [
        { number: "01", tag: "Strategy Interface", title: "The Shared Goal", description: "interface IShippingStrategy { calculateCost(weight): number; }", color: "purple" },
        { number: "02", tag: "Concrete Strategies", title: "The Different Options", description: "StandardShipping, ExpressShipping, OvernightShipping. Swap anytime!", color: "emerald" },
      ],
      rule: {
        title: "💡 When to use Strategy",
        content: "Use Strategy when you have multiple ways of doing the same task (e.g. payment options, sorting algorithms, discount rules).",
      },
    },
    part3: {
      title: "The Factory Pattern in Action",
      intro: "Centralize complex object creation in one neat place:",
      points: [
        { title: "1. Clean Callers", content: "Callers don't need to know complex constructor parameters or secret API keys." },
        { title: "2. One Central Factory", content: "LoggerFactory.createLogger('development') gives you ConsoleLogger; 'production' gives you CloudWatchLogger." },
      ],
    },
    part4: {
      title: "Hardcoded Setup vs Clean Patterns",
      bad: {
        title: "❌ Bad: Direct instantiation scattered everywhere",
        code: `class ReportController {
  public generate(type: string, data: any) {
    // 💥 Every controller duplicates messy constructor wiring:
    if (type === "PDF") {
      const pdf = new PdfGenerator("font_file", 1024, "A4", true);
      return pdf.render(data);
    } else if (type === "CSV") {
      const csv = new CsvGenerator(",", true, "utf-8");
      return csv.render(data);
    }
  }
}`,
        explanation: "Every controller must know all concrete classes and their complex configuration flags.",
      },
      good: {
        title: "✅ Good: Factory creates the right strategy cleanly",
        code: `interface IReportStrategy { render(data: any): string; }

class ReportFactory {
  public static create(type: "PDF" | "CSV"): IReportStrategy {
    if (type === "PDF") return new PdfGenerator("font_file", 1024);
    return new CsvGenerator(",");
  }
}

class ReportController {
  public generate(type: "PDF" | "CSV", data: any) {
    const strategy = ReportFactory.create(type);
    return strategy.render(data);
  }
}`,
        explanation: "The controller is 100% decoupled. The Factory handles all instantiation details.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a Payment Factory that produces Card or Crypto strategies based on user selection:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STRATEGY & FACTORY PATTERN DEMO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Strategy Interface
interface IPaymentStrategy {
  pay(amount: number): void;
}

class CardPaymentStrategy implements IPaymentStrategy {
  pay(amount: number) { console.log(\`💳 Paid $\${amount} with Credit Card.\`); }
}

class CryptoPaymentStrategy implements IPaymentStrategy {
  pay(amount: number) { console.log(\`⚡ Paid $\${amount} with Bitcoin Lightning.\`); }
}

// 2. Factory that creates the strategy
class PaymentFactory {
  public static create(method: "CARD" | "CRYPTO"): IPaymentStrategy {
    switch (method) {
      case "CARD": return new CardPaymentStrategy();
      case "CRYPTO": return new CryptoPaymentStrategy();
      default: throw new Error("Unsupported payment method!");
    }
  }
}

// User selects payment method in UI:
const userChoice: "CARD" | "CRYPTO" = "CRYPTO";

const paymentTool = PaymentFactory.create(userChoice);
paymentTool.pay(150);
`,
    },
    part6: {
      title: "Design Patterns Quiz",
      quiz: {
        question: "When should you use the Factory Pattern?",
        options: [
          "When you want to prevent all inheritance.",
          "When creating an object involves complex setup, configuration mapping, or choosing between different subtypes.",
          "When you want to delete a file from your hard drive.",
          "When your class has only one private property.",
        ],
        correctIndex: 1,
        explanation: "Factories encapsulate complex setup and choose the right class to create without cluttering your main code.",
      },
    },
    part7: {
      title: "Summary & Progression",
      takeaways: [
        { title: "1. Strategy Pattern", desc: "Use Strategy to make algorithms swappable at runtime (e.g. Travel mode in Maps)." },
        { title: "2. Factory Pattern", desc: "Use Factory to centralize object creation and isolate callers from complex setup." },
        { title: "3. Don't Over-Engineer", desc: "Only use patterns when you genuinely need flexibility." },
        { title: "4. Next: Capstone Architecture", desc: "In OOP-16, we connect all 15 lessons to build our Capstone Workflow Engine!" },
      ],
      nextLessonPreview: {
        title: "OOP-16: Architectural Reasoning & Capstone Review",
        desc: "Connect all concepts to architect the final Task & Workflow Engine project.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // OOP-16: Architectural Reasoning & Capstone Review
  // ─────────────────────────────────────────────────────────────
  "oop16-architectural-reasoning-capstone": {
    slug: "oop16-architectural-reasoning-capstone",
    code: "OOP-16",
    title: "Architectural Reasoning & Capstone Review",
    subtitle: "Put it all together: think like a senior software architect and construct the final Task & Workflow Engine.",
    sections: [
      { id: "part1", label: "Thinking Like an Architect", icon: "🏛️" },
      { id: "part2", label: "CRC Cards (Responsibilities)", icon: "📇" },
      { id: "part3", label: "The Capstone Workflow Engine", icon: "⚙️" },
      { id: "part4", label: "Spaghetti vs Clean Architecture", icon: "⚖️" },
      { id: "part5", label: "Try It in Code (Sandbox)", icon: "💻" },
      { id: "part6", label: "Architectural Quiz", icon: "🎯" },
      { id: "part7", label: "Curriculum Graduation!", icon: "🏆" },
    ],
    part1: {
      title: "What You'll Learn & Thinking Like an Architect",
      bigPicture: "Congratulations on reaching the final lesson of the OOP curriculum! Being a senior developer is about taking a messy real-world problem and breaking it into clean, collaborating objects. In this lesson, we review how all 16 concepts fit together and build a prototype of our Capstone Workflow Engine!",
      breakdownTitle: "The 3 Steps to Clean System Architecture:",
      breakdownItems: [
        { title: "1. Identify the Entities", desc: "Look at the problem and find the main actors (e.g. User, Task, Workflow, Notification)." },
        { title: "2. Assign Responsibilities", desc: "Give each class a single clear job (SRP) and keep its data private (Encapsulation)." },
        { title: "3. Connect with Interfaces", desc: "Connect the pieces with interfaces (Abstraction & DIP) so you can extend easily (OCP)." },
      ],
    },
    part2: {
      title: "CRC (Class-Responsibility-Collaboration) Cards",
      intro: "A simple index-card technique to design systems before writing code:",
      cards: [
        { number: "01", tag: "Class Name", title: "Who am I?", description: "The name of the entity (e.g. WorkflowRunner, TaskStep).", color: "purple" },
        { number: "02", tag: "Responsibility", title: "What is my job?", description: "What state I protect and what business actions I perform.", color: "emerald" },
        { number: "03", tag: "Collaborators", title: "Who do I talk to?", description: "The minimal interfaces I collaborate with to finish the job.", color: "cyan" },
      ],
      rule: {
        title: "💡 Architecture Tip",
        content: "If a single card has more than 3-4 responsibilities, it is becoming a God Object. Split it immediately!",
      },
    },
    part3: {
      title: "Mental Model: The Capstone Workflow Engine",
      intro: "Look how our Capstone Project combines all 16 OOP principles:",
      points: [
        { title: "1. Workflow (Encapsulation)", content: "Guards the execution state (Draft -> Running -> Completed)." },
        { title: "2. Step Handlers (Polymorphism)", content: "HttpStep, EmailStep, and DatabaseStep all implement a common IStepHandler interface." },
        { title: "3. Pluggable Observers (Composition)", content: "Workflows emit completion events to loggers and Slack bots without tight coupling." },
      ],
    },
    part4: {
      title: "Spaghetti vs Clean Architecture",
      bad: {
        title: "❌ Bad: Monolithic 1000-line procedural loop",
        code: `// Spaghetti function with hardcoded checks:
function runEverything(steps: any[]) {
  for (const s of steps) {
    if (s.type === "HTTP") fetch(s.url);
    else if (s.type === "EMAIL") smtp.send(s.to);
    db.query("UPDATE status..."); // Hardcoded database!
  }
}`,
        explanation: "Zero encapsulation, hardcoded branching, impossible to test offline, and fragile.",
      },
      good: {
        title: "✅ Good: Clean modular workflow engine",
        code: `interface IStepHandler {
  execute(ctx: WorkflowContext): Promise<boolean>;
}

class WorkflowEngine {
  private steps: IStepHandler[] = [];

  public addStep(step: IStepHandler) { this.steps.push(step); }

  public async run(ctx: WorkflowContext): Promise<boolean> {
    for (const step of this.steps) {
      const ok = await step.execute(ctx);
      if (!ok) return false;
    }
    return true;
  }
}`,
        explanation: "Pure encapsulation, pluggable step handlers, and 100% testable using Dependency Inversion.",
      },
    },
    part5: {
      title: "Try It in Code (Sandbox)",
      intro: "Experiment with a working prototype of the Object-Oriented Workflow Engine:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CAPSTONE ARCHITECTURE PROTOTYPE: WORKFLOW ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface IWorkflowStep {
  name: string;
  run(): boolean;
}

class HttpPingStep implements IWorkflowStep {
  constructor(public name: string, private url: string) {}
  run(): boolean {
    console.log(\`🌐 [Step 1]: Checking API health at \${this.url} -> 200 OK\`);
    return true;
  }
}

class DataFormatStep implements IWorkflowStep {
  constructor(public name: string) {}
  run(): boolean {
    console.log("⚙️ [Step 2]: Normalizing incoming customer records.");
    return true;
  }
}

class WorkflowEngine {
  private steps: IWorkflowStep[] = [];

  public addStep(step: IWorkflowStep): void {
    this.steps.push(step);
  }

  public executeAll(): void {
    console.log(\`🚀 Starting Workflow Pipeline (\${this.steps.length} steps)...\\n\`);
    for (const step of this.steps) {
      const success = step.run();
      if (!success) {
        console.log(\`❌ Step "\${step.name}" failed. Aborting pipeline.\`);
        return;
      }
    }
    console.log("\\n🎉 Workflow completed successfully with zero errors!");
  }
}

const engine = new WorkflowEngine();
engine.addStep(new HttpPingStep("Health Check", "https://api.learncraft.io"));
engine.addStep(new DataFormatStep("Clean Records"));

engine.executeAll();
`,
    },
    part6: {
      title: "Architectural Quiz",
      quiz: {
        question: "What is the primary role of an 'Aggregate Root' entity in clean domain architecture?",
        options: [
          "To act as a global database connection.",
          "To serve as the single authoritative gateway that defends business rules and data safety for all its internal child objects.",
          "To delete unused TypeScript files.",
          "To convert classes into JSON strings.",
        ],
        correctIndex: 1,
        explanation: "The Aggregate Root encapsulates internal child objects and is the sole entry point for mutations, guaranteeing business rules are never broken.",
      },
    },
    part7: {
      title: "Curriculum Graduation!",
      takeaways: [
        { title: "1. 16 Lessons Complete", desc: "You have mastered all core foundations, the 4 pillars, composition, SOLID, and design patterns." },
        { title: "2. Think in Autonomous Objects", desc: "Model systems as collaborating entities with protected data and clear public methods." },
        { title: "3. Apply SOLID Pragmatically", desc: "Use SRP, OCP, LSP, ISP, and DIP to build clean, maintainable enterprise software." },
        { title: "4. Build the Capstone Project", desc: "Head over to the Final Project to build the complete Task & Workflow Engine!" },
      ],
      nextLessonPreview: {
        title: "Final Capstone Project: Object-Oriented Task & Workflow Engine",
        desc: "Build a production-grade decoupled workflow engine demonstrating complete OOP mastery.",
      },
    },
  },
};

/**
 * Retrieve rich pedagogical lesson content by lesson slug or code.
 */
export function getOOPLessonContent(slugOrCode: string): OOPLessonContent {
  const normalized = slugOrCode.toLowerCase().trim();

  // 1. Direct match by slug key
  if (OOP_LESSONS_CONTENT[normalized]) {
    return OOP_LESSONS_CONTENT[normalized];
  }

  // 2. Match by slug or code inside values
  const found = Object.values(OOP_LESSONS_CONTENT).find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.code.toLowerCase() === normalized ||
      normalized.includes(c.slug.toLowerCase()) ||
      normalized.includes(c.code.toLowerCase().replace("-", ""))
  );

  if (found) {
    return found;
  }

  // 3. Safe fallback to OOP-01
  return OOP_LESSONS_CONTENT["oop01-why-oop"];
}
