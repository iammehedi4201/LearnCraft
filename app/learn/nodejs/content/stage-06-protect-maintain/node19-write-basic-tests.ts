import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node19WriteBasicTestsContent: StandardLessonContent = {
  slug: "node19-write-basic-tests",
  code: "NODE-19",
  title: "Write Basic Tests",
  subtitle: "Node.js includes a built-in test runner to verify expected behavior and catch regressions without external packages.",
  difficulty: "Moderate",
  scenario: {
    question: "You change a function and worry that you may have broken another feature. What can help?",
    answer: "Run tests that cover the function and the related behavior. Add a test for the bug if the problem could happen again.",
  },
  interviewQuestion: {
    question: "Why are tests useful?",
    answer: "Tests check expected behavior and help developers catch regressions when they change code.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Write Basic Tests",
    bigPicture:
      "A test checks that code behaves as expected. Node.js includes a built-in test runner, so basic tests do not require an additional testing package.",
    codeSnippet: `// 1. In math.js:
export function add(a, b) {
  return a + b;
}

// 2. In math.test.js:
import test from "node:test";
import assert from "node:assert/strict";
import { add } from "./math.js";

test("add returns the sum", () => {
  assert.equal(add(2, 3), 5);
});

// 3. Run the test in your terminal:
// node --test`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Define test case",
        desc: "`test()` defines a test case.",
      },
      {
        title: "2. Execute function",
        desc: "`add(2, 3)` calls the function.",
      },
      {
        title: "3. Assert outcome",
        desc: "`assert.equal()` checks that the result is `5`.",
      },
      {
        title: "4. Test runner report",
        desc: "The test runner (`node --test`) reports whether the test passed.",
      },
    ],
  },
  part2: {
    title: "Built-In Testing & Regression Safety",
    intro:
      "Tests help protect code when you change it. Start with important behavior and likely mistakes; you do not need to write a test for every trivial line.",
    rule: {
      title: "Regression Protection Rule",
      content:
        "Whenever fixing a bug or refactoring critical logic, write or run a test covering the requirement. Automated tests give developers confidence that existing features continue working.",
    },
    cards: [
      {
        number: "01",
        tag: "BUILT-IN",
        title: "node:test",
        description:
          "Official built-in testing framework included with Node.js without needing Jest or Mocha.",
        color: "cyan",
      },
      {
        number: "02",
        tag: "ASSERTIONS",
        title: "node:assert/strict",
        description:
          "Provides strict equality checks (`assert.equal`, `assert.deepEqual`) that fail loudly on discrepancies.",
        color: "purple",
      },
      {
        number: "03",
        tag: "RUNNER",
        title: "node --test",
        description:
          "Executes test files matching standard patterns (`*.test.js`) and prints TAP or spec outputs.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Why automated regression tests are an indispensable engineering practice:",
    points: [
      {
        title: "Catching Regressions Early",
        content:
          "When refactoring shared utility functions or backend APIs, running your test suite immediately alerts you if another dependent feature broke.",
      },
      {
        title: "Focus on High-Value Tests",
        content:
          "Target critical business paths, validation boundaries, and edge cases rather than writing tests for trivial property getters.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Deploying refactored code without running automated tests, resulting in unexpected production outages.",
    bad: {
      title: "Manual Verification Only",
      code: `// Refactored helper function with subtle bug\nfunction calculateDiscount(user) {\n  return user.isVip ? 0.2 : 0;\n}\n// No tests run before deploying!`,
      explanation:
        "Manual spot-checking fails to catch regressions across all dependent customer tiers.",
    },
    good: {
      title: "Automated Test Coverage",
      code: `import test from "node:test";\nimport assert from "node:assert/strict";\n\ntest("VIP discount calculation", () => {\n  assert.equal(calculateDiscount({ isVip: true }), 0.2);\n  assert.equal(calculateDiscount({ isVip: false }), 0);\n});`,
      explanation:
        "Automated assertions run in milliseconds and verify edge cases before every code push.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate test assertions and report results:",
    starterCode: `function add(a, b) {\n  return a + b;\n}\n\n// Simulating assert.equal\nfunction testAdd() {\n  const result = add(2, 3);\n  const expected = 5;\n  if (result === expected) {\n    console.log("✔ Test passed: add(2, 3) === 5");\n  } else {\n    console.error(\`✖ Test failed: expected \${expected}, got \${result}\`);\n  }\n}\n\ntestAdd();`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You change a function and worry that you may have broken another feature. What can help?",
      options: [
        "Run tests that cover the function and the related behavior. Add a test for the bug if the problem could happen again.",
        "Change the function name so older features cannot call it.",
        "Commit the code to production and wait for user bug reports.",
        "Remove all comments from the codebase.",
      ],
      correctIndex: 0,
      explanation:
        "Run tests covering the function and dependent behaviors. Adding regression tests ensures the issue does not reoccur.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Built-In Testing",
        desc: "Node.js includes a built-in test runner ('node:test') and assertion library ('node:assert/strict').",
      },
      {
        title: "node --test",
        desc: "Run tests directly using 'node --test' in your terminal without external packages.",
      },
      {
        title: "Catch Regressions",
        desc: "Tests check expected behavior and help developers catch regressions when changing code.",
      },
    ],
  },
};
