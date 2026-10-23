import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts02TypeAnnotationsInferenceContent: StandardLessonContent = {
  slug: "ts02-type-annotations-inference",
  code: "TS-02",
  title: "Type Annotations and Type Inference",
  subtitle: "Distinguish explicit type annotations from automatic compiler inference.",
  difficulty: "Easy",
  scenario: {
    question: "You write `const total = 100`. Do you need to add `: number`? Explain why or why not.",
    answer: "No. TypeScript can see that `100` is a number, so it works out the type for us. Adding `: number` is possible, but it is not needed here.",
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
    title: "Type Annotations and Type Inference",
    bigPicture: "A type annotation tells TypeScript the type you want. Type inference means TypeScript works out the type from the value you give it.",
    codeSnippet: "let age: number = 25; // annotation\nlet city = \"Dhaka\";   // inferred as string\n\nage = 26;\ncity = \"Sylhet\";\n// city = 10;          // TypeScript error",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Type Annotation",
            "desc": "Explicitly stating a type using the `: type` syntax (e.g. `let age: number = 25`)."
      },
      {
            "title": "Type Inference",
            "desc": "TypeScript automatically deducing the type from the initial value (e.g. `let city = 'Dhaka'` becomes `string`)."
      },
      {
            "title": "Clean Code Balance",
            "desc": "You do not need to annotate every variable; rely on inference for clear, obvious assignments."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "When to Use Annotations vs Inference",
      "content": "Add a type when it makes the code clearer or when TypeScript cannot work out the intended type. Let inference handle obvious cases."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Type Annotation",
        description: "Explicitly stating a type using the `: type` syntax (e.g. `let age: number = 25`).",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Type Inference",
        description: "TypeScript automatically deducing the type from the initial value (e.g. `let city = 'Dhaka'` becomes `string`).",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Clean Code Balance",
        description: "You do not need to annotate every variable; rely on inference for clear, obvious assignments.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Annotations are your instructions",
                "content": "Writing `: string` or `: number` tells TypeScript explicitly what type you expect for that variable."
          },
          {
                "title": "2. Inference is TypeScript working it out",
                "content": "When you write `const city = \"Dhaka\"`, TypeScript already knows it is a string without you needing to write `: string`."
          },
          {
                "title": "3. Keep your code clean",
                "content": "Let TypeScript work out obvious types automatically. Add explicit types when it makes complex code easier to understand."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Violating Inferred Types",
      "code": "let city = \"Dhaka\"; // inferred as string\n// Error: Type 'number' is not assignable to type 'string'\ncity = 10;",
      "explanation": "Even without an explicit annotation, TypeScript infers string and protects city from receiving a number."
},
    good: {
      "title": "Relying on Clean Inference",
      "code": "let city = \"Dhaka\"; // inferred as string\ncity = \"Sylhet\";    // clean and valid\nconsole.log(\"City:\", city);",
      "explanation": "Letting TypeScript infer the type keeps the code concise while retaining full type safety."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 2: Type Annotations and Inference\nlet age: number = 25; // annotation\nlet city = \"Dhaka\";   // inferred as string\n\nage = 26;\ncity = \"Sylhet\";\n\nconsole.log(`Age: ${age}, City: ${city}`);\n\n// Try uncommenting to test inference:\n// city = 10;",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is 'type inference' in TypeScript?",
      "options": [
            "A feature where TypeScript deduces the type automatically from the value provided",
            "A required syntax rule where you must write `: type` on every line",
            "A runtime tool that changes a variable's data type while the program executes",
            "A compiler flag that turns off type checking completely"
      ],
      "correctIndex": 0,
      "explanation": "Type inference means TypeScript works out the type from the value you assign, avoiding redundant manual annotations."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Annotations",
            "desc": "Explicitly declare the type using `: type` when clarity is needed."
      },
      {
            "title": "Inference",
            "desc": "TypeScript works out the type from the assigned value automatically."
      },
      {
            "title": "Best Practice",
            "desc": "Let inference handle obvious cases to keep code concise."
      }
],
  },
};
