import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Collapsible } from "./collapsible";
import { QuickCheck } from "./quick-check";

export function ClosingSections() {
  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Section 6: Express vs NestJS                                       */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="bg-white dark:bg-slate-800/40 p-8 lg:p-12 rounded-lg border border-slate-200/40 dark:border-slate-700/40 backdrop-blur-sm mb-12">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 font-black">
              6
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Express vs NestJS
            </h2>
          </div>

          <div className="mb-16">
            <div className="p-5 bg-orange-500/5 rounded-2xl border border-orange-200/50 dark:border-orange-500/15 mb-6">
              <h3 className="font-bold text-xl text-orange-700 dark:text-orange-400 mb-2">
                1. What is the difference?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Express is built with simple, standalone functions. NestJS is built entirely with Classes, Objects, and the OOP rules you just learned. 
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Why does it matter?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                Express gives you zero rules. You can throw all your code into one massive file if you want. This works for tiny apps, but becomes a messy nightmare on big apps. NestJS uses Object-Oriented Programming to <em>force</em> you to stay organized.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">How does it work?</h4>
              <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <strong>Express:</strong> You write a function. It handles the website request directly.
                </li>
                <li>
                  <strong>NestJS:</strong> You create a Class. It implements an Interface. It extends an Abstract Repository. It encapsulates data. It uses Polymorphism to talk to other classes.
                </li>
              </ol>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">Example</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500/5 p-5 rounded-xl border border-red-500/10">
                  <h5 className="font-bold text-red-700 dark:text-red-400 mb-3 text-sm">
                    Express (Just simple functions)
                  </h5>
                  <EnhancedCodeBlock
                    code={`// Route handler — a plain standalone function
app.get("/users", (req, res) => {
  const users = getUsersFromDB();
  res.json(users);
});`}
                    language="javascript"
                  />
                </div>
                <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/10">
                  <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 text-sm">
                    NestJS (Organized Classes)
                  </h5>
                  <EnhancedCodeBlock
                    code={`// A class that handles routes
@Controller('users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Common mistake
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                <strong>Writing NestJS code like Express code:</strong> Many beginners try to shove simple functions inside NestJS files without using classes. NestJS will reject this. You must play by the OOP rules.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick summary</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Express uses loose functions. NestJS uses strict Object-Oriented classes. This is why you need to understand OOP to use NestJS.</p>
            </div>

            <QuickCheck
              question="Does NestJS prefer you to use loose, floating functions or organized Classes?"
              answer="NestJS strongly requires organized Classes."
            />
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
            <span className="text-3xl">🏋️</span> Final Challenge
          </h3>
          <p className="text-amber-900/80 dark:text-amber-300/80 mb-6 text-lg font-medium leading-relaxed">
            Build a simple notification system. Prove you understand the concepts!
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <p className="text-amber-800 dark:text-amber-300 font-bold italic bg-amber-500/10 px-4 py-2 rounded-xl inline-block">
                Hint: You will use abstraction, inheritance, and polymorphism here.
              </p>
              <ul className="text-amber-800/80 dark:text-amber-300/70 space-y-3 list-none">
                {[
                  "Create an abstract class called Notification.",
                  "Give it an abstract method called send().",
                  "Create two child classes: Email and SMS. Make them extend Notification.",
                  "Write the actual send() code in both children.",
                  "Make a function that accepts ANY Notification and calls send()."
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
                    code={`// 1. Abstract class
abstract class Notification {
  abstract send(message: string): void;
}

// 2. Child class 1
class Email extends Notification {
  send(message: string): void {
    console.log(\`Email sent: \${message}\`);
  }
}

// 3. Child class 2
class SMS extends Notification {
  send(message: string): void {
    console.log(\`SMS sent: \${message}\`);
  }
}

// 4. Polymorphism! This function works with ANY notification.
function alertUser(notifier: Notification) {
  notifier.send("Hello World!");
}

alertUser(new Email());
alertUser(new SMS());`}
                    language="typescript"
                  />
                </div>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Summary                                                            */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        <div className="bg-slate-800 dark:bg-slate-800/50 p-8 lg:p-12 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <h3 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
            <span className="text-3xl">🧠</span> Module Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, title: "Classes & Objects", desc: "Classes are the blueprints. Objects are the actual houses." },
              { id: 2, title: "Encapsulation", desc: "Use 'private' to hide data. Use methods to safely change it." },
              { id: 3, title: "Inheritance", desc: "Use 'extends' to copy a parent class. Call super() first." },
              { id: 4, title: "Polymorphism", desc: "Same method name, different behavior. Say goodbye to huge if/else blocks." },
              { id: 5, title: "Abstraction", desc: "An 'abstract' class is a half-finished plan. Children must finish it." },
              { id: "🎯", title: "NestJS Ready", desc: "You now understand the core ideas that power the entire NestJS framework." }
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
