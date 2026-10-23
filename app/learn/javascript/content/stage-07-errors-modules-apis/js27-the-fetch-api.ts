import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js27TheFetchApiContent: StandardLessonContent = {
  slug: "js27-the-fetch-api",
  code: "JS-27",
  title: "Fetching Data with fetch",
  subtitle: "Make GET and POST requests, send JSON payloads, check response.ok, and handle API errors.",
  sections: [
    {
      id: "part1",
      label: "Fetching Data with fetch",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "GET Requests",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "POST Requests & Headers",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "fetch HTTP Error Trap",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Fetching Data with fetch",
    bigPicture: "`fetch()` makes HTTP network requests. It is a two-step process: `await fetch(url)` gets the response headers, and `await res.json()` parses the data. Always check `if (!res.ok)`.",
    breakdownTitle: "The Two-Step Fetch Rule",
    breakdownItems: [
      {
        title: "Step 1: Wait for Response Headers",
        desc: "fetch(url) returns a Response object containing HTTP status codes (200, 404, 500)."
      },
      {
        title: "Step 2: Parse JSON Body",
        desc: "await response.json() parses the response stream into a JavaScript object."
      },
      {
        title: "Check response.ok",
        desc: "fetch does NOT reject on HTTP 404 or 500 error responses; check `res.ok` explicitly."
      }
    ]
  },
  part2: {
    title: "Sending GET Requests with fetch and async/await",
    intro: "Step through the canonical pattern for fetching data from REST APIs.",
    cards: [
      {
        number: "01",
        tag: "GET",
        title: "Basic GET Request",
        description: "Fetches data from an endpoint using the two-step await pattern.",
        codeSnippet: "async function loadUser(id) {\n  const res = await fetch(`https://api.dev/users/${id}`);\n  const user = await res.json();\n  console.log(user.name);\n}",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Status",
        title: "Checking response.ok",
        description: "response.ok is true for HTTP 200-299, false for 404 or 500 errors.",
        codeSnippet: "const res = await fetch(\"https://api.dev/items\");\nif (!res.ok) {\n  throw new Error(`HTTP Error: ${res.status}`);\n}\nconst items = await res.json();",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Safety",
        title: "Wrapping in try / catch",
        description: "Catch network dropouts and API errors cleanly.",
        codeSnippet: "try {\n  const res = await fetch(\"/api/profile\");\n  const data = await res.json();\n} catch (err) {\n  console.error(\"Network failure:\", err.message);\n}",
        color: "purple"
      }
    ],
    rule: {
      title: "The HTTP Status Rule",
      content: "response.ok is a boolean shortcut that checks if res.status is between 200 and 299 (successful HTTP status)."
    }
  },
  part3: {
    title: "Sending POST Requests with JSON Payloads",
    intro: "Configure method, headers, and body when submitting data to an API.",
    points: [
      {
        title: "1. The 3 POST Configuration Options",
        content: "When creating resources, configure method: 'POST', Content-Type header, and JSON.stringify the body.",
        codeSnippet: "async function createPost(postData) {\n  const res = await fetch(\"https://api.dev/posts\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(postData)\n  });\n  return await res.json();\n}"
      },
      {
        title: "2. Setting Content-Type",
        content: "The 'Content-Type': 'application/json' header informs the server that the incoming body is JSON text.",
        codeSnippet: "headers: { \"Content-Type\": \"application/json\" }"
      },
      {
        title: "3. Inspecting the Created Resource",
        content: "Successful POST requests typically return HTTP 201 Created along with the new record's generated ID.",
        codeSnippet: "const newPost = await createPost({ title: \"Modern JS Guide\" });\nconsole.log(\"Created with ID:\", newPost.id);"
      }
    ]
  },
  part4: {
    title: "Common Trap: Assuming fetch Throws on 404 or 500 Responses",
    bad: {
      title: "❌ Relying on try/catch Alone for 404 Errors",
      code: "try {\n  // What if the user does NOT exist (HTTP 404 Not Found)?\n  const res = await fetch(\"/api/users/9999\");\n  // BUG: fetch did NOT throw! catch is skipped!\n  const user = await res.json();\n  console.log(user.name); // Crash or unexpected undefined!\n} catch (err) {\n  // Only runs on network disconnect or DNS failure!\n}",
      explanation: "A 404 Not Found or 500 Server Error is still a successful HTTP communication! The server returned a valid response, so fetch() does NOT reject the promise."
    },
    good: {
      title: "✅ Always Check if (!res.ok)",
      code: "try {\n  const res = await fetch(\"/api/users/9999\");\n  if (!res.ok) {\n    throw new Error(`User not found (Status: ${res.status})`);\n  }\n  const user = await res.json();\n  console.log(user.name);\n} catch (err) {\n  console.error(\"Handled error:\", err.message);\n}",
      explanation: "Checking if (!res.ok) guarantees you catch 404 and 500 errors before attempting to use invalid data."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Step through a safe data loading pattern that checks response.ok and parses the JSON response.",
    starterCode: "// Simulating an API endpoint in the sandbox:\nasync function loadProductData(productId) {\n  try {\n    console.log(`Connecting to server for product #${productId}...`);\n    const response = await fetch(`https://api.dev/products/${productId}`);\n\n    if (!response.ok) {\n      throw new Error(`API returned error status: ${response.status}`);\n    }\n\n    const product = await response.json();\n    console.log(\"Successfully loaded product:\", product.title);\n    return product;\n  } catch (error) {\n    console.error(\"Fetch operation failed:\", error.message);\n    return null;\n  }\n}\n\nloadProductData(1);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Two-Step Await Process",
        desc: "First await fetch(url) for headers, then await res.json() for the parsed data."
      },
      {
        title: "Always Verify response.ok",
        desc: "fetch() does not reject on 404 or 500; you must check if (!res.ok) manually."
      },
      {
        title: "POST Requires Headers and Body",
        desc: "Specify method: 'POST', Content-Type: 'application/json', and JSON.stringify(body)."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why must you check 'if (!response.ok)' after calling fetch()?",
      options: [
        "Because fetch() does not reject its Promise on HTTP 404 or 500 errors",
        "Because response.ok is required to open the internet connection",
        "Because fetch() only works on secure HTTPS websites",
        "It is not necessary; fetch() automatically throws an error on 404"
      ],
      correctIndex: 0,
      explanation: "fetch() only rejects its Promise if a network failure occurs (e.g., no internet or invalid domain). HTTP error codes like 404 Not Found or 500 Internal Server Error are valid responses, so you must inspect response.ok manually."
    }
  }
};
