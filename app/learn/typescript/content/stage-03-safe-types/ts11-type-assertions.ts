import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts11TypeAssertionsContent: StandardLessonContent = {
  slug: "ts11-type-assertions",
  code: "TS-11",
  title: "Type Assertions",
  subtitle: "Understand when `as Type` informs the compiler and why it is not a runtime check.",
  difficulty: "Moderate",
  scenario: {
    question: "An AI-generated answer adds `as User` to silence a type error. What should you check before accepting that change?",
    answer: "Check what the value really contains and why the original type error happened. `as User` does not change or validate the value. If the data comes from outside the app, check its fields at runtime.",
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
    title: "Type Assertions",
    bigPicture: "A type assertion tells TypeScript to treat a value as a chosen type. It does not change the value or prove that the value really has that type.",
    codeSnippet: "const element = document.querySelector(\"input\") as HTMLInputElement;\n\n// A safer check is:\nconst input = document.querySelector(\"input\");\nif (input) {\n  input.value = \"Hello\";\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "`as Type` Syntax",
            "desc": "Overrides TypeScript's inferred type with an asserted type."
      },
      {
            "title": "Zero Runtime Validation",
            "desc": "Type assertions are erased during compilation; they do not check or convert the object at runtime."
      },
      {
            "title": "Safer Alternative",
            "desc": "Use real runtime `if (element)` checks instead of asserting non-null values blindly."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Type Assertions Are Not Runtime Checks",
      "content": "This tells TypeScript to treat the result as an input element. But the selector might not find anything, so the actual value can still be null. An assertion is not a runtime check."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "`as Type` Syntax",
        description: "Overrides TypeScript's inferred type with an asserted type.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Zero Runtime Validation",
        description: "Type assertions are erased during compilation; they do not check or convert the object at runtime.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Safer Alternative",
        description: "Use real runtime `if (element)` checks instead of asserting non-null values blindly.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. as tells TypeScript 'trust me'",
                "content": "Writing `value as string` overrides TypeScript's guess and tells it to treat the value as text."
          },
          {
                "title": "2. Assertions can hide mistakes",
                "content": "If you tell TypeScript a value is a string, but it is actually a number when the code runs, your app can crash."
          },
          {
                "title": "3. Prefer checking over asserting",
                "content": "Whenever you can, check the value with an `if` statement rather than forcing a type with `as`."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Using Assertions to Blindly Silence Errors",
      "code": "// If the API returns invalid data, this will crash at runtime!\nconst data = (await res.json()) as User;\nconsole.log(data.name.toUpperCase());",
      "explanation": "as User does not validate the API response; it only silences compiler warnings."
},
    good: {
      "title": "Validating the Value Before Using It",
      "code": "const element = document.querySelector(\"input\");\nif (element instanceof HTMLInputElement) {\n  element.value = \"Hello\"; // Safe and verified!\n}",
      "explanation": "Using an instanceof check verifies the actual object type at runtime."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 11: Type Assertions\n// Simulated DOM element lookup:\nconst fakeElement: unknown = { value: \"Hello LearnCraft\" };\n\n// We assert the shape for editor access:\nconst input = fakeElement as { value: string };\nconsole.log(\"Input value:\", input.value);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What does the type assertion `const x = value as string;` do at runtime?",
      "options": [
            "Nothing; type assertions are completely erased when compiled to JavaScript",
            "It converts value into a string using the String(value) constructor",
            "It validates that value is a string and throws an error if it is not",
            "It freezes the variable to prevent future type changes"
      ],
      "correctIndex": 0,
      "explanation": "Type assertions are purely compile-time instructions to the TypeScript compiler. They produce no runtime validation code."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Assertion Meaning",
            "desc": "A type assertion tells TypeScript to treat a value as a chosen type."
      },
      {
            "title": "No Runtime Check",
            "desc": "Assertions do not convert or validate data at runtime."
      },
      {
            "title": "Verify External Data",
            "desc": "Check fields at runtime instead of relying on `as User`."
      }
],
  },
};
