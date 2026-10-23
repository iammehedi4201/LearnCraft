import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js21JsonFetchAndApiResponsesContent: StandardLessonContent = {
  slug: "js21-json-fetch-and-api-responses",
  code: "JS-21",
  title: "JSON, fetch(), and API Responses",
  subtitle: "Request data from servers using fetch() and parse asynchronous JSON responses safely.",
  difficulty: "Difficult",
  scenario: {
    question: "An API returns status 404, but your code reaches the JSON parsing line as if the request succeeded. Why might this happen, and what should you do?",
    answer: "fetch() usually still resolves when the server returns 404. Check response.ok and handle unsuccessful status codes before using the response as successful data.",
  },
  interviewQuestion: {
    question: "Does fetch() reject automatically for every HTTP error status?",
    answer: "No. It usually resolves with a Response for statuses such as 404. Check response.ok or response.status yourself.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "JSON, fetch(), and API Responses",
    bigPicture: "A web app often gets data from an API. fetch() sends a request and returns a Promise for a response. For JSON data, response.json() reads and parses the response body asynchronously.",
    codeSnippet: "async function loadUser() {\n  try {\n    const response = await fetch(\"https://example.com/api/user\");\n\n    if (!response.ok) {\n      throw new Error(`Request failed: ${response.status}`);\n    }\n\n    const user = await response.json();\n    console.log(user);\n  } catch (error) {\n    console.error(\"Could not load user\", error);\n  }\n}\n\nloadUser();",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "fetch()",
            "desc": "Sends asynchronous HTTP requests to endpoints and returns a Response Promise."
      },
      {
            "title": "response.ok",
            "desc": "True when the HTTP status code is 200–299. Must be checked manually!"
      },
      {
            "title": "response.json()",
            "desc": "Asynchronously reads and parses the JSON response body into JavaScript objects."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Fetch Error Rule",
      content: "fetch() only rejects on network failures. For HTTP 404 or 500 errors, it resolves. Always check if (!response.ok).",
    },
    cards: [
      {
            "number": "01",
            "tag": "NETWORK REQUEST",
            "title": "fetch()",
            "description": "Sends asynchronous HTTP requests to endpoints and returns a Response Promise.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "STATUS CHECK",
            "title": "response.ok",
            "description": "True when the HTTP status code is 200–299. Must be checked manually!",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "BODY PARSING",
            "title": "response.json()",
            "description": "Asynchronously reads and parses the JSON response body into JavaScript objects.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. fetch communicates with servers",
            "content": "fetch(url) requests information across the internet and resolves with an HTTP Response object."
      },
      {
            "title": "2. response.ok is mandatory",
            "content": "A 404 or 500 error does NOT trigger catch! You must check if (!response.ok) and handle the error yourself."
      },
      {
            "title": "3. response.json() is also async",
            "content": "Parsing the incoming text stream into JavaScript data takes time, so you must write await response.json()."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "async function load() {\n  const res = await fetch(\"/api/data\");\n  // Missing response.ok check!\n  const data = await res.json(); // Parses HTML 404 page as JSON -> SyntaxError!\n}",
      explanation: "Failing to check response.ok causes crashes when servers return error pages.",
    },
    good: {
      title: "Recommended Approach",
      code: "async function load() {\n  const res = await fetch(\"/api/data\");\n  if (!res.ok) {\n    throw new Error(`HTTP Error: ${res.status}`);\n  }\n  const data = await res.json();\n  console.log(data);\n}",
      explanation: "Checking response.ok protects your application from attempting to parse invalid responses.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-21: JSON, fetch(), and API Responses\nconsole.log(\"Fetching API product data...\");\n\nasync function loadProduct() {\n  try {\n    const res = await fetch(\"https://example.com/api/product\");\n    if (res.ok) {\n      const item = await res.json();\n      console.log(\"Product:\", item.title);\n    }\n  } catch (err) {\n    console.error(\"Network error:\", err.message);\n  }\n}\nloadProduct();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When does a fetch() call reject its returned Promise?",
      options: ["Whenever the server returns HTTP status 404 Not Found","Whenever the server returns HTTP status 500 Server Error","Only on real network errors (e.g. offline, DNS failure, CORS blocked), NOT on 404 or 500","Whenever the response is not valid JSON"],
      correctIndex: 2,
      explanation: "fetch() does not reject on HTTP error statuses (like 404 or 500). It only rejects if the network request itself could not complete.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Request Dispatch",
            "desc": "fetch() coordinates asynchronous HTTP network calls."
      },
      {
            "title": "Explicit Status Check",
            "desc": "Check response.ok to verify 2xx status codes."
      },
      {
            "title": "Body Parsing",
            "desc": "Await response.json() to convert response data to objects."
      }
],
    nextLessonPreview: {
      title: "JavaScript Modules",
      desc: "Learn how to organize applications into reusable files using export and import.",
    },
  },
};
