import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";

export function PolymorphismSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        4. Polymorphism — The Universal Remote
      </h2>
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">
        {/* What is Polymorphism? */}
        <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
          <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">
            What is Polymorphism?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            Polymorphism means <strong>&quot;many forms.&quot;</strong> It
            lets you call the <em>same method name</em> on different
            objects, and each object responds in its own way. You write your
            code against a <strong>shared shape</strong> (called an{" "}
            <em>interface</em>), and the specific object decides what
            actually happens.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Why does it matter?</strong> Without polymorphism,
            every time you add a new type (e.g., a new notification
            channel), you&apos;d have to edit existing code with more{" "}
            <code className="text-sky-600">if/else</code> blocks. With
            polymorphism, you just add a new class — the existing code
            doesn&apos;t change at all. This makes your app easier to
            extend and less likely to break.
          </p>
        </div>

        {/* Remote Metaphor */}
        <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">
              The &quot;Remote&quot; Metaphor: One button, many results
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Think of a &quot;Power&quot; button on a universal remote.
              When you press it, the TV turns on, the Stereo turns on, and
              the Lights dim. They all responded to the <em>same</em>{" "}
              button press, but each device did its own thing. In code,{" "}
              <strong>Polymorphism</strong> lets you call the same method
              name (like <code className="text-purple-600">.send()</code>)
              on different objects, and each one knows how to handle it
              in its own way.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Without polymorphism — bad example */}
          <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="text-base">💥</span>
              Without Polymorphism — The if/else Nightmare
            </h4>
            <EnhancedCodeBlock
              code={`// ❌ Without polymorphism — messy if/else for every type
function sendNotification(type: string, to: string, msg: string) {
  if (type === "email") {
    console.log(\`📧 Email to \${to}: \${msg}\`);
  } else if (type === "sms") {
    console.log(\`📱 SMS to \${to}: \${msg}\`);
  } else if (type === "push") {
    console.log(\`🔔 Push to \${to}: \${msg}\`);
  }
  // Want to add WhatsApp? You must edit THIS function.
  // Want to add Slack? Edit it again.
  // Every change risks breaking existing behavior.
  // This gets ugly FAST with 10+ notification types.
}`}
              language="typescript"
            />
          </div>

          {/* Step-by-step example */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                ✓
              </span>
              With Polymorphism — Clean and Extensible
            </h4>
            <EnhancedCodeBlock
              code={`// Step 1: Define the CONTRACT (interface)
// An interface is a promise: "Any class that implements this
// MUST have a send() method with this exact shape."
interface NotificationService {
  send(to: string, message: string): void;
}

// Step 2: Create DIFFERENT implementations of the same contract
// Each class fulfills the promise differently
class EmailNotification implements NotificationService {
  send(to: string, message: string): void {
    console.log(\`📧 Email to \${to}: \${message}\`);
  }
}

class SmsNotification implements NotificationService {
  send(to: string, message: string): void {
    console.log(\`📱 SMS to \${to}: \${message}\`);
  }
}

class PushNotification implements NotificationService {
  send(to: string, message: string): void {
    console.log(\`🔔 Push to \${to}: \${message}\`);
  }
}

// Step 3: Write code that works with ANY notification service!
// This function doesn't know or care which type it gets.
function notify(service: NotificationService, to: string, msg: string) {
  service.send(to, msg);  // Same method call — different behavior!
}

// Step 4: Swap implementations without changing the function
notify(new EmailNotification(), "user@mail.com", "Welcome!");
notify(new SmsNotification(), "+880...", "Your OTP is 1234");
notify(new PushNotification(), "user123", "New message!");

// ✅ Want to add WhatsApp? Just create a new class.
// The notify() function doesn't change at all!`}
              language="typescript"
            />
          </div>

          {/* Interfaces as Contracts */}
          <div className="p-5 bg-indigo-500/5 rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20">
            <h4 className="font-bold text-sm text-indigo-700 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <span className="text-base">📋</span>
              Interfaces as Contracts
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              An <strong>interface</strong> is like a job description. It
              says: &quot;Any class that takes this job must be able to do
              these specific things.&quot; The{" "}
              <code className="text-indigo-600">NotificationService</code>{" "}
              interface says: &quot;You must have a{" "}
              <code>send()</code> method that takes a recipient and a
              message.&quot;
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The <code className="text-indigo-600">implements</code>{" "}
              keyword is the class saying &quot;I accept this job and I
              promise to provide everything the interface requires.&quot;
              If you forget to add the{" "}
              <code>send()</code> method, TypeScript will throw an error
              at compile time — before your code even runs.
            </p>
          </div>

          {/* Why polymorphism matters */}
          <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <span className="text-base">💡</span>
              Why this is powerful — The Open/Closed Principle
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              The{" "}
              <code className="text-emerald-600">notify()</code> function
              doesn&apos;t know or care if it&apos;s sending an email, SMS,
              or push notification. You can add a{" "}
              <code className="text-emerald-600">WhatsAppNotification</code>{" "}
              class next week and{" "}
              <strong>the function doesn&apos;t change at all</strong>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This follows a principle called{" "}
              <strong>&quot;Open/Closed&quot;</strong>: your code is{" "}
              <em>open</em> for extension (you can add new notification
              types freely) but <em>closed</em> for modification (you
              don&apos;t have to edit existing, working code to add new
              features). In plain terms: <strong>add new things without
              breaking old things</strong>.
            </p>
          </div>

          {/* NestJS Guards Example */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                N
              </span>
              How NestJS Uses Polymorphism
            </h4>
            <p className="text-sm text-slate-500 mb-3">
              All NestJS Guards implement the same{" "}
              <code className="text-blue-600">CanActivate</code> interface,
              but each guard behaves differently:
            </p>
            <EnhancedCodeBlock
              code={`// NestJS Guards — same interface, different implementations
// All must implement: canActivate(context): boolean

// AuthGuard     → checks if user is logged in
// RolesGuard    → checks if user has the right role  
// ThrottlerGuard → checks if user is sending too many requests

// NestJS doesn't care WHICH guard you use — it just calls:
//   guard.canActivate(context)  ← polymorphism!

@Injectable()
class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Get the logged-in user from the request
    const user = context.switchToHttp().getRequest().user;
    // Check if they have admin role
    return user.role === 'admin';
  }
}
// You can swap RolesGuard for AuthGuard without changing
// any of the code that calls canActivate() — that's the power!`}
              language="typescript"
            />
          </div>
        </div>

        <QuickCheck
          question={`You have 3 payment classes: CreditCard, PayPal, and BankTransfer. They all have a "pay(amount)" method. What OOP concept is this?`}
          answer={`This is Polymorphism! All 3 classes share the same method name "pay(amount)" but each processes the payment differently inside. You could define a PaymentService interface with a pay() method, then write a function like "processOrder(paymentMethod: PaymentService, amount: number)" that works with ANY payment type — without knowing the specific implementation. Adding a new payment type (like Crypto) means just adding a new class, not editing processOrder().`}
        />
      </div>
    </section>
  );
}
