import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js27TheFetchApiContent: StandardLessonContent = {
  "slug": "js27-the-fetch-api",
  "code": "JS-27",
  "title": "The fetch API: HTTP Requests & REST APIs",
  "subtitle": "Fetch data from REST APIs using fetch, check HTTP response status, and send JSON payloads with POST.",
  "sections": [
    {
      "id": "part1",
      "label": "HTTP Communication",
      "icon": "🌐",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "fetch Mechanics",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "POST Payloads & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Silent 404/500 Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "fetch Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Connecting to the World",
    "bigPicture": "Modern web applications communicate with servers using HTTP requests. The native `fetch()` API allows you to request data, submit form entries, and communicate with REST backends asynchronously.",
    "analogy": "Think of `fetch()` like sending a postal letter with a return envelope. You send a request to an address (URL), the server inspects it, and returns a package (response).",
    "diagram": "fetch(\"https://api.example.com/users/1\")\n                 |\n                 v (Returns Response object)\n+-------------------------------------------------+\n| Response: status = 200, ok = true               |\n+-------------------------------------------------+\n                 |\n                 v (Unpack body with res.json())\n{ id: 1, name: \"Alex\" }",
    "breakdownTitle": "HTTP Essentials",
    "breakdownItems": [
      {
        "title": "GET Requests",
        "desc": "Retrieve data from a server without modifying anything."
      },
      {
        "title": "POST Requests",
        "desc": "Send data to the server to create a new resource."
      },
      {
        "title": "Two-Step Await",
        "desc": "First await the response headers (`res`), then await the body parsing (`res.json()`)."
      }
    ]
  },
  "part2": {
    "title": "fetch Syntax & Options",
    "intro": "Perform GET requests, check response status, and send POST requests.",
    "cards": [
      {
        "number": "01",
        "tag": "GET",
        "title": "Basic GET Request",
        "description": "Fetch data from an endpoint and parse the JSON payload.",
        "codeSnippet": "async function loadData() {\n  const res = await fetch(\"https://api.example.com/data\");\n  if (!res.ok) throw new Error(\"HTTP error \" + res.status);\n  const data = await res.json();\n  console.log(data);\n}",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "POST",
        "title": "POST Request",
        "description": "Send JSON data with method, headers, and body options.",
        "codeSnippet": "const options = {\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ name: \"Alex\" })\n};\n// fetch(url, options);",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Status",
        "title": "Checking res.ok",
        "description": "Verify the status code is in the 200-299 success range.",
        "codeSnippet": "const res = { ok: true, status: 200 };\nif (res.ok) {\n  console.log(\"Success! HTTP status:\", res.status); // Output: Success! HTTP status: 200\n}",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "The res.ok Rule",
      "content": "Always check `if (!res.ok)` immediately after calling `fetch`. `fetch` does NOT reject on 404 or 500 errors."
    }
  },
  "part3": {
    "title": "Working with APIs & Reading AI Code",
    "intro": "Avoid common misconceptions about fetch error handling.",
    "points": [
      {
        "title": "1. The Silent 404/500 Pitfall",
        "content": "`fetch` only rejects if there is a network connection failure. HTTP 404 (Not Found) or 500 (Server Error) still resolve the Promise!",
        "codeSnippet": "async function getUser(id) {\n  // Simulated 404 response:\n  const res = { ok: false, status: 404 };\n  \n  // Must manually check res.ok:\n  if (!res.ok) {\n    throw new Error(\"API request failed with status: \" + res.status);\n  }\n  return { id };\n}\n\ngetUser(42).catch(err => console.log(\"Caught:\", err.message));\n// Output: Caught: API request failed with status: 404"
      },
      {
        "title": "2. Required Content-Type Header for POST",
        "content": "Servers will reject JSON payloads unless you specify `\"Content-Type\": \"application/json\"` in the request headers.",
        "codeSnippet": "const postConfig = {\n  method: \"POST\",\n  headers: {\n    \"Content-Type\": \"application/json\",\n  },\n  body: JSON.stringify({ title: \"New Task\" }),\n};\nconsole.log(\"Configured header:\", postConfig.headers[\"Content-Type\"]);\n// Output: Configured header: application/json"
      },
      {
        "title": "3. AbortController for Cancellation",
        "content": "Cancel active network requests when a user navigates away using `AbortController`.",
        "codeSnippet": "const controller = new AbortController();\n// Pass signal to fetch: fetch(url, { signal: controller.signal });\ncontroller.abort(); // Cancels the request cleanly\nconsole.log(\"Request aborted:\", controller.signal.aborted); // Output: Request aborted: true"
      }
    ]
  },
  "part4": {
    "title": "Ignoring res.ok Leads to Corrupt Data",
    "bad": {
      "title": "❌ Assuming fetch Rejects on 404",
      "code": "async function loadData() {\n  const res = await fetch(\"https://api.dev/missing-endpoint\");\n  // Bug: No res.ok check!\n  // If server returns HTML 404 page, res.json() will crash!\n  const data = await res.json();\n}",
      "explanation": "`fetch` does not throw an error on 404 or 500. Attempting to parse an error response as JSON causes a confusing SyntaxError."
    },
    "good": {
      "title": "✅ Check res.ok Before Parsing",
      "code": "async function loadData() {\n  const res = await fetch(\"https://api.dev/endpoint\");\n  \n  if (!res.ok) {\n    throw new Error(\"HTTP error \" + res.status);\n  }\n  \n  const data = await res.json();\n  return data;\n}",
      "explanation": "Always verify `res.ok` before calling `res.json()` to handle server error responses gracefully."
    }
  },
  "part5": {
    "title": "Interactive fetch Sandbox",
    "intro": "Simulate API responses and verify error checking logic in the editor.",
    "starterCode": "async function simulateFetch(url) {\n  console.log(\"Fetching from:\", url);\n  \n  // Simulate network response:\n  const isAvailable = url.includes(\"valid\");\n  const response = {\n    ok: isAvailable,\n    status: isAvailable ? 200 : 404,\n    json: async () => ({ id: 1, title: \"Product Title\" }),\n  };\n  \n  if (!response.ok) {\n    throw new Error(\"Server returned HTTP \" + response.status);\n  }\n  \n  return await response.json();\n}\n\n// Test success and error:\nsimulateFetch(\"https://api.dev/valid-endpoint\")\n  .then(data => console.log(\"Success:\", data.title))\n  .catch(err => console.error(\"Error:\", err.message));\n"
  },
  "part6": {
    "title": "Key Takeaways: The fetch API",
    "takeaways": [
      {
        "title": "Check res.ok",
        "desc": "Always check res.ok; fetch does not reject on 404 or 500 status codes."
      },
      {
        "title": "Double Await",
        "desc": "First await the fetch() response headers, then await res.json() for the body."
      },
      {
        "title": "POST Headers",
        "desc": "Always set Content-Type: application/json when sending JSON payloads."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Does `fetch()` reject its Promise when the server responds with a 404 Not Found status?",
      "options": [
        "Yes, it rejects with a 404 error",
        "No, it resolves normally; you must check if res.ok is false",
        "Yes, but only in Google Chrome",
        "No, it automatically redirects the page"
      ],
      "correctIndex": 1,
      "explanation": "`fetch()` only rejects if there is a network failure (no internet, DNS failure). HTTP error statuses (like 404 or 500) resolve normally with `res.ok = false`."
    }
  }
};
