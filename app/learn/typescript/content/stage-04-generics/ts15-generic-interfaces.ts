import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts15GenericInterfacesContent: StandardLessonContent = {
  slug: "ts15-generic-interfaces",
  code: "TS-15",
  title: "Generic Interfaces and Types",
  subtitle: "Build reusable container structures like ApiResponse<T> and Paginated<T> in plain, easy words.",
  sections: [
    {
      id: "part1",
      label: "Generic Interfaces",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Container Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Real-World Patterns",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Missing Type Argument Trap",
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
    title: "Generic Interfaces and Types",
    bigPicture:
      "Generic Interfaces let you build reusable container shapes (like ApiResponse<T> or Paginated<T>) where the outer shell stays the same, but the inner data (T) can be any type you choose.",
    breakdownTitle: "Three Container Superpowers",
    breakdownItems: [
      {
        title: "Single Source of Truth",
        desc: "Define response envelopes (status, timestamps, error fields) once instead of repeating them for every model.",
      },
      {
        title: "Multiple Type Parameters",
        desc: "Combine two types like Result<TData, TError> to represent success payloads and custom error models.",
      },
      {
        title: "Default Types (<T = string>)",
        desc: "Provide fallback types so consumers don't have to specify type arguments for common defaults.",
      },
    ],
  },
  part2: {
    title: "How Generic Interfaces Work",
    intro:
      "Observe how generic interfaces wrap different domain types inside standard containers:",
    cards: [
      {
        number: "01",
        tag: "API Wrapper",
        title: "1. ApiResponse<T>",
        description:
          "Wrap any data payload inside standard status metadata.",
        codeSnippet:
          "interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n}\ntype UserRes = ApiResponse<{ id: string; name: string }>;",
        color: "purple",
      },
      {
        number: "02",
        tag: "Pagination",
        title: "2. Paginated<T>",
        description:
          "Standard structure for paginated lists across your backend.",
        codeSnippet:
          "interface Paginated<T> {\n  items: T[];\n  total: number;\n  page: number;\n}\ntype ProductList = Paginated<{ title: string; price: number }>;",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Result",
        title: "3. Result<T, E>",
        description:
          "Type-safe return shape for functions that can succeed or fail.",
        codeSnippet:
          "type Result<T, E = Error> =\n  | { ok: true; value: T }\n  | { ok: false; error: E };",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Container Rule",
      content:
        "Whenever multiple data models share identical outer envelopes (like network responses, cache items, or database queries), wrap them in a generic interface.",
    },
  },
  part3: {
    title: "Where Generic Interfaces Excel",
    intro:
      "Everyday situations where generic interfaces keep your codebase DRY and consistent:",
    points: [
      {
        title: "1. Stop Writing Duplicate Response Types",
        content:
          "Instead of creating UserResponse, OrderResponse, and CourseResponse, declare ApiResponse<T> once.",
        codeSnippet:
          "const res: ApiResponse<User> = await fetchUser();",
      },
      {
        title: "2. Reusable State Management",
        content:
          "Define generic state holders that store data and loading status for any entity.",
        codeSnippet:
          "interface EntityState<T> {\n  items: T[];\n  isLoading: boolean;\n  error: string | null;\n}",
      },
      {
        title: "3. Default Type Parameters",
        content:
          "Add defaults like <T = string> so callers can omit the argument when using common types.",
        codeSnippet:
          "interface CacheEntry<T = string> {\n  key: string;\n  value: T;\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Omitting Required Type Arguments",
    bad: {
      title: "❌ Using a Generic Type Without Supplying the Type Argument",
      code:
        "interface ApiResponse<T> {\n  data: T;\n}\n// Error: Generic type 'ApiResponse<T>' requires 1 type argument(s):\n// const res: ApiResponse = { data: 'hello' };",
      explanation:
        "Unless a default type argument is defined, TypeScript requires you to specify what T represents.",
    },
    good: {
      title: "✅ Supply the Type Argument or Provide a Default",
      code:
        "// Option A: Provide the type explicitly:\nconst resA: ApiResponse<string> = { data: 'hello' };\n\n// Option B: Provide a default in the interface declaration:\ninterface ApiResponseWithDefault<T = string> {\n  data: T;\n}\nconst resB: ApiResponseWithDefault = { data: 'hello' }; // OK!",
      explanation:
        "Always pass the type parameter or declare a sensible default like <T = unknown> in the interface.",
    },
    whyItMatters:
      "Generic interfaces are blueprints. Supplying type arguments ensures you always know what data shape is inside.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice defining and using generic interfaces in the live sandbox:",
    starterCode:
      "// TS-15: Generic Interfaces\ninterface ApiResponse<T> {\n  success: boolean;\n  timestamp: number;\n  data: T;\n}\n\ntype User = { id: string; name: string };\ntype Product = { id: string; price: number };\n\nconst userRes: ApiResponse<User> = {\n  success: true,\n  timestamp: Date.now(),\n  data: { id: \"u_1\", name: \"Alice\" },\n};\n\nconst productRes: ApiResponse<Product> = {\n  success: true,\n  timestamp: Date.now(),\n  data: { id: \"p_10\", price: 49.99 },\n};\n\nconsole.log(`User: ${userRes.data.name}, Product Price: $${productRes.data.price}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why is `interface ApiResponse<T> { data: T }` better than creating separate `UserResponse` and `ProductResponse` interfaces?",
      options: [
        "Because generic interfaces run faster in Node.js.",
        "Because it defines the response metadata once and lets you reuse it for any domain type, eliminating repetitive code.",
        "Because generic interfaces can only hold primitive numbers.",
        "Because interfaces cannot extend other interfaces without `<T>`.",
      ],
      correctIndex: 1,
      explanation:
        "Generic interfaces act as reusable templates. Defining the envelope once (`ApiResponse<T>`) eliminates duplicate interface definitions while maintaining 100% type safety for each payload.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Reusable Containers",
        desc: "Use generic interfaces like ApiResponse<T> and Paginated<T> to standardize data wrappers.",
      },
      {
        title: "Multiple Parameters",
        desc: "Combine types like Result<T, E> to cleanly model success payloads and errors.",
      },
      {
        title: "Default Types",
        desc: "Use <T = string> to provide sensible defaults and simplify caller code.",
      },
    ],
    nextLessonPreview: {
      title: "TS-16: Constraining Generics with extends",
      desc: "Learn how to restrict generic types with '<T extends HasId>' so you can safely access specific properties.",
    },
  },
};
