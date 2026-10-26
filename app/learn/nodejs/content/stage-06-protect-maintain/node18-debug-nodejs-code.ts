import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node18DebugNodejsCodeContent: StandardLessonContent = {
  slug: "node18-debug-nodejs-code",
  code: "NODE-18",
  title: "Debug Node.js Code",
  subtitle: "Debugging means finding why code behaves incorrectly and fixing the real cause instead of hiding errors.",
  difficulty: "Moderate",
  scenario: {
    question: "An AI-suggested fix removes an error, but the result is still wrong. What should you do?",
    answer: "Check the requirement, reproduce the problem, inspect the changed code, and test the actual output. An error disappearing does not prove the solution is correct.",
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
    title: "Debug Node.js Code",
    bigPicture:
      "Debugging means finding why code behaves incorrectly and fixing the real cause instead of hiding the error.",
    codeSnippet: `function totalPrice(price, quantity) {
  return price + quantity; // Bug: should multiply
}

console.log(totalPrice(100, 3)); // 103, not 300`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Identify expectation",
        desc: "Work out what the function should do: multiply price by quantity.",
      },
      {
        title: "2. Inspect actual line",
        desc: "Check the actual line: it uses `+`, which adds the values.",
      },
      {
        title: "3. Apply the fix",
        desc: "Replace `+` with `*`.",
      },
      {
        title: "4. Verify output",
        desc: "Run the example again and confirm the result is `300`.",
      },
    ],
  },
  part2: {
    title: "Debugging Tools & Reproducing Issues",
    intro:
      "Useful tools include `console.log()`, the Node.js debugger (`node --inspect`), browser-based DevTools when applicable, and clear error messages. Start with the smallest example that shows the problem.",
    rule: {
      title: "Root Cause Rule",
      content:
        "Never silence errors with quick suppressions or unverified AI patches. Always isolate the smallest reproducible case, understand the requirement, and verify the resulting output with tests.",
    },
    cards: [
      {
        number: "01",
        tag: "LOGGING",
        title: "console.log()",
        description:
          "Fast, direct inspection of variable values, execution branches, and intermediate states.",
        color: "cyan",
      },
      {
        number: "02",
        tag: "DEBUGGER",
        title: "node --inspect",
        description:
          "Attaches the V8 debugger for interactive step-by-step breakpoints and call-stack inspection.",
        color: "purple",
      },
      {
        number: "03",
        tag: "MINIMAL CASE",
        title: "Minimal Reproductions",
        description:
          "Strip away unrelated dependencies and focus on the smallest snippet demonstrating the bug.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Verifying AI-Assisted Code",
    intro: "Critical evaluation of AI-generated code fixes and patch suggestions:",
    points: [
      {
        title: "Error Suppression vs Correct Fix",
        content:
          "An AI tool may suggest adding `?.` or wrapping code in an empty try/catch that silences an error without producing the intended business calculation.",
      },
      {
        title: "Verification Against Requirements",
        content:
          "Always test against the expected business requirement (e.g. 100 * 3 = 300), verifying inputs and outputs with concrete test assertions.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Silencing error messages instead of resolving the underlying calculation or logic bug.",
    bad: {
      title: "Silencing Bugs Without Fixing Logic",
      code: `// AI suggestion that only silences undefined error:\nfunction totalPrice(price, quantity) {\n  return (price || 0) + (quantity || 0); // Still adding instead of multiplying!\n}`,
      explanation:
        "The error is gone, but the calculation remains completely incorrect.",
    },
    good: {
      title: "Fixing the True Root Cause",
      code: `function totalPrice(price, quantity) {\n  if (typeof price !== "number" || typeof quantity !== "number") {\n    throw new TypeError("Price and quantity must be numbers");\n  }\n  return price * quantity;\n}`,
      explanation:
        "Validates input types and multiplies correctly according to the actual business requirement.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Step through calculating values and verifying output:",
    starterCode: `function calculateTotal(price, quantity) {\n  // Fixed: Multiply price by quantity\n  return price * quantity;\n}\n\nconst result = calculateTotal(100, 3);\nconsole.log("Calculated Total:", result);\nconsole.log("Matches expectation (300)?", result === 300);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "An AI-suggested fix removes an error, but the result is still wrong. What should you do?",
      options: [
        "Check the requirement, reproduce the problem, inspect the changed code, and test the actual output. An error disappearing does not prove the solution is correct.",
        "Commit the code immediately because there are no runtime error logs.",
        "Restart Node.js until the calculation changes.",
        "Change the return type to a string.",
      ],
      correctIndex: 0,
      explanation:
        "An error disappearing does not guarantee the logic is correct. Always verify the output against the actual requirement.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Find Root Causes",
        desc: "Debugging means finding why code behaves incorrectly rather than hiding the error.",
      },
      {
        title: "Debugging Tools",
        desc: "Use console.log(), 'node --inspect', DevTools, and minimal reproductions.",
      },
      {
        title: "Verify Solutions",
        desc: "Confirm actual outputs against requirements; an error disappearing does not prove correctness.",
      },
    ],
  },
};
