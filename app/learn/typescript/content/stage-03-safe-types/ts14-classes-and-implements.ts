import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts14ClassesAndImplementsContent: StandardLessonContent = {
  slug: "ts14-classes-and-implements",
  code: "TS-14",
  title: "Classes and implements",
  subtitle: "Group state and methods while validating interface contracts.",
  difficulty: "Moderate",
  scenario: {
    question: "Several classes must have an `id` number. How could an interface help you check that each class follows this rule?",
    answer: "Create an interface such as `interface HasId { id: number }`, then have each class use `implements HasId`. TypeScript will report an error if a class does not provide the required `id` number.",
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
    title: "Classes and implements",
    bigPicture: "A class groups data and methods together. TypeScript can check that a class follows the shape described by an interface by using `implements`.",
    codeSnippet: "interface HasId {\n  id: number;\n}\n\nclass Product implements HasId {\n  constructor(public id: number, public name: string) {}\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Class Definition",
            "desc": "A blueprint for creating objects with properties and methods."
      },
      {
            "title": "implements Clause",
            "desc": "Enforces that the class implements all properties and methods declared in the interface."
      },
      {
            "title": "Parameter Properties",
            "desc": "Writing `public id: number` in the constructor automatically declares and assigns the property."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Classes and Interface Contracts",
      "content": "The class has the `id` field required by `HasId`. TypeScript reports an error if a required part is missing. You will see classes in some projects, but not every application needs to use them."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Class Definition",
        description: "A blueprint for creating objects with properties and methods.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "implements Clause",
        description: "Enforces that the class implements all properties and methods declared in the interface.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Parameter Properties",
        description: "Writing `public id: number` in the constructor automatically declares and assigns the property.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Classes bundle data and actions",
                "content": "A class defines both the fields an object has and the methods it can run."
          },
          {
                "title": "2. implements is an agreement",
                "content": "Writing `class EmailService implements Notifier` guarantees that the class includes every method the interface requires."
          },
          {
                "title": "3. Keeps teams organized",
                "content": "It ensures different services in your project follow the same structure and can be swapped easily."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Missing Required Interface Properties in a Class",
      "code": "interface HasId { id: number; }\n\n// Error: Class 'Product' incorrectly implements interface 'HasId'. Property 'id' is missing.\nclass Product implements HasId {\n  constructor(public name: string) {}\n}",
      "explanation": "implements forces the class author to include every required property defined by the interface."
},
    good: {
      "title": "Fulfilling the Interface Contract",
      "code": "interface HasId { id: number; }\n\nclass Product implements HasId {\n  constructor(public id: number, public name: string) {}\n}\n\nconst item = new Product(101, \"Monitor\");\nconsole.log(\"Product ID:\", item.id);",
      "explanation": "The class provides the required id property, satisfying the compiler check."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 14: Classes and implements\ninterface HasId {\n  id: number;\n}\n\nclass Product implements HasId {\n  constructor(public id: number, public name: string) {}\n}\n\nconst prod = new Product(1, \"Mechanical Keyboard\");\nconsole.log(`Product #${prod.id}: ${prod.name}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What does the `implements` keyword do when used on a TypeScript class?",
      "options": [
            "Checks that the class provides all properties and methods required by the interface",
            "Copies the interface's compiled JavaScript code directly into the class constructor",
            "Inherits private state from another class",
            "Prevents the class from being instantiated"
      ],
      "correctIndex": 0,
      "explanation": "`implements` tells TypeScript to verify that the class adheres to the contract defined by the interface."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Classes",
            "desc": "Group state and methods together into reusable blueprints."
      },
      {
            "title": "implements",
            "desc": "Verifies that a class fulfills an interface contract at compile time."
      },
      {
            "title": "Pragmatism",
            "desc": "Use classes where object-oriented patterns fit your architecture."
      }
],
  },
};
