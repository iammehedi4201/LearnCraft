import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function EncapsulationSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-[1rem] border border-slate-200/60 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-2xl backdrop-blur-xl mb-12">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 font-black">
            2
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Encapsulation
          </h2>
        </div>

        {/* CORE TOPIC 1: Encapsulation */}
        <div className="mb-16">
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-6">
            <h3 className="font-bold text-xl text-sky-700 dark:text-sky-400 mb-2">
              1. What is Encapsulation?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Encapsulation means <strong>hiding the inside parts</strong> of your code and only showing safe controls. Instead of letting anyone touch a value directly, you force them to go through a "guard" function.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              If you leave all your data open, any part of your app can change it by accident. This causes bugs that are very hard to track down. By locking the data inside the class, you protect it from bad changes.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> Think of a bank app. If the account balance is open, anyone can change it to a negative number or give themselves a million dollars. Encapsulation hides the balance and forces changes through a `deposit()` function that checks the rules first.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Make data private:</strong> Use the `private` keyword so no one outside the class can touch it.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">private balance: number = 0;</div>
              </li>
              <li>
                <strong>Create a safe function:</strong> Write a `public` method that other code can call to change the data safely.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">public deposit(amount) {'{'} ... {'}'}</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> When you drive a car, you use the steering wheel and pedals. You do not touch the hot engine to turn left. The messy, dangerous parts are hidden (`private`). You only get safe controls (`public`).</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> In a game, a player's health must stay between 0 and 100. By hiding the health, you force the game to use a `takeDamage()` function that stops exactly at 0.</p>
              <EnhancedCodeBlock
                code={`class Player {
  // 1. Hide the data
  private health: number = 100;

  // 2. Make a safe way to change it
  public takeDamage(amount: number): void {
    this.health -= amount;
    
    // Safety rule!
    if (this.health < 0) {
      this.health = 0;
    }
  }
}

const p1 = new Player();
// p1.health = -500; // ❌ Error! Hidden.
p1.takeDamage(200);  // ✅ Works safely. Health stops at 0.`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Making everything public out of laziness:</strong> It is tempting to make all data `public` so it is easy to reach. But this defeats the entire purpose of a class. Always make data `private` unless you have a very good reason not to.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">public password: string;</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">private password: string;</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Encapsulation means hiding data and protecting it from bad changes. You use the `private` keyword to hide properties. You write `public` methods to let people change the data safely.</p>
          </div>

          <QuickCheck
            question="Why is it a bad idea to make a 'balance' property public on a BankAccount class?"
            answer="Because anyone could set the balance to any value — like negative numbers or huge amounts — with no checks."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 2: Getters and Setters */}
        <div className="mb-16">
          <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-6">
            <h3 className="font-bold text-xl text-emerald-700 dark:text-emerald-400 mb-2">
              2. Getters and Setters
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A <strong>getter</strong> is a safe function that lets outside code read a private value. A <strong>setter</strong> is a safe function that lets outside code change a private value.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              They act as gatekeepers. Before someone can change a value, the setter can check rules, format text, or record a log entry. This keeps your data clean.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> If a user changes their password, a setter can check if the new password is at least 8 characters long before saving it.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write the getter:</strong> Make a function that simply returns the hidden variable.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">getPassword() {'{'} return this.password; {'}'}</div>
              </li>
              <li>
                <strong>Write the setter:</strong> Make a function that takes a new value.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">setPassword(newPass) {'{'} ... {'}'}</div>
              </li>
              <li>
                <strong>Add rules inside the setter:</strong> Check if the value is okay before saving it.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">if (newPass.length &gt; 5) {'{'} this.password = newPass; {'}'}</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> A getter is like looking at a museum painting. A setter is the security guard who checks your hands before you are allowed to touch it.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> Setting a new username. The setter ensures the name is not empty before saving it.</p>
              <EnhancedCodeBlock
                code={`class Account {
  private username: string = "Guest";

  // Getter: Just look, do not touch
  public getUsername(): string {
    return this.username;
  }

  // Setter: The security guard
  public setUsername(newName: string): void {
    if (newName === "") {
      console.log("Name cannot be empty!");
      return; // Stop
    }
    this.username = newName;
  }
}

const myAcc = new Account();
console.log(myAcc.getUsername()); // Outputs: Guest
myAcc.setUsername("");            // Fails rule, does nothing
myAcc.setUsername("Alice");       // Passes rule, saves "Alice"`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Writing a setter with no rules:</strong> If you hide your data, but then create a function that lets anyone change it without checking any rules, you haven't fixed the problem. A setter must guard the data.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">setAge(a) {'{'} this.age = a; {'}'}</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">setAge(a) {'{'} if(a &gt; 0) this.age = a; {'}'}</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Getters and setters are the gatekeepers to your hidden data. Getters let people read the data. Setters check rules before allowing changes to the data.</p>
          </div>

          <QuickCheck
            question="What is the main job of a setter function?"
            answer="To check rules and validate a new value before allowing it to replace the old hidden value."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 3: Encapsulation in NestJS */}
        <div className="mb-16">
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-6">
            <h3 className="font-bold text-xl text-purple-700 dark:text-purple-400 mb-2">
              3. Encapsulation in NestJS (Layers)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              NestJS uses encapsulation on a large scale by splitting your app into <strong>Layers</strong> (Controller, Service, Repository). Each layer hides its messy details from the others.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              It keeps massive apps organized. If the way you save to the database changes, only the Repository layer needs to update. The other layers do not care because those details are hidden from them.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> The Controller takes a request from a user. It asks the Service to handle it. The Controller does not know or care if the Service uses a database, an API, or a text file. The details are encapsulated.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Controller:</strong> The front desk. It takes the request and passes it on.
              </li>
              <li>
                <strong>Service:</strong> The worker. It contains the business rules. It asks the repository to get or save data.
              </li>
              <li>
                <strong>Repository:</strong> The storage room. It is the only layer allowed to touch the actual database.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> In a restaurant, the Waiter (Controller) takes your order. The Chef (Service) cooks it. The Pantry worker (Repository) gets the ingredients. The Waiter never goes into the pantry.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> When a user signs up, the layers work together like this:</p>
              <EnhancedCodeBlock
                code={`// 1. Controller gets the request from the internet
class UserController {
  constructor(private userService: UserService) {}

  signUp(email: string) {
    // Only calls a safe public method. Hides the messy work.
    return this.userService.registerUser(email);
  }
}

// 2. Service checks the rules
class UserService {
  constructor(private repo: UserRepository) {}

  registerUser(email: string) {
    if (!email.includes("@")) throw new Error("Bad email");
    return this.repo.saveToDatabase(email);
  }
}`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Putting database code inside the Controller:</strong> This breaks encapsulation. The controller should never touch the database directly.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">Controller: db.query('SELECT *')</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">Controller: this.service.getUsers()</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">NestJS separates code into layers. The Controller handles requests. The Service handles rules. The Repository handles the database. They hide details from each other.</p>
          </div>

          <QuickCheck
            question="Which layer in NestJS is the only one that should talk directly to the database?"
            answer="The Repository layer."
          />
        </div>

      </div>
    </section>
  );
}
