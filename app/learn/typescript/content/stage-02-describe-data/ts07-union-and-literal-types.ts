import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts07UnionAndLiteralTypesContent: StandardLessonContent = {
  slug: "ts07-union-and-literal-types",
  code: "TS-07",
  title: "Union Types and Literal Types",
  subtitle: "Combine allowed types with | and enforce exact literal values.",
  difficulty: "Moderate",
  scenario: {
    question: "An order can be only `\"new\"`, `\"shipped\"`, or `\"delivered\"`. How could you describe those allowed states?",
    answer: "Use a union of literal types: `type OrderStatus = \"new\" | \"shipped\" | \"delivered\"`. TypeScript will warn us if we use a different value, such as `\"cancelled\"`, unless we add it to the type.",
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
    title: "Union Types and Literal Types",
    bigPicture: "A union type lets a value be one of several types. A literal type limits a value to a specific set of choices.",
    codeSnippet: "type UserId = string | number;\ntype Status = \"pending\" | \"success\" | \"failed\";\n\nconst id: UserId = 42;\nlet status: Status = \"pending\";\n// status = \"finished\"; // TypeScript error",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Union Types (`|`)",
            "desc": "Allows a value to be one of multiple types (e.g. `string | number`)."
      },
      {
            "title": "Literal Types",
            "desc": "Restricts a variable to exact values (e.g. `\"pending\" | \"success\"`)."
      },
      {
            "title": "Eliminating Invalid States",
            "desc": "Typos like `\"pedning\"` are rejected immediately at compile time."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Why Use Union & Literal Types?",
      "content": "It makes allowed choices clear and helps prevent unsupported values from entering your code."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Union Types (`|`)",
        description: "Allows a value to be one of multiple types (e.g. `string | number`).",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Literal Types",
        description: "Restricts a variable to exact values (e.g. `\"pending\" | \"success\"`).",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Eliminating Invalid States",
        description: "Typos like `\"pedning\"` are rejected immediately at compile time.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Unions mean 'either this or that'",
                "content": "A union type like `string | number` allows a variable to hold either text or a number."
          },
          {
                "title": "2. Literal types limit choices",
                "content": "Instead of allowing any text, a literal union like `\"light\" | \"dark\"` limits the value to only those exact options."
          },
          {
                "title": "3. Catches typos immediately",
                "content": "If you accidentally type `\"lght\"` instead of `\"light\"`, TypeScript flags the typo before you even run your app."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Using Open-Ended Strings for Specific States",
      "code": "let status: string = \"pending\";\nstatus = \"done\"; // Allowed by plain string, but invalid in business logic!",
      "explanation": "Using generic string allows arbitrary typos that break application state machines."
},
    good: {
      "title": "Enforcing Allowed Values with Literal Unions",
      "code": "type Status = \"pending\" | \"success\" | \"failed\";\nlet status: Status = \"pending\";\n// status = \"done\"; // TypeScript error!\nstatus = \"success\"; // Valid and safe",
      "explanation": "Literal union types ensure only valid states can ever be assigned."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 7: Union Types and Literal Types\ntype UserId = string | number;\ntype Status = \"pending\" | \"success\" | \"failed\";\n\nconst id: UserId = 42;\nlet currentStatus: Status = \"pending\";\n\nconsole.log(`User ${id} status is: ${currentStatus}`);\n\n// Try uncommenting the next line to see TypeScript catch the typo:\n// currentStatus = \"finished\";\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the result of assigning `let mode: 'dark' | 'light' = 'blue';`?",
      "options": [
            "TypeScript raises a compiler error because 'blue' is not part of the literal union",
            "TypeScript automatically converts 'blue' into 'dark'",
            "TypeScript expands the union to include 'blue' at runtime",
            "The code compiles fine but logs a runtime warning in the browser console"
      ],
      "correctIndex": 0,
      "explanation": "A literal union restricts the value to only the specified strings. 'blue' is not part of the union, so TypeScript reports an error."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Union Types",
            "desc": "A union (|) allows a value to be one of several types."
      },
      {
            "title": "Literal Types",
            "desc": "Literal types restrict a value to specific exact choices."
      },
      {
            "title": "State Modeling",
            "desc": "Use literal unions for statuses, modes, and discrete state transitions."
      }
],
  },
};
