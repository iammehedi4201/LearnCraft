import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp11BuildRestStyleRoutesContent: StandardLessonContent = {
  slug: "exp11-build-rest-style-routes",
  code: "EXP-11",
  title: "Build REST-Style Routes",
  subtitle: "REST-style APIs use nouns for resources and standard HTTP methods to express actions predictably.",
  difficulty: "Moderate",
  scenario: {
    question: "You need to change only a task's title. Which method is commonly used?",
    answer: "PATCH /tasks/:id is a common choice for updating part of a resource.",
  },
  interviewQuestion: {
    question: "What makes an API REST-style?",
    answer: "It uses clear resource URLs and standard HTTP methods and status codes in a consistent way. A real API may follow REST principles to different degrees.",
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
    title: "Build REST-Style Routes",
    bigPicture:
      "A REST-style API uses URLs to identify resources and HTTP methods to describe actions. For example, `/tasks` represents tasks, while `/tasks/7` represents one task.",
    codeSnippet: `app.get('/tasks', listTasks);
app.get('/tasks/:id', getTask);
app.post('/tasks', createTask);
app.patch('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. GET /tasks",
        desc: "Use `GET /tasks` to list tasks.",
      },
      {
        title: "2. GET /tasks/:id",
        desc: "Use `GET /tasks/7` to read one task.",
      },
      {
        title: "3. POST /tasks",
        desc: "Use `POST /tasks` to create a task.",
      },
      {
        title: "4. PATCH /tasks/:id",
        desc: "Use `PATCH /tasks/7` to update part of a task.",
      },
      {
        title: "5. DELETE /tasks/:id",
        desc: "Use `DELETE /tasks/7` to delete a task.",
      },
    ],
  },
  part2: {
    title: "Why Consistent REST Design Matters",
    intro:
      "These lines show the route design only; the named handler functions must be defined elsewhere.\n\nA route design should be consistent. Each handler still needs correct validation, status codes, and data storage.",
    rule: {
      title: "Resource Nouns Rule",
      content:
        "Use plural nouns for URL paths (/tasks, not /getTasks or /deleteTask). Let the HTTP verb indicate the operation.",
    },
    cards: [
      {
        number: "01",
        tag: "NOUNS",
        title: "Resource Identifiers",
        description:
          "Endpoints represent collections (`/tasks`) or individual entities (`/tasks/:id`). Avoid putting verbs in URLs.",
        color: "purple",
      },
      {
        number: "02",
        tag: "VERBS",
        title: "HTTP Action Mapping",
        description:
          "GET reads, POST creates, PATCH modifies partially, PUT replaces, and DELETE removes.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "STATUS CODES",
        title: "Standard Feedback",
        description:
          "Pair actions with status codes: 200 for OK, 201 for Created, 204 for No Content on deletion.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Understanding REST principles in production and technical interviews:",
    points: [
      {
        title: "Partial Updates",
        content:
          "When modifying a subset of fields (such as only changing a task's title), `PATCH /tasks/:id` is standard.",
      },
      {
        title: "What Makes an API REST-Style?",
        content:
          "An API is REST-style when it leverages clear resource URLs, standardized HTTP methods, and appropriate status codes in a predictable, consistent manner.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Putting verbs in URL paths such as `/tasks/create` or `/tasks/delete/:id`, violating REST conventions.",
    bad: {
      title: "Verbs in URLs",
      code: `app.get('/tasks/getAll', listTasks);\napp.post('/tasks/createTask', createTask);\napp.post('/tasks/deleteTask/:id', deleteTask);`,
      explanation:
        "Using verbs in routes makes API contracts non-standard, inconsistent, and harder to automate.",
    },
    good: {
      title: "Clean RESTful Routes",
      code: `app.get('/tasks', listTasks);\napp.post('/tasks', createTask);\napp.delete('/tasks/:id', deleteTask);`,
      explanation:
        "Resource is `/tasks`, and the HTTP method specifies what action is performed.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a RESTful route configuration:",
    starterCode: `const express = require('express');\nconst app = express();\n\nconst tasks = [{ id: 1, title: 'Learn Express' }];\n\napp.get('/tasks', (req, res) => res.json(tasks));\napp.get('/tasks/:id', (req, res) => {\n  const task = tasks.find(t => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ error: 'Task not found' });\n  res.json(task);\n});\n\nconsole.log("Configured REST endpoints: GET /tasks and GET /tasks/:id");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You need to change only a task's title. Which method is commonly used?",
      options: [
        "PATCH /tasks/:id is a common choice for updating part of a resource.",
        "POST /tasks/updateTitle with query parameters.",
        "DELETE /tasks/:id followed by GET /tasks.",
        "GET /tasks/edit?newTitle=...",
      ],
      correctIndex: 0,
      explanation:
        "PATCH is the standard HTTP method for partial updates to a resource identified by its unique URL parameter.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Resource-Oriented",
        desc: "Routes point to nouns/resources (/tasks, /users), not actions.",
      },
      {
        title: "HTTP Verbs",
        desc: "GET, POST, PATCH, and DELETE convey intent without changing the resource URI.",
      },
      {
        title: "Idempotency & Semantics",
        desc: "Follow standard semantics for predictable client interactions across services.",
      },
    ],
  },
};
