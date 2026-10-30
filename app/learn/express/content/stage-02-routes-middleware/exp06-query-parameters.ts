import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp06QueryParametersContent: StandardLessonContent = {
  slug: "exp06-query-parameters",
  code: "EXP-06",
  title: "Query Parameters",
  subtitle: "Query parameters are values added after ? in a URL, commonly used for search, filtering, sorting, or pagination.",
  difficulty: "Easy",
  scenario: {
    question: "You want /products?search=pen to search products. Which request property should you check?",
    answer: "Check req.query.search, then validate and use the search text.",
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
    title: "Query Parameters",
    bigPicture:
      "Query parameters are values added after `?` in a URL. They are often used for search, filtering, sorting, or pagination.\n\nFor `/products?category=books`, Express reads the query value from `req.query.category`.",
    codeSnippet: `app.get('/products', (req, res) => {
  const category = req.query.category;
  res.json({ category });
});`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Query in URL",
        desc: "The client sends the query in the URL.",
      },
      {
        title: "2. Automatic parsing",
        desc: "Express parses the query string.",
      },
      {
        title: "3. Access via req.query",
        desc: "Your handler reads the value from `req.query`.",
      },
      {
        title: "4. Validate value",
        desc: "Your code should validate it before trusting it.",
      },
    ],
  },
  part2: {
    title: "Optional Filters & Query Parsing",
    intro:
      "Query values are not automatically safe numbers or valid choices. Their exact shape can depend on the query parser and input.",
    rule: {
      title: "Query Validation Rule",
      content:
        "Query parameters are optional and client-controlled. Always check for undefined, trim text strings, and validate numerical limits (like `page` or `limit`) before passing them to database queries.",
    },
    cards: [
      {
        number: "01",
        tag: "URL SYNTAX",
        title: "URL ?key=value",
        color: "cyan",
        description: "Appended after the path to provide optional filtering or pagination options.",
      },
      {
        number: "02",
        tag: "PARSING",
        title: "req.query Object",
        color: "purple",
        description: "Express populates key-value pairs parsed from the URL query string automatically.",
      },
      {
        number: "03",
        tag: "OPTIONAL",
        title: "Handles Missing Keys",
        color: "emerald",
        description: "If the parameter is omitted in the URL, req.query[key] evaluates to undefined.",
      },
    ],
  },
  part3: {
    title: "Scenario & Search Filtering",
    intro: "Reading query strings for search and filtering features:",
    points: [
      {
        title: "Checking req.query.search",
        content:
          "When a visitor requests `/products?search=pen`, `req.query.search` evaluates to `'pen'`.",
      },
      {
        title: "Validation Before Use",
        content:
          "Always trim whitespace and sanitize query parameters before running searches or matching records in memory.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Assuming query parameters exist without checking for `undefined`, causing runtime crashes on `.trim()` or `.toLowerCase()`.",
    bad: {
      title: "Calling Methods on Undefined Query",
      code: `app.get('/search', (req, res) => {\n  // Crashes if user visits /search without ?q=!\n  const query = req.query.q.trim();\n  res.json({ query });\n});`,
      explanation:
        "TypeError: Cannot read properties of undefined (reading 'trim').",
    },
    good: {
      title: "Defensive Query Checking",
      code: `app.get('/search', (req, res) => {\n  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';\n  res.json({ search: q });\n});`,
      explanation:
        "Safely handles missing query parameters and provides clean default values.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated query string parsing:",
    starterCode: `function handleSearch(query) {\n  const term = typeof query.search === 'string' ? query.search.trim() : null;\n  if (!term) {\n    return { results: [], message: "No search term provided" };\n  }\n  return { results: [\`Product matching '\${term}'\`] };\n}\n\nconsole.log("With search:", handleSearch({ search: "pen" }));\nconsole.log("Empty search:", handleSearch({}));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You want /products?search=pen to search products. Which request property should you check?",
      options: [
        "Check req.query.search, then validate and use the search text.",
        "Check req.params.search.",
        "Check req.body.search.",
        "Check req.headers['search'].",
      ],
      correctIndex: 0,
      explanation:
        "URL query parameters (everything after `?`) are parsed by Express onto the `req.query` object.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Query Strings",
        desc: "Values added after ? in a URL, used for search, filtering, and pagination.",
      },
      {
        title: "req.query",
        desc: "Express parses the query string into the req.query object.",
      },
      {
        title: "Validation Needed",
        desc: "Query values are not automatically safe numbers or valid choices. Validate them before use.",
      },
    ],
  },
};
