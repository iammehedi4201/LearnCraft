import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js09CallbacksAndHigherOrderFunctionsContent: StandardLessonContent = {
  slug: "js09-callbacks-and-higher-order-functions",
  code: "JS-09",
  title: "Using Callback Functions",
  subtitle: "Treat functions as values: pass callback functions into other functions and understand how JavaScript handles events and timing.",
  sections: [
    {
      id: "part1",
      label: "Callback Functions",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Built-in Callbacks",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Higher-Order Functions",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Immediate Invocation Trap",
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
    title: "Using Callback Functions",
    bigPicture: "In JavaScript, functions are values. A callback is a function passed as an argument to another function (a higher-order function) to be executed later.",
    breakdownTitle: "Key Callback Concepts",
    breakdownItems: [
      {
        title: "What is a Callback?",
        desc: "A function passed as an argument to be invoked when a specific action finishes."
      },
      {
        title: "Higher-Order Functions",
        desc: "Any function that takes a function as an argument or returns another function."
      },
      {
        title: "Everyday Usage",
        desc: "Callbacks power timers (setTimeout), button clicks, network requests, and array methods."
      }
    ]
  },
  part2: {
    title: "Built-in Callback Functions",
    intro: "You see callbacks whenever you work with timers or lists in JavaScript.",
    cards: [
      {
        number: "01",
        tag: "Timers",
        title: "setTimeout Callback",
        description: "Runs the callback function after a specified delay in milliseconds.",
        codeSnippet: "setTimeout(() => {\n  console.log(\"Executed after 1 second\");\n}, 1000);",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Inline Arrow",
        title: "Inline Arrow Callbacks",
        description: "Define the callback function directly where you pass it.",
        codeSnippet: "const numbers = [1, 2, 3];\nnumbers.forEach((num) => {\n  console.log(\"Item:\", num);\n});\n// Output: Item: 1, Item: 2, Item: 3",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Named Function",
        title: "Passing Named Callbacks",
        description: "You can pass an existing named function as a callback without parentheses.",
        codeSnippet: "function logGreeting(name) {\n  console.log(\"Hello,\", name);\n}\nconst users = [\"Alex\", \"Maya\"];\nusers.forEach(logGreeting);\n// Output:\n// Hello, Alex\n// Hello, Maya",
        color: "purple"
      }
    ],
    rule: {
      title: "The Golden Callback Rule",
      content: "Pass the function name (sayHello). Do NOT add parentheses (sayHello()), or it will run immediately instead of waiting!"
    }
  },
  part3: {
    title: "Writing Higher-Order Functions",
    intro: "Step through how to create a function that takes a callback parameter.",
    points: [
      {
        title: "1. Define the Parent Function",
        content: "Give the function a parameter named 'callback' or 'action' to receive the function.",
        codeSnippet: "function repeatAction(times, action) {\n  for (let i = 1; i <= times; i++) {\n    action(i); // Invokes the callback!\n  }\n}"
      },
      {
        title: "2. Pass Custom Behavior",
        content: "Call the parent function and pass in whatever logic you want to run on each step.",
        codeSnippet: "repeatAction(3, (step) => {\n  console.log(\"Step complete:\", step);\n});\n// Output:\n// Step complete: 1\n// Step complete: 2\n// Step complete: 3"
      },
      {
        title: "3. Reusing the Same Higher-Order Function",
        content: "You can pass completely different callbacks into the same function without changing its definition.",
        codeSnippet: "repeatAction(2, (num) => {\n  console.log(\"Notification bell rang\", num);\n});"
      }
    ]
  },
  part4: {
    title: "Common Trap: Calling Callbacks Immediately",
    bad: {
      title: "❌ Adding Parentheses When Passing a Callback",
      code: "function showSuccess() {\n  console.log(\"Task completed!\");\n}\n// BUG: showSuccess() runs right now! setTimeout receives undefined!\nsetTimeout(showSuccess(), 2000);",
      explanation: "Adding () invokes the function immediately on line 5 instead of waiting for the 2-second timer to expire."
    },
    good: {
      title: "✅ Pass Only the Function Reference",
      code: "function showSuccess() {\n  console.log(\"Task completed!\");\n}\n// Correct: Pass the function name without ()\nsetTimeout(showSuccess, 2000);\n// Runs after 2 seconds as intended!",
      explanation: "Passing the function name without () gives setTimeout the function to call when the timer finishes."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Run custom higher-order functions that accept callbacks and process data dynamically.",
    starterCode: "// 1. A function that accepts a data item and a callback:\nfunction processOrder(orderId, callback) {\n  console.log(\"Processing order:\", orderId);\n  callback(orderId, \"Confirmed\");\n}\n\n// 2. Call it with an inline arrow callback:\nprocessOrder(1042, (id, status) => {\n  console.log(`Order ${id} status updated to: ${status}`);\n});\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Functions are Passable Values",
        desc: "You can pass functions into other functions just like numbers and strings."
      },
      {
        title: "Pass by Name Without ()",
        desc: "Pass fn to hand over the reference; fn() runs immediately."
      },
      {
        title: "Core to JavaScript",
        desc: "Callbacks are essential for handling delays, events, and modern array methods."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why should you write setTimeout(myFunc, 1000) instead of setTimeout(myFunc(), 1000)?",
      options: [
        "myFunc passes the function reference to be called later; myFunc() runs the function immediately",
        "myFunc() is only supported in older browsers",
        "myFunc causes an error because functions cannot be passed by name",
        "There is no difference; both run after 1 second"
      ],
      correctIndex: 0,
      explanation: "Writing parentheses myFunc() invokes the function immediately when the line is read. Passing just myFunc passes the function reference so setTimeout can call it after the 1-second delay."
    }
  }
};
