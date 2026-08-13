import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  SummaryBox,
  Divider,
  ExerciseBox,
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
          <SectionHeading>📌 Creating an object literal</SectionHeading>
          <EnhancedCodeBlock
            code={`// The simplest way to create an object
const user = {
  name: "Mehedi",
  email: "mehedi@test.com",
  age: 25
};

// Accessing the data
console.log(user.name);   // Mehedi
console.log(user.email);  // mehedi@test.com
console.log(user.age);    // 25`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 More examples</SectionHeading>
          <EnhancedCodeBlock
            code={`// Example 1: A product
const product = {
  name: "iPhone 15",
  price: 999,
  inStock: true
};

// Example 2: A car
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2024,
  color: "Silver"
};

// Example 3: A student
const student = {
  name: "Alice",
  grade: 85,
  subjects: ["Math", "Science", "English"]
};`}
            language="javascript"
          />
        </div>
      </div>

      <Divider />

      {/* ── 2.2 Accessing Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Accessing Properties"
          description="There are two ways to access data inside an object: dot notation (most common) and bracket notation."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`const user = {
  name: "Mehedi",
  age: 25,
  "favorite color": "Blue"  // property name with a space
};

// Way 1: Dot notation (most common)
console.log(user.name);  // Mehedi
console.log(user.age);   // 25

// Way 2: Bracket notation (for special names or variables)
console.log(user["name"]);           // Mehedi
console.log(user["favorite color"]); // Blue

// Using a variable to access
const key = "age";
console.log(user[key]);  // 25`}
          language="javascript"
        />

        <InfoCallout emoji="💡" title="When to use which?">
          <p>Use <strong>dot notation</strong> (user.name) most of the time — it&apos;s cleaner. Use <strong>bracket notation</strong> (user[&quot;name&quot;]) only when the property name has spaces, special characters, or is stored in a variable.</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.3 Updating and Adding Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Updating and Adding Properties"
          description="You can change existing properties and add new ones to an object at any time. Objects in JavaScript are flexible."
          color="emerald"
        />

        <EnhancedCodeBlock
          code={`const user = {
  name: "Mehedi",
  age: 25
};

// Updating an existing property
user.age = 26;
console.log(user.age); // 26

// Adding a brand new property
user.city = "Dhaka";
console.log(user.city); // Dhaka

// Adding a method to an existing object
user.greet = function() {
  console.log("Hi, I am " + this.name);
};
user.greet(); // Hi, I am Mehedi

// The object now looks like:
// { name: "Mehedi", age: 26, city: "Dhaka", greet: [Function] }`}
          language="javascript"
        />
      </div>

      <Divider />

      {/* ── 2.4 Methods Inside Objects ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Methods Inside Objects"
          description='A method is just a function that lives inside an object. It can use "this" to access the object own data.'
          color="amber"
        />

        <EnhancedCodeBlock
          code={`const bankAccount = {
  owner: "Mehedi",
  balance: 1000,

  // Method: deposit money
  deposit(amount) {
    this.balance += amount;
    console.log("Deposited $" + amount);
    console.log("New balance: $" + this.balance);
  },

  // Method: withdraw money
  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Not enough money!");
      return;
    }
    this.balance -= amount;
    console.log("Withdrew $" + amount);
    console.log("New balance: $" + this.balance);
  },

  // Method: check balance
  checkBalance() {
    console.log(this.owner + " has $" + this.balance);
  }
};

bankAccount.deposit(500);     // Deposited $500 → New balance: $1500
bankAccount.withdraw(200);    // Withdrew $200 → New balance: $1300
bankAccount.checkBalance();   // Mehedi has $1300`}
          language="javascript"
        />

        <MistakeBox
          title='Using arrow functions for methods'
          description='Arrow functions (=>) do NOT have their own "this". If you use an arrow function as a method, "this" will NOT point to the object. Always use regular function syntax for methods.'
          wrong={`const user = {
  name: "Mehedi",
  greet: () => { console.log(this.name); }
};
user.greet(); // ❌ undefined`}
          right={`const user = {
  name: "Mehedi",
  greet() { console.log(this.name); }
};
user.greet(); // ✅ Mehedi`}
        />
      </div>

      <Divider />

      {/* ── 2.5 Constructor Functions (Old Way) ── */}
      <div className="mb-16">
        <TopicHeader
          number={5}
          title="Constructor Functions (The Old Way)"
          description='Before ES6 classes, JavaScript used "constructor functions" to create objects. You might still see this in older code. The function name starts with a capital letter.'
          color="secondary"
        />

        <EnhancedCodeBlock
          code={`// Constructor function (old way, before ES6)
function User(name, email) {
  this.name = name;
  this.email = email;

  this.greet = function() {
    console.log("Hi, I am " + this.name);
  };
}

// Creating objects — still uses "new"
const user1 = new User("Mehedi", "m@test.com");
const user2 = new User("Alice", "a@test.com");

user1.greet(); // Hi, I am Mehedi
user2.greet(); // Hi, I am Alice`}
          language="javascript"
        />

        <InfoCallout emoji="📝" title="Good to know">
          <p>You don&apos;t need to use constructor functions anymore. ES6 classes (which we learned in Part 1) are the modern, cleaner way. But it&apos;s good to recognize this pattern when you see it in old code.</p>
        </InfoCallout>
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
          <SectionHeading>📌 Comparing all three approaches</SectionHeading>
          <div className="space-y-4">
            <EnhancedCodeBlock
              code={`// ─── Approach 1: Object Literal ───
// Best for: Quick, one-off objects
const user1 = {
  name: "Mehedi",
  greet() { console.log("Hi, " + this.name); }
};

// ─── Approach 2: Constructor Function (Old Way) ───
// Best for: Nothing anymore — use classes instead
function UserOld(name) {
  this.name = name;
  this.greet = function() { console.log("Hi, " + this.name); };
}
const user2 = new UserOld("Mehedi");

// ─── Approach 3: ES6 Class (Modern Way) ───
// Best for: Creating multiple objects with the same structure
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hi, " + this.name);
  }
}
const user3 = new User("Mehedi");`}
              language="javascript"
            />
          </div>
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

      {/* ── 2.7 When Object vs When Class ── */}
      <div className="mb-16">
        <TopicHeader
          number={7}
          title="When Should I Use an Object? When Should I Create a Class?"
          description="This is one of the most important decisions in JavaScript. Here is a simple rule to follow."
          color="rose"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-3">Use an Object Literal when:</h5>
            <ul className="space-y-2 text-sm text-[#212a5d] dark:text-[#e7e9f5]">
              <li className="flex gap-2"><span>✅</span> You only need ONE of this thing</li>
              <li className="flex gap-2"><span>✅</span> It&apos;s a configuration or settings object</li>
              <li className="flex gap-2"><span>✅</span> It&apos;s simple data (like API response)</li>
              <li className="flex gap-2"><span>✅</span> You need it quickly without much structure</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#472f82]/20 border border-[#7b52ac]/30 dark:border-[#7b52ac]/40">
            <h5 className="font-bold text-[#472f82] dark:text-[#b4b8d7] mb-3">Use a Class when:</h5>
            <ul className="space-y-2 text-sm text-[#212a5d] dark:text-[#e7e9f5]">
              <li className="flex gap-2"><span>✅</span> You need MANY objects with the same structure</li>
              <li className="flex gap-2"><span>✅</span> You need inheritance (parent/child)</li>
              <li className="flex gap-2"><span>✅</span> You want to protect data (encapsulation)</li>
              <li className="flex gap-2"><span>✅</span> The object has complex behavior (methods)</li>
            </ul>
          </div>
        </div>

        <EnhancedCodeBlock
          code={`// ─── Use object literal: app settings (only ONE) ───
const appConfig = {
  theme: "dark",
  language: "en",
  maxRetries: 3
};

// ─── Use class: users (need MANY) ───
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  login() {
    console.log(this.name + " logged in");
  }
}

const user1 = new User("Mehedi", "m@test.com");
const user2 = new User("Alice", "a@test.com");
const user3 = new User("Bob", "b@test.com");
// Same structure, different data — perfect use for a class!`}
          language="javascript"
        />
      </div>

      {/* ── Summary ── */}
      <div className="mb-8">
        <SectionHeading>📝 Part 2 Summary</SectionHeading>
        <SummaryBox>
          There are three ways to create objects in JavaScript: <strong>object literals</strong> (quick and simple), <strong>constructor functions</strong> (old way), and <strong>ES6 classes</strong> (modern way). Use object literals for one-off objects and classes when you need many objects with the same structure. Always use <code>this</code> inside methods to refer to the object&apos;s own data. Never use arrow functions for methods.
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

      <div className="mt-6" />

      <ExerciseBox
        level="beginner"
        title="Create a Product object and a Product class"
        description={`1. Create a product object literal with: name, price, inStock\n2. Create a Product class with: constructor(name, price, stock), a method showInfo() that prints "Product: [name] - $[price] (Stock: [stock])"\n3. Create 3 product objects from the class`}
        solution={`// 1. Object literal
const laptop = {
  name: "Laptop",
  price: 999,
  inStock: true
};

// 2. Product class
class Product {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
  showInfo() {
    console.log("Product: " + this.name + " - $" + this.price + " (Stock: " + this.stock + ")");
  }
}

// 3. Creating objects
const p1 = new Product("Phone", 699, 50);
const p2 = new Product("Tablet", 499, 30);
const p3 = new Product("Watch", 299, 100);

p1.showInfo(); // Product: Phone - $699 (Stock: 50)
p2.showInfo(); // Product: Tablet - $499 (Stock: 30)
p3.showInfo(); // Product: Watch - $299 (Stock: 100)`}
      />

    </SectionContainer>
  );
}