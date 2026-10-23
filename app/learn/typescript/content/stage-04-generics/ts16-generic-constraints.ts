import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts16GenericConstraintsContent: StandardLessonContent = {
  slug: "ts16-generic-constraints",
  code: "TS-16",
  title: "Constraining Generics with extends",
  subtitle: "Learn how '<T extends HasId>' guarantees minimum properties while preserving exact return shapes.",
  sections: [
    {
      id: "part1",
      label: "Generic Constraints",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Constraint Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Preserving Properties",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Constraint Mismatch Trap",
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
    title: "Constraining Generics with extends",
    bigPicture:
      "By default, <T> could be anything (even a number or null), so TypeScript won't let you access item.id. Using <T extends { id: string }> guarantees that T has at least an 'id' property, while preserving all other properties.",
    breakdownTitle: "Three Constraint Insights",
    breakdownItems: [
      {
        title: "extends Means 'Has at Least'",
        desc: "In type parameters, 'extends' means the incoming value must satisfy at least this minimum shape.",
      },
      {
        title: "Safe Property Access",
        desc: "Unlocks properties like .id or .length inside your function body with zero compile errors.",
      },
      {
        title: "Exact Return Types Preserved",
        desc: "Unlike using a simple interface parameter, generic constraints preserve all extra fields on the returned object.",
      },
    ],
  },
  part2: {
    title: "How Generic Constraints Work",
    intro:
      "Observe how constraining T allows property access while maintaining dynamic flexibility:",
    cards: [
      {
        number: "01",
        tag: "HasId",
        title: "1. The ID Constraint",
        description:
          "Guarantees that any passed object has at least a string ID.",
        codeSnippet:
          "interface HasId { id: string; }\nfunction printId<T extends HasId>(item: T): T {\n  console.log(item.id); // Guaranteed to exist!\n  return item;\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "HasLength",
        title: "2. The Length Constraint",
        description:
          "Accepts any type with a .length property (strings, arrays).",
        codeSnippet:
          "function logLength<T extends { length: number }>(arg: T): T {\n  console.log(arg.length);\n  return arg;\n}\nlogLength('hello');   // OK\nlogLength([1, 2, 3]); // OK",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Extra Fields",
        title: "3. Preserves Extra Fields",
        description:
          "Callers keep all extra properties on the returned object.",
        codeSnippet:
          "const user = { id: 'u1', name: 'Alice', role: 'admin' };\nconst saved = printId(user);\nconsole.log(saved.role); // Inferred as 'admin'!",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Constraint Rule",
      content:
        "Use '<T extends MinimumShape>' when your function body needs to read specific properties from T. Do not use an unconstrained generic if you need to access fields.",
    },
  },
  part3: {
    title: "Why Constraints Beat Simple Interfaces",
    intro:
      "Understand why '<T extends HasId>' is superior to simply writing '(item: HasId)':",
    points: [
      {
        title: "1. The Simple Interface Problem",
        content:
          "If you write 'function save(item: HasId): HasId', the return type loses all original properties except 'id'.",
        codeSnippet:
          "function saveUser(u: HasId): HasId { return u; }\n// saveUser({ id: '1', name: 'Alex' }).name; // Error: 'name' is lost!",
      },
      {
        title: "2. The Generic Constraint Solution",
        content:
          "With '<T extends HasId>', TypeScript remembers that T was `{ id: '1', name: 'Alex' }` and preserves all fields.",
        codeSnippet:
          "function saveUser<T extends HasId>(u: T): T { return u; }\n// saveUser({ id: '1', name: 'Alex' }).name; // Safe! 'name' is preserved!",
      },
      {
        title: "3. Multiple Constraints with &",
        content:
          "Require multiple conditions by intersecting shapes with '&'.",
        codeSnippet:
          "function update<T extends HasId & { updatedAt: Date }>(item: T): T { ... }",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Missing Required Constraint Properties",
    bad: {
      title: "❌ Passing an Argument Missing the Required Property",
      code:
        "function getLength<T extends { length: number }>(item: T) {\n  return item.length;\n}\n// Error: Argument of type 'number' does not satisfy constraint:\n// getLength(12345); // Numbers do not have a .length property!",
      explanation:
        "Passing a type that lacks the required property triggers an immediate compile error.",
    },
    good: {
      title: "✅ Pass Types That Satisfy the Minimum Constraint",
      code:
        "getLength('12345');     // OK: strings have .length\ngetLength([1, 2, 3, 4]); // OK: arrays have .length\ngetLength({ length: 5 }); // OK: custom object with length",
      explanation:
        "Ensure the argument satisfies the minimum required fields specified after 'extends'.",
    },
    whyItMatters:
      "Constraints protect your function bodies from crashes by guaranteeing properties exist at compile time.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice writing and calling constrained generic functions in the live sandbox:",
    starterCode:
      "// TS-16: Generic Constraints\ninterface Entity {\n  id: string;\n  name: string;\n}\n\nfunction findEntity<T extends Entity>(items: T[], id: string): T | undefined {\n  return items.find((item) => item.id === id);\n}\n\nconst users = [\n  { id: \"u_1\", name: \"Alice\", email: \"alice@example.com\" },\n  { id: \"u_2\", name: \"Bob\", email: \"bob@example.com\" },\n];\n\nconst found = findEntity(users, \"u_1\");\nif (found) {\n  console.log(`Found: ${found.name} (${found.email})`);\n}\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "In `function process<T extends HasId>(item: T): T`, what does `extends HasId` mean?",
      options: [
        "`T` must be a JavaScript class that inherits from a class called `HasId`.",
        "`T` can be any type as long as it has at least the properties defined in `HasId`.",
        "`T` can only have the properties in `HasId` and no extra properties.",
        "`T` is converted into `HasId` at runtime.",
      ],
      correctIndex: 1,
      explanation:
        "In TypeScript type parameters, `extends` specifies a constraint: `T` can be any type as long as it satisfies the minimum shape of `HasId` (it is assignable to `HasId`). Extra properties on `T` are completely allowed and preserved.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Minimum Shape",
        desc: "Use <T extends Shape> to guarantee that required properties exist on T.",
      },
      {
        title: "Preserves Child Types",
        desc: "Generic constraints keep all extra fields on the returned object intact.",
      },
      {
        title: "Compile-Time Safety",
        desc: "TypeScript blocks any argument that does not satisfy the constraint.",
      },
    ],
    nextLessonPreview: {
      title: "TS-17: Generics with keyof",
      desc: "Learn how '<K extends keyof T>' and lookup types ('T[K]') enable 100% type-safe dynamic property access.",
    },
  },
};
