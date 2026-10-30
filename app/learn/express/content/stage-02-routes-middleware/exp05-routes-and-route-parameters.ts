import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp05RoutesAndRouteParametersContent: StandardLessonContent = {
  slug: "exp05-routes-and-route-parameters",
  code: "EXP-05",
  title: "Routes and Route Parameters",
  subtitle: "A route connects an HTTP method and URL pattern to handler code, and route parameters carry dynamic values.",
  difficulty: "Moderate",
  scenario: {
    question: "Your route is /orders/:id, and the client requests /orders/15. Where do you read 15?",
    answer: "Use req.params.id. The value is a string, so validate it before using it as a number.",
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
    title: "Routes and Route Parameters",
    bigPicture:
      "A **route** connects an HTTP method and a URL pattern to code that handles the request. A route parameter lets the URL carry a value, such as an ID.\n\nIf the client requests `/users/42`, `req.params.id` is the string `'42'`.",
    codeSnippet: `app.get('/users/:id', (req, res) => {
  res.json({ userId: req.params.id });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Parameter token",
        desc: "`:id` marks a named part of the URL.",
      },
      {
        title: "2. req.params extraction",
        desc: "Express puts the matched value in `req.params.id`.",
      },
      {
        title: "3. Response dispatch",
        desc: "The handler sends that value back as JSON.",
      },
    ],
  },
  part2: {
    title: "Type Conversion & Route Parameter Rules",
    intro:
      "Route parameters are strings. If you need a number, check and convert the value carefully instead of assuming it is valid.",
    rule: {
      title: "Parameter Type Safety Rule",
      content:
        "Values in `req.params` are always strings. When working with database IDs or numeric indices, validate with `Number()` or integer regex checks before using them in calculations or queries.",
    },
    cards: [
      {
        number: "01",
        tag: "URL PATTERN",
        title: "Named Segments (:id)",
        description:
          "The colon prefix (`:paramName`) defines a dynamic capturing slot in the route path.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ALWAYS STRINGS",
        title: "req.params Parsing",
        description:
          "Express extracts all captured URL segments as string properties on `req.params`.",
        color: "amber",
      },
      {
        number: "03",
        tag: "VALIDATION",
        title: "Safe Conversion",
        description:
          "Check `Number.isInteger(Number(id))` and handle non-numeric inputs with 400 Bad Request.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Parameter Reading",
    intro: "Reading and converting route parameters from incoming URLs:",
    points: [
      {
        title: "Extracting from req.params",
        content:
          "For `/orders/:id` and a request to `/orders/15`, `req.params.id` holds the string `'15'`.",
      },
      {
        title: "Defensive Validation",
        content:
          "A malicious or malformed client might call `/orders/abc`. Checking `isNaN(Number(req.params.id))` protects your database queries from invalid lookups.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Assuming `req.params.id` is already a number and causing strict equality comparisons (`===`) to fail.",
    bad: {
      title: "Comparing String to Number with ===",
      code: `const users = [{ id: 42, name: 'Ava' }];\n\napp.get('/users/:id', (req, res) => {\n  // Bug: '42' === 42 is false!\n  const user = users.find(u => u.id === req.params.id);\n  res.json(user); // Returns undefined!\n});`,
      explanation:
        "req.params.id is the string '42', which fails strict equality against number 42.",
    },
    good: {
      title: "Converting and Validating Number",
      code: `app.get('/users/:id', (req, res) => {\n  const id = Number(req.params.id);\n  if (!Number.isInteger(id)) {\n    return res.status(400).json({ error: 'Invalid user ID' });\n  }\n  const user = users.find(u => u.id === id);\n  if (!user) return res.status(404).json({ error: 'User not found' });\n  res.json(user);\n});`,
      explanation:
        "Converting to number allows reliable equality checks and catches malformed IDs early.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate parameter extraction and conversion:",
    starterCode: `function handleUserParam(paramId) {\n  const parsedId = Number(paramId);\n  if (Number.isNaN(parsedId)) {\n    return { status: 400, error: "ID must be a number" };\n  }\n  return { status: 200, userId: parsedId };\n}\n\nconsole.log("Valid ID /users/42:", handleUserParam("42"));\nconsole.log("Invalid ID /users/abc:", handleUserParam("abc"));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your route is /orders/:id, and the client requests /orders/15. Where do you read 15?",
      options: [
        "Use req.params.id. The value is a string, so validate it before using it as a number.",
        "Use req.body.id.",
        "Use req.query.id.",
        "Use req.headers['order-id'].",
      ],
      correctIndex: 0,
      explanation:
        "Route parameters are accessible via `req.params.<name>`. In this case, `req.params.id` holds the string `'15'`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Route Definition",
        desc: "A route connects an HTTP method and URL pattern to handler code.",
      },
      {
        title: ":param Syntax",
        desc: "Use ':paramName' in the path to capture dynamic URL segments.",
      },
      {
        title: "String Values",
        desc: "Route parameters are strings. Check and convert values carefully before using as numbers.",
      },
    ],
  },
};
