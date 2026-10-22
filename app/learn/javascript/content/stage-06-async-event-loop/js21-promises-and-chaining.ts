import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js21PromisesAndChainingContent: StandardLessonContent = {
  slug: "js21-promises-and-chaining",
  code: "JS-21",
  title: "Working with Promises",
  subtitle: "Master Promise lifecycles (pending, fulfilled, rejected), chain sequential async tasks cleanly, and handle errors with .catch().",
  sections: [
    {
      id: "part1",
      label: "Promise Lifecycle",
      icon: "🤝",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "States & Chaining",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Chaining & Error Bubbling",
      icon: "🔗",
      tag: "ERROR FLOW"
    },
    {
      id: "part4",
      label: "Nested Promise Anti-Pattern",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Promises Sandbox",
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
    title: "Promises: Future Values in JavaScript",
    bigPicture: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. Instead of passing nested callbacks, a Promise allows you to attach handlers (.then and .catch) to future outcomes.",
    analogy: "Like ordering a package online: immediately upon checkout, you receive a tracking number (Promise in Pending state). Days later, the package arrives (Fulfilled) or is lost in transit (Rejected). Once delivered, the status is final.",
    diagram: "+--------------------------------------------------------+\n|                   PROMISE LIFECYCLE                    |\n|                                                        |\n|                  [ PENDING (Initial) ]                 |\n|                     /              \\                   |\n|       resolve(value)                reject(error)      |\n|                   v                  v                 |\n|        [ FULFILLED (Success) ]   [ REJECTED (Error) ]   |\n|                   |                  |                 |\n|               .then()             .catch()             |\n+--------------------------------------------------------+",
    breakdownTitle: "Promise Core Invariants",
    breakdownItems: [
      {
        title: "The Three States",
        desc: "Pending (working), Fulfilled (successful with value), or Rejected (failed with error)."
      },
      {
        title: "Settled and Immutable",
        desc: "A Promise can only settle once. Once fulfilled or rejected, its state and value can never change."
      },
      {
        title: "Chainable .then() Returns a New Promise",
        desc: "Every .then() call automatically returns a brand new Promise, allowing linear sequential chaining."
      }
    ]
  },
  part2: {
    title: "Creating and Consuming Promises",
    intro: "Step through how to instantiate a Promise and consume its result.",
    cards: [
      {
        number: "01",
        tag: "Constructor",
        title: "Creating a Promise",
        description: "Uses the Promise constructor with resolve and reject callbacks.",
        codeSnippet: "const checkInventory = new Promise((resolve, reject) => {\n  const inStock = true;\n  if (inStock) {\n    resolve(\"Items ready for shipping\");\n  } else {\n    reject(new Error(\"Out of stock\"));\n  }\n});",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Consuming",
        title: "Handling with .then() & .catch()",
        description: "Attach .then() for successful results and .catch() for errors.",
        codeSnippet: "checkInventory\n  .then(message => console.log(\"Success:\", message))\n  .catch(err => console.error(\"Error:\", err.message));\n// Output: Success: Items ready for shipping",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Finally",
        title: "Cleanup with .finally()",
        description: "Runs regardless of whether the Promise was fulfilled or rejected.",
        codeSnippet: "checkInventory\n  .then(res => console.log(res))\n  .finally(() => console.log(\"Cleanup completed.\"));\n// Runs at the very end of the lifecycle",
        color: "purple"
      }
    ],
    rule: {
      title: "Chaining Invariant",
      content: "If you return a value inside .then(), the next .then() receives that resolved value. If you return a new Promise, the next .then() waits for that Promise to settle."
    }
  },
  part3: {
    title: "Sequential Chaining & Error Bubbling",
    intro: "Trace how Promises avoid callback hell and handle errors gracefully.",
    points: [
      {
        title: "1. Returning Values Down the Chain",
        content: "Values returned from one .then() are automatically passed to the next .then() in the pipeline.",
        codeSnippet: "Promise.resolve(10)\n  .then(n => n * 2)   // returns 20\n  .then(n => n + 5)   // returns 25\n  .then(finalVal => console.log(\"Final:\", finalVal));\n// Output: Final: 25"
      },
      {
        title: "2. Error Bubbling to .catch()",
        content: "If an error occurs anywhere in the chain, execution skips all downstream .then() callbacks and jumps directly to the nearest .catch().",
        codeSnippet: "Promise.resolve(100)\n  .then(n => {\n    throw new Error(\"Database timeout\");\n  })\n  .then(n => console.log(\"Skipped!\", n))\n  .catch(err => console.log(\"Caught error:\", err.message));\n// Output: Caught error: Database timeout"
      },
      {
        title: "3. Concurrent Execution with Promise.all()",
        content: "Run multiple independent promises in parallel. Resolves when all pass, or rejects immediately if any one fails.",
        codeSnippet: "const p1 = Promise.resolve(\"User data\");\nconst p2 = Promise.resolve(\"Cart data\");\nPromise.all([p1, p2]).then(([user, cart]) => {\n  console.log(user, \"+\", cart);\n});\n// Output: User data + Cart data"
      }
    ]
  },
  part4: {
    title: "Common Anti-Pattern: The Nested Promise Pyramid",
    bad: {
      title: "❌ Nesting .then() Inside .then() (Callback Hell Reborn)",
      code: "getUser(1).then(user => {\n  // Bug: Nesting inside .then() reproduces callback hell!\n  getOrders(user.id).then(orders => {\n    getOrderDetails(orders[0]).then(details => {\n      console.log(details);\n    });\n  });\n});",
      explanation: "Nesting .then() blocks defeats the purpose of Promises, making error handling and code reading unnecessarily complex."
    },
    good: {
      title: "✅ Flat Promise Chaining by Returning Promises",
      code: "getUser(1)\n  .then(user => getOrders(user.id))       // Return next promise\n  .then(orders => getOrderDetails(orders[0])) // Return next promise\n  .then(details => console.log(details))   // Final result\n  .catch(err => console.error(err));       // Single catch handles all steps!",
      explanation: "Returning promises from each .then() keeps the chain completely flat, with one centralized .catch() handling any failure."
    }
  },
  part5: {
    title: "Promises Sandbox",
    intro: "Step through an asynchronous order processing pipeline using chained Promises.",
    starterCode: "console.log(\"Initiating order pipeline...\");\n\nfunction verifyStock(item) {\n  return Promise.resolve({ item, inStock: true });\n}\n\nfunction calculatePrice(order) {\n  return Promise.resolve({ ...order, price: 49.99 });\n}\n\nfunction chargeCustomer(order) {\n  return Promise.resolve({ ...order, transactionId: \"TX-9876\" });\n}\n\n// Flat sequential pipeline:\nverifyStock(\"Wireless Headphones\")\n  .then(order => calculatePrice(order))\n  .then(order => chargeCustomer(order))\n  .then(receipt => {\n    console.log(\"Order complete! Transaction ID:\", receipt.transactionId);\n    console.log(\"Total price: $\" + receipt.price);\n  })\n  .catch(err => console.error(\"Pipeline failed:\", err.message));\n"
  },
  part6: {
    title: "Key Takeaways: Promises",
    takeaways: [
      {
        title: "Three Immutable States",
        desc: "Pending, Fulfilled, or Rejected. Once settled, the state cannot change."
      },
      {
        title: "Flat Chaining",
        desc: "Return promises inside .then() to keep asynchronous code clean and linear."
      },
      {
        title: "Centralized Error Handling",
        desc: "A single .catch() at the bottom catches errors from any previous step in the chain."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does returning a new Promise inside a `.then()` handler do to the promise chain?",
      options: [
        "It cancels the rest of the chain immediately",
        "It causes the next `.then()` in the chain to wait until that new Promise settles",
        "It converts the entire chain to synchronous code",
        "It throws a TypeError: Recursive promise detected"
      ],
      correctIndex: 1,
      explanation: "When you return a Promise from a `.then()` callback, the promise chain pauses and waits for that returned Promise to resolve or reject before continuing down the chain."
    }
  }
};
