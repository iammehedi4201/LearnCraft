const fs = require('fs');

// 1. Update javascript-lesson-content.ts for JS-01, JS-02, JS-03
const lessonContentPath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let lessonContent = fs.readFileSync(lessonContentPath, 'utf8');

const js01Updated = `  "js01-how-javascript-runs": {
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
          "description": "To print words or sentences, wrap them in matching quotes, like console.log(\\"Hello, World!\\"). The quotes tell JavaScript this is plain text.",
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
          "content": "You can print multiple items in a single line by separating them with commas. For example, console.log(\\"Total items:\\", 5 + 3) displays 'Total items: 8' with an automatic space in between.",
          "codeSnippet": "// Notice how text and numbers combine easily:\\nconsole.log(\\"Step 1: Starting up\\");\\nconsole.log(\\"Total items:\\", 5 + 3); // Prints: Total items: 8\\nconsole.log(\\"Step 2: All done!\\");"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with console.log()",
      "bad": {
        "title": "❌ Broken: Missing quotes on words and quoting math calculations",
        "code": "// Mistake 1: Missing quotes causes an error (computer looks for a command named Hello)\\nconsole.log(Hello);\\n\\n// Mistake 2: Quoting math prevents the calculation from happening\\nconsole.log(\\"10 + 5\\"); // Prints literal text '10 + 5' instead of 15!",
        "explanation": "Leaving quotes off words makes JavaScript think 'Hello' is a variable or command that doesn't exist, causing a crash. Putting quotes around '10 + 5' treats it as plain text instead of doing the math."
      },
      "good": {
        "title": "✅ Clean: Words quoted, math unquoted, and clear output labels",
        "code": "// 1. Text is safely wrapped in double quotes\\nconsole.log(\\"Hello, Welcome to LearnCraft!\\");\\n\\n// 2. Math is unquoted so the computer calculates it\\nconsole.log(\\"Calculation result:\\", 10 + 5); // Prints: Calculation result: 15\\n\\n// 3. Clear step labels help you follow the flow\\nconsole.log(\\"Program finished successfully.\\");",
        "explanation": "Wrapping text in quotes and leaving numbers unquoted produces clean, error-free output that is easy to read and understand."
      }
    },
    "part5": {
      "title": "Console & Output Playground",
      "intro": "Click Run Code to execute the script line by line. Notice how each statement prints in order. Then try the small exercise below!",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-01: HOW JAVASCRIPT RUNS\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Printing text messages:\\nconsole.log(\\"👋 Welcome to LearnCraft!\\");\\nconsole.log(\\"Programming in JavaScript is fun!\\");\\n\\n// 2. Doing math calculations (no quotes):\\nconsole.log(\\"Result of 10 + 5:\\", 10 + 5);\\nconsole.log(\\"Result of 100 - 25:\\", 100 - 25);\\nconsole.log(\\"Result of 4 * 6:\\", 4 * 6);\\n\\n// 3. Sequential order:\\nconsole.log(\\"First step: Preparing\\");\\nconsole.log(\\"Second step: Processing\\");\\nconsole.log(\\"Third step: Completed!\\");\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Add a console.log() below that prints a friendly message with your name.\\n// 2. Add a console.log() below that calculates 50 * 2.\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
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
          "desc": "Always enclose words and text inside matching quotes like \\"Hello\\" or 'Hello'."
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
        "question": "What will the following line of code print to the screen: console.log(\\"5 + 5\\", 5 + 5);",
        "options": [
          "\\"5 + 5 10\\"",
          "5 + 5 10",
          "10 10",
          "5 + 5 5 + 5"
        ],
        "correctIndex": 1,
        "explanation": "The first item \\"5 + 5\\" is in quotes, so JavaScript prints the literal text 5 + 5. The second item is unquoted, so JavaScript calculates 5 + 5 to produce the number 10."
      }
    }
  }`;

