import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts06TypeAndInterfaceContent: StandardLessonContent = {
  slug: "ts06-type-and-interface",
  code: "TS-06",
  title: "type and interface",
  subtitle: "Compare type aliases and interfaces for describing data shapes.",
  difficulty: "Moderate",
  scenario: {
    question: "You need a type called `Status` that can be `\"pending\"`, `\"success\"`, or `\"failed\"`. Would a `type` alias or an `interface` be the natural choice? Explain why.",
    answer: "Use a `type` alias, because it can describe a union of exact string choices: `type Status = \"pending\" | \"success\" | \"failed\"`. An interface is mainly used to describe object shapes.",
  },
  interviewQuestion: {
    question: "What is one important difference between `type` and `interface`?",
    answer: "Both can describe an object's fields. A `type` can also describe a union, such as `string | number`. An `interface` is commonly used to describe an object shape and can be extended.",
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
    title: "type and interface",
    bigPicture: "Both `type` and `interface` can describe the fields an object should have.",
    codeSnippet: "interface User {\n  id: number;\n  name: string;\n}\n\ntype Product = {\n  id: number;\n  title: string;\n};\n\nfunction greet(user: User): string {\n  return `Hello, ${user.name}`;\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "interface",
            "desc": "Primarily used for object shapes; supports declaration merging and `extends`."
      },
      {
            "title": "type alias",
            "desc": "Can name objects, unions (`string | number`), primitives, and tuples."
      },
      {
            "title": "General Guidance",
            "desc": "For simple object structures, either is fine. Use `type` when union types are needed."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Choosing Between type and interface",
      "content": "A `type` can also name types beyond object shapes, such as a union of several possible values. Interfaces are often used to describe object shapes and can be extended. For many simple object shapes, either choice works."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "interface",
        description: "Primarily used for object shapes; supports declaration merging and `extends`.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "type alias",
        description: "Can name objects, unions (`string | number`), primitives, and tuples.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "General Guidance",
        description: "For simple object structures, either is fine. Use `type` when union types are needed.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Both describe object shapes",
                "content": "You can write `interface User { name: string }` or `type User = { name: string }`; both validate object shapes identically."
          },
          {
                "title": "2. Use type for choices (unions)",
                "content": "A `type` can describe a list of exact choices like `type Status = \"pending\" | \"success\"`. An `interface` cannot do this."
          },
          {
                "title": "3. Use interface for extensible shapes",
                "content": "An `interface` can extend another interface using `extends`, which is very common when building large libraries and models."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Attempting to Create a Union with an Interface",
      "code": "// Syntax error: an interface cannot directly represent a union of string literals!\n// interface Status = \"pending\" | \"success\";\n\n// Correct approach: use a type alias instead:",
      "explanation": "Interfaces describe object shapes. Unions must be declared using type aliases."
},
    good: {
      "title": "Using type for Unions and interface for Objects",
      "code": "type Status = \"pending\" | \"success\" | \"failed\"; // Union with type alias\n\ninterface User { // Object shape with interface\n  id: number;\n  name: string;\n  status: Status;\n}",
      "explanation": "Combining type aliases for unions with interfaces for objects provides clean, idiomatic TypeScript."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 6: type and interface\ninterface User {\n  id: number;\n  name: string;\n}\n\ntype Product = {\n  id: number;\n  title: string;\n};\n\nfunction greet(user: User): string {\n  return `Hello, ${user.name}`;\n}\n\nconsole.log(greet({ id: 1, name: \"Rina\" }));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Why would you choose a `type` alias instead of an `interface` to represent `Status = 'open' | 'closed'`?",
      "options": [
            "Because `type` aliases can represent union types, whereas interfaces only describe object shapes",
            "Because interfaces cannot be imported into other files",
            "Because type aliases are executed at runtime while interfaces are not",
            "Because TypeScript is deprecating interfaces in favor of types"
      ],
      "correctIndex": 0,
      "explanation": "A type alias can represent unions of primitive or literal types, whereas an interface describes the shape of an object."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Object Shapes",
            "desc": "Both type and interface can describe object structures."
      },
      {
            "title": "Unions Need type",
            "desc": "Use type aliases for unions like 'pending' | 'success'."
      },
      {
            "title": "Consistency",
            "desc": "For simple objects, either works; follow your project's conventions."
      }
],
  },
};
