"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — REQUEST BODY WITH @Body()
// ═══════════════════════════════════════════════════════════

export function RequestBodySection() {
  return (
    <SectionContainer number={5} title="Request Body with @Body()">
      {/* ── 5.1 What is @Body()? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Reading JSON Payloads with @Body()"
          description="When clients submit forms or JSON data in POST or PUT requests, use @Body() to read it."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> The Data Transfer Object (DTO)
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            In NestJS, we define a simple TypeScript class called a <strong>DTO (Data Transfer Object)</strong> to describe the exact shape of incoming JSON data.
          </p>
        </WhyBox>

        <EnhancedCodeBlock
          code={`// 1. Define the DTO class:
export class CreateUserDto {
  name: string;
  email: string;
  age: number;
}

// 2. Use @Body() in the Controller:
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return {
      status: "Created",
      user: createUserDto
    };
  }

  // You can also extract just one specific field:
  @Post('reset-password')
  resetPassword(@Body('email') email: string) {
    return "Password reset link sent to: " + email;
  }
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 5.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Handling JSON Payloads Live"
          description="Test creating new records from request body objects."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Creating Users with @Body()</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated database and controller:
const usersDB: any[] = [];

class UsersController {
  createUser(body: { name: string; email: string }) {
    const newUser = {
      id: usersDB.length + 1,
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString()
    };
    usersDB.push(newUser);
    return { statusCode: 201, data: newUser };
  }
}

const controller = new UsersController();

console.log(controller.createUser({ name: "Alice", email: "alice@learncraft.dev" }));
console.log(controller.createUser({ name: "Bob", email: "bob@learncraft.dev" }));
console.log("Current Database:", usersDB);`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="What decorator extracts the JSON payload sent by a client in a POST request?"
          answer="@Body() (e.g. create(@Body() createUserDto: CreateUserDto))"
        />
      </div>
    </SectionContainer>
  );
}
