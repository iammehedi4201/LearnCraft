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
    bigPicture?: string;
    explanation?: string;
    analogy?: string;
    diagram?: string;
    breakdownTitle?: string;
    breakdownItems?: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards?: OOPLessonCard[];
    rule?: {
      title: string;
      content: string;
    };
    concepts?: Array<{ name: string; desc: string; codeSnippet?: string }>;
  };
  part3: {
    title: string;
    intro: string;
    points?: OOPMentalModelPoint[];
    deepDives?: Array<{ heading: string; content: string; bulletPoints?: string[] }>;
  };
  part4: {
    title: string;
    bad?: OOPCodeComparison;
    good?: OOPCodeComparison;
    problem?: string;
    whyItMatters?: string;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz?: OOPQuizData;
    takeaways?: OOPLessonTakeaway[];
  };
  part7: {
    title: string;
    takeaways?: OOPLessonTakeaway[];
    quiz?: OOPQuizData;
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
    subtitle: "Shift from loose, scattered variables to cohesive objects that bundle their own data and actions.",
    sections: [
      { id: "part1", label: "Procedural vs OOP Thinking", icon: "💡" },
      { id: "part2", label: "Classes & Objects (Blueprints)", icon: "📦" },
      { id: "part3", label: "State (Properties) & Behavior (Methods)", icon: "🏗️" },
      { id: "part4", label: "Loose Data vs Clean Object", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The Big Shift: From Loose Variables to Autonomous Objects",
      bigPicture: "When you first start programming, you create loose variables (let userName, let userScore) and write standalone functions that take those variables as inputs. In tiny scripts, this works fine. But as programs grow into thousands of lines, loose variables get scattered across different files. Any function can accidentally overwrite someone else's data, and it becomes nearly impossible to track who changed what. Object-Oriented Programming (OOP) solves this by bundling data (State) and functions (Behavior) together into self-contained units called Objects.",
      analogy: "Imagine an office where employee names, salary slips, and ID photos are loose pieces of paper blowing around on the floor. Anyone walking by can misplace a salary slip or match Alice's name to Bob's photo! OOP is like putting every employee's information into a dedicated, organized folder. The folder keeps their details together, and only official stamped actions can update what is inside.",
      breakdownTitle: "Why Programmers Adopt Object-Oriented Thinking:",
      breakdownItems: [
        { title: "Cohesion (Everything in One Place)", desc: "A user's name, email, and actions live together in one neat container instead of floating across multiple files." },
        { title: "Clear Ownership", desc: "The object owns its data. If you want to update a player's score, you ask the player object to update itself rather than doing loose arithmetic outside." },
        { title: "Scalability & Mental Clarity", desc: "Instead of remembering hundreds of disconnected variables, you think in tangible entities: Users, Products, ShoppingCarts, and Orders." },
      ],
    },
    part2: {
      title: "Blueprints & Instances: What Classes and Objects Really Mean",
      intro: "The most important fundamental distinction in OOP is between a Class and an Object:",
      cards: [
        { number: "01", tag: "The Blueprint", title: "Class (The Template)", description: "A Class is the blueprint written once in code. It defines what properties and methods every instance will have (like an architect's paper floorplan for a house).", color: "purple" },
        { number: "02", tag: "The Concrete Reality", title: "Object (The Living Instance)", description: "An Object is the actual house built in computer memory using 'new'. You can build 100 separate houses from a single blueprint!", color: "emerald" },
        { number: "03", tag: "Independent Identity", title: "Instance Independence", description: "Even if House A and House B are built from the exact same blueprint, painting the front door of House A blue does not change House B.", color: "cyan" },
      ],
      rule: {
        title: "💡 Core Mental Model",
        content: "A Class is a recipe; an Object is the actual cake baked in memory. You cannot eat a recipe, and a Class does not hold live user data until you create an Object using 'new'.",
      },
    },
    part3: {
      title: "State and Behavior: What an Object Knows and Does",
      intro: "Inside a class, code is divided into two simple categories: State (data) and Behavior (actions):",
      points: [
        {
          title: "1. State (Properties / Fields)",
          content: "State represents what the object knows. These are variables declared directly inside the class body, holding data specific to that object instance.",
          codeSnippet: `class Player {\n  name: string = "";\n  score: number = 0;\n}`,
        },
        {
          title: "2. Behavior (Methods)",
          content: "Behavior represents what the object does. These are functions declared inside the class that perform actions and operate on the object's properties.",
          codeSnippet: `class Player {\n  name: string = "";\n  score: number = 0;\n\n  gainPoints(points: number): void {\n    this.score += points;\n  }\n}`,
        },
        {
          title: "3. The 'this' Keyword",
          content: "Inside a method, 'this' refers to the specific object instance that called the method. When player1.gainPoints(10) runs, 'this.score' refers to player1's score. When player2 calls it, 'this.score' refers to player2's score.",
        },
      ],
    },
    part4: {
      title: "Scattered Procedural Code vs Cohesive OOP Code",
      problem: "When variables and logic are separated, it is frighteningly easy to accidentally mix up variables when passing arguments to standalone functions.",
      bad: {
        title: "❌ Procedural: Loose variables easily mixed up",
        code: `// Loose variables scattered in memory
let player1Name = "Alex";
let player1Score = 10;

let player2Name = "Jordan";
let player2Score = 50;

function addPoints(currentScore: number, points: number): number {
  return currentScore + points;
}

// 💥 Accidental bug: Passing player2's score to player1!
player1Score = addPoints(player2Score, 15);
console.log(player1Score); // 65 (Wrong! Alex's score got corrupted by Jordan's data)`,
        explanation: "Because the data and functions are loose and disconnected, nothing stops a developer from accidentally passing the wrong variable into the function, creating silent data corruption.",
      },
      good: {
        title: "✅ Clean OOP: Cohesive object protecting its data",
        code: `class Player {
  name: string = "";
  score: number = 0;

  addPoints(points: number): void {
    this.score += points;
    console.log(\`\${this.name} now has \${this.score} points.\`);
  }
}

const player1 = new Player();
player1.name = "Alex";
player1.score = 10;

const player2 = new Player();
player2.name = "Jordan";
player2.score = 50;

player1.addPoints(15); // Alex now has 25 points.
player2.addPoints(20); // Jordan now has 70 points.`,
        explanation: "Each player is an autonomous object. When you call player1.addPoints(15), the object safely updates its own internal score. Alex and Jordan can never accidentally mix up their scores.",
      },
      whyItMatters: "Cohesion means things that belong together stay together. Bundling data with the functions that operate on that data makes code intuitive to read and prevents bugs caused by passing mismatched variables across your project.",
    },
    part5: {
      title: "Interactive Code Sandbox: Creating Your First Class",
      intro: "Experiment with a Book Tracker class. Notice how book1 and book2 share the same methods, but keep track of their own reading progress independently:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-01: CLASSES, OBJECTS, STATE & BEHAVIOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class Book {
  // 1. State (Properties): What the book knows
  title: string = "";
  author: string = "";
  totalPages: number = 0;
  pagesRead: number = 0;

  // 2. Behavior (Methods): What the book can do
  readPages(count: number): void {
    this.pagesRead += count;
    if (this.pagesRead > this.totalPages) {
      this.pagesRead = this.totalPages;
    }
    console.log(\`📖 Read \${count} pages of "\${this.title}". Total read: \${this.pagesRead}/\${this.totalPages}\`);
  }

  isFinished(): boolean {
    return this.pagesRead >= this.totalPages;
  }
}

// 3. Creating Objects (Instances) with 'new'
const book1 = new Book();
book1.title = "Clean Code";
book1.author = "Robert C. Martin";
book1.totalPages = 464;

const book2 = new Book();
book2.title = "The Pragmatic Programmer";
book2.author = "Andrew Hunt";
book2.totalPages = 352;

// 4. Invoking methods on each independent object
book1.readPages(50);
book1.readPages(100);

book2.readPages(30);

console.log("Is Clean Code finished?", book1.isFinished());
console.log("Is Pragmatic Programmer finished?", book2.isFinished());
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Objects = State + Behavior", desc: "An object bundles properties (what it knows) and methods (what it does) into a cohesive unit." },
        { title: "2. Classes are Blueprints", desc: "A class defines the structure once in code. Objects are created in memory using 'new ClassName()'." },
        { title: "3. Independent Instance State", desc: "Multiple objects instantiated from the same class hold their own distinct, separate data." },
        { title: "4. The 'this' Keyword", desc: "Inside a method, 'this' refers to the specific instance currently executing the action." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Why does calling book1.readPages(50) NOT change the pagesRead count inside book2?",
        options: [
          "Because book1 and book2 are two separate instances in memory, each holding its own independent copy of instance properties",
          "Because TypeScript deletes book2 whenever book1 is being modified",
          "Because readPages is an asynchronous function that only runs in background worker threads",
          "Because the class blueprint freezes all other instances during a function call",
        ],
        correctIndex: 0,
        explanation: "Every object created with 'new' receives its own independent block of memory. Calling a method on book1 operates on book1's properties via 'this', leaving book2 completely untouched.",
      },
      nextLessonPreview: {
        title: "OOP-02: Encapsulation: Protecting State & Invariants",
        desc: "Learn how to use constructors to initialize objects reliably, and private fields to stop outside code from corrupting internal data.",
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
    subtitle: "Use constructors to guarantee valid initial state, and private fields to stop outsiders from corrupting your data.",
    sections: [
      { id: "part1", label: "The ATM & Capsule Analogy", icon: "💊" },
      { id: "part2", label: "Constructors & Private Fields", icon: "🔒" },
      { id: "part3", label: "'Tell, Don't Ask' & Invariants", icon: "🗣️" },
      { id: "part4", label: "Unprotected Data vs Encapsulated Class", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "Why Objects Need Protection: The Uncontrolled Mutation Problem",
      bigPicture: "In the previous lesson, we created objects with public properties: book.pagesRead = 50. But imagine what happens if any code in your project can write: account.balance = -999999 or user.age = -25. Without protection, an object can be forced into an invalid, broken state at any time. Encapsulation is the practice of bundling data with the methods that operate on it AND hiding sensitive internal state behind a protective boundary. You expose only safe, validated operations to the outside world.",
      analogy: "Think of an ATM machine. The bank does not allow customers to walk into the back vault and physically adjust dollar stacks with their hands. The vault is locked inside (private). You interact only through the keypad and screen (public methods). When you request $50, the ATM validates that your account has enough money, deducts the amount, and dispenses the cash. The bank's financial rules can never be bypassed.",
      breakdownTitle: "Four Pillars of Encapsulation:",
      breakdownItems: [
        { title: "Constructors (Guaranteed Starting State)", desc: "A special setup function that runs the moment 'new' is called, ensuring required properties are provided and valid from day one." },
        { title: "Private Access Modifiers (Information Hiding)", desc: "Marking properties as 'private' tells the compiler that only code INSIDE the class can read or modify those fields." },
        { title: "Invariant Protection (Enforcing Business Rules)", desc: "An invariant is a truth that must never be broken (e.g. balance >= 0). Methods check conditions before modifying state." },
        { title: "Controlled Access (Methods Over Raw Fields)", desc: "Callers interact through methods like deposit() and withdraw() rather than directly assigning values to raw fields." },
      ],
    },
    part2: {
      title: "Core Mechanics: Constructors and the 'private' Keyword",
      intro: "TypeScript provides simple, powerful tools to enforce encapsulation:",
      cards: [
        { number: "01", tag: "Initialization Gateway", title: "The constructor() Function", description: "The constructor runs automatically when 'new ClassName(...)' is called. It accepts parameters and assigns valid starting data to instance properties.", color: "purple" },
        { number: "02", tag: "Locked Inside", title: "private Fields", description: "Declaring 'private balance: number;' ensures that external code cannot read or overwrite the field directly. Attempting 'account.balance = 50' produces a compile error.", color: "rose" },
        { number: "03", tag: "Guarded Buttons", title: "public Methods", description: "Public methods like deposit(amount) and getBalance() provide controlled, validated doorways for callers to interact with the object safely.", color: "emerald" },
      ],
      rule: {
        title: "💡 The Golden Rule of Encapsulation",
        content: "Make all state properties 'private' by default. Expose public methods only for the specific operations callers genuinely need. If outside code can directly mutate a field, that field is not encapsulated.",
      },
    },
    part3: {
      title: "Mental Model: Protecting Invariants & 'Tell, Don't Ask'",
      intro: "Encapsulation transforms how you write logic by shifting responsibility to the object:",
      points: [
        {
          title: "1. What is an Invariant?",
          content: "An invariant is a business rule or consistency requirement that must ALWAYS remain true throughout an object's life. For example: a bank balance must never drop below 0, a person's age cannot be negative, and an order cannot be shipped before it is paid.",
        },
        {
          title: "2. The 'Ask-Based' Anti-Pattern (Fragile)",
          content: "Without encapsulation, external code pulls data out of an object, performs manual checks, and pushes modified data back in:\nif (account.balance >= 50) { account.balance = account.balance - 50; }\nIf 20 different files do this, someone will eventually forget the 'if' check and corrupt the balance!",
        },
        {
          title: "3. The 'Tell, Don't Ask' Principle (Robust)",
          content: "Instead of asking an object for its private data and doing calculations outside, tell the object what action you want it to perform:\nconst success = account.withdraw(50);\nThe account checks its own balance, updates its own private state, and returns the result safely.",
          codeSnippet: `// Clean, encapsulated command:\nconst success = account.withdraw(50); // The object guards its own rules!`,
        },
      ],
    },
    part4: {
      title: "Uncontrolled State vs Fully Encapsulated Class",
      problem: "When properties are public, any line of code in the entire project can mutate data into an impossible, corrupt state without triggering any validation.",
      bad: {
        title: "❌ Unprotected: Anyone can corrupt data",
        code: `class BankAccount {
  owner: string = "";
  balance: number = 0; // Public! Anyone can edit this directly
}

const account = new BankAccount();
account.owner = "Alice";
account.balance = 100;

// 💥 External code bypasses all rules:
account.balance = -999999; // Corrupted! Negative money!
account.balance = NaN;     // Corrupted! Not a number!
console.log(account.balance); // -999999 (Nobody stopped this disaster)`,
        explanation: "Because balance is public and there is no constructor or validation, external code can freely assign negative or invalid numbers, completely destroying data integrity.",
      },
      good: {
        title: "✅ Encapsulated: Protected by constructor and private guards",
        code: `class BankAccount {
  private owner: string;
  private balance: number;

  constructor(ownerName: string, initialDeposit: number) {
    if (initialDeposit < 0) {
      throw new Error("Initial deposit cannot be negative.");
    }
    this.owner = ownerName;
    this.balance = initialDeposit;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than 0.");
      return;
    }
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance) {
      console.log("Withdrawal denied: insufficient funds or invalid amount.");
      return false;
    }
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}`,
        explanation: "The constructor guarantees valid starting state. The 'private' keyword blocks external tampering. All state changes are strictly validated inside deposit() and withdraw().",
      },
      whyItMatters: "In production systems, bugs rarely happen because code is written wrong once—they happen because code changes over time. Encapsulation guarantees that no matter who works on the codebase in the future, the object's rules cannot be bypassed.",
    },
    part5: {
      title: "Interactive Code Sandbox: Protecting a Bank Account",
      intro: "Run the code below. Notice what happens when you try to withdraw more money than you have, and observe how private fields keep the balance safe:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-02: ENCAPSULATION & PROTECTING INVARIANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class BankAccount {
  // 🔒 Private properties: completely inaccessible from outside
  private owner: string;
  private balance: number;

  // 1. Constructor guarantees valid starting state
  constructor(ownerName: string, initialDeposit: number) {
    if (initialDeposit < 0) {
      throw new Error("Initial deposit cannot be negative.");
    }
    this.owner = ownerName;
    this.balance = initialDeposit;
  }

  // 2. Controlled method for adding money
  deposit(amount: number): void {
    if (amount <= 0) {
      console.log(\`❌ Deposit of $\${amount} rejected. Must be greater than 0.\`);
      return;
    }
    this.balance += amount;
    console.log(\`✅ Deposited $\${amount}. New balance: $\${this.balance}\`);
  }

  // 3. Controlled method for withdrawing money with invariant check
  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log("❌ Withdrawal amount must be greater than 0.");
      return false;
    }
    if (amount > this.balance) {
      console.log(\`❌ Cannot withdraw $\${amount}. Current balance is only $\${this.balance}.\`);
      return false;
    }

    this.balance -= amount;
    console.log(\`💵 Withdrew $\${amount}. Remaining balance: $\${this.balance}\`);
    return true;
  }

  // 4. Safe read-only access to state
  getBalance(): number {
    return this.balance;
  }

  getAccountSummary(): string {
    return \`Account [\${this.owner}]: $\${this.balance}\`;
  }
}

// Create an account for Maya with $200
const mayaAccount = new BankAccount("Maya", 200);
console.log(mayaAccount.getAccountSummary());

// Safe operations
mayaAccount.deposit(50);     // Balance: 250
mayaAccount.withdraw(100);   // Balance: 150

// Attempting invalid operations (safely caught and blocked!)
mayaAccount.withdraw(500);   // Blocked! Insufficient funds
mayaAccount.deposit(-20);    // Blocked! Negative deposit

console.log("Final balance:", mayaAccount.getBalance());

// 💡 Try this:
// Uncomment the line below to see TypeScript block direct access to private state:
// mayaAccount.balance = -999;
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Constructors Guarantee Validity", desc: "Always initialize required state in a constructor so objects never start life in an undefined or broken state." },
        { title: "2. Private Fields Block Tampering", desc: "Use the 'private' modifier on state properties so callers cannot bypass your validation rules." },
        { title: "3. Invariants are Sacred Rules", desc: "Guard conditions (like balance >= 0) inside public methods to ensure internal state remains consistent." },
        { title: "4. Tell, Don't Ask", desc: "Instruct objects to perform actions (account.withdraw(50)) rather than pulling raw data out and modifying it externally." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "What is the primary benefit of declaring an object's balance property as 'private' instead of 'public'?",
        options: [
          "Outside code cannot directly change the balance without passing through validated methods like deposit() or withdraw()",
          "It makes the web page load faster by compressing the number in browser cache",
          "It encrypts the variable using SHA-256 in the JavaScript engine",
          "It allows the balance to hold strings and functions instead of just numbers",
        ],
        correctIndex: 0,
        explanation: "By making balance private, external code is prevented from directly setting invalid or negative values. All state mutations are forced to go through guarded methods that enforce business rules.",
      },
      nextLessonPreview: {
        title: "OOP-03: Abstraction & Interfaces: Contracts Over Implementations",
        desc: "Learn how to hide complicated internal machinery behind simple buttons, and use interfaces to swap tools seamlessly.",
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
    subtitle: "Hide complex internal machinery behind simple controls, and use interfaces to swap tools effortlessly.",
    sections: [
      { id: "part1", label: "The Car Dashboard Analogy", icon: "🚗" },
      { id: "part2", label: "Abstraction vs Encapsulation", icon: "🧩" },
      { id: "part3", label: "TypeScript Interfaces as Contracts", icon: "🔌" },
      { id: "part4", label: "Direct Coupling vs Clean Interface", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "What is Abstraction? Hiding the Messy Gears",
      bigPicture: "When you drive a car, you interact with a steering wheel, a gas pedal, and a brake pedal. You do NOT need to understand how the electronic fuel injector calculates air-fuel ratios, how the alternator generates electricity, or how the transmission synchronizes planetary gears while you are merging onto a highway. The complexity is hidden behind a clean, simple interface. That is Abstraction: exposing only the high-level operations a user needs while completely hiding the complex, messy implementation details underneath.",
      analogy: "Think of an espresso coffee machine in a cafe. You press one button labeled 'Espresso'. Inside the machine, water is pumped from a reservoir, heated through a thermoblock to precisely 93°C, pressurized to 9 bars, passed through grounded coffee beans for 25 seconds, and poured into your cup. If you had to manually operate the pump, timer, and heater valves yourself, making coffee would be exhausting! The machine gives you an abstraction: one simple button that does the heavy lifting.",
      breakdownTitle: "Why Abstraction is Indispensable in Software:",
      breakdownItems: [
        { title: "Cognitive Simplicity", desc: "Developers calling your class only need to understand WHAT it does, not the 50 lines of internal mechanics behind HOW it does it." },
        { title: "Safe Internal Changes", desc: "You can rewrite, optimize, or replace the internal machinery without breaking any external code that uses your class." },
        { title: "Swappable Components", desc: "By defining standard contracts (Interfaces), you can swap one implementation for another (like swapping an Email service for an SMS service) without rewriting the main app." },
      ],
    },
    part2: {
      title: "The Critical Difference: Encapsulation vs Abstraction",
      intro: "Beginners often confuse Encapsulation and Abstraction because both involve hiding things. Here is the clear distinction:",
      cards: [
        { number: "01", tag: "Data Protection", title: "Encapsulation (The Vault)", description: "Focuses on INFORMATION HIDING and DATA INTEGRITY. It wraps fields with methods and uses 'private' so external code cannot corrupt internal state.", color: "rose" },
        { number: "02", tag: "Complexity Reduction", title: "Abstraction (The Dashboard)", description: "Focuses on SIMPLIFYING INTERACTION. It exposes high-level public controls and hides the multi-step internal machinery behind helper methods or interfaces.", color: "cyan" },
        { number: "03", tag: "Internal Abstraction", title: "Private Helper Methods", description: "Classes break complex operations down into small private methods (e.g. heatWater(), grindBeans()) and orchestrate them inside one clean public method (brewCoffee()).", color: "purple" },
      ],
      rule: {
        title: "💡 Memory Anchor",
        content: "Encapsulation says: 'You are NOT allowed to touch my internal variables directly.' Abstraction says: 'You do NOT NEED to know how my complex internal machinery works to use me.'",
      },
    },
    part3: {
      title: "TypeScript Interfaces: The Ultimate Contract for Abstraction",
      intro: "An Interface is a formal specification of WHAT an object can do, without specifying HOW it does it:",
      points: [
        {
          title: "1. The Interface as a Contract",
          content: "An interface defines method signatures and return types. It makes a promise: 'Any class that claims to implement this interface MUST provide these exact methods.'",
          codeSnippet: `interface Notifier {\n  send(recipient: string, message: string): void;\n}`,
        },
        {
          title: "2. Multiple Implementations Following One Contract",
          content: "Different classes can implement the exact same interface in completely different ways. An EmailNotifier sends emails via an SMTP server; an SmsNotifier sends text messages over cellular networks. Both fulfill the Notifier contract.",
          codeSnippet: `class EmailNotifier implements Notifier {\n  send(recipient: string, message: string): void {\n    console.log(\`Email to \${recipient}: \${message}\`);\n  }\n}`,
        },
        {
          title: "3. Programming to an Interface",
          content: "When other parts of your application ask for a Notifier, they don't care whether you hand them an EmailNotifier, an SmsNotifier, or a MockNotifier for testing. The caller relies only on the abstract contract.",
        },
      ],
    },
    part4: {
      title: "Exposing Low-Level Machinery vs Clean High-Level Abstraction",
      problem: "When a class forces callers to know and orchestrate all its internal plumbing, any internal change forces you to rewrite code across dozens of files.",
      bad: {
        title: "❌ No Abstraction: Callers forced into mechanical plumbing",
        code: `class CoffeeMachine {
  waterVolume: number = 1000;
  waterTemperature: number = 20;
  beansGrams: number = 500;
}

const machine = new CoffeeMachine();

// 💥 The caller just wants a cup of coffee, but has to manually
// orchestrate all internal heating, grinding, and water valves:
machine.waterTemperature = 93;
machine.waterVolume -= 200;
machine.beansGrams -= 18;
console.log("Coffee extracted manually!");`,
        explanation: "The caller is tightly coupled to every internal gear and variable. If the machine changes its heating mechanism or water measurement, every caller in your project breaks.",
      },
      good: {
        title: "✅ Clean Abstraction: One high-level method hiding internal gears",
        code: `class CoffeeMachine {
  private waterVolume: number = 1000;
  private beansGrams: number = 500;

  // ☕ Clean, high-level abstract operation:
  brewEspresso(): string {
    this.heatWater();
    this.grindBeans();
    this.dispense();
    return "☕ Rich, fresh espresso poured into your cup!";
  }

  // 🔒 Complex internal machinery hidden from the caller:
  private heatWater(): void {
    this.waterVolume -= 50;
  }

  private grindBeans(): void {
    this.beansGrams -= 18;
  }

  private dispense(): void {
    // low-level valve pressure logic
  }
}

const machine = new CoffeeMachine();
console.log(machine.brewEspresso()); // Clean and effortless!`,
        explanation: "The caller calls machine.brewEspresso(). All the multi-step heating, grinding, and dispensing steps are handled privately inside the class. The interface is clean and cannot be misused.",
      },
      whyItMatters: "Abstraction keeps code maintainable. When you improve the internal implementation (e.g. making heating 2x faster), not a single line of caller code needs to change because the public contract stayed identical.",
    },
    part5: {
      title: "Interactive Code Sandbox: Swappable Services with Interfaces",
      intro: "Experiment with an abstract Notifier interface. Notice how the OrderService works seamlessly with both Email and SMS notifications without changing its own logic:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-03: ABSTRACTION & INTERFACES (CONTRACTS)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Interface: The contract defining WHAT must be done
interface Notifier {
  send(recipient: string, message: string): void;
}

// 2. Implementation A: Email Service
class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(\`📧 [EMAIL TO \${recipient}] \${message}\`);
  }
}

// 3. Implementation B: SMS Service
class SmsNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(\`📱 [SMS TO \${recipient}] \${message}\`);
  }
}

// 4. The Caller: Depends only on the abstract Notifier contract!
class OrderService {
  private notifier: Notifier;

  constructor(notificationTool: Notifier) {
    this.notifier = notificationTool;
  }

  completeOrder(customer: string, orderId: string): void {
    console.log(\`📦 Processing order #\${orderId}...\`);
    // The OrderService doesn't know or care whether this is Email or SMS:
    this.notifier.send(customer, \`Your order #\${orderId} has been confirmed!\`);
  }
}

// Test with Email notifications:
console.log("--- Testing with Email ---");
const emailService = new OrderService(new EmailNotifier());
emailService.completeOrder("sara@example.com", "ORD-101");

// Test with SMS notifications (swapped with zero changes to OrderService!):
console.log("\\n--- Testing with SMS ---");
const smsService = new OrderService(new SmsNotifier());
smsService.completeOrder("+1-555-0199", "ORD-202");
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Abstraction Simplifies", desc: "Expose WHAT an object does through simple public operations, hiding the complex HOW inside private methods." },
        { title: "2. Encapsulation vs Abstraction", desc: "Encapsulation protects sensitive internal state; Abstraction reduces cognitive complexity for callers." },
        { title: "3. Private Helper Methods", desc: "Break multi-step processes into private methods, orchestrating them behind a single clean public method." },
        { title: "4. Interfaces Define Contracts", desc: "Use TypeScript interfaces to define expected behaviors, allowing concrete implementations to be swapped effortlessly." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "How does Abstraction differ fundamentally from Encapsulation?",
        options: [
          "Encapsulation protects internal data from corruption using private fields; Abstraction simplifies complexity by exposing clean high-level operations",
          "Encapsulation is only used in frontend frameworks, while Abstraction is only used in backend databases",
          "Encapsulation requires interfaces, while Abstraction forbids using interfaces",
          "There is no difference; both terms mean writing unit tests for your code",
        ],
        correctIndex: 0,
        explanation: "Encapsulation is about data protection (putting a shell and private modifiers around state). Abstraction is about interface simplification (giving the user a steering wheel and hiding the engine complexity).",
      },
      nextLessonPreview: {
        title: "OOP-04: Inheritance: Sharing Common Traits ('Is-A' Relationship)",
        desc: "Learn how child classes can inherit properties and methods from parent classes to share common behavior without code duplication.",
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
    subtitle: "Create specialized child classes from a base parent class to share common traits without duplicating code.",
    sections: [
      { id: "part1", label: "The 'Is-A' Relationship", icon: "🧬" },
      { id: "part2", label: "Parent & Child Classes (extends & super)", icon: "👨‍👦" },
      { id: "part3", label: "Method Overriding & Specialization", icon: "⚙️" },
      { id: "part4", label: "Duplicated Code vs Clean Inheritance", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "Why Inheritance Exists: The Real-World Family Tree",
      bigPicture: "In the physical world, living things and objects belong to natural classifications. A Dog IS AN Animal. A SavingsAccount IS A BankAccount. A Tesla IS A Car. Because a Dog is an Animal, it automatically shares general animal traits: it has a name, it breathes, and it eats. It does not need to reinvent those from scratch! In Object-Oriented Programming, Inheritance allows a child class (derived class) to inherit properties and methods from a parent class (base class) using the extends keyword, eliminating code duplication.",
      analogy: "Think of an automotive manufacturer's vehicle chassis. The engineers design one solid base chassis with an engine mount, steering column, and 4 wheels. A Sedan, SUV, and Delivery Van all inherit that shared base chassis. They add specialized bodywork (a trunk, roof rails, or cargo bay) without redesigning the wheels or steering every time.",
      breakdownTitle: "Three Foundations of Inheritance:",
      breakdownItems: [
        { title: "The 'Is-A' Test", desc: "Only inherit when Class B is genuinely a specialized type of Class A (e.g. Dog is an Animal; CheckingAccount is a BankAccount)." },
        { title: "Code Reuse Without Copy-Pasting", desc: "Common properties and methods live once in the parent class; all child classes inherit them automatically." },
        { title: "Specialization (Extensibility)", desc: "Child classes can add unique new properties and customize inherited methods to suit their specific role." },
      ],
    },
    part2: {
      title: "Core Mechanics: 'extends', 'super()', and Property Inheritance",
      intro: "TypeScript provides simple keywords to establish parent-child relationships between classes:",
      cards: [
        { number: "01", tag: "The Connection", title: "class Child extends Parent", description: "The 'extends' keyword links the child blueprint to the parent blueprint, giving child instances access to parent methods and public/protected fields.", color: "purple" },
        { number: "02", tag: "Parent Constructor", title: "The super(...) Call", description: "Inside a child constructor, calling super(...) runs the parent constructor to initialize shared parent properties. TypeScript enforces calling super() before accessing 'this'.", color: "emerald" },
        { number: "03", tag: "Specialization", title: "Child-Only Properties", description: "Child classes can declare additional properties (like interestRate on SavingsAccount) that only exist on instances of that specific child.", color: "cyan" },
      ],
      rule: {
        title: "💡 The Golden Rule of super()",
        content: "A child class must always call super(...) first inside its constructor. The parent must construct the shared foundation before the child can add its specialized rooms.",
      },
    },
    part3: {
      title: "Mental Model: Method Overriding & Extending Behavior",
      intro: "How child classes customize or replace inherited parent behavior:",
      points: [
        {
          title: "1. Inheriting Behavior As-Is",
          content: "If a child class doesn't define a method, calling it runs the parent version automatically. If Animal has eat(), both Dog and Cat can call eat() without writing any code.",
        },
        {
          title: "2. Method Overriding",
          content: "When a child needs custom behavior, it defines a method with the exact same name as the parent method. Calling the method on a child instance executes the child's specialized version.",
          codeSnippet: `class ElectricCar extends Vehicle {\n  override startEngine(): void {\n    console.log("Silent electric power ON ⚡");\n  }\n}`,
        },
        {
          title: "3. Calling super.methodName()",
          content: "A child can execute the parent's logic first, then add extra steps on top: super.withdraw(amount); This avoids rewriting parent math while adding child-specific guard rules.",
        },
        {
          title: "4. The Fragile Base Class Pitfall",
          content: "Never build deep inheritance trees (Class A -> B -> C -> D -> E). Changes to Class A will cascade unpredictably down all descendants! Keep inheritance hierarchies shallow (1 to 2 levels max).",
        },
      ],
    },
    part4: {
      title: "Duplicated Classes vs Clean Inherited Hierarchy",
      problem: "Copy-pasting identical properties and methods across multiple related classes creates maintenance nightmares whenever shared business rules change.",
      bad: {
        title: "❌ Duplication: Copy-pasting the same code across classes",
        code: `class Dog {
  name: string;
  energy: number = 100;

  constructor(name: string) { this.name = name; }

  eat(): void { this.energy += 10; }
  sleep(): void { this.energy += 20; }
  bark(): void { console.log("Woof!"); }
}

class Cat {
  // 💥 Copy-pasting the exact same name, energy, eat, and sleep!
  name: string;
  energy: number = 100;

  constructor(name: string) { this.name = name; }

  eat(): void { this.energy += 10; }
  sleep(): void { this.energy += 20; }
  meow(): void { console.log("Meow!"); }
}`,
        explanation: "When you update sleep() to restore 30 energy instead of 20, you must remember to find and edit every animal class manually. If you miss one, silent bugs occur.",
      },
      good: {
        title: "✅ Inheritance: Shared parent with specialized children",
        code: `class Animal {
  name: string;
  energy: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  eat(): void {
    this.energy += 10;
    console.log(\`\${this.name} ate food. Energy: \${this.energy}\`);
  }

  sleep(): void {
    this.energy += 20;
    console.log(\`\${this.name} slept. Energy: \${this.energy}\`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(\`\${this.name} says: Woof! 🐕\`);
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(\`\${this.name} says: Meow! 🐈\`);
  }
}`,
        explanation: "Shared state and methods live cleanly in Animal. Dog and Cat inherit them automatically and only add their unique behaviors. Updating sleep() updates all animals instantly.",
      },
      whyItMatters: "Inheritance follows the DRY (Don't Repeat Yourself) principle. When multiple entities share core attributes and actions, grouping them under a parent class centralizes business rules in one place.",
    },
    part5: {
      title: "Interactive Code Sandbox: Bank & Savings Accounts",
      intro: "Experiment with a base BankAccount class and a specialized SavingsAccount that adds interest calculation and overrides withdrawal rules:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-04: INHERITANCE, SUPER & METHOD OVERRIDING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Base (Parent) Class
class BankAccount {
  owner: string;
  protected balance: number;

  constructor(ownerName: string, initialBalance: number) {
    this.owner = ownerName;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) return;
    this.balance += amount;
    console.log(\`✅ [\${this.owner}] Deposited $\${amount}. Balance: $\${this.balance}\`);
  }

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance) {
      console.log(\`❌ [\${this.owner}] Withdrawal of $\${amount} denied. Balance: $\${this.balance}\`);
      return false;
    }
    this.balance -= amount;
    console.log(\`💵 [\${this.owner}] Withdrew $\${amount}. Balance: $\${this.balance}\`);
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

// 2. Derived (Child) Class specializing BankAccount
class SavingsAccount extends BankAccount {
  interestRate: number; // e.g. 0.05 for 5%

  constructor(ownerName: string, initialBalance: number, annualInterestRate: number = 0.05) {
    // Calling super() initializes parent properties:
    super(ownerName, initialBalance);
    this.interestRate = annualInterestRate;
  }

  // Specialized method unique to SavingsAccount:
  applyInterest(): void {
    const earned = this.balance * this.interestRate;
    this.balance += earned;
    console.log(\`📈 [\${this.owner}] Applied \${(this.interestRate * 100)}% interest (+$$\${earned}). Balance: $\${this.balance}\`);
  }

  // Overriding withdraw to enforce a $50 minimum savings floor:
  override withdraw(amount: number): boolean {
    const minimumBalance = 50;
    if (this.balance - amount < minimumBalance) {
      console.log(\`⚠️ [\${this.owner}] Withdrawal denied: savings account must maintain at least $\${minimumBalance}.\`);
      return false;
    }
    // Delegate actual withdrawal math to the parent class:
    return super.withdraw(amount);
  }
}

// Test Base Class
console.log("--- Regular Checking Account ---");
const checking = new BankAccount("Alice", 100);
checking.deposit(50);
checking.withdraw(120);

// Test Derived Class
console.log("\\n--- Specialized Savings Account ---");
const savings = new SavingsAccount("Bob", 200, 0.05);
savings.deposit(100);       // Inherited from BankAccount
savings.applyInterest();    // Unique to SavingsAccount
savings.withdraw(220);      // Overridden check: blocked by $50 floor rule!
savings.withdraw(50);       // Succeeded through super.withdraw()
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. The 'Is-A' Rule", desc: "Use inheritance only when a child class is a genuine, specialized type of the parent class." },
        { title: "2. The extends Keyword", desc: "Connects child classes to parent classes, automatically inheriting public and protected members." },
        { title: "3. Always Call super()", desc: "Derived constructors must call super(...) to run the parent constructor before accessing 'this'." },
        { title: "4. Method Overriding", desc: "Child classes can customize inherited methods by redefining them, optionally calling super.methodName() to reuse parent logic." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Why must a derived (child) class constructor call super() before accessing 'this'?",
        options: [
          "To allow the parent class constructor to properly initialize its own instance properties before the child adds its data",
          "To convert the JavaScript code into a background worker thread",
          "Because TypeScript requires super() to import modules from disk",
          "To encrypt the child object's memory in the browser",
        ],
        correctIndex: 0,
        explanation: "In object-oriented hierarchies, the parent foundation must be constructed and initialized first. Calling super() executes the parent constructor, ensuring all base properties are ready before the child accesses 'this'.",
      },
      nextLessonPreview: {
        title: "OOP-05: Polymorphism: Eliminating Conditionals with Dynamic Dispatch",
        desc: "Learn how one method call can trigger different behaviors across different objects without messy if/else statements.",
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
    subtitle: "One command, many behaviors: tell different objects to perform an action, and each one executes its own specialized behavior.",
    sections: [
      { id: "part1", label: "The Universal Remote Analogy", icon: "📺" },
      { id: "part2", label: "Dynamic Dispatch & Contracts", icon: "🎭" },
      { id: "part3", label: "Killing Fragile Switch Statements", icon: "🧹" },
      { id: "part4", label: "Switch-Case vs Clean Polymorphism", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "What is Polymorphism? The Universal Remote",
      bigPicture: "The word Polymorphism comes from Greek: 'poly' (many) and 'morph' (forms). In object-oriented programming, it means the ability of different objects to respond to the exact same method call, each with its own specialized behavior. Think of a universal 'Play' button on your computer. When you click Play on a music track, it plays audio through speakers. When you click Play on a video, it renders video frames on screen. When you click Play on a video game, it launches a 3D window. You invoke a single, uniform action: player.play(). The object itself knows how to fulfill the request.",
      analogy: "Think of an orchestra conductor. The conductor gives one unified signal: 'Play crescendo!' The violinist plays louder with a bow; the trumpeter blows harder into brass; the percussionist strikes the timpani with more force. The conductor does NOT whisper individual instructions to all 80 musicians. One uniform command produces many different specialized sounds.",
      breakdownTitle: "Three Core Benefits of Polymorphism:",
      breakdownItems: [
        { title: "Uniform Interface", desc: "Callers interact through one common method name (e.g. render(), calculatePay(), send()) regardless of the concrete class." },
        { title: "Dynamic Dispatch", desc: "At runtime, the programming language inspects the actual object in memory and executes its specific implementation automatically." },
        { title: "Open for Extension", desc: "Add brand-new classes (e.g. SlackChannel or CryptoPayment) without editing a single line of existing caller code." },
      ],
    },
    part2: {
      title: "Core Mechanics: Two Ways to Achieve Polymorphism",
      intro: "In TypeScript and modern OOP, polymorphism is achieved through two main mechanisms:",
      cards: [
        { number: "01", tag: "Through Inheritance", title: "Method Overriding", description: "Child classes extend a base class and override a common method (e.g. SavingsAccount and CheckingAccount both overriding withdraw()).", color: "purple" },
        { number: "02", tag: "Through Interfaces", title: "Interface Implementation", description: "Unrelated classes implement the same interface (e.g. EmailNotifier, SmsNotifier, and PushNotifier all implementing Notifier).", color: "emerald" },
        { number: "03", tag: "Collection Uniformity", title: "Polymorphic Arrays", description: "You can store different objects in a single array (e.g. channels: NotificationChannel[]) and loop through them calling channel.send().", color: "cyan" },
      ],
      rule: {
        title: "💡 The Anti-Switch Heuristic",
        content: "Whenever you catch yourself writing a giant switch(item.type) statement with 10 cases, replace it with polymorphism! Let the object do the work.",
      },
    },
    part3: {
      title: "Mental Model: Dynamic Dispatch & The Open/Closed Principle",
      intro: "How polymorphism makes applications resilient to future changes:",
      points: [
        {
          title: "1. What is Dynamic Dispatch?",
          content: "When you call item.draw(), the computer looks up the actual object instance at runtime. If the instance in memory is a Circle, it calls Circle's draw(). If it is a Rectangle, it calls Rectangle's draw(). You don't write any if/else checks.",
        },
        {
          title: "2. The Open/Closed Principle (Preview)",
          content: "Polymorphism satisfies the Open/Closed Principle: code should be OPEN for extension (easy to add new features), but CLOSED for modification (no need to edit existing, working code).",
        },
        {
          title: "3. Avoid Type-Checking Traps",
          content: "If you find yourself writing: if (obj instanceof Dog) { obj.bark(); } else if (obj instanceof Cat) { obj.meow(); }, you are violating polymorphism! Define a common speak() method and simply call obj.speak().",
        },
      ],
    },
    part4: {
      title: "Fragile Switch Statements vs Clean Polymorphic Classes",
      problem: "When a system relies on switch statements based on a 'type' string, adding a new feature requires hunting down and modifying code across dozens of files.",
      bad: {
        title: "❌ Fragile: Giant switch statement checking types",
        code: `function calculateShippingCost(type: string, weightKg: number): number {
  // 💥 Every time a new shipping option is introduced,
  // this function must be edited and re-tested!
  switch (type) {
    case "standard":
      return weightKg * 5;
    case "express":
      return weightKg * 10 + 15;
    case "overnight":
      return weightKg * 25 + 50;
    default:
      throw new Error(\`Unknown shipping type: \${type}\`);
  }
}`,
        explanation: "If you add 5 new shipping partners, you must find every switch statement in your app (shipping cost, delivery estimate, tracking URL generator). One missed case breaks production.",
      },
      good: {
        title: "✅ Polymorphic: Self-contained strategies implementing an interface",
        code: `interface ShippingStrategy {
  calculate(weightKg: number): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(weightKg: number): number {
    return weightKg * 5;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(weightKg: number): number {
    return weightKg * 10 + 15;
  }
}

// Adding DroneShipping requires only a new class—zero edits to existing code!
class DroneShipping implements ShippingStrategy {
  calculate(weightKg: number): number {
    return weightKg * 30 + 40;
  }
}`,
        explanation: "The caller simply calls strategy.calculate(weight). To add DroneShipping, you create a new class. Not a single line of existing code is touched or risked.",
      },
      whyItMatters: "Polymorphism prevents code rot. Large software projects thrive when new features can be plugged in as new classes rather than hacking more branches into existing, fragile conditional logic.",
    },
    part5: {
      title: "Interactive Code Sandbox: Alert Broadcast Dispatcher",
      intro: "Experiment with an alert broadcast system. Notice how the broadcaster loops through different notification channels polymorphically without a single if/else statement:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-05: POLYMORPHISM & DYNAMIC DISPATCH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Common Interface (Contract)
interface NotificationChannel {
  name: string;
  send(recipient: string, message: string): void;
}

// 2. Concrete Implementations (Each handles 'send' in its own way)
class EmailChannel implements NotificationChannel {
  name = "Email";
  send(recipient: string, message: string): void {
    console.log(\`📧 Sending Email to \${recipient}: "\${message}"\`);
  }
}

class SmsChannel implements NotificationChannel {
  name = "SMS Text";
  send(recipient: string, message: string): void {
    console.log(\`📱 Sending SMS to \${recipient}: "\${message}"\`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  name = "Mobile Push";
  send(recipient: string, message: string): void {
    console.log(\`🔔 Sending Mobile Push to device of \${recipient}: "\${message}"\`);
  }
}

// 3. The Dispatcher (Has zero if/else or switch statements!)
class AlertBroadcastSystem {
  private channels: NotificationChannel[] = [];

  registerChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }

  // Polymorphic execution: one method call, multiple distinct behaviors!
  broadcastAlert(recipient: string, alertText: string): void {
    console.log(\`🚨 Broadcasting alert to \${this.channels.length} channel(s)...\\n\`);
    this.channels.forEach((channel) => {
      // Dynamic dispatch: runtime calls the specific send() for each channel!
      channel.send(recipient, alertText);
    });
  }
}

// 4. Client Usage
const broadcaster = new AlertBroadcastSystem();
broadcaster.registerChannel(new EmailChannel());
broadcaster.registerChannel(new SmsChannel());
broadcaster.registerChannel(new PushNotificationChannel());

broadcaster.broadcastAlert("Sarah", "Server CPU load exceeded 95%!");
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. One Interface, Many Forms", desc: "Callers invoke the same method name, and each object executes its own specialized behavior." },
        { title: "2. Dynamic Dispatch at Runtime", desc: "The programming language determines which concrete method to execute based on the actual object in memory." },
        { title: "3. Kill Fragile Switches", desc: "Replace fragile switch(type) ladders with clean polymorphic classes." },
        { title: "4. Pluggable Extensibility", desc: "Add new features by creating new classes without modifying existing, tested business logic." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "How does Polymorphism help when adding a new payment method (like CryptoPayment) to an e-commerce platform?",
        options: [
          "You create a new CryptoPayment class implementing the PaymentGateway interface, without having to edit existing tested payment code",
          "It forces you to rewrite the entire database from scratch",
          "It converts all functions into browser localStorage caches",
          "It prevents any user from completing a checkout without entering a password twice",
        ],
        correctIndex: 0,
        explanation: "Polymorphism decouples the caller from concrete classes. When a new class implements the shared interface, existing loops and callers can execute it immediately with zero code changes.",
      },
      nextLessonPreview: {
        title: "OOP-06: Object Relationships: Association, Aggregation & Composition",
        desc: "Learn how objects connect with each other: uses-a, has-a independent, and whole-part lifecycles.",
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
    subtitle: "Understand the 3 fundamental ways objects connect: uses-a, has-a independent, and whole-part lifecycles.",
    sections: [
      { id: "part1", label: "The 3 Ways Objects Connect", icon: "🔗" },
      { id: "part2", label: "The Lifecycle Acid Test", icon: "🤝" },
      { id: "part3", label: "Memory References & Collaboration", icon: "🧩" },
      { id: "part4", label: "Exposed Arrays vs Clean Composition", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "How Objects Work Together in Real Systems",
      bigPicture: "In real software, classes do not live in isolation, nor do they form tall, rigid inheritance hierarchies. Instead, applications are built from networks of cooperating objects that communicate with one another. A Customer places an Order. An Order owns OrderItems. An Order uses a PaymentGateway. Understanding how objects relate to one another is the key to designing modular, maintainable software without circular dependencies or memory leaks.",
      analogy: "Think of three everyday relationships: 1) You consult your Doctor (Association: you temporarily use their advice; both exist independently). 2) A University has Students (Aggregation: students attend classes, but if the university closes, the students continue to exist). 3) A Human Body has a Heart (Composition: the heart is created for the body and cannot exist or function without it; they share a lifecycle).",
      breakdownTitle: "The Three Object Relationships:",
      breakdownItems: [
        { title: "1. Association ('Uses-A')", desc: "A loose, temporary connection where Object A calls a method on Object B (usually passed in as a method argument)." },
        { title: "2. Aggregation ('Has-A' Independent)", desc: "A 'has-a' relationship where child objects are passed into the parent from outside and have independent lifecycles." },
        { title: "3. Composition ('Has-A' Whole-Part)", desc: "A strict 'has-a' relationship where the parent creates and owns its child parts; if the parent is destroyed, the parts are destroyed too." },
      ],
    },
    part2: {
      title: "Core Mechanics: The Lifecycle Acid Test",
      intro: "To decide whether a relationship is Aggregation or Composition, ask one simple question:",
      cards: [
        { number: "01", tag: "Uses-A (Temporary)", title: "Association", description: "Object A temporarily uses Object B via a method parameter (e.g. order.processWith(paymentGateway)).", color: "purple" },
        { number: "02", tag: "Has-A (Independent)", title: "Aggregation", description: "Parent holds a reference to items created outside. If the Department is deleted, the Employees still exist.", color: "emerald" },
        { number: "03", tag: "Has-A (Owned)", title: "Composition", description: "Parent instantiates and owns child parts. If the House is demolished, the Rooms are destroyed too.", color: "rose" },
      ],
      rule: {
        title: "💡 The Lifecycle Acid Test",
        content: "If Parent Object ceases to exist, does Child Object continue to exist? If YES = Aggregation. If NO = Composition.",
      },
    },
    part3: {
      title: "Mental Model: Memory References & Aggregate Roots",
      intro: "How objects store connections and collaborate in memory:",
      points: [
        {
          title: "1. Objects Hold References, Not Clones",
          content: "When an object has another object as a property (this.monitor = monitor), it doesn't copy the data. It holds a pointer/reference to that existing object in memory.",
        },
        {
          title: "2. The Aggregate Root Pattern",
          content: "In Composition, the parent class acts as the 'Aggregate Root'. External code is never allowed to directly manipulate the internal child parts; all changes must flow through the parent's methods.",
        },
        {
          title: "3. Composition Avoids Inheritance Traps",
          content: "Instead of making a SmartCar inherit from Computer, Battery, and Vehicle (creating a messy multi-inheritance knot), a SmartCar simply composes a Computer and a Battery as internal properties.",
        },
      ],
    },
    part4: {
      title: "Exposed Child Arrays vs Encapsulated Composition",
      problem: "When an object exposes its internal child parts directly to outside code, business rules and data consistency are easily destroyed.",
      bad: {
        title: "❌ Fragile: Exposing raw internal child array",
        code: `class Order {
  // 💥 Raw public array exposed to the world!
  public items: { name: string; price: number }[] = [];
}

const order = new Order();

// Outside code pushes corrupted data directly, bypassing all rules:
order.items.push({ name: "Corrupted Item", price: -500 });
console.log(order.items); // Order now has negative items!`,
        explanation: "Because items is a public array, external code can push invalid prices, tamper with quantities, or delete items without the Order ever knowing or recalculating its totals.",
      },
      good: {
        title: "✅ Composition: Parent controls creation and enforces rules",
        code: `class OrderItem {
  constructor(public name: string, public price: number) {
    if (price <= 0) throw new Error("Price must be positive");
  }
}

class Order {
  // 🔒 Controlled composition: items are private
  private items: OrderItem[] = [];

  addItem(name: string, price: number): void {
    const item = new OrderItem(name, price);
    this.items.push(item);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}`,
        explanation: "The Order manages its own line items. External callers cannot inject invalid items or manipulate prices directly. The aggregate maintains complete data integrity.",
      },
      whyItMatters: "Software architecture is all about boundaries. By establishing clear relationships (Association, Aggregation, or Composition), you define who owns what data and who is responsible for enforcing invariants.",
    },
    part5: {
      title: "Interactive Code Sandbox: Computer & Peripherals",
      intro: "Experiment with a Computer model demonstrating all 3 relationships: Composition (CPU), Aggregation (Monitor), and Association (Printer):",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-06: OBJECT RELATIONSHIPS (ASSOCIATION, AGGREGATION, COMPOSITION)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. COMPOSITION: CPU is created and owned strictly by the Computer (Whole-Part)
class CPU {
  model: string;
  constructor(modelName: string) {
    this.model = modelName;
  }
  process(): void {
    console.log(\`⚡ CPU (\${this.model}): Executing system instructions.\`);
  }
}

// 2. AGGREGATION: Monitor is passed in from outside; survives if Computer is turned off
class Monitor {
  resolution: string;
  constructor(res: string) {
    this.resolution = res;
  }
  display(content: string): void {
    console.log(\`🖥️ Displaying on \${this.resolution} screen: "\${content}"\`);
  }
}

// 3. ASSOCIATION: Printer is temporarily used by Computer in a method parameter
class Printer {
  printDocument(docName: string): void {
    console.log(\`🖨️ Printing physical paper copy of "\${docName}"\`);
  }
}

// 4. The Main Computer Entity Demonstrating All 3 Relationships
class Computer {
  // 🧩 COMPOSITION: Computer creates and owns its CPU (tied lifecycles)
  private cpu: CPU;

  // 🤝 AGGREGATION: Monitor is attached from outside (independent lifecycle)
  private monitor: Monitor;

  constructor(cpuModel: string, attachedMonitor: Monitor) {
    this.cpu = new CPU(cpuModel); // Composition: created internally!
    this.monitor = attachedMonitor; // Aggregation: passed in from outside!
  }

  boot(): void {
    console.log("💻 Booting computer...");
    this.cpu.process();
    this.monitor.display("Desktop ready.");
  }

  // 🔗 ASSOCIATION: Printer is passed as a parameter temporarily ("uses-a")
  printReport(printer: Printer, reportName: string): void {
    console.log(\`Preparing report "\${reportName}"...\`);
    printer.printDocument(reportName); // Temporary association!
  }
}

// Setup and Execution:
const myMonitor = new Monitor("4K Ultra HD"); // Exists independently
const officePrinter = new Printer();          // Exists independently

const workStation = new Computer("Apple M3 Max", myMonitor);
workStation.boot();

console.log("\\n--- Printing Action (Association) ---");
workStation.printReport(officePrinter, "Quarterly Financials.pdf");
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Association ('Uses-A')", desc: "A temporary connection where one object interacts with another via method parameters." },
        { title: "2. Aggregation ('Has-A' Independent)", desc: "A parent object holds a reference to child objects that were created externally and outlive the parent." },
        { title: "3. Composition ('Has-A' Owned)", desc: "A strict whole-part relationship where the parent creates, owns, and controls the lifecycle of child parts." },
        { title: "4. The Lifecycle Test", desc: "Ask: if the parent ceases to exist, does the child still exist? Yes = Aggregation; No = Composition." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Which of the following is the best real-world example of COMPOSITION?",
        options: [
          "A House and the Rooms inside it (rooms cannot exist or function without the house)",
          "A Teacher and the Students in a school",
          "A Driver and the rental car they drive for a day",
          "A Customer and the supermarket shopping basket they pick up",
        ],
        correctIndex: 0,
        explanation: "Rooms are created strictly as internal parts of a house and have no independent existence if the house is destroyed. That defines strict Composition.",
      },
      nextLessonPreview: {
        title: "OOP-07: Favor Composition Over Inheritance",
        desc: "Learn why assembling Lego-like components is more flexible and maintainable than building deep class hierarchies.",
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
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The Big Shift: Building with Components Rather Than Family Trees",
      bigPicture: "When developers first learn Object-Oriented Programming, inheritance (using 'extends') feels like magic. Need a FlyingMonster? Extend Monster. Need a SwimmingMonster? Extend Monster. But what happens when you need a Monster that both flies AND swims? Most programming languages, including TypeScript, do not allow multiple inheritance because of the confusing 'Diamond Problem' (which parent's method wins?). Even worse, if you create deep inheritance chains (Grandparent -> Parent -> Child -> Grandchild), any tiny edit in the grandparent ripples down and breaks every descendant! The Gang of Four formulated one of the most famous golden rules of software design: 'Favor object composition over class inheritance.'",
      analogy: "Think of building a character with Lego bricks vs carving a stone statue. If you sculpt a stone Knight and later decide he needs wings, you have to chisel into the solid stone and risk shattering the entire statue. But with Lego, your Knight is composed of modular parts. You simply snap on a Jetpack brick. When he goes underwater, you pop off the Jetpack and snap on Scuba Fins at runtime! You never destroy or rewrite the Knight.",
      breakdownTitle: "The Three Critical Flaws of Deep Inheritance:",
      breakdownItems: [
        { title: "1. Combinatorial Class Explosion", desc: "If you have 3 optional abilities (Flying, Swimming, Invisibility), inheritance requires 2³ = 8 different subclasses to represent all combinations!" },
        { title: "2. Locked at Compile Time", desc: "Inheritance is permanent once code is compiled. A FlyingMonster can never become a SwimmingMonster while the game is running." },
        { title: "3. The Gorilla-Banana Problem", desc: "You only wanted a single small helper method (the banana), but inheritance forced you to drag in the entire base class and its grandparents (the gorilla and the jungle)." },
      ],
    },
    part2: {
      title: "Core Mechanics: Why Inheritance Becomes Fragile",
      intro: "Compare the rigidity of inheritance against the modular flexibility of composition:",
      cards: [
        { number: "01", tag: "The Fragile Base Class", title: "Tight Coupling (Rigid)", description: "When a child extends a parent, it inherits all internal quirks. Changing one method in the parent can silently break 20 subclasses across your app.", color: "rose" },
        { number: "02", tag: "Delegation Handshake", title: "Delegation (Clean)", description: "Instead of being a specialized child, the outer class delegates work to an internal helper component: this.movement.move().", color: "emerald" },
        { number: "03", tag: "Runtime Reconfiguration", title: "Swappable at Runtime", description: "Because the helper is stored in an ordinary variable, you can swap it dynamically (e.g. hero.setWeapon(new Bow())) without remaking the hero.", color: "purple" },
      ],
      rule: {
        title: "💡 The Capability Acid Test",
        content: "Ask yourself: Is this an essential IS-A identity (Dog is an Animal) or a swappable CAN-DO capability (Robot can Fly)? If it's a capability, use Composition!",
      },
    },
    part3: {
      title: "Mental Model: Pluggable Sockets & Delegation",
      intro: "How composition works seamlessly under the hood in TypeScript:",
      points: [
        {
          title: "1. Define Capability Contracts (Interfaces)",
          content: "Create small, focused interfaces for each capability (e.g. MovementEngine, AttackStrategy, Logger). Any class can implement them.",
          codeSnippet: `interface MovementEngine {\n  move(): void;\n}`,
        },
        {
          title: "2. Store the Component as a Property",
          content: "The host class holds a reference to the interface rather than hardcoding a concrete implementation inside itself.",
          codeSnippet: `class Vehicle {\n  private engine: MovementEngine;\n  constructor(engine: MovementEngine) {\n    this.engine = engine;\n  }\n}`,
        },
        {
          title: "3. Delegate Rather Than Reinvent",
          content: "When vehicle.drive() is called, it does not contain messy motor math. It simply delegates: this.engine.move(). To change from wheels to jets, just pass a JetEngine!",
        },
      ],
    },
    part4: {
      title: "Combinatorial Class Explosion vs Pluggable Components",
      problem: "Using inheritance to combine multiple capabilities results in an explosion of subclasses with duplicated code and fragile hierarchies.",
      bad: {
        title: "❌ Rigid: Class explosion with duplicated code",
        code: `class Drone {
  fly(): void { console.log("Flying through air"); }
}

// 💥 What if a drone can also swim?
class SwimmingDrone extends Drone {
  swim(): void { console.log("Propelling through water"); }
}

// 💥 What if a drone can swim and shoot lasers?
class LaserSwimmingDrone extends SwimmingDrone {
  shoot(): void { console.log("Firing laser"); }
}

// 💥 What if another drone only shoots lasers and doesn't swim?
class LaserDrone extends Drone {
  // Duplicated shoot() method because we can't inherit from LaserSwimmingDrone!
  shoot(): void { console.log("Firing laser"); }
}`,
        explanation: "Inheritance forces you into a rigid tree where every combination of features requires a new subclass. You end up copy-pasting code between branches that share capabilities.",
      },
      good: {
        title: "✅ Pluggable: Composing capabilities via interfaces",
        code: `interface Propulsion {
  propel(): string;
}

interface Tool {
  use(): string;
}

class RotorPropulsion implements Propulsion {
  propel(): string { return "Rotors spinning in air"; }
}

class WaterJetPropulsion implements Propulsion {
  propel(): string { return "Water jets pumping in sea"; }
}

class LaserCutter implements Tool {
  use(): string { return "Cutting with laser beam"; }
}

class ModularDrone {
  private propulsion: Propulsion;
  private tool?: Tool;

  constructor(propulsion: Propulsion, tool?: Tool) {
    this.propulsion = propulsion;
    this.tool = tool;
  }

  setPropulsion(p: Propulsion): void { this.propulsion = p; }
  setTool(t: Tool): void { this.tool = t; }

  operate(): string {
    const movement = this.propulsion.propel();
    const action = this.tool ? this.tool.use() : "Idle";
    return \`[\${movement}] & [\${action}]\`;
  }
}`,
        explanation: "With composition, you have 1 Drone class and pluggable components. Any drone can swap between air and water, or attach a laser cutter, camera, or sensor at runtime with zero code duplication.",
      },
      whyItMatters: "Requirements in real projects change constantly. If you rely on inheritance hierarchies, adding a new feature requires refactoring an entire class tree. With composition, you simply write one new component and plug it in.",
    },
    part5: {
      title: "Interactive Code Sandbox: Video Game Character Equipment",
      intro: "Experiment with a game character that swaps weapons and armor at runtime through delegation:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-07: FAVOR COMPOSITION OVER INHERITANCE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Capability Interface: Weapon Strategy
interface Weapon {
  name: string;
  attack(): string;
}

// 2. Concrete Weapons
class Sword implements Weapon {
  name: string = "Valyrian Steel Sword";
  attack(): string {
    return "⚔️ slashes gracefully for 25 melee damage!";
  }
}

class MagicStaff implements Weapon {
  name: string = "Staff of the Archmage";
  attack(): string {
    return "🔥 casts a blazing fireball for 40 magic damage!";
  }
}

class Bow implements Weapon {
  name: string = "Elven Recurve Bow";
  attack(): string {
    return "🏹 shoots a silent piercing arrow for 18 ranged damage!";
  }
}

// 3. Capability Interface: Defense Strategy
interface Shield {
  name: string;
  defend(): string;
}

class WoodenBuckler implements Shield {
  name: string = "Wooden Buckler";
  defend(): string {
    return "🛡️ blocks 10 physical damage.";
  }
}

class EnergyBarrier implements Shield {
  name: string = "Plasma Energy Barrier";
  defend(): string {
    return "⚡ absorbs 35 energy damage!";
  }
}

// 4. Character composed of swappable components
class Character {
  name: string;
  private weapon: Weapon;
  private shield: Shield;

  constructor(name: string, startingWeapon: Weapon, startingShield: Shield) {
    this.name = name;
    this.weapon = startingWeapon;
    this.shield = startingShield;
  }

  equipWeapon(newWeapon: Weapon): void {
    console.log(\`🎒 \${this.name} unequipped \${this.weapon.name} and equipped \${newWeapon.name}!\`);
    this.weapon = newWeapon;
  }

  equipShield(newShield: Shield): void {
    console.log(\`🎒 \${this.name} equipped \${newShield.name}!\`);
    this.shield = newShield;
  }

  performCombat(): void {
    console.log(\`👤 \${this.name} in action:\`);
    console.log(\`   Attack: \${this.weapon.attack()}\`);
    console.log(\`   Defense: \${this.shield.defend()}\`);
  }
}

// 5. Test out runtime swapping (no subclassing required!)
const hero = new Character("Aria the Ranger", new Bow(), new WoodenBuckler());
hero.performCombat();

console.log("\\n--- Boss Fight Phase 2: Equipping High-Tier Gear ---");
hero.equipWeapon(new MagicStaff());
hero.equipShield(new EnergyBarrier());
hero.performCombat();
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Favor 'Has-A' over 'Is-A'", desc: "Use inheritance only when an object truly IS a subtype (Dog is Animal). For all capabilities and behaviors, use Composition." },
        { title: "2. Avoid Combinatorial Explosion", desc: "Combining features via subclasses leads to 2^N rigid classes. Composing modular interfaces keeps your codebase small and clean." },
        { title: "3. Delegation", desc: "The host class forwards calls to its composed helper components (e.g. this.weapon.attack()) without knowing internal implementation details." },
        { title: "4. Runtime Swapping", desc: "Because composed helpers are variables, you can swap them dynamically at runtime with simple setter methods." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Why does modern software architecture strongly favor Composition over deep class Inheritance?",
        options: [
          "Composition allows assembling pluggable behaviors that can be swapped or combined at runtime, avoiding fragile base classes and subclass explosion",
          "Because TypeScript is deprecating the 'class' and 'extends' keywords in the next version",
          "Because classes with inheritance cannot use TypeScript interfaces",
          "Because Composition makes JavaScript run 10x faster in web browsers",
        ],
        correctIndex: 0,
        explanation: "Composition lets you snap interchangeable components together like Lego bricks. Adding new combinations doesn't require dozens of subclasses, and base class changes won't break your entire system.",
      },
      nextLessonPreview: {
        title: "OOP-08: Coupling & Cohesion: The Twin Metrics of Clean Design",
        desc: "Learn how to write laser-focused classes (High Cohesion) with loose, flexible connections (Low Coupling).",
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
      { id: "part1", label: "The Two Golden Metrics", icon: "⚖️" },
      { id: "part2", label: "High Cohesion Explained", icon: "🎯" },
      { id: "part3", label: "The Law of Demeter", icon: "🛡️" },
      { id: "part4", label: "Train Wreck vs Clean Calls", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The Twin Metrics That Measure Architecture Health",
      bigPicture: "How do you know if your software architecture is clean, or if it is secretly turning into an unmaintainable plate of spaghetti? In software engineering, architecture health is evaluated using two fundamental metrics: Cohesion and Coupling. Cohesion measures how focused a class is on doing its own single job. Coupling measures how dependent classes are on each other's inner details. The universal goal of clean software design is: High Cohesion and Low Coupling.",
      analogy: "Think of Bluetooth headphones vs old wired headphone cables soldered directly into your computer's motherboard. With Bluetooth (Low Coupling), you can replace your laptop or pair your headphones with your phone without changing either device. For Cohesion: Imagine a specialized Brain Surgeon vs someone who tries to perform brain surgery while simultaneously repairing the hospital's elevator and filing corporate tax returns. The surgeon has High Cohesion (does one critical job with complete focus).",
      breakdownTitle: "The Golden Metrics Defined:",
      breakdownItems: [
        { title: "1. High Cohesion (Desirable)", desc: "A class has a single, well-defined purpose. All of its methods and fields directly support that specific goal." },
        { title: "2. Low Coupling (Desirable)", desc: "Classes communicate through clean, minimal interfaces. If you change or rewrite Class A, Class B doesn't even notice." },
        { title: "3. Shotgun Surgery Warning", desc: "When one small business change forces you to edit 15 different files because everything is tightly coupled together." },
      ],
    },
    part2: {
      title: "Core Mechanics: Cohesion vs Coupling",
      intro: "Understand the ideal balance between internal focus and external connections:",
      cards: [
        { number: "01", tag: "Internal Focus", title: "High Cohesion", description: "All methods inside the class belong together. A Chef cooks food; they don't do tax accounting, fix plumbing, or clean tables.", color: "emerald" },
        { number: "02", tag: "Loose Handshake", title: "Low Coupling", description: "Classes connect through simple contracts. Swapping a database or payment gateway doesn't ripple across the rest of the app.", color: "purple" },
        { number: "03", tag: "The Danger Zone", title: "Train Wreck Anti-Pattern", description: "Chaining multiple dots across nested objects (a.b.c.d.run()) tightly couples the caller to 4 separate classes simultaneously.", color: "rose" },
      ],
      rule: {
        title: "💡 'Tell, Don't Ask'",
        content: "Don't reach inside an object to inspect and mutate its private variables. Tell the object what you want it to accomplish and let it handle its own state!",
      },
    },
    part3: {
      title: "Mental Model: The Law of Demeter ('Don't Talk to Strangers')",
      intro: "The Law of Demeter is a simple design guideline that prevents brittle code:",
      points: [
        {
          title: "1. Only Talk to Immediate Friends",
          content: "A method inside class C should only call methods on: C itself, objects passed in as method parameters, objects it instantiates itself, or its direct component fields.",
        },
        {
          title: "2. The Paperboy Example",
          content: "When a paperboy collects payment, he doesn't reach into the customer's pocket, open their wallet, pull out cash, and put the wallet back. He tells the customer: 'That will be $2, please.' The customer handles their own wallet!",
          codeSnippet: `// ❌ Train Wreck (Violation):\npaperboy.takeMoney(customer.wallet.cash);\n\n// ✅ Clean (Law of Demeter):\ncustomer.pay(2.00);`,
        },
        {
          title: "3. Encapsulate Delegation",
          content: "If an object contains nested components, provide a forwarding method on the parent rather than exposing the nested component to outsiders.",
        },
      ],
    },
    part4: {
      title: "Tangled Train Wrecks vs Clean Encapsulation",
      problem: "When code reaches through multiple layers of nested objects, any small schema change breaks callers across the entire codebase.",
      bad: {
        title: "❌ High Coupling: Digging 4 levels deep into internal objects",
        code: `class CheckoutService {
  processOrder(order: any): void {
    // 💥 Train wreck: CheckoutService knows the internal anatomy of
    // Order, Customer, Account, Wallet, and CreditCard!
    if (order.customer.account.wallet.cards[0].isExpired) {
      throw new Error("Card expired");
    }

    order.customer.account.wallet.cards[0].balance -= 100;
  }
}`,
        explanation: "CheckoutService is tightly coupled to 5 separate classes. If Wallet changes cards from an array to a Map, or Account is renamed, CheckoutService instantly breaks.",
      },
      good: {
        title: "✅ Low Coupling: Each object manages its own domain",
        code: `class Wallet {
  private cards: CreditCard[] = [];

  chargePrimaryCard(amount: number): boolean {
    const primary = this.cards[0];
    if (!primary || primary.isExpired()) return false;
    return primary.deduct(amount);
  }
}

class Customer {
  private wallet: Wallet;
  constructor(wallet: Wallet) { this.wallet = wallet; }

  // Clean forwarding method obeying Law of Demeter
  pay(amount: number): boolean {
    return this.wallet.chargePrimaryCard(amount);
  }
}

class CheckoutService {
  processOrder(customer: Customer, total: number): void {
    // Talks ONLY to its direct friend: Customer!
    const success = customer.pay(total);
    if (!success) throw new Error("Payment transaction failed");
  }
}`,
        explanation: "CheckoutService only knows about Customer. The internal structure of Wallet and CreditCard can be refactored, upgraded, or changed completely without touching CheckoutService.",
      },
      whyItMatters: "High Cohesion keeps individual classes easy to read, test, and debug. Low Coupling ensures that making a change in one corner of your codebase doesn't cause unexpected explosions in another.",
    },
    part5: {
      title: "Interactive Code Sandbox: E-Commerce Fulfillment System",
      intro: "Experiment with an e-commerce order dispatcher demonstrating High Cohesion and the Law of Demeter:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-08: COUPLING & COHESION & THE LAW OF DEMETER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. High Cohesion: PostalAddress manages address validation
class PostalAddress {
  street: string;
  city: string;
  postalCode: string;

  constructor(street: string, city: string, postalCode: string) {
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
  }

  getFormattedLabel(): string {
    return \`\${this.street}, \${this.city} (\${this.postalCode})\`;
  }
}

// 2. High Cohesion: CustomerProfile coordinates customer data
class CustomerProfile {
  name: string;
  private address: PostalAddress;

  constructor(name: string, address: PostalAddress) {
    this.name = name;
    this.address = address;
  }

  // ✅ Law of Demeter: Provides shipping destination without exposing address guts
  getShippingDestination(): string {
    return \`\${this.name} @ \${this.address.getFormattedLabel()}\`;
  }
}

// 3. High Cohesion: PackageItem handles item pricing and weight
class PackageItem {
  title: string;
  weightKg: number;

  constructor(title: string, weightKg: number) {
    this.title = title;
    this.weightKg = weightKg;
  }
}

// 4. Low Coupling: Dispatcher talks ONLY to Customer and PackageItem
class DeliveryDispatcher {
  dispatch(customer: CustomerProfile, items: PackageItem[]): void {
    // Clean call: does NOT reach into customer.address.street
    const destination = customer.getShippingDestination();
    const totalWeight = items.reduce((sum, item) => sum + item.weightKg, 0);

    console.log(\`📦 Dispatching \${items.length} items (Total: \${totalWeight}kg)\`);
    console.log(\`🚚 Route: Deliver to \${destination}\`);
    console.log(\`✅ Dispatch completed without violating Demeter's Law!\`);
  }
}

// 5. Test execution
const address = new PostalAddress("456 Innovation Way", "Austin", "78701");
const customer = new CustomerProfile("Dr. Sarah Connor", address);

const cargo = [
  new PackageItem("Quantum Sensor", 1.2),
  new PackageItem("Fiber Optic Cable", 0.5),
];

const dispatcher = new DeliveryDispatcher();
dispatcher.dispatch(customer, cargo);
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. High Cohesion", desc: "A class should do one focused job and do it completely. Don't mix database queries with UI templates and business math." },
        { title: "2. Low Coupling", desc: "Keep dependencies between classes minimal and loose. Changes in one class should never ripple into unrelated classes." },
        { title: "3. Law of Demeter", desc: "'Don't talk to strangers' — call methods only on immediate neighbors, avoiding brittle multi-dot train wrecks." },
        { title: "4. Tell, Don't Ask", desc: "Command an object to perform an action rather than extracting its internal fields to do the work yourself." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Which of the following code snippets is a direct violation of the Law of Demeter (a 'Train Wreck')?",
        options: [
          "order.getCustomer().getAccount().getWallet().getPrimaryCard().deduct(50);",
          "customer.pay(50);",
          "const total = calculator.add(10, 20);",
          "logger.log('Payment processed successfully');",
        ],
        correctIndex: 0,
        explanation: "Drilling through 5 nested object layers (order -> customer -> account -> wallet -> card) tightly couples the caller to 5 separate classes. If any layer changes, the caller breaks.",
      },
      nextLessonPreview: {
        title: "OOP-09: Single Responsibility Principle (SRP)",
        desc: "Learn why every class in your architecture should have one, and only one, reason to change.",
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
      { id: "part2", label: "The Restaurant Crew Analogy", icon: "👨‍🍳" },
      { id: "part3", label: "Separating Business, DB & UI", icon: "📐" },
      { id: "part4", label: "God Class vs SRP Architecture", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The S in SOLID: Why Classes Must Have Only One Reason to Change",
      bigPicture: "The SOLID principles are the five foundational pillars of clean object-oriented architecture, formulated by Robert C. Martin ('Uncle Bob'). The very first and most famous is the Single Responsibility Principle (SRP). It states: 'A class should have one, and only one, reason to change.' When developers begin building an app, it is tempting to put everything related to a User into a single User class: profile fields, password hashing, SQL database queries, and HTML email templates. This creates a 'God Class' that constantly breaks whenever any unrelated requirement changes.",
      analogy: "Imagine a popular restaurant. The Chef cooks gourmet food, the Waiter takes orders and serves customers, and the Accountant handles tax filings and payroll. Imagine if the Chef had to cook meals, run to tables to take orders, fix the restaurant's plumbing, and file the annual tax return! The food would burn, customers would wait forever, and taxes would be filed with errors. In software, assigning multiple roles to a single class produces the exact same chaos.",
      breakdownTitle: "The Three Classic Roles That Must Be Separated:",
      breakdownItems: [
        { title: "1. Business Logic (Domain Entity)", desc: "Calculates prices, validates business rules, and enforces invariants (e.g. Order, Invoice, User)." },
        { title: "2. Persistence (Repository / Database)", desc: "Saves and loads entities from PostgreSQL, MongoDB, or external REST APIs (e.g. OrderRepository)." },
        { title: "3. Presentation / Notification", desc: "Formats receipts, renders HTML/PDF invoices, or sends emails to customers (e.g. InvoicePrinter, EmailService)." },
      ],
    },
    part2: {
      title: "Core Mechanics: What is a 'Reason to Change'?",
      intro: "Uncle Bob defines a 'reason to change' in terms of business stakeholders and actors:",
      cards: [
        { number: "01", tag: "Actor: Finance", title: "Business Rules (Domain)", description: "If the Finance team changes tax calculations or discount policies, only the domain entity changes.", color: "purple" },
        { number: "02", tag: "Actor: Database Admin", title: "Persistence (Repository)", description: "If the DBA migrates table columns from SQLite to PostgreSQL, only the repository class changes.", color: "cyan" },
        { number: "03", tag: "Actor: Marketing/UI", title: "Presentation (Formatter)", description: "If Marketing redesigns the receipt layout or email template, only the formatter class changes.", color: "emerald" },
      ],
      rule: {
        title: "💡 The Stakeholder Acid Test",
        content: "If the Finance department requests a change and the Database Administrator requests a change, will they both need to edit the SAME file? If YES, SRP is violated!",
      },
    },
    part3: {
      title: "Mental Model: Small Focused Collaborators",
      intro: "How SRP transforms a fragile codebase into a clean, testable system:",
      points: [
        {
          title: "1. Painless Unit Testing",
          content: "Testing business calculations on an SRP Invoice class requires zero database connections or mock email servers. Tests run in 2 milliseconds.",
        },
        {
          title: "2. Zero Git Merge Conflicts",
          content: "UI developers can update email styling in UserEmailService while backend developers optimize SQL queries in UserRepository without colliding.",
        },
        {
          title: "3. High Reusability",
          content: "You can reuse the Invoice calculation class in a web server, a mobile app, or a CLI tool because it isn't welded to a specific database or printer.",
        },
      ],
    },
    part4: {
      title: "Bloated God Class vs Clean SRP Architecture",
      problem: "When a single class does calculations, database queries, and email delivery, any change risks breaking unrelated features.",
      bad: {
        title: "❌ Fragile God Class: 3 unrelated jobs in 1 file",
        code: `class UserAccount {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  // Job 1: Business rule
  changeEmail(newEmail: string): void {
    if (!newEmail.includes("@")) throw new Error("Invalid email");
    this.email = newEmail;
  }

  // Job 2: Database persistence (touches SQL)
  saveToDatabase(): void {
    console.log(\`SQL: INSERT INTO users VALUES ('\${this.name}', '\${this.email}')\`);
  }

  // Job 3: Notification presentation (touches HTML)
  sendWelcomeEmail(): void {
    const html = \`<h1>Welcome, \${this.name}!</h1><p>Thanks for joining.</p>\`;
    console.log(\`SMTP: Sending HTML email to \${this.email}: \${html}\`);
  }
}`,
        explanation: "This class has 3 different reasons to change: business rule updates, SQL database changes, and email template redesigns. Changes by the marketing team can accidentally break database operations.",
      },
      good: {
        title: "✅ Clean SRP: 3 focused classes with 1 job each",
        code: `// Role 1: Business Entity (Reason to change: Business validation rules)
class UserAccount {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  changeEmail(newEmail: string): void {
    if (!newEmail.includes("@")) throw new Error("Invalid email");
    this.email = newEmail;
  }
}

// Role 2: Persistence Repository (Reason to change: Database schema updates)
class UserRepository {
  save(user: UserAccount): void {
    console.log(\`SQL: INSERT INTO users VALUES ('\${user.name}', '\${user.email}')\`);
  }
}

// Role 3: Notification Service (Reason to change: Email template redesigns)
class UserNotificationService {
  sendWelcome(user: UserAccount): void {
    const html = \`<h1>Welcome, \${user.name}!</h1>\`;
    console.log(\`SMTP: Sending email to \${user.email}\`);
  }
}`,
        explanation: "Each class has exactly one responsibility and one stakeholder. If database schema changes, edit UserRepository. If email design changes, edit UserNotificationService. Zero risk to business logic.",
      },
      whyItMatters: "Software projects die when files become so large and interconnected that developers are terrified to touch them. SRP keeps classes small, isolated, and easy to understand.",
    },
    part5: {
      title: "Interactive Code Sandbox: E-Commerce Invoice System",
      intro: "Experiment with an invoice processing pipeline strictly adhering to the Single Responsibility Principle:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-09: SINGLE RESPONSIBILITY PRINCIPLE (SRP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Item Value Object
class LineItem {
  title: string;
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

// Role 1: Domain Entity (Calculates totals, applies tax)
// Reason to change: Financial and tax calculation rules
class Invoice {
  id: string;
  items: LineItem[];

  constructor(id: string, items: LineItem[]) {
    this.id = id;
    this.items = items;
  }

  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  calculateTotalWithTax(taxRate: number): number {
    const subtotal = this.getSubtotal();
    return subtotal + subtotal * taxRate;
  }
}

// Role 2: Persistence Repository (Saves to database)
// Reason to change: Database schema, ORM, or SQL dialect changes
class InvoiceRepository {
  save(invoice: Invoice): void {
    console.log(\`💾 [DATABASE]: Invoice #\${invoice.id} persisted to PostgreSQL table 'invoices'.\`);
  }
}

// Role 3: Presentation Formatter (Generates printable receipt)
// Reason to change: UI/UX, paper formatting, or branding changes
class InvoicePrinter {
  printReceipt(invoice: Invoice, total: number): void {
    console.log(\`🧾 =======================================\`);
    console.log(\`   INVOICE RECEIPT: #\${invoice.id}\`);
    console.log(\`   ---------------------------------------\`);
    for (const item of invoice.items) {
      console.log(\`   - \${item.title.padEnd(22)} $\${item.price.toFixed(2)}\`);
    }
    console.log(\`   ---------------------------------------\`);
    console.log(\`   TOTAL (inc. tax):      $\${total.toFixed(2)}\`);
    console.log(\`=======================================\`);
  }
}

// 4. Clean execution demonstrating SRP pipeline
const orderItems = [
  new LineItem("TypeScript Pro Course", 99.00),
  new LineItem("OOP Mastery E-Book", 29.50),
];

const invoice = new Invoice("INV-2026-088", orderItems);
const total = invoice.calculateTotalWithTax(0.08); // 8% sales tax

const repo = new InvoiceRepository();
repo.save(invoice);

const printer = new InvoicePrinter();
printer.printReceipt(invoice, total);
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. One Class, One Job", desc: "A class should encapsulate a single responsibility. Avoid giant multi-job 'God Classes'." },
        { title: "2. One Reason to Change", desc: "A reason to change maps to a business stakeholder (e.g. Finance, Database Administrator, or UI Designer)." },
        { title: "3. Separate Domain, DB & UI", desc: "Never weld SQL database queries or HTML email templates directly inside your domain entities." },
        { title: "4. Easier Testing & Maintenance", desc: "Classes with a single responsibility can be unit-tested in isolation without mocking entire databases or network stacks." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "According to Robert C. Martin (Uncle Bob), what does a 'reason to change' mean in the Single Responsibility Principle?",
        options: [
          "A reason to change corresponds to a specific business actor or stakeholder requesting changes (e.g. Finance, DBA, or UI Designer)",
          "A class can only be edited once per git commit",
          "Every function must have exactly one line of code",
          "A file cannot exceed 100 characters in length",
        ],
        correctIndex: 0,
        explanation: "SRP defines responsibility in terms of people: actors or stakeholders. If changes requested by Finance and changes requested by DBAs both require editing the same class, that class has more than one responsibility.",
      },
      nextLessonPreview: {
        title: "OOP-10: Open/Closed Principle (OCP)",
        desc: "Learn how to make classes open for extension with new features, but closed for modification of existing, tested code.",
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
      { id: "part4", label: "Switch Statements vs OCP", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The O in SOLID: Open for Extension, Closed for Modification",
      bigPicture: "In professional software development, code that has run smoothly in production for months is valuable and delicate. Every time a developer opens an existing, battle-tested file to add a new if/else condition or modify an algorithm, they risk creating regressions that break existing users. The Open/Closed Principle (OCP), formulated by Bertrand Meyer and popularized by Robert C. Martin ('Uncle Bob'), provides the solution: software entities should be open for extension (easy to add new behavior) but closed for modification (without altering existing code).",
      analogy: "Think of your smartphone. When you want to play a new game or use a messaging app, you don't take a screwdriver and soldering iron to rewire your phone's processor. You simply install an app from the App Store! The operating system is closed for modification (core kernel files are protected), but open for extension through standardized APIs.",
      breakdownTitle: "The Three Traps of Modifying Existing Code:",
      breakdownItems: [
        { title: "1. Accidental Regressions", desc: "Tweaking a 500-line checkout calculator to support a temporary holiday sale might accidentally break normal customer pricing." },
        { title: "2. Merge Conflicts & Lock Contention", desc: "Multiple engineers editing the same centralized file simultaneously leads to painful git merge conflicts." },
        { title: "3. Re-Testing Overhead", desc: "If you modify core code, QA must re-test the entire system rather than just verifying the new feature." },
      ],
    },
    part2: {
      title: "Core Mechanics: Building Extensible Plugin Systems",
      intro: "Combine interface contracts with polymorphic strategy classes to create extension points:",
      cards: [
        { number: "01", tag: "Closed Core", title: "Core Engine (Unchanged)", description: "The core engine depends on an interface contract. Once tested and deployed, you never edit it again.", color: "purple" },
        { number: "02", tag: "Open Plugins", title: "Strategy Plugins", description: "Each new feature (payment gateway, discount rule, shipping carrier) is authored as a standalone class.", color: "emerald" },
        { number: "03", tag: "Dynamic Registry", title: "Pluggable Registry", description: "The engine registers and resolves plugin strategies dynamically without hardcoded switch statements.", color: "cyan" },
      ],
      rule: {
        title: "💡 The OCP Golden Heuristic",
        content: "When product managers ask for a new feature, you should be able to fulfill it by adding a brand-new file, not by editing existing files!",
      },
    },
    part3: {
      title: "Mental Model: Polymorphic Strategy Extension",
      intro: "How OCP transforms fragile conditional logic into a clean, extensible architecture:",
      points: [
        {
          title: "1. Expose an Extension Interface",
          content: "Define a clean interface that all strategy plugins must satisfy (e.g. DiscountStrategy, PaymentMethod, NotificationChannel).",
          codeSnippet: `interface DiscountStrategy {\n  apply(price: number): number;\n}`,
        },
        {
          title: "2. Implement Concrete Plugins",
          content: "Each new promotion or tier is written in its own dedicated class implementing the interface.",
          codeSnippet: `class BlackFridayDiscount implements DiscountStrategy {\n  apply(price: number): number { return price * 0.5; }\n}`,
        },
        {
          title: "3. Inject into the Core Engine",
          content: "The CheckoutEngine accepts the strategy polymorphically: engine.setDiscount(new BlackFridayDiscount()). The engine code remains 100% untouched.",
        },
      ],
    },
    part4: {
      title: "Fragile Switch Statement vs Clean OCP Strategy",
      problem: "When new features require modifying an existing switch statement in a shared file, bugs and merge conflicts multiply exponentially.",
      bad: {
        title: "❌ Violates OCP: Modifying a monolithic switch statement",
        code: `class ShippingCalculator {
  calculateShipping(carrier: string, weightKg: number): number {
    // 💥 Every new carrier requires editing this existing, tested file!
    switch (carrier) {
      case "FEDEX":
        return weightKg * 5.0;
      case "UPS":
        return weightKg * 4.5;
      case "DHL":
        return weightKg * 6.0;
      // Next month: case "DRONE": ... (risks breaking FEDEX!)
      default:
        throw new Error("Unsupported shipping carrier");
    }
  }
}`,
        explanation: "Every new shipping provider forces you to edit this file, risking breaking existing calculations and creating merge conflicts across teams.",
      },
      good: {
        title: "✅ Follows OCP: Independent shipping strategy classes",
        code: `interface ShippingStrategy {
  carrierName: string;
  calculateCost(weightKg: number): number;
}

class FedExShipping implements ShippingStrategy {
  carrierName = "FedEx";
  calculateCost(weightKg: number): number { return weightKg * 5.0; }
}

class UpsShipping implements ShippingStrategy {
  carrierName = "UPS";
  calculateCost(weightKg: number): number { return weightKg * 4.5; }
}

// Adding Drone Delivery is 100% safe in a brand-new file!
class DroneShipping implements ShippingStrategy {
  carrierName = "Autonomous Drone";
  calculateCost(weightKg: number): number { return weightKg * 8.0 + 15.0; }
}

class ShippingEngine {
  calculate(strategy: ShippingStrategy, weightKg: number): number {
    return strategy.calculateCost(weightKg);
  }
}`,
        explanation: "ShippingEngine is closed for modification. When marketing adds Drone shipping, you write a new class without touching ShippingEngine, FedEx, or UPS.",
      },
      whyItMatters: "In enterprise software, the safest code is code you don't edit. OCP lets teams add new features with zero risk of regressions in established systems.",
    },
    part5: {
      title: "Interactive Code Sandbox: Extensible Tax Calculation Engine",
      intro: "Experiment with an extensible tax calculation engine that registers new jurisdiction rules without modifying core engine logic:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-10: OPEN/CLOSED PRINCIPLE (OCP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Extension Point: Interface for Tax Jurisdictions
interface TaxRule {
  regionCode: string;
  calculateTax(subtotal: number): number;
}

// 2. Concrete Tax Strategies (Independent plugins)
class UsTaxRule implements TaxRule {
  regionCode: string = "US";
  calculateTax(subtotal: number): number {
    return subtotal * 0.08; // 8% sales tax
  }
}

class EuVatTaxRule implements TaxRule {
  regionCode: string = "EU";
  calculateTax(subtotal: number): number {
    return subtotal * 0.20; // 20% VAT
  }
}

class JapanTaxRule implements TaxRule {
  regionCode: string = "JP";
  calculateTax(subtotal: number): number {
    return subtotal * 0.10; // 10% consumption tax
  }
}

// 3. Core Engine: CLOSED for modification, OPEN for extension via registerRule
class TaxEngine {
  private rules: Map<string, TaxRule> = new Map();

  registerRule(rule: TaxRule): void {
    this.rules.set(rule.regionCode.toUpperCase(), rule);
    console.log(\`🔌 [PLUGIN LOADED]: Registered tax jurisdiction for "\${rule.regionCode}"\`);
  }

  computeTax(regionCode: string, subtotal: number): number {
    const rule = this.rules.get(regionCode.toUpperCase());
    if (!rule) {
      throw new Error(\`No tax rule registered for region: \${regionCode}\`);
    }
    return rule.calculateTax(subtotal);
  }
}

// 4. Test execution
const engine = new TaxEngine();
engine.registerRule(new UsTaxRule());
engine.registerRule(new EuVatTaxRule());
engine.registerRule(new JapanTaxRule());

console.log("\\n--- Calculating Taxes Across Regions ---");
const orderAmount = 250.00;
console.log(\`US Tax on $\${orderAmount}:  $\${engine.computeTax("US", orderAmount).toFixed(2)}\`);
console.log(\`EU VAT on $\${orderAmount}:  $\${engine.computeTax("EU", orderAmount).toFixed(2)}\`);
console.log(\`JP Tax on $\${orderAmount}:  $\${engine.computeTax("JP", orderAmount).toFixed(2)}\`);

// 5. Adding a brand-new region (Zero edits to TaxEngine!)
class UkTaxRule implements TaxRule {
  regionCode: string = "UK";
  calculateTax(subtotal: number): number { return subtotal * 0.20; }
}

engine.registerRule(new UkTaxRule());
console.log(\`UK Tax on $\${orderAmount}:  $\${engine.computeTax("UK", orderAmount).toFixed(2)}\`);
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Open to Extension", desc: "Design systems so new capabilities and business rules are added by authoring new classes." },
        { title: "2. Closed to Modification", desc: "Never modify existing, tested, and deployed code to add new features whenever polymorphism can be used." },
        { title: "3. Replace Switch Statements", desc: "Replace fragile if/else and switch blocks with polymorphic strategy interfaces." },
        { title: "4. Zero Regressions", desc: "Adding new classes eliminates the risk of accidentally breaking existing features." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "What does the Open/Closed Principle state regarding software entities?",
        options: [
          "Software entities should be open for extension, but closed for modification",
          "All files must be locked with read-only file permissions on the operating system",
          "Every function must have public visibility and every variable must be private",
          "Source code must be open-source while user registration is closed",
        ],
        correctIndex: 0,
        explanation: "OCP states that systems should be designed so that new features can be added by creating new classes/plugins without editing existing, tested source code.",
      },
      nextLessonPreview: {
        title: "OOP-11: Liskov Substitution Principle (LSP)",
        desc: "Ensure child classes can substitute for parent classes without crashing or breaking rules.",
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
      { id: "part3", label: "The Square-Rectangle Conundrum", icon: "📐" },
      { id: "part4", label: "Broken Subclass vs True Subclass", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The L in SOLID: Derived Classes Must Honor Parent Contracts",
      bigPicture: "In mathematics, a Square is a Rectangle (it has 4 right angles and 4 sides). Because of this real-world knowledge, new object-oriented programmers often write 'class Square extends Rectangle'. But in software, this innocent hierarchy causes subtle, catastrophic bugs! If a function sets the width to 5 and height to 10 on a Rectangle, it expects the area to be 50. If you pass in a Square that secretly forces width and height to remain equal, the area becomes 100! Barbara Liskov introduced the Liskov Substitution Principle (LSP) to prevent this: derived classes must be completely substitutable for their base types without surprising the caller.",
      analogy: "Imagine a universal TV remote control designed with a 'Volume Up' button. Any standard television that accepts this remote will increase the sound when you press Volume Up. But imagine buying a new TV that, when you press 'Volume Up', ejects your DVD player or shuts off the power! Even though it looks like a television, it violates the contract of the remote control. A child class must never betray the user's expectations of the parent.",
      breakdownTitle: "The Three Most Common LSP Violations:",
      breakdownItems: [
        { title: "1. Throwing 'Not Supported' Errors", desc: "A child class overrides a parent method only to throw an exception (e.g. Penguin extends Bird where fly() throws new Error('Cannot fly'))." },
        { title: "2. Changing State Invariants", desc: "Silently modifying other properties to maintain unexpected subclass constraints (the Square-Rectangle problem)." },
        { title: "3. Stricter Preconditions", desc: "A subclass refusing inputs that the parent class handled without issue." },
      ],
    },
    part2: {
      title: "Core Mechanics: Behavioral Subtyping",
      intro: "Understand the strict expectations placed on any derived child class:",
      cards: [
        { number: "01", tag: "Honor Contracts", title: "No Unexpected Exceptions", description: "Never override a method just to throw 'Feature Not Supported'. If a child cannot perform the action, it shouldn't inherit it.", color: "rose" },
        { number: "02", tag: "Predictable Semantics", title: "Preserve Invariants", description: "If the parent guarantees that width and height are independent, the child must not couple them together.", color: "purple" },
        { number: "03", tag: "Safe Polymorphism", title: "Safe in Collections", description: "Callers iterating over Parent[] must never need to write 'if (item instanceof Child)' guard statements.", color: "emerald" },
      ],
      rule: {
        title: "💡 The Substitution Acid Test",
        content: "Anywhere in your codebase that expects a ParentClass, you must be able to pass a ChildClass without crashing and without altering expected behavior!",
      },
    },
    part3: {
      title: "Mental Model: Preconditions and Postconditions",
      intro: "The mathematical rules governing valid subtyping in software architecture:",
      points: [
        {
          title: "1. Preconditions Cannot Be Strengthened",
          content: "If a parent method accepts any integer from 0 to 100, a child method cannot suddenly crash if the integer is greater than 50.",
        },
        {
          title: "2. Postconditions Cannot Be Weakened",
          content: "If a parent method promises to return a valid User object, a child method cannot return null.",
        },
        {
          title: "3. Segregate by Capability Instead",
          content: "Instead of forcing Penguin to inherit fly() from Bird, create a general Bird class (with eat()) and an IFlying interface for birds that actually fly.",
          codeSnippet: `interface IFlying {\n  fly(): void;\n}\nclass Sparrow extends Bird implements IFlying { ... }`,
        },
      ],
    },
    part4: {
      title: "Broken Subclass vs Capability Segregation",
      problem: "Inheriting methods that a child class cannot fulfill forces the child to throw runtime errors, crashing caller loops.",
      bad: {
        title: "❌ Violates LSP: Subclass throws error on promised method",
        code: `class Bird {
  fly(): void { console.log("Flying through the sky!"); }
  eat(): void { console.log("Eating seeds."); }
}

class Penguin extends Bird {
  override fly(): void {
    // 💥 Breaks caller expectations and crashes loops!
    throw new Error("Penguins cannot fly!");
  }
}

function exerciseAllBirds(birds: Bird[]): void {
  // CRASHES when it encounters a Penguin!
  birds.forEach(bird => bird.fly());
}`,
        explanation: "Penguin violates the contract established by Bird. Any caller working with Bird[] will suffer a fatal crash when a Penguin is encountered.",
      },
      good: {
        title: "✅ Follows LSP: Clean capability-based segregation",
        code: `abstract class Bird {
  abstract eat(): void;
}

interface Flyable {
  fly(): void;
}

class Sparrow extends Bird implements Flyable {
  eat(): void { console.log("Sparrow eating seeds."); }
  fly(): void { console.log("Sparrow soaring through clouds."); }
}

class Penguin extends Bird {
  eat(): void { console.log("Penguin eating fish."); }
  swim(): void { console.log("Penguin gliding through water."); }
}

// Safe loop: every Bird can eat() without surprises
function feedAllBirds(birds: Bird[]): void {
  birds.forEach(b => b.eat());
}

// Dedicated loop: only operates on verified flyers
function flyAllBirds(flyers: Flyable[]): void {
  flyers.forEach(f => f.fly());
}`,
        explanation: "Penguin never promises what it cannot deliver. Callers operating on Bird[] can invoke eat() safely on every bird without runtime errors.",
      },
      whyItMatters: "LSP guarantees that polymorphism works reliably. If subclasses break parent promises, developers are forced to write messy 'instanceof' checks everywhere, ruining clean architecture.",
    },
    part5: {
      title: "Interactive Code Sandbox: Bank Account Substitution Hierarchy",
      intro: "Experiment with a banking hierarchy where read-only and withdrawable accounts honor their exact contracts:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-11: LISKOV SUBSTITUTION PRINCIPLE (LSP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Base Class: Represents accounts with a balance and deposits
abstract class BankAccount {
  protected balance: number;

  constructor(initialDeposit: number) {
    if (initialDeposit < 0) throw new Error("Initial deposit cannot be negative");
    this.balance = initialDeposit;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this.balance += amount;
    console.log(\`💵 Deposited $\${amount.toFixed(2)}. New balance: $\${this.balance.toFixed(2)}\`);
  }

  getBalance(): number {
    return this.balance;
  }
}

// 2. Capability Interface: For accounts that permit immediate withdrawals
interface Withdrawable {
  withdraw(amount: number): boolean;
}

// 3. Checking Account: Fully supports deposit and withdrawal
class CheckingAccount extends BankAccount implements Withdrawable {
  withdraw(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(\`🏧 Withdrew $\${amount.toFixed(2)}. Remaining balance: $\${this.balance.toFixed(2)}\`);
      return true;
    }
    console.log(\`❌ Withdrawal of $\${amount.toFixed(2)} declined (Insufficient funds).\`);
    return false;
  }
}

// 4. Fixed Deposit Account: Funds locked for 12 months; NO withdrawal capability
// Notice: It does NOT implement Withdrawable, so it NEVER throws 'Not Supported' at runtime!
class FixedTermDepositAccount extends BankAccount {
  private interestRate: number;

  constructor(initialDeposit: number, interestRate: number) {
    super(initialDeposit);
    this.interestRate = interestRate;
  }

  applyAnnualInterest(): void {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(\`📈 Applied \${(this.interestRate * 100)}% interest (+$ \${interest.toFixed(2)}). Total: $\${this.balance.toFixed(2)}\`);
  }
}

// 5. Test polymorphic substitution safely
const accounts: BankAccount[] = [
  new CheckingAccount(500),
  new FixedTermDepositAccount(10000, 0.05),
];

console.log("--- Safe Polymorphic Deposit on All BankAccount Instances ---");
for (const acc of accounts) {
  acc.deposit(100); // 100% safe for all BankAccount subtypes!
}

console.log("\\n--- Withdrawable Processing (Only on Withdrawable Accounts) ---");
const checking = new CheckingAccount(200);
checking.withdraw(50);
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. No Surprises", desc: "Subclasses must fulfill all promises made by their parent classes without throwing unexpected exceptions." },
        { title: "2. Don't Throw 'Not Supported'", desc: "If a subclass cannot perform an inherited method, that method belongs in a separate interface, not the parent class." },
        { title: "3. Preserve Invariants", desc: "Never let a subclass silently mutate properties in ways that violate parent assumptions (the Square-Rectangle problem)." },
        { title: "4. Eliminate 'instanceof' Checks", desc: "If you find yourself writing 'if (x instanceof Y)' before calling a parent method, your code violates LSP." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Which of the following scenarios is a direct violation of the Liskov Substitution Principle?",
        options: [
          "A child class overrides a parent method to throw a 'Feature Not Supported' error",
          "A child class executes its calculations faster than the parent class",
          "A child class has its own constructor with additional parameters",
          "A child class implements an additional interface beyond what the parent implements",
        ],
        correctIndex: 0,
        explanation: "Throwing 'Not Supported' on a method promised by the parent breaks caller expectations and crashes existing code that relies on the parent's contract.",
      },
      nextLessonPreview: {
        title: "OOP-12: Interface Segregation Principle (ISP)",
        desc: "Keep interfaces small and client-focused so classes aren't forced to implement methods they don't need.",
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
      { id: "part3", label: "Role Interface Composition", icon: "🧩" },
      { id: "part4", label: "Bloated Interface vs ISP Clean", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The I in SOLID: Clients Should Only Depend on What They Use",
      bigPicture: "When designing interfaces, it is tempting to create one giant contract that includes every conceivable action in the system. For an office machine, a developer might create an interface with print(), scan(), fax(), staple(), and email(). But what happens when you build a cheap $40 desktop printer that only has ink heads and no scanner or fax modem? The class is forced to implement scan() and fax() with dummy empty methods or throw exceptions. The Interface Segregation Principle (ISP) says: 'No client should be forced to depend on methods it does not use.'",
      analogy: "Imagine walking into a café to buy a simple black coffee. But before the barista serves you, they hand you a 40-page contract requiring you to agree to wash the coffee machine, bake fresh croissants, manage their warehouse inventory, and deliver packages across town! You only wanted coffee; you shouldn't be forced into an enormous contract containing tasks you have nothing to do with.",
      breakdownTitle: "The Three Problems with 'Fat' Monolithic Interfaces:",
      breakdownItems: [
        { title: "1. Dummy Boilerplate Code", desc: "Implementing classes are littered with empty methods (return null;) or errors (throw new Error('Not implemented'))." },
        { title: "2. Unnecessary Recompilation", desc: "Modifying the signature of fax() forces modules that only care about printing to be recompiled and re-tested." },
        { title: "3. Polluted Autocomplete", desc: "Your IDE code completion suggests dozens of irrelevant methods that the object doesn't actually support." },
      ],
    },
    part2: {
      title: "Core Mechanics: Fat vs Role-Focused Interfaces",
      intro: "Break oversized monolithic contracts into lean, client-tailored role interfaces:",
      cards: [
        { number: "01", tag: "Bloated (Bad)", title: "Fat Monolithic Interface", description: "Bundles print, scan, fax, staple, and email into one 20-method monster contract.", color: "rose" },
        { number: "02", tag: "Lean (Good)", title: "Role-Based Interfaces", description: "Small, specific contracts: Printer, Scanner, FaxMachine. Classes implement only what they need.", color: "emerald" },
        { number: "03", tag: "Lego Composition", title: "Multiple Implementation", description: "High-end devices implement multiple role interfaces simultaneously (class OfficeHub implements Printer, Scanner).", color: "cyan" },
      ],
      rule: {
        title: "💡 Client-Driven Design",
        content: "Interfaces belong to the client that calls them, not to the service that implements them. Only put methods in an interface that the caller genuinely needs!",
      },
    },
    part3: {
      title: "Mental Model: Role Interface Composition",
      intro: "In TypeScript, classes can implement multiple small interfaces together seamlessly:",
      points: [
        {
          title: "1. Keep Interfaces to 1–3 Methods",
          content: "Small, focused interfaces are easier to understand, mock in unit tests, and implement cleanly across diverse classes.",
        },
        {
          title: "2. Compose via 'implements A, B, C'",
          content: "A SimplePrinter implements only Printer. A DeluxeCopier implements Printer, Scanner, and Stapler. Both coexist peacefully.",
        },
        {
          title: "3. Callers Demand Minimal Roles",
          content: "A report generator function should accept a Printer parameter, never demanding an all-in-one OfficeCopier machine.",
          codeSnippet: `function printReport(p: Printer, text: string): void {\n  p.print(text);\n}`,
        },
      ],
    },
    part4: {
      title: "Bloated Interface vs Clean Role Segregation",
      problem: "Forcing diverse hardware or workers into a single giant contract produces dummy boilerplate and misleading APIs.",
      bad: {
        title: "❌ Violates ISP: Fat interface forcing dummy methods",
        code: `interface MultiFunctionDevice {
  print(doc: string): void;
  scan(): string;
  fax(doc: string, phone: string): void;
}

// 💥 Simple inkjet printer has no scanner or fax hardware!
class DesktopInkjet implements MultiFunctionDevice {
  print(doc: string): void { console.log("Printing:", doc); }
  scan(): string { throw new Error("No scanner built in!"); }
  fax(doc: string, phone: string): void { throw new Error("No fax modem!"); }
}`,
        explanation: "DesktopInkjet is forced to write throwaway dummy methods for features it physically cannot support, misleading callers into believing it can scan.",
      },
      good: {
        title: "✅ Follows ISP: Segregated, role-specific interfaces",
        code: `interface Printer {
  print(doc: string): void;
}

interface Scanner {
  scan(): string;
}

// Implements ONLY the hardware it actually supports!
class DesktopInkjet implements Printer {
  print(doc: string): void { console.log("Printing:", doc); }
}

// Enterprise all-in-one hub implements both!
class OfficeHub implements Printer, Scanner {
  print(doc: string): void { console.log("Printing high-speed:", doc); }
  scan(): string { return "Scanned document data"; }
}

// Caller depends only on the role it needs:
function printReceipt(printer: Printer, receiptText: string): void {
  printer.print(receiptText);
}`,
        explanation: "DesktopInkjet and OfficeHub implement only what they genuinely support. Callers depend on minimal role interfaces, ensuring complete flexibility.",
      },
      whyItMatters: "ISP prevents bloated interfaces from infecting your codebase with dummy methods, simplifies unit testing mocks, and decouples unrelated features.",
    },
    part5: {
      title: "Interactive Code Sandbox: Media Streaming & Storage System",
      intro: "Experiment with segregated media streaming interfaces (Playable, Seekable, Downloadable):",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-12: INTERFACE SEGREGATION PRINCIPLE (ISP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Role Interface 1: Basic playback controls
interface Playable {
  play(): void;
  pause(): void;
}

// 2. Role Interface 2: Timestamp scrubbing capabilities
interface Seekable {
  seekTo(seconds: number): void;
}

// 3. Role Interface 3: Offline download capabilities
interface Downloadable {
  downloadOffline(quality: "STANDARD" | "HIGH"): void;
}

// --- Concrete Implementations implementing ONLY relevant roles ---

// Case A: Live FM Radio Stream (Can only play/pause; cannot seek or download)
class LiveRadioStream implements Playable {
  name: string;
  constructor(channelName: string) { this.name = channelName; }

  play(): void { console.log(\`📻 Streaming live radio: "\${this.name}"\`); }
  pause(): void { console.log(\`🔇 Muted radio stream: "\${this.name}"\`); }
}

// Case B: Podcast Episode (Can play and download; cannot seek live feeds)
class PodcastEpisode implements Playable, Downloadable {
  title: string;
  constructor(title: string) { this.title = title; }

  play(): void { console.log(\`🎙️ Playing podcast: "\${this.title}"\`); }
  pause(): void { console.log(\`⏸️ Paused podcast: "\${this.title}"\`); }
  downloadOffline(quality: "STANDARD" | "HIGH"): void {
    console.log(\`⬇️ Downloaded "\${this.title}" in \${quality} quality.\`);
  }
}

// Case C: Premium Video On Demand (Supports all 3 roles!)
class MovieStream implements Playable, Seekable, Downloadable {
  movieTitle: string;
  constructor(title: string) { this.movieTitle = title; }

  play(): void { console.log(\`🎬 Playing 4K movie: "\${this.movieTitle}"\`); }
  pause(): void { console.log(\`⏸️ Paused movie: "\${this.movieTitle}"\`); }
  seekTo(seconds: number): void { console.log(\`⏩ Jumped to \${seconds}s in "\${this.movieTitle}"\`); }
  downloadOffline(quality: "STANDARD" | "HIGH"): void {
    console.log(\`💾 Cached "\${this.movieTitle}" to local storage for flight viewing.\`);
  }
}

// --- Client Functions depending ONLY on the minimal role required ---

// Player controller only needs Playable
function startPlayback(player: Playable): void {
  player.play();
}

// Offline sync manager only needs Downloadable
function cacheContent(downloader: Downloadable): void {
  downloader.downloadOffline("HIGH");
}

// Test execution
const liveRadio = new LiveRadioStream("BBC World Service");
const techPodcast = new PodcastEpisode("Architecture Deep Dive #42");
const sciFiMovie = new MovieStream("Interstellar (2014)");

console.log("--- Testing Playback Role ---");
startPlayback(liveRadio);
startPlayback(techPodcast);
startPlayback(sciFiMovie);

console.log("\\n--- Testing Offline Download Role ---");
// startPlayback(liveRadio) doesn't accept liveRadio for download (ISP prevents type errors!)
cacheContent(techPodcast);
cacheContent(sciFiMovie);
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Lean Role Interfaces", desc: "Design small, focused interfaces containing 1 to 3 related methods instead of giant monolithic contracts." },
        { title: "2. Don't Force Irrelevant Methods", desc: "Never force a class to implement dummy methods or throw 'Not Implemented' exceptions." },
        { title: "3. Multiple Implementation", desc: "Compose capabilities in TypeScript by implementing multiple focused interfaces (implements A, B, C)." },
        { title: "4. Client-Tailored Contracts", desc: "Functions and callers should demand only the specific role interface they actually need." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "What is the primary indicator that an interface violates the Interface Segregation Principle?",
        options: [
          "Implementing classes are forced to leave methods empty or throw 'Method Not Implemented' exceptions",
          "The interface uses generic type parameters (<T>)",
          "An interface has fewer than 3 methods",
          "A class implements more than one interface simultaneously",
        ],
        correctIndex: 0,
        explanation: "When implementing classes must write empty dummy bodies or throw exceptions for methods they do not support, the interface is bloated and should be segregated.",
      },
      nextLessonPreview: {
        title: "OOP-13: Dependency Inversion Principle (DIP)",
        desc: "Depend on abstractions rather than concrete implementations to achieve true decoupling.",
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
      { id: "part1", label: "The Wall Socket Analogy & The D in SOLID", icon: "🔌" },
      { id: "part2", label: "Core Mechanics: Inverting Control & Pluggable Sockets", icon: "🔄" },
      { id: "part3", label: "Mental Model: Constructor Injection & Test Doubles", icon: "💉" },
      { id: "part4", label: "Hardwired Coupling vs Injected Abstractions", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "The D in SOLID: Depend on Abstractions, Not Concretions",
      bigPicture: "In traditional procedural code, high-level business rules are tightly hardwired to low-level technical plumbing: an OrderService instantiates new MySQLConnection() and new StripePaymentClient() directly inside its constructor. When your database changes, when Stripe rotates their SDK, or when you need to write fast automated tests, the entire system breaks down. The Dependency Inversion Principle (DIP) flips this hierarchy upside down: High-level business policies should never depend on low-level plumbing; both must depend on abstractions (interfaces).",
      analogy: "Think of an electrical wall socket in your home. Your desk lamp, laptop charger, and coffee grinder all have a standard two-pronged plug that connects into the wall socket. You do NOT solder the copper wires of your lamp directly into the high-voltage transformers of the city power grid! If your lamp burns out, you unplug it and plug in a new one. DIP is the wall socket of software: business services define interface sockets, and tools plug into them.",
      breakdownTitle: "The Three Disasters of Hardwired Dependencies:",
      breakdownItems: [
        { title: "1. Impossible Unit Testing", desc: "If a class calls new RealDatabaseClient() inside its constructor, you cannot test it without running a live database server, making tests slow and brittle." },
        { title: "2. Severe Vendor Lock-In", desc: "Switching from SendGrid to Resend or AWS SES requires finding and rewriting every user registration and checkout class in your repository." },
        { title: "3. Cascading Breaking Changes", desc: "Modifying low-level infrastructure code accidentally breaks high-level business rules because the two layers are inextricably tangled." },
      ],
    },
    part2: {
      title: "Core Mechanics: Inverting Control via Pluggable Sockets",
      intro: "Instead of letting a class create its own tools with 'new', pass the tools into its constructor:",
      cards: [
        { number: "01", tag: "Standard Socket", title: "Interface (The Contract)", description: "The high-level domain defines IPaymentGateway or IDatabaseRepository according to its needs.", color: "purple" },
        { number: "02", tag: "Pluggable Tools", title: "Implementations (The Adapters)", description: "PostgresRepo in production, MockInMemoryRepo in automated unit tests. Both plug into the socket!", color: "cyan" },
        { number: "03", tag: "Dependency Injection", title: "Passing Tools In", description: "Inject tools via constructor parameters (constructor(private db: IDatabase)). The class never uses 'new'.", color: "emerald" },
      ],
      rule: {
        title: "💡 The Golden Rule of DIP",
        content: "Never instantiate concrete external services with 'new ConcreteService()' inside your domain logic. Define an interface socket and inject dependencies through the constructor!",
      },
    },
    part3: {
      title: "Mental Model: Constructor Injection & Test Doubles",
      intro: "Look how easy it is to test and maintain your code when you use Dependency Inversion:",
      points: [
        {
          title: "1. High-Level Domain Owns the Socket",
          content: "The OrderService declares: 'I need an object that can chargeCards(amount)'. It doesn't care whether that object uses Stripe, PayPal, or crypto.",
        },
        {
          title: "2. Lightning-Fast Test Doubles",
          content: "In automated tests, pass an in-memory MockPaymentGateway that completes in 1 millisecond without touching real networks or charging real credit cards.",
          codeSnippet: `const testService = new OrderService(new MockPaymentGateway()); // Instant test!`,
        },
        {
          title: "3. Zero Risk Infrastructure Swaps",
          content: "Switching from MySQL to PostgreSQL or MongoDB requires authoring a single new repository adapter class. Zero lines of business logic change.",
        },
      ],
    },
    part4: {
      title: "Hardwired Coupling vs Injected Abstractions",
      problem: "Hardwiring concrete vendor libraries inside class constructors prevents automated testing and tightly couples business logic to external infrastructure.",
      bad: {
        title: "❌ Violates DIP: Hardwired directly to concrete vendor SDK",
        code: `import { StripeClient } from "stripe-sdk";
import { PostgresDB } from "postgres-driver";

class CheckoutService {
  // 💥 Hardwired direct dependencies!
  private stripe = new StripeClient("sk_live_secret");
  private db = new PostgresDB("postgres://localhost:5432");

  public processOrder(orderId: string, amount: number) {
    this.stripe.charge(amount);
    this.db.query(\`UPDATE orders SET paid = true WHERE id = '\${orderId}'\`);
  }
}`,
        explanation: "CheckoutService cannot be tested offline. It will attempt to charge live cards and update real databases during unit tests. You cannot mock it.",
      },
      good: {
        title: "✅ Follows DIP: Plugs into abstract interfaces via constructor injection",
        code: `interface PaymentGateway {
  charge(amount: number): boolean;
}

interface OrderRepository {
  markAsPaid(orderId: string): void;
}

class CheckoutService {
  // Dependencies injected from the outside!
  constructor(
    private payment: PaymentGateway,
    private orders: OrderRepository
  ) {}

  public processOrder(orderId: string, amount: number): boolean {
    const success = this.payment.charge(amount);
    if (success) {
      this.orders.markAsPaid(orderId);
    }
    return success;
  }
}`,
        explanation: "CheckoutService is 100% decoupled. In production, pass StripeGateway and PostgresOrderRepo. In automated tests, pass fast in-memory fakes.",
      },
      whyItMatters: "DIP makes applications testable in milliseconds, isolates business logic from third-party API breakages, and enables true plug-and-play architecture.",
    },
    part5: {
      title: "Interactive Code Sandbox: Pluggable Payment & Notification System",
      intro: "Experiment with swapping production adapters for fast in-memory test doubles without altering CheckoutService:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-13: DEPENDENCY INVERSION PRINCIPLE (DIP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Standard Interface Sockets (Abstractions)
interface PaymentGateway {
  processPayment(amount: number): { success: boolean; transactionId: string };
}

interface NotificationService {
  sendReceipt(recipient: string, message: string): void;
}

// 2. High-Level Domain Service (Depends ONLY on Sockets!)
class CheckoutService {
  constructor(
    private payment: PaymentGateway,
    private notifier: NotificationService
  ) {}

  checkout(customerEmail: string, totalAmount: number): boolean {
    console.log(\`🛒 Initiating checkout of $\${totalAmount} for \${customerEmail}...\`);
    const result = this.payment.processPayment(totalAmount);

    if (result.success) {
      this.notifier.sendReceipt(
        customerEmail,
        \`Receipt for $\${totalAmount} (Tx: \${result.transactionId})\`
      );
      console.log("✅ Checkout completed successfully!\\n");
      return true;
    }

    console.log("❌ Payment failed. Aborting checkout.\\n");
    return false;
  }
}

// 3. Concrete Tool A: Fast In-Memory Mock for Unit Testing
class MockPaymentGateway implements PaymentGateway {
  public callCount = 0;
  processPayment(amount: number) {
    this.callCount++;
    return { success: true, transactionId: \`MOCK-TX-\${Date.now()}\` };
  }
}

class MockNotifier implements NotificationService {
  public sentMessages: string[] = [];
  sendReceipt(recipient: string, message: string) {
    this.sentMessages.push(\`To: \${recipient} | Msg: \${message}\`);
    console.log(\`  💾 [Mock Notifier]: Captured email offline: "\${message}"\`);
  }
}

// 4. Concrete Tool B: Simulated Production Gateway
class LiveStripeGateway implements PaymentGateway {
  processPayment(amount: number) {
    console.log(\`  💳 [Stripe Live]: Reaching secure bank API for $\${amount}...\`);
    return { success: true, transactionId: "ch_3N1abc999xyz" };
  }
}

class LiveSendGridNotifier implements NotificationService {
  sendReceipt(recipient: string, message: string) {
    console.log(\`  📧 [SendGrid]: Dispatching real TLS email to \${recipient}...\`);
  }
}

// --- Execution: Run Unit Tests Instantly (0 network calls) ---
console.log("=== RUNNING FAST UNIT TEST ===");
const mockPay = new MockPaymentGateway();
const mockNote = new MockNotifier();
const testCheckout = new CheckoutService(mockPay, mockNote);

testCheckout.checkout("test.dev@learncraft.io", 49.99);
console.log("Test Verification: Mock Payment Calls =", mockPay.callCount);
console.log("Test Verification: Messages Captured =", mockNote.sentMessages.length);

// --- Execution: Run Production Wiring Seamlessly ---
console.log("\\n=== RUNNING PRODUCTION ENVIRONMENT ===");
const liveCheckout = new CheckoutService(new LiveStripeGateway(), new LiveSendGridNotifier());
liveCheckout.checkout("customer@example.com", 129.50);
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. All 5 SOLID Rules Complete", desc: "You have mastered SRP, OCP, LSP, ISP, and DIP — the bedrock of clean software design." },
        { title: "2. Depend on Abstractions", desc: "High-level domain logic should plug into interfaces, never into concrete vendor classes." },
        { title: "3. Constructor Injection", desc: "Pass required dependencies into the constructor instead of calling 'new' internally." },
        { title: "4. Test Doubles & Mocks", desc: "DIP enables lightning-fast automated tests using lightweight in-memory fake adapters." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "How does the Dependency Inversion Principle enable fast, reliable automated unit tests?",
        options: [
          "By allowing you to pass fast in-memory mock implementations into class constructors instead of connecting to real databases and network APIs",
          "By disabling all TypeScript type checking during testing runs",
          "By automatically converting asynchronous Promise calls into synchronous loops",
          "By forcing all tests to execute on remote cloud servers",
        ],
        correctIndex: 0,
        explanation: "Because classes depend on interfaces rather than concrete databases or APIs, unit tests can inject lightweight mock adapters that execute in milliseconds with zero network dependencies.",
      },
      nextLessonPreview: {
        title: "OOP-14: Common OOP Anti-Patterns & Code Smells",
        desc: "Learn how to spot God Objects, Anemic Domain Models, Primitive Obsession, and know when plain functions beat classes.",
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
    subtitle: "Spot bad habits: avoid God objects, anemic models, primitive obsession, and know when simple functions beat classes.",
    sections: [
      { id: "part1", label: "What are Code Smells? & The Swiss Army Knife", icon: "🦨" },
      { id: "part2", label: "The Two Extremes: God Objects vs Anemic Models", icon: "👾" },
      { id: "part3", label: "Mental Model: Value Objects & The Information Expert", icon: "💰" },
      { id: "part4", label: "Tangled Feature Envy vs Self-Contained Domain Logic", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "Recognizing Design Smells: Knowing What NOT to Do",
      bigPicture: "Just as fresh milk begins to give off a faint sour smell before it completely spoils, source code exhibits 'smells' — subtle symptoms in design and structure that indicate deeper architectural rot. A developer who only knows rules will build fragile structures; a great software engineer knows how to recognize anti-patterns early and eliminate them before they cripple the codebase.",
      analogy: "Think of an overloaded Swiss Army Knife that has 150 different tools attached: 12 knives, 5 saws, a corkscrew, a flashlight, a magnifying glass, and a car tire wrench. It sounds impressive in theory, but in reality, it is too heavy to hold, impossible to carry in your pocket, and clumsy to cut anything cleanly. In code, this is the God Object. Conversely, an empty cardboard box with zero tools inside is the Anemic Model. Clean design produces balanced, specialized tools.",
      breakdownTitle: "The Top Three Common OOP Anti-Patterns:",
      breakdownItems: [
        { title: "1. The God Object (The Blob)", desc: "A mammoth 4,000-line 'SystemManager' class that handles auth, billing, database access, email, and logging, while all other classes act as passive helpers." },
        { title: "2. The Anemic Domain Model", desc: "Classes stripped of all business logic, containing only dumb public getters and setters while business calculations leak into procedural controller files." },
        { title: "3. Primitive Obsession", desc: "Using raw primitives (number for Money, string for PostalCode) instead of dedicated smart objects that validate their own rules." },
      ],
    },
    part2: {
      title: "Core Mechanics: Striking the Balance Between State & Behavior",
      intro: "Avoid both architectural extremes by keeping entities cohesive and self-governing:",
      cards: [
        { number: "01", tag: "Too Much (Bad)", title: "The God Object", description: "Does 50 unrelated jobs. Break it into small, focused collaborating entities with clear boundaries!", color: "rose" },
        { number: "02", tag: "Too Little (Bad)", title: "The Anemic Model", description: "A hollow bag of getters and setters. Move validation and business calculations inside the entity!", color: "amber" },
        { number: "03", tag: "Just Right (Clean)", title: "Value Objects", description: "Small, immutable objects (Money, Email, Coordinates) defined by their values, protecting invariants.", color: "emerald" },
      ],
      rule: {
        title: "💡 When NOT to Use OOP",
        content: "If you have a pure mathematical calculation or stateless data transformation (e.g. clamp(n, min, max) or formatDate(d)), write a simple pure TypeScript function! Never create an artificial 'MathHelper' class just to satisfy OOP dogma.",
      },
    },
    part3: {
      title: "Mental Model: Value Objects & The Information Expert",
      intro: "Put methods in the class that owns the necessary data (The Information Expert principle):",
      points: [
        {
          title: "1. Eliminate Feature Envy",
          content: "If a method in Service A spends 90% of its lines reading and writing fields of Class B, that method belongs inside Class B!",
        },
        {
          title: "2. Value Objects Prevent Invariant Bugs",
          content: "A Money value object ensures amounts are never negative, rounds cents properly, and prevents accidentally adding USD to EUR without conversion.",
          codeSnippet: `const price = new Money(50, "USD"); // Always valid, immutable!`,
        },
        {
          title: "3. Pure Functions for Pure Transformations",
          content: "Do not wrap stateless utilities in classes with private empty constructors. Top-level exported functions are cleaner and tree-shakeable.",
        },
      ],
    },
    part4: {
      title: "Tangled Feature Envy vs Self-Contained Domain Logic",
      problem: "Forcing business behavior out of entities into procedural controllers leads to code duplication, invalid state transitions, and fragile architectures.",
      bad: {
        title: "❌ Bad: Anemic Customer model with severe Feature Envy",
        code: `// Dumb data bag with zero rules:
class Customer {
  public street: string = "";
  public city: string = "";
  public zip: string = "";
  public balance: number = 0; // 💥 Raw primitive, no currency!
}

class InvoicePrinter {
  // 💥 Reaching deep inside Customer fields to format labels:
  public printShippingLabel(c: Customer): string {
    return c.street.toUpperCase() + ", " + c.city + " (" + c.zip + ")";
  }

  // 💥 Business logic leaking into printer controller:
  public canAfford(c: Customer, cost: number): boolean {
    return c.balance >= cost;
  }
}`,
        explanation: "InvoicePrinter knows too much about Customer's internal fields (Feature Envy). If address formatting changes, multiple controllers must be rewritten.",
      },
      good: {
        title: "✅ Good: Rich Domain Entity + Value Object encapsulating logic",
        code: `class Address {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly zip: string
  ) {
    if (!zip || zip.length < 3) throw new Error("Invalid postal code");
  }

  public formatLabel(): string {
    return \`\${this.street.toUpperCase()}, \${this.city} (\${this.zip})\`;
  }
}

class Customer {
  constructor(
    public readonly id: string,
    private address: Address,
    private balanceCents: number
  ) {}

  public getShippingLabel(): string {
    return this.address.formatLabel();
  }

  public canAfford(cents: number): boolean {
    return this.balanceCents >= cents;
  }
}`,
        explanation: "Address and Customer encapsulate their own validation and formatting. Callers simply invoke customer.getShippingLabel().",
      },
      whyItMatters: "Eliminating anti-patterns prevents massive debugging headaches, stops invalid data from entering the database, and keeps classes maintainable.",
    },
    part5: {
      title: "Interactive Code Sandbox: Money Value Object & Protected Entity",
      intro: "Experiment with an immutable Money Value Object and a CustomerAccount entity that protects balance invariants:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-14: VALUE OBJECTS & ANTI-PATTERN REFACTORING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Immutable Value Object: Eliminating Primitive Obsession
class Money {
  constructor(
    public readonly cents: number,
    public readonly currency: "USD" | "EUR" | "GBP"
  ) {
    if (!Number.isInteger(cents)) throw new Error("Cents must be an integer.");
    if (cents < 0) throw new Error("Money amount cannot be negative.");
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(\`❌ Cannot add \${this.currency} and \${other.currency} without conversion!\`);
    }
    // Value objects are immutable: return a brand new instance!
    return new Money(this.cents + other.cents, this.currency);
  }

  format(): string {
    const symbolMap = { USD: "$", EUR: "€", GBP: "£" };
    return \`\${symbolMap[this.currency]}\${(this.cents / 100).toFixed(2)}\`;
  }
}

// 2. Rich Domain Entity: Defending Business Invariants
class CustomerAccount {
  private balance: Money;

  constructor(
    public readonly accountId: string,
    public readonly ownerName: string,
    initialDeposit: Money
  ) {
    this.balance = initialDeposit;
  }

  deposit(amount: Money): void {
    this.balance = this.balance.add(amount);
    console.log(\`💰 Deposited \${amount.format()}. New Balance: \${this.balance.format()}\`);
  }

  withdraw(amount: Money): boolean {
    if (this.balance.currency !== amount.currency) {
      console.log("❌ Currency mismatch on withdrawal!");
      return false;
    }

    if (this.balance.cents < amount.cents) {
      console.log(\`❌ Overdraft denied! Attempted: \${amount.format()}, Available: \${this.balance.format()}\`);
      return false;
    }

    // Immutable subtraction
    this.balance = new Money(this.balance.cents - amount.cents, this.balance.currency);
    console.log(\`💸 Withdrew \${amount.format()}. Remaining: \${this.balance.format()}\`);
    return true;
  }

  getBalance(): string {
    return this.balance.format();
  }
}

// --- Execution & Verification ---
const initialSavings = new Money(15000, "USD"); // $150.00
const account = new CustomerAccount("ACC-901", "Sarah Jenkins", initialSavings);

console.log("Initial Balance:", account.getBalance());

// Valid Deposit
account.deposit(new Money(5000, "USD")); // +$50.00 -> $200.00

// Successful Withdrawal
account.withdraw(new Money(7500, "USD")); // -$75.00 -> $125.00

// Attempted Illegal Overdraft (Defended by Entity!)
account.withdraw(new Money(20000, "USD")); // Exceeds $125.00!

// Attempted Currency Mismatch (Defended by Value Object!)
try {
  account.deposit(new Money(1000, "EUR"));
} catch (err: any) {
  console.log("Caught Value Object Error:", err.message);
}
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. Avoid God Objects", desc: "Split mammoth manager classes into small, cohesive collaborating entities." },
        { title: "2. Rich Domain Entities", desc: "Never leave entities as dumb bags of getters and setters; put business rules where the data lives." },
        { title: "3. Use Value Objects", desc: "Wrap primitives like Money and Email into smart, immutable, self-validating objects." },
        { title: "4. Plain Functions for Pure Math", desc: "Don't force a class when a pure, stateless 3-line function is simpler and clearer." },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "What is the primary architectural defect of the 'Anemic Domain Model' anti-pattern?",
        options: [
          "Classes contain only public data fields or getters/setters with zero business logic, causing domain rules to leak into procedural controller scripts",
          "Classes have too many private helper methods",
          "The codebase uses TypeScript interfaces instead of abstract classes",
          "Entities have constructors with more than 2 parameters",
        ],
        correctIndex: 0,
        explanation: "In an Anemic Domain Model, entities are stripped of their methods, turning them into dumb data structures. All validation and calculations leak into procedural services, violating encapsulation.",
      },
      nextLessonPreview: {
        title: "OOP-15: Pragmatic Design Patterns: Strategy & Factory in Practice",
        desc: "Master the two essential patterns you will use every day in modern TypeScript software engineering.",
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
    subtitle: "The two patterns you will use every day: Strategy (swappable algorithms) and Factory (clean object creation).",
    sections: [
      { id: "part1", label: "Why Design Patterns Matter & The Maps Analogy", icon: "🏛️" },
      { id: "part2", label: "Core Mechanics: Strategy vs Factory Patterns", icon: "🗺️" },
      { id: "part3", label: "Mental Model: Separating Creation from Execution", icon: "☕" },
      { id: "part4", label: "Sprawling Switch Statements vs Clean Patterns", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
    ],
    part1: {
      title: "Pragmatic Design Patterns: The 80/20 Rule of Software Architecture",
      bigPicture: "Design patterns are battle-tested, standardized blueprints for solving recurring software engineering challenges. While the classic Gang of Four (GoF) book cataloged 23 patterns, modern TypeScript architectures derive 80% of their daily benefit from just two: the Strategy Pattern (for swappable runtime behaviors) and the Factory Pattern (for clean, centralized object creation). Learning these two patterns transforms messy code into elegant, extensible systems.",
      analogy: "Think of Google Maps navigation. You enter your destination, and Google Maps lets you toggle between Driving, Walking, Bicycling, or Public Transit. The map interface and your destination remain identical; only the routing algorithm (the Strategy) swaps dynamically. Meanwhile, think of ordering coffee at an artisan espresso bar. You tell the barista: 'One Iced Oat Milk Latte'. You don't calibrate the espresso grinder or steam the milk yourself; the barista (the Factory) encapsulates all complex preparation and hands you the ready-to-enjoy drink.",
      breakdownTitle: "The Two Essential Daily Patterns:",
      breakdownItems: [
        { title: "1. The Strategy Pattern", desc: "Encapsulates a family of interchangeable algorithms behind a shared interface, letting callers switch behavior dynamically at runtime." },
        { title: "2. The Factory Pattern", desc: "Centralizes object construction logic in one authoritative place, isolating consuming client code from complex setup and configuration flags." },
        { title: "3. Pragmatic Application", desc: "Only apply patterns when you genuinely have multiple variations or complex instantiation; never over-engineer simple code." },
      ],
    },
    part2: {
      title: "Core Mechanics: Strategy vs Factory Patterns",
      intro: "Cleanly separate how an object is created from how it executes its behavior:",
      cards: [
        { number: "01", tag: "Behavioral", title: "Strategy Pattern", description: "Defines interchangeable algorithms (e.g. StandardShipping, ExpressAir, DroneDelivery) behind a common interface.", color: "purple" },
        { number: "02", tag: "Creational", title: "Factory Pattern", description: "A dedicated method or class that selects and instantiates the correct object based on environment or parameters.", color: "emerald" },
        { number: "03", tag: "Consumer", title: "Context Client", description: "Consumes the strategy via its interface without knowing which concrete class is doing the heavy lifting.", color: "cyan" },
      ],
      rule: {
        title: "💡 Separation of Concerns",
        content: "Separate object creation from object use! Let factories handle 'how to construct', and let strategies handle 'how to execute'.",
      },
    },
    part3: {
      title: "Mental Model: Eliminating Repeated Switch Statements",
      intro: "Combining Factory and Strategy eliminates brittle switch statements duplicated across controllers:",
      points: [
        {
          title: "1. One Switch in the Whole Codebase",
          content: "If you must inspect a type string (e.g. 'PDF' vs 'CSV' vs 'EXCEL'), place that switch inside ONE factory class, never across 10 controller files!",
        },
        {
          title: "2. Open for Extension (OCP)",
          content: "Adding a new format requires writing one new strategy class and adding one case to the factory. Zero existing controllers are touched.",
          codeSnippet: `const exporter = ExporterFactory.create("CSV");\nexporter.export(data);`,
        },
        {
          title: "3. Effortless Mocking in Tests",
          content: "In unit tests, bypass the factory entirely and pass a simple MockStrategy directly into your service methods.",
        },
      ],
    },
    part4: {
      title: "Sprawling Switch Statements vs Clean Patterns",
      problem: "Duplicating constructor setup and configuration mapping across multiple controller files creates brittle, hard-to-maintain code.",
      bad: {
        title: "❌ Bad: Every controller duplicates messy constructor instantiation",
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
        explanation: "Every controller must know all concrete classes and their complex configuration flags. Adding a new export format requires hunting through every controller.",
      },
      good: {
        title: "✅ Good: Factory creates the strategy; client uses the abstraction",
        code: `interface ReportStrategy {
  render(data: any): string;
}

class ReportFactory {
  public static create(type: "PDF" | "CSV"): ReportStrategy {
    if (type === "PDF") return new PdfGenerator("font_file", 1024, "A4");
    return new CsvGenerator(",", "utf-8");
  }
}

class ReportController {
  public generate(type: "PDF" | "CSV", data: any): string {
    const strategy = ReportFactory.create(type);
    return strategy.render(data);
  }
}`,
        explanation: "The controller is 100% decoupled. The Factory handles all instantiation details, and the Strategy executes the rendering algorithm.",
      },
      whyItMatters: "Combining Factory and Strategy isolates callers from breaking library changes, adheres to the Open/Closed Principle, and keeps code clean.",
    },
    part5: {
      title: "Interactive Code Sandbox: E-Commerce Shipping & Tax Engine",
      intro: "Experiment with a Shipping Strategy engine paired with a dynamic Factory that produces strategies based on order speed:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-15: STRATEGY & FACTORY PATTERNS IN PRACTICE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Strategy Interface
interface ShippingStrategy {
  name: string;
  calculateCost(weightKg: number, distanceKm: number): number;
}

// 2. Concrete Strategy A: Standard Ground
class GroundShippingStrategy implements ShippingStrategy {
  name = "Standard Ground (3-5 Days)";
  calculateCost(weightKg: number, distanceKm: number): number {
    return 5.00 + (weightKg * 1.20) + (distanceKm * 0.05);
  }
}

// 3. Concrete Strategy B: Express Air
class ExpressAirStrategy implements ShippingStrategy {
  name = "Express Air (Next Day)";
  calculateCost(weightKg: number, distanceKm: number): number {
    return 20.00 + (weightKg * 3.50) + (distanceKm * 0.15);
  }
}

// 4. Concrete Strategy C: Eco Drone Delivery
class DroneDeliveryStrategy implements ShippingStrategy {
  name = "Autonomous Drone (Same Hour)";
  calculateCost(weightKg: number, distanceKm: number): number {
    if (weightKg > 5) throw new Error("Drones cannot carry packages over 5kg!");
    return 15.00 + (distanceKm * 0.50);
  }
}

// 5. The Factory: Centralizing Strategy Instantiation
type ShippingTier = "GROUND" | "AIR" | "DRONE";

class ShippingStrategyFactory {
  static createStrategy(tier: ShippingTier): ShippingStrategy {
    switch (tier) {
      case "GROUND": return new GroundShippingStrategy();
      case "AIR": return new ExpressAirStrategy();
      case "DRONE": return new DroneDeliveryStrategy();
      default: throw new Error(\`Unsupported tier: \${tier}\`);
    }
  }
}

// 6. The Context Client: Consumes Strategy Cleanly
class OrderShipmentManager {
  calculateQuote(tier: ShippingTier, weight: number, distance: number): string {
    const strategy = ShippingStrategyFactory.createStrategy(tier);
    const cost = strategy.calculateCost(weight, distance);
    return \`[\${strategy.name}] -> $\${cost.toFixed(2)}\`;
  }
}

// --- Execution & Verification ---
const shipmentManager = new OrderShipmentManager();

console.log("=== CALCULATING SHIPPING QUOTES ===");
console.log(shipmentManager.calculateQuote("GROUND", 2.5, 120));
console.log(shipmentManager.calculateQuote("AIR", 2.5, 120));
console.log(shipmentManager.calculateQuote("DRONE", 1.8, 15));

// Drone weight limit protection:
try {
  shipmentManager.calculateQuote("DRONE", 8.0, 10);
} catch (err: any) {
  console.log("Drone Rejection Verified:", err.message);
}
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. The Strategy Pattern", desc: "Encapsulates interchangeable algorithms behind a shared interface, swappable at runtime." },
        { title: "2. The Factory Pattern", desc: "Centralizes complex instantiation logic and configuration mapping in one authoritative place." },
        { title: "3. Eliminate Repeated Switches", desc: "Centralize type-branching into a single factory rather than repeating switch statements across controllers." },
        { title: "4. Next: The Final Synthesis", desc: "In OOP-16, we connect all 15 lessons to architect the Capstone Workflow Engine!" },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "When should you combine the Factory Pattern with the Strategy Pattern?",
        options: [
          "When you need to choose and instantiate one of several interchangeable algorithms dynamically based on runtime parameters or environment flags",
          "Only when you want to convert classes into JSON files",
          "When you want to prevent all unit testing in your application",
          "Whenever your project has more than 100 lines of CSS",
        ],
        correctIndex: 0,
        explanation: "The Factory handles selecting and instantiating the correct strategy based on inputs, while the Strategy encapsulates the actual algorithm, keeping client code 100% decoupled.",
      },
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
    subtitle: "Synthesize all 16 concepts: think like an enterprise software architect and assemble the final Task & Workflow Engine.",
    sections: [
      { id: "part1", label: "Thinking Like an Architect & The Blueprint Analogy", icon: "🏛️" },
      { id: "part2", label: "Core Mechanics: CRC Cards & Domain Boundaries", icon: "📇" },
      { id: "part3", label: "Mental Model: The 16-Lesson OOP Architectural Synthesis", icon: "⚙️" },
      { id: "part4", label: "Monolithic Spaghetti vs Decoupled Workflow Architecture", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
      { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
      { id: "part7", label: "Knowledge Check Quiz & Curriculum Graduation", icon: "🏆" },
    ],
    part1: {
      title: "Thinking Like an Architect: From Code Snippets to Enterprise Systems",
      bigPicture: "Congratulations on reaching the culminating lesson of the Object-Oriented Programming curriculum! A junior developer writes code line by line to make an immediate feature work. A senior software architect steps back, analyzes domain boundaries, models autonomous entities, and designs clean contracts that withstand years of business evolution. In this lesson, we synthesize all 16 lessons into a cohesive mental framework and construct the engine for our Capstone Project.",
      analogy: "Think of an architect designing a modern skyscraper. They do not start by laying bricks or buying furniture; they draft blueprints that define where water pipes, electrical conduits, structural columns, and elevators connect. Similarly, an orchestra conductor doesn't play the violin, trumpet, and drums simultaneously; they coordinate musicians through a shared musical score. Good OOP architecture designs the blueprint and coordinates the players.",
      breakdownTitle: "The Three Milestones of Clean System Architecture:",
      breakdownItems: [
        { title: "1. Model Autonomous Entities", desc: "Identify core actors in your business domain and protect their invariants with strict Encapsulation." },
        { title: "2. Establish Role Contracts", desc: "Define lean interfaces (ISP, Abstraction) so modules can collaborate without tight coupling." },
        { title: "3. Compose for Pluggability", desc: "Snap components together via Composition and Dependency Inversion, keeping the core closed for modification but open for extension." },
      ],
    },
    part2: {
      title: "Core Mechanics: CRC Cards & Domain Boundaries",
      intro: "Class-Responsibility-Collaboration (CRC) technique to design systems cleanly before writing code:",
      cards: [
        { number: "01", tag: "Identity", title: "Class Responsibility", description: "What state does this entity protect? What single business action does it execute? (SRP + Encapsulation)", color: "purple" },
        { number: "02", tag: "Collaborators", title: "Interface Collaboration", description: "What minimal abstract contracts does this class talk to? Never depend on concrete helpers! (DIP + ISP)", color: "emerald" },
        { number: "03", tag: "Aggregate Root", title: "Authoritative Gateway", description: "Designate one root entity that manages internal child objects, defending system invariants.", color: "cyan" },
      ],
      rule: {
        title: "💡 The Architectural Golden Rule",
        content: "If a class has more than 3 distinct reasons to change, split it! Use composition to assemble complex systems from small, understandable, autonomous parts.",
      },
    },
    part3: {
      title: "Mental Model: The Complete 16-Lesson Synthesis",
      intro: "Look how our Capstone Project seamlessly integrates all 16 OOP principles:",
      points: [
        {
          title: "1. The 4 Pillars (Lessons 1–5)",
          content: "Encapsulation guards state (Draft -> Running -> Completed); Abstraction defines contracts; Polymorphism dispatches step execution without type checking.",
        },
        {
          title: "2. Relationships & Composition (Lessons 6–8)",
          content: "Favor Composition over Inheritance: A WorkflowEngine HAS-A list of steps and observers, avoiding fragile inheritance hierarchies.",
        },
        {
          title: "3. SOLID & Patterns (Lessons 9–15)",
          content: "Open/Closed Principle lets you register new step types (HTTP, DB, Email) without modifying the runner engine. Dependency Inversion allows offline mocking.",
        },
      ],
    },
    part4: {
      title: "Monolithic Spaghetti vs Decoupled Workflow Architecture",
      problem: "Monolithic procedural loops with hardcoded branching and direct database calls cannot be unit-tested, extended, or audited.",
      bad: {
        title: "❌ Bad: Monolithic 1000-line procedural loop with hardcoded branching",
        code: `// Spaghetti function with hardcoded checks:
function runEverything(steps: any[]) {
  for (const s of steps) {
    if (s.type === "HTTP") {
      fetch(s.url); // 💥 Hardcoded network call!
    } else if (s.type === "EMAIL") {
      smtp.send(s.to); // 💥 Hardcoded email!
    }
    db.query("UPDATE status..."); // 💥 Hardcoded database!
  }
}`,
        explanation: "Zero encapsulation, hardcoded branching, impossible to test offline, and fragile to any change in steps.",
      },
      good: {
        title: "✅ Good: Clean modular workflow engine with polymorphic steps",
        code: `interface WorkflowStep {
  name: string;
  execute(ctx: Record<string, any>): Promise<boolean>;
}

class WorkflowEngine {
  private steps: WorkflowStep[] = [];

  public addStep(step: WorkflowStep): void {
    this.steps.push(step);
  }

  public async run(ctx: Record<string, any>): Promise<boolean> {
    for (const step of this.steps) {
      const ok = await step.execute(ctx);
      if (!ok) return false;
    }
    return true;
  }
}`,
        explanation: "Pure encapsulation, pluggable step handlers, and 100% testable using Dependency Inversion. Open for extension, closed for modification.",
      },
      whyItMatters: "Decoupled architecture allows adding new steps (HTTP ping, DB migration, Slack alerts) in 5 minutes without touching engine code.",
    },
    part5: {
      title: "Interactive Code Sandbox: The Capstone Workflow Engine Prototype",
      intro: "Experiment with a working prototype of the Object-Oriented Workflow Engine with polymorphic steps and event observers:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OOP-16: CAPSTONE ARCHITECTURE PROTOTYPE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. The Core Abstraction (Polymorphism + ISP)
interface WorkflowStep {
  name: string;
  run(context: Record<string, any>): boolean;
}

// 2. The Observer Contract (Composition over Inheritance)
interface WorkflowObserver {
  onStepCompleted(stepName: string, success: boolean): void;
  onWorkflowFinished(totalSteps: number): void;
}

// 3. Concrete Step A: Health Check Ping
class HttpHealthCheckStep implements WorkflowStep {
  constructor(public name: string, private targetUrl: string) {}

  run(context: Record<string, any>): boolean {
    console.log(\`  🌐 [Step: \${this.name}]: Pinging \${this.targetUrl} -> 200 OK\`);
    context["apiHealthy"] = true;
    return true;
  }
}

// 4. Concrete Step B: Data Sanitization
class DataSanitizerStep implements WorkflowStep {
  constructor(public name: string) {}

  run(context: Record<string, any>): boolean {
    console.log(\`  🧹 [Step: \${this.name}]: Normalizing incoming customer records.\`);
    context["sanitizedAt"] = Date.now();
    return true;
  }
}

// 5. Concrete Observer: Audit Logger
class ConsoleAuditLogger implements WorkflowObserver {
  onStepCompleted(stepName: string, success: boolean): void {
    const icon = success ? "✅" : "❌";
    console.log(\`    [AUDIT LOG]: Step "\${stepName}" completed with status: \${icon}\`);
  }

  onWorkflowFinished(totalSteps: number): void {
    console.log(\`    [AUDIT LOG]: Workflow pipeline finished \${totalSteps} steps.\\n\`);
  }
}

// 6. The Orchestrator: Encapsulation & Invariant Defense
class WorkflowEngine {
  private steps: WorkflowStep[] = [];
  private observers: WorkflowObserver[] = [];

  addStep(step: WorkflowStep): void {
    this.steps.push(step);
  }

  addObserver(observer: WorkflowObserver): void {
    this.observers.push(observer);
  }

  execute(context: Record<string, any> = {}): boolean {
    console.log(\`🚀 Starting Workflow Pipeline (\${this.steps.length} steps)...\\n\`);

    for (const step of this.steps) {
      const success = step.run(context);
      this.observers.forEach(obs => obs.onStepCompleted(step.name, success));

      if (!success) {
        console.log(\`❌ Step "\${step.name}" failed. Aborting pipeline.\`);
        return false;
      }
    }

    this.observers.forEach(obs => obs.onWorkflowFinished(this.steps.length));
    console.log("🎉 Pipeline execution completed successfully with zero defects!");
    return true;
  }
}

// --- Execution & Verification ---
const engine = new WorkflowEngine();

// Register Observers via Composition
engine.addObserver(new ConsoleAuditLogger());

// Register Polymorphic Steps (Open/Closed Principle!)
engine.addStep(new HttpHealthCheckStep("API Ping", "https://api.learncraft.io"));
engine.addStep(new DataSanitizerStep("Sanitize Records"));

// Run Pipeline
const pipelineContext: Record<string, any> = {};
engine.execute(pipelineContext);

console.log("Context Results:", JSON.stringify(pipelineContext));
`,
    },
    part6: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "1. 16 Lessons Complete", desc: "You have mastered foundations, the 4 pillars, composition, coupling & cohesion, SOLID, and design patterns." },
        { title: "2. Think in Autonomous Objects", desc: "Model systems as collaborating entities that encapsulate their data and defend business invariants." },
        { title: "3. Apply SOLID Pragmatically", desc: "Use SRP, OCP, LSP, ISP, and DIP to guide clean, maintainable, regression-proof architectures." },
        { title: "4. Build the Capstone Project", desc: "Head over to the Final Project to build the complete Task Management & Workflow Automation Engine!" },
      ],
    },
    part7: {
      title: "Knowledge Check Quiz & Curriculum Graduation",
      quiz: {
        question: "How do the 4 Pillars, Composition over Inheritance, and SOLID connect in professional software architecture?",
        options: [
          "The Pillars define what objects are; Composition defines how they combine; SOLID defines how to structure their relationships for long-term maintainability",
          "They are mutually exclusive paradigms that cannot be used together in TypeScript",
          "SOLID principles replaced the 4 pillars in 2020, making classes and interfaces obsolete",
          "Only backend languages like Java use OOP; TypeScript should only use global functions",
        ],
        correctIndex: 0,
        explanation: "They build upon each other: Encapsulation and Abstraction define your boundaries and contracts; Inheritance and Polymorphism allow behavioral variation; Composition snaps components together like Legos; and SOLID provides architectural guardrails to prevent your codebase from rotting.",
      },
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
