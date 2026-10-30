import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp10SendingJsonAndChoosingAResponseContent: StandardLessonContent = {
  slug: "exp10-sending-json-and-choosing-a-response",
  code: "EXP-10",
  title: "Sending JSON and Choosing a Response",
  subtitle: "Express res.json() formats and sends JSON data, automatically setting appropriate content-type headers.",
  difficulty: "Easy",
  scenario: {
    question: "Your React app needs a user's name from an API. What should the Express route return?",
    answer: "It can return a JSON object such as { name: 'Ava' } using res.json().",
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
    title: "Sending JSON and Choosing a Response",
    bigPicture:
      "APIs often send JSON because it represents objects and lists in a form clients can use.",
    codeSnippet: `app.get('/profile', (req, res) => {
  res.status(200).json({ name: 'Ava', role: 'learner' });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. HTTP Status Setting",
        desc: "`res.status(200)` sets the HTTP success status code.",
      },
      {
        title: "2. JSON Serialization",
        desc: "`res.json()` serializes JavaScript objects/arrays into JSON strings.",
      },
      {
        title: "3. Chained Execution",
        desc: "You can combine status and response in one chain as shown: `res.status(...).json(...)`.",
      },
    ],
  },
  part2: {
    title: "Why JSON Responses Matter",
    intro:
      "`res.json()` sends a JSON response. `res.status(200)` sets the success status. You can combine the status and response in one chain as shown.",
    rule: {
      title: "Content-Type Header Rule",
      content:
        "res.json() automatically formats the body with JSON.stringify() and sets the header 'Content-Type: application/json; charset=utf-8'.",
    },
    cards: [
      {
        number: "01",
        tag: "SERIALIZATION",
        title: "Auto-Stringify",
        description:
          "Accepts any JSON-compatible JavaScript value (objects, arrays, strings, booleans, numbers) and serializes it safely.",
        color: "purple",
      },
      {
        number: "02",
        tag: "HEADERS",
        title: "Content-Type",
        description:
          "Sets 'Content-Type: application/json', instructing frontend fetch/axios clients to parse it as an object.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "CHAINING",
        title: "Fluent API",
        description:
          "Chain .status(code).json(payload) for clean, readable response dispatching.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Usage",
    intro: "Feeding client-side applications with structured JSON:",
    points: [
      {
        title: "React / Single Page Apps",
        content:
          "When a frontend client requests user profile details, sending `res.json({ name: 'Ava' })` allows the frontend `await res.json()` to consume it directly.",
      },
      {
        title: "Status Code Pairing",
        content:
          "Always pair the status code with the response type: 200 for OK, 201 for Created, 400 for Bad Request, 404 for Not Found.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Sending JSON with `res.send()` as a raw string or manually stringifying with JSON.stringify(), which can misconfigure headers.",
    bad: {
      title: "Manual Stringify",
      code: `app.get('/profile', (req, res) => {\n  // Bad: Manually stringifying with res.send\n  res.send(JSON.stringify({ name: 'Ava' }));\n});`,
      explanation:
        "res.send with a string may set Content-Type to text/html or text/plain depending on options.",
    },
    good: {
      title: "Native res.json()",
      code: `app.get('/profile', (req, res) => {\n  // Good: Automatic serialization and correct headers\n  res.json({ name: 'Ava' });\n});`,
      explanation:
        "res.json handles formatting, headers, and null/undefined values correctly.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test JSON response formatting:",
    starterCode: `const express = require('express');\nconst app = express();\n\napp.get('/profile', (req, res) => {\n  res.status(200).json({ name: 'Ava', role: 'learner' });\n});\n\nconsole.log("Registered GET /profile with res.status(200).json(...)");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your React app needs a user's name from an API. What should the Express route return?",
      options: [
        "It can return a JSON object such as { name: 'Ava' } using res.json().",
        "It should return a binary image file.",
        "It must return an unformatted SQL query.",
        "It should print the user's name to the server terminal only.",
      ],
      correctIndex: 0,
      explanation:
        "Express routes communicate with frontend applications by returning structured JSON data via `res.json()`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "res.json()",
        desc: "Converts JavaScript objects and arrays to JSON and sets application/json headers.",
      },
      {
        title: "res.status()",
        desc: "Sets the HTTP response status code and returns res for chaining.",
      },
      {
        title: "Fluent Chain",
        desc: "Use `res.status(code).json(body)` to cleanly communicate both status and data.",
      },
    ],
  },
};
