import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp03RequestsAndResponsesContent: StandardLessonContent = {
  slug: "exp03-requests-and-responses",
  code: "EXP-03",
  title: "Requests and Responses",
  subtitle: "In Express, req contains details about the request, and res is used to send the response back to the client.",
  difficulty: "Moderate",
  scenario: {
    question: "Your route sends a response, then tries to send another one. Why can this fail?",
    answer: "The response has already been sent. A route should normally send one final response, or pass control to the next handler when appropriate.",
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
    title: "Requests and Responses",
    bigPicture:
      "A **request** is what a client sends to your server. A **response** is what your server sends back.\n\nIn Express, `req` contains details about the request, and `res` is used to send the response.",
    codeSnippet: `app.get('/hello', (req, res) => {
  res.status(200).send('Hello!');
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Client request",
        desc: "A client sends a GET request to `/hello`.",
      },
      {
        title: "2. Route match",
        desc: "Express finds this route.",
      },
      {
        title: "3. Status code",
        desc: "`res.status(200)` sets the HTTP status to `200`, which means the request succeeded.",
      },
      {
        title: "4. Send and finish",
        desc: "`res.send('Hello!')` sends the response. This finishes the response for this route.",
      },
    ],
  },
  part2: {
    title: "Single Response Cycle Rule",
    intro:
      "Do not send multiple separate responses for one request. For example, calling `res.send()` twice can cause an error.",
    rule: {
      title: "Single Final Response Rule",
      content:
        "An HTTP request can only receive one response. Once headers and body are transmitted by `res.send()`, attempting to send another response throws `ERR_HTTP_HEADERS_SENT`.",
    },
    cards: [
      {
        number: "01",
        tag: "INCOMING",
        title: "The req Object",
        description:
          "Contains client headers, URL paths, query parameters, cookies, and parsed payload bodies.",
        color: "cyan",
      },
      {
        number: "02",
        tag: "OUTGOING",
        title: "The res Object",
        description:
          "Provides methods to set HTTP status codes, headers, and transmit data back to the client.",
        color: "purple",
      },
      {
        number: "03",
        tag: "LIFECYCLE",
        title: "Finishing the Cycle",
        description:
          "Methods like `res.send()`, `res.json()`, and `res.end()` finalize the HTTP socket exchange.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Response Lifecycle",
    intro: "Why attempting to send multiple responses for a single request fails:",
    points: [
      {
        title: "Headers Already Sent",
        content:
          "Once a response method executes, the HTTP headers and status code are committed to the network stream. A second `res.send()` call violates HTTP protocol constraints.",
      },
      {
        title: "Early Return Pattern",
        content:
          "When sending a response early (such as returning on a validation failure), use `return res.status(400).send(...)` to stop further route execution.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Executing code that sends two responses for one request, triggering `ERR_HTTP_HEADERS_SENT`.",
    bad: {
      title: "Sending Multiple Responses",
      code: `app.get('/user', (req, res) => {\n  if (!req.query.id) {\n    res.status(400).send('Missing ID');\n    // Missing return! Execution continues:\n  }\n  res.send('User data'); // Crashes with ERR_HTTP_HEADERS_SENT\n});`,
      explanation:
        "Failing to return after the first response causes the second response to attempt writing to a closed stream.",
    },
    good: {
      title: "Returning Early on First Response",
      code: `app.get('/user', (req, res) => {\n  if (!req.query.id) {\n    return res.status(400).send('Missing ID');\n  }\n  return res.send('User data');\n});`,
      explanation:
        "Using return stops further execution and guarantees only one response is ever dispatched.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated req and res exchanges:",
    starterCode: `function handleHello(req, res) {\n  res.status(200);\n  res.send('Hello from LearnCraft Express!');\n}\n\nconst mockRes = {\n  status: (code) => { console.log('HTTP Status set to:', code); return mockRes; },\n  send: (body) => console.log('Response body sent:', body)\n};\n\nhandleHello({}, mockRes);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your route sends a response, then tries to send another one. Why can this fail?",
      options: [
        "The response has already been sent. A route should normally send one final response, or pass control to the next handler when appropriate.",
        "Express only supports sending data to one user per day.",
        "The browser requires GET requests to be called three times.",
        "Node.js deletes the route handler after one response.",
      ],
      correctIndex: 0,
      explanation:
        "An HTTP request only accepts a single response. After the response is finished, attempting to send another throws an error.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Request vs Response",
        desc: "A request is what a client sends; a response is what your server sends back.",
      },
      {
        title: "req and res",
        desc: "In Express, req contains request details and res is used to send the response.",
      },
      {
        title: "One Response",
        desc: "Do not send multiple separate responses for one request. Send one final response or use return.",
      },
    ],
  },
};
