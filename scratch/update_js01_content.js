const fs = require('fs');

const filePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let content = fs.readFileSync(filePath, 'utf8');

const newJS01 = {
  "slug": "js01-how-javascript-runs",
  "code": "JS-01",
  "title": "How JavaScript Runs: The Runtime, Console & Statements",
  "subtitle": "Learn where JavaScript runs, how code executes line by line, and how to write statements and print output with console.log().",
  "sections": [
    {
      "id": "part1",
      "label": "The Runtime & Execution",
      "icon": "⚡",
      "tag": "RUNTIME"
    },
    {
      "id": "part2",
      "label": "Statements & Expressions",
      "icon": "📝",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Console & Output",
      "icon": "💻",
      "tag": "OUTPUT"
    },
    {
      "id": "part4",
      "label": "Clean Instructions",
      "icon": "🛡️",
      "tag": "BEST PRACTICE"
    },
    {
      "id": "part5",
      "label": "Console Playground",
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
      "label": "Quick Quiz",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Where and How JavaScript Runs",
    "bigPicture": "JavaScript is the programming language that makes websites interactive. When you write JavaScript, an environment called a runtime (like your web browser) reads your code and follows your instructions line by line, from top to bottom, like reading a recipe.",
    "breakdownTitle": "What You Will Learn in This Lesson:",
    "breakdownItems": [
      {
        "title": "The Runtime Environment",
        "desc": "Where your code lives and executes. Web browsers have a built-in runtime that reads your JavaScript."
      },
      {
        "title": "Line-by-Line Execution",
        "desc": "JavaScript follows your instructions in order from top to bottom without skipping ahead."
      },
      {
        "title": "Statements and the Console",
        "desc": "Write complete instructions and use console.log() to print messages and results directly to your screen."
      }
    ]
  },
  "part2": {
    "title": "Statements, Expressions & Comments",
    "intro": "Every JavaScript program is built from three simple building blocks:",
    "cards": [
      {
        "number": "01",
        "tag": "Instructions",
        "title": "Statements",
        "description": "A statement is a complete instruction that tells the computer to perform an action. Statements usually end with a semicolon (;).",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Values",
        "title": "Expressions",
        "description": "An expression is any piece of code that produces a value. For example, 5 + 3 produces 8, and 'Welcome' produces a text string.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Notes",
        "title": "Comments",
        "description": "Notes written for humans that the computer completely ignores. Use // for a single-line note or /* ... */ for multiple lines.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Write one clear statement per line, end each statement with a semicolon (;), and use comments to explain why your code is doing something."
    }
  },
  "part3": {
    "title": "How JavaScript Reads and Displays Your Code",
    "intro": "Understanding how your computer reads statements and displays output:",
    "points": [
      {
        "title": "1. Reading Line by Line (Top to Bottom)",
        "content": "JavaScript reads your code like a book, starting at line 1 and moving downward in order. It finishes the current line before moving on to the next line."
      },
      {
        "title": "2. Calculating Expressions First",
        "content": "When JavaScript encounters an expression like 10 + 5 inside an instruction, it calculates the result (15) first, then carries out the statement."
      },
      {
        "title": "3. The Console as Your Feedback Window",
        "content": "The browser console is your primary tool for seeing what your code is doing. Writing console.log(message) displays text, numbers, or calculation results on your screen."
      }
    ]
  },
  "part4": {
    "title": "Writing Clean, Readable Statements",
    "bad": {
      "title": "❌ Bad: Crammed statements with no comments and no output checking",
      "code": "// Multiple instructions crammed together with no spacing and no logging:\nconst price=100;const tax=0.15;const total=price+(price*tax);\n// Did it work? We have no idea because nothing was printed to the console!",
      "explanation": "Cramming multiple instructions onto one line without spacing makes code difficult to read. If you never log your results, you cannot verify that your calculations worked."
    },
    "good": {
      "title": "✅ Clean: One clear statement per line with helpful comments and logging",
      "code": "// 1. Set the initial price and tax rate\nconst itemPrice = 100;\nconst taxRate = 0.15;\n\n// 2. Calculate the total cost (expression evaluated first)\nconst totalCost = itemPrice + (itemPrice * taxRate);\n\n// 3. Print the result clearly to the console\nconsole.log(\"Item Price: $\" + itemPrice);\nconsole.log(\"Total with Tax: $\" + totalCost);",
      "explanation": "Writing one statement per line with clear variable names and console.log() makes it easy to understand the steps and verify the output."
    }
  },
  "part5": {
    "title": "Console & Statements Playground",
    "intro": "Run the statements below to watch how sequential code executes and prints output in the console:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-01: HOW JAVASCRIPT RUNS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. A friendly welcome statement:\nconsole.log(\"👋 Welcome to LearnCraft JavaScript!\");\n\n// 2. Expressions produce values:\nconsole.log(\"Math result (10 + 5):\", 10 + 5);\nconsole.log(\"Text expression:\", \"JavaScript\" + \" \" + \"is fun!\");\n\n// 3. Top-to-bottom sequential execution:\nconsole.log(\"Step 1: Getting ready\");\nconsole.log(\"Step 2: Performing action\");\nconsole.log(\"Step 3: All done!\");\n\n// Try it yourself:\n// Add a console.log() below with your own message or calculation!\n"
  },
  "part6": {
    "title": "Key Takeaways: How JavaScript Runs",
    "takeaways": [
      {
        "title": "1. The Runtime Environment",
        "desc": "JavaScript runs inside a host environment (like your web browser) that reads and executes your instructions."
      },
      {
        "title": "2. Line-by-Line Execution",
        "desc": "JavaScript runs code sequentially from top to bottom, completing one statement before moving to the next."
      },
      {
        "title": "3. Statements vs. Expressions",
        "desc": "An expression produces a value (like 5 + 3); a statement is a complete instruction that performs an action."
      },
      {
        "title": "4. console.log() for Output",
        "desc": "Use console.log() to print text, numbers, and calculation results so you can see what your code is doing."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-02: Variables & Data Types: Storing Data with let & const",
      "desc": "Now that you know how code runs and prints, learn how to store information using let and const."
    }
  },
  "part7": {
    "title": "Knowledge Check: How JavaScript Runs",
    "quiz": {
      "question": "How does JavaScript execute statements in a program by default?",
      "options": [
        "From bottom to top, starting at the last line.",
        "Line by line from top to bottom, in sequential order.",
        "In completely random order every time you run it.",
        "All lines run at the exact same millisecond simultaneously."
      ],
      "correctIndex": 1,
      "explanation": "JavaScript runs code sequentially from top to bottom. It finishes executing one line before moving on to the next line."
    }
  }
};

const startKey = '"js01-how-javascript-runs": {';
const endKey = '"js02-variables-and-data-types": {';

const startIdx = content.indexOf(startKey);
const endIdx = content.indexOf(endKey);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find startKey or endKey");
  process.exit(1);
}

const replacement = `"js01-how-javascript-runs": ` + JSON.stringify(newJS01, null, 2) + `,\n\n  `;

content = content.slice(0, startIdx) + replacement + content.slice(endIdx);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully replaced JS-01 in javascript-lesson-content.ts!");
