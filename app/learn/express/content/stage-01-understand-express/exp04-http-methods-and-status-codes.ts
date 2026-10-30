import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp04HttpMethodsAndStatusCodesContent: StandardLessonContent = {
  slug: "exp04-http-methods-and-status-codes",
  code: "EXP-04",
  title: "HTTP Methods and Status Codes",
  subtitle: "HTTP methods describe what action the client is asking for, while status codes describe the result of the request.",
  difficulty: "Moderate",
  scenario: {
    question: "A client asks for product ID 99, but that product does not exist. Which status code is usually appropriate?",
    answer: "404 Not Found, because the requested product was not found.",
  },
  interviewQuestion: {
    question: "What is the difference between a request method and a status code?",
    answer: "The method describes what the client wants to do. The status code describes what happened to the request.",
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
    title: "HTTP Methods and Status Codes",
    bigPicture:
      "HTTP methods describe the kind of action a client is asking for. Status codes describe the result.\n\n- `GET`: read data.\n- `POST`: create something or submit data.\n- `PUT` or `PATCH`: update data.\n- `DELETE`: remove data.\n- `200`: success.\n- `201`: something was created.\n- `400`: the request is invalid.\n- `404`: the requested item was not found.\n- `500`: an unexpected server problem occurred.",
    codeSnippet: `app.get('/products', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Notebook' }]);
});

app.post('/products', (req, res) => {
  res.status(201).json({ message: 'Product created' });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. GET read route",
        desc: "`app.get('/products')` defines reading a collection of products.",
      },
      {
        title: "2. 200 OK status",
        desc: "`res.status(200)` indicates the list was retrieved successfully.",
      },
      {
        title: "3. POST create route",
        desc: "`app.post('/products')` handles requests to submit or create new products.",
      },
      {
        title: "4. 201 Created status",
        desc: "`res.status(201)` signals that a new resource was created successfully.",
      },
    ],
  },
  part2: {
    title: "Methods vs Status Codes & Validation Scope",
    intro:
      "These examples show the response shape; a real POST route must validate the submitted data and save it before claiming that the product was created.",
    rule: {
      title: "Semantic Status Code Rule",
      content:
        "Always pair the action with accurate status codes: 200 for successful reads/updates, 201 for creations, 400 for bad input, 404 for missing items, and 500 for server errors.",
    },
    cards: [
      {
        number: "01",
        tag: "CLIENT INTENT",
        title: "HTTP Methods",
        description:
          "GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).",
        color: "purple",
      },
      {
        number: "02",
        tag: "SERVER RESULT",
        title: "Status Codes",
        description:
          "2xx (Success), 4xx (Client errors like 400 Bad Request or 404 Not Found), 5xx (Server errors).",
        color: "emerald",
      },
      {
        number: "03",
        tag: "VALIDATION",
        title: "Validation Before Success",
        description:
          "Never return 201 Created until incoming payload data is thoroughly validated and saved.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Understanding standard status codes and explaining core HTTP concepts:",
    points: [
      {
        title: "Handling Missing Resources",
        content:
          "When an ID lookup fails to find a record, returning `404 Not Found` tells the client that the specific URL resource does not exist.",
      },
      {
        title: "Method vs Status Code",
        content:
          "The method describes what the client wants to do (e.g. GET products). The status code describes what happened to the request (e.g. 200 OK or 404 Not Found).",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Returning HTTP status 200 OK for errors or missing records, confusing client API consumers.",
    bad: {
      title: "Returning 200 OK for Not Found",
      code: `app.get('/products/:id', (req, res) => {\n  const product = findProduct(req.params.id);\n  if (!product) {\n    // Anti-pattern: 200 OK with error body!\n    return res.status(200).json({ error: 'Product not found' });\n  }\n  res.json(product);\n});`,
      explanation:
        "Frontend libraries like React Query or fetch assume status 200 means success.",
    },
    good: {
      title: "Returning Semantic 404 Status",
      code: `app.get('/products/:id', (req, res) => {\n  const product = findProduct(req.params.id);\n  if (!product) {\n    return res.status(404).json({ error: 'Product not found' });\n  }\n  res.json(product);\n});`,
      explanation:
        "Using 404 correctly triggers error handling in client-side applications.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate status codes and method responses:",
    starterCode: `function getProduct(id) {\n  const products = [{ id: 1, name: "Notebook" }];\n  const item = products.find(p => p.id === Number(id));\n  \n  if (!item) {\n    return { status: 404, body: { error: "Product not found" } };\n  }\n  return { status: 200, body: item };\n}\n\nconsole.log("ID 1 query:", getProduct(1));\nconsole.log("ID 99 query:", getProduct(99));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A client asks for product ID 99, but that product does not exist. Which status code is usually appropriate?",
      options: [
        "404 Not Found, because the requested product was not found.",
        "200 OK with an empty array.",
        "500 Internal Server Error.",
        "201 Created.",
      ],
      correctIndex: 0,
      explanation:
        "404 Not Found is the standard HTTP status code indicating that the server cannot find the requested resource.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "HTTP Methods",
        desc: "GET (read), POST (create/submit), PUT/PATCH (update), DELETE (remove).",
      },
      {
        title: "Status Codes",
        desc: "200 (success), 201 (created), 400 (invalid request), 404 (not found), 500 (server error).",
      },
      {
        title: "Method vs Status",
        desc: "The method describes what the client wants to do; the status code describes what happened.",
      },
    ],
  },
};
