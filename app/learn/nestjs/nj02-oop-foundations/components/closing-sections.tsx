import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { SectionContainer, TopicHeader, Divider, ComparisonTable, InfoCallout } from "./shared-components";

export function ClosingSections() {
  return (
    <SectionContainer number={18} title="Express vs NestJS & Final Review">

      {/* ── Express vs NestJS ── */}
      <div className="mb-16">
        <TopicHeader number={1} title="Express vs NestJS — Why OOP Matters" description="Express uses simple functions. NestJS uses classes and OOP. This is why understanding OOP was essential before learning NestJS." color="primary" />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-red-500/5 rounded-xl border border-red-500/10">
            <h5 className="font-bold text-red-700 dark:text-red-400 mb-3 text-sm">
              Express (Simple Functions)
            </h5>
            <EnhancedCodeBlock code={`// A plain function handles the request
app.get("/users", (req, res) => {
  const users = getUsersFromDB();
  res.json(users);
});

// Another floating function
app.post("/users", (req, res) => {
  const user = createUser(req.body);
  res.json(user);
});`} language="javascript" />
          </div>
          <div className="p-5 bg-[#7f6fbe]/5 rounded-xl border border-[#7f6fbe]/10">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-3 text-sm">
              NestJS (Organized Classes)
            </h5>
            <EnhancedCodeBlock code={`// A CLASS handles routes (OOP!)
@Controller('users')
class UsersController {
  // Composition: HAS a service
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    // Calls the service (Separation of concerns)
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.usersService.create(body);
  }
}`} language="typescript" />
          </div>
        </div>

        <ComparisonTable headers={["", "Express", "NestJS"]} rows={[
          ["Style", "Procedural (functions)", "OOP (classes)"],
          ["Organization", "You decide how to organize", "Enforced structure"],
          ["OOP Required?", "No", "Yes — classes are mandatory"],
          ["Learning Curve", "Easy to start", "Harder (need OOP first)"],
          ["Best For", "Small APIs, prototypes", "Large apps, teams, enterprise"],
          ["TypeScript", "Optional", "Built-in (first-class)"],
        ]} />

        <InfoCallout emoji="🎯" title="Why you just learned OOP">
          <p>NestJS <strong>requires</strong> OOP. Every controller is a class. Every service is a class. Providers use inheritance. Guards use interfaces. Dependency Injection uses constructors. Without OOP knowledge, NestJS code would look like gibberish. Now you&apos;re ready!</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── OOP in NestJS ── */}
      <div className="mb-16">
        <TopicHeader number={2} title="How OOP Concepts Appear in NestJS" description="Every OOP concept you learned maps directly to NestJS features." color="sky" />

        <div className="space-y-3 mb-8">
          {[
            { concept: "Classes", nest: "Controllers, Services, Guards, Pipes, Interceptors — ALL are classes" },
            { concept: "Constructor", nest: "Dependency Injection — services are injected through the constructor" },
            { concept: "this", nest: "Every method uses this.service to access injected dependencies" },
            { concept: "Encapsulation", nest: "Services hide business logic. Controllers only handle routes." },
            { concept: "Inheritance", nest: "Custom exceptions extend HttpException. Guards extend CanActivate." },
            { concept: "Polymorphism", nest: "Different guards/pipes can be swapped without changing controllers" },
            { concept: "Composition", nest: "Controllers HAS Services. Services HAS Repositories. Modules HAS Controllers." },
            { concept: "Static", nest: "Constants, configuration values, utility helpers" },
            { concept: "Interfaces", nest: "Define contracts for services, DTOs, and entities (TypeScript)" },
          ].map(item => (
            <div key={item.concept} className="flex items-start gap-4 p-3 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-ds-bg-white text-ds-feature-base border border-ds-stroke-soft flex-shrink-0 mt-0.5">{item.concept}</span>
              <p className="text-sm text-ds-text-strong">{item.nest}</p>
            </div>
          ))}
        </div>

        <QuickCheck question="Does NestJS prefer you to use loose, floating functions or organized Classes?" answer="NestJS strongly requires organized Classes. Every part of NestJS (controllers, services, guards, pipes, interceptors) is built as a class." />
      </div>

      <Divider />

      {/* ── Final Summary ── */}
      <div className="mb-8">
        <div className="bg-ds-bg-weak p-8 lg:p-12 rounded-2xl border border-ds-stroke-soft shadow-sm relative overflow-hidden">
          <h3 className="text-2xl font-black mb-8 text-ds-text-strong flex items-center gap-3">
            <span className="text-3xl">🧠</span> Module Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, title: "Classes & Objects", desc: "Classes are blueprints. Objects are real things built from them." },
              { id: 2, title: "Constructor & this", desc: '"new" creates objects. Constructor sets them up. "this" = current object.' },
              { id: 3, title: "Encapsulation", desc: "Protect data with private access modifiers. Control access with methods." },
              { id: 4, title: "Abstraction", desc: "Hide complexity behind simple methods. Show what, hide how." },
              { id: 5, title: "Inheritance", desc: 'Use "extends" for IS-A. Call super() in child constructors.' },
              { id: 6, title: "Polymorphism", desc: "Same method name, different behavior. Replaces if/else chains." },
              { id: 7, title: "Composition", desc: 'Build objects from smaller objects. HAS-A > IS-A when unsure.' },
              { id: 8, title: "Static", desc: "Belongs to the class itself. Called with ClassName.method()." },
              { id: "🎯", title: "NestJS Ready", desc: "You now understand the core ideas that power the entire NestJS framework." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm hover:border-ds-stroke-sub transition-all duration-300 group/item">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-7 w-7 rounded-lg bg-ds-feature-lighter text-ds-feature-dark flex items-center justify-center font-black text-xs">
                    {item.id}
                  </span>
                  <h4 className="font-bold text-ds-text-strong text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-ds-text-sub leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </SectionContainer>
  );
}
