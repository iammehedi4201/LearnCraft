"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — BASE ROUTING WITH @Controller()
// ═══════════════════════════════════════════════════════════

export function BaseRoutingSection() {
  return (
    <SectionContainer number={2} title="Base Routing with @Controller()">
      {/* ── 2.1 Route Prefixing ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Setting the Base Route Prefix"
          description="The string passed into @Controller('...') acts as the common URL prefix for every route in the class."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get } from '@nestjs/common';

@Controller('users') // ⭐ Base prefix: /users
export class UsersController {

  @Get() // Matches: GET /users
  findAll() {
    return ["Alice", "Bob", "Mehedi"];
  }

  @Get('profile') // Matches: GET /users/profile
  getProfile() {
    return { name: "Mehedi", bio: "Fullstack Engineer" };
  }
}`}
          language="typescript"
        />

        <div className="mt-8">
          <ComparisonTable
            headers={["@Controller() Prefix", "Method Decorator", "Full Matched URL"]}
            rows={[
              ["@Controller('users')", "@Get()", "GET /users"],
              ["@Controller('users')", "@Get('profile')", "GET /users/profile"],
              ["@Controller('products')", "@Get('featured')", "GET /products/featured"],
              ["@Controller() (Empty)", "@Get('health')", "GET /health"],
            ]}
          />
        </div>
      </div>

      <Divider />

      {/* ── 2.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Route Path Combination"
          description="NestJS automatically joins the controller prefix and the method path."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: How Route Matching Works</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated route resolver in TypeScript:

function resolveRoute(controllerPrefix: string, methodPath: string) {
  const cleanPrefix = controllerPrefix.replace(/^\\/|\\/$/g, "");
  const cleanPath = methodPath.replace(/^\\/|\\/$/g, "");

  if (!cleanPrefix && !cleanPath) return "/";
  if (!cleanPrefix) return "/" + cleanPath;
  if (!cleanPath) return "/" + cleanPrefix;
  return "/" + cleanPrefix + "/" + cleanPath;
}

console.log("Users List:   ", resolveRoute("users", ""));
console.log("User Profile: ", resolveRoute("users", "profile"));
console.log("Root Health:  ", resolveRoute("", "health"));`}
            height="360px"
          />
        </div>

        <QuickCheck
          question="If a controller has @Controller('api/v1/orders') and a method has @Get('pending'), what is the full URL endpoint?"
          answer="GET /api/v1/orders/pending"
        />
      </div>
    </SectionContainer>
  );
}
