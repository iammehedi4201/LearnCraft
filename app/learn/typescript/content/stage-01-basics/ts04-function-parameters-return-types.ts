import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts04FunctionParametersReturnTypesContent: StandardLessonContent = {
  slug: "ts04-function-parameters-return-types",
  code: "TS-04",
  title: "Function Parameters and Return Types",
  subtitle: "Establish clear contracts for function arguments and return values.",
  difficulty: "Moderate",
  scenario: {
    question: "A function sends an email and does not return a useful value. Would `string` be a good return type? Explain what you would use instead and why.",
    answer: "No. If the function does not return a useful value, use `void` as its return type. For example, `function sendEmail(): void { /* send email */ }`.",
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
    title: "Function Parameters and Return Types",
    bigPicture: "Function types describe what information a function expects and what it gives back. This helps people understand how to call the function correctly.",
    codeSnippet: "function calculateTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\n\nconst total = calculateTotal(250, 3); // 750",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Parameter Annotations",
            "desc": "Declaring `(price: number, quantity: number)` enforces valid input values."
      },
      {
            "title": "Return Type Annotation",
            "desc": "Adding `: number` specifies what data type the function produces."
      },
      {
            "title": "The void Return Type",
            "desc": "Use `void` when a function performs an action but does not return a useful value."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Why Use Function Types?",
      "content": "A clear function type acts like a small agreement between the function and the code that uses it. The function expects specific types and guarantees a specific return type."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Parameter Annotations",
        description: "Declaring `(price: number, quantity: number)` enforces valid input values.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Return Type Annotation",
        description: "Adding `: number` specifies what data type the function produces.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "The void Return Type",
        description: "Use `void` when a function performs an action but does not return a useful value.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Clear inputs for callers",
                "content": "Writing `(price: number, quantity: number)` makes sure whoever calls your function passes the right information in the right order."
          },
          {
                "title": "2. Predictable outputs",
                "content": "Adding `: number` at the end makes it clear what result the function sends back to the code that called it."
          },
          {
                "title": "3. Functions that just do a job",
                "content": "If a function performs an action without returning a value (like sending an email or logging a message), use `: void`."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Calling Functions with Mismatched Arguments",
      "code": "function calculateTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\n\n// Error: Argument of type 'string' is not assignable to parameter of type 'number'\ncalculateTotal(\"250\", 3);",
      "explanation": "Passing strings instead of numbers can cause bugs like '250' * 3 producing unexpected results or NaN in complex math."
},
    good: {
      "title": "Calling Functions with Proper Types",
      "code": "function calculateTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\n\nconst total = calculateTotal(250, 3);\nconsole.log(\"Total price:\", total);",
      "explanation": "Passing required numbers guarantees calculation safety and compiler verification."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 4: Function Parameters and Return Types\nfunction calculateTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\n\nconst total = calculateTotal(250, 3);\nconsole.log(\"Total is:\", total);\n\nfunction sendEmail(to: string): void {\n  console.log(`Sending notification to ${to}...`);\n}\n\nsendEmail(\"mehedi@example.com\");\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What return type should be used for a function that performs an action but returns no value?",
      "options": [
            "void",
            "null",
            "undefined",
            "never"
      ],
      "correctIndex": 0,
      "explanation": "In TypeScript, `void` is used as the return type for functions that do not return a value."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Function Contracts",
            "desc": "Parameter and return types define clear agreements for how functions must be called."
      },
      {
            "title": "Call-Site Protection",
            "desc": "TypeScript prevents passing incorrect data types into parameters."
      },
      {
            "title": "void for Actions",
            "desc": "Use void when a function does not return a value."
      }
],
  },
};
