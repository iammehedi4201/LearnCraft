import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js08ClosuresContent: StandardLessonContent = {
  slug: "js08-closures",
  code: "JS-08",
  title: "How Closures Work",
  subtitle: "Learn how inner functions remember variables from where they were created, even after the outer function has finished running.",
  sections: [
    {
      id: "part1",
      label: "How Closures Work",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Closure Patterns",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Remembering State",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Shared State Misconception",
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
    title: "How Closures Work",
    bigPicture: "A closure happens when an inner function remembers and keeps access to variables from its parent function, even after the parent function has finished executing.",
    breakdownTitle: "Why Closures Matter",
    breakdownItems: [
      {
        title: "Persistent State",
        desc: "Functions can remember values across multiple calls without needing global variables."
      },
      {
        title: "Data Privacy",
        desc: "Keeps internal variables private so outside code cannot accidentally overwrite them."
      },
      {
        title: "Foundation of Modern Libraries",
        desc: "Frameworks like React use closures under the hood to maintain state in hooks (like useState)."
      }
    ]
  },
  part2: {
    title: "Practical Closure Patterns",
    intro: "Here are the two most common ways developers use closures.",
    cards: [
      {
        number: "01",
        tag: "Private State",
        title: "Private Variable Protection",
        description: "Variables declared inside the outer function can only be modified through exposed methods.",
        codeSnippet: "function createWallet(initialBalance) {\n  let balance = initialBalance; // Private!\n  return {\n    addFunds: (amount) => { balance += amount; },\n    getBalance: () => balance\n  };\n}\nconst myWallet = createWallet(50);\nmyWallet.addFunds(20);\nconsole.log(myWallet.getBalance()); // Output: 70",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Function Factory",
        title: "Custom Function Generators",
        description: "Create specialized helper functions configured with preset outer parameters.",
        codeSnippet: "function makeMultiplier(factor) {\n  return (number) => number * factor;\n}\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\nconsole.log(double(10)); // Output: 20\nconsole.log(triple(10)); // Output: 30",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Independent",
        title: "Isolated Instances",
        description: "Every call to the outer function creates a completely independent copy of private state.",
        codeSnippet: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counterA = createCounter();\nconst counterB = createCounter();\nconsole.log(counterA()); // Output: 1\nconsole.log(counterB()); // Output: 1 (Separate state!)",
        color: "purple"
      }
    ],
    rule: {
      title: "The Closure Rule",
      content: "An inner function always has access to the variables of its outer function, even after the outer function has returned."
    }
  },
  part3: {
    title: "Step-by-Step: How Closures Remember State",
    intro: "Trace exactly what happens when a closure is created and executed.",
    points: [
      {
        title: "Step 1: Outer Function Runs",
        content: "createCounter() is called. It creates a local variable let count = 0 and returns an inner arrow function.",
        codeSnippet: "function createCounter() {\n  let count = 0; // Local variable created\n  return () => { count++; return count; };\n}"
      },
      {
        title: "Step 2: Outer Function Finishes",
        content: "Normally, local variables are erased when a function finishes. But here, the inner function still needs 'count'. JavaScript keeps 'count' alive in memory!",
        codeSnippet: "const counter = createCounter();\n// createCounter() has finished, but counter still holds 'count'"
      },
      {
        title: "Step 3: Calling the Inner Function Later",
        content: "When counter() is called, it increments that preserved 'count' variable and returns the updated number.",
        codeSnippet: "console.log(counter()); // Output: 1\nconsole.log(counter()); // Output: 2"
      }
    ]
  },
  part4: {
    title: "Common Trap: Sharing State Across Separate Instances",
    bad: {
      title: "❌ Assuming Separate Closures Share Variables",
      code: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter1 = makeCounter();\nconst counter2 = makeCounter();\ncounter1(); // count in counter1 becomes 1\n// Mistake: Expecting counter2() to return 2!\nconsole.log(counter2()); // Output: 1",
      explanation: "Each call to makeCounter() creates a completely new, separate closure with its own independent count variable."
    },
    good: {
      title: "✅ Understand Each Instance Has Its Own Memory",
      code: "const counter1 = makeCounter();\nconst counter2 = makeCounter();\ncounter1(); // counter1 is at 1\ncounter1(); // counter1 is at 2\nconsole.log(counter2()); // Output: 1 (Independent from counter1)",
      explanation: "Each instance maintains its own private variables without interfering with other instances."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Step through this interactive bank account closure. Notice how balance cannot be altered from outside.",
    starterCode: "function createBankAccount(customerName, initialDeposit) {\n  let balance = initialDeposit; // Private variable!\n\n  return {\n    deposit(amount) {\n      balance += amount;\n      console.log(`[${customerName}] Deposited $${amount}. New balance: $${balance}`);\n    },\n    checkBalance() {\n      return balance;\n    }\n  };\n}\n\nconst myAccount = createBankAccount(\"Maya\", 100);\nmyAccount.deposit(50);\nmyAccount.deposit(25);\nconsole.log(\"Final verified balance:\", myAccount.checkBalance());\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Functions Remember Their Birthplace",
        desc: "An inner function retains access to outer variables even after the outer function finishes."
      },
      {
        title: "Enables Private State",
        desc: "Closures prevent outside code from directly altering internal data."
      },
      {
        title: "Instances are Isolated",
        desc: "Each call to the outer function creates its own fresh closure and variables."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that remembers variables from its outer enclosing scope even after the outer function has finished",
        "A special method used to shut down the browser window",
        "A syntax error caused by forgetting to close curly braces",
        "A loop that terminates automatically when an array is empty"
      ],
      correctIndex: 0,
      explanation: "A closure is created when an inner function references variables from its parent function. It keeps those variables alive in memory even after the parent function has completed execution."
    }
  }
};