const js02Updated = `  "js02-variables-and-data-types": {
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
          "content": "Any text wrapped in quotes (like \\"LearnCraft\\" or 'Alice') is a String. Strings hold names, messages, addresses, and any written words."
        },
        {
          "title": "2. Numbers & Booleans",
          "content": "Numbers are written without quotes (like 42 or 19.99) and can be added or multiplied. Booleans are simple true or false switches used for checking states (like isLoggedIn = true)."
        },
        {
          "title": "3. Empty Values: undefined vs null",
          "content": "undefined means a variable was created, but no value has been put into it yet. null is an intentional value you assign to say 'this container is empty on purpose'. Use typeof to check what kind of value a variable holds.",
          "codeSnippet": "const city = \\"Tokyo\\";     // string\\nconst price = 25;         // number\\nconst isOpen = true;      // boolean\\nlet userFeedback;         // undefined (not assigned yet)\\nconst discount = null;    // null (explicitly empty)"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Variables",
      "bad": {
        "title": "❌ Broken: Reassigning const and forgetting quotes around words",
        "code": "// Mistake 1: Trying to change a const variable\\nconst currentScore = 10;\\ncurrentScore = 15; // ❌ TypeError: Assignment to constant variable!\\n\\n// Mistake 2: Forgetting quotes around text\\nconst userCity = Paris; // ❌ ReferenceError: Paris is not defined!\\n\\n// Mistake 3: Misspelling the variable name\\nconst accountBalance = 50;\\nconsole.log(accountBalanse); // ❌ ReferenceError: accountBalanse is not defined",
        "explanation": "You cannot change a const variable once assigned. Forgetting quotes around 'Paris' causes JavaScript to look for a variable named Paris instead of storing the city name text."
      },
      "good": {
        "title": "✅ Clean: Using let for changing values and const for fixed values",
        "code": "// 1. Fixed values use const\\nconst maxScore = 100;\\nconst playerName = \\"Alex\\"; // Text in quotes!\\n\\n// 2. Values that change use let\\nlet currentScore = 10;\\ncurrentScore = 15; // ✅ Allowed because currentScore is a let variable!\\n\\n// 3. Clear, accurate names when printing\\nconsole.log(playerName, \\"has score:\\", currentScore, \\"out of\\", maxScore);",
        "explanation": "Using const for fixed settings and let for values that change makes your code clear, predictable, and free from runtime crashes."
      }
    },
    "part5": {
      "title": "Variables & Data Types Playground",
      "intro": "Run the code to see how const protects fixed values while let allows updates. Then follow the instructions to create your own variables!",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-02: VARIABLES & DATA TYPES\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Information that stays constant (const):\\nconst appName = \\"LearnCraft\\";\\nconst releaseYear = 2026;\\n\\n// 2. Information that updates over time (let):\\nlet activeUsers = 50;\\nconsole.log(appName, \\"launched in\\", releaseYear, \\"with\\", activeUsers, \\"users.\\");\\n\\n// Update the user count:\\nactiveUsers = activeUsers + 25;\\nconsole.log(\\"Updated active users:\\", activeUsers);\\n\\n// 3. Inspecting types with typeof:\\nconsole.log(\\"Type of appName:\\", typeof appName);         // string\\nconsole.log(\\"Type of releaseYear:\\", typeof releaseYear); // number\\nconsole.log(\\"Type of isLive:\\", typeof true);             // boolean\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Create a const variable named 'country' and store your country in quotes.\\n// 2. Create a let variable named 'userScore' and set it to 10.\\n// 3. On the next line, update 'userScore' to 20.\\n// 4. Print both variables using console.log().\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
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
  }`;

