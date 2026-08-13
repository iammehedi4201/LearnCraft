import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
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
        <EnhancedCodeBlock code={`class User {
  constructor(name) {
    this.name = name;   // "this" = the object being created
  }
  greet() {
    console.log("Hi, I am " + this.name); // "this" = the object calling greet()
  }
}

const user1 = new User("Mehedi");
const user2 = new User("Alice");

user1.greet(); // Hi, I am Mehedi  (this = user1)
user2.greet(); // Hi, I am Alice   (this = user2)`} language="javascript" />
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
        <EnhancedCodeBlock code={`class User {
  static totalUsers = 0;  // Belongs to the CLASS

  constructor(name) {
    this.name = name;     // Belongs to each OBJECT
    User.totalUsers++;    // Increment the class counter
  }

  // Static method — called on the class, not on an object
  static getTotal() {
    return User.totalUsers;
  }

  // Regular method — called on an object
  greet() {
    console.log("Hi, I am " + this.name);
  }
}

const user1 = new User("Mehedi");
const user2 = new User("Alice");
const user3 = new User("Bob");

// Calling on the CLASS (not on an object)
console.log(User.getTotal()); // 3
console.log(User.totalUsers); // 3

// Calling on an OBJECT
user1.greet(); // Hi, I am Mehedi

// This would NOT work:
// user1.getTotal(); ❌ — static methods are on the class, not objects`} language="javascript" />

        <div className="mb-8">
          <SectionHeading>📌 More static examples</SectionHeading>
          <EnhancedCodeBlock code={`class MathHelper {
  static PI = 3.14159;

  static circleArea(radius) {
    return MathHelper.PI * radius * radius;
  }

  static celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  }
}

// Use directly on the class — no "new" needed!
console.log(MathHelper.PI);                    // 3.14159
console.log(MathHelper.circleArea(5));         // 78.53975
console.log(MathHelper.celsiusToFahrenheit(30)); // 86`} language="javascript" />
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
        <EnhancedCodeBlock code={`class User {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  // GETTER — read the value (looks like a property!)
  get name() {
    return this.#name;
  }

  get age() {
    return this.#age;
  }

  // SETTER — change the value safely
  set age(newAge) {
    if (newAge < 0 || newAge > 150) {
      console.log("❌ Invalid age!");
      return;
    }
    this.#age = newAge;
  }

  set name(newName) {
    if (newName.length < 2) {
      console.log("❌ Name too short!");
      return;
    }
    this.#name = newName;
  }
}

const user = new User("Mehedi", 25);

// Using getter — looks like reading a property!
console.log(user.name); // Mehedi   (actually calls the getter)
console.log(user.age);  // 25

// Using setter — looks like setting a property!
user.age = 26;           // ✅ Works (calls the setter)
user.age = -5;           // ❌ Invalid age! (setter blocks it)
user.name = "A";         // ❌ Name too short! (setter blocks it)
user.name = "Alice";     // ✅ Works`} language="javascript" />

        <InfoCallout emoji="💡" title="Why getters/setters are cool">
          <p>They look like normal property access (<code>user.name</code>) but behind the scenes, they run a function that can check rules, format data, or log changes. The caller does not know they are calling a function!</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── Private vs Public ── */}
      <div className="mb-16">
        <TopicHeader number={5} title="Private (#) vs Public Fields" description="Public fields can be accessed by anyone. Private fields (starting with #) can only be accessed inside the class." color="rose" />
        <EnhancedCodeBlock code={`class Employee {
  // Public fields — anyone can read/change
  name;
  department;

  // Private fields — only this class can read/change
  #salary;
  #ssn;

  constructor(name, department, salary, ssn) {
    this.name = name;
    this.department = department;
    this.#salary = salary;
    this.#ssn = ssn;
  }

  // Public method to safely get salary
  getSalaryInfo() {
    return this.name + " earns $" + this.#salary;
  }

  // Public method — hides SSN partially
  getMaskedSSN() {
    return "***-**-" + this.#ssn.slice(-4);
  }
}

const emp = new Employee("Mehedi", "Engineering", 75000, "123-45-6789");

console.log(emp.name);           // Mehedi ✅ (public)
console.log(emp.department);     // Engineering ✅ (public)
console.log(emp.getSalaryInfo()); // Mehedi earns $75000 ✅
console.log(emp.getMaskedSSN()); // ***-**-6789 ✅
// console.log(emp.#salary);    // ❌ ERROR! Private
// console.log(emp.#ssn);       // ❌ ERROR! Private`} language="javascript" />
      </div>

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
