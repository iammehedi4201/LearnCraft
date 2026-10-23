import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts30ApiContractsImmutabilityContent: StandardLessonContent = {
  slug: "ts30-api-contracts-immutability",
  code: "TS-30",
  title: "Typing API Responses Safely",
  subtitle: "Model external network boundaries, enforce deep immutability with 'as const', and protect your application against unexpected backend payloads.",
  sections: [
    {
      id: "part1",
      label: "Typing API Responses",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "as const & Readonly",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Safe Fetch Architecture",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Direct as Casting",
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
    title: "Typing API Responses Safely",
    bigPicture:
      "Network data is untrusted. Never blindly write `const user: User = await res.json()`. Instead, treat incoming JSON as `unknown`, validate it, and mark config objects with `as const` to prevent mutation.",
    breakdownTitle: "Three Defense Rules",
    breakdownItems: [
      {
        title: "Treat Incoming JSON as unknown",
        desc: "Prevents runtime crashes if the backend response changes or returns an unexpected error object.",
      },
      {
        title: "Use as const for Immutability",
        desc: "Locks objects and arrays so their values become exact readonly literals.",
      },
      {
        title: "Validate at the Network Boundary",
        desc: "Use type guards or schema validators before passing data to the rest of your app.",
      },
    ],
  },
  part2: {
    title: "Using as const for Immutable Contracts",
    intro:
      "Observe how 'as const' prevents type widening and locks values down permanently:",
    cards: [
      {
        number: "01",
        tag: "as const",
        title: "1. Literal Narrowing",
        description:
          "Turns string fields into exact literal types and arrays into fixed readonly tuples.",
        codeSnippet:
          "const API_CONFIG = {\n  endpoint: 'https://api.learncraft.com',\n  retries: 3,\n} as const;\n// endpoint is exact literal 'https://api.learncraft.com', NOT string!",
        color: "purple",
      },
      {
        number: "02",
        tag: "Readonly Tuple",
        title: "2. Readonly Arrays",
        description:
          "Appends readonly to array literals, blocking push, pop, and index reassignment.",
        codeSnippet:
          "const SUPPORTED_LOCALES = ['en', 'es', 'fr'] as const;\n// SUPPORTED_LOCALES.push('de'); // Error: Property 'push' does not exist",
        color: "cyan",
      },
      {
        number: "03",
        tag: "API Contract",
        title: "3. Discriminated API Results",
        description:
          "Model API responses with tagged status unions so error handling is enforced by the compiler.",
        codeSnippet:
          "type ApiResponse<T> =\n  | { ok: true; data: T }\n  | { ok: false; error: string };",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Network Trust Rule",
      content:
        "TypeScript types exist only in your editor, not in the server's HTTP packets. Always validate external data before treating it as an internal domain entity.",
    },
  },
  part3: {
    title: "Step-by-Step: Designing a Safe Fetch Layer",
    intro:
      "Follow the standard enterprise pattern for typing HTTP network clients:",
    points: [
      {
        title: "Step 1: Declare the Tagged Response Contract",
        content:
          "Model both success and failure outcomes as a discriminated union.",
        codeSnippet:
          "type NetworkResult<T> =\n  | { status: 'success'; data: T }\n  | { status: 'error'; message: string; code: number };",
      },
      {
        title: "Step 2: Wrap the Fetcher with Safe Error Handling",
        content:
          "Catch HTTP non-200 statuses and network exceptions cleanly without throwing.",
        codeSnippet:
          "async function safeFetch<T>(url: string): Promise<NetworkResult<T>> {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) {\n      return { status: 'error', message: res.statusText, code: res.status };\n    }\n    const data = (await res.json()) as T;\n    return { status: 'success', data };\n  } catch (err) {\n    return { status: 'error', message: String(err), code: 0 };\n  }\n}",
      },
      {
        title: "Step 3: Consume with Compiler-Enforced Branching",
        content:
          "The caller cannot access data on error, or message on success, guaranteeing clean UI states.",
        codeSnippet:
          "const result = await safeFetch<UserProfile>('/api/profile');\nif (result.status === 'success') {\n  console.log(`Hello, ${result.data.name}`);\n} else {\n  console.error(`Fetch failed (${result.code}): ${result.message}`);\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Casting fetch Response Directly with as",
    bad: {
      title: "❌ Blindly Casting API Responses to Domain Interfaces",
      code:
        "interface User { id: number; name: string }\n\n// Flaw: If server returns 500 { error: 'Internal Error' },\n// TS believes user has a valid 'name' property!\nconst user = (await fetch('/api/user').then(r => r.json())) as User;\n\n// Crashes at runtime in production:\nconsole.log(user.name.toUpperCase());\n// TypeError: Cannot read properties of undefined (reading 'toUpperCase')",
      explanation:
        "A type assertion does not validate server responses. If the backend schema changes or returns an error payload, the type assertion conceals the bug until the app crashes in production.",
    },
    good: {
      title: "✅ Check HTTP Response Status & Validate Shapes",
      code:
        "interface User { id: number; name: string }\n\nconst res = await fetch('/api/user');\nif (!res.ok) throw new Error(`HTTP error: ${res.status}`);\n\nconst raw: unknown = await res.json();\n// Validate shape or use a runtime schema library (e.g. Zod)\nif (typeof raw === 'object' && raw !== null && 'name' in raw) {\n  const user = raw as User;\n  console.log(user.name.toUpperCase());\n}",
      explanation:
        "Verify HTTP status codes and inspect payload properties before accessing fields.",
    },
    whyItMatters:
      "Network failures and schema mismatches cause the majority of production web crashes. Writing defensive network boundaries keeps your app resilient.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice declaring immutable configurations and safe API contracts in the editor:",
    starterCode:
      "// TS-30: API Contracts and as const\nconst ENDPOINTS = {\n  login: \"/api/v1/auth/login\",\n  profile: \"/api/v1/user/profile\",\n  courses: \"/api/v1/learn/courses\",\n} as const;\n\ntype EndpointKey = keyof typeof ENDPOINTS;\n\ninterface ApiResult<T> {\n  status: \"success\" | \"error\";\n  payload: T;\n}\n\nconst mockResponse: ApiResult<{ totalStudents: number }> = {\n  status: \"success\",\n  payload: { totalStudents: 4120 },\n};\n\nconsole.log(`Endpoint: ${ENDPOINTS.courses}`);\nconsole.log(`Students: ${mockResponse.payload.totalStudents.toLocaleString()}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What does appending `as const` to an object literal (e.g. `const config = { role: 'admin' } as const`) do in TypeScript?",
      options: [
        "It converts the object into a JavaScript frozen object using Object.freeze() at runtime.",
        "It narrows primitive properties to exact literal types and marks all nested properties as `readonly` at compile time.",
        "It encrypts the object values in memory.",
        "It turns the object into an interface.",
      ],
      correctIndex: 1,
      explanation:
        "`as const` is a type-level assertion that instructs TypeScript to infer the narrowest possible literal types (e.g. literal `'admin'` instead of broad `string`) and marks all object properties as `readonly`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Network Boundary Safety",
        desc: "Never blindly trust network JSON payloads. Treat responses as unknown and verify before access.",
      },
      {
        title: "as const for Immutability",
        desc: "Use as const to lock down configuration objects and derive exact literal unions without widening.",
      },
      {
        title: "Discriminated API Results",
        desc: "Wrap responses in tagged unions ({ status: 'success' } | { status: 'error' }) to force error checking.",
      },
    ],
    nextLessonPreview: {
      title: "TS-31: Reading and Fixing Compiler Errors",
      desc: "Learn how to read and dissect deep compiler error messages, type mismatches, and excess property checks.",
    },
  },
};
