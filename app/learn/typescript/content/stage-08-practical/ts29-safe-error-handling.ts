import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts29SafeErrorHandlingContent: StandardLessonContent = {
  slug: "ts29-safe-error-handling",
  code: "TS-29",
  title: "Handling Errors with unknown",
  subtitle: "Master type-safe error handling in strict TypeScript: understand why catch variables are unknown and write robust error guards.",
  sections: [
    {
      id: "part1",
      label: "Handling Errors with unknown",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Narrowing Caught Errors",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "The Safe Error Normalizer",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "The (err as any) Shortcut",
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
    title: "Handling Errors with unknown",
    bigPicture:
      "In JavaScript, code can throw anything—strings, numbers, or objects. That is why TypeScript types catch variables as `unknown`. You must narrow with `instanceof Error` before accessing `error.message`.",
    breakdownTitle: "Three Rules for Safe Errors",
    breakdownItems: [
      {
        title: "Catch Variables Are unknown",
        desc: "TypeScript prevents you from assuming the caught error has a `.message` property.",
      },
      {
        title: "Check with instanceof Error",
        desc: "Narrows the unknown error to a real JavaScript Error object safely.",
      },
      {
        title: "Normalize Unknown Errors",
        desc: "Convert strings or unexpected values into clean Error instances with a helper.",
      },
    ],
  },
  part2: {
    title: "How to Narrow Caught Errors Safely",
    intro:
      "Observe how to safely handle diverse thrown values inside catch clauses:",
    cards: [
      {
        number: "01",
        tag: "instanceof",
        title: "1. The instanceof Error Guard",
        description:
          "Checks if the caught object inherits from JavaScript's built-in Error prototype.",
        codeSnippet:
          "try {\n  throw new Error('Disk full');\n} catch (err: unknown) {\n  if (err instanceof Error) console.error(err.message);\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "Normalizer",
        title: "2. Reusable getErrorMessage",
        description:
          "Extracts a safe human-readable message from any thrown value (strings, Errors, or objects).",
        codeSnippet:
          "function getErrorMessage(error: unknown): string {\n  if (error instanceof Error) return error.message;\n  return String(error);\n}",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Custom Errors",
        title: "3. Domain Error Classes",
        description:
          "Create custom error classes and narrow with instanceof to handle business logic errors specifically.",
        codeSnippet:
          "class ApiError extends Error { constructor(public code: number) { super(); } }\n// if (err instanceof ApiError) handleRetry(err.code);",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Catch Variable Rule",
      content:
        "Never type catch variables as 'any' or cast them with '(err as any).message'. Use 'instanceof Error' or an error normalizer to handle all thrown values safely.",
    },
  },
  part3: {
    title: "Step-by-Step: The Safe Error Normalizer",
    intro:
      "Build a production-grade error normalization helper for your applications:",
    points: [
      {
        title: "Step 1: Check for Standard Error Instances",
        content:
          "Most errors thrown by standard libraries and runtime APIs inherit from Error.",
        codeSnippet:
          "function toError(maybeError: unknown): Error {\n  if (maybeError instanceof Error) return maybeError;\n  // Step 2 below...\n}",
      },
      {
        title: "Step 2: Handle String and Object Throws",
        content:
          "If an external library threw a raw string or an object with a message property, extract and wrap it.",
        codeSnippet:
          "function toError(maybeError: unknown): Error {\n  if (maybeError instanceof Error) return maybeError;\n  if (typeof maybeError === 'string') return new Error(maybeError);\n  if (typeof maybeError === 'object' && maybeError !== null && 'message' in maybeError) {\n    return new Error(String((maybeError as Record<string, unknown>).message));\n  }\n  return new Error('Unknown exception occurred');\n}",
      },
      {
        title: "Step 3: Consume Safely in Any Try/Catch",
        content:
          "Normalize caught errors instantly, ensuring you always have a valid Error instance with a message and stack trace.",
        codeSnippet:
          "try {\n  JSON.parse('{ invalid json }');\n} catch (raw) {\n  const err = toError(raw);\n  console.log(`Handled: ${err.message}`);\n}\n// Output: Handled: Expected property name or '}' in JSON...",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: The (err as any).message Shortcut",
    bad: {
      title: "❌ Bypassing Catch Safety with 'as any'",
      code:
        "try {\n  someOperation();\n} catch (err: any) {\n  // Dangerous! If someOperation threw undefined or null:\n  // TypeError: Cannot read properties of undefined (reading 'message')\n  console.error(err.message);\n}",
      explanation:
        "Casting catch variables to `any` assumes the error is an object with a `.message` property. If an unhandled promise rejection throws a string or null, your error handler itself crashes!",
    },
    good: {
      title: "✅ Guard with instanceof Error Before Accessing Message",
      code:
        "try {\n  someOperation();\n} catch (err: unknown) {\n  const message = err instanceof Error ? err.message : 'Unknown error';\n  console.error(`Caught safely: ${message}`);\n}",
      explanation:
        "Guarding with `instanceof Error` ensures the error handler never throws a secondary exception during incident handling.",
    },
    whyItMatters:
      "Crash handlers that crash themselves are the worst bugs in production. Safe error handling with unknown guarantees your logging and telemetry stay online.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Inspect and run safe error handling routines in the interactive playground:",
    starterCode:
      "// TS-29: Safe Error Handling with unknown\nfunction safeJsonParse(jsonString: string): { success: boolean; data?: unknown; error?: string } {\n  try {\n    const data: unknown = JSON.parse(jsonString);\n    return { success: true, data };\n  } catch (err: unknown) {\n    const message = err instanceof Error ? err.message : \"Unknown error occurred\";\n    return { success: false, error: message };\n  }\n}\n\nconst validResult = safeJsonParse('{\"course\": \"TypeScript\", \"lessons\": 32}');\nconst brokenResult = safeJsonParse('bad_data_format');\n\nconsole.log(`Valid parse success: ${validResult.success}`);\nconsole.log(`Broken parse error: ${brokenResult.error}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why does strict mode in TypeScript type catch block variables as `unknown` rather than `Error`?",
      options: [
        "Because Error is deprecated in modern JavaScript.",
        "Because JavaScript allows throwing any value (strings, numbers, null, objects), so TypeScript cannot guarantee at compile time that the thrown value is an Error instance.",
        "Because unknown runs faster in V8 engines.",
        "Because catch blocks are compiled away during build.",
      ],
      correctIndex: 1,
      explanation:
        "In JavaScript, the `throw` statement can be used with any value (e.g. `throw 'timeout'`, `throw 404`). Because the runtime environment cannot guarantee that only instances of `Error` are thrown, TypeScript strictly types catch variables as `unknown` to force safe runtime verification.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Catch is unknown",
        desc: "In strict mode, caught exceptions are typed as unknown because JavaScript allows throwing arbitrary values.",
      },
      {
        title: "instanceof Error Guard",
        desc: "Use if (error instanceof Error) to safely unlock the .message and .stack properties.",
      },
      {
        title: "Never Use 'as any'",
        desc: "Avoid (err as any).message shortcuts; normalize errors with a helper function to prevent secondary crashes.",
      },
    ],
    nextLessonPreview: {
      title: "TS-30: Typing API Responses Safely",
      desc: "Learn how to model external network boundaries, deep readonly types, and 'as const' literal narrowing.",
    },
  },
};
