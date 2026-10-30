import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp20TestingExpressRoutesContent: StandardLessonContent = {
  slug: "exp20-testing-express-routes",
  code: "EXP-20",
  title: "Testing Express Routes",
  subtitle: "Automate endpoint verification with Supertest and test runners to catch regressions before deployment.",
  difficulty: "Moderate",
  scenario: {
    question: "Your route worked when you tried it manually, but later a code change broke it. How can a test help?",
    answer: "The test makes the request again and checks the response. It can quickly show that the route no longer behaves as expected.",
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
    title: "Testing Express Routes",
    bigPicture:
      "Tests help check that your API returns the expected status codes and data. For example, a test can confirm that `GET /health` returns a success response.\n\nA typical Express test uses a test framework and an HTTP testing library such as Supertest. These packages must be installed and configured in the project.",
    codeSnippet: `const request = require('supertest');
const app = require('./app');

test('GET /health returns ok', async () => {
  const response = await request(app).get('/health');

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ status: 'ok' });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Import Supertest and App",
        desc: "Supertest wraps the Express `app` object without needing a live network port.",
      },
      {
        title: "2. Dispatch virtual HTTP request",
        desc: "`await request(app).get('/health')` simulates a real HTTP GET request.",
      },
      {
        title: "3. Assert status & body",
        desc: "Confirm `response.status === 200` and `response.body` matches the expected JSON object.",
      },
    ],
  },
  part2: {
    title: "Why Automated API Testing Matters",
    intro:
      "This is an example for Jest and Supertest. It assumes the project exports the Express app from `app.js` and defines `GET /health`. Keep `app.listen()` in a separate entry file so tests can import the app without starting a separate server.\n\nManual testing with Postman or the browser is slow, prone to human oversight, and cannot be run in automated CI pipelines.",
    rule: {
      title: "Decouple app.js from server.js Rule",
      content:
        "Define and export `app` from `app.js`. Call `app.listen()` inside a separate `server.js`. This allows test runners to import `app` without binding to a physical port or leaving open handles.",
    },
    cards: [
      {
        number: "01",
        tag: "SUPERTEST",
        title: "In-Memory Requests",
        description:
          "Sends simulated HTTP requests directly into the Express app instance without spinning up a live network listener.",
        color: "purple",
      },
      {
        number: "02",
        tag: "REGRESSIONS",
        title: "Fast Regression Check",
        description:
          "Catch accidental breaking changes to status codes, payloads, or authentication guards before deployment.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ARCHITECTURE",
        title: "app.js Separation",
        description:
          "Separating app configuration from `app.listen()` keeps the codebase testable and cloud-ready.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Fast Feedback Loops",
    intro: "Catching bugs early with automated testing suites:",
    points: [
      {
        title: "Preventing Regressions",
        content:
          "When refactoring middleware or upgrading packages, running `npm test` instantly verifies that every endpoint still returns the expected contracts.",
      },
      {
        title: "Testing Error Statuses",
        content:
          "Write tests verifying that missing fields return 400, unauthorized access returns 401/403, and invalid IDs return 404.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Calling `app.listen()` directly in `app.js`, which causes port collision errors (`EADDRINUSE`) during parallel test runs.",
    bad: {
      title: "Calling listen() inside exported app file",
      code: `// app.js\nconst express = require('express');\nconst app = express();\n\napp.get('/health', (req, res) => res.json({ status: 'ok' }));\napp.listen(4000); // Bad: Test runner starts live server on 4000!\nmodule.exports = app;`,
      explanation:
        "Every test file importing app attempts to bind port 4000, causing tests to hang or crash.",
    },
    good: {
      title: "Separate app and server entrypoints",
      code: `// app.js\nconst express = require('express');\nconst app = express();\napp.get('/health', (req, res) => res.json({ status: 'ok' }));\nmodule.exports = app;\n\n// server.js\nconst app = require('./app');\napp.listen(process.env.PORT || 4000);`,
      explanation:
        "Tests import app directly without starting a network port; server.js boots the real listener.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate a mock Supertest assertion:",
    starterCode: `async function mockSupertest(appHandler, route) {\n  const req = { url: route };\n  let status = 200;\n  let body = null;\n  const res = {\n    status: (s) => { status = s; return res; },\n    json: (data) => { body = data; }\n  };\n  await appHandler(req, res);\n  return { status, body };\n}\n\nasync function handler(req, res) {\n  res.status(200).json({ status: "ok" });\n}\n\nmockSupertest(handler, '/health').then(res => {\n  console.log("Status:", res.status, "Body:", res.body);\n});`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your route worked when you tried it manually, but later a code change broke it. How can a test help?",
      options: [
        "The test makes the request again and checks the response. It can quickly show that the route no longer behaves as expected.",
        "Tests automatically fix and rewrite broken JavaScript code.",
        "Tests delete the broken route so users don't notice it.",
        "Tests prevent developers from editing files.",
      ],
      correctIndex: 0,
      explanation:
        "Automated tests re-execute requests against the code and verify assertions, immediately alerting you when a contract is broken.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Supertest",
        desc: "Library for testing HTTP endpoints against Express apps without physical port binding.",
      },
      {
        title: "Separate Listener",
        desc: "Export `app` from app.js; call `app.listen()` only in server.js.",
      },
      {
        title: "Contract Verification",
        desc: "Assert HTTP status code, headers, and JSON structure on every critical path.",
      },
    ],
  },
};
