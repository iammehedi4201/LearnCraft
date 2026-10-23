import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js06FunctionsAndArrowSyntaxContent: StandardLessonContent = {
  slug: "js06-functions-and-arrow-syntax",
  code: "JS-06",
  title: "Writing and Calling Functions",
  subtitle: "Write modular reusable logic, pass parameters with default values, and master arrow functions.",
  sections: [
    {
      id: "part1",
      label: "Functions & Calling",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Declarations & Arrows",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "The return Keyword",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Missing return Trap",
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
    title: "Writing and Calling Functions",
    bigPicture: "Functions package reusable blocks of code that accept parameters and return values. Modern JavaScript uses arrow functions (`const add = (a, b) => a + b`) for concise syntax.",
    breakdownTitle: "Key Function Anatomy",
    breakdownItems: [
      {
        title: "Parameters vs Arguments",
        desc: "Parameters are placeholders in the declaration; arguments are the actual values passed when called."
      },
      {
        title: "The return Keyword",
        desc: "Returns a value to the caller. Without an explicit return, functions return undefined."
      },
      {
        title: "Default Parameters",
        desc: "Set automatic fallback values if an argument is not provided."
      }
    ]
  },
  part2: {
    title: "Function Declarations vs Arrow Functions",
    intro: "Modern JavaScript offers two popular ways to write functions.",
    cards: [
      {
        number: "01",
        tag: "Standard",
        title: "Function Declaration",
        description: "Uses the function keyword with a name and parameter list.",
        codeSnippet: "function calculateTax(subtotal, rate = 0.1) {\n  return subtotal * rate;\n}\nconsole.log(calculateTax(100)); // Output: 10",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Modern",
        title: "Arrow Function (=>)",
        description: "Compact syntax commonly stored inside a const variable.",
        codeSnippet: "const double = (n) => n * 2;\nconsole.log(double(15)); // Output: 30",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Multi-line",
        title: "Arrow with Body Block",
        description: "When using curly braces {}, you must include an explicit return keyword.",
        codeSnippet: "const formatUser = (name, role = \"Member\") => {\n  const formatted = `${name} (${role})`;\n  return formatted;\n};\nconsole.log(formatUser(\"Maya\", \"Admin\")); // Output: Maya (Admin)",
        color: "purple"
      }
    ],
    rule: {
      title: "Arrow Implicit Return Rule",
      content: "If an arrow function fits on one line without curly braces, the expression is returned automatically: (a, b) => a + b."
    }
  },
  part3: {
    title: "How the return Keyword Works",
    intro: "Understand how values leave functions and return to your code.",
    points: [
      {
        title: "1. Storing Function Results",
        content: "When a function returns a value, you can capture that result directly into a variable.",
        codeSnippet: "function add(a, b) {\n  return a + b;\n}\nconst sum = add(10, 20);\nconsole.log(\"Captured sum:\", sum); // Output: Captured sum: 30"
      },
      {
        title: "2. return Stops Function Execution",
        content: "As soon as JavaScript encounters a return statement, it exits the function immediately. Any lines below return are ignored.",
        codeSnippet: "function checkAge(age) {\n  if (age < 18) return \"Minor\";\n  return \"Adult\"; // Only reached if age >= 18\n}\nconsole.log(checkAge(15)); // Output: Minor"
      },
      {
        title: "3. Default Parameter Values",
        content: "Default parameters kick in automatically if an argument is not provided during the call.",
        codeSnippet: "function greet(name = \"Guest\") {\n  return \"Welcome, \" + name;\n}\nconsole.log(greet()); // Output: Welcome, Guest"
      }
    ]
  },
  part4: {
    title: "Common Trap: Missing return in Arrow Functions",
    bad: {
      title: "❌ Curly Braces Without return",
      code: "const multiply = (x, y) => {\n  x * y; // BUG: Missing explicit return!\n};\nconsole.log(multiply(4, 5));\n// Output: undefined",
      explanation: "When you add curly braces { } to an arrow function, JavaScript requires an explicit return statement. Without it, the function returns undefined."
    },
    good: {
      title: "✅ Add Explicit return or Omit Braces",
      code: "const multiply = (x, y) => x * y; // Clean implicit return!\nconsole.log(multiply(4, 5));\n// Output: 20",
      explanation: "Either omit curly braces for an automatic return, or write return inside { }."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Practice writing reusable functions with declarations, arrow functions, and default parameters.",
    starterCode: "// 1. Traditional function declaration:\nfunction calculateDiscount(price, discountPercent = 10) {\n  const discountAmount = price * (discountPercent / 100);\n  return price - discountAmount;\n}\n\n// 2. Modern arrow function:\nconst formatPrice = (amount) => `$${amount.toFixed(2)}`;\n\nconst finalPrice = calculateDiscount(100, 25);\nconsole.log(\"Discounted price:\", formatPrice(finalPrice));\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Functions Package Logic",
        desc: "Write once, reuse anywhere by passing different arguments."
      },
      {
        title: "return Sends Values Back",
        desc: "Use return to output results from a function; without it, functions return undefined."
      },
      {
        title: "Arrow Functions are Concise",
        desc: "Use const fn = (x) => x * 2 for clean, modern single-line logic."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What value does a JavaScript function return if it executes completely without hitting an explicit return statement?",
      options: [
        "undefined",
        "null",
        "0",
        "false"
      ],
      correctIndex: 0,
      explanation: "By default in JavaScript, if a function finishes executing its body without encountering a return statement, it automatically returns undefined."
    }
  }
};
