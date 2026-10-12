import { SectionContainer, MistakeBox, SummaryBox } from "./shared-components";

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={8} title="Common Beginner Mistakes">

      <div className="mb-10 p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Every beginner makes these mistakes. Knowing them in advance will save you hours of debugging. For each mistake, we show the <strong>wrong approach</strong>, explain <strong>why it&apos;s wrong</strong>, and show the <strong>better approach</strong>.
        </p>
      </div>

      <MistakeBox title="1. Creating classes when they are unnecessary" description="Not everything needs to be a class. For a quick config or simple data, an object literal is fine. Don't over-engineer simple things."
        wrong={`class Config {
  constructor() {
    this.theme = "dark";
    this.lang = "en";
  }
}
const config = new Config();`}
        right={`const config = {
  theme: "dark",
  lang: "en"
};
// Simple, clean, no class needed!`} />

      <MistakeBox title="2. Using inheritance everywhere" description={"Inheritance should only be used for clear \"IS A\" relationships. Don't use it just to share code. Use composition instead."}
        wrong={`// Car IS NOT an Engine!
class Engine { start() {} }
class Car extends Engine {}`}
        right={`// Car HAS an Engine
class Car {
  constructor() {
    this.engine = new Engine();
  }
}`} />

      <MistakeBox title='3. Not understanding "this"' description='"this" refers to the object that called the method. In arrow functions, "this" works differently. This is a common source of bugs.'
        wrong={`class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setInterval(() => {
      this.seconds++; // ✅ Arrow function: "this" = Timer
    }, 1000);
  }
}
// But if you used a regular function:
// setInterval(function() { this.seconds++; }, 1000);
// ❌ "this" would NOT be the Timer!`}
        right={`class Timer {
  constructor() { this.seconds = 0; }
  start() {
    // Arrow functions keep "this" from the outer scope
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}`} />

      <MistakeBox title="4. Making everything public" description="If you leave all data public, any part of your app can change it without checks. Always make sensitive data private using TypeScript's private access modifier."
        wrong="public password: string;  // Anyone can read/change from outside"
        right="private password: string; // Only this class can access" />

      <MistakeBox title="5. Creating huge classes (God classes)" description="A class should have ONE clear responsibility. If your class has 500 lines and does 10 different things, split it into smaller classes."
        wrong={`class App {
  // Does EVERYTHING: auth, database, email, logging...
  login() {}
  saveToDatabase() {}
  sendEmail() {}
  writeLog() {}
  processPayment() {}
  // 500 more lines...
}`}
        right={`class AuthService { login() {} }
class DatabaseService { save() {} }
class EmailService { send() {} }
class PaymentService { process() {} }
// Each class has ONE job`} />

      <MistakeBox title="6. Confusing class and object" description={"A class is the blueprint. An object is the real thing. You don't \"use\" a class — you create objects from it."}
        wrong={`class User { ... }
User.name = "Mehedi"; // ❌ Setting on the class, not an object`}
        right={`class User { constructor(public name: string) {} }
const user = new User("Mehedi"); // ✅ Create object first!`} />

      <MistakeBox title="7. Using getters/setters without a reason" description={"Don't add getters and setters just because you can. Only add them when you need validation, formatting, or computed values."}
        wrong={`// Pointless — does nothing useful over a public property
private _name: string;
get name(): string { return this._name; }
set name(v: string) { this._name = v; }`}
        right={`// Useful — validates the input
private _age: number;
set age(v: number) {
  if (v < 0 || v > 150) throw new Error("Invalid age");
  this._age = v;
}`} />

      <MistakeBox title="8. Overengineering simple code" description={"Not every problem needs classes, inheritance, and patterns. Sometimes a simple function is the best solution."}
        wrong={`// For adding two numbers?! Way too much.
class Calculator {
  constructor() { this.result = 0; }
  add(a, b) { this.result = a + b; return this.result; }
}
const calc = new Calculator();
console.log(calc.add(2, 3));`}
        right={`// Just a function. Simple and clear.
function add(a, b) { return a + b; }
console.log(add(2, 3));`} />

      <MistakeBox title='9. Thinking "OOP means everything must be a class"' description="OOP is a tool, not a religion. Use classes when they make sense. Use functions when they make sense. The best code uses the right tool for the job."
        wrong='// Every tiny thing as a class — over-engineering'
        right='// Mix approaches: classes for complex objects, functions for utilities' />

      <MistakeBox title="10. Deep inheritance chains (A → B → C → D)" description="If a class extends a class that extends a class that extends a class, debugging becomes a nightmare. Keep inheritance shallow (max 2-3 levels)."
        wrong={`class LivingThing {}
class Animal extends LivingThing {}
class Mammal extends Animal {}
class Canine extends Mammal {}
class Dog extends Canine {}
// 5 levels deep! Nightmare to debug.`}
        right={`class Animal {}
class Dog extends Animal {}
// Simple and clear. Max 2-3 levels.`} />

      <SummaryBox>
        The biggest mistakes beginners make: using classes for everything, using inheritance for &quot;HAS A&quot; relationships, making everything public, creating God classes, and overengineering. Remember: <strong>simplicity is a feature</strong>. Use OOP when it makes code cleaner, not just for the sake of using OOP.
      </SummaryBox>

    </SectionContainer>
  );
}
