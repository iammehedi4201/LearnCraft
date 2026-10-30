import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp14AsyncRouteHandlersContent: StandardLessonContent = {
  slug: "exp14-async-route-handlers",
  code: "EXP-14",
  title: "Async Route Handlers",
  subtitle: "Asynchronous handlers use async/await for clean asynchronous flows, with Express 5 catching rejections automatically.",
  difficulty: "Moderate",
  scenario: {
    question: "getReport() rejects with an error in Express 5. Where can the error go?",
    answer: "Express forwards it to the error-handling middleware, where the app can log it and return an appropriate response.",
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
    title: "Async Route Handlers",
    bigPicture:
      "A route often waits for another operation, such as reading data from a service. An `async` function lets you use `await` to write that flow clearly.",
    codeSnippet: `app.get('/report', async (req, res) => {
  const report = await getReport();
  res.json(report);
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Request dispatch",
        desc: "The client requests `/report`.",
      },
      {
        title: "2. Async service call",
        desc: "The route calls `getReport()`.",
      },
      {
        title: "3. Promise resolution",
        desc: "`await` waits for the Promise to settle successfully.",
      },
      {
        title: "4. JSON delivery",
        desc: "The route sends the result as JSON.",
      },
    ],
  },
  part2: {
    title: "Why Async Handlers Matter & Express 5 Benefits",
    intro:
      "This example assumes `getReport()` is a function defined elsewhere that returns a Promise.\n\nWith Express 5, a thrown error or rejected Promise from this async handler is forwarded to error-handling middleware. The error handler must still be set up. Be aware of this version difference if maintaining an Express 4 project.",
    rule: {
      title: "Express 5 Async Propagation Rule",
      content:
        "In Express 5, returning a rejected Promise from an async handler automatically triggers next(err). In Express 4, unhandled rejections would hang the request or crash Node unless wrapped in try/catch or helper utilities.",
    },
    cards: [
      {
        number: "01",
        tag: "READABILITY",
        title: "Linear Syntax",
        description:
          "Write asynchronous database calls and external fetch operations sequentially without nested callback hell.",
        color: "purple",
      },
      {
        number: "02",
        tag: "AUTO FORWARD",
        title: "Express 5 Rejections",
        description:
          "Rejected promises automatically route to error middleware without requiring boilerplate try/catch blocks in every route.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "LEGACY NOTE",
        title: "Express 4 Differences",
        description:
          "In older Express 4 projects, remember to wrap async handlers or use express-async-handler packages.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Edge Cases",
    intro: "Observing asynchronous execution and rejection propagation:",
    points: [
      {
        title: "Promise Rejection Handling",
        content:
          "When `getReport()` rejects in Express 5, the rejected promise is intercepted by the Express router engine and handed directly to `(err, req, res, next)` error middleware.",
      },
      {
        title: "Error Middleware Requirement",
        content:
          "Even though Express 5 forwards the error automatically, you still need to register an error-handling middleware to format the response and log the event.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting `await` on an asynchronous operation, causing the route to send an empty Promise object or undefined before data resolves.",
    bad: {
      title: "Missing await on Promise",
      code: `app.get('/report', async (req, res) => {\n  const report = getReport(); // Bug: Returns Promise, not resolved value\n  res.json(report); // Sends empty object {}\n});`,
      explanation:
        "Without await, `report` is a pending Promise object which serializes into `{}` in JSON.",
    },
    good: {
      title: "Properly Awaiting Async Calls",
      code: `app.get('/report', async (req, res) => {\n  const report = await getReport();\n  res.json(report);\n});`,
      explanation:
        "The await keyword pauses execution until the promise fulfills, delivering the resolved data.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate an async route handler:",
    starterCode: `async function fakeFetchReport() {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ generatedAt: new Date().toISOString(), total: 42 }), 100);\n  });\n}\n\nasync function handleRoute() {\n  console.log("Fetching report...");\n  const data = await fakeFetchReport();\n  console.log("Report received:", data);\n}\n\nhandleRoute();`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "`getReport()` rejects with an error inside an async route handler in Express 5. Where does the error go?",
      options: [
        "Express forwards it to the error-handling middleware, where the app can log it and return an appropriate response.",
        "The computer shuts down immediately.",
        "The browser reloads the webpage 50 times in a loop.",
        "The response is automatically converted into an audio file.",
      ],
      correctIndex: 0,
      explanation:
        "In Express 5, unhandled rejections from async handlers are forwarded automatically to the registered error-handling middleware.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "async / await",
        desc: "Provides clear, readable code for asynchronous service calls.",
      },
      {
        title: "Express 5 Support",
        desc: "Automatically intercepts rejected promises and forwards them to error middleware.",
      },
      {
        title: "Express 4 Awareness",
        desc: "Express 4 requires explicit try/catch blocks or wrappers around async handlers.",
      },
    ],
  },
};
