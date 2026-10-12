"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 13 — EXPRESS.JS VS NESTJS: TYPES IN ACTION
// ═══════════════════════════════════════════════════════════

export function SectionExpressComparison() {
  return (
    <SectionContainer number={13} title="Express.js vs NestJS: Types in Action">
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Real-World Difference: Express vs NestJS"
          description="In Express (JavaScript), bugs hide until a real user hits your production API and causes a crash. In NestJS (TypeScript), every layer is strictly typed and validated."
          color="primary"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-error-light/30 flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-error-dark mb-3 flex items-center gap-2">
                <span>❌</span> Express.js (Untyped JavaScript)
              </h5>
              <EnhancedCodeBlock
                minLines={19}
                code={`// Express route handler (req.body is 'any')
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  // ⚠️ Silent runtime traps:
  // 1. What if 'age' is string "twenty"?
  // 2. What if 'email' is missing? DB rejects it.
  // 3. No IDE autocomplete for req.body.
  
  const user = db.createUser({ 
    name, 
    email, 
    age: age * 1 
  });
  
  res.status(201).json(user);
});`}
                language="javascript"
              />
            </div>
            <p className="text-xs text-ds-text-sub mt-3 leading-relaxed">
              <strong>The Problem:</strong> You must manually write 15+ lines of defensive <code className="text-ds-error-base">if (!email || typeof email !== &quot;string&quot;)</code> checks for every single route, or risk server crashes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-success-light/30 flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-success-dark mb-3 flex items-center gap-2">
                <span>✅</span> NestJS (Strongly Typed TypeScript)
              </h5>
              <EnhancedCodeBlock
                minLines={19}
                code={`// 1. Define strict DTO blueprint
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
}

// 2. Controller is 100% typed
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    // ✨ Full IDE autocomplete on dto fields
    // ✨ Automatic validation before code runs
    return this.usersService.create(dto);
  }
}`}
                language="typescript"
              />
            </div>
            <p className="text-xs text-ds-text-sub mt-3 leading-relaxed">
              <strong>The Solution:</strong> TypeScript guarantees that <code className="text-ds-success-dark font-bold">dto</code> conforms to the DTO contract at compile time, eliminating defensive type checks and silent bugs.
            </p>
          </div>
        </div>

        <ComparisonTable
          headers={["Feature", "Express.js (Vanilla JS)", "NestJS (TypeScript)"]}
          rows={[
            ["Type Safety", "❌ None (req.body is `any`)", "✅ 100% compile-time + runtime DTO validation"],
            ["Refactoring Safety", "❌ High risk of breaking endpoints", "✅ Safe across controllers, services, and models"],
            ["API Documentation", "❌ Manual Postman/Swagger maintenance", "✅ Automatic Swagger generation from DTO types"],
            ["Dependency Injection", "❌ Manual passing of objects", "✅ Auto-resolved from constructor parameter types"],
            ["Enterprise Scalability", "⚠️ Difficult for large teams", "✅ Standardized architecture for teams of any size"],
          ]}
        />

        <InfoCallout emoji="🚀" title="The NestJS Advantage">
          <p>
            By mastering TypeScript essentials (Primitives, Enums, Interfaces, Utility Types, Generics, and Guards), you have unlocked the entire foundation that makes NestJS the most robust enterprise Node.js framework in the world.
          </p>
        </InfoCallout>

        <QuickCheck
          question="How does NestJS know what service to inject into a controller constructor?"
          answer="NestJS reads the TypeScript parameter type annotation (e.g. `constructor(private usersService: UsersService)`) using TypeScript reflection metadata at runtime, and automatically instantiates and injects the singleton service."
        />
      </div>
    </SectionContainer>
  );
}
