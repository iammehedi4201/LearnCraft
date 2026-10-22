import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js09CallbacksAndHigherOrderFunctionsContent: StandardLessonContent = {
  slug: "js09-callbacks-and-higher-order-functions",
  code: "JS-09",
  title: "Using Callback Functions",
  subtitle: "Understand how JavaScript treats functions as values, pass callbacks to customize behavior, and master higher-order functions.",
  sections: [
    {
      id: "part1",
      label: "First-Class Functions",
      icon: "🎖️",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Callbacks in Action",
      icon: "📞",
      tag: "MECHANICS"
    },
    {
      id: "part3",
      label: "Execution Flow",
      icon: "🧠",
      tag: "FLOW TRACE"
    },
    {
      id: "part4",
      label: "Immediate Invocation Bug",
      icon: "⚠️",
      tag: "TRAPS"
    },
    {
      id: "part5",
      label: "Callbacks Sandbox",
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
    title: "Functions as First-Class Citizens",
    bigPicture: "In JavaScript, functions are first-class values. Just like numbers, strings, and objects, functions can be assigned to variables, passed as arguments into other functions, and returned from functions.",
    analogy: "Think of a callback like handing someone your phone number. You don't call yourself right now; you hand them the number so they can call you back when their task is ready.",
    diagram: "+---------------------------------------------------+\n| 1. Define Callback: const double = (x) => x * 2;  |\n+---------------------------------------------------+\n                         |\n                         v (Passed as value)\n+---------------------------------------------------+\n| 2. Higher-Order Function: transformArray(arr, fn) |\n|    Executes fn(item) for each element in arr      |\n+---------------------------------------------------+\n                         |\n                         v\n[10, 20, 30] transformed by double() --> [20, 40, 60]",
    breakdownTitle: "Core Definitions",
    breakdownItems: [
      {
        title: "Higher-Order Function (HOF)",
        desc: "A function that receives another function as an argument, OR returns a new function as its output."
      },
      {
        title: "Callback Function",
        desc: "The function that is passed into the HOF to be invoked (called back) during or after execution."
      },
      {
        title: "Declarative Flexibility",
        desc: "HOFs separate the mechanics of iteration or scheduling from the specific business logic you want executed."
      }
    ]
  },
  part2: {
    title: "How Higher-Order Functions Work",
    intro: "Observe how passing function references creates adaptable, reusable abstractions.",
    cards: [
      {
        number: "01",
        tag: "HOF",
        title: "Accepting a Callback",
        description: "A function takes an action as a parameter and invokes it with its internal data.",
        codeSnippet: "function repeatAction(times, callback) {\n  for (let i = 1; i <= times; i++) {\n    callback(i);\n  }\n}\nrepeatAction(3, (step) => console.log(\"Step:\", step));\n// Output:\n// Step: 1\n// Step: 2\n// Step: 3",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Transform",
        title: "Custom Transformations",
        description: "Swap the callback to change how data is processed without rewriting the loop logic.",
        codeSnippet: "function processScore(score, formatFn) {\n  return formatFn(score);\n}\nconst asPercent = (s) => s + \"%\";\nconst asPoints = (s) => s + \" pts\";\nconsole.log(processScore(95, asPercent)); // Output: 95%\nconsole.log(processScore(95, asPoints));  // Output: 95 pts",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Async",
        title: "Asynchronous Callbacks",
        description: "Browser APIs like setTimeout execute callbacks after a delay or user event.",
        codeSnippet: "console.log(\"Starting...\");\nsetTimeout(() => {\n  console.log(\"Callback executed after 500ms!\");\n}, 500);\n// Output:\n// Starting...\n// (500ms later) Callback executed after 500ms!",
        color: "purple"
      }
    ],
    rule: {
      title: "Passing by Reference Rule",
      content: "When passing a callback, pass only the function's name (reference). Do NOT add parentheses () unless you explicitly want to call it immediately during the setup call."
    }
  },
  part3: {
    title: "Step-by-Step Callback Execution Flow",
    intro: "Trace how control transfers between the caller, the higher-order function, and the callback.",
    points: [
      {
        title: "Step 1: Passing the Function Pointer",
        content: "When you pass a function name as an argument, JavaScript passes a reference to that function in memory, not its return value.",
        codeSnippet: "function logAlert(message) {\n  console.log(\"[ALERT]:\", message);\n}\nfunction runSecurityCheck(notifier) {\n  notifier(\"Unauthorized access detected\");\n}\nrunSecurityCheck(logAlert); // Output: [ALERT]: Unauthorized access detected"
      },
      {
        title: "Step 2: Synchronous Callback Flow",
        content: "Synchronous callbacks run immediately within the caller's stack frame before the higher-order function returns.",
        codeSnippet: "const items = [1, 2, 3];\n// The callback executes 3 times synchronously\nitems.forEach(item => console.log(item * 10));\n// Output: 10, 20, 30"
      },
      {
        title: "Step 3: Returning Functions from Functions",
        content: "Higher-order functions can also configure and return new specialized functions.",
        codeSnippet: "function createLogger(moduleName) {\n  return (msg) => console.log(`[${moduleName}] ${msg}`);\n}\nconst authLog = createLogger(\"AUTH\");\nauthLog(\"User logged in\"); // Output: [AUTH] User logged in"
      }
    ]
  },
  part4: {
    title: "The Classic Misconception: Passing fn vs fn()",
    bad: {
      title: "❌ Immediate Invocation with Parentheses ()",
      code: "function notifyUser() {\n  return \"Notification sent!\";\n}\n\n// Bug: notifyUser() with parentheses runs IMMEDIATELY!\n// Passes the return string \"Notification sent!\" instead of the function\n// setTimeout(notifyUser(), 1000); // TypeError: callback must be a function!",
      explanation: "Adding parentheses executes the function immediately right now, passing its return value instead of passing the function itself as a callback."
    },
    good: {
      title: "✅ Pass the Function Reference Without ()",
      code: "function notifyUser() {\n  console.log(\"Notification sent!\");\n}\n\n// Correct: Pass the function identifier itself\nsetTimeout(notifyUser, 1000);\n\n// Or wrap in an inline arrow callback if passing arguments:\nsetTimeout(() => notifyUser(), 1000);",
      explanation: "Pass the function reference by name without parentheses, so the host function can invoke it at the appropriate time."
    }
  },
  part5: {
    title: "Callbacks Sandbox",
    intro: "Build a filter function that takes an array and a test predicate callback function.",
    starterCode: "function customFilter(list, predicateFn) {\n  const matching = [];\n  for (const item of list) {\n    // Invoke the callback on each element:\n    if (predicateFn(item)) {\n      matching.push(item);\n    }\n  }\n  return matching;\n}\n\nconst numbers = [5, 12, 8, 130, 44, 9];\n\n// 1. Filter even numbers:\nconst isEven = (n) => n % 2 === 0;\nconsole.log(\"Even numbers:\", customFilter(numbers, isEven));\n\n// 2. Filter numbers greater than 20 with an inline arrow callback:\nconst over20 = customFilter(numbers, (n) => n > 20);\nconsole.log(\"Numbers > 20:\", over20);\n"
  },
  part6: {
    title: "Key Takeaways: Callbacks & HOFs",
    takeaways: [
      {
        title: "First-Class Functions",
        desc: "Functions can be stored in variables, passed into functions, and returned like any value."
      },
      {
        title: "Higher-Order Functions",
        desc: "Functions that take or return other functions to create reusable, customizable workflows."
      },
      {
        title: "Don't Add Parentheses",
        desc: "Pass function references by name (handleClick) instead of calling them immediately (handleClick())."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the result of writing `setTimeout(greetUser(), 1000)` instead of `setTimeout(greetUser, 1000)`?",
      options: [
        "greetUser is executed after a 2-second delay instead of 1 second",
        "greetUser is invoked immediately when the line runs, and its return value is passed to setTimeout",
        "JavaScript automatically pauses the script until the function finishes",
        "It triggers an infinite loop inside the Call Stack"
      ],
      correctIndex: 1,
      explanation: "The parentheses `()` cause `greetUser()` to be called immediately on that line. Whatever it returns is passed to `setTimeout`, causing an error if the return value is not a function."
    }
  }
};
