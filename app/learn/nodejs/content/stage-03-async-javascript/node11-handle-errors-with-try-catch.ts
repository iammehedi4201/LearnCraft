import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node11HandleErrorsWithTryCatchContent: StandardLessonContent = {
  slug: "node11-handle-errors-with-try-catch",
  code: "NODE-11",
  title: "Handle Errors with try...catch",
  subtitle: "try...catch lets you handle errors gracefully when files are missing, network requests fail, or unexpected data arrives.",
  difficulty: "Moderate",
  scenario: {
    question: "An API request fails. Should the app return fake success data?",
    answer: "No. It should handle the failure honestly, log useful diagnostic information, and return an appropriate error response or fallback if one is safe.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Handle Errors with try...catch",
    bigPicture:
      "Errors can happen when a file is missing, a network request fails, or code receives unexpected data. `try...catch` lets you handle errors instead of allowing them to go unhandled.",
    codeSnippet: `import { readFile } from "node:fs/promises";

try {
  const text = await readFile("./missing.txt", "utf8");
  console.log(text);
} catch (error) {
  console.error("Could not read the file.");
}`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Attempt operation",
        desc: "The code inside `try` attempts to read the file.",
      },
      {
        title: "2. Success branch",
        desc: "If the operation succeeds, the text is printed.",
      },
      {
        title: "3. Catch intercept",
        desc: "If it fails, execution moves to `catch`.",
      },
      {
        title: "4. Recovery or safe message",
        desc: "The app can show a safe message or take another action.",
      },
    ],
  },
  part2: {
    title: "Diagnostic Logging vs User Exposure",
    intro:
      "In real applications, log enough detail to investigate the problem, but do not expose file paths, secrets, or stack traces to ordinary users. Do not silently catch an error and pretend the operation succeeded.",
    rule: {
      title: "Honest Error Handling Rule",
      content:
        "Never silently swallow errors or return fake success data. Log diagnostic details internally and return a clear, secure error status or safe fallback to users.",
    },
    cards: [
      {
        number: "01",
        tag: "DIAGNOSTICS",
        title: "Server Diagnostics",
        description: "Log error codes, timestamps, and stack traces to secure server-side logging systems.",
        color: "amber",
      },
      {
        number: "02",
        tag: "SECURITY",
        title: "Client Sanitization",
        description: "Never send internal server directories, database connection strings, or system paths in user responses.",
        color: "rose",
      },
      {
        number: "03",
        tag: "HONESTY",
        title: "No Fake Success",
        description: "Fail honestly with appropriate HTTP status codes (e.g. 500 or 503) rather than pretending an operation worked.",
        color: "purple",
      },
    ],
  },
  part3: {
    title: "Scenario & Failure Response Design",
    intro: "Designing honest and resilient error responses:",
    points: [
      {
        title: "Handling Failures Honestly",
        content:
          "Returning fake success data masks bugs, corrupts downstream caches, and prevents users or calling services from retrying properly.",
      },
      {
        title: "Controlled Fallbacks",
        content:
          "If a non-critical feature fails (such as fetching user recommendations), a safe empty list or cached fallback is acceptable only if documented and intentional.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Silently catching errors (`catch (e) {}`) hides critical bugs and makes diagnosing production issues nearly impossible.",
    bad: {
      title: "Swallowing Errors Silently",
      code: `try {\n  await database.save(record);\n} catch (error) {\n  // Bad: Swallows error silently!\n}\n// Code continues as if save succeeded!`,
      explanation:
        "Silently swallowing errors makes debugging impossible and corrupts application state.",
    },
    good: {
      title: "Logging and Handling Appropriately",
      code: `try {\n  await database.save(record);\n} catch (error) {\n  console.error("Failed to save record:", error.message);\n  throw new Error("Unable to save user record");\n}`,
      explanation:
        "Log the diagnostic error message and propagate or handle the failure appropriately.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice error catching and message formatting:",
    starterCode: `function parseJSON(raw) {\n  try {\n    return { success: true, data: JSON.parse(raw) };\n  } catch (err) {\n    return { success: false, error: "Invalid JSON format" };\n  }\n}\n\nconsole.log(parseJSON('{"name": "LearnCraft"}'));\nconsole.log(parseJSON('malformed json string'));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "An API request fails. Should the app return fake success data?",
      options: [
        "No. It should handle the failure honestly, log useful diagnostic information, and return an appropriate error response or fallback if one is safe.",
        "Yes, always return 200 OK so users never know an error occurred.",
        "Yes, generate random mock data and pretend the database updated.",
        "No, the app should shut down the server immediately.",
      ],
      correctIndex: 0,
      explanation:
        "Handle errors honestly: log useful diagnostic details internally and return an appropriate error response or designated safe fallback.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "try...catch",
        desc: "Lets you handle errors instead of allowing them to terminate the process unhandled.",
      },
      {
        title: "Internal Logging",
        desc: "Log enough detail to investigate problems, but do not expose internal paths or secrets to users.",
      },
      {
        title: "Honest Responses",
        desc: "Never silently catch an error and pretend the operation succeeded.",
      },
    ],
  },
};
