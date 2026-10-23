import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts22ConditionalTypesInferContent: StandardLessonContent = {
  slug: "ts22-conditional-types-infer",
  code: "TS-18",
  title: "Conditional Types and infer",
  subtitle: "Understand ternary types ('T extends U ? X : Y') and how 'infer' extracts inner types in plain, simple words.",
  sections: [
    {
      id: "part1",
      label: "Conditional Types & infer",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Ternary & infer Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Unwrapping Types",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Misplaced infer Trap",
      icon: "🛡️",
      tag: "COMMON PITFALL",
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND",
    },
    {
      id: "part6",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT",
    },
    {
      id: "part7",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS",
    },
  ],
  part1: {
    title: "Conditional Types and infer",
    bigPicture:
      "Conditional types are if-else statements for types: 'T extends string ? true : false'. When paired with 'infer', they act like a box opener: they look inside a Promise or Array and extract the inner type automatically.",
    breakdownTitle: "Three Core Superpowers",
    breakdownItems: [
      {
        title: "Type-Level Ternary (T extends U ? X : Y)",
        desc: "Returns type X if T matches the condition, otherwise returns type Y.",
      },
      {
        title: "The 'infer' Keyword",
        desc: "Declares a temporary type variable that captures and extracts an inner type from a complex shape.",
      },
      {
        title: "Powers Built-in Utility Types",
        desc: "This pattern is the engine behind standard TypeScript utilities like Awaited<T> and ReturnType<T>.",
      },
    ],
  },
  part2: {
    title: "How Conditional Types and infer Work",
    intro:
      "Observe how conditional logic and pattern matching extract types dynamically:",
    cards: [
      {
        number: "01",
        tag: "Ternary",
        title: "1. Type-Level if / else",
        description:
          "Checks type compatibility and chooses the matching branch.",
        codeSnippet:
          "type IsString<T> = T extends string ? 'yes' : 'no';\ntype A = IsString<'hello'>; // 'yes'\ntype B = IsString<100>;     // 'no'",
        color: "purple",
      },
      {
        number: "02",
        tag: "infer",
        title: "2. Unwrapping with infer",
        description:
          "Inspects a Promise and extracts its inner value type.",
        codeSnippet:
          "type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;\ntype Result = UnwrapPromise<Promise<string>>; // string!",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Functions",
        title: "3. Extracting Return Types",
        description:
          "Extracts what a function returns without calling it.",
        codeSnippet:
          "type GetReturn<T> = T extends (...args: any[]) => infer R ? R : never;\ntype FnReturn = GetReturn<() => number>; // number",
        color: "emerald",
      },
    ],
    rule: {
      title: "The infer Rule",
      content:
        "The 'infer' keyword can only be used on the right side of the 'extends' keyword inside a conditional type. It means: 'deduce this inner type and name it R'.",
    },
  },
  part3: {
    title: "Why and When to Use Conditional Types",
    intro:
      "Practical ways conditional types and infer solve real-world typing challenges:",
    points: [
      {
        title: "1. Unwrapping Async Data (Awaited<T>)",
        content:
          "TypeScript's built-in Awaited<T> unwraps nested Promises so you get the final resolved data type.",
        codeSnippet:
          "type User = Awaited<Promise<Promise<{ id: string }>>>; // { id: string }",
      },
      {
        title: "2. Extracting Array Item Types",
        content:
          "Extract the type of an individual item from any array or tuple type.",
        codeSnippet:
          "type ItemOf<T> = T extends (infer U)[] ? U : T;\ntype Num = ItemOf<number[]>; // number",
      },
      {
        title: "3. Filtering Out null and undefined",
        content:
          "Conditionally distribute over a union and return 'never' to remove unwanted types.",
        codeSnippet:
          "type NonNullableType<T> = T extends null | undefined ? never : T;\ntype Clean = NonNullableType<string | null>; // string",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Using infer Outside Conditional Types",
    bad: {
      title: "❌ Trying to Use infer as a Standalone Keyword",
      code:
        "// Syntax Error: 'infer' declarations are only permitted in the 'extends' clause of a conditional type:\n// type ExtractValue<T> = infer R;",
      explanation:
        "'infer' is not a standalone type alias. It only works inside a ternary condition matching a shape.",
    },
    good: {
      title: "✅ Place infer Inside an 'extends' Pattern Match",
      code:
        "// Correct pattern matching:\ntype ExtractValue<T> = T extends { data: infer R } ? R : never;\ntype Payload = ExtractValue<{ data: { name: string } }>; // { name: string }",
      explanation:
        "Pair 'infer R' with a structural shape like { data: infer R } or Promise<infer R>.",
    },
    whyItMatters:
      "Recognizing the `T extends Shape<infer R> ? R : Fallback` formula helps you read advanced libraries and AI-generated utilities with confidence.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test conditional types and type unwrapping with infer in the live sandbox:",
    starterCode:
      "// TS-22: Conditional Types and infer\ntype Unpack<T> = T extends Promise<infer U>\n  ? U\n  : T extends (infer U)[]\n  ? U\n  : T;\n\ntype StringFromPromise = Unpack<Promise<string>>; // string\ntype NumberFromArray = Unpack<number[]>;         // number\ntype BooleanDirect = Unpack<boolean>;            // boolean\n\nconst testValue: StringFromPromise = \"Hello Unpacked Types!\";\nconsole.log(testValue);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What does `type Unwrap<T> = T extends Promise<infer R> ? R : T;` evaluate to when `T` is `Promise<number>`?",
      options: [
        "`Promise<number>`",
        "`number`",
        "`never`",
        "`any`",
      ],
      correctIndex: 1,
      explanation:
        "Because `Promise<number>` matches `Promise<infer R>`, TypeScript infers `R` as `number` and returns the true branch `R`, which is `number`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Ternary for Types",
        desc: "Use T extends U ? X : Y to branch on types at compile time.",
      },
      {
        title: "infer Unboxes Types",
        desc: "Use infer to extract hidden inner types from Promises, arrays, or function returns.",
      },
      {
        title: "Powers Utility Types",
        desc: "Built-in utilities like Awaited<T> and ReturnType<T> rely on this exact pattern.",
      },
    ],
    nextLessonPreview: {
      title: "TS-23: Mapped Types and Template Literals",
      desc: "Learn how to transform object properties with '[K in keyof T]' and construct string types with template literals.",
    },
  },
};
