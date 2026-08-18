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
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — THE GLOBAL VALIDATIONPIPE
// ═══════════════════════════════════════════════════════════

export function ValidationPipeSection() {
  return (
    <SectionContainer number={4} title="The Global ValidationPipe">
      {/* ── 4.1 Enabling Validation Globally ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Activating Validation in main.ts"
          description="A single line in main.ts activates automatic validation across your entire application."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ Binds ValidationPipe to every single endpoint globally:
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚦</span> What happens when validation fails?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            If a client sends invalid data, NestJS immediately intercepts the request and responds with a standard <strong>400 Bad Request</strong> JSON body before your controller even executes:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-ds-error-base p-3.5 rounded-xl font-mono text-xs border border-ds-stroke-soft whitespace-pre-wrap leading-relaxed">
{`{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "name should not be empty"
  ],
  "error": "Bad Request"
}`}
          </pre>
        </WhyBox>

        <EasyRuleCard rule="Always enable app.useGlobalPipes(new ValidationPipe()) in main.ts so every endpoint is protected." />
      </div>

      <Divider />

      {/* ── 4.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="See ValidationPipe In Action Live"
          description="Test how ValidationPipe evaluates incoming payloads."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Automated Validation Simulator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function mockValidationPipe(dtoRules: Record<string, string>, payload: any) {
  const errors: string[] = [];

  for (const [key, rule] of Object.entries(dtoRules)) {
    if (rule === "isEmail" && (!payload[key] || !payload[key].includes("@"))) {
      errors.push(key + " must be a valid email");
    }
    if (rule === "isNotEmpty" && (!payload[key] || payload[key].trim() === "")) {
      errors.push(key + " should not be empty");
    }
  }

  if (errors.length > 0) {
    return { statusCode: 400, error: "Bad Request", message: errors };
  }
  return { statusCode: 200, message: "Validation passed!", validatedData: payload };
}

const userDtoRules = { name: "isNotEmpty", email: "isEmail" };

console.log("Valid request:  ", mockValidationPipe(userDtoRules, { name: "Mehedi", email: "mehedi@learncraft.dev" }));
console.log("Invalid request:", mockValidationPipe(userDtoRules, { name: "", email: "bad-email" }));`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="Where is the best place to enable ValidationPipe globally for the whole app?"
          answer="In 'src/main.ts' using 'app.useGlobalPipes(new ValidationPipe())'."
        />
      </div>
    </SectionContainer>
  );
}
