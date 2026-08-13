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
  InfoCallout,
} from "./shared-components";

export function MethodsSection() {
  return (
    <SectionContainer number={4} title="Methods">

      {/* ── 4.1 What is a Method? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Method?"
          description="A method is a function that belongs to an object or class. It defines an action that the object can perform. Methods are verbs — they DO something."
          color="primary"
        />

        <AnalogyBox emoji="🎮" title="Think about it like this">
          <p>Think of a game character. The character can <strong>jump()</strong>, <strong>attack()</strong>, <strong>heal()</strong>, and <strong>run()</strong>. These are all actions (methods) that belong to that character. You don&apos;t call them on their own — you always call them on a specific character.</p>
        </AnalogyBox>

        <EnhancedCodeBlock
          code={`class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  // These are all methods (actions)
  attack(target) {
    console.log(this.name + " attacks " + target + "! ⚔️");
  }

  heal(amount) {
    this.health += amount;
    console.log(this.name + " healed! Health: " + this.health + " ❤️");
  }

  jump() {
    console.log(this.name + " jumps! 🦘");
  }
}

const hero = new Character("Mehedi", 100);
hero.attack("Dragon");  // Mehedi attacks Dragon! ⚔️
hero.heal(20);           // Mehedi healed! Health: 120 ❤️
hero.jump();             // Mehedi jumps! 🦘`}
          language="javascript"
        />
      </div>

      <Divider />

      {/* ── 4.2 Methods Using Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title='Methods Using "this" to Access Properties'
          description='Methods can read and change the object own data using "this". This is what makes methods powerful — they work with the object data.'
          color="sky"
        />

        <EnhancedCodeBlock
          code={`class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  // Method that READS properties
  checkBalance() {
    console.log(this.owner + "'s balance: $" + this.balance);
  }

  // Method that CHANGES properties
  deposit(amount) {
    this.balance += amount;                    // Change the balance
    console.log("Deposited $" + amount);
    this.checkBalance();                       // Call another method!
  }

  // Method that READS and CHANGES properties
  withdraw(amount) {
    if (amount > this.balance) {               // READ the balance
      console.log("Not enough money!");
      return;
    }
    this.balance -= amount;                    // CHANGE the balance
    console.log("Withdrew $" + amount);
    this.checkBalance();
  }
}

const acc = new BankAccount("Mehedi", 1000);
acc.checkBalance();   // Mehedi's balance: $1000
acc.deposit(500);     // Deposited $500 → Mehedi's balance: $1500
acc.withdraw(200);    // Withdrew $200 → Mehedi's balance: $1300`}
          language="javascript"
        />

        <InfoCallout emoji="🔑" title="Key insight">
          <p>A method can call another method on the same object using <code>this.methodName()</code>. In the example above, <code>deposit()</code> calls <code>this.checkBalance()</code>.</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 4.3 Methods with Parameters ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Methods with Parameters"
          description="Methods can receive additional information through parameters, just like regular functions. This makes methods flexible."
          color="emerald"
        />

        <EnhancedCodeBlock
          code={`class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  // Method with parameters
  addItem(name, price, quantity = 1) {
    this.items.push({ name, price, quantity });
    this.total += price * quantity;
    console.log("Added " + quantity + "x " + name + " ($" + price + " each)");
  }

  // Method with a parameter that affects behavior
  removeItem(name) {
    const index = this.items.findIndex(item => item.name === name);
    if (index === -1) {
      console.log(name + " not found in cart!");
      return;
    }
    const item = this.items[index];
    this.total -= item.price * item.quantity;
    this.items.splice(index, 1);
    console.log("Removed " + name);
  }

  showCart() {
    console.log("--- Shopping Cart ---");
    this.items.forEach(item => {
      console.log("  " + item.name + " x" + item.quantity + " = $" + (item.price * item.quantity));
    });
    console.log("  Total: $" + this.total);
  }
}

const cart = new ShoppingCart();
cart.addItem("Laptop", 999);
cart.addItem("Mouse", 25, 2);
cart.addItem("Keyboard", 75);
cart.showCart();
// --- Shopping Cart ---
//   Laptop x1 = $999
//   Mouse x2 = $50
//   Keyboard x1 = $75
//   Total: $1124`}
          language="javascript"
        />
      </div>

      <Divider />

      {/* ── 4.4 Methods Returning Values ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Methods Returning Values"
          description="Methods can return values using the 'return' keyword. This lets you use the result of a method somewhere else in your code."
          color="amber"
        />

        <EnhancedCodeBlock
          code={`class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this;  // Return the object itself for chaining!
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  getResult() {
    return this.value;
  }

  reset() {
    this.value = 0;
    return this;
  }
}

const calc = new Calculator();

// Method chaining — calling methods one after another!
const result = calc.add(10).subtract(3).multiply(2).getResult();
console.log(result); // (10 - 3) * 2 = 14

// Another example
const result2 = calc.reset().add(100).subtract(50).getResult();
console.log(result2); // 50`}
          language="javascript"
        />

        <InfoCallout emoji="⛓️" title="Method Chaining">
          <p>When a method returns <code>this</code> (the object itself), you can chain multiple method calls together. This is a very common pattern in JavaScript libraries (like jQuery, Mongoose, etc.).</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 4.5 More Real Examples ── */}
      <div className="mb-16">
        <TopicHeader
          number={5}
          title="More Real-World Method Examples"
          description="Let us see methods in action with examples you might encounter in real applications."
          color="secondary"
        />

        <div className="mb-8">
          <SectionHeading>📌 Example: User with login/logout</SectionHeading>
          <EnhancedCodeBlock
            code={`class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isLoggedIn = false;
    this.lastLogin = null;
  }

  login(inputPassword) {
    if (inputPassword === this.password) {
      this.isLoggedIn = true;
      this.lastLogin = new Date().toLocaleString();
      console.log("✅ " + this.name + " logged in at " + this.lastLogin);
    } else {
      console.log("❌ Wrong password!");
    }
  }

  logout() {
    this.isLoggedIn = false;
    console.log(this.name + " logged out. Goodbye! 👋");
  }

  getStatus() {
    return this.isLoggedIn ? "Online 🟢" : "Offline 🔴";
  }
}

const user = new User("Mehedi", "m@test.com", "secret123");
console.log(user.getStatus());     // Offline 🔴
user.login("wrong");                // ❌ Wrong password!
user.login("secret123");            // ✅ Mehedi logged in at ...
console.log(user.getStatus());     // Online 🟢
user.logout();                      // Mehedi logged out. Goodbye! 👋`}
            language="javascript"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>📌 Example: Product with pricing</SectionHeading>
          <EnhancedCodeBlock
            code={`class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Method that calculates and returns a value
  calculateDiscount(percent) {
    const discount = this.price * (percent / 100);
    return this.price - discount;
  }

  // Method that uses another method's result
  showPriceWithTax(taxRate = 15) {
    const tax = this.price * (taxRate / 100);
    const total = this.price + tax;
    console.log(this.name + ": $" + this.price + " + tax = $" + total.toFixed(2));
    return total;
  }
}

const laptop = new Product("MacBook", 1299);
console.log(laptop.calculateDiscount(10)); // 1169.1
laptop.showPriceWithTax();                  // MacBook: $1299 + tax = $1493.85
laptop.showPriceWithTax(5);                 // MacBook: $1299 + tax = $1363.95`}
            language="javascript"
          />
        </div>
      </div>

      <Divider />

      {/* ── Mistakes ── */}
      <div className="mb-16">
        <SectionHeading>⚠️ Common Method Mistakes</SectionHeading>

        <MistakeBox
          title='Calling a method without parentheses'
          description="If you forget the parentheses (), you are not calling the method — you are just referencing the function itself. You will get the function code instead of the result."
          wrong='console.log(user.greet);    // ❌ Shows the function code'
          right='console.log(user.greet());  // ✅ Actually runs the function'
        />

        <MistakeBox
          title='Forgetting "this" when accessing properties inside a method'
          description='Inside a method, you MUST use "this" to access the object properties. Without it, JavaScript looks for a variable outside the class.'
          wrong={`getName() { return name; }        // ❌ "name" is not defined`}
          right={`getName() { return this.name; }    // ✅ Correct`}
        />
      </div>

      {/* ── Summary ── */}
      <SummaryBox>
        A <strong>method</strong> is a function that belongs to a class/object. Methods define what actions an object can perform. They use <code>this</code> to access the object&apos;s data, can accept parameters, and can return values. Methods can also call other methods on the same object using <code>this.otherMethod()</code>.
      </SummaryBox>

      <div className="mt-6" />

      <PredictOutputBox
        code={`class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
    return this;
  }
  getCount() {
    return this.count;
  }
}

const c = new Counter();
console.log(c.increment().increment().increment().getCount());`}
        answer="3"
      />

      <QuickCheck
        question="What does it mean when a method 'returns this'?"
        answer="It returns the object itself. This allows method chaining — calling multiple methods one after another in a single line, like calc.add(5).subtract(2).getResult()."
      />

      <div className="mt-6" />

      <ExerciseBox
        level="intermediate"
        title="Build a TodoList class"
        description={`Create a TodoList class with:\n- A constructor that initializes an empty tasks array\n- addTask(title) — adds a task with { title, done: false }\n- completeTask(title) — marks the task as done\n- getRemaining() — returns the count of incomplete tasks\n- showTasks() — prints all tasks with ✅ or ⬜\n\nCreate a list, add 3 tasks, complete 1, and show all tasks.`}
        solution={`class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    this.tasks.push({ title, done: false });
    console.log("Added: " + title);
  }

  completeTask(title) {
    const task = this.tasks.find(t => t.title === title);
    if (task) {
      task.done = true;
      console.log("Completed: " + title + " ✅");
    } else {
      console.log("Task not found: " + title);
    }
  }

  getRemaining() {
    return this.tasks.filter(t => !t.done).length;
  }

  showTasks() {
    console.log("--- Todo List ---");
    this.tasks.forEach(t => {
      console.log((t.done ? "✅" : "⬜") + " " + t.title);
    });
    console.log("Remaining: " + this.getRemaining());
  }
}

const myList = new TodoList();
myList.addTask("Learn OOP");
myList.addTask("Build a project");
myList.addTask("Read documentation");
myList.completeTask("Learn OOP");
myList.showTasks();
// --- Todo List ---
// ✅ Learn OOP
// ⬜ Build a project
// ⬜ Read documentation
// Remaining: 2`}
      />

    </SectionContainer>
  );
}
