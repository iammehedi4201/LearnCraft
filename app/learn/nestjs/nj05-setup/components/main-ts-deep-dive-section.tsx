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
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — DEEP DIVE INTO main.ts
// ═══════════════════════════════════════════════════════════

export function MainTsDeepDiveSection() {
  return (
    <SectionContainer number={4} title="Deep Dive into main.ts">
      {/* ── 4.1 Line by Line Breakdown ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Understanding the Bootstrap Function"
          description="main.ts is the first file executed when your server starts. Let's read it line by line."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1. Create the NestJS application tree starting from AppModule
  const app = await NestFactory.create(AppModule);

  // 2. Start the HTTP server listening on port 3000
  await app.listen(3000);
}

// 3. Call the bootstrap function to kick off the server!
bootstrap();`}
          language="typescript"
        />

        <div className="mt-8">
          <StepList
            steps={[
              {
                label: "NestFactory.create(AppModule)",
                note: "NestFactory is a built-in helper class. It creates your entire application, reads AppModule, instantiates all controllers, and connects services with dependency injection.",
              },
              {
                label: "app.listen(3000)",
                note: "Starts the underlying HTTP web server (Express) and listens for incoming requests on port 3000.",
              },
              {
                label: "bootstrap()",
                note: "An async function that starts the whole process.",
              },
            ]}
          />
        </div>
      </div>

      <Divider />

      {/* ── 4.2 Common Customizations ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Common Customizations in main.ts"
          description="As your project grows, you will often add global settings inside main.ts."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛠️</span> 3 Most Common Changes to main.ts
          </h4>
          <div className="space-y-4 text-xs text-ds-text-sub leading-relaxed">
            <div>
              <p className="font-bold text-ds-text-strong mb-1">1. Using an Environment Port:</p>
              <EnhancedCodeBlock
                code={`const port = process.env.PORT ?? 3000;
await app.listen(port);`}
                language="typescript"
              />
            </div>

            <div>
              <p className="font-bold text-ds-text-strong mb-1">2. Setting a Global API Prefix (e.g. /api/v1):</p>
              <EnhancedCodeBlock
                code={`// All routes will now start with /api/v1 (e.g. /api/v1/users)
app.setGlobalPrefix('api/v1');`}
                language="typescript"
              />
            </div>

            <div>
              <p className="font-bold text-ds-text-strong mb-1">3. Enabling CORS for Frontend Apps (Next.js, React):</p>
              <EnhancedCodeBlock
                code={`// Allows frontend apps on different ports or domains to connect
app.enableCors();`}
                language="typescript"
              />
            </div>
          </div>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Bootstrapping a Custom Server</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated NestJS bootstrap flow:
class MockNestApp {
  private prefix = "";
  private corsEnabled = false;

  setGlobalPrefix(prefix: string) {
    this.prefix = prefix;
    console.log("📍 Global API Prefix set to: /" + prefix);
  }

  enableCors() {
    this.corsEnabled = true;
    console.log("🌐 CORS enabled for frontend clients.");
  }

  async listen(port: number) {
    console.log("🚀 NestJS server successfully running at http://localhost:" + port);
    if (this.prefix) {
      console.log("🔗 Try visiting: http://localhost:" + port + "/" + this.prefix);
    }
  }
}

async function bootstrap() {
  const app = new MockNestApp();

  // Customize our server:
  app.setGlobalPrefix("api/v1");
  app.enableCors();

  const port = 4000;
  await app.listen(port);
}

bootstrap();`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="What method do you call on the app instance in main.ts if you want all your endpoints to have '/api' in front of their URL?"
          answer="app.setGlobalPrefix('api'); (This prefixes all routes, turning '/users' into '/api/users')."
        />
      </div>
    </SectionContainer>
  );
}
