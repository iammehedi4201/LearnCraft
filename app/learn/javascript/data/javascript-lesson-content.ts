/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT LESSONS CONTENT REPOSITORY — ALL 30 AUTHORITATIVE LESSONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Complete, handcrafted, beginner-friendly curriculum for LearnCraft.
 * Every lesson includes real-world analogies, step-by-step mental models,
 * concrete Bad vs Clean Code comparisons, tested sandbox starter code,
 * rich key takeaways, and concept-reinforcing Knowledge Check Quizzes.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { getLessonBySlug } from "./javascript-curriculum";

export interface JSLessonSection {
  id: string;
  label: string;
  icon: string;
  tag?: string;
}

export interface JSLessonCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "amber" | "emerald" | "cyan" | "purple" | "rose" | "indigo" | "blue";
}

export interface JSMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface JSCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface JSQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface JSLessonTakeaway {
  title: string;
  desc: string;
}

export interface JSLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  sections: JSLessonSection[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards: JSLessonCard[];
    rule: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: JSMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: JSCodeComparison;
    good: JSCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    takeaways?: JSLessonTakeaway[];
    quiz?: JSQuizData;
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
  part7: {
    title: string;
    takeaways?: JSLessonTakeaway[];
    quiz?: JSQuizData;
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
}

export const JS_LESSONS_CONTENT: Record<string, JSLessonContent> = {
  "js01-how-javascript-runs": {
    "slug": "js01-how-javascript-runs",
    "code": "JS-01",
    "title": "How JavaScript Works: Running Code, The Console & Sequential Steps",
    "subtitle": "Discover what JavaScript is, how computers run instructions line by line, and how to print messages and calculations with console.log().",
    "sections": [
      {
        "id": "part1",
        "label": "What is JavaScript?",
        "icon": "⚡",
        "tag": "FOUNDATION"
      },
      {
        "id": "part2",
        "label": "Printing with console.log()",
        "icon": "💻",
        "tag": "OUTPUT"
      },
      {
        "id": "part3",
        "label": "Step-by-Step Flow",
        "icon": "📝",
        "tag": "EXECUTION"
      },
      {
        "id": "part4",
        "label": "Common Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Console Playground",
        "icon": "🚀",
        "tag": "PRACTICE"
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
      "title": "What JavaScript Is & How Your Computer Runs It",
      "bigPicture": "JavaScript is the programming language that makes websites interactive. When you write JavaScript code, an environment called a runtime (like your web browser) reads your instructions and runs them sequentially, line by line from top to bottom, exactly like following a recipe.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "What JavaScript Does",
          "desc": "JavaScript gives instructions to computers to display messages, calculate values, and react to actions."
        },
        {
          "title": "Line-by-Line Execution",
          "desc": "Computers execute instructions in strict sequential order, completing one step before starting the next."
        },
        {
          "title": "The Console as Your Output Screen",
          "desc": "Using console.log() to print text, numbers, and calculation results directly to your screen."
        }
      ]
    },
    "part2": {
      "title": "Printing Output: Text, Numbers & Comments",
      "intro": "Before writing complex programs, you need a way to see what your code is doing. JavaScript gives you three essential building blocks:",
      "cards": [
        {
          "number": "01",
          "tag": "Messages",
          "title": "Printing Text in Quotes",
          "description": "To print words or sentences, wrap them in matching quotes, like console.log(\"Hello, World!\"). The quotes tell JavaScript this is plain text.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Calculations",
          "title": "Printing Numbers & Math",
          "description": "To print numbers or do calculations, do not use quotes! Writing console.log(10 + 5) tells JavaScript to calculate the sum (15) and print the result.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Notes",
          "title": "Helpful Notes (Comments)",
          "description": "Use // to write notes for yourself or other humans. JavaScript completely ignores anything after // on that line.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 Essential Beginner Rule",
        "content": "Always put quotes around text you want to display, but never put quotes around math calculations you want the computer to solve."
      }
    },
    "part3": {
      "title": "How the Computer Reads and Runs Your Code",
      "intro": "Understanding the exact line-by-line order the computer follows when reading your code:",
      "points": [
        {
          "title": "1. Reading Top to Bottom in Sequential Order",
          "content": "The computer starts at line 1, executes that statement completely, and then moves down to line 2. It never skips ahead or runs lines out of order."
        },
        {
          "title": "2. Calculating Expressions Inside Parentheses First",
          "content": "When the computer sees an expression like console.log(20 + 30), it first calculates the result (50) inside the parentheses. Once the value is ready, it prints 50 to your screen."
        },
        {
          "title": "3. Printing Multiple Items Together",
          "content": "You can print multiple items in a single line by separating them with commas. For example, console.log(\"Total items:\", 5 + 3) displays 'Total items: 8' with an automatic space in between.",
          "codeSnippet": "// Notice how text and numbers combine easily:\nconsole.log(\"Step 1: Starting up\");\nconsole.log(\"Total items:\", 5 + 3); // Prints: Total items: 8\nconsole.log(\"Step 2: All done!\");"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with console.log()",
      "bad": {
        "title": "❌ Broken: Missing quotes on words and quoting math calculations",
        "code": "// Mistake 1: Missing quotes causes an error (computer looks for a command named Hello)\nconsole.log(Hello);\n\n// Mistake 2: Quoting math prevents the calculation from happening\nconsole.log(\"10 + 5\"); // Prints literal text '10 + 5' instead of 15!",
        "explanation": "Leaving quotes off words makes JavaScript think 'Hello' is a variable or command that doesn't exist, causing a crash. Putting quotes around '10 + 5' treats it as plain text instead of doing the math."
      },
      "good": {
        "title": "✅ Clean: Words quoted, math unquoted, and clear output labels",
        "code": "// 1. Text is safely wrapped in double quotes\nconsole.log(\"Hello, Welcome to LearnCraft!\");\n\n// 2. Math is unquoted so the computer calculates it\nconsole.log(\"Calculation result:\", 10 + 5); // Prints: Calculation result: 15\n\n// 3. Clear step labels help you follow the flow\nconsole.log(\"Program finished successfully.\");",
        "explanation": "Wrapping text in quotes and leaving numbers unquoted produces clean, error-free output that is easy to read and understand."
      }
    },
    "part5": {
      "title": "Console & Output Playground",
      "intro": "Click Run Code to execute the script line by line. Notice how each statement prints in order. Then try the small exercise below!",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-01: HOW JAVASCRIPT RUNS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Printing text messages:\nconsole.log(\"👋 Welcome to LearnCraft!\");\nconsole.log(\"Programming in JavaScript is fun!\");\n\n// 2. Doing math calculations (no quotes):\nconsole.log(\"Result of 10 + 5:\", 10 + 5);\nconsole.log(\"Result of 100 - 25:\", 100 - 25);\nconsole.log(\"Result of 4 * 6:\", 4 * 6);\n\n// 3. Sequential order:\nconsole.log(\"First step: Preparing\");\nconsole.log(\"Second step: Processing\");\nconsole.log(\"Third step: Completed!\");\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Add a console.log() below that prints a friendly message with your name.\n// 2. Add a console.log() below that calculates 50 * 2.\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: How JavaScript Runs",
      "takeaways": [
        {
          "title": "1. Sequential Order",
          "desc": "JavaScript runs instructions top to bottom, one line after another."
        },
        {
          "title": "2. console.log() Displays Output",
          "desc": "Use console.log() to print messages, values, and calculations to your screen."
        },
        {
          "title": "3. Text Needs Quotes",
          "desc": "Always enclose words and text inside matching quotes like \"Hello\" or 'Hello'."
        },
        {
          "title": "4. Math Does Not Use Quotes",
          "desc": "Write numbers and math symbols without quotes so the computer calculates the answer."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-02: Variables & Data Types: Storing Data with let & const",
        "desc": "Now that you know how code runs and prints, learn how to store values in named containers so you can reuse them."
      }
    },
    "part7": {
      "title": "Knowledge Check: How JavaScript Runs",
      "quiz": {
        "question": "What will the following line of code print to the screen: console.log(\"5 + 5\", 5 + 5);",
        "options": [
          "\"5 + 5 10\"",
          "5 + 5 10",
          "10 10",
          "5 + 5 5 + 5"
        ],
        "correctIndex": 1,
        "explanation": "The first item \"5 + 5\" is in quotes, so JavaScript prints the literal text 5 + 5. The second item is unquoted, so JavaScript calculates 5 + 5 to produce the number 10."
      }
    }
  },

  "js02-variables-and-data-types": {
    "slug": "js02-variables-and-data-types",
    "code": "JS-02",
    "title": "Variables & Data Types: Storing Data with let & const",
    "subtitle": "Learn what variables are, how to create them with const and let, and how to work with the core data types (strings, numbers, and booleans).",
    "sections": [
      {
        "id": "part1",
        "label": "What is a Variable?",
        "icon": "📦",
        "tag": "CONCEPT"
      },
      {
        "id": "part2",
        "label": "const vs let Rules",
        "icon": "🔒",
        "tag": "RULES"
      },
      {
        "id": "part3",
        "label": "The Core Data Types",
        "icon": "💎",
        "tag": "TYPES"
      },
      {
        "id": "part4",
        "label": "Common Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Variables Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "What Is a Variable & Why Do We Need Them?",
      "bigPicture": "A variable is a labeled container in your computer's memory that stores a piece of information. Instead of typing the same number or name repeatedly, you store it once under a clear name. Later in your program, you can refer to that name whenever you need the value.",
      "breakdownTitle": "The Natural Steps to Learning Variables:",
      "breakdownItems": [
        {
          "title": "1. Giving Data a Name",
          "desc": "Store a value in a labeled container so you can reuse it throughout your program."
        },
        {
          "title": "2. Choosing const vs let",
          "desc": "Lock values that should never change with const, and allow updates with let."
        },
        {
          "title": "3. Core Data Types",
          "desc": "Understand text (strings), numbers, and true/false states (booleans)."
        }
      ]
    },
    "part2": {
      "title": "Creating Variables: When to Use const and let",
      "intro": "Modern JavaScript gives you two keywords to create a variable. The rule for choosing between them is simple:",
      "cards": [
        {
          "number": "01",
          "tag": "Unchangeable",
          "title": "const (For Values That Stay the Same)",
          "description": "Use const by default. Once you assign a value to a const variable, it cannot be changed or overwritten. This keeps your code safe and predictable.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Changeable",
          "title": "let (For Values That Change)",
          "description": "Use let only when you know the value will change later in your program, like a game score, an item counter, or a user input.",
          "color": "purple"
        },
        {
          "number": "03",
          "tag": "Legacy",
          "title": "Why We Avoid var",
          "description": "Older JavaScript written years ago used the keyword var. Modern code avoids var because it can accidentally leak outside blocks and cause difficult bugs.",
          "color": "amber"
        }
      ],
      "rule": {
        "title": "💡 The Modern Variable Rule",
        "content": "Always start by creating your variables with const. If you later realize that the value must be changed, change const to let."
      }
    },
    "part3": {
      "title": "Understanding JavaScript's Core Data Types",
      "intro": "Every value in JavaScript belongs to a specific type. Here are the essential types you will use every day:",
      "points": [
        {
          "title": "1. Strings (Text in Quotes)",
          "content": "Any text wrapped in quotes (like \"LearnCraft\" or 'Alice') is a String. Strings hold names, messages, addresses, and any written words."
        },
        {
          "title": "2. Numbers & Booleans",
          "content": "Numbers are written without quotes (like 42 or 19.99) and can be added or multiplied. Booleans are simple true or false switches used for checking states (like isLoggedIn = true)."
        },
        {
          "title": "3. Empty Values: undefined vs null",
          "content": "undefined means a variable was created, but no value has been put into it yet. null is an intentional value you assign to say 'this container is empty on purpose'. Use typeof to check what kind of value a variable holds.",
          "codeSnippet": "const city = \"Tokyo\";     // string\nconst price = 25;         // number\nconst isOpen = true;      // boolean\nlet userFeedback;         // undefined (not assigned yet)\nconst discount = null;    // null (explicitly empty)"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Variables",
      "bad": {
        "title": "❌ Broken: Reassigning const and forgetting quotes around words",
        "code": "// Mistake 1: Trying to change a const variable\nconst currentScore = 10;\ncurrentScore = 15; // ❌ TypeError: Assignment to constant variable!\n\n// Mistake 2: Forgetting quotes around text\nconst userCity = Paris; // ❌ ReferenceError: Paris is not defined!\n\n// Mistake 3: Misspelling the variable name\nconst accountBalance = 50;\nconsole.log(accountBalanse); // ❌ ReferenceError: accountBalanse is not defined",
        "explanation": "You cannot change a const variable once assigned. Forgetting quotes around 'Paris' causes JavaScript to look for a variable named Paris instead of storing the city name text."
      },
      "good": {
        "title": "✅ Clean: Using let for changing values and const for fixed values",
        "code": "// 1. Fixed values use const\nconst maxScore = 100;\nconst playerName = \"Alex\"; // Text in quotes!\n\n// 2. Values that change use let\nlet currentScore = 10;\ncurrentScore = 15; // ✅ Allowed because currentScore is a let variable!\n\n// 3. Clear, accurate names when printing\nconsole.log(playerName, \"has score:\", currentScore, \"out of\", maxScore);",
        "explanation": "Using const for fixed settings and let for values that change makes your code clear, predictable, and free from runtime crashes."
      }
    },
    "part5": {
      "title": "Variables & Data Types Playground",
      "intro": "Run the code to see how const protects fixed values while let allows updates. Then follow the instructions to create your own variables!",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-02: VARIABLES & DATA TYPES\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Information that stays constant (const):\nconst appName = \"LearnCraft\";\nconst releaseYear = 2026;\n\n// 2. Information that updates over time (let):\nlet activeUsers = 50;\nconsole.log(appName, \"launched in\", releaseYear, \"with\", activeUsers, \"users.\");\n\n// Update the user count:\nactiveUsers = activeUsers + 25;\nconsole.log(\"Updated active users:\", activeUsers);\n\n// 3. Inspecting types with typeof:\nconsole.log(\"Type of appName:\", typeof appName);         // string\nconsole.log(\"Type of releaseYear:\", typeof releaseYear); // number\nconsole.log(\"Type of isLive:\", typeof true);             // boolean\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Create a const variable named 'country' and store your country in quotes.\n// 2. Create a let variable named 'userScore' and set it to 10.\n// 3. On the next line, update 'userScore' to 20.\n// 4. Print both variables using console.log().\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Storing Data in Variables",
      "takeaways": [
        {
          "title": "1. Variables Are Containers",
          "desc": "They hold values in memory under a label so you can reuse them anywhere in your code."
        },
        {
          "title": "2. const by Default",
          "desc": "Use const for values that stay constant to protect against accidental overwrites."
        },
        {
          "title": "3. let for Changing Values",
          "desc": "Use let when you know a value will be updated, such as counters, totals, or game states."
        },
        {
          "title": "4. Core Data Types",
          "desc": "Strings are text in quotes, Numbers are for math, and Booleans are true/false switches."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-03: Operators, Comparisons & Type Conversion: The === Rule",
        "desc": "Now that you know how to store values, learn how to calculate, compare, and convert them safely."
      }
    },
    "part7": {
      "title": "Knowledge Check: Variables & Data Types",
      "quiz": {
        "question": "What happens if you try to reassign a new value to a variable created with 'const'?",
        "options": [
          "JavaScript silently ignores the new value and keeps running.",
          "JavaScript throws a TypeError because constant variables cannot be reassigned.",
          "The variable automatically converts from const to let.",
          "The computer deletes the variable from memory."
        ],
        "correctIndex": 1,
        "explanation": "A const variable is locked upon creation. Trying to assign a new value to it triggers a TypeError: Assignment to constant variable."
      }
    }
  },

  "js03-operators-and-equality": {
    "slug": "js03-operators-and-equality",
    "code": "JS-03",
    "title": "Operators, Comparisons & Type Conversion: The === Rule",
    "subtitle": "Perform calculations, compare values with strict equality (===), convert data types, and combine conditions with logic.",
    "sections": [
      {
        "id": "part1",
        "label": "What Are Operators?",
        "icon": "🔢",
        "tag": "OPERATORS"
      },
      {
        "id": "part2",
        "label": "Math & Comparisons",
        "icon": "⚖️",
        "tag": "COMPARISONS"
      },
      {
        "id": "part3",
        "label": "Strict Equality & Types",
        "icon": "🛡️",
        "tag": "STRICT"
      },
      {
        "id": "part4",
        "label": "Common Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Operators Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "What Operators Are & How We Use Them",
      "bigPicture": "Operators are special symbols that tell JavaScript to perform an action on values. You use arithmetic operators to calculate totals, comparison operators to check if two values are equal or which one is larger, and logical operators to combine multiple checks together.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Arithmetic & Text Joining",
          "desc": "Perform math (+, -, *, /, %) and learn how the plus symbol (+) also joins text together."
        },
        {
          "title": "2. Comparison Operators & The === Rule",
          "desc": "Compare values (>, <, >=, <=) and understand why developers always use strict equality (===)."
        },
        {
          "title": "3. Type Conversion & Logic",
          "desc": "Learn how to convert between strings and numbers, and how to test multiple conditions using && and ||."
        }
      ]
    },
    "part2": {
      "title": "The Three Main Families of Operators",
      "intro": "Every JavaScript operator belongs to one of three main groups:",
      "cards": [
        {
          "number": "01",
          "tag": "Math",
          "title": "Arithmetic Operators (+, -, *, /, %)",
          "description": "Add, subtract, multiply, and divide numbers. The remainder operator (%) gives you what is left over after division (for example, 7 % 2 is 1).",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Checks",
          "title": "Comparison Operators (===, !==, >, <)",
          "description": "Comparisons always produce a boolean answer: true or false. For example, 10 > 5 is true, while 4 === 9 is false.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Logic",
          "title": "Logical Operators (&&, ||, !)",
          "description": "Combine checks together: && (AND) requires both sides to be true; || (OR) requires at least one side to be true; ! (NOT) flips true to false.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Strict Equality Rule",
        "content": "Always compare values with triple equals (===) and !==. Triple equals checks both the value and the type, preventing hidden surprises."
      }
    },
    "part3": {
      "title": "Type Conversion & Why Double Equals (==) Is Dangerous",
      "intro": "JavaScript sometimes tries to guess what you meant when mixing types, which can cause subtle bugs if you are not careful:",
      "points": [
        {
          "title": "1. The Plus Trap: Math vs Text Joining",
          "content": "When you use + between numbers, JavaScript adds them (5 + 5 is 10). But if either value is text, JavaScript joins them together as a string (\"5\" + 5 is \"55\"!)."
        },
        {
          "title": "2. Intentional Type Conversion",
          "content": "Never let JavaScript guess. If you have text like \"42\" and want to do math, convert it intentionally using Number(\"42\"). To convert a number to text, use String(42)."
        },
        {
          "title": "3. Strict (===) vs Loose (==) Equality",
          "content": "Double equals (==) tries to convert types behind your back, making 0 == \"\" true! Triple equals (===) strictly checks that both sides have the exact same type and value, so 0 === \"\" is correctly false.",
          "codeSnippet": "// Notice the difference between strict and loose equality:\nconsole.log(10 === 10);     // true (same type and value)\nconsole.log(10 === \"10\");   // false (number is not string)\nconsole.log(10 == \"10\");    // true (danger: loose equality converts types!)"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Operators & Equality",
      "bad": {
        "title": "❌ Broken: Using = instead of ===, and adding text to numbers by mistake",
        "code": "// Mistake 1: Accidentally using a single equals = (assignment) instead of === (comparison)\nconst userAge = 18;\n// if (userAge = 21) { ... } -> ❌ Overwrites userAge instead of comparing it!\n\n// Mistake 2: Mixing numbers and strings in math without converting\nconst itemPrice = \"20\";\nconst tax = 5;\nconst total = itemPrice + tax; // ❌ Result is \"205\" instead of 25!",
        "explanation": "A single equals (=) assigns a value, while triple equals (===) tests for equality. Adding a string to a number joins the characters together (\"205\") instead of calculating 25."
      },
      "good": {
        "title": "✅ Clean: Strict equality checks and intentional type conversion",
        "code": "// 1. Comparing safely with triple equals\nconst userAge = 18;\nconst isAdult = userAge >= 18;\nconsole.log(\"Is user an adult?\", isAdult); // true\n\n// 2. Converting text to number before calculating\nconst itemPriceText = \"20\";\nconst itemPrice = Number(itemPriceText); // Convert text to number 20\nconst tax = 5;\nconst total = itemPrice + tax; // ✅ Correctly calculates 25\nconsole.log(\"Total price:\", total);",
        "explanation": "Converting string inputs to numbers using Number() guarantees accurate arithmetic, and using === and >= makes comparisons clear and reliable."
      }
    },
    "part5": {
      "title": "Operators & Equality Playground",
      "intro": "Run the code below to see arithmetic, comparisons, and logical checks in action. Then complete the challenges in the comments!",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-03: OPERATORS, EQUALITY & TYPE CONVERSION\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Arithmetic & Text Joining:\nconst price = 40;\nconst shipping = 10;\nconst totalCost = price + shipping;\nconsole.log(\"Order Total: $\" + totalCost); // Text joining with +\n\n// 2. Comparisons (produce true or false):\nconst userAge = 20;\nconst hasTicket = true;\n\nconst isOldEnough = userAge >= 18;\nconsole.log(\"Is 18 or older:\", isOldEnough); // true\n\n// 3. Strict Equality (===):\nconsole.log(\"Strict check (userAge === 20):\", userAge === 20);     // true\nconsole.log(\"Strict check (userAge === '20'):\", userAge === \"20\"); // false\n\n// 4. Combining checks with && (AND):\nconst canEnterEvent = isOldEnough && hasTicket;\nconsole.log(\"Can enter event:\", canEnterEvent); // true\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Create a variable 'score' set to 85.\n// 2. Create a boolean variable 'passed' that checks if score >= 70.\n// 3. Print 'passed' to the console.\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Operators & Comparisons",
      "takeaways": [
        {
          "title": "1. Math vs Text Joining",
          "desc": "The + symbol adds numbers together, but if either side is text, it joins them as a string."
        },
        {
          "title": "2. Comparisons Return Booleans",
          "desc": "Operators like >, <, >=, and === always evaluate to true or false."
        },
        {
          "title": "3. Always Use ===",
          "desc": "Strict equality (===) checks both value and type without silent, error-prone conversions."
        },
        {
          "title": "4. Combine with && and ||",
          "desc": "Use && when all conditions must be true, and || when at least one condition must be true."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-04: Conditional Logic: Decision Making with if/else & switch",
        "desc": "Now that you know how to compare values, learn how to make decisions and run different code blocks using if and else."
      }
    },
    "part7": {
      "title": "Knowledge Check: Operators & Equality",
      "quiz": {
        "question": "What does the expression 10 + \"5\" evaluate to in JavaScript?",
        "options": [
          "15 (as a number)",
          "\"105\" (as text)",
          "NaN (Not a Number error)",
          "undefined"
        ],
        "correctIndex": 1,
        "explanation": "Because one of the values is a string (\"5\"), JavaScript converts the number 10 into text and joins them together, producing the string \"105\"."
      }
    }
  },

  "js04-conditional-logic": {
    "slug": "js04-conditional-logic",
    "code": "JS-04",
    "title": "Conditional Logic: Making Decisions with if, else & switch",
    "subtitle": "Teach your programs to make decisions: run code only when conditions are true, handle alternatives with else, and match multiple cases with switch.",
    "sections": [
      {
        "id": "part1",
        "label": "How Code Makes Decisions",
        "icon": "🚦",
        "tag": "DECISIONS"
      },
      {
        "id": "part2",
        "label": "if, else if, and else",
        "icon": "🔀",
        "tag": "BRANCHING"
      },
      {
        "id": "part3",
        "label": "Ternary & switch",
        "icon": "⚖️",
        "tag": "CHOICES"
      },
      {
        "id": "part4",
        "label": "Common Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Conditionals Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "Decision Making: How Programs Choose Different Paths",
      "bigPicture": "Every program needs to make decisions based on changing information. An if statement is like a fork in the road: if the signal light is green, proceed forward; otherwise, take a different path or stop.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "The if Statement",
          "desc": "Run a block of code only when a condition evaluates to true."
        },
        {
          "title": "Handling Alternatives with else",
          "desc": "Provide an alternative fallback block when the condition is false."
        },
        {
          "title": "Ternary & switch",
          "desc": "Write concise one-line checks and handle multiple exact matches cleanly."
        }
      ]
    },
    "part2": {
      "title": "Branching Flow: if, else if, and else",
      "intro": "JavaScript uses three keywords to create decision branches in your code:",
      "cards": [
        {
          "number": "01",
          "tag": "Primary",
          "title": "if Statement",
          "description": "Runs its curly-brace code block only if its condition evaluates to true. If false, JavaScript skips the block completely.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Fallback",
          "title": "else Statement",
          "description": "Runs only when the if condition above it is false. It guarantees that one of the two code blocks will always run.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Chaining",
          "title": "else if Statement",
          "description": "Lets you check multiple possible conditions in order from top to bottom. The first one that is true runs, and the rest are skipped.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Order-of-Checks Rule",
        "content": "JavaScript checks conditions from top to bottom and stops at the very first true match. Always place your most specific conditions first."
      }
    },
    "part3": {
      "title": "The Ternary Operator & switch Statements",
      "intro": "When you need concise checks or want to match multiple exact values, JavaScript provides two clean tools:",
      "points": [
        {
          "title": "1. The Ternary Operator (? : ) for Quick Choices",
          "content": "When you simply want to pick one of two values based on a condition, the ternary operator is a clean shortcut: const status = isOnline ? \"Active\" : \"Offline\";"
        },
        {
          "title": "2. switch Statements for Multiple Exact Values",
          "content": "When checking a single variable against many exact values (like days of the week or user roles), switch is cleaner than writing many else if statements."
        },
        {
          "title": "3. Why Every switch Case Needs a 'break'",
          "content": "Without a break statement, JavaScript does not stop after matching a case; it falls through and runs the next cases too! Always end each case with break.",
          "codeSnippet": "const userRole = \"admin\";\n\nswitch (userRole) {\n  case \"admin\":\n    console.log(\"Full access granted\");\n    break; // Stop here!\n  case \"editor\":\n    console.log(\"Edit access granted\");\n    break;\n  default:\n    console.log(\"Read-only access\");\n}"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Conditionals",
      "bad": {
        "title": "❌ Broken: Using = instead of ===, and adding a semicolon after the if condition",
        "code": "const score = 85;\n\n// Mistake 1: Accidental assignment instead of comparison\n// if (score = 100) -> Overwrites score with 100 and always runs!\n\n// Mistake 2: Semicolon after if condition terminates it immediately\nif (score > 90); {\n  console.log(\"You got an A!\"); // Runs even though score is 85!\n}",
        "explanation": "Putting a semicolon immediately after if (score > 90); cuts the if statement short, so the code inside the curly braces runs unconditionally. Using single = reassigns the variable instead of comparing it."
      },
      "good": {
        "title": "✅ Clean: Clear comparisons with proper curly-brace blocks",
        "code": "const score = 85;\n\nif (score >= 90) {\n  console.log(\"Grade: A (Excellent!)\");\n} else if (score >= 80) {\n  console.log(\"Grade: B (Well done!)\");\n} else {\n  console.log(\"Grade: C (Keep practicing!)\");\n}\n\n// Clean ternary for status label:\nconst passStatus = score >= 70 ? \"Passed\" : \"Needs review\";\nconsole.log(\"Status:\", passStatus);",
        "explanation": "Using === or >= with clean curly-brace blocks ensures each branch runs only when its condition is genuinely met."
      }
    },
    "part5": {
      "title": "Conditional Logic Playground",
      "intro": "Run the code below to see if/else branching, ternary checks, and switch statements in action:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-04: CONDITIONAL LOGIC & DECISION MAKING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst userAge = 20;\nconst isMember = true;\n\n// 1. Basic if / else branching:\nif (userAge >= 18) {\n  console.log(\"Access: Welcome to the adult section!\");\n} else {\n  console.log(\"Access: Sorry, you must be 18 or older.\");\n}\n\n// 2. Chained else if for membership discounts:\nlet discountRate = 0;\n\nif (isMember && userAge >= 60) {\n  discountRate = 30; // Senior Member\n} else if (isMember) {\n  discountRate = 15; // Regular Member\n} else {\n  discountRate = 0;  // Non-member\n}\nconsole.log(\"Discount Rate:\", discountRate + \"%\");\n\n// 3. Ternary operator shortcut:\nconst accountStatus = isMember ? \"Active Member\" : \"Guest\";\nconsole.log(\"Status:\", accountStatus);\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Create a variable 'temperature' set to 28.\n// 2. If temperature > 25, print \"Wear shorts!\".\n// 3. Otherwise, print \"Bring a jacket!\".\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Making Decisions",
      "takeaways": [
        {
          "title": "1. if Checks Conditions",
          "desc": "Code inside an if block runs only when its condition evaluates to true."
        },
        {
          "title": "2. else Provides Fallbacks",
          "desc": "Use else to run an alternative block when the condition is false."
        },
        {
          "title": "3. Ternary for Simple Values",
          "desc": "condition ? valueIfTrue : valueIfFalse is great for simple one-line assignments."
        },
        {
          "title": "4. break in switch",
          "desc": "Always put a break statement at the end of each switch case to prevent fall-through."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-05: Loops & Iteration: Repeating Work Without Repeating Code",
        "desc": "Now that you know how to make decisions, learn how to repeat instructions automatically with loops."
      }
    },
    "part7": {
      "title": "Knowledge Check: Decision Making",
      "quiz": {
        "question": "What happens in a switch statement if you forget to add a 'break' statement after a case?",
        "options": [
          "It throws a SyntaxError and stops running immediately.",
          "It falls through and executes the next case regardless of whether that case matches.",
          "It restarts the switch statement from the top.",
          "It deletes the variable being tested."
        ],
        "correctIndex": 1,
        "explanation": "Without a break statement, JavaScript continues executing subsequent cases even if their case values do not match."
      }
    }
  },

  "js05-loops-and-iteration": {
    "slug": "js05-loops-and-iteration",
    "code": "JS-05",
    "title": "Loops & Iteration: Repeating Work Without Repeating Code",
    "subtitle": "Automate repetitive tasks: understand while loops, master counting with classic for loops, and control iteration with break and continue.",
    "sections": [
      {
        "id": "part1",
        "label": "Why We Need Loops",
        "icon": "🔁",
        "tag": "AUTOMATION"
      },
      {
        "id": "part2",
        "label": "while & for Loop Mechanics",
        "icon": "⚙️",
        "tag": "SYNTAX"
      },
      {
        "id": "part3",
        "label": "Counter Walkthrough",
        "icon": "🔢",
        "tag": "COUNTERS"
      },
      {
        "id": "part4",
        "label": "Infinite Loop Traps",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Loops Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "Repeating Tasks: Why Loops Save Time",
      "bigPicture": "Computers are incredible at repeating work thousands of times without making mistakes or getting tired. Instead of copying and pasting the same line of code over and over, a loop tells the computer: 'keep running this block of code until my condition says to stop'.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. while Loops",
          "desc": "Repeat instructions as long as a condition remains true."
        },
        {
          "title": "2. for Loops",
          "desc": "A compact, standard loop for counting from a start number to an end number."
        },
        {
          "title": "3. Loop Control",
          "desc": "Use break to stop a loop early, and continue to skip to the next repetition."
        }
      ]
    },
    "part2": {
      "title": "The Two Main Kinds of Loops: while and for",
      "intro": "JavaScript gives you two primary ways to repeat code:",
      "cards": [
        {
          "number": "01",
          "tag": "Condition-First",
          "title": "The while Loop",
          "description": "while (condition) { ... } checks its condition before every round. As long as it is true, the block runs again. Great when you don't know the exact count in advance.",
          "color": "amber"
        },
        {
          "number": "02",
          "tag": "Counting",
          "title": "The Classic for Loop",
          "description": "for (start; check; step) packs the counter creation, condition check, and increment into one neat line. Perfect when you know how many times to repeat.",
          "color": "emerald"
        },
        {
          "number": "03",
          "tag": "Steering",
          "title": "break and continue",
          "description": "break stops the entire loop immediately. continue skips the rest of the current round and jumps straight to the next cycle.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Termination Rule",
        "content": "Every loop must have a guaranteed path to its exit condition. Always make sure your counter moves closer to stopping on every single round."
      }
    },
    "part3": {
      "title": "Step-by-Step Walkthrough of a for Loop",
      "intro": "Understanding exactly what happens on each round of a counting loop:",
      "points": [
        {
          "title": "1. The 3 Parts of a for Loop",
          "content": "In for (let i = 1; i <= 3; i++), part 1 runs once at the start (let i = 1). Part 2 checks if i <= 3. If true, the code block runs. Part 3 increments i (i++), and the cycle repeats."
        },
        {
          "title": "2. Tracing the Counter",
          "content": "Round 1: i is 1 (runs). Round 2: i is 2 (runs). Round 3: i is 3 (runs). Then i becomes 4: 4 <= 3 is false, so the loop stops!"
        },
        {
          "title": "3. break vs continue in Action",
          "content": "Use break when you find what you are looking for and don't need to check further. Use continue when you want to ignore a specific number (like skipping even numbers).",
          "codeSnippet": "// Count from 1 to 5, but skip number 3:\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue; // Skip 3\n  console.log(\"Count:\", i); // Prints 1, 2, 4, 5\n}"
        }
      ]
    },
    "part4": {
      "title": "The Infinite Loop Trap: Freezing the Browser",
      "bad": {
        "title": "❌ Broken: Forgetting to increment the counter in a while loop",
        "code": "let count = 1;\n\n// Danger: count is never updated inside the loop!\n// while (count <= 3) {\n//   console.log(\"Count:\", count);\n//   // Forgot count++! Runs forever and freezes your tab!\n// }",
        "explanation": "Because count remains 1 forever, count <= 3 is always true. The loop repeats millions of times per second until the browser crashes."
      },
      "good": {
        "title": "✅ Clean: Guaranteed counter progression with safe bounds",
        "code": "// 1. while loop with counter update\nlet count = 1;\nwhile (count <= 3) {\n  console.log(\"While count:\", count);\n  count++; // Safe: moves toward 4, stopping the loop!\n}\n\n// 2. for loop with compact counting\nfor (let i = 1; i <= 3; i++) {\n  console.log(\"For loop count:\", i);\n}",
        "explanation": "Updating the counter on every iteration guarantees that the exit condition is reached cleanly."
      }
    },
    "part5": {
      "title": "Loops & Iteration Playground",
      "intro": "Run counting loops, experiment with while statements, and control loops with break:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-05: LOOPS & ITERATION\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Counting with a classic for loop:\nconsole.log(\"--- Counting 1 to 5 ---\\n\");\nfor (let i = 1; i <= 5; i++) {\n  console.log(\"Step #\" + i);\n}\n\n// 2. Countdown with a while loop:\nconsole.log(\"\\n--- Rocket Launch Countdown ---\\n\");\nlet countdown = 3;\nwhile (countdown > 0) {\n  console.log(countdown + \"...\");\n  countdown--; // Decrement counter\n}\nconsole.log(\"🚀 Blast off!\\n\");\n\n// 3. Early exit with break:\nconsole.log(\"--- Searching for number 3 ---\\n\");\nfor (let num = 1; num <= 10; num++) {\n  if (num === 3) {\n    console.log(\"Found target number 3! Stopping early.\");\n    break; // Stop loop here\n  }\n  console.log(\"Checking:\", num);\n}\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Write a for loop that calculates the sum of numbers from 1 to 5.\n//    (Hint: start with let total = 0; before the loop).\n// 2. Print the final total to the console.\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Repeating Tasks",
      "takeaways": [
        {
          "title": "1. Loops Automate Repetition",
          "desc": "They run a code block repeatedly until their exit condition is reached."
        },
        {
          "title": "2. for for Counting",
          "desc": "Use for (let i = 0; i < n; i++) when you know the number of repetitions."
        },
        {
          "title": "3. Guaranteed Counter Updates",
          "desc": "Always ensure while loop counters increment to avoid infinite loops."
        },
        {
          "title": "4. break & continue",
          "desc": "Use break to exit early, and continue to skip the current cycle."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-06: Functions: Packaging Reusable Logic & Arrow Syntax",
        "desc": "Now that you can make decisions and repeat tasks, learn how to package code into reusable functions."
      }
    },
    "part7": {
      "title": "Knowledge Check: Repeating Tasks",
      "quiz": {
        "question": "What is the key difference between the 'break' and 'continue' keywords inside a loop?",
        "options": [
          "break stops the entire loop immediately; continue skips to the next cycle of the loop.",
          "break pauses execution for 1 second; continue runs the loop faster.",
          "break is only allowed in while loops; continue is only allowed in for loops.",
          "There is no difference; both words do the exact same thing."
        ],
        "correctIndex": 0,
        "explanation": "The 'break' keyword terminates the loop completely, while 'continue' skips the rest of the current round and jumps to the next iteration."
      }
    }
  },

  "js06-functions-and-arrow-syntax": {
    "slug": "js06-functions-and-arrow-syntax",
    "code": "JS-06",
    "title": "Functions: Packaging Reusable Logic & Arrow Syntax",
    "subtitle": "Write reusable blocks of code: understand function declarations, pass parameters in, return results, and master concise modern arrow functions.",
    "sections": [
      {
        "id": "part1",
        "label": "What Is a Function?",
        "icon": "📦",
        "tag": "CONCEPT"
      },
      {
        "id": "part2",
        "label": "Parameters & Return Values",
        "icon": "📥",
        "tag": "MECHANICS"
      },
      {
        "id": "part3",
        "label": "Modern Arrow Functions",
        "icon": "🏹",
        "tag": "ARROWS"
      },
      {
        "id": "part4",
        "label": "Common Function Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Functions Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "What a Function Is & Why We Use Them",
      "bigPicture": "A function is a reusable machine in your code. You write a set of instructions once, give it a name, and can call it anytime with different inputs to get calculated results. Think of a function like a smoothie blender: you drop ingredients in (parameters), run the machine, and pour out the delicious result (return value).",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Function Declarations",
          "desc": "Define reusable blocks using the function keyword and give them descriptive names."
        },
        {
          "title": "2. Parameters vs Arguments",
          "desc": "Parameters are the input placeholders in the definition; arguments are the real values passed in."
        },
        {
          "title": "3. Return Values & Arrow Syntax",
          "desc": "Send computed answers back to callers using return, and write concise modern arrow functions."
        }
      ]
    },
    "part2": {
      "title": "Parameters, Arguments & Return Values",
      "intro": "Functions communicate with the rest of your program through inputs and outputs:",
      "cards": [
        {
          "number": "01",
          "tag": "Standard",
          "title": "function Declaration",
          "description": "function greet(name) { return \"Hello, \" + name; } — the standard, classic way to define a named reusable function.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Inputs",
          "title": "Parameters & Arguments",
          "description": "Parameters are the variable names in the function definition (like name). Arguments are the actual values you pass in when calling it (like greet(\"Alice\")).",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Outputs",
          "title": "The return Keyword",
          "description": "Sends a value back out to where the function was called. If you don't write a return statement, the function returns undefined by default.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Single Responsibility Rule",
        "content": "Keep each function focused on doing one job well. Give your function a clear action verb name like calculateTotal, formatName, or isAdult."
      }
    },
    "part3": {
      "title": "Modern Arrow Functions (=>)",
      "intro": "Writing clean, concise functions using modern ES6 arrow syntax:",
      "points": [
        {
          "title": "1. Arrow Function Syntax",
          "content": "Modern JavaScript allows writing functions using an arrow (=>): const add = (a, b) => { return a + b; }; It creates a function and stores it inside a const variable."
        },
        {
          "title": "2. One-Line Implicit Return Shortcut",
          "content": "If an arrow function only contains a single expression, you can remove the curly braces and the return keyword! const add = (a, b) => a + b; automatically returns the sum."
        },
        {
          "title": "3. Default Parameters",
          "content": "You can provide a fallback value for any parameter: function greet(name = \"Guest\") { ... } If someone calls greet() without passing a name, it uses 'Guest' automatically.",
          "codeSnippet": "// Classic function:\nfunction multiply(a, b) {\n  return a * b;\n}\n\n// Modern 1-line arrow function (implicit return):\nconst multiplyArrow = (a, b) => a * b;\n\nconsole.log(multiplyArrow(4, 5)); // 20"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Functions",
      "bad": {
        "title": "❌ Broken: Forgetting the return statement and mixing up parameters with console.log",
        "code": "// Mistake 1: Forgetting return (calling code gets undefined!)\nfunction addBonus(score) {\n  const newScore = score + 50;\n  // Forgot to return newScore!\n}\n\nconst finalScore = addBonus(100);\nconsole.log(\"Final Score:\", finalScore); // ❌ undefined!\n\n// Mistake 2: Forgetting to call the function with parentheses\nconsole.log(addBonus); // ❌ Prints function code, does not run it!",
        "explanation": "Printing with console.log() inside a function only shows output on the screen; it does NOT send the value back to your code. You must use return. Also, writing addBonus without () references the function itself without executing it."
      },
      "good": {
        "title": "✅ Clean: Explicit returns and proper function calls",
        "code": "// 1. Function calculates and returns the result\nfunction addBonus(score) {\n  return score + 50; // ✅ Returns the new number\n}\n\n// 2. Call with parentheses and store the returned answer\nconst finalScore = addBonus(100);\nconsole.log(\"Final Score:\", finalScore); // 150\n\n// 3. Clean arrow function alternative\nconst double = (num) => num * 2;\nconsole.log(\"Double 25:\", double(25)); // 50",
        "explanation": "Using return delivers the calculated value so you can store it in variables or pass it to other calculations."
      }
    },
    "part5": {
      "title": "Functions & Arrow Syntax Playground",
      "intro": "Write functions, experiment with default parameters, and convert regular functions to arrows:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-06: FUNCTIONS & ARROW SYNTAX\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Standard Function with Default Parameter:\nfunction greetUser(name = \"Friend\") {\n  return \"Hello, \" + name + \"! Welcome back.\";\n}\n\nconsole.log(greetUser(\"Alex\"));\nconsole.log(greetUser()); // Uses default 'Friend'\n\n// 2. Function with Math calculation and explicit return:\nfunction calculateDiscount(price, discountPercent = 10) {\n  const discountAmount = price * (discountPercent / 100);\n  return price - discountAmount;\n}\n\nconst salePrice = calculateDiscount(100, 20);\nconsole.log(\"Sale Price ($100 with 20% off): $\" + salePrice);\n\n// 3. Concise 1-line Arrow Function (implicit return):\nconst isAdult = (age) => age >= 18;\nconsole.log(\"Is age 20 an adult?:\", isAdult(20)); // true\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Create a function 'calculateArea(width, height)' that returns width * height.\n// 2. Call calculateArea(5, 10) and print the result.\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Functions & Reusable Logic",
      "takeaways": [
        {
          "title": "1. Functions Package Code",
          "desc": "Write logic once and run it many times with different inputs."
        },
        {
          "title": "2. Parameters vs Arguments",
          "desc": "Parameters are the variables in the definition; arguments are the real values passed in."
        },
        {
          "title": "3. Always return Results",
          "desc": "Use return to send computed values back to the calling code."
        },
        {
          "title": "4. Arrow Functions (=>)",
          "desc": "Use arrow functions for clean, modern syntax and concise one-line returns."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-07: Scope: Global, Function, and Block Scope",
        "desc": "Now that you can write functions, learn where variables live and why scope boundaries protect your code."
      }
    },
    "part7": {
      "title": "Knowledge Check: Functions & Arrow Syntax",
      "quiz": {
        "question": "What does a JavaScript function return if it finishes running without reaching an explicit 'return' statement?",
        "options": [
          "null",
          "0",
          "undefined",
          "false"
        ],
        "correctIndex": 2,
        "explanation": "In JavaScript, any function that finishes executing without an explicit return statement automatically returns undefined."
      }
    }
  },

  "js07-scope-global-function-block": {
    "slug": "js07-scope-global-function-block",
    "code": "JS-07",
    "title": "Scope: Where Variables Live (Global, Function & Block)",
    "subtitle": "Understand variable visibility boundaries: discover why let and const stay inside curly braces, how function scope protects data, and how the one-way scope chain works.",
    "sections": [
      {
        "id": "part1",
        "label": "What Is Scope?",
        "icon": "🔍",
        "tag": "BOUNDARIES"
      },
      {
        "id": "part2",
        "label": "The 3 Scope Levels",
        "icon": "🧱",
        "tag": "LEVELS"
      },
      {
        "id": "part3",
        "label": "The Scope Chain",
        "icon": "🪜",
        "tag": "LOOKUP"
      },
      {
        "id": "part4",
        "label": "Common Scope Mistakes",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Scope Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "Scope: Where Variables Live and Where They Disappear",
      "bigPicture": "Scope is the set of rules that decides where your variables can be seen and reached in your code. Think of scope like rooms in a building with one-way glass: code running inside an inner room can look out into the hallway to see outer variables, but code in the hallway cannot look inside the private room to see inner variables.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Global Scope",
          "desc": "Variables created outside of any function or block, accessible everywhere in your script."
        },
        {
          "title": "2. Function Scope",
          "desc": "Variables created inside a function exist only while that function is running."
        },
        {
          "title": "3. Block Scope (let and const)",
          "desc": "Variables declared inside curly braces { } cannot leak outside those braces."
        }
      ]
    },
    "part2": {
      "title": "The Three Levels of Scope in JavaScript",
      "intro": "Every variable you create lives in one of three scope levels:",
      "cards": [
        {
          "number": "01",
          "tag": "Everywhere",
          "title": "Global Scope",
          "description": "Variables declared outside of all functions and blocks. Any part of your script can read them. Keep them few to avoid accidental name collisions.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Function",
          "title": "Function Scope",
          "description": "Variables declared inside a function are born when the function runs and disappear when it finishes. Outside code cannot reach them.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Curly Braces",
          "title": "Block Scope (let & const)",
          "description": "Any pair of curly braces { } (like in an if statement or loop) creates a block. Modern let and const stay strictly locked inside.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Least Privilege Rule",
        "content": "Keep your variables as local as possible. Declare them inside the smallest function or block that needs them, rather than making everything global."
      }
    },
    "part3": {
      "title": "The One-Way Scope Chain Lookup",
      "intro": "Understanding how JavaScript searches for variables when running your code:",
      "points": [
        {
          "title": "1. Searching Outward Only",
          "content": "When code uses a variable, JavaScript checks the local block first. If it cannot find it, it steps outward to the parent function, and finally to the global scope. It NEVER searches inward into other blocks or functions."
        },
        {
          "title": "2. Variable Shadowing",
          "content": "If an inner block declares a variable with the exact same name as an outer variable, the inner variable temporarily shadows (hides) the outer one inside that block."
        },
        {
          "title": "3. ReferenceError When Looking Inward",
          "content": "If code outside an if block tries to read a variable declared inside that block, JavaScript cannot see it and throws a ReferenceError.",
          "codeSnippet": "const appName = \"LearnCraft\"; // Global scope\n\nfunction startSession() {\n  const userId = 42; // Function scope\n\n  if (true) {\n    const role = \"Admin\"; // Block scope\n    console.log(appName, userId, role); // Sees all three!\n  }\n  // console.log(role); // ❌ ReferenceError: role is not defined!\n}"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Scope",
      "bad": {
        "title": "❌ Broken: Trying to access block-scoped variables outside their curly braces",
        "code": "let isMember = true;\n\nif (isMember) {\n  const discount = 20; // Locked inside this if block!\n}\n\n// Trying to use discount outside the block:\nconsole.log(\"Your discount is:\", discount); // ❌ ReferenceError: discount is not defined!",
        "explanation": "Because discount was declared with const inside the if block's curly braces, it does not exist outside that block. Attempting to log it causes a ReferenceError crash."
      },
      "good": {
        "title": "✅ Clean: Declaring variables in the outer scope when they need to be shared",
        "code": "let isMember = true;\nlet discount = 0; // Declared in outer scope!\n\nif (isMember) {\n  discount = 20; // Updates the outer variable\n}\n\nconsole.log(\"Your discount is:\", discount + \"%\"); // ✅ 20%",
        "explanation": "If a value calculated inside a block needs to be used outside, declare the variable with let before the block, and update it inside."
      }
    },
    "part5": {
      "title": "Scope & Visibility Playground",
      "intro": "Test global, function, and block scope boundaries and observe what can and cannot be accessed:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-07: SCOPE & VISIBILITY\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Global variable (seen everywhere):\nconst globalGame = \"Space Quest\";\n\nfunction playRound() {\n  // 2. Function-scoped variable (seen only in playRound):\n  const roundScore = 50;\n  console.log(\"Playing:\", globalGame, \"| Score:\", roundScore);\n\n  if (roundScore >= 50) {\n    // 3. Block-scoped variable (seen only in this if block):\n    const bonusBadge = \"🌟 Gold Star\";\n    console.log(\"Achieved badge:\", bonusBadge);\n  }\n\n  // Un-commenting the next line would cause a ReferenceError:\n  // console.log(bonusBadge); // Error: bonusBadge is trapped in the if block!\n}\n\nplayRound();\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Create a function 'checkAge(age)'.\n// 2. Inside an if block (age >= 18), declare 'const canDrive = true;'.\n// 3. Print canDrive inside the if block.\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Where Variables Live",
      "takeaways": [
        {
          "title": "1. Block Scope with {}",
          "desc": "Variables created with let and const stay strictly inside their curly braces."
        },
        {
          "title": "2. Function Scope",
          "desc": "Variables inside a function are private to that function."
        },
        {
          "title": "3. The One-Way Lookup",
          "desc": "Inner scopes can look outward to find variables, but outer code cannot look inward."
        },
        {
          "title": "4. Keep Variables Local",
          "desc": "Declare variables only where they are needed to prevent accidental bugs."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-08: Closures: How Functions Remember Their Birthplace",
        "desc": "Now that you know how scope boundaries work, discover how functions can remember variables even after their outer function finishes."
      }
    },
    "part7": {
      "title": "Knowledge Check: Scope",
      "quiz": {
        "question": "Can code running outside an 'if' block access a variable declared with 'const' inside that block?",
        "options": [
          "Yes, const variables are always globally accessible.",
          "No, const and let are strictly block-scoped to their enclosing curly braces {}.",
          "Only if the condition evaluated to true.",
          "Only if the variable was a number."
        ],
        "correctIndex": 1,
        "explanation": "Variables declared with let and const are block-scoped and cannot be accessed outside the curly braces {} where they were created."
      }
    }
  },

  "js08-closures": {
    "slug": "js08-closures",
    "code": "JS-08",
    "title": "Closures: How Functions Remember Their Birthplace",
    "subtitle": "Discover how inner functions carry a backpack of variables from where they were created, even after the outer function has finished running.",
    "sections": [
      {
        "id": "part1",
        "label": "What Is a Closure?",
        "icon": "🎒",
        "tag": "CONCEPT"
      },
      {
        "id": "part2",
        "label": "The Backpack Model",
        "icon": "🧠",
        "tag": "MECHANICS"
      },
      {
        "id": "part3",
        "label": "Private Memory",
        "icon": "🛡️",
        "tag": "PRIVACY"
      },
      {
        "id": "part4",
        "label": "Common Misunderstandings",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Closures Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "Closures: Functions Carrying Their Variable Backpack",
      "bigPicture": "Normally, when a function finishes running, all of its local variables are wiped from memory. But when an inner function is created inside an outer function and returned, it remembers and holds onto the variables from where it was created. This superpower is called a closure: the inner function carries a 'backpack' of variables from its birthplace.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Born Inside, Used Outside",
          "desc": "A function created inside another function carries access to the outer function's variables."
        },
        {
          "title": "2. Persistent Private Memory",
          "desc": "The remembered variables stay alive in memory as long as the inner function is kept around."
        },
        {
          "title": "3. Independent Instances",
          "desc": "Calling the outer creator function multiple times creates fresh, separate backpacks."
        }
      ]
    },
    "part2": {
      "title": "How a Closure Works Under the Hood",
      "intro": "Understanding why closures preserve variables and keep them private:",
      "cards": [
        {
          "number": "01",
          "tag": "Definition",
          "title": "What is a Closure?",
          "description": "A closure happens when a function remembers variables from where it was created, even after the outer function has finished running.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Privacy",
          "title": "Private State",
          "description": "Variables inside the closure backpack cannot be modified directly from outside. They can only be read or changed by the inner function.",
          "color": "purple"
        },
        {
          "number": "03",
          "tag": "Factories",
          "title": "Function Factories",
          "description": "A function that configures and returns another customized function (like makeGreeter(\"Hello\") or createCounter()).",
          "color": "cyan"
        }
      ],
      "rule": {
        "title": "💡 The Closure Rule",
        "content": "Functions in JavaScript remember variables based on where they were written, not where or when they are executed later."
      }
    },
    "part3": {
      "title": "Step-by-Step Walkthrough: The Private Counter",
      "intro": "Following how a closure preserves a number across multiple function calls:",
      "points": [
        {
          "title": "1. Step-by-Step Counter Creation",
          "content": "function createCounter() { let count = 0; return function() { count++; return count; }; } When createCounter() runs, it sets count = 0 and returns the inner function. Even though createCounter() ends, the returned function keeps count in its backpack!"
        },
        {
          "title": "2. Completely Independent Backpacks",
          "content": "If you run const counterA = createCounter(); and const counterB = createCounter();, counterA and counterB each have their own private count. Calling counterA() does not affect counterB()!"
        },
        {
          "title": "3. Custom Greeter Factories",
          "content": "function makeGreeter(greeting) { return (name) => greeting + \", \" + name + \"!\"; } const sayHello = makeGreeter(\"Hello\"); Calling sayHello(\"Alex\") prints 'Hello, Alex!' because it remembered 'Hello'.",
          "codeSnippet": "function createCounter() {\n  let count = 0; // Private variable\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst myCounter = createCounter();\nconsole.log(myCounter()); // 1\nconsole.log(myCounter()); // 2"
        }
      ]
    },
    "part4": {
      "title": "Common Misunderstandings with Closures",
      "bad": {
        "title": "❌ Bad: Using exposed global variables that any code can accidentally overwrite",
        "code": "// Anyone in the script can accidentally modify or reset globalCount:\nlet globalCount = 0;\n\nfunction increment() {\n  globalCount++;\n}\n\n// Somewhere else in the code, a bug resets it:\nglobalCount = -999; // ❌ Ruined by accidental overwrite!",
        "explanation": "Relying on global variables means any part of your code can accidentally overwrite them or corrupt their state."
      },
      "good": {
        "title": "✅ Clean: Encapsulated private state protected inside a closure",
        "code": "function createSafeCounter() {\n  let count = 0; // Protected inside the closure\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst safeCounter = createSafeCounter();\nconsole.log(safeCounter()); // 1\nconsole.log(safeCounter()); // 2\n// Outside code CANNOT access or overwrite 'count' directly!",
        "explanation": "The count variable is completely inaccessible from the outside world. It can only be updated through the safe returned function."
      }
    },
    "part5": {
      "title": "Closures Playground",
      "intro": "Run the code below to see private counters and custom greeter closures in action:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-08: CLOSURES & PRIVATE STATE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Private Counter Closure:\nfunction createCounter(label) {\n  let count = 0; // Private variable trapped in the closure\n\n  return function() {\n    count++;\n    return label + \": \" + count;\n  };\n}\n\nconst clicks = createCounter(\"Button Clicks\");\nconst views = createCounter(\"Page Views\");\n\nconsole.log(clicks()); // Button Clicks: 1\nconsole.log(clicks()); // Button Clicks: 2\nconsole.log(views());  // Page Views: 1 (independent!)\nconsole.log(clicks()); // Button Clicks: 3\n\n// 2. Custom Greeter Factory:\nfunction makeGreeter(greeting) {\n  return function(name) {\n    return greeting + \", \" + name + \"!\";\n  };\n}\n\nconst sayWelcome = makeGreeter(\"Welcome\");\nconsole.log(sayWelcome(\"Alex\"));\nconsole.log(sayWelcome(\"Emma\"));\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Create a function 'makeMultiplier(factor)'.\n// 2. Inside, return a function that takes 'number' and returns number * factor.\n// 3. Test it by creating 'const triple = makeMultiplier(3);' and logging triple(5).\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: How Functions Remember",
      "takeaways": [
        {
          "title": "1. What a Closure Is",
          "desc": "A function that remembers variables from where it was created, even after the outer function ends."
        },
        {
          "title": "2. Private Memory",
          "desc": "Variables inside the closure cannot be changed directly by outside code."
        },
        {
          "title": "3. Separate Instances",
          "desc": "Each time you call the outer function, a brand-new independent closure is born."
        },
        {
          "title": "4. Next: Callbacks",
          "desc": "In JS-09, we learn how to pass functions into other functions as data values."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-09: Callbacks & Higher-Order Functions: Functions as Data",
        "desc": "Now that you understand functions and closures, learn how to pass functions to other functions as data."
      }
    },
    "part7": {
      "title": "Knowledge Check: Closures",
      "quiz": {
        "question": "What is a Closure in JavaScript?",
        "options": [
          "A command used to close a browser tab.",
          "A function that remembers variables from where it was created, even after the outer function has finished running.",
          "A syntax error caused by forgetting a closing bracket.",
          "A method that converts a number into text."
        ],
        "correctIndex": 1,
        "explanation": "A closure happens when an inner function remembers the variables from the scope where it was created, even after the outer function has finished running."
      }
    }
  },

  "js09-callbacks-and-higher-order-functions": {
    "slug": "js09-callbacks-and-higher-order-functions",
    "code": "JS-09",
    "title": "Callbacks & Higher-Order Functions: Functions as Data",
    "subtitle": "Treat functions as values: pass callback functions into other functions and manufacture custom functions dynamically.",
    "sections": [
      {
        "id": "part1",
        "label": "Functions as Values",
        "icon": "🧩",
        "tag": "FIRST-CLASS"
      },
      {
        "id": "part2",
        "label": "What Is a Callback?",
        "icon": "📞",
        "tag": "CALLBACKS"
      },
      {
        "id": "part3",
        "label": "Higher-Order Functions",
        "icon": "⚡",
        "tag": "COMPOSITION"
      },
      {
        "id": "part4",
        "label": "Passing vs Calling",
        "icon": "⚠️",
        "tag": "TRAPS"
      },
      {
        "id": "part5",
        "label": "Callbacks Playground",
        "icon": "💻",
        "tag": "PRACTICE"
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
      "title": "First-Class Functions: Treating Functions as Values",
      "bigPicture": "In JavaScript, functions are first-class citizens. That simply means functions can be treated just like any other value: you can assign a function to a variable, pass a function into another function as an argument, and return a function from a function.",
      "breakdownTitle": "What You Will Learn in This Lesson:",
      "breakdownItems": [
        {
          "title": "1. Functions as Values",
          "desc": "Functions can be stored in variables and handed to other functions."
        },
        {
          "title": "2. Callback Functions",
          "desc": "A function you pass into another function to be 'called back' when needed."
        },
        {
          "title": "3. Higher-Order Functions",
          "desc": "A function that accepts another function as an input, or returns a new function."
        }
      ]
    },
    "part2": {
      "title": "What a Callback Function Is",
      "intro": "When you hand a function to another function to do a specific job, it is called a callback:",
      "cards": [
        {
          "number": "01",
          "tag": "Value",
          "title": "Functions in Variables",
          "description": "const sayHi = () => console.log(\"Hi!\"); — functions can be stored in variables just like numbers or text.",
          "color": "emerald"
        },
        {
          "number": "02",
          "tag": "Input",
          "title": "Callback Functions",
          "description": "A function passed as an argument into another function. The receiving function calls it at the right moment.",
          "color": "cyan"
        },
        {
          "number": "03",
          "tag": "Manager",
          "title": "Higher-Order Functions",
          "description": "Any function that takes a callback as a parameter or returns a function. It manages the general flow while the callback supplies the custom action.",
          "color": "purple"
        }
      ],
      "rule": {
        "title": "💡 The Callback Execution Rule",
        "content": "When passing a function as a callback, pass its name WITHOUT parentheses (myCallback). Adding parentheses (myCallback()) calls the function immediately instead of waiting."
      }
    },
    "part3": {
      "title": "Higher-Order Functions in Action",
      "intro": "How higher-order functions use callbacks to build flexible, reusable tools:",
      "points": [
        {
          "title": "1. The Universal Calculator",
          "content": "function calculate(a, b, operation) { return operation(a, b); } calculate does not care whether you add, multiply, or subtract. You pass the specific operation callback to tell it what to do!"
        },
        {
          "title": "2. Anonymous Inline Callbacks",
          "content": "Instead of naming every callback beforehand, you can pass an arrow function directly: calculate(10, 5, (x, y) => x - y); This is the exact pattern used across all modern JavaScript code."
        },
        {
          "title": "3. Repeating Actions with Callbacks",
          "content": "function repeat(times, action) { for (let i = 1; i <= times; i++) action(i); } You build a reusable repeater, and caller callbacks specify what action happens on each step.",
          "codeSnippet": "function calculate(a, b, operation) {\n  return operation(a, b);\n}\n\nconst add = (x, y) => x + y;\nconst multiply = (x, y) => x * y;\n\nconsole.log(calculate(4, 5, add));      // 9\nconsole.log(calculate(4, 5, multiply)); // 20"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Callbacks",
      "bad": {
        "title": "❌ Broken: Calling the callback immediately by accidentally adding parentheses ()",
        "code": "function runWithGreeting(name, callback) {\n  return callback(name);\n}\n\nfunction formatName(n) {\n  return \"*** \" + n + \" ***\";\n}\n\n// Mistake: accidentally adding (name) when passing the callback:\n// runWithGreeting(\"Alex\", formatName(\"Alex\"));\n// ❌ TypeError: callback is not a function! (because formatName(\"Alex\") ran immediately and passed a string!)",
        "explanation": "Adding parentheses immediately invokes the function and passes its return value instead of passing the function itself."
      },
      "good": {
        "title": "✅ Clean: Passing the function reference without parentheses",
        "code": "function runWithGreeting(name, callback) {\n  return callback(name); // ✅ Higher-order function invokes it here\n}\n\nfunction formatName(n) {\n  return \"*** \" + n + \" ***\";\n}\n\n// Pass the function name without ()\nconst result = runWithGreeting(\"Alex\", formatName);\nconsole.log(result); // \"*** Alex ***\"",
        "explanation": "Passing formatName without parentheses allows runWithGreeting to receive the function and call it at the right time."
      }
    },
    "part5": {
      "title": "Callbacks & Higher-Order Functions Playground",
      "intro": "Experiment with passing functions as arguments and executing custom operations:",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-09: CALLBACKS & HIGHER-ORDER FUNCTIONS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Higher-order function that accepts an operation callback:\nfunction calculate(a, b, operation) {\n  return operation(a, b);\n}\n\n// Named callbacks:\nconst add = (x, y) => x + y;\nconst multiply = (x, y) => x * y;\n\nconsole.log(\"10 + 5 =\", calculate(10, 5, add));\nconsole.log(\"10 * 5 =\", calculate(10, 5, multiply));\n\n// 2. Anonymous inline callback:\nconsole.log(\"10 - 5 =\", calculate(10, 5, (x, y) => x - y));\n\n// 3. Action repeater higher-order function:\nfunction repeatAction(times, action) {\n  for (let i = 1; i <= times; i++) {\n    action(i);\n  }\n}\n\nconsole.log(\"\\n--- Running Action Repeater ---\\n\");\nrepeatAction(3, (step) => {\n  console.log(\"Step #\" + step + \": Processing item...\");\n});\n\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// YOUR TURN:\n// 1. Use calculate(20, 4, callback) to divide 20 by 4 using an arrow function callback.\n// 2. Print the result.\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    },
    "part6": {
      "title": "Key Takeaways: Functions as Data",
      "takeaways": [
        {
          "title": "1. Functions are Values",
          "desc": "You can store functions in variables, pass them as arguments, and return them."
        },
        {
          "title": "2. Callbacks are Input Functions",
          "desc": "A callback is a function passed to another function to be executed."
        },
        {
          "title": "3. Pass Without ()",
          "desc": "Pass the function name without parentheses so the receiving function can run it."
        },
        {
          "title": "4. Prepares You for Arrays",
          "desc": "In JS-10 and JS-11, you will use callbacks to power array methods like map and filter."
        }
      ],
      "nextLessonPreview": {
        "title": "JS-10: Arrays & Indexing: Managing Ordered Lists",
        "desc": "Now that you understand functions and callbacks, learn how to store lists of data with arrays and access items by index."
      }
    },
    "part7": {
      "title": "Knowledge Check: Functions as Data",
      "quiz": {
        "question": "What is a 'Higher-Order Function' in JavaScript?",
        "options": [
          "A function that runs faster than normal functions.",
          "A function that accepts another function as an argument, or returns a function.",
          "A function that contains more than 10 lines of code.",
          "A function that can only be called from inside a loop."
        ],
        "correctIndex": 1,
        "explanation": "A Higher-Order Function is any function that accepts one or more functions as arguments, or returns a function as its result."
      }
    }
  },

  "js10-arrays-and-indexing": {
  "slug": "js10-arrays-and-indexing",
  "code": "JS-10",
  "title": "Arrays & Indexing: Managing Ordered Lists",
  "subtitle": "Store ordered collections of data, access elements with zero-based indexing, read array length, and add or remove items using push, pop, and slice.",
  "sections": [
    {
      "id": "part1",
      "label": "Ordered Lists",
      "icon": "📋",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Zero-Based Indices",
      "icon": "🔢",
      "tag": "OPERATIONS"
    },
    {
      "id": "part3",
      "label": "Reading & Slicing",
      "icon": "✂️",
      "tag": "MANIPULATION"
    },
    {
      "id": "part4",
      "label": "Off-by-One Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Arrays Playground",
      "icon": "💻",
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
    "title": "Why Arrays Matter: Storing Ordered Lists Under One Name",
    "bigPicture": "Imagine organizing a playlist of your favorite songs or a grocery shopping list. Without arrays, you would need separate variables like song1, song2, and song3—which becomes unmanageable the moment your list grows or changes! An array is a single container that holds an ordered list of items, keeping them in the exact order you put them in.",
    "breakdownTitle": "Core Concepts of JavaScript Arrays:",
    "breakdownItems": [
      {
        "title": "The Square Bracket Container",
        "desc": "Create an array by wrapping items in square brackets separated by commas: const fruits = ['apple', 'banana', 'orange']."
      },
      {
        "title": "Zero-Based Indexing",
        "desc": "JavaScript numbers array slots starting from 0. The first item is at index [0], the second at [1], and so on."
      },
      {
        "title": "The .length Property",
        "desc": "JavaScript automatically tracks the total number of items with .length, keeping your counts up to date as items are added or removed."
      }
    ]
  },
  "part2": {
    "title": "Zero-Based Indices & Adding/Removing Elements",
    "intro": "Understanding how indices count distance from the start, and modifying array ends with push and pop:",
    "cards": [
      {
        "number": "01",
        "tag": "Index",
        "title": "Zero-Based Index [0]",
        "description": "Think of an index as the distance or steps from the starting line. The very first item has 0 distance from the start, so it sits at index [0].",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Add & Remove",
        "title": "push() & pop()",
        "description": "Use .push(item) to append an item to the end of the array. Use .pop() to remove and return the last item from the array.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Count",
        "title": "The .length Property",
        "description": "array.length gives the total count of items. Because counting starts at 0, the last item is always at index array.length - 1.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Array Length",
      "content": "An array's total length is always 1 greater than its highest index! If an array has 3 items, its valid indices are 0, 1, and 2. Reading array[3] returns undefined because slot 3 does not exist."
    }
  },
  "part3": {
    "title": "Reading, Updating & Safe Extraction with slice()",
    "intro": "Working with elements directly, modifying values in place, and extracting non-destructive slices:",
    "points": [
      {
        "title": "1. Reading and Updating by Index",
        "content": "Access an item using square brackets: const first = fruits[0]. You can replace an existing item by assigning to its index: fruits[1] = 'blueberry'."
      },
      {
        "title": "2. Safe Copying with slice(start, end)",
        "content": "Use array.slice(start, end) to grab a portion of your array without modifying the original. The start index is included, but the end index is excluded."
      },
      {
        "title": "3. Out-of-Bounds Returns undefined",
        "content": "If you try to read an index that doesn't exist (like fruits[99]), JavaScript doesn't crash your application—it safely returns undefined."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Off-by-One Bugs and Bracket Confusion",
    "bad": {
      "title": "❌ Bad: Reading array[array.length] or using parentheses",
      "code": "const colors = [\"red\", \"green\", \"blue\"];\n\n// Bug 1: Off-by-one! colors has 3 items, so colors[3] is undefined!\nconst lastColor = colors[colors.length];\nconsole.log(lastColor); // undefined!\n\n// Bug 2: Using parentheses instead of square brackets:\n// const first = colors(0); // TypeError: colors is not a function!",
      "explanation": "Because indices start at 0, an array with 3 items has slots 0, 1, and 2. colors[colors.length] searches for slot 3, which does not exist."
    },
    "good": {
      "title": "✅ Clean: Safe last item access and non-destructive slicing",
      "code": "const colors = [\"red\", \"green\", \"blue\"];\n\n// Safe last item access: length - 1\nconst lastColor = colors[colors.length - 1];\nconsole.log(\"Last color:\", lastColor); // \"blue\"\n\n// Safe copy of the first two colors:\nconst topColors = colors.slice(0, 2);\nconsole.log(\"Top colors:\", topColors); // [\"red\", \"green\"]\nconsole.log(\"Original colors untouched:\", colors); // [\"red\", \"green\", \"blue\"]",
      "explanation": "Using colors[colors.length - 1] reliably grabs the last element. Using .slice(0, 2) makes a fresh copy without modifying the original array."
    }
  },
  "part5": {
    "title": "Interactive Arrays Playground",
    "intro": "Create a movie watchlist, inspect its length, access items by index, push and pop, and copy a slice:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-10: ARRAYS & INDEXING PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Create an array of movies:\nconst watchlist = [\"Inception\", \"Interstellar\", \"The Matrix\"];\n\nconsole.log(\"Total movies in list:\", watchlist.length);\nconsole.log(\"First movie [0]:\", watchlist[0]);\nconsole.log(\"Second movie [1]:\", watchlist[1]);\nconsole.log(\"Last movie [length - 1]:\", watchlist[watchlist.length - 1]);\n\n// 2. Add a new movie to the end:\nwatchlist.push(\"Spirited Away\");\nconsole.log(\"After push:\", watchlist);\nconsole.log(\"New length:\", watchlist.length);\n\n// 3. Remove the last movie:\nconst removedMovie = watchlist.pop();\nconsole.log(\"Popped movie:\", removedMovie);\nconsole.log(\"After pop:\", watchlist);\n\n// 4. Update an item in place:\nwatchlist[0] = \"Inception (Extended)\";\nconsole.log(\"Updated first movie:\", watchlist[0]);\n\n// 5. Extract a safe slice (first 2 movies) without touching original:\nconst weekendPicks = watchlist.slice(0, 2);\nconsole.log(\"Weekend picks:\", weekendPicks);\nconsole.log(\"Original watchlist is intact:\", watchlist);\n"
  },
  "part6": {
    "title": "Key Takeaways: Arrays & Indexing",
    "takeaways": [
      {
        "title": "1. Square Brackets for Lists",
        "desc": "Arrays group multiple values into an ordered list using square brackets []."
      },
      {
        "title": "2. Zero-Based Indexing",
        "desc": "First item is at index 0, second is at 1, and the last item is at array.length - 1."
      },
      {
        "title": "3. push & pop at the End",
        "desc": "Use .push(item) to append to the end, and .pop() to remove and retrieve the last item."
      },
      {
        "title": "4. Non-Destructive Slicing",
        "desc": "Use .slice(start, end) to copy a portion of the array without altering the original list."
      },
      {
        "title": "5. Next Step: Array Methods",
        "desc": "In JS-11, we learn powerful declarative methods: map, filter, find, and reduce!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-11: Essential Array Methods: map, filter, find & reduce",
      "desc": "Transform lists with map, keep matching items with filter, locate single items with find, and calculate totals with reduce."
    }
  },
  "part7": {
    "title": "Knowledge Check: Arrays & Indexing",
    "quiz": {
      "question": "What is the index of the first item in any JavaScript array?",
      "options": [
        "1",
        "0",
        "-1",
        "It depends on the array length"
      ],
      "correctIndex": 1,
      "explanation": "JavaScript arrays are zero-indexed. The very first item is always located at index 0."
    }
  }
},

  "js11-essential-array-methods": {
  "slug": "js11-essential-array-methods",
  "code": "JS-11",
  "title": "Essential Array Methods: map, filter, find & reduce",
  "subtitle": "Transform lists with map, keep matching items with filter, locate single items with find, and calculate totals with reduce.",
  "sections": [
    {
      "id": "part1",
      "label": "Declarative Lists",
      "icon": "✨",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "The Core Four",
      "icon": "🛠️",
      "tag": "METHODS"
    },
    {
      "id": "part3",
      "label": "Callbacks & Pipelines",
      "icon": "🔗",
      "tag": "PIPELINES"
    },
    {
      "id": "part4",
      "label": "Callback Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Methods Playground",
      "icon": "💻",
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
    "title": "Declarative Arrays: Letting Methods Do the Heavy Lifting",
    "bigPicture": "In JS-09, you learned how to pass functions into other functions as callbacks. Now, array methods are where that superpower shines! In the past, developers had to write repetitive for-loops with index counters (let i = 0) just to double numbers or filter out unpaid orders. Modern JavaScript gives us expressive array methods: you provide a short callback function describing what to do with each item, and JavaScript handles the looping automatically.",
    "breakdownTitle": "The Big Four Methods at a Glance:",
    "breakdownItems": [
      {
        "title": "map() — Transform Every Item",
        "desc": "Transforms each element into something new and returns a brand-new array of equal length."
      },
      {
        "title": "filter() — Keep What Matches",
        "desc": "Tests each item against a condition and returns a new array with only the items that passed the test."
      },
      {
        "title": "find() & reduce() — Lookup and Aggregate",
        "desc": "find() returns the first matching item directly; reduce() accumulates all items into a single final value like a total price."
      }
    ]
  },
  "part2": {
    "title": "The Big Four: How map, filter, find & reduce Work",
    "intro": "Understanding the exact inputs and outputs of each core method:",
    "cards": [
      {
        "number": "01",
        "tag": "Transform",
        "title": "map(item => newItem)",
        "description": "Runs your callback on every item and builds a new array of the exact same length. Original array is untouched.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Selection",
        "title": "filter(item => boolean)",
        "description": "Keeps only items where your callback returns true. Returns a new array with 0 up to N items.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Aggregation",
        "title": "find() & reduce()",
        "description": "find() returns the first matching item directly. reduce((acc, curr) => ..., initial) rolls all items into a single result.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Array Methods",
      "content": "Methods like map and filter NEVER change the original array—they always produce a brand-new array! Always make sure your callback returns the new value inside map, and returns a boolean inside filter."
    }
  },
  "part3": {
    "title": "Understanding reduce() and Method Chaining",
    "intro": "How the accumulator works in reduce(), and how chaining methods creates clean data pipelines:",
    "points": [
      {
        "title": "1. The reduce() Accumulator",
        "content": "In reduce((accumulator, current) => accumulator + current, 0), the accumulator is your running tally (like a cash register) and 0 is the starting value. Each step updates the running tally."
      },
      {
        "title": "2. find() vs filter()",
        "content": "find() stops the moment it finds the first match and returns that single element (or undefined). filter() always checks every single item and returns an array."
      },
      {
        "title": "3. Clean Method Chaining",
        "content": "Because filter and map return arrays, you can chain them: products.filter(p => p.inStock).map(p => p.name). Filter first so map has fewer items to process!"
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Missing return in Curly-Braced Callbacks",
    "bad": {
      "title": "❌ Bad: Forgetting to return inside curly braces, or manual loops",
      "code": "const prices = [10, 20, 30];\n\n// Bug: Opening curly braces without writing 'return'!\nconst discounted = prices.map(price => {\n  price * 0.9; // Missing return!\n});\nconsole.log(discounted); // [undefined, undefined, undefined]!",
      "explanation": "In arrow functions, if you add curly braces {}, you MUST write an explicit return statement. Otherwise, the callback returns undefined for every item!"
    },
    "good": {
      "title": "✅ Clean: Concise implicit return or explicit return statement",
      "code": "const prices = [10, 20, 30];\n\n// Clean 1-line arrow function (implicit return):\nconst discounted = prices.map(price => price * 0.9);\nconsole.log(\"Discounted prices:\", discounted); // [9, 18, 27]\n\n// Explicit return when multi-line logic is needed:\nconst formatted = prices.map(price => {\n  const finalPrice = price * 0.9;\n  return \"$\" + finalPrice.toFixed(2);\n});\nconsole.log(\"Formatted:\", formatted); // [\"$9.00\", \"$18.00\", \"$27.00\"]",
      "explanation": "1-line arrow functions automatically return the expression. When using curly braces, explicitly writing return ensures your transformed values are kept."
    }
  },
  "part5": {
    "title": "Array Methods Playground",
    "intro": "Filter available products, format their display names with map, locate a product with find, and calculate cart total with reduce:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-11: ESSENTIAL ARRAY METHODS PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst inventory = [\n  { id: 1, name: \"Mechanical Keyboard\", price: 120, inStock: true },\n  { id: 2, name: \"Wireless Mouse\", price: 45, inStock: false },\n  { id: 3, name: \"USB-C Monitor\", price: 280, inStock: true },\n  { id: 4, name: \"Desk Pad\", price: 20, inStock: true }\n];\n\n// 1. filter(): Keep only items that are in stock\nconst availableItems = inventory.filter(item => item.inStock);\nconsole.log(\"In-stock items count:\", availableItems.length);\n\n// 2. map(): Format available items into readable strings\nconst productTags = availableItems.map(item => item.name + \" ($\" + item.price + \")\");\nconsole.log(\"Product tags:\", productTags);\n\n// 3. find(): Locate a specific item by its ID\nconst mouse = inventory.find(item => item.id === 2);\nconsole.log(\"Found item by ID 2:\", mouse.name, \"| inStock:\", mouse.inStock);\n\n// 4. reduce(): Calculate the total value of all in-stock inventory\nconst totalValue = availableItems.reduce((runningTotal, item) => {\n  return runningTotal + item.price;\n}, 0);\n\nconsole.log(\"Total value of available stock: $\" + totalValue);\n\n// 5. Method Chaining: Filter items under $100 and get just their uppercase names\nconst budgetNames = inventory\n  .filter(item => item.price < 100)\n  .map(item => item.name.toUpperCase());\n\nconsole.log(\"Budget item names:\", budgetNames);\n"
  },
  "part6": {
    "title": "Key Takeaways: Essential Array Methods",
    "takeaways": [
      {
        "title": "1. map for 1-to-1 Transformations",
        "desc": "Transforms each item into something new, returning an array of the same length."
      },
      {
        "title": "2. filter for Selection",
        "desc": "Returns a new array containing only elements that pass your true/false test."
      },
      {
        "title": "3. find for Single Match",
        "desc": "Returns the first matching item directly, or undefined if no item matches."
      },
      {
        "title": "4. reduce for Aggregation",
        "desc": "Folds all elements into a single value, such as a sum or count. Always provide an initial value!"
      },
      {
        "title": "5. Next Step: Objects & Methods",
        "desc": "In JS-12, we learn how to model real-world entities using key-value pairs and object methods!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-12: Objects & Methods: Key-Value Pairs & Behaviors",
      "desc": "Model real-world entities using labeled key-value pairs, understand dot vs bracket notation, and attach reusable methods."
    }
  },
  "part7": {
    "title": "Knowledge Check: Array Methods",
    "quiz": {
      "question": "What is the primary difference between .find() and .filter()?",
      "options": [
        ".find() returns the first matching item directly (or undefined), while .filter() returns an array of all matching items",
        ".find() changes the original array, but .filter() does not",
        ".filter() can only be used on numbers, while .find() works on any data",
        "There is no difference; .find() is an alias for .filter()"
      ],
      "correctIndex": 0,
      "explanation": ".find() stops evaluating as soon as it encounters the first matching element and returns that element directly. .filter() checks every item and returns an array containing all matches."
    }
  }
},

  "js12-objects-and-methods": {
  "slug": "js12-objects-and-methods",
  "code": "JS-12",
  "title": "Objects & Methods: Key-Value Pairs & Behaviors",
  "subtitle": "Model real-world entities using labeled key-value pairs, understand dot vs bracket notation, and attach reusable methods.",
  "sections": [
    {
      "id": "part1",
      "label": "Key-Value Pairs",
      "icon": "🗂️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Dot vs Bracket",
      "icon": "🔍",
      "tag": "NOTATION"
    },
    {
      "id": "part3",
      "label": "Methods & this",
      "icon": "⚙️",
      "tag": "METHODS"
    },
    {
      "id": "part4",
      "label": "Dynamic Key Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Objects Playground",
      "icon": "💻",
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
    "title": "Why Objects Matter: Modeling Real-World Data with Labels",
    "bigPicture": "Arrays are great for ordered lists of similar items, like a list of high scores: [90, 85, 92]. But what if you need to describe a user or a product? Storing a user as ['Alex', 28, 'alex@test.com', true] is confusing because slot 0 is a name, slot 1 is an age, and slot 3 is a status, but none of them have labels! An object solves this by attaching a descriptive name (a key) to every value. Together, they are called key-value pairs.",
    "breakdownTitle": "Core Concepts of JavaScript Objects:",
    "breakdownItems": [
      {
        "title": "The Object Literal {}",
        "desc": "Curly braces create an object. You write labeled properties as key: value pairs separated by commas."
      },
      {
        "title": "Dot Notation (user.name)",
        "desc": "The cleanest and most common way to read or change a property when you know the key name ahead of time."
      },
      {
        "title": "Bracket Notation (user['name'])",
        "desc": "Required when property names are stored inside variables or contain spaces or special characters."
      }
    ]
  },
  "part2": {
    "title": "Reading & Updating Properties: Dot vs Bracket Notation",
    "intro": "When to use standard dot notation and when bracket notation is required:",
    "cards": [
      {
        "number": "01",
        "tag": "Standard",
        "title": "Dot Notation (obj.prop)",
        "description": "Clean and standard for everyday property access when the property name is a known, valid identifier.",
        "color": "cyan"
      },
      {
        "number": "02",
        "tag": "Dynamic",
        "title": "Bracket Notation (obj[key])",
        "description": "Required when the key is stored in a variable (user[field]) or has spaces or hyphens (user['postal-code']).",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Behavior",
        "title": "Object Methods",
        "description": "Functions stored as properties inside an object. They allow objects to perform actions using their own data.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Property Access",
      "content": "Always use dot notation by default! Switch to bracket notation only when the key name comes from a variable (e.g. user[dynamicKey]) or contains hyphens or spaces."
    }
  },
  "part3": {
    "title": "Object Methods, the this Keyword & Built-in Helpers",
    "intro": "Giving objects behaviors with methods, referencing properties with this, and inspecting keys:",
    "points": [
      {
        "title": "1. The this Keyword in Methods",
        "content": "When an object method runs, this points to the object that owns the method. Inside user.greet(), this.name reads the name property from that user."
      },
      {
        "title": "2. Adding and Updating Properties on const Objects",
        "content": "Declaring an object with const prevents reassigning the variable to a different object, but the properties inside can still be updated freely: user.age = 29."
      },
      {
        "title": "3. Object.keys() and Object.values()",
        "content": "Use Object.keys(obj) to get an array of all property names, and Object.values(obj) to get an array of all property values."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Using Dot Notation with Variables",
    "bad": {
      "title": "❌ Bad: Using dot notation when the property name is in a variable",
      "code": "const user = { name: \"Alice\", email: \"alice@example.com\" };\n\nconst propertyToRead = \"email\";\n\n// Bug: Searches for a property literally named \"propertyToRead\"!\nconsole.log(user.propertyToRead); // undefined!",
      "explanation": "Dot notation (user.propertyToRead) looks for the literal word 'propertyToRead' on the object. Because that property does not exist, it evaluates to undefined."
    },
    "good": {
      "title": "✅ Clean: Evaluating dynamic variable keys with square brackets",
      "code": "const user = { name: \"Alice\", email: \"alice@example.com\" };\n\nconst propertyToRead = \"email\";\n\n// Square brackets evaluate the variable's value (\"email\"):\nconsole.log(user[propertyToRead]); // \"alice@example.com\"\n\n// Also works for keys with hyphens or spaces:\nuser[\"account-status\"] = \"ACTIVE\";\nconsole.log(user[\"account-status\"]); // \"ACTIVE\"",
      "explanation": "Bracket notation evaluates the variable inside the brackets first, correctly looking up user['email']."
    }
  },
  "part5": {
    "title": "Objects & Methods Playground",
    "intro": "Build a game character profile with stats, access properties dynamically, call a method with this, and inspect keys:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-12: OBJECTS & METHODS PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst player = {\n  username: \"PixelKnight\",\n  level: 1,\n  hp: 100,\n  skills: [\"Slash\", \"Shield Block\"],\n\n  // Method that uses 'this' to access its own properties:\n  levelUp() {\n    this.level += 1;\n    this.hp += 20;\n    return this.username + \" reached Level \" + this.level + \"! HP is now \" + this.hp;\n  }\n};\n\n// 1. Read properties with dot notation:\nconsole.log(\"Player name:\", player.username);\nconsole.log(\"Current level:\", player.level);\nconsole.log(\"First skill:\", player.skills[0]);\n\n// 2. Read properties dynamically with bracket notation:\nconst statToQuery = \"hp\";\nconsole.log(\"Queried stat (\" + statToQuery + \"):\", player[statToQuery]);\n\n// 3. Call the method:\nconsole.log(player.levelUp());\nconsole.log(\"Updated level:\", player.level);\n\n// 4. Add a new property:\nplayer.guild = \"DragonSlayers\";\nconsole.log(\"Joined guild:\", player.guild);\n\n// 5. Inspect keys and values using built-in Object utilities:\nconsole.log(\"Object keys:\", Object.keys(player));\nconsole.log(\"Total property count:\", Object.keys(player).length);\n"
  },
  "part6": {
    "title": "Key Takeaways: Objects & Methods",
    "takeaways": [
      {
        "title": "1. Labeled Data with {}",
        "desc": "Objects group related information into labeled key-value pairs using curly braces."
      },
      {
        "title": "2. Dot for Known, Bracket for Dynamic",
        "desc": "Use dot notation obj.key by default; use brackets obj[variable] for dynamic keys."
      },
      {
        "title": "3. Methods and this",
        "desc": "Methods are functions stored on objects. Inside a method, this refers to the object itself."
      },
      {
        "title": "4. const Objects are Mutable",
        "desc": "const locks the variable reference, but you can freely add, update, and delete properties inside."
      },
      {
        "title": "5. Next Step: Object References",
        "desc": "In JS-13, we learn how objects live in memory and why copying them requires special care!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-13: Object References & Copying: References, Shallow vs Deep Cloning",
      "desc": "Understand how objects live in memory, why copying variables creates shared references, and how to safely clone objects with spread and structuredClone."
    }
  },
  "part7": {
    "title": "Knowledge Check: Objects & Methods",
    "quiz": {
      "question": "When MUST you use bracket notation (obj[key]) instead of dot notation (obj.key)?",
      "options": [
        "When the property name is stored inside a variable or contains spaces/hyphens",
        "Only when the object contains more than 10 properties",
        "Whenever you want to call an object method",
        "Bracket notation is obsolete; dot notation is always required"
      ],
      "correctIndex": 0,
      "explanation": "Bracket notation is required when the key name is stored inside a variable or contains characters that aren't valid in JavaScript identifiers (like hyphens or spaces)."
    }
  }
},

  "js13-object-references-and-copying": {
  "slug": "js13-object-references-and-copying",
  "code": "JS-13",
  "title": "Object References & Copying: References, Shallow vs Deep Cloning",
  "subtitle": "Understand how objects live in memory, why copying variables creates shared references, and how to safely clone objects with spread and structuredClone.",
  "sections": [
    {
      "id": "part1",
      "label": "Values vs Pointers",
      "icon": "📍",
      "tag": "MEMORY"
    },
    {
      "id": "part2",
      "label": "The Reference Trap",
      "icon": "🔗",
      "tag": "REFERENCES"
    },
    {
      "id": "part3",
      "label": "Shallow vs Deep",
      "icon": "🧬",
      "tag": "CLONING"
    },
    {
      "id": "part4",
      "label": "Mutation Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Cloning Playground",
      "icon": "💻",
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
    "title": "Values vs Memory References: How JavaScript Stores Data",
    "bigPicture": "In JavaScript, primitive values (numbers, strings, booleans) and objects behave completely differently when you copy them. Primitives are copied by value—like printing a second copy of a document on paper. If you write notes on your paper copy, your friend's paper copy doesn't change. But objects are stored in memory and copied by reference—like sharing a Google Docs link. If you give someone the link and they edit the document, you see the edits immediately because you are both looking at the exact same document!",
    "breakdownTitle": "Core Concepts of Object Memory:",
    "breakdownItems": [
      {
        "title": "Primitives Copy by Value",
        "desc": "let a = 5; let b = a; b = 10; leaves a untouched at 5. Primitives are completely independent copies."
      },
      {
        "title": "Objects Copy by Reference",
        "desc": "const b = a does NOT copy an object. It simply creates a second variable pointing to the exact same object in memory."
      },
      {
        "title": "Object Equality with ===",
        "desc": "Two objects are only === if they point to the exact same memory address. Even if two separate objects have identical properties ({ score: 10 } === { score: 10 }), the result is false!"
      }
    ]
  },
  "part2": {
    "title": "The Shared Reference Trap & Safe Cloning Techniques",
    "intro": "Why assigning variables shares memory, and how to make safe shallow and deep copies:",
    "cards": [
      {
        "number": "01",
        "tag": "Trap",
        "title": "Shared Reference (b = a)",
        "description": "Both variables point to the same memory box. Changing a property on b will silently modify a as well!",
        "color": "rose"
      },
      {
        "number": "02",
        "tag": "Shallow",
        "title": "Shallow Copy ({ ...obj })",
        "description": "Copies the top-level properties into a new object. Perfect for flat objects with no nested objects or arrays.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Deep",
        "title": "Deep Clone (structuredClone)",
        "description": "Standard modern function that recursively clones every nested layer into independent memory.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Object Copying",
      "content": "Never assume that const b = a creates a new copy of an object! If you need an independent copy, use shallow spread { ...a } for flat objects, or structuredClone(a) when the object has nested objects or arrays."
    }
  },
  "part3": {
    "title": "Shallow Copy Limits vs Modern structuredClone()",
    "intro": "Understanding where shallow copying falls short and when deep cloning is necessary:",
    "points": [
      {
        "title": "1. The Shallow Copy Limitation",
        "content": "Spread { ...user } creates a new outer object. However, if user has a nested object (like address: { city: 'Tokyo' }), the address property in both copies still points to the same inner address object!"
      },
      {
        "title": "2. Native structuredClone() for Deep Copies",
        "content": "Modern JavaScript provides structuredClone(original) as a native global function. It makes a complete deep clone of nested objects and arrays without third-party libraries."
      },
      {
        "title": "3. Object Comparison Gotcha",
        "content": "Checking { name: 'Sam' } === { name: 'Sam' } evaluates to false because each curly-brace literal creates a brand-new, distinct object in memory."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Accidental Mutation via Shared Pointers",
    "bad": {
      "title": "❌ Bad: Modifying an object through a shared reference",
      "code": "const originalUser = { name: \"Sarah\", role: \"Viewer\" };\n\n// Bug: Not a copy! Both variables point to the same object in memory!\nconst updatedUser = originalUser;\nupdatedUser.role = \"Admin\";\n\n// Original user was accidentally changed!\nconsole.log(\"Original role:\", originalUser.role); // \"Admin\" (Security bug!)",
      "explanation": "Assigning updatedUser = originalUser does not duplicate the object. Modifying updatedUser.role mutates the original object."
    },
    "good": {
      "title": "✅ Clean: Safe shallow copy with property overrides",
      "code": "const originalUser = { name: \"Sarah\", role: \"Viewer\" };\n\n// Clean: Spread creates a fresh independent object:\nconst updatedUser = { ...originalUser, role: \"Admin\" };\n\nconsole.log(\"Original role:\", originalUser.role); // \"Viewer\" (Safe and untouched!)\nconsole.log(\"Updated role:\", updatedUser.role);   // \"Admin\"",
      "explanation": "Using the spread operator ({ ...originalUser }) creates a new object in memory, leaving the original object completely untouched."
    }
  },
  "part5": {
    "title": "Object References & Cloning Playground",
    "intro": "Observe shared reference mutations, see where shallow copy stops, and perform a deep clone with structuredClone:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-13: OBJECT REFERENCES & CLONING PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Primitive copy by value (independent):\nlet scoreA = 100;\nlet scoreB = scoreA;\nscoreB = 200;\nconsole.log(\"Primitives are independent -> scoreA:\", scoreA, \"| scoreB:\", scoreB);\n\n// 2. The Shared Reference Trap:\nconst hero1 = { name: \"Aria\", level: 10 };\nconst hero2 = hero1; // Shares the same reference!\nhero2.level = 99;\nconsole.log(\"Shared reference -> hero1.level:\", hero1.level); // 99 (Mutated!)\n\n// 3. Safe Shallow Copy for flat objects:\nconst userProfile = { name: \"Maya\", theme: \"dark\" };\nconst userProfileCopy = { ...userProfile, theme: \"light\" };\nconsole.log(\"Original theme:\", userProfile.theme);     // \"dark\" (Untouched)\nconsole.log(\"Copy theme:\", userProfileCopy.theme);     // \"light\"\n\n// 4. Nested Objects: Shallow copy vs structuredClone():\nconst gameSettings = {\n  volume: 80,\n  graphics: { resolution: \"1080p\", shadows: true }\n};\n\n// Shallow copy:\nconst shallowSettings = { ...gameSettings };\n\n// Deep clone:\nconst deepSettings = structuredClone(gameSettings);\n\n// Modifying nested property on shallow copy affects original!\nshallowSettings.graphics.resolution = \"4K\";\nconsole.log(\"Original graphics after shallow edit:\", gameSettings.graphics.resolution); // \"4K\"!\n\n// Modifying deep clone leaves original safe:\ndeepSettings.graphics.resolution = \"1440p\";\nconsole.log(\"Original graphics after deep clone edit:\", gameSettings.graphics.resolution); // \"4K\" (Untouched)\nconsole.log(\"Deep clone graphics:\", deepSettings.graphics.resolution);                    // \"1440p\"\n"
  },
  "part6": {
    "title": "Key Takeaways: Object References & Copying",
    "takeaways": [
      {
        "title": "1. Values vs References",
        "desc": "Primitives copy values independently; objects copy memory pointers to the same data."
      },
      {
        "title": "2. The b = a Trap",
        "desc": "Assigning an object variable to another does not clone it. Changes to one affect the other."
      },
      {
        "title": "3. Shallow Copy with Spread",
        "desc": "Use { ...obj } to clone top-level properties of flat objects."
      },
      {
        "title": "4. Deep Clone with structuredClone",
        "desc": "Use structuredClone(obj) when cloning objects that contain nested objects or arrays."
      },
      {
        "title": "5. Next Step: Modern ES6+ Syntax",
        "desc": "In JS-14, we begin Stage 4 with Destructuring to easily unpack objects and arrays into variables!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-14: Destructuring: Unpacking Objects & Arrays with Ease",
      "desc": "Extract properties directly into named variables with fallback defaults and key renaming."
    }
  },
  "part7": {
    "title": "Knowledge Check: Object References",
    "quiz": {
      "question": "Why does modifying b.score also modify a.score after running 'const b = a'?",
      "options": [
        "Because both variables point to the exact same object in computer memory",
        "Because const variables automatically sync their values",
        "Because JavaScript creates a background timer that copies changes",
        "It does not; b is an independent copy"
      ],
      "correctIndex": 0,
      "explanation": "Assigning const b = a copies the memory reference (pointer), not the object. Both a and b point to the exact same object in memory."
    }
  }
},

  "js14-destructuring": {
  "slug": "js14-destructuring",
  "code": "JS-14",
  "title": "Destructuring: Unpacking Objects & Arrays with Ease",
  "subtitle": "Extract properties from objects and items from arrays into standalone variables with renaming and fallback defaults.",
  "sections": [
    {
      "id": "part1",
      "label": "Unpacking Values",
      "icon": "📦",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Object Extraction",
      "icon": "🏷️",
      "tag": "OBJECTS"
    },
    {
      "id": "part3",
      "label": "Arrays & Parameters",
      "icon": "📑",
      "tag": "ARRAYS"
    },
    {
      "id": "part4",
      "label": "Clean Code & Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Destructuring Playground",
      "icon": "💻",
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
    "title": "Unpacking Values: The Clean Modern Shortcut",
    "bigPicture": "Imagine receiving a delivery box of groceries. Rather than keeping everything sealed inside the box and writing box.milk, box.bread, and box.eggs every time you cook, you unpack the items onto your kitchen counter where you can grab them directly! In JavaScript, destructuring is the exact same concept: it is a modern, clean syntax that unpacks properties from objects or items from arrays into standalone variables in a single line.",
    "breakdownTitle": "Core Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Object Destructuring ({ name, age } = user)",
        "desc": "Extracts values by their matching property names. Because objects are labeled collections, order does not matter."
      },
      {
        "title": "Array Destructuring ([first, second] = list)",
        "desc": "Extracts values by their numbered position (index). The first variable receives index [0], the second receives [1]."
      },
      {
        "title": "Renaming & Fallback Defaults",
        "desc": "Rename extracted variables with colons ({ role: userRole }) and protect against missing values with defaults ({ theme = 'dark' })."
      }
    ]
  },
  "part2": {
    "title": "Object Destructuring: Extracting Properties by Name",
    "intro": "How curly brace destructuring pulls data directly into named variables:",
    "cards": [
      {
        "number": "01",
        "tag": "Objects",
        "title": "Object Unpacking ({ key })",
        "description": "Matches properties by exact key name. const { name, email } = user creates two independent variables directly from the user object.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Arrays",
        "title": "Array Unpacking ([a, b])",
        "description": "Matches items by order/position. const [first, second] = colors extracts the first two elements. Use commas [, , third] to skip items.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Safety",
        "title": "Fallback Defaults (= value)",
        "description": "const { role = 'Guest' } = user sets role to 'Guest' if the role property is missing or strictly undefined in the object.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Destructuring",
      "content": "Object destructuring uses curly braces {} and matches by key name (order does not matter). Array destructuring uses square brackets [] and matches by position (order matters completely)!"
    }
  },
  "part3": {
    "title": "Renaming Properties & Parameter Destructuring",
    "intro": "Assigning custom variable names and unpacking objects directly in function signatures:",
    "points": [
      {
        "title": "1. Renaming with Colons ({ originalKey: newName })",
        "content": "If a property name collides with an existing variable, rename it using a colon: const { id: userId } = user. The original object key is on the left, and your new variable name is on the right."
      },
      {
        "title": "2. Destructuring in Function Parameters",
        "content": "Instead of accepting a generic options object and writing options.name everywhere, unpack it right in the function header: function greet({ name, role = 'Member' }). This is standard in modern frameworks like React!"
      },
      {
        "title": "3. Defaults Only Activate on undefined",
        "content": "A default value only kicks in if the extracted value is strictly undefined. If the property contains null, false, or 0, the default value will NOT trigger."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Confusing Renaming Syntax with Defaults",
    "bad": {
      "title": "❌ Bad: Using equal signs to rename or writing repetitive manual assignments",
      "code": "const user = { username: \"coder99\", role: \"Editor\" };\n\n// Bug: Writing = when you meant to rename!\n// const { username = handle } = user; // Doesn't rename username to handle!\n\n// Repetitive manual extraction:\nconst username = user.username;\nconst role = user.role !== undefined ? user.role : \"Guest\";\nconsole.log(username, role);",
      "explanation": "Equal signs (=) are for default fallback values. To rename a property during destructuring, you must use a colon (:)."
    },
    "good": {
      "title": "✅ Clean: Clear renaming with colons and clean parameter unpacking",
      "code": "const user = { username: \"coder99\", role: \"Editor\" };\n\n// Correct renaming: { originalKey: newVariableName }\nconst { username: handle, role = \"Guest\" } = user;\nconsole.log(\"Handle:\", handle); // \"coder99\"\nconsole.log(\"Role:\", role);     // \"Editor\"\n\n// Unpack directly in function arguments:\nfunction displayBadge({ username, role = \"Guest\" }) {\n  console.log(`[${role.toUpperCase()}] ${username}`);\n}\ndisplayBadge(user); // \"[EDITOR] coder99\"",
      "explanation": "Using colon syntax ({ username: handle }) cleanly creates a new variable named handle. Destructuring in function headers makes requirements instantly clear."
    }
  },
  "part5": {
    "title": "Destructuring Playground",
    "intro": "Unpack nested user records, rename colliding variables, unpack array coordinates, and swap variables cleanly:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-14: DESTRUCTURING PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst account = {\n  id: 402,\n  profile: {\n    displayName: \"Alex Rivera\",\n    email: \"alex@example.com\"\n  },\n  preferences: {\n    theme: \"dark\"\n    // notifications is undefined\n  }\n};\n\n// 1. Nested object destructuring with renaming and defaults:\nconst {\n  id: accountId, // Renamed from id to accountId\n  profile: { displayName, email },\n  preferences: { theme, notifications = \"email-only\" } // Default fallback\n} = account;\n\nconsole.log(\"Account ID:\", accountId);\nconsole.log(\"User:\", displayName, \"(\" + email + \")\");\nconsole.log(\"Theme:\", theme, \"| Notifications:\", notifications);\n\n// 2. Array destructuring with item skipping:\nconst coordinates = [37.7749, -122.4194, 15]; // [latitude, longitude, zoom]\nconst [lat, lng, zoom = 10] = coordinates;\nconsole.log(\"Location -> Lat:\", lat, \"Lng:\", lng, \"Zoom:\", zoom);\n\n// 3. Variable swapping without a temporary variable:\nlet primary = \"Gold\";\nlet secondary = \"Silver\";\n[primary, secondary] = [secondary, primary];\nconsole.log(\"Swapped colors -> Primary:\", primary, \"| Secondary:\", secondary);\n\n// 4. Function parameter destructuring:\nfunction printSummary({ profile: { displayName }, preferences: { theme } }) {\n  return `Summary: ${displayName} prefers ${theme} mode.`;\n}\nconsole.log(printSummary(account));\n"
  },
  "part6": {
    "title": "Key Takeaways: Destructuring",
    "takeaways": [
      {
        "title": "1. Objects by Key Name",
        "desc": "Use { prop } to unpack object properties directly. Order does not matter."
      },
      {
        "title": "2. Arrays by Position",
        "desc": "Use [item1, item2] to unpack array items by index position."
      },
      {
        "title": "3. Rename with Colons",
        "desc": "Use { originalKey: newName } to assign properties to custom variable names."
      },
      {
        "title": "4. Defaults for undefined",
        "desc": "Use { prop = defaultVal } to provide a safe fallback if the property is missing."
      },
      {
        "title": "5. Next Step: Spread & Rest",
        "desc": "In JS-15, we master the three dots (...) to expand collections and gather arguments!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-15: Spread & Rest Operators: Expanding and Gathering (...)",
      "desc": "Use the three dots (...) to unpack collections with spread and collect variable arguments with rest parameters."
    }
  },
  "part7": {
    "title": "Knowledge Check: Destructuring",
    "quiz": {
      "question": "How do you rename a property from 'id' to 'userId' while destructuring an object?",
      "options": [
        "const { id as userId } = user;",
        "const { id: userId } = user;",
        "const { id -> userId } = user;",
        "const { userId = id } = user;"
      ],
      "correctIndex": 1,
      "explanation": "In JavaScript object destructuring, renaming uses a colon: { originalKey: newVariableName } = object. The colon specifies the new variable name to create."
    }
  }
},

  "js15-spread-and-rest-operators": {
  "slug": "js15-spread-and-rest-operators",
  "code": "JS-15",
  "title": "Spread & Rest Operators: Expanding and Gathering (...)",
  "subtitle": "Use the three dots (...) to unpack collections with spread and collect variable arguments with rest parameters.",
  "sections": [
    {
      "id": "part1",
      "label": "The Three Dots (...)",
      "icon": "✨",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Spread: Unpacking",
      "icon": "📤",
      "tag": "SPREAD"
    },
    {
      "id": "part3",
      "label": "Rest: Gathering",
      "icon": "📥",
      "tag": "REST"
    },
    {
      "id": "part4",
      "label": "Placement Rules & Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Spread & Rest Playground",
      "icon": "💻",
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
    "title": "The Three Dots (...): Spreading vs Gathering",
    "bigPicture": "In modern JavaScript, the three dots (...) are one of the most versatile tools you will use. But beginners are often confused because the exact same three dots do two opposite jobs depending on where you put them! Think of packing and unpacking a suitcase: Spread is unpacking your suitcase and spreading your clothes across your room. Rest is gathering loose clothes from the floor and packing them into a suitcase.",
    "breakdownTitle": "The Twin Roles of the Three Dots (...):",
    "breakdownItems": [
      {
        "title": "Spread Operator (Unpack)",
        "desc": "Unpacks an array or object into individual elements or properties. Use it to copy arrays, concatenate lists, or merge objects."
      },
      {
        "title": "Rest Parameters (Gather)",
        "desc": "Gathers multiple incoming function arguments or remaining object properties into a single, real JavaScript array."
      },
      {
        "title": "Safe Non-Destructive Merging",
        "desc": "Combining data with spread creates fresh collections, leaving your original arrays and objects completely untouched."
      }
    ]
  },
  "part2": {
    "title": "Spread Syntax: Unpacking Arrays & Merging Objects",
    "intro": "How spread expands items into new arrays and objects without modifying originals:",
    "cards": [
      {
        "number": "01",
        "tag": "Arrays",
        "title": "Array Spread [...a, ...b]",
        "description": "Unpacks elements from multiple arrays into a fresh, combined array. Perfect for safe cloning and concatenation.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Objects",
        "title": "Object Spread { ...a, ...b }",
        "description": "Merges objects cleanly. If both objects contain the same key, the property on the right overwrites the one on the left.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Function Calls",
        "title": "Math.max(...numbers)",
        "description": "Unpacks an array of numbers as individual arguments into functions that expect separate parameters.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Object Merging",
      "content": "When merging objects with spread { ...defaults, ...custom }, keys from the object on the right always overwrite keys on the left! Put your default values first, followed by custom user overrides."
    }
  },
  "part3": {
    "title": "Rest Parameters: Gathering Flexible Arguments",
    "intro": "Writing functions that accept any number of arguments cleanly:",
    "points": [
      {
        "title": "1. Gathering Indefinite Arguments",
        "content": "Use ...args in a function parameter list: function sumAll(...numbers). All incoming arguments are gathered into a real array named numbers."
      },
      {
        "title": "2. Real Array Superpowers",
        "content": "Unlike the confusing legacy 'arguments' object from older JavaScript, rest parameters produce a real JavaScript array with full access to .map(), .filter(), and .reduce()."
      },
      {
        "title": "3. Rest in Destructuring",
        "content": "You can also use rest to collect remaining properties: const [first, ...others] = [1, 2, 3, 4] gives first = 1 and others = [2, 3, 4]."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Rest Placement and Mutation Traps",
    "bad": {
      "title": "❌ Bad: Putting rest parameters in the middle of a parameter list",
      "code": "// SyntaxError: Rest parameter must be last formal parameter!\n// function logEvent(level, ...details, timestamp) {\n//   console.log(level, details, timestamp);\n// }\n\nfunction sumAll() {\n  // Bad legacy code: arguments is not an array!\n  // arguments.map(n => n * 2); // TypeError: arguments.map is not a function!\n}",
      "explanation": "JavaScript requires the rest parameter to be the very last parameter because it collects all remaining arguments. Placing anything after it causes a SyntaxError."
    },
    "good": {
      "title": "✅ Clean: Rest at the end and modern declarative array reduction",
      "code": "// Clean: Rest parameter is always the final parameter:\nfunction logEvent(level, timestamp, ...details) {\n  console.log(`[${level}] at ${timestamp}:`, details.join(\" | \"));\n}\nlogEvent(\"INFO\", \"12:00PM\", \"User logged in\", \"IP 10.0.0.1\");\n\n// Clean modern rest function with reduce:\nconst sumAll = (...numbers) => numbers.reduce((total, n) => total + n, 0);\nconsole.log(\"Sum:\", sumAll(10, 20, 30)); // 60",
      "explanation": "Placing the rest parameter at the end allows JavaScript to gather all trailing arguments into a real array that supports all array methods."
    }
  },
  "part5": {
    "title": "Spread & Rest Playground",
    "intro": "Merge arrays and objects with spread, pass array items into Math functions, and write flexible rest functions:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-15: SPREAD & REST PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Array Spread: Combine lists non-destructively\nconst starterSkills = [\"HTML\", \"CSS\"];\nconst backendSkills = [\"Node.js\", \"PostgreSQL\"];\nconst fullStackSkills = [...starterSkills, \"JavaScript\", ...backendSkills, \"Git\"];\nconsole.log(\"Full Stack Skills:\", fullStackSkills);\n\n// 2. Object Spread: Merging defaults with user settings\nconst defaultSettings = { theme: \"light\", fontSize: 14, autoSave: true };\nconst userCustomizations = { theme: \"dark\", fontSize: 16 }; // Custom overrides\nconst activeConfig = { ...defaultSettings, ...userCustomizations };\nconsole.log(\"Active Config (dark theme wins):\", activeConfig);\n\n// 3. Function Call Spread: Math.max on an array\nconst scores = [85, 92, 78, 99, 88];\nconst highestScore = Math.max(...scores); // Unpacks to: Math.max(85, 92, 78, 99, 88)\nconsole.log(\"Highest Score:\", highestScore);\n\n// 4. Rest Parameters in Functions:\nfunction formatInvoice(customerName, discountPercent, ...itemPrices) {\n  const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);\n  const discountAmount = subtotal * (discountPercent / 100);\n  const finalTotal = subtotal - discountAmount;\n  return `Invoice for ${customerName}: $${finalTotal.toFixed(2)} (${itemPrices.length} items)`;\n}\n\nconsole.log(formatInvoice(\"Acme Corp\", 10, 100, 50, 25));\n\n// 5. Rest in Destructuring:\nconst [primaryColor, ...accentColors] = [\"#ff0000\", \"#00ff00\", \"#0000ff\", \"#ffff00\"];\nconsole.log(\"Primary:\", primaryColor);\nconsole.log(\"Accents array:\", accentColors);\n"
  },
  "part6": {
    "title": "Key Takeaways: Spread & Rest Operators",
    "takeaways": [
      {
        "title": "1. Spread Unpacks (...)",
        "desc": "Expands arrays into individual items and merges objects cleanly without mutations."
      },
      {
        "title": "2. Rest Gathers (...)",
        "desc": "Collects multiple incoming arguments into a single real JavaScript array."
      },
      {
        "title": "3. Right-Side Precedence",
        "desc": "In object spread { ...a, ...b }, properties from 'b' overwrite identical properties from 'a'."
      },
      {
        "title": "4. Rest Must Be Last",
        "desc": "Rest parameters must always sit at the end of a function parameter list."
      },
      {
        "title": "5. Next Step: Safe Property Access",
        "desc": "In JS-16, we learn Optional Chaining (?.) and Nullish Coalescing (??) to prevent crashes!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-16: Optional Chaining (?.) & Nullish Coalescing (??)",
      "desc": "Prevent runtime errors by safely navigating nested data with ?. and setting safe fallbacks with ?? without false-alarm bugs."
    }
  },
  "part7": {
    "title": "Knowledge Check: Spread & Rest",
    "quiz": {
      "question": "Where must a Rest parameter (...args) be placed in a function definition?",
      "options": [
        "Anywhere in the parameter list; position does not matter",
        "It must always be the very last parameter in the list",
        "It must always be the very first parameter in the list",
        "A function can have multiple rest parameters anywhere"
      ],
      "correctIndex": 1,
      "explanation": "A rest parameter gathers all remaining arguments into an array, so it must always be the last parameter in the function declaration."
    }
  }
},

  "js16-optional-chaining-and-nullish-coalescing": {
  "slug": "js16-optional-chaining-and-nullish-coalescing",
  "code": "JS-16",
  "title": "Optional Chaining (?.) & Nullish Coalescing (??)",
  "subtitle": "Prevent runtime errors by safely navigating nested data with ?. and setting safe fallbacks with ?? without false-alarm bugs.",
  "sections": [
    {
      "id": "part1",
      "label": "Defensive Coding",
      "icon": "🛡️",
      "tag": "SAFETY"
    },
    {
      "id": "part2",
      "label": "Optional Chaining (?.)",
      "icon": "🔗",
      "tag": "CHAINING"
    },
    {
      "id": "part3",
      "label": "Nullish (??) vs OR (||)",
      "icon": "⚖️",
      "tag": "DEFAULTS"
    },
    {
      "id": "part4",
      "label": "The Falsy Zero Bug",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Safe Navigation Playground",
      "icon": "💻",
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
    "title": "Defensive Coding: Surviving Missing Properties and API Data",
    "bigPicture": "Every JavaScript developer eventually encounters the most common runtime crash: TypeError: Cannot read properties of undefined (reading 'city'). This happens when your code tries to drill into an object that doesn't exist—often because an API response is still loading, a profile field is optional, or data is missing. In the past, developers had to write long, clunky checks like user && user.address && user.address.city. Modern JavaScript solves this elegantly with two tools: Optional Chaining (?.) and Nullish Coalescing (??).",
    "breakdownTitle": "The Defensive Coding Toolkit:",
    "breakdownItems": [
      {
        "title": "Optional Chaining (?.)",
        "desc": "Safely reads nested properties. If any part of the chain is null or undefined, it stops immediately and safely returns undefined instead of crashing."
      },
      {
        "title": "Nullish Coalescing (??)",
        "desc": "Provides a fallback value ONLY when the left side is null or undefined, safely preserving valid 0, false, and empty string '' values."
      },
      {
        "title": "The || False-Alarm Trap",
        "desc": "Logical OR (||) treats 0, false, and '' as falsy, accidentally overwriting legitimate zero values with fallback defaults."
      }
    ]
  },
  "part2": {
    "title": "Optional Chaining (?.): Safe Property Access",
    "intro": "Navigating deeply nested structures without fearing runtime crashes:",
    "cards": [
      {
        "number": "01",
        "tag": "Safe Drill",
        "title": "Nested Keys (user?.address?.city)",
        "description": "If user or address is null or undefined, evaluation stops immediately and evaluates to undefined. No crash!",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Smart Defaults",
        "title": "Nullish Coalescing (value ?? default)",
        "description": "Returns the fallback only if value is null or undefined. A score of 0 or boolean of false is kept intact.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Safe Calls",
        "title": "Optional Calls (callback?.())",
        "description": "Executes a function only if it exists. If the callback was omitted, JavaScript cleanly skips the call without errors.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Default Values",
      "content": "Always choose the nullish coalescing operator ?? over logical OR || when providing default values for numbers, booleans, and strings! ?? protects against replacing valid zeros or false booleans."
    }
  },
  "part3": {
    "title": "Nullish Coalescing (??) vs Logical OR (||)",
    "intro": "Understanding why ?? is much safer than || for default values:",
    "points": [
      {
        "title": "1. The Falsy Overwrite Trap with ||",
        "content": "The logical OR operator (||) checks for any falsy value (0, false, '', null, undefined, NaN). If a user has 0 unread messages, count || 10 replaces 0 with 10! That's a real bug."
      },
      {
        "title": "2. The Nullish Definition (??)",
        "content": "The nullish operator (??) only looks for 'nullish' values: null and undefined. It treats 0, false, and empty strings as completely valid, preserving your real data."
      },
      {
        "title": "3. Safe Array Indexing (?.[0])",
        "content": "You can safely access array elements that might not exist using bracket notation: users?.[0]?.name cleanly checks if users exists and has a first element."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Using || for Numeric Defaults",
    "bad": {
      "title": "❌ Bad: Using || for numeric defaults and deep access without ?.",
      "code": "const userSettings = {\n  volume: 0,         // Legitimate volume level (muted)!\n  notifications: false // Legitimate boolean choice!\n};\n\n// Bug: 0 is falsy, so || overrides it with 50!\nconst activeVolume = userSettings.volume || 50;\nconsole.log(\"Volume:\", activeVolume); // 50 (Mute was ignored!)\n\nconst account = {};\n// Crashes the app: TypeError: Cannot read properties of undefined!\n// const zipCode = account.profile.address.zipCode;",
      "explanation": "Using || replaces valid zero (0) values with the default. Accessing properties on undefined without ?. crashes your application immediately."
    },
    "good": {
      "title": "✅ Clean: Safe navigation with ?. and accurate defaults with ??",
      "code": "const userSettings = {\n  volume: 0,\n  notifications: false\n};\n\n// Clean: ?? preserves 0 and false, replacing only null or undefined:\nconst activeVolume = userSettings.volume ?? 50;\nconst notificationsOn = userSettings.notifications ?? true;\nconsole.log(\"Volume:\", activeVolume);            // 0 (Muted volume preserved!)\nconsole.log(\"Notifications:\", notificationsOn); // false (User choice preserved!)\n\nconst account = {};\n// Safe drill: Evaluates cleanly to undefined without crashing\nconst zipCode = account.profile?.address?.zipCode ?? \"No ZIP provided\";\nconsole.log(\"Zip Code:\", zipCode); // \"No ZIP provided\"",
      "explanation": "Optional chaining (?.) prevents crashes when intermediate objects are missing, and nullish coalescing (??) reliably distinguishes valid zeros from missing data."
    }
  },
  "part5": {
    "title": "Safe Navigation Playground",
    "intro": "Explore deep object drilling, test safe method execution, and compare ?? vs || with zeros and booleans:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-16: OPTIONAL CHAINING & NULLISH COALESCING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst apiResponse = {\n  status: 200,\n  data: {\n    user: {\n      name: \"Elena Rostova\",\n      metrics: {\n        totalLogins: 0,      // Valid zero!\n        isProMember: false   // Valid false!\n      }\n      // address is missing\n      // sendAlert() method is missing\n    }\n  }\n};\n\n// 1. Safe nested property access with ?.\nconst street = apiResponse.data?.user?.address?.street;\nconsole.log(\"Street address (safe access):\", street); // undefined (No crash!)\n\n// 2. Safe method invocation with ?.()\napiResponse.data?.user?.sendAlert?.(\"Hello!\");\nconsole.log(\"Safely called optional method without errors!\");\n\n// 3. Nullish Coalescing (??) preserves 0 and false:\nconst logins = apiResponse.data.user.metrics.totalLogins ?? 1;\nconst isPro = apiResponse.data.user.metrics.isProMember ?? true;\n\nconsole.log(\"Total logins (??):\", logins); // 0 (Preserved!)\nconsole.log(\"Is Pro (??):\", isPro);        // false (Preserved!)\n\n// Compare with logical OR (||) false-alarm trap:\nconst corruptedLogins = apiResponse.data.user.metrics.totalLogins || 1;\nconst corruptedPro = apiResponse.data.user.metrics.isProMember || true;\n\nconsole.log(\"With || trap -> logins:\", corruptedLogins); // 1 (Bug: 0 was replaced!)\nconsole.log(\"With || trap -> isPro:\", corruptedPro);     // true (Bug: false was replaced!)\n\n// 4. Combined ?. and ?? pattern:\nconst city = apiResponse.data?.user?.address?.city ?? \"City not specified\";\nconsole.log(\"User city:\", city); // \"City not specified\"\n"
  },
  "part6": {
    "title": "Key Takeaways: Optional Chaining & Nullish Coalescing",
    "takeaways": [
      {
        "title": "1. No More TypeError Crashes",
        "desc": "Use ?. to safely access deeply nested properties across potentially missing objects."
      },
      {
        "title": "2. Preserves 0, false, and ''",
        "desc": "Use ?? to provide defaults only when a value is strictly null or undefined."
      },
      {
        "title": "3. Optional Function Calling",
        "desc": "Use callback?.() to safely run callbacks that may not have been passed."
      },
      {
        "title": "4. Avoid || for Data Defaults",
        "desc": "The || operator treats 0 and false as missing, introducing subtle false-alarm bugs."
      },
      {
        "title": "5. Next Step: Object-Oriented JS",
        "desc": "In Stage 5, we explore the 'this' keyword, prototype inheritance, and modern classes!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-17: The this Keyword: Who Called Me?",
      "desc": "Learn how 'this' dynamically resolves based on who called a function, and how arrow functions borrow 'this' from their surrounding scope."
    }
  },
  "part7": {
    "title": "Knowledge Check: Safe Navigation",
    "quiz": {
      "question": "What does user?.address?.city evaluate to if user.address is null or undefined?",
      "options": [
        "It throws a TypeError: Cannot read property 'city' of undefined",
        "undefined (without throwing any error)",
        "null",
        "false"
      ],
      "correctIndex": 1,
      "explanation": "Optional chaining (?.) short-circuits and safely returns undefined the moment any property in the chain is null or undefined, completely avoiding runtime crashes."
    }
  }
},

  "js17-the-this-keyword": {
  "slug": "js17-the-this-keyword",
  "code": "JS-17",
  "title": "The this Keyword: Who Called Me?",
  "subtitle": "Learn how this gets its value dynamically at call time, how arrow functions borrow this, and how to avoid losing context in callbacks.",
  "sections": [
    {
      "id": "part1",
      "label": "Who Called Me?",
      "icon": "👤",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "The Dot Rule",
      "icon": "🎯",
      "tag": "RULES"
    },
    {
      "id": "part3",
      "label": "Arrows & Callbacks",
      "icon": "🏹",
      "tag": "ARROWS"
    },
    {
      "id": "part4",
      "label": "Detached Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "this Playground",
      "icon": "💻",
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
    "title": "The this Keyword: Who Is Speaking Right Now?",
    "bigPicture": "The 'this' keyword is famously one of the most misunderstood topics in JavaScript. But you can master it with a simple analogy: think of 'this' like the pronoun 'I' or 'My'. If Alice says 'I am hungry', the word 'I' refers to Alice. If Bob says 'I am hungry', the word 'I' refers to Bob! The pronoun 'I' has no permanent identity—its meaning depends on who is speaking right now. In JavaScript, 'this' works the exact same way: its value depends on how a function is called, not where it was typed.",
    "breakdownTitle": "The Three Core Rules of 'this':",
    "breakdownItems": [
      {
        "title": "The Dot Rule (user.speak())",
        "desc": "Look immediately to the left of the dot when a function is called. Whatever is to the left of the dot becomes 'this' inside that function."
      },
      {
        "title": "Arrow Functions Borrow 'this'",
        "desc": "Arrow functions do NOT have their own 'this'. They simply borrow the 'this' value from the surrounding code where they were written."
      },
      {
        "title": "The Detached Callback Trap",
        "desc": "When an object method is passed as a detached callback without parentheses (like setTimeout(user.speak)), the dot disappears and 'this' is lost!"
      }
    ]
  },
  "part2": {
    "title": "The Dot Rule: Determining this at Call Time",
    "intro": "Understanding how the object before the dot controls execution context:",
    "cards": [
      {
        "number": "01",
        "tag": "Method Call",
        "title": "The Dot Rule (obj.method())",
        "description": "When invoked as player.attack(), the player object is directly to the left of the dot, so this points to player.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Lexical Scope",
        "title": "Arrow Functions (() => {})",
        "description": "Arrow functions never create their own this. They inherit this from the outer scope where they were written. Never use them as object methods!",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Fixed Context",
        "title": "Explicit Binding (.bind())",
        "description": "fn.bind(target) creates a brand-new function where this is permanently locked to the target object, even when passed as a callback.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of this and Methods",
      "content": "Always use standard method syntax (greet() {}) for defining methods on objects. Use arrow functions inside methods when passing callbacks, so the callback safely borrows this from the method!"
    }
  },
  "part3": {
    "title": "Arrow Functions & Keeping Context in Nested Callbacks",
    "intro": "Why arrow functions are the perfect solution for nested callbacks inside methods:",
    "points": [
      {
        "title": "1. The Missing Dot in Callbacks",
        "content": "If you pass an object method as a raw callback (e.g., setTimeout(user.greet, 100)), the timer calls greet() on its own without the dot. In strict mode, this becomes undefined."
      },
      {
        "title": "2. The Arrow Function Fix",
        "content": "Because arrow functions borrow this from their enclosing scope, wrapping the callback in an arrow function (() => user.greet()) or using an arrow callback inside setTimeout(() => this.name) keeps this intact."
      },
      {
        "title": "3. Explicit Control with .call() and .apply()",
        "content": "You can manually tell a function which object to use right now with fn.call(targetObject, arg1, arg2). It runs the function immediately with this set to targetObject."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Arrow Methods vs Detached Callbacks",
    "bad": {
      "title": "❌ Bad: Arrow function as an object method, losing this to global scope",
      "code": "const robot = {\n  name: \"Atlas\",\n  battery: 100,\n\n  // Bug: Arrow function does NOT create its own 'this'!\n  // It borrows 'this' from the file/window, so this.name is undefined!\n  checkStatus: () => {\n    console.log(\"Robot:\", this.name, \"| Battery:\", this.battery);\n  }\n};\n\nrobot.checkStatus(); // \"Robot: undefined | Battery: undefined\"",
      "explanation": "Because checkStatus is an arrow function, it inherits 'this' from the outside file scope (module/window) instead of the robot object."
    },
    "good": {
      "title": "✅ Clean: Standard method with nested arrow function callback",
      "code": "const robot = {\n  name: \"Atlas\",\n  battery: 100,\n\n  // Clean standard method syntax:\n  checkStatus() {\n    console.log(\"Robot:\", this.name, \"| Battery:\", this.battery);\n  },\n\n  // Nested arrow callback safely borrows 'this' from charge():\n  charge() {\n    console.log(\"Charging \" + this.name + \"...\");\n    setTimeout(() => {\n      this.battery = 100;\n      console.log(this.name + \" is fully charged: \" + this.battery + \"%!\");\n    }, 100);\n  }\n};\n\nrobot.checkStatus(); // \"Robot: Atlas | Battery: 100\"\nrobot.charge();      // Works perfectly!",
      "explanation": "Standard method syntax binds 'this' to the robot object when called with robot.checkStatus(), and the arrow function inside setTimeout borrows that same robot reference."
    }
  },
  "part5": {
    "title": "The this Keyword Playground",
    "intro": "Trace method calls, test arrow function inheritance, fix detached callbacks, and use .bind():",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-17: THE THIS KEYWORD PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst hero = {\n  heroName: \"Valkyrie\",\n  health: 120,\n\n  // 1. Regular method call (this = hero)\n  takeDamage(amount) {\n    this.health -= amount;\n    return `${this.heroName} took ${amount} damage! HP remaining: ${this.health}`;\n  },\n\n  // 2. Nested arrow function borrowing 'this'\n  delayedHeal(amount) {\n    console.log(`Preparing heal for ${this.heroName}...`);\n    setTimeout(() => {\n      this.health += amount;\n      console.log(`✨ ${this.heroName} healed to ${this.health} HP!`);\n    }, 100);\n  }\n};\n\n// 1. Normal method call (The Dot Rule):\nconsole.log(hero.takeDamage(30)); // this is hero!\n\n// 2. Delayed heal using borrowed arrow this:\nhero.delayedHeal(25);\n\n// 3. Explicit binding with .call():\nconst villain = { heroName: \"Shadowfang\", health: 200 };\n// Borrow hero's takeDamage method, but execute it on villain:\nconsole.log(hero.takeDamage.call(villain, 50));\n\n// 4. Permanent binding with .bind():\nconst boundVillainDamage = hero.takeDamage.bind(villain, 20);\nconsole.log(boundVillainDamage());\n"
  },
  "part6": {
    "title": "Key Takeaways: The this Keyword",
    "takeaways": [
      {
        "title": "1. The Dot Rule",
        "desc": "Look immediately to the left of the dot at call time (obj.method() -> this is obj)."
      },
      {
        "title": "2. Arrow Functions Borrow this",
        "desc": "Arrow functions have no this; they borrow this from the surrounding code."
      },
      {
        "title": "3. Avoid Arrow Object Methods",
        "desc": "Use standard methods (greet() {}) for object properties, not arrow functions."
      },
      {
        "title": "4. Use .bind() for Callbacks",
        "desc": "Lock this permanently to an object before passing methods as detached callbacks."
      },
      {
        "title": "5. Next Step: Prototypes",
        "desc": "In JS-18, we discover how objects share methods behind the scenes with prototypes!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-18: Prototypes & The Prototype Chain: Inheritance Under the Hood",
      "desc": "Understand how JavaScript objects share methods by delegating lookups up the prototype chain to save memory."
    }
  },
  "part7": {
    "title": "Knowledge Check: The this Keyword",
    "quiz": {
      "question": "How do Arrow Functions determine the value of 'this'?",
      "options": [
        "They dynamically point to the object to the left of the dot",
        "They borrow 'this' from the surrounding code where the arrow function was created",
        "They always bind 'this' to the global window object",
        "They automatically convert 'this' into an empty object"
      ],
      "correctIndex": 1,
      "explanation": "Arrow functions do not have their own 'this'. They adopt ('borrow') the 'this' binding from the surrounding lexical scope where they were written."
    }
  }
},

  "js18-prototypes-and-prototype-chain": {
  "slug": "js18-prototypes-and-prototype-chain",
  "code": "JS-18",
  "title": "Prototypes & The Prototype Chain: Inheritance Under the Hood",
  "subtitle": "Understand how JavaScript objects share methods by delegating lookups up the prototype chain to save memory.",
  "sections": [
    {
      "id": "part1",
      "label": "Delegation System",
      "icon": "🧬",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "The Prototype Chain",
      "icon": "🪜",
      "tag": "LOOKUP"
    },
    {
      "id": "part3",
      "label": "Memory & Object.create",
      "icon": "💾",
      "tag": "EFFICIENCY"
    },
    {
      "id": "part4",
      "label": "Common Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Prototypes Playground",
      "icon": "💻",
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
    "title": "Prototypes: JavaScript's Delegation System",
    "bigPicture": "In JavaScript, inheritance is based on delegation rather than copying. Think of prototypes like borrowing tools from a neighbor: if you need a lawnmower, you check your own garage first. If you don't have one, you ask your neighbor (your prototype). If your neighbor doesn't have one either, they ask their parent! Only if nobody in the chain has the tool does JavaScript throw up its hands and say: 'undefined'.",
    "breakdownTitle": "Core Concepts of JavaScript Prototypes:",
    "breakdownItems": [
      {
        "title": "The Hidden Prototype Link",
        "desc": "Every JavaScript object has a hidden link ([[Prototype]]) pointing to another object from which it can borrow features."
      },
      {
        "title": "Property Delegation",
        "desc": "When you access obj.greet(), if greet is missing on obj, JavaScript automatically walks up the chain to find it on the prototype."
      },
      {
        "title": "Massive RAM Savings",
        "desc": "Instead of copying a 50-line method onto 10,000 separate object instances, you store it once on the prototype and let all instances share it."
      }
    ]
  },
  "part2": {
    "title": "The Prototype Chain: How JavaScript Looks Up Properties",
    "intro": "Understanding the step-by-step lookup path from object to Object.prototype to null:",
    "cards": [
      {
        "number": "01",
        "tag": "Own Property",
        "title": "Step 1: Check Own Object",
        "description": "JavaScript first checks if the property exists directly on the object itself. If found, it uses it immediately.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Prototype",
        "title": "Step 2: Check Prototype",
        "description": "If missing, JavaScript inspects the object's prototype. This is how all arrays get methods like .map() and .filter()!",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Chain End",
        "title": "Step 3: Object.prototype -> null",
        "description": "The top of every chain is Object.prototype. If the property still isn't found, it hits null and returns undefined.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Prototypes",
      "content": "Never modify built-in prototypes like Array.prototype or Object.prototype! Adding custom methods to native prototypes causes unpredictable bugs, security issues, and conflicts with libraries."
    }
  },
  "part3": {
    "title": "Object.create() & Checking Direct Properties with Object.hasOwn()",
    "intro": "Creating linked objects explicitly and distinguishing own properties from inherited ones:",
    "points": [
      {
        "title": "1. Linking Prototypes with Object.create(proto)",
        "content": "Object.create(parentObject) creates a brand-new, empty object whose hidden prototype points directly to parentObject."
      },
      {
        "title": "2. Object.hasOwn(obj, prop)",
        "content": "Modern JavaScript provides Object.hasOwn(obj, 'prop') to verify whether a property belongs directly to the object or is being borrowed from its prototype."
      },
      {
        "title": "3. Classes Are Built on Prototypes",
        "content": "ES6 class syntax does not introduce a new object model—it is clean, readable syntax sugar that configures prototypes behind the scenes!"
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Duplicating Methods on Every Single Instance",
    "bad": {
      "title": "❌ Bad: Creating duplicate function copies inside factory functions",
      "code": "function createPlayer(name, role) {\n  return {\n    name,\n    role,\n    // Bad: Every player creates a duplicate copy of this function in RAM:\n    attack() {\n      console.log(this.name + \" attacks!\");\n    }\n  };\n}\n\nconst p1 = createPlayer(\"Aria\", \"Warrior\");\nconst p2 = createPlayer(\"Leo\", \"Mage\");\nconsole.log(p1.attack === p2.attack); // false (Two different copies in RAM!)",
      "explanation": "If you create 1,000 players, you create 1,000 identical attack functions in memory, wasting system resources."
    },
    "good": {
      "title": "✅ Clean: Sharing methods through prototype delegation",
      "code": "const playerMethods = {\n  attack() {\n    console.log(this.name + \" attacks!\");\n  }\n};\n\nfunction createPlayer(name, role) {\n  // Link new object to shared prototype:\n  const player = Object.create(playerMethods);\n  player.name = name;\n  player.role = role;\n  return player;\n}\n\nconst p1 = createPlayer(\"Aria\", \"Warrior\");\nconst p2 = createPlayer(\"Leo\", \"Mage\");\nconsole.log(p1.attack === p2.attack); // true (Shared in RAM!)",
      "explanation": "Both player instances share the exact same attack function in memory, saving memory while keeping code clean and modular."
    }
  },
  "part5": {
    "title": "Prototypes Playground",
    "intro": "Create prototype-linked objects with Object.create(), verify shared memory, and inspect with Object.hasOwn():",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-18: PROTOTYPES & THE PROTOTYPE CHAIN PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Shared methods prototype:\nconst vehicleActions = {\n  drive(miles) {\n    this.mileage += miles;\n    return `${this.model} drove ${miles} miles. Total: ${this.mileage} miles.`;\n  },\n  honk() {\n    return `${this.model} says: BEEP BEEP! 🚗`;\n  }\n};\n\n// 2. Create instance using Object.create():\nconst carA = Object.create(vehicleActions);\ncarA.model = \"CyberTruck\";\ncarA.mileage = 1500;\n\nconst carB = Object.create(vehicleActions);\ncarB.model = \"Model 3\";\ncarB.mileage = 8000;\n\n// 3. Both cars borrow methods from vehicleActions:\nconsole.log(carA.drive(50));\nconsole.log(carB.honk());\n\n// 4. Verify shared function in memory:\nconsole.log(\"Do both cars share the exact same drive function in RAM?:\", carA.drive === carB.drive); // true!\n\n// 5. Inspecting Direct vs Inherited properties with Object.hasOwn():\nconsole.log(\"Is 'model' carA's own direct property?:\", Object.hasOwn(carA, \"model\")); // true\nconsole.log(\"Is 'drive' carA's own direct property?:\", Object.hasOwn(carA, \"drive\")); // false (Borrowed!)\n\n// 6. Inspecting the prototype link:\nconsole.log(\"carA's prototype is vehicleActions?:\", Object.getPrototypeOf(carA) === vehicleActions); // true\n"
  },
  "part6": {
    "title": "Key Takeaways: Prototypes & Prototype Chain",
    "takeaways": [
      {
        "title": "1. Delegation, Not Copying",
        "desc": "JavaScript objects borrow missing properties by delegating lookups up the chain."
      },
      {
        "title": "2. Memory Efficiency",
        "desc": "Storing methods on a prototype lets thousands of objects share one function in RAM."
      },
      {
        "title": "3. Object.create(proto)",
        "desc": "Creates a fresh object whose prototype is set to the provided parent object."
      },
      {
        "title": "4. Check Direct Keys",
        "desc": "Use Object.hasOwn(obj, prop) to check if a property is direct or borrowed."
      },
      {
        "title": "5. Next Step: ES6 Classes",
        "desc": "In JS-19, we learn modern class syntax: constructors, extends, and super()!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-19: ES6 Classes, Constructors & Inheritance: Clean Object-Oriented JS",
      "desc": "Write clean object-oriented code using the class blueprint syntax, constructors, extends for inheritance, and the super() rule."
    }
  },
  "part7": {
    "title": "Knowledge Check: Prototypes",
    "quiz": {
      "question": "What happens when you access a property on an object that does NOT exist directly on that object?",
      "options": [
        "JavaScript immediately throws a PropertyNotFoundError crash",
        "JavaScript automatically looks up the prototype chain to find it on the object's prototype",
        "JavaScript creates the property and sets it to null",
        "The object is deleted from memory"
      ],
      "correctIndex": 1,
      "explanation": "JavaScript checks the object's [[Prototype]]. If the property is missing, it walks up the prototype chain until it finds the property or hits null, returning undefined if not found anywhere."
    }
  }
},

  "js19-classes-extends-and-super": {
  "slug": "js19-classes-extends-and-super",
  "code": "JS-19",
  "title": "ES6 Classes, Constructors & Inheritance: Clean Object-Oriented JS",
  "subtitle": "Write clean object-oriented code using the class blueprint syntax, constructors, extends for inheritance, and the super() rule.",
  "sections": [
    {
      "id": "part1",
      "label": "Class Blueprints",
      "icon": "🏗️",
      "tag": "CLASSES"
    },
    {
      "id": "part2",
      "label": "Constructors & Methods",
      "icon": "⚙️",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "extends & super()",
      "icon": "🧬",
      "tag": "INHERITANCE"
    },
    {
      "id": "part4",
      "label": "The super() Rule",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Classes Playground",
      "icon": "💻",
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
    "title": "ES6 Classes: The Architectural Blueprint for Objects",
    "bigPicture": "Creating prototype links with Object.create() worked, but it felt awkward and required multiple disconnected steps. ES6 introduced the class keyword to package everything into a single, clean blueprint! Think of a class like an architectural blueprint for a house: the blueprint describes what rooms and doors the house should have, and calling 'new House()' constructs an actual physical house from that blueprint.",
    "breakdownTitle": "Core Elements of JavaScript Classes:",
    "breakdownItems": [
      {
        "title": "The constructor() Function",
        "desc": "The initialization function that runs automatically when you create a new instance with 'new ClassName()'."
      },
      {
        "title": "Shared Prototype Methods",
        "desc": "Methods defined inside a class body are automatically placed on the prototype so all instances share them."
      },
      {
        "title": "Inheritance with extends and super()",
        "desc": "Create child classes that inherit and specialize parent classes, using super() to initialize the parent foundation."
      }
    ]
  },
  "part2": {
    "title": "Constructors, Instance State & Prototype Methods",
    "intro": "How class declarations organize object creation and method sharing:",
    "cards": [
      {
        "number": "01",
        "tag": "Blueprint",
        "title": "class User {}",
        "description": "Defines the blueprint. Inside, the constructor(name) initializes personal properties (this.name = name).",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Instantiate",
        "title": "new User('Alice')",
        "description": "The new operator creates a fresh object, sets its prototype to User.prototype, and executes the constructor.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Subclassing",
        "title": "class Admin extends User",
        "description": "Admin inherits all properties and methods from User, allowing you to reuse and extend code cleanly.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Subclasses",
      "content": "In any subclass constructor that uses 'extends', you MUST call super() before accessing 'this'! The parent class must build the foundation before the child class can add its own properties."
    }
  },
  "part3": {
    "title": "Subclassing with extends and Calling super()",
    "intro": "Reusing parent functionality and overriding methods gracefully:",
    "points": [
      {
        "title": "1. Calling super(...args)",
        "content": "In a child constructor, super(name, email) invokes the parent class constructor to set up inherited properties."
      },
      {
        "title": "2. Method Overriding",
        "content": "A child class can define a method with the same name as a parent method. It can call super.methodName() to reuse parent behavior while adding custom features."
      },
      {
        "title": "3. Under the Hood, It's Still Prototypes",
        "content": "JavaScript classes do not introduce a different memory model. Under the hood, class methods are stored on the prototype, giving you the same high performance and memory efficiency."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Accessing this Before super() in Subclasses",
    "bad": {
      "title": "❌ Bad: Using 'this' before calling super() in a child constructor",
      "code": "class Employee {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nclass Manager extends Employee {\n  constructor(name, department) {\n    // Bug: Accessing 'this' before super() throws ReferenceError!\n    this.department = department;\n    super(name);\n  }\n}",
      "explanation": "JavaScript requires the parent constructor to construct the object first via super(). Accessing this before calling super() crashes with a ReferenceError."
    },
    "good": {
      "title": "✅ Clean: Calling super() first and method extension",
      "code": "class Employee {\n  constructor(name) {\n    this.name = name;\n  }\n  describe() {\n    return `Employee: ${this.name}`;\n  }\n}\n\nclass Manager extends Employee {\n  constructor(name, department) {\n    super(name); // Must be called first!\n    this.department = department;\n  }\n\n  // Extend parent method cleanly:\n  describe() {\n    return `${super.describe()} (Lead of ${this.department})`;\n  }\n}\n\nconst boss = new Manager(\"Elena\", \"Engineering\");\nconsole.log(boss.describe()); // \"Employee: Elena (Lead of Engineering)\"",
      "explanation": "Calling super(name) initializes the parent class properly, enabling the child class to safely add its own unique department property."
    }
  },
  "part5": {
    "title": "Classes & Inheritance Playground",
    "intro": "Create a class hierarchy, instantiate objects with new, call super methods, and inspect prototype sharing:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-19: ES6 CLASSES, EXTENDS & SUPER PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Base Class (Parent Blueprint)\nclass BankAccount {\n  constructor(accountHolder, initialBalance = 0) {\n    this.accountHolder = accountHolder;\n    this.balance = initialBalance;\n  }\n\n  deposit(amount) {\n    this.balance += amount;\n    return `[${this.accountHolder}] Deposited $${amount}. Balance: $${this.balance}`;\n  }\n\n  withdraw(amount) {\n    if (amount > this.balance) {\n      return `[${this.accountHolder}] Insufficient funds! Balance is $${this.balance}`;\n    }\n    this.balance -= amount;\n    return `[${this.accountHolder}] Withdrew $${amount}. Balance: $${this.balance}`;\n  }\n}\n\n// 2. Subclass inheriting with extends:\nclass SavingsAccount extends BankAccount {\n  constructor(accountHolder, initialBalance, interestRate = 0.05) {\n    super(accountHolder, initialBalance); // Must initialize parent first!\n    this.interestRate = interestRate;\n  }\n\n  // Add subclass-specific method:\n  applyInterest() {\n    const interest = this.balance * this.interestRate;\n    this.balance += interest;\n    return `🎉 Added $${interest.toFixed(2)} interest! New Balance: $${this.balance.toFixed(2)}`;\n  }\n}\n\n// 3. Create instances:\nconst account = new SavingsAccount(\"Marcus Vance\", 1000, 0.04);\nconsole.log(account.deposit(500));\nconsole.log(account.withdraw(200));\nconsole.log(account.applyInterest());\n\n// 4. Verify prototype inheritance:\nconsole.log(\"Is account an instance of SavingsAccount?:\", account instanceof SavingsAccount); // true\nconsole.log(\"Is account an instance of BankAccount?:\", account instanceof BankAccount);       // true\n"
  },
  "part6": {
    "title": "Key Takeaways: ES6 Classes",
    "takeaways": [
      {
        "title": "1. class Blueprint",
        "desc": "Pack constructor and shared methods into a single, clean declaration."
      },
      {
        "title": "2. The constructor()",
        "desc": "Runs on 'new ClassName()', initializing personal instance properties on this."
      },
      {
        "title": "3. Inheritance with extends",
        "desc": "Subclasses inherit all methods and getters from their parent class."
      },
      {
        "title": "4. super() Must Be First",
        "desc": "Child constructors must call super() before touching 'this' to set up the parent."
      },
      {
        "title": "5. Next Step: Asynchronous JS",
        "desc": "In Stage 6, we begin Asynchronous JavaScript: Event Loop, Promises, and async/await!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-20: Synchronous vs Asynchronous: Why JavaScript Never Freezes",
      "desc": "Learn how single-threaded JavaScript handles long tasks using timers, background Web APIs, and the event loop without freezing."
    }
  },
  "part7": {
    "title": "Knowledge Check: Classes & Inheritance",
    "quiz": {
      "question": "In a subclass constructor that uses 'extends', why must you call super() before accessing 'this'?",
      "options": [
        "super() is optional and only used for debug logging",
        "super() calls the parent constructor to initialize the instance foundation before 'this' can be accessed",
        "super() converts the class into an arrow function",
        "super() creates a background web worker thread"
      ],
      "correctIndex": 1,
      "explanation": "In JavaScript derived classes, instances are constructed by the parent constructor. Calling super() runs the parent constructor; attempting to access 'this' before super() throws a ReferenceError."
    }
  }
},

  "js20-synchronous-vs-asynchronous": {
  "slug": "js20-synchronous-vs-asynchronous",
  "code": "JS-20",
  "title": "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
  "subtitle": "Learn how single-threaded JavaScript handles long tasks using timers and background Web APIs without freezing the browser.",
  "sections": [
    {
      "id": "part1",
      "label": "Single-Thread Challenge",
      "icon": "⏳",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Web APIs & Timers",
      "icon": "🌐",
      "tag": "CONCEPTS"
    },
    {
      "id": "part3",
      "label": "Execution Timeline",
      "icon": "⏱️",
      "tag": "TIMELINE"
    },
    {
      "id": "part4",
      "label": "UI Freezing Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Async Playground",
      "icon": "💻",
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
    "title": "Blocking vs Non-Blocking: The Single-Thread Challenge",
    "bigPicture": "JavaScript is single-threaded, meaning it can only execute one line of code at a time on its main thread. That same single thread is also responsible for rendering the webpage, animating buttons, and responding to mouse clicks! If JavaScript were strictly synchronous, every time you fetched data or waited for a timer, the entire browser would freeze completely. Asynchronous JavaScript solves this by offloading waiting tasks to the browser background while your code continues running smoothly.",
    "breakdownTitle": "Core Concepts of Asynchronous JavaScript:",
    "breakdownItems": [
      {
        "title": "Synchronous Blocking",
        "desc": "Each line waits for the previous line to finish. Heavy calculations or waiting loops freeze the user interface."
      },
      {
        "title": "Asynchronous Non-Blocking",
        "desc": "Tasks that require waiting (like network requests or timers) are delegated to background browser APIs."
      },
      {
        "title": "Timers with setTimeout()",
        "desc": "Schedules a callback function to run after a specified delay, allowing all immediate code to run first."
      }
    ]
  },
  "part2": {
    "title": "Web APIs & Background Waiting: The Coffee Shop Analogy",
    "intro": "How the browser runtime handles waiting tasks in the background:",
    "cards": [
      {
        "number": "01",
        "tag": "Blocking",
        "title": "Synchronous Line",
        "description": "Imagine a barista who takes your order, stares at the coffee machine for 5 minutes, and refuses to speak to anyone else until it finishes. Everyone waits!",
        "color": "rose"
      },
      {
        "number": "02",
        "tag": "Non-Blocking",
        "title": "Asynchronous Buzzer",
        "description": "The barista takes your order, hands you a buzzer, and immediately serves the next customer. When your coffee is ready, your buzzer rings!",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Scheduler",
        "title": "setTimeout(callback, ms)",
        "description": "Hands the timer to the browser's Web APIs to count down in the background, keeping JavaScript's main thread free and responsive.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Non-Blocking Code",
      "content": "Never write synchronous busy-waiting loops (e.g., while (Date.now() < target)) to simulate delays! Busy-waiting locks JavaScript's single thread and completely freezes the user's screen. Always use setTimeout() or Promises."
    }
  },
  "part3": {
    "title": "The Asynchronous Execution Timeline",
    "intro": "Why setTimeout(fn, 0) runs AFTER all synchronous statements complete:",
    "points": [
      {
        "title": "1. The Call Stack Finishes First",
        "content": "JavaScript will always execute every synchronous line in your script from top to bottom before it even checks for completed background timers."
      },
      {
        "title": "2. The Zero-Delay Timer (setTimeout(fn, 0))",
        "content": "A delay of 0ms does NOT mean 'run right now'. It means 'hand this to the browser and run it as soon as all current synchronous code has finished'."
      },
      {
        "title": "3. UI Smoothness & Responsiveness",
        "content": "Because background operations don't block the thread, user clicks, typing, and CSS animations continue running at a smooth 60 frames per second."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Trying to Pause JavaScript with Busy-Wait Loops",
    "bad": {
      "title": "❌ Bad: Using a while loop to pause, freezing the entire webpage",
      "code": "console.log(\"Starting order...\");\n\n// Catastrophic bug: Locks the single thread for 3 seconds!\nconst end = Date.now() + 3000;\nwhile (Date.now() < end) {\n  // Page is totally frozen: buttons cannot be clicked, animations stop!\n}\n\nconsole.log(\"Order ready!\");",
      "explanation": "A synchronous while loop starves the single thread, freezing the user's browser tab completely for 3 seconds."
    },
    "good": {
      "title": "✅ Clean: Non-blocking setTimeout allowing the page to remain interactive",
      "code": "console.log(\"1. Order placed with barista\");\n\n// Clean: Hands the timer to Web APIs and moves on immediately!\nsetTimeout(() => {\n  console.log(\"3. Buzzer rings: Coffee is ready! ☕\");\n}, 1000);\n\nconsole.log(\"2. Customer sits down, reads news, UI stays responsive\");",
      "explanation": "Using setTimeout lets the browser count down in the background while the user interface stays silky smooth."
    }
  },
  "part5": {
    "title": "Async Execution Playground",
    "intro": "Observe execution order between synchronous code and background timers, even with a 0ms delay:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-20: SYNCHRONOUS VS ASYNCHRONOUS PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconsole.log(\"🏁 Step 1: Program starts (Synchronous)\");\n\n// Schedule an async callback with 500ms delay:\nsetTimeout(() => {\n  console.log(\"⏰ Step 4: Timer finished after 500ms (Asynchronous)\");\n}, 500);\n\n// Schedule an async callback with 0ms delay:\nsetTimeout(() => {\n  console.log(\"⏱️ Step 3: Zero-delay timer callback executed!\");\n}, 0);\n\nconsole.log(\"🚀 Step 2: Next synchronous line runs immediately!\");\n\n// Notice that Step 2 runs BEFORE Step 3 and Step 4,\n// because all synchronous code on the call stack runs to completion first!\n"
  },
  "part6": {
    "title": "Key Takeaways: Synchronous vs Asynchronous",
    "takeaways": [
      {
        "title": "1. Single-Threaded Runtime",
        "desc": "JavaScript has one main thread that handles both code execution and UI rendering."
      },
      {
        "title": "2. Non-Blocking Web APIs",
        "desc": "Slow tasks like timers and HTTP calls are handled by the browser environment in the background."
      },
      {
        "title": "3. Synchronous Priority",
        "desc": "All synchronous code runs to completion before background timer callbacks are executed."
      },
      {
        "title": "4. Next Step: Promises",
        "desc": "In JS-21, we learn how Promises tame asynchronous callbacks and handle future values cleanly!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-21: Promises: Managing Future Values with .then() & .catch()",
      "desc": "Master Promise states (Pending, Fulfilled, Rejected), flat method chaining with .then(), and centralized error handling with .catch()."
    }
  },
  "part7": {
    "title": "Knowledge Check: Synchronous vs Asynchronous",
    "quiz": {
      "question": "Why does JavaScript use asynchronous operations for network requests and timers?",
      "options": [
        "Because computers cannot calculate math without pausing",
        "To prevent freezing the single-threaded UI and keep web pages interactive",
        "To slow down the browser deliberately",
        "Because JavaScript does not have variables"
      ],
      "correctIndex": 1,
      "explanation": "Because JavaScript runs on a single main thread, asynchronous execution prevents long-running operations (like network requests or timers) from freezing the user interface."
    }
  }
},

  "js21-promises-and-chaining": {
  "slug": "js21-promises-and-chaining",
  "code": "JS-21",
  "title": "Promises: Managing Future Values with .then() & .catch()",
  "subtitle": "Master Promise states (Pending, Fulfilled, Rejected), flat method chaining with .then(), and centralized error handling with .catch().",
  "sections": [
    {
      "id": "part1",
      "label": "Future Guarantees",
      "icon": "🤝",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "The 3 States",
      "icon": "🚥",
      "tag": "STATES"
    },
    {
      "id": "part3",
      "label": "Chaining & Recovery",
      "icon": "🔗",
      "tag": "CHAINING"
    },
    {
      "id": "part4",
      "label": "Callback Hell Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Promises Playground",
      "icon": "💻",
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
    "title": "Promises: Guarantees for Future Values",
    "bigPicture": "In early JavaScript, handling asynchronous results required passing callbacks inside callbacks. When you had several steps in a row, this created a deeply indented, unreadable mess called 'Callback Hell'. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation. Think of a Promise like a restaurant buzzer: while your meal is cooking, you hold the buzzer. When your food is ready, the buzzer buzzes with your meal. If the kitchen burns your food, the buzzer flashes an error!",
    "breakdownTitle": "Core Concepts of JavaScript Promises:",
    "breakdownItems": [
      {
        "title": "The 3 Promise States",
        "desc": "A Promise starts Pending, and eventually settles into either Fulfilled (success with data) or Rejected (failure with an error)."
      },
      {
        "title": ".then() for Success",
        "desc": "Attaches a callback that runs when the Promise is fulfilled, receiving the resolved data."
      },
      {
        "title": ".catch() for Error Handling",
        "desc": "A single .catch() at the end of a chain catches any error that occurred in any previous step."
      }
    ]
  },
  "part2": {
    "title": "The 3 Promise States: Pending, Fulfilled, Rejected",
    "intro": "Understanding how a Promise transitions from waiting to holding a final value or error:",
    "cards": [
      {
        "number": "01",
        "tag": "Waiting",
        "title": "Pending",
        "description": "The asynchronous task is still working in the background. The promise has not produced a value or error yet.",
        "color": "cyan"
      },
      {
        "number": "02",
        "tag": "Success",
        "title": "Fulfilled (Resolved)",
        "description": "The task finished successfully! The promise now permanently holds the resolved data, delivered to .then().",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Failure",
        "title": "Rejected (Failed)",
        "description": "An error occurred. The promise permanently holds the error reason, delivered to .catch().",
        "color": "rose"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Promise States",
      "content": "A Promise can only settle ONCE! Once a Promise moves from Pending to Fulfilled or Rejected, its state and value are permanently locked and cannot change."
    }
  },
  "part3": {
    "title": "Method Chaining with .then() and Centralized .catch()",
    "intro": "Chaining sequential asynchronous tasks in a flat, readable pipeline:",
    "points": [
      {
        "title": "1. Returning Values in .then()",
        "content": "Whatever value you return from a .then() callback is automatically wrapped in a new resolved Promise and passed to the next .then() in the chain."
      },
      {
        "title": "2. Returning Promises to Flatten Chains",
        "content": "If you return another Promise inside a .then(), JavaScript waits for that inner Promise to finish before moving to the next .then(). This eliminates nested pyramids!"
      },
      {
        "title": "3. .finally() for Cleanup",
        "content": "Use .finally(() => {}) to run cleanup code (like turning off a loading spinner) regardless of whether the operation succeeded or failed."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Callback Hell vs Clean Promise Chaining",
    "bad": {
      "title": "❌ Bad: Callback Hell (Pyramid of Doom) with nested callbacks",
      "code": "// The Callback Hell Pyramid:\nfetchUser(101, (user) => {\n  fetchOrders(user.id, (orders) => {\n    fetchReceipt(orders[0].id, (receipt) => {\n      console.log(\"Receipt:\", receipt); // Deeply indented, hard to handle errors!\n    }, (err) => console.error(err));\n  }, (err) => console.error(err));\n}, (err) => console.error(err));",
      "explanation": "Nesting multiple callbacks inside callbacks makes code difficult to read, impossible to debug, and requires duplicating error handlers at every layer."
    },
    "good": {
      "title": "✅ Clean: Linear Promise chaining with centralized error handling",
      "code": "// Flat, readable chain:\nfetchUser(101)\n  .then((user) => fetchOrders(user.id))\n  .then((orders) => fetchReceipt(orders[0].id))\n  .then((receipt) => {\n    console.log(\"Receipt total:\", receipt.amount);\n  })\n  .catch((error) => {\n    // Catches errors from ANY of the steps above!\n    console.error(\"Order processing failed:\", error.message);\n  })\n  .finally(() => {\n    console.log(\"Transaction flow finished.\");\n  });",
      "explanation": "Promise chaining keeps every asynchronous step flat and linear, with a single .catch() guarding the entire sequence."
    }
  },
  "part5": {
    "title": "Promises Playground",
    "intro": "Create a custom Promise with resolve and reject, transform data through .then(), and catch simulated errors:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-21: PROMISES PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Create a function returning a Promise:\nfunction fetchProductDetails(productId) {\n  return new Promise((resolve, reject) => {\n    console.log(`⏳ Fetching details for product #${productId}...`);\n    setTimeout(() => {\n      if (productId > 0) {\n        resolve({ id: productId, name: \"Mechanical Keyboard\", price: 120 });\n      } else {\n        reject(new Error(\"Invalid product ID: must be greater than 0\"));\n      }\n    }, 300);\n  });\n}\n\n// 2. Consume the Promise chain:\nfetchProductDetails(42)\n  .then((product) => {\n    console.log(\"📦 Product fetched:\", product.name);\n    // Transform data: calculate price with 10% discount:\n    const discountedPrice = product.price * 0.9;\n    return { ...product, discountedPrice };\n  })\n  .then((updatedProduct) => {\n    console.log(`💰 Discounted price: $${updatedProduct.discountedPrice}`);\n  })\n  .catch((err) => {\n    console.error(\"❌ An error occurred:\", err.message);\n  })\n  .finally(() => {\n    console.log(\"🏁 Product request completed.\");\n  });\n\n// 3. Test rejection by passing an invalid ID:\nfetchProductDetails(-1)\n  .catch((err) => console.log(\"Caught expected error:\", err.message));\n"
  },
  "part6": {
    "title": "Key Takeaways: Promises",
    "takeaways": [
      {
        "title": "1. Three States",
        "desc": "Pending -> permanently settles into Fulfilled or Rejected."
      },
      {
        "title": "2. Flat .then() Chains",
        "desc": "Return values or inner Promises to chain steps linearly without nesting."
      },
      {
        "title": "3. Centralized .catch()",
        "desc": "One .catch() at the end captures errors from any step in the chain."
      },
      {
        "title": "4. Guaranteed .finally()",
        "desc": "Runs cleanup code regardless of success or rejection."
      },
      {
        "title": "5. Next Step: Async/Await",
        "desc": "In JS-22, we learn the modern async/await syntax to write asynchronous code that reads like synchronous code!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-22: Async/Await: Clean Asynchronous Workflows",
      "desc": "Write asynchronous code that reads cleanly like synchronous code using async, await, try/catch, and parallel Promise.all()."
    }
  },
  "part7": {
    "title": "Knowledge Check: Promises",
    "quiz": {
      "question": "Which method is used to catch errors in a Promise chain?",
      "options": [
        ".onError()",
        ".catch()",
        ".fail()",
        ".except()"
      ],
      "correctIndex": 1,
      "explanation": "The .catch() method is used in Promise chains to capture any errors or rejections that occur in earlier steps."
    }
  }
},

  "js22-async-await": {
  "slug": "js22-async-await",
  "code": "JS-22",
  "title": "Async/Await: Clean Asynchronous Workflows",
  "subtitle": "Write asynchronous code that reads cleanly like synchronous code using async, await, try/catch, and parallel Promise.all().",
  "sections": [
    {
      "id": "part1",
      "label": "Clean Async Code",
      "icon": "✨",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "await & try/catch",
      "icon": "🛡️",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Parallel with Promise.all",
      "icon": "⚡",
      "tag": "PARALLEL"
    },
    {
      "id": "part4",
      "label": "Waterfall Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Async/Await Playground",
      "icon": "💻",
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
    "title": "Async/Await: The Cleanest Way to Work with Promises",
    "bigPicture": "While Promises solved callback hell, chaining lots of .then() handlers can still look foreign and verbose. ES2017 introduced async and await: special keywords that let you write asynchronous code that reads and feels exactly like ordinary synchronous code! Think of await like setting an oven timer: you pause in the recipe until the timer dings, but other kitchen helpers keep prepping without freezing the kitchen.",
    "breakdownTitle": "Core Concepts of Async/Await:",
    "breakdownItems": [
      {
        "title": "The async Keyword",
        "desc": "Marking a function as 'async' guarantees that it automatically returns a Promise."
      },
      {
        "title": "The await Keyword",
        "desc": "Pauses the execution of the async function until the Promise settles, unwrapping its value directly into a variable."
      },
      {
        "title": "Standard try / catch",
        "desc": "Handle asynchronous errors using standard, familiar try/catch blocks instead of chaining .catch()."
      }
    ]
  },
  "part2": {
    "title": "Unwrapping Values with await and Guarding with try/catch",
    "intro": "How await unwraps resolved values and converts rejections into catchable exceptions:",
    "cards": [
      {
        "number": "01",
        "tag": "Declaration",
        "title": "async function () {}",
        "description": "Any value returned by an async function is automatically wrapped in a resolved Promise (return 42 -> Promise.resolve(42)).",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Unwrap",
        "title": "const data = await promise",
        "description": "Pauses only the local async function until the promise resolves. The main thread and UI stay responsive!",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Safety",
        "title": "try { } catch (error) { }",
        "description": "If an awaited Promise rejects, JavaScript throws an exception directly into the surrounding catch block.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of await",
      "content": "You can only use the await keyword inside an async function (or at the top level of ES modules). Using await inside a standard function throws a SyntaxError!"
    }
  },
  "part3": {
    "title": "Parallel Execution with Promise.all()",
    "intro": "Running independent asynchronous tasks simultaneously instead of one by one:",
    "points": [
      {
        "title": "1. The Async Waterfall Problem",
        "content": "If you write const a = await getA(); const b = await getB(); and task B doesn't depend on A, task B is waiting needlessly. If each takes 1 second, your app takes 2 seconds total!"
      },
      {
        "title": "2. Parallel Execution with Promise.all()",
        "content": "const [a, b] = await Promise.all([getA(), getB()]); starts both tasks at the exact same moment. If each takes 1 second, the total time is only 1 second!"
      },
      {
        "title": "3. Top-Level Await in ES Modules",
        "content": "In modern JavaScript files using ES modules, you can use await directly at the top level of the file without wrapping it in an async function."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: The Sequential Waterfall Trap",
    "bad": {
      "title": "❌ Bad: Awaiting independent requests sequentially (slow waterfall)",
      "code": "async function loadDashboard() {\n  // Bug: Sequential waterfall! Takes 1s + 1s = 2 seconds total!\n  const users = await fetchUsers();     // Takes 1 second\n  const products = await fetchProducts(); // Takes 1 second (waits for users needlessly!)\n  return { users, products };\n}",
      "explanation": "Awaiting independent tasks one by one forces the second task to wait until the first finishes, needlessly doubling user waiting time."
    },
    "good": {
      "title": "✅ Clean: Running independent tasks concurrently with Promise.all",
      "code": "async function loadDashboard() {\n  try {\n    // Both requests fire simultaneously: takes only 1 second total!\n    const [users, products] = await Promise.all([\n      fetchUsers(),\n      fetchProducts()\n    ]);\n    return { users, products };\n  } catch (error) {\n    console.error(\"Dashboard failed to load:\", error.message);\n  }\n}",
      "explanation": "Promise.all fires both network calls in parallel, cutting total waiting time in half while catching any errors cleanly."
    }
  },
  "part5": {
    "title": "Async/Await Playground",
    "intro": "Write clean async functions, unwrap simulated database responses with await, and benchmark serial vs parallel workflows:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-22: ASYNC / AWAIT PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Simulated asynchronous network services:\nfunction fetchUserProfile(userId) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ id: userId, username: \"dev_sara\", role: \"Engineer\" }), 200);\n  });\n}\n\nfunction fetchUserProjects(userId) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve([\"LearnCraft App\", \"AI Chat Engine\"]), 200);\n  });\n}\n\n// 1. Clean async/await workflow with try/catch:\nasync function loadUserData(userId) {\n  console.log(\"⏳ Fetching user data...\");\n  try {\n    // Run both independent requests in parallel:\n    const [user, projects] = await Promise.all([\n      fetchUserProfile(userId),\n      fetchUserProjects(userId)\n    ]);\n\n    console.log(\"👤 User loaded:\", user.username, `(${user.role})`);\n    console.log(\"📁 Projects loaded:\", projects.join(\", \"));\n\n    return { user, projects };\n  } catch (error) {\n    console.error(\"❌ Failed to load user data:\", error.message);\n  }\n}\n\n// 2. Invoke the async function:\nloadUserData(101).then((result) => {\n  console.log(\"🎉 Complete result ready:\", result !== undefined);\n});\n"
  },
  "part6": {
    "title": "Key Takeaways: Async/Await",
    "takeaways": [
      {
        "title": "1. Linear Readability",
        "desc": "Write asynchronous code that reads like clean synchronous statements."
      },
      {
        "title": "2. Automatic Promise Return",
        "desc": "Any async function automatically wraps its return value in a Promise."
      },
      {
        "title": "3. try/catch Error Handling",
        "desc": "Awaited rejections become thrown exceptions caught by standard try/catch."
      },
      {
        "title": "4. Parallel with Promise.all",
        "desc": "Never await independent tasks in sequence; fire them concurrently with Promise.all."
      },
      {
        "title": "5. Next Step: The Event Loop",
        "desc": "In JS-23, we look under the hood to see how the Call Stack and Task Queues prioritize execution!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-23: The Event Loop: Call Stack & Task Queues",
      "desc": "Understand execution priority under the hood: the Call Stack, VIP Microtasks (Promises), and Macrotasks (Timers)."
    }
  },
  "part7": {
    "title": "Knowledge Check: Async/Await",
    "quiz": {
      "question": "What does an 'async' function ALWAYS return in JavaScript?",
      "options": [
        "A plain string",
        "A Promise (automatically wrapping the returned value)",
        "undefined only",
        "A generator object"
      ],
      "correctIndex": 1,
      "explanation": "Every async function automatically returns a Promise. If the function returns a non-promise value (e.g. return 42), JavaScript wraps it in a resolved Promise automatically."
    }
  }
},

  "js23-the-event-loop": {
  "slug": "js23-the-event-loop",
  "code": "JS-23",
  "title": "The Event Loop: Call Stack & Task Queues",
  "subtitle": "Understand execution priority under the hood: the Call Stack, VIP Microtasks (Promises), and Macrotasks (Timers).",
  "sections": [
    {
      "id": "part1",
      "label": "The Airport Runway",
      "icon": "🛫",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Queue Priorities",
      "icon": "📊",
      "tag": "PRIORITIES"
    },
    {
      "id": "part3",
      "label": "Microtasks vs Timers",
      "icon": "⏱️",
      "tag": "EXECUTION"
    },
    {
      "id": "part4",
      "label": "Order Traps",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Event Loop Playground",
      "icon": "💻",
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
    "title": "The Event Loop: Coordinating JavaScript's Single Thread",
    "bigPicture": "You now know that JavaScript is single-threaded and handles async code without freezing. But how does JavaScript decide what runs next when a timer finishes and a Promise resolves at the exact same moment? The Event Loop is the traffic controller that coordinates the Call Stack, the Microtask Queue, and the Macrotask Queue. Think of an airport runway: the Call Stack is the active runway. Microtasks (Promises) are VIP first-class passengers who board immediately. Macrotasks (Timers) wait in general boarding.",
    "breakdownTitle": "The Three Stations of the Event Loop:",
    "breakdownItems": [
      {
        "title": "The Call Stack (Synchronous)",
        "desc": "Executes synchronous code one frame at a time. The runway must be 100% empty before anything else can run."
      },
      {
        "title": "The Microtask Queue (VIP Priority)",
        "desc": "Contains Promise callbacks (.then, .catch, await). Whenever the stack empties, ALL pending microtasks are drained immediately."
      },
      {
        "title": "The Macrotask Queue (General Priority)",
        "desc": "Contains timer callbacks (setTimeout, setInterval). Dequeues one task at a time only after all microtasks have cleared."
      }
    ]
  },
  "part2": {
    "title": "Call Stack, Microtasks & Macrotasks: The Strict Priority Rule",
    "intro": "Understanding the exact priority rules governing what code runs next:",
    "cards": [
      {
        "number": "01",
        "tag": "Priority 1",
        "title": "Call Stack (Sync)",
        "description": "Runs all synchronous statements from top to bottom. Nothing from any queue can run until the Call Stack is completely clear.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Priority 2",
        "title": "Microtasks (Promises)",
        "description": "Promise callbacks (.then, .catch, await). Whenever the Call Stack empties, the engine drains ALL microtasks to zero before moving on.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Priority 3",
        "title": "Macrotasks (Timers)",
        "description": "setTimeout and setInterval callbacks. One macrotask is processed per turn of the event loop, after microtasks are cleared.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Event Loop Order",
      "content": "Promise callbacks (Microtasks) ALWAYS run before setTimeout callbacks (Macrotasks), even if the setTimeout delay is set to 0 milliseconds!"
    }
  },
  "part3": {
    "title": "Execution Order: Why Promises Run Before Timers",
    "intro": "Tracing step-by-step why a resolved Promise callback fires before setTimeout(fn, 0):",
    "points": [
      {
        "title": "1. The Call Stack Empties",
        "content": "Synchronous statements (console.log) run first on the Call Stack. While running, any Promises schedule microtasks, and timers schedule macrotasks."
      },
      {
        "title": "2. Microtask Queue Drains Completely",
        "content": "As soon as the last synchronous line finishes, the Event Loop visits the Microtask Queue and runs every single waiting Promise callback."
      },
      {
        "title": "3. Macrotask Queue Executes",
        "content": "Only after the Call Stack is empty AND the Microtask Queue has 0 items waiting does the Event Loop pick up the next timer callback."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Misunderstanding setTimeout(fn, 0) Order",
    "bad": {
      "title": "❌ Bad: Assuming setTimeout(fn, 0) runs immediately between logs",
      "code": "console.log(\"1\");\n// Buggy assumption: Believing \"2\" will run immediately because delay is 0ms:\nsetTimeout(() => console.log(\"2\"), 0);\nconsole.log(\"3\");\n\n// Expected by confused beginner: 1 -> 2 -> 3\n// Actual output: 1 -> 3 -> 2!",
      "explanation": "Even with a 0-millisecond delay, setTimeout puts the callback into the Macrotask Queue. It cannot run until all synchronous code finishes."
    },
    "good": {
      "title": "✅ Clean: Predictable coordination between stack, microtasks, and macrotasks",
      "code": "console.log(\"1. Synchronous Stack Start\");\n\nsetTimeout(() => {\n  console.log(\"4. Macrotask (setTimeout 0ms)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3. Microtask (Promise.then - VIP!)\");\n});\n\nconsole.log(\"2. Synchronous Stack End\");\n\n// Output Order:\n// 1. Synchronous Stack Start\n// 2. Synchronous Stack End\n// 3. Microtask (Promise.then - VIP!)\n// 4. Macrotask (setTimeout 0ms)",
      "explanation": "Synchronous code runs first (1, 2). Then VIP microtasks drain (3). Finally, the macrotask timer runs (4)."
    }
  },
  "part5": {
    "title": "Event Loop Priority Playground",
    "intro": "Mix synchronous logs, setTimeout timers, and Promise.resolve to observe the exact microtask drain order:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-23: THE EVENT LOOP PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconsole.log(\"1️⃣ Synchronous: Call stack line 1\");\n\n// Macrotask (Timer):\nsetTimeout(() => {\n  console.log(\"4️⃣ Macrotask: setTimeout 0ms executed (General boarding)\");\n}, 0);\n\n// Microtask (Promise):\nPromise.resolve().then(() => {\n  console.log(\"3️⃣ Microtask: Promise.then executed (VIP First-Class boarding!)\");\n});\n\nconsole.log(\"2️⃣ Synchronous: Call stack line 2\");\n\n// Step-by-step trace:\n// 1. \"1️⃣\" and \"2️⃣\" execute immediately on the active Call Stack.\n// 2. Call Stack becomes empty -> Event Loop checks Microtask Queue.\n// 3. Microtask Queue drains -> logs \"3️⃣\".\n// 4. Microtask Queue is empty -> Event Loop dequeues Macrotask -> logs \"4️⃣\".\n"
  },
  "part6": {
    "title": "Key Takeaways: The Event Loop",
    "takeaways": [
      {
        "title": "1. Call Stack First",
        "desc": "All synchronous code runs to completion before any queued callbacks can execute."
      },
      {
        "title": "2. Microtasks Drain Next",
        "desc": "Promise handlers (.then, .catch, await) have VIP priority over timers."
      },
      {
        "title": "3. Macrotasks Run Last",
        "desc": "Timers (setTimeout, setInterval) wait until both stack and microtasks are clear."
      },
      {
        "title": "4. The 0ms Reality",
        "desc": "setTimeout(fn, 0) schedules a macrotask; it never interrupts synchronous code."
      },
      {
        "title": "5. Next Step: Errors, Modules & APIs",
        "desc": "In Stage 7, we master Error Handling, ES Modules, and the Fetch API!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-24: Error Handling: try, catch, finally & throw",
      "desc": "Prevent crashes using try/catch/finally, throw custom errors, and inspect error messages."
    }
  },
  "part7": {
    "title": "Knowledge Check: The Event Loop",
    "quiz": {
      "question": "In what exact order will these execute? (A: setTimeout 0ms, B: Synchronous log, C: Promise.resolve().then)",
      "options": [
        "A -> B -> C",
        "B -> C -> A",
        "C -> B -> A",
        "B -> A -> C"
      ],
      "correctIndex": 1,
      "explanation": "Synchronous code (B) executes first on the call stack. Once the stack is empty, microtasks (C: Promise.then) execute before macrotasks (A: setTimeout 0ms)."
    }
  }
},

  "js24-error-handling": {
  "slug": "js24-error-handling",
  "code": "JS-24",
  "title": "Error Handling: try, catch, finally & throw",
  "subtitle": "Protect web applications from crashes using try, catch, finally, and create intentional exceptions with throw.",
  "sections": [
    {
      "id": "part1",
      "label": "The Safety Net",
      "icon": "🛡️",
      "tag": "CRASH DEFENSE"
    },
    {
      "id": "part2",
      "label": "try, catch & finally",
      "icon": "🧯",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Execution Mental Model",
      "icon": "🧠",
      "tag": "FLOW"
    },
    {
      "id": "part4",
      "label": "Swallowed Errors Trap",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Error Sandbox",
      "icon": "💻",
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
    "title": "The Trapeze Safety Net: Why Programs Must Handle Failure",
    "bigPicture": "When JavaScript encounters an unhandled runtime mistake—like accessing a property on undefined or receiving corrupted data—it panics and abruptly terminates the entire script! In a browser, that means buttons stop working, animations freeze, and users see a broken screen. Structured error handling is your safety net: it intercepts the failure before it kills your app, giving you the chance to log what went wrong, alert the user politely, and keep the application alive.",
    "breakdownTitle": "Four Pillars of Error Handling:",
    "breakdownItems": [
      {
        "title": "The try Block",
        "desc": "Wraps code that might fail (like parsing external JSON or requesting server data) so errors can be intercepted."
      },
      {
        "title": "The catch Block",
        "desc": "Acts as the safety net; it only executes if an error occurs inside try, receiving the error object for inspection."
      },
      {
        "title": "The finally Block",
        "desc": "Guaranteed to run after try and catch finish, regardless of whether an error occurred. Ideal for cleanup."
      },
      {
        "title": "The throw Statement",
        "desc": "Allows you to manually trigger an error when custom business rules are violated (e.g., negative bank balance)."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: try, catch, finally & Custom Errors",
    "intro": "Master the syntax and tools JavaScript provides to catch and create errors:",
    "cards": [
      {
        "number": "01",
        "tag": "The Net",
        "title": "try...catch(err)",
        "description": "Runs risky code in try. If an exception is thrown, execution immediately jumps into catch without crashing the thread.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "The Cleanup",
        "title": "The finally Block",
        "description": "Always executes no matter what. Perfect for hiding loading spinners, closing database connections, or resetting flags.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Custom Errors",
        "title": "throw new Error(msg)",
        "description": "Creates and triggers an intentional Error instance complete with a descriptive message and line-numbered stack trace.",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Error Objects",
      "content": "Always throw an instance of the Error class (throw new Error('Something went wrong')) rather than primitive strings or numbers (throw 'bad'). The Error object automatically captures the exact call stack, file name, and line number where the problem occurred."
    }
  },
  "part3": {
    "title": "The Execution Mental Model: How Control Transfers",
    "intro": "Understand exactly how JavaScript navigates between try, catch, and finally:",
    "points": [
      {
        "title": "1. The Smooth Swing (No Errors)",
        "content": "Code inside try runs line-by-line. If no errors occur, the catch block is completely skipped, and execution glides directly into finally (if present) before continuing onward."
      },
      {
        "title": "2. The Slip (Error Thrown)",
        "content": "The moment an error is thrown inside try, execution immediately abandons the rest of the try block! JavaScript teleports instantly into catch, passing the Error object."
      },
      {
        "title": "3. The Unbreakable Guarantee (finally)",
        "content": "Whether try succeeds smoothly or catch recovers from an explosion, the finally block ALWAYS executes before any subsequent code outside the try/catch statement runs."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Swallowing Errors Silently (The Blindfold Trap)",
    "bad": {
      "title": "❌ Bad: Empty catch block hiding bugs and leaving developers blind",
      "code": "function loadUserProfile(userId) {\n  try {\n    const profile = fetchProfileFromDatabase(userId);\n    renderProfile(profile);\n  } catch (err) {\n    // Catastrophic anti-pattern: Silently swallowed!\n    // When users report a blank screen, there are ZERO console errors,\n    // ZERO logs, and no hint of what went wrong.\n  }\n}",
      "explanation": "Leaving catch empty swallows the error into a black hole. Bugs remain hidden, making production debugging almost impossible."
    },
    "good": {
      "title": "✅ Clean: Logging diagnostic details, alerting the user, and guaranteed cleanup",
      "code": "function loadUserProfile(userId) {\n  setLoadingState(true);\n  try {\n    const profile = fetchProfileFromDatabase(userId);\n    renderProfile(profile);\n  } catch (err) {\n    console.error(\"Failed to load user profile:\", err.message);\n    displayUserNotice(\"Could not load your profile. Please refresh or try again later.\");\n  } finally {\n    // Guaranteed to turn off the loading spinner whether fetch succeeded or failed!\n    setLoadingState(false);\n  }\n}",
      "explanation": "The error is logged for diagnostics, the user receives clear feedback, and the UI spinner is guaranteed to turn off in finally."
    }
  },
  "part5": {
    "title": "Error Handling Playground",
    "intro": "Experiment with throwing custom errors, catching exceptions, and observing the unconditional finally block:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-24: ERROR HANDLING PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst bankAccount = {\n  owner: \"Alex Rivera\",\n  balance: 350,\n  isProcessing: true\n};\n\nfunction withdrawFunds(account, amount) {\n  console.log(`\\nAttempting withdrawal of $${amount}...`);\n  \n  try {\n    // 1. Validate amount\n    if (typeof amount !== \"number\" || amount <= 0) {\n      throw new Error(\"Withdrawal amount must be a positive number.\");\n    }\n\n    // 2. Check sufficient balance\n    if (amount > account.balance) {\n      throw new Error(`Insufficient funds: requested $${amount}, but balance is only $${account.balance}.`);\n    }\n\n    // 3. Process transaction\n    account.balance -= amount;\n    console.log(`✅ Withdrawal approved! New balance: $${account.balance}`);\n  } catch (error) {\n    console.error(`❌ Transaction rejected: ${error.message}`);\n  } finally {\n    account.isProcessing = false;\n    console.log(\"🔒 Transaction closed: processing flag reset to false.\");\n  }\n}\n\n// Test 1: Valid withdrawal\nwithdrawFunds(bankAccount, 100);\n\n// Test 2: Overdraft attempt (triggers custom error!)\nwithdrawFunds(bankAccount, 500);\n\n// Test 3: Invalid input type\nwithdrawFunds(bankAccount, -25);\n"
  },
  "part6": {
    "title": "Key Takeaways: Error Handling",
    "takeaways": [
      {
        "title": "1. The try/catch Safety Net",
        "desc": "Enclose operations that might fail inside try; if an error occurs, catch intercepts it before the script crashes."
      },
      {
        "title": "2. The finally Block Always Runs",
        "desc": "Guaranteed to execute whether an error occurred or not; ideal for turning off spinners and closing resources."
      },
      {
        "title": "3. Never Swallow Errors Silently",
        "desc": "Avoid empty catch blocks; always log diagnostic information or notify the user so bugs can be resolved."
      },
      {
        "title": "4. Throw Real Error Objects",
        "desc": "Use throw new Error('message') so your exceptions include full stack trace and line number information."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-25: ES Modules: Organizing Code with import & export",
      "desc": "Organize large JavaScript applications into isolated, reusable module files using named exports, default exports, and import statements."
    }
  },
  "part7": {
    "title": "Knowledge Check: Error Handling",
    "quiz": {
      "question": "What is guaranteed about code placed inside a 'finally' block?",
      "options": [
        "It only runs if an error was caught inside the catch block",
        "It always executes after try and catch, regardless of whether an error was thrown",
        "It executes before the try block starts",
        "It causes the browser to reload the page automatically"
      ],
      "correctIndex": 1,
      "explanation": "The finally block is guaranteed to run after the try (and catch, if an error occurred) block completes, regardless of the outcome."
    }
  }
},

  "js25-es-modules": {
  "slug": "js25-es-modules",
  "code": "JS-25",
  "title": "ES Modules: Organizing Code with import & export",
  "subtitle": "Organize modern codebases into isolated, reusable files using named exports, default exports, and import statements.",
  "sections": [
    {
      "id": "part1",
      "label": "Lego Brick Architecture",
      "icon": "🧱",
      "tag": "ARCHITECTURE"
    },
    {
      "id": "part2",
      "label": "Named vs Default Exports",
      "icon": "📦",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Module Mental Model",
      "icon": "🧠",
      "tag": "SCOPES"
    },
    {
      "id": "part4",
      "label": "Monolith vs Modular",
      "icon": "⚖️",
      "tag": "BEST PRACTICES"
    },
    {
      "id": "part5",
      "label": "Modules Playground",
      "icon": "💻",
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
    "title": "The Lego Brick Architecture: Why Code Must Be Modular",
    "bigPicture": "In early JavaScript, every script shared one massive global scope (the window object). If script A defined let total = 10 and script B also defined let total = 20, they collided, overwrote each other's data, and broke the website! ES Modules (ESM) solve this by treating every JavaScript file as an isolated module. Variables declared inside a file stay private to that file unless you explicitly export them, and other files must explicitly import only what they need.",
    "breakdownTitle": "Four Pillars of ES Modules:",
    "breakdownItems": [
      {
        "title": "File-Level Scope Isolation",
        "desc": "Variables in an ES module do not pollute the global scope. Multiple files can share variable names safely."
      },
      {
        "title": "Named Exports (export const x)",
        "desc": "Export multiple values from a single file by name; imported using matching curly braces { x }."
      },
      {
        "title": "Default Exports (export default x)",
        "desc": "Export the primary entity of a file; imported without curly braces and can be renamed freely."
      },
      {
        "title": "Static Top-Level Imports",
        "desc": "Import statements are resolved before code execution starts, enabling bundlers to detect unused code (tree-shaking)."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: Named Exports, Default Exports & Aliases",
    "intro": "Learn the exact syntax for exporting and importing modular code:",
    "cards": [
      {
        "number": "01",
        "tag": "Named",
        "title": "export { a, b }",
        "description": "Used to export multiple utilities. Importers MUST use curly braces with exact matching names: import { a, b } from './file.js'.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Default",
        "title": "export default Component",
        "description": "One default export per file. Importers MUST NOT use curly braces and can choose any local identifier name.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Aliases",
        "title": "import { a as myA }",
        "description": "Rename imports using 'as' to prevent naming conflicts, or bundle all named exports with 'import * as Utils'.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Import Curly Braces",
      "content": "Named exports REQUIRE curly braces when importing (import { add } from './math.js'). Default exports MUST NOT use curly braces (import Calculator from './calc.js'). Mixing these two up is the single most common module error in web development."
    }
  },
  "part3": {
    "title": "The Module Mental Model: Private Vaults & Connectors",
    "intro": "How the browser and bundlers connect modular files together:",
    "points": [
      {
        "title": "1. The Private Vault",
        "content": "Think of every module file as an enclosed room with opaque walls. Everything declared inside is private by default. Only items marked with 'export' are visible through the doorway."
      },
      {
        "title": "2. Explicit Connectors",
        "content": "Files do not guess where functions come from. Every dependency is declared explicitly at the top of the file via import statements, making codebases self-documenting."
      },
      {
        "title": "3. Live Bindings, Not Copies",
        "content": "When you import a variable, you get a live link to the exported binding, not a disconnected snapshot. If the source module modifies its exported state, the importer sees the change."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Monolithic Global Dumping vs Clean Modules",
    "bad": {
      "title": "❌ Bad: Dumping all app logic into a massive 3,000-line global file",
      "code": "// everything.js - 3,000 lines of unrelated code\nfunction calculateTax() { /* ... */ }\nfunction renderCartTable() { /* ... */ }\nfunction validateCreditCard() { /* ... */ }\nfunction submitAnalyticsEvent() { /* ... */ }\n// All declared in one file or attached directly to window!\n// Hard to test, impossible to reuse, high risk of naming collisions.",
      "explanation": "Monolithic scripts pollute the global namespace, make automated testing nearly impossible, and prevent code reuse across projects."
    },
    "good": {
      "title": "✅ Clean: Focused single-responsibility modules with explicit imports",
      "code": "// tax.js - Pure mathematical calculation\nexport const TAX_RATE = 0.08;\nexport function calculateTax(subtotal) {\n  return subtotal * TAX_RATE;\n}\n\n// checkout.js - Composes clean, tested utilities\nimport { calculateTax, TAX_RATE } from './tax.js';\n\nexport function getOrderSummary(subtotal) {\n  const tax = calculateTax(subtotal);\n  return { subtotal, tax, total: subtotal + tax };\n}",
      "explanation": "Each module has one clear responsibility. Logic is easily unit-tested in isolation and imported only where needed."
    }
  },
  "part5": {
    "title": "ES Modules Playground",
    "intro": "Simulate a modular export and import pipeline with named utilities and a default checkout coordinator:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-25: ES MODULES SIMULATION PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Module 1: Simulated mathUtils.js\nconst mathUtils = {\n  // Named export 1: add\n  add(a, b) { return a + b; },\n  // Named export 2: multiply\n  multiply(a, b) { return a * b; },\n  // Named export 3: TAX_RATE constant\n  TAX_RATE: 0.075\n};\n\n// Module 2: Simulated cartService.js (with default export)\nconst cartService = {\n  // Default export: createReceipt\n  default: function createReceipt(items, taxRate) {\n    const subtotal = items.reduce((acc, item) => acc + item.price, 0);\n    const tax = subtotal * taxRate;\n    const total = subtotal + tax;\n    \n    return {\n      itemsCount: items.length,\n      subtotal: \"$\" + subtotal.toFixed(2),\n      tax: \"$\" + tax.toFixed(2),\n      total: \"$\" + total.toFixed(2)\n    };\n  }\n};\n\n// Simulated consumer: main.js\n// Destructure named exports (like: import { add, TAX_RATE } from './mathUtils.js')\nconst { add, multiply, TAX_RATE } = mathUtils;\n\n// Destructure default export (like: import createReceipt from './cartService.js')\nconst createReceipt = cartService.default;\n\n// Test the modular composition:\nconst shoppingCart = [\n  { name: \"Ergonomic Keyboard\", price: 129.99 },\n  { name: \"Vertical Mouse\", price: 65.50 }\n];\n\nconsole.log(\"Tax Rate:\", (TAX_RATE * 100).toFixed(1) + \"%\");\nconsole.log(\"Receipt Summary:\", createReceipt(shoppingCart, TAX_RATE));\n"
  },
  "part6": {
    "title": "Key Takeaways: ES Modules",
    "takeaways": [
      {
        "title": "1. File-Level Scope",
        "desc": "Every module file has its own private scope; variables do not leak into the global environment."
      },
      {
        "title": "2. Named Exports Use Curly Braces",
        "desc": "Export multiple items with 'export const x'; import them using matching curly braces { x }."
      },
      {
        "title": "3. Default Exports Do NOT Use Braces",
        "desc": "A file can have one default export ('export default x'); import it directly without curly braces."
      },
      {
        "title": "4. Renaming with 'as'",
        "desc": "Prevent naming collisions between different modules using 'import { name as alias } from ...'."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-26: Working with JSON: Parsing and Serializing Data",
      "desc": "Convert live JavaScript data into JSON text blueprints with JSON.stringify and safely reconstruct objects with defensive JSON.parse."
    }
  },
  "part7": {
    "title": "Knowledge Check: ES Modules",
    "quiz": {
      "question": "How do you correctly import a default export named 'UserStore' from a file located at './stores/user.js'?",
      "options": [
        "import { UserStore } from './stores/user.js';",
        "import UserStore from './stores/user.js';",
        "import * as { UserStore } from './stores/user.js';",
        "const UserStore = import('./stores/user.js');"
      ],
      "correctIndex": 1,
      "explanation": "Default exports are imported WITHOUT curly braces (import UserStore from './stores/user.js'). Curly braces are reserved exclusively for named exports."
    }
  }
},

  "js26-working-with-json": {
  "slug": "js26-working-with-json",
  "code": "JS-26",
  "title": "Working with JSON: Parsing and Serializing Data",
  "subtitle": "Exchange structured data across web servers and APIs using JSON.stringify and defensive JSON.parse.",
  "sections": [
    {
      "id": "part1",
      "label": "Shipping Blueprints",
      "icon": "📦",
      "tag": "DATA FORMAT"
    },
    {
      "id": "part2",
      "label": "stringify vs parse",
      "icon": "⚙️",
      "tag": "METHODS"
    },
    {
      "id": "part3",
      "label": "Serialization Mental Model",
      "icon": "🧠",
      "tag": "TRANSFORMATION"
    },
    {
      "id": "part4",
      "label": "Defensive Parsing",
      "icon": "🛡️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "JSON Sandbox",
      "icon": "💻",
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
    "title": "The Universal Shipping Blueprint: Why JSON Exists",
    "bigPicture": "In-memory JavaScript objects are living, complex structures containing prototypes, active methods, and memory pointers. A computer network wire, however, can only transport a flat stream of plain text bytes. JSON (JavaScript Object Notation) is a standardized, language-neutral text format based on JavaScript object syntax. Whether an external server is written in Python, Go, Java, or C#, every backend language can read and generate JSON text strings seamlessly.",
    "breakdownTitle": "Core Concepts of JSON:",
    "breakdownItems": [
      {
        "title": "JSON is Plain Text",
        "desc": "JSON is a formatted string of characters, NOT an in-memory JavaScript object. It can be saved to files or sent over HTTP."
      },
      {
        "title": "JSON.stringify() (Serialization)",
        "desc": "Converts living JavaScript objects or arrays into a serialized JSON text string ready for transit."
      },
      {
        "title": "JSON.parse() (Deserialization)",
        "desc": "Reads a JSON text string and reconstructs living JavaScript objects and arrays in computer memory."
      },
      {
        "title": "Strict Formatting Rules",
        "desc": "All keys and strings MUST use double quotes (\"). Single quotes, trailing commas, and comments are strictly forbidden."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: stringify, parse & Omission Rules",
    "intro": "Master the syntax, options, and limitations of JavaScript's built-in JSON object:",
    "cards": [
      {
        "number": "01",
        "tag": "Serialize",
        "title": "JSON.stringify(data)",
        "description": "Turns objects into text. Accepts formatting options like JSON.stringify(obj, null, 2) to generate human-readable indented JSON.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Deserialize",
        "title": "JSON.parse(text)",
        "description": "Rebuilds real objects from JSON strings. If the input text violates JSON syntax rules, it immediately throws a SyntaxError!",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Omissions",
        "title": "What JSON Drops",
        "description": "Functions, undefined, and Symbols are completely stripped during stringify because executable logic cannot be safely represented in data.",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of JSON Parsing",
      "content": "Never call naked JSON.parse() on external data (like localStorage or API responses) without wrapping it in a try/catch block. Malformed JSON will throw a synchronous SyntaxError that crashes your entire app if uncaught."
    }
  },
  "part3": {
    "title": "The Transformation Mental Model: Pack, Ship, Unpack",
    "intro": "Visualize what happens to data during the serialization cycle:",
    "points": [
      {
        "title": "1. The 3D Castle to Flat Blueprint (stringify)",
        "content": "Imagine your JavaScript object as a 3D Lego castle sitting in your computer's RAM. JSON.stringify flattens that castle into a printed 2D blueprint on a single sheet of paper (a text string)."
      },
      {
        "title": "2. The Shipping Wire (Transit)",
        "content": "The printed text blueprint travels across HTTP cables or sits inside browser localStorage. Because it is simple text, any operating system or programming language can store and read it."
      },
      {
        "title": "3. Reconstructing the Castle (parse)",
        "content": "The receiving program reads the printed blueprint and builds a brand-new 3D Lego castle in its own memory. The new object looks identical in data, but occupies distinct memory addresses."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Naked JSON.parse vs Defensive Safe Parsing",
    "bad": {
      "title": "❌ Bad: Naked JSON.parse throwing uncaught SyntaxError on bad input",
      "code": "function loadStoredPreferences() {\n  const rawData = localStorage.getItem(\"user_settings\");\n  // Catastrophic crash hazard:\n  // If rawData is null, empty string, or corrupted text,\n  // JSON.parse throws an unhandled SyntaxError and kills the entire app!\n  const settings = JSON.parse(rawData);\n  return settings.theme;\n}",
      "explanation": "If the stored data is corrupted, empty, or edited by an extension, naked JSON.parse throws a fatal SyntaxError that freezes the application."
    },
    "good": {
      "title": "✅ Clean: Defensive JSON parsing with try/catch and fallback defaults",
      "code": "function loadStoredPreferences(fallback = { theme: \"dark\", fontSize: 16 }) {\n  const rawData = localStorage.getItem(\"user_settings\");\n  if (!rawData) return fallback;\n\n  try {\n    return JSON.parse(rawData);\n  } catch (err) {\n    console.warn(\"Corrupted JSON detected in localStorage; reverting to safe default:\", err.message);\n    return fallback;\n  }\n}",
      "explanation": "Wrapping JSON.parse in try/catch safely intercepts syntax errors, logs a helpful warning, and returns a reliable fallback object."
    }
  },
  "part5": {
    "title": "JSON Serialization & Parsing Playground",
    "intro": "Experiment with pretty-printing JSON, observing stripped functions/undefined, and testing defensive parsing:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-26: WORKING WITH JSON PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Observe what JSON.stringify strips out:\nconst userAccount = {\n  id: 101,\n  username: \"dev_alex\",\n  role: \"moderator\",\n  skills: [\"JS\", \"React\", \"Node\"],\n  secretKey: undefined, // Notice: undefined is dropped!\n  greet: function() { return `Hello from ${this.username}`; } // Notice: functions are dropped!\n};\n\nconsole.log(\"Original Object has greet method:\", typeof userAccount.greet);\n\n// Serialize to pretty-printed JSON string (2-space indent):\nconst jsonString = JSON.stringify(userAccount, null, 2);\nconsole.log(\"Serialized JSON Text:\\n\" + jsonString);\n\n// 2. Defensive JSON Parser Helper:\nfunction safeParse(text, fallback = null) {\n  if (typeof text !== \"string\" || !text.trim()) return fallback;\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    console.warn(\"⚠️ JSON Parse Error safely caught:\", error.message);\n    return fallback;\n  }\n}\n\n// Test A: Parsing valid JSON\nconst validResult = safeParse('{\"status\": \"ok\", \"itemsCount\": 42}');\nconsole.log(\"\\nValid parse result:\", validResult.status);\n\n// Test B: Parsing malformed JSON (missing quotes around keys, single quotes)\nconst invalidResult = safeParse(\"{ name: 'bad format' }\", { status: \"fallback\" });\nconsole.log(\"Invalid parse fallback:\", invalidResult.status);\n"
  },
  "part6": {
    "title": "Key Takeaways: Working with JSON",
    "takeaways": [
      {
        "title": "1. JSON is a Text Format",
        "desc": "JSON is a standardized text string representation of data, not a living JavaScript object in memory."
      },
      {
        "title": "2. Strict Double-Quote Rule",
        "desc": "All property keys and string values MUST be enclosed in double quotes; trailing commas are illegal."
      },
      {
        "title": "3. Functions & Undefined Dropped",
        "desc": "JSON.stringify silently removes functions, undefined values, and Symbols because executable code cannot be serialized."
      },
      {
        "title": "4. Always Parse Defensively",
        "desc": "Never call JSON.parse without try/catch protection when dealing with external or user-provided strings."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-27: The Fetch API: Communicating with REST APIs",
      "desc": "Fetch live data from remote servers, send JSON payloads with HTTP POST, inspect HTTP status codes, and master the response.ok check."
    }
  },
  "part7": {
    "title": "Knowledge Check: Working with JSON",
    "quiz": {
      "question": "What happens when you pass an object containing a function to JSON.stringify({ name: 'App', start: () => {} })?",
      "options": [
        "The function code is serialized as a plain string inside the JSON output",
        "The function property is completely omitted from the resulting JSON string",
        "JSON.stringify throws an immediate TypeError",
        "The function is replaced with the literal value null"
      ],
      "correctIndex": 1,
      "explanation": "JSON.stringify automatically strips out functions, undefined values, and Symbols from objects because JSON is a data-only format that cannot represent executable code."
    }
  }
},

  "js27-the-fetch-api": {
  "slug": "js27-the-fetch-api",
  "code": "JS-27",
  "title": "The Fetch API: Communicating with REST APIs",
  "subtitle": "Make HTTP requests, parse JSON streams, handle network errors, and master the critical response.ok check.",
  "sections": [
    {
      "id": "part1",
      "label": "The Restaurant Waiter",
      "icon": "🌐",
      "tag": "NETWORKING"
    },
    {
      "id": "part2",
      "label": "GET, POST & response.ok",
      "icon": "📡",
      "tag": "HTTP & APIs"
    },
    {
      "id": "part3",
      "label": "Two-Step Promise Flow",
      "icon": "🧠",
      "tag": "EXECUTION"
    },
    {
      "id": "part4",
      "label": "The 404 Fetch Trap",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Fetch Sandbox",
      "icon": "💻",
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
    "title": "The Restaurant Waiter Analogy: Requesting Live Web Data",
    "bigPicture": "Modern web applications don't refresh the whole page every time you like a post or load your feed. Instead, JavaScript talks to remote backend servers in the background using the browser's built-in fetch() API. Think of fetch() as sending a friendly waiter to the kitchen: you place your order, your code continues running smoothly without freezing, and when the waiter returns with your food (data), you unpack the meal and display it to the user.",
    "breakdownTitle": "Four Pillars of the Fetch API:",
    "breakdownItems": [
      {
        "title": "The Two-Step Promise",
        "desc": "Step 1 (await fetch) receives HTTP headers and status; Step 2 (await res.json()) parses the streaming JSON body."
      },
      {
        "title": "The response.ok Guard",
        "desc": "fetch() does NOT reject on 404 or 500 errors! You must check if (!res.ok) to verify the server request succeeded."
      },
      {
        "title": "HTTP Methods (GET & POST)",
        "desc": "Use GET to retrieve information; use POST to send new records to the server inside the request body."
      },
      {
        "title": "The Content-Type Header",
        "desc": "When sending JSON in a POST request, include 'Content-Type': 'application/json' so the server knows how to decode the body."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: GET, POST & Error Guards",
    "intro": "Master the essential syntax for fetching and submitting data across the web:",
    "cards": [
      {
        "number": "01",
        "tag": "GET Request",
        "title": "await fetch(url)",
        "description": "Retrieves data. Always verify res.ok (true for HTTP 200-299) before calling await res.json() to extract the body.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "POST Request",
        "title": "Sending JSON Payloads",
        "description": "Pass an options object specifying method: 'POST', 'Content-Type' header, and JSON.stringify(payload) in the body.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Network Defense",
        "title": "try...catch with fetch",
        "description": "Catches real network failures (like lost internet connection, DNS failure, or CORS errors) as well as errors thrown by your res.ok check.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 The #1 Fetch Trap: Always Check response.ok",
      "content": "The fetch() Promise ONLY rejects if the network wire itself breaks (e.g. offline, DNS failure). If the server responds with a 404 Not Found or 500 Server Error, fetch() considers the HTTP exchange a success! You MUST always inspect 'if (!response.ok) throw new Error(...)'. "
    }
  },
  "part3": {
    "title": "The Mental Model: The Two-Step Promise Timeline",
    "intro": "Why working with fetch involves two consecutive await statements:",
    "points": [
      {
        "title": "1. Step 1: The Response Envelope (await fetch(url))",
        "content": "The first Promise resolves as soon as the server's HTTP response headers arrive. You now have access to response.status (200, 404), response.statusText, and response.ok, but the body data is still streaming over the wire."
      },
      {
        "title": "2. Step 2: Unpacking the Stream (await res.json())",
        "content": "Calling res.json() returns a second Promise that waits for the rest of the incoming data packets to finish downloading and parses the raw text into a real JavaScript object."
      },
      {
        "title": "3. The Error Boundary",
        "content": "True network crashes jump straight to catch. HTTP errors (404/500) fulfill Step 1 normally; only your manual 'if (!res.ok) throw new Error()' redirects them into the catch block."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: The Blind Fetch (Ignoring response.ok)",
    "bad": {
      "title": "❌ Bad: Assuming catch will handle 404 and 500 server errors",
      "code": "async function loadProductDetails(productId) {\n  try {\n    const res = await fetch(`/api/products/${productId}`);\n    // Fatal mistake: If productId is not found (404), res.ok is false,\n    // but the code doesn't check it! It proceeds to parse the 404 HTML page:\n    const data = await res.json(); // SyntaxError or unexpected { error: 'not found' }!\n    renderProduct(data.title); // Uncaught TypeError: Cannot read properties of undefined!\n  } catch (err) {\n    // This catch block NEVER runs on 404 unless json() explodes!\n  }\n}",
      "explanation": "Because fetch does not reject on 404, catch is bypassed. The app tries to read properties on undefined data and crashes."
    },
    "good": {
      "title": "✅ Clean: Inspecting response.ok and throwing actionable errors",
      "code": "async function loadProductDetails(productId) {\n  try {\n    const res = await fetch(`/api/products/${productId}`);\n    if (!res.ok) {\n      throw new Error(`Failed to fetch product (HTTP Status ${res.status}: ${res.statusText})`);\n    }\n    const product = await res.json();\n    renderProduct(product.title);\n  } catch (err) {\n    console.error(\"Product load failed:\", err.message);\n    showUserToast(\"Unable to load product information. Please try again.\");\n  }\n}",
      "explanation": "Checking !res.ok ensures all 404 and 500 HTTP failures trigger the catch block with accurate status diagnostics."
    }
  },
  "part5": {
    "title": "Fetch API Simulation Playground",
    "intro": "Simulate a mock network client handling GET requests, 404 status checks, and sending POST JSON payloads:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-27: THE FETCH API PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Simulate a backend server responding over the network:\nfunction mockFetch(url, options = {}) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      // Mock GET /api/users/42 (Success 200)\n      if (url.includes(\"/api/users/42\")) {\n        resolve({\n          ok: true,\n          status: 200,\n          statusText: \"OK\",\n          json: async () => ({ id: 42, name: \"Jordan Smith\", role: \"Frontend Dev\" })\n        });\n      } \n      // Mock GET /api/users/999 (Not Found 404)\n      else if (url.includes(\"/api/users/999\")) {\n        resolve({\n          ok: false,\n          status: 404,\n          statusText: \"Not Found\",\n          json: async () => ({ error: \"User not found\" })\n        });\n      }\n      // Mock POST /api/tasks (Created 201)\n      else if (options.method === \"POST\") {\n        const bodyData = JSON.parse(options.body || \"{}\");\n        resolve({\n          ok: true,\n          status: 201,\n          statusText: \"Created\",\n          json: async () => ({ id: 1001, ...bodyData, createdAt: new Date().toISOString() })\n        });\n      }\n    }, 150);\n  });\n}\n\n// 2. Robust API Client Function with response.ok check:\nasync function fetchUser(userId) {\n  try {\n    console.log(`📡 Fetching user ${userId}...`);\n    const res = await mockFetch(`/api/users/${userId}`);\n\n    // Mandatory check:\n    if (!res.ok) {\n      throw new Error(`HTTP ${res.status} (${res.statusText})`);\n    }\n\n    const user = await res.json();\n    console.log(\"✅ User loaded successfully:\", user.name);\n    return user;\n  } catch (err) {\n    console.error(`❌ Could not load user ${userId}:`, err.message);\n  }\n}\n\n// 3. Test GET for existing user:\nfetchUser(42);\n\n// 4. Test GET for non-existent user (triggers !res.ok check):\nfetchUser(999);\n"
  },
  "part6": {
    "title": "Key Takeaways: The Fetch API",
    "takeaways": [
      {
        "title": "1. Two-Step Promise Architecture",
        "desc": "First await fetch(url) for headers and status; second await res.json() to read and parse the body data."
      },
      {
        "title": "2. The response.ok Requirement",
        "desc": "fetch() does NOT reject on 404 or 500 errors; always check if (!res.ok) to verify request success."
      },
      {
        "title": "3. Sending JSON with POST",
        "desc": "Set method: 'POST', include header 'Content-Type': 'application/json', and pass JSON.stringify(data) in the body."
      },
      {
        "title": "4. Full Error Protection",
        "desc": "Wrap fetch logic in try/catch to gracefully handle network dropouts, CORS blocks, and HTTP status exceptions."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-28: Browser DOM Essentials: Selecting & Modifying Elements",
      "desc": "Bridge JavaScript with the browser: select elements with querySelector, update text and styles, and prevent cross-site scripting."
    }
  },
  "part7": {
    "title": "Knowledge Check: The Fetch API",
    "quiz": {
      "question": "How does the browser's fetch() API behave when the server returns an HTTP 404 Not Found error?",
      "options": [
        "The fetch() Promise rejects immediately and jumps directly into the catch block",
        "The fetch() Promise fulfills normally, with response.ok set to false and response.status set to 404",
        "The browser automatically retries the request up to three times",
        "A synchronous NetworkError is thrown"
      ],
      "correctIndex": 1,
      "explanation": "fetch() only rejects on real network failures (like lost internet connection or DNS errors). HTTP error status codes like 404 or 500 fulfill successfully, but response.ok will be false."
    }
  }
},

  "js28-dom-essentials": {
  "slug": "js28-dom-essentials",
  "code": "JS-28",
  "title": "Browser DOM Essentials: Selecting & Modifying Elements",
  "subtitle": "Bridge JavaScript with the browser: select elements with querySelector, update text safely, and toggle CSS classes.",
  "sections": [
    {
      "id": "part1",
      "label": "The HTML Tree",
      "icon": "🌳",
      "tag": "DOM TREE"
    },
    {
      "id": "part2",
      "label": "Selecting & Modifying",
      "icon": "🎯",
      "tag": "CORE SYNTAX"
    },
    {
      "id": "part3",
      "label": "The Living Node Model",
      "icon": "🧠",
      "tag": "MENTAL MODEL"
    },
    {
      "id": "part4",
      "label": "XSS Security Traps",
      "icon": "🛡️",
      "tag": "SECURITY"
    },
    {
      "id": "part5",
      "label": "DOM Playground",
      "icon": "💻",
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
    "title": "The Living Family Tree: How JavaScript Talks to HTML",
    "bigPicture": "When a web browser loads an HTML file, it does not treat it as plain text. Instead, it parses every tag into a living tree of JavaScript objects called the Document Object Model (DOM). JavaScript cannot directly edit the HTML files saved on your hard drive, but it can freely read, add, remove, and restyle any node on this living in-memory tree in real time. The moment JavaScript changes a DOM node, the browser immediately repaints the screen.",
    "breakdownTitle": "Four Pillars of DOM Manipulation:",
    "breakdownItems": [
      {
        "title": "The document Object",
        "desc": "The entry point to the webpage; provides query methods like querySelector and querySelectorAll to find elements."
      },
      {
        "title": "Safe Text Updates with textContent",
        "desc": "Updates element text safely without parsing HTML, preventing dangerous Cross-Site Scripting (XSS) attacks."
      },
      {
        "title": "Dynamic Styling via classList",
        "desc": "Add, remove, or toggle CSS class names dynamically instead of hardcoding fragile inline CSS styles."
      },
      {
        "title": "Creating Nodes with createElement",
        "desc": "Instantiate brand-new HTML elements in memory and append them into the live page tree with appendChild or append."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: Selecting, Modifying & Creating Elements",
    "intro": "Master the essential methods for interacting with page elements:",
    "cards": [
      {
        "number": "01",
        "tag": "Selection",
        "title": "querySelector(cssSelector)",
        "description": "Finds the first matching element using CSS selector syntax (e.g., '#id', '.class', 'button[type=submit]'). Returns null if not found.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Classes",
        "title": "element.classList",
        "description": "Manipulate CSS classes with .add('active'), .remove('hidden'), and .toggle('dark-mode') instead of touching element.style directly.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Creation",
        "title": "createElement & append",
        "description": "Build new elements with document.createElement('div'), configure their text and classes, and insert them with parent.append(child).",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of DOM Security: Use textContent Over innerHTML",
      "content": "Never insert untrusted user input using innerHTML! An attacker can pass malicious HTML containing script tags or image error payloads (<img src=x onerror=...>) that steal session cookies. Always use element.textContent for user data."
    }
  },
  "part3": {
    "title": "The Living Node Mental Model: JavaScript Objects in Memory",
    "intro": "How the browser bridges HTML tags with JavaScript objects:",
    "points": [
      {
        "title": "1. Tags Become Objects",
        "content": "Every <button class='btn'>Click</button> tag becomes an HTMLButtonElement object in memory with properties like .textContent, .id, .className, and .style."
      },
      {
        "title": "2. The Parent-Child Tree",
        "content": "Elements nest like branches on a tree. <body> contains <main>, <main> contains <article>, <article> contains <p>. You can traverse parentNode, children, and closest() seamlessly."
      },
      {
        "title": "3. Live Rendering Synchronization",
        "content": "When you run card.classList.add('highlight'), you aren't editing a file—you are modifying a live property on a memory node. The browser's rendering engine notices the update and repaints pixels immediately."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Dangerous innerHTML vs Safe textContent",
    "bad": {
      "title": "❌ Bad: Using innerHTML with raw user input (Severe XSS Vulnerability)",
      "code": "function renderUserComment(commentText) {\n  const container = document.querySelector(\"#comments\");\n  // Catastrophic security flaw:\n  // If commentText is: \"<img src=x onerror='stealCredentials()'>\"\n  // the browser executes the attacker's JavaScript code immediately!\n  container.innerHTML += `<div class=\"comment\">${commentText}</div>`;\n}",
      "explanation": "Using innerHTML with untrusted user input allows attackers to inject malicious JavaScript into other users' browsers (Cross-Site Scripting)."
    },
    "good": {
      "title": "✅ Clean: Safe node creation using textContent and append",
      "code": "function renderUserComment(commentText) {\n  const container = document.querySelector(\"#comments\");\n  \n  // Safe: Creates node in memory\n  const commentDiv = document.createElement(\"div\");\n  commentDiv.classList.add(\"comment\");\n  \n  // Safe: textContent treats all inputs strictly as plain text, escaping any HTML!\n  commentDiv.textContent = commentText;\n  \n  container.append(commentDiv);\n}",
      "explanation": "textContent safely escapes all HTML characters, treating attack scripts as inert plain text and completely neutralizing XSS exploits."
    }
  },
  "part5": {
    "title": "DOM Manipulation Simulation Playground",
    "intro": "Simulate creating, styling, and appending interactive task items safely in JavaScript:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-28: DOM ESSENTIALS PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Simulated DOM environment\nclass MockDOMElement {\n  constructor(tagName) {\n    this.tagName = tagName.toUpperCase();\n    this.textContent = \"\";\n    this.classList = new Set();\n    this.children = [];\n  }\n\n  append(child) {\n    this.children.push(child);\n  }\n\n  get className() {\n    return Array.from(this.classList).join(\" \");\n  }\n}\n\n// 2. Helper to simulate document.createElement\nfunction createElement(tag) {\n  return new MockDOMElement(tag);\n}\n\n// 3. Build a task card element safely:\nfunction createTaskCard(title, isCompleted) {\n  const card = createElement(\"article\");\n  card.classList.add(\"task-card\");\n  \n  if (isCompleted) {\n    card.classList.add(\"completed\");\n  }\n\n  // Safe text insertion:\n  const heading = createElement(\"h3\");\n  heading.textContent = title;\n  card.append(heading);\n\n  const statusBadge = createElement(\"span\");\n  statusBadge.classList.add(\"badge\");\n  statusBadge.textContent = isCompleted ? \"Done\" : \"In Progress\";\n  card.append(statusBadge);\n\n  return card;\n}\n\n// 4. Test card generation:\nconst card1 = createTaskCard(\"Master JavaScript DOM\", true);\nconst card2 = createTaskCard(\"Build Capstone App\", false);\n\nconsole.log(\"Card 1 Tag:\", card1.tagName);\nconsole.log(\"Card 1 Classes:\", card1.className);\nconsole.log(\"Card 1 Title:\", card1.children[0].textContent);\nconsole.log(\"Card 2 Status:\", card2.children[1].textContent);\n"
  },
  "part6": {
    "title": "Key Takeaways: Browser DOM Essentials",
    "takeaways": [
      {
        "title": "1. The DOM is an Object Tree",
        "desc": "The browser parses HTML tags into a live tree of JavaScript objects rooted at the global document object."
      },
      {
        "title": "2. querySelector vs querySelectorAll",
        "desc": "querySelector returns the first matching element node; querySelectorAll returns a list of all matching nodes."
      },
      {
        "title": "3. Never Trust innerHTML",
        "desc": "Always use textContent for inserting user text to protect your application and users from XSS injection attacks."
      },
      {
        "title": "4. Use classList for Styling",
        "desc": "Toggle and manage CSS classes with element.classList.toggle() instead of hardcoding brittle inline style properties."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-29: Events, Event Listeners & Event Delegation",
      "desc": "Listen for user clicks, keyboard presses, and form submits using addEventListener, and master high-performance Event Delegation."
    }
  },
  "part7": {
    "title": "Knowledge Check: Browser DOM Essentials",
    "quiz": {
      "question": "Why should you use 'element.textContent' instead of 'element.innerHTML' when displaying user-submitted comments?",
      "options": [
        "textContent renders faster because it disables font styling",
        "textContent treats input strictly as plain text, escaping HTML tags to prevent Cross-Site Scripting (XSS)",
        "innerHTML is deprecated in modern JavaScript standards",
        "textContent automatically capitalizes the first letter of each sentence"
      ],
      "correctIndex": 1,
      "explanation": "element.textContent treats all assigned values strictly as literal plain text. Any malicious HTML or script tags are safely escaped, preventing XSS vulnerabilities."
    }
  }
},

  "js29-events-and-delegation": {
  "slug": "js29-events-and-delegation",
  "code": "JS-29",
  "title": "Events, Event Listeners & Event Delegation",
  "subtitle": "Respond to user clicks, keyboard presses, and form submissions using addEventListener and high-performance Event Delegation.",
  "sections": [
    {
      "id": "part1",
      "label": "The Doorbell Analogy",
      "icon": "🔔",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Listeners & Bubbling",
      "icon": "🫧",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Event Delegation",
      "icon": "⚡",
      "tag": "PERFORMANCE"
    },
    {
      "id": "part4",
      "label": "500 Listeners Trap",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Events Playground",
      "icon": "💻",
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
    "title": "The Doorbell & The Lobby: How Web Pages React to Users",
    "bigPicture": "A webpage without events is a static poster. Events make the web interactive: clicking buttons, typing in search bars, submitting forms, and scrolling feeds all emit event signals. In JavaScript, an event listener is like wiring a doorbell: you register a callback function that sits dormant until the user presses the button, at which point the browser fires your handler with an Event object detailing exactly what happened.",
    "breakdownTitle": "Four Pillars of Event Handling:",
    "breakdownItems": [
      {
        "title": "addEventListener('event', handler)",
        "desc": "Attaches a listener function to any DOM element without overwriting existing handlers or polluting HTML."
      },
      {
        "title": "The Event Object (e.target vs e.currentTarget)",
        "desc": "e.target is the exact element that was clicked; e.currentTarget is the element running the event handler."
      },
      {
        "title": "Event Bubbling",
        "desc": "Events bubble upward from the child element through each parent container like air bubbles rising in water."
      },
      {
        "title": "Event Delegation",
        "desc": "Attach ONE listener to a parent container to manage actions for hundreds of dynamic child items efficiently."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: addEventListener, preventDefault & Bubbling",
    "intro": "Master the tools for capturing user actions and controlling event flow:",
    "cards": [
      {
        "number": "01",
        "tag": "Listeners",
        "title": "element.addEventListener()",
        "description": "Registers an event type ('click', 'input', 'submit') and a callback function. Cleanly separates JavaScript logic from HTML markup.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Forms",
        "title": "event.preventDefault()",
        "description": "Cancels default browser actions like page reloads on form submit (<form>) or page jumping on link clicks (<a>).",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Bubbling",
        "title": "The Upward Bubble",
        "description": "When a nested <span> inside a <button> is clicked, the event bubbles: span -> button -> div -> body -> document.",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of Dynamic Lists: Use Event Delegation",
      "content": "Never attach individual addEventListener callbacks to items in a dynamic loop. Attach ONE single listener to the static parent container (<ul> or <main>) and inspect 'event.target.closest(...)' to handle actions. It saves memory and works automatically for future items."
    }
  },
  "part3": {
    "title": "The Event Delegation Mental Model: The Lobby Concierge",
    "intro": "Why one parent listener beats 500 individual child listeners:",
    "points": [
      {
        "title": "1. The 500 Security Guards Analogy",
        "content": "Imagine an apartment building with 500 rooms. Hiring 500 security guards to stand outside each room door wastes massive resources. That is what attaching 500 event listeners in a forEach loop does to browser memory."
      },
      {
        "title": "2. The Front Desk Concierge (Delegation)",
        "content": "Instead, hire ONE guard at the front entrance lobby (the parent <ul>). Because all visitors must pass through the lobby (event bubbling), that single guard handles all incoming traffic using event.target."
      },
      {
        "title": "3. Future-Proofing Dynamic Content",
        "content": "When a new resident moves into room 501 (an item added via fetch or user input), they don't need a new guard hired. The lobby concierge already handles them automatically!"
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: Attaching 500 Listeners in a Loop",
    "bad": {
      "title": "❌ Bad: Attaching listeners to every list item in a loop",
      "code": "// Wasteful & fragile:\nconst deleteButtons = document.querySelectorAll(\".delete-btn\");\ndeleteButtons.forEach((button) => {\n  button.addEventListener(\"click\", (e) => {\n    deleteItem(e.target.dataset.id);\n  });\n});\n\n// Huge bug: When a user adds a new task dynamically,\n// the new delete button has NO listener attached and clicking it does nothing!",
      "explanation": "Loops attach hundreds of separate functions in memory, and dynamically inserted items won't have listeners attached."
    },
    "good": {
      "title": "✅ Clean: Event Delegation with a single parent listener and closest()",
      "code": "const taskList = document.querySelector(\"#task-list\");\n\n// Single listener on parent handles ALL current and future delete buttons:\ntaskList.addEventListener(\"click\", (e) => {\n  const deleteBtn = e.target.closest(\".delete-btn\");\n  if (!deleteBtn) return; // Click was not on or inside a delete button\n\n  const taskId = deleteBtn.dataset.id;\n  deleteItem(taskId);\n});",
      "explanation": "One listener on the parent container handles clicks for all existing and newly added items with minimal memory usage."
    }
  },
  "part5": {
    "title": "Event Delegation Simulation Playground",
    "intro": "Observe event bubbling and delegation handling clicks on dynamic task items:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-29: EVENT DELEGATION PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Simulated parent container and data state:\nconst state = {\n  tasks: [\n    { id: 1, title: \"Learn DOM Selection\" },\n    { id: 2, title: \"Master Event Delegation\" }\n  ]\n};\n\n// 2. Simulated Event Dispatcher representing a user click:\nfunction simulateUserClick(targetSelector, targetId) {\n  const event = {\n    target: {\n      matches: (selector) => selector === targetSelector,\n      dataset: { id: targetId }\n    }\n  };\n  \n  // Single delegated listener on parent:\n  handleParentListClick(event);\n}\n\n// 3. The Delegated Handler (The Front Desk Concierge):\nfunction handleParentListClick(event) {\n  if (event.target.matches(\".btn-delete\")) {\n    const id = Number(event.target.dataset.id);\n    state.tasks = state.tasks.filter(t => t.id !== id);\n    console.log(`🗑️ Delegated Handler: Deleted task #${id}!`);\n  } else {\n    console.log(\"ℹ️ Click ignored: Not on a delete button.\");\n  }\n}\n\n// 4. Test 1: Click delete on existing task #1\nsimulateUserClick(\".btn-delete\", 1);\nconsole.log(\"Remaining tasks:\", state.tasks.map(t => t.title));\n\n// 5. Test 2: Add dynamic task #3 (No new listener needed!)\nstate.tasks.push({ id: 3, title: \"Build Capstone Project\" });\nconsole.log(\"\\nAdded new task dynamically. Testing delegation on new task:\");\n\n// Test 3: Click delete on newly added task #3\nsimulateUserClick(\".btn-delete\", 3);\nconsole.log(\"Remaining tasks:\", state.tasks.map(t => t.title));\n"
  },
  "part6": {
    "title": "Key Takeaways: Events & Delegation",
    "takeaways": [
      {
        "title": "1. Clean Event Listeners",
        "desc": "Use addEventListener to attach callbacks; avoid deprecated inline HTML onclick attributes."
      },
      {
        "title": "2. The Event Object",
        "desc": "e.target tells you what was clicked; e.preventDefault() prevents unwanted browser page reloads."
      },
      {
        "title": "3. Natural Event Bubbling",
        "desc": "Events propagate upward through parent elements in the DOM tree, enabling centralized event handling."
      },
      {
        "title": "4. Master Event Delegation",
        "desc": "Attach one listener to a static parent container to handle actions on dynamic children with minimal memory."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-30: Browser Storage (localStorage) & DevTools Debugging",
      "desc": "Persist user settings and application state across browser refreshes with localStorage, and master DevTools debugging."
    }
  },
  "part7": {
    "title": "Knowledge Check: Events & Delegation",
    "quiz": {
      "question": "In an event listener attached to a parent container, what does 'event.target' represent?",
      "options": [
        "The element where the event listener is attached",
        "The exact deepest element that the user clicked on",
        "The parent of the document body",
        "The global window object"
      ],
      "correctIndex": 1,
      "explanation": "event.target represents the exact element that originally triggered the event (the clicked element), whereas event.currentTarget represents the element holding the active event listener."
    }
  }
},

  "js30-browser-storage-and-debugging": {
  "slug": "js30-browser-storage-and-debugging",
  "code": "JS-30",
  "title": "Browser Storage (localStorage) & DevTools Debugging",
  "subtitle": "Persist user preferences across browser refreshes with localStorage and troubleshoot code like a pro using DevTools.",
  "sections": [
    {
      "id": "part1",
      "label": "Persistent State",
      "icon": "💾",
      "tag": "STORAGE"
    },
    {
      "id": "part2",
      "label": "localStorage API",
      "icon": "⏱️",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "DevTools Debugging",
      "icon": "🐞",
      "tag": "DEBUGGING"
    },
    {
      "id": "part4",
      "label": "[object Object] Trap",
      "icon": "⚠️",
      "tag": "TRAPS"
    },
    {
      "id": "part5",
      "label": "Storage Playground",
      "icon": "💻",
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
    "title": "The Sticky Note & The Slow-Mo Replay: Persistence & Debugging",
    "bigPicture": "Every time a user refreshes their browser tab, JavaScript's in-memory variables are wiped clean! To remember dark mode preferences, shopping cart items, or auth tokens, web applications use localStorage—a permanent key-value store built right into the browser. And when things don't work as expected, professional developers don't just guess with console.log: they use browser DevTools and the debugger statement to pause execution and inspect variables in slow motion.",
    "breakdownTitle": "Four Pillars of Storage & Debugging:",
    "breakdownItems": [
      {
        "title": "localStorage Persistence",
        "desc": "Stores text data that survives browser refreshes and computer restarts until explicitly cleared."
      },
      {
        "title": "The JSON Serialization Rule",
        "desc": "localStorage only stores strings! Objects and arrays MUST be serialized with JSON.stringify before saving."
      },
      {
        "title": "localStorage vs sessionStorage",
        "desc": "localStorage lasts indefinitely; sessionStorage is automatically cleared when the user closes the tab."
      },
      {
        "title": "DevTools & debugger Statement",
        "desc": "The debugger keyword acts as a programmatic breakpoint, pausing script execution to inspect scopes and call stacks."
      }
    ]
  },
  "part2": {
    "title": "Core Mechanics: localStorage API & DevTools Breakpoints",
    "intro": "Master the fundamental storage methods and debugging techniques:",
    "cards": [
      {
        "number": "01",
        "tag": "Storage",
        "title": "setItem & getItem",
        "description": "Save data with localStorage.setItem('theme', 'dark') and retrieve with localStorage.getItem('theme'). Returns null if missing.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Objects",
        "title": "JSON Storage Pattern",
        "description": "Save objects: localStorage.setItem('user', JSON.stringify(user)). Retrieve: JSON.parse(localStorage.getItem('user') || '{}').",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Debugging",
        "title": "The debugger Statement",
        "description": "Insert 'debugger;' in your code. If DevTools is open, execution pauses instantly, letting you step line-by-line.",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule of LocalStorage: Never Store Naked Objects",
      "content": "If you pass an object directly to localStorage (localStorage.setItem('cart', cartObject)), JavaScript implicitly calls .toString(), saving the useless string '[object Object]'! Always serialize with JSON.stringify() and deserialize with JSON.parse()."
    }
  },
  "part3": {
    "title": "The Debugging Mental Model: The Slow-Motion Replay",
    "intro": "How browser DevTools lets you freeze and inspect JavaScript execution:",
    "points": [
      {
        "title": "1. The Live Freeze Frame",
        "content": "When execution hits a breakpoint or 'debugger;' statement with DevTools open, the entire JavaScript engine pauses. The screen freezes, and no further lines execute until you press Step."
      },
      {
        "title": "2. The Scope Inspector",
        "content": "Look at the Scope panel in DevTools: you can inspect every local, closure, and global variable at that exact millisecond without adding a single console.log statement."
      },
      {
        "title": "3. Step Over vs Step Into",
        "content": "'Step Over' (F10) moves to the next line in the current function. 'Step Into' (F11) steps inside the function being called, letting you follow data into helper utilities."
      }
    ]
  },
  "part4": {
    "title": "Common Mistakes: The '[object Object]' Storage Disaster",
    "bad": {
      "title": "❌ Bad: Storing naked objects and unsafely parsing null on first visit",
      "code": "// Bug 1: Saves the useless string \"[object Object]\"!\nconst user = { name: \"Sam\", theme: \"dark\" };\nlocalStorage.setItem(\"user_profile\", user);\n\n// Bug 2: Naked JSON.parse on first load (when getItem returns null):\nconst saved = JSON.parse(localStorage.getItem(\"user_profile\"));\n// If nothing was saved yet, saved is null.\nconsole.log(saved.theme); // TypeError: Cannot read properties of null!",
      "explanation": "Naked objects are ruined into '[object Object]', and failing to handle null on first load causes fatal TypeErrors."
    },
    "good": {
      "title": "✅ Clean: Stringifying data and safely providing fallback defaults",
      "code": "const user = { name: \"Sam\", theme: \"dark\" };\n\n// 1. Serialize objects to JSON text before saving:\nlocalStorage.setItem(\"user_profile\", JSON.stringify(user));\n\n// 2. Safe retrieval with fallback default:\nfunction loadProfile() {\n  const raw = localStorage.getItem(\"user_profile\");\n  if (!raw) return { name: \"Guest\", theme: \"system\" };\n  \n  try {\n    return JSON.parse(raw);\n  } catch (err) {\n    console.warn(\"Storage corrupted; using fallback default:\", err.message);\n    return { name: \"Guest\", theme: \"system\" };\n  }\n}",
      "explanation": "Using JSON.stringify preserves data integrity, and defensive parsing guarantees safe fallbacks even on first load."
    }
  },
  "part5": {
    "title": "Browser Storage & Persistence Playground",
    "intro": "Simulate persistent user settings with JSON serialization and defensive loading:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-30: LOCALSTORAGE & PERSISTENCE PLAYGROUND\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. In-memory simulation of localStorage:\nconst mockStorage = {\n  store: {},\n  setItem(key, value) { this.store[key] = String(value); },\n  getItem(key) { return this.store[key] !== undefined ? this.store[key] : null; },\n  removeItem(key) { delete this.store[key]; }\n};\n\n// 2. Persistent Settings Manager:\nconst SettingsManager = {\n  storageKey: \"learncraft_user_prefs\",\n  \n  // Save settings with JSON serialization\n  save(prefs) {\n    const serialized = JSON.stringify(prefs);\n    mockStorage.setItem(this.storageKey, serialized);\n    console.log(\"💾 Saved preferences to storage:\", serialized);\n  },\n\n  // Load settings with defensive fallback\n  load() {\n    const raw = mockStorage.getItem(this.storageKey);\n    if (!raw) {\n      console.log(\"ℹ️ No saved preferences found; using defaults.\");\n      return { theme: \"system\", fontSize: 16, autoSave: true };\n    }\n\n    try {\n      return JSON.parse(raw);\n    } catch (e) {\n      console.error(\"⚠️ Corrupted storage, returning default:\", e.message);\n      return { theme: \"system\", fontSize: 16, autoSave: true };\n    }\n  }\n};\n\n// Test 1: Load on first visit (defaults applied)\nconst initial = SettingsManager.load();\nconsole.log(\"First visit theme:\", initial.theme);\n\n// Test 2: User updates theme to \"cyberpunk\"\nSettingsManager.save({ theme: \"cyberpunk\", fontSize: 18, autoSave: true });\n\n// Test 3: Reload on subsequent visit\nconst refreshed = SettingsManager.load();\nconsole.log(\"Loaded persistent theme:\", refreshed.theme);\nconsole.log(\"Loaded font size:\", refreshed.fontSize);\n"
  },
  "part6": {
    "title": "Key Takeaways: Browser Storage & Capstone Readiness",
    "takeaways": [
      {
        "title": "1. localStorage Persists Across Refreshes",
        "desc": "Data in localStorage lasts indefinitely until cleared, making it ideal for client-side persistence."
      },
      {
        "title": "2. Always Stringify Objects",
        "desc": "Never store naked objects; always use JSON.stringify() to save and defensive JSON.parse() to load."
      },
      {
        "title": "3. Master DevTools Debugging",
        "desc": "Use the debugger; statement and DevTools breakpoints to inspect variable values in slow motion."
      },
      {
        "title": "4. You are Capstone Ready!",
        "desc": "You have completed all 30 foundational JavaScript lessons. You now possess every core skill required to build the Interactive Task Manager Capstone Project!"
      }
    ],
    "nextLessonPreview": {
      "title": "JS-CAPSTONE: Interactive Task & Workflow Manager",
      "desc": "Build a complete, modular vanilla JavaScript application demonstrating ES modules, array manipulation, event delegation, async fetch, and localStorage."
    }
  },
  "part7": {
    "title": "Knowledge Check: Browser Storage",
    "quiz": {
      "question": "What format does the browser's 'localStorage' engine store all keys and values in?",
      "options": [
        "Binary byte buffers",
        "Plain text strings only (objects must be serialized with JSON.stringify)",
        "JavaScript Map objects",
        "Direct database records"
      ],
      "correctIndex": 1,
      "explanation": "localStorage stores all keys and values strictly as strings. Storing objects requires serializing them with JSON.stringify(), and loading them requires parsing with JSON.parse()."
    }
  }
}
};

/**
 * Authoritative accessor that normalizes slugs, codes, and prefixes.
 */
export function getJSLessonContent(slugOrCode: string): JSLessonContent {
  const authoritative = getLessonBySlug(slugOrCode);
  const targetSlug = (authoritative ? authoritative.slug : slugOrCode).toLowerCase().trim();

  // 1. Direct match by slug key
  if (JS_LESSONS_CONTENT[targetSlug]) {
    return JS_LESSONS_CONTENT[targetSlug];
  }

  // 2. Match by slug or code inside values
  const found = Object.values(JS_LESSONS_CONTENT).find(
    (c) =>
      c.slug.toLowerCase() === targetSlug ||
      c.code.toLowerCase() === targetSlug ||
      targetSlug.includes(c.slug.toLowerCase()) ||
      targetSlug.includes(c.code.toLowerCase().replace("-", ""))
  );

  if (found) {
    return found;
  }

  // 3. Fallback to JS-01 if completely unknown
  return JS_LESSONS_CONTENT["js01-how-javascript-runs"];
}
