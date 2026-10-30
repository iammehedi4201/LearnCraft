import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp16CorsContent: StandardLessonContent = {
  slug: "exp16-cors",
  code: "EXP-16",
  title: "CORS",
  subtitle: "Cross-Origin Resource Sharing controls browser access to cross-origin API responses via HTTP headers.",
  difficulty: "Moderate",
  scenario: {
    question: "You set CORS, but someone can still call the endpoint with an API tool. Is that a CORS failure?",
    answer: "No. CORS is mainly enforced by browsers. Use authentication and authorization when an endpoint needs access control.",
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
    title: "CORS",
    bigPicture:
      "CORS is a browser rule that controls whether a page from one origin can read a response from another origin. An origin is based on the protocol, hostname, and port.\n\nIf your frontend runs at `http://localhost:3000` and your API runs at `http://localhost:4000`, they have different origins.",
    codeSnippet: `const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Install package",
        desc: "This example uses the `cors` package, which must be installed.",
      },
      {
        title: "2. Configure allowed origin",
        desc: "It allows browser code from the listed origin (`http://localhost:3000`) to read responses.",
      },
      {
        title: "3. Browser compliance",
        desc: "Express sets CORS headers (`Access-Control-Allow-Origin`) subject to the configured rules.",
      },
    ],
  },
  part2: {
    title: "Why CORS is Not Authentication",
    intro:
      "CORS is **not authentication**. It does not stop tools such as `curl` or other servers from sending requests to your API.\n\nBrowsers enforce the Same-Origin Policy for user safety. When frontend scripts make requests across origins, the browser checks the API's CORS response headers before allowing JavaScript to access the data.",
    rule: {
      title: "Browser-Enforced Boundary Rule",
      content:
        "CORS headers tell web browsers whether script running on one origin may read data from another. Server-to-server calls, Postman, and curl do not enforce CORS restrictions.",
    },
    cards: [
      {
        number: "01",
        tag: "ORIGIN DEFINITION",
        title: "Protocol + Host + Port",
        description:
          "Two URLs share an origin only if their protocol (http/https), domain, and port number match exactly.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CLIENT RESTRICTION",
        title: "Browser Sandbox",
        description:
          "CORS prevents malicious sites from fetching your API data using a victim's active browser session.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SECURITY LIMIT",
        title: "Not Auth Protection",
        description:
          "CORS does not block unauthorized CLI or server requests; endpoints must implement proper authentication.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Edge Cases",
    intro: "Understanding CORS boundaries in production:",
    points: [
      {
        title: "CORS vs API Tools",
        content:
          "Testing an endpoint with Postman or curl succeeds even if CORS is restricted to localhost:3000, because non-browser clients do not honor CORS browser restrictions.",
      },
      {
        title: "Preflight Requests (OPTIONS)",
        content:
          "Browsers send an automatic OPTIONS preflight request before complex requests (like those with custom headers or JSON POSTs) to verify permissions.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using `cors({ origin: '*' })` on sensitive private endpoints assuming it provides security, or confusing CORS errors with server crashes.",
    bad: {
      title: "Allowing Wildcard Origin on Authenticated Routes",
      code: `// Potentially risky: Wildcard origin on routes using cookies/credentials
app.use(cors({ origin: '*' }));`,
      explanation:
        "Wildcard origins allow any untrusted third-party website to make requests to your API.",
    },
    good: {
      title: "Explicit Trusted Origin List",
      code: `const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  credentials: true
}));`,
      explanation:
        "Restricting origins to trusted domains prevents untrusted web apps from accessing responses.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Examine CORS origin matching logic:",
    starterCode: `function checkCors(origin, allowedOrigins) {\n  if (allowedOrigins.includes(origin)) {\n    return { allow: true, header: origin };\n  }\n  return { allow: false, header: null };\n}\n\nconst allowed = ['http://localhost:3000', 'https://myproductionapp.com'];\nconsole.log("From local frontend:", checkCors('http://localhost:3000', allowed));\nconsole.log("From unauthorized site:", checkCors('http://evil-site.com', allowed));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You set CORS, but someone can still call the endpoint with an API tool (curl/Postman). Is that a CORS failure?",
      options: [
        "No. CORS is mainly enforced by browsers. Use authentication and authorization when an endpoint needs access control.",
        "Yes, the cors package is broken and must be uninstalled.",
        "Yes, npm has stopped working properly.",
        "No, but curl will self-destruct if CORS is on.",
      ],
      correctIndex: 0,
      explanation:
        "CORS is a security mechanism enforced by web browsers, not a firewall or authentication barrier for CLI tools.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Browser Boundary",
        desc: "CORS allows browsers to relax the Same-Origin Policy safely for specified origins.",
      },
      {
        title: "cors Middleware",
        desc: "Use the `cors` package to easily add necessary headers and manage preflight OPTIONS.",
      },
      {
        title: "Not Authentication",
        desc: "Protect sensitive endpoints with tokens, sessions, and authorization checks.",
      },
    ],
  },
};
