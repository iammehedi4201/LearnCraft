"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  AnalogyBox,
  StepList,
  MistakeBox,
  SummaryBox,
  Divider,
  PredictOutputBox,
  ComparisonTable,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 1 — UNDERSTANDING OOP
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="Understanding OOP">
      {/* ── 1.1 What is Programming? ── */}
      <div className="mb-16">
What is Programming?

Programming means writing instructions that tell a computer what to do.

A computer cannot decide what you want by itself. You need to give it clear, step-by-step instructions using a programming language.

        <AnalogyBox emoji="🍳" title="Think about it like this">
          Imagine you are writing a recipe for cooking rice. You write:
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Wash the rice</li>
            <li>Add water</li>
            <li>Put it on the stove</li>
            <li>Wait 20 minutes</li>
            <li>Turn off the stove</li>
          </ol>
          <p className="mt-2">
            Programming is exactly the same idea — but instead of cooking
            instructions, you write instructions for a computer.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Simple Program</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: Save a name in a variable
let learnerName = "Mehedi";

// Step 2: Print a welcoming message to the console
console.log("Welcome to Learning Craft, " + learnerName + "! 🚀");`}
            height="240px"
          />
        </div>

        <SummaryBox>
          Programming is just writing instructions for a computer. Every program
          is a set of steps that the computer follows one by one.
        </SummaryBox>
      </div>

      <Divider />

      {/* ── 1.2 What is Procedural Programming? ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="What is Procedural Programming?"
          description="Procedural programming means writing your code as a list of steps (procedures or functions). The computer runs the steps from top to bottom. This is the simplest way to write code."
          color="sky"
        />

        <AnalogyBox emoji="📋" title="Think about it like this">
          Think of a to-do list. You write everything one after another and
          cross items off in order. There is no grouping, no organization — just
          a straight list of tasks.
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>
            🚀 Try It Yourself: Procedural User System
          </SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ─── Procedural Style ───
// Data is stored in separate variables:
let userName = "Mehedi";
let userEmail = "mehedi@test.com";
let userAge = 25;

// Functions are separate from the data:
function greetUser(name: string) {
  console.log("Hello, " + name + "! 👋");
}

function getUserInfo(name: string, email: string, age: number): string {
  return name + " (" + age + " years old) - " + email;
}

// Running the procedures:
greetUser(userName);
console.log(getUserInfo(userName, userEmail, userAge));`}
            height="320px"
          />
        </div>

        <InfoCallout emoji="👍" title="When procedural works great">
          <p>
            Procedural programming is perfect for small scripts, quick tasks,
            and simple programs. If your code is short (under 100 lines),
            procedural is often the best choice!
          </p>
        </InfoCallout>

        <div className="mb-8">
          <SectionHeading>
            ⚠️ The problem with procedural code (as it grows)
          </SectionHeading>
          <WhyBox>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              When your app gets bigger, procedural code becomes a mess. Your
              variables and functions are scattered everywhere. Nothing is
              grouped together. It becomes very hard to find things and fix
              bugs.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
              <strong>Imagine:</strong> You have 50 user-related variables and
              30 user-related functions spread across 10 different files. When
              something breaks, you have to search all 10 files. This is the
              problem OOP solves.
            </p>
          </WhyBox>
        </div>
      </div>

      <Divider />

      {/* ── 1.3 What Problem Does OOP Solve? ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="What Problem Does OOP Solve?"
          description="OOP solves the problem of messy, disorganized code. It groups related data and actions together, so everything that belongs together stays together."
          color="secondary"
        />

        <AnalogyBox emoji="🏠" title="Think about it like this">
          <p>
            <strong>Without OOP (procedural):</strong> Imagine a house where all
            the kitchen items, bedroom items, and bathroom items are thrown into
            one big room. Finding your toothbrush takes 10 minutes!
          </p>
          <p className="mt-2">
            <strong>With OOP:</strong> Each room has its own items. Kitchen
            stuff stays in the kitchen. Bedroom stuff stays in the bedroom.
            Everything is organized and easy to find.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Side by side comparison</SectionHeading>
          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            <div className="p-5 bg-ds-error-lighter rounded-2xl flex flex-col h-full justify-between shadow-sm">
              <h5 className="font-bold text-ds-error-base mb-3 text-sm">
                ❌ Procedural — Everything scattered
              </h5>
              <EnhancedCodeBlock
                code={`// User data floating around
let userName = "Mehedi";
let userEmail = "m@test.com";

// Product data floating around
let productName = "Laptop";
let productPrice = 999;

// Functions floating around
function greetUser(name) {
  console.log("Hi " + name);
}

function showProduct(name, price) {
  console.log(name + ": $" + price);
}`}
                language="javascript"
                className="flex-1 my-0"
              />
            </div>
            <div className="p-5 bg-ds-success-lighter rounded-2xl flex flex-col h-full justify-between shadow-sm">
              <h5 className="font-bold text-ds-success-dark mb-3 text-sm">
                ✅ OOP — Everything organized
              </h5>
              <EnhancedCodeBlock
                code={`// User data + actions together
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  greet() {
    console.log("Hi " + this.name);
  }
}

// Product data + actions together
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  show() {
    console.log(this.name + ": $" + this.price);
  }
}`}
                language="javascript"
                className="flex-1 my-0"
              />
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 1.4 What is Object-Oriented Programming? ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="What is Object-Oriented Programming (OOP)?"
          description='OOP is a way of writing code where you organize everything into "objects". Each object contains its own data (information) and its own actions (things it can do). Related data and actions always stay together.'
          color="primary"
        />

        <AnalogyBox emoji="📱" title="Think about it like this">
          <p>
            Think of your phone. It has <strong>data</strong> (contacts, photos,
            messages) and <strong>actions</strong> (make a call, take a photo,
            send a message). All of these belong to your phone — they are
            grouped together in one object.
          </p>
          <p className="mt-2">
            In OOP, a{" "}
            <code className="px-1.5 py-0.5 rounded bg-ds-bg-weak text-ds-feature-base border border-ds-stroke-soft text-xs font-mono">
              Phone
            </code>{" "}
            object would hold all this data and all these actions together in
            one place.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🔑 The 3 key ideas of OOP</SectionHeading>
          <div className="space-y-3">
            {[
              {
                num: "1",
                label: "Object",
                desc: "A real thing in your program (like a user, a product, a car)",
              },
              {
                num: "2",
                label: "Class",
                desc: "A blueprint for creating objects (like a template)",
              },
              {
                num: "3",
                label: "Group together",
                desc: "Data and actions that belong together stay together",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex gap-3 p-3.5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-ds-static-white bg-ds-feature-base">
                  {item.num}
                </span>
                <div>
                  <span className="font-bold text-sm text-ds-text-strong">
                    {item.label}
                  </span>
                  <span className="text-sm text-ds-text-sub">
                    {" "}
                    — {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 1.5 What is an Object? ── */}
      <div className="mb-16">
        <TopicHeader
          number={5}
          title="What is an Object?"
          description='An object is a "thing" in your program that has data (properties) and actions (methods). It represents something from the real world or from your application.'
          color="sky"
        />

        <AnalogyBox emoji="🚗" title="Think about it like this">
          <p>Think of a car. A car has:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Data (properties):</strong> color, brand, speed, fuel
              level
            </li>
            <li>
              <strong>Actions (methods):</strong> start, stop, accelerate, brake
            </li>
          </ul>
          <p className="mt-2">
            In programming, we can create a car object that has all this
            information and all these actions bundled together.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>
            🚀 Try It Yourself: A Car Object in Action
          </SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Creating a car object with data and actions bundled together:
