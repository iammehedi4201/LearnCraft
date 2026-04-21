import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function AbstractionSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        5. Abstraction — The Light Switch
      </h2>
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">
        {/* What is Abstraction? */}
        <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
          <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">
            What is Abstraction?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            Abstraction means defining{" "}
            <strong>what something should do</strong> without specifying{" "}
            <strong>how it does it</strong>. An abstract class is like a
            contract with some rules already filled in: it lists the
            methods that must exist, but leaves some implementation
            details to the child classes.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Key rule:</strong> You{" "}
            <strong>cannot create an instance</strong> of an abstract class
            directly — it&apos;s incomplete by design. You must create a
            child class that fills in the missing pieces, then create an
            instance of that child.
          </p>
        </div>

        {/* Light Switch Metaphor */}
        <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-rose-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">
              The &quot;Light Switch&quot; Metaphor: Usage vs. Complexity
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you want to turn on the light, you flip a switch. You
              don&apos;t need to know about the wires, the power plant, or
              the physics of electricity. <strong>Abstraction</strong>{" "}
              hides that massive complexity behind a simple interface. In
              NestJS, abstract classes define <em>what</em> something
              should do (the switch), while child classes handle{" "}
              <em>how</em> (the wiring).
            </p>
          </div>
        </div>

        {/* Abstract vs Interface */}
        <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8">
          <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">
            Abstract Class vs Interface — What&apos;s the Difference?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            Both define a &quot;contract&quot; that other classes must
            follow, but they work differently:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 px-3 text-left font-bold text-slate-500">
                    Feature
                  </th>
                  <th className="py-2 px-3 text-center font-bold text-blue-600">
                    Interface
                  </th>
                  <th className="py-2 px-3 text-center font-bold text-purple-600">
                    Abstract Class
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3">Can have real working code?</td>
                  <td className="py-2 px-3 text-center text-red-500">
                    ❌ No — only defines shapes
                  </td>
                  <td className="py-2 px-3 text-center text-emerald-600">
                    ✅ Yes — can have shared methods
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3">Can create instances?</td>
                  <td className="py-2 px-3 text-center text-red-500">
                    ❌ No
                  </td>
                  <td className="py-2 px-3 text-center text-red-500">
                    ❌ No
                  </td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3">Can a class use multiple?</td>
                  <td className="py-2 px-3 text-center text-emerald-600">
                    ✅ Yes — can implement many
                  </td>
                  <td className="py-2 px-3 text-center text-red-500">
                    ❌ Can extend only one
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Best for</td>
                  <td className="py-2 px-3 text-center">
                    Pure contracts / shapes
                  </td>
                  <td className="py-2 px-3 text-center">
                    Shared logic + contracts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 italic">
            <strong>Simple rule:</strong> If you need shared code that
            children inherit, use an abstract class. If you only need to
            define a shape with no code, use an interface.
          </p>
        </div>

        <div className="space-y-6">
          {/* Generics explainer */}
          <div className="p-5 bg-indigo-500/5 rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20">
            <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <span className="text-base">📦</span>
              Quick Note: What does &lt;T&gt; mean?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              In the code below, you&apos;ll see{" "}
              <code className="text-indigo-600">&lt;T&gt;</code>. This is
              called a <strong>generic</strong> — it&apos;s a placeholder
              for a type that you fill in later. Think of it like a blank
              in a form: &quot;This repository works with _____ type of
              data.&quot;
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you write{" "}
              <code className="text-indigo-600">
                BaseRepository&lt;User&gt;
              </code>
              , you&apos;re saying &quot;fill in the blank with User&quot;
              — so all the methods will work with{" "}
              <code>User</code> objects. You&apos;ll also see{" "}
              <code className="text-indigo-600">
                Partial&lt;T&gt;
              </code>{" "}
              — this is a built-in TypeScript helper that means &quot;some
              or all of T&apos;s properties, all optional.&quot; It&apos;s
              useful for creating new records where you don&apos;t need
              every field.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                1
              </span>
              Step-by-Step: Abstract Repository Pattern
            </h4>
            <EnhancedCodeBlock
              code={`// Step 1: Define the abstract class — the "contract"
// This says WHAT a repository must do, not HOW
// <T> is a placeholder — it gets replaced with a real type later
abstract class BaseRepository<T> {
  // ✅ Concrete method — shared logic (children inherit this for free)
  // This is real, working code that every child can use
  log(action: string): void {
    console.log(\`[\${new Date().toISOString()}] \${action}\`);
  }

  // ✅ Abstract methods — children MUST implement these
  // These have no body — the child fills in the "how"
  abstract findAll(): Promise<T[]>;
  abstract findById(id: number): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  //                    ↑ Partial<T> means "some of T's fields, all optional"
  abstract delete(id: number): Promise<void>;
}

// Step 2: Create a concrete implementation
// Replace <T> with <User> — now all methods work with User objects
class UserRepository extends BaseRepository<User> {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    this.log("Finding all users");  // ← uses inherited log() for free!
    return this.users;
  }

  async findById(id: number): Promise<User | null> {
    this.log(\`Finding user \${id}\`);
    return this.users.find(u => u.id === id) || null;
  }

  async create(data: Partial<User>): Promise<User> {
    this.log("Creating user");
    const user = { id: Date.now(), ...data } as User;
    this.users.push(user);
    return user;
  }

  async delete(id: number): Promise<void> {
    this.log(\`Deleting user \${id}\`);
    this.users = this.users.filter(u => u.id !== id);
  }
}

// Step 3: Use it!
// const repo = new BaseRepository();  // ❌ Error — can't instantiate abstract!
const repo = new UserRepository();     // ✅ Works — concrete implementation`}
              language="typescript"
            />
          </div>

          {/* Blueprint vs Instance */}
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10">
            <h4 className="font-bold text-sm text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-2">
              <span className="text-base">📚</span>
              The Two Types of Methods in an Abstract Class
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              An abstract class can have <strong>two types</strong> of
              methods:
            </p>
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal pl-5">
              <li>
                <strong>Concrete methods</strong> (like{" "}
                <code className="text-purple-600">log()</code>) — these
                have a body with real code. All children inherit them
                automatically and don&apos;t need to rewrite them.
              </li>
              <li>
                <strong>Abstract methods</strong> (like{" "}
                <code className="text-purple-600">findAll()</code>) — these
                have <em>no body</em>, just a signature. Every child class{" "}
                <strong>must</strong> provide its own implementation. If
                you forget, TypeScript throws an error.
              </li>
            </ol>
          </div>

          {/* Why abstract? */}
          <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <span className="text-base">💡</span>
              Why not just use a regular class?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              An abstract class <strong>forces</strong> every child to
              implement the required methods. If you forget{" "}
              <code className="text-emerald-600">findAll()</code> in your{" "}
              <code className="text-emerald-600">ProductRepository</code>,
              TypeScript will show a compile-time error — before your code
              even runs.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A regular class can&apos;t enforce this. You&apos;d only
              discover the missing method when your app crashes at runtime
              — possibly in production, in front of real users. Abstract
              classes catch these mistakes early, at development time.
            </p>
          </div>
        </div>

        <QuickCheck
          question={`Can you create an instance of an abstract class? e.g., "const repo = new BaseRepository()"`}
          answer={`No! Abstract classes cannot be instantiated directly — TypeScript will show an error: "Cannot create an instance of an abstract class." They exist only as blueprints for child classes. You must create a concrete child class (like UserRepository) that implements ALL the abstract methods, then instantiate that child class instead. The abstract class guarantees all children share the same structure.`}
        />
      </div>
    </section>
  );
}
