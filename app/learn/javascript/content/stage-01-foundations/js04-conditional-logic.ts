import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js04ConditionalLogicContent: StandardLessonContent = {
  slug: "js04-conditional-logic",
  code: "JS-04",
  title: "Making Decisions with if and else",
  subtitle: "Control program flow with if/else statements, flatten nested logic using guard clauses, and write concise ternary expressions.",
  sections: [
    {
      id: "part1",
      label: "Branching Logic",
      icon: "🔀",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Conditionals Syntax",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Guard Clauses",
      icon: "🛡️",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "Deep Nesting Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Conditionals Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Controlling Execution with Conditions",
    bigPicture: "Conditional statements allow your program to make decisions and execute different blocks of code based on whether a condition is true or false.",
    analogy: "Like a traffic signal: if the light is green you proceed, else you stop.",
    diagram: "        [ Condition: balance >= 50 ]\n               /             \\\n       True   /               \\  False\n             v                 v\n    \"Purchase Approved\"    \"Insufficient Funds\"",
    breakdownTitle: "Decision Tools",
    breakdownItems: [
      {
        title: "if / else",
        desc: "Executes a block of code when a condition is true, and an optional else block when false."
      },
      {
        title: "Guard Clauses",
        desc: "Return early from a function when invalid conditions are met, eliminating nested if blocks."
      },
      {
        title: "Ternary Operator (? :)",
        desc: "A compact single-line expression to choose between two values based on a condition."
      }
    ]
  },
  part2: {
    title: "Core Conditional Structures",
    intro: "Use if/else for blocks of code and ternary expressions for assigning values.",
    cards: [
      {
        number: "01",
        tag: "Standard",
        title: "if / else Statement",
        description: "Executes code blocks based on a boolean condition.",
        codeSnippet: "const score = 85;\nif (score >= 60) {\n  console.log(\"Passed\"); // Output: Passed\n} else {\n  console.log(\"Needs retake\");\n}",
        color: "emerald"
      },
      {
        number: "02",
        tag: "One-liner",
        title: "Ternary Operator (? :)",
        description: "Evaluates condition ? valueIfTrue : valueIfFalse.",
        codeSnippet: "const isMember = true;\nconst discount = isMember ? 0.2 : 0.0;\nconsole.log(discount); // Output: 0.2",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Multiple Cases",
        title: "else if Ladder",
        description: "Tests multiple sequential conditions in order.",
        codeSnippet: "const status = \"pending\";\nif (status === \"active\") {\n  console.log(\"Online\");\n} else if (status === \"pending\") {\n  console.log(\"Awaiting approval\"); // Output: Awaiting approval\n} else {\n  console.log(\"Offline\");\n}",
        color: "purple"
      }
    ],
    rule: {
      title: "Clarity Rule",
      content: "Use standard if/else for actions and statements. Use the ternary operator only for simple value assignments."
    }
  },
  part3: {
    title: "Writing Clean Guard Clauses",
    intro: "Guard clauses check failure conditions first and return immediately, keeping code flat and readable.",
    points: [
      {
        title: "1. Check Invalid Conditions First",
        content: "Validate required arguments at the very top of the function and exit immediately if invalid.",
        codeSnippet: "function processPayment(amount) {\n  if (amount <= 0) return \"Invalid amount\";\n  return \"Charging: $\" + amount;\n}\nconsole.log(processPayment(-5)); // Output: Invalid amount"
      },
      {
        title: "2. Eliminate Else After Return",
        content: "If an if block returns, you do not need an else block below it because execution has already stopped.",
        codeSnippet: "function checkStock(count) {\n  if (count === 0) return \"Out of stock\";\n  return \"In stock: \" + count;\n}\nconsole.log(checkStock(5)); // Output: In stock: 5"
      },
      {
        title: "3. Avoid Deep Nesting",
        content: "Flattening nested ifs with guard clauses makes code easy to read from top to bottom.",
        codeSnippet: "function register(email, password) {\n  if (!email) return \"Email required\";\n  if (!password) return \"Password required\";\n  return \"Account created for \" + email;\n}\nconsole.log(register(\"user@test.com\", \"secret\")); // Output: Account created for user@test.com"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Deeply Nested if / else (Pyramid of Doom)",
    bad: {
      title: "❌ Nested if Statements",
      code: "function canBorrow(user) {\n  if (user) {\n    if (user.isActive) {\n      if (user.books < 3) {\n        return true;\n      } else {\n        return false;\n      }\n    } else {\n      return false;\n    }\n  } else {\n    return false;\n  }\n}",
      explanation: "Deeply nested conditions create cognitive overload and make bugs difficult to spot."
    },
    good: {
      title: "✅ Flattened with Early Returns (Guard Clauses)",
      code: "function canBorrow(user) {\n  if (!user) return false;\n  if (!user.isActive) return false;\n  if (user.books >= 3) return false;\n  return true;\n}\nconsole.log(canBorrow({ isActive: true, books: 1 })); // Output: true",
      explanation: "Guard clauses exit early on failure conditions, keeping the happy path flat and easy to follow."
    }
  },
  part5: {
    title: "Conditionals Sandbox",
    intro: "Test conditional logic, guard clauses, and ternary operators.",
    starterCode: "function evaluateApplication(score, hasExperience) {\n  // 1. Guard clause:\n  if (score < 50) return \"Rejected: score too low\";\n\n  // 2. Ternary operator:\n  const level = hasExperience ? \"Senior\" : \"Junior\";\n\n  // 3. Main decision:\n  return \"Accepted as \" + level;\n}\n\nconsole.log(evaluateApplication(40, true));\nconsole.log(evaluateApplication(85, true));\nconsole.log(evaluateApplication(90, false));\n"
  },
  part6: {
    title: "Key Takeaways: Conditionals",
    takeaways: [
      {
        title: "Use if/else for Logic",
        desc: "Branches execution based on boolean condition evaluations."
      },
      {
        title: "Guard Clauses Flatten Code",
        desc: "Return early on invalid inputs to eliminate deeply nested pyramid structures."
      },
      {
        title: "Ternary for Simple Values",
        desc: "Use condition ? a : b only for single-line assignments, not complex logic."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary benefit of using guard clauses in a function?",
      options: [
        "They make the JavaScript engine execute math faster",
        "They return early on edge cases, flattening nested if/else blocks for better readability",
        "They automatically convert loose equality to strict equality",
        "They prevent variables from being reassigned"
      ],
      correctIndex: 1,
      explanation: "Guard clauses check for errors or exit conditions at the top of a function and return early, preventing deeply nested if/else pyramids."
    }
  }
};
