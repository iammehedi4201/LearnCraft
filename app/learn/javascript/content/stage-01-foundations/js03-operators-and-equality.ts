import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js03OperatorsAndEqualityContent: StandardLessonContent = {
  slug: "js03-operators-and-equality",
  code: "JS-03",
  title: "Comparing Values with == and ===",
  subtitle: "Understand why automatic type coercion causes critical bugs, how JavaScript converts values behind the scenes, and why strict equality (===) is mandatory.",
  sections: [
    {
      id: "part1",
      label: "Strict vs Loose Equality",
      icon: "⚖️",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Coercion Mechanics",
      icon: "🔄",
      tag: "MECHANICS"
    },
    {
      id: "part3",
      label: "Coercion Traps Traced",
      icon: "🧠",
      tag: "STEP BY STEP"
    },
    {
      id: "part4",
      label: "Falsy Auth Bug",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Equality Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
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
    title: "Why Loose Equality (==) Is Dangerous",
    bigPicture: "JavaScript provides two equality operators: strict equality (===) and loose equality (==). Loose equality attempts to convert both operands to the same type before comparing, causing unpredictable bugs.",
    analogy: "Strict equality (===) checks both identity and passport stamp. Loose equality (==) tries to guess who you are by transforming your clothes, frequently letting unauthorized data pass through.",
    diagram: "+---------------------------------------------------+\n|  STRICT (===): Check Type First                   |\n|  42 === \"42\"  --> Types differ (number vs string) |\n|                   --> Immediately returns FALSE   |\n+---------------------------------------------------+\n|  LOOSE (==): Implicit Coercion Algorithm          |\n|  42 == \"42\"   --> Converts string \"42\" to number  |\n|                   --> 42 == 42 --> Returns TRUE   |\n+---------------------------------------------------+",
    breakdownTitle: "Comparison Rules",
    breakdownItems: [
      {
        title: "Strict Equality (===)",
        desc: "Compares type and value. If the types do not match, it instantly returns false without converting anything."
      },
      {
        title: "Loose Equality (==)",
        desc: "Executes the Abstract Equality Comparison Algorithm, automatically converting types (string to number, boolean to number)."
      },
      {
        title: "Strict Inequality (!==)",
        desc: "Always pair with ===. Checks that either the value or the type is different."
      }
    ]
  },
  part2: {
    title: "How Implicit Coercion Works",
    intro: "Learn how the JavaScript engine converts values when using loose equality.",
    cards: [
      {
        number: "01",
        tag: "To Number",
        title: "String to Number Conversion",
        description: "When comparing a number and a string with ==, the engine coerces the string into a number.",
        codeSnippet: "console.log(100 === \"100\"); // Output: false (Strict: type safe)\nconsole.log(100 == \"100\");  // Output: true  (Loose: coerces \"100\" -> 100)",
        color: "rose"
      },
      {
        number: "02",
        tag: "Booleans",
        title: "Boolean to Number Conversion",
        description: "In loose comparison, true is converted to 1 and false is converted to 0.",
        codeSnippet: "console.log(true == 1);     // Output: true (true -> 1)\nconsole.log(false == 0);    // Output: true (false -> 0)\nconsole.log(false === 0);   // Output: false (boolean !== number)",
        color: "amber"
      },
      {
        number: "03",
        tag: "null / undefined",
        title: "null & undefined Special Case",
        description: "null loosely equals undefined and nothing else in JavaScript (neither equals 0 or false).",
        codeSnippet: "console.log(null == undefined); // Output: true\nconsole.log(null === undefined); // Output: false\nconsole.log(null == 0);         // Output: false",
        color: "purple"
      }
    ],
    rule: {
      title: "Production Rule",
      content: "Always use strict equality (===) and strict inequality (!==). Never use loose equality (==) in modern production code."
    }
  },
  part3: {
    title: "Step-by-Step Coercion Traps",
    intro: "Trace how the engine calculates seemingly impossible loose equality results.",
    points: [
      {
        title: "Trap 1: Why 0 == \"\" is true",
        content: "The engine sees a number and a string. It converts the empty string \"\" into a number using Number(\"\"), which evaluates to 0. Then 0 == 0 evaluates to true.",
        codeSnippet: "console.log(0 == \"\");   // Output: true\nconsole.log(0 === \"\");  // Output: false (number !== string)"
      },
      {
        title: "Trap 2: Why false == \"0\" is true",
        content: "Step 1: The boolean false is converted to number 0. Step 2: The comparison is now 0 == \"0\". Step 3: The string \"0\" is converted to number 0. Step 4: 0 == 0 is true.",
        codeSnippet: "console.log(false == \"0\");  // Output: true\nconsole.log(false === \"0\"); // Output: false"
      },
      {
        title: "Trap 3: Transitivity Breakdown",
        content: "In normal logic, if A == B and B == C, then A == C. In JavaScript loose equality, this breaks: \"0\" == 0 is true, and 0 == \"\" is true, but \"0\" == \"\" is false!",
        codeSnippet: "console.log(\"0\" == 0);  // true\nconsole.log(0 == \"\");   // true\nconsole.log(\"0\" == \"\");  // Output: false (strings compared directly!)"
      }
    ]
  },
  part4: {
    title: "Real-World Bug: Loose Equality Security Hole",
    bad: {
      title: "❌ Loose Equality Allows Bypassing Checks",
      code: "function verifyCoupon(inputCode) {\n  // Bug: Loose equality matches unexpected inputs\n  const secretPromo = 0;\n  if (inputCode == secretPromo) {\n    return \"50% Discount Applied!\";\n  }\n  return \"Invalid Coupon\";\n}\n\n// User passes empty string \"\" or false:\nconsole.log(verifyCoupon(\"\")); // Output: \"50% Discount Applied!\" (BUG!)",
      explanation: "Because \"\" == 0 evaluates to true under loose equality, users accidentally receive unauthorized promotional discounts."
    },
    good: {
      title: "✅ Strict Equality Enforces Exact Value & Type",
      code: "function verifyCoupon(inputCode) {\n  // Safe: Requires exact type and exact value\n  const secretPromo = 0;\n  if (inputCode === secretPromo) {\n    return \"50% Discount Applied!\";\n  }\n  return \"Invalid Coupon\";\n}\n\nconsole.log(verifyCoupon(\"\")); // Output: \"Invalid Coupon\"\nconsole.log(verifyCoupon(0));  // Output: \"50% Discount Applied!\"",
      explanation: "Strict equality rejects empty string \"\" immediately because string does not match number, preventing security vulnerabilities."
    }
  },
  part5: {
    title: "Equality & Coercion Sandbox",
    intro: "Test different comparisons between numbers, strings, and booleans with === vs ==.",
    starterCode: "// 1. Compare number vs string:\nconsole.log(\"Strict 42 === '42':\", 42 === \"42\");\nconsole.log(\"Loose 42 == '42':\", 42 == \"42\");\n\n// 2. Coercion surprises:\nconsole.log(\"0 == '':\", 0 == \"\");\nconsole.log(\"false == '0':\", false == \"0\");\nconsole.log(\"null == undefined:\", null == undefined);\n\n// 3. Recommended strict practice:\nconst userRole = \"admin\";\nconsole.log(\"Is Admin:\", userRole === \"admin\");\n"
  },
  part6: {
    title: "Key Takeaways: Equality & Coercion",
    takeaways: [
      {
        title: "Strict Equality Always",
        desc: "=== checks value and type without converting, preventing subtle bugs."
      },
      {
        title: "Coercion Is Unpredictable",
        desc: "Loose equality (==) coerces types, causing 0 == \"\" and false == \"0\" to be true."
      },
      {
        title: "Security & Bug Prevention",
        desc: "Using === protects against unintended truthy/falsy matches in form inputs and API payloads."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does `false == \"0\"` evaluate to true in JavaScript?",
      options: [
        "Because JavaScript treats all strings as booleans first",
        "Because both false and \"0\" are coerced to the number 0 before comparison",
        "Because \"0\" is an empty string in memory",
        "Because loose equality ignores all punctuation marks"
      ],
      correctIndex: 1,
      explanation: "Under the loose equality algorithm, false is coerced to the number 0, and the string \"0\" is also coerced to the number 0. Since 0 equals 0, the result is true."
    }
  }
};
