import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp12ValidateUserInputContent: StandardLessonContent = {
  slug: "exp12-validate-user-input",
  code: "EXP-12",
  title: "Validate User Input",
  subtitle: "Input validation protects your API from malicious, malformed, or missing data by rejecting bad requests early.",
  difficulty: "Moderate",
  scenario: {
    question: "A client sends { \"title\": \"   \" }. Should your API accept it?",
    answer: "No. Trimming the text leaves an empty string, so the API should return a validation error.",
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
    title: "Validate User Input",
    bigPicture:
      "Validation checks whether submitted data follows the rules your application needs. Never trust request data just because it came from your own frontend.",
    codeSnippet: `app.use(express.json());

app.post('/tasks', (req, res) => {
  const title = req.body?.title;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A task title is required' });
  }

  res.status(201).json({ task: { title: title.trim() } });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Read payload",
        desc: "Read the title from the request body.",
      },
      {
        title: "2. Type check",
        desc: "Check that it is a string.",
      },
      {
        title: "3. Non-empty check",
        desc: "Check that it is not empty after trimming spaces.",
      },
      {
        title: "4. Early rejection",
        desc: "If it is invalid, return `400 Bad Request` and stop the handler with `return`.",
      },
      {
        title: "5. Safe continuation",
        desc: "If it is valid, continue with the task-creation logic.",
      },
    ],
  },
  part2: {
    title: "Why Validation is Essential",
    intro:
      "This example shows the validation flow; it does not save the task to a database.\n\nNever assume incoming data is well-formed. Clients can bypass frontend form controls using curl or Postman, sending unexpected shapes or dangerous inputs.",
    rule: {
      title: "Fail Fast & Return Rule",
      content:
        "Always return immediately after sending a 400 Bad Request response. Forgetting `return` causes execution to proceed to the success logic, triggering header errors.",
    },
    cards: [
      {
        number: "01",
        tag: "TYPE SAFETY",
        title: "Explicit Type Checks",
        description:
          "Verify primitives (`typeof val === 'string'`) and structure before accessing nested properties.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SANITIZATION",
        title: "Trimming & Cleaning",
        description:
          "Trim whitespace so whitespace-only strings like `'   '` do not bypass required field checks.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "EARLY EXIT",
        title: "Return 400 Early",
        description:
          "Stop processing immediately upon validation failure to save server resources and prevent corrupt data.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Edge Cases",
    intro: "Enforcing validation invariants on incoming payloads:",
    points: [
      {
        title: "Whitespace Input Rejection",
        content:
          "If a client submits `{ \"title\": \"   \" }`, `title.trim()` evaluates to `\"\"`. The API must return `400 Bad Request` rather than creating a blank task.",
      },
      {
        title: "Missing Body Handling",
        content:
          "Use optional chaining (`req.body?.title`) so missing or unparsed bodies do not throw unhandled TypeError exceptions.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting to call `return` when sending a 400 status code, causing code to continue executing and crashing on double response.",
    bad: {
      title: "Missing return in validation check",
      code: `app.post('/tasks', (req, res) => {\n  if (!req.body?.title) {\n    res.status(400).json({ error: 'Missing title' });\n    // Bug: Missing return! Execution continues below!\n  }\n  res.status(201).json({ success: true });\n});`,
      explanation:
        "Execution continues after res.status(400), leading to 'Cannot set headers after they are sent to the client'.",
    },
    good: {
      title: "Immediate return on error",
      code: `app.post('/tasks', (req, res) => {\n  if (!req.body?.title) {\n    return res.status(400).json({ error: 'Missing title' });\n  }\n  return res.status(201).json({ success: true });\n});`,
      explanation:
        "Using return guarantees that subsequent lines in the handler are skipped on error.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test manual payload validation:",
    starterCode: `function validateTask(body) {\n  const title = body?.title;\n  if (typeof title !== 'string' || title.trim() === '') {\n    return { valid: false, error: 'A task title is required' };\n  }\n  return { valid: true, sanitizedTitle: title.trim() };\n}\n\nconsole.log(validateTask({ title: "   " }));\nconsole.log(validateTask({ title: "Build Express App" }));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A client sends `{ \"title\": \"   \" }` to a task creation route. Should your API accept it?",
      options: [
        "No. Trimming the text leaves an empty string, so the API should return a validation error.",
        "Yes, spaces are valid letters in database storage.",
        "Yes, the server should generate a random title automatically.",
        "No, it should shut down the server immediately.",
      ],
      correctIndex: 0,
      explanation:
        "Trimming removes all whitespace, revealing that no actual content was provided. The server should return a 400 Bad Request error.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Never Trust Input",
        desc: "All client data must be validated on the server, even if the frontend performs client-side checks.",
      },
      {
        title: "Trim Strings",
        desc: "Clean inputs and check for whitespace-only submissions using .trim().",
      },
      {
        title: "400 Bad Request",
        desc: "Inform the client cleanly when payload expectations are not met.",
      },
    ],
  },
};
