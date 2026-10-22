import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js06FunctionsAndArrowSyntaxContent: StandardLessonContent = {
  slug: "js06-functions-and-arrow-syntax",
  code: "JS-06",
  title: "Writing and Calling Functions",
  subtitle: "Write modular reusable logic, pass parameters with default values, and master arrow functions with implicit returns.",
  sections: [
    {
      id: "part1",
      label: "Reusable Logic",
      icon: "📦",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Declarations vs Arrows",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Implicit Return Rules",
      icon: "🎯",
      tag: "RULES"
    },
    {
      id: "part4",
      label: "Undefined Return Bug",
      icon: "⚠️",
      tag: "TRAPS"
    },
    {
      id: "part5",
      label: "Functions Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
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
    title: "Why Functions Exist",
    bigPicture: "Functions package reusable code into named blocks that accept inputs (parameters), perform calculations, and return a result.",
    analogy: "Like a recipe: you define the steps once, and you can prepare it with different ingredients whenever you want.",
    diagram: "Input arguments: (price = 100, taxRate = 0.08)\n                       |\n                       v\n+---------------------------------------------+\n|  calculateTax(price, taxRate)               |\n|  return price * taxRate;                    |\n+---------------------------------------------+\n                       |\n                       v\nReturned output: 8",
    breakdownTitle: "Key Function Concepts",
    breakdownItems: [
      {
        title: "Parameters vs Arguments",
        desc: "Parameters are the variable placeholders in the definition. Arguments are the concrete values passed during invocation."
      },
      {
        title: "The return Keyword",
        desc: "Stops execution and sends a value back. If return is omitted, JavaScript functions return undefined."
      },
      {
        title: "Default Parameters",
        desc: "Provide fallback values automatically when arguments are undefined or omitted."
      }
    ]
  },
  part2: {
    title: "Function Declaration vs Arrow Syntax",
    intro: "Two primary ways to define functions in modern JavaScript.",
    cards: [
      {
        number: "01",
        tag: "Classic",
        title: "Function Declaration",
        description: "Uses the function keyword and is hoisted to the top of its scope.",
        codeSnippet: "function calculateTotal(subtotal, tax = 0.1) {\n  return subtotal + (subtotal * tax);\n}\nconsole.log(calculateTotal(100)); // Output: 110",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Concise",
        title: "Arrow Function (=>)",
        description: "Modern, compact syntax commonly stored in a const variable.",
        codeSnippet: "const double = (n) => n * 2;\nconsole.log(double(15)); // Output: 30",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Multiple Args",
        title: "Multi-parameter Arrow",
        description: "Parentheses are required when declaring two or more parameters.",
        codeSnippet: "const formatUser = (name, role = \"guest\") => `${name} (${role})`;\nconsole.log(formatUser(\"Maya\", \"admin\")); // Output: Maya (admin)",
        color: "purple"
      }
    ],
    rule: {
      title: "Arrow Implicit Return Rule",
      content: "An arrow function only returns implicitly if there are NO curly braces {}. As soon as you add curly braces, you MUST write an explicit return statement."
    }
  },
  part3: {
    title: "Implicit Returns & Curly Braces",
    intro: "Understand the exact syntax rules for arrow function returns.",
    points: [
      {
        title: "1. One-line Implicit Return",
        content: "Omit curly braces to evaluate the single expression and return its value automatically.",
        codeSnippet: "const square = (x) => x * x;\nconsole.log(square(6)); // Output: 36"
      },
      {
        title: "2. Block Body Requires Explicit Return",
        content: "If your function requires multiple statements, wrap the body in curly braces and include return.",
        codeSnippet: "const calculateDiscount = (price, isVip) => {\n  const rate = isVip ? 0.2 : 0.05;\n  return price * (1 - rate);\n};\nconsole.log(calculateDiscount(100, true)); // Output: 80"
      },
      {
        title: "3. Returning Object Literals Implicitly",
        content: "Wrap object curly braces in parentheses `({})` so JavaScript does not confuse them with a function block.",
        codeSnippet: "const createItem = (id, label) => ({ id, label });\nconsole.log(createItem(1, \"Book\")); // Output: { id: 1, label: 'Book' }"
      }
    ]
  },
  part4: {
    title: "Classic Arrow Trap: Accidental Undefined Return",
    bad: {
      title: "❌ Curly Braces Without return Keyword",
      code: "const add = (a, b) => {\n  a + b; // Bug: Curly braces create a block, but return is missing!\n};\nconsole.log(add(5, 5)); // Output: undefined",
      explanation: "Adding curly braces turns off implicit return. Because there is no return statement, the function returns undefined."
    },
    good: {
      title: "✅ Either Omit Braces OR Add return",
      code: "// Option A: Implicit return (no braces)\nconst addA = (a, b) => a + b;\n\n// Option B: Explicit return with block\nconst addB = (a, b) => {\n  return a + b;\n};\nconsole.log(addA(5, 5)); // Output: 10\nconsole.log(addB(5, 5)); // Output: 10",
      explanation: "Either omit curly braces entirely for one-line expressions, or include an explicit return inside the block."
    }
  },
  part5: {
    title: "Functions Sandbox",
    intro: "Practice writing arrow functions with default parameters and implicit returns.",
    starterCode: "// 1. One-line arrow with implicit return:\nconst celsiusToFahrenheit = (c) => (c * 9/5) + 32;\n\n// 2. Multi-line arrow with default parameter:\nconst createGreeting = (name, greeting = \"Hello\") => {\n  const formatted = `${greeting}, ${name}!`;\n  return formatted;\n};\n\nconsole.log(\"100C in F:\", celsiusToFahrenheit(100));\nconsole.log(createGreeting(\"Sarah\"));\nconsole.log(createGreeting(\"Alex\", \"Welcome back\"));\n"
  },
  part6: {
    title: "Key Takeaways: Functions",
    takeaways: [
      {
        title: "Arrow Implicit Returns",
        desc: "Without curly braces, arrow functions automatically return the single expression."
      },
      {
        title: "Curly Braces Require return",
        desc: "If curly braces {} are present, you must write return or undefined is returned."
      },
      {
        title: "Default Parameters",
        desc: "Provide fallback values (param = defaultValue) when arguments are omitted."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does `const calc = (x) => { x * 2; }; console.log(calc(4));` output?",
      options: [
        "8",
        "undefined",
        "TypeError",
        "4"
      ],
      correctIndex: 1,
      explanation: "Because curly braces `{}` were used without an explicit `return` keyword, the function body executes the expression and returns `undefined` by default."
    }
  }
};
