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
              code={`import express, { type Request, type Response } from "express";

type CreateUserInput = { name: string; email: string };
type User = CreateUserInput & { id: string };

const app = express();

async function saveUser(input: CreateUserInput): Promise<User> {
  return { ...input, id: "user-1" };
}

// Express with explicit TypeScript request and response types
app.post("/users", async (
  req: Request<Record<string, never>, User, CreateUserInput>,
  res: Response<User>
): Promise<void> => {
  const user = await saveUser(req.body);
  res.json(user);
});`}
              language="typescript"
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
              code={`import {
  Body,
  Controller,
  Injectable,
  Post
} from "@nestjs/common";

class CreateUserDto {
  name!: string;
  email!: string;
}

type User = CreateUserDto & { id: string };

@Injectable()
class UsersService {
  async create(input: CreateUserDto): Promise<User> {
    return { ...input, id: "user-1" };
  }
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }
}`}
              language="typescript"
            />
          </div>
        </div>

        <WhyBox>
          <p className="text-sm font-bold text-ds-feature-dark mb-1">
            What the NestJS decorators do:
          </p>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            <code>@Controller(&quot;users&quot;)</code> sets the route prefix, <code>@Post()</code> maps the method to an HTTP POST request, and <code>@Body()</code> asks NestJS to pass the parsed request body into that parameter. <code>CreateUserDto</code> gives the value a TypeScript shape; runtime validation is added separately with validation decorators and a pipe.
          </p>
        </WhyBox>

        <ComparisonTable
          headers={["Feature", "Express.js", "NestJS"]}
          rows={[
            ["Structure", "You choose the project conventions", "Provides conventions for modules, controllers, and providers"],
            ["SOLID Support", "Possible through your own design", "Offers helpful building blocks; your design choices still matter"],
            ["Dependency Injection", "Not built-in", "Built-in container; registered providers are resolved automatically"],
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
