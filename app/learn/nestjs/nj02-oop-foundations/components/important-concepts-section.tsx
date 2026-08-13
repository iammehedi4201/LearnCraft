"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import { SectionContainer, TopicHeader, SectionHeading, AnalogyBox, MistakeBox, SummaryBox, Divider, PredictOutputBox, ComparisonTable, InfoCallout } from "./shared-components";

export function ImportantConceptsSection() {
  return (
    <SectionContainer number={6} title="Important OOP Concepts">

      {/* ── this ── */}
      <div className="mb-16">
        <TopicHeader number={1} title='"this" — The Current Object' description='"this" is a keyword that refers to the object that is currently running the code. It is like saying "me" or "my own".' color="primary" />
        <AnalogyBox emoji="👆" title="Think about it like this">
          <p>When you say &quot;my name is Mehedi&quot;, the word &quot;my&quot; refers to YOU — the person speaking. In JavaScript, <code>this</code> works the same way — it refers to the object that is &quot;speaking&quot; (running the code).</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Understanding &quot;this&quot;</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class User {
  constructor(public name: string) {}

  greet() {
    console.log("Hi, I am " + this.name);
  }
}

const user1 = new User("Mehedi");
const user2 = new User("Alice");

user1.greet(); // "this" points to user1
user2.greet(); // "this" points to user2`}
            height="260px"
          />
        </div>
      </div>

      <Divider />

      {/* ── new ── */}
      <div className="mb-16">
        <TopicHeader number={2} title='"new" — Creating an Object' description='"new" is a keyword that tells JavaScript: "Create a brand new object from this class, run the constructor, and give me the result."' color="sky" />
        <EnhancedCodeBlock code={`// Without "new" — ERROR!
// const user = User("Mehedi"); ❌

// With "new" — Works!
const user = new User("Mehedi"); // ✅

// What "new" does behind the scenes:
// 1. Creates empty object {}
// 2. Sets "this" to the new object
// 3. Runs the constructor
// 4. Returns the finished object`} language="javascript" />
        <MistakeBox title='Calling a class without "new"' description='A class must always be called with "new". Without it, you get a TypeError.' wrong='const user = User("Mehedi");     // ❌ TypeError!' right='const user = new User("Mehedi"); // ✅ Works' />
      </div>

      <Divider />

      {/* ── static ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="Static Methods and Properties" description='Static members belong to the CLASS itself, not to any object. You call them on the class name directly, without creating an object first.' color="emerald" />
        <AnalogyBox emoji="🏭" title="Think about it like this">
          <p>A factory (class) has a sign on the building that says &quot;Total cars produced: 500&quot;. This information belongs to the <strong>factory itself</strong>, not to any specific car. Static members are like that sign — they belong to the class, not to any object.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Static Class Members</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class User {
  static totalUsers: number = 0;  // Belongs to the CLASS itself

  constructor(public name: string) {
    User.totalUsers++;            // Increments class counter on each "new"
  }

  static getTotal(): number {
    return User.totalUsers;
  }

  greet() {
    console.log("Hi, I am " + this.name);
  }
}

const user1 = new User("Mehedi");
const user2 = new User("Alice");
const user3 = new User("Bob");

// Called on the CLASS, not an object:
console.log("Total registered users: " + User.getTotal()); // 3

user1.greet(); // Called on object`}
            height="340px"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 MathHelper Static Utility Class</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class MathHelper {
  static readonly PI: number = 3.14159;

  static circleArea(radius: number): number {
    return MathHelper.PI * radius * radius;
  }

  static celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9 / 5) + 32;
  }
}

// Use directly on the class — no "new MathHelper()" needed!
console.log("PI: " + MathHelper.PI);
console.log("Circle radius 5 area: " + MathHelper.circleArea(5).toFixed(2));
console.log("30°C in Fahrenheit: " + MathHelper.celsiusToFahrenheit(30) + "°F");`}
            height="300px"
          />
        </div>

        <ComparisonTable headers={["", "Instance (Regular)", "Static"]} rows={[
          ["Belongs to", "Each object", "The class itself"],
          ["Access via", "object.method()", "ClassName.method()"],
          ["Uses this?", "Yes — refers to the object", "No — there is no object"],
          ["Need new?", "Yes, must create object first", "No, use class name directly"],
          ["Example", "user1.greet()", "User.getTotal()"],
        ]} />
      </div>

      <Divider />

      {/* ── Getters and Setters ── */}
      <div className="mb-16">
        <TopicHeader number={4} title="Getters and Setters" description="Getters let you READ a private value. Setters let you CHANGE a private value safely. They look like properties but are actually methods that run code." color="amber" />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Getters and Setters with Validation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class UserProfile {
  #name: string;
  #age: number;

  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }

  // GETTER — read the value like a property
  get name(): string {
    return this.#name;
  }

  get age(): number {
    return this.#age;
  }

  // SETTER — safely validate before saving
  set age(newAge: number) {
    if (newAge < 0 || newAge > 150) {
      console.log("❌ Invalid age: " + newAge);
      return;
    }
    this.#age = newAge;
    console.log("✅ Age updated to: " + this.#age);
  }

  set name(newName: string) {
    if (newName.trim().length < 2) {
      console.log("❌ Name is too short!");
      return;
    }
    this.#name = newName.trim();
    console.log("✅ Name updated to: " + this.#name);
  }
}

const user = new UserProfile("Mehedi", 25);

// Access via getters:
console.log(user.name + " is " + user.age + " years old.");

// Access via setters:
user.age = 26;    // ✅ Valid update
user.age = -5;    // ❌ Blocked by setter!
user.name = "A";  // ❌ Blocked by setter!
user.name = "Alice"; // ✅ Valid update`}
            height="380px"
          />
        </div>

        <InfoCallout emoji="💡" title="Why getters/setters are cool">
          <p>They look like normal property access (<code>user.name</code>) but behind the scenes, they run a function that can check rules, format data, or log changes. The caller does not know they are calling a function!</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── Summary ── */}
      <SummaryBox>
        <strong>this</strong> refers to the current object. <strong>new</strong> creates an object from a class. <strong>Static</strong> members belong to the class itself. <strong>Getters/Setters</strong> let you safely read/write private data. <strong>#private</strong> fields are truly hidden from outside code.
      </SummaryBox>

      <div className="mt-6" />

      <PredictOutputBox code={`class Counter {
  static count = 0;
  constructor() { Counter.count++; }
  static getCount() { return Counter.count; }
}
new Counter();
new Counter();
new Counter();
console.log(Counter.getCount());`} answer="3" />

      <QuickCheck question="What is the difference between a static method and a regular method?" answer="A static method belongs to the CLASS and is called with ClassName.method(). A regular method belongs to each OBJECT and is called with object.method(). Static methods cannot use 'this' to refer to an object." />

    </SectionContainer>
  );
}
