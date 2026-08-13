"use client";

import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  SummaryBox,
  Divider,
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

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Game Character Methods</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Character {
  name: string;
  health: number;

  constructor(name: string, health: number) {
    this.name = name;
    this.health = health;
  }

  // These are all methods (actions)
  attack(target: string) {
    console.log(this.name + " attacks " + target + "! ⚔️");
  }

  heal(amount: number) {
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
            height="340px"
          />
        </div>
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

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class BankAccount {
  owner: string;
  balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  // Method that READS properties
  checkBalance() {
    console.log(this.owner + "'s balance: $" + this.balance);
  }

  // Method that CHANGES properties and calls another method
  deposit(amount: number) {
    this.balance += amount;
    console.log("Deposited $" + amount);
    this.checkBalance(); // Call another method on "this"!
  }

  // Method that READS and VALIDATES before changing
  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("❌ Not enough money to withdraw $" + amount);
      return;
    }
    this.balance -= amount;
    console.log("Withdrew $" + amount);
    this.checkBalance();
  }
}

const acc = new BankAccount("Mehedi", 1000);
acc.checkBalance();   // Mehedi's balance: $1000
acc.deposit(500);     // Deposited $500 → Mehedi's balance: $1500
acc.withdraw(200);    // Withdrew $200 → Mehedi's balance: $1300
acc.withdraw(2000);   // ❌ Not enough money!`}
            height="360px"
          />
        </div>

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

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class ShoppingCart {
  items: { name: string; price: number; quantity: number }[] = [];
  total: number = 0;

  addItem(name: string, price: number, quantity: number = 1) {
    this.items.push({ name, price, quantity });
    this.total += price * quantity;
    console.log("Added " + quantity + "x " + name + " ($" + price + " each)");
  }

  removeItem(name: string) {
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
cart.removeItem("Mouse");
cart.showCart();`}
            height="380px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 4.4 Methods Returning Values & Chaining ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Methods Returning Values & Method Chaining"
          description="Methods can return values using the 'return' keyword. When a method returns 'this', you can chain multiple calls in one line."
          color="amber"
        />

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Calculator {
  value: number;

  constructor(value: number = 0) {
    this.value = value;
  }

  add(num: number) {
    this.value += num;
    return this;  // Return the object itself for chaining!
  }

  subtract(num: number) {
    this.value -= num;
    return this;
  }

  multiply(num: number) {
    this.value *= num;
    return this;
  }

  getResult(): number {
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
console.log("(10 - 3) * 2 = " + result); // 14

const result2 = calc.reset().add(100).subtract(50).getResult();
console.log("Reset and calculated: " + result2); // 50`}
            height="360px"
          />
        </div>

        <InfoCallout emoji="⛓️" title="Method Chaining">
          <p>When a method returns <code>this</code> (the object itself), you can chain multiple method calls together. This is a very common pattern in JavaScript libraries (like jQuery, Mongoose, NestJS query builders, etc.).</p>
        </InfoCallout>
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

      {/* ── Interactive Practice Exercise ── */}
      <div className="mt-8">
        <SectionHeading>💻 Practice Exercise</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          exercise={{
            id: "oop-methods-todolist-ex",
            title: "Build a TodoList class",
            instructions: `Create a TodoList class with:
• A constructor that initializes an empty tasks array: { title: string; done: boolean }[]
• addTask(title: string) — adds a task with { title, done: false }
• completeTask(title: string) — marks the task as done
• getRemaining(): number — returns the count of incomplete tasks
• showTasks() — prints all tasks with ✅ or ⬜

Create a list, add 3 tasks, complete 1, and show all tasks.`,
            starterCode: `class TodoList {
  // Your code here

}

// Test your TodoList
const myList = new TodoList();
myList.addTask("Learn OOP");
myList.addTask("Build a project");
myList.addTask("Read documentation");
myList.completeTask("Learn OOP");
myList.showTasks();
`,
            solutionCode: `class TodoList {
  tasks: { title: string; done: boolean }[] = [];

  addTask(title: string) {
    this.tasks.push({ title, done: false });
    console.log("Added: " + title);
  }

  completeTask(title: string) {
    const task = this.tasks.find(t => t.title === title);
    if (task) {
      task.done = true;
      console.log("Completed: " + title + " ✅");
    } else {
      console.log("Task not found: " + title);
    }
  }

  getRemaining(): number {
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
myList.showTasks();`,
            hints: [
              "Initialize this.tasks = [] to store objects of shape { title: string, done: boolean }.",
              "completeTask(title) uses this.tasks.find(t => t.title === title) to locate and update the task.",
              "getRemaining() uses this.tasks.filter(t => !t.done).length to return the remaining count.",
            ],
            tests: [
              {
                name: "TodoList class exists",
                code: `if (typeof TodoList !== 'function') throw new Error("TodoList class not found");`,
              },
              {
                name: "addTask and getRemaining work",
                code: `const _tl = new TodoList(); _tl.addTask("Task 1"); _tl.addTask("Task 2"); if (_tl.getRemaining() !== 2) throw new Error("getRemaining should return 2");`,
              },
              {
                name: "completeTask updates remaining count",
                code: `const _tl2 = new TodoList(); _tl2.addTask("T1"); _tl2.completeTask("T1"); if (_tl2.getRemaining() !== 0) throw new Error("Remaining should be 0 after completing task");`,
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
