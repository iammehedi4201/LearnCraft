import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node14UnderstandHttpRequestsAndResponsesContent: StandardLessonContent = {
  slug: "node14-understand-http-requests-and-responses",
  code: "NODE-14",
  title: "Understand HTTP Requests and Responses",
  subtitle: "HTTP enables clients and servers to exchange requests and responses with status codes, headers, and bodies.",
  difficulty: "Moderate",
  scenario: {
    question: "A browser sends a request, but the server never finishes its response. What can happen?",
    answer: "The browser may keep waiting. Make sure each request path eventually sends or ends a response, including error paths.",
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
    title: "Understand HTTP Requests and Responses",
    bigPicture:
      "HTTP is the common way that clients and servers exchange web requests and responses. A request asks for something or sends data. A response returns a status code, headers, and sometimes a body.\n\nCommon status codes include `200` (success), `201` (created), `400` (bad request), `401` (not authenticated), `403` (not allowed), `404` (not found), and `500` (server error).",
    codeSnippet: `import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  response.end("Hello from the server");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. createServer()",
        desc: "`createServer()` creates an HTTP server.",
      },
      {
        title: "2. Request callback",
        desc: "The callback runs when a request reaches the server.",
      },
      {
        title: "3. writeHead()",
        desc: "`writeHead()` sends the status code and content type.",
      },
      {
        title: "4. end()",
        desc: "`end()` sends the response body and finishes the response.",
      },
      {
        title: "5. listen(3000)",
        desc: "`listen()` starts listening on port `3000`.",
      },
    ],
  },
  part2: {
    title: "Status Codes & Server Framework Scope",
    intro:
      "This is a small example using Node's built-in HTTP module. Frameworks such as Express and NestJS provide higher-level ways to organize server routes. Those frameworks should have their own lessons.",
    rule: {
      title: "Response Finalization Rule",
      content:
        "Every code branch in a server request handler must conclude with a response (e.g. `response.end()` or `response.send()`). If an error branch fails to close the response, clients hang until connection timeout.",
    },
    cards: [
      {
        number: "01",
        tag: "STATUS CODES",
        title: "Semantic Statuses",
        description:
          "200 (Success), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error).",
        color: "emerald",
      },
      {
        number: "02",
        tag: "HEADERS",
        title: "HTTP Headers",
        description:
          "Transmit metadata like `Content-Type: application/json` or authorization tokens.",
        color: "purple",
      },
      {
        number: "03",
        tag: "CORE HTTP",
        title: "Built-in node:http",
        description:
          "The foundational HTTP engine that powers higher-level backend frameworks like Express and Fastify.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Scenario & Hanging Request Prevention",
    intro: "Ensuring all request and error paths finalize gracefully:",
    points: [
      {
        title: "Client Timeout Prevention",
        content:
          "If an exception occurs and your handler does not call `response.end()`, the browser continues waiting indefinitely until timing out.",
      },
      {
        title: "Guaranteed Cleanup",
        content:
          "Always ensure error catch blocks return an appropriate status (like 500) and finish the response.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Failing to call `response.end()` on error paths leaves client connections hanging indefinitely.",
    bad: {
      title: "Hanging on Errors",
      code: `const server = createServer(async (req, res) => {\n  try {\n    const data = await loadData();\n    res.end(data);\n  } catch (err) {\n    // Bug: Never calls res.end()!\n    console.error(err);\n  }\n});`,
      explanation:
        "When an error occurs, the browser stays spinning until browser socket timeout.",
    },
    good: {
      title: "Always Finalizing Response",
      code: `const server = createServer(async (req, res) => {\n  try {\n    const data = await loadData();\n    res.end(data);\n  } catch (err) {\n    res.writeHead(500, { "Content-Type": "text/plain" });\n    res.end("Internal Server Error");\n  }\n});`,
      explanation:
        "Every path sends headers and calls res.end() to conclude the HTTP transaction.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated HTTP response payload generation:",
    starterCode: `const mockResponse = {\n  statusCode: 200,\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ message: "Hello from the server", uptime: 42 })\n};\n\nconsole.log(\`HTTP/\${mockResponse.statusCode}\`);\nconsole.log("Headers:", mockResponse.headers);\nconsole.log("Payload:", mockResponse.body);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A browser sends a request, but the server never finishes its response. What can happen?",
      options: [
        "The browser may keep waiting. Make sure each request path eventually sends or ends a response, including error paths.",
        "The browser automatically guesses what the server wanted to reply.",
        "Node.js closes all other open browser tabs.",
        "The server deletes the requested resource automatically.",
      ],
      correctIndex: 0,
      explanation:
        "The browser will hang waiting for a response until a timeout occurs. Ensure all request branches (including errors) call response.end().",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "HTTP Exchange",
        desc: "Clients send requests; servers send status codes, headers, and response bodies.",
      },
      {
        title: "Status Codes",
        desc: "200 (success), 201 (created), 400 (bad request), 404 (not found), 500 (server error).",
      },
      {
        title: "Complete Responses",
        desc: "Make sure each request path eventually sends or ends a response, including error paths.",
      },
    ],
  },
};
