import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function PolymorphismSection() {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-lg border border-slate-200/40 dark:border-slate-700/40 backdrop-blur-sm mb-12">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 font-black">
            4
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Polymorphism
          </h2>
        </div>

        {/* CORE TOPIC 1: Polymorphism */}
        <div className="mb-16">
          <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-6">
            <h3 className="font-bold text-xl text-sky-700 dark:text-sky-400 mb-2">
              1. What is Polymorphism?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Polymorphism means "many forms". It lets you call the exact same method name on different objects, but each object handles the action in its own unique way.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Without it, you have to write massive `if/else` blocks to check what kind of object you are dealing with before telling it what to do. Polymorphism removes the `if/else` entirely. You just give the command, and the object figures out the details.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> Instead of checking "If this is a dog, bark. If this is a cat, meow", you just say `animal.makeSound()`. The animal handles the rest.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Create the classes:</strong> Make several classes that have a method with the exact same name.
              </li>
              <li>
                <strong>Change the behavior:</strong> Put different code inside that method for each class.
              </li>
              <li>
                <strong>Call the method:</strong> Write a function that calls that method without checking which class it is talking to.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> The "Power" button on a universal remote is polymorphic. You press it, and the TV turns on. You press the same button, and the DVD player turns on. One button, many forms.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> Sending notifications. We have different classes that all have a `send()` method.</p>
              <EnhancedCodeBlock
                code={`class EmailNotification {
  send(message: string) { console.log(\`📧 Email: \${message}\`); }
}

class SmsNotification {
  send(message: string) { console.log(\`📱 SMS: \${message}\`); }
}

// This function doesn't know or care WHICH notification it gets.
// It just knows it can call .send()!
function alertUser(notification: any, message: string) {
  notification.send(message); // Polymorphism!
}

alertUser(new EmailNotification(), "Hello");
alertUser(new SmsNotification(), "Hello");`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Using massive if/else chains:</strong> If you find yourself checking the type of an object to decide what function to run, you are failing to use polymorphism. Let the objects handle their own behavior.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs block">if (type === "email") sendEmail()</code>
                <code className="text-xs block">else if (type === "sms") sendSms()</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs block">notification.send()</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Polymorphism means many forms. It allows different classes to share the same method name, but implement it differently. It removes the need for large `if/else` checks.</p>
          </div>

          <QuickCheck
            question="If three payment classes (CreditCard, PayPal, Crypto) all share the same 'pay()' method name but handle the math differently, what is this called?"
            answer="Polymorphism."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 2: Interfaces */}
        <div className="mb-16">
          <div className="p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 mb-6">
            <h3 className="font-bold text-xl text-indigo-700 dark:text-indigo-400 mb-2">
              2. Interfaces (Contracts)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              An <strong>interface</strong> is a strict contract. It lists the methods a class MUST have, but it does not contain any actual code inside those methods.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              In the previous example, we trusted that every notification class would have a `send()` method. What if someone forgot to add it? The program would crash. An interface forces a class to include the exact methods you need.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> If a class signs an interface contract that requires a `send()` method, TypeScript will show a giant red error if the developer forgets to write `send()`.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write the interface:</strong> Use the `interface` keyword and list the method names.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">interface Mailer {'{'} send(): void; {'}'}</div>
              </li>
              <li>
                <strong>Sign the contract:</strong> Use the `implements` keyword on your class.
                <div className="mt-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded">class Gmail implements Mailer {'{'} ... {'}'}</div>
              </li>
              <li>
                <strong>Write the code:</strong> You must now write the `send()` method inside the class.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> An interface is a job posting. It says "You must be able to drive a forklift". The `implements` keyword is you saying "I accept the job and I promise I can drive the forklift".</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> We force all payment processors to have a `processPayment` method.</p>
              <EnhancedCodeBlock
                code={`// 1. The Contract (No code inside, just rules)
interface PaymentProcessor {
  processPayment(amount: number): boolean;
}

// 2. Signing the contract
class StripeProcessor implements PaymentProcessor {
  // If we delete this method, TypeScript throws an error!
  processPayment(amount: number): boolean {
    console.log(\`Charging \${amount} via Stripe\`);
    return true;
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
              <strong>Putting actual code inside an interface:</strong> Interfaces only define the <em>shape</em> of the code (the names and types). They cannot contain actual logic or brackets `{}`.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs block">interface Worker {'{'}</code>
                <code className="text-xs block">  work() {'{'} return true; {'}'}</code>
                <code className="text-xs block">{'}'}</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs block">interface Worker {'{'}</code>
                <code className="text-xs block">  work(): boolean;</code>
                <code className="text-xs block">{'}'}</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">An interface is a contract. It forces any class that uses `implements` to include specific methods. It prevents missing method errors.</p>
          </div>

          <QuickCheck
            question="What keyword does a class use to agree to follow an interface?"
            answer="The 'implements' keyword."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 3: The Open/Closed Principle */}
        <div className="mb-16">
          <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-6">
            <h3 className="font-bold text-xl text-amber-700 dark:text-amber-400 mb-2">
              3. The Open/Closed Principle
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              This is a famous coding rule. Your code should be <strong>Open</strong> to adding new features, but <strong>Closed</strong> to editing old, working code.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Every time you edit a file that already works perfectly, you risk breaking it. The safest way to add a feature is to write a brand new file without touching the old ones. Interfaces and polymorphism make this possible.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> If you need to add WhatsApp notifications, you should just create a new `WhatsAppNotification` class file. You should NOT have to open up `NotificationManager` and add a new `if` statement.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Write an interface:</strong> This defines how the feature must work.
              </li>
              <li>
                <strong>Write a function that expects the interface:</strong> The function asks for the interface, not a specific class.
              </li>
              <li>
                <strong>Add new classes later:</strong> Create a new class that implements the interface. Pass it into the function. The old function never changes!
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> The USB port on your computer is Open/Closed. You can plug in a new mouse (Open for new things) without having to take apart the computer and rewire the motherboard (Closed to changes).</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> Our checkout function expects a `PaymentProcessor` interface. It doesn't care which one.</p>
              <EnhancedCodeBlock
                code={`// This function is CLOSED to changes. You never need to edit it!
function checkout(processor: PaymentProcessor, amount: number) {
  processor.processPayment(amount);
}

// Tomorrow, your boss asks you to add Apple Pay.
// You do not edit the checkout function at all.
// You just create a NEW class (OPEN for new features).
class ApplePay implements PaymentProcessor {
  processPayment(amount: number): boolean {
    return true; // Apple Pay logic
  }
}

checkout(new ApplePay(), 100); // It just works!`}
                language="typescript"
              />
            </div>
          </div>

          <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <span>⚠️</span> Common mistake
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              <strong>Hardcoding specific classes:</strong> If your function specifically asks for a `StripeProcessor`, you cannot pass it an `ApplePay` processor later. It breaks the Open/Closed rule. Always ask for the Interface.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs block">checkout(processor: StripeProcessor)</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs block">checkout(processor: PaymentProcessor)</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Open/Closed means you should be able to add new features without changing old code. You do this by making your code rely on Interfaces instead of exact classes.</p>
          </div>

          <QuickCheck
            question="What does the 'Closed' part of the Open/Closed principle mean?"
            answer="It means your existing code should be closed to modification. You shouldn't have to edit old, working files just to add a new feature."
          />
        </div>

        <hr className="border-slate-100 dark:border-slate-800/50 mb-16" />

        {/* CORE TOPIC 4: NestJS Guards */}
        <div className="mb-16">
          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-6">
            <h3 className="font-bold text-xl text-purple-700 dark:text-purple-400 mb-2">
              4. How NestJS Uses Polymorphism (Guards)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              NestJS uses interfaces and polymorphism everywhere. The best example is a <strong>Guard</strong>, which protects your routes.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              NestJS needs to run your custom security checks, but it doesn't know what you are going to write. By forcing you to use the `CanActivate` interface, NestJS knows exactly which method to call to run your check.
            </p>
            <p className="text-xs text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <strong>Example:</strong> You might write a guard that checks passwords, or a guard that checks if it is Tuesday. NestJS doesn't care. It just calls `yourGuard.canActivate()` and trusts your code.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
            <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>NestJS provides the interface:</strong> They give you `CanActivate`.
              </li>
              <li>
                <strong>You build the Guard:</strong> You create a class that `implements CanActivate`.
              </li>
              <li>
                <strong>You write the rule:</strong> You write the `canActivate()` method. It must return `true` (let them in) or `false` (block them).
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Simple Example:</strong> The club owner (NestJS) hires a bouncer (Guard). The owner gives one rule: "You must be able to answer Yes or No when someone tries to enter." How the bouncer decides is up to them.</p>
              <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Real-world Example:</strong> Checking if a user has an "admin" role before letting them view a page.</p>
              <EnhancedCodeBlock
                code={`// 1. We sign the NestJS contract
class RolesGuard implements CanActivate {
  
  // 2. We MUST write this exact method
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // 3. Return true to allow, false to block
    if (user.role === 'admin') {
      return true; // Welcome in!
    } else {
      return false; // Access Denied!
    }
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
              <strong>Forgetting to return a boolean:</strong> The `CanActivate` interface demands that your method returns `true` or `false`. If you return a string, or return nothing, NestJS will crash or fail closed.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/50">
                <span className="text-xs font-bold text-red-600 block mb-1">Wrong:</span>
                <code className="text-xs block">return "Yes, allowed"</code>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs font-bold text-emerald-600 block mb-1">Right:</span>
                <code className="text-xs block">return true</code>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">NestJS Guards are a perfect example of polymorphism. They all implement `CanActivate`, which guarantees they have a `canActivate()` method that returns true or false.</p>
          </div>

          <QuickCheck
            question="What is the name of the interface that every NestJS Guard must implement?"
            answer="CanActivate."
          />
        </div>

      </div>
    </section>
  );
}
