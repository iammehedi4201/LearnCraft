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
// MODULE 9 — REDIRECTS & ASYNC HANDLERS
// ═══════════════════════════════════════════════════════════

export function RedirectsAsyncSection() {
  return (
    <SectionContainer number={9} title="Redirects & Asynchronous Handlers">
      {/* ── 9.1 Redirects ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Redirecting Requests with @Redirect()"
          description="Forward clients to another URL automatically using @Redirect()."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, Redirect, Query } from '@nestjs/common';

@Controller('docs')
export class DocsController {

  // Static Redirect (302 Found by default):
  @Get('overview')
  @Redirect('https://docs.nestjs.com', 301)
  getDocs() {}

  // Dynamic Redirect based on query parameters:
  @Get('search')
  @Redirect('https://docs.nestjs.com', 302)
  searchDocs(@Query('version') version: string) {
    if (version === 'v10') {
      return { url: 'https://docs.nestjs.com/v10' };
    }
  }
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 9.2 Async Handlers ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Asynchronous Handlers (async / await)"
          description="In real apps, fetching database records is asynchronous. NestJS handles Promises effortlessly."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⏳</span> Async / Await in Controllers
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            Every controller method can be marked with <code>async</code> and return a <code>Promise</code>. NestJS will automatically wait for the promise to resolve before sending the JSON response:
          </p>
          <EnhancedCodeBlock
            code={`@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAllFromDB();
    return users; // NestJS resolves the promise and sends JSON!
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Async Data Resolution</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated async database delay:
async function fetchUserFromDatabase(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "Mehedi", role: "Instructor", loadedAt: new Date().toLocaleTimeString() });
    }, 500);
  });
}

async function controllerGetOne(id: number) {
  console.log("⏳ Fetching user #" + id + " from database...");
  const user = await fetchUserFromDatabase(id);
  console.log("✅ User received:", user);
  return user;
}

controllerGetOne(42);`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="Does NestJS require you to manually call a callback function when returning data from an async controller method?"
          answer="No! You simply 'return' the data or Promise directly. NestJS automatically awaits the Promise and serializes the result to JSON."
        />
      </div>
    </SectionContainer>
  );
}
