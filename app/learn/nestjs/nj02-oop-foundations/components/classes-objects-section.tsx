"use client";

import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  SummaryBox,
  Divider,
  PredictOutputBox,
  ComparisonTable,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 2 — CREATING OBJECTS
// ═══════════════════════════════════════════════════════════

export function ClassesObjectsSection() {
  return (
    <SectionContainer number={2} title="Creating Objects">

      {/* ── 2.1 Object Literals ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Object Literals — The Simplest Way"
          description='An object literal is the easiest way to create an object in JavaScript. You just use curly braces {} and write the data directly inside. No class needed!'
          color="primary"
        />

        <AnalogyBox emoji="📝" title="Think about it like this">
          <p>An object literal is like writing a sticky note. You quickly write down some information — no planning needed, no template needed. Just grab a note and write.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Creating & Reading Object Literals</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Creating simple objects with { }
const user = {
  name: "Mehedi",
  email: "mehedi@test.com",
  age: 25,
  skills: ["TypeScript", "NestJS", "React"]
};

// Accessing the data
console.log("Name:", user.name);
console.log("Email:", user.email);
console.log("Age:", user.age);
console.log("Top Skill:", user.skills[0]);`}
            height="280px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 2.2 Accessing Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Accessing & Updating Properties"
          description="There are two ways to access and change data inside an object: dot notation and bracket notation."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Dot vs Bracket Notation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`const user: Record<string, any> = {
  name: "Mehedi",
  age: 25,
  "favorite color": "Purple" // property with a space
};

// 1. Dot notation (most common)
console.log("Dot notation:", user.name);

// 2. Bracket notation (for special names or dynamic keys)
console.log("Bracket notation:", user["favorite color"]);

// Dynamic property lookup with a variable
const dynamicKey = "age";
console.log("Dynamic key:", user[dynamicKey]);

// Updating and adding new properties on the fly:
user.age = 26;
user.city = "Dhaka";
console.log("Updated user:", user);`}
            height="320px"
          />
        </div>

        <InfoCallout emoji="💡" title="When to use which?">
          <p>Use <strong>dot notation</strong> (user.name) most of the time — it&apos;s cleaner. Use <strong>bracket notation</strong> (user[&quot;name&quot;]) only when the property name has spaces, special characters, or is stored in a variable.</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.4 Objects with Methods ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Objects with Methods (Actions)"
          description="Objects can hold more than just data. They can also hold functions — these are called methods. A method lets an object DO something."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Bank Account Object</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`const bankAccount = {
  owner: "Mehedi",
  balance: 1000,

  deposit(amount: number) {
    this.balance += amount;
    console.log("Deposited $" + amount + ". New balance: $" + this.balance);
  },

  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("❌ Not enough money to withdraw $" + amount);
      return;
    }
    this.balance -= amount;
    console.log("Withdrew $" + amount + ". Remaining balance: $" + this.balance);
  },

  checkBalance() {
    console.log(this.owner + " has a total balance of $" + this.balance);
  }
};

bankAccount.deposit(500);
bankAccount.withdraw(200);
bankAccount.checkBalance();`}
            height="360px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 2.6 ES6 Classes (Modern Way) ── */}
      <div className="mb-16">
        <TopicHeader
          number={6}
          title="ES6 Classes — The Modern Way"
          description="ES6 classes are the modern, clean way to create objects in JavaScript. They use the 'class' keyword and have a clear structure."
          color="primary"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Class Blueprint vs Instances</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// The Class is a reusable blueprint
class User {
  name: string;
  role: string;

  constructor(name: string, role: string = "Learner") {
    this.name = name;
    this.role = role;
  }

  greet() {
    console.log("👋 Hi, I am " + this.name + " (" + this.role + ")");
  }
}

// Creating multiple unique objects from the same class blueprint:
const user1 = new User("Mehedi", "Instructor");
const user2 = new User("Alice", "Student");
const user3 = new User("Bob");

user1.greet();
user2.greet();
user3.greet();`}
            height="340px"
          />
        </div>

        <ComparisonTable
          headers={["Approach", "When to Use", "When NOT to Use"]}
          rows={[
            ["Object Literal { }", "Quick, one-time objects. Config objects. Small data structures.", "When you need multiple objects with the same structure."],
            ["Constructor Function", "Almost never in new code.", "In any new project. Use classes instead."],
            ["ES6 Class", "When you need to create multiple objects with the same blueprint.", "For simple one-off objects — a literal is enough."],
          ]}
        />
      </div>

      <Divider />

      {/* ── Summary ── */}
      <div className="mb-8">
        <SectionHeading>📝 Part 2 Summary</SectionHeading>
        <SummaryBox>
          There are three ways to create objects in JavaScript: <strong>object literals</strong> (quick and simple), <strong>constructor functions</strong> (old way), and <strong>ES6 classes</strong> (modern way). Use object literals for one-off objects and classes when you need many objects with the same structure. Always use <code>this</code> inside methods to refer to the object&apos;s own data.
        </SummaryBox>
      </div>

      <PredictOutputBox
        code={`const product = {
  name: "Laptop",
  price: 999,
  applyDiscount(percent) {
    this.price -= this.price * (percent / 100);
    return this.price;
  }
};

console.log(product.applyDiscount(10));
console.log(product.price);`}
        answer="899.1\n899.1"
      />

      <QuickCheck
        question="When should you use an object literal instead of a class?"
        answer="When you only need ONE object and it's simple data — like a config object, settings, or a single API response. No need for a class when you won't create multiple objects with the same structure."
      />

      {/* ── Interactive Practice Exercise ── */}
      <div className="mt-8">
        <SectionHeading>💻 Practice Exercise</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          exercise={{
            id: "oop-classes-objects-ex",
            title: "Create a Product object and a Product class",
            instructions: `1. Create a product object literal with: name, price, inStock
2. Create a Product class with: constructor(name, price, stock), a method showInfo() that prints "Product: [name] - $[price] (Stock: [stock])"
3. Create 3 product objects from the class and call showInfo() on each`,
            starterCode: `// 1. Create a product object literal
const laptop = {
  // your code here
};

// 2. Create a Product class
class Product {
  // your code here
}

// 3. Create 3 products and show their info
`,
            solutionCode: `// 1. Object literal
const laptop = {
  name: "Laptop",
  price: 999,
  inStock: true
};

// 2. Product class
class Product {
  constructor(public name: string, public price: number, public stock: number) {}

  showInfo() {
    console.log("Product: " + this.name + " - $" + this.price + " (Stock: " + this.stock + ")");
  }
}

// 3. Creating objects
const p1 = new Product("Phone", 699, 50);
const p2 = new Product("Tablet", 499, 30);
const p3 = new Product("Watch", 299, 100);

p1.showInfo();
p2.showInfo();
p3.showInfo();`,
            hints: [
              "An object literal uses { } with key: value pairs. Example: { name: \"Laptop\", price: 999, inStock: true }",
              "A class constructor sets properties with constructor(public name: string, public price: number, public stock: number) {}.",
              "showInfo() logs formatted details and can be called on p1, p2, p3.",
            ],
            tests: [
              { name: "Product class exists", code: `if (typeof Product !== 'function') throw new Error("Product class not found");` },
              { name: "Product has showInfo method", code: `const _tp = new Product("Test", 1, 1); if (typeof _tp.showInfo !== 'function') throw new Error("showInfo() method not found");` },
            ],
            difficulty: "beginner",
          }}
          height="400px"
        />
      </div>

    </SectionContainer>
  );
}