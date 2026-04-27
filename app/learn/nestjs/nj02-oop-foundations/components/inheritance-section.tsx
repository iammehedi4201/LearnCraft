import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function InheritanceSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-lg border border-slate-200/40 dark:border-slate-700/40 backdrop-blur-sm mb-12">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 font-black">
            3
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Inheritance
          </h2>
        </div>

        {/* CORE TOPIC 1: Inheritance */}
        <div className="mb-16">
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-6">
            <h3 className="font-bold text-xl text-sky-700 dark:text-sky-400 mb-2">
              1. What is Inheritance?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Inheritance is a way for a "child" class to automatically copy all the data and actions from a "parent" class. After copying everything, the child can add its own new features.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              It stops you from copy-pasting code. If 10 different classes all need the same three variables, you shouldn't type them 10 times. You write them once in a parent class, and the children get them for free. This is called the <strong>DRY rule</strong> (Don't Repeat Yourself).
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> Both `User` and `Product` need an `id` and a `createdAt` date. Instead of writing them twice, you put them in a `BaseItem` parent class.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write the parent class:</strong> Put the shared data and actions here.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">class Parent {'{'} sharedData = 1; {'}'}</div>
              </li>
              <li>
                <strong>Write the child class:</strong> Use the `extends` keyword to link them.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">class Child extends Parent {'{'} myOwnData = 2; {'}'}</div>
              </li>
              <li>
                <strong>Use it:</strong> The child now has both.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">const c = new Child(); console.log(c.sharedData);</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> Think of a family. A parent passes down traits like eye color to their child. The child gets the traits automatically, but can also dye their hair a new color.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> We have a `BaseEntity` that handles IDs. `UserEntity` gets the ID for free and adds an email.</p>
              <EnhancedCodeBlock
                code={`// 1. The Parent: Holds shared data
class BaseEntity {
  id: number = 123;
  createdAt: string = "Today";
}

// 2. The Child: Uses "extends" to copy the Parent
class UserEntity extends BaseEntity {
  email: string = "m@test.com";
}

const user = new UserEntity();
console.log(user.id);    // ✅ Inherited for free! (123)
console.log(user.email); // ✅ Child's own data (m@test.com)`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Deep inheritance chains:</strong> Do not make a class extend a class that extends a class that extends a class (A → B → C → D). If D has a bug, you have to search through 4 files to find it. Keep it simple: Parent → Child.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs block">class Feline extends Mammal...</code>
                <code className="text-xs block">class Cat extends Feline...</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs block">class Cat extends Animal...</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Inheritance lets a child class copy everything from a parent class. It uses the `extends` keyword. It saves you from writing the exact same code multiple times.</p>
          </div>

          <QuickCheck
            question="What keyword do you use to make a child class inherit from a parent class?"
            answer="The 'extends' keyword."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 2: The super() Keyword */}
        <div className="mb-16">
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-6">
            <h3 className="font-bold text-xl text-amber-700 dark:text-amber-400 mb-2">
              2. The super() Keyword
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>super()</strong> is a required function call inside a child's constructor. It triggers the parent's constructor to run.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              The parent class has its own data to set up. If a child has a constructor, it must tell the parent to run its setup first. If you skip this, the parent is broken, and TypeScript will throw a massive error.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> If the parent sets up the `id`, the child must use `super()` to pass the `id` up to the parent so the parent can do its job.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Check the parent:</strong> See what data the parent constructor needs.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">constructor(public id: number)</div>
              </li>
              <li>
                <strong>Write the child constructor:</strong> Ask for all the data needed for both parent and child.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">constructor(id: number, public name: string)</div>
              </li>
              <li>
                <strong>Call super() first:</strong> Before doing anything else, pass the parent's data up using `super()`.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">super(id);</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> You are building a house. You must tell the parent to build the foundation (`super()`) before you start painting your own bedroom walls.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> The child asks the user for the `id` and the `name`. It passes the `id` up, and keeps the `name` for itself.</p>
              <EnhancedCodeBlock
                code={`class BaseEntity {
  // Parent needs an ID
  constructor(public id: number) {
    console.log("Parent setup done!");
  }
}

class User extends BaseEntity {
  // Child asks for ID and Name
  constructor(id: number, public name: string) {
    super(id); // ⬅️ MUST go first! Passes ID to parent.
    console.log("Child setup done!");
  }
}

const me = new User(99, "Mehedi");
console.log(me.id); // 99 (from parent)`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Calling super() too late:</strong> `super()` MUST be the very first line inside the child's constructor. You cannot use `this` before calling `super()`.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs block">this.name = name;</code>
                <code className="text-xs block">super(id);</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs block">super(id);</code>
                <code className="text-xs block">this.name = name;</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">If a child has a constructor, it must call `super()` on the first line. This passes data up to the parent so the parent can build its own parts.</p>
          </div>

          <QuickCheck
            question="What happens if you forget to write super() inside a child's constructor?"
            answer="TypeScript throws a compilation error and your code will not run at all."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 3: NestJS Exceptions */}
        <div className="mb-16">
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-6">
            <h3 className="font-bold text-xl text-purple-700 dark:text-purple-400 mb-2">
              3. How NestJS Uses Inheritance (Exceptions)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              NestJS provides built-in error classes (like "Not Found"). They all use inheritance. They all come from one main parent class called <strong>HttpException</strong>.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Because they all share the same parent, they all work exactly the same way. You don't have to learn a different system for a 404 error vs a 500 error. The parent handles all the messy HTTP status code logic for you.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> If you use `NotFoundException`, it automatically sends a 404 status code to the user's browser. It gets this ability directly from its parent.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>NestJS built the parent:</strong> `HttpException` holds the logic for sending internet error codes.
              </li>
              <li>
                <strong>NestJS built the children:</strong> `NotFoundException` extends the parent and automatically passes the number 404 into `super()`.
              </li>
              <li>
                <strong>You just use the child:</strong> Throw the error, and NestJS does the rest.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">throw new NotFoundException();</div>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> You don't build a car from scratch to drive to the store. You just buy a Honda (child) which already has an engine (parent).</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> Finding a user by ID. If the user does not exist, throw the child exception.</p>
              <EnhancedCodeBlock
                code={`// You do NOT need to write this. NestJS already did:
// class HttpException { ... }
// class NotFoundException extends HttpException { ... }

class UserService {
  getUser(id: number) {
    const user = db.find(id);
    
    if (!user) {
      // You just use the built-in child class!
      // It inherits the ability to send a 404 internet code.
      throw new NotFoundException("This user does not exist!");
    }
    
    return user;
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
              <strong>Building custom errors from scratch:</strong> Do not build your own error classes from scratch if a NestJS one already exists. Just use the built-in children.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs">throw new Error("404 Not Found");</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs">throw new NotFoundException();</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">NestJS errors use inheritance. `HttpException` is the parent. Things like `NotFoundException` are children. They do all the heavy lifting for you.</p>
          </div>

          <QuickCheck
            question="What is the name of the main parent class for all internet errors in NestJS?"
            answer="HttpException."
          />
        </div>

      </div>
    </section>
  );
}
