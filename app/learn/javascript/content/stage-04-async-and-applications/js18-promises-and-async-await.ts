import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js18PromisesAndAsyncAwaitContent: StandardLessonContent = {
  slug: "js18-promises-and-async-await",
  code: "JS-18",
  title: "Promises and async/await",
  subtitle: "Manage asynchronous operations cleanly with Promise resolution and sequential async/await.",
  difficulty: "Difficult",
  scenario: {
    question: "A page tries to show a user's profile before the API request finishes. How should the code be organized?",
    answer: "Wait for the request with await (or handle its Promise with .then()), then use the returned data. Also show a loading state and handle errors so the user is not left with a broken page.",
  },
  interviewQuestion: {
    question: "What does await do inside an async function?",
    answer: "It waits for a Promise to settle and gives the fulfilled value back to the function. If the Promise rejects, the error can be handled with try/catch.",
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
    title: "Promises and async/await",
    bigPicture: "Some work takes time, such as getting data from a server. A Promise represents a result that may be available later. async and await make Promise-based code easier to read.",
    codeSnippet: "function getUser() {\n  return Promise.resolve({ name: \"Rina\" });\n}\n\nasync function showUser() {\n  try {\n    const user = await getUser();\n    console.log(user.name);\n  } catch (error) {\n    console.error(\"Could not load user\", error);\n  }\n}\n\nshowUser();",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Promise",
            "desc": "An object representing the eventual completion or failure of an asynchronous task."
      },
      {
            "title": "async / await",
            "desc": "Allows writing asynchronous Promise code in a clean, top-to-bottom synchronous style."
      },
      {
            "title": "try / catch",
            "desc": "Rejections in awaited Promises are caught directly in standard try/catch blocks."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Async Rule",
      content: "await can only be used inside async functions. It pauses the async function until the Promise settles.",
    },
    cards: [
      {
            "number": "01",
            "tag": "FUTURE VALUE",
            "title": "Promise",
            "description": "An object representing the eventual completion or failure of an asynchronous task.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "CLEAN SYNTAX",
            "title": "async / await",
            "description": "Allows writing asynchronous Promise code in a clean, top-to-bottom synchronous style.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "ERROR HANDLING",
            "title": "try / catch",
            "description": "Rejections in awaited Promises are caught directly in standard try/catch blocks.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Asynchronous code takes time",
            "content": "Network requests and database queries take time. Promises represent that pending future value."
      },
      {
            "title": "2. await unwraps the result",
            "content": "Writing const data = await fetchUserData() pauses that function until data is ready, then returns the plain value."
      },
      {
            "title": "3. Use try...catch for errors",
            "content": "If a Promise rejects or the network fails, an await expression throws an error that your catch block handles."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "function loadData() {\n  // Bug: Not awaiting the Promise:\n  const user = Promise.resolve({ name: \"Rina\" });\n  console.log(user.name); // undefined! (user is a Promise object, not the data!)\n}",
      explanation: "Treating a Promise object as if it were the resolved value produces undefined.",
    },
    good: {
      title: "Recommended Approach",
      code: "async function loadData() {\n  const user = await Promise.resolve({ name: \"Rina\" });\n  console.log(user.name); // \"Rina\"\n}\nloadData();",
      explanation: "Using await unpacks the resolved value from the Promise before using it.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-18: Promises and async/await\nconsole.log(\"Loading order asynchronously...\");\n\nasync function fetchOrder() {\n  return Promise.resolve({ id: 101, total: 450 });\n}\n\nasync function run() {\n  const order = await fetchOrder();\n  console.log(\"Order Total:\", order.total);\n}\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does the await keyword do when placed before a Promise?",
      options: ["It freezes the entire browser window completely","It pauses execution of the async function until the Promise settles, then returns the fulfilled value","It converts the Promise into a callback function","It cancels the Promise if it takes longer than 1 second"],
      correctIndex: 1,
      explanation: "await pauses the enclosing async function until the Promise resolves (or rejects), unpacking its resolved value.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Asynchronous Workflows",
            "desc": "Promises manage delayed data and network responses."
      },
      {
            "title": "Synchronous Feel",
            "desc": "async/await makes asynchronous logic read cleanly line by line."
      },
      {
            "title": "Structured Recovery",
            "desc": "Handle rejected promises smoothly with try/catch."
      }
],
    nextLessonPreview: {
      title: "The Event Loop: A Basic View",
      desc: "Understand how JavaScript executes synchronous code, microtasks, and macrotasks.",
    },
  },
};
