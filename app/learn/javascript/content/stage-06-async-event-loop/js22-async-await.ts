import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js22AsyncAwaitContent: StandardLessonContent = {
  slug: "js22-async-await",
  code: "JS-22",
  title: "Using async and await",
  subtitle: "Write asynchronous code that looks and reads like synchronous code, handle errors with try/catch, and avoid the serial waterfall trap with Promise.all.",
  sections: [
    {
      id: "part1",
      label: "async/await Mechanics",
      icon: "⚡",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Syntax & try/catch",
      icon: "🛡️",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Parallel vs Sequential",
      icon: "🚀",
      tag: "PERFORMANCE"
    },
    {
      id: "part4",
      label: "The Waterfall Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Async/Await Sandbox",
      icon: "💻",
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
    title: "Syntactic Sugar Over Promises",
    bigPicture: "async/await is built directly on top of Promises. It allows you to write asynchronous code that reads sequentially like synchronous code, while remaining 100% non-blocking under the hood.",
    analogy: "Like a bookmark in a book: when you encounter 'await', JavaScript bookmarks your place in the function and closes the book to work on other tasks. When the Promise resolves, it reopens the book at the bookmark and continues reading.",
    diagram: "+--------------------------------------------------------+\n| 1. async function loadDashboard()                      |\n|    console.log(\"Start\");                               |\n+--------------------------------------------------------+\n| 2. const user = await fetchUser();                     |\n|    --> Pauses loadDashboard() without blocking UI!     |\n|    --> Main Call Stack is FREE to handle clicks!       |\n+--------------------------------------------------------+\n| 3. (Promise fulfills with user data)                   |\n|    --> loadDashboard() resumes from the bookmark!      |\n|    console.log(\"User loaded:\", user.name);             |\n+--------------------------------------------------------+",
    breakdownTitle: "Async/Await Invariants",
    breakdownItems: [
      {
        title: "async Functions Return Promises",
        desc: "Prefixing a function with async guarantees it returns a Promise. Any returned value is wrapped in Promise.resolve()."
      },
      {
        title: "await Pauses Locally Only",
        desc: "await only pauses execution inside the current async function body. It NEVER blocks the main browser thread."
      },
      {
        title: "Native try/catch Integration",
        desc: "Rejections and thrown errors are caught seamlessly using standard synchronous try/catch blocks."
      }
    ]
  },
  part2: {
    title: "async/await Syntax and Error Handling",
    intro: "Step through how to use async/await with robust error handling.",
    cards: [
      {
        number: "01",
        tag: "async Function",
        title: "The async Keyword",
        description: "Declares an asynchronous function that always returns a Promise.",
        codeSnippet: "async function getVersion() {\n  return 1.5; // Automatically wrapped in Promise.resolve(1.5)\n}\ngetVersion().then(v => console.log(\"Version:\", v)); // Output: Version: 1.5",
        color: "emerald"
      },
      {
        number: "02",
        tag: "await Keyword",
        title: "The await Keyword",
        description: "Unwraps the resolved value of a Promise cleanly without .then() callbacks.",
        codeSnippet: "async function fetchSettings() {\n  const res = await Promise.resolve({ theme: \"dark\" });\n  console.log(res.theme);\n}\nfetchSettings(); // Output: dark",
        color: "cyan"
      },
      {
        number: "03",
        tag: "try / catch",
        title: "Error Handling",
        description: "Handle rejected Promises using standard synchronous try/catch syntax.",
        codeSnippet: "async function safeLoad() {\n  try {\n    await Promise.reject(new Error(\"Server down\"));\n  } catch (err) {\n    console.error(\"Caught:\", err.message);\n  }\n}\nsafeLoad(); // Output: Caught: Server down",
        color: "purple"
      }
    ],
    rule: {
      title: "Scope Invariant",
      content: "The await keyword can only be used inside functions declared with the async keyword (or at the top level of modern ES modules)."
    }
  },
  part3: {
    title: "Sequential vs Concurrent Execution",
    intro: "Understand how to run independent tasks concurrently for maximum performance.",
    points: [
      {
        title: "Sequential Execution (Dependent Tasks)",
        content: "Use sequential awaits when Step 2 depends directly on the result of Step 1.",
        codeSnippet: "async function loadUserProfile(userId) {\n  const user = await fetchUser(userId); // Step 1\n  const posts = await fetchUserPosts(user.accountId); // Needs user.accountId!\n  return { user, posts };\n}"
      },
      {
        title: "Concurrent Execution (Independent Tasks)",
        content: "When tasks do not depend on each other, start them simultaneously using Promise.all().",
        codeSnippet: "async function loadMarketData() {\n  // Both fetch requests execute in parallel:\n  const [stocks, crypto] = await Promise.all([\n    fetchStockPrices(),\n    fetchCryptoPrices()\n  ]);\n  return { stocks, crypto };\n}"
      },
      {
        title: "Promise.allSettled() for Partial Failures",
        content: "If you want all requests to complete even if one fails, use Promise.allSettled().",
        codeSnippet: "const results = await Promise.allSettled([\n  fetchServerA(),\n  fetchServerB()\n]);\n// results has status ('fulfilled' | 'rejected') for each"
      }
    ]
  },
  part4: {
    title: "The Performance Killer: The Serial Waterfall Trap",
    bad: {
      title: "❌ Sequential Await for Independent Requests (Slow Waterfall)",
      code: "async function loadStorePage() {\n  // Bug: Each request waits for the previous one before starting!\n  // 300ms + 300ms + 300ms = 900ms total load time!\n  const products = await fetchProducts(); // Waits 300ms\n  const banners = await fetchBanners();   // Waits 300ms\n  const userCart = await fetchUserCart();  // Waits 300ms\n  return { products, banners, userCart };\n}",
      explanation: "Awaiting independent requests sequentially creates an unnecessary waterfall delay, multiplying the page load time."
    },
    good: {
      title: "✅ Parallel Execution with Promise.all() (Fast)",
      code: "async function loadStorePage() {\n  // Safe: All 3 requests start simultaneously!\n  // Total load time = 300ms (fastest possible speed)!\n  const [products, banners, userCart] = await Promise.all([\n    fetchProducts(),\n    fetchBanners(),\n    fetchUserCart()\n  ]);\n  return { products, banners, userCart };\n}",
      explanation: "Promise.all triggers all network calls concurrently, reducing total wait time to only the slowest single request."
    }
  },
  part5: {
    title: "Async / Await Sandbox",
    intro: "Compare sequential execution with concurrent Promise.all() execution.",
    starterCode: "const delay = (ms, value) => new Promise(res => setTimeout(() => res(value), ms));\n\n// Sequential workflow:\nasync function processOrder() {\n  console.log(\"Starting order processing...\");\n  \n  const step1 = await delay(100, \"Inventory Verified\");\n  console.log(\"1:\", step1);\n  \n  const step2 = await delay(100, \"Card Charged\");\n  console.log(\"2:\", step2);\n  \n  return \"Order Complete!\";\n}\n\nprocessOrder().then(msg => console.log(msg));\n"
  },
  part6: {
    title: "Key Takeaways: Async / Await",
    takeaways: [
      {
        title: "Non-Blocking Pause",
        desc: "await pauses inside the async function while leaving the browser thread free."
      },
      {
        title: "try / catch Error Handling",
        desc: "Wrap awaited calls in try/catch to handle rejected promises cleanly."
      },
      {
        title: "Avoid Serial Waterfalls",
        desc: "Use Promise.all() to run independent asynchronous operations concurrently."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "If `fetchA()` and `fetchB()` take 200ms each and do NOT depend on each other, what is the best way to run them?",
      options: [
        "`const a = await fetchA(); const b = await fetchB();`",
        "`const [a, b] = await Promise.all([fetchA(), fetchB()]);`",
        "`const a = fetchA(); while(!a) {} const b = fetchB();`",
        "`await fetchA(await fetchB());`"
      ],
      correctIndex: 1,
      explanation: "Using `Promise.all([fetchA(), fetchB()])` runs both requests in parallel, taking only ~200ms total instead of ~400ms for sequential awaits."
    }
  }
};