const car = {
  // Data (properties)
  brand: "Toyota Supra",
  color: "Midnight Blue",
  speed: 0,

  // Actions (methods)
  start() {
    console.log("🏎️ " + this.brand + " engine roared to life!");
  },

  accelerate(amount: number = 10) {
    this.speed += amount;
    console.log("⚡ Speed is now: " + this.speed + " km/h");
  },

  brake() {
    this.speed = Math.max(0, this.speed - 15);
    console.log("🛑 Brakes applied! Speed is now: " + this.speed + " km/h");
  }
};

// Test driving the car:
console.log("Car brand:", car.brand);
console.log("Car color:", car.color);
car.start();
car.accelerate(30);
car.accelerate(40);
car.brake();`}
            height="380px"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 More examples of objects</SectionHeading>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft shadow-sm">
              <p className="text-xs font-bold text-ds-feature-dark uppercase tracking-wide mb-2">
                👤 User Object
              </p>
              <p className="text-xs text-ds-text-sub">
                <strong>Data:</strong> <span className="text-ds-text-strong">name, email, age</span>
              </p>
              <p className="text-xs text-ds-text-sub mt-1">
                <strong>Actions:</strong> <span className="text-ds-text-strong">login, logout, updateProfile</span>
              </p>
            </div>
            <div className="p-4 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft shadow-sm">
              <p className="text-xs font-bold text-ds-feature-dark uppercase tracking-wide mb-2">
                🏦 Bank Account Object
              </p>
              <p className="text-xs text-ds-text-sub">
                <strong>Data:</strong> <span className="text-ds-text-strong">owner, balance, accountNumber</span>
              </p>
              <p className="text-xs text-ds-text-sub mt-1">
                <strong>Actions:</strong> <span className="text-ds-text-strong">deposit, withdraw, checkBalance</span>
              </p>
            </div>
            <div className="p-4 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft shadow-sm">
              <p className="text-xs font-bold text-ds-feature-dark uppercase tracking-wide mb-2">
                📦 Product Object
              </p>
              <p className="text-xs text-ds-text-sub">
                <strong>Data:</strong> <span className="text-ds-text-strong">name, price, stock</span>
              </p>
              <p className="text-xs text-ds-text-sub mt-1">
                <strong>Actions:</strong> <span className="text-ds-text-strong">addToCart, applyDiscount</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 1.6 What is a Class? ── */}
      <div className="mb-16">
        <TopicHeader
          number={6}
          title="What is a Class?"
          description="A class is like a blueprint or template for creating objects. It describes what data an object should have and what actions it can perform. But a class is NOT an object itself — it is just the plan."
          color="emerald"
        />

        <AnalogyBox emoji="🏗️" title="Think about it like this">
          <p>
            A house blueprint describes rooms, doors, windows, and the layout.
            But the blueprint itself is NOT a real house. You use the blueprint
            to build actual houses.
          </p>
          <p className="mt-2">
            Similarly, a{" "}
            <code className="px-1.5 py-0.5 rounded bg-ds-bg-weak text-ds-feature-base border border-ds-stroke-soft text-xs font-mono">
              User
            </code>{" "}
            class describes what a user should have (name, email). But the class
            itself is NOT a user. You use the class to create actual user
            objects.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>
            🚀 Try It Yourself: Blueprint Class & Multiple Instances
          </SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// The CLASS (reusable blueprint)
class User {
  constructor(public name: string, public email: string) {}

  greet() {
    console.log("👋 Hello, I am " + this.name + " (" + this.email + ")");
  }
}

// Creating multiple real OBJECTS from the single blueprint:
const user1 = new User("Mehedi", "mehedi@test.com");
const user2 = new User("Alice", "alice@test.com");
const user3 = new User("Bob", "bob@test.com");

// Each object operates independently:
user1.greet();
user2.greet();
user3.greet();`}
            height="340px"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🔍 Line by line explanation</SectionHeading>
          <StepList
            steps={[
              {
                label: "class User { }",
                note: "We declare a class called User. Class names always start with a capital letter.",
              },
              {
                label: "constructor(name, email)",
                note: "The constructor is a special function that runs when you create a new object. It receives the data.",
              },
              {
                label: "this.name = name",
                note: '"this" refers to the object being created. We save the name on the object.',
              },
              {
                label: 'new User("Mehedi", ...)',
                note: "The 'new' keyword creates a real object from the class blueprint. It triggers the constructor.",
              },
              {
                label: "user1.greet()",
                note: "We call the greet method on user1. It uses this.name which is 'Mehedi'.",
              },
            ]}
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Student Class with Pass/Fail Check</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Student {
  constructor(public name: string, public grade: number) {}

  isPassing(): boolean {
    return this.grade >= 60;
  }

  showResult() {
    if (this.isPassing()) {
      console.log("✅ " + this.name + " passed with " + this.grade + "%!");
    } else {
      console.log("❌ " + this.name + " failed with " + this.grade + "%. Needs improvement.");
    }
  }
}

