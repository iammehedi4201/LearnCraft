import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js06FunctionsAndArrowSyntaxContent: StandardLessonContent = {
  "slug": "js06-functions-and-arrow-syntax",
  "code": "JS-06",
  "title": "Functions: Packaging Reusable Logic & Arrow Syntax",
  "subtitle": "Write reusable blocks of code with parameters, return values, default parameters, and concise modern arrow functions.",
  "sections": [
    {
      "id": "part1",
      "label": "Packaging Code",
      "icon": "📦",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Declarations vs Arrows",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Implicit Returns & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Missing Return Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Functions Playground",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Why Functions Exist",
    "bigPicture": "A function is a reusable machine that takes inputs (parameters), performs work, and returns an output. Instead of rewriting identical code in multiple places, you write the function once and call it whenever needed.",
    "analogy": "Think of a function like a kitchen blender. You load ingredients into the top (parameters), press blend (execution), and pour out a smoothie (return value).",
    "diagram": "Inputs: (price = 100, taxRate = 0.08)\n                 |\n                 v\n+-----------------------------------+\n|  calculateTax(price, taxRate)     |  --> Function Body\n+-----------------------------------+\n                 |\n                 v\nOutput: 8",
    "breakdownTitle": "Function Building Blocks",
    "breakdownItems": [
      {
        "title": "Parameters vs Arguments",
        "desc": "Parameters are the variable placeholders in the function definition. Arguments are the actual values passed in when calling it."
      },
      {
        "title": "The return Statement",
        "desc": "Sends a calculated value back to the caller. Without a return statement, functions return undefined by default."
      },
      {
        "title": "Modern Arrow Syntax (=>)",
        "desc": "A concise way to write functions that is widely used for one-liners, callbacks, and modern React code."
      }
    ]
  },
  "part2": {
    "title": "Function Syntax & Arrow Functions",
    "intro": "Compare traditional function declarations with modern arrow functions.",
    "cards": [
      {
        "number": "01",
        "tag": "Classic",
        "title": "Function Declaration",
        "description": "Declared with the function keyword. They are hoisted and can be called before their definition.",
        "codeSnippet": "function add(a, b) {\n  return a + b;\n}\nconsole.log(\"Sum:\", add(10, 5)); // Output: Sum: 15",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Modern",
        "title": "Arrow Function",
        "description": "Stored in a variable using the `=>` syntax. Ideal for concise expressions and callbacks.",
        "codeSnippet": "const multiply = (a, b) => a * b;\nconsole.log(\"Product:\", multiply(4, 5)); // Output: Product: 20",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Defaults",
        "title": "Default Parameters",
        "description": "Provide fallback values directly in the parameter list when arguments are missing.",
        "codeSnippet": "function greet(name = \"Guest\") {\n  return \"Welcome, \" + name + \"!\";\n}\nconsole.log(greet());        // Output: Welcome, Guest!\nconsole.log(greet(\"Sarah\")); // Output: Welcome, Sarah!",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Single Responsibility Principle",
      "content": "Keep each function focused on doing one job well. Use clear action verbs for names like `calculateTotal`, `isValid`, or `formatName`."
    }
  },
  "part3": {
    "title": "Arrow Returns & Reading AI Code",
    "intro": "Understand implicit returns and avoid the most common bugs found in AI-generated arrow functions.",
    "points": [
      {
        "title": "1. Curly Braces Require 'return'",
        "content": "When an arrow function has curly braces, you must write the `return` keyword explicitly. Without curly braces, the expression is returned automatically.",
        "codeSnippet": "// With curly braces: explicit return required\nconst doubleWithBlock = (x) => {\n  return x * 2;\n};\nconsole.log(doubleWithBlock(5)); // Output: 10\n\n// Without curly braces: implicit return\nconst doubleConcise = (x) => x * 2;\nconsole.log(doubleConcise(5)); // Output: 10"
      },
      {
        "title": "2. The AI Curly Brace Bug",
        "content": "A very frequent AI mistake is wrapping an expression in curly braces without the `return` keyword. The function executes, but quietly returns `undefined`.",
        "codeSnippet": "// ❌ Common AI Bug: returns undefined!\nconst calculateTax = (price) => { price * 0.1; };\nconsole.log(\"Bug result:\", calculateTax(100)); // Output: Bug result: undefined\n\n// ✅ Clean Fix: remove braces or add return\nconst calculateTaxFixed = (price) => price * 0.1;\nconsole.log(\"Fixed result:\", calculateTaxFixed(100)); // Output: Fixed result: 10"
      },
      {
        "title": "3. Returning Objects from Arrows",
        "content": "To return an object literal implicitly from a one-liner, wrap the object in parentheses so JavaScript does not confuse it with a function body block.",
        "codeSnippet": "// Wrap object in parentheses for implicit return:\nconst createUser = (id, name) => ({ id, name, active: true });\n\nconst user = createUser(101, \"Alex\");\nconsole.log(user);\n// Output: { id: 101, name: 'Alex', active: true }"
      }
    ]
  },
  "part4": {
    "title": "Missing Return vs Proper Value Flow",
    "bad": {
      "title": "❌ Accidental Undefined Return",
      "code": "// Bug: Curly braces without return\nconst getDiscount = (price) => {\n  price * 0.2; // Calculated, but never returned!\n};\n\nconst saved = getDiscount(100);\nconsole.log(\"Saved amount:\", saved); \n// Output: Saved amount: undefined",
      "explanation": "Whenever you open curly braces in an arrow function, JavaScript requires the `return` keyword. Without it, the function returns undefined."
    },
    "good": {
      "title": "✅ Clear and Explicit Return",
      "code": "// Solution A: Explicit return statement\nconst getDiscount = (price) => {\n  return price * 0.2;\n};\n\n// Solution B: Concise implicit return\nconst getDiscountQuick = (price) => price * 0.2;\n\nconsole.log(\"Saved A:\", getDiscount(100));      // Output: Saved A: 20\nconsole.log(\"Saved B:\", getDiscountQuick(100)); // Output: Saved B: 20",
      "explanation": "Either omit curly braces for a clean 1-line return, or write an explicit `return` inside the block."
    }
  },
  "part5": {
    "title": "Interactive Functions Sandbox",
    "intro": "Experiment with function declarations, arrow functions, and default parameters in the live editor.",
    "starterCode": "// 1. Traditional function:\nfunction calculateTotal(price, taxRate = 0.08) {\n  return price + (price * taxRate);\n}\n\n// 2. Arrow function:\nconst formatCurrency = (amount) => \"$\" + amount.toFixed(2);\n\n// 3. Test execution:\nconst bill = calculateTotal(50);\nconsole.log(\"Total Bill:\", formatCurrency(bill));\n\n// PRACTICE:\n// 1. Write an arrow function 'square' that takes a number n and returns n * n.\n// 2. Call square(7) and log the result to the console.\n"
  },
  "part6": {
    "title": "Key Takeaways: Functions & Arrow Syntax",
    "takeaways": [
      {
        "title": "Declarations vs Arrows",
        "desc": "Function declarations are hoisted; arrow functions are concise and great for callbacks."
      },
      {
        "title": "Curly Braces Rule",
        "desc": "Curly braces in arrow functions always require an explicit return statement."
      },
      {
        "title": "Implicit Object Returns",
        "desc": "Wrap object literals in parentheses ({ id, name }) when returning them from a one-liner."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What does `const fn = (n) => { n * 2; };` return when called as `fn(5)`?",
      "options": [
        "10",
        "undefined",
        "Error: Invalid syntax",
        "null"
      ],
      "correctIndex": 1,
      "explanation": "Because curly braces `{}` are used without a `return` keyword, the calculation runs but the function returns `undefined`."
    }
  }
};
