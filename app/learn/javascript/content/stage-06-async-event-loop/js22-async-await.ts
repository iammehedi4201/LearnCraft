import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js22AsyncAwaitContent: StandardLessonContent = {
  slug: "js22-async-await",
  code: "JS-22",
  title: "Using async and await",
  subtitle: "Write asynchronous code that reads cleanly like synchronous code using async, await, try/catch, and parallel Promise.all().",
  sections: [
    {
      id: "part1",
      label: "async and await",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "async/await Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Errors & Promise.all",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Missing await Trap",
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
    title: "Using async and await",
    bigPicture: "`async` and `await` are syntactic sugar over Promises. They let you write asynchronous code that reads sequentially like normal synchronous code, handled with standard `try/catch`.",
    breakdownTitle: "The Two Golden Rules",
    breakdownItems: [
      {
        title: "async Functions Return Promises",
        desc: "Declaring a function as `async` guarantees it always returns a Promise."
      },
      {
        title: "await Unwraps Results",
        desc: "Pauses inside the function until the Promise resolves, returning the plain value."
      },
      {
        title: "Standard try/catch",
        desc: "Errors thrown by awaited promises are caught cleanly using familiar `try { ... } catch (err)` blocks."
      }
    ]
  },
  part2: {
    title: "Writing Asynchronous Code with async/await",
    intro: "Step through the fundamental patterns of modern async code.",
    cards: [
      {
        number: "01",
        tag: "async fn",
        title: "The async Keyword",
        description: "Declares an asynchronous function that always returns a Promise.",
        codeSnippet: "async function getStatus() {\n  return \"System Operational\"; // Automatically wrapped in a Promise\n}\ngetStatus().then(console.log); // Output: System Operational",
        color: "emerald"
      },
      {
        number: "02",
        tag: "await",
        title: "The await Keyword",
        description: "Pauses inside the function until the promise resolves, returning the clean data.",
        codeSnippet: "async function loadUserData() {\n  const user = await Promise.resolve({ name: \"Maya\" });\n  console.log(user.name); // Output: Maya\n}\nloadUserData();",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Error Handling",
        title: "try / catch Blocks",
        description: "Catches rejected promises just like regular synchronous errors.",
        codeSnippet: "async function safeFetch() {\n  try {\n    const data = await Promise.reject(new Error(\"Server down\"));\n  } catch (error) {\n    console.log(\"Handled error:\", error.message);\n  }\n}\nsafeFetch(); // Output: Handled error: Server down",
        color: "purple"
      }
    ],
    rule: {
      title: "The await Placement Rule",
      content: "The await keyword can ONLY be used inside functions declared with the async keyword (or at the top level of modern ES modules)."
    }
  },
  part3: {
    title: "Error Handling with try/catch and Parallel await",
    intro: "Master error resilience and parallel speed with Promise.all().",
    points: [
      {
        title: "1. try / catch / finally",
        content: "Use finally to run cleanup code (like turning off a loading spinner) whether the request succeeded or failed.",
        codeSnippet: "async function loadProfile() {\n  try {\n    const res = await fetchProfile();\n  } catch (err) {\n    console.error(err);\n  } finally {\n    console.log(\"Done loading\"); // Always runs!\n  }\n}"
      },
      {
        title: "2. Sequential vs Parallel Loading",
        content: "Awaiting two independent requests in a row takes twice as long. Use Promise.all to fetch them simultaneously!",
        codeSnippet: "async function loadDashboard() {\n  // Runs both requests in parallel:\n  const [users, products] = await Promise.all([\n    fetchUsers(),\n    fetchProducts()\n  ]);\n  console.log(users.length, products.length);\n}"
      },
      {
        title: "3. Arrow Function Async Syntax",
        content: "Place async right before the parameter parentheses in arrow functions.",
        codeSnippet: "const fetchScore = async (userId) => {\n  const res = await getScore(userId);\n  return res;\n};"
      }
    ]
  },
  part4: {
    title: "Common Trap: Forgetting the await Keyword",
    bad: {
      title: "❌ Omitting await Before an Async Function",
      code: "async function getRating() {\n  return 5;\n}\nasync function main() {\n  // BUG: Forgot await!\n  const rating = getRating();\n  console.log(\"Rating is:\", rating);\n}\nmain();\n// Output: Rating is: Promise { <pending> }",
      explanation: "Without await, rating holds the raw unresolved Promise object instead of the number 5."
    },
    good: {
      title: "✅ Include await to Unwrap the Value",
      code: "async function getRating() {\n  return 5;\n}\nasync function main() {\n  // Correct: await unwraps the Promise value\n  const rating = await getRating();\n  console.log(\"Rating is:\", rating);\n}\nmain();\n// Output: Rating is: 5",
      explanation: "Adding await tells JavaScript to wait until the Promise resolves and extract the final value."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Step through this async function with await and try/catch in the live sandbox.",
    starterCode: "// 1. A simulated async service:\nfunction fetchUserTier(username) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ username, tier: \"Gold Member\", points: 450 }), 100);\n  });\n}\n\n// 2. An async workflow:\nasync function displayUserStatus() {\n  try {\n    console.log(\"Fetching user tier from server...\");\n    const data = await fetchUserTier(\"alex_chen\");\n    console.log(`Success! User: ${data.username} | Status: ${data.tier} (${data.points} pts)`);\n  } catch (error) {\n    console.error(\"Failed to load status:\", error);\n  }\n}\n\ndisplayUserStatus();\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "async Always Returns a Promise",
        desc: "Any function marked with async wraps its return value in a Promise automatically."
      },
      {
        title: "await Unwraps Values",
        desc: "await pauses the async function and extracts the resolved value cleanly."
      },
      {
        title: "Use Promise.all for Speed",
        desc: "Fetch independent resources concurrently with Promise.all([p1, p2]) instead of awaiting sequentially."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does an async function always return in JavaScript?",
      options: [
        "A Promise",
        "undefined",
        "A string",
        "A boolean"
      ],
      correctIndex: 0,
      explanation: "Functions marked with the 'async' keyword always return a Promise, whether they return a value explicitly or return nothing."
    }
  }
};
