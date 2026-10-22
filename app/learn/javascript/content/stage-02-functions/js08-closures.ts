import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js08ClosuresContent: StandardLessonContent = {
  slug: "js08-closures",
  code: "JS-08",
  title: "How Closures Work",
  subtitle: "Master closures to create private state, write factory functions, and understand how functions remember the lexical environment where they were created.",
  sections: [
    {
      id: "part1",
      label: "Closure Mental Model",
      icon: "🔒",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Lexical Backpack & Memory",
      icon: "🎒",
      tag: "ENGINE MECHANICS"
    },
    {
      id: "part3",
      label: "Practical Use Cases",
      icon: "🏭",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "The Loop Closure Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Closures Sandbox",
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
    title: "Functions with a Memory",
    bigPicture: "A closure is created when an inner function remembers variables from its outer enclosing scope, even after the outer function has finished executing and its stack frame has been popped off the Call Stack.",
    analogy: "Think of an inner function carrying a backpack. Wherever that function travels in your code, it brings along its backpack containing all variables that were in scope when the function was born.",
    diagram: "+-------------------------------------------------------+\n| 1. createCounter() is invoked:                        |\n|    let count = 0;                                     |\n|    returns function increment()                       |\n+-------------------------------------------------------+\n| 2. createCounter() finishes & pops off Call Stack!    |\n+-------------------------------------------------------+\n| 3. BUT increment() holds reference to [[Environment]] |\n|    Memory Heap keeps 'count' alive!                   |\n|    counterA(); // count = 1                           |\n|    counterA(); // count = 2 (Persisted in memory!)    |\n+-------------------------------------------------------+",
    breakdownTitle: "Closure Architecture",
    breakdownItems: [
      {
        title: "Outer Function Returns",
        desc: "Normally when a function completes, its local variables are discarded by Garbage Collection."
      },
      {
        title: "Active Reference Retained",
        desc: "Because the returned inner function references outer variables, the engine preserves that memory environment."
      },
      {
        title: "Encapsulated Private State",
        desc: "Outside code has zero direct access to modify closed-over variables; only the exposed functions can touch them."
      }
    ]
  },
  part2: {
    title: "How the JavaScript Engine Manages Closures",
    intro: "Step through how closures retain memory and create independent state instances.",
    cards: [
      {
        number: "01",
        tag: "Private State",
        title: "Data Encapsulation",
        description: "Variables declared inside the outer function cannot be accessed or corrupted globally.",
        codeSnippet: "function createBankAccount(initialBalance) {\n  let balance = initialBalance; // Private!\n  return {\n    getBalance: () => balance,\n    deposit: (amount) => { balance += amount; }\n  };\n}\nconst account = createBankAccount(100);\naccount.deposit(50);\nconsole.log(account.getBalance()); // Output: 150",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Factory",
        title: "Function Factory",
        description: "Generate specialized functions pre-configured with custom outer parameters.",
        codeSnippet: "function makeMultiplier(factor) {\n  return (number) => number * factor;\n}\nconst triple = makeMultiplier(3);\nconst quadruple = makeMultiplier(4);\nconsole.log(triple(10));     // Output: 30\nconsole.log(quadruple(10));  // Output: 40",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Isolation",
        title: "Independent Instances",
        description: "Every call to the outer function creates a completely independent closure environment.",
        codeSnippet: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter1 = makeCounter();\nconst counter2 = makeCounter();\nconsole.log(counter1()); // Output: 1\nconsole.log(counter1()); // Output: 2\nconsole.log(counter2()); // Output: 1 (Isolated!)",
        color: "purple"
      }
    ],
    rule: {
      title: "The Closure Memory Invariant",
      content: "As long as an inner function reference exists and can be called, the JavaScript garbage collector will NOT destroy the outer variables it closes over."
    }
  },
  part3: {
    title: "Step-by-Step Closure Mechanics",
    intro: "Understand why closures are one of the most powerful paradigms in JavaScript.",
    points: [
      {
        title: "1. The [[Environment]] Property",
        content: "When a function is declared, the engine attaches a hidden [[Environment]] link pointing to the current lexical environment. This link never changes.",
        codeSnippet: "const prefix = \"ID:\";\nfunction makeIdGenerator() {\n  let id = 100;\n  return () => `${prefix} ${++id}`;\n}\nconst nextId = makeIdGenerator();\nconsole.log(nextId()); // Output: ID: 101"
      },
      {
        title: "2. Stateful Event Handlers & Callbacks",
        content: "Closures allow callbacks and event listeners in the browser to remember user interaction state across clicks.",
        codeSnippet: "function setupButton(buttonName) {\n  let clickCount = 0;\n  return function handleClick() {\n    clickCount++;\n    return `${buttonName} clicked ${clickCount} times`;\n  };\n}\nconst onSaveClick = setupButton(\"SaveButton\");\nconsole.log(onSaveClick()); // Output: SaveButton clicked 1 times\nconsole.log(onSaveClick()); // Output: SaveButton clicked 2 times"
      },
      {
        title: "3. Powering React Hooks",
        content: "React's useState hook works by taking advantage of closures: component functions re-run, but state is preserved in an outer closure maintained by React.",
        codeSnippet: "// Conceptual illustration of useState via closures:\nfunction createStore(initialValue) {\n  let state = initialValue;\n  const getState = () => state;\n  const setState = (newVal) => { state = newVal; };\n  return [getState, setState];\n}\nconst [count, setCount] = createStore(0);\nsetCount(5);\nconsole.log(count()); // Output: 5"
      }
    ]
  },
  part4: {
    title: "The Classic Trap: Closures in Loops (var vs let)",
    bad: {
      title: "❌ var Shares a Single Binding Across Iterations",
      code: "function runVarLoop() {\n  const callbacks = [];\n  // Bug: var has function scope! Only ONE 'i' variable exists\n  for (var i = 0; i < 3; i++) {\n    callbacks.push(() => i);\n  }\n  // When called later, loop has finished and i is 3!\n  return callbacks.map(fn => fn());\n}\nconsole.log(runVarLoop()); // Output: [3, 3, 3] (Unexpected!)",
      explanation: "Because var does not have block scope, all 3 callbacks close over the exact same variable i, which is 3 by the time the callbacks are executed."
    },
    good: {
      title: "✅ let Creates a Fresh Lexical Binding Per Iteration",
      code: "function runLetLoop() {\n  const callbacks = [];\n  // Safe: let has block scope! A fresh 'i' is created per iteration\n  for (let i = 0; i < 3; i++) {\n    callbacks.push(() => i);\n  }\n  return callbacks.map(fn => fn());\n}\nconsole.log(runLetLoop()); // Output: [0, 1, 2] (Correct!)",
      explanation: "In modern JavaScript, let creates a new scoped binding for every iteration of the loop, so each closure captures its own snapshot."
    }
  },
  part5: {
    title: "Interactive Closures Sandbox",
    intro: "Build a secure bank account balance with deposit and withdraw methods using closures.",
    starterCode: "function createWallet(owner, startingFunds) {\n  // Private variable:\n  let funds = startingFunds;\n\n  return {\n    getOwner: () => owner,\n    checkBalance: () => `$${funds}`,\n    addCash: (amount) => {\n      funds += amount;\n      return `Added $${amount}. New balance: $${funds}`;\n    }\n  };\n}\n\nconst myWallet = createWallet(\"Alex\", 50);\nconsole.log(myWallet.checkBalance());\nconsole.log(myWallet.addCash(25));\nconsole.log(myWallet.checkBalance());\n\n// Notice: funds is private and cannot be directly reassigned!\n// myWallet.funds = 1000000; // Has zero effect on real funds\nconsole.log(\"Balance after tamper attempt:\", myWallet.checkBalance());\n"
  },
  part6: {
    title: "Key Takeaways: Closures",
    takeaways: [
      {
        title: "Memory Retention",
        desc: "Inner functions remember variables from their outer scope even after the outer function returns."
      },
      {
        title: "Private Encapsulation",
        desc: "Closures hide internal variables from global access, allowing data privacy without classes."
      },
      {
        title: "Always Use let in Loops",
        desc: "let creates a new binding for every iteration, avoiding the classic var loop closure trap."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does an inner function have access to outer variables even after the outer function has returned?",
      options: [
        "Because JavaScript copies all variables into the global window object",
        "Because the inner function retains a reference to the outer Lexical Environment in memory, preventing garbage collection",
        "Because functions are re-executed from scratch every time they are called",
        "Because variables declared in outer functions are automatically converted to global variables"
      ],
      correctIndex: 1,
      explanation: "When an inner function is defined, it keeps an internal reference to its enclosing Lexical Environment. Because that environment is still reachable, the garbage collector preserves it in memory."
    }
  }
};
