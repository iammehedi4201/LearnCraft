import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp22BuildASmallRestApiContent: StandardLessonContent = {
  slug: "exp22-build-a-small-rest-api",
  code: "EXP-22",
  title: "Build a Small REST API",
  subtitle: "Bring together routing, JSON body parsing, input validation, and HTTP status codes into a functioning REST API.",
  difficulty: "Moderate",
  scenario: {
    question: "A request to create a task has no title. What should happen?",
    answer: "The API should return 400 Bad Request and a helpful error message, without adding an invalid task.",
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
    title: "Build a Small REST API",
    bigPicture:
      "Use the main Express concepts together by building a small task API. This example uses an in-memory array, so tasks disappear when the server restarts. It is for learning route behavior, not for production data storage.",
    codeSnippet: `const express = require('express');
const app = express();
app.use(express.json());

const tasks = [{ id: 1, title: 'Learn Express' }];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const title = req.body?.title;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A title is required' });
  }

  const task = { id: tasks.length + 1, title: title.trim() };
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(4000, () => console.log('API running on port 4000'));`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Body parser middleware",
        desc: "`express.json()` reads JSON request bodies.",
      },
      {
        title: "2. GET /tasks list",
        desc: "`GET /tasks` returns the current list of tasks as JSON.",
      },
      {
        title: "3. Input validation",
        desc: "`POST /tasks` reads and validates the title string.",
      },
      {
        title: "4. Error branch",
        desc: "If the title is invalid, the route returns `400` and stops with `return`.",
      },
      {
        title: "5. Creation & 201 response",
        desc: "If valid, the route creates a task, adds it to the array, and returns `201 Created`.",
      },
    ],
  },
  part2: {
    title: "Why Integrative Capstone Practice Matters",
    intro:
      "This mini-project brings routes, requests, responses, validation, and status codes together. A real app should use reliable storage and handle IDs and errors more carefully.\n\nSeeing how body parsers, validation, in-memory arrays, and status codes fit together solidifies your fundamental Express.js workflow.",
    rule: {
      title: "Full HTTP Lifecycle Rule",
      content:
        "Every endpoint must gracefully handle both the happy path (returning 200/201 with data) and the error path (returning 400/404/500 with descriptive error messages).",
    },
    cards: [
      {
        number: "01",
        tag: "COLLECTION",
        title: "GET Collection",
        description:
          "Lists existing resources as a JSON array with status 200 OK.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CREATION",
        title: "POST Resource",
        description:
          "Validates payload, creates the entity, and replies with status 201 Created.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "IN-MEMORY CAVEAT",
        title: "Ephemeral State",
        description:
          "In-memory arrays reset whenever the server restarts; production apps connect to databases.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Edge Cases",
    intro: "Validating API behavior against boundary conditions:",
    points: [
      {
        title: "Missing or Empty Title",
        content:
          "If a POST request contains no title or a whitespace-only string, the API immediately halts and returns `400 Bad Request`, keeping the data store pristine.",
      },
      {
        title: "Status Code Precision",
        content:
          "Differentiating between 200 (OK for reading) and 201 (Created for new resource addition) ensures standards-compliant client interactions.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Returning status 200 for resource creation instead of 201, or failing to trim strings before checking length.",
    bad: {
      title: "Returning 200 on Creation without Validation",
      code: `app.post('/tasks', (req, res) => {\n  // Bad: No validation and uses 200 OK instead of 201 Created\n  tasks.push(req.body);\n  res.status(200).json(tasks);\n});`,
      explanation:
        "Client cannot verify that creation succeeded, and empty objects corrupt the tasks list.",
    },
    good: {
      title: "Strict Validation & 201 Created",
      code: `app.post('/tasks', (req, res) => {\n  const title = req.body?.title;\n  if (typeof title !== 'string' || title.trim() === '') {\n    return res.status(400).json({ error: 'A title is required' });\n  }\n  const task = { id: tasks.length + 1, title: title.trim() };\n  tasks.push(task);\n  return res.status(201).json(task);\n});`,
      explanation:
        "Protects the data store, sends the newly created item, and communicates 201 Created.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Step through a simulated task API:",
    starterCode: `const tasks = [{ id: 1, title: "Learn Express" }];\n\nfunction handleCreate(body) {\n  const title = body?.title;\n  if (typeof title !== 'string' || title.trim() === '') {\n    return { status: 400, error: 'A title is required' };\n  }\n  const task = { id: tasks.length + 1, title: title.trim() };\n  tasks.push(task);\n  return { status: 201, data: task };\n}\n\nconsole.log("Invalid attempt:", handleCreate({ title: "   " }));\nconsole.log("Valid attempt:", handleCreate({ title: "Write tests" }));\nconsole.log("Tasks in store:", tasks);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A client sends a POST /tasks request with no title in the body. What should happen?",
      options: [
        "The API should return 400 Bad Request and a helpful error message, without adding an invalid task.",
        "The server should crash and delete all existing tasks.",
        "The server should create a task named 'Untitled' without informing the client.",
        "The server should return 500 Internal Server Error.",
      ],
      correctIndex: 0,
      explanation:
        "When client input fails validation, the server should reject the request with 400 Bad Request and leave the data store unmodified.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "REST Architecture",
        desc: "GET /tasks to read, POST /tasks to create with 201 Created.",
      },
      {
        title: "Strict Validation",
        desc: "Verify types and non-empty values before mutating in-memory or database state.",
      },
      {
        title: "Complete Pipeline",
        desc: "Combines body parsing, status codes, routing, and error prevention seamlessly.",
      },
    ],
  },
};
