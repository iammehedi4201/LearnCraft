import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js03OperatorsAndEqualityContent: StandardLessonContent = {
  "slug": "js03-operators-and-equality",
  "code": "JS-03",
  "title": "Operators & Equality: Strict vs Loose Comparison",
  "subtitle": "Master strict equality (===), avoid automatic type coercion traps, and use logical operators safely.",
  "sections": [
    {
      "id": "part1",
      "label": "Equality Overview",
      "icon": "⚖️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "=== vs ==",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Coercion Traps & AI Code",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Loose Equality Bugs",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Operators Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Comparing Values Safely",
    "bigPicture": "Comparing values is at the heart of all programming decisions. JavaScript provides both strict comparison (`===`) and loose comparison (`==`). Understanding the difference prevents critical bugs.",
    "analogy": "Strict equality (`===`) checks both the ticket number and the seat section. Loose equality (`==`) tries to force different tickets to match, often letting the wrong person in.",
    "diagram": "5 === 5    --> true   (Same value, same type)\n5 === \"5\"  --> false  (Number vs String: rejected!)\n5 == \"5\"   --> true   (Coerced into same type: dangerous!)",
    "breakdownTitle": "Comparison Operators",
    "breakdownItems": [
      {
        "title": "Strict Equality (===)",
        "desc": "Compares both value and data type without any automatic conversion."
      },
      {
        "title": "Strict Inequality (!==)",
        "desc": "Checks that either the value or the data type does not match."
      },
      {
        "title": "Loose Equality (==)",
        "desc": "Converts types behind the scenes before comparing, creating unpredictable results."
      }
    ]
  },
  "part2": {
    "title": "Strict vs Loose Equality",
    "intro": "Compare how strict equality and loose equality evaluate different values.",
    "cards": [
      {
        "number": "01",
        "tag": "Safe",
        "title": "Strict Equality (===)",
        "description": "Returns true only when both operands have identical types and identical values.",
        "codeSnippet": "console.log(42 === 42);   // Output: true\nconsole.log(42 === \"42\"); // Output: false (number !== string)",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Dangerous",
        "title": "Loose Equality (==)",
        "description": "Forces operands into a shared type before comparing, causing confusing bugs.",
        "codeSnippet": "console.log(42 == \"42\");  // Output: true (string coerced to number)\nconsole.log(0 == false);   // Output: true (confusing automatic match!)",
        "color": "rose"
      },
      {
        "number": "03",
        "tag": "Logic",
        "title": "Logical Operators",
        "description": "Combine boolean conditions using AND (`&&`), OR (`||`), and NOT (`!`).",
        "codeSnippet": "const isReady = true;\nconst hasAccess = false;\nconsole.log(isReady && hasAccess); // Output: false\nconsole.log(isReady || hasAccess); // Output: true",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "The Strict Equality Rule",
      "content": "Always use `===` and `!==`. Never use `==` or `!=` in modern JavaScript."
    }
  },
  "part3": {
    "title": "Coercion Traps & AI Code Reading",
    "intro": "Learn to spot hidden type conversion bugs in both human and AI-generated code.",
    "points": [
      {
        "title": "1. The String Plus Number Trap",
        "content": "The `+` operator concatenates if either side is a string. Other operators like `-` and `*` convert to numbers.",
        "codeSnippet": "console.log(\"10\" + 5); // Output: \"105\" (string concatenation!)\nconsole.log(\"10\" - 5); // Output: 5 (subtraction coerces to number)\nconsole.log(\"10\" * 2); // Output: 20 (multiplication coerces to number)"
      },
      {
        "title": "2. Explicit Conversion Over Coercion",
        "content": "Always convert values explicitly with `Number()` or `String()` so intent is crystal clear.",
        "codeSnippet": "const rawPrice = \"50\";\nconst shipping = 10;\n\n// Safe explicit math:\nconst total = Number(rawPrice) + shipping;\nconsole.log(\"Total price:\", total); // Output: Total price: 60"
      },
      {
        "title": "3. Truthy & Falsy Values",
        "content": "JavaScript evaluates values in boolean contexts. `0`, `\"\"`, `null`, `undefined`, and `NaN` are all falsy.",
        "codeSnippet": "console.log(Boolean(0));        // Output: false\nconsole.log(Boolean(\"\"));       // Output: false\nconsole.log(Boolean(\"Alex\"));   // Output: true\nconsole.log(Boolean(100));      // Output: true"
      }
    ]
  },
  "part4": {
    "title": "Loose Equality Trap",
    "bad": {
      "title": "❌ Loose Equality Matching Unexpected Types",
      "code": "const userInput = \"0\";\n// Bug: \"0\" == false is true!\nif (userInput == false) {\n  console.log(\"User denied access!\"); // Runs unexpectedly!\n}",
      "explanation": "Loose equality converts `\"0\"` and `false` to `0`, making them equal. This introduces security and logic flaws."
    },
    "good": {
      "title": "✅ Strict Equality Comparison",
      "code": "const userInput = \"0\";\n// Clean: Checks value AND type\nif (userInput === \"false\") {\n  console.log(\"User denied access!\");\n} else {\n  console.log(\"User input recorded:\", userInput); // Output: User input recorded: 0\n}",
      "explanation": "Strict equality (`===`) checks that both the type and the value match, preventing accidental type coercion."
    }
  },
  "part5": {
    "title": "Interactive Operators Sandbox",
    "intro": "Observe how strict equality and explicit conversion behave in real code.",
    "starterCode": "// 1. Strict equality check:\nconsole.log(\"10 === 10:\", 10 === 10);\nconsole.log(\"10 === '10':\", 10 === \"10\");\n\n// 2. Safe explicit conversion:\nconst quantity = \"5\";\nconst pricePerUnit = 20;\nconst totalCost = Number(quantity) * pricePerUnit;\nconsole.log(\"Total cost:\", totalCost);\n\n// 3. Logical combinations:\nconst isMember = true;\nconst hasCoupon = false;\nconsole.log(\"Discount eligible:\", isMember || hasCoupon);\n"
  },
  "part6": {
    "title": "Key Takeaways: Operators & Equality",
    "takeaways": [
      {
        "title": "Always use ===",
        "desc": "Strict equality prevents unexpected type coercion bugs."
      },
      {
        "title": "Beware of + with Strings",
        "desc": "Adding a number to a string concatenates instead of doing math."
      },
      {
        "title": "Convert Explicitly",
        "desc": "Use Number(value) or String(value) to make your code clear and predictable."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the output of `console.log(\"20\" + 5)` in JavaScript?",
      "options": [
        "25",
        "\"205\"",
        "NaN",
        "TypeError"
      ],
      "correctIndex": 1,
      "explanation": "When either operand of the `+` operator is a string, JavaScript converts the other operand to a string and concatenates them, producing `\"205\"`."
    }
  }
};