const s1 = new Student("Mehedi", 88);
const s2 = new Student("Bob", 45);

s1.showResult();
s2.showResult();`}
            height="320px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 1.7 Object vs Class ── */}
      <div className="mb-16">
        <TopicHeader
          number={7}
          title="Object vs Class"
          description="A class is the blueprint. An object is the real thing you build from that blueprint. One class can create many objects — each one is independent."
          color="amber"
        />

        <ComparisonTable
          headers={["", "Class", "Object"]}
          rows={[
            [
              "What is it?",
              "A blueprint / template",
              "A real thing created from the class",
            ],
            ["How many?", "You write ONE class", "You can create MANY objects"],
            [
              "Contains data?",
              "No — it describes what data SHOULD exist",
              "Yes — it holds actual data values",
            ],
            [
              "Can you use it directly?",
              "No — you must create an object first",
              "Yes — you use objects in your code",
            ],
            ["Example", "class User { ... }", 'new User("Mehedi")'],
          ]}
        />

        <PredictOutputBox
          code={`class Dog {
  constructor(public name: string) {}

  bark() {
    console.log(this.name + " says: Woof!");
  }
}

const dog1 = new Dog("Buddy");
const dog2 = new Dog("Max");
dog1.bark();
dog2.bark();`}
          answer="Buddy says: Woof!\nMax says: Woof!"
        />
      </div>

      <Divider />

      {/* ── 1.8 Properties and Methods ── */}
      <div className="mb-16">
        <TopicHeader
          number={8}
          title="Properties and Methods"
          description='In OOP, we call the data inside an object "properties" and the actions inside an object "methods". These are the two building blocks of every object.'
          color="purple"
        />

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-ds-feature-base mb-2">
              📊 Properties (Data)
            </h5>
            <p className="text-sm text-ds-text-strong mb-3">
              Properties hold information about the object. They are like
              adjectives — they describe the object.
            </p>
            <p className="text-xs text-ds-text-sub italic">
              Examples: name, age, color, price, isActive
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-ds-feature-base mb-2">
              ⚡ Methods (Actions)
            </h5>
            <p className="text-sm text-ds-text-strong mb-3">
              Methods are actions the object can perform. They are like verbs —
              they do something.
            </p>
            <p className="text-xs text-ds-text-sub italic">
              Examples: login(), deposit(), start(), calculateTotal()
            </p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Properties & Methods in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class BankAccount {
  constructor(public owner: string, public balance: number) {}

  deposit(amount: number) {
    this.balance += amount;
    console.log("💰 Deposited $" + amount + ". New balance: $" + this.balance);
  }

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("❌ Insufficient funds to withdraw $" + amount + "! Current: $" + this.balance);
      return;
    }
    this.balance -= amount;
    console.log("💸 Withdrew $" + amount + ". Remaining balance: $" + this.balance);
  }

  checkBalance() {
    console.log("🏦 " + this.owner + "'s verified balance: $" + this.balance);
  }
}

const account = new BankAccount("Mehedi", 1000);
account.checkBalance();
account.deposit(500);
account.withdraw(200);
account.withdraw(5000); // Trigger validation!`}
            height="380px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 1.9 Constructor and this ── */}
      <div className="mb-16">
        <TopicHeader
          number={9}
          title='Constructor and "this"'
          description='The constructor is a special function that runs automatically when you create a new object. The keyword "this" refers to the current object being created.'
          color="rose"
        />

        <AnalogyBox emoji="👶" title="Think about it like this">
          <p>
            When a baby is born, certain things happen immediately — the baby
            gets a name, a birth date, and a hospital band. The constructor is
            like the birth process — it sets up the object the moment it is
            created.
          </p>
          <p className="mt-2">{`"this" is like saying "my own". When the baby says "my name is Mehedi", "my" refers to that specific baby. In code, "this.name" means "this object's own name".`}</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>
            🔧 What happens when you write &quot;new User(...)&quot;
          </SectionHeading>
          <StepList
            steps={[
              {
                label: "JavaScript creates a brand new empty object",
                note: "Like creating an empty box",
              },
              {
                label: '"this" is set to point to that new object',
                note: 'So "this.name" means "put name on the new object"',
              },
              {
                label: "The constructor function runs",
                note: "It saves the data you passed in",
              },
              {
                label: "The new object is returned",
                note: "And saved in your variable (like user1)",
              },
            ]}
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Constructor Execution & &quot;this&quot;</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    // "this" points to the new instance created by "new"
    this.name = name;
    this.age = age;
    console.log("⚙️ Initialized user: " + this.name);
  }

  introduce() {
    console.log("👋 I am " + this.name + ", and I am " + this.age + " years old.");
  }
}

