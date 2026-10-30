import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp13HandlingErrorsContent: StandardLessonContent = {
  slug: "exp13-handling-errors",
  code: "EXP-13",
  title: "Handling Errors",
  subtitle: "Centralized 4-parameter error middleware intercepts unhandled exceptions and standardizes safe responses.",
  difficulty: "Difficult",
  scenario: {
    question: "An API fails and returns a database stack trace to the browser. What should you change?",
    answer: "Log the detailed error on the server, but send the client a safe, general message that does not expose internal details.",
  },
  interviewQuestion: {
    question: "What is error-handling middleware?",
    answer: "It is middleware with four parameters that receives errors and sends a consistent response or passes the error along.",
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
    title: "Handling Errors",
    bigPicture:
      "Errors happen when something goes wrong, such as invalid input or a failed operation. Express lets you send errors to a central error-handling middleware so routes do not each need their own full error response logic.",
    codeSnippet: `app.get('/example', (req, res, next) => {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Error occurrence",
        desc: "The route encounters an error during processing.",
      },
      {
        title: "2. next(error) invocation",
        desc: "`next(error)` passes it directly to error-handling middleware.",
      },
      {
        title: "3. Server-side logging",
        desc: "The error middleware logs the details for the server team (`console.error(err)`).",
      },
      {
        title: "4. Safe client response",
        desc: "It sends a simple error response to the client (`500 Internal server error`).",
      },
    ],
  },
  part2: {
    title: "Why Centralized Error Handling Matters & Express 5 Behavior",
    intro:
      "Error-handling middleware has four parameters: `(err, req, res, next)` and should be registered after routes. Do not send private stack traces to users in production.\n\nIn Express 5, errors thrown by or rejected from async route handlers are forwarded automatically. Older Express 4 projects often need explicit `.catch(next)` or a wrapper for async handlers.",
    rule: {
      title: "Four-Parameter Signature Rule",
      content:
        "Express detects error middleware strictly by function arity: it must accept exactly 4 arguments `(err, req, res, next)`. If you omit `next` (declaring 3 args), Express treats it as regular middleware and misses the error.",
    },
    cards: [
      {
        number: "01",
        tag: "ARITY 4",
        title: "Four Arguments Required",
        description:
          "Express inspects `fn.length === 4` to identify error handlers. Keep `(err, req, res, next)` intact.",
        color: "purple",
      },
      {
        number: "02",
        tag: "EXPRESS 5",
        title: "Automatic Async Routing",
        description:
          "Express 5 automatically catches unhandled Promise rejections and thrown errors from async handlers.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PLACEMENT",
        title: "Placed at the End",
        description:
          "Register error middleware AFTER all route handlers and standard middleware in your server pipeline.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Handling failures safely and acing architectural questions:",
    points: [
      {
        title: "Leaking Sensitive Stack Traces",
        content:
          "Never send internal error messages or stack traces to clients in production. Doing so exposes file paths, database schemas, and credential hints to attackers.",
      },
      {
        title: "What is Error-Handling Middleware?",
        content:
          "Error-handling middleware is a specialized Express function with four parameters `(err, req, res, next)` that catches all forward errors to provide unified logging and safe responses.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Registering error middleware before routes or defining it with only 3 parameters `(req, res, next)`.",
    bad: {
      title: "Three Parameters Error Middleware",
      code: `// Bug: Only 3 parameters! Express treats this as regular middleware!
app.use((err, req, res) => {
  res.status(500).json({ error: 'Failed' });
});`,
      explanation:
        "Without the 4th `next` parameter, Express treats the handler as normal middleware and won't invoke it when next(err) is triggered.",
    },
    good: {
      title: "Exact 4-Argument Signature",
      code: `// Correct: Exactly 4 parameters registered AFTER all routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});`,
      explanation:
        "Express matches error-handling middleware strictly when function.length is 4.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate centralized error forwarding:",
    starterCode: `const express = require('express');
const app = express();

app.get('/fail', (req, res, next) => {
  next(new Error("Database connection timed out"));
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Caught error:", err.message);
  res.status(500).json({ error: 'Internal server error' });
});

console.log("Registered error-handling middleware with (err, req, res, next).");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "An API fails and returns a database stack trace to the browser. What should you change?",
      options: [
        "Log the detailed error on the server, but send the client a safe, general message that does not expose internal details.",
        "Change the database password to something shorter.",
        "Turn off the database completely so it cannot fail.",
        "Return the full server source code to the browser.",
      ],
      correctIndex: 0,
      explanation:
        "Detailed error information and stack traces must be logged privately on the server to prevent exposing system vulnerabilities to external clients.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Four Parameters",
        desc: "Error handlers require (err, req, res, next) to be recognized by Express.",
      },
      {
        title: "Register Last",
        desc: "Place error middleware after all route definitions.",
      },
      {
        title: "Safe Client Responses",
        desc: "Never leak internal stack traces or database errors in production responses.",
      },
    ],
  },
};
