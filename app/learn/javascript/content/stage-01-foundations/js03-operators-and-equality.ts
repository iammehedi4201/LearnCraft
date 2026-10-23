import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js03OperatorsAndEqualityContent: StandardLessonContent = {
  slug: "js03-operators-and-equality",
  code: "JS-03",
  title: "Comparing Values with == and ===",
  subtitle: "Understand why strict equality (===) is mandatory in modern JavaScript and avoid unexpected type conversion bugs.",
  sections: [
    {
      id: "part1",
      label: "Equality & Comparison",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Operators & Logic",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Strict vs Loose Equality",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Assignment vs Comparison",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Comparing Values with == and ===",
    bigPicture: "Always use strict equality (`===`) and inequality (`!==`). They compare both value and data type, preventing hidden type-coercion bugs.",
    breakdownTitle: "Comparison Rules",
    breakdownItems: [
      {
        title: "Always Use Strict Equality (===)",
        desc: "Compares both type and value. If types do not match, it returns false immediately."
      },
      {
        title: "Avoid Loose Equality (==)",
        desc: "Silently converts types behind your back (e.g. 0 == '' is true), causing subtle bugs."
      },
      {
        title: "Strict Inequality (!==)",
        desc: "Returns true if either the value or the type differs."
      }
    ]
  },
  part2: {
    title: "Comparison and Logical Operators",
    intro: "Combine values and test conditions using standard JavaScript operators.",
    cards: [
      {
        number: "01",
        tag: "Strict Compare",
        title: "Strict Equality (=== and !==)",
        description: "Checks whether two items are identical in both type and value.",
        codeSnippet: "console.log(10 === 10);   // Output: true\nconsole.log(10 === \"10\"); // Output: false\nconsole.log(5 !== 10);    // Output: true",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Numeric",
        title: "Relational Operators",
        description: "Compare numeric quantities with greater than and less than.",
        codeSnippet: "const score = 85;\nconsole.log(score >= 80); // Output: true\nconsole.log(score < 50);  // Output: false",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Logic",
        title: "Logical Operators (&&, ||, !)",
        description: "&& requires both sides to be true. || requires at least one side. ! reverses truth.",
        codeSnippet: "const loggedIn = true;\nconst hasAccess = true;\nconsole.log(loggedIn && hasAccess); // Output: true\nconsole.log(!loggedIn);             // Output: false",
        color: "purple"
      }
    ],
    rule: {
      title: "The Golden Rule of Comparison",
      content: "Never use == or != in modern JavaScript. Always use === and !== for 100% predictable results."
    }
  },
  part3: {
    title: "Why Strict Equality (===) Prevents Bugs",
    intro: "See why automatic type coercion produces surprising results.",
    points: [
      {
        title: "1. String and Number Comparison",
        content: "When using ==, JavaScript converts strings to numbers behind the scenes. This makes \"0\" equal 0, even though one is text and the other is a number.",
        codeSnippet: "console.log(\"0\" == 0);  // Output: true (loose coercion!)\nconsole.log(\"0\" === 0); // Output: false (strict safe check!)"
      },
      {
        title: "2. Boolean Conversions with ==",
        content: "Loose equality converts true to 1 and false to 0, which leads to unexpected true comparisons.",
        codeSnippet: "console.log(false == 0);  // Output: true\nconsole.log(false === 0); // Output: false"
      },
      {
        title: "3. Predictable Code with ===",
        content: "Strict equality stops all automatic guessing. If the types differ, it returns false immediately.",
        codeSnippet: "const input = \"100\";\nconst target = 100;\nconsole.log(input === target); // Output: false (Different types!)"
      }
    ]
  },
  part4: {
    title: "Common Trap: Using = Instead of ===",
    bad: {
      title: "❌ Using = (Assignment) to Compare",
      code: "let role = \"guest\";\nif (role = \"admin\") {\n  // Bug: role is REASSIGNED to \"admin\", which is truthy!\n  console.log(\"Access granted\");\n}\n// Output: Access granted (CRITICAL SECURITY BUG!)",
      explanation: "A single equal sign (=) assigns a value rather than comparing it. This overwrites role with 'admin' and evaluates to true!"
    },
    good: {
      title: "✅ Use === to Compare Values",
      code: "let role = \"guest\";\nif (role === \"admin\") {\n  console.log(\"Access granted\");\n} else {\n  console.log(\"Access denied\");\n}\n// Output: Access denied (Correct!)",
      explanation: "Triple equals (===) compares without changing the variable."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test strict comparisons and logical conditions in the sandbox below.",
    starterCode: "const currentScore = 90;\nconst passingScore = 70;\n\n// 1. Strict equality check:\nconsole.log(\"Is perfect score:\", currentScore === 100);\n\n// 2. Relational comparison:\nconsole.log(\"Did student pass:\", currentScore >= passingScore);\n\n// 3. Combining conditions with && (AND):\nconst isHonors = currentScore >= 85 && currentScore <= 100;\nconsole.log(\"Earned honors:\", isHonors);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Always Use ===",
        desc: "Use strict equality (===) and strict inequality (!==) to check both type and value."
      },
      {
        title: "Single = is Assignment",
        desc: "Remember: = sets a variable, while === checks if two values are equal."
      },
      {
        title: "Combine with && and ||",
        desc: "Use && when all conditions must pass, and || when any condition can pass."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does the expression 5 === \"5\" evaluate to in JavaScript, and why?",
      options: [
        "false, because === checks both the value and the type (number vs string)",
        "true, because JavaScript converts the string into a number automatically",
        "undefined, because numbers and strings cannot be compared",
        "true, because both represent the digit 5"
      ],
      correctIndex: 0,
      explanation: "Strict equality (===) never performs automatic type conversion. Because 5 is a number and \"5\" is a string, their types differ and the result is false."
    }
  }
};
