"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={10} title="Learning Checks & Quizzes">
      {/* ── Predict Output Puzzles ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Identify the File Puzzles"
          description="Look at each code snippet and determine which file in a NestJS project it belongs to."
          color="primary"
        />

        <PredictOutputBox
          code={`import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();`}
          answer={`File: src/main.ts\n\nExplanation: This is the entry point file containing the bootstrap() function that initializes the NestFactory and starts listening for HTTP connections.`}
        />

        <PredictOutputBox
          code={`import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`}
          answer={`File: src/app.module.ts\n\nExplanation: This is the root module decorated with @Module(). It links the AppController and AppService together so NestJS can manage them.`}
        />

        <PredictOutputBox
          code={`import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}`}
          answer={`File: src/app.controller.ts\n\nExplanation: This is the controller file decorated with @Controller(). It defines the @Get() HTTP route and calls appService.getHello().`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Setup Scenario Questions"
          description="Test your understanding of common development situations."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You run 'nest g co products' in your terminal. What 2 things does the NestJS CLI do automatically?"
            answer="1. It creates the new file 'src/products/products.controller.ts'.\n2. It automatically imports ProductsController and adds it to the 'controllers' array in app.module.ts."
          />

          <QuickCheck
            question="Scenario 2: Your frontend developer says they cannot make requests from http://localhost:5173 (Vite/React) to your NestJS server because of a 'CORS error'. Where and how do you fix this?"
            answer="In src/main.ts, add 'app.enableCors();' right before 'await app.listen(3000);'."
          />

          <QuickCheck
            question="Scenario 3: Why should you run 'npm run start:dev' instead of 'npm run start' during local development?"
            answer="Because 'start:dev' runs the server in watch mode. It automatically detects file edits and restarts the server in milliseconds without you having to manually restart it."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
