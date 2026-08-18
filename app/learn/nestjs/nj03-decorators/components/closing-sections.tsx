"use client";

import Link from "next/link";
import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 21 — CLOSING REVIEW & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={21} title="Express vs NestJS & Final Review">
      {/* ── Express vs NestJS ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Express vs NestJS — The Decorator Paradigm Shift"
          description="Express uses manual, imperative route registration. NestJS uses declarative decorators on structured classes."
          color="primary"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-red-500/5 rounded-xl border border-red-500/10">
            <h5 className="font-bold text-red-700 dark:text-red-400 mb-3 text-sm">
              Express (Imperative Wiring)
            </h5>
            <EnhancedCodeBlock
              code={`// Routes and handlers are separate
const router = express.Router();

router.get("/users", authMiddleware, (req, res) => {
  res.json(getUsers());
});

router.post("/users", validateBody, (req, res) => {
  res.json(createUser(req.body));
});`}
              language="javascript"
            />
          </div>

          <div className="p-5 bg-[#7f6fbe]/5 rounded-xl border border-[#7f6fbe]/10">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-3 text-sm">
              NestJS (Declarative with Decorators)
            </h5>
            <EnhancedCodeBlock
              code={`// Self-documenting class with decorators
@Controller("users")
@UseGuards(AuthGuard)
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}`}
              language="typescript"
            />
          </div>
        </div>

        <ComparisonTable
          headers={["Feature", "Express", "NestJS"]}
          rows={[
            ["Route Definition", "router.get('/path', fn)", "@Get('/path') above method"],
            ["Parameter Extraction", "req.params.id, req.body", "@Param('id'), @Body() in argument list"],
            ["Dependency Injection", "Manual instantiation / prop drilling", "Automatic via constructor type metadata"],
            ["Validation", "Manual middleware attached per route", "@UsePipes(ValidationPipe) with DTO decorators"],
            ["Authentication", "Manual middleware functions", "@UseGuards() with metadata reflection"],
            ["Scalability", "Architectural discipline left to developer", "Enforced modular enterprise architecture"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Final Module Summary Cards ── */}
      <div className="mb-16">
        <div className="bg-ds-bg-weak p-8 lg:p-12 rounded-2xl border border-ds-stroke-soft shadow-sm relative overflow-hidden">
          <h3 className="text-2xl font-black mb-8 text-ds-text-strong flex items-center gap-3">
            <span className="text-3xl">🧠</span> Module Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "1", title: "What is a Decorator?", desc: "Functions prefixed with @ that attach behavior or metadata to classes, methods, and properties." },
              { id: "2", title: "When They Run", desc: "Decorators execute ONCE when the class definition is loaded, not per instance or request." },
              { id: "3", title: "Method Interception", desc: "Replace descriptor.value and call originalMethod.apply(this, args) to wrap methods." },
              { id: "4", title: "Decorator Factories", desc: "Functions returning a decorator function (@Dec()), allowing custom configuration arguments." },
              { id: "5", title: "Execution Order", desc: "Factories evaluate Top → Down. Decorators apply Bottom → Up (closest to target first)." },
              { id: "6", title: "reflect-metadata", desc: "Standard metadata storage API. Key to how NestJS inspects routes and injects dependencies." },
              { id: "7", title: "Parameter Decorators", desc: "Record argument indices for request data extraction (@Body, @Param)." },
              { id: "8", title: "Modern vs Legacy", desc: "NestJS uses experimental legacy decorators for parameter decorator and reflection support." },
              { id: "🎯", title: "NestJS Ready", desc: "You now understand what every @ symbol does across the entire NestJS framework!" },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm hover:border-ds-stroke-sub transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-7 w-7 rounded-lg bg-ds-feature-lighter text-ds-feature-dark flex items-center justify-center font-black text-xs">
                    {item.id}
                  </span>
                  <h4 className="font-bold text-ds-text-strong text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-ds-text-sub leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Next Learning Module
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you have mastered Object-Oriented Foundations (NJ-02) and TypeScript Decorators (NJ-03), you are ready to learn the 5 design principles that make NestJS applications scalable and maintainable.
        </p>
        <Link
          href="/learn/nestjs/nj04-solid"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-04: SOLID Principles →
        </Link>
      </div>

      <QuickCheck
        question="Why was learning TypeScript Decorators the essential prerequisite before building complex NestJS applications?"
        answer="Because decorators are the foundational syntax and architecture of NestJS! Controllers, modules, services, routes, guards, interceptors, validation pipes, and dependency injection are ALL declared using decorators. Knowing how they work removes the 'magic' and allows you to debug, configure, and build enterprise backends with full confidence."
      />
    </SectionContainer>
  );
}
