import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp21LoggingAndDebuggingRequestsContent: StandardLessonContent = {
  slug: "exp21-logging-and-debugging-requests",
  code: "EXP-21",
  title: "Logging and Debugging Requests",
  subtitle: "Structured request logging provides observability into incoming traffic and errors while sanitizing sensitive credentials.",
  difficulty: "Moderate",
  scenario: {
    question: "Users report an error, but you cannot tell which route they called. What could help?",
    answer: "Add request logging and safe error logging so you can follow the request and find where the problem happens. Do not log secrets.",
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
    title: "Logging and Debugging Requests",
    bigPicture:
      "When an API behaves incorrectly, logs help you see which request arrived and where a problem happened. Log useful information, but avoid logging passwords, access tokens, or private user data.",
    codeSnippet: `app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Global request interception",
        desc: "Every request that reaches this middleware is logged.",
      },
      {
        title: "2. Method and URL capture",
        desc: "The log records the method and URL (`GET /users`, `POST /tasks`).",
      },
      {
        title: "3. Flow continuation",
        desc: "`next()` allows request handling to continue down the stack.",
      },
    ],
  },
  part2: {
    title: "Why Observability & Safe Logging Matter",
    intro:
      "In a larger app, use a suitable logging library and structured logs. This example is a starting point, not a complete production logging setup.\n\nWithout logs, servers are black boxes. But careless logging can leak personally identifiable information (PII) or secrets into centralized log aggregators.",
    rule: {
      title: "No Secrets in Logs Rule",
      content:
        "Never log raw request bodies that might contain passwords, credit card details, or authorization tokens. Redact sensitive keys before writing to console or disk.",
    },
    cards: [
      {
        number: "01",
        tag: "VISIBILITY",
        title: "Traffic Tracking",
        description:
          "Trace user actions and route hits in real time to understand traffic patterns and debugging leads.",
        color: "purple",
      },
      {
        number: "02",
        tag: "MORGAN & PINO",
        title: "Structured Logging",
        description:
          "Production apps use libraries like Morgan for HTTP logging or Pino/Winston for JSON structured logs.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRIVACY",
        title: "Sanitization",
        description:
          "Strip `password`, `token`, and `cookie` fields to comply with privacy laws (GDPR, HIPAA).",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Root Cause Analysis",
    intro: "Investigating reported bugs with logging:",
    points: [
      {
        title: "Missing Route Tracing",
        content:
          "When users report vague 500 errors, having logs showing `POST /api/checkout 500 [24ms]` immediately isolates the faulty endpoint and timing.",
      },
      {
        title: "Correlating Request IDs",
        content:
          "Assigning a unique UUID to `req.id` in middleware and logging it allows linking client errors to server logs across distributed microservices.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Logging entire uninspected request bodies containing raw passwords or secret API keys.",
    bad: {
      title: "Dumping Entire Request Body",
      code: `app.use((req, res, next) => {\n  // DANGEROUS: Logs passwords and tokens in plaintext!\n  console.log(req.method, req.url, req.body);\n  next();\n});`,
      explanation:
        "If a user logs in, their plaintext password is saved to permanent server log files.",
    },
    good: {
      title: "Selective & Redacted Logging",
      code: `app.use((req, res, next) => {\n  console.log(\`\${req.method} \${req.url}\`);\n  next();\n});`,
      explanation:
        "Logs the HTTP method and route path without exposing sensitive payload bodies.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate a safe request logger with redacting:",
    starterCode: `function logRequest(method, url, body) {\n  const sanitized = { ...body };\n  if (sanitized.password) sanitized.password = '***REDACTED***';\n  console.log(\`[\${new Date().toISOString()}] \${method} \${url}\`, sanitized);\n}\n\nlogRequest('POST', '/login', { username: 'ava', password: 'mySecretPassword123' });`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Users report an error, but you cannot tell which route they called. What could help?",
      options: [
        "Add request logging and safe error logging so you can follow the request and find where the problem happens. Do not log secrets.",
        "Ask users to send you their computer password.",
        "Disable all error handling so the server ignores the bug.",
        "Change all URLs to random numbers.",
      ],
      correctIndex: 0,
      explanation:
        "Request and error logging provide visibility into which endpoint failed and under what conditions, without endangering sensitive data.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Request Logging",
        desc: "Records HTTP method, route, status code, and duration for every request.",
      },
      {
        title: "Safe Logging",
        desc: "Never log passwords, bearer tokens, or sensitive personal data.",
      },
      {
        title: "Observability",
        desc: "Essential for debugging intermittent issues and tracking system health in production.",
      },
    ],
  },
};
