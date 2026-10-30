import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp07ReadingARequestBodyContent: StandardLessonContent = {
  slug: "exp07-reading-a-request-body",
  code: "EXP-07",
  title: "Reading a Request Body",
  subtitle: "When a client sends data in a POST or PATCH request, parse JSON with express.json() to read req.body.",
  difficulty: "Moderate",
  scenario: {
    question: "req.body.name is undefined. What should you check?",
    answer: "Check that express.json() is registered before the route, that the client sends valid JSON with the right content type, and that the body actually includes name.",
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
    title: "Reading a Request Body",
    bigPicture:
      "When a client sends data in a POST or PATCH request, the data is often in the request body. For JSON, add `express.json()` before the routes that need it.",
    codeSnippet: `app.use(express.json());

app.post('/users', (req, res) => {
  const name = req.body?.name;
  res.status(201).json({ name });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Register express.json()",
        desc: "`app.use(express.json())` adds middleware that reads supported JSON request bodies.",
      },
      {
        title: "2. Client sends payload",
        desc: 'The client sends JSON, for example `{ "name": "Ava" }`.',
      },
      {
        title: "3. Parse into req.body",
        desc: "Express parses it and places the result in `req.body`.",
      },
      {
        title: "4. Read properties",
        desc: "The route reads `req.body.name`.",
      },
    ],
  },
  part2: {
    title: "Parsing vs Validation & Express 5 Behavior",
    intro:
      "Parsing is not the same as validation. A client can send missing or incorrect values, so check the body before using it. In Express 5, `req.body` can be `undefined` if no body was parsed.",
    rule: {
      title: "Body Parsing Ordering Rule",
      content:
        "`app.use(express.json())` must be registered before your route handlers. If registered after, incoming request streams will not be parsed and `req.body` will remain undefined.",
    },
    cards: [
      {
        number: "01",
        tag: "MIDDLEWARE",
        title: "express.json()",
        description:
          "Buffers incoming stream chunks and parses application/json payloads into JavaScript objects.",
        color: "purple",
      },
      {
        number: "02",
        tag: "EXPRESS 5",
        title: "Express 5 req.body",
        description:
          "In Express 5, `req.body` can be `undefined` if no body was parsed (unlike Express 4 defaulting to `{}`).",
        color: "cyan",
      },
      {
        number: "03",
        tag: "VALIDATION",
        title: "Check Before Use",
        description:
          "Parsing turns JSON text into an object; you must still validate that required properties exist.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & Missing Body Troubleshooting",
    intro: "Troubleshooting undefined properties on incoming request bodies:",
    points: [
      {
        title: "Registration Order",
        content:
          "Confirm `app.use(express.json())` appears higher up in your file before any `app.post()` or `app.patch()` route definitions.",
      },
      {
        title: "Client Content-Type Header",
        content:
          "The client must send the header `Content-Type: application/json`. Without this header, `express.json()` skips the request.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Registering `express.json()` after route definitions, leaving `req.body` undefined inside handlers.",
    bad: {
      title: "Registering express.json() Too Late",
      code: `app.post('/users', (req, res) => {\n  // Bug: req.body is undefined because express.json hasn't run yet!\n  res.json({ name: req.body.name });\n});\n\napp.use(express.json()); // Registered too late!`,
      explanation:
        "Express executes middleware in registration order; routes defined before express.json() never receive parsed bodies.",
    },
    good: {
      title: "Registering Middleware Before Routes",
      code: `app.use(express.json());\n\napp.post('/users', (req, res) => {\n  const name = req.body?.name;\n  res.status(201).json({ name });\n});`,
      explanation:
        "Placing express.json() first ensures all subsequent routes receive parsed JSON payloads.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate JSON parsing and payload validation:",
    starterCode: `function handleCreateUser(body) {\n  if (!body || typeof body.name !== 'string') {\n    return { status: 400, error: "Name is required" };\n  }\n  return { status: 201, user: { id: 1, name: body.name.trim() } };\n}\n\nconsole.log("Valid body:", handleCreateUser({ name: "Ava" }));\nconsole.log("Missing body:", handleCreateUser(undefined));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "req.body.name is undefined in a POST route. What should you check?",
      options: [
        "Check that express.json() is registered before the route, that the client sends valid JSON with the right content type, and that the body actually includes name.",
        "Change the HTTP method from POST to GET.",
        "Delete the express.json() middleware.",
        "Restart Node.js and change the port number.",
      ],
      correctIndex: 0,
      explanation:
        "Verify `express.json()` is registered before the route, the client sends `Content-Type: application/json`, and the submitted body contains the `name` field.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Request Body",
        desc: "POST and PATCH requests carry data in the body.",
      },
      {
        title: "express.json()",
        desc: "Add express.json() before routes to parse incoming JSON payloads into req.body.",
      },
      {
        title: "Express 5 Note",
        desc: "In Express 5, req.body can be undefined if no body was parsed; always validate before using.",
      },
    ],
  },
};
