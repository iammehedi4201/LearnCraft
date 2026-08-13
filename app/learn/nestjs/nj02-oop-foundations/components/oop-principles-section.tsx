import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  Divider,
  ExerciseBox,
  ComparisonTable,
  InfoCallout,
} from "./shared-components";

export function OopPrinciplesSection() {
  return (
    <SectionContainer number={5} title="The Four OOP Principles">

      <div className="mb-10 p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          Object-Oriented Programming is built on <strong>four main pillars</strong>. Every serious OOP programmer must understand these four ideas:
        </p>
        <div className="flex flex-wrap gap-2">
          {["1. Encapsulation", "2. Abstraction", "3. Inheritance", "4. Polymorphism"].map((p) => (
            <span key={p} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white dark:bg-[#212a5d] border border-[#b4b8d7] dark:border-[#212a5d] text-[#344b8f] dark:text-[#7f6fbe]">
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
          <SectionHeading>❌ The problem WITHOUT encapsulation</SectionHeading>
          <EnhancedCodeBlock
            code={`// BAD: Everything is open — anyone can change anything!
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;   // ⚠️ Anyone can change this!
  }
}

const account = new BankAccount("Mehedi", 1000);

// Anyone can do this — very dangerous!
account.balance = -50000;    // 😱 Negative balance!
account.balance = 999999999; // 😱 Free money!
console.log(account.balance); // -50000 or 999999999

// There are NO rules, NO checks, NO protection`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>✅ The solution WITH encapsulation</SectionHeading>
          <EnhancedCodeBlock
            code={`class BankAccount {
  #balance;  // 🔒 Private! Only this class can touch it

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  // Safe way to add money
  deposit(amount) {
    if (amount <= 0) {
      console.log("❌ Amount must be positive!");
      return;
    }
    this.#balance += amount;
    console.log("✅ Deposited $" + amount + ". Balance: $" + this.#balance);
  }

  // Safe way to take money
  withdraw(amount) {
    if (amount <= 0) {
      console.log("❌ Amount must be positive!");
      return;
    }
    if (amount > this.#balance) {
      console.log("❌ Not enough money!");
      return;
    }
    this.#balance -= amount;
    console.log("✅ Withdrew $" + amount + ". Balance: $" + this.#balance);
  }

  // Safe way to READ the balance
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Mehedi", 1000);
account.deposit(500);       // ✅ Deposited $500. Balance: $1500
account.withdraw(200);      // ✅ Withdrew $200. Balance: $1300
account.deposit(-100);      // ❌ Amount must be positive!
account.withdraw(50000);    // ❌ Not enough money!
// account.#balance = 999;  // ❌ ERROR! Cannot access private field`}
            language="javascript"
          />
        </div>

        <InfoCallout emoji="🔑" title="The # symbol">
          <p>In JavaScript, <code>#</code> before a property name makes it <strong>truly private</strong>. No code outside the class can read or change it. This is how JavaScript does encapsulation.</p>
        </InfoCallout>

        <div className="mb-8">
          <SectionHeading>📌 Example 2 — User Password</SectionHeading>
          <EnhancedCodeBlock
            code={`class User {
  #password;

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  // Public method: check if password is correct
  checkPassword(input) {
    return input === this.#password;
  }

  // Public method: change password safely
  changePassword(oldPass, newPass) {
    if (!this.checkPassword(oldPass)) {
      console.log("❌ Old password is wrong!");
      return;
    }
    if (newPass.length < 6) {
      console.log("❌ New password must be at least 6 characters!");
      return;
    }
    this.#password = newPass;
    console.log("✅ Password changed successfully!");
  }
}

const user = new User("Mehedi", "secret123");
console.log(user.checkPassword("wrong"));    // false
console.log(user.checkPassword("secret123")); // true
user.changePassword("secret123", "abc");      // ❌ Too short!
user.changePassword("secret123", "newpass456"); // ✅ Changed!`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example 3 — Product Stock</SectionHeading>
          <EnhancedCodeBlock
            code={`class Product {
  #stock;

  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.#stock = stock;
  }

  getStock() {
    return this.#stock;
  }

  sell(quantity) {
    if (quantity > this.#stock) {
      console.log("❌ Only " + this.#stock + " items left!");
      return false;
    }
    this.#stock -= quantity;
    console.log("✅ Sold " + quantity + "x " + this.name + ". Stock: " + this.#stock);
    return true;
  }

  restock(quantity) {
    this.#stock += quantity;
    console.log("📦 Restocked " + this.name + ". Stock: " + this.#stock);
  }
}

const phone = new Product("iPhone", 999, 10);
phone.sell(3);     // ✅ Sold 3x iPhone. Stock: 7
phone.sell(20);    // ❌ Only 7 items left!
phone.restock(50); // 📦 Restocked iPhone. Stock: 57`}
            language="javascript"
          />
        </div>

        <MistakeBox
          title="Making everything public out of laziness"
          description="It is tempting to skip encapsulation and make everything public. But this defeats the purpose. Always make data private unless you have a very good reason to expose it."
          wrong="this.password = password; // Anyone can see and change it"
          right="this.#password = password; // Protected — only this class can touch it"
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
          <p className="mt-2"><strong>More examples:</strong> Driving a car (you use pedals, not the engine directly). Using an ATM (you press buttons, not the vault). Calling someone (you tap a name, not connect wires).</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Example — Coffee Machine</SectionHeading>
          <EnhancedCodeBlock
            code={`class CoffeeMachine {
  // ──── HIDDEN complexity (private methods) ────
  #boilWater() {
    console.log("  ⏳ Boiling water to 96°C...");
  }

  #grindBeans() {
    console.log("  ⏳ Grinding coffee beans...");
  }

  #brew() {
    console.log("  ⏳ Brewing coffee...");
  }

  #pourIntoCup() {
    console.log("  ⏳ Pouring into cup...");
  }

  // ──── SIMPLE public method (what the user sees) ────
  makeCoffee() {
    console.log("☕ Making your coffee...");
    this.#boilWater();    // Hidden step 1
    this.#grindBeans();   // Hidden step 2
    this.#brew();         // Hidden step 3
    this.#pourIntoCup();  // Hidden step 4
    console.log("☕ Your coffee is ready! Enjoy!");
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee();
// The user only calls ONE method.
// All 4 complicated steps are hidden inside.`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example 2 — Email Sender</SectionHeading>
          <EnhancedCodeBlock
            code={`class EmailSender {
  #connectToServer() { /* complex network code */ }
  #authenticate() { /* login to email server */ }
  #formatEmail(to, subject, body) { /* add headers, encoding */ }
  #transmit(data) { /* send over network */ }
  #disconnect() { /* close connection */ }

  // Simple public method — hides ALL the complexity
  sendEmail(to, subject, body) {
    this.#connectToServer();
    this.#authenticate();
    const data = this.#formatEmail(to, subject, body);
    this.#transmit(data);
    this.#disconnect();
    console.log("✅ Email sent to " + to);
  }
}

const mailer = new EmailSender();
mailer.sendEmail("alice@test.com", "Hello", "How are you?");
// The user does not know about servers, authentication, formatting, etc.`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🔍 Encapsulation vs Abstraction — What&apos;s the difference?</SectionHeading>
          <ComparisonTable
            headers={["", "Encapsulation", "Abstraction"]}
            rows={[
              ["Focus", "PROTECTING data from outside access", "HIDING complexity from the user"],
              ["How?", "Using private (#) fields and methods", "Showing simple methods, hiding the complex ones"],
              ["Goal", "Prevent bad changes to data", "Make code easy to use"],
              ["Analogy", "A locked safe (protects the money)", "An ATM button (hides HOW it gets money)"],
              ["Example", "#balance can only be changed via deposit()", "makeCoffee() hides 4 internal steps"],
            ]}
          />

          <InfoCallout emoji="💡" title="They work together!">
            <p><strong>Encapsulation</strong> = protecting data (the &quot;what&quot; is hidden). <strong>Abstraction</strong> = hiding complexity (the &quot;how&quot; is hidden). In practice, you use both together. The coffee machine example uses both: the water temperature is <em>protected</em> (encapsulation) and the brewing process is <em>hidden</em> (abstraction).</p>
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
          <p>Think of a family. Children inherit traits from their parents — like eye color, height, or hair color. But children can also develop their own unique traits — like a talent for music or sports.</p>
          <p className="mt-2">In programming, a child class <strong>inherits</strong> all the parent&apos;s code and can <strong>add</strong> its own code on top.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Example 1 — Animal → Dog / Cat</SectionHeading>
          <EnhancedCodeBlock
            code={`// Parent class
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.log(this.name + " is eating 🍖");
  }

  sleep() {
    console.log(this.name + " is sleeping 😴");
  }
}

// Child class — inherits everything from Animal
class Dog extends Animal {
  bark() {
    console.log(this.name + " says: Woof! Woof! 🐕");
  }
}

// Another child class
class Cat extends Animal {
  meow() {
    console.log(this.name + " says: Meow! 🐱");
  }
}

const myDog = new Dog("Buddy", 3);
myDog.eat();   // Buddy is eating 🍖     ← Inherited from Animal!
myDog.sleep(); // Buddy is sleeping 😴   ← Inherited from Animal!
myDog.bark();  // Buddy says: Woof! 🐕   ← Dog's own method

const myCat = new Cat("Whiskers", 2);
myCat.eat();   // Whiskers is eating 🍖  ← Inherited from Animal!
myCat.meow();  // Whiskers says: Meow! 🐱← Cat's own method`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example 2 — User → Admin / Customer</SectionHeading>
          <EnhancedCodeBlock
            code={`class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  login() {
    console.log(this.name + " logged in ✅");
  }

  logout() {
    console.log(this.name + " logged out 👋");
  }
}

class Admin extends User {
  constructor(name, email) {
    super(name, email);  // Call parent constructor
    this.role = "admin";
  }

  deleteUser(userName) {
    console.log("🗑️ Admin " + this.name + " deleted user: " + userName);
  }

  banUser(userName) {
    console.log("🚫 Admin " + this.name + " banned user: " + userName);
  }
}

class Customer extends User {
  constructor(name, email) {
    super(name, email);
    this.role = "customer";
    this.cart = [];
  }

  addToCart(product) {
    this.cart.push(product);
    console.log("🛒 " + this.name + " added " + product + " to cart");
  }
}

const admin = new Admin("Mehedi", "admin@test.com");
admin.login();              // Mehedi logged in ✅  (inherited)
admin.deleteUser("Bob");    // 🗑️ Admin Mehedi deleted user: Bob

const customer = new Customer("Alice", "alice@test.com");
customer.login();           // Alice logged in ✅   (inherited)
customer.addToCart("iPhone"); // 🛒 Alice added iPhone to cart`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example 3 — Vehicle → Car / Bike</SectionHeading>
          <EnhancedCodeBlock
            code={`class Vehicle {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  move() {
    console.log(this.brand + " is moving at " + this.speed + " km/h");
  }
}

class Car extends Vehicle {
  constructor(brand, speed, doors) {
    super(brand, speed);  // super() calls the parent constructor
    this.doors = doors;   // Car's own property
  }

  honk() {
    console.log(this.brand + ": Beep beep! 🚗");
  }
}

class Bike extends Vehicle {
  constructor(brand, speed, type) {
    super(brand, speed);
    this.type = type; // "mountain" or "road"
  }

  ringBell() {
    console.log(this.brand + ": Ring ring! 🚲");
  }
}

const car = new Car("Toyota", 120, 4);
car.move();  // Toyota is moving at 120 km/h (inherited!)
car.honk();  // Toyota: Beep beep! 🚗

const bike = new Bike("Giant", 25, "mountain");
bike.move();     // Giant is moving at 25 km/h (inherited!)
bike.ringBell(); // Giant: Ring ring! 🚲`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🔑 The super() keyword</SectionHeading>
          <InfoCallout emoji="⬆️" title="What is super()?">
            <p><code>super()</code> is used inside a child&apos;s constructor to call the parent&apos;s constructor. It passes data up to the parent so the parent can do its setup. <strong>Rule:</strong> <code>super()</code> MUST be the first thing in the child&apos;s constructor, before anything else.</p>
          </InfoCallout>
        </div>

        <div className="mb-8">
          <SectionHeading>⚠️ Method Overriding</SectionHeading>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">A child class can <strong>override</strong> (replace) a parent&apos;s method by writing a method with the same name:</p>
          <EnhancedCodeBlock
            code={`class Animal {
  speak() {
    console.log("Some generic animal sound");
  }
}

class Dog extends Animal {
  speak() {                              // Same name = overrides parent!
    console.log("Woof! Woof! 🐕");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow! 🐱");
  }
}

const d = new Dog("Buddy");
d.speak();  // Woof! Woof! 🐕   (Dog's version, NOT the parent's)

const c = new Cat("Whiskers");
c.speak();  // Meow! 🐱         (Cat's version)`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>❌ When Inheritance is a BAD Idea</SectionHeading>
          <div className="p-5 rounded-2xl bg-[#7b52ac]/5 border border-[#7b52ac]/10 mb-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              <strong>Rule:</strong> Use inheritance when there is a clear &quot;IS A&quot; relationship. A Dog <strong>IS A</strong> Animal ✅. But sometimes, a &quot;HAS A&quot; relationship makes more sense. A Car <strong>HAS A</strong> Engine — it does NOT inherit from Engine. We&apos;ll cover this in Part 7 (Composition).
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              <strong>Bad example:</strong> class Car extends Engine — ❌ A car is NOT an engine. It HAS an engine.
            </p>
          </div>
        </div>

        <MistakeBox
          title="Forgetting to call super() in child constructor"
          description="If a child class has a constructor, it MUST call super() as the very first line. If you forget, JavaScript will throw an error."
          wrong={`class Admin extends User {
  constructor(name) {
    this.role = "admin"; // ❌ ERROR: Must call super() first!
  }
}`}
          right={`class Admin extends User {
  constructor(name) {
    super(name);          // ✅ Call parent first
    this.role = "admin";
  }
}`}
        />

        <QuickCheck
          question="What keyword do you use to make a child class inherit from a parent class?"
          answer="The 'extends' keyword. Example: class Dog extends Animal { }"
        />
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
          description='Polymorphism means "many forms". The same method name can behave differently depending on which object calls it. You give one command, and each object handles it in its own way.'
          color="purple"
        />

        <AnalogyBox emoji="🎵" title="Think about it like this">
          <p>Imagine telling different musicians: <strong>&quot;Play!&quot;</strong></p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>A guitarist strums the guitar 🎸</li>
            <li>A pianist plays the piano 🎹</li>
            <li>A drummer hits the drums 🥁</li>
          </ul>
          <p className="mt-2">Same command (&quot;Play!&quot;), different behavior for each musician. That&apos;s polymorphism!</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 Example 1 — Animal Sounds</SectionHeading>
          <EnhancedCodeBlock
            code={`class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log(this.name + ": Woof! Woof! 🐕");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log(this.name + ": Meow! 🐱");
  }
}

class Duck extends Animal {
  makeSound() {
    console.log(this.name + ": Quack! Quack! 🦆");
  }
}

// POLYMORPHISM IN ACTION!
// Same method name, different behavior
const animals = [
  new Dog("Buddy"),
  new Cat("Whiskers"),
  new Duck("Donald")
];

animals.forEach(animal => {
  animal.makeSound();  // Each one does something different!
});
// Buddy: Woof! Woof! 🐕
// Whiskers: Meow! 🐱
// Donald: Quack! Quack! 🦆`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example 2 — Payment Methods</SectionHeading>
          <EnhancedCodeBlock
            code={`class Payment {
  processPayment(amount) {
    console.log("Processing $" + amount);
  }
}

class CreditCardPayment extends Payment {
  processPayment(amount) {
    console.log("💳 Charging $" + amount + " to credit card");
  }
}

class BkashPayment extends Payment {
  processPayment(amount) {
    console.log("📱 Sending $" + amount + " via bKash");
  }
}

class CashPayment extends Payment {
  processPayment(amount) {
    console.log("💵 Received $" + amount + " in cash");
  }
}

// This function works with ANY payment type — polymorphism!
function checkout(paymentMethod, amount) {
  paymentMethod.processPayment(amount);
}

checkout(new CreditCardPayment(), 100);  // 💳 Charging $100 to credit card
checkout(new BkashPayment(), 50);        // 📱 Sending $50 via bKash
checkout(new CashPayment(), 75);         // 💵 Received $75 in cash`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example 3 — Notification System</SectionHeading>
          <EnhancedCodeBlock
            code={`class Notification {
  send(message) {
    console.log("Sending: " + message);
  }
}

class EmailNotification extends Notification {
  send(message) {
    console.log("📧 Email: " + message);
  }
}

class SmsNotification extends Notification {
  send(message) {
    console.log("📱 SMS: " + message);
  }
}

class PushNotification extends Notification {
  send(message) {
    console.log("🔔 Push: " + message);
  }
}

// Send to all channels — polymorphism!
function notifyAll(channels, message) {
  channels.forEach(channel => {
    channel.send(message);
  });
}

notifyAll([
  new EmailNotification(),
  new SmsNotification(),
  new PushNotification()
], "Your order is ready!");

// 📧 Email: Your order is ready!
// 📱 SMS: Your order is ready!
// 🔔 Push: Your order is ready!`}
            language="javascript"
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
            ["🔒 Encapsulation", "Protect data, control access", "Use # private fields + public methods"],
            ["☁️ Abstraction", "Hide complexity, show simplicity", "Simple public methods hide complex internals"],
            ["🧬 Inheritance", "Child gets parent's code for free", 'Use "extends" and "super()"'],
            ["✨ Polymorphism", "Same method, different behavior", "Override methods in child classes"],
          ]}
        />
      </div>

      <ExerciseBox
        level="real-world"
        title="Build a Shape system with all 4 pillars"
        description={`Create:\n1. A Shape class with a #color property (encapsulation) and a calculateArea() method\n2. Circle extends Shape — overrides calculateArea() with π * r²\n3. Rectangle extends Shape — overrides calculateArea() with width * height\n4. A function printArea(shape) that calls shape.calculateArea() (polymorphism)\n\nUse abstraction by hiding the calculation details behind calculateArea().`}
        solution={`class Shape {
  #color;

  constructor(color) {
    this.#color = color;
  }

  getColor() {
    return this.#color;
  }

  calculateArea() {
    return 0; // Base implementation
  }

  describe() {
    console.log("A " + this.getColor() + " shape with area: " + this.calculateArea());
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  calculateArea() {
    return (Math.PI * this.radius * this.radius).toFixed(2);
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

function printArea(shape) {
  shape.describe();
}

printArea(new Circle("Red", 5));
// A Red shape with area: 78.54
printArea(new Rectangle("Blue", 10, 5));
// A Blue shape with area: 50`}
      />

    </SectionContainer>
  );
}
