import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp08MiddlewareContent: StandardLessonContent = {
  slug: "exp08-middleware",
  code: "EXP-08",
  title: "Middleware",
  subtitle: "Middleware functions run during request handling to do shared work, end the response, or pass control to the next handler.",
  difficulty: "Difficult",
  scenario: {
    question: "You add logging middleware, but requests never reach the route. What might be missing?",
    answer: "The middleware may not call next() or send a response. If it is meant to let the request continue, call next().",
  },
  interviewQuestion: {
    question: "What is middleware in Express?",
    answer: "Middleware is a function that runs during request handling. It can do shared work, end the response, or pass control to the next handler.",
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
    title: "Middleware",
    bigPicture:
      "Middleware is a function that runs while Express handles a request. It can read or change request details, send a response, or pass control to the next middleware or route handler.",
    codeSnippet: `app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Home page');
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Request arrives",
        desc: "A request reaches the server.",
      },
      {
        title: "2. Middleware execution",
        desc: "The middleware logs the method and URL.",
      },
      {
        title: "3. next() handoff",
        desc: "`next()` tells Express to continue to the next matching handler.",
      },
      {
        title: "4. Response dispatch",
        desc: "The route sends the response.",
      },
    ],
  },
  part2: {
    title: "Why Middleware Matters & Execution Order",
    intro:
      "If middleware neither sends a response nor calls `next()`, the request may hang. Middleware order matters: register body parsing before routes that need the body.\n\nMiddleware is used for logging, parsing request bodies, checking authentication, and handling many shared tasks.",
    rule: {
      title: "Handoff or Respond Rule",
      content:
        "Every middleware function must either call `next()` to pass control forward or terminate the cycle by sending a response (`res.send()`). Forgetting both causes the client to hang indefinitely.",
    },
    cards: [
      {
        number: "01",
        tag: "PIPELINE",
        title: "Linear Pipeline",
        description:
          "Requests pass through registered middleware functions in the exact order they are registered via app.use().",
        color: "purple",
      },
      {
        number: "02",
        tag: "SHARED WORK",
        title: "Cross-Cutting Concerns",
        description:
          "Perform logging, body parsing, CORS headers, security headers, and authentication checks centrally.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "CONTROL",
        title: "next() Function",
        description:
          "Invoking next() transfers execution to the next matching middleware or route handler in the stack.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Understanding middleware flow and answering common interview questions:",
    points: [
      {
        title: "Hanging Requests",
        content:
          "If custom middleware executes without calling `next()` or `res.send()`, Express halts the pipeline and leaves the connection open until timeout.",
      },
      {
        title: "What is Middleware?",
        content:
          "Middleware is a function with access to `(req, res, next)`. It can do shared work, mutate request objects, end responses early, or pass control along.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Forgetting to call `next()` in logging or authentication middleware, freezing client requests.",
    bad: {
      title: "Missing next() Call",
      code: `app.use((req, res, next) => {\n  console.log('Incoming request:', req.url);\n  // Bug: Forgot next()! Request hangs forever!\n});\n\napp.get('/', (req, res) => res.send('Home'));`,
      explanation:
        "Without next(), the pipeline stops and the GET / route handler is never reached.",
    },
    good: {
      title: "Always Calling next()",
      code: `app.use((req, res, next) => {\n  console.log('Incoming request:', req.url);\n  next(); // Hands off to next matching handler\n});\n\napp.get('/', (req, res) => res.send('Home'));`,
      explanation:
        "Calling next() allows the request to continue seamlessly down the pipeline.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Step through a simulated middleware chain:",
    starterCode: `const stack = [\n  (req, res, next) => { console.log("1. Logger middleware"); next(); },\n  (req, res, next) => { console.log("2. Auth check"); next(); },\n  (req, res) => { console.log("3. Route handler: Sending response"); }\n];\n\nfunction runPipeline(index = 0) {\n  if (index < stack.length) {\n    stack[index]({}, {}, () => runPipeline(index + 1));\n  }\n}\n\nrunPipeline();`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You add logging middleware, but requests never reach the route handler. What might be missing?",
      options: [
        "The middleware may not call next() or send a response. If it is meant to let the request continue, call next().",
        "The computer firewall blocked the console.log output.",
        "Middleware only runs on Saturdays.",
        "Express requires all middleware to return HTML strings.",
      ],
      correctIndex: 0,
      explanation:
        "Middleware must call `next()` to hand off execution to subsequent route handlers. If next() is missing and no response is sent, the request hangs.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Middleware Function",
        desc: "A function that runs during request handling to perform shared tasks or modify request details.",
      },
      {
        title: "next() Function",
        desc: "Tells Express to continue to the next middleware or route handler.",
      },
      {
        title: "Execution Order",
        desc: "Middleware executes in registration order; register prerequisites (like body parsers) first.",
      },
    ],
  },
};
