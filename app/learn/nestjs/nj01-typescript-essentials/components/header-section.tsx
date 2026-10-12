"use client";

import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  AnalogyBox,
  StepList,
  SummaryBox,
  Divider,
  ComparisonTable,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 1 — UNDERSTANDING TYPESCRIPT
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="Understanding TypeScript">
      {/* ── 1.1 What is TypeScript? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is TypeScript?"
          description="TypeScript is JavaScript with a built-in safety net. It adds type labels to your code so mistakes are caught instantly as you type, long before your server ever runs."
          color="primary"
        />

        <AnalogyBox emoji="📝" title="Think about it like this">
          Imagine writing an important essay in a plain text editor with no spell-check. If you misspell words or swap paragraphs, you won&apos;t know until someone reads your final printed copy.
          <p className="mt-2">
            <strong>TypeScript is your intelligent spell-checker and blueprint validator for code.</strong> The moment you try to do math on a word or send an incomplete object to a database, TypeScript highlights it in red with a clear explanation of what is wrong.
          </p>
        </AnalogyBox>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💡</span> Why was TypeScript invented?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            In standard JavaScript, variables can hold anything and change anytime. While this feels flexible for small scripts, it causes catastrophic bugs in backend applications (like reading <code className="text-ds-feature-base">user.email.toLowerCase()</code> when <code className="text-ds-feature-base">user.email</code> is undefined). TypeScript guarantees that if you say a property exists, it really exists.
          </p>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Your First TypeScript Program</SectionHeading>
          <p className="text-sm text-ds-text-sub mb-3">
            Run the code below. Try changing <code className="text-ds-feature-base">studentAge</code> to text like <code className="text-ds-feature-base">&quot;twenty five&quot;</code> to see how TypeScript prevents bugs before runtime:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: Explicitly label variables with their types
let studentName: string = "Mehedi";
let studentAge: number = 24;
let isEnrolled: boolean = true;

// Step 2: Write a typed function
function createWelcomeBadge(name: string, age: number, active: boolean): string {
  const status = active ? "Active Student" : "Guest";
  return \`🎓 [Badge] \${name} | Age: \${age} | Status: \${status}\`;
}

// Step 3: Call the function safely
const badge = createWelcomeBadge(studentName, studentAge, isEnrolled);
console.log(badge);`}
            height="260px"
          />
        </div>

        <SummaryBox>
          TypeScript = <strong>JavaScript + Type System</strong>. It runs at development time to catch errors before deployment, then compiles down to 100% standard JavaScript that Node.js executes.
        </SummaryBox>
      </div>

      <Divider />

      {/* ── 1.2 The TypeScript Compilation Model ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How TypeScript Works Behind the Scenes"
          description="Node.js and web browsers cannot run TypeScript directly. TypeScript code must be compiled (transpiled) into plain JavaScript."
          color="sky"
        />

        <StepList
          steps={[
            {
              label: "Write TypeScript (.ts) files",
              note: "You write clean code with type annotations, interfaces, and decorators.",
              code: "const port: number = 3000;",
            },
            {
              label: "TypeScript Compiler (tsc) validates your code",
              note: "tsc scans all files. If there is a single type error, it reports it immediately.",
            },
            {
              label: "Types are stripped away (Type Erasure)",
              note: "Types only exist during development. They leave zero performance overhead in production.",
              code: "const port = 3000; // Output plain JS",
            },
            {
              label: "Node.js runs standard JavaScript (.js)",
              note: "The generated JS runs on Node.js / V8 with maximum speed.",
            },
          ]}
        />

        <ComparisonTable
          headers={["Phase", "JavaScript", "TypeScript"]}
          rows={[
            ["Error Detection", "At runtime (users experience crashes)", "At compile-time (caught while coding)"],
            ["Refactoring Safety", "Risky — renaming a field can break hidden files", "Safe — compiler updates every reference automatically"],
            ["IDE Autocomplete", "Limited guesses", "Rich, instantaneous IntelliSense & auto-import"],
            ["Self-Documentation", "Requires comments that easily get outdated", "Types act as always-accurate living documentation"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 1.3 Why NestJS is Built 100% on TypeScript ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Why NestJS Needs TypeScript"
          description="NestJS is not just compatible with TypeScript — it is fundamentally architected around TypeScript's advanced capabilities."
          color="purple"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🦁</span>
              <h5 className="font-bold text-sm text-ds-text-strong">1. Dependency Injection (DI)</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              NestJS reads parameter types in class constructors (e.g. <code className="text-ds-feature-base">constructor(private usersService: UsersService)</code>) using TypeScript reflection metadata to automatically instantiate and inject services!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏷️</span>
              <h5 className="font-bold text-sm text-ds-text-strong">2. Decorators & Metadata</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              Decorators like <code className="text-ds-feature-base">@Controller()</code>, <code className="text-ds-feature-base">@Get()</code>, and <code className="text-ds-feature-base">@Body()</code> rely on TypeScript metadata reflection to route requests seamlessly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🛡️</span>
              <h5 className="font-bold text-sm text-ds-text-strong">3. DTO Validation Pipelines</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              Data Transfer Objects (DTOs) use TypeScript classes and decorators to validate incoming HTTP payloads automatically before your route handler is executed.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📖</span>
              <h5 className="font-bold text-sm text-ds-text-strong">4. Automated OpenAPI / Swagger</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              NestJS reads your TypeScript types and DTO definitions to generate interactive Swagger API documentation with zero extra manual writing.
            </p>
          </div>
        </div>

        <InfoCallout emoji="🎯" title="The Golden Rule">
          <p>
            Mastering TypeScript is the single highest-leverage investment you can make for NestJS. Every controller, service, pipe, guard, and filter you write will use the exact TypeScript concepts taught in this module.
          </p>
        </InfoCallout>

        <QuickCheck
          question="Does TypeScript code run directly inside Node.js in production?"
          answer="No. TypeScript code is compiled (transpiled) by the TypeScript compiler (tsc) into standard JavaScript. The types are erased during compilation, leaving fast, plain JavaScript that Node.js executes."
        />
      </div>
    </SectionContainer>
  );
}
