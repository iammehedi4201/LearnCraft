import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp01WhatIsExpressContent: StandardLessonContent = {
  slug: "exp01-what-is-express",
  code: "EXP-01",
  title: "What Is Express.js?",
  subtitle: "Express.js is a small framework for Node.js that makes it easier to build web servers and APIs.",
  difficulty: "Easy",
  scenario: {
    question: "You open your browser at your server's home URL, but you want it to show a welcome message. What part of this example handles that?",
    answer: "The app.get('/') route handles the request, and res.send() sends the welcome message.",
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
    title: "What Is Express.js?",
    bigPicture:
      "Express.js is a small framework for Node.js that makes it easier to build web servers and APIs. It helps you decide what your server should do when a request arrives.",
    codeSnippet: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Create application",
        desc: "`express()` creates an Express application.",
      },
      {
        title: "2. Define GET route",
        desc: "`app.get('/')` says what to do when someone sends a GET request to `/`.",
      },
      {
        title: "3. Send response",
        desc: "`res.send()` sends a response back to the visitor.",
      },
      {
        title: "4. Start server",
        desc: "`app.listen(3000)` starts the server on port 3000.",
      },
    ],
  },
  part2: {
    title: "Why Express Matters",
    intro:
      "Express gives your backend a clear, declarative way to receive requests and send responses without manually parsing raw Node.js streams for basic routing.",
    rule: {
      title: "Core Purpose Rule",
      content:
        "Express gives your backend a clear way to receive requests and send responses, structuring route handling and middleware into clean, readable handlers.",
    },
    cards: [
      {
        number: "01",
        tag: "FRAMEWORK",
        title: "Node.js Web Layer",
        description:
          "Express wraps Node's native HTTP server with intuitive routing, request parsing, and response helpers.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ROUTING",
        title: "Declarative Routes",
        description:
          "Easily bind HTTP methods (GET, POST, etc.) and URL paths directly to handler callbacks.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RESPONSES",
        title: "Response Helpers",
        description:
          "Methods like `res.send()` and `res.json()` format data and end responses automatically.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Routing",
    intro: "Understanding how Express processes incoming requests to your server's root URL:",
    points: [
      {
        title: "Matching the Path",
        content:
          "When a visitor opens `http://localhost:3000/`, Express matches the HTTP method (`GET`) and path (`/`) to the registered `app.get('/', ...)` handler.",
      },
      {
        title: "Completing the Exchange",
        content:
          "Inside the handler, calling `res.send('Hello from my server!')` returns the greeting to the client and finishes the HTTP response cycle.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Creating an Express app and defining routes but forgetting to call `app.listen()`, leaving the server unreachable.",
    bad: {
      title: "Forgetting app.listen()",
      code: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello!');\n});\n// Server never binds to a port and exits immediately!`,
      explanation:
        "Without app.listen(port), the Node process finishes executing the script and immediately closes.",
    },
    good: {
      title: "Binding to a Port with app.listen()",
      code: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello!');\n});\n\napp.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});`,
      explanation:
        "app.listen() keeps the process active and listens for incoming network connections.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate an Express route handler and response dispatch:",
    starterCode: `// Simulating Express route handling\nfunction handleGetHome(req, res) {\n  return res.send('Hello from my server!');\n}\n\nconst mockRes = {\n  send: (msg) => console.log('Response dispatched:', msg)\n};\n\nhandleGetHome({}, mockRes);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You open your browser at your server's home URL, but you want it to show a welcome message. What part of the Express setup handles that?",
      options: [
        "The app.get('/') route handles the request, and res.send() sends the welcome message.",
        "The package.json file displays the welcome message automatically.",
        "Node.js requires an HTML file to display any server response.",
        "The app.listen() method sends the welcome string to the browser.",
      ],
      correctIndex: 0,
      explanation:
        "The app.get('/') route handler receives the incoming GET request for the root path, and res.send() writes and completes the response.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Express Framework",
        desc: "A small framework for Node.js that makes it easier to build web servers and APIs.",
      },
      {
        title: "Request Decisions",
        desc: "Helps you decide what your server should do when a client request arrives.",
      },
      {
        title: "Clear Communication",
        desc: "Express gives your backend a clear way to receive requests and send responses.",
      },
    ],
  },
};
