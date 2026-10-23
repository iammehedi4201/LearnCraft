import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts03BasicTypesArraysContent: StandardLessonContent = {
  slug: "ts03-basic-types-arrays",
  code: "TS-03",
  title: "Basic Types and Arrays",
  subtitle: "Use primitive types (string, number, boolean) and typed collection arrays.",
  difficulty: "Easy",
  scenario: {
    question: "A list should contain only a user's favorite book titles. Which type would fit the list, and why?",
    answer: "Use `string[]`, because every book title is text. For example, `const books: string[] = [\"Dune\", \"Matilda\"]`.",
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
    title: "Basic Types and Arrays",
    bigPicture: "The types you will see most often are `string` for text, `number` for numbers, and `boolean` for `true` or `false`. An array type describes what kind of items a list contains.",
    codeSnippet: "let productName: string = \"Keyboard\";\nlet price: number = 1200;\nlet isAvailable: boolean = true;\nlet scores: number[] = [85, 90, 78];",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "string",
            "desc": "Represents textual data enclosed in quotes."
      },
      {
            "title": "number & boolean",
            "desc": "Represents integers/floats and boolean true/false values."
      },
      {
            "title": "T[] Arrays",
            "desc": "An array type like string[] or number[] restricts the list to items of type T."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Array Typing Principle",
      "content": "`number[]` means the array should contain numbers. `string[]` means every item in the list must be text."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "string",
        description: "Represents textual data enclosed in quotes.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "number & boolean",
        description: "Represents integers/floats and boolean true/false values.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "T[] Arrays",
        description: "An array type like string[] or number[] restricts the list to items of type T.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. The everyday basic types",
                "content": "You will mostly use `string` for text, `number` for numbers, and `boolean` for `true` or `false` flags."
          },
          {
                "title": "2. Arrays hold one kind of item",
                "content": "Writing `number[]` means a list of numbers, while `string[]` means a list of text values."
          },
          {
                "title": "3. Prevents mixed-up lists",
                "content": "If a list is typed as `string[]`, TypeScript prevents accidentally adding a number or an object into it."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Mixing Invalid Items into Typed Arrays",
      "code": "let scores: number[] = [85, 90, 78];\n// Error: Argument of type 'string' is not assignable to parameter of type 'number'\nscores.push(\"perfect\");",
      "explanation": "A number[] array will reject string items, preserving homogeneous collection safety."
},
    good: {
      "title": "Adding Compatible Items",
      "code": "let scores: number[] = [85, 90, 78];\nscores.push(95); // Valid: 95 is a number\nconsole.log(\"Updated scores:\", scores);",
      "explanation": "Keeping all elements of the declared type ensures array math and utilities work predictably."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 3: Basic Types and Arrays\nlet productName: string = \"Keyboard\";\nlet price: number = 1200;\nlet isAvailable: boolean = true;\nlet scores: number[] = [85, 90, 78];\n\nscores.push(95);\nconsole.log(`Product: ${productName}, Price: ${price}, Scores: ${scores.join(\", \")}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which type annotation correctly describes an array that only contains numbers?",
      "options": [
            "number[]",
            "[number]",
            "numbers",
            "Array:number"
      ],
      "correctIndex": 0,
      "explanation": "In TypeScript, `number[]` (or `Array<number>`) denotes an array containing elements of type number."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Basic Primitives",
            "desc": "Use string for text, number for numeric values, and boolean for true/false."
      },
      {
            "title": "Typed Arrays",
            "desc": "Use T[] (e.g. string[], number[]) to describe lists of a specific type."
      },
      {
            "title": "Collection Safety",
            "desc": "TypeScript prevents adding invalid types into typed arrays."
      }
],
  },
};
