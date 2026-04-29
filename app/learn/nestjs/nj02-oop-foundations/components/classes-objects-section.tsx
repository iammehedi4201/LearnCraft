import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

// ─────────────────────────────────────────────
// Reusable helper components
// ─────────────────────────────────────────────


function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-bold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
      {children}
    </h4>
  );
}

function WhyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
      {children}
    </div>
  );
}

function StepList({ steps }: { steps: { label: string; note?: string; code?: string }[] }) {
  return (
    <ol className="space-y-5 mb-8">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5">
            {i + 1}
          </span>
          <div className="flex-1">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>{step.label}</strong>
              {step.note && <span className="font-normal"> — {step.note}</span>}
            </p>
            {step.code && (
              <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                {step.code}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function MistakeBox({
  title,
  description,
  wrong,
  right,
}: {
  title: string;
  description: string;
  wrong: string;
  right: string;
}) {
  return (
    <div className="mb-8 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
      <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2 text-sm">
        <span>⚠️</span> Common mistake: {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/50">
          <span className="text-xs font-bold text-red-600 block mb-1.5">
            ❌ Wrong
          </span>
          <code className="text-xs font-mono text-red-800 dark:text-red-300">
            {wrong}
          </code>
        </div>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
          <span className="text-xs font-bold text-emerald-600 block mb-1.5">
            ✅ Right
          </span>
          <code className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
            {right}
          </code>
        </div>
      </div>
    </div>
  );
}

function SummaryBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl border-l-4 border-slate-400 dark:border-slate-500">
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function Divider() {
  return <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />;
}

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────

export function ClassesObjectsSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-[#0f172a] p-8 lg:p-12 rounded-[1rem] border border-slate-200/60 dark:border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-xl backdrop-blur-xl mb-12">

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 font-black text-lg">
            1
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Classes & Objects
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              4 core topics — read each one in order for best results
            </p>
          </div>
        </div>

        {/* ── TOPIC 1: Classes & Objects ── */}
        <div className="mb-16">
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/60 dark:border-sky-500/20 mb-8 flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black flex-shrink-0 mt-0.5 bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300">
              1
            </span>
            <div>
              <h3 className="font-black text-xl text-sky-700 dark:text-sky-400 mb-2">
                What is a Class?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A <strong>class</strong> is like a blueprint or set of instructions for building something. It holds both <em>data</em> (information) and <em>actions</em> (things it can do) together in one place. An <strong>object</strong> is the real thing you create using that blueprint.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <SectionHeading>💡 Why does it matter?</SectionHeading>
            <WhyBox>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Without classes, your data and functions are scattered all over your code. This gets messy and hard to manage very quickly. Classes solve this by keeping related data and actions locked together in one neat place.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                <strong>Think of it this way:</strong> Instead of having a floating <code>userName</code> variable and a floating <code>changeName()</code> function living separately, a <code>User</code> class keeps them permanently glued together. They always travel as a pair.
              </p>
            </WhyBox>
          </div>

          <div className="mb-8">
            <SectionHeading>🔧 How does it work? (Step by step)</SectionHeading>
            <StepList
              steps={[
                {
                  label: "Define the class",
                  note: "Use the class keyword followed by a name. By convention, class names start with a capital letter.",
                  code: "class User { }",
                },
                {
                  label: "Add data and actions",
                  note: "Put variables (data) and functions (actions) inside the curly brackets.",
                  code: `class User { name = "Mehedi"; sayHi() { console.log("Hi"); } }`,
                },
                {
                  label: "Create an object",
                  note: "Use the new keyword to build a real item from the class. This is called instantiation.",
                  code: "const myUser = new User();",
                },
                {
                  label: "Use the object",
                  note: "Access its data or call its actions using a dot.",
                  code: "myUser.sayHi(); // Outputs: Hi",
                },
              ]}
            />
          </div>

          <div className="mb-8">
            <SectionHeading>📌 Example</SectionHeading>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Simple analogy</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  A class is a <strong>recipe for a cake</strong>. An object is the <strong>actual cake you bake</strong>. You can bake five different cakes using the exact same recipe — they are all separate cakes, but built from the same instructions.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Real-world example</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  In a shopping app, you have a <code>Product</code> class. Every time a seller adds a new item — a shoe, a phone, a book — you create a new <code>Product</code> object for it. Same blueprint, different data each time.
                </p>
              </div>
              <EnhancedCodeBlock
                code={`// Step 1: Define the class (the blueprint)
class Product {
  name = "Laptop";      // data: what the product is called

  showName() {          // action: what the product can do
    console.log(this.name);
  }
}

// Step 2: Create the object (the real item)
const myItem = new Product();

// Step 3: Use it
myItem.showName(); // Output: Laptop`}
                language="typescript"
              />
            </div>
          </div>

          <MistakeBox
            title='Forgetting "this" inside a class'
            description='Inside a class, you must use "this" to refer to its own data. If you just write the variable name alone, the code does not know you mean the class data — it will break or give wrong results.'
            wrong="console.log(name);      // ❌ Which 'name'? JavaScript is confused."
            right="console.log(this.name); // ✅ Clear — this means the class's own name."
          />

          <div className="mb-8">
            <SectionHeading>📝 Quick summary</SectionHeading>
            <SummaryBox>
              A <strong>class</strong> is a blueprint that holds data and actions together. An <strong>object</strong> is the real item you build from that blueprint. You use the <code>new</code> keyword to create an object. One class can create many objects — each one is its own independent copy.
            </SummaryBox>
          </div>

          <QuickCheck
            question="If a class is like a recipe for a cake, what is the object?"
            answer="The object is the actual, physical cake that you bake. The recipe (class) stays unchanged. You can bake as many cakes (objects) as you want from it."
          />
        </div>

        <Divider />

        {/* ── TOPIC 2: Constructors ── */}
        <div className="mb-16">
          <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-200/60 dark:border-emerald-500/20 mb-8 flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black flex-shrink-0 mt-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              2
            </span>
            <div>
              <h3 className="font-black text-xl text-emerald-700 dark:text-emerald-400 mb-2">
                What is a Constructor?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A <strong>constructor</strong> is a special function that lives inside a class. It runs <em>automatically</em> the exact moment you create a new object using <code>new</code>. You cannot call it manually — it only runs at creation time.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <SectionHeading>💡 Why does it matter?</SectionHeading>
            <WhyBox>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Without a constructor, every object you create would start with the same hardcoded data. That is not useful. A constructor lets you pass in unique information at the moment you build each object, so every object can start with different data.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                <strong>Think of it this way:</strong> Without a constructor, every new <code>User</code> would always be named "John Doe". With a constructor, you hand over the real name the moment you build the object, so each user gets their own name right away.
              </p>
            </WhyBox>
          </div>

          <div className="mb-8">
            <SectionHeading>🔧 How does it work? (Step by step)</SectionHeading>
            <StepList
              steps={[
                {
                  label: "Write the constructor keyword",
                  note: "Add constructor() inside your class. This is the special function name — it must be exactly this word.",
                  code: "constructor() { }",
                },
                {
                  label: "Add parameters",
                  note: "A parameter is information you pass in from the outside. List what data the object needs to start.",
                  code: "constructor(userName: string) { }",
                },
                {
                  label: "Save the data using this",
                  note: 'Inside the constructor, use "this" to save the passed-in value onto the object.',
                  code: "constructor(userName: string) { this.name = userName; }",
                },
                {
                  label: "Pass the data when you use new",
                  note: "Put the actual value inside the parentheses next to new.",
                  code: 'const user = new User("Alice");',
                },
              ]}
            />
          </div>

          <div className="mb-8">
            <SectionHeading>📌 Example</SectionHeading>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Simple analogy</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  If your class is a pizza, the constructor is the moment you <strong>choose your toppings</strong> before it goes in the oven. Once you have chosen, the pizza is made with those exact toppings.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Real-world example</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  When a new user signs up on your app, you create a <code>User</code> object. You pass their name and email into the constructor so the object saves that information the instant it is built — not later.
                </p>
              </div>
              <EnhancedCodeBlock
                code={`class User {
  name: string; // Declare that name is a string

  // This runs the moment you use "new User(...)"
  constructor(userName: string) {
    this.name = userName; // Save the passed-in name
  }
}

// Each object gets its own unique name
const user1 = new User("Alice"); // user1.name → "Alice"
const user2 = new User("Bob");   // user2.name → "Bob"
// They are totally separate objects`}
                language="typescript"
              />
            </div>
          </div>

          <MistakeBox
            title='Forgetting the "new" keyword'
            description='You cannot run a class like a normal function. Without "new", JavaScript does not know you are trying to build an object. The constructor will not run, and you will get an error.'
            wrong='const user = User("Alice");     // ❌ Missing "new"'
            right='const user = new User("Alice"); // ✅ Correct'
          />

          <div className="mb-8">
            <SectionHeading>📝 Quick summary</SectionHeading>
            <SummaryBox>
              A <strong>constructor</strong> is a special setup function inside a class. It runs automatically the moment you create a new object. You use it to give each object its own unique starting data. Always use the <code>new</code> keyword — that is what triggers it.
            </SummaryBox>
          </div>

          <QuickCheck
            question="When exactly does a constructor function run?"
            answer="It runs instantly and automatically the moment you use the 'new' keyword to create the object — not before, not after."
          />
        </div>

        <Divider />

        {/* ── TOPIC 3: Access Modifiers ── */}
        <div className="mb-16">
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-200/60 dark:border-amber-500/20 mb-8 flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black flex-shrink-0 mt-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">
              3
            </span>
            <div>
              <h3 className="font-black text-xl text-amber-700 dark:text-amber-400 mb-2">
                What are Access Modifiers?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Access modifiers are special labels you put on your class data to control <em>who is allowed to see or change it</em>. TypeScript gives you four labels: <code>public</code>, <code>private</code>, <code>protected</code>, and <code>readonly</code>.
              </p>
            </div>
          </div>

          {/* Quick reference table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-slate-300 rounded-tl-lg">Modifier</th>
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-slate-300">Who can see it?</th>
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-slate-300 rounded-tr-lg">Real-life comparison</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100 dark:border-slate-700/50">
                  <td className="p-3"><code className="text-emerald-600 dark:text-emerald-400 font-bold">public</code></td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Everyone — inside and outside the class</td>
                  <td className="p-3 text-slate-500 dark:text-slate-500">A public park — anyone can enter</td>
                </tr>
                <tr className="border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                  <td className="p-3"><code className="text-red-600 dark:text-red-400 font-bold">private</code></td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Only code inside this exact class</td>
                  <td className="p-3 text-slate-500 dark:text-slate-500">Your personal diary — only you can read it</td>
                </tr>
                <tr className="border-t border-slate-100 dark:border-slate-700/50">
                  <td className="p-3"><code className="text-blue-600 dark:text-blue-400 font-bold">protected</code></td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">This class and any class that extends it</td>
                  <td className="p-3 text-slate-500 dark:text-slate-500">A family recipe — shared only within the family</td>
                </tr>
                <tr className="border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                  <td className="p-3"><code className="text-purple-600 dark:text-purple-400 font-bold">readonly</code></td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Anyone can read, but nobody can change it</td>
                  <td className="p-3 text-slate-500 dark:text-slate-500">Your birthday — everyone knows it, nobody can change it</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-8">
            <SectionHeading>💡 Why does it matter?</SectionHeading>
            <WhyBox>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                If all data is open to everyone, any part of your code can accidentally change it. This causes bugs that are very hard to find. Access modifiers protect your data. You decide what is safe to show and what must stay hidden.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                <strong>Real example:</strong> In a user account, the email address can be <code>public</code> (everyone can see it). But the password must be <code>private</code> (no outside code can touch it). The account ID should be <code>readonly</code> — it is set once and never changes.
              </p>
            </WhyBox>
          </div>

          <div className="mb-8">
            <SectionHeading>🔧 How does it work? (Step by step)</SectionHeading>
            <StepList
              steps={[
                {
                  label: "Pick the right label",
                  note: "Decide who should be able to see or change each piece of data.",
                },
                {
                  label: "Write the label before the property name",
                  note: "Put the modifier keyword directly in front of the variable.",
                  code: "private password: string;",
                },
                {
                  label: "TypeScript enforces the rule automatically",
                  note: "If you try to access a private property from outside the class, TypeScript will show a red error before you even run the code.",
                  code: "account.password; // ❌ TypeScript error — it is private",
                },
              ]}
            />
          </div>

          <div className="mb-8">
            <SectionHeading>📌 Example</SectionHeading>
            <EnhancedCodeBlock
              code={`class BankAccount {
  public owner: string;    // ✅ Anyone can read this
  private balance: number; // 🔒 Only this class can touch it
  readonly id: number;     // 📌 Set once, can never be changed

  constructor(owner: string, balance: number, id: number) {
    this.owner   = owner;
    this.balance = balance;
    this.id      = id;
  }

  // The only safe way to change balance is through a method
  deposit(amount: number) {
    this.balance += amount; // ✅ Allowed — we are inside the class
  }
}

const account = new BankAccount("Mehedi", 100, 1);

console.log(account.owner);     // ✅ "Mehedi"   — public, works fine
// account.balance = 9999;      // ❌ Error!     — private, blocked
// account.id = 2;              // ❌ Error!     — readonly, blocked
account.deposit(50);            // ✅ Safe way to add money`}
              language="typescript"
            />
          </div>

          <MistakeBox
            title="Trying to change a readonly property after creation"
            description="readonly means the value is set once — inside the constructor — and never again. TypeScript will catch this mistake before your code even runs."
            wrong="account.id = 99; // ❌ Cannot reassign a readonly property"
            right="console.log(account.id); // ✅ Reading is fine, changing is not"
          />

          <div className="mb-8">
            <SectionHeading>📝 Quick summary</SectionHeading>
            <SummaryBox>
              Access modifiers are labels that protect your class data. <code>public</code> is open to everyone. <code>private</code> is locked inside the class only. <code>protected</code> is shared with child classes. <code>readonly</code> can be read by anyone but changed by nobody after creation. Use them to prevent accidental changes and keep your code safe.
            </SummaryBox>
          </div>

          <QuickCheck
            question="Which access modifier stops anyone from changing the value after the object is created?"
            answer="The 'readonly' modifier. It locks the value after the constructor runs. You can still read it, but you can never reassign it."
          />
        </div>

        <Divider />

        {/* ── TOPIC 4: TypeScript Constructor Shorthand ── */}
        <div className="mb-16">
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-200/60 dark:border-purple-500/20 mb-8 flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black flex-shrink-0 mt-0.5 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300">
              4
            </span>
            <div>
              <h3 className="font-black text-xl text-purple-700 dark:text-purple-400 mb-2">
                What is the Constructor Shorthand?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The constructor shorthand is a TypeScript shortcut that lets you <em>declare a property and assign its value in one single step</em>. Instead of writing the property name three times, you write it once. TypeScript figures out the rest.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <SectionHeading>💡 Why does it matter?</SectionHeading>
            <WhyBox>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Normally, for each property, you have to write the name three separate times: once to declare it at the top, once in the constructor brackets, and once to assign it with <code>this</code>. This is repetitive and clutters your code. The shorthand cuts all of that down to one line. NestJS uses this shorthand <em>everywhere</em> — so you need to recognise it.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                <strong>Real example:</strong> In NestJS, every service needs to pull in other services (like a database service). Without the shorthand, that is 4 lines of code per service. With the shorthand, it is 1 line. In a large app with 20 services, that is a huge saving.
              </p>
            </WhyBox>
          </div>

          <div className="mb-8">
            <SectionHeading>🔧 How does it work? (Step by step)</SectionHeading>
            <StepList
              steps={[
                {
                  label: "Write the constructor as normal",
                  note: "Start with the constructor() keyword.",
                  code: "constructor() { }",
                },
                {
                  label: "Add the access modifier inside the brackets",
                  note: 'Put public, private, or readonly directly in front of the parameter name. This is the magic step — that modifier is what triggers the shorthand.',
                  code: "constructor(private name: string) { }",
                },
                {
                  label: "Leave the body empty",
                  note: 'You do NOT need to write "this.name = name" anymore. TypeScript automatically creates the property and saves the value for you.',
                  code: "constructor(private name: string) { } // Body is empty — it still works!",
                },
              ]}
            />
          </div>

          <div className="mb-8">
            <SectionHeading>📌 Example — before vs after</SectionHeading>
            <EnhancedCodeBlock
              code={`// ─── THE LONG WAY (lots of repeated typing) ───
class OldAccount {
  public owner: string;       // Step 1: Declare it
  private balance: number;    // Step 1: Declare it
  readonly id: number;        // Step 1: Declare it

  constructor(
    owner: string,            // Step 2: Name it in the brackets
    balance: number,
    id: number
  ) {
    this.owner   = owner;     // Step 3: Assign it
    this.balance = balance;   // Step 3: Assign it
    this.id      = id;        // Step 3: Assign it
  }
}

// ─── THE SHORTHAND WAY (TypeScript / NestJS way) ───
class NewAccount {
  constructor(
    public owner: string,    // Declare + assign in ONE step
    private balance: number, // Declare + assign in ONE step
    readonly id: number      // Declare + assign in ONE step
  ) {}                       // ← Body is empty on purpose
}

// Both work exactly the same way
const account = new NewAccount("Mehedi", 100, 1);
console.log(account.owner); // ✅ "Mehedi"`}
              language="typescript"
            />
          </div>

          <MistakeBox
            title="Forgetting to add the access modifier"
            description="The shorthand ONLY works if you put an access modifier (public, private, readonly) in front of the parameter. Without it, TypeScript treats it as a regular local parameter — it disappears after the constructor runs and no property is created."
            wrong="constructor(name: string) {}         // ❌ No modifier — no property created"
            right="constructor(public name: string) {}  // ✅ Modifier present — property created"
          />

          <div className="mb-8">
            <SectionHeading>📝 Quick summary</SectionHeading>
            <SummaryBox>
              The constructor shorthand lets you declare and assign a property in one step by adding an access modifier inside the constructor brackets. The body stays empty. TypeScript does the rest. You will see this pattern constantly in NestJS — learning it now will make that code easy to read.
            </SummaryBox>
          </div>

          <QuickCheck
            question="What must you put in front of a parameter to activate the constructor shorthand?"
            answer="An access modifier: public, private, protected, or readonly. Without one of these, the shorthand does not activate and no property is created."
          />
        </div>

      </div>
    </section>
  );
}