import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function ClassesObjectsSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-[1rem] border border-slate-200/60 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-2xl backdrop-blur-xl mb-12">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 font-black">
            1
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Classes & Objects
          </h2>
        </div>

        {/* CORE TOPIC 1: Classes and Objects */}
        <div className="mb-16">
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-6">
            <h3 className="font-bold text-xl text-sky-700 dark:text-sky-400 mb-2">
              1. What is a Class?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A <strong>class</strong> is a set of instructions for building something. It holds both the data and the actions together in one place. An <strong>object</strong> is the real thing you build using those instructions.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Normally, variables (data) and functions (actions) are scattered everywhere. This gets messy very fast. Classes solve this by locking related data and actions together in a neat box.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> Instead of having a floating `userName` variable and a floating `changeName()` function, a `User` class keeps them permanently attached to each other.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Define the class:</strong> Use the `class` keyword.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">class User {'{'} {'}'}</div>
              </li>
              <li>
                <strong>Add data and actions:</strong> Put variables and functions inside the brackets.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">class User {'{'} name = "Mehedi"; sayHi() {'{'} console.log("Hi"); {'}'} {'}'}</div>
              </li>
              <li>
                <strong>Create the object:</strong> Use the `new` keyword to build the actual item.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">const myUser = new User();</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> A class is a recipe for a cake. An object is the actual cake you bake. You can bake five cakes using the exact same recipe.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> In a shopping app, you have a `Product` class. Every time a seller adds a new item, you create a new `Product` object for it.</p>
              <EnhancedCodeBlock
                code={`class Product {
  // The data
  name = "Laptop";
  
  // The action
  showName() {
    console.log(this.name);
  }
}

// Build the actual object
const myItem = new Product();
myItem.showName(); // Outputs: Laptop`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Forgetting to use "this":</strong> Inside a class, you must use `this` to talk about its own data. If you just write the variable name, the code breaks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">console.log(name);</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">console.log(this.name);</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">A class is a blueprint. An object is the real item. Classes group related data and actions together. You use the `new` keyword to create an object.</p>
          </div>

          <QuickCheck
            question="If a class is like a recipe for a cake, what is the object?"
            answer="The object is the actual, physical cake that you bake and eat."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 2: Constructors */}
        <div className="mb-16">
          <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-6">
            <h3 className="font-bold text-xl text-emerald-700 dark:text-emerald-400 mb-2">
              2. What is a Constructor?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A <strong>constructor</strong> is a special function inside a class. It runs automatically the exact moment you create a new object.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              If you do not have a constructor, every object you make will start with the exact same data. A constructor lets you give each object its own unique starting information.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> Without a constructor, every new User object would have the name "John Doe". With a constructor, you can pass in the correct name right when the object is built.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write the constructor:</strong> Add `constructor()` inside your class.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">constructor() {'{'} {'}'}</div>
              </li>
              <li>
                <strong>Add parameters:</strong> Tell the constructor what data it needs to start.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">constructor(startingName) {'{'} this.name = startingName; {'}'}</div>
              </li>
              <li>
                <strong>Pass the data:</strong> When you use `new`, put the actual data inside the parentheses.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">const user = new User("Alice");</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> If your class is a pizza, the constructor is the moment you choose your toppings before it goes in the oven.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> When a new user signs up, you create a `User` object. You pass their email into the constructor so the object saves it immediately.</p>
              <EnhancedCodeBlock
                code={`class User {
  name: string;

  // Runs exactly once when the object is made
  constructor(userName: string) {
    this.name = userName;
  }
}

// We pass "Alice" into the constructor
const user1 = new User("Alice");
const user2 = new User("Bob");`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Forgetting the "new" keyword:</strong> You cannot run a class like a normal function. The `new` keyword is what triggers the constructor to run.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">const user = User("Alice");</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">const user = new User("Alice");</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">A constructor is a special function. It runs the moment an object is built. It is used to set up the starting data for that specific object.</p>
          </div>

          <QuickCheck
            question="When exactly does a constructor function run?"
            answer="It runs instantly when you use the 'new' keyword to create the object."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 3: Access Modifiers */}
        <div className="mb-16">
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-6">
            <h3 className="font-bold text-xl text-amber-700 dark:text-amber-400 mb-2">
              3. Access Modifiers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Access modifiers are labels (`public`, `private`, `protected`, `readonly`) that control who is allowed to see or change the data inside your class.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              If all data is open, anyone can change it by accident. By using these labels, you protect your data. You lock down the important parts and only leave the safe parts open.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> A user's email address can be `public` (everyone can see it). But their password must be `private` (no other code can see it). Their account ID should be `readonly` (it never changes).
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write the label first:</strong> Put the modifier right before the variable name.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">private password: string;</div>
              </li>
              <li>
                <strong>public:</strong> Anyone can see and change it. This is the default if you write nothing.
              </li>
              <li>
                <strong>private:</strong> Only code inside this exact class can see it.
              </li>
              <li>
                <strong>readonly:</strong> You set it once in the constructor. After that, it can never be changed.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> `public` is a public park. `private` is your personal diary. `readonly` is your birthday — it cannot be changed.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> In a banking app, the `balance` is private. No other code can change the balance directly. They have to use a safe deposit function instead.</p>
              <EnhancedCodeBlock
                code={`class BankAccount {
  public owner: string;       // Anyone can see this
  private balance: number;    // Hidden from outside
  readonly id: number;        // Set once, never changed

  constructor(owner: string, balance: number, id: number) {
    this.owner = owner;
    this.balance = balance;
    this.id = id;
  }
}

const account = new BankAccount("Mehedi", 100, 1);
console.log(account.owner);   // ✅ Works!
// account.balance = 500;     // ❌ Error! It is private.
// account.id = 2;            // ❌ Error! It is readonly.`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Changing a readonly property:</strong> Once an object is created, you cannot change a property marked as `readonly`. It is locked forever.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">account.id = 99;</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">console.log(account.id); // Just reading is fine</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Modifiers protect your data. `public` is open to everyone. `private` is locked inside the class. `readonly` prevents any changes after the start.</p>
          </div>

          <QuickCheck
            question="Which access modifier stops anyone from changing the value after the object is created?"
            answer="The 'readonly' modifier."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 4: TypeScript Constructor Shorthand */}
        <div className="mb-16">
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-6">
            <h3 className="font-bold text-xl text-purple-700 dark:text-purple-400 mb-2">
              4. TypeScript Constructor Shorthand
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              This is a shortcut. It lets you create a property and assign its starting value in one single step inside the constructor.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Normally, you have to write a property name three separate times: once to create it, once in the constructor parenthesis, and once to assign it. This shortcut does all three at once. NestJS uses this shortcut everywhere to keep code clean.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> In NestJS, you will pull in a database service. Without the shorthand, it takes 4 lines of code. With the shorthand, it takes exactly 1 line.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Open the constructor:</strong> Write the `constructor()` function.
              </li>
              <li>
                <strong>Add the modifier inside:</strong> Put `public`, `private`, or `readonly` directly in front of the parameter name inside the brackets.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">constructor(private name: string)</div>
              </li>
              <li>
                <strong>Leave the body empty:</strong> TypeScript automatically creates the property and saves the value. You don't need to write `this.name = name`.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">constructor(private name: string) {'{'} /* Empty! */ {'}'}</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> It is like buying a pre-built house instead of laying every brick yourself.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> We rewrite the BankAccount class from above. Look at how much code we delete.</p>
              <EnhancedCodeBlock
                code={`// The long way (Lots of repeated typing)
class OldAccount {
  public owner: string;
  constructor(owner: string) {
    this.owner = owner;
  }
}

// ✅ The Shorthand way (NestJS way)
class NewAccount {
  constructor(
    public owner: string,
    private balance: number,
    public readonly id: number
  ) {} 
  // ☝️ The body is empty! TypeScript does it all for you.
}

const myAccount = new NewAccount("Mehedi", 100, 1);
console.log(myAccount.owner); // ✅ Works exactly the same`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Forgetting the modifier:</strong> If you forget to write `public` or `private` inside the constructor, TypeScript treats it as a normal parameter. It will NOT create a property for you.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">constructor(name: string) {'{}'}</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">constructor(public name: string) {'{}'}</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">The shorthand creates and assigns properties in one line. You just put an access modifier inside the constructor brackets. NestJS relies heavily on this feature.</p>
          </div>

          <QuickCheck
            question="What must you put in front of a parameter to make the shorthand work?"
            answer="An access modifier like 'public', 'private', or 'protected'."
          />
        </div>

      </div>
    </section>
  );
}