const user1 = new User("Mehedi", 25);
const user2 = new User("Alice", 30);

user1.introduce();
user2.introduce();`}
            height="340px"
          />
        </div>

        <MistakeBox
          title='Forgetting "this" inside a class'
          description='"this" tells JavaScript which object you are talking about. Without it, JavaScript does not know you mean the object data — your code will break.'
          wrong="greet() { console.log(name); }         // ❌ Which name? JS is confused"
          right="greet() { console.log(this.name); }    // ✅ The object own name"
        />
      </div>

      <Divider />

      {/* ── Summary and Quick Check ── */}
      <div className="mb-8">
        <SectionHeading>📝 Part 1 Summary</SectionHeading>

        <ComparisonTable
          headers={["Concept", "Simple Meaning", "Example"]}
          rows={[
            [
              "Programming",
              "Giving instructions to a computer",
              'console.log("Hello")',
            ],
            [
              "Procedural",
              "Code as a list of steps",
              "Functions + variables scattered",
            ],
            ["OOP", "Group data + actions into objects", "class User { ... }"],
            [
              "Object",
              "A real thing with data and actions",
              "const user1 = new User(...)",
            ],
            ["Class", "A blueprint for creating objects", "class User { }"],
            ["Property", "Data inside an object", 'this.name = "Mehedi"'],
            ["Method", "Action inside an object", "greet() { ... }"],
            [
              "Constructor",
              "Setup function that runs on creation",
              "constructor(name) { }",
            ],
            ["this", "Refers to the current object", "this.name"],
          ]}
        />
      </div>

      <QuickCheck
        question="What is the difference between a class and an object?"
        answer="A class is a blueprint (template). An object is the real thing you create from that blueprint. One class can create many objects."
      />

      <div className="mt-6" />

      <QuickCheck
        question='What does "this" refer to inside a class?'
        answer='"this" refers to the current object — the specific object that is being created or the object that called the method.'
      />

      {/* ── Practice Exercise ── */}
      <div className="mt-8">
        <SectionHeading>💻 Practice Exercise: Create an Employee Class</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          exercise={{
            id: "oop-header-employee-ex",
            title: "Create an Employee class",
            instructions: `Create a class called Employee with:
