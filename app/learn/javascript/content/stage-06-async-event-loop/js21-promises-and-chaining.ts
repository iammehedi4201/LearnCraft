import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js21PromisesAndChainingContent: StandardLessonContent = {
  slug: "js21-promises-and-chaining",
  code: "JS-21",
  title: "Working with Promises",
  subtitle: "Master Promise states (Pending, Fulfilled, Rejected), flat method chaining with .then(), and centralized error handling with .catch().",
  sections: [
    {
      id: "part1",
      label: "Working with Promises",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Promise States & Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Chaining Promises",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Missing return in .then()",
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
    title: "Working with Promises",
    bigPicture: "A Promise represents the eventual result of an async task. It exists in one of three states: pending, fulfilled (`.then()`), or rejected (`.catch()`).",
    breakdownTitle: "The Three Promise States",
    breakdownItems: [
      {
        title: "Pending",
        desc: "The initial state while the background operation is still running."
      },
      {
        title: "Fulfilled (Resolved)",
        desc: "The task succeeded and passed data to `.then(result => ...)`."
      },
      {
        title: "Rejected (Failed)",
        desc: "The task failed and routed an error to `.catch(error => ...)`."
      }
    ]
  },
  part2: {
    title: "Creating and Consuming Promises",
    intro: "Learn the syntax for creating promises and listening for their results.",
    cards: [
      {
        number: "01",
        tag: "Creating",
        title: "The Promise Constructor",
        description: "Takes a function with resolve and reject parameters.",
        codeSnippet: "const checkInventory = new Promise((resolve, reject) => {\n  const inStock = true;\n  if (inStock) resolve(\"Item is available!\");\n  else reject(\"Out of stock\");\n});",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Consuming",
        title: ".then() for Success",
        description: "Executes when the promise resolves successfully with data.",
        codeSnippet: "checkInventory.then((message) => {\n  console.log(\"Success:\", message);\n});\n// Output: Success: Item is available!",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Errors",
        title: ".catch() for Failures",
        description: "Catches any error that occurs anywhere in the promise pipeline.",
        codeSnippet: "checkInventory.catch((error) => {\n  console.error(\"Error:\", error);\n});",
        color: "purple"
      }
    ],
    rule: {
      title: "Settlement Rule",
      content: "Once a promise settles (becomes either fulfilled or rejected), its state is locked forever. It can never resolve or reject a second time."
    }
  },
  part3: {
    title: "Chaining Sequential Promises with .then()",
    intro: "Flatten complex asynchronous tasks into clean, readable chains.",
    points: [
      {
        title: "1. Returning Values Between .then() Calls",
        content: "Whatever you return from a .then() block is automatically passed as the argument to the next .then() in the chain.",
        codeSnippet: "Promise.resolve(10)\n  .then(num => num * 2)    // Returns 20\n  .then(num => num + 5)    // Returns 25\n  .then(result => console.log(\"Final result:\", result)); // Output: Final result: 25"
      },
      {
        title: "2. Chaining Multiple Asynchronous Steps",
        content: "If a .then() returns a new Promise, JavaScript automatically waits for that new Promise to resolve before continuing.",
        codeSnippet: "fetchUser(1)\n  .then(user => fetchUserOrders(user.id))\n  .then(orders => console.log(\"User orders:\", orders.length));"
      },
      {
        title: "3. Centralized Error Handling",
        content: "A single .catch() at the bottom of the chain catches errors from ANY preceding step.",
        codeSnippet: "fetchData()\n  .then(step1)\n  .then(step2)\n  .catch(err => console.log(\"Caught error from any step:\", err.message));"
      }
    ]
  },
  part4: {
    title: "Common Trap: Forgetting to return Inside .then()",
    bad: {
      title: "❌ Omitting return in Multi-line .then()",
      code: "Promise.resolve(50)\n  .then(val => {\n    val * 2; // BUG: Missing explicit return!\n  })\n  .then(result => {\n    console.log(\"Result is:\", result);\n  });\n// Output: Result is: undefined",
      explanation: "Without an explicit return statement inside the curly braces, the callback returns undefined to the next .then()."
    },
    good: {
      title: "✅ Always return the Value to the Next Step",
      code: "Promise.resolve(50)\n  .then(val => val * 2) // Clean implicit return\n  .then(result => {\n    console.log(\"Result is:\", result);\n  });\n// Output: Result is: 100",
      explanation: "Returning the value allows the next .then() to receive the transformed data."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Trace the execution of this simulated user order verification chain.",
    starterCode: "console.log(\"Initiating verification request for user #42...\");\n\n// 1. A simulated async promise function:\nfunction verifyUser(id) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ id, name: \"Maya\", verified: true }), 100);\n  });\n}\n\n// 2. Chain the promise:\nverifyUser(42)\n  .then((user) => {\n    console.log(\"1. User verified:\", user.name);\n    return `${user.name.toUpperCase()} (ID: ${user.id})`;\n  })\n  .then((formattedLabel) => {\n    console.log(\"2. Formatted label:\", formattedLabel);\n  })\n  .catch((err) => {\n    console.error(\"Verification error:\", err);\n  });\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Promises Represent Future Data",
        desc: "A promise is an object with 3 states: Pending, Fulfilled, or Rejected."
      },
      {
        title: "Use .then() and .catch()",
        desc: "Handle successful results with .then() and catch all errors with .catch()."
      },
      {
        title: "Always return in Chains",
        desc: "Return values from each .then() step so the next step can receive the data."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the initial state of a newly created Promise that is still executing its asynchronous task?",
      options: [
        "Pending",
        "Fulfilled",
        "Resolved",
        "Undefined"
      ],
      correctIndex: 0,
      explanation: "A Promise always begins in the 'Pending' state. Once its operation completes, it permanently transitions to either 'Fulfilled' (on success) or 'Rejected' (on failure)."
    }
  }
};