const js03Updated = `  "js03-operators-and-equality": {
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
          "content": "When you use + between numbers, JavaScript adds them (5 + 5 is 10). But if either value is text, JavaScript joins them together as a string (\\"5\\" + 5 is \\"55\\"!)."
        },
        {
          "title": "2. Intentional Type Conversion",
          "content": "Never let JavaScript guess. If you have text like \\"42\\" and want to do math, convert it intentionally using Number(\\"42\\"). To convert a number to text, use String(42)."
        },
        {
          "title": "3. Strict (===) vs Loose (==) Equality",
          "content": "Double equals (==) tries to convert types behind your back, making 0 == \\"\\" true! Triple equals (===) strictly checks that both sides have the exact same type and value, so 0 === \\"\\" is correctly false.",
          "codeSnippet": "// Notice the difference between strict and loose equality:\\nconsole.log(10 === 10);     // true (same type and value)\\nconsole.log(10 === \\"10\\");   // false (number is not string)\\nconsole.log(10 == \\"10\\");    // true (danger: loose equality converts types!)"
        }
      ]
    },
    "part4": {
      "title": "Common Beginner Mistakes with Operators & Equality",
      "bad": {
        "title": "❌ Broken: Using = instead of ===, and adding text to numbers by mistake",
        "code": "// Mistake 1: Accidentally using a single equals = (assignment) instead of === (comparison)\\nconst userAge = 18;\\n// if (userAge = 21) { ... } -> ❌ Overwrites userAge instead of comparing it!\\n\\n// Mistake 2: Mixing numbers and strings in math without converting\\nconst itemPrice = \\"20\\";\\nconst tax = 5;\\nconst total = itemPrice + tax; // ❌ Result is \\"205\\" instead of 25!",
        "explanation": "A single equals (=) assigns a value, while triple equals (===) tests for equality. Adding a string to a number joins the characters together (\\"205\\") instead of calculating 25."
      },
      "good": {
        "title": "✅ Clean: Strict equality checks and intentional type conversion",
        "code": "// 1. Comparing safely with triple equals\\nconst userAge = 18;\\nconst isAdult = userAge >= 18;\\nconsole.log(\\"Is user an adult?\\", isAdult); // true\\n\\n// 2. Converting text to number before calculating\\nconst itemPriceText = \\"20\\";\\nconst itemPrice = Number(itemPriceText); // Convert text to number 20\\nconst tax = 5;\\nconst total = itemPrice + tax; // ✅ Correctly calculates 25\\nconsole.log(\\"Total price:\\", total);",
        "explanation": "Converting string inputs to numbers using Number() guarantees accurate arithmetic, and using === and >= makes comparisons clear and reliable."
      }
    },
    "part5": {
      "title": "Operators & Equality Playground",
      "intro": "Run the code below to see arithmetic, comparisons, and logical checks in action. Then complete the challenges in the comments!",
      "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// JS-03: OPERATORS, EQUALITY & TYPE CONVERSION\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\n// 1. Arithmetic & Text Joining:\\nconst price = 40;\\nconst shipping = 10;\\nconst totalCost = price + shipping;\\nconsole.log(\\"Order Total: $\\" + totalCost); // Text joining with +\\n\\n// 2. Comparisons (produce true or false):\\nconst userAge = 20;\\nconst hasTicket = true;\\n\\nconst isOldEnough = userAge >= 18;\\nconsole.log(\\"Is 18 or older:\\", isOldEnough); // true\\n\\n// 3. Strict Equality (===):\\nconsole.log(\\"Strict check (userAge === 20):\\", userAge === 20);     // true\\nconsole.log(\\"Strict check (userAge === '20'):\\", userAge === \\"20\\"); // false\\n\\n// 4. Combining checks with && (AND):\\nconst canEnterEvent = isOldEnough && hasTicket;\\nconsole.log(\\"Can enter event:\\", canEnterEvent); // true\\n\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n// YOUR TURN:\\n// 1. Create a variable 'score' set to 85.\\n// 2. Create a boolean variable 'passed' that checks if score >= 70.\\n// 3. Print 'passed' to the console.\\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n"
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
        "question": "What does the expression 10 + \\"5\\" evaluate to in JavaScript?",
        "options": [
          "15 (as a number)",
          "\\"105\\" (as text)",
          "NaN (Not a Number error)",
          "undefined"
        ],
        "correctIndex": 1,
        "explanation": "Because one of the values is a string (\\"5\\"), JavaScript converts the number 10 into text and joins them together, producing the string \\"105\\"."
      }
    }
  }`;

// Find start of js01 and end of js03 in lessonContent
const startMark = '  "js01-how-javascript-runs": {';
const endMark = '  "js04-conditional-logic": {';

const startIdx = lessonContent.indexOf(startMark);
const endIdx = lessonContent.indexOf(endMark);

if (startIdx === -1 || endIdx === -1) {
  throw new Error("Could not find start/end marks in javascript-lesson-content.ts");
}

const newBatchContent = js01Updated + ',\n\n' + js02Updated + ',\n\n' + js03Updated + ',\n\n';
lessonContent = lessonContent.slice(0, startIdx) + newBatchContent + lessonContent.slice(endIdx);
fs.writeFileSync(lessonContentPath, lessonContent, 'utf8');
console.log("Successfully updated javascript-lesson-content.ts for JS-01, JS-02, and JS-03!");

// 2. Update lib/quiz/javascript-quizzes.ts
const quizzesPath = 'lib/quiz/javascript-quizzes.ts';
let quizzesContent = fs.readFileSync(quizzesPath, 'utf8');