• Constructor: name, position, salary
• A method called introduce() that prints: "I am [name], working as a [position]"

Create 2 employee objects and call introduce() on each.`,
            starterCode: `class Employee {
  // Your code here
}

// Create 2 employees and introduce them
`,
            solutionCode: `class Employee {
  constructor(public name: string, public position: string, public salary: number) {}

  introduce() {
    console.log("I am " + this.name + ", working as a " + this.position);
  }
}

const emp1 = new Employee("Mehedi", "Developer", 50000);
const emp2 = new Employee("Alice", "Designer", 45000);

emp1.introduce();
emp2.introduce();`,
            hints: [
              "Declare class Employee with constructor(public name: string, public position: string, public salary: number).",
              "Inside introduce(), log 'I am ' + this.name + ', working as a ' + this.position.",
              "Create instances with new Employee('Mehedi', 'Developer', 50000) and call emp1.introduce().",
            ],
            tests: [
              {
                name: "Employee class exists",
                code: `if (typeof Employee !== 'function') throw new Error("Employee class not found");`,
              },
              {
                name: "Employee sets properties",
                code: `const _e = new Employee("Test", "Tester", 30000); if (_e.name !== "Test" || _e.position !== "Tester") throw new Error("Constructor properties not set correctly");`,
              },
              {
                name: "Employee has introduce method",
                code: `const _e2 = new Employee("Test", "Dev", 40000); if (typeof _e2.introduce !== 'function') throw new Error("introduce method missing");`,
              },
            ],
            difficulty: "beginner",
          }}
          height="400px"
        />
      </div>
    </SectionContainer>
  );
}
