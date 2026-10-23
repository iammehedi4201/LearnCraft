import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts13CommonUtilityTypesContent: StandardLessonContent = {
  slug: "ts13-common-utility-types",
  code: "TS-13",
  title: "Common Utility Types",
  subtitle: "Transform existing types with Pick, Partial, Omit, and Record.",
  difficulty: "Moderate",
  scenario: {
    question: "A form updates only a user's name or email, and it does not require both fields every time. Which utility type could help make those fields optional?",
    answer: "Use `Partial`, applied to the fields the form can update. For example, `type UserUpdate = Partial<Pick<User, \"name\" | \"email\">>`. That makes both fields optional for an update.",
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
    title: "Common Utility Types",
    bigPicture: "Utility types help you create a type from an existing type, so you do not need to repeat the same fields.",
    codeSnippet: "type User = {\n  id: number;\n  name: string;\n  email: string;\n};\n\ntype UserPreview = Pick<User, \"id\" | \"name\">;\ntype UserUpdate = Partial<Pick<User, \"name\" | \"email\">>;",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Pick<T, Keys>",
            "desc": "Constructs a type by picking a specific subset of properties from type T."
      },
      {
            "title": "Partial<T>",
            "desc": "Constructs a type with all properties of T set to optional."
      },
      {
            "title": "Omit<T, Keys>",
            "desc": "Constructs a type by picking all properties from T and then removing Keys."
      },
      {
            "title": "Record<K, V>",
            "desc": "Constructs an object type whose property keys are K and property values are V."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Core Utility Types Overview",
      "content": "- `Pick` keeps the fields you name. - `Partial` makes the chosen fields optional. - `Omit` removes fields you name. - `Record` describes an object with a set of key and value types. You do not need to memorize every utility type. Learn the common ones and learn to recognize them in existing code."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Pick<T, Keys>",
        description: "Constructs a type by picking a specific subset of properties from type T.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "Partial<T>",
        description: "Constructs a type with all properties of T set to optional.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Omit<T, Keys>",
        description: "Constructs a type by picking all properties from T and then removing Keys.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Handy built-in shortcuts",
                "content": "TypeScript gives you helper types like `Partial`, `Pick`, and `Omit` so you don't have to duplicate type definitions."
          },
          {
                "title": "2. Partial makes fields optional",
                "content": "`Partial<User>` makes every field optional, which is great for forms where a user only updates one or two fields."
          },
          {
                "title": "3. Pick and Omit choose fields",
                "content": "Use `Pick` to keep only the fields you need, and `Omit` to leave out sensitive fields like passwords."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Duplicating Types Manually",
      "code": "type User = { id: number; name: string; email: string };\n\n// Manually copied - will easily fall out of sync when User changes!\ntype UserPreview = { id: number; name: string };",
      "explanation": "Copying fields by hand causes drift and maintenance bugs when the base model evolves."
},
    good: {
      "title": "Deriving Types with Built-in Utilities",
      "code": "type User = { id: number; name: string; email: string };\n\n// Clean, single source of truth:\ntype UserPreview = Pick<User, \"id\" | \"name\">;\ntype UserUpdate = Partial<User>;",
      "explanation": "Utility types keep your data models connected to their single source of truth."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 13: Common Utility Types\ntype User = {\n  id: number;\n  name: string;\n  email: string;\n};\n\ntype UserPreview = Pick<User, \"id\" | \"name\">;\ntype UserUpdate = Partial<Pick<User, \"name\" | \"email\">>;\n\nconst preview: UserPreview = { id: 1, name: \"Rina\" };\nconst update: UserUpdate = { email: \"new@example.com\" };\n\nconsole.log(\"Preview:\", preview);\nconsole.log(\"Update:\", update);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What does `Partial<User>` do in TypeScript?",
      "options": [
            "Makes every property in User optional",
            "Removes all properties from User",
            "Makes every property in User readonly",
            "Picks only the first two properties of User"
      ],
      "correctIndex": 0,
      "explanation": "`Partial<T>` wraps all properties of type T in `?`, making every property optional."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Utility Types",
            "desc": "Built-in helpers that create new types from existing types without repetition."
      },
      {
            "title": "Common Tools",
            "desc": "Pick selects fields, Omit removes fields, and Partial makes fields optional."
      },
      {
            "title": "Maintainability",
            "desc": "Keeps types connected to their single source of truth."
      }
],
  },
};
