"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={12} title="Learning Checks & Quizzes">
      {/* ── Predict Injected Value ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Predict the Injected Value Puzzles"
          description="Test your knowledge of custom tokens and provider bindings."
          color="primary"
        />

        <PredictOutputBox
          code={`const customProvider = {
  provide: 'API_URL',
  useValue: 'https://api.learncraft.dev'
};

@Injectable()
export class HttpClient {
  constructor(@Inject('API_URL') public url: string) {}
}

// Injected HttpClient instance:
const client = new HttpClient(customProvider.useValue);
console.log(client.url);`}
          answer={`Output: 'https://api.learncraft.dev'\n\nExplanation: The custom string token 'API_URL' is matched by @Inject('API_URL'), which provides the constant URL string.`}
        />

        <PredictOutputBox
          code={`const factoryProvider = {
  provide: 'TAX_RATE',
  useFactory: (env: string) => env === 'production' ? 0.08 : 0.00,
};

console.log("Dev tax rate: ", factoryProvider.useFactory('development'));
console.log("Prod tax rate:", factoryProvider.useFactory('production'));`}
          answer={`Output:\nDev tax rate:  0.00\nProd tax rate: 0.08\n\nExplanation: useFactory dynamically executes the function with the injected argument and returns the computed rate.`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Dependency Injection Scenarios"
          description="Test your architectural decision-making."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You are writing unit tests for an AuthController that depends on StripeService (which charges real credit cards). How can you test the controller safely without charging real cards?"
            answer="Use a custom provider with 'useValue: mockStripeService' in your test module to replace the real StripeService with a mock object."
          />

          <QuickCheck
            question="Scenario 2: When should you use @Optional() on an injected dependency?"
            answer="When your service can still function without that dependency, such as an optional in-memory cache or metrics analytics logger."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
