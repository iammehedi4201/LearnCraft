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
// MODULE 4 — ROUTE PARAMETERS WITH @Param()
// ═══════════════════════════════════════════════════════════

export function RouteParamsSection() {
  return (
    <SectionContainer number={4} title="Route Parameters with @Param()">
      {/* ── 4.1 What are Route Parameters? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Dynamic URLs with Route Parameters"
          description="When you want to fetch a specific item by its ID (e.g. /users/42), use route parameters."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> How to Define and Read Parameters
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            Put a colon (<code>:</code>) before the variable name in your route decorator: <code>@Get(&apos;:id&apos;)</code>. Then use <code>@Param(&apos;id&apos;)</code> to extract it!
          </p>
        </WhyBox>

        <EnhancedCodeBlock
          code={`import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {

  // Matches: GET /users/42
  @Get(':id')
  findOne(@Param('id') id: string) {
    return "Fetching details for User #" + id;
  }

  // Matches: GET /users/5/posts/101
  @Get(':userId/posts/:postId')
  findUserPost(
    @Param('userId') userId: string,
    @Param('postId') postId: string
  ) {
    return "User #" + userId + " -> Post #" + postId;
  }
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 4.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Extracting Parameters Live"
          description="Test how route parameters work with real data."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Dynamic User Lookup</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated route parameter handler:
const database = [
  { id: "1", name: "Alice", email: "alice@learncraft.dev" },
  { id: "2", name: "Bob", email: "bob@learncraft.dev" },
  { id: "3", name: "Mehedi", email: "mehedi@learncraft.dev" }
];

function handleGetById(paramId: string) {
  const user = database.find(u => u.id === paramId);
  if (!user) {
    return { status: 404, error: "User not found!" };
  }
  return { status: 200, data: user };
}

console.log("Lookup ID 1:", handleGetById("1"));
console.log("Lookup ID 3:", handleGetById("3"));
console.log("Lookup ID 99:", handleGetById("99"));`}
            height="420px"
          />
        </div>

        <QuickCheck
          question="If your route is @Get(':username/photos'), how do you extract the username parameter inside your method?"
          answer="@Param('username') username: string"
        />
      </div>
    </SectionContainer>
  );
}
