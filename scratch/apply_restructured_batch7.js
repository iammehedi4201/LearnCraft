const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFilePath = 'lib/quiz/javascript-quizzes.ts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 7: JS-20, JS-21, JS-22, JS-23
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch7Lessons = {
  "js20-synchronous-vs-asynchronous": {
    slug: "js20-synchronous-vs-asynchronous",
    code: "JS-20",
    title: "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
    subtitle: "Learn how single-threaded JavaScript handles long tasks using timers and background Web APIs without freezing the browser.",
    sections: [
      { id: "part1", label: "Single-Thread Challenge", icon: "⏳", tag: "FOUNDATION" },
      { id: "part2", label: "Web APIs & Timers", icon: "🌐", tag: "CONCEPTS" },
      { id: "part3", label: "Execution Timeline", icon: "⏱️", tag: "TIMELINE" },
      { id: "part4", label: "UI Freezing Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Async Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Blocking vs Non-Blocking: The Single-Thread Challenge",
      bigPicture: "JavaScript is single-threaded, meaning it can only execute one line of code at a time on its main thread. That same single thread is also responsible for rendering the webpage, animating buttons, and responding to mouse clicks! If JavaScript were strictly synchronous, every time you fetched data or waited for a timer, the entire browser would freeze completely. Asynchronous JavaScript solves this by offloading waiting tasks to the browser background while your code continues running smoothly.",
      breakdownTitle: "Core Concepts of Asynchronous JavaScript:",
      breakdownItems: [
        {
          title: "Synchronous Blocking",
          desc: "Each line waits for the previous line to finish. Heavy calculations or waiting loops freeze the user interface."
        },
        {
          title: "Asynchronous Non-Blocking",
          desc: "Tasks that require waiting (like network requests or timers) are delegated to background browser APIs."
        },
        {
          title: "Timers with setTimeout()",
          desc: "Schedules a callback function to run after a specified delay, allowing all immediate code to run first."
        }
      ]
    },
    part2: {
      title: "Web APIs & Background Waiting: The Coffee Shop Analogy",
      intro: "How the browser runtime handles waiting tasks in the background:",
      cards: [
        {
          number: "01",
          tag: "Blocking",
          title: "Synchronous Line",
          description: "Imagine a barista who takes your order, stares at the coffee machine for 5 minutes, and refuses to speak to anyone else until it finishes. Everyone waits!",
          color: "rose"
        },
        {
          number: "02",
          tag: "Non-Blocking",
          title: "Asynchronous Buzzer",
          description: "The barista takes your order, hands you a buzzer, and immediately serves the next customer. When your coffee is ready, your buzzer rings!",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Scheduler",
          title: "setTimeout(callback, ms)",
          description: "Hands the timer to the browser's Web APIs to count down in the background, keeping JavaScript's main thread free and responsive.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Non-Blocking Code",
        content: "Never write synchronous busy-waiting loops (e.g., while (Date.now() < target)) to simulate delays! Busy-waiting locks JavaScript's single thread and completely freezes the user's screen. Always use setTimeout() or Promises."
      }
    },
    part3: {
      title: "The Asynchronous Execution Timeline",
      intro: "Why setTimeout(fn, 0) runs AFTER all synchronous statements complete:",
      points: [
        {
          title: "1. The Call Stack Finishes First",
          content: "JavaScript will always execute every synchronous line in your script from top to bottom before it even checks for completed background timers."
        },
        {
          title: "2. The Zero-Delay Timer (setTimeout(fn, 0))",
          content: "A delay of 0ms does NOT mean 'run right now'. It means 'hand this to the browser and run it as soon as all current synchronous code has finished'."
        },
        {
          title: "3. UI Smoothness & Responsiveness",
          content: "Because background operations don't block the thread, user clicks, typing, and CSS animations continue running at a smooth 60 frames per second."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Trying to Pause JavaScript with Busy-Wait Loops",
      bad: {
        title: "❌ Bad: Using a while loop to pause, freezing the entire webpage",
        code: `console.log("Starting order...");

// Catastrophic bug: Locks the single thread for 3 seconds!
const end = Date.now() + 3000;
while (Date.now() < end) {
  // Page is totally frozen: buttons cannot be clicked, animations stop!
}

console.log("Order ready!");`,
        explanation: "A synchronous while loop starves the single thread, freezing the user's browser tab completely for 3 seconds."
      },
      good: {
        title: "✅ Clean: Non-blocking setTimeout allowing the page to remain interactive",
        code: `console.log("1. Order placed with barista");

// Clean: Hands the timer to Web APIs and moves on immediately!
setTimeout(() => {
  console.log("3. Buzzer rings: Coffee is ready! ☕");
}, 1000);

console.log("2. Customer sits down, reads news, UI stays responsive");`,
        explanation: "Using setTimeout lets the browser count down in the background while the user interface stays silky smooth."
      }
    },
    part5: {
      title: "Async Execution Playground",
      intro: "Observe execution order between synchronous code and background timers, even with a 0ms delay:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-20: SYNCHRONOUS VS ASYNCHRONOUS PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("🏁 Step 1: Program starts (Synchronous)");

// Schedule an async callback with 500ms delay:
setTimeout(() => {
  console.log("⏰ Step 4: Timer finished after 500ms (Asynchronous)");
}, 500);

// Schedule an async callback with 0ms delay:
setTimeout(() => {
  console.log("⏱️ Step 3: Zero-delay timer callback executed!");
}, 0);

console.log("🚀 Step 2: Next synchronous line runs immediately!");

// Notice that Step 2 runs BEFORE Step 3 and Step 4,
// because all synchronous code on the call stack runs to completion first!
`
    },
    part6: {
      title: "Key Takeaways: Synchronous vs Asynchronous",
      takeaways: [
        {
          title: "1. Single-Threaded Runtime",
          desc: "JavaScript has one main thread that handles both code execution and UI rendering."
        },
        {
          title: "2. Non-Blocking Web APIs",
          desc: "Slow tasks like timers and HTTP calls are handled by the browser environment in the background."
        },
        {
          title: "3. Synchronous Priority",
          desc: "All synchronous code runs to completion before background timer callbacks are executed."
        },
        {
          title: "4. Next Step: Promises",
          desc: "In JS-21, we learn how Promises tame asynchronous callbacks and handle future values cleanly!"
        }
      ],
      nextLessonPreview: {
        title: "JS-21: Promises: Managing Future Values with .then() & .catch()",
        desc: "Master Promise states (Pending, Fulfilled, Rejected), flat method chaining with .then(), and centralized error handling with .catch()."
      }
    },
    part7: {
      title: "Knowledge Check: Synchronous vs Asynchronous",
      quiz: {
        question: "Why does JavaScript use asynchronous operations for network requests and timers?",
        options: [
          "Because computers cannot calculate math without pausing",
          "To prevent freezing the single-threaded UI and keep web pages interactive",
          "To slow down the browser deliberately",
          "Because JavaScript does not have variables"
        ],
        correctIndex: 1,
        explanation: "Because JavaScript runs on a single main thread, asynchronous execution prevents long-running operations (like network requests or timers) from freezing the user interface."
      }
    }
  },

  "js21-promises-and-chaining": {
    slug: "js21-promises-and-chaining",
    code: "JS-21",
    title: "Promises: Managing Future Values with .then() & .catch()",
    subtitle: "Master Promise states (Pending, Fulfilled, Rejected), flat method chaining with .then(), and centralized error handling with .catch().",
    sections: [
      { id: "part1", label: "Future Guarantees", icon: "🤝", tag: "FOUNDATION" },
      { id: "part2", label: "The 3 States", icon: "🚥", tag: "STATES" },
      { id: "part3", label: "Chaining & Recovery", icon: "🔗", tag: "CHAINING" },
      { id: "part4", label: "Callback Hell Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Promises Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Promises: Guarantees for Future Values",
      bigPicture: "In early JavaScript, handling asynchronous results required passing callbacks inside callbacks. When you had several steps in a row, this created a deeply indented, unreadable mess called 'Callback Hell'. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation. Think of a Promise like a restaurant buzzer: while your meal is cooking, you hold the buzzer. When your food is ready, the buzzer buzzes with your meal. If the kitchen burns your food, the buzzer flashes an error!",
      breakdownTitle: "Core Concepts of JavaScript Promises:",
      breakdownItems: [
        {
          title: "The 3 Promise States",
          desc: "A Promise starts Pending, and eventually settles into either Fulfilled (success with data) or Rejected (failure with an error)."
        },
        {
          title: ".then() for Success",
          desc: "Attaches a callback that runs when the Promise is fulfilled, receiving the resolved data."
        },
        {
          title: ".catch() for Error Handling",
          desc: "A single .catch() at the end of a chain catches any error that occurred in any previous step."
        }
      ]
    },
    part2: {
      title: "The 3 Promise States: Pending, Fulfilled, Rejected",
      intro: "Understanding how a Promise transitions from waiting to holding a final value or error:",
      cards: [
        {
          number: "01",
          tag: "Waiting",
          title: "Pending",
          description: "The asynchronous task is still working in the background. The promise has not produced a value or error yet.",
          color: "cyan"
        },
        {
          number: "02",
          tag: "Success",
          title: "Fulfilled (Resolved)",
          description: "The task finished successfully! The promise now permanently holds the resolved data, delivered to .then().",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Failure",
          title: "Rejected (Failed)",
          description: "An error occurred. The promise permanently holds the error reason, delivered to .catch().",
          color: "rose"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Promise States",
        content: "A Promise can only settle ONCE! Once a Promise moves from Pending to Fulfilled or Rejected, its state and value are permanently locked and cannot change."
      }
    },
    part3: {
      title: "Method Chaining with .then() and Centralized .catch()",
      intro: "Chaining sequential asynchronous tasks in a flat, readable pipeline:",
      points: [
        {
          title: "1. Returning Values in .then()",
          content: "Whatever value you return from a .then() callback is automatically wrapped in a new resolved Promise and passed to the next .then() in the chain."
        },
        {
          title: "2. Returning Promises to Flatten Chains",
          content: "If you return another Promise inside a .then(), JavaScript waits for that inner Promise to finish before moving to the next .then(). This eliminates nested pyramids!"
        },
        {
          title: "3. .finally() for Cleanup",
          content: "Use .finally(() => {}) to run cleanup code (like turning off a loading spinner) regardless of whether the operation succeeded or failed."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Callback Hell vs Clean Promise Chaining",
      bad: {
        title: "❌ Bad: Callback Hell (Pyramid of Doom) with nested callbacks",
        code: `// The Callback Hell Pyramid:
fetchUser(101, (user) => {
  fetchOrders(user.id, (orders) => {
    fetchReceipt(orders[0].id, (receipt) => {
      console.log("Receipt:", receipt); // Deeply indented, hard to handle errors!
    }, (err) => console.error(err));
  }, (err) => console.error(err));
}, (err) => console.error(err));`,
        explanation: "Nesting multiple callbacks inside callbacks makes code difficult to read, impossible to debug, and requires duplicating error handlers at every layer."
      },
      good: {
        title: "✅ Clean: Linear Promise chaining with centralized error handling",
        code: `// Flat, readable chain:
fetchUser(101)
  .then((user) => fetchOrders(user.id))
  .then((orders) => fetchReceipt(orders[0].id))
  .then((receipt) => {
    console.log("Receipt total:", receipt.amount);
  })
  .catch((error) => {
    // Catches errors from ANY of the steps above!
    console.error("Order processing failed:", error.message);
  })
  .finally(() => {
    console.log("Transaction flow finished.");
  });`,
        explanation: "Promise chaining keeps every asynchronous step flat and linear, with a single .catch() guarding the entire sequence."
      }
    },
    part5: {
      title: "Promises Playground",
      intro: "Create a custom Promise with resolve and reject, transform data through .then(), and catch simulated errors:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-21: PROMISES PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Create a function returning a Promise:
function fetchProductDetails(productId) {
  return new Promise((resolve, reject) => {
    console.log(\`⏳ Fetching details for product #\${productId}...\`);
    setTimeout(() => {
      if (productId > 0) {
        resolve({ id: productId, name: "Mechanical Keyboard", price: 120 });
      } else {
        reject(new Error("Invalid product ID: must be greater than 0"));
      }
    }, 300);
  });
}

// 2. Consume the Promise chain:
fetchProductDetails(42)
  .then((product) => {
    console.log("📦 Product fetched:", product.name);
    // Transform data: calculate price with 10% discount:
    const discountedPrice = product.price * 0.9;
    return { ...product, discountedPrice };
  })
  .then((updatedProduct) => {
    console.log(\`💰 Discounted price: $\${updatedProduct.discountedPrice}\`);
  })
  .catch((err) => {
    console.error("❌ An error occurred:", err.message);
  })
  .finally(() => {
    console.log("🏁 Product request completed.");
  });

// 3. Test rejection by passing an invalid ID:
fetchProductDetails(-1)
  .catch((err) => console.log("Caught expected error:", err.message));
`
    },
    part6: {
      title: "Key Takeaways: Promises",
      takeaways: [
        {
          title: "1. Three States",
          desc: "Pending -> permanently settles into Fulfilled or Rejected."
        },
        {
          title: "2. Flat .then() Chains",
          desc: "Return values or inner Promises to chain steps linearly without nesting."
        },
        {
          title: "3. Centralized .catch()",
          desc: "One .catch() at the end captures errors from any step in the chain."
        },
        {
          title: "4. Guaranteed .finally()",
          desc: "Runs cleanup code regardless of success or rejection."
        },
        {
          title: "5. Next Step: Async/Await",
          desc: "In JS-22, we learn the modern async/await syntax to write asynchronous code that reads like synchronous code!"
        }
      ],
      nextLessonPreview: {
        title: "JS-22: Async/Await: Clean Asynchronous Workflows",
        desc: "Write asynchronous code that reads cleanly like synchronous code using async, await, try/catch, and parallel Promise.all()."
      }
    },
    part7: {
      title: "Knowledge Check: Promises",
      quiz: {
        question: "Which method is used to catch errors in a Promise chain?",
        options: [
          ".onError()",
          ".catch()",
          ".fail()",
          ".except()"
        ],
        correctIndex: 1,
        explanation: "The .catch() method is used in Promise chains to capture any errors or rejections that occur in earlier steps."
      }
    }
  },

  "js22-async-await": {
    slug: "js22-async-await",
    code: "JS-22",
    title: "Async/Await: Clean Asynchronous Workflows",
    subtitle: "Write asynchronous code that reads cleanly like synchronous code using async, await, try/catch, and parallel Promise.all().",
    sections: [
      { id: "part1", label: "Clean Async Code", icon: "✨", tag: "FOUNDATION" },
      { id: "part2", label: "await & try/catch", icon: "🛡️", tag: "SYNTAX" },
      { id: "part3", label: "Parallel with Promise.all", icon: "⚡", tag: "PARALLEL" },
      { id: "part4", label: "Waterfall Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Async/Await Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Async/Await: The Cleanest Way to Work with Promises",
      bigPicture: "While Promises solved callback hell, chaining lots of .then() handlers can still look foreign and verbose. ES2017 introduced async and await: special keywords that let you write asynchronous code that reads and feels exactly like ordinary synchronous code! Think of await like setting an oven timer: you pause in the recipe until the timer dings, but other kitchen helpers keep prepping without freezing the kitchen.",
      breakdownTitle: "Core Concepts of Async/Await:",
      breakdownItems: [
        {
          title: "The async Keyword",
          desc: "Marking a function as 'async' guarantees that it automatically returns a Promise."
        },
        {
          title: "The await Keyword",
          desc: "Pauses the execution of the async function until the Promise settles, unwrapping its value directly into a variable."
        },
        {
          title: "Standard try / catch",
          desc: "Handle asynchronous errors using standard, familiar try/catch blocks instead of chaining .catch()."
        }
      ]
    },
    part2: {
      title: "Unwrapping Values with await and Guarding with try/catch",
      intro: "How await unwraps resolved values and converts rejections into catchable exceptions:",
      cards: [
        {
          number: "01",
          tag: "Declaration",
          title: "async function () {}",
          description: "Any value returned by an async function is automatically wrapped in a resolved Promise (return 42 -> Promise.resolve(42)).",
          color: "purple"
        },
        {
          number: "02",
          tag: "Unwrap",
          title: "const data = await promise",
          description: "Pauses only the local async function until the promise resolves. The main thread and UI stay responsive!",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Safety",
          title: "try { } catch (error) { }",
          description: "If an awaited Promise rejects, JavaScript throws an exception directly into the surrounding catch block.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of await",
        content: "You can only use the await keyword inside an async function (or at the top level of ES modules). Using await inside a standard function throws a SyntaxError!"
      }
    },
    part3: {
      title: "Parallel Execution with Promise.all()",
      intro: "Running independent asynchronous tasks simultaneously instead of one by one:",
      points: [
        {
          title: "1. The Async Waterfall Problem",
          content: "If you write const a = await getA(); const b = await getB(); and task B doesn't depend on A, task B is waiting needlessly. If each takes 1 second, your app takes 2 seconds total!"
        },
        {
          title: "2. Parallel Execution with Promise.all()",
          content: "const [a, b] = await Promise.all([getA(), getB()]); starts both tasks at the exact same moment. If each takes 1 second, the total time is only 1 second!"
        },
        {
          title: "3. Top-Level Await in ES Modules",
          content: "In modern JavaScript files using ES modules, you can use await directly at the top level of the file without wrapping it in an async function."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: The Sequential Waterfall Trap",
      bad: {
        title: "❌ Bad: Awaiting independent requests sequentially (slow waterfall)",
        code: `async function loadDashboard() {
  // Bug: Sequential waterfall! Takes 1s + 1s = 2 seconds total!
  const users = await fetchUsers();     // Takes 1 second
  const products = await fetchProducts(); // Takes 1 second (waits for users needlessly!)
  return { users, products };
}`,
        explanation: "Awaiting independent tasks one by one forces the second task to wait until the first finishes, needlessly doubling user waiting time."
      },
      good: {
        title: "✅ Clean: Running independent tasks concurrently with Promise.all",
        code: `async function loadDashboard() {
  try {
    // Both requests fire simultaneously: takes only 1 second total!
    const [users, products] = await Promise.all([
      fetchUsers(),
      fetchProducts()
    ]);
    return { users, products };
  } catch (error) {
    console.error("Dashboard failed to load:", error.message);
  }
}`,
        explanation: "Promise.all fires both network calls in parallel, cutting total waiting time in half while catching any errors cleanly."
      }
    },
    part5: {
      title: "Async/Await Playground",
      intro: "Write clean async functions, unwrap simulated database responses with await, and benchmark serial vs parallel workflows:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-22: ASYNC / AWAIT PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Simulated asynchronous network services:
function fetchUserProfile(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, username: "dev_sara", role: "Engineer" }), 200);
  });
}

function fetchUserProjects(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["LearnCraft App", "AI Chat Engine"]), 200);
  });
}

// 1. Clean async/await workflow with try/catch:
async function loadUserData(userId) {
  console.log("⏳ Fetching user data...");
  try {
    // Run both independent requests in parallel:
    const [user, projects] = await Promise.all([
      fetchUserProfile(userId),
      fetchUserProjects(userId)
    ]);

    console.log("👤 User loaded:", user.username, \`(\${user.role})\`);
    console.log("📁 Projects loaded:", projects.join(", "));

    return { user, projects };
  } catch (error) {
    console.error("❌ Failed to load user data:", error.message);
  }
}

// 2. Invoke the async function:
loadUserData(101).then((result) => {
  console.log("🎉 Complete result ready:", result !== undefined);
});
`
    },
    part6: {
      title: "Key Takeaways: Async/Await",
      takeaways: [
        {
          title: "1. Linear Readability",
          desc: "Write asynchronous code that reads like clean synchronous statements."
        },
        {
          title: "2. Automatic Promise Return",
          desc: "Any async function automatically wraps its return value in a Promise."
        },
        {
          title: "3. try/catch Error Handling",
          desc: "Awaited rejections become thrown exceptions caught by standard try/catch."
        },
        {
          title: "4. Parallel with Promise.all",
          desc: "Never await independent tasks in sequence; fire them concurrently with Promise.all."
        },
        {
          title: "5. Next Step: The Event Loop",
          desc: "In JS-23, we look under the hood to see how the Call Stack and Task Queues prioritize execution!"
        }
      ],
      nextLessonPreview: {
        title: "JS-23: The Event Loop: Call Stack & Task Queues",
        desc: "Understand execution priority under the hood: the Call Stack, VIP Microtasks (Promises), and Macrotasks (Timers)."
      }
    },
    part7: {
      title: "Knowledge Check: Async/Await",
      quiz: {
        question: "What does an 'async' function ALWAYS return in JavaScript?",
        options: [
          "A plain string",
          "A Promise (automatically wrapping the returned value)",
          "undefined only",
          "A generator object"
        ],
        correctIndex: 1,
        explanation: "Every async function automatically returns a Promise. If the function returns a non-promise value (e.g. return 42), JavaScript wraps it in a resolved Promise automatically."
      }
    }
  },

  "js23-the-event-loop": {
    slug: "js23-the-event-loop",
    code: "JS-23",
    title: "The Event Loop: Call Stack & Task Queues",
    subtitle: "Understand execution priority under the hood: the Call Stack, VIP Microtasks (Promises), and Macrotasks (Timers).",
    sections: [
      { id: "part1", label: "The Airport Runway", icon: "🛫", tag: "FOUNDATION" },
      { id: "part2", label: "Queue Priorities", icon: "📊", tag: "PRIORITIES" },
      { id: "part3", label: "Microtasks vs Timers", icon: "⏱️", tag: "EXECUTION" },
      { id: "part4", label: "Order Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Event Loop Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Event Loop: Coordinating JavaScript's Single Thread",
      bigPicture: "You now know that JavaScript is single-threaded and handles async code without freezing. But how does JavaScript decide what runs next when a timer finishes and a Promise resolves at the exact same moment? The Event Loop is the traffic controller that coordinates the Call Stack, the Microtask Queue, and the Macrotask Queue. Think of an airport runway: the Call Stack is the active runway. Microtasks (Promises) are VIP first-class passengers who board immediately. Macrotasks (Timers) wait in general boarding.",
      breakdownTitle: "The Three Stations of the Event Loop:",
      breakdownItems: [
        {
          title: "The Call Stack (Synchronous)",
          desc: "Executes synchronous code one frame at a time. The runway must be 100% empty before anything else can run."
        },
        {
          title: "The Microtask Queue (VIP Priority)",
          desc: "Contains Promise callbacks (.then, .catch, await). Whenever the stack empties, ALL pending microtasks are drained immediately."
        },
        {
          title: "The Macrotask Queue (General Priority)",
          desc: "Contains timer callbacks (setTimeout, setInterval). Dequeues one task at a time only after all microtasks have cleared."
        }
      ]
    },
    part2: {
      title: "Call Stack, Microtasks & Macrotasks: The Strict Priority Rule",
      intro: "Understanding the exact priority rules governing what code runs next:",
      cards: [
        {
          number: "01",
          tag: "Priority 1",
          title: "Call Stack (Sync)",
          description: "Runs all synchronous statements from top to bottom. Nothing from any queue can run until the Call Stack is completely clear.",
          color: "purple"
        },
        {
          number: "02",
          tag: "Priority 2",
          title: "Microtasks (Promises)",
          description: "Promise callbacks (.then, .catch, await). Whenever the Call Stack empties, the engine drains ALL microtasks to zero before moving on.",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Priority 3",
          title: "Macrotasks (Timers)",
          description: "setTimeout and setInterval callbacks. One macrotask is processed per turn of the event loop, after microtasks are cleared.",
          color: "amber"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Event Loop Order",
        content: "Promise callbacks (Microtasks) ALWAYS run before setTimeout callbacks (Macrotasks), even if the setTimeout delay is set to 0 milliseconds!"
      }
    },
    part3: {
      title: "Execution Order: Why Promises Run Before Timers",
      intro: "Tracing step-by-step why a resolved Promise callback fires before setTimeout(fn, 0):",
      points: [
        {
          title: "1. The Call Stack Empties",
          content: "Synchronous statements (console.log) run first on the Call Stack. While running, any Promises schedule microtasks, and timers schedule macrotasks."
        },
        {
          title: "2. Microtask Queue Drains Completely",
          content: "As soon as the last synchronous line finishes, the Event Loop visits the Microtask Queue and runs every single waiting Promise callback."
        },
        {
          title: "3. Macrotask Queue Executes",
          content: "Only after the Call Stack is empty AND the Microtask Queue has 0 items waiting does the Event Loop pick up the next timer callback."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Misunderstanding setTimeout(fn, 0) Order",
      bad: {
        title: "❌ Bad: Assuming setTimeout(fn, 0) runs immediately between logs",
        code: `console.log("1");
// Buggy assumption: Believing "2" will run immediately because delay is 0ms:
setTimeout(() => console.log("2"), 0);
console.log("3");

// Expected by confused beginner: 1 -> 2 -> 3
// Actual output: 1 -> 3 -> 2!`,
        explanation: "Even with a 0-millisecond delay, setTimeout puts the callback into the Macrotask Queue. It cannot run until all synchronous code finishes."
      },
      good: {
        title: "✅ Clean: Predictable coordination between stack, microtasks, and macrotasks",
        code: `console.log("1. Synchronous Stack Start");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise.then - VIP!)");
});

console.log("2. Synchronous Stack End");

// Output Order:
// 1. Synchronous Stack Start
// 2. Synchronous Stack End
// 3. Microtask (Promise.then - VIP!)
// 4. Macrotask (setTimeout 0ms)`,
        explanation: "Synchronous code runs first (1, 2). Then VIP microtasks drain (3). Finally, the macrotask timer runs (4)."
      }
    },
    part5: {
      title: "Event Loop Priority Playground",
      intro: "Mix synchronous logs, setTimeout timers, and Promise.resolve to observe the exact microtask drain order:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-23: THE EVENT LOOP PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("1️⃣ Synchronous: Call stack line 1");

// Macrotask (Timer):
setTimeout(() => {
  console.log("4️⃣ Macrotask: setTimeout 0ms executed (General boarding)");
}, 0);

// Microtask (Promise):
Promise.resolve().then(() => {
  console.log("3️⃣ Microtask: Promise.then executed (VIP First-Class boarding!)");
});

console.log("2️⃣ Synchronous: Call stack line 2");

// Step-by-step trace:
// 1. "1️⃣" and "2️⃣" execute immediately on the active Call Stack.
// 2. Call Stack becomes empty -> Event Loop checks Microtask Queue.
// 3. Microtask Queue drains -> logs "3️⃣".
// 4. Microtask Queue is empty -> Event Loop dequeues Macrotask -> logs "4️⃣".
`
    },
    part6: {
      title: "Key Takeaways: The Event Loop",
      takeaways: [
        {
          title: "1. Call Stack First",
          desc: "All synchronous code runs to completion before any queued callbacks can execute."
        },
        {
          title: "2. Microtasks Drain Next",
          desc: "Promise handlers (.then, .catch, await) have VIP priority over timers."
        },
        {
          title: "3. Macrotasks Run Last",
          desc: "Timers (setTimeout, setInterval) wait until both stack and microtasks are clear."
        },
        {
          title: "4. The 0ms Reality",
          desc: "setTimeout(fn, 0) schedules a macrotask; it never interrupts synchronous code."
        },
        {
          title: "5. Next Step: Errors, Modules & APIs",
          desc: "In Stage 7, we master Error Handling, ES Modules, and the Fetch API!"
        }
      ],
      nextLessonPreview: {
        title: "JS-24: Error Handling: try, catch, finally & throw",
        desc: "Prevent crashes using try/catch/finally, throw custom errors, and inspect error messages."
      }
    },
    part7: {
      title: "Knowledge Check: The Event Loop",
      quiz: {
        question: "In what exact order will these execute? (A: setTimeout 0ms, B: Synchronous log, C: Promise.resolve().then)",
        options: [
          "A -> B -> C",
          "B -> C -> A",
          "C -> B -> A",
          "B -> A -> C"
        ],
        correctIndex: 1,
        explanation: "Synchronous code (B) executes first on the call stack. Once the stack is empty, microtasks (C: Promise.then) execute before macrotasks (A: setTimeout 0ms)."
      }
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 7 QUIZZES: JS-20, JS-21, JS-22, JS-23
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch7Quizzes = [
  {
    id: "quiz-javascript-js20",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js20-synchronous-vs-asynchronous",
    lessonCode: "JS-20",
    lessonTitle: "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
    description: "Test your understanding of why waiting tasks run in the background with setTimeout instead of freezing your page.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js20-q1",
        type: "multiple_choice",
        title: "The Single Thread and Blocking",
        prompt: "What happens in a browser tab if a synchronous function runs a heavy calculation for 10 seconds?",
        options: [
          "The browser automatically moves it to another thread and the UI stays responsive",
          "The entire page freezes, buttons stop responding, and animations halt because the main thread is blocked",
          "The calculation is paused and rescheduled for night time",
          "The browser restarts immediately"
        ],
        correctAnswer: 1,
        explanation: "Because JavaScript's single main thread runs both your script and the UI rendering loop, heavy synchronous work blocks all user interactions and rendering.",
        hint: "Single thread means only one task can execute on the main thread at a time.",
        hintCostXP: 5
      },
      {
        id: "js20-q2",
        type: "code_output",
        title: "Execution Order with setTimeout",
        prompt: "In what order are the numbers logged by this code?",
        codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);`,
        language: "javascript",
        options: [
          "1, 2, 3",
          "1, 3, 2",
          "2, 1, 3",
          "3, 1, 2"
        ],
        correctAnswer: 1,
        explanation: "1 logs first. setTimeout hands the timer callback to the browser background. 3 logs next. Once all synchronous code finishes, 2 logs last.",
        hint: "Synchronous code on the call stack always runs before task queue callbacks.",
        hintCostXP: 5
      },
      {
        id: "js20-q3",
        type: "multiple_choice",
        title: "Role of Web APIs",
        prompt: "Where do timers (setTimeout) and network calls (fetch) actually wait while your JavaScript code continues running?",
        options: [
          "Inside the Call Stack",
          "In the browser/runtime Web APIs environment outside the JavaScript engine thread",
          "In the CPU register",
          "In the HTML document"
        ],
        correctAnswer: 1,
        explanation: "The browser's host environment (Web APIs in browsers, libuv in Node.js) handles waiting for timers and network packets in background threads without blocking JavaScript.",
        hint: "The host runtime provides background threads for waiting operations.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js21",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js21-promises-and-chaining",
    lessonCode: "JS-21",
    lessonTitle: "Promises: Managing Future Values with .then() & .catch()",
    description: "Test your understanding of Promises: pending, fulfilled, and rejected states, and chaining with .then() and .catch().",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js21-q1",
        type: "code_output",
        title: "Promise .then Chaining Pipeline",
        prompt: "What will be printed to the console by this Promise chain?",
        codeSnippet: `Promise.resolve(5)
  .then(val => val * 2)
  .then(val => val + 3)
  .then(val => console.log(val));`,
        language: "javascript",
        options: [
          "13",
          "10",
          "5",
          "NaN"
        ],
        correctAnswer: 0,
        explanation: "5 is resolved; the first .then multiplies by 2 (10); the second .then adds 3 (13); the third logs 13.",
        hint: "Follow the value through each step of the pipeline: 5 -> *2 -> +3.",
        hintCostXP: 5
      },
      {
        id: "js21-q2",
        type: "multiple_choice",
        title: "Handling Errors in Promise Chains",
        prompt: "Where does execution jump if an error is thrown inside the first .then() of a Promise chain?",
        options: [
          "It ignores the error and continues to the next .then() with null",
          "It skips all subsequent .then() callbacks and jumps directly to the nearest .catch() handler",
          "It restarts the entire script from line 1",
          "It pauses execution for 5 seconds and retries"
        ],
        correctAnswer: 1,
        explanation: "When an exception occurs or a promise rejects, JavaScript skips remaining .then() handlers until it finds the nearest .catch() handler in the chain.",
        hint: ".catch() captures errors thrown anywhere above it in the chain.",
        hintCostXP: 5
      },
      {
        id: "js21-q3",
        type: "code_output",
        title: "Promise.all Results Handling",
        prompt: "What will Promise.all log when running these tasks together?",
        codeSnippet: `const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
Promise.all([p1, p2]).then(results => console.log(results.join("-")));`,
        language: "javascript",
        options: [
          "'A-B'",
          "'AB'",
          "'A'",
          "'undefined-undefined'"
        ],
        correctAnswer: 0,
        explanation: "Promise.all waits for all promises in the array to resolve and delivers their results as an array ['A', 'B']. .join('-') outputs 'A-B'.",
        hint: "Promise.all delivers an array of all resolved values.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js22",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js22-async-await",
    lessonCode: "JS-22",
    lessonTitle: "Async/Await: Clean Asynchronous Workflows",
    description: "Verify your ability to use async/await, handle errors with try/catch, and avoid sequential waterfalls.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js22-q1",
        type: "multiple_choice",
        title: "Async Function Return Value",
        prompt: "What does an 'async' function ALWAYS return, even if you return a plain value like return 42?",
        options: [
          "A number (42)",
          "A Promise that resolves to that value",
          "A callback function",
          "undefined"
        ],
        correctAnswer: 1,
        explanation: "Every async function automatically wraps its return value in a Promise (e.g. Promise.resolve(42)).",
        hint: "Async functions always return Promises.",
        hintCostXP: 5
      },
      {
        id: "js22-q2",
        type: "multiple_choice",
        title: "Parallel Execution with Promise.all",
        prompt: "If you need to fetch users and products at the same time and neither depends on the other, how should you run them?",
        options: [
          "await each sequentially: await getUsers(); await getProducts();",
          "Run them simultaneously with Promise.all([getUsers(), getProducts()])",
          "Create a while loop that waits for both",
          "Use two separate script tags"
        ],
        correctAnswer: 1,
        explanation: "Awaiting them one by one creates an async waterfall where each request waits for the previous one. Promise.all initiates all requests simultaneously.",
        hint: "Promise.all fires independent asynchronous tasks in parallel.",
        hintCostXP: 5
      },
      {
        id: "js22-q3",
        type: "code_output",
        title: "Catching Rejected Promises in async/await",
        prompt: "What will this async function print to the console?",
        codeSnippet: `async function test() {
  try {
    await Promise.reject(new Error("Network timeout"));
    console.log("Success!");
  } catch (err) {
    console.log("Caught: " + err.message);
  }
}
test();`,
        language: "javascript",
        options: [
          "'Success!'",
          "'Caught: Network timeout'",
          "Uncaught Promise Rejection error",
          "Nothing is printed"
        ],
        correctAnswer: 1,
        explanation: "Awaiting a rejected promise throws an exception inside the async function, jumping directly into the catch block.",
        hint: "await unwraps rejections as standard thrown exceptions.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js23",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js23-the-event-loop",
    lessonCode: "JS-23",
    lessonTitle: "The Event Loop: Call Stack & Task Queues",
    description: "Understand how JavaScript runs code on the Call Stack and handles background tasks with microtasks (Promises) and macrotasks (Timers).",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js23-q1",
        type: "code_output",
        title: "Microtask vs Macrotask Order",
        prompt: "In what exact order will the numbers 1, 2, 3, 4 be logged to the console?",
        codeSnippet: `console.log(1);

setTimeout(() => {
  console.log(4);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(2);`,
        language: "javascript",
        options: [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 2, 4, 3",
          "3, 1, 2, 4"
        ],
        correctAnswer: 0,
        explanation: "1. Synchronous code on the Call Stack runs first: prints 1, then 2.\n2. When the Call Stack empties, the Microtask Queue drains: prints 3.\n3. The Event Loop advances to the Macrotask Queue: prints 4.\nFinal order: 1, 2, 3, 4.",
        hint: "Synchronous first -> Microtasks (Promises) second -> Macrotasks (setTimeout) third.",
        hintCostXP: 5
      },
      {
        id: "js23-q2",
        type: "multiple_choice",
        title: "Microtask Queue Drain Rule",
        prompt: "When does the Event Loop check and process the Macrotask Queue (timers)?",
        options: [
          "Only after the Call Stack is empty AND the Microtask Queue is completely drained",
          "Simultaneously on a separate background thread",
          "Before executing any synchronous functions",
          "Every 100 milliseconds regardless of other tasks"
        ],
        correctAnswer: 0,
        explanation: "The engine never advances to the next Macrotask until the Call Stack is empty and all pending Microtasks (promises) have completely finished running.",
        hint: "Microtasks have VIP priority over Macrotasks.",
        hintCostXP: 5
      },
      {
        id: "js23-q3",
        type: "code_output",
        title: "Zero-Millisecond Timeout Behavior",
        prompt: "What does setTimeout(fn, 0) do in JavaScript?",
        codeSnippet: `console.log("A");
setTimeout(() => console.log("C"), 0);
console.log("B");`,
        language: "javascript",
        options: [
          "Logs A, B, C",
          "Logs A, C, B",
          "Logs C, A, B",
          "Throws an error because delay cannot be zero"
        ],
        correctAnswer: 0,
        explanation: "Code on the Call Stack runs first (A, B). When it clears, queued macrotask callbacks (C) run next.",
        hint: "Timers always wait for the Call Stack to empty.",
        hintCostXP: 5
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO LESSON CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lessonContent = fs.readFileSync(lessonFilePath, 'utf8');

for (const [slug, lessonObj] of Object.entries(batch7Lessons)) {
  const marker = `  "${slug}": {`;
  const startIdx = lessonContent.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`Could not find ${slug} in ${lessonFilePath}`);
  }

  // Find end of this lesson entry: look for next lesson entry or end of object
  const nextSlugs = [
    'js21-promises-and-chaining',
    'js22-async-await',
    'js23-the-event-loop',
    'js24-error-handling'
  ];
  
  let endIdx = -1;
  for (const nextSlug of nextSlugs) {
    if (nextSlug === slug) continue;
    const nextMarker = `  "${nextSlug}": {`;
    const foundIdx = lessonContent.indexOf(nextMarker, startIdx);
    if (foundIdx !== -1) {
      if (endIdx === -1 || foundIdx < endIdx) {
        endIdx = foundIdx;
      }
    }
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end index for ${slug}`);
  }

  const replacement = `  "${slug}": ` + JSON.stringify(lessonObj, null, 2) + ',\n\n';
  lessonContent = lessonContent.substring(0, startIdx) + replacement + lessonContent.substring(endIdx);
}

fs.writeFileSync(lessonFilePath, lessonContent, 'utf8');
console.log('Successfully updated javascript-lesson-content.ts for JS-20, JS-21, JS-22, and JS-23!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO QUIZZES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let quizContent = fs.readFileSync(quizFilePath, 'utf8');

for (const quizObj of batch7Quizzes) {
  const marker = `"lessonSlug": "${quizObj.lessonSlug}"`;
  const markerIdx = quizContent.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error(`Could not find quiz for ${quizObj.lessonSlug} in ${quizFilePath}`);
  }

  // Find the opening brace of this quiz object: last "  {" before markerIdx
  const startIdx = quizContent.lastIndexOf('  {', markerIdx);
  if (startIdx === -1) {
    throw new Error(`Could not find start of quiz object for ${quizObj.lessonSlug}`);
  }

  // Find the closing brace of this quiz object: "\n  }," or "\n  }"
  const closeComma = quizContent.indexOf('\n  },', startIdx);
  const closeBrace = quizContent.indexOf('\n  }\n];', startIdx);
  
  let endIdx = -1;
  let hasTrailingComma = true;
  if (closeComma !== -1 && (closeBrace === -1 || closeComma < closeBrace)) {
    endIdx = closeComma + 5; // length of "\n  },"
    hasTrailingComma = true;
  } else if (closeBrace !== -1) {
    endIdx = closeBrace + 4; // length of "\n  }"
    hasTrailingComma = false;
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end of quiz object for ${quizObj.lessonSlug}`);
  }

  const formattedQuiz = '  ' + JSON.stringify(quizObj, null, 2).replace(/\n/g, '\n  ') + (hasTrailingComma ? ',' : '');
  quizContent = quizContent.substring(0, startIdx) + formattedQuiz + quizContent.substring(endIdx);
}

fs.writeFileSync(quizFilePath, quizContent, 'utf8');
console.log('Successfully updated lib/quiz/javascript-quizzes.ts for JS-20, JS-21, JS-22, and JS-23!');
