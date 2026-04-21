import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Collapsible } from "./collapsible";

export function ClosingSections() {
  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Section 6: Express vs NestJS Comparison                            */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          6. Express vs NestJS — Paradigm Shift
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">
              Express (Function-Based)
            </h3>
            <EnhancedCodeBlock
              code={`// Functions + middleware chains
const express = require("express");
const app = express();

// Route handler — a plain standalone function
app.get("/users", (req, res) => {
  const users = getUsersFromDB();
  res.json(users);
});

// Middleware — another plain function
function authMiddleware(req, res, next) {
  if (!req.headers.token) {
    return res.status(401).send();
  }
  next();  // Call next() to pass control forward
}

app.use(authMiddleware);`}
              language="javascript"
            />
            <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
              ⚠️ Logic is scattered across standalone functions. You decide
              the structure yourself — Express doesn&apos;t enforce any
              organization pattern. This works for small apps, but gets
              messy as projects grow.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">
              NestJS (Class-Based &amp; Organized)
            </h3>
            <EnhancedCodeBlock
              code={`// Classes + decorators + dependency injection
@Controller('users')
class UsersController {
  // NestJS automatically injects UsersService here
  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

// Guard — a class implementing an interface
@Injectable()
class AuthGuard implements CanActivate {
  canActivate(context) {
    return !!context.getRequest().token;
  }
}`}
              language="typescript"
            />
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 italic">
              ✅ Clear, enforced structure. Controller handles routes,
              Service handles logic, Guard handles auth. Each is a class
              with a single responsibility. NestJS uses every OOP pillar
              you learned in this lesson.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Mini Challenge                                                     */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">
          🏋️ Mini Challenge
        </h3>
        <p className="text-amber-900 dark:text-amber-300 mb-2">
          Build a simple notification system using OOP. This combines
          everything you learned:
        </p>
        <p className="text-amber-800 dark:text-amber-300 text-sm mb-4 italic">
          Hint: You&apos;ll use abstraction (abstract class), inheritance
          (extends), encapsulation (private channel), and polymorphism
          (swappable channels) — all in one exercise!
        </p>
        <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
          <li>
            Create an abstract{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              NotificationChannel
            </code>{" "}
            class with an abstract{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              send()
            </code>{" "}
            method and a concrete{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              log()
            </code>{" "}
            method that all children share
          </li>
          <li>
            Implement 3 child classes:{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              EmailChannel
            </code>
            ,{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              SmsChannel
            </code>
            , and{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              SlackChannel
            </code>{" "}
            — each with its own{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              send()
            </code>
          </li>
          <li>
            Create a{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              NotificationManager
            </code>{" "}
            class that accepts any channel via its constructor (use{" "}
            <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">
              private
            </code>{" "}
            for encapsulation)
          </li>
          <li>
            This is the exact pattern NestJS uses for Dependency Injection!
          </li>
        </ul>

        <Collapsible title="💡 Show Solution (try it yourself first!)">
          <EnhancedCodeBlock
            code={`// 1. Abstract class — the contract
// Defines WHAT a channel must do, plus shared logging code
abstract class NotificationChannel {
  // Concrete method — shared by ALL channels (inherited for free)
  log(message: string): void {
    console.log(\`[\${new Date().toISOString()}] \${message}\`);
  }

  // Abstract method — each channel MUST implement this differently
  abstract send(to: string, message: string): void;
}

// 2. Concrete implementations — each fills in the "how"
class EmailChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`📧 Sending email to \${to}\`);  // ← inherited log()
    console.log(\`Email body: \${message}\`);
  }
}

class SmsChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`📱 Sending SMS to \${to}\`);
    console.log(\`SMS: \${message}\`);
  }
}

class SlackChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`💬 Sending Slack message to \${to}\`);
    console.log(\`Slack: \${message}\`);
  }
}

// 3. NotificationManager — uses constructor injection (like NestJS!)
// This is ENCAPSULATION: the channel is private
// This is POLYMORPHISM: it accepts ANY NotificationChannel
class NotificationManager {
  constructor(private channel: NotificationChannel) {}
  //          ☝️ Accepts ANY channel — polymorphism!
  //          ☝️ "private" = encapsulation!

  notify(to: string, message: string): void {
    this.channel.send(to, message);
  }
}

// 4. Usage — swap channels freely without changing NotificationManager!
const emailManager = new NotificationManager(new EmailChannel());
emailManager.notify("user@test.com", "Welcome!");

const smsManager = new NotificationManager(new SmsChannel());
smsManager.notify("+880123456", "Your OTP is 9999");`}
            language="typescript"
          />
        </Collapsible>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Common Mistakes                                                    */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">
          ⚠️ Common Mistakes &amp; How to Avoid Them
        </h3>
        <ul className="text-red-800 dark:text-red-300 text-sm space-y-4 list-disc pl-5">
          <li>
            <strong>Making everything public</strong> — Use{" "}
            <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">
              private
            </code>{" "}
            by default, and only add{" "}
            <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">
              public
            </code>{" "}
            when you have a reason to.
            <br />
            <span className="text-xs text-red-600 dark:text-red-400 italic">
              ✅ Fix: Ask yourself &quot;does code outside this class need
              to access this?&quot; If not, keep it private.
            </span>
          </li>
          <li>
            <strong>Deep inheritance chains</strong> (more than 2-3
            levels like A → B → C → D) become very hard to follow.
            <br />
            <span className="text-xs text-red-600 dark:text-red-400 italic">
              ✅ Fix: Prefer <strong>composition over inheritance</strong>{" "}
              — instead of &quot;class D extends C extends B extends
              A&quot;, have D <em>use</em> instances of A, B, C as
              properties.
            </span>
          </li>
          <li>
            <strong>
              Forgetting{" "}
              <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">
                super()
              </code>
            </strong>{" "}
            in child constructors — TypeScript will catch this, but
            understand <em>why</em> it&apos;s needed.
            <br />
            <span className="text-xs text-red-600 dark:text-red-400 italic">
              ✅ Fix: Always call super() as the first line in any child
              constructor, passing the values the parent needs.
            </span>
          </li>
          <li>
            <strong>Not using interfaces</strong> — coding directly to a
            specific class makes your code rigid and hard to test.
            <br />
            <span className="text-xs text-red-600 dark:text-red-400 italic">
              ✅ Fix: Code to an interface, not an implementation. This
              lets you swap implementations easily (e.g., swap a real
              database for a mock during tests).
            </span>
          </li>
          <li>
            <strong>Confusing Abstraction and Encapsulation</strong> —
            they sound similar but solve different problems.
            <br />
            <span className="text-xs text-red-600 dark:text-red-400 italic">
              ✅ Remember: Encapsulation = <strong>hiding data</strong>{" "}
              (private properties + public methods). Abstraction ={" "}
              <strong>hiding complexity</strong> (abstract
              classes/interfaces that define &quot;what&quot; without
              &quot;how&quot;).
            </span>
          </li>
        </ul>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Summary                                                            */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          🧠 Quick Summary — What You Learned
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded shrink-0">
              1
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                Classes &amp; Objects
              </strong>{" "}
              — A class is a blueprint (the Lego instructions), an object
              is the instance you build from it. NestJS uses the
              constructor shorthand to declare and assign properties in
              one line.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">
              2
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                Encapsulation
              </strong>{" "}
              — Hide internal data with private, expose safe controls
              with public methods (getters/setters). NestJS layers
              (controllers → services → repositories) are encapsulation
              in action.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded shrink-0">
              3
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                Inheritance
              </strong>{" "}
              — Child classes reuse parent code using{" "}
              <code>extends</code>, call{" "}
              <code>super()</code> in constructors to set up the
              parent&apos;s properties first. Avoid chains deeper than
              2-3 levels.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold px-2 py-1 rounded shrink-0">
              4
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                Polymorphism
              </strong>{" "}
              — Same method name, different behavior. Interfaces define
              the contract, implementations provide the specifics. Add
              new types without editing existing code.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-bold px-2 py-1 rounded shrink-0">
              5
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                Abstraction
              </strong>{" "}
              — Define WHAT something does (abstract methods), not HOW.
              Abstract classes can also include shared working code
              (concrete methods) that children inherit for free.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2 py-1 rounded shrink-0">
              🎯
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                NestJS Foundation
              </strong>{" "}
              — Every NestJS building block (controllers, services,
              guards, interceptors, pipes) is a class that uses these OOP
              pillars. Master these, and NestJS will feel natural.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
