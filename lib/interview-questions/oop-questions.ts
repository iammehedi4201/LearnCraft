import { InterviewQuestion } from "@/types/interview";

export const OOP_QUESTIONS: InterviewQuestion[] = [
  {
    id: "oop-q01",
    trackKey: "oop",
    category: "SOLID & Design Principles",
    subtopic: "SOLID Principles",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain the SOLID principles with practical examples in TypeScript.",
    answer: `### Simple answer:
**SOLID** represents five essential object-oriented design principles that keep software maintainable, scalable, and easy to test as systems grow:

### 1. Single Responsibility Principle (SRP)
A class should have only **one reason to change**.
- *Violation:* A \`User\` class that holds user data, formats HTML for profile pages, and saves itself to the database.
- *Fix:* Separate into \`User\` model, \`UserRepository\` (database), and \`UserProfileRenderer\` (UI).

### 2. Open/Closed Principle (OCP)
Classes should be **open for extension, but closed for modification**.
- Add new features through polymorphism or interfaces without editing existing tested code.
- *Example:* A \`PaymentProcessor\` accepts an \`IPaymentMethod\` interface (CreditCard, PayPal, Crypto) rather than modifying a giant \`switch(type)\` statement every time a new payment provider is added.

### 3. Liskov Substitution Principle (LSP)
Subclasses must be substitutable for their base classes without breaking program correctness.
- *Classic Violation:* \`Square extends Rectangle\` where setting width also mutates height, breaking assumptions of code that expects independent sides.

### 4. Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they do not use.
- Prefer many small, focused interfaces (\`Printer\`, \`Scanner\`) over one fat monolithic interface (\`MultiFunctionMachineWithFaxPhotocopyEmail\`).

### 5. Dependency Inversion Principle (DIP)
High-level business modules should not depend on low-level implementation modules; both should depend on abstractions (interfaces).
- *Example:* Instead of \`OrderService\` directly importing \`new StripeClient()\`, inject an \`IPaymentGateway\` interface.

### Interview answer:
SOLID stands for: Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must honor parent contracts), Interface Segregation (small role interfaces over fat ones), and Dependency Inversion (depend on abstractions, not concrete implementations).`,
    followUps: [
      "Why is 'Composition over Inheritance' often preferred in modern software development?",
      "How does Dependency Inversion relate to Dependency Injection containers?",
      "Can SOLID principles be applied to functional programming?"
    ],
    keyPoints: [
      "S: Single reason to change",
      "O: Open for extension, closed for modification",
      "L: Subtypes must preserve behavior contracts of parents",
      "I: Small role-based interfaces over fat interfaces",
      "D: Depend on abstractions, not concrete implementations"
    ],
    tags: ["oop", "solid", "design-patterns", "architecture", "typescript"],
    relatedLessonSlug: "/learn/oop/oop05-solid-principles",
    relatedLessonName: "OOP-05: SOLID Principles in TypeScript"
  },
  {
    id: "oop-q02",
    trackKey: "oop",
    category: "Fundamentals",
    subtopic: "Four Pillars",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What are the Four Pillars of Object-Oriented Programming (OOP)?",
    answer: `### Simple answer:
The four foundational pillars of Object-Oriented Programming are:

1. **Encapsulation:**
   Bundling data (properties) and methods that operate on that data inside a class, while restricting direct access to internal state (using \`private\` or \`#private\`).
   - *Analogy:* A capsule pill containing medicine; consumers take the pill through its public interface without manipulating internal chemicals directly.

2. **Abstraction:**
   Hiding internal implementation complexity and exposing only essential interfaces to consumers.
   - *Analogy:* Driving a car using the steering wheel and gas pedal without needing to know the mechanical firing order of the engine pistons.

3. **Inheritance:**
   Allowing a child class to inherit properties and methods from a parent class to promote code reuse (\`class Dog extends Animal\`).

4. **Polymorphism:**
   The ability of different classes to respond to the same method call in their own specific way through method overriding or interface implementation.
   - *Example:* \`Dog.makeSound()\` barks while \`Cat.makeSound()\` meows, but both can be treated uniformly as \`Animal\`.

### Interview answer:
The four pillars of OOP are Encapsulation (hiding internal state and bundling methods), Abstraction (hiding complex implementation behind simple interfaces), Inheritance (reusing code across parent and child classes), and Polymorphism (different classes implementing the same interface or method uniquely).`,
    followUps: [
      "What is the difference between compile-time polymorphism (overloading) and runtime polymorphism (overriding)?",
      "Why has the industry shifted from heavy Inheritance toward Composition?",
      "How does TypeScript implement private fields compared to ECMAScript #private fields?"
    ],
    keyPoints: [
      "Encapsulation hides internal data and exposes controlled methods",
      "Abstraction hides implementation complexity behind high-level interfaces",
      "Inheritance reuses code from base classes",
      "Polymorphism allows different objects to share a common interface with unique behaviors"
    ],
    tags: ["oop", "four-pillars", "encapsulation", "abstraction", "polymorphism"],
    relatedLessonSlug: "/learn/oop/oop01-four-pillars",
    relatedLessonName: "OOP-01: The Four Pillars of Object-Oriented Programming"
  },
  {
    id: "oop-q03",
    trackKey: "oop",
    category: "Design Principles",
    subtopic: "Composition vs Inheritance",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "Why is 'Favor Composition over Inheritance' a cornerstone principle of modern software engineering?",
    answer: `### Simple answer:
Inheritance creates an **"is-a"** relationship (\`Dog is an Animal\`), while Composition creates a **"has-a"** relationship (\`Car has an Engine\`).
Favoring composition means building complex objects by assembling smaller, interchangeable components rather than building deep, brittle class inheritance hierarchies.

### The Problems with Deep Inheritance:
1. **The Fragile Base Class Problem:** Changing a single method in a parent class can unintentionally break dozens of subclasses.
2. **Tight Coupling:** Subclasses inherit all parent behaviors, even ones they do not want or need (e.g. \`Penguin extends Bird\` inherits \`fly()\`, which it cannot do!).
3. **Rigid at Runtime:** Inheritance relationships are locked at compile time and cannot change dynamically.

### Example: Composition in TypeScript
\`\`\`typescript
// Interfaces for behaviors (has-a):
interface Flyer { fly(): void; }
interface Swimmer { swim(): void; }

class Wings implements Flyer {
  fly() { console.log("Flying in the sky!"); }
}

class Fins implements Swimmer {
  swim() { console.log("Swimming in the ocean!"); }
}

// Duck composes both behaviors:
class Duck {
  constructor(private flyer: Flyer, private swimmer: Swimmer) {}

  quackAndFly() {
    this.flyer.fly();
    this.swimmer.swim();
  }
}
\`\`\`

### Interview answer:
Deep inheritance creates tight coupling where base class changes risk breaking all subclasses. Composition ("has-a" instead of "is-a") builds functionality by combining small, interchangeable objects, providing greater flexibility, easier unit testing, and the ability to swap behaviors dynamically at runtime.`,
    followUps: [
      "What is the Diamond Problem in multiple inheritance and how does composition avoid it?",
      "When IS inheritance still appropriate?",
      "How do Mixins work in TypeScript?"
    ],
    keyPoints: [
      "Inheritance represents 'is-a'; Composition represents 'has-a'",
      "Avoids the Fragile Base Class problem and tight coupling",
      "Enables swapping component implementations dynamically at runtime",
      "Makes unit testing with mock components straightforward"
    ],
    tags: ["composition", "inheritance", "composition-over-inheritance", "design-principles"],
    relatedLessonSlug: "/learn/oop/oop02-composition-over-inheritance",
    relatedLessonName: "OOP-02: Composition vs Inheritance & The Fragile Base Class"
  },
  {
    id: "oop-q04",
    trackKey: "oop",
    category: "Encapsulation & Modifiers",
    subtopic: "Access Modifiers",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Explain Access Modifiers in TypeScript (`public`, `private`, `protected`) and compare them to ECMAScript private fields (`#field`).",
    answer: `### Simple answer:
Access modifiers control the visibility of class members (properties and methods):

- **\`public\` (Default):** Accessible from anywhere (inside the class, subclasses, and external code).
- **\`protected\`:** Accessible only **within the class and its subclasses**. Inaccessible to external callers.
- **\`private\` (TypeScript keyword):** Accessible **only within the declaring class**. Inaccessible to subclasses and external callers.

### TypeScript \`private\` vs ECMAScript \`#private\`:
- **TypeScript \`private\`:** Enforced **only at compile time**. At runtime in compiled JavaScript, the property is just a normal public property and can still be accessed via \`obj["secret"]\`!
- **ECMAScript \`#private\` (Hard Private):** Enforced at the **runtime JavaScript engine level**. Any external access throws a real \`SyntaxError\` or \`TypeError\` at runtime.

### Example:
\`\`\`typescript
class BankAccount {
  public accountNumber: string;
  protected balance: number;
  private pin: string;          // Compile-time private
  #encryptionKey: string;       // True runtime hard private

  constructor(acc: string, bal: number, pin: string, key: string) {
    this.accountNumber = acc;
    this.balance = bal;
    this.pin = pin;
    this.#encryptionKey = key;
  }
}
\`\`\`

### Interview answer:
\`public\` members are accessible everywhere, \`protected\` is accessible within the class and subclasses, and \`private\` is restricted to the declaring class. While TypeScript's \`private\` modifier is compile-time only, ECMAScript hash private fields (\`#field\`) guarantee true hard privacy enforced at runtime by the JavaScript engine.`,
    followUps: [
      "What is parameter property shorthand in TypeScript constructors (e.g. constructor(public name: string))?",
      "Can protected methods be overridden by subclasses?",
      "Why was #private added to the ECMAScript standard if TypeScript already had the private keyword?"
    ],
    keyPoints: [
      "public: accessible everywhere",
      "protected: accessible within class and subclasses",
      "private: compile-time restriction to declaring class only",
      "#field: native JavaScript runtime private field that cannot be accessed externally"
    ],
    tags: ["access-modifiers", "encapsulation", "private-fields", "typescript"],
    relatedLessonSlug: "/learn/oop/oop01-four-pillars",
    relatedLessonName: "OOP-01: The Four Pillars of Object-Oriented Programming"
  },
  {
    id: "oop-q05",
    trackKey: "oop",
    category: "Abstraction & Contracts",
    subtopic: "Abstract Classes vs Interfaces",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between an Abstract Class and an Interface in TypeScript? When should you use each?",
    answer: `### Simple answer:
- **Interface:** A pure contract containing **zero implementation code**. It generates **0 KB** of compiled JavaScript. A class can implement multiple interfaces.
- **Abstract Class:** A blueprint that can provide **both abstract method contracts AND concrete shared implementation code** (default methods, constructors). It persists as a real class in compiled JavaScript. A class can only extend one abstract class.

### Comparison Table:
| Feature | Interface | Abstract Class |
|---|---|---|
| **Can contain method implementations?** | ❌ No | **Yes** (mix of abstract & implemented methods) |
| **Generates runtime JavaScript?** | ❌ No (erased during build) | **Yes** (compiles to JS class) |
| **Multiple inheritance?** | **Yes** (\`implements A, B, C\`) | ❌ No (single inheritance \`extends\`) |
| **Can have a constructor?** | ❌ No | **Yes** |
| **Primary Use Case** | Pure data shapes & API contracts | Base classes providing shared reusable logic |

### Example:
\`\`\`typescript
abstract class DatabaseLogger {
  // Concrete shared method with implementation:
  log(message: string) {
    const formatted = \`[\${new Date().toISOString()}] \${message}\`;
    this.write(formatted);
  }

  // Abstract method child classes must implement:
  abstract write(formattedMessage: string): void;
}

class ConsoleLogger extends DatabaseLogger {
  write(formattedMessage: string) {
    console.log(formattedMessage);
  }
}
\`\`\`

### Interview answer:
An interface is a compile-time-only type contract with no runtime code or implementations, and classes can implement multiple interfaces. An abstract class is a real class that can provide shared implementation code and state alongside abstract methods that subclasses must implement, but supports only single inheritance.`,
    followUps: [
      "What is the Template Method pattern and how does it use abstract classes?",
      "Can an abstract class implement an interface?",
      "Why can't you instantiate an abstract class directly with `new`?"
    ],
    keyPoints: [
      "Interfaces contain zero implementation code and produce zero compiled JS",
      "Abstract classes can provide concrete methods and state alongside abstract method declarations",
      "Classes can implement multiple interfaces, but extend only one abstract class",
      "Abstract classes cannot be instantiated directly with new"
    ],
    tags: ["abstract-classes", "interfaces", "contracts", "oop-fundamentals"],
    relatedLessonSlug: "/learn/oop/oop03-abstract-classes-vs-interfaces",
    relatedLessonName: "OOP-03: Abstract Classes vs Interfaces & Contract Design"
  },
  {
    id: "oop-q06",
    trackKey: "oop",
    category: "Creational Patterns",
    subtopic: "Singleton Pattern",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you implement the Singleton Pattern in TypeScript, and why is it often considered an anti-pattern?",
    answer: `### Simple answer:
The **Singleton Pattern** ensures that a class has **only one instance** throughout the application lifecycle and provides a global access point to that instance.

### TypeScript Implementation:
\`\`\`typescript
export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;

  // 1. Private constructor prevents 'new DatabaseConnection()' from outside:
  private constructor() {
    console.log("Connecting to database pool...");
  }

  // 2. Static method to get or create the single instance:
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string) {
    return \`Executing \${sql}\`;
  }
}

// Usage:
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true (exact same instance!)
\`\`\`

### Why it is often considered an Anti-Pattern:
1. **Hidden Global State:** Functions accessing a singleton have hidden dependencies that make tracking bugs difficult.
2. **Breaks Unit Testing:** You cannot easily inject mock instances during tests because the class hardcodes its own instance access.
3. **Violates Single Responsibility Principle:** The class controls both its business logic AND its own lifecycle management.
4. **Modern Alternative:** Use **Dependency Injection (DI)** containers (like in NestJS), where classes are registered as singletons without hardcoding the Singleton pattern inside the class itself.

### Interview answer:
The Singleton pattern restricts class instantiation to a single object using a private constructor and a static \`getInstance()\` method. While useful for resources like connection pools or loggers, it is often viewed as an anti-pattern because it introduces global state and hinders unit testing; modern frameworks prefer managing singletons through Dependency Injection instead.`,
    followUps: [
      "How do Node.js ES Modules naturally act as singletons when imported?",
      "How do you implement thread-safe singletons with double-checked locking in multi-threaded languages?",
      "How does Dependency Injection solve the testability problem of singletons?"
    ],
    keyPoints: [
      "Private constructor prevents external instantiation",
      "Static getInstance() method provides global access to the single instance",
      "Can cause tight coupling and impede unit testing with mocks",
      "Prefer Dependency Injection containers for managing singletons in enterprise apps"
    ],
    tags: ["singleton", "design-patterns", "creational-patterns", "anti-patterns"],
    relatedLessonSlug: "/learn/oop/oop04-design-patterns-creational",
    relatedLessonName: "OOP-04: Creational Design Patterns in TypeScript"
  },
  {
    id: "oop-q07",
    trackKey: "oop",
    category: "Creational Patterns",
    subtopic: "Factory Pattern",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the Factory Method Pattern in TypeScript, and how does it adhere to the Open/Closed Principle?",
    answer: `### Simple answer:
The **Factory Method Pattern** provides an interface or method for creating objects, but allows subclasses or factory methods to decide which concrete class to instantiate. It decouples object creation from object usage.

### Problem it solves:
Without a factory, code is littered with \`new CreditCardPayment()\`, \`new PayPalPayment()\`, and giant \`switch\` statements. Whenever you add a new payment method, you have to find and modify every file where payments are created (violating the Open/Closed Principle).

### Factory Example:
\`\`\`typescript
// Common Interface:
interface NotificationService {
  send(message: string): void;
}

class EmailNotification implements NotificationService {
  send(msg: string) { console.log(\`Sending Email: \${msg}\`); }
}

class SMSNotification implements NotificationService {
  send(msg: string) { console.log(\`Sending SMS: \${msg}\`); }
}

// Factory:
class NotificationFactory {
  static create(type: "email" | "sms"): NotificationService {
    switch (type) {
      case "email": return new EmailNotification();
      case "sms": return new SMSNotification();
      default: throw new Error("Invalid notification type");
    }
  }
}

// Client code only cares about the interface:
const service = NotificationFactory.create("email");
service.send("Your order has shipped!");
\`\`\`

### Interview answer:
The Factory Pattern encapsulates object instantiation behind a method or class. Client code depends only on a common interface rather than concrete class constructors, promoting the Open/Closed Principle by allowing new types to be introduced without modifying the consuming code.`,
    followUps: [
      "What is the difference between Simple Factory, Factory Method, and Abstract Factory?",
      "How does the Abstract Factory pattern produce families of related objects?",
      "When is a factory overkill compared to directly using 'new'?"
    ],
    keyPoints: [
      "Decouples object creation from business logic usage",
      "Consumers interact with common interfaces rather than concrete constructors",
      "Enforces the Open/Closed Principle by isolating creation logic",
      "Supports dynamic selection of object types based on runtime config"
    ],
    tags: ["factory-pattern", "design-patterns", "creational-patterns", "open-closed"],
    relatedLessonSlug: "/learn/oop/oop04-design-patterns-creational",
    relatedLessonName: "OOP-04: Creational Design Patterns in TypeScript"
  },
  {
    id: "oop-q08",
    trackKey: "oop",
    category: "Behavioral Patterns",
    subtopic: "Observer vs Pub-Sub",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the Observer Pattern, and how does it differ from the Publisher-Subscriber (Pub-Sub) Pattern?",
    answer: `### Simple answer:
Both patterns enable one-to-many event notifications, but they differ in how tightly coupled the sender and receiver are:

- **Observer Pattern:** The Subject **directly maintains** a list of Observers and notifies them directly. The Subject knows about its observers.
- **Publisher-Subscriber (Pub-Sub):** The Publisher and Subscriber **never know about each other**. They communicate through an independent intermediary **Message Broker / Event Bus** (like Redis Pub/Sub, Kafka, or Node's EventEmitter).

### Comparison:
| Feature | Observer Pattern | Publisher-Subscriber (Pub-Sub) |
|---|---|---|
| **Coupling** | Direct coupling (Subject holds references to Observers) | **Zero direct coupling** (broker handles distribution) |
| **Execution** | Usually synchronous in-memory | Asynchronous, often cross-network / distributed |
| **Components** | 2 entities: Subject & Observer | 3 entities: Publisher, Broker, Subscriber |

### Observer Pattern Implementation:
\`\`\`typescript
interface Observer {
  update(data: string): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(o: Observer) { this.observers.push(o); }
  detach(o: Observer) { this.observers = this.observers.filter(obs => obs !== o); }

  notify(data: string) {
    this.observers.forEach(o => o.update(data)); // Direct notification!
  }
}
\`\`\`

### Interview answer:
In the Observer pattern, the subject directly tracks and notifies its observers in memory. In Pub-Sub, publishers and subscribers are completely decoupled through an intermediary event channel or message broker, making Pub-Sub ideal for distributed architectures and microservices.`,
    followUps: [
      "How is React's state subscription model related to the Observer pattern?",
      "Why is Pub-Sub preferred over Observer in microservice architectures?",
      "What are the memory leak risks with forgotten observer subscriptions?"
    ],
    keyPoints: [
      "Observer: direct subject-to-observer relationship in memory",
      "Pub-Sub: completely decoupled through an event broker or message channel",
      "Pub-Sub supports distributed cross-service messaging (Redis/Kafka)",
      "Must clean up subscriptions to prevent memory leaks"
    ],
    tags: ["observer-pattern", "pub-sub", "design-patterns", "behavioral-patterns"],
    relatedLessonSlug: "/learn/oop/oop06-design-patterns-behavioral",
    relatedLessonName: "OOP-06: Behavioral Design Patterns & Event Architecture"
  },
  {
    id: "oop-q09",
    trackKey: "oop",
    category: "Behavioral Patterns",
    subtopic: "Strategy Pattern",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does the Strategy Pattern eliminate complex conditional statements (`if/else` and `switch`) in TypeScript?",
    answer: `### Simple answer:
The **Strategy Pattern** defines a family of interchangeable algorithms, encapsulates each algorithm in its own class, and makes them swappable at runtime.

### Problem: Giant nested \`switch\` statements:
\`\`\`typescript
// BAD: Violates Open/Closed Principle
function calculateShipping(type: string, weight: number) {
  if (type === "fedex") return weight * 1.5;
  if (type === "ups") return weight * 1.8;
  if (type === "dhl") return weight * 2.2;
}
\`\`\`

### Solution with Strategy Pattern:
\`\`\`typescript
// 1. Strategy Interface:
interface ShippingStrategy {
  calculate(weight: number): number;
}

// 2. Concrete Strategies:
class FedExStrategy implements ShippingStrategy {
  calculate(weight: number) { return weight * 1.5; }
}
class UPSStrategy implements ShippingStrategy {
  calculate(weight: number) { return weight * 1.8; }
}
class DHLStrategy implements ShippingStrategy {
  calculate(weight: number) { return weight * 2.2; }
}

// 3. Context:
class ShippingContext {
  constructor(private strategy: ShippingStrategy) {}

  // Swap strategy dynamically at runtime!
  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  getCost(weight: number) {
    return this.strategy.calculate(weight);
  }
}

// Usage:
const shipping = new ShippingContext(new FedExStrategy());
console.log(shipping.getCost(10)); // 15
shipping.setStrategy(new DHLStrategy());
console.log(shipping.getCost(10)); // 22
\`\`\`

### Interview answer:
The Strategy pattern encapsulates interchangeable algorithms into separate classes that implement a common interface. It replaces fragile \`if/else\` logic with composition, allowing algorithms (like pricing, sorting, or validation strategies) to be swapped dynamically at runtime without modifying the calling context.`,
    followUps: [
      "How does Passport.js use the Strategy pattern for authentication (Local, Google, JWT)?",
      "How does the Strategy pattern compare to the State pattern?",
      "Can functions replace strategy classes in functional TypeScript?"
    ],
    keyPoints: [
      "Encapsulates interchangeable algorithms behind a common interface",
      "Replaces giant if/else and switch blocks with polymorphism",
      "Supports changing strategies dynamically at runtime",
      "Passport.js authentication strategies is a prominent real-world example"
    ],
    tags: ["strategy-pattern", "design-patterns", "behavioral-patterns", "refactoring"],
    relatedLessonSlug: "/learn/oop/oop06-design-patterns-behavioral",
    relatedLessonName: "OOP-06: Behavioral Design Patterns & Event Architecture"
  },
  {
    id: "oop-q10",
    trackKey: "oop",
    category: "Structural Patterns",
    subtopic: "Adapter vs Facade",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between the Adapter Pattern and the Facade Pattern in software design?",
    answer: `### Simple answer:
Both patterns sit between your application and external systems, but they solve different problems:

- **Adapter Pattern:** Translates an **incompatible interface** into an interface your application expects (like a physical plug adapter for travel). Converts one interface to another.
- **Facade Pattern:** Provides a **simplified, high-level interface** over a complex subsystem containing many classes and steps (like a car's ignition key hiding starters, fuel injection, and electronics).

### Comparison:
| Feature | Adapter Pattern | Facade Pattern |
|---|---|---|
| **Primary Goal** | Interface compatibility (make incompatible APIs work together) | Simplicity (hide subsystem complexity) |
| **Existing Interface** | Adapts an **existing** interface | Defines a **brand new** simplified interface |
| **Real-world Example** | Wrapping an older Axios client to look like modern \`fetch\` | A \`CheckoutFacade\` that calls Inventory, Payment, Shipping, and Email services in one method |

### Adapter Example:
\`\`\`typescript
// Legacy third-party library:
class LegacyXmlLogger {
  logXml(xml: string) { console.log("XML log:", xml); }
}

// Our modern app interface:
interface AppLogger {
  log(message: string): void;
}

// Adapter:
class XmlLoggerAdapter implements AppLogger {
  constructor(private legacyLogger: LegacyXmlLogger) {}
  log(message: string) {
    const xml = \`<log>\${message}</log>\`;
    this.legacyLogger.logXml(xml); // translates call!
  }
}
\`\`\`

### Interview answer:
An Adapter bridges two incompatible interfaces, translating calls from one format to another without changing underlying logic. A Facade creates a unified, simplified high-level interface over a complex subsystem composed of multiple classes to make it easy to use.`,
    followUps: [
      "When wrapping third-party SDKs, should you use an Adapter or a Facade?",
      "How does the Proxy pattern differ from an Adapter?",
      "Can a Facade also act as an Adapter?"
    ],
    keyPoints: [
      "Adapter converts an incompatible interface into an expected interface",
      "Facade simplifies a complex multi-class subsystem into a single friendly API",
      "Adapters make existing code compatible; Facades create new simpler abstractions",
      "Essential for shielding core application code from third-party vendor churn"
    ],
    tags: ["adapter-pattern", "facade-pattern", "structural-patterns", "design-patterns"],
    relatedLessonSlug: "/learn/oop/oop07-design-patterns-structural",
    relatedLessonName: "OOP-07: Structural Design Patterns & System Decoupling"
  },
  {
    id: "oop-q11",
    trackKey: "oop",
    category: "Structural Patterns",
    subtopic: "Decorator Pattern",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the Decorator Pattern, and how does it allow dynamically adding behavior to objects without inheritance?",
    answer: `### Simple answer:
The **Decorator Pattern** allows behavior to be added to individual objects dynamically at runtime by wrapping them in decorator classes that implement the same interface, without modifying the original class or creating subclasses for every combination.

### The Problem with Inheritance for Combinations:
If you have a \`Coffee\` class and want combinations of Milk, Sugar, and Caramel, using inheritance causes a combinatorial explosion of subclasses (\`CoffeeWithMilk\`, \`CoffeeWithMilkAndSugar\`, \`CoffeeWithSugarAndCaramel\`).

### Decorator Pattern Solution:
\`\`\`typescript
interface Beverage {
  cost(): number;
  description(): string;
}

// Base Component:
class SimpleCoffee implements Beverage {
  cost() { return 2.0; }
  description() { return "Coffee"; }
}

// Base Decorator:
abstract class BeverageDecorator implements Beverage {
  constructor(protected beverage: Beverage) {}
  abstract cost(): number;
  abstract description(): string;
}

// Concrete Decorator 1:
class MilkDecorator extends BeverageDecorator {
  cost() { return this.beverage.cost() + 0.5; }
  description() { return \`\${this.beverage.description()}, Milk\`; }
}

// Concrete Decorator 2:
class SugarDecorator extends BeverageDecorator {
  cost() { return this.beverage.cost() + 0.2; }
  description() { return \`\${this.beverage.description()}, Sugar\`; }
}

// Dynamic wrapping at runtime:
let myCoffee: Beverage = new SimpleCoffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);

console.log(myCoffee.description()); // "Coffee, Milk, Sugar"
console.log(myCoffee.cost());        // 2.7
\`\`\`

### Interview answer:
The Decorator pattern attaches additional responsibilities to an object dynamically by wrapping it inside decorator classes that implement the same interface. It provides an extensible alternative to subclassing, avoiding a combinatorial explosion of inheritance classes.`,
    followUps: [
      "How do TypeScript experimental decorators (@Decorator) relate to the classic OOP Decorator pattern?",
      "What is the difference between the Decorator pattern and the Proxy pattern?",
      "How is middleware in Express or Redux conceptually similar to decorators?"
    ],
    keyPoints: [
      "Wraps objects dynamically with additional behaviors at runtime",
      "Decorators implement the same interface as the wrapped object",
      "Prevents class explosion caused by subclassing every feature combination",
      "Closely related to middleware pipelines and higher-order functions"
    ],
    tags: ["decorator-pattern", "structural-patterns", "design-patterns", "extensibility"],
    relatedLessonSlug: "/learn/oop/oop07-design-patterns-structural",
    relatedLessonName: "OOP-07: Structural Design Patterns & System Decoupling"
  },
  {
    id: "oop-q12",
    trackKey: "oop",
    category: "Architecture & Dependency Inversion",
    subtopic: "Dependency Inversion Principle",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "Explain the Dependency Inversion Principle (DIP) and how Dependency Injection Containers implement Inversion of Control.",
    answer: `### Simple answer:
The **Dependency Inversion Principle (DIP)** states:
1. High-level modules (business logic) should not depend on low-level modules (database drivers, network clients). Both should depend on **abstractions** (interfaces).
2. Abstractions should not depend on details; details should depend on abstractions.

### What is Inversion of Control (IoC)?
Traditionally, high-level code controls execution and instantiates low-level classes (\`new PostgresClient()\`).
With IoC, that control is **inverted**: a framework or container is responsible for managing object lifecycles and injecting required dependencies.

### Code Demonstration:
\`\`\`typescript
// 1. Abstraction (Interface owned by core domain):
interface PaymentGateway {
  charge(amount: number): Promise<boolean>;
}

// 2. High-level business logic depends ONLY on interface:
class CheckoutService {
  constructor(private paymentGateway: PaymentGateway) {}

  async completeOrder(total: number) {
    const success = await this.paymentGateway.charge(total);
    if (!success) throw new Error("Payment failed");
    return { status: "paid" };
  }
}

// 3. Low-level concrete implementations (Details):
class StripeAdapter implements PaymentGateway {
  async charge(amount: number) { /* Stripe API call */ return true; }
}

class MockPaymentAdapter implements PaymentGateway {
  async charge(amount: number) { /* Instant mock test */ return true; }
}
\`\`\`

### Testing benefit:
You can unit test \`CheckoutService\` in milliseconds using \`MockPaymentAdapter\` with zero real Stripe network calls!

### Interview answer:
Dependency Inversion dictates that high-level business rules must depend on abstract interfaces rather than concrete low-level implementations. Inversion of Control containers (like NestJS) resolve these dependencies automatically, making applications modular, flexible to vendor changes, and easily testable.`,
    followUps: [
      "What is the difference between Dependency Inversion (principle), Inversion of Control (pattern), and Dependency Injection (technique)?",
      "How does Hexagonal / Clean Architecture rely on Dependency Inversion?",
      "Why should the interface definition live with the consumer module rather than the implementation provider?"
    ],
    keyPoints: [
      "High-level policy should not depend on low-level mechanism details",
      "Both high-level and low-level modules depend on shared abstractions (interfaces)",
      "Inversion of Control inverts lifecycle management to a container",
      "Foundational principle behind Clean Architecture and Hexagonal Architecture"
    ],
    tags: ["dependency-inversion", "solid", "inversion-of-control", "clean-architecture", "architecture"],
    relatedLessonSlug: "/learn/oop/oop05-solid-principles",
    relatedLessonName: "OOP-05: SOLID Principles in TypeScript"
  }
];
