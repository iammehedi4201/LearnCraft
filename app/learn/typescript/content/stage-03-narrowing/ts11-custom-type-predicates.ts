import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts11CustomTypePredicatesContent: StandardLessonContent = {
  slug: "ts11-custom-type-predicates",
  code: "TS-11",
  title: "Writing Custom Type Guards",
  subtitle: "Understand how 'value is Type' teaches TypeScript to narrow custom functions in plain, simple words.",
  sections: [
    {
      id: "part1",
      label: "Custom Type Guards",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Predicate Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Filtering Arrays",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Unverified Predicate Trap",
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
    title: "Writing Custom Type Guards",
    bigPicture:
      "When a helper function returns a plain boolean, TypeScript only sees true or false—it does not narrow the variable's type. Returning 'value is Type' teaches TypeScript that true means the variable is safe to use as that specific type.",
    breakdownTitle: "Three Predicate Essentials",
    breakdownItems: [
      {
        title: "The Predicate (val is Type)",
        desc: "Tells TypeScript: 'If this function returns true, narrow the variable to Type inside the calling if-statement.'",
      },
      {
        title: "Why Plain boolean Fails",
        desc: "A function returning boolean only says yes/no; it leaves the caller's variable typed as unknown or any.",
      },
      {
        title: "Compiler Trust",
        desc: "TypeScript trusts your predicate completely. You must ensure the runtime checks in the function body are accurate.",
      },
    ],
  },
  part2: {
    title: "How Custom Predicates Work",
    intro:
      "Observe the difference between a plain boolean function and a type predicate:",
    cards: [
      {
        number: "01",
        tag: "Predicate",
        title: "1. Type Predicate (val is T)",
        description:
          "Returns a boolean while telling TypeScript how to narrow the argument.",
        codeSnippet:
          "function isString(val: unknown): val is string {\n  return typeof val === 'string';\n}\nconst data: unknown = 'hello';\nif (isString(data)) console.log(data.toUpperCase()); // Safe!",
        color: "purple",
      },
      {
        number: "02",
        tag: "Array Filter",
        title: "2. Removing null from Arrays",
        description:
          "Use a predicate with .filter() to remove null and narrow the array type.",
        codeSnippet:
          "const items = ['a', null, 'b', null];\nconst nonNull = items.filter((x): x is string => x !== null);\n// nonNull is inferred as string[] (null is gone!)",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Object Validation",
        title: "3. Validating Custom Shapes",
        description:
          "Check object keys to safely narrow untrusted API payloads.",
        codeSnippet:
          "type User = { id: string; name: string };\nfunction isUser(obj: any): obj is User {\n  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Predicate Guarantee Rule",
      content:
        "When using 'param is Type', TypeScript assumes your runtime check is 100% correct. If your function returns true on invalid data, your app will crash at runtime.",
    },
  },
  part3: {
    title: "Why and When to Use Custom Predicates",
    intro:
      "Common real-world scenarios where custom predicates are indispensable:",
    points: [
      {
        title: "1. Array .filter() Narrowing",
        content:
          "Without a predicate, .filter(x => x !== null) still leaves the array typed as (string | null)[]. With a predicate, null is completely removed from the type.",
        codeSnippet:
          "function isNotNull<T>(val: T | null): val is T {\n  return val !== null;\n}",
      },
      {
        title: "2. Parsing API Responses",
        content:
          "When receiving raw JSON, write a predicate function to verify required fields before passing data to your application.",
        codeSnippet:
          "if (isUser(apiData)) {\n  // apiData.id and apiData.name are fully autocompleted and safe\n}",
      },
      {
        title: "3. Distinguishing Similar Objects",
        content:
          "Use predicates to tell apart two objects that have different fields.",
        codeSnippet:
          "function isCar(v: Car | Boat): v is Car {\n  return 'wheels' in v;\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Writing False Guarantees in Predicates",
    bad: {
      title: "❌ Returning true Without Checking All Required Fields",
      code:
        "type User = { id: string; email: string };\n// Bug: Only checks id, but promises the caller it has email too!\nfunction isUser(x: any): x is User {\n  return x && typeof x.id === 'string';\n}\n// Calling user.email.toLowerCase() will crash if email was omitted!",
      explanation:
        "If you promise TypeScript that an object is 'User', you must verify that all required properties exist.",
    },
    good: {
      title: "✅ Check Every Required Field Thoroughly",
      code:
        "function isUser(x: any): x is User {\n  return (\n    x !== null &&\n    typeof x === 'object' &&\n    typeof x.id === 'string' &&\n    typeof x.email === 'string'\n  );\n}",
      explanation:
        "Verify every required property before returning true so the type guarantee is real.",
    },
    whyItMatters:
      "Custom predicates override TypeScript's analysis. A faulty predicate reintroduces silent runtime bugs.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Test custom type predicates and array filtering in the live editor:",
    starterCode:
      "// TS-11: Custom Type Predicates\ntype SuccessResponse = { status: \"success\"; data: string[] };\n\nfunction isSuccess(res: any): res is SuccessResponse {\n  return res && res.status === \"success\" && Array.isArray(res.data);\n}\n\nconst rawPayload: unknown = { status: \"success\", data: [\"item1\", \"item2\"] };\n\nif (isSuccess(rawPayload)) {\n  console.log(`Success! ${rawPayload.data.length} items received.`);\n} else {\n  console.log(\"Payload does not match SuccessResponse shape.\");\n}\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why is `function isFish(p: any): p is Fish` better than `function isFish(p: any): boolean`?",
      options: [
        "Because `p is Fish` makes the function run faster in V8.",
        "Because `p is Fish` narrows `p` to `Fish` inside any `if (isFish(p))` block, while `boolean` leaves `p` un-narrowed.",
        "Because `boolean` functions cannot be used in `if` statements in TypeScript.",
        "Because `p is Fish` is required by JavaScript engines.",
      ],
      correctIndex: 1,
      explanation:
        "A return type of `p is Fish` is a type predicate. It instructs TypeScript to narrow `p` to `Fish` in branches where the function returns true. A plain `boolean` return does not trigger narrowing.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "val is Type",
        desc: "Use type predicates when you need a custom function to narrow a variable's type.",
      },
      {
        title: "Array .filter()",
        desc: "Pass type predicates to .filter() to cleanly remove null or undefined from arrays.",
      },
      {
        title: "Verify Carefully",
        desc: "Make sure your runtime checks verify every required field before returning true.",
      },
    ],
    nextLessonPreview: {
      title: "TS-12: Discriminated Unions",
      desc: "Master the #1 design pattern in TypeScript: using a shared 'kind' or 'status' field for 100% bug-free branching.",
    },
  },
};
