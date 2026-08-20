"use client";

import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  Divider,
  ComparisonTable,
  InfoCallout,
} from "./shared-components";

export function OopPrinciplesSection() {
  return (
    <SectionContainer number={5} title="The Four OOP Principles">

      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
          Object-Oriented Programming is built on <strong>four main pillars</strong>. Every serious OOP programmer must understand these four ideas:
        </p>
        <div className="flex flex-wrap gap-2">
          {["1. Encapsulation", "2. Abstraction", "3. Inheritance", "4. Polymorphism"].map((p) => (
            <span key={p} className="text-xs font-bold px-3 py-1.5 rounded-full bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark shadow-sm">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PILLAR 1: ENCAPSULATION                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🔒</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Pillar 1: Encapsulation</h3>
        </div>

        <TopicHeader
          number="E"
          title="What is Encapsulation?"
          description='Encapsulation means keeping an object data protected and controlling how other code can change that data. Instead of letting anyone touch your data directly, you create "guard" methods that check the rules first.'
          color="emerald"
        />

        <AnalogyBox emoji="🏧" title="Think about it like this">
          <p>Think of an ATM machine. You cannot reach inside and grab the cash. You must use the buttons and screen (the public interface). The machine checks your PIN, verifies your balance, and only THEN gives you money. The cash is <strong>hidden</strong> (private), and the buttons are the <strong>safe way</strong> (public methods) to interact with it.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Encapsulation in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class BankAccount {
  private balance: number;  // 🔒 Private field! Only accessible inside this class

  constructor(public owner: string, initialBalance: number) {
    this.balance = initialBalance;
  }

  // Safe way to add money with validation
  deposit(amount: number) {
    if (amount <= 0) {
      console.log("❌ Deposit amount must be positive!");
      return;
    }
    this.balance += amount;
    console.log("✅ Deposited $" + amount + ". New balance: $" + this.balance);
  }

  // Safe way to withdraw with validation
  withdraw(amount: number) {
    if (amount <= 0) {
      console.log("❌ Withdrawal amount must be positive!");
      return;
    }
    if (amount > this.balance) {
      console.log("❌ Insufficient funds! Current balance: $" + this.balance);
      return;
    }
    this.balance -= amount;
    console.log("✅ Withdrew $" + amount + ". Remaining balance: $" + this.balance);
  }

  // Read-only getter
  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Mehedi", 1000);
account.deposit(500);
account.withdraw(200);
account.withdraw(5000); // ❌ Insufficient funds!
console.log(account.owner + "'s verified balance: $" + account.getBalance());`}
            height="380px"
          />
        </div>

        {/* ── TypeScript Access Modifiers ── */}
        <div className="mb-8">
          <SectionHeading>🔑 TypeScript Access Modifiers: public, protected, private</SectionHeading>
          <p className="text-sm text-ds-text-sub mb-4 leading-relaxed">
            In TypeScript, you can control visibility using access modifiers on class properties and methods:
          </p>

          <ComparisonTable
            headers={["Modifier", "Accessible Inside Class?", "Accessible in Subclasses?", "Accessible Outside Class?"]}
            rows={[
              ["public (default)", "✅ Yes", "✅ Yes", "✅ Yes (Anywhere)"],
              ["protected", "✅ Yes", "✅ Yes (Subclasses)", "❌ No (Hidden outside)"],
              ["private", "✅ Yes", "❌ No (Only this class)", "❌ No (Hidden outside)"],
            ]}
          />

          <div className="mt-6">
            <Playground
              runtime="typescript"
              language="TypeScript"
              starterCode={`class Employee {
  public name: string;             // Anyone can see name
  protected baseSalary: number;    // Subclasses can see, outside cannot
  private secretBonus: number;     // Only Employee class can see

  constructor(name: string, baseSalary: number, secretBonus: number) {
    this.name = name;
    this.baseSalary = baseSalary;
    this.secretBonus = secretBonus;
  }

  getPublicSummary() {
    console.log(this.name + " earns a base salary of $" + this.baseSalary);
  }
}

class Manager extends Employee {
  calculateTotalComp(): number {
    // ✅ Can access protected 'baseSalary' in subclass!
    return this.baseSalary + 2000;
    // ❌ Cannot access private 'secretBonus' here
  }
}

const emp = new Employee("Mehedi", 5000, 1000);
console.log("Public name:", emp.name); // ✅ OK
emp.getPublicSummary(); // ✅ OK
// console.log(emp.baseSalary); ❌ Error: Property 'baseSalary' is protected`}
              height="360px"
            />
          </div>
        </div>

        <MistakeBox
          title="Making everything public out of laziness"
          description="It is tempting to skip encapsulation and make everything public. But this defeats the purpose. Always make data private unless you have a very good reason to expose it."
          wrong="public password: string; // Anyone can see and change it"
          right="private password: string; // Private — only this class can touch it"
        />

        <QuickCheck
          question="Why is it bad to let outside code directly change a bank account balance?"
          answer="Because there are no rules or checks. Someone could set the balance to negative, give themselves unlimited money, or break the entire system. Encapsulation forces all changes to go through methods that check the rules first."
        />
      </div>

      <Divider />

      {/* ═══════════════════════════════════════════════════ */}
      {/* PILLAR 2: ABSTRACTION                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">☁️</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Pillar 2: Abstraction</h3>
        </div>

        <TopicHeader
          number="A"
          title="What is Abstraction?"
          description="Abstraction means showing only the simple, easy-to-use parts and hiding the complicated details inside. You use something without needing to know HOW it works internally."
          color="sky"
        />

        <AnalogyBox emoji="📺" title="Think about it like this">
          <p><strong>TV Remote:</strong> You press the &quot;Volume Up&quot; button. That&apos;s it. You don&apos;t need to know about the infrared signals, the circuit board inside the TV, or how the speaker amplifier works. The button is the <strong>abstraction</strong> — it hides the complexity.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Coffee Machine Abstraction</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class CoffeeMachine {
  // ──── HIDDEN complexity (private methods) ────
  private boilWater() {
    console.log("  ⏳ Step 1: Boiling water to 96°C...");
  }

  private grindBeans() {
    console.log("  ⏳ Step 2: Grinding premium arabica beans...");
  }

  private brew() {
    console.log("  ⏳ Step 3: Pressurized brewing...");
  }

  private pourIntoCup() {
    console.log("  ⏳ Step 4: Pouring rich espresso into cup...");
  }

  // ──── SIMPLE public interface (what the user calls) ────
  makeCoffee() {
    console.log("☕ Starting Coffee Machine...");
    this.boilWater();
    this.grindBeans();
    this.brew();
    this.pourIntoCup();
    console.log("☕ Your coffee is ready! Enjoy!");
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee();
// The user calls only ONE simple method.
// All 4 complex internal steps are safely abstracted away.`}
            height="360px"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🔍 Encapsulation vs Abstraction — What&apos;s the difference?</SectionHeading>
          <ComparisonTable
            headers={["", "Encapsulation", "Abstraction"]}
            rows={[
              ["Focus", "PROTECTING data from outside access", "HIDING complexity from the user"],
              ["How?", "Using private modifier fields and methods", "Showing simple methods, hiding the complex ones"],
              ["Goal", "Prevent bad changes to data", "Make code easy to use"],
              ["Analogy", "A locked safe (protects the money)", "An ATM button (hides HOW it gets money)"],
              ["Example", "private balance can only be changed via deposit()", "makeCoffee() hides 4 internal steps"],
            ]}
          />

          <InfoCallout emoji="💡" title="They work together!">
            <p><strong>Encapsulation</strong> = protecting data (the &quot;what&quot; is hidden). <strong>Abstraction</strong> = hiding complexity (the &quot;how&quot; is hidden). In practice, you use both together.</p>
          </InfoCallout>
        </div>

        <QuickCheck
          question="You use a TV remote to change channels. Is this encapsulation or abstraction?"
          answer="Abstraction. The remote hides the complex internal process (infrared signals, circuit processing) and gives you a simple button to press. You don't need to know HOW it works — you just use it."
        />
      </div>

      <Divider />

      {/* ═══════════════════════════════════════════════════ */}
      {/* PILLAR 3: INHERITANCE                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🧬</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Pillar 3: Inheritance</h3>
        </div>

        <TopicHeader
          number="I"
          title="What is Inheritance?"
          description='Inheritance means a "child" class can automatically get all the data and methods from a "parent" class. The child inherits everything, and can also add its own new features.'
          color="amber"
        />

        <AnalogyBox emoji="👪" title="Think about it like this">
          <p>Children inherit traits from their parents — like eye color or height. In programming, a child class <strong>inherits</strong> all the parent&apos;s code and can <strong>add</strong> its own code on top.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Animal Hierarchy & Super</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Animal {
  constructor(public name: string, public age: number) {}

  eat() {
    console.log(this.name + " is eating 🍖 (inherited)");
  }

  sleep() {
    console.log(this.name + " is sleeping 😴 (inherited)");
  }
}

// Dog inherits all methods and properties from Animal
class Dog extends Animal {
  constructor(name: string, age: number, public breed: string) {
    super(name, age); // Call parent constructor!
  }

  bark() {
    console.log(this.name + " (" + this.breed + ") says: Woof! Woof! 🐕");
  }
}

// Cat inherits all methods and properties from Animal
class Cat extends Animal {
  meow() {
    console.log(this.name + " says: Meow! 🐱");
  }
}

const myDog = new Dog("Buddy", 3, "Golden Retriever");
myDog.eat();   // Inherited from Animal
myDog.sleep(); // Inherited from Animal
myDog.bark();  // Dog's own method

const myCat = new Cat("Whiskers", 2);
myCat.eat();   // Inherited from Animal
myCat.meow();  // Cat's own method`}
            height="380px"
          />
        </div>
      </div>

      <Divider />

      {/* ═══════════════════════════════════════════════════ */}
      {/* PILLAR 4: POLYMORPHISM                             */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">✨</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Pillar 4: Polymorphism</h3>
        </div>

        <TopicHeader
          number="P"
          title="What is Polymorphism?"
          description='Polymorphism means "many forms". It allows child classes to implement the SAME method name in their own different ways.'
          color="rose"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Polymorphic Payment System</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Payment {
  processPayment(amount: number) {
    console.log("Processing base payment of $" + amount);
  }
}

class CreditCardPayment extends Payment {
  constructor(private cardNumber: string) {
    super();
  }

  override processPayment(amount: number) {
    const last4 = this.cardNumber.slice(-4);
    console.log("💳 Charging $" + amount + " to card ending in " + last4);
  }
}

class BkashPayment extends Payment {
  constructor(private phone: string) {
    super();
  }

  override processPayment(amount: number) {
    console.log("📱 Sending $" + amount + " via bKash to " + this.phone);
  }
}

class CashPayment extends Payment {
  override processPayment(amount: number) {
    console.log("💵 Received $" + amount + " in physical cash");
  }
}

// Polymorphic function: works with ANY Payment type!
function checkout(paymentMethod: Payment, amount: number) {
  paymentMethod.processPayment(amount);
}

const payments: Payment[] = [
  new CreditCardPayment("4111222233334444"),
  new BkashPayment("+8801700000000"),
  new CashPayment()
];

// Single loop, different behaviors!
payments.forEach(p => checkout(p, 99.99));`}
            height="380px"
          />
        </div>

        <MistakeBox
          title="Using massive if/else chains instead of polymorphism"
          description="If you find yourself checking the type of an object to decide what to do, you should be using polymorphism instead. Let the objects handle their own behavior."
          wrong={`if (type === "email") sendEmail(msg);
else if (type === "sms") sendSms(msg);
else if (type === "push") sendPush(msg);`}
          right={`notification.send(msg);
// The object knows how to send itself!`}
        />

        <QuickCheck
          question="If three payment classes (CreditCard, bKash, Cash) all have the same processPayment() method but handle it differently, what is this called?"
          answer="Polymorphism — same method name, different behavior depending on which object calls it."
        />
      </div>

      <Divider />

      {/* ── Summary ── */}
      <div className="mb-8">
        <SectionHeading>📝 Part 5 Summary — The 4 Pillars</SectionHeading>
        <ComparisonTable
          headers={["Pillar", "Simple Meaning", "Key Idea"]}
          rows={[
            ["🔒 Encapsulation", "Protect data, control access", "Use private access modifier + public methods"],
            ["☁️ Abstraction", "Hide complexity, show simplicity", "Simple public methods hide complex internals"],
            ["🧬 Inheritance", "Child gets parent's code for free", 'Use "extends" and "super()"'],
            ["✨ Polymorphism", "Same method, different behavior", "Override methods in child classes"],
          ]}
        />
      </div>

      {/* ── Practice Exercise with Tests ── */}
      <div className="mt-8">
        <SectionHeading>💻 Practice Exercise: Shape Hierarchy with 4 Pillars</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          exercise={{
            id: "oop-pillars-shapes-ex",
            title: "Build a Shape system with all 4 pillars",
            instructions: `Create:
1. Shape base class with constructor(color: string) and calculateArea(): number (returns 0)
2. Circle extends Shape with constructor(color, radius) — overrides calculateArea() with π * r²
3. Rectangle extends Shape with constructor(color, width, height) — overrides calculateArea() with width * height
4. Method describe() on Shape that logs: "A [color] shape with area: [area]"`,
            starterCode: `class Shape {
  // Your base class code
}

class Circle extends Shape {
  // Your Circle code
}

class Rectangle extends Shape {
  // Your Rectangle code
}

const c = new Circle("Red", 5);
c.describe();

const r = new Rectangle("Blue", 10, 4);
r.describe();
`,
            solutionCode: `class Shape {
  constructor(public color: string) {}

  calculateArea(): number {
    return 0;
  }

  describe() {
    console.log("A " + this.color + " shape with area: " + this.calculateArea());
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  override calculateArea(): number {
    return Number((Math.PI * this.radius * this.radius).toFixed(2));
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  override calculateArea(): number {
    return this.width * this.height;
  }
}

const c = new Circle("Red", 5);
c.describe();

const r = new Rectangle("Blue", 10, 4);
r.describe();`,
            hints: [
              "Base class Shape has calculateArea() returning 0.",
              "Circle uses Math.PI * this.radius * this.radius in calculateArea(). Don't forget super(color) in the constructor!",
              "Rectangle uses this.width * this.height in calculateArea().",
            ],
            tests: [
              {
                name: "Shape, Circle, Rectangle classes exist",
                code: `if (typeof Shape !== 'function' || typeof Circle !== 'function' || typeof Rectangle !== 'function') throw new Error("Classes missing");`,
              },
              {
                name: "Circle correctly extends Shape and computes area",
                code: `const _c = new Circle("Green", 10); if (!(_c instanceof Shape)) throw new Error("Circle must extend Shape"); if (_c.calculateArea() <= 0) throw new Error("Area must be positive");`,
              },
              {
                name: "Rectangle computes correct area",
                code: `const _r = new Rectangle("Yellow", 5, 6); if (_r.calculateArea() !== 30) throw new Error("Rectangle 5x6 area must be 30");`,
              },
            ],
            difficulty: "intermediate",
          }}
          height="400px"
        />
      </div>

    </SectionContainer>
  );
}
