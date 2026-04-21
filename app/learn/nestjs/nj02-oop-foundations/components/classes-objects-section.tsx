import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function ClassesObjectsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        1. Classes &amp; Objects
      </h2>
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">
        {/* What is a Class? intro */}
        <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
          <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">
            What is a Class?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            In regular JavaScript (and Express), you organize code using{" "}
            <strong>functions</strong> — standalone blocks of logic. In OOP,
            you organize code using <strong>classes</strong>. A class
            bundles <em>data</em> (called <strong>properties</strong>) and{" "}
            <em>actions</em> (called <strong>methods</strong>) together into
            one neat package.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Instead of having a random{" "}
            <code className="text-sky-600">getUserName()</code> function
            floating around, you put it <em>inside</em> a{" "}
            <code className="text-sky-600">User</code> class where it
            belongs. This keeps related code together and makes your
            project easier to navigate as it grows.
          </p>
        </div>

        {/* Lego Metaphor */}
        <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-amber-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">
              The &quot;Lego&quot; Metaphor: Instructions vs. The Build
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Think of a <strong>Class</strong> as a Lego instruction
              booklet. It tells you exactly how to build a castle, but
              it&apos;s not the castle itself. An <strong>Object</strong>{" "}
              (also called an <em>instance</em>) is the actual Lego castle
              you built by following those instructions. You can use one
              booklet to build 100 identical castles — each one is a
              separate object made from the same class!
            </p>
          </div>
        </div>

        {/* Constructor explanation */}
        <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8">
          <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
            <span className="text-base">🔧</span>
            What is a Constructor?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            A <strong>constructor</strong> is a special method that runs{" "}
            <strong>automatically</strong> every time you create a new
            object from a class (using the{" "}
            <code className="text-emerald-600">new</code> keyword). Its job
            is to set up the object&apos;s initial data. Think of it as the
            &quot;setup instructions&quot; that run once when the object is
            born. If your Lego castle needs a color and a size, the
            constructor is where you pass those in.
          </p>
        </div>

        {/* Access modifier explainer cards */}
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
          Access Modifiers — Who Can See What?
        </h4>
        <p className="text-xs text-slate-500 mb-4">
          TypeScript gives you 3 <strong>access modifiers</strong> that
          control who can read or change a property, plus a{" "}
          <strong>readonly</strong> modifier that prevents changes after
          setup.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <h5 className="text-xs font-bold text-emerald-600 uppercase mb-1">
              public (default)
            </h5>
            <p className="text-[11px] text-slate-500">
              Anyone can read and change it. Like a public park — everyone
              has access. If you don&apos;t write any modifier, TypeScript
              assumes <code className="text-emerald-600">public</code>.
            </p>
          </div>
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-100 dark:border-red-900/30">
            <h5 className="text-xs font-bold text-red-600 uppercase mb-1">
              private
            </h5>
            <p className="text-[11px] text-slate-500">
              Only code <strong>inside</strong> this class can see it. Like
              your diary — only you can read it. Code outside the class
              can&apos;t even see it exists.
            </p>
          </div>
          <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h5 className="text-xs font-bold text-blue-600 uppercase mb-1">
              protected
            </h5>
            <p className="text-[11px] text-slate-500">
              This class <strong>and child classes</strong> can see it. Like
              a family recipe — shared only within the family, but not
              with strangers. (You&apos;ll learn about child classes in the
              Inheritance section below.)
            </p>
          </div>
          <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-100 dark:border-amber-900/30">
            <h5 className="text-xs font-bold text-amber-600 uppercase mb-1">
              readonly (modifier)
            </h5>
            <p className="text-[11px] text-slate-500">
              Can be set once (in the constructor), then{" "}
              <strong>never changed</strong>. Like your birthday — it&apos;s
              fixed forever. Note: <code className="text-amber-600">readonly</code>{" "}
              is not an access modifier — it controls <em>changeability</em>,
              not <em>visibility</em>. You can combine it with any access
              modifier.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                1
              </span>
              Plain TypeScript — The Long Way
            </h4>
            <EnhancedCodeBlock
              code={`// A basic class with a constructor
class User {
  public name: string;       // Anyone can access
  private email: string;     // Only this class can access  
  protected role: string;    // This class + children can access
  readonly id: number;       // Set once, never changed

  // The constructor runs automatically when you write "new User(...)"
  constructor(id: number, name: string, email: string, role: string) {
    this.id = id;            // Assign each property manually
    this.name = name;
    this.email = email;
    this.role = role;
  }

  // Method — a function that belongs to this class
  getProfile(): string {
    return \`\${this.name} (\${this.email})\`;
  }
}

// Create an object (instance) from the class
const user = new User(1, "Mehedi", "m@test.com", "admin");
console.log(user.name);       // ✅ "Mehedi" — public
// console.log(user.email);   // ❌ Error — private!
// user.id = 999;             // ❌ Error — readonly!`}
              language="typescript"
            />
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                2
              </span>
              TypeScript Shorthand — What NestJS Actually Uses
            </h4>
            <p className="text-sm text-slate-500 mb-3">
              TypeScript has a shorthand that declares AND assigns
              properties in the constructor at the same time. This
              eliminates repetitive code. NestJS uses this{" "}
              <strong>everywhere</strong>.
            </p>
            <EnhancedCodeBlock
              code={`// ✅ Shorthand — declare + assign in one line!
class Product {
  constructor(
    public readonly id: number,   // same as: this.id = id
    public name: string,          // same as: this.name = name
    public price: number,         // same as: this.price = price
    private stock: number,        // same as: this.stock = stock (private!)
  ) {}
  // ☝️ The body is empty! TypeScript handles everything.
}

const product = new Product(1, "Laptop", 999, 50);
console.log(product.name);    // ✅ "Laptop"
// console.log(product.stock); // ❌ Error — private`}
              language="typescript"
            />
          </div>

          {/* Merged shorthand explanation — was two separate boxes */}
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15">
            <h4 className="font-bold text-sm text-sky-700 dark:text-sky-400 mb-3 flex items-center gap-2">
              <span className="text-base">🎯</span>
              Why the Shorthand Matters for NestJS
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              The &quot;long way&quot; requires you to: (1) declare the
              property, (2) list it as a constructor parameter, (3) assign
              it inside the constructor body. That&apos;s{" "}
              <strong>3 lines per property</strong>. The shorthand does all
              3 in <strong>1 line</strong>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              This matters because NestJS heavily relies on{" "}
              <strong>dependency injection</strong> — a system where NestJS
              automatically passes services into your classes through the
              constructor. A NestJS service with 5 injected dependencies
              would need 15+ lines of boilerplate the long way, but just 5
              lines with the shorthand.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Bottom line:</strong> using{" "}
              <code className="text-sky-600">private</code> or{" "}
              <code className="text-sky-600">public</code> in the
              constructor parameters is the idiomatic NestJS pattern.
              You&apos;ll see it in every NestJS codebase.
            </p>
          </div>
        </div>

        <QuickCheck
          question={`What's the difference between "private" and "readonly"?`}
          answer={`They solve different problems! "private" controls WHO can access the property — only code inside the class can see it. "readonly" controls WHETHER it can be changed — it can be set once in the constructor but never reassigned after that. They can even be combined: "private readonly secret: string" means only the class can see it, AND it can never be changed after creation.`}
        />
      </div>
    </section>
  );
}
