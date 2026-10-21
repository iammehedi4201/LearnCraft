/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OBJECT-ORIENTED PROGRAMMING (OOP) CURRICULUM QUIZZES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * High-yield, curriculum-aligned module quizzes for the OOP track.
 * Questions rigorously evaluate learning objectives: classes vs objects,
 * state & behavior, constructors, encapsulation & invariant protection,
 * abstraction vs encapsulation, and interface contracts.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const OOP_MODULE_QUIZZES: ModuleQuiz[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // OOP-01: Object-Oriented Thinking: Objects, Classes, State & Behavior
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop01",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop01-why-oop",
    lessonCode: "OOP-01",
    lessonTitle: "Object-Oriented Thinking: Objects, Classes, State & Behavior",
    description: "Evaluate your mental model of classes as blueprints, objects as instances, and how state and behavior work together.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop01-q1",
        type: "multiple_choice",
        title: "Class vs Object Concept",
        prompt: "What is the primary difference between a Class and an Object in Object-Oriented Programming?",
        options: [
          "A Class is a blueprint or template written in code, while an Object is a concrete living instance created in memory using 'new'",
          "A Class can only contain numbers, while an Object can only contain strings",
          "A Class runs exclusively on the server, while an Object runs exclusively in the browser",
          "There is no difference; Class and Object are identical synonyms in all languages"
        ],
        correctAnswer: 0,
        explanation: "A Class defines the blueprint (the shape, properties, and methods). When you instantiate it with 'new ClassName()', you create a concrete Object with its own independent memory and state.",
        hint: "Think of an architectural blueprint on paper versus an actual house built on a street.",
        hintCostXP: 5,
      },
      {
        id: "oop01-q2",
        type: "code_output",
        title: "Independent Instance State",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Counter {
  count: number = 0;

  increment(): void {
    this.count += 1;
  }
}

const counterA = new Counter();
const counterB = new Counter();

counterA.increment();
counterA.increment();
counterB.increment();

console.log(\`\${counterA.count},\${counterB.count}\`);`,
        language: "typescript",
        options: [
          "2,1",
          "3,3",
          "1,2",
          "2,2"
        ],
        correctAnswer: 0,
        explanation: "Each object created with 'new' gets its own distinct copy of instance properties. counterA was incremented twice (count: 2), while counterB was incremented once (count: 1).",
        hint: "Remember that distinct instances created with 'new' do not share their instance properties.",
        hintCostXP: 5,
      },
      {
        id: "oop01-q3",
        type: "multiple_choice",
        title: "State vs Behavior",
        prompt: "In OOP terminology, what do 'State' and 'Behavior' represent inside an object?",
        options: [
          "State represents what the object knows (properties/data), and Behavior represents what the object does (methods/functions)",
          "State represents compiled machine code, and Behavior represents runtime memory errors",
          "State represents CSS styles, and Behavior represents HTML tags",
          "State is only for static methods, and Behavior is only for database queries"
        ],
        correctAnswer: 0,
        explanation: "State refers to an object's current data or attributes stored in properties (fields). Behavior refers to the actions or operations the object can perform via its methods.",
        hint: "Think of a Car: color, speed, and fuel are its state; accelerate() and brake() are its behavior.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-02: Encapsulation: Protecting State & Invariants
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop02",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop02-encapsulation",
    lessonCode: "OOP-02",
    lessonTitle: "Encapsulation: Protecting State & Invariants",
    description: "Evaluate your understanding of constructors, private state protection, invariant enforcement, and the 'Tell, Don't Ask' principle.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop02-q1",
        type: "multiple_choice",
        title: "Role of the Constructor",
        prompt: "Why is a constructor function essential for maintaining valid object state?",
        options: [
          "It guarantees that an object is initialized with valid, predictable data at the exact moment it is created with 'new'",
          "It compiles TypeScript directly into C++ binary assembly",
          "It automatically encrypts all code so other developers cannot read it",
          "It prevents any methods from ever being called on the object"
        ],
        correctAnswer: 0,
        explanation: "A constructor is the initialization gateway. It receives initial arguments, validates essential rules, and assigns initial property values so the object never begins life in a corrupted or half-initialized state.",
        hint: "Consider what happens if an object is created without setting its required initial properties.",
        hintCostXP: 5,
      },
      {
        id: "oop02-q2",
        type: "code_output",
        title: "Protecting Invariants with Private State",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class BankAccount {
  private balance: number;

  constructor(initialDeposit: number) {
    this.balance = initialDeposit;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
account.withdraw(200); // Invalid withdrawal: exceeds current balance!
account.withdraw(30);  // Valid withdrawal!

console.log(account.getBalance());`,
        language: "typescript",
        options: [
          "120",
          "150",
          "-50",
          "70"
        ],
        correctAnswer: 0,
        explanation: "Starting balance: 100. deposit(50) -> balance is 150. withdraw(200) fails because 200 > 150, so balance remains 150. withdraw(30) succeeds, reducing balance to 120. Direct tampering is blocked by 'private'.",
        hint: "Track the balance step by step: 100 + 50 = 150. The 200 withdrawal is blocked by the guard check.",
        hintCostXP: 5,
      },
      {
        id: "oop02-q3",
        type: "multiple_choice",
        title: "The Invariant Concept",
        prompt: "What is an 'invariant' in object-oriented software design?",
        options: [
          "A business rule or truth condition that must ALWAYS remain valid throughout the entire lifetime of an object",
          "A variable that changes randomly every time a loop executes",
          "A special syntax keyword in TypeScript that deletes private methods",
          "An external database index used for speeding up SQL queries"
        ],
        correctAnswer: 0,
        explanation: "An invariant is a condition that must always hold true for an entity (e.g. 'balance cannot be negative' or 'inventory stock cannot be negative'). Encapsulation guards invariants by making data private and routing all changes through validating methods.",
        hint: "The word invariant literally means 'not varying' or 'never broken'.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-03: Abstraction & Interfaces: Contracts Over Implementations
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop03",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop03-abstraction",
    lessonCode: "OOP-03",
    lessonTitle: "Abstraction & Interfaces: Contracts Over Implementations",
    description: "Evaluate your understanding of hiding internal complexity, the difference between encapsulation and abstraction, and programming against interface contracts.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop03-q1",
        type: "multiple_choice",
        title: "Abstraction vs Encapsulation",
        prompt: "What is the fundamental difference between Encapsulation and Abstraction?",
        options: [
          "Encapsulation is about protection and packaging (hiding internal state with private), while Abstraction is about simplification (exposing clean high-level controls and hiding the messy 'how')",
          "Encapsulation is only for backend code, while Abstraction is only for frontend CSS",
          "Encapsulation is written with interfaces, while Abstraction is written with loops",
          "They are exact synonyms with no conceptual distinction whatsoever"
        ],
        correctAnswer: 0,
        explanation: "Encapsulation bundles data with behavior and hides the internal state to protect invariants. Abstraction simplifies complexity by presenting a high-level contract ('what' it does) while hiding the intricate implementation details ('how' it does it).",
        hint: "Think: Encapsulation is the protective capsule shell; Abstraction is the simple steering wheel on a complex automobile.",
        hintCostXP: 5,
      },
      {
        id: "oop03-q2",
        type: "code_output",
        title: "Interface Contract & Swappable Implementations",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface Notifier {
  send(message: string): string;
}

class EmailService implements Notifier {
  send(message: string): string {
    return \`[EMAIL] \${message}\`;
  }
}

class SmsService implements Notifier {
  send(message: string): string {
    return \`[SMS] \${message}\`;
  }
}

function notifyCustomer(service: Notifier, text: string): string {
  return service.send(text);
}

const email = new EmailService();
const sms = new SmsService();

const resultA = notifyCustomer(email, "Welcome");
const resultB = notifyCustomer(sms, "OTP: 4921");

console.log(\`\${resultA} | \${resultB}\`);`,
        language: "typescript",
        options: [
          "[EMAIL] Welcome | [SMS] OTP: 4921",
          "[SMS] Welcome | [EMAIL] OTP: 4921",
          "Welcome | OTP: 4921",
          "undefined | undefined"
        ],
        correctAnswer: 0,
        explanation: "notifyCustomer programs to the Notifier interface. When given an EmailService, it executes its implementation; when given an SmsService, it executes that implementation. The caller doesn't need to know the inner workings of either service.",
        hint: "Each class implements the same contract in its own way.",
        hintCostXP: 5,
      },
      {
        id: "oop03-q3",
        type: "multiple_choice",
        title: "Why Program to an Interface?",
        prompt: "What is the primary architectural benefit of programming against an Interface instead of a concrete class?",
        options: [
          "It decouples callers from concrete details, allowing implementations to be swapped, upgraded, or mocked in tests without changing caller code",
          "It forces the browser to run code twice as fast by skipping JavaScript compilation",
          "It automatically saves all data to a cloud database without an API key",
          "It prevents any other developer on your team from editing your files"
        ],
        correctAnswer: 0,
        explanation: "Programming to interfaces decouples components. If your application depends on a PaymentGateway interface, you can switch from Stripe to PayPal or use a MockPaymentGateway for unit tests without changing the checkout logic.",
        hint: "Think about universal USB-C ports: any charger that conforms to the USB-C standard can plug in seamlessly.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-04: Inheritance: Sharing Common Traits ('Is-A' Relationship)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop04",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop04-inheritance",
    lessonCode: "OOP-04",
    lessonTitle: "Inheritance: Sharing Common Traits ('Is-A' Relationship)",
    description: "Evaluate your understanding of parent and child classes, extends, super, and method overriding.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop04-q1",
        type: "multiple_choice",
        title: "The 'Is-A' Relationship",
        prompt: "When is Inheritance appropriate in object-oriented design?",
        options: [
          "When a genuine 'is-a' relationship exists (e.g., Dog is an Animal) and the child class shares the core nature and contract of the parent",
          "Whenever two classes have a single variable with the same name",
          "To avoid typing import statements across different files",
          "Only when connecting to an SQL database"
        ],
        correctAnswer: 0,
        explanation: "Inheritance models an 'is-a' hierarchy. A child class extends a parent class because it represents a specialized type of that parent, inheriting its fields and methods.",
        hint: "Ask yourself: Is a Dog an Animal? Yes. Is a Car an Engine? No, a Car 'has' an engine.",
        hintCostXP: 5,
      },
      {
        id: "oop04-q2",
        type: "code_output",
        title: "Method Overriding with super",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Employee {
  constructor(public name: string) {}

  getRole(): string {
    return \`Employee: \${this.name}\`;
  }
}

class Manager extends Employee {
  constructor(name: string, public department: string) {
    super(name);
  }

  override getRole(): string {
    return \`Manager of \${this.department} (\${this.name})\`;
  }
}

const emp = new Employee("Alice");
const mgr = new Manager("Bob", "Engineering");

console.log(\`\${emp.getRole()} | \${mgr.getRole()}\`);`,
        language: "typescript",
        options: [
          "Employee: Alice | Manager of Engineering (Bob)",
          "Employee: Alice | Employee: Bob",
          "Manager of Engineering (Alice) | Manager of Engineering (Bob)",
          "Error: Cannot override getRole"
        ],
        correctAnswer: 0,
        explanation: "Manager overrides getRole() to supply its own specialized behavior, while Employee retains its base implementation.",
        hint: "Check which class instance each variable points to.",
        hintCostXP: 5,
      },
      {
        id: "oop04-q3",
        type: "multiple_choice",
        title: "Role of super()",
        prompt: "In a derived child class constructor, what does calling 'super()' do?",
        options: [
          "It invokes the constructor of the parent class to ensure parent properties are properly initialized",
          "It creates an identical twin of the object in browser localStorage",
          "It deletes all private variables from memory",
          "It halts execution and waits for user input"
        ],
        correctAnswer: 0,
        explanation: "In derived classes, super() calls the parent constructor. TypeScript requires super() before accessing 'this' so the parent portion of the instance is completely initialized first.",
        hint: "The child must let the parent build its foundation before the child can add its own rooms.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-05: Polymorphism: Eliminating Conditionals with Dynamic Dispatch
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop05",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop05-polymorphism",
    lessonCode: "OOP-05",
    lessonTitle: "Polymorphism: Eliminating Conditionals with Dynamic Dispatch",
    description: "Evaluate your mental model of treating different objects through a common interface without bloated if/else or switch statements.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop05-q1",
        type: "multiple_choice",
        title: "Meaning of Polymorphism",
        prompt: "What does Polymorphism literally mean and how does it benefit software architecture?",
        options: [
          "'Many forms': the ability of different objects to respond to the same method call with their own specialized behavior, removing fragile if/else branches",
          "Converting code into multiple human languages like French and Spanish",
          "Writing the same class five times with different spellings",
          "Compressing images to reduce bundle size"
        ],
        correctAnswer: 0,
        explanation: "Polymorphism means 'many forms'. Callers invoke a uniform method (e.g. shape.calculateArea() or payment.process()) and each concrete class executes its own specific logic without the caller needing a huge switch statement.",
        hint: "Poly = many, morph = form.",
        hintCostXP: 5,
      },
      {
        id: "oop05-q2",
        type: "code_output",
        title: "Dynamic Dispatch in an Array",
        prompt: "What will be printed to the console when this loop executes?",
        codeSnippet: `abstract class Shape {
  abstract area(): number;
}

class Square extends Shape {
  constructor(private side: number) { super(); }
  area(): number { return this.side * this.side; }
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) { super(); }
  area(): number { return this.w * this.h; }
}

const shapes: Shape[] = [new Square(4), new Rectangle(3, 5)];
const total = shapes.reduce((sum, s) => sum + s.area(), 0);

console.log(total);`,
        language: "typescript",
        options: [
          "31",
          "16",
          "15",
          "0"
        ],
        correctAnswer: 0,
        explanation: "Square(4) has area 4 * 4 = 16. Rectangle(3, 5) has area 3 * 5 = 15. Total = 16 + 15 = 31. The reduce loop calls s.area() polymorphically.",
        hint: "Calculate 4*4 and 3*5, then sum them together.",
        hintCostXP: 5,
      },
      {
        id: "oop05-q3",
        type: "multiple_choice",
        title: "Replacing Fragile Switches",
        prompt: "How does polymorphism improve code maintainability compared to switch statements?",
        options: [
          "Adding a new type requires creating just one new class; you don't have to hunt down and update 10 different switch statements across your codebase",
          "It forces the compiler to use more RAM so the program won't crash",
          "It converts all functions into asynchronous promises",
          "It automatically tests your code on multiple browsers"
        ],
        correctAnswer: 0,
        explanation: "With polymorphism, adding a new feature (e.g. BitcoinPayment) means creating a new class that implements the interface. Existing caller code remains untouched (satisfying the Open/Closed Principle).",
        hint: "Think about what happens when you add a 5th payment method to a codebase with switch statements everywhere.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-06: Object Relationships: Association, Aggregation & Composition
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop06",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop06-object-relationships",
    lessonCode: "OOP-06",
    lessonTitle: "Object Relationships: Association, Aggregation & Composition",
    description: "Evaluate your mental model of the 3 fundamental ways objects connect: uses-a (Association), has-a independent (Aggregation), and whole-part lifecycle (Composition).",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop06-q1",
        type: "multiple_choice",
        title: "The Lifecycle Acid Test",
        prompt: "What is the primary architectural difference between Aggregation and Composition?",
        options: [
          "In Composition, the child part's lifecycle is bound to the parent (if the parent is destroyed, the child is destroyed); in Aggregation, the child exists independently of the parent",
          "Aggregation requires using class inheritance with extends, while Composition forbids constructors",
          "Composition is only used when connecting to SQL databases, while Aggregation is used in frontend CSS",
          "There is no difference; Aggregation and Composition are exact synonyms"
        ],
        correctAnswer: 0,
        explanation: "The lifecycle relationship is the defining distinction: in Composition, child parts are created and owned by the parent (e.g. House and Rooms). In Aggregation, child objects are passed in and survive if the parent is deleted (e.g. University and Students).",
        hint: "Ask: If the parent object ceases to exist, does the child object continue to exist?",
        hintCostXP: 5,
      },
      {
        id: "oop06-q2",
        type: "code_output",
        title: "Association via Method Parameter ('Uses-A')",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Tool {
  name: string;
  constructor(name: string) { this.name = name; }
}

class WorkerPerson {
  useTool(tool: Tool): string {
    return \`Using \${tool.name}\`;
  }
}

const hammer = new Tool("Hammer");
const bob = new WorkerPerson();

console.log(bob.useTool(hammer));`,
        language: "typescript",
        options: [
          "Using Hammer",
          "WorkerPerson: Hammer",
          "undefined",
          "Error: Tool is not defined"
        ],
        correctAnswer: 0,
        explanation: "WorkerPerson has an Association ('uses-a') relationship with Tool. The tool is passed as a parameter to useTool, used temporarily, and both objects exist independently in memory.",
        hint: "The method returns 'Using ' concatenated with tool.name.",
        hintCostXP: 5,
      },
      {
        id: "oop06-q3",
        type: "multiple_choice",
        title: "Composition in Domain Entities",
        prompt: "Why should an Order class use Composition to manage its OrderLineItems rather than letting external code mutate the items array directly?",
        options: [
          "To enforce encapsulation and invariant rules (like non-negative prices and recalculating totals) whenever items are added or removed",
          "Because JavaScript will crash if an array has more than 5 elements",
          "To convert the Order class into an HTML table automatically",
          "To ensure all order items run in separate browser tabs"
        ],
        correctAnswer: 0,
        explanation: "By treating the Order as the aggregate owner (Composition), all additions and deletions flow through Order methods. This guarantees that invalid items, negative prices, or inconsistent order totals can never be introduced by outside code.",
        hint: "Think about protecting data integrity when multiple items are part of a single transaction.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-07: Favor Composition Over Inheritance
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop07",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop07-composition-over-inheritance",
    lessonCode: "OOP-07",
    lessonTitle: "Favor Composition Over Inheritance",
    description: "Test your mastery of assembling pluggable components, avoiding combinatorial class explosion, and delegating work cleanly.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop07-q1",
        type: "multiple_choice",
        title: "Why Favor Composition?",
        prompt: "Why does modern software engineering favor Composition over deep class Inheritance?",
        options: [
          "Composition allows assembling pluggable behaviors that can be swapped or combined at runtime, avoiding combinatorial explosion and fragile base classes",
          "Because TypeScript is phasing out the 'class' and 'extends' keywords entirely",
          "Because Composition makes JavaScript execute 50% faster in Chrome V8",
          "Because classes with inheritance cannot use TypeScript interfaces"
        ],
        correctAnswer: 0,
        explanation: "Composition lets you snap interchangeable components together like Lego bricks. With inheritance, adding combinations of behaviors (e.g. FlyingSwimmingMonster) leads to dozens of rigid subclasses. With composition, you just compose a FlightComponent and a SwimComponent.",
        hint: "Think about Lego bricks: you snap new capabilities on without carving a brand new statue.",
        hintCostXP: 5,
      },
      {
        id: "oop07-q2",
        type: "code_output",
        title: "Runtime Strategy Delegation",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface AttackStrategy {
  strike(): string;
}

class SwordAttack implements AttackStrategy {
  strike(): string { return "Slash for 15 dmg"; }
}

class BowAttack implements AttackStrategy {
  strike(): string { return "Shoot for 10 dmg"; }
}

class Hero {
  private weapon: AttackStrategy;

  constructor(startingWeapon: AttackStrategy) {
    this.weapon = startingWeapon;
  }

  setWeapon(newWeapon: AttackStrategy): void {
    this.weapon = newWeapon;
  }

  attack(): string {
    return this.weapon.strike();
  }
}

const warrior = new Hero(new SwordAttack());
const first = warrior.attack();

warrior.setWeapon(new BowAttack());
const second = warrior.attack();

console.log(\`\${first} | \${second}\`);`,
        language: "typescript",
        options: [
          "Slash for 15 dmg | Shoot for 10 dmg",
          "Slash for 15 dmg | Slash for 15 dmg",
          "Shoot for 10 dmg | Slash for 15 dmg",
          "Hero: SwordAttack | Hero: BowAttack"
        ],
        correctAnswer: 0,
        explanation: "The Hero delegates attacking to its composed weapon strategy. After calling setWeapon(new BowAttack()), the next attack() call delegates to the new BowAttack implementation without creating any subclass.",
        hint: "Trace the weapon assigned initially, then observe what happens after setWeapon.",
        hintCostXP: 5,
      },
      {
        id: "oop07-q3",
        type: "multiple_choice",
        title: "The Gorilla-Banana Problem",
        prompt: "What is the famous 'Gorilla-Banana Problem' described by Erlang creator Joe Armstrong regarding deep inheritance?",
        options: [
          "You wanted a banana, but you got a gorilla holding the banana and the entire jungle (inheriting unintended, tightly coupled baggage from parent classes)",
          "A JavaScript memory bug where objects consume more memory than integers",
          "A naming convention where class names must start with animal names",
          "An algorithm for sorting arrays with primate names"
        ],
        correctAnswer: 0,
        explanation: "When you inherit from a base class just to reuse a single small helper method (the banana), you inadvertently inherit all state, dependencies, and private details of the parent and grandparent classes (the gorilla and the jungle).",
        hint: "Think about inheriting unintended dependencies from ancestors in a deep hierarchy.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-08: Coupling & Cohesion: The Twin Metrics of Clean Design
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop08",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop08-coupling-and-cohesion",
    lessonCode: "OOP-08",
    lessonTitle: "Coupling & Cohesion: The Twin Metrics of Clean Design",
    description: "Evaluate your mental model of high cohesion, low coupling, the Law of Demeter, and avoiding fragile train-wreck dot chains.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop08-q1",
        type: "multiple_choice",
        title: "Cohesion vs Coupling Definitions",
        prompt: "Which statement accurately defines High Cohesion and Low Coupling?",
        options: [
          "High Cohesion means all elements in a class are closely focused on a single responsibility; Low Coupling means classes have minimal, loose interdependencies so changes don't ripple",
          "High Cohesion means a class has at least 50 methods; Low Coupling means classes never communicate at all",
          "High Cohesion is for frontend React components; Low Coupling is strictly for database SQL tables",
          "They are identical terms that describe how many files exist in a directory"
        ],
        correctAnswer: 0,
        explanation: "High Cohesion: A class does one focused job well (e.g., a Chef cooks food). Low Coupling: Classes connect through simple contracts (e.g., Bluetooth headphones connect to any phone without knowing its internal circuits).",
        hint: "Cohesion is internal focus; Coupling is external connection tightness.",
        hintCostXP: 5,
      },
      {
        id: "oop08-q2",
        type: "code_output",
        title: "Law of Demeter & 'Tell, Don't Ask'",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Wallet {
  private balance: number;
  constructor(initial: number) { this.balance = initial; }

  deduct(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance(): number { return this.balance; }
}

class Customer {
  private wallet: Wallet;
  constructor(initialCash: number) {
    this.wallet = new Wallet(initialCash);
  }

  // Encapsulated action obeying Law of Demeter:
  pay(amount: number): boolean {
    return this.wallet.deduct(amount);
  }

  checkCash(): number {
    return this.wallet.getBalance();
  }
}

const customer = new Customer(100);
const paid = customer.pay(40);
console.log(\`Paid: \${paid} | Remaining: \${customer.checkCash()}\`);`,
        language: "typescript",
        options: [
          "Paid: true | Remaining: 60",
          "Paid: false | Remaining: 100",
          "Paid: true | Remaining: 100",
          "Error: Wallet is private"
        ],
        correctAnswer: 0,
        explanation: "The caller does not dig into customer.wallet.deduct(40). Instead, it calls customer.pay(40). Customer coordinates with its private wallet. 100 - 40 = 60 remaining cash.",
        hint: "The customer starts with 100 and pays 40 via the encapsulated pay() method.",
        hintCostXP: 5,
      },
      {
        id: "oop08-q3",
        type: "multiple_choice",
        title: "The Train Wreck Anti-Pattern",
        prompt: "Why is an expression like 'order.getCustomer().getAccount().getWallet().getCard().charge(50)' considered dangerous in clean architecture?",
        options: [
          "It violates the Law of Demeter by navigating 5 levels of internal structure; if any intermediary object changes its API or returns null, the entire caller crashes",
          "Because JavaScript limits dot chaining to a maximum of 2 dots per file",
          "Because chaining methods slows down internet bandwidth by 80%",
          "It forces the database to restart"
        ],
        correctAnswer: 0,
        explanation: "This is the classic 'Train Wreck' anti-pattern. The caller knows intimate details about the internal guts of Customer, Account, Wallet, and Card. If Account or Wallet changes, Order breaks.",
        hint: "Ask: How many different classes does the caller have to know about just to charge 50 dollars?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-09: Single Responsibility Principle (SRP)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop09",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop09-single-responsibility",
    lessonCode: "OOP-09",
    lessonTitle: "Single Responsibility Principle (SRP)",
    description: "Evaluate your understanding of isolating reasons to change, avoiding God classes, and separating business logic from persistence and presentation.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop09-q1",
        type: "multiple_choice",
        title: "Defining 'Reason to Change'",
        prompt: "According to Robert C. Martin (Uncle Bob), what does a 'reason to change' mean in the Single Responsibility Principle?",
        options: [
          "A reason to change corresponds to a specific actor or stakeholder requesting changes (e.g., CFO for financial calculations, DBA for database queries, UI designer for visual rendering)",
          "The number of times git commit is called on a file each week",
          "Every function must have exactly one line of code",
          "A class can only be edited by one developer per sprint"
        ],
        correctAnswer: 0,
        explanation: "SRP states that a class should have one, and only one, reason to change. Each reason maps to a different business role or stakeholder. If the Finance department requests a change, only the financial calculation class should be modified.",
        hint: "Think about who in an organization asks for a feature change: the accountant, the database administrator, or the UI designer?",
        hintCostXP: 5,
      },
      {
        id: "oop09-q2",
        type: "code_output",
        title: "Clean Separation of Concerns",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Invoice {
  private amount: number;
  constructor(amount: number) { this.amount = amount; }

  calculateWithTax(taxRate: number): number {
    return this.amount * (1 + taxRate);
  }
}

class InvoiceFormatter {
  formatCurrency(value: number): string {
    return \`$\${value.toFixed(2)}\`;
  }
}

const invoice = new Invoice(100);
const total = invoice.calculateWithTax(0.15); // 15% tax

const formatter = new InvoiceFormatter();
console.log(formatter.formatCurrency(total));`,
        language: "typescript",
        options: [
          "$115.00",
          "$100.00",
          "$15.00",
          "115"
        ],
        correctAnswer: 0,
        explanation: "Invoice handles financial calculation (100 * 1.15 = 115). InvoiceFormatter handles formatting the number into currency ('$115.00'). Each class has one focused job.",
        hint: "100 * (1 + 0.15) = 115. Then formatCurrency prepends '$' and adds 2 decimals.",
        hintCostXP: 5,
      },
      {
        id: "oop09-q3",
        type: "multiple_choice",
        title: "Deconstructing a 'God Class'",
        prompt: "If a single 'UserManager' class validates passwords, executes SQL INSERT statements, formats HTML confirmation emails, and writes audit logs to disk, what is the best architectural refactoring?",
        options: [
          "Split it into focused collaborators: PasswordValidator, UserRepository, UserEmailService, and AuditLogger",
          "Merge all methods into a single 500-line function with multiple switch statements",
          "Rename the class to 'ApplicationSuperGod' so other developers know it does everything",
          "Wrap the whole class in a try/catch block to prevent errors"
        ],
        correctAnswer: 0,
        explanation: "Under SRP, a God class is broken down into small, single-responsibility services. If email formatting changes, you edit UserEmailService without risking breakage in database queries or password checks.",
        hint: "Separate business validation, database storage, email notifications, and audit logging into independent classes.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-10: Open/Closed Principle (OCP)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop10",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop10-open-closed",
    lessonCode: "OOP-10",
    lessonTitle: "Open/Closed Principle (OCP)",
    description: "Evaluate your ability to design systems that are open for extension through new classes but closed for modification of battle-tested code.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop10-q1",
        type: "multiple_choice",
        title: "The Meaning of Open/Closed",
        prompt: "What does the phrase 'Open for extension, closed for modification' mean in practical software architecture?",
        options: [
          "You should be able to introduce new features and behaviors by writing new classes, without editing existing, tested, and deployed source code",
          "Your source code files must be made read-only on the operating system file system",
          "All functions must be marked public, but all variables must be marked private",
          "You must open-source your code while closing user registration"
        ],
        correctAnswer: 0,
        explanation: "OCP states that the core system should be closed to changes (so existing, battle-tested features cannot suffer regressions) while being open to extension via polymorphism, strategy classes, or plugins.",
        hint: "Think about an App Store: your phone's OS doesn't need to be rewritten to install a new app.",
        hintCostXP: 5,
      },
      {
        id: "oop10-q2",
        type: "code_output",
        title: "Extensible Notification Registry",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface Channel {
  send(msg: string): string;
}

class EmailChannel implements Channel {
  send(msg: string): string { return \`[Email: \${msg}]\`; }
}

class PushChannel implements Channel {
  send(msg: string): string { return \`[Push: \${msg}]\`; }
}

class Notifier {
  private channels: Channel[] = [];

  addChannel(c: Channel): void { this.channels.push(c); }

  broadcast(msg: string): string[] {
    return this.channels.map(c => c.send(msg));
  }
}

const notifier = new Notifier();
notifier.addChannel(new EmailChannel());
notifier.addChannel(new PushChannel());

const results = notifier.broadcast("System Alert");
console.log(results.join(" | "));`,
        language: "typescript",
        options: [
          "[Email: System Alert] | [Push: System Alert]",
          "[Push: System Alert] | [Email: System Alert]",
          "System Alert | System Alert",
          "undefined | undefined"
        ],
        correctAnswer: 0,
        explanation: "Notifier broadcasts to all registered channels polymorphically. Adding a new SmsChannel requires zero modifications to the Notifier class itself, fulfilling OCP.",
        hint: "Trace the channels added to the array in order: EmailChannel, then PushChannel.",
        hintCostXP: 5,
      },
      {
        id: "oop10-q3",
        type: "multiple_choice",
        title: "Eliminating Fragile Switch Statements",
        prompt: "A function has a 50-line switch statement calculating discounts based on customer status ('BRONZE', 'SILVER', 'GOLD'). Every new marketing tier requires editing this file. How should this be refactored to obey OCP?",
        options: [
          "Define a DiscountStrategy interface and create BronzeDiscount, SilverDiscount, and GoldDiscount classes; pass the strategy polymorphically",
          "Replace the switch statement with 10 nested ternary operators (? :)",
          "Store all discount percentages in global variables in index.html",
          "Delete the discount system and charge all customers the exact same price"
        ],
        correctAnswer: 0,
        explanation: "Replacing conditional branching (switches) with polymorphic strategy classes is the classic OCP refactoring. When marketing adds 'PLATINUM', you simply author a new PlatinumDiscount class without touching existing calculations.",
        hint: "Polymorphism replaces conditionals with independent, swappable classes.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-11: Liskov Substitution Principle (LSP)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop11",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop11-liskov-substitution",
    lessonCode: "OOP-11",
    lessonTitle: "Liskov Substitution Principle (LSP)",
    description: "Test your mastery of behavioral subtyping: ensuring derived classes fulfill all parent promises without throwing unexpected errors or breaking invariants.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop11-q1",
        type: "multiple_choice",
        title: "The Core Contract of LSP",
        prompt: "What is the primary requirement of the Liskov Substitution Principle (LSP)?",
        options: [
          "Objects of a subclass must be able to replace objects of the parent class without altering the correctness or expected behavior of the program",
          "Subclasses must always have fewer lines of code than their parent classes",
          "Every class must implement at least two distinct interfaces",
          "Subclasses must only be instantiated using the 'static' factory pattern"
        ],
        correctAnswer: 0,
        explanation: "Formulated by Barbara Liskov, LSP states that if S is a subtype of T, objects of type T may be replaced with objects of type S without altering any desirable properties of the program.",
        hint: "Subtypes must behave predictably when used anywhere the base type is expected.",
        hintCostXP: 5,
      },
      {
        id: "oop11-q2",
        type: "code_output",
        title: "The Classic Rectangle-Square Conundrum",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Rectangle {
  protected w: number = 0;
  protected h: number = 0;

  setWidth(width: number): void { this.w = width; }
  setHeight(height: number): void { this.h = height; }
  getArea(): number { return this.w * this.h; }
}

class Square extends Rectangle {
  override setWidth(width: number): void {
    this.w = width;
    this.h = width; // Enforce square invariant
  }
  override setHeight(height: number): void {
    this.w = height;
    this.h = height; // Enforce square invariant
  }
}

function resizeBox(rect: Rectangle): number {
  rect.setWidth(5);
  rect.setHeight(10);
  return rect.getArea();
}

const sq = new Square();
console.log(resizeBox(sq));`,
        language: "typescript",
        options: [
          "100",
          "50",
          "25",
          "Error: Invalid Square dimension"
        ],
        correctAnswer: 0,
        explanation: "The caller expects a Rectangle where setting width=5 and height=10 yields area 50. But Square's setHeight(10) silently overrides width to 10 as well, resulting in 10 * 10 = 100! This unexpected side effect breaks LSP.",
        hint: "Observe what Square's setHeight does to this.w when setHeight(10) is called second.",
        hintCostXP: 5,
      },
      {
        id: "oop11-q3",
        type: "multiple_choice",
        title: "The 'Not Supported' Anti-Pattern",
        prompt: "A developer creates a 'ReadOnlyRepository' that extends 'Repository', but overrides the 'delete()' method to throw new Error('Delete is not supported!'). Why is this an LSP violation?",
        options: [
          "Callers expecting a Repository assume delete() is valid; passing ReadOnlyRepository will crash existing code that calls delete()",
          "Because TypeScript forbids throwing errors inside class methods",
          "Because ReadOnlyRepository must always be declared as an abstract class",
          "Because the delete keyword in JavaScript can only be used on objects, not repositories"
        ],
        correctAnswer: 0,
        explanation: "When a child class refuses to perform an action promised by the parent interface (by throwing 'Not Supported'), it breaks the parent's contract. The correct architecture is to segregate into ReadOnlyRepository and MutableRepository.",
        hint: "Ask: What happens if an automated clean-up job loops through Repository[] and calls .delete()?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-12: Interface Segregation Principle (ISP)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop12",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop12-interface-segregation",
    lessonCode: "OOP-12",
    lessonTitle: "Interface Segregation Principle (ISP)",
    description: "Evaluate your mental model of client-tailored role interfaces: preventing bloated contracts that force classes to implement irrelevant dummy methods.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop12-q1",
        type: "multiple_choice",
        title: "The Core Mandate of ISP",
        prompt: "What is the core mandate of the Interface Segregation Principle (ISP)?",
        options: [
          "Clients should not be forced to depend on methods they do not use; lean, role-focused interfaces beat fat, monolithic ones",
          "Every TypeScript file must have at most one interface with at most one method",
          "Interfaces must only be implemented by abstract classes, never concrete classes",
          "All interface method names must begin with the word 'execute'"
        ],
        correctAnswer: 0,
        explanation: "ISP states that no client should be forced to depend on methods it does not use. Instead of one fat interface (like a 20-method MultiFunctionMachine), create smaller, focused role interfaces (Printer, Scanner, Fax).",
        hint: "Think about keeping restaurant menus small and relevant to the customer.",
        hintCostXP: 5,
      },
      {
        id: "oop12-q2",
        type: "code_output",
        title: "Role-Based Interface Segregation",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface Playable {
  play(): string;
}

interface Downloadable {
  download(): string;
}

class AudioStream implements Playable {
  play(): string { return "Playing live stream"; }
}

class PodcastEpisode implements Playable, Downloadable {
  play(): string { return "Playing podcast audio"; }
  download(): string { return "Saving mp3 offline"; }
}

function listen(player: Playable): string {
  return player.play();
}

const radio = new AudioStream();
const pod = new PodcastEpisode();

console.log(\`\${listen(radio)} | \${pod.download()}\`);`,
        language: "typescript",
        options: [
          "Playing live stream | Saving mp3 offline",
          "Playing podcast audio | Saving mp3 offline",
          "Playing live stream | Playing podcast audio",
          "Error: AudioStream cannot download"
        ],
        correctAnswer: 0,
        explanation: "AudioStream implements only Playable (it has no offline hardware). PodcastEpisode implements both Playable and Downloadable. The listen() function depends only on Playable. Clean ISP segregation!",
        hint: "listen(radio) executes radio.play(), while pod.download() executes download() on the podcast.",
        hintCostXP: 5,
      },
      {
        id: "oop12-q3",
        type: "multiple_choice",
        title: "Detecting Fat Interface Code Smells",
        prompt: "What is the most obvious code smell indicating that an interface violates the Interface Segregation Principle?",
        options: [
          "Multiple implementing classes have dummy methods containing empty bodies (return null) or throwing 'Method Not Implemented' exceptions",
          "An interface has generic type parameters (<T>)",
          "An interface is placed in a separate file inside a /types folder",
          "A class implements more than one interface simultaneously"
        ],
        correctAnswer: 0,
        explanation: "When implementing classes are forced to write dummy methods or throw 'Not Implemented' errors just to satisfy the compiler, the interface is too fat. It should be broken down into smaller, cohesive role interfaces.",
        hint: "Look for classes that are forced to implement methods they don't actually support.",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-13: Dependency Inversion Principle (DIP)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop13",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop13-dependency-inversion",
    lessonCode: "OOP-13",
    lessonTitle: "Dependency Inversion Principle (DIP)",
    description: "Evaluate your mental model of pluggable architectures: depending on abstractions rather than concrete vendor libraries, and using constructor injection.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop13-q1",
        type: "multiple_choice",
        title: "The Core Mandate of DIP",
        prompt: "What is the core mandate of the Dependency Inversion Principle (DIP)?",
        options: [
          "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces)",
          "All functions in TypeScript must be written in reverse chronological order",
          "Every database query must be executed synchronously before UI renders",
          "Child classes must always invert the boolean return values of parent methods"
        ],
        correctAnswer: 0,
        explanation: "DIP states that high-level business policies should never depend directly on low-level plumbing (like MySQL, Stripe, or AWS SES). Instead, both should depend on common abstractions (interfaces), allowing low-level tools to be swapped cleanly.",
        hint: "Think about electrical wall sockets: lamps plug into standard outlets, not directly into the city power generator.",
        hintCostXP: 5,
      },
      {
        id: "oop13-q2",
        type: "code_output",
        title: "Constructor Dependency Injection",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface Notifier {
  send(message: string): string;
}

class TestMockNotifier implements Notifier {
  public history: string[] = [];
  send(message: string): string {
    const formatted = \`[MOCK_DISPATCH]: \${message}\`;
    this.history.push(formatted);
    return formatted;
  }
}

class OnboardingService {
  constructor(private notifier: Notifier) {}

  welcomeUser(username: string): string {
    return this.notifier.send(\`Welcome aboard, \${username}!\`);
  }
}

const mock = new TestMockNotifier();
const service = new OnboardingService(mock);
const result = service.welcomeUser("DevAlex");

console.log(\`\${result} | Count: \${mock.history.length}\`);`,
        language: "typescript",
        options: [
          "[MOCK_DISPATCH]: Welcome aboard, DevAlex! | Count: 1",
          "[LIVE_DISPATCH]: Welcome aboard, DevAlex! | Count: 1",
          "Welcome aboard, DevAlex! | Count: 0",
          "Error: OnboardingService cannot resolve Notifier"
        ],
        correctAnswer: 0,
        explanation: "By injecting TestMockNotifier via the constructor, OnboardingService delegates dispatch to the mock. The mock formats the string and records it in history without requiring an external email network server.",
        hint: "Trace what TestMockNotifier.send returns and what it appends to this.history.",
        hintCostXP: 5,
      },
      {
        id: "oop13-q3",
        type: "multiple_choice",
        title: "Refactoring Hardwired Dependencies",
        prompt: "An OrderService class contains 'private paymentClient = new StripeClient(\"sk_live_123\");' in its constructor. Why does this violate DIP, and what is the proper refactoring?",
        options: [
          "It hardwires the business service to a concrete vendor; extract an IPaymentGateway interface and pass the gateway into the constructor",
          "Because StripeClient should be created as a global singleton variable in window",
          "Because StripeClient requires async/await syntax in class properties",
          "It does not violate DIP because Stripe is an external industry standard library"
        ],
        correctAnswer: 0,
        explanation: "Hardwiring 'new StripeClient()' tightly couples OrderService to Stripe, making unit testing impossible without live network calls. Extracting an IPaymentGateway interface allows passing Stripe in production and MockPaymentGateway in automated tests.",
        hint: "Ask: Can you write a fast unit test that runs in 2 milliseconds without hitting real credit cards?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-14: Common OOP Anti-Patterns & Code Smells
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop14",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop14-design-smells",
    lessonCode: "OOP-14",
    lessonTitle: "Common OOP Anti-Patterns & Code Smells",
    description: "Assess your ability to identify and eliminate common architectural anti-patterns: God Objects, Anemic Models, Primitive Obsession, and unnecessary OOP.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop14-q1",
        type: "multiple_choice",
        title: "Identifying the 'God Object'",
        prompt: "What is a 'God Object' (also known as the Blob anti-pattern) in software architecture?",
        options: [
          "A monolithic class that knows too much or does too much, accumulating dozens of responsibilities while other classes act as dumb data bags",
          "An object that connects to a cloud SQL database",
          "A class marked with the 'abstract' keyword in TypeScript",
          "An immutable value object representing currency or coordinates"
        ],
        correctAnswer: 0,
        explanation: "A God Object centralizes the system's logic into one massive class (e.g. 5,000 lines handling auth, billing, email, logging, and database queries), severely destroying cohesion, testability, and maintainability.",
        hint: "Think about an overloaded Swiss Army Knife that has 500 blades and is impossible to hold.",
        hintCostXP: 5,
      },
      {
        id: "oop14-q2",
        type: "code_output",
        title: "Value Object Invariant Enforcement",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `class Money {
  constructor(public readonly cents: number, public readonly currency: string) {
    if (cents < 0) throw new Error("Negative amount forbidden");
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(\`Currency mismatch: \${this.currency} vs \${other.currency}\`);
    }
    return new Money(this.cents + other.cents, this.currency);
  }

  format(): string {
    return \`\${(this.cents / 100).toFixed(2)} \${this.currency}\`;
  }
}

const itemA = new Money(1550, "USD");
const itemB = new Money(2450, "USD");
const total = itemA.add(itemB);

console.log(\`Total: \${total.format()} | Same Object: \${itemA === total}\`);`,
        language: "typescript",
        options: [
          "Total: 40.00 USD | Same Object: false",
          "Total: 4000.00 USD | Same Object: false",
          "Total: 40.00 USD | Same Object: true",
          "Error: Currency mismatch"
        ],
        correctAnswer: 0,
        explanation: "1550 cents + 2450 cents = 4000 cents ($40.00 USD). Because Money is an immutable Value Object, the add() method returns a brand-new instance, so itemA === total is false.",
        hint: "Divide 4000 by 100 to get dollar format, and remember that Value Objects return new instances upon mutation.",
        hintCostXP: 5,
      },
      {
        id: "oop14-q3",
        type: "multiple_choice",
        title: "When NOT to Use OOP",
        prompt: "When is it better to write a plain pure TypeScript function rather than creating an Object-Oriented class?",
        options: [
          "When you have stateless, mathematical transformations or pure utility pipelines (e.g. clamp(n, min, max), formatTimestamp(date))",
          "Whenever your project has more than 5 files",
          "Whenever you are working with Next.js Server Components",
          "Pure functions should never be used if TypeScript classes are available"
        ],
        correctAnswer: 0,
        explanation: "Not everything in software should be a class. Pure data transformations, math formulas, and string helpers with zero internal state belong in clean, pure functions. Forcing them into classes creates boilerplate 'MathUtils' classes with zero benefits.",
        hint: "Does a 3-line calculation need private state and a constructor?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-15: Pragmatic Design Patterns: Strategy & Factory
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop15",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop15-pragmatic-patterns",
    lessonCode: "OOP-15",
    lessonTitle: "Pragmatic Design Patterns: Strategy & Factory in Practice",
    description: "Evaluate your mental model of the two most universally used architectural design patterns: Strategy (swappable algorithms) and Factory (centralized instantiation).",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop15-q1",
        type: "multiple_choice",
        title: "Strategy vs Factory Roles",
        prompt: "How do the Strategy and Factory patterns complement each other in clean architecture?",
        options: [
          "The Factory centralizes the logic to instantiate the correct object, while the Strategy encapsulates the interchangeable algorithms that object executes",
          "Factory is only for frontend CSS, while Strategy is only for backend SQL",
          "Strategy forbids the use of interfaces, while Factory enforces them",
          "They are identical patterns with two different historical names"
        ],
        correctAnswer: 0,
        explanation: "Factory solves the 'Creation' problem (deciding which concrete class to instantiate based on environment or parameters). Strategy solves the 'Behavior' problem (executing interchangeable algorithms behind a uniform interface).",
        hint: "Think: Factory builds the tool; Strategy decides how the tool works.",
        hintCostXP: 5,
      },
      {
        id: "oop15-q2",
        type: "code_output",
        title: "Runtime Strategy Dispatch",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface TaxStrategy {
  calculateTax(subtotal: number): number;
}

class ZeroTax implements TaxStrategy {
  calculateTax(_subtotal: number): number { return 0; }
}

class StandardVat implements TaxStrategy {
  calculateTax(subtotal: number): number { return subtotal * 0.20; }
}

class TaxStrategyFactory {
  static create(country: "US" | "UK"): TaxStrategy {
    return country === "UK" ? new StandardVat() : new ZeroTax();
  }
}

const taxA = TaxStrategyFactory.create("UK").calculateTax(100);
const taxB = TaxStrategyFactory.create("US").calculateTax(100);

console.log(\`UK: \${taxA} | US: \${taxB}\`);`,
        language: "typescript",
        options: [
          "UK: 20 | US: 0",
          "UK: 120 | US: 100",
          "UK: 0 | US: 20",
          "Error: Unsupported country"
        ],
        correctAnswer: 0,
        explanation: "The factory produces StandardVat for 'UK' (100 * 0.20 = 20) and ZeroTax for 'US' (returns 0). The calling code is clean, declarative, and extensible.",
        hint: "StandardVat calculates 20% of 100, while ZeroTax always returns 0.",
        hintCostXP: 5,
      },
      {
        id: "oop15-q3",
        type: "multiple_choice",
        title: "Refactoring Sprawling Switch Statements",
        prompt: "An application has a 12-branch switch statement repeated across 4 controller files to instantiate different file exporter classes. What is the most maintainable refactoring?",
        options: [
          "Create a centralized ExporterFactory that returns an IFileExporter interface, removing duplicated instantiation logic across controllers",
          "Copy and paste the switch statement into a 5th file to increase redundancy",
          "Convert all exporter classes into a single 3,000-line God Object",
          "Replace all exporters with a shell script executed directly on the server"
        ],
        correctAnswer: 0,
        explanation: "Centralizing object creation into an ExporterFactory isolates callers from complex instantiation logic. Adding a 13th export format only requires updating the Factory and authoring the new strategy class.",
        hint: "Where should object creation logic live when multiple callers need the same objects?",
        hintCostXP: 5,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // OOP-16: Architectural Reasoning & Capstone Review
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "quiz-oop-oop16",
    trackKey: "oop",
    trackTitle: "Object-Oriented Programming",
    lessonSlug: "oop16-architectural-reasoning-capstone",
    lessonCode: "OOP-16",
    lessonTitle: "Architectural Reasoning & Capstone Review",
    description: "Synthesize the entire 16-lesson curriculum: combine the 4 pillars, composition, SOLID, and design patterns to architect robust real-world enterprise software.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "oop16-q1",
        type: "multiple_choice",
        title: "The Role of Aggregate Roots",
        prompt: "In clean Domain-Driven Architecture, what is the primary role of an Aggregate Root entity?",
        options: [
          "It acts as the single authoritative gateway that encapsulates and protects business invariants for an entire cluster of related objects",
          "It serves as a global database connection pool",
          "It converts all JSON responses into HTML tables automatically",
          "It automatically compiles TypeScript files to WebAssembly"
        ],
        correctAnswer: 0,
        explanation: "An Aggregate Root (such as an Order containing LineItems) encapsulates its internal domain objects. External code cannot reach into child items directly; all state changes must pass through methods on the Aggregate Root, guaranteeing domain invariants.",
        hint: "Think about the conductor of an orchestra: external callers coordinate through the conductor, not each musician individually.",
        hintCostXP: 5,
      },
      {
        id: "oop16-q2",
        type: "code_output",
        title: "Polymorphic Pipeline Execution",
        prompt: "What will be printed to the console when the following code executes?",
        codeSnippet: `interface PipelineStep {
  name: string;
  execute(data: string[]): void;
}

class TrimStep implements PipelineStep {
  name = "Trim";
  execute(data: string[]): void {
    data.push("TRIMMED");
  }
}

class UpperStep implements PipelineStep {
  name = "Upper";
  execute(data: string[]): void {
    data.push("UPPERCASED");
  }
}

class Pipeline {
  private steps: PipelineStep[] = [];
  add(step: PipelineStep): void { this.steps.push(step); }
  run(): string[] {
    const log: string[] = [];
    for (const step of this.steps) {
      step.execute(log);
    }
    return log;
  }
}

const pipeline = new Pipeline();
pipeline.add(new TrimStep());
pipeline.add(new UpperStep());
const output = pipeline.run();

console.log(output.join(" -> "));`,
        language: "typescript",
        options: [
          "TRIMMED -> UPPERCASED",
          "UPPERCASED -> TRIMMED",
          "Trim -> Upper",
          "Error: PipelineStep cannot mutate output"
        ],
        correctAnswer: 0,
        explanation: "The Pipeline executes each step in sequential order. TrimStep runs first pushing 'TRIMMED', followed by UpperStep pushing 'UPPERCASED'. The joined result is 'TRIMMED -> UPPERCASED'.",
        hint: "Follow the execution order of the steps registered in the pipeline.",
        hintCostXP: 5,
      },
      {
        id: "oop16-q3",
        type: "multiple_choice",
        title: "The Complete OOP Synthesis",
        prompt: "How do the 4 Pillars, Composition over Inheritance, and SOLID connect in professional software development?",
        options: [
          "Pillars define what objects are; Composition defines how they combine; SOLID defines how to structure their relationships for long-term maintainability",
          "They are mutually exclusive paradigms that cannot be used together in the same codebase",
          "SOLID replaced the 4 pillars in 2020, making classes and polymorphism obsolete",
          "Only backend languages like Java use SOLID; TypeScript only uses functional composition"
        ],
        correctAnswer: 0,
        explanation: "They build upon each other: Encapsulation and Abstraction protect your state and contracts; Inheritance and Polymorphism allow behavioral variation; Composition snaps components together like Legos; and SOLID provides architectural guardrails to prevent your codebase from rotting.",
        hint: "Think about the full learning journey: from basic object boundaries to enterprise architecture.",
        hintCostXP: 5,
      },
    ],
  },
];

