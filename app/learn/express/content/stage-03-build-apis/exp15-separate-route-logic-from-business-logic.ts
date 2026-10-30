import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp15SeparateRouteLogicFromBusinessLogicContent: StandardLessonContent = {
  slug: "exp15-separate-route-logic-from-business-logic",
  code: "EXP-15",
  title: "Separate Route Logic From Business Logic",
  subtitle: "Decouple HTTP protocol mechanics (params, headers, status) from domain business logic for modularity and unit testability.",
  difficulty: "Moderate",
  scenario: {
    question: "The same pricing calculation is needed by three routes. Should you copy it three times?",
    answer: "Usually not. Put the calculation in a reusable function and call it from each route.",
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
    title: "Separate Route Logic From Business Logic",
    bigPicture:
      "A route handler receives the request and sends the response. A separate function or service can handle the work the application needs to do. Keeping these responsibilities separate can make code easier to test and change.",
    codeSnippet: `async function getWelcomeMessage(name) {
  return \`Welcome, \${name}\`;
}

app.get('/welcome/:name', async (req, res) => {
  const message = await getWelcomeMessage(req.params.name);
  res.json({ message });
});`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Extract input",
        desc: "The route reads the name parameter from the URL (`req.params.name`).",
      },
      {
        title: "2. Delegate domain work",
        desc: "It calls `getWelcomeMessage()` to produce the message independently of HTTP.",
      },
      {
        title: "3. Format and dispatch",
        desc: "It sends the result as JSON (`res.json({ message })`).",
      },
    ],
  },
  part2: {
    title: "Why Layered Separation Matters",
    intro:
      "For a tiny app, a separate service is not always necessary. Split code when the logic is reused or makes the route hard to understand.\n\nRoute handlers should focus on HTTP: parsing params, validating headers, and returning status codes. Business calculations belong in pure functions or services that do not depend on req or res.",
    rule: {
      title: "Transport Independence Rule",
      content:
        "Business logic functions should accept raw domain parameters (strings, numbers, objects) and return pure results or throw domain errors. They should never touch req or res directly.",
    },
    cards: [
      {
        number: "01",
        tag: "TESTABILITY",
        title: "Easy Unit Testing",
        description:
          "Services can be tested in isolation with plain inputs, without mocking Express req and res objects.",
        color: "purple",
      },
      {
        number: "02",
        tag: "REUSABILITY",
        title: "Shared Calculations",
        description:
          "Domain logic can be called from multiple routes, CLI scripts, or background workers without code duplication.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "MAINTENANCE",
        title: "Clean Handlers",
        description:
          "Route handlers remain thin orchestrators: unpack request, call service, return response.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Architecture",
    intro: "Applying separation of concerns in practice:",
    points: [
      {
        title: "Shared Pricing Calculation",
        content:
          "If cart checkout, invoice generation, and quotes all need the same pricing formula, placing it in a separate helper prevents drift and subtle bugs across endpoints.",
      },
      {
        title: "When to Split",
        content:
          "Start simple in smaller apps, but extract logic once a handler grows past basic validation or logic needs to be shared.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Passing `req` and `res` deep into database or calculation functions, tightly coupling domain logic to the HTTP transport layer.",
    bad: {
      title: "Passing req and res into service logic",
      code: `function calculateTotal(req, res) {\n  // Bad: couples domain logic directly to Express objects!\n  const price = req.body.price;\n  res.json({ total: price * 1.15 });\n}`,
      explanation:
        "Now calculateTotal cannot be tested without mock request/response objects, nor reused in CLI scripts.",
    },
    good: {
      title: "Pure Domain Function",
      code: `function calculateTotal(price) {\n  return price * 1.15;\n}\n\napp.post('/checkout', (req, res) => {\n  const total = calculateTotal(req.body.price);\n  res.json({ total });\n});`,
      explanation:
        "The calculation is transport-agnostic and trivial to unit test.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Compare pure domain logic and route orchestration:",
    starterCode: `// Business service
function calculateDiscount(price, userLevel) {
  if (userLevel === 'vip') return price * 0.8;
  return price;
}

// Route simulation
const mockReq = { body: { price: 100, userLevel: 'vip' } };
const finalPrice = calculateDiscount(mockReq.body.price, mockReq.body.userLevel);
console.log("Calculated discounted price:", finalPrice);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "The same pricing calculation is needed by three routes. Should you copy it three times?",
      options: [
        "Usually not. Put the calculation in a reusable function and call it from each route.",
        "Yes, copying code three times makes the server three times faster.",
        "No, duplicate it 10 times to be safe.",
        "You must store all calculations in the browser cookies.",
      ],
      correctIndex: 0,
      explanation:
        "Extracting shared calculations into reusable functions eliminates duplication, prevents discrepancies, and simplifies testing.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Thin Handlers",
        desc: "Routes unpack HTTP requests and format responses; services handle the real business work.",
      },
      {
        title: "Decoupled Logic",
        desc: "Pure business functions can be tested without mocking HTTP request and response objects.",
      },
      {
        title: "DRY Principle",
        desc: "Don't Repeat Yourself: centralize business calculations to keep your application coherent.",
      },
    ],
  },
};
