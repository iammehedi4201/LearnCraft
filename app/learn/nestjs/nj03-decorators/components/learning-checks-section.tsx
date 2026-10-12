"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 18 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={14} title="Learning Checks & Quizzes">
      {/* ── Predict Output ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Predict the Output Challenges"
          description="Test your mental model of decorator evaluation and application order by predicting what these snippets will print."
          color="primary"
        />

        <PredictOutputBox
          code={`function DecA() {
  console.log("Factory A");
  return function (t: any, k: string, d: any) {
    console.log("Decorator A");
  };
}

function DecB() {
  console.log("Factory B");
  return function (t: any, k: string, d: any) {
    console.log("Decorator B");
  };
}

class Test {
  @DecA()
  @DecB()
  run() {}
}`}
          answer={`Factory A\nFactory B\nDecorator B\nDecorator A\n\nExplanation: Factories evaluate top-to-bottom (A -> B), while decorators apply bottom-to-top (B -> A).`}
        />

        <PredictOutputBox
          code={`function Log(constructor: Function) {
  console.log("Decorating:", constructor.name);
}

@Log
class Car {}

console.log("Creating instances...");
const c1 = new Car();
const c2 = new Car();`}
          answer={`Decorating: Car\nCreating instances...\n\nExplanation: Decorators run ONCE when the class definition is evaluated, NOT when instances (c1, c2) are created.`}
        />
      </div>

      <Divider />

      {/* ── Scenario Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Scenario-Based Conceptual Checks"
          description="Test your understanding of decorator mechanics, 'this' context, and framework integration."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You created a method decorator to log query times, but this.databaseConnection inside the method is undefined and throws a TypeError. What is the most likely bug in your decorator?"
            answer="You probably called `originalMethod(...args)` directly instead of `originalMethod.apply(this, args)`. Without .apply(this, args), the method executes without its instance context, making 'this' undefined."
          />

          <QuickCheck
            question="Scenario 2: In NestJS, you create a custom decorator @CurrentUser() to extract req.user from the request. What decorator type is @CurrentUser()?"
            answer="@CurrentUser() is a Parameter Decorator (created with createParamDecorator). It attaches to a controller method parameter (e.g. getUser(@CurrentUser() user: User)) and tells NestJS to inject the request's user object into that argument position."
          />

          <QuickCheck
            question="Scenario 3: Why does a property decorator receive only 2 arguments (target, propertyKey) whereas a method decorator receives 3 arguments (target, propertyKey, descriptor)?"
            answer="Because class instance properties (e.g. name: string) are not defined on the class prototype when the class file is first loaded. They only come into existence when an instance is instantiated with 'new Class()'. Since there is no property descriptor on the prototype at definition time, TypeScript only provides target and propertyKey."
          />

          <QuickCheck
            question="Scenario 4: When you stack @UseGuards(AuthGuard) and @Get('/admin') on a controller method, which one wraps closest to the method?"
            answer="@Get('/admin') is lower in the stack, so it attaches to the method first. @UseGuards wraps around it on the outer layer, ensuring that the auth check executes before the route handler is invoked."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
