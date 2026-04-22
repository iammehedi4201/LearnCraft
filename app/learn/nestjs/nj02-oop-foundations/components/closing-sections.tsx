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
      <section>
        <div className="bg-amber-500/5 dark:bg-amber-500/10 p-8 lg:p-12 rounded-[2.5rem] border border-amber-200/50 dark:border-amber-500/20 shadow-xl shadow-amber-500/5 mb-8 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors" />
          
          <h3 className="text-2xl font-black mb-6 text-amber-900 dark:text-amber-400 flex items-center gap-3">
            <span className="text-3xl">🏋️</span> Mini Challenge
          </h3>
          <p className="text-amber-900/80 dark:text-amber-300/80 mb-6 text-lg font-medium leading-relaxed">
            Build a simple notification system using OOP. This combines
            everything you learned:
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <p className="text-amber-800 dark:text-amber-300 font-bold italic bg-amber-500/10 px-4 py-2 rounded-xl inline-block">
                Hint: You&apos;ll use abstraction, inheritance, encapsulation, and polymorphism — all in one exercise!
              </p>
              <ul className="text-amber-800/80 dark:text-amber-300/70 space-y-3 list-none">
                {[
                  "Create an abstract NotificationChannel class",
                  "Implement 3 child classes: Email, SMS, and Slack",
                  "Create a NotificationManager that accepts any channel",
                  "This is the exact pattern NestJS uses for Dependency Injection!"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
               <Collapsible title="💡 Show Solution (try it yourself first!)">
                <div className="mt-4 rounded-2xl overflow-hidden border border-amber-500/20">
                  <EnhancedCodeBlock
                    code={`// 1. Abstract class — the contract
abstract class NotificationChannel {
  log(message: string): void {
    console.log(\`[\${new Date().toISOString()}] \${message}\`);
  }
  abstract send(to: string, message: string): void;
}

// 2. Concrete implementations
class EmailChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`📧 Sending email to \${to}\`);
    console.log(\`Email body: \${message}\`);
  }
}

// 3. Manager using Dependency Injection
class NotificationManager {
  constructor(private channel: NotificationChannel) {}
  notify(to: string, message: string): void {
    this.channel.send(to, message);
  }
}`}
                    language="typescript"
                  />
                </div>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Common Mistakes                                                    */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <div className="bg-rose-500/5 dark:bg-rose-500/10 p-8 lg:p-12 rounded-[2.5rem] border border-rose-200/50 dark:border-rose-500/20 mb-8">
          <h3 className="text-2xl font-black mb-8 text-rose-900 dark:text-rose-400 flex items-center gap-3">
            <span className="text-3xl">⚠️</span> Common Mistakes
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Making everything public",
                fix: "Use private by default. Only expose what's necessary."
              },
              {
                title: "Deep inheritance chains",
                fix: "Prefer composition over inheritance. Keep it flat."
              },
              {
                title: "Forgetting super()",
                fix: "Always call super() first in child constructors."
              },
              {
                title: "Not using interfaces",
                fix: "Code to an interface, not an implementation."
              }
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-rose-500/10 hover:border-rose-500/30 transition-colors">
                <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-2">{item.title}</h4>
                <p className="text-xs text-rose-800/70 dark:text-rose-400/70 leading-relaxed italic">
                  ✅ Fix: {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Summary                                                            */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <div className="bg-slate-900 dark:bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          
          <h3 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
            <span className="text-3xl">🧠</span> Quick Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, title: "Classes & Objects", desc: "Blueprints vs Instances. Master the constructor shorthand." },
              { id: 2, title: "Encapsulation", desc: "Hide data with private, control access with methods." },
              { id: 3, title: "Inheritance", desc: "Reuse code with extends and super(). Stay DRY." },
              { id: 4, title: "Polymorphism", desc: "Same name, different behavior. Power of interfaces." },
              { id: 5, title: "Abstraction", desc: "Hide complexity. Define 'what' without the 'how'." },
              { id: "🎯", title: "NestJS Ready", desc: "You now understand the core of every NestJS app." }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group/item">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-7 w-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs">
                    {item.id}
                  </span>
                  <h4 className="font-bold text-slate-100 group-hover/item:text-blue-400 transition-colors">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
