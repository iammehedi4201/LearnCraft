import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function EncapsulationSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-slate-900/80 p-8 lg:p-12 rounded-[1rem] border border-slate-200/60 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-2xl backdrop-blur-xl mb-12">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 font-black">
            2
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Encapsulation
          </h2>
        </div>
        {/* What is Encapsulation? intro */}
        <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
          <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">
            What is Encapsulation?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            Encapsulation means{" "}
            <strong>
              hiding internal details and controlling access through methods
            </strong>
            . Instead of letting anyone directly change a value (which could
            break things), you force them to go through a
            &quot;gatekeeper&quot; method that validates the change first.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Why does it matter?</strong> Without encapsulation, any
            part of your code can reach in and change any value at any time.
            In a small project, that might seem fine. But in a large app
            with 50+ files, it becomes impossible to track where a value
            was changed and why it broke. Encapsulation prevents this chaos
            by forcing all changes to go through a controlled entry point.
          </p>
        </div>

        {/* Car Hood Metaphor */}
        <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">
              The &quot;Car Hood&quot; Metaphor: Don&apos;t touch the
              engine!
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you drive a car, you use the steering wheel and pedals.
              You don&apos;t need to touch the hot, messy engine to turn
              left. <strong>Encapsulation</strong> means we hide the
              &quot;messy&quot; inner parts of our code (using{" "}
              <code className="text-blue-600">private</code>) and only show
              the &quot;clean&quot; controls (using{" "}
              <code className="text-blue-600">public</code> methods). The
              driver (your code) interacts only with the steering wheel
              (public methods), never with the engine (private data).
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Without Encapsulation */}
          <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="text-base">💥</span>
              Without Encapsulation — What Goes Wrong
            </h4>
            <EnhancedCodeBlock
              code={`// ❌ No encapsulation — anyone can mess with the balance directly
class UnsafeBankAccount {
  public balance: number = 0;  // Anyone can change this!
}

const account = new UnsafeBankAccount();
account.balance = 1000000;   // 💰 Just gave myself a million dollars!
account.balance = -500;      // 💥 Negative balance? No rules!
// No validation, no logging, no protection.
// Any file in your project can change this to anything.`}
              language="typescript"
            />
          </div>

          {/* With Encapsulation */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                ✓
              </span>
              With Encapsulation — The Safe Way
            </h4>
            <EnhancedCodeBlock
              code={`class BankAccount {
  private balance: number = 0;  // 🔒 Hidden! Nobody can touch this directly.

  // ✅ Controlled access — deposit MUST go through this method
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    console.log(\`Deposited \${amount}. New balance: \${this.balance}\`);
  }

  // ✅ Controlled access — withdrawal has rules
  withdraw(amount: number): void {
    if (amount > this.balance) throw new Error("Insufficient funds!");
    this.balance -= amount;
  }

  // ✅ Getter method — gives read-only access to the balance
  // (outsiders can SEE the balance, but can't CHANGE it directly)
  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(500);           // ✅ Goes through validation
// account.balance = 1000000;   // ❌ Error — private!
console.log(account.getBalance()); // ✅ Read-only access`}
              language="typescript"
            />
          </div>

          {/* Getter/Setter explanation */}
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10">
            <h4 className="font-bold text-sm text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-2">
              <span className="text-base">🔑</span>
              Getters and Setters — The Gatekeepers
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              A <strong>getter</strong> is a method that lets outsiders{" "}
              <em>read</em> a private value without being able to change
              it (like <code className="text-purple-600">getBalance()</code>{" "}
              above). A <strong>setter</strong> is a method that lets
              outsiders <em>change</em> a private value, but only after
              running your validation rules first (like{" "}
              <code className="text-purple-600">deposit()</code> and{" "}
              <code className="text-purple-600">withdraw()</code> above).
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The pattern is simple: make data{" "}
              <code className="text-purple-600">private</code>, then create{" "}
              <code className="text-purple-600">public</code> methods to
              control how that data is read and changed. This way you can
              add validation, logging, or any other rules without changing
              the code that uses this class.
            </p>
          </div>

          {/* How NestJS uses this */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                N
              </span>
              How NestJS Uses Encapsulation
            </h4>
            <p className="text-sm text-slate-500 mb-3">
              NestJS enforces encapsulation through a layered architecture.
              Each layer has a specific job and hides its details from the
              layer above it — just like departments in a company.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold px-2 py-1 rounded text-[10px] w-24 text-center shrink-0">
                    Controller
                  </span>
                  <span>
                    → The &quot;front desk.&quot; Receives HTTP requests
                    from users and passes them along. It never processes
                    business logic itself.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold px-2 py-1 rounded text-[10px] w-24 text-center shrink-0">
                    Service
                  </span>
                  <span>
                    → The &quot;back office.&quot; Contains the actual
                    business rules (e.g., &quot;can this user make this
                    purchase?&quot;). Controllers call services, but never
                    know the details of how they work.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-bold px-2 py-1 rounded text-[10px] w-24 text-center shrink-0">
                    Repository
                  </span>
                  <span>
                    → The &quot;vault.&quot; Handles direct database access.
                    Only services can talk to the database through this
                    layer — controllers can&apos;t.
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">
                The controller never touches the database directly —
                that&apos;s encapsulation in action! Each layer only
                exposes what the layer above it needs.
              </p>
            </div>
          </div>
        </div>

        <QuickCheck
          question={`Why is it bad to make a "balance" property public on a BankAccount class?`}
          answer={`Because anyone could set the balance to any value — negative numbers, impossibly large amounts, or zero — without any validation. By making it private and forcing access through deposit()/withdraw() methods, you guarantee that every change follows your business rules (e.g., "you can't withdraw more than you have"). You also get a single place to add logging or audit trails later.`}
        />
      </div>
    </section>
  );
}
