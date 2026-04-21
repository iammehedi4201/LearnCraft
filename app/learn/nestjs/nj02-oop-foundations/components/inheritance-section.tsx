import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function InheritanceSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        3. Inheritance — Family Traits
      </h2>
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">
        {/* What is Inheritance? */}
        <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
          <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">
            What is Inheritance?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            Inheritance lets a child class{" "}
            <strong>reuse all the code</strong> from a parent class, then
            add its own unique features on top. This prevents you from
            copy-pasting the same code into every class.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Why does it matter?</strong> Imagine you have 10
            database entities that all need an <code className="text-sky-600">id</code>,{" "}
            <code className="text-sky-600">createdAt</code>, and{" "}
            <code className="text-sky-600">updatedAt</code> field.
            Without inheritance, you write those 3 properties 10 times
            (30 lines of duplicated code). With inheritance, you write
            them <em>once</em> in a parent class, and every child gets
            them automatically.
          </p>
        </div>

        {/* Family Metaphor */}
        <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-emerald-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">
              The &quot;Family&quot; Metaphor: Passing down traits
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Inheritance</strong> is like passing down your last
              name or eye color to your children. In code, a
              &quot;Parent&quot; class can pass all its properties and
              methods down to a &quot;Child&quot; class using the{" "}
              <code className="text-emerald-600">extends</code> keyword.
              The child automatically gets everything the parent has, and
              can then add its own unique features on top.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Without inheritance */}
          <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="text-base">😫</span>
              Without Inheritance — Copy-Paste Nightmare
            </h4>
            <EnhancedCodeBlock
              code={`// ❌ Without inheritance — you repeat the SAME code in every class
class UserEntity {
  id: number;
  createdAt: Date = new Date();    // ← repeated
  updatedAt: Date = new Date();    // ← repeated
  name: string;
  email: string;
}

class ProductEntity {
  id: number;
  createdAt: Date = new Date();    // ← same thing again!
  updatedAt: Date = new Date();    // ← same thing again!
  title: string;
  price: number;
}

class OrderEntity {
  id: number;
  createdAt: Date = new Date();    // ← and again! 😩
  updatedAt: Date = new Date();
  total: number;
}
// id, createdAt, updatedAt are duplicated 3 times!
// Now imagine you need to add a "deletedAt" field —
// you'd have to edit ALL 3 classes manually.`}
              language="typescript"
            />
          </div>

          {/* DRY Principle */}
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10">
            <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
              <span className="text-base">🏗️</span>
              The DRY Principle: Don&apos;t Repeat Yourself
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The example above violates the{" "}
              <strong>DRY principle</strong> (Don&apos;t Repeat Yourself).
              If you need the same properties on 10 different entity
              classes, define them once in a parent class. Inheritance
              lets you reuse code instead of copy-pasting. This also makes
              maintenance easier: change the parent once, and all children
              automatically get the update.
            </p>
          </div>

          {/* With Inheritance */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                ✓
              </span>
              With Inheritance — Write Once, Reuse Everywhere
            </h4>
            <EnhancedCodeBlock
              code={`// ✅ Step 1: Write shared logic ONCE in a parent class
class BaseEntity {
  constructor(
    public id: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  // A shared method all children can use
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}

// ✅ Step 2: Children "extend" the parent — they get EVERYTHING for free
class UserEntity extends BaseEntity {
  constructor(
    id: number,                    // passed up to parent
    public name: string,           // unique to UserEntity
    public email: string,          // unique to UserEntity
  ) {
    super(id);  // ← Calls parent's constructor. Explained below!
  }
}

class ProductEntity extends BaseEntity {
  constructor(
    id: number,
    public title: string,
    public price: number,
  ) {
    super(id);  // ← same pattern
  }
}

// ✅ Step 3: Use inherited properties and methods
const user = new UserEntity(1, "Mehedi", "m@e.com");
user.updateTimestamp();        // ✅ Inherited method — didn't write it!
console.log(user.createdAt);  // ✅ Inherited property — got it for free!
console.log(user.name);       // ✅ Own property — unique to UserEntity`}
              language="typescript"
            />
          </div>

          {/* super() explanation */}
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10">
            <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">
              What does <code>super()</code> do? (Step by step)
            </h4>
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal pl-5">
              <li>
                When a child class has a constructor, it <strong>must</strong>{" "}
                call{" "}
                <code className="text-amber-600 font-bold">super()</code>{" "}
                before doing anything else. This calls the{" "}
                <strong>parent class&apos;s constructor</strong> — the parent
                needs to set up its own properties first.
              </li>
              <li>
                You pass the parent&apos;s required values as arguments. In
                our example, <code>BaseEntity</code> needs an{" "}
                <code>id</code>, so we write{" "}
                <code className="text-amber-600">super(id)</code> to pass it
                up.
              </li>
              <li>
                <strong>Analogy:</strong> Think of it as telling the parent:
                &quot;Hey, set up your part of the house first (id, createdAt,
                updatedAt), then I&apos;ll add my own rooms (name, email).&quot;
              </li>
              <li>
                If you forget to call <code>super()</code>, TypeScript will
                show a compile-time error:{" "}
                <em>
                  &quot;Constructors for derived classes must contain a
                  &apos;super&apos; call.&quot;
                </em>{" "}
                Your code won&apos;t even run.
              </li>
            </ol>
          </div>

          {/* NestJS Example */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                N
              </span>
              How NestJS Uses Inheritance
            </h4>
            <p className="text-sm text-slate-500 mb-3">
              NestJS&apos;s own exception classes are a perfect real-world
              family tree. They all inherit from one parent:
            </p>
            <EnhancedCodeBlock
              code={`// NestJS built-in exception hierarchy:
//
//   HttpException (parent — has .getStatus() and .getResponse())
//     ├── BadRequestException     (400)  ← extends HttpException
//     ├── UnauthorizedException   (401)  ← extends HttpException
//     ├── NotFoundException       (404)  ← extends HttpException
//     └── InternalServerException (500)  ← extends HttpException
//
// They ALL inherit .getStatus() and .getResponse() from HttpException!
// You don't rewrite those methods in every exception class.

// Using it is simple:
throw new NotFoundException('User not found');
// Automatically gets: status=404, message="User not found"
// NotFoundException inherited the ability to carry status codes
// from its parent HttpException — you get this for free!`}
              language="typescript"
            />
          </div>

          {/* When NOT to use deep inheritance */}
          <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/10">
            <h4 className="font-bold text-sm text-rose-700 dark:text-rose-400 mb-2 flex items-center gap-2">
              <span className="text-base">⚠️</span>
              When to Be Careful with Inheritance
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Inheritance is powerful, but don&apos;t overdo it. If your
              classes form a chain deeper than 2-3 levels (e.g.,{" "}
              <code className="text-rose-600">
                A → B → C → D → E
              </code>
              ), it becomes very hard to follow and debug. A good rule of
              thumb: use inheritance for{" "}
              <strong>&quot;is-a&quot; relationships</strong> (a{" "}
              <code>NotFoundException</code> <em>is an</em>{" "}
              <code>HttpException</code>). For everything else, consider{" "}
              <strong>composition</strong> — where one class <em>uses</em>{" "}
              another instead of extending it.
            </p>
          </div>
        </div>

        <QuickCheck
          question={`You create a child class "AdminUser extends User" but forget to call super(). What happens?`}
          answer={`TypeScript will show a compile-time error: "Constructors for derived classes must contain a 'super' call." Your code won't even compile, let alone run. The parent's constructor never runs, which means its properties (like id, createdAt) would never be set up. Always call super() as the first line in a child constructor, passing any values the parent needs.`}
        />
      </div>
    </section>
  );
}
