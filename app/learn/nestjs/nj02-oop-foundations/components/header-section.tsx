import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
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
  ExerciseBox,
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
        <TopicHeader
          number={1}
          title="What is Programming?"
          description="Programming means giving instructions to a computer. You tell the computer exactly what to do, step by step. The computer follows your instructions and gives you a result."
          color="primary"
        />

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
            Programming is exactly the same idea — but instead of cooking instructions, you write instructions for a computer.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Simple code example</SectionHeading>
          <EnhancedCodeBlock
            code={`// This is a simple program
// It tells the computer to show a message

let name = "Mehedi";        // Step 1: Save a name
console.log("Hello " + name); // Step 2: Show the message

// Output: Hello Mehedi`}
            language="javascript"
          />
        </div>

        <SummaryBox>
          Programming is just writing instructions for a computer. Every program is a set of steps that the computer follows one by one.
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
          Think of a to-do list. You write everything one after another and cross items off in order. There is no grouping, no organization — just a straight list of tasks.
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Example — A user system (procedural style)</SectionHeading>
          <EnhancedCodeBlock
            code={`// ─── Procedural Style ───
// Everything is separate: variables here, functions there

let userName = "Mehedi";
let userEmail = "mehedi@test.com";
let userAge = 25;

function greetUser(name) {
  console.log("Hello, " + name + "!");
}

function getUserInfo(name, email) {
  return name + " - " + email;
}

// Using them
greetUser(userName);                    // Hello, Mehedi!
console.log(getUserInfo(userName, userEmail)); // Mehedi - mehedi@test.com`}
            language="javascript"
          />
        </div>

        <InfoCallout emoji="👍" title="When procedural works great">
          <p>Procedural programming is perfect for small scripts, quick tasks, and simple programs. If your code is short (under 100 lines), procedural is often the best choice!</p>
        </InfoCallout>

        <div className="mb-8">
          <SectionHeading>⚠️ The problem with procedural code (as it grows)</SectionHeading>
          <WhyBox>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              When your app gets bigger, procedural code becomes a mess. Your variables and functions are scattered everywhere. Nothing is grouped together. It becomes very hard to find things and fix bugs.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
              <strong>Imagine:</strong> You have 50 user-related variables and 30 user-related functions spread across 10 different files. When something breaks, you have to search all 10 files. This is the problem OOP solves.
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
          <p><strong>Without OOP (procedural):</strong> Imagine a house where all the kitchen items, bedroom items, and bathroom items are thrown into one big room. Finding your toothbrush takes 10 minutes!</p>
          <p className="mt-2"><strong>With OOP:</strong> Each room has its own items. Kitchen stuff stays in the kitchen. Bedroom stuff stays in the bedroom. Everything is organized and easy to find.</p>
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
          <p>Think of your phone. It has <strong>data</strong> (contacts, photos, messages) and <strong>actions</strong> (make a call, take a photo, send a message). All of these belong to your phone — they are grouped together in one object.</p>
          <p className="mt-2">In OOP, a <code className="px-1.5 py-0.5 rounded bg-[#e7e9f5] text-[#344b8f] dark:text-[#7f6fbe] text-xs font-mono">Phone</code> object would hold all this data and all these actions together in one place.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🔑 The 3 key ideas of OOP</SectionHeading>
          <div className="space-y-3">
            {[
              { num: "1", label: "Object", desc: "A real thing in your program (like a user, a product, a car)" },
              { num: "2", label: "Class", desc: "A blueprint for creating objects (like a template)" },
              { num: "3", label: "Group together", desc: "Data and actions that belong together stay together" },
            ].map((item) => (
              <div key={item.num} className="flex gap-3 p-3 rounded-xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white bg-[#344b8f]">
                  {item.num}
                </span>
                <div>
                  <span className="font-bold text-sm text-[#212a5d] dark:text-white">{item.label}</span>
                  <span className="text-sm text-[#606f9a] dark:text-[#b4b8d7]"> — {item.desc}</span>
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
            <li><strong>Data (properties):</strong> color, brand, speed, fuel level</li>
            <li><strong>Actions (methods):</strong> start, stop, accelerate, brake</li>
          </ul>
          <p className="mt-2">In programming, we can create a car object that has all this information and all these actions bundled together.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Example — A car object in JavaScript</SectionHeading>
          <EnhancedCodeBlock
            code={`// Creating a car object
const car = {
  // Data (properties) — information about the car
  brand: "Toyota",
  color: "Red",
  speed: 0,

  // Actions (methods) — things the car can do
  start() {
    console.log("The car is starting! 🚗");
  },

  accelerate() {
    this.speed += 10;
    console.log("Speed is now: " + this.speed);
  }
};

// Using the object
console.log(car.brand);  // Toyota
console.log(car.color);  // Red
car.start();             // The car is starting! 🚗
car.accelerate();        // Speed is now: 10
car.accelerate();        // Speed is now: 20`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 More examples of objects</SectionHeading>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 rounded-xl border border-[#b4b8d7] dark:border-[#212a5d]">
              <p className="text-xs font-bold text-[#344b8f] dark:text-[#7f6fbe] uppercase tracking-wide mb-2">👤 User Object</p>
              <p className="text-xs text-[#212a5d] dark:text-[#e7e9f5]"><strong>Data:</strong> name, email, age</p>
              <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7]"><strong>Actions:</strong> login, logout, updateProfile</p>
            </div>
            <div className="p-4 bg-[#e7e9f5]/50 dark:bg-[#472f82]/20 rounded-xl border border-[#7b52ac]/30 dark:border-[#7b52ac]/40">
              <p className="text-xs font-bold text-[#472f82] dark:text-[#b4b8d7] uppercase tracking-wide mb-2">🏦 Bank Account Object</p>
              <p className="text-xs text-[#212a5d] dark:text-[#e7e9f5]"><strong>Data:</strong> owner, balance, accountNumber</p>
              <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7]"><strong>Actions:</strong> deposit, withdraw, checkBalance</p>
            </div>
            <div className="p-4 bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 rounded-xl border border-[#b4b8d7] dark:border-[#212a5d]">
              <p className="text-xs font-bold text-[#7b52ac] dark:text-[#b4b8d7] uppercase tracking-wide mb-2">📦 Product Object</p>
              <p className="text-xs text-[#212a5d] dark:text-[#e7e9f5]"><strong>Data:</strong> name, price, stock</p>
              <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7]"><strong>Actions:</strong> addToCart, applyDiscount</p>
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
          <p>A house blueprint describes rooms, doors, windows, and the layout. But the blueprint itself is NOT a real house. You use the blueprint to build actual houses.</p>
          <p className="mt-2">Similarly, a <code className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-[#344b8f] dark:text-[#e7e9f5] text-xs font-mono">User</code> class describes what a user should have (name, email). But the class itself is NOT a user. You use the class to create actual user objects.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Example — Creating a class and making objects from it</SectionHeading>
          <EnhancedCodeBlock
            code={`// The CLASS (blueprint)
class User {
  constructor(name, email) {
    this.name = name;     // Every user will have a name
    this.email = email;   // Every user will have an email
  }

  greet() {
    console.log("Hello, I am " + this.name);
  }
}

// Creating OBJECTS from the class
const user1 = new User("Mehedi", "mehedi@test.com");
const user2 = new User("Alice", "alice@test.com");
const user3 = new User("Bob", "bob@test.com");

// Each object is independent
user1.greet();  // Hello, I am Mehedi
user2.greet();  // Hello, I am Alice
user3.greet();  // Hello, I am Bob`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🔍 Line by line explanation</SectionHeading>
          <StepList
            steps={[
              { label: "class User { }", note: "We declare a class called User. Class names always start with a capital letter." },
              { label: "constructor(name, email)", note: "The constructor is a special function that runs when you create a new object. It receives the data." },
              { label: "this.name = name", note: '"this" refers to the object being created. We save the name on the object.' },
              { label: "new User(\"Mehedi\", ...)", note: "The 'new' keyword creates a real object from the class blueprint. It triggers the constructor." },
              { label: "user1.greet()", note: "We call the greet method on user1. It uses this.name which is 'Mehedi'." },
            ]}
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 More examples</SectionHeading>
          <EnhancedCodeBlock
            code={`// Example 2: Car class
class Car {
  constructor(brand, color) {
    this.brand = brand;
    this.color = color;
    this.speed = 0;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.brand + " is going " + this.speed + " km/h");
  }
}

const myCar = new Car("Toyota", "Red");
myCar.accelerate(); // Toyota is going 10 km/h
myCar.accelerate(); // Toyota is going 20 km/h`}
            language="javascript"
          />
          <div className="mt-4" />
          <EnhancedCodeBlock
            code={`// Example 3: Student class
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  isPassing() {
    return this.grade >= 60;
  }

  showResult() {
    if (this.isPassing()) {
      console.log(this.name + " passed! ✅");
    } else {
      console.log(this.name + " failed. ❌");
    }
  }
}

const s1 = new Student("Mehedi", 85);
const s2 = new Student("Bob", 45);
s1.showResult(); // Mehedi passed! ✅
s2.showResult(); // Bob failed. ❌`}
            language="javascript"
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
            ["What is it?", "A blueprint / template", "A real thing created from the class"],
            ["How many?", "You write ONE class", "You can create MANY objects"],
            ["Contains data?", "No — it describes what data SHOULD exist", "Yes — it holds actual data values"],
            ["Can you use it directly?", "No — you must create an object first", "Yes — you use objects in your code"],
            ["Example", "class User { ... }", 'new User("Mehedi")'],
          ]}
        />

        <PredictOutputBox
          code={`class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    console.log(this.name + " says: Woof!");
  }
}

const dog1 = new Dog("Buddy");
const dog2 = new Dog("Max");
dog1.bark();
dog2.bark();`}
          answer='Buddy says: Woof!\nMax says: Woof!'
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
          <div className="p-5 rounded-2xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-2">📊 Properties (Data)</h5>
            <p className="text-sm text-[#212a5d] dark:text-[#e7e9f5] mb-3">Properties hold information about the object. They are like adjectives — they describe the object.</p>
            <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7] italic">Examples: name, age, color, price, isActive</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#472f82]/20 border border-[#7b52ac]/30 dark:border-[#7b52ac]/40">
            <h5 className="font-bold text-[#472f82] dark:text-[#b4b8d7] mb-2">⚡ Methods (Actions)</h5>
            <p className="text-sm text-[#212a5d] dark:text-[#e7e9f5] mb-3">Methods are actions the object can perform. They are like verbs — they do something.</p>
            <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7] italic">Examples: login(), deposit(), start(), calculateTotal()</p>
          </div>
        </div>

        <EnhancedCodeBlock
          code={`class BankAccount {
  // Properties (data)
  constructor(owner, balance) {
    this.owner = owner;       // Property: who owns this account
    this.balance = balance;   // Property: how much money is in it
  }

  // Methods (actions)
  deposit(amount) {
    this.balance += amount;
    console.log("Deposited $" + amount + ". New balance: $" + this.balance);
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Not enough money!");
      return;
    }
    this.balance -= amount;
    console.log("Withdrew $" + amount + ". New balance: $" + this.balance);
  }

  checkBalance() {
    console.log(this.owner + "'s balance: $" + this.balance);
  }
}

const account = new BankAccount("Mehedi", 1000);
account.checkBalance();   // Mehedi's balance: $1000
account.deposit(500);     // Deposited $500. New balance: $1500
account.withdraw(200);    // Withdrew $200. New balance: $1300
account.withdraw(5000);   // Not enough money!`}
          language="javascript"
        />
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
          <p>When a baby is born, certain things happen immediately — the baby gets a name, a birth date, and a hospital band. The constructor is like the birth process — it sets up the object the moment it is created.</p>
          <p className="mt-2">{`"this" is like saying "my own". When the baby says "my name is Mehedi", "my" refers to that specific baby. In code, "this.name" means "this object's own name".`}</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🔧 What happens when you write &quot;new User(...)&quot;</SectionHeading>
          <StepList
            steps={[
              { label: "JavaScript creates a brand new empty object", note: "Like creating an empty box" },
              { label: '"this" is set to point to that new object', note: 'So "this.name" means "put name on the new object"' },
              { label: "The constructor function runs", note: "It saves the data you passed in" },
              { label: "The new object is returned", note: "And saved in your variable (like user1)" },
            ]}
          />
        </div>

        <EnhancedCodeBlock
          code={`class User {
  constructor(name, age) {
    // "this" = the new object being created right now
    this.name = name;   // Save name on the object
    this.age = age;     // Save age on the object
  }

  introduce() {
    // "this" = the object that called this method
    console.log("I am " + this.name + ", age " + this.age);
  }
}

// When this runs:
const user1 = new User("Mehedi", 25);
// 1. A new empty object is created: {}
// 2. "this" points to that object
// 3. constructor runs: { name: "Mehedi", age: 25 }
// 4. The object is returned and saved in user1

user1.introduce(); // I am Mehedi, age 25`}
          language="javascript"
        />

        <MistakeBox
          title='Forgetting "this" inside a class'
          description='"this" tells JavaScript which object you are talking about. Without it, JavaScript does not know you mean the object data — your code will break.'
          wrong='greet() { console.log(name); }         // ❌ Which name? JS is confused'
          right='greet() { console.log(this.name); }    // ✅ The object own name'
        />
      </div>

      <Divider />

      {/* ── Summary and Quick Check ── */}
      <div className="mb-8">
        <SectionHeading>📝 Part 1 Summary</SectionHeading>

        <ComparisonTable
          headers={["Concept", "Simple Meaning", "Example"]}
          rows={[
            ["Programming", "Giving instructions to a computer", "console.log(\"Hello\")"],
            ["Procedural", "Code as a list of steps", "Functions + variables scattered"],
            ["OOP", "Group data + actions into objects", "class User { ... }"],
            ["Object", "A real thing with data and actions", "const user1 = new User(...)"],
            ["Class", "A blueprint for creating objects", "class User { }"],
            ["Property", "Data inside an object", "this.name = \"Mehedi\""],
            ["Method", "Action inside an object", "greet() { ... }"],
            ["Constructor", "Setup function that runs on creation", "constructor(name) { }"],
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

      <div className="mt-6" />

      <ExerciseBox
        level="beginner"
        title="Create an Employee class"
        description={`Create a class called Employee with:\n- Properties: name, position, salary\n- A method called introduce() that prints: "I am [name], working as a [position]"\n\nCreate 2 employee objects and call introduce() on each.`}
        solution={`class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }

  introduce() {
    console.log("I am " + this.name + ", working as a " + this.position);
  }
}

const emp1 = new Employee("Mehedi", "Developer", 50000);
const emp2 = new Employee("Alice", "Designer", 45000);

emp1.introduce(); // I am Mehedi, working as a Developer
emp2.introduce(); // I am Alice, working as a Designer`}
      />

    </SectionContainer>
  );
}
