import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function AbstractionSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-[1rem] border border-slate-200/60 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-2xl backdrop-blur-xl mb-12">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 font-black">
            5
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Abstraction
          </h2>
        </div>

        {/* CORE TOPIC 1: Abstraction */}
        <div className="mb-16">
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-6">
            <h3 className="font-bold text-xl text-sky-700 dark:text-sky-400 mb-2">
              1. What is Abstraction?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Abstraction means saying <strong>what should happen</strong> without saying <strong>how to do it</strong>. It hides the messy, complicated logic and only gives you simple, easy-to-use controls.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              If you had to understand exactly how a car engine worked to drive to the store, nobody would drive. Abstraction makes code easier to use because you do not need to understand the complex wiring inside to make it work.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> A `CoffeeMachine` class has a simple `makeCoffee()` method. You don't need to know how it boils the water or grinds the beans. You just call the method.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write an abstract class:</strong> Put the `abstract` keyword in front of the class. This makes it a half-finished plan.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">abstract class CoffeeMaker {'{'} ... {'}'}</div>
              </li>
              <li>
                <strong>Write an abstract method:</strong> This method has no code! It just says "this must exist".
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">abstract brew(): void;</div>
              </li>
              <li>
                <strong>Fill in the blanks:</strong> A child class must extend it and write the actual code for the method.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> To turn on a light, you flip a switch. You don't need to know about wires or electricity. The switch is the abstraction.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> We make an abstract plan for a car, and then build a real Honda.</p>
              <EnhancedCodeBlock
                code={`// 1. The Abstract Class (A half-finished plan)
abstract class Car {
  // A regular method with real code
  startEngine() {
    console.log("Vroom!");
  }

  // An abstract method (NO CODE! Just a rule)
  abstract drive(): void;
}

// 2. The Child Class (Finishes the plan)
class Honda extends Car {
  // Must write the drive method, or TypeScript gets mad
  drive() {
    console.log("Driving a Honda!");
  }
}

const myCar = new Honda();
myCar.startEngine(); // Vroom! (Got it for free)
myCar.drive();       // Driving a Honda!`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Trying to make an object directly from an abstract class:</strong> Because an abstract class is only half-finished, you cannot create an object from it directly. You must use a finished child class.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">const car = new Car(); // ❌ Error!</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">const car = new Honda(); // ✅ Works</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Abstraction hides complex logic behind simple methods. An `abstract` class is a half-finished blueprint. It cannot be used directly; it must be extended by a child class.</p>
          </div>

          <QuickCheck
            question="Can you use 'new Car()' if Car is an abstract class?"
            answer="No. You cannot make an object directly from an abstract class because it is incomplete. You must make a child class first."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 2: Abstract Class vs Interface */}
        <div className="mb-16">
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-6">
            <h3 className="font-bold text-xl text-amber-700 dark:text-amber-400 mb-2">
              2. Abstract Class vs Interface
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              They both set rules that other classes must follow. But an <strong>Interface</strong> has zero code. An <strong>Abstract Class</strong> can have a mix of rules <em>and</em> real working code.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              If you only want to set rules, use an Interface. If you want to set rules AND share some working code (like a shared `log()` method), you must use an Abstract Class.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> NestJS Guards only need a rule (`canActivate`). So they use an Interface. Repositories need rules AND a shared database connection. So they use an Abstract Class.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Interface:</strong> Use `implements`. You can implement multiple interfaces. No actual code allowed inside.
              </li>
              <li>
                <strong>Abstract Class:</strong> Use `extends`. You can only extend ONE class. Actual code is allowed inside.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> An Interface is a pure job description on paper. An Abstract Class is a half-built house — the walls are there (real code), but you have to paint them (the rules).</p>
              <div className="overflow-x-auto p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="py-2 px-3 text-left font-bold text-slate-500">Feature</th>
                      <th className="py-2 px-3 text-center font-bold text-blue-600">Interface</th>
                      <th className="py-2 px-3 text-center font-bold text-amber-600">Abstract Class</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 dark:text-slate-400">
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 px-3">Can have real code inside?</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✅ Yes</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 px-3">Can you make objects from it?</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Can a class use more than one?</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✅ Yes</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No (Only one)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Using the wrong keyword:</strong> Classes `implement` interfaces, but they `extend` abstract classes. Mixing these up will cause errors.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">class Car extends MyInterface</code>
                <code className="text-xs">class Car implements MyAbstractClass</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">class Car implements MyInterface</code>
                <code className="text-xs">class Car extends MyAbstractClass</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Interfaces only set rules. Abstract classes set rules AND can share working code. Use interfaces when you just need a strict contract.</p>
          </div>

          <QuickCheck
            question="Which one allows you to write real, working code inside it: an Interface or an Abstract Class?"
            answer="An Abstract Class."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 3: Generics */}
        <div className="mb-16">
          <div className="p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 mb-6">
            <h3 className="font-bold text-xl text-indigo-700 dark:text-indigo-400 mb-2">
              3. Quick Note: Generics &lt;T&gt;
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              When you see <strong>&lt;T&gt;</strong>, it is called a Generic. It is simply a blank space for a type that you will fill in later. It means "This works with <em>any</em> type of data."
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              It lets you write one piece of code that works perfectly for many different data types, while still keeping TypeScript's strict rules. If you use `any`, you turn off all safety checks. If you use `&lt;T&gt;`, TypeScript still protects you.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> A `BaseRepository&lt;T&gt;` can save anything. If you use `BaseRepository&lt;User&gt;`, TypeScript knows it will only save Users. If you use `BaseRepository&lt;Product&gt;`, it knows it will only save Products.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Put &lt;T&gt; next to the name:</strong> This tells TypeScript "T is a blank space".
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">class Box&lt;T&gt;</div>
              </li>
              <li>
                <strong>Use T inside:</strong> Wherever you would normally write `string` or `number`, write `T`.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">contents: T;</div>
              </li>
              <li>
                <strong>Fill the blank:</strong> When you use the class, replace T with a real type.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">new Box&lt;string&gt;()</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> Think of a cardboard box. You can put anything inside it. A `Box&lt;Shoes&gt;` means this box specifically holds shoes.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> A function that returns whatever you give it.</p>
              <EnhancedCodeBlock
                code={`// The <T> tells TypeScript to watch what type is passed in
function wrapInArray<T>(item: T): T[] {
  return [item];
}

// Pass in a string -> T becomes 'string' -> returns string[]
const words = wrapInArray<string>("hello");

// Pass in a number -> T becomes 'number' -> returns number[]
const numbers = wrapInArray<number>(99);`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Using 'any' instead of Generics:</strong> `any` completely disables TypeScript. Generics keep the strict rules, they just adapt to whatever type you provide.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">function wrap(item: any): any[]</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">function wrap&lt;T&gt;(item: T): T[]</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Generics `&lt;T&gt;` are blank spaces for types. They allow you to write reusable code that is still safe and strictly typed by TypeScript.</p>
          </div>

          <QuickCheck
            question="Why should you use <T> instead of 'any'?"
            answer="Because 'any' turns off TypeScript's safety checks completely. <T> keeps the strict safety checks while allowing the code to be flexible."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 4: Abstract Repository Pattern */}
        <div className="mb-16">
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-6">
            <h3 className="font-bold text-xl text-purple-700 dark:text-purple-400 mb-2">
              4. The Abstract Repository Pattern
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              This is a very common NestJS pattern. You create one Abstract Parent Repository with shared logic, and then all your real repositories (User, Product) extend it.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              It forces every repository in your app to have the exact same methods (like `findAll` and `create`). It also gives them a place to share common code, like a database connection or a `log()` method, saving you hundreds of lines of typing.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> If a new developer joins the team and makes an `OrderRepository`, they are forced to write a `delete()` method because the Abstract parent requires it. The app won't build until they do.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>The Blueprint:</strong> Write `abstract class BaseRepository&lt;T&gt;` with abstract methods.
              </li>
              <li>
                <strong>The Real Thing:</strong> Create `UserRepository extends BaseRepository&lt;User&gt;`.
              </li>
              <li>
                <strong>Write the logic:</strong> Write the actual code for `findAll` and `create` inside `UserRepository`.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> The abstract class is the architect's blueprint. The `UserRepository` is the construction crew actually building it.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> Creating a required structure for all repositories.</p>
              <EnhancedCodeBlock
                code={`// 1. The Blueprint (Abstract Class + Generics)
abstract class BaseRepository<T> {
  // Shared code! Every child gets this for free.
  log(action: string) { console.log(action); }

  // Rules! Every child MUST write their own version of this.
  abstract findAll(): Promise<T[]>;
}

// 2. The Implementation (Fills in the <T> with <User>)
class UserRepository extends BaseRepository<User> {
  
  // We MUST write this method, or TypeScript throws an error
  async findAll(): Promise<User[]> {
    this.log("Finding users..."); // Free inherited method
    return []; // Return real data here
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
              <strong>Forgetting to write an abstract method:</strong> If the parent has `abstract create()`, the child MUST have a `create()` method. If you forget it, the code will completely fail to compile.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">class UserRepo extends BaseRepo {}</code>
                <span className="text-[10px] text-red-500 mt-1 block">Error: Missing findAll()</span>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">class UserRepo extends BaseRepo {'{'}</code>
                <code className="text-xs pl-2">findAll() {'{ ... }'}</code>
                <code className="text-xs">{'}'}</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">The Abstract Repository Pattern uses a parent class to enforce rules across all repositories, while also providing a place to share common code like logging or database connections.</p>
          </div>

          <QuickCheck
            question="If a parent class has 'abstract delete(): void', what MUST the child class do?"
            answer="The child class MUST write a 'delete()' method. If it does not, TypeScript will throw an error and the app will not run."
          />
        </div>

      </div>
    </section>
  );
}
