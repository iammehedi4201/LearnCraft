import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node15MakeAnHttpRequestWithFetchContent: StandardLessonContent = {
  slug: "node15-make-an-http-request-with-fetch",
  code: "NODE-15",
  title: "Make an HTTP Request with fetch",
  subtitle: "The built-in fetch API lets your Node.js application request data from external APIs without third-party packages.",
  difficulty: "Moderate",
  scenario: {
    question: "Your fetch() call returns a 404, but your catch block does not run. Why might that happen?",
    answer: "fetch() normally resolves for HTTP error statuses such as 404. Check response.ok or response.status and handle unsuccessful responses yourself.",
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
    title: "Make an HTTP Request with fetch",
    bigPicture:
      "Node.js provides `fetch()` in modern versions. It lets your server request data from another service without needing a separate HTTP client package for basic requests.",
    codeSnippet: `const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

if (!response.ok) {
  throw new Error(\`Request failed: \${response.status}\`);
}

const post = await response.json();
console.log(post.title);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. fetch() request",
        desc: "`fetch()` sends the request and returns a Promise for the response.",
      },
      {
        title: "2. Check response.ok",
        desc: "`response.ok` checks whether the HTTP status is in the successful range. `fetch()` does not automatically throw just because the server returns `404` or `500`.",
      },
      {
        title: "3. response.json()",
        desc: "`response.json()` reads and parses the response body.",
      },
      {
        title: "4. Print output",
        desc: "The code prints the post's title.",
      },
    ],
  },
  part2: {
    title: "External Dependencies & Status Validation",
    intro:
      "In production code, also handle network errors and invalid response data. External services can be slow, unavailable, or return data that differs from what you expected.",
    rule: {
      title: "Fetch Error Resolution Rule",
      content:
        "`fetch()` only rejects on network failures (like DNS lookup failure or loss of connectivity). It resolves normally for 4xx and 5xx HTTP responses. Always verify `response.ok` before parsing the response body.",
    },
    cards: [
      {
        number: "01",
        tag: "BUILT-IN",
        title: "Global fetch()",
        description:
          "Available natively in modern Node.js runtimes without needing third-party libraries like axios.",
        color: "cyan",
      },
      {
        number: "02",
        tag: "STATUS CHECK",
        title: "response.ok",
        description:
          "Boolean indicating whether HTTP status is in the 200–299 range.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "EXTERNAL I/O",
        title: "Network Resilience",
        description:
          "Always handle timeouts, unexpected JSON shapes, and offline service outages gracefully.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & HTTP Error Statuses",
    intro: "Why 404 and 500 responses do not trigger catch blocks in fetch:",
    points: [
      {
        title: "HTTP Status vs Network Failure",
        content:
          "A 404 Not Found response is still a successful HTTP transaction between client and server. Therefore, `fetch()` fulfills its Promise with the response object.",
      },
      {
        title: "Explicit Error Checking",
        content:
          "You must manually inspect `response.ok` or `response.status` to throw or handle client and server errors.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Assuming `fetch()` rejects on 404 or 500 errors and parsing invalid HTML error pages as JSON.",
    bad: {
      title: "Assuming 404 Throws Automatically",
      code: `try {\n  const res = await fetch("https://api.example.com/missing");\n  // Bug: 404 does NOT jump to catch!\n  const data = await res.json();\n} catch (err) {\n  // Only runs on network/DNS failure\n}`,
      explanation:
        "404 responses proceed directly to res.json(), which throws a SyntaxError if an HTML error page is returned.",
    },
    good: {
      title: "Verifying response.ok Explicitly",
      code: `const res = await fetch("https://api.example.com/missing");\nif (!res.ok) {\n  throw new Error(\`HTTP \${res.status}: Failed to fetch data\`);\n}\nconst data = await res.json();`,
      explanation:
        "Explicitly checking response.ok protects your JSON parser from invalid responses.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Simulate status validation logic for HTTP responses:",
    starterCode: `function simulateFetch(statusCode) {\n  const isOk = statusCode >= 200 && statusCode < 300;\n  if (!isOk) {\n    throw new Error(\`Request failed with status \${statusCode}\`);\n  }\n  return { title: "Node.js Built-in Fetch Guide" };\n}\n\ntry {\n  console.log("Success test:", simulateFetch(200));\n  simulateFetch(404);\n} catch (err) {\n  console.error("Caught error:", err.message);\n}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your fetch() call returns a 404, but your catch block does not run. Why might that happen?",
      options: [
        "fetch() normally resolves for HTTP error statuses such as 404. Check response.ok or response.status and handle unsuccessful responses yourself.",
        "fetch() only works with status 200 and ignores all other responses.",
        "The browser cached the 404 error so Node.js skipped JavaScript execution.",
        "You forgot to set 'type': 'module' in package.json.",
      ],
      correctIndex: 0,
      explanation:
        "fetch() resolves successfully for HTTP error codes like 404 and 500. It only rejects on actual network or connection failures.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Native fetch",
        desc: "Modern Node.js includes fetch() natively for outgoing HTTP requests without third-party packages.",
      },
      {
        title: "Check response.ok",
        desc: "fetch() does not throw on 404 or 500; always inspect response.ok or response.status.",
      },
      {
        title: "Network Resilience",
        desc: "Handle network failures, timeouts, and unexpected data formats in production code.",
      },
    ],
  },
};
