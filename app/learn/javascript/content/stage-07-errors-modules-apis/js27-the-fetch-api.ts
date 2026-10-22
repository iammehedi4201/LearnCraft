import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js27TheFetchApiContent: StandardLessonContent = {
  slug: "js27-the-fetch-api",
  code: "JS-27",
  title: "Fetching Data with fetch",
  subtitle: "Master network requests with fetch(), understand the two-step stream reading process, check response.ok, and abort requests with AbortController.",
  sections: [
    {
      id: "part1",
      label: "Fetch Mechanics",
      icon: "🌐",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "The 2-Step Stream",
      icon: "🌊",
      tag: "STREAM READING"
    },
    {
      id: "part3",
      label: "Headers & POST Requests",
      icon: "📤",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "The 404 Doesn't Reject Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Fetch Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "How fetch() Communicates Over HTTP",
    bigPicture: "The Fetch API allows JavaScript to communicate with remote web servers over HTTP. It returns a Promise that resolves to a Response object representing the server's reply.",
    analogy: "Like sending a mail courier: fetch() dispatches your letter. The courier returns when the remote office acknowledges receipt (headers arrive), and then delivers the full package contents (body stream) in a second step.",
    diagram: "+---------------------------------------------------+\n| 1. const response = await fetch(\"/api/user\");     |\n|    --> Promise resolves when HEADERS arrive!      |\n|    --> Status code (200, 404, 500) is now known!  |\n+---------------------------------------------------+\n                          |\n                          v\n+---------------------------------------------------+\n| 2. if (!response.ok) throw new Error(\"Failed!\");  |\n|    --> Verify status code is in 200-299 range!    |\n+---------------------------------------------------+\n                          |\n                          v\n+---------------------------------------------------+\n| 3. const data = await response.json();            |\n|    --> Second await: Reads and parses BODY stream |\n+---------------------------------------------------+",
    breakdownTitle: "Fetch Fundamentals",
    breakdownItems: [
      {
        title: "The Two-Step Async Process",
        desc: "First await resolves when HTTP headers arrive; second await (.json() or .text()) reads the incoming data body stream."
      },
      {
        title: "Network Error vs HTTP Error",
        desc: "fetch() only rejects on network failures (offline, DNS failure, CORS). HTTP 404 and 500 do NOT reject!"
      },
      {
        title: "The response.ok Property",
        desc: "A boolean shortcut indicating whether the HTTP status code falls in the successful 200–299 range."
      }
    ]
  },
  part2: {
    title: "The Two-Step Stream Reading Process",
    intro: "Step through why fetching requires two sequential awaits.",
    cards: [
      {
        number: "01",
        tag: "Step 1",
        title: "Headers Received",
        description: "The initial fetch() promise resolves as soon as the HTTP headers are received from the server.",
        codeSnippet: "const response = await fetch(\"https://api.com/users\");\nconsole.log(response.status); // e.g. 200\nconsole.log(response.ok);     // true if 200-299",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Step 2",
        title: "Body Stream Parsed",
        description: "Calling response.json() streams the body bytes into memory and parses them as JSON.",
        codeSnippet: "const data = await response.json();\nconsole.log(data); // Live JavaScript object",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Abort",
        title: "AbortController",
        description: "Cancel slow or obsolete requests using an AbortController signal.",
        codeSnippet: "const controller = new AbortController();\nfetch(url, { signal: controller.signal });\n// Cancel the request:\ncontroller.abort();",
        color: "purple"
      }
    ],
    rule: {
      title: "The response.ok Invariant",
      content: "Never read response.json() without first checking if (response.ok) is true. If the server returned an error page, parsing JSON may fail or return unexpected error payloads."
    }
  },
  part3: {
    title: "Sending Data: POST, Headers & Body",
    intro: "Configure HTTP verbs and JSON payloads for creating or updating records.",
    points: [
      {
        title: "1. Sending JSON with POST",
        content: "Specify method: 'POST', set 'Content-Type': 'application/json', and stringify the payload object.",
        codeSnippet: "async function createPost(newPost) {\n  const response = await fetch(\"/api/posts\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(newPost)\n  });\n  if (!response.ok) throw new Error(\"Post creation failed\");\n  return await response.json();\n}"
      },
      {
        title: "2. Setting Authorization Headers",
        content: "Attach bearer tokens or API keys to the request headers to access protected endpoints.",
        codeSnippet: "const res = await fetch(\"/api/profile\", {\n  headers: {\n    \"Authorization\": \"Bearer token_abc123\"\n  }\n});"
      },
      {
        title: "3. Text vs Blob vs JSON",
        content: "Use response.text() for plain strings, response.blob() for images/files, and response.json() for structured APIs.",
        codeSnippet: "const rawText = await response.text();\nconst imageBlob = await response.blob();"
      }
    ]
  },
  part4: {
    title: "The #1 Fetch Trap: 404 & 500 Do NOT Reject!",
    bad: {
      title: "❌ Relying on catch() to Intercept HTTP 404 & 500",
      code: "async function loadUser(id) {\n  try {\n    const response = await fetch(`/api/users/${id}`);\n    // Bug: If server returns 404 Not Found, catch() is NEVER called!\n    // fetch() resolves successfully with response.status = 404!\n    const user = await response.json(); // May crash or process 404 HTML body!\n    return user;\n  } catch (err) {\n    console.error(\"Only triggers on offline/network failure!\");\n  }\n}",
      explanation: "fetch() treats any HTTP response as a successful network completion. It does NOT throw an error for 404 or 500 status codes."
    },
    good: {
      title: "✅ Explicitly Check if (!response.ok)",
      code: "async function loadUser(id) {\n  const response = await fetch(`/api/users/${id}`);\n  \n  // Safe: Explicitly check if status is outside 200-299:\n  if (!response.ok) {\n    throw new Error(`HTTP error! Status: ${response.status}`);\n  }\n  \n  return await response.json();\n}",
      explanation: "Checking response.ok guarantees that 404 and 500 error codes throw an error before attempting to parse the body."
    }
  },
  part5: {
    title: "Fetch API Simulator Sandbox",
    intro: "Observe simulated HTTP request handling with status codes and response.ok verification.",
    starterCode: "console.log(\"Dispatching network request to: /users/1\");\n\n// Simulated fetch demonstrating the two-step response handling:\nfunction mockFetch(url) {\n  return new Promise(resolve => {\n    setTimeout(() => {\n      const isFound = !url.includes(\"missing\");\n      resolve({\n        status: isFound ? 200 : 404,\n        ok: isFound,\n        json: () => Promise.resolve(isFound ? { id: 1, name: \"Sarah\" } : { error: \"Not found\" })\n      });\n    }, 100);\n  });\n}\n\nasync function fetchUserData(url) {\n  const res = await mockFetch(url);\n  console.log(`Status: ${res.status}, ok: ${res.ok}`);\n  \n  if (!res.ok) {\n    throw new Error(`Request failed with status ${res.status}`);\n  }\n  \n  return await res.json();\n}\n\nfetchUserData(\"/users/1\")\n  .then(user => console.log(\"User data:\", user))\n  .catch(err => console.error(err.message));\n"
  },
  part6: {
    title: "Key Takeaways: The Fetch API",
    takeaways: [
      {
        title: "Two-Step Process",
        desc: "First await resolves headers; second await (.json()) reads the response body stream."
      },
      {
        title: "Check response.ok",
        desc: "fetch() does not reject on 404 or 500; you must check if (!response.ok) manually."
      },
      {
        title: "POST Configurations",
        desc: "Send JSON data with method: 'POST', 'Content-Type': 'application/json', and JSON.stringify()."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you make a `fetch()` call to a URL that returns an HTTP 404 Not Found status code?",
      options: [
        "The fetch() promise rejects immediately and triggers the catch() block",
        "The fetch() promise resolves successfully with `response.ok === false` and `response.status === 404`",
        "JavaScript terminates the script with an UncaughtHttpException",
        "The browser retries the request indefinitely"
      ],
      correctIndex: 1,
      explanation: "The Fetch API only rejects on network failures (e.g., no internet connection). HTTP 404 is a valid HTTP response, so the promise resolves with `response.ok === false` and `response.status === 404`."
    }
  }
};
