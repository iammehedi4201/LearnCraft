import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js01HowJavascriptRunsContent: StandardLessonContent = {
  slug: "js01-how-javascript-runs",
  code: "JS-01",
  title: "How JavaScript Runs Code",
  subtitle: "Understand how the JavaScript engine executes code line by line, manages function execution frames on the Call Stack, and handles single-threaded execution.",
  sections: [
    {
      id: "part1",
      label: "Engine & Call Stack",
      icon: "⚡",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Stack Frames in Action",
      icon: "📚",
      tag: "MECHANICS"
    },
    {
      id: "part3",
      label: "Execution Tracing",
      icon: "🧠",
      tag: "MENTAL MODEL"
    },
    {
      id: "part4",
      label: "Stack Overflow & Errors",
      icon: "⚠️",
      tag: "TRAPS"
    },
    {
      id: "part5",
      label: "Execution Sandbox",
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
    title: "The Single Thread & The Call Stack",
    bigPicture: "JavaScript is a single-threaded language. It possesses exactly one Call Stack and executes exactly one command at any given moment, strictly processing instructions from top to bottom.",
    analogy: "Picture a physical stack of dinner plates. You can only place a new plate on top (push), and you must remove the top plate before accessing the ones underneath (pop). That is the Call Stack.",
    diagram: "+---------------------------------------------------+\n| 3. formatReceipt()  <-- Currently Executing (Top) |\n+---------------------------------------------------+\n| 2. calculateTotal() <-- Paused waiting for Top    |\n+---------------------------------------------------+\n| 1. checkout()       <-- Paused waiting for #2     |\n+---------------------------------------------------+\n| 0. Global Context   <-- Base of the Program       |\n+---------------------------------------------------+",
    breakdownTitle: "Engine Execution Architecture",
    breakdownItems: [
      {
        title: "Single Thread of Execution",
        desc: "JavaScript has one main thread and one call stack. Two functions cannot run at the exact same microsecond on this thread."
      },
      {
        title: "The Call Stack (LIFO)",
        desc: "Last-In, First-Out data structure. When a function is invoked, its execution frame is pushed onto the top. When it finishes and returns, it is popped off."
      },
      {
        title: "Memory Heap & Garbage Collection",
        desc: "Variables, objects, and function definitions are allocated in the memory heap. The engine automatically reclaims memory when data is no longer referenced."
      }
    ]
  },
  part2: {
    title: "How the Call Stack Processes Functions",
    intro: "Observe how nested function calls push new stack frames and pop them upon completion.",
    cards: [
      {
        number: "01",
        tag: "Push Frame",
        title: "Function Invocation (Push)",
        description: "Calling a function creates an execution context with its local variables and pushes it onto the top of the stack.",
        codeSnippet: "function multiply(a, b) {\n  return a * b; // Step 2: Executes and returns\n}\n\nfunction calculate(num) {\n  return multiply(num, 2); // Step 1: Pushes multiply()\n}\n\nconst result = calculate(10);\nconsole.log(result); // Output: 20",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Pop Frame",
        title: "Return & Deallocation (Pop)",
        description: "When the top function returns a value, its stack frame is instantly popped off, and control returns to the caller.",
        codeSnippet: "function greet(name) {\n  return \"Welcome, \" + name;\n}\n\n// greet() pushes to stack, runs, returns, pops off\nconst message = greet(\"Alex\");\nconsole.log(message);\n// Output: Welcome, Alex",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Console Log",
        title: "Output & Inspection",
        description: "console.log() is itself a function that pushes to the stack, writes output to the console stream, and pops off immediately.",
        codeSnippet: "console.log(\"First\");\nconsole.log(\"Second\");\nconsole.log(\"Third\");\n// Output:\n// First\n// Second\n// Third",
        color: "purple"
      }
    ],
    rule: {
      title: "Call Stack Execution Invariant",
      content: "The JavaScript engine only ever executes the function frame resting at the very top of the Call Stack. All functions beneath it remain paused until the top frame returns."
    }
  },
  part3: {
    title: "Step-by-Step Execution Tracing",
    intro: "Trace how the engine allocates memory and steps through statements sequentially.",
    points: [
      {
        title: "Step 1: Global Context Initialization",
        content: "When a script starts, the engine creates the Global Execution Context. Global variables and function declarations are recorded in memory before execution begins.",
        codeSnippet: "const baseRate = 1.05;\nfunction applyRate(amount) {\n  return amount * baseRate;\n}\nconsole.log(applyRate(100)); // Output: 105"
      },
      {
        title: "Step 2: Nested Calls Suspend Callers",
        content: "When a function calls a second function, the caller's execution is temporarily suspended with its local state frozen until the second function completes.",
        codeSnippet: "function first() {\n  console.log(\"1. Enter first\");\n  second();\n  console.log(\"3. Exit first\");\n}\nfunction second() {\n  console.log(\"2. Inside second\");\n}\nfirst();\n// Output:\n// 1. Enter first\n// 2. Inside second\n// 3. Exit first"
      },
      {
        title: "Step 3: Synchronous Blocking Bottleneck",
        content: "Because JavaScript is single-threaded, a long-running calculation or infinite loop completely freezes the call stack, preventing any other code from running.",
        codeSnippet: "// Heavy synchronous loop blocks the stack until done\nlet sum = 0;\nfor (let i = 0; i < 1000000; i++) {\n  sum += i;\n}\nconsole.log(\"Sum calculated:\", sum); // Output: Sum calculated: 499999500000"
      }
    ]
  },
  part4: {
    title: "Common Traps: Stack Overflow & Premature Access",
    bad: {
      title: "❌ Infinite Recursion (Maximum Call Stack Exceeded)",
      code: "function recursiveBomb() {\n  // Bug: No exit base condition!\n  // Continuously pushes new frames until memory exhausts\n  return recursiveBomb();\n}\nrecursiveBomb();\n// RangeError: Maximum call stack size exceeded",
      explanation: "Without a base termination condition, the function keeps pushing frames onto the stack until browser limits are breached."
    },
    good: {
      title: "✅ Base Termination Condition",
      code: "function countDown(n) {\n  // Safe: Base condition stops pushing frames\n  if (n <= 0) return \"Liftoff!\";\n  console.log(n);\n  return countDown(n - 1);\n}\nconsole.log(countDown(3));\n// Output:\n// 3\n// 2\n// 1\n// Liftoff!",
      explanation: "Always provide an explicit base condition that returns immediately without calling itself, allowing the stack to unwind cleanly."
    }
  },
  part5: {
    title: "Interactive Call Stack Sandbox",
    intro: "Step through these nested function calls. Predict the order in which console.log() will print before clicking Run.",
    starterCode: "function stepC() {\n  console.log(\"  [Stack Frame 3] Inside stepC\");\n  return \"Completed C\";\n}\n\nfunction stepB() {\n  console.log(\" [Stack Frame 2] Entering stepB\");\n  const res = stepC();\n  console.log(\" [Stack Frame 2] Exiting stepB with:\", res);\n  return \"Completed B\";\n}\n\nfunction stepA() {\n  console.log(\"[Stack Frame 1] Entering stepA\");\n  stepB();\n  console.log(\"[Stack Frame 1] Exiting stepA\");\n}\n\nconsole.log(\"[Global] Starting program...\");\nstepA();\nconsole.log(\"[Global] Program finished!\");\n"
  },
  part6: {
    title: "Key Takeaways: How JavaScript Runs",
    takeaways: [
      {
        title: "Single-Threaded Engine",
        desc: "JavaScript has one Call Stack and executes one instruction at a time from top to bottom."
      },
      {
        title: "LIFO Stack Mechanics",
        desc: "Function calls are pushed onto the top of the stack and popped off as soon as they return."
      },
      {
        title: "Stack Overflow Prevention",
        desc: "Recursive functions must have base exit conditions to avoid exhausting the call stack limit."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens to the Call Stack when function A calls function B?",
      options: [
        "Function B runs in a separate thread while function A continues simultaneously",
        "Function B's frame is pushed on top of function A; function A pauses until function B returns",
        "Function A is deleted from memory to make room for function B",
        "Both functions are executed in random order depending on CPU load"
      ],
      correctIndex: 1,
      explanation: "Because JavaScript uses a LIFO call stack, function B is pushed on top of function A. Function A pauses execution until function B returns and is popped off."
    }
  }
};
