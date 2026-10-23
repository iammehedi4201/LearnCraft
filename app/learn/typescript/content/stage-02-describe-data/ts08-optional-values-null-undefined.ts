import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts08OptionalValuesNullUndefinedContent: StandardLessonContent = {
  slug: "ts08-optional-values-null-undefined",
  code: "TS-08",
  title: "Optional Values, null, and undefined",
  subtitle: "Make missing data visible and prevent null-pointer crashes.",
  difficulty: "Moderate",
  scenario: {
    question: "A user profile may not have a saved nickname. What should the code check before calling a string method on that nickname?",
    answer: "Check that the nickname exists before using a string method. For example, use `if (nickname !== undefined)` before calling `nickname.toUpperCase()`. If it can also be `null`, check for that too.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Optional Values, null, and undefined",
    bigPicture: "Sometimes a value may be missing. An optional field can be absent, and a value may also be `null` or `undefined`, depending on how the code is designed.",
    codeSnippet: "function getDisplayName(name: string | undefined): string {\n  if (name === undefined) {\n    return \"Guest\";\n  }\n\n  return name.toUpperCase();\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "undefined",
            "desc": "A variable has been declared but has not been assigned a value (or is optional)."
      },
      {
            "title": "null",
            "desc": "An intentional representation of 'no value' or an empty reference."
      },
      {
            "title": "strictNullChecks",
            "desc": "TypeScript compiler mode that prevents treating null/undefined as valid strings or numbers."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Why Track Missing Values?",
      "content": "It makes missing data visible instead of letting the code assume a value always exists. With strictNullChecks enabled, TypeScript helps you handle possible null and undefined values."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "undefined",
        description: "A variable has been declared but has not been assigned a value (or is optional).",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "null",
        description: "An intentional representation of 'no value' or an empty reference.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "strictNullChecks",
        description: "TypeScript compiler mode that prevents treating null/undefined as valid strings or numbers.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Missing vs. Empty",
                "content": "`undefined` usually means a value was never provided; `null` usually means a field was intentionally set to empty."
          },
          {
                "title": "2. Optional properties",
                "content": "Writing `email?: string` means the email can be text, or it can be left off the object completely."
          },
          {
                "title": "3. Check before using",
                "content": "TypeScript reminds you to check if a value exists before you try to call methods on it, preventing crashes."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Calling Methods Without Checking for Undefined",
      "code": "function getDisplayName(name: string | undefined): string {\n  // Error: Object is possibly 'undefined'\n  return name.toUpperCase();\n}",
      "explanation": "If name is undefined, calling .toUpperCase() will crash at runtime. TypeScript stops you at compile time."
},
    good: {
      "title": "Guarding Before Method Calls",
      "code": "function getDisplayName(name: string | undefined): string {\n  if (name === undefined) {\n    return \"Guest\";\n  }\n  return name.toUpperCase(); // Safe: TypeScript knows name is string here!\n}",
      "explanation": "The if-guard safely handles the missing case, allowing TypeScript to narrow name to string in the remainder."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 8: Optional Values, null, and undefined\nfunction getDisplayName(name: string | undefined): string {\n  if (name === undefined) {\n    return \"Guest\";\n  }\n  return name.toUpperCase();\n}\n\nconsole.log(getDisplayName(\"Rina\"));\nconsole.log(getDisplayName(undefined));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Under strictNullChecks, what happens if you try to pass `undefined` to a parameter typed as `name: string`?",
      "options": [
            "TypeScript flags a type error because undefined is not assignable to string",
            "TypeScript silently casts undefined to an empty string ''",
            "The code compiles and crashes only when executed in Node.js",
            "TypeScript converts the parameter to an optional property automatically"
      ],
      "correctIndex": 0,
      "explanation": "Under strictNullChecks, undefined and null are distinct types. You must explicitly type `string | undefined` if a value can be missing."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Explicit Absence",
            "desc": "Model missing data explicitly with undefined or null in your types."
      },
      {
            "title": "Guard Checks",
            "desc": "Check if a value exists before calling methods on it."
      },
      {
            "title": "strictNullChecks",
            "desc": "Compiler checks prevent runtime 'Cannot read properties of undefined' crashes."
      }
],
  },
};