const updatedQuizzesBatch = `  {
    "id": "quiz-javascript-js01",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js01-how-javascript-runs",
    "lessonCode": "JS-01",
    "lessonTitle": "How JavaScript Works: Running Code, The Console & Sequential Steps",
    "description": "Test your understanding of how JavaScript runs code line by line, using console.log() for output, and how expressions produce values.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js01-q1",
        "type": "multiple_choice",
        "title": "Line-by-Line Execution",
        "prompt": "How does JavaScript execute statements inside a script by default?",
        "options": [
          "It executes statements line by line from top to bottom in order",
          "It runs lines in random order depending on computer speed",
          "It starts at the bottom of the file and reads upward",
          "It only executes lines that contain numbers"
        ],
        "correctAnswer": 0,
        "explanation": "JavaScript executes code sequentially from top to bottom. It finishes each line before moving to the next line.",
        "hint": "Think about reading instructions from top to bottom.",
        "hintCostXP": 5
      },
      {
        "id": "js01-q2",
        "type": "code_output",
        "title": "Sequential Execution and Math Output",
        "prompt": "Predict the exact console output of this sequential code execution:",
        "codeSnippet": "console.log(\\"Step A\\");\\nconsole.log(\\"Sum:\\", 10 + 5);\\nconsole.log(\\"Step B\\");",
        "language": "javascript",
        "options": [
          "'Step A', 'Sum: 15', 'Step B'",
          "'Step A', 'Step B', 'Sum: 15'",
          "'Sum: 15', 'Step A', 'Step B'",
          "'Step A', 'Sum: 105', 'Step B'"
        ],
        "correctAnswer": 0,
        "explanation": "JavaScript runs line by line from top to bottom. Line 1 logs 'Step A', line 2 calculates 10 + 5 and logs 'Sum: 15', and line 3 logs 'Step B'.",
        "hint": "Follow the execution line by line and note that 10 + 5 is calculated first.",
        "hintCostXP": 5
      },
      {
        "id": "js01-q3",
        "type": "multiple_choice",
        "title": "Text in Quotes vs Unquoted Words",
        "prompt": "Why does console.log(\\"Welcome\\") work correctly, but console.log(Welcome) causes an error?",
        "options": [
          "Quotes tell JavaScript that the text inside is a plain text string; without quotes, JavaScript looks for a variable or command named Welcome that does not exist",
          "console.log only allows uppercase letters when words are unquoted",
          "Unquoted words are automatically erased before the program runs",
          "There is no difference; both lines run identically without any error"
        ],
        "correctAnswer": 0,
        "explanation": "Text must always be enclosed in quotes so JavaScript knows it is literal text (a string). Leaving off quotes causes JavaScript to search for a variable named Welcome, triggering a ReferenceError.",
        "hint": "Quotes signal to JavaScript that you want to display literal words.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js02",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js02-variables-and-data-types",
    "lessonCode": "JS-02",
    "lessonTitle": "Variables & Data Types: Storing Data with let & const",
    "description": "Check your understanding of creating variables with const and let, preventing accidental reassignments, and identifying core data types.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js02-q1",
        "type": "multiple_choice",
        "title": "const vs let best practice",
        "prompt": "What is the recommended best practice when declaring variables in modern JavaScript?",
        "options": [
          "Default to const for values that stay constant, and use let only when a value needs to be reassigned",
          "Use var for everything because it is the newest keyword",
          "Always use let because const variables can never be read after creation",
          "Never use keywords when creating variables"
        ],
        "correctAnswer": 0,
        "explanation": "Using const by default makes code predictable and prevents accidental reassignment bugs. Use let only when a value genuinely needs reassignment (such as counters or scores).",
        "hint": "Values that cannot change by accident make your code safe and predictable.",
        "hintCostXP": 5
      },
      {
        "id": "js02-q2",
        "type": "code_output",
        "title": "Reassigning a const Variable",
        "prompt": "What happens when you run this code?",
        "codeSnippet": "const maxLives = 3;\\nmaxLives = 5;\\nconsole.log(maxLives);",
        "language": "javascript",
        "options": [
          "It throws a TypeError because a const variable cannot be reassigned",
          "It logs 5 to the console",
          "It logs 3 because the new assignment is silently ignored",
          "It logs undefined"
        ],
        "correctAnswer": 0,
        "explanation": "Variables declared with const are locked. Reassigning a new value throws a TypeError: Assignment to constant variable.",
        "hint": "Think about what the word 'constant' means.",
        "hintCostXP": 5
      },
      {
        "id": "js02-q3",
        "type": "code_output",
        "title": "typeof Core Primitives",
        "prompt": "What will this code log to the console?",
        "codeSnippet": "const playerName = \\"Sam\\";\\nconst userScore = 100;\\nconst isOnline = true;\\nconsole.log(typeof playerName, typeof userScore, typeof isOnline);",
        "language": "javascript",
        "options": [
          "'string number boolean'",
          "'text int bool'",
          "'string int true'",
          "'word number flag'"
        ],
        "correctAnswer": 0,
        "explanation": "In JavaScript, text wrapped in quotes has type 'string', numbers have type 'number', and true/false values have type 'boolean'.",
        "hint": "JavaScript uses 'string', 'number', and 'boolean' for its core types.",
        "hintCostXP": 5
      }
    ]
  },
  {
    "id": "quiz-javascript-js03",
    "trackKey": "javascript",
    "trackTitle": "JavaScript",
    "lessonSlug": "js03-operators-and-equality",
    "lessonCode": "JS-03",
    "lessonTitle": "Operators, Comparisons & Type Conversion: The === Rule",
    "description": "Check your understanding of math operators, comparison checks, why === is safer than ==, and combining conditions with logic.",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15,
    "questions": [
      {
        "id": "js03-q1",
        "type": "code_output",
        "title": "Strict vs Loose Equality",
        "prompt": "Predict the output of these two comparisons:",
        "codeSnippet": "console.log(5 === \\"5\\");\\nconsole.log(5 === 5);",
        "language": "javascript",
        "options": [
          "false then true",
          "true then true",
          "false then false",
          "true then false"
        ],
        "correctAnswer": 0,
        "explanation": "Strict equality (===) checks both value and type. Because 5 is a number and '5' is a string, 5 === '5' is false. 5 === 5 compares two identical numbers, so it is true.",
        "hint": "Triple equals checks whether both the type and the value match exactly.",
        "hintCostXP": 5
      },
      {
        "id": "js03-q2",
        "type": "code_output",
        "title": "Number + String Behavior",
        "prompt": "What will this code print to the console?",
        "codeSnippet": "const count = 10;\\nconst label = \\" items\\";\\nconsole.log(count + label);",
        "language": "javascript",
        "options": [
          "'10 items'",
          "NaN",
          "'items 10'",
          "Throws a TypeError"
        ],
        "correctAnswer": 0,
        "explanation": "When the + operator is used between a number and a string, JavaScript converts the number to text and joins them together, resulting in '10 items'.",
        "hint": "The + operator joins text when at least one side is a string.",
        "hintCostXP": 5
      },
      {
        "id": "js03-q3",
        "type": "code_output",
        "title": "Logical AND (&&) Combination",
        "prompt": "What will this logical check output to the console?",
        "codeSnippet": "const userAge = 20;\\nconst hasTicket = true;\\nconst canEnter = userAge >= 18 && hasTicket;\\nconsole.log(canEnter);",
        "language": "javascript",
        "options": [
          "true",
          "false",
          "undefined",
          "20"
        ],
        "correctAnswer": 0,
        "explanation": "userAge >= 18 evaluates to true, and hasTicket is true. Because both sides of && are true, canEnter is true.",
        "hint": "The && operator requires both sides to be true.",
        "hintCostXP": 5
      }
    ]
  }`;

const quizStartMark = '  {\n    "id": "quiz-javascript-js01",';
const quizEndMark = '  {\n    "id": "quiz-javascript-js04",';

const qStartIdx = quizzesContent.indexOf(quizStartMark);
const qEndIdx = quizzesContent.indexOf(quizEndMark);

if (qStartIdx === -1 || qEndIdx === -1) {
  throw new Error("Could not find quiz start/end marks in javascript-quizzes.ts");
}

quizzesContent = quizzesContent.slice(0, qStartIdx) + updatedQuizzesBatch + ',\n' + quizzesContent.slice(qEndIdx);
fs.writeFileSync(quizzesPath, quizzesContent, 'utf8');
console.log("Successfully updated lib/quiz/javascript-quizzes.ts for JS-01, JS-02, and JS-03!");
