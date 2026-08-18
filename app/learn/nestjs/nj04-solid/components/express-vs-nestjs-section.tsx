"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 8 — EXPRESS.JS VS NESTJS
// ═══════════════════════════════════════════════════════════

export function ExpressVsNestjsSection() {
  return (
    <SectionContainer number={8} title="Express.js vs NestJS">
      {/* ── 8.1 Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Express.js vs NestJS: Freedom vs Structure"
          description="Both Express and NestJS are great tools for building backends with Node.js."
          color="primary"
        />

        <WhyBox>
          <p className="text-sm font-bold text-ds-feature-dark mb-1">
            The core difference:
          </p>
          <blockquote className="text-sm italic font-medium text-ds-text-strong">
            &quot;Express gives you more freedom. NestJS gives you more structure.&quot;
          </blockquote>
        </WhyBox>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Express */}
          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
            <h5 className="font-bold text-ds-text-strong mb-2 text-sm">
              Express.js
            </h5>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
              Express gives you flexibility. You decide how to structure your application. You can follow SOLID, but Express does not force or strongly guide you toward it.
            </p>
            <EnhancedCodeBlock
              code={`// Express: Free-form functions
app.post("/users", async (req, res) => {
  // You decide how to organize this
  const user = await saveUser(req.body);
  res.json(user);
});`}
              language="javascript"
            />
          </div>

          {/* NestJS */}
          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
            <h5 className="font-bold text-ds-feature-dark mb-2 text-sm">
              NestJS
            </h5>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
              NestJS provides a structured architecture with:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-xs text-ds-text-strong mb-3">
              <li>Modules</li>
              <li>Controllers</li>
              <li>Providers & Services</li>
              <li>Dependency Injection</li>
              <li>Decorators</li>
            </ul>
            <EnhancedCodeBlock
              code={`// NestJS: Structured classes
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }
}`}
              language="typescript"
            />
          </div>
        </div>

        <ComparisonTable
          headers={["Feature", "Express.js", "NestJS"]}
          rows={[
            ["Structure", "You decide the folder structure", "Enforced Modules, Controllers, Services"],
            ["SOLID Support", "Possible, but you must organize it manually", "Built into the framework by default"],
            ["Dependency Injection", "Not built-in", "Built-in and automatic"],
          ]}
        />
      </div>

      <Divider />

      <div className="mb-16">
        <QuickCheck
          question="Can you follow SOLID principles in an Express.js app?"
          answer="Yes! Express gives you the freedom to organize your code however you like. You can definitely follow SOLID in Express, but NestJS makes it easier by providing a ready-made structure."
        />
      </div>
    </SectionContainer>
  );
}
