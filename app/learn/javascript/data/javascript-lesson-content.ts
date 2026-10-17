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
  "title": "How JavaScript Runs: The Runtime, Console & Statements",
  "subtitle": "Understand the JavaScript engine, call stack, console.log, and basic syntax rules.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master How JavaScript Runs: The Runtime, Console & Statements. Think of this like A Musical Conductor reading a sheet of music line by line, ensuring every instrument plays in order without skipping beats. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "The JavaScript Engine (V8)",
        "desc": "Translates human-readable code into fast, optimized machine instructions."
      },
      {
        "title": "Single-Threaded Execution",
        "desc": "Runs one line at a time from top to bottom on a single Call Stack."
      },
      {
        "title": "The Console & Statements",
        "desc": "Use console.log() as your primary window into program state and values."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of How JavaScript Runs: The Runtime, Console & Statements:",
    "cards": [
      {
        "number": "01",
        "tag": "Engine",
        "title": "V8 & Runtimes",
        "description": "Browsers and Node.js embed engines to execute JS with JIT compilation.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Execution",
        "title": "Top-to-Bottom",
        "description": "Statements execute sequentially unless deferred by control flow or timers.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Debugging",
        "title": "console.log()",
        "description": "Inspect variables, types, and logic flow during live execution.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always keep statements simple and readable. Use semicolons or consistent ASI and inspect values using console.log."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Parsing & AST",
        "content": "The engine reads raw text and converts it into an Abstract Syntax Tree before compiling."
      },
      {
        "title": "2. The Call Stack",
        "content": "Active function calls are pushed onto the call stack and popped off when they return."
      },
      {
        "title": "3. Non-Blocking Design",
        "content": "Long operations are offloaded so the single thread never freezes the browser UI."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Assuming execution order with unhandled errors",
      "code": "console.log(\"Starting...\");\n// Accessing undeclared variable throws ReferenceError and crashes script:\nconsole.log(unknownVariable);\nconsole.log(\"This will never run!\");",
      "explanation": "A runtime error in synchronous code crashes the call stack, halting all subsequent statements."
    },
    "good": {
      "title": "✅ Clean: Safe, structured sequential execution with logging",
      "code": "console.log(\"1. Application booting...\");\nconst appName = \"LearnCraft Engine\";\nconst version = 2.0;\n\nconsole.log(\"2. Running:\", appName, \"(v\" + version + \")\");\nconsole.log(\"3. System check: All diagnostics passed!\");",
      "explanation": "Sequential statements with clear identifiers and output verification guarantee predictable runtime behavior."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with How JavaScript Runs: The Runtime, Console & Statements directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-01: HOW JAVASCRIPT RUNS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconsole.log(\"🚀 Program started\");\n\nconst greeting = \"Hello, JavaScript Learner!\";\nconst year = 2026;\n\nconsole.log(greeting);\nconsole.log(\"Welcome to the year:\", year);\n\n// Calculation:\nconst secondsInMinute = 60;\nconst minutesInHour = 60;\nconst secondsInHour = secondsInMinute * minutesInHour;\n\nconsole.log(\"Seconds in an hour:\", secondsInHour);\nconsole.log(\"✨ Execution completed successfully!\");\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. V8 Engine",
        "desc": "Browsers compile and optimize JavaScript on the fly."
      },
      {
        "title": "2. Call Stack",
        "desc": "Code runs sequentially on a single execution thread."
      },
      {
        "title": "3. console.log",
        "desc": "Use console.log to inspect variables and debug flow."
      },
      {
        "title": "4. Next: Variables",
        "desc": "In JS-02, we learn how to store and manage data with let and const."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-02: Variables & Data Types: Storing Data with let & const",
      "desc": "Master let, const, and the 7 primitive data types while avoiding legacy var pitfalls."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What does it mean that JavaScript is 'single-threaded'?",
      "options": [
        "It can only run on computers with a single CPU core.",
        "It executes one task at a time on a single Call Stack in sequential order.",
        "It can only have one file per web application.",
        "It cannot perform any math calculations."
      ],
      "correctIndex": 1,
      "explanation": "JavaScript is single-threaded because it has one call stack and executes one command at a time from top to bottom."
    }
  }
},

  "js02-variables-and-data-types": {
  "slug": "js02-variables-and-data-types",
  "code": "JS-02",
  "title": "Variables & Data Types: Storing Data with let & const",
  "subtitle": "Master let, const, primitive types, and avoid the pitfalls of legacy var.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Variables & Data Types: Storing Data with let & const. Think of this like Labeled Storage Bins in a workshop — let is a reusable bin you can empty and refill, const is a sealed glass display case you cannot reassign. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "let vs const",
        "desc": "Use const by default for stable references; use let only when values need reassignment."
      },
      {
        "title": "Primitive Types",
        "desc": "String, Number, Boolean, BigInt, Symbol, null, and undefined are stored directly by value."
      },
      {
        "title": "Avoid Legacy var",
        "desc": "var has leaky function scoping and hoists with undefined, causing subtle bugs."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Variables & Data Types: Storing Data with let & const:",
    "cards": [
      {
        "number": "01",
        "tag": "Variables",
        "title": "const (Default)",
        "description": "Prevents accidental reassignment. Ensures variables remain predictable.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Variables",
        "title": "let (When Changing)",
        "description": "Block-scoped variable that permits reassignment (e.g., loop counters).",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Data Types",
        "title": "7 Primitives",
        "description": "Immutable values stored directly in memory (number, string, boolean, etc.).",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Default to const for 95% of variables. Switch to let only when you know the value must be reassigned."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Block Scoping",
        "content": "let and const live only inside the nearest { } enclosing block."
      },
      {
        "title": "2. Temporal Dead Zone",
        "content": "Accessing let or const before declaration throws a ReferenceError."
      },
      {
        "title": "3. typeof Operator",
        "content": "Check the runtime type of any value using typeof (e.g., typeof 42 === 'number')."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using var and accidental variable leakage",
      "code": "for (var i = 0; i < 3; i++) {\n  // var leaks out of this loop into outer scope!\n}\nconsole.log(\"Leaked i outside loop:\", i); // 3 (Dangerous!)",
      "explanation": "var ignores block boundaries and leaks outside the loop, polluting the outer scope."
    },
    "good": {
      "title": "✅ Clean: Clean const and let with block-scoped isolation",
      "code": "const maxItems = 3;\nlet currentCount = 0;\n\nfor (let i = 0; i < maxItems; i++) {\n  currentCount++;\n}\n\nconsole.log(\"Final count:\", currentCount);\n// i is safely cleaned up and does not leak outside!",
      "explanation": "const protects configuration, while let confines loop counters strictly to their block scope."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Variables & Data Types: Storing Data with let & const directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-02: VARIABLES & DATA TYPES\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Immutable reference (const)\nconst websiteName = \"LearnCraft\";\nconst maxScore = 100;\nconst isLive = true;\n\n// 2. Mutable variable (let)\nlet currentScore = 85;\ncurrentScore += 10;\n\nconsole.log(\"Platform:\", websiteName);\nconsole.log(\"Current Score:\", currentScore, \"/\", maxScore);\n\n// 3. Inspecting Primitive Types with typeof\nconsole.log(\"Type of websiteName:\", typeof websiteName); // string\nconsole.log(\"Type of currentScore:\", typeof currentScore); // number\nconsole.log(\"Type of isLive:\", typeof isLive);             // boolean\n\n// 4. null vs undefined\nlet unassignedValue;\nconst intentionalEmpty = null;\n\nconsole.log(\"Unassigned:\", unassignedValue); // undefined\nconsole.log(\"Intentional Empty:\", intentionalEmpty); // null\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Always const First",
        "desc": "Default to const to avoid accidental reassignments."
      },
      {
        "title": "2. let for Changes",
        "desc": "Use let for counters, accumulators, and toggles."
      },
      {
        "title": "3. Block Scope",
        "desc": "Both let and const respect curly braces {}."
      },
      {
        "title": "4. Next: Operators",
        "desc": "In JS-03, we explore arithmetic, logical operators, and ===."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-03: Operators, Equality & Type Coercion: The === Rule",
      "desc": "Learn why developers always use === and how JavaScript evaluates truthy vs falsy values."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Which keyword should you use by default when creating a new variable in modern JavaScript?",
      "options": [
        "var, because it works everywhere.",
        "const, because it prevents accidental reassignment and makes code predictable.",
        "let, because const is deprecated.",
        "global, to make variables accessible everywhere."
      ],
      "correctIndex": 1,
      "explanation": "Best practice is to use const by default. Only use let when you explicitly know the value will be reassigned."
    }
  }
},

  "js03-operators-and-equality": {
  "slug": "js03-operators-and-equality",
  "code": "JS-03",
  "title": "Operators, Equality & Type Coercion: The === Rule",
  "subtitle": "Master math operators, logical expressions, and why you must always use strict equality (===).",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Operators, Equality & Type Coercion: The === Rule. Think of this like A strict Airport Customs Officer who checks both your Ticket AND your Passport photo. Double equals (==) lets anyone in with a vague resemblance; triple equals (===) requires an exact identity match. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Arithmetic & Logic",
        "desc": "Perform calculations (+, -, *, /, %) and logical tests (&&, ||, !)."
      },
      {
        "title": "The Triple Equals Rule",
        "desc": "Always use === (strict equality) to check both value and type without silent coercion."
      },
      {
        "title": "Truthy vs Falsy",
        "desc": "Know the 6 core falsy values: false, 0, '', null, undefined, and NaN."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Operators, Equality & Type Coercion: The === Rule:",
    "cards": [
      {
        "number": "01",
        "tag": "Strict",
        "title": "=== (Strict Equality)",
        "description": "Checks value AND type. 5 === '5' is false. Predictable and bug-free.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Loose Trap",
        "title": "== (Loose Equality)",
        "description": "Performs hidden type conversions. 0 == '' is true. Never use in modern code.",
        "color": "rose"
      },
      {
        "number": "03",
        "tag": "Logical",
        "title": "&& and || Operators",
        "description": "Short-circuit evaluation: && stops at first falsy, || stops at first truthy.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never use == or !=. Always use === and !==. Memorize the 6 falsy values to write bug-free conditions."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Strict vs Loose",
        "content": "Loose equality (==) coerces types unpredictably (e.g., [] == false is true!)."
      },
      {
        "title": "2. Short-Circuiting",
        "content": "Expressions evaluate left-to-right and stop as soon as the result is determined."
      },
      {
        "title": "3. Truthiness",
        "content": "Every value in JavaScript is truthy except: false, 0, -0, '', null, undefined, and NaN."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using loose equality (==) and confusing type coercion",
      "code": "console.log(0 == \"\");      // true! (Confusing!)\nconsole.log(false == \"0\"); // true! (Bizarre!)\nconsole.log(null == undefined); // true!",
      "explanation": "Double equals performs hidden type conversions that lead to bizarre, unpredictable production bugs."
    },
    "good": {
      "title": "✅ Clean: Predictable strict equality (===) and explicit type checks",
      "code": "console.log(0 === \"\");       // false (Number is not String!)\nconsole.log(false === \"0\");  // false (Boolean is not String!)\nconsole.log(5 === 5);        // true (Exact match)",
      "explanation": "Triple equals checks both the value and type with zero hidden surprises."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Operators, Equality & Type Coercion: The === Rule directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-03: OPERATORS & EQUALITY\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst userAge = 20;\nconst hasIdCard = true;\nconst isVipMember = false;\n\n// 1. Math calculation\nconst ticketPrice = 50;\nconst tax = ticketPrice * 0.10;\nconst totalCost = ticketPrice + tax;\nconsole.log(\"Total Cost: $\" + totalCost);\n\n// 2. Logical AND (&&): 18+ AND has ID\nconst canEnter = userAge >= 18 && hasIdCard;\nconsole.log(\"Allowed to enter club:\", canEnter);\n\n// 3. Logical OR (||): VIP OR spent > $100\nconst getsFreeDrink = isVipMember || totalCost > 100;\nconsole.log(\"Gets free drink:\", getsFreeDrink);\n\n// 4. Strict check\nconsole.log(\"Is age exactly 20?:\", userAge === 20); // true\nconsole.log(\"Is age strictly '20'?:\", userAge === \"20\"); // false!\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Always Use ===",
        "desc": "Check both type and value with triple equals."
      },
      {
        "title": "2. Know the 6 Falsies",
        "desc": "false, 0, '', null, undefined, and NaN."
      },
      {
        "title": "3. Combine with && and ||",
        "desc": "Use logical operators to test multiple conditions."
      },
      {
        "title": "4. Next: Conditional Logic",
        "desc": "In JS-04, we learn how to make decisions with if, else, and switch."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-04: Conditional Logic: Decision Making with if/else & switch",
      "desc": "Learn how your code chooses different paths using if, else, and switch statements."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why should developers always use === instead of == in JavaScript?",
      "options": [
        "Because === is three letters shorter to type.",
        "Because === checks both value and type without performing confusing implicit type coercion.",
        "Because == was removed from JavaScript in 2024.",
        "Because === only works for negative numbers."
      ],
      "correctIndex": 1,
      "explanation": "Strict equality (===) avoids silent type coercion bugs by checking both the value and type."
    }
  }
},

  "js04-conditional-logic": {
  "slug": "js04-conditional-logic",
  "code": "JS-04",
  "title": "Conditional Logic: Decision Making with if/else & switch",
  "subtitle": "Make decisions in code using if, else, ternary operators, and switch blocks with break.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Conditional Logic: Decision Making with if/else & switch. Think of this like A Train Track Switch — steering trains onto different tracks based on signals, preventing collisions and directing cargo safely. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "if / else Branching",
        "desc": "Execute block A when condition is true, or block B when false."
      },
      {
        "title": "Ternary Operator ( ? : )",
        "desc": "A concise 1-line expression for assigning values conditionally."
      },
      {
        "title": "switch with break",
        "desc": "Match multiple exact values without repeating verbose if/else chains."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Conditional Logic: Decision Making with if/else & switch:",
    "cards": [
      {
        "number": "01",
        "tag": "Branching",
        "title": "if...else if...else",
        "description": "Evaluates truthy/falsy conditions in order from top to bottom.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Inline",
        "title": "Ternary Operator",
        "description": "condition ? valueIfTrue : valueIfFalse — use for simple inline assignments.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Multi-Match",
        "title": "switch Statements",
        "description": "Always include 'break' after each case to prevent accidental fallthrough.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Avoid nesting if statements more than 2 levels deep. Use guard clauses (early return) to keep logic flat and readable."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Top-Down Checking",
        "content": "The engine stops evaluating as soon as it encounters the first true condition."
      },
      {
        "title": "2. Guard Clauses",
        "content": "Check invalid cases early and return, keeping the 'happy path' clean."
      },
      {
        "title": "3. Always Break",
        "content": "In switch statements, omit 'break' only when you intentionally want consecutive cases to share logic."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Deeply nested pyramid of if-statements",
      "code": "function getRoleBadge(role) {\n  if (role) {\n    if (role === \"admin\") {\n      return \"👑 Admin\";\n    } else {\n      if (role === \"editor\") {\n        return \"✍️ Editor\";\n      } else {\n        return \"👤 Viewer\";\n      }\n    }\n  }\n}",
      "explanation": "Deep nesting creates an unreadable 'pyramid of doom'. It is easy to miss edge cases or make indentation mistakes."
    },
    "good": {
      "title": "✅ Clean: Guard clause + clean switch with explicit cases",
      "code": "function getRoleBadge(role) {\n  switch (role) {\n    case \"admin\":\n      return \"👑 Admin\";\n    case \"editor\":\n      return \"✍️ Editor\";\n    case \"viewer\":\n    default:\n      return \"👤 Viewer\";\n  }\n}\nconsole.log(getRoleBadge(\"admin\")); // 👑 Admin",
      "explanation": "Flat, readable switch block with clear cases and a default fallback. Direct returns eliminate the need for break keywords."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Conditional Logic: Decision Making with if/else & switch directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-04: CONDITIONAL LOGIC & DECISION MAKING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst userTier = \"PREMIUM\";\nconst cartTotal = 120;\n\n// 1. Guard clause / conditional logic\nlet discountPercent = 0;\n\nif (userTier === \"VIP\") {\n  discountPercent = 25;\n} else if (userTier === \"PREMIUM\" && cartTotal >= 100) {\n  discountPercent = 15;\n} else if (cartTotal >= 150) {\n  discountPercent = 10;\n} else {\n  discountPercent = 0;\n}\n\n// 2. Ternary operator for shipping status\nconst isFreeShipping = cartTotal >= 50 ? \"FREE\" : \"$9.99\";\n\nconsole.log(\"Tier:\", userTier);\nconsole.log(\"Discount Applied:\", discountPercent + \"%\");\nconsole.log(\"Shipping:\", isFreeShipping);\n\nconst finalPrice = cartTotal - (cartTotal * (discountPercent / 100));\nconsole.log(\"Final Total: $\" + finalPrice.toFixed(2));\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Guard Clauses",
        "desc": "Return early to keep code flat and avoid deep if-nesting."
      },
      {
        "title": "2. Ternary for Assignments",
        "desc": "Use ternary operators only for simple 1-line assignments."
      },
      {
        "title": "3. Break in Switch",
        "desc": "Always terminate switch cases with break or return."
      },
      {
        "title": "4. Next: Loops",
        "desc": "In JS-05, we learn how to repeat tasks efficiently with loops."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-05: Loops & Iteration: Repeating Work Without Repeating Code",
      "desc": "Master for, while, and for...of loops without creating browser-freezing infinite loops."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens in a switch statement if you forget to add a 'break' statement after a case?",
      "options": [
        "It throws a SyntaxError and stops execution.",
        "It falls through and executes the next case regardless of whether the condition matches.",
        "It restarts the switch statement from the top.",
        "It automatically returns null."
      ],
      "correctIndex": 1,
      "explanation": "Without a break statement, JavaScript falls through to execute subsequent case blocks even if their case expressions do not match."
    }
  }
},

  "js05-loops-and-iteration": {
  "slug": "js05-loops-and-iteration",
  "code": "JS-05",
  "title": "Loops & Iteration: Repeating Work Without Repeating Code",
  "subtitle": "Repeat tasks efficiently using for, while, and for...of loops without creating infinite loops.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Loops & Iteration: Repeating Work Without Repeating Code. Think of this like A Factory Conveyor Belt — inspect and process each item as it passes along without stopping the entire factory. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "for Loop",
        "desc": "Repeat a fixed number of times with an index counter."
      },
      {
        "title": "while Loop",
        "desc": "Repeat continuously as long as a condition remains true."
      },
      {
        "title": "for...of Loop",
        "desc": "The cleanest modern way to loop through arrays and lists."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Loops & Iteration: Repeating Work Without Repeating Code:",
    "cards": [
      {
        "number": "01",
        "tag": "Counting",
        "title": "Classic for loop",
        "description": "for (let i = 0; i < max; i++) — best when you need the numeric index.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Conditional",
        "title": "while loop",
        "description": "while (condition) — best when you do not know beforehand how many loops are needed.",
        "color": "amber"
      },
      {
        "number": "03",
        "tag": "Collections",
        "title": "for...of loop",
        "description": "for (const item of list) — modern, readable loop for arrays without index boilerplate.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always ensure your loop has a guaranteed exit condition. In while loops, increment the counter to avoid freezing the browser."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Three Parts of for",
        "content": "Initialization (let i = 0), Condition (i < n), and Update (i++)."
      },
      {
        "title": "2. Break vs Continue",
        "content": "break stops the loop entirely; continue skips the current iteration and jumps to the next."
      },
      {
        "title": "3. Prefer for...of",
        "content": "Whenever you only need values from an array, use for...of instead of manual indices."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Accidental infinite loop freezing the browser",
      "code": "let count = 0;\n// Dangerous while loop missing counter update:\n// while (count < 5) {\n//   console.log(\"Count:\", count);\n//   // Forgot count++ -> Browser tab freezes forever!\n// }",
      "explanation": "If the loop condition never becomes false, the engine runs forever in an infinite loop, freezing the browser tab."
    },
    "good": {
      "title": "✅ Clean: Clean for...of loop with break condition",
      "code": "const tasks = [\"Review PR\", \"Deploy build\", \"URGENT: Fix bug\", \"Write docs\"];\n\nfor (const task of tasks) {\n  if (task.startsWith(\"URGENT\")) {\n    console.log(\"🚨 Priority task found:\", task);\n    break; // Exit loop early\n  }\n  console.log(\"Processed:\", task);\n}",
      "explanation": "Using for...of with a clean break condition executes safely and stops immediately when the target is found."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Loops & Iteration: Repeating Work Without Repeating Code directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-05: LOOPS & ITERATION DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst scores = [85, 92, 45, 99, 78];\n\nconsole.log(\"--- 1. Loop with for...of ---\");\nlet total = 0;\nfor (const score of scores) {\n  total += score;\n}\nconsole.log(\"Class Average:\", (total / scores.length).toFixed(1));\n\nconsole.log(\"--- 2. Loop with index (Classic for) ---\");\nfor (let i = 0; i < scores.length; i++) {\n  const status = scores[i] >= 80 ? \"Pass (Honor)\" : scores[i] >= 50 ? \"Pass\" : \"Fail\";\n  console.log(`Student #${i + 1}: ${scores[i]} pts -> ${status}`);\n}\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. for...of for Lists",
        "desc": "Use for...of for clean, readable array traversal without indices."
      },
      {
        "title": "2. Guaranteed Exit",
        "desc": "Always update while counters to prevent infinite loops."
      },
      {
        "title": "3. break & continue",
        "desc": "Control iteration flow cleanly without complicated flags."
      },
      {
        "title": "4. Next: Functions",
        "desc": "In JS-06, we learn how to package code into reusable functions."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-06: Functions: Parameters, Return Values & Arrow Syntax",
      "desc": "Learn how to write reusable functions, use default parameters, and write modern arrow functions."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the difference between the 'break' and 'continue' keywords inside a loop?",
      "options": [
        "break exits the entire loop immediately; continue skips to the next iteration.",
        "break pauses for 1 second; continue speeds up the loop.",
        "break is only used in switch statements; continue is only used in loops.",
        "They are completely interchangeable."
      ],
      "correctIndex": 0,
      "explanation": "The 'break' keyword terminates the loop entirely, while 'continue' skips the rest of the current iteration and proceeds to the next cycle."
    }
  }
},

  "js06-functions-and-arrow-syntax": {
  "slug": "js06-functions-and-arrow-syntax",
  "code": "JS-06",
  "title": "Functions: Parameters, Return Values & Arrow Syntax",
  "subtitle": "Write reusable functions: pass inputs in, perform operations, and return results.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Functions: Parameters, Return Values & Arrow Syntax. Think of this like A Smoothie Blender — you put ingredients in (parameters), run the blade (function body), and pour out a smoothie (return value). It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Function Declarations",
        "desc": "Declared with 'function name() {}'; hoisted to the top of their scope."
      },
      {
        "title": "Arrow Functions",
        "desc": "Modern syntax 'const name = () => {}' with concise 1-line returns."
      },
      {
        "title": "Parameters & Returns",
        "desc": "Pass data in with parameters, provide defaults, and return computed results."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Functions: Parameters, Return Values & Arrow Syntax:",
    "cards": [
      {
        "number": "01",
        "tag": "Declaration",
        "title": "function keyword",
        "description": "function add(a, b) { return a + b; } — traditional hoisted function.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Arrow ES6",
        "title": "Arrow Syntax",
        "description": "const add = (a, b) => a + b; — concise, modern, and does not rebind 'this'.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Defaults",
        "title": "Default Parameters",
        "description": "function greet(name = 'Guest') — provides safe fallbacks for missing arguments.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "A function should do one thing well (Single Responsibility Principle). Always return a value explicitly if callers need output."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Implicit Return",
        "content": "Arrow functions with no curly braces automatically return the expression value."
      },
      {
        "title": "2. Pure Functions",
        "content": "Functions that return the same output for the same input without side effects are easy to test."
      },
      {
        "title": "3. Arguments vs Parameters",
        "content": "Parameters are the variable names in the definition; arguments are the real values passed in."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Missing return statement causing undefined bugs",
      "code": "function calculateTotal(price, taxRate) {\n  const tax = price * taxRate;\n  const total = price + tax;\n  // Forgot return statement!\n}\n\nconst bill = calculateTotal(100, 0.08);\nconsole.log(\"Total:\", bill); // undefined!",
      "explanation": "If you omit 'return', JavaScript returns 'undefined' by default, corrupting downstream calculations."
    },
    "good": {
      "title": "✅ Clean: Clean arrow function with explicit return and defaults",
      "code": "const calculateTotal = (price, taxRate = 0.08) => {\n  const tax = price * taxRate;\n  return Number((price + tax).toFixed(2));\n};\n\nconst bill = calculateTotal(100);\nconsole.log(\"Total:\", bill); // 108",
      "explanation": "Providing default parameters prevents NaN bugs, and an explicit return delivers the calculated total."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Functions: Parameters, Return Values & Arrow Syntax directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-06: FUNCTIONS & ARROW SYNTAX\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Regular Function Declaration (Hoisted)\nfunction formatCurrency(amount, currency = \"$\") {\n  return currency + amount.toFixed(2);\n}\n\n// 2. Modern Arrow Function\nconst calculateDiscount = (price, discountPercent = 10) => {\n  const discountAmount = price * (discountPercent / 100);\n  return price - discountAmount;\n};\n\n// 3. Concise 1-line Arrow Function (implicit return)\nconst isEligibleForFreeShipping = (total) => total >= 75;\n\n// Test execution:\nconst originalPrice = 120;\nconst salePrice = calculateDiscount(originalPrice, 20);\n\nconsole.log(\"Original:\", formatCurrency(originalPrice));\nconsole.log(\"Sale Price (20% off):\", formatCurrency(salePrice));\nconsole.log(\"Free Shipping?:\", isEligibleForFreeShipping(salePrice));\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Arrow Functions",
        "desc": "Use arrow functions for concise syntax and callbacks."
      },
      {
        "title": "2. Default Parameters",
        "desc": "Set fallbacks in the parameter list to prevent undefined errors."
      },
      {
        "title": "3. Explicit Returns",
        "desc": "Always return the calculated result so callers can use it."
      },
      {
        "title": "4. Next: Scope",
        "desc": "In JS-07, we explore where variables live: global, function, and block scope."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-07: Scope: Global, Function, and Block Scope",
      "desc": "Understand variable visibility, the scope chain, and why block scoping prevents naming conflicts."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What does a JavaScript function return if it executes to the end without reaching a 'return' statement?",
      "options": [
        "null",
        "0",
        "undefined",
        "false"
      ],
      "correctIndex": 2,
      "explanation": "In JavaScript, any function that finishes executing without an explicit return statement returns undefined."
    }
  }
},

  "js07-scope-global-function-block": {
  "slug": "js07-scope-global-function-block",
  "code": "JS-07",
  "title": "Scope: Global, Function, and Block Scope",
  "subtitle": "Understand where variables live, the scope chain, and how block scoping prevents bugs.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Scope: Global, Function, and Block Scope. Think of this like One-Way Tinted Glass — people inside a private room can look out into the lobby, but people in the lobby cannot see inside the private room. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Global Scope",
        "desc": "Variables accessible anywhere in the entire program; use sparingly."
      },
      {
        "title": "Function Scope",
        "desc": "Variables created inside a function exist only during its execution."
      },
      {
        "title": "Block Scope (let/const)",
        "desc": "Confined strictly within { } curly braces, preventing leaks."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Scope: Global, Function, and Block Scope:",
    "cards": [
      {
        "number": "01",
        "tag": "Scope Level",
        "title": "Block Scope",
        "description": "Variables declared with let/const inside { } are inaccessible from outside.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Scope Level",
        "title": "Function Scope",
        "description": "Each function creates a new execution context and variable environment.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Lookup",
        "title": "Scope Chain",
        "description": "If a variable is not found locally, the engine searches outward to parent scopes.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always minimize global variables. Keep variables as close to their point of use as possible to prevent collisions."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Outward Lookup Only",
        "content": "Inner scopes can access outer variables, but outer scopes cannot reach into inner scopes."
      },
      {
        "title": "2. Variable Shadowing",
        "content": "Declaring a variable with the same name in an inner scope shadows (masks) the outer one."
      },
      {
        "title": "3. Pollution Risks",
        "content": "Excessive global variables cause name collisions in large web applications."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Accidental global variable declaration without keyword",
      "code": "function processPayment(amount) {\n  // Forgot const/let! userBalance becomes an accidental global variable:\n  userBalance = 500 - amount;\n}\nprocessPayment(100);\nconsole.log(\"Accidental global:\", userBalance); // 400",
      "explanation": "Assigning to an undeclared variable implicitly creates a global property, polluting memory."
    },
    "good": {
      "title": "✅ Clean: Strict block and function scoping with let and const",
      "code": "function processPayment(amount) {\n  const initialBalance = 500;\n  const remaining = initialBalance - amount;\n  return remaining;\n}\nconst updated = processPayment(100);\nconsole.log(\"Remaining:\", updated);\n// initialBalance and remaining are safely encapsulated!",
      "explanation": "Encapsulating variables inside the function prevents unintended side effects and global pollution."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Scope: Global, Function, and Block Scope directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-07: SCOPE DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst appVersion = \"1.0.0\"; // Global scope\n\nfunction createSession(user) {\n  const sessionId = \"sess_\" + Math.floor(Math.random() * 10000); // Function scope\n\n  if (user) {\n    const role = user.isAdmin ? \"ADMIN\" : \"MEMBER\"; // Block scope\n    console.log(`[Session ${sessionId}] User: ${user.name} (${role})`);\n  }\n\n  // console.log(role); // ReferenceError! role is trapped inside the if-block.\n  return sessionId;\n}\n\nconst activeId = createSession({ name: \"Alex\", isAdmin: true });\nconsole.log(\"Active Session Created:\", activeId);\nconsole.log(\"Global App Version:\", appVersion);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Block Isolation",
        "desc": "let and const keep variables confined to their enclosing block."
      },
      {
        "title": "2. Scope Chain",
        "desc": "The engine searches outward, never inward."
      },
      {
        "title": "3. No Accidental Globals",
        "desc": "Always declare variables with const or let."
      },
      {
        "title": "4. Next: Closures",
        "desc": "In JS-08, we explore how functions remember variables from their birthplace."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-08: Closures: How Functions Remember Their Birthplace",
      "desc": "Learn how inner functions retain access to outer variables even after the outer function has finished executing."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Can code running outside an 'if' block access a variable declared with 'const' inside that block?",
      "options": [
        "Yes, const variables are always globally accessible.",
        "No, const and let are block-scoped to the enclosing curly braces {}.",
        "Only if the condition was true.",
        "Only in Node.js, not in browsers."
      ],
      "correctIndex": 1,
      "explanation": "Variables declared with let and const are strictly block-scoped and cannot be accessed outside the curly braces {}."
    }
  }
},

  "js08-closures": {
  "slug": "js08-closures",
  "code": "JS-08",
  "title": "Closures: How Functions Remember Their Birthplace",
  "subtitle": "Understand how functions carry a backpack of variables from where they were born.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Closures: How Functions Remember Their Birthplace. Think of this like A Traveler's Backpack — whenever a function is created, it packs all surrounding variables into its backpack. Wherever it travels, it still has access to everything packed inside. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Lexical Scoping",
        "desc": "Functions resolve variables based on where they were written, not where called."
      },
      {
        "title": "The Closure Backpack",
        "desc": "Retains references to outer variables even after the parent function returns."
      },
      {
        "title": "Data Privacy & Encapsulation",
        "desc": "Create private state without needing classes or special symbols."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Closures: How Functions Remember Their Birthplace:",
    "cards": [
      {
        "number": "01",
        "tag": "Definition",
        "title": "What is a Closure?",
        "description": "A function bundled together with references to its surrounding lexical state.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Use Case",
        "title": "Private State",
        "description": "Keep variables hidden from external tampering by exposing only controlled methods.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Memory",
        "title": "Garbage Collection",
        "description": "Variables retained by an active closure are kept alive in memory.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Use closures to protect private state. When returning methods that share variables, do not expose the raw state directly."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Birthplace Binding",
        "content": "A closure remembers its lexical birthplace regardless of how or where it is invoked later."
      },
      {
        "title": "2. By-Reference Capture",
        "content": "Closures capture variables by reference, so mutating the variable updates what the closure sees."
      },
      {
        "title": "3. Factory Functions",
        "content": "Functions returning functions allow you to manufacture customized handlers with baked-in data."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Exposing mutable state globally for anyone to overwrite",
      "code": "// Anyone in the app can mutate or corrupt bankBalance!\nlet bankBalance = 1000;\n\nfunction withdraw(amount) {\n  bankBalance -= amount;\n}\n\n// Another script accidentally overwrites it:\nbankBalance = -999999;",
      "explanation": "Global variables can be overwritten by any rogue script or third-party dependency."
    },
    "good": {
      "title": "✅ Clean: Encapsulated private state via a closure factory",
      "code": "function createBankAccount(initialDeposit) {\n  let balance = initialDeposit; // Private variable!\n\n  return {\n    deposit: (amount) => { balance += amount; return balance; },\n    withdraw: (amount) => {\n      if (amount > balance) return \"Insufficient funds\";\n      balance -= amount;\n      return balance;\n    },\n    getBalance: () => balance,\n  };\n}\n\nconst account = createBankAccount(100);\naccount.deposit(50);\nconsole.log(account.getBalance()); // 150",
      "explanation": "balance cannot be accessed or corrupted from outside, only modified through the safe deposit/withdraw methods."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Closures: How Functions Remember Their Birthplace directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-08: CLOSURES & PRIVATE STATE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nfunction createCounter(name, initialValue = 0) {\n  let count = initialValue; // Private state protected by closure\n\n  return {\n    increment() {\n      count++;\n      return `[${name}] Count is now: ${count}`;\n    },\n    decrement() {\n      count--;\n      return `[${name}] Count is now: ${count}`;\n    },\n    getCount() {\n      return count;\n    }\n  };\n}\n\n// Create two completely independent counters:\nconst clickCounter = createCounter(\"ButtonClicks\", 0);\nconst pageViews = createCounter(\"PageViews\", 100);\n\nconsole.log(clickCounter.increment());\nconsole.log(clickCounter.increment());\nconsole.log(pageViews.increment());\n\nconsole.log(\"Final click count:\", clickCounter.getCount());\nconsole.log(\"Final page views:\", pageViews.getCount());\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Lexical Scope",
        "desc": "Functions remember the variables where they were written."
      },
      {
        "title": "2. Private State",
        "desc": "Closures provide true encapsulation without classes."
      },
      {
        "title": "3. Independent Instances",
        "desc": "Each factory invocation creates a new, isolated closure."
      },
      {
        "title": "4. Next: Callbacks",
        "desc": "In JS-09, we learn how to pass functions into other functions as data."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-09: Callbacks & Higher-Order Functions: Functions as Data",
      "desc": "Treat functions as first-class citizens: pass callbacks into other functions and return customized functions."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is a Closure in JavaScript?",
      "options": [
        "A statement that closes an open browser window.",
        "A function bundled with access to variables from its parent lexical scope, even after the parent returns.",
        "A syntax error caused by forgetting a closing bracket.",
        "A method to delete variables from memory."
      ],
      "correctIndex": 1,
      "explanation": "A closure is formed when an inner function retains access to variables declared in its outer lexical scope, even after the outer function has completed execution."
    }
  }
},

  "js09-callbacks-and-higher-order-functions": {
  "slug": "js09-callbacks-and-higher-order-functions",
  "code": "JS-09",
  "title": "Callbacks & Higher-Order Functions: Functions as Data",
  "subtitle": "Treat functions like values: pass callbacks to other functions and return new functions.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Callbacks & Higher-Order Functions: Functions as Data. Think of this like A Delivery Service Callback Number — when you order a package, you leave your phone number (callback). When the package arrives, the driver calls that number to complete the delivery. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "First-Class Citizens",
        "desc": "In JavaScript, functions are values: you can store them in variables and pass them as arguments."
      },
      {
        "title": "Callback Functions",
        "desc": "A function passed into another function to be executed at a later time."
      },
      {
        "title": "Higher-Order Functions",
        "desc": "A function that takes another function as an argument, or returns a new function."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Callbacks & Higher-Order Functions: Functions as Data:",
    "cards": [
      {
        "number": "01",
        "tag": "Concept",
        "title": "Functions as Values",
        "description": "const fn = () => {}; — functions can be passed around just like numbers or strings.",
        "color": "cyan"
      },
      {
        "number": "02",
        "tag": "Pattern",
        "title": "Callbacks",
        "description": "Invoked by the parent function when a specific action or event completes.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Composition",
        "title": "Higher-Order (HOF)",
        "description": "Functions that take or return functions to compose reusable logic.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Keep callbacks small and focused. Name callbacks clearly (e.g. onSuccess, onError, onComplete) to make asynchronous flow obvious."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Synchronous vs Async",
        "content": "Callbacks can be synchronous (array methods) or asynchronous (setTimeout, events)."
      },
      {
        "title": "2. Declarative Code",
        "content": "Higher-order functions allow declarative code that describes WHAT to do rather than HOW to loop."
      },
      {
        "title": "3. Factory Creation",
        "content": "HOFs can return specialized functions tailored with specific configurations."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Duplicating entire functions for minor logic variations",
      "code": "function doubleNumbers(arr) {\n  const result = [];\n  for (let n of arr) result.push(n * 2);\n  return result;\n}\n\nfunction tripleNumbers(arr) {\n  const result = [];\n  for (let n of arr) result.push(n * 3);\n  return result;\n}",
      "explanation": "Writing new loops for every math operation causes massive code duplication and maintenance headaches."
    },
    "good": {
      "title": "✅ Clean: Higher-order transformer with reusable callbacks",
      "code": "function transformList(list, transformer) {\n  const result = [];\n  for (const item of list) {\n    result.push(transformer(item));\n  }\n  return result;\n}\n\nconst numbers = [1, 2, 3];\nconst doubled = transformList(numbers, (n) => n * 2);\nconsole.log(doubled); // [2, 4, 6]",
      "explanation": "One higher-order function handles the iteration; different callbacks supply custom behavior flexibly."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Callbacks & Higher-Order Functions: Functions as Data directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-09: CALLBACKS & HIGHER-ORDER FUNCTIONS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Higher-order function that accepts a callback:\nfunction processTransaction(amount, feeCalculator, notifyCallback) {\n  const fee = feeCalculator(amount);\n  const total = amount + fee;\n  notifyCallback(total, fee);\n  return total;\n}\n\n// 2. Define custom callbacks:\nconst standardFee = (amt) => amt * 0.03;\nconst vipFee = (amt) => amt * 0.01;\n\nconst printReceipt = (total, fee) => {\n  console.log(`💳 Transaction processed! Fee: $${fee.toFixed(2)}, Total: $${total.toFixed(2)}`);\n};\n\n// 3. Execute with different callbacks:\nprocessTransaction(100, standardFee, printReceipt);\nprocessTransaction(100, vipFee, printReceipt);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Functions are Values",
        "desc": "Pass and return functions just like variables."
      },
      {
        "title": "2. Decouple Logic",
        "desc": "Separate the loop mechanics from the processing logic."
      },
      {
        "title": "3. Basis of Array Methods",
        "desc": "map, filter, and reduce are built on higher-order callbacks."
      },
      {
        "title": "4. Next: Arrays",
        "desc": "In JS-10, we explore ordered collections, indexes, and basic list methods."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-10: Arrays & Indexing: Managing Ordered Lists",
      "desc": "Learn how JavaScript stores ordered data, access elements with zero-based indexing, and manipulate arrays."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What defines a 'Higher-Order Function' in JavaScript?",
      "options": [
        "A function that runs faster than normal functions.",
        "A function that accepts another function as an argument, or returns a function.",
        "A function declared with the 'async' keyword.",
        "A function with more than 10 parameters."
      ],
      "correctIndex": 1,
      "explanation": "A Higher-Order Function is any function that takes one or more functions as arguments, or returns a function as its result."
    }
  }
},

  "js10-arrays-and-indexing": {
  "slug": "js10-arrays-and-indexing",
  "code": "JS-10",
  "title": "Arrays & Indexing: Managing Ordered Lists",
  "subtitle": "Store ordered collections, access elements with zero-based indexing, and use push, pop, and slice.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Arrays & Indexing: Managing Ordered Lists. Think of this like A Train of Passenger Cars — each train car is numbered starting from Car 0. You can board at Car 0, hitch new cars to the caboose, or inspect the passengers inside. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Zero-Based Indexing",
        "desc": "The first item is always at index [0]; the last item is at [length - 1]."
      },
      {
        "title": "Adding & Removing Items",
        "desc": "push/pop manipulate the end; unshift/shift manipulate the front."
      },
      {
        "title": "Non-Destructive Slicing",
        "desc": "slice(start, end) copies a portion of an array without modifying the original."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Arrays & Indexing: Managing Ordered Lists:",
    "cards": [
      {
        "number": "01",
        "tag": "Index",
        "title": "Zero-Indexed",
        "description": "Array items start at 0. Accessing an out-of-bounds index safely returns undefined.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Mutation",
        "title": "push & pop",
        "description": "Fastest way to add and remove items at the end of an array.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Length",
        "title": ".length Property",
        "description": "Tracks the total number of items automatically as elements are added or removed.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Be careful with methods that mutate arrays in place (splice, sort) vs methods that return a new copy (slice, concat). Prefer non-mutating methods."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Zero-Based Offsets",
        "content": "Index represents the distance offset from the start of the array in memory."
      },
      {
        "title": "2. Out of Bounds",
        "content": "Accessing an index past the end returns undefined without throwing an error."
      },
      {
        "title": "3. at() Method",
        "content": "Modern JavaScript provides array.at(-1) to cleanly grab the last element."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Off-by-one bug when reading the last element",
      "code": "const colors = [\"red\", \"green\", \"blue\"];\n// Off-by-one bug: colors has 3 items, so colors[3] is undefined!\nconst lastColor = colors[colors.length];\nconsole.log(\"Last:\", lastColor); // undefined!",
      "explanation": "Since arrays start at index 0, the last item is located at index colors.length - 1, not colors.length."
    },
    "good": {
      "title": "✅ Clean: Safe last element access and non-mutating slicing",
      "code": "const colors = [\"red\", \"green\", \"blue\"];\n// Safe access via length - 1 or .at(-1)\nconst lastItem = colors[colors.length - 1];\nconsole.log(\"Last color:\", lastItem); // \"blue\"\n\nconst firstTwo = colors.slice(0, 2);\nconsole.log(\"First two:\", firstTwo); // [\"red\", \"green\"]",
      "explanation": "Using colors.length - 1 or colors.at(-1) safely retrieves the last element without off-by-one bugs."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Arrays & Indexing: Managing Ordered Lists directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-10: ARRAYS & INDEXING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst playlist = [\"Bohemian Rhapsody\", \"Hotel California\", \"Imagine\"];\n\nconsole.log(\"Initial songs:\", playlist.length);\nconsole.log(\"First song:\", playlist[0]);\nconsole.log(\"Last song:\", playlist[playlist.length - 1]);\n\n// Add and remove items:\nplaylist.push(\"Stairway to Heaven\"); // Add to end\nconsole.log(\"After push:\", playlist);\n\nconst removed = playlist.pop(); // Remove from end\nconsole.log(\"Removed song:\", removed);\n\n// Copy a slice non-destructively:\nconst topTwo = playlist.slice(0, 2);\nconsole.log(\"Top 2 favorites:\", topTwo);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Zero-Based",
        "desc": "First item is index 0; last item is length - 1."
      },
      {
        "title": "2. push & pop",
        "desc": "Efficiently add or remove elements at the end of lists."
      },
      {
        "title": "3. Non-Mutating slice",
        "desc": "Use slice to copy ranges without mutating original data."
      },
      {
        "title": "4. Next: Array Methods",
        "desc": "In JS-11, we master map, filter, find, and reduce."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-11: Essential Array Methods: map, filter, find & reduce",
      "desc": "Transform arrays with map, filter items with criteria, and calculate totals with reduce."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the index of the first item in a JavaScript array?",
      "options": [
        "1",
        "0",
        "-1",
        "undefined"
      ],
      "correctIndex": 1,
      "explanation": "JavaScript arrays are zero-indexed. The first item is stored at index 0, and the second item is stored at index 1."
    }
  }
},

  "js11-essential-array-methods": {
  "slug": "js11-essential-array-methods",
  "code": "JS-11",
  "title": "Essential Array Methods: map, filter, find & reduce",
  "subtitle": "Transform data with map, select items with filter, locate elements with find, and aggregate with reduce.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Essential Array Methods: map, filter, find & reduce. Think of this like An Industrial Kitchen Assembly Line — map chops all vegetables into cubes; filter picks out only the fresh ones; find locates the jar of spices; reduce cooks everything into a single pot of soup. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "map() — Transform",
        "desc": "Transforms every item into a new item, returning an array of equal length."
      },
      {
        "title": "filter() — Select",
        "desc": "Keeps only items that pass a boolean test, returning a subset array."
      },
      {
        "title": "find() vs reduce()",
        "desc": "find returns the first matching item; reduce folds the array into a single accumulated value."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Essential Array Methods: map, filter, find & reduce:",
    "cards": [
      {
        "number": "01",
        "tag": "Transform",
        "title": "map(item => newItem)",
        "description": "Transforms each item without mutating the original array.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Selection",
        "title": "filter(item => boolean)",
        "description": "Constructs a new array with all elements that pass the predicate.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Aggregation",
        "title": "reduce((acc, curr) => ...)",
        "description": "Accumulates array elements into a single value, object, or total.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never mutate array items inside map or filter. Always return a new value. Chain methods cleanly: filter first to reduce work, then map."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Immutability",
        "content": "map, filter, and slice return fresh arrays without modifying the input array."
      },
      {
        "title": "2. find vs filter",
        "content": "find stops at the very first match and returns the item (or undefined); filter checks all items."
      },
      {
        "title": "3. reduce Initial Value",
        "content": "Always supply an initial value as the second argument to reduce (e.g. reduce(..., 0))."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Verbose manual loops with mutating accumulator",
      "code": "const products = [\n  { name: \"Laptop\", price: 1000, inStock: true },\n  { name: \"Mouse\", price: 25, inStock: false },\n  { name: \"Keyboard\", price: 75, inStock: true }\n];\n\n// Messy manual loop to filter and format:\nconst labels = [];\nfor (let i = 0; i < products.length; i++) {\n  if (products[i].inStock) {\n    labels.push(products[i].name + \": $\" + products[i].price);\n  }\n}",
      "explanation": "Imperative loops require manual index tracking, array allocations, and are harder to read and maintain."
    },
    "good": {
      "title": "✅ Clean: Declarative chaining with filter and map",
      "code": "const products = [\n  { name: \"Laptop\", price: 1000, inStock: true },\n  { name: \"Mouse\", price: 25, inStock: false },\n  { name: \"Keyboard\", price: 75, inStock: true }\n];\n\nconst availableLabels = products\n  .filter((p) => p.inStock)\n  .map((p) => `${p.name}: $${p.price}`);\n\nconsole.log(availableLabels);\n// [\"Laptop: $1000\", \"Keyboard: $75\"]",
      "explanation": "Declarative method chains read like a clear sentence: filter for inStock, then map to formatted labels."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Essential Array Methods: map, filter, find & reduce directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-11: ESSENTIAL ARRAY METHODS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst cart = [\n  { id: 1, name: \"Mechanical Keyboard\", price: 120, qty: 1 },\n  { id: 2, name: \"USB-C Cable\", price: 15, qty: 3 },\n  { id: 3, name: \"Gaming Mouse\", price: 65, qty: 1 }\n];\n\n// 1. map: Get array of product names\nconst productNames = cart.map(item => item.name);\nconsole.log(\"Items in cart:\", productNames);\n\n// 2. filter: Find items over $50\nconst expensiveItems = cart.filter(item => item.price >= 50);\nconsole.log(\"Expensive items count:\", expensiveItems.length);\n\n// 3. find: Locate specific item by ID\nconst cable = cart.find(item => item.id === 2);\nconsole.log(\"Found item:\", cable?.name);\n\n// 4. reduce: Calculate total cart price\nconst grandTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);\nconsole.log(\"Cart Grand Total: $\" + grandTotal.toFixed(2));\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. map for 1:1",
        "desc": "Transform every item into a new shape."
      },
      {
        "title": "2. filter for Subsets",
        "desc": "Pick elements that match a condition."
      },
      {
        "title": "3. reduce for Aggregation",
        "desc": "Fold arrays into sums, counts, or objects."
      },
      {
        "title": "4. Next: Objects",
        "desc": "In JS-12, we explore key-value pairs, methods, and property access."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-12: Objects: Key-Value Pairs, Methods & Property Access",
      "desc": "Model real-world entities using JavaScript objects, dot vs bracket notation, and object methods."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the primary difference between .find() and .filter()?",
      "options": [
        "find() returns the first matching item or undefined, while filter() returns an array of all matching items.",
        "filter() mutates the original array, while find() does not.",
        "find() only works on numbers, while filter() only works on strings.",
        "There is no difference; they are aliases of each other."
      ],
      "correctIndex": 0,
      "explanation": "find() stops at the first element that satisfies the testing function and returns it directly. filter() continues through the entire array and returns a new array with all matching elements."
    }
  }
},

  "js12-objects-and-methods": {
  "slug": "js12-objects-and-methods",
  "code": "JS-12",
  "title": "Objects: Key-Value Pairs, Methods & Property Access",
  "subtitle": "Model real-world entities with properties and actions using object literals and methods.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Objects: Key-Value Pairs, Methods & Property Access. Think of this like A Passport Document — contains keyed fields like 'name', 'passportNumber', and 'expiryDate', along with an official stamp method that validates entry. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Object Literals",
        "desc": "Create keyed records with curly braces { key: value }."
      },
      {
        "title": "Dot vs Bracket Notation",
        "desc": "Use dot notation user.name for static keys; use bracket user[var] for dynamic keys."
      },
      {
        "title": "Object Methods",
        "desc": "Functions attached to object properties that act on object data."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Objects: Key-Value Pairs, Methods & Property Access:",
    "cards": [
      {
        "number": "01",
        "tag": "Properties",
        "title": "Dot Notation (obj.prop)",
        "description": "Standard, clean property access when the key name is known in advance.",
        "color": "cyan"
      },
      {
        "number": "02",
        "tag": "Dynamic",
        "title": "Bracket (obj[prop])",
        "description": "Required for dynamic keys, spaces, or keys stored in variables.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Behavior",
        "title": "Methods",
        "description": "Functions stored as object properties that define the object's behaviors.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Use dot notation by default. Use bracket notation only when property keys contain special characters or come from variables."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. String & Symbol Keys",
        "content": "Object keys are automatically converted to strings (or Symbols)."
      },
      {
        "title": "2. Object.keys & Object.values",
        "content": "Useful built-in utility methods to iterate over object keys and values."
      },
      {
        "title": "3. Method Shorthand",
        "content": "ES6 allows concise method declarations: greet() {} instead of greet: function() {}."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using dot notation with dynamic variable keys",
      "code": "const propertyToRead = \"email\";\nconst user = { name: \"Alice\", email: \"alice@example.com\" };\n\n// Bug: Searches for literal property named 'propertyToRead' on user!\nconsole.log(user.propertyToRead); // undefined!",
      "explanation": "Dot notation searches for the exact literal name after the dot. It cannot evaluate variables."
    },
    "good": {
      "title": "✅ Clean: Dynamic property access using brackets and methods",
      "code": "const propertyToRead = \"email\";\nconst user = {\n  name: \"Alice\",\n  email: \"alice@example.com\",\n  getDisplayName() {\n    return `${this.name} <${this.email}>`;\n  }\n};\n\n// Bracket notation evaluates the variable correctly:\nconsole.log(user[propertyToRead]); // \"alice@example.com\"\nconsole.log(user.getDisplayName());",
      "explanation": "Bracket notation evaluates variables dynamically, making data lookups flexible and correct."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Objects: Key-Value Pairs, Methods & Property Access directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-12: OBJECTS & METHODS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst userProfile = {\n  username: \"code_ninja\",\n  reputation: 420,\n  skills: [\"JavaScript\", \"TypeScript\", \"React\"],\n  status: \"ACTIVE\",\n\n  // Modern method shorthand:\n  addReputation(points) {\n    this.reputation += points;\n    return `${this.username} now has ${this.reputation} reputation points!`;\n  }\n};\n\nconsole.log(\"Username:\", userProfile.username);\nconsole.log(\"First skill:\", userProfile.skills[0]);\n\n// Dynamic key lookup:\nconst keyToInspect = \"status\";\nconsole.log(\"Current status:\", userProfile[keyToInspect]);\n\n// Invoke object method:\nconsole.log(userProfile.addReputation(50));\n\n// Utility functions:\nconsole.log(\"Keys:\", Object.keys(userProfile));\nconsole.log(\"Values count:\", Object.values(userProfile).length);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Key-Value Pairs",
        "desc": "Objects store keyed properties and methods."
      },
      {
        "title": "2. Dot for Static",
        "desc": "Use user.name when the key is known at author time."
      },
      {
        "title": "3. Bracket for Dynamic",
        "desc": "Use user[key] when property names come from variables."
      },
      {
        "title": "4. Next: Object References",
        "desc": "In JS-13, we learn why objects are copied by reference, not value."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-13: Object References & Immutability: Shallow vs Deep Copy",
      "desc": "Discover why mutating a copied object affects the original, and learn how to clone data safely."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "When must you use bracket notation (obj[key]) instead of dot notation (obj.key)?",
      "options": [
        "When the property name is stored in a variable or contains spaces/hyphens.",
        "Whenever the object has more than 5 properties.",
        "Only when accessing functions.",
        "Dot notation is deprecated; bracket notation is always required."
      ],
      "correctIndex": 0,
      "explanation": "Bracket notation is required when the key name is dynamic (stored in a variable) or contains characters not valid in JS identifiers like dashes or spaces."
    }
  }
},

  "js13-object-references-and-copying": {
  "slug": "js13-object-references-and-copying",
  "code": "JS-13",
  "title": "Object References & Immutability: Shallow vs Deep Copy",
  "subtitle": "Understand memory references, avoid accidental mutations, and clone objects safely.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Object References & Immutability: Shallow vs Deep Copy. Think of this like A Shared Google Doc Link — sending someone a link does not copy the document; both people are looking at and editing the exact same live document. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Primitives vs References",
        "desc": "Primitives copy by value; objects, arrays, and functions copy by memory reference."
      },
      {
        "title": "Shallow Copy",
        "desc": "Spreading {...obj} copies top-level keys, but nested objects still share memory references."
      },
      {
        "title": "Deep Copy",
        "desc": "structuredClone(obj) recursively copies all nested levels into independent memory."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Object References & Immutability: Shallow vs Deep Copy:",
    "cards": [
      {
        "number": "01",
        "tag": "Memory",
        "title": "Reference Sharing",
        "description": "const b = a; does not clone the object; it creates another pointer to the same memory.",
        "color": "rose"
      },
      {
        "number": "02",
        "tag": "Copying",
        "title": "Shallow: {...obj}",
        "description": "Copies top-level properties. Fast and suitable for flat objects.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Safe Deep",
        "title": "structuredClone()",
        "description": "Modern standard built-in for deep copying objects with nested arrays and dates.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never directly mutate function arguments or shared objects. Use spread {...obj} for flat objects or structuredClone for nested structures."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Pointer Comparison",
        "content": "Two objects are only === if they point to the exact same memory address ({a:1} !== {a:1})."
      },
      {
        "title": "2. Shallow Limitations",
        "content": "Spread {...user} clones user, but user.address remains shared by reference."
      },
      {
        "title": "3. Modern structuredClone",
        "content": "Avoid JSON.parse(JSON.stringify(x)) which drops Dates and undefined; use structuredClone."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Accidental mutation through shared reference",
      "code": "const userA = { name: \"Sarah\", role: \"Viewer\" };\n// Accidental pointer copy:\nconst userB = userA;\n\nuserB.role = \"Admin\"; // Mutates userA as well!\nconsole.log(\"User A role:\", userA.role); // \"Admin\" (Accidental privilege escalation!)",
      "explanation": "userB points to the same memory as userA. Mutating userB silently corrupts userA."
    },
    "good": {
      "title": "✅ Clean: Immutable shallow copy with property overrides",
      "code": "const userA = { name: \"Sarah\", role: \"Viewer\" };\n\n// Clean clone with explicit override:\nconst userB = { ...userA, role: \"Admin\" };\n\nconsole.log(\"User A:\", userA.role); // \"Viewer\" (Untouched!)\nconsole.log(\"User B:\", userB.role); // \"Admin\"",
      "explanation": "Using object spread creates a new memory allocation, leaving the original object unchanged."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Object References & Immutability: Shallow vs Deep Copy directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-13: OBJECT REFERENCES & CLONING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst originalSettings = {\n  theme: \"dark\",\n  notifications: { email: true, push: false }\n};\n\n// 1. Shallow copy with spread\nconst shallowCopy = { ...originalSettings };\n\n// 2. Deep copy with structuredClone (Modern JS)\nconst deepCopy = structuredClone(originalSettings);\n\n// Modifying nested property on shallow copy affects original!\nshallowCopy.notifications.push = true;\nconsole.log(\"Original push notification:\", originalSettings.notifications.push); // true! (Mutated!)\n\n// Modifying deep copy leaves original safe:\ndeepCopy.notifications.email = false;\nconsole.log(\"Original email:\", originalSettings.notifications.email); // true (Safe!)\nconsole.log(\"Deep copy email:\", deepCopy.notifications.email);       // false\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. References vs Values",
        "desc": "Objects copy by reference; primitives copy by value."
      },
      {
        "title": "2. Shallow Copy",
        "desc": "Use {...obj} to clone 1-level flat objects."
      },
      {
        "title": "3. structuredClone",
        "desc": "Use structuredClone() for complete, nested deep cloning."
      },
      {
        "title": "4. Next: Destructuring",
        "desc": "In JS-14, we learn how to unpack properties cleanly with destructuring."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-14: Destructuring: Unpacking Objects & Arrays with Ease",
      "desc": "Extract values directly from objects and arrays with clean, modern destructuring syntax."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens if you do: const b = a; where 'a' is an object?",
      "options": [
        "A deep copy of 'a' is created in memory.",
        "'b' receives a reference pointing to the exact same object in memory as 'a'.",
        "The object 'a' is destroyed.",
        "JavaScript throws a reference error."
      ],
      "correctIndex": 1,
      "explanation": "In JavaScript, objects are reference types. Variable assignment copies the reference pointer, meaning both variables point to the same object in memory."
    }
  }
},

  "js14-destructuring": {
  "slug": "js14-destructuring",
  "code": "JS-14",
  "title": "Destructuring: Unpacking Objects & Arrays with Ease",
  "subtitle": "Extract properties and array items directly into standalone variables with default fallbacks.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Destructuring: Unpacking Objects & Arrays with Ease. Think of this like Unpacking a Delivery Box — taking specific items directly out of the box and placing them on your desk rather than digging through the box every time you need an item. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Object Destructuring",
        "desc": "Extract properties by key: const { name, age } = user;."
      },
      {
        "title": "Array Destructuring",
        "desc": "Extract items by position: const [first, second] = list;."
      },
      {
        "title": "Renaming & Defaults",
        "desc": "Assign custom variable names { role: userRole } and fallback defaults { theme = 'dark' }."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Destructuring: Unpacking Objects & Arrays with Ease:",
    "cards": [
      {
        "number": "01",
        "tag": "Objects",
        "title": "{ key } = obj",
        "description": "Pulls keys by exact name. Order does not matter.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Arrays",
        "title": "[a, b] = arr",
        "description": "Pulls items by index position. Skip items with empty commas [, , c].",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Fallbacks",
        "title": "Default Values",
        "description": "const { timeout = 5000 } provides safe fallbacks if the key is undefined.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Destructure function parameter objects directly in the signature: function renderUser({ name, role = 'User' }) for clean API boundaries."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Renaming Properties",
        "content": "Use colon syntax: const { id: userId } = data creates a variable named userId."
      },
      {
        "title": "2. Nested Destructuring",
        "content": "Unpack nested structures: const { address: { city } } = user."
      },
      {
        "title": "3. Undefined Protection",
        "content": "Defaults apply only if the target property is strictly undefined."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Repetitive property access with long chains",
      "code": "function renderUserCard(user) {\n  const name = user.name;\n  const role = user.role !== undefined ? user.role : \"Guest\";\n  const email = user.email;\n  console.log(name, role, email);\n}",
      "explanation": "Manually reassigning individual properties produces repetitive boilerplate."
    },
    "good": {
      "title": "✅ Clean: Destructuring in parameters with defaults",
      "code": "function renderUserCard({ name, role = \"Guest\", email }) {\n  console.log(`${name} (${role}) - ${email}`);\n}\n\nrenderUserCard({ name: \"Alex\", email: \"alex@test.com\" });\n// \"Alex (Guest) - alex@test.com\"",
      "explanation": "Direct parameter destructuring provides immediate clarity, self-documenting inputs, and built-in defaults."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Destructuring: Unpacking Objects & Arrays with Ease directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-14: DESTRUCTURING DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst serverResponse = {\n  status: 200,\n  data: {\n    user: { id: 101, username: \"dev_dan\", active: true },\n    token: \"jwt_token_secret_xyz\"\n  }\n};\n\n// 1. Nested object destructuring + renaming:\nconst {\n  status: statusCode,\n  data: { user: { username, active } }\n} = serverResponse;\n\nconsole.log(\"Status Code:\", statusCode);\nconsole.log(\"User:\", username, \"(Active:\", active, \")\");\n\n// 2. Array destructuring:\nconst coordinates = [37.7749, -122.4194];\nconst [latitude, longitude] = coordinates;\nconsole.log(`Location: Lat ${latitude}, Long ${longitude}`);\n\n// 3. Swap variables without temp variable:\nlet a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(\"Swapped: a =\", a, \", b =\", b);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Unpack Cleanly",
        "desc": "Extract object keys and array items in 1 line."
      },
      {
        "title": "2. Set Defaults",
        "desc": "Use { prop = defaultVal } to handle missing data."
      },
      {
        "title": "3. Parameter Signatures",
        "desc": "Destructure options objects directly in function headers."
      },
      {
        "title": "4. Next: Spread & Rest",
        "desc": "In JS-15, we master the three dots (...) for spreading and gathering."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-15: Spread & Rest Operators: Combining and Gathering (...)",
      "desc": "Use the three dots (...) to copy arrays, merge objects, and capture variable arguments with rest parameters."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "How do you rename a property while destructuring from an object?",
      "options": [
        "const { originalKey as newName } = obj",
        "const { originalKey: newName } = obj",
        "const { originalKey -> newName } = obj",
        "const [ originalKey, newName ] = obj"
      ],
      "correctIndex": 1,
      "explanation": "In JavaScript object destructuring, renaming uses a colon: { propertyName: newVariableName } = object."
    }
  }
},

  "js15-spread-and-rest-operators": {
  "slug": "js15-spread-and-rest-operators",
  "code": "JS-15",
  "title": "Spread & Rest Operators: Combining and Gathering (...)",
  "subtitle": "Use the three dots (...) to unpack collections with spread and gather parameters with rest.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Spread & Rest Operators: Combining and Gathering (...). Think of this like Spreading Butter vs Gathering Laundry — Spread unpacks a block of butter across slices of bread; Rest gathers scattered clothing into a single laundry basket. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Spread Operator (...)",
        "desc": "Expands an iterable (array, object, string) into individual elements or keys."
      },
      {
        "title": "Rest Parameters (...)",
        "desc": "Gathers remaining function arguments into a real JavaScript array."
      },
      {
        "title": "Immutable Merging",
        "desc": "Combine multiple arrays or objects without mutating the originals."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Spread & Rest Operators: Combining and Gathering (...):",
    "cards": [
      {
        "number": "01",
        "tag": "Unpack",
        "title": "Spread: [...arr, ...arr2]",
        "description": "Unpacks elements to shallow copy or concatenate arrays.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Gather",
        "title": "Rest: function(first, ...rest)",
        "description": "Captures indefinite function arguments as a standard array.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Merging",
        "title": "Object Spread: { ...a, ...b }",
        "description": "Merges objects; properties on the right overwrite identical properties on the left.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Rest parameters must always be the last parameter in a function definition: function(a, b, ...rest) {} — you cannot put parameters after rest."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Spread Unpacks",
        "content": "Spread expands elements where individual items are expected."
      },
      {
        "title": "2. Rest Gathers",
        "content": "Rest condenses multiple values into a single array."
      },
      {
        "title": "3. Real Array",
        "content": "Unlike legacy 'arguments', rest parameters produce a real array with map, filter, etc."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using legacy arguments object instead of rest",
      "code": "function sumAll() {\n  // arguments is an array-like object missing array methods:\n  // arguments.map(...) -> TypeError!\n  let sum = 0;\n  for (let i = 0; i < arguments.length; i++) sum += arguments[i];\n  return sum;\n}",
      "explanation": "The legacy arguments object is confusing, not a real array, and does not work in arrow functions."
    },
    "good": {
      "title": "✅ Clean: Rest parameters producing a real array with reduce",
      "code": "const sumAll = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);\n\nconsole.log(sumAll(10, 20, 30)); // 60",
      "explanation": "Rest parameters (...numbers) produce a genuine array directly compatible with modern array methods."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Spread & Rest Operators: Combining and Gathering (...) directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-15: SPREAD & REST OPERATORS\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Spread with Arrays (Concatenation & Cloning)\nconst frontend = [\"HTML\", \"CSS\", \"JS\"];\nconst backend = [\"Node.js\", \"PostgreSQL\"];\nconst fullStack = [...frontend, ...backend, \"Docker\"];\nconsole.log(\"Full Stack Stack:\", fullStack);\n\n// 2. Spread with Objects (Merging & Overriding)\nconst defaultTheme = { theme: \"light\", fontSize: 14, showSidebar: true };\nconst userCustomization = { theme: \"dark\", fontSize: 16 };\nconst activeTheme = { ...defaultTheme, ...userCustomization };\nconsole.log(\"Merged Theme:\", activeTheme);\n\n// 3. Rest Parameters in Functions\nfunction recordLog(level, ...messages) {\n  console.log(`[${level.toUpperCase()}] ${messages.join(\" - \")}`);\n}\n\nrecordLog(\"info\", \"User logged in\", \"IP: 192.168.1.1\", \"Session: active\");\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Spread Unpacks",
        "desc": "Use ... to merge arrays and clone objects."
      },
      {
        "title": "2. Rest Gathers",
        "desc": "Capture indefinite arguments into a true array."
      },
      {
        "title": "3. Precedence in Merge",
        "desc": "In {...a, ...b}, properties in 'b' overwrite 'a'."
      },
      {
        "title": "4. Next: Optional Chaining",
        "desc": "In JS-16, we explore ?. and ?? for safe data access."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-16: Optional Chaining (?.) & Nullish Coalescing (??)",
      "desc": "Safely navigate deep nested data without 'Cannot read properties of undefined' errors."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Where must a Rest parameter (...args) be placed in a function's parameter list?",
      "options": [
        "Anywhere; order does not matter.",
        "It must always be the very last parameter in the list.",
        "It must always be the very first parameter in the list.",
        "Rest parameters are only allowed in class constructors."
      ],
      "correctIndex": 1,
      "explanation": "In JavaScript syntax, a rest parameter must always be the last parameter in the function declaration because it gathers all remaining arguments."
    }
  }
},

  "js16-optional-chaining-and-nullish-coalescing": {
  "slug": "js16-optional-chaining-and-nullish-coalescing",
  "code": "JS-16",
  "title": "Optional Chaining (?.) & Nullish Coalescing (??)",
  "subtitle": "Navigate nested data safely with ?. and provide default fallbacks with ?? without false-alarm bugs.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Optional Chaining (?.) & Nullish Coalescing (??). Think of this like A Gentle Knock on a Door (?.) vs Breaking It Down — Optional chaining gently knocks to see if a room exists before entering; Nullish Coalescing (??) provides a backup key only if the key is truly missing (null or undefined), not if it is just zero. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Optional Chaining (?.)",
        "desc": "Safely accesses deeply nested properties; if any link is nullish, returns undefined instead of throwing."
      },
      {
        "title": "Nullish Coalescing (??)",
        "desc": "Returns the right side ONLY if the left side is null or undefined (preserves 0, false, and '')."
      },
      {
        "title": "Why || is Risky",
        "desc": "The logical OR (||) treats 0, false, and '' as falsy, replacing valid zero values with defaults."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Optional Chaining (?.) & Nullish Coalescing (??):",
    "cards": [
      {
        "number": "01",
        "tag": "Safe Access",
        "title": "Optional Chaining (?.)",
        "description": "user?.address?.city — stops evaluation immediately if user or address is nullish.",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Defaults",
        "title": "Nullish (??)",
        "description": "count ?? 10 — only triggers fallback if count is null or undefined.",
        "color": "purple"
      },
      {
        "number": "03",
        "tag": "Trap",
        "title": "The || Trap",
        "description": "count || 10 — replaces 0 with 10! Always prefer ?? for numbers and booleans.",
        "color": "rose"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Use ?? for default values when 0, false, or '' are valid data values. Use ?. to safely access API response properties."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Function Calls (?.)",
        "content": "You can safely call optional callbacks: onComplete?.() won't crash if onComplete is undefined."
      },
      {
        "title": "2. Array Indexing (?.[0])",
        "content": "Safely access first item: list?.[0] checks if list is nullish before indexing."
      },
      {
        "title": "3. Short-Circuiting",
        "content": "As soon as ?. encounters null or undefined, the rest of the chain is skipped."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using || for numeric defaults and crashing on missing properties",
      "code": "const userScore = 0; // 0 is a valid score!\nconst score = userScore || 50; // Bug: 0 is falsy, so score becomes 50!\nconsole.log(\"Score:\", score); // 50 (Incorrect!)\n\nconst user = {};\n// Crashes the app: Cannot read properties of undefined (reading 'street')\n// console.log(user.profile.street);",
      "explanation": "Using || corrupts valid 0 values, and accessing nested properties without ?. crashes the app."
    },
    "good": {
      "title": "✅ Clean: Safe navigation with ?. and accurate defaults with ??",
      "code": "const userScore = 0;\n// ?? only replaces null or undefined, preserving 0:\nconst score = userScore ?? 50;\nconsole.log(\"Score:\", score); // 0 (Correct!)\n\nconst user = {};\nconsole.log(\"Street:\", user.profile?.street ?? \"No street provided\");\n// \"No street provided\" without any errors!",
      "explanation": "?. prevents runtime crashes, and ?? provides fallback defaults accurately without overwriting 0 or false."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Optional Chaining (?.) & Nullish Coalescing (??) directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-16: OPTIONAL CHAINING & NULLISH COALESCING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst apiResponse = {\n  user: {\n    name: \"Elena\",\n    preferences: {\n      notificationsCount: 0, // Valid 0!\n      soundEnabled: false    // Valid false!\n    }\n  }\n};\n\n// 1. Optional Chaining on nested properties\nconst zipCode = apiResponse.user?.address?.zipCode;\nconsole.log(\"Zip Code (safe access):\", zipCode); // undefined (No crash!)\n\n// 2. Safe method call\napiResponse.user?.sendNotification?.(); // Skips cleanly\n\n// 3. Nullish Coalescing (??) preserves 0 and false\nconst unread = apiResponse.user.preferences.notificationsCount ?? 10;\nconst sound = apiResponse.user.preferences.soundEnabled ?? true;\n\nconsole.log(\"Notifications Count:\", unread); // 0 (Preserved!)\nconsole.log(\"Sound Enabled:\", sound);       // false (Preserved!)\n\n// Compare with || trap:\nconsole.log(\"With || trap:\", apiResponse.user.preferences.notificationsCount || 10); // 10 (Corrupted!)\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. No More Crashes",
        "desc": "Use ?. to safely access deeply nested data."
      },
      {
        "title": "2. Preserve 0 & false",
        "desc": "Use ?? to default only null or undefined."
      },
      {
        "title": "3. Optional Methods",
        "desc": "Invoke callbacks safely with callback?.()."
      },
      {
        "title": "4. Next: The this Keyword",
        "desc": "In JS-17, we unlock the dynamic behavior of this in JavaScript."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-17: The this Keyword: Who Called Me?",
      "desc": "Master the rules of this: method calls, arrow functions, and explicit binding with call, apply, and bind."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What will this expression evaluate to: (0 ?? 100) vs (0 || 100)?",
      "options": [
        "Both evaluate to 100.",
        "Both evaluate to 0.",
        "(0 ?? 100) evaluates to 0; (0 || 100) evaluates to 100.",
        "Throws a syntax error."
      ],
      "correctIndex": 2,
      "explanation": "0 is a falsy value, so || treats it as false and returns 100. However, 0 is not null or undefined, so ?? preserves 0."
    }
  }
},

  "js17-the-this-keyword": {
  "slug": "js17-the-this-keyword",
  "code": "JS-17",
  "title": "The this Keyword: Who Called Me?",
  "subtitle": "Understand how this dynamically refers to the object currently executing the method.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master The this Keyword: Who Called Me?. Think of this like The Pronoun 'I' or 'My' — depending on who is currently speaking, the word 'I' refers to a different person. In JavaScript, 'this' refers to the object currently calling the method. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Method Invocation",
        "desc": "When called as user.speak(), this refers to the object before the dot (user)."
      },
      {
        "title": "Arrow Functions",
        "desc": "Arrow functions DO NOT have their own this; they inherit it lexically from where they were written."
      },
      {
        "title": "Explicit Binding",
        "desc": "call(), apply(), and bind() allow you to explicitly dictate what this should point to."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of The this Keyword: Who Called Me?:",
    "cards": [
      {
        "number": "01",
        "tag": "Dynamic",
        "title": "Dot Rule (obj.method)",
        "description": "Look immediately to the left of the dot at the moment of invocation.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Lexical",
        "title": "Arrow Functions",
        "description": "Inherits this from outer scope. Never use arrow functions for object methods.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Fixed",
        "title": ".bind(context)",
        "description": "Permanently locks this to a specific target object, returning a new function.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Use standard methods for object definitions (greet() {}). Use arrow functions for callbacks inside methods to preserve this."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Left of the Dot",
        "content": "The object to the left of the dot at call time determines this for regular functions."
      },
      {
        "title": "2. Loss of Context",
        "content": "Passing an object method as an uncalled callback (e.g. setTimeout(user.greet)) detaches this."
      },
      {
        "title": "3. Strict Mode",
        "content": "In strict mode, a standalone function call sets this to undefined instead of the global window."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using an arrow function as an object method",
      "code": "const user = {\n  name: \"Marcus\",\n  // Bug: Arrow function inherits 'this' from global/module scope!\n  greet: () => {\n    console.log(\"Hello, I am \" + this.name);\n  }\n};\nuser.greet(); // \"Hello, I am undefined\"",
      "explanation": "Arrow functions don't create their own 'this'. Here 'this' points to global/module, where name is undefined."
    },
    "good": {
      "title": "✅ Clean: Standard method with nested arrow function",
      "code": "const user = {\n  name: \"Marcus\",\n  greet() {\n    console.log(\"Hello, I am \" + this.name);\n  },\n  greetDelayed() {\n    // Arrow callback preserves 'this' from greetDelayed!\n    setTimeout(() => {\n      console.log(\"Delayed greeting:\", this.name);\n    }, 100);\n  }\n};\nuser.greet(); // \"Hello, I am Marcus\"\nuser.greetDelayed();",
      "explanation": "Standard method syntax binds 'this' to user; the inner arrow function captures that context cleanly."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with The this Keyword: Who Called Me? directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-17: THE THIS KEYWORD\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst chef = {\n  name: \"Chef Gordon\",\n  restaurant: \"Kitchen Master\",\n\n  cook(dish) {\n    console.log(`${this.name} from ${this.restaurant} is cooking ${dish}!`);\n  }\n};\n\n// 1. Direct method call (this = chef)\nchef.cook(\"Beef Wellington\");\n\n// 2. Explicit binding with .call()\nconst guestChef = { name: \"Chef Ramsay\", restaurant: \"Hell's Kitchen\" };\nchef.cook.call(guestChef, \"Risotto\");\n\n// 3. Permanent binding with .bind()\nconst boundCook = chef.cook.bind(guestChef, \"Sticky Toffee Pudding\");\nboundCook(); // Preserves guestChef as 'this'\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. The Dot Rule",
        "desc": "Object before the dot is 'this' for regular methods."
      },
      {
        "title": "2. Arrow Functions",
        "desc": "Capture 'this' lexically from surrounding code."
      },
      {
        "title": "3. bind() for Locking",
        "desc": "Permanently attach 'this' when passing methods as callbacks."
      },
      {
        "title": "4. Next: Prototypes",
        "desc": "In JS-18, we explore the prototype chain and shared methods."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-18: Prototypes & The Prototype Chain: JavaScript's Inheritance",
      "desc": "Learn how objects delegate properties up the prototype chain to share methods efficiently."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "How do Arrow Functions determine the value of 'this'?",
      "options": [
        "They dynamically point to the object to the left of the dot.",
        "They lexically inherit 'this' from the scope where the arrow function was defined.",
        "They always bind 'this' to the global window object.",
        "They cannot be executed if 'this' is accessed."
      ],
      "correctIndex": 1,
      "explanation": "Arrow functions do not possess their own 'this' binding. They lexically resolve 'this' from their enclosing lexical context at the time of definition."
    }
  }
},

  "js18-prototypes-and-prototype-chain": {
  "slug": "js18-prototypes-and-prototype-chain",
  "code": "JS-18",
  "title": "Prototypes & The Prototype Chain: JavaScript's Inheritance",
  "subtitle": "Learn how JavaScript objects share methods by delegating lookups up the prototype chain.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Prototypes & The Prototype Chain: JavaScript's Inheritance. Think of this like Borrowing from Parents — if you need a specialized tool that isn't in your personal toolbox, you ask your parents. If they don't have it, they ask their parents, walking up the family tree until someone has it or they reach the end. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "The Prototype Link",
        "desc": "Every JavaScript object has an internal link ([[Prototype]]) to another object."
      },
      {
        "title": "Method Delegation",
        "desc": "If a property or method is missing on an object, JavaScript looks up the chain to find it."
      },
      {
        "title": "Memory Efficiency",
        "desc": "Sharing methods on a prototype means 1,000 instances share one function in memory."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Prototypes & The Prototype Chain: JavaScript's Inheritance:",
    "cards": [
      {
        "number": "01",
        "tag": "Lookup",
        "title": "Delegation Chain",
        "description": "obj -> Object.prototype -> null. Lookup stops at the first match.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Creation",
        "title": "Object.create(proto)",
        "description": "Creates a new object whose [[Prototype]] points directly to the given proto.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Performance",
        "title": "Shared Memory",
        "description": "Methods placed on the prototype are shared across all instances.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Do not modify built-in prototypes (like Array.prototype or Object.prototype). Prototype pollution causes catastrophic security bugs."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. hasOwnProperty",
        "content": "Checks whether a property belongs directly to the object or is inherited from the prototype."
      },
      {
        "title": "2. The Chain End",
        "content": "The top of every prototype chain is Object.prototype, whose prototype is null."
      },
      {
        "title": "3. Classes are Syntax Sugar",
        "content": "JavaScript classes use the exact same prototypical delegation under the hood."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Creating duplicate function copies on every instance",
      "code": "function createUser(name) {\n  return {\n    name,\n    // Every single user allocates a brand new duplicate function in RAM:\n    greet() {\n      console.log(\"Hello, I am \" + this.name);\n    }\n  };\n}\n// 10,000 users = 10,000 duplicate functions in memory!",
      "explanation": "Attaching methods inside the factory creates thousands of duplicate function objects, wasting memory."
    },
    "good": {
      "title": "✅ Clean: Prototype delegation sharing a single method in memory",
      "code": "const userMethods = {\n  greet() {\n    console.log(\"Hello, I am \" + this.name);\n  }\n};\n\nfunction createUser(name) {\n  const user = Object.create(userMethods);\n  user.name = name;\n  return user;\n}\n\nconst u1 = createUser(\"Alice\");\nconst u2 = createUser(\"Bob\");\nconsole.log(u1.greet === u2.greet); // true (Shared in RAM!)",
      "explanation": "Both instances delegate to the same shared method on userMethods, optimizing memory usage."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Prototypes & The Prototype Chain: JavaScript's Inheritance directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-18: PROTOTYPES & PROTOTYPE CHAIN\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Prototype definition\nconst vehiclePrototype = {\n  honk() {\n    return `${this.brand} says: BEEP BEEP! 🚗`;\n  }\n};\n\n// 2. Create object with specified prototype:\nconst myCar = Object.create(vehiclePrototype);\nmyCar.brand = \"Electric Roadster\";\n\nconsole.log(myCar.honk());\n\n// 3. Inspecting the prototype chain:\nconsole.log(\"Direct property brand:\", Object.hasOwn(myCar, \"brand\")); // true\nconsole.log(\"Direct property honk:\", Object.hasOwn(myCar, \"honk\"));   // false (Inherited!)\n\n// 4. Checking prototype relationship:\nconsole.log(\"Is vehiclePrototype parent?:\", Object.getPrototypeOf(myCar) === vehiclePrototype);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Delegation",
        "desc": "Objects share properties by delegating up the prototype chain."
      },
      {
        "title": "2. Object.create",
        "desc": "Directly configure the prototype of a new object."
      },
      {
        "title": "3. Shared Memory",
        "desc": "Shared methods save RAM across thousands of instances."
      },
      {
        "title": "4. Next: Classes",
        "desc": "In JS-19, we learn modern class syntax: constructors, extends, and super."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-19: Classes, Constructors, extends & super",
      "desc": "Write clean object-oriented code using ES6 class syntax, inheritance, and method overriding."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens when you access a property on an object that does not exist directly on that object?",
      "options": [
        "JavaScript immediately crashes with a fatal error.",
        "JavaScript traverses up the prototype chain until it finds the property or reaches null.",
        "JavaScript automatically creates the property and sets it to 0.",
        "The browser refreshes the page."
      ],
      "correctIndex": 1,
      "explanation": "JavaScript checks the object's [[Prototype]]. If the property is missing, it walks up the chain step-by-step until it finds the property or hits null, returning undefined if not found anywhere."
    }
  }
},

  "js19-classes-extends-and-super": {
  "slug": "js19-classes-extends-and-super",
  "code": "JS-19",
  "title": "Classes, Constructors, extends & super",
  "subtitle": "Write modern object-oriented code with clean class declarations, constructors, extends, and super().",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Classes, Constructors, extends & super. Think of this like Architectural Blueprints — a class is the master blueprint; 'new' builds a house from that blueprint; 'extends' creates a specialized blueprint (like a House with a Pool) inheriting all base features. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "class & constructor",
        "desc": "The constructor runs when 'new ClassName()' is called, initializing properties."
      },
      {
        "title": "extends & Inheritance",
        "desc": "Subclasses inherit all methods and getters from their parent class."
      },
      {
        "title": "super() Call",
        "desc": "Must be called in subclass constructors before accessing 'this' to initialize the parent."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Classes, Constructors, extends & super:",
    "cards": [
      {
        "number": "01",
        "tag": "Blueprint",
        "title": "class MyClass {}",
        "description": "Modern, clean syntactic sugar over JavaScript's prototypical inheritance.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Inheritance",
        "title": "class Sub extends Base",
        "description": "Subclass gains access to all parent methods and behaviors.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Parent Init",
        "title": "super(...args)",
        "description": "Invokes the parent class constructor to set up inherited state.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Favor object composition over deep class inheritance hierarchies. Keep inheritance shallow (1-2 levels max) to avoid rigid architectures."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. super() First",
        "content": "In a derived class constructor, calling super() before accessing 'this' is mandatory."
      },
      {
        "title": "2. Private Fields (#)",
        "content": "Modern classes support truly private fields using the # prefix (e.g. #apiKey)."
      },
      {
        "title": "3. Static Methods",
        "content": "static methods are attached to the class constructor itself, not instances."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Accessing this before calling super() in subclass",
      "code": "class Animal {\n  constructor(name) { this.name = name; }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    // Bug: Accessing 'this' before super() throws ReferenceError!\n    this.breed = breed;\n    super(name);\n  }\n}",
      "explanation": "In JavaScript derived constructors, accessing 'this' before calling super() throws an immediate ReferenceError."
    },
    "good": {
      "title": "✅ Clean: Proper super() call and method overriding",
      "code": "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return `${this.name} makes a sound.`;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name); // Must call super first!\n    this.breed = breed;\n  }\n  speak() {\n    return `${this.name} (${this.breed}) barks: Woof!`;\n  }\n}\n\nconst rover = new Dog(\"Rover\", \"Golden Retriever\");\nconsole.log(rover.speak());",
      "explanation": "Calling super(name) first initializes the parent Animal state, enabling safe subclass extensions."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Classes, Constructors, extends & super directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-19: CLASSES, EXTENDS & SUPER\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nclass Account {\n  constructor(owner, initialBalance = 0) {\n    this.owner = owner;\n    this.balance = initialBalance;\n  }\n\n  deposit(amount) {\n    this.balance += amount;\n    console.log(`[Deposit] $${amount} added. Balance: $${this.balance}`);\n  }\n}\n\n// Subclass inheriting from Account\nclass PremiumAccount extends Account {\n  constructor(owner, initialBalance, cashbackRate = 0.02) {\n    super(owner, initialBalance); // Initialize parent class\n    this.cashbackRate = cashbackRate;\n  }\n\n  cashbackBonus(purchaseAmount) {\n    const bonus = purchaseAmount * this.cashbackRate;\n    this.deposit(bonus);\n    console.log(`🎁 Cashback bonus earned: $${bonus.toFixed(2)}`);\n  }\n}\n\nconst myAccount = new PremiumAccount(\"Samantha\", 500);\nmyAccount.deposit(200);\nmyAccount.cashbackBonus(150);\nconsole.log(\"Final balance:\", myAccount.balance);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Clean Blueprints",
        "desc": "Use classes to structure object-oriented models."
      },
      {
        "title": "2. extends for Subclasses",
        "desc": "Inherit methods from parent classes."
      },
      {
        "title": "3. super() First",
        "desc": "Always call super() before touching 'this'."
      },
      {
        "title": "4. Next: Async JS",
        "desc": "In JS-20, we enter asynchronous JavaScript and non-blocking I/O."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-20: Synchronous vs Asynchronous: Why JavaScript Never Freezes",
      "desc": "Understand the non-blocking execution model, timers, and why async code is vital for web applications."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What must you invoke in a child class constructor before using the 'this' keyword?",
      "options": [
        "this.init()",
        "super()",
        "parent.constructor()",
        "Object.bind(this)"
      ],
      "correctIndex": 1,
      "explanation": "In derived class constructors, you must call super() before accessing 'this'. Failure to do so throws a ReferenceError."
    }
  }
},

  "js20-synchronous-vs-asynchronous": {
  "slug": "js20-synchronous-vs-asynchronous",
  "code": "JS-20",
  "title": "Synchronous vs Asynchronous: Why JavaScript Never Freezes",
  "subtitle": "Understand non-blocking execution, timers, and why async code keeps browser interfaces responsive.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Synchronous vs Asynchronous: Why JavaScript Never Freezes. Think of this like A Coffee Shop Buzzer — you order coffee, the barista hands you a buzzing coaster, and you sit down to read the newspaper while your drink brews. You don't stand at the register freezing the line for other customers. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Synchronous Blocking",
        "desc": "Code executes sequentially; a slow loop stops everything else from running."
      },
      {
        "title": "Asynchronous Non-Blocking",
        "desc": "Tasks like network requests or timers are handed off, allowing the UI to remain smooth."
      },
      {
        "title": "Timers & Callbacks",
        "desc": "setTimeout schedules a callback to run after the current call stack clears."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Synchronous vs Asynchronous: Why JavaScript Never Freezes:",
    "cards": [
      {
        "number": "01",
        "tag": "Blocking",
        "title": "Synchronous",
        "description": "Line 2 cannot run until Line 1 finishes. Heavy math freezes the user interface.",
        "color": "rose"
      },
      {
        "number": "02",
        "tag": "Non-Blocking",
        "title": "Asynchronous",
        "description": "Offloads work to the browser runtime and schedules callbacks when ready.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Scheduling",
        "title": "setTimeout(fn, ms)",
        "description": "Sets a minimum delay before queuing the callback on the task queue.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never write synchronous blocking loops (while(Date.now() < target)) to simulate delays. Always use setTimeout or Promise-based delays."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. The Single Thread",
        "content": "JavaScript has one thread; offloading I/O prevents the thread from freezing."
      },
      {
        "title": "2. Zero-Delay Timers",
        "content": "setTimeout(fn, 0) defers execution until all current synchronous code finishes."
      },
      {
        "title": "3. User Responsiveness",
        "content": "Async code allows animations, scrolling, and clicks to respond instantly."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Synchronous blocking loop freezing the entire webpage",
      "code": "console.log(\"Starting task...\");\n// Freezes the browser tab completely for 3 seconds!\nconst end = Date.now() + 3000;\nwhile (Date.now() < end) {\n  // Page is totally frozen: buttons cannot be clicked!\n}\nconsole.log(\"Finished!\");",
      "explanation": "A synchronous busy-wait loop consumes 100% of the single thread, freezing the user's browser completely."
    },
    "good": {
      "title": "✅ Clean: Asynchronous non-blocking timer preserving UI fluidity",
      "code": "console.log(\"1. Order placed\");\n\nsetTimeout(() => {\n  console.log(\"3. Order ready for pickup! ☕\");\n}, 1000);\n\nconsole.log(\"2. Waiting comfortably without blocking other customers\");",
      "explanation": "The single thread stays completely free to process other tasks while the timer waits in the background."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Synchronous vs Asynchronous: Why JavaScript Never Freezes directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-20: SYNCHRONOUS VS ASYNCHRONOUS DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconsole.log(\"🏁 Step 1: Program starting (Synchronous)\");\n\n// Asynchronous timer (scheduled in background):\nsetTimeout(() => {\n  console.log(\"⏰ Step 3: Timer finished after delay! (Asynchronous)\");\n}, 500);\n\nconsole.log(\"🚀 Step 2: Next synchronous line runs immediately!\");\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Single-Threaded",
        "desc": "One call stack means blocking code freezes the whole app."
      },
      {
        "title": "2. Non-Blocking I/O",
        "desc": "Offload long operations so the user interface stays smooth."
      },
      {
        "title": "3. Execution Order",
        "desc": "Synchronous code always finishes before queued async timers run."
      },
      {
        "title": "4. Next: Promises",
        "desc": "In JS-21, we learn how Promises tame async callbacks."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-21: Promises: Managing Future Values with .then() & .catch()",
      "desc": "Escape callback hell and handle asynchronous success and error states using clean Promise chains."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why does JavaScript use asynchronous operations for network requests and timers?",
      "options": [
        "Because computers cannot calculate math synchronously.",
        "To prevent freezing the single-threaded UI and keep web pages responsive.",
        "To slow down the browser deliberately.",
        "Because JavaScript does not have variables."
      ],
      "correctIndex": 1,
      "explanation": "Since JavaScript runs on a single main thread, asynchronous execution prevents long-running operations (like network requests or file reads) from freezing user interactions."
    }
  }
},

  "js21-promises-and-chaining": {
  "slug": "js21-promises-and-chaining",
  "code": "JS-21",
  "title": "Promises: Managing Future Values with .then() & .catch()",
  "subtitle": "Handle future values cleanly with Promise states: Pending, Fulfilled, and Rejected.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Promises: Managing Future Values with .then() & .catch(). Think of this like A Delivery Tracking Number — when you order an item online, the store hands you a tracking code (a Promise). Right now it's Pending; tomorrow it will either be Fulfilled (package arrived) or Rejected (delivery lost). It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "The 3 Promise States",
        "desc": "Pending (in progress), Fulfilled (resolved with value), or Rejected (failed with error)."
      },
      {
        "title": ".then() for Success",
        "desc": "Executes when the promise resolves, receiving the resolved payload."
      },
      {
        "title": ".catch() & .finally()",
        "desc": ".catch() handles errors anywhere in the chain; .finally() runs cleanup regardless of outcome."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Promises: Managing Future Values with .then() & .catch():",
    "cards": [
      {
        "number": "01",
        "tag": "State",
        "title": "Pending -> Settled",
        "description": "A promise starts Pending and settles into either Fulfilled or Rejected permanently.",
        "color": "cyan"
      },
      {
        "number": "02",
        "tag": "Success",
        "title": ".then(data => ...)",
        "description": "Transforms and passes data down the chain to the next handler.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Recovery",
        "title": ".catch(err => ...)",
        "description": "Catches any error thrown in previous .then() steps, preventing unhandled rejections.",
        "color": "rose"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always attach a .catch() handler to Promise chains (or wrap in try/catch). Unhandled rejections crash Node.js processes."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Returning in .then",
        "content": "Returning a value in a .then() callback wraps that value in a new resolved Promise."
      },
      {
        "title": "2. Flattening Chains",
        "content": "Returning a Promise inside a .then() callback automatically unwraps it, preventing nesting."
      },
      {
        "title": "3. Promise.all()",
        "content": "Runs multiple promises concurrently and resolves when ALL promises succeed."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Callback Hell with nested asynchronous pyramids",
      "code": "// Nested callback pyramid of doom:\ngetUser(userId, (user) => {\n  getOrders(user.id, (orders) => {\n    getOrderDetails(orders[0].id, (details) => {\n      console.log(details); // Hard to read, hard to catch errors!\n    });\n  });\n});",
      "explanation": "Deeply nested callbacks are nearly impossible to read, maintain, or error-handle reliably."
    },
    "good": {
      "title": "✅ Clean: Flat, readable Promise chaining with centralized error handling",
      "code": "const fetchUser = (id) => Promise.resolve({ id, name: \"Maria\" });\nconst fetchOrders = (user) => Promise.resolve([\"Order #101\", \"Order #102\"]);\n\nfetchUser(1)\n  .then((user) => fetchOrders(user))\n  .then((orders) => console.log(\"Orders found:\", orders))\n  .catch((err) => console.error(\"Pipeline failed:\", err.message));",
      "explanation": "Chaining .then() creates a linear pipeline where a single .catch() at the bottom handles any failure."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Promises: Managing Future Values with .then() & .catch() directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-21: PROMISES & CHAINING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// 1. Function returning a simulated Promise:\nfunction checkInventory(item, inStock) {\n  return new Promise((resolve, reject) => {\n    console.log(`🔍 Checking stock for ${item}...`);\n    setTimeout(() => {\n      if (inStock) {\n        resolve({ item, status: \"AVAILABLE\", price: 49.99 });\n      } else {\n        reject(new Error(`Out of stock: ${item}`));\n      }\n    }, 300);\n  });\n}\n\n// 2. Consume Promise with .then(), .catch(), and .finally():\ncheckInventory(\"Wireless Headphones\", true)\n  .then((product) => {\n    console.log(\"✅ Success! Item is:\", product.status);\n    return product.price * 1.08; // Add tax\n  })\n  .then((finalPrice) => {\n    console.log(\"💰 Final Price with Tax: $\" + finalPrice.toFixed(2));\n  })\n  .catch((error) => {\n    console.error(\"❌ Order Error:\", error.message);\n  })\n  .finally(() => {\n    console.log(\"🏁 Inventory check finished.\");\n  });\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. 3 States",
        "desc": "Pending -> Fulfilled or Rejected."
      },
      {
        "title": "2. Flat Chains",
        "desc": "Chain .then() handlers linearly instead of nesting callbacks."
      },
      {
        "title": "3. Central Catch",
        "desc": "One .catch() at the end captures errors from any previous step."
      },
      {
        "title": "4. Next: Async/Await",
        "desc": "In JS-22, we make async code look and feel like synchronous code."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-22: Async/Await: Clean Asynchronous Workflows",
      "desc": "Write asynchronous code that reads like synchronous code using the modern async and await keywords."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Which method is used to catch errors in a Promise chain?",
      "options": [
        ".onError()",
        ".catch()",
        ".fail()",
        ".except()"
      ],
      "correctIndex": 1,
      "explanation": "The .catch() method is used in Promise chains to handle any errors or rejections that occur in earlier steps."
    }
  }
},

  "js22-async-await": {
  "slug": "js22-async-await",
  "code": "JS-22",
  "title": "Async/Await: Clean Asynchronous Workflows",
  "subtitle": "Write asynchronous code that reads cleanly like synchronous code using async and await with try/catch.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Async/Await: Clean Asynchronous Workflows. Think of this like Reading a Cookbook — when the recipe says 'Wait 10 minutes for oven to preheat (await)', you pause reading the recipe until the chime rings, but your kitchen assistants keep chopping onions in the background. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "The async Keyword",
        "desc": "Declaring a function 'async' guarantees it automatically returns a Promise."
      },
      {
        "title": "The await Keyword",
        "desc": "Pauses function execution until the Promise resolves, unwrapping its value."
      },
      {
        "title": "try / catch Handling",
        "desc": "Handle asynchronous errors using standard synchronous try/catch blocks."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Async/Await: Clean Asynchronous Workflows:",
    "cards": [
      {
        "number": "01",
        "tag": "Syntax",
        "title": "async function () {}",
        "description": "Wraps the function return value in a Promise automatically.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Control",
        "title": "await promise",
        "description": "Pauses only the local function; other tasks on the event loop continue running.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Errors",
        "title": "try { } catch (err) { }",
        "description": "Unifies synchronous and asynchronous error handling into one clean block.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Avoid the 'waterfall trap': if two async operations don't depend on each other, await Promise.all([a(), b()]) concurrently instead of awaiting them in sequence."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Top-Level Await",
        "content": "Modern ES Modules support top-level await outside of async functions."
      },
      {
        "title": "2. Clean Unwrapping",
        "content": "const data = await fetch() unwraps the Promise value directly without .then() nesting."
      },
      {
        "title": "3. Parallel Execution",
        "content": "Promise.all([fetchUsers(), fetchPosts()]) runs both tasks concurrently."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Sequential waterfall for independent network calls",
      "code": "async function loadDashboard() {\n  // Bug: Sequential waterfall! Takes 1s + 1s = 2 seconds!\n  const users = await fetchUsers(); // 1 second\n  const stats = await fetchStats(); // 1 second (waits for users needlessly!)\n  return { users, stats };\n}",
      "explanation": "Awaiting independent promises sequentially doubles total wait time. Run them in parallel with Promise.all."
    },
    "good": {
      "title": "✅ Clean: Parallel execution with Promise.all and try/catch",
      "code": "async function loadDashboard() {\n  try {\n    // Both network requests run concurrently: takes only 1 second total!\n    const [users, stats] = await Promise.all([\n      fetchUsers(),\n      fetchStats()\n    ]);\n    return { users, stats };\n  } catch (error) {\n    console.error(\"Dashboard failed to load:\", error);\n  }\n}",
      "explanation": "Promise.all executes independent async calls concurrently, halving response latency."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Async/Await: Clean Asynchronous Workflows directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-22: ASYNC / AWAIT DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Simulated asynchronous database queries:\nfunction queryUser(id) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ id, name: \"Sophia\", role: \"Developer\" }), 200);\n  });\n}\n\nfunction queryUserProjects(userId) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve([\"LearnCraft Platform\", \"API Gateway\"]), 200);\n  });\n}\n\n// Modern async/await workflow:\nasync function loadUserData(userId) {\n  console.log(\"⏳ Fetching user profile...\");\n  try {\n    const user = await queryUser(userId);\n    console.log(\"👤 User loaded:\", user.name, `(${user.role})`);\n\n    console.log(\"⏳ Fetching projects...\");\n    const projects = await queryUserProjects(user.id);\n    console.log(\"🚀 Active projects:\", projects.join(\", \"));\n\n    return { user, projects };\n  } catch (err) {\n    console.error(\"Failed to load user data:\", err);\n  }\n}\n\n// Execute the async function!\nloadUserData(42);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Clean Readability",
        "desc": "Async/await eliminates nested .then() callbacks."
      },
      {
        "title": "2. Standard try/catch",
        "desc": "Catch async errors using familiar try/catch syntax."
      },
      {
        "title": "3. Avoid Waterfalls",
        "desc": "Use Promise.all() for independent async tasks."
      },
      {
        "title": "4. Next: The Event Loop",
        "desc": "In JS-23, we look behind the curtain at the Event Loop and task queues."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-23: The Event Loop & Concurrency: Call Stack & Task Queues",
      "desc": "Master the exact execution order: Call Stack, Microtasks (Promises), and Macrotasks (Timers)."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What does an 'async' function always return in JavaScript?",
      "options": [
        "A synchronous string.",
        "A Promise (automatically wrapping the return value).",
        "undefined only.",
        "A generator object."
      ],
      "correctIndex": 1,
      "explanation": "Any function marked with the async keyword always returns a Promise. If the function returns a non-promise value, JavaScript wraps it in a resolved Promise automatically."
    }
  }
},

  "js23-the-event-loop": {
  "slug": "js23-the-event-loop",
  "code": "JS-23",
  "title": "The Event Loop & Concurrency: Call Stack & Task Queues",
  "subtitle": "Master the exact execution order: Call Stack, Microtasks (Promises), and Macrotasks (Timers).",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master The Event Loop & Concurrency: Call Stack & Task Queues. Think of this like An Airport Runway & Waiting Line — the Call Stack is the active runway (only 1 plane can take off at a time). The Microtask Queue is VIP first-class passengers who board immediately when the runway clears. The Macrotask Queue is general boarding waiting for their scheduled turn. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Call Stack",
        "desc": "Executes synchronous code until completely empty."
      },
      {
        "title": "Microtask Queue (VIP)",
        "desc": "Drains ALL pending Promises and queueMicrotask items immediately when stack clears."
      },
      {
        "title": "Macrotask Queue",
        "desc": "Processes one timer or I/O event at a time after microtasks are completely empty."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of The Event Loop & Concurrency: Call Stack & Task Queues:",
    "cards": [
      {
        "number": "01",
        "tag": "Priority 1",
        "title": "Call Stack (Sync)",
        "description": "Runs top to bottom. Nothing else runs until the call stack is 100% empty.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Priority 2",
        "title": "Microtasks (Promises)",
        "description": "Promise.then, catch, finally, queueMicrotask. Drained to zero every cycle.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Priority 3",
        "title": "Macrotasks (Timers)",
        "description": "setTimeout, setInterval, I/O events. Dequeued one by one between microtask checks.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Promises (Microtasks) ALWAYS run before setTimeout (Macrotasks), even if setTimeout is set to 0 milliseconds."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Complete Drain",
        "content": "The engine never processes a macrotask if there are unhandled microtasks waiting."
      },
      {
        "title": "2. Starvation Risk",
        "content": "Recursively queuing microtasks starves the event loop, freezing macrotasks and rendering."
      },
      {
        "title": "3. Render Phase",
        "content": "Browser repaints occur between macrotasks, after microtasks have cleared."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Misunderstanding execution order of setTimeout(fn, 0)",
      "code": "console.log(\"1\");\nsetTimeout(() => console.log(\"2\"), 0);\nconsole.log(\"3\");\n// Believing \"2\" will run between \"1\" and \"3\" because delay is 0ms!",
      "explanation": "Even with 0ms delay, setTimeout is a Macrotask. It must wait until the call stack is completely empty."
    },
    "good": {
      "title": "✅ Clean: Predictable coordination between stack, microtasks, and macrotasks",
      "code": "console.log(\"1. Synchronous Stack\");\n\nsetTimeout(() => console.log(\"4. Macrotask (setTimeout 0ms)\"), 0);\n\nPromise.resolve().then(() => console.log(\"3. Microtask (Promise.then)\"));\n\nconsole.log(\"2. Synchronous Stack Continues\");\n// Order logged: 1 -> 2 -> 3 -> 4!",
      "explanation": "Sync code (1, 2) runs first, then VIP microtask (3) drains, then macrotask (4) runs."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with The Event Loop & Concurrency: Call Stack & Task Queues directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-23: THE EVENT LOOP IN ACTION\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconsole.log(\"1️⃣ Synchronous Log: Call stack start\");\n\n// Macrotask (Timer):\nsetTimeout(() => {\n  console.log(\"4️⃣ Macrotask Log: setTimeout callback executed\");\n}, 0);\n\n// Microtask (Promise):\nPromise.resolve().then(() => {\n  console.log(\"3️⃣ Microtask Log: Promise.then executed (VIP priority!)\");\n});\n\nconsole.log(\"2️⃣ Synchronous Log: Call stack finish\");\n\n// Execution flow explanation:\n// 1. Logs \"1\" and \"2\" synchronously on the Call Stack.\n// 2. Call Stack empties -> Microtask queue drains -> Logs \"3\".\n// 3. Next turn of Event Loop -> Macrotask queue dequeues -> Logs \"4\".\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Call Stack First",
        "desc": "All synchronous code runs to completion first."
      },
      {
        "title": "2. Microtasks Drain Next",
        "desc": "Promise handlers run before any timer callbacks."
      },
      {
        "title": "3. Macrotasks Run Last",
        "desc": "setTimeout waits for the stack and microtasks to clear."
      },
      {
        "title": "4. Next: Error Handling",
        "desc": "In JS-24, we learn how to gracefully catch and recover from errors."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-24: Error Handling: try, catch, finally & throw",
      "desc": "Protect your applications from unexpected crashes using defensive error handling patterns."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "In what order will these three lines execute? (A: setTimeout 0ms, B: Synchronous log, C: Promise.resolve().then)",
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
  "subtitle": "Protect web applications from crashes using try, catch, finally, and custom Error objects.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Error Handling: try, catch, finally & throw. Think of this like A Stunt Net Under a Trapeze — if the acrobat performs successfully, they take a bow; if they slip and fall, the net catches them (catch) so the circus show doesn't halt in disaster, and the safety inspection runs either way (finally). It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "try / catch Blocks",
        "desc": "Wrap risky operations (JSON parsing, network calls) in try; catch handles failures."
      },
      {
        "title": "The throw Statement",
        "desc": "throw new Error('message') halts execution in the current block and transfers control to the nearest catch."
      },
      {
        "title": "The finally Block",
        "desc": "Guaranteed to run after try and catch, perfect for closing connections and clearing loading spinners."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Error Handling: try, catch, finally & throw:",
    "cards": [
      {
        "number": "01",
        "tag": "Containment",
        "title": "try { ... }",
        "description": "Encloses potentially dangerous operations that might fail at runtime.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Recovery",
        "title": "catch (error) { ... }",
        "description": "Provides graceful degradation, user messaging, or error telemetry.",
        "color": "rose"
      },
      {
        "number": "03",
        "tag": "Cleanup",
        "title": "finally { ... }",
        "description": "Always executes regardless of whether an error was thrown or handled.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always throw Error instances (throw new Error('...')) rather than raw strings or numbers. Error instances include stack traces for debugging."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Stack Traces",
        "content": "new Error() captures the exact file name and line number where the problem originated."
      },
      {
        "title": "2. Re-throwing",
        "content": "If a catch block cannot handle a specific error, re-throw it: throw error."
      },
      {
        "title": "3. Never Swallow Silently",
        "content": "Never leave catch empty (catch (e) {}). Log or handle the failure so bugs aren't invisible."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Empty catch block hiding critical production bugs",
      "code": "try {\n  processPayment(user);\n} catch (error) {\n  // Silent swallow: developer will have NO IDEA why payments are failing!\n}",
      "explanation": "Swallowing errors silently makes production bugs impossible to diagnose and triage."
    },
    "good": {
      "title": "✅ Clean: Structured error handling with specific logging and cleanup",
      "code": "const user = { hasValidCard: true };\nfunction processPayment(u) { console.log(\"Payment processed for user.\"); }\nfunction showToastNotification(msg) { console.log(\"Toast:\", msg); }\n\nlet isLoading = true;\ntry {\n  if (!user.hasValidCard) {\n    throw new Error(\"Payment card expired or invalid\");\n  }\n  processPayment(user);\n} catch (error) {\n  console.error(\"❌ Payment failed:\", error.message);\n  showToastNotification(\"Payment unsuccessful. Please check your card.\");\n} finally {\n  isLoading = false; // Always dismiss the loading spinner!\n  console.log(\"Loading state cleared:\", isLoading);\n}",
      "explanation": "The error is captured with its message, the user receives feedback, and finally cleans up state reliably."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Error Handling: try, catch, finally & throw directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-24: ERROR HANDLING IN ACTION\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nfunction calculatePercentage(portion, total) {\n  if (typeof portion !== \"number\" || typeof total !== \"number\") {\n    throw new TypeError(\"Both arguments must be valid numbers\");\n  }\n  if (total === 0) {\n    throw new RangeError(\"Total cannot be zero (division by zero)\");\n  }\n  return ((portion / total) * 100).toFixed(1) + \"%\";\n}\n\n// Test case 1: Successful calculation\ntry {\n  const result = calculatePercentage(25, 100);\n  console.log(\"✅ Success result:\", result);\n} catch (err) {\n  console.error(\"Caught error:\", err.message);\n}\n\n// Test case 2: Handled division by zero\ntry {\n  console.log(\"Attempting division by zero...\");\n  calculatePercentage(50, 0);\n} catch (err) {\n  console.warn(\"⚠️ Handled expected error:\", err.name, \"-\", err.message);\n} finally {\n  console.log(\"🏁 Cleanup step: Calculation test cycle complete.\");\n}\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. No Silent Swallows",
        "desc": "Never leave catch blocks empty."
      },
      {
        "title": "2. Always throw Error",
        "desc": "Use new Error() to preserve diagnostic stack traces."
      },
      {
        "title": "3. finally for Cleanups",
        "desc": "Reset loading indicators and close connections in finally."
      },
      {
        "title": "4. Next: ES Modules",
        "desc": "In JS-25, we organize modular code with import and export."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-25: ES Modules: Organizing Code with import & export",
      "desc": "Structure scalable applications by separating code into reusable modules with named and default exports."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is guaranteed to happen in a try...catch...finally block?",
      "options": [
        "The catch block will always execute even if no error occurs.",
        "The finally block will always execute regardless of whether an error was thrown or caught.",
        "Execution immediately halts the entire browser application.",
        "The try block runs twice if it fails."
      ],
      "correctIndex": 1,
      "explanation": "The 'finally' block is guaranteed to execute after the try (and catch, if an error occurred) block completes, regardless of the outcome."
    }
  }
},

  "js25-es-modules": {
  "slug": "js25-es-modules",
  "code": "JS-25",
  "title": "ES Modules: Organizing Code with import & export",
  "subtitle": "Organize modern codebases into isolated, reusable files using named and default imports and exports.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master ES Modules: Organizing Code with import & export. Think of this like A Hardware Toolkit with Organized Drawers — instead of dumping 1,000 tools into a single giant pile, each drawer (module) holds related tools. You import only the wrench and hammer you need into your active workbench. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Named Exports",
        "desc": "Export multiple functions or constants by name: export const add = ...;."
      },
      {
        "title": "Default Exports",
        "desc": "Export the primary item per file: export default class User {}."
      },
      {
        "title": "Module Isolation",
        "desc": "Modules execute in strict mode by default and keep top-level variables private."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of ES Modules: Organizing Code with import & export:",
    "cards": [
      {
        "number": "01",
        "tag": "Named",
        "title": "export { a, b }",
        "description": "Imports must use exact matching names: import { a, b } from './math'.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Default",
        "title": "export default fn",
        "description": "Imports can use any chosen local name: import MyMath from './math'.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Static",
        "title": "Tree Shaking",
        "description": "Static import syntax allows bundlers to remove unused exports from final builds.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Prefer named exports over default exports for utility libraries. Named exports prevent naming confusion and make auto-imports instant."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Strict Mode by Default",
        "content": "ES Modules automatically enforce 'use strict', preventing accidental globals."
      },
      {
        "title": "2. Static Analysis",
        "content": "Imports are resolved at compile time, enabling bundlers to optimize bundle size."
      },
      {
        "title": "3. Dynamic Imports",
        "content": "import('./module.js') allows lazy-loading code chunks on demand as a Promise."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Putting everything in one giant 5,000-line global file",
      "code": "// All models, database calls, API utilities, and UI code\n// dumped into a single monolithic script with global variables:\nvar appConfig = {};\nvar userList = [];\nfunction doEverything() {}",
      "explanation": "Monolithic scripts cause global namespace collisions, circular bugs, and zero code reusability."
    },
    "good": {
      "title": "✅ Clean: Clean separation into single-responsibility modules",
      "code": "// mathUtils.js\nexport const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;\n\n// main.js\n// import { add, multiply } from \"./mathUtils.js\";\nconsole.log(\"Modular add:\", add(5, 3)); // 8",
      "explanation": "Dedicated modules encapsulate logic and clearly declare what capabilities they export and consume."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with ES Modules: Organizing Code with import & export directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-25: ES MODULE PATTERN DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Simulating Module Export and Import Mechanics:\nconst CartModule = (() => {\n  // Private module state (not exported):\n  const items = [];\n\n  // Public exports:\n  return {\n    addItem(name, price) {\n      items.push({ name, price });\n      console.log(`📦 Added ${name} to cart ($ ${price})`);\n    },\n    getCartSummary() {\n      const total = items.reduce((acc, curr) => acc + curr.price, 0);\n      return { count: items.length, total: \"$\" + total.toFixed(2) };\n    }\n  };\n})();\n\n// Consuming the module:\nCartModule.addItem(\"Mechanical Keyboard\", 120);\nCartModule.addItem(\"Mousepad\", 20);\n\nconst summary = CartModule.getCartSummary();\nconsole.log(\"Cart items:\", summary.count);\nconsole.log(\"Total checkout cost:\", summary.total);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. File Isolation",
        "desc": "Variables stay local to the module unless explicitly exported."
      },
      {
        "title": "2. Named vs Default",
        "desc": "Use named exports for utilities; default for main components."
      },
      {
        "title": "3. Tree Shaking",
        "desc": "Bundlers strip out unused exports to keep apps fast."
      },
      {
        "title": "4. Next: Working with JSON",
        "desc": "In JS-26, we learn how to serialize and parse data formats."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-26: Working with JSON: Parsing and Serializing Data",
      "desc": "Exchange data between frontend and backend using JSON.stringify() and JSON.parse() safely."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is a major advantage of Named Exports (export { foo }) over Default Exports?",
      "options": [
        "Named exports make code execute 10 times faster in the CPU.",
        "Named exports enforce consistent naming across files and provide better auto-complete tooling.",
        "Named exports cannot be bundled.",
        "Named exports can only be used in Node.js."
      ],
      "correctIndex": 1,
      "explanation": "Named exports require importing files to use the exact matching identifier, which eliminates naming ambiguities and allows IDEs to auto-import symbols accurately."
    }
  }
},

  "js26-working-with-json": {
  "slug": "js26-working-with-json",
  "code": "JS-26",
  "title": "Working with JSON: Parsing and Serializing Data",
  "subtitle": "Exchange data between browsers and servers using JSON.stringify() and JSON.parse() safely.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Working with JSON: Parsing and Serializing Data. Think of this like A Flat-Pack Furniture Box — you can't mail an assembled sofa through the postal slot. You disassemble the sofa into flat boards (JSON.stringify) to ship it across the postal network, and the recipient rebuilds the sofa (JSON.parse) when it arrives. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "What is JSON?",
        "desc": "JavaScript Object Notation — the universal text-based data format for web APIs."
      },
      {
        "title": "JSON.stringify()",
        "desc": "Converts a JavaScript object/array into a formatted JSON string for network transmission."
      },
      {
        "title": "JSON.parse()",
        "desc": "Parses a valid JSON string back into a live JavaScript object; always wrap in try/catch!"
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Working with JSON: Parsing and Serializing Data:",
    "cards": [
      {
        "number": "01",
        "tag": "Serialize",
        "title": "JSON.stringify(obj)",
        "description": "Turns in-memory objects into transmission strings. Skips undefined and functions.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Deserialize",
        "title": "JSON.parse(string)",
        "description": "Constructs live objects from strings. Throws a SyntaxError on invalid syntax.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Strict Rules",
        "title": "Double Quotes Only",
        "description": "All keys and strings in JSON must use double quotes \"key\": \"value\".",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always wrap JSON.parse in a try/catch block. Malformed JSON from an external server or corrupted storage crashes your entire application."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Double Quotes Required",
        "content": "Single quotes and unquoted keys are invalid JSON and will fail parsing."
      },
      {
        "title": "2. Stripped Values",
        "content": "JSON.stringify strips functions, undefined, and symbols because JSON is pure data."
      },
      {
        "title": "3. Pretty Printing",
        "content": "JSON.stringify(obj, null, 2) indents JSON with 2 spaces for readable debugging."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Calling JSON.parse without try/catch protection",
      "code": "const corruptedData = \"{ name: 'invalid JSON' }\"; // Single quotes!\n// Crashes immediately with SyntaxError: Unexpected token ' in JSON at position 2\nconst data = JSON.parse(corruptedData);",
      "explanation": "JSON syntax requires double quotes for keys and strings. Calling JSON.parse without try/catch crashes the app."
    },
    "good": {
      "title": "✅ Clean: Safe parsing with try/catch and fallback defaults",
      "code": "function safeJsonParse(jsonString, fallback = {}) {\n  try {\n    return JSON.parse(jsonString);\n  } catch (error) {\n    console.warn(\"⚠️ Invalid JSON detected. Using safe fallback.\");\n    return fallback;\n  }\n}\n\nconst safeResult = safeJsonParse(\"not a json string\", { items: [] });\nconsole.log(safeResult); // { items: [] } (No crash!)",
      "explanation": "Wrapping JSON.parse in a helper function catches syntax errors gracefully and supplies a safe default."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Working with JSON: Parsing and Serializing Data directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-26: WORKING WITH JSON\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nconst userSession = {\n  id: \"usr_99\",\n  displayName: \"Jordan\",\n  roles: [\"editor\", \"moderator\"],\n  lastLogin: \"2026-10-17T06:00:00Z\",\n  token: undefined // Note: undefined will be stripped by stringify!\n};\n\n// 1. Serialize object to JSON string:\nconst serialized = JSON.stringify(userSession, null, 2);\nconsole.log(\"Serialized JSON String:\");\nconsole.log(serialized);\n\n// 2. Safe Deserialization with try/catch:\ntry {\n  const parsed = JSON.parse(serialized);\n  console.log(\"Restored Username:\", parsed.displayName);\n  console.log(\"Restored Roles:\", parsed.roles.join(\", \"));\n} catch (err) {\n  console.error(\"JSON parse failure:\", err.message);\n}\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Universal Format",
        "desc": "JSON is the standard format for web API communication."
      },
      {
        "title": "2. Double Quotes Only",
        "desc": "Keys and string values must be wrapped in double quotes \"\"."
      },
      {
        "title": "3. Safe JSON.parse",
        "desc": "Always guard JSON.parse with try/catch."
      },
      {
        "title": "4. Next: The Fetch API",
        "desc": "In JS-27, we use fetch to request live JSON data from REST APIs."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-27: The Fetch API: Communicating with REST APIs",
      "desc": "Send HTTP GET, POST, and PUT requests to web servers and parse JSON responses asynchronously."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Which of the following values will be stripped (ignored) by JSON.stringify() when serializing an object?",
      "options": [
        "Numbers and booleans",
        "Arrays and strings",
        "Functions and undefined properties",
        "Objects with nested keys"
      ],
      "correctIndex": 2,
      "explanation": "JSON is a pure data format. Functions, Symbol keys, and undefined properties are omitted by JSON.stringify() because JSON cannot represent executable code or JS-specific types."
    }
  }
},

  "js27-the-fetch-api": {
  "slug": "js27-the-fetch-api",
  "code": "JS-27",
  "title": "The Fetch API: Communicating with REST APIs",
  "subtitle": "Make asynchronous HTTP requests, inspect response status codes, and parse JSON payloads safely.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master The Fetch API: Communicating with REST APIs. Think of this like A Restaurant Waiter carrying Orders — you give the waiter your food order (HTTP Request); the waiter carries it to the kitchen (Server), and returns carrying a covered dish (HTTP Response). You lift the lid to enjoy your meal (res.json()). It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "Making HTTP Requests",
        "desc": "fetch(url, options) returns a Promise resolving to the HTTP Response object."
      },
      {
        "title": "Checking res.ok",
        "desc": "fetch() does NOT reject on 404 or 500 errors; you must explicitly verify res.ok === true."
      },
      {
        "title": "Parsing res.json()",
        "desc": "Reads the response stream to completion and parses it as a live JavaScript object."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of The Fetch API: Communicating with REST APIs:",
    "cards": [
      {
        "number": "01",
        "tag": "HTTP",
        "title": "fetch(url)",
        "description": "Performs modern Promise-based network requests to REST API endpoints.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Status Check",
        "title": "res.ok Guard",
        "description": "Checks if status is 200-299. Must verify manually before parsing data.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Parsing",
        "title": "await res.json()",
        "description": "Asynchronously parses the response body stream into a usable object.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never assume fetch() catches 404 or 500 errors. Always check: if (!res.ok) throw new Error(`HTTP error: ${res.status}`);."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Two-Step Promise",
        "content": "fetch() requires two awaits: await fetch() for headers, then await res.json() for data body."
      },
      {
        "title": "2. Network Errors Only",
        "content": "The promise rejects ONLY on true network failures (e.g. DNS failure, no internet connection)."
      },
      {
        "title": "3. Request Options",
        "content": "Pass { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) } to post data."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Assuming fetch throws errors on 404 or 500 status codes",
      "code": "async function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    // If server returns 404 Not Found, fetch does NOT reject!\n    // It proceeds here and tries to parse HTML error page as JSON -> CRASH!\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.log(\"Failed\");\n  }\n}",
      "explanation": "fetch() only rejects on network loss, not HTTP error statuses like 404 or 500."
    },
    "good": {
      "title": "✅ Clean: Robust response checking with res.ok guard",
      "code": "async function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) {\n    throw new Error(`Server returned status ${res.status}: ${res.statusText}`);\n  }\n  return await res.json();\n}",
      "explanation": "Checking res.ok ensures that only successful 2xx responses are parsed as JSON."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with The Fetch API: Communicating with REST APIs directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-27: THE FETCH API DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Universal API client that works both online and in sandbox environments:\nasync function fetchUserData(userId) {\n  console.log(`🌐 Fetching data for User #${userId}...`);\n\n  try {\n    // In live browsers, this makes a real HTTP request.\n    // In sandboxes without external network, we safely simulate the API response:\n    let response;\n    if (typeof fetch !== \"undefined\" && typeof window !== \"undefined\" && window.location.protocol.startsWith(\"http\")) {\n      try {\n        response = await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`);\n      } catch (networkErr) {\n        // Fallback for sandboxed iframes\n        response = null;\n      }\n    }\n\n    if (response && response.ok) {\n      const data = await response.json();\n      console.log(\"✅ Live API Response received:\", data.title);\n      return data;\n    } else {\n      // Offline/sandboxed simulation:\n      console.log(\"📦 Loaded from simulated REST endpoint:\");\n      const mockData = { id: userId, title: \"Master modern JavaScript & React\", completed: true };\n      console.log(\"Task Title:\", mockData.title);\n      console.log(\"Status:\", mockData.completed ? \"COMPLETED ✅\" : \"PENDING ⏳\");\n      return mockData;\n    }\n  } catch (error) {\n    console.error(\"Fetch request failed:\", error.message);\n  }\n}\n\nfetchUserData(1);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Check res.ok",
        "desc": "Always check res.ok before attempting to parse response body."
      },
      {
        "title": "2. Two Awaits",
        "desc": "Await the connection headers first, then await res.json()."
      },
      {
        "title": "3. Handle Network Errors",
        "desc": "Use try/catch to catch total connectivity failures."
      },
      {
        "title": "4. Next: DOM Essentials",
        "desc": "In JS-28, we learn how to select and manipulate HTML elements."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-28: Browser DOM Essentials: Selecting & Modifying Elements",
      "desc": "Connect JavaScript with web page HTML: select elements with querySelector and update text, classes, and styles."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens when a fetch() request receives an HTTP 404 (Not Found) status from the server?",
      "options": [
        "The fetch Promise immediately rejects and jumps to the catch block.",
        "The Promise fulfills successfully, but res.ok is false and res.status is 404.",
        "The browser immediately closes the network connection and reloads.",
        "fetch returns null."
      ],
      "correctIndex": 1,
      "explanation": "fetch() does not reject on HTTP errors (like 404 or 500). The promise fulfills normally; you must check res.ok or res.status to verify whether the request succeeded."
    }
  }
},

  "js28-dom-essentials": {
  "slug": "js28-dom-essentials",
  "code": "JS-28",
  "title": "Browser DOM Essentials: Selecting & Modifying Elements",
  "subtitle": "Bridge JavaScript with the browser: select elements with querySelector, update text, and manipulate styles.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Browser DOM Essentials: Selecting & Modifying Elements. Think of this like A Puppeteer's Control Strings — the HTML on screen is the puppet; the DOM is the wooden cross and strings; JavaScript is the puppeteer who pulls the strings to make the puppet move, speak, and change costumes. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "What is the DOM?",
        "desc": "Document Object Model — a tree of JavaScript objects representing every HTML node on the page."
      },
      {
        "title": "Selecting Elements",
        "desc": "document.querySelector('selector') finds elements using standard CSS selectors."
      },
      {
        "title": "Modifying Content & Styles",
        "desc": "Update textContent, innerHTML, or toggle CSS classes with element.classList."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Browser DOM Essentials: Selecting & Modifying Elements:",
    "cards": [
      {
        "number": "01",
        "tag": "Select",
        "title": "querySelector('.class')",
        "description": "Selects the first matching element using any valid CSS selector.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Safe Text",
        "title": "textContent",
        "description": "Safely sets plain text without risk of Cross-Site Scripting (XSS) attacks.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Classes",
        "title": "classList.toggle()",
        "description": "Add, remove, or toggle CSS class names cleanly without editing raw strings.",
        "color": "cyan"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never insert untrusted user input using innerHTML. Always use textContent to prevent Cross-Site Scripting (XSS) vulnerabilities."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. querySelectorAll",
        "content": "Returns a static NodeList of all matching elements, which you can iterate with forEach."
      },
      {
        "title": "2. classList API",
        "content": "classList.add(), remove(), toggle(), and contains() manage styles cleanly."
      },
      {
        "title": "3. createElement",
        "content": "document.createElement('div') constructs new elements offscreen before appending."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Using innerHTML with untrusted user input (XSS Vulnerability)",
      "code": "const userInput = \"<img src='x' onerror='alert(\\\"HACKED\\\")'>\";\n// Dangerous: Injects raw HTML from user directly into the page!\ndocument.getElementById(\"profile\").innerHTML = userInput;",
      "explanation": "Using innerHTML with user input allows malicious actors to inject and execute arbitrary JavaScript."
    },
    "good": {
      "title": "✅ Clean: Safe text insertion and classList management",
      "code": "const header = document.querySelector(\"#page-title\");\nif (header) {\n  // Safe: escapes any special HTML characters automatically:\n  header.textContent = \"Welcome back, User!\";\n  header.classList.add(\"text-emerald-400\", \"font-bold\");\n}",
      "explanation": "Using textContent prevents HTML injection completely, and classList adds styles predictably."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Browser DOM Essentials: Selecting & Modifying Elements directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-28: DOM ESSENTIALS DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Simulating DOM node representation and manipulation:\nclass SimulatedElement {\n  constructor(tagName) {\n    this.tagName = tagName.toUpperCase();\n    this.textContent = \"\";\n    this.classes = new Set();\n  }\n\n  addClass(className) {\n    this.classes.add(className);\n    return this;\n  }\n\n  render() {\n    const classAttr = this.classes.size ? ` class=\"${[...this.classes].join(\" \")}\"` : \"\";\n    return `<${this.tagName}${classAttr}>${this.textContent}</${this.tagName}>`;\n  }\n}\n\n// 1. Create and manipulate element:\nconst button = new SimulatedElement(\"button\");\nbutton.textContent = \"Click Me\";\nbutton.addClass(\"btn\").addClass(\"btn-primary\");\n\nconsole.log(\"Rendered Element:\", button.render());\n\n// 2. Browser document check:\nif (typeof document !== \"undefined\") {\n  console.log(\"Document available! Document title:\", document.title || \"LearnCraft Sandbox\");\n} else {\n  console.log(\"Running in pure Node.js runtime (Document simulated)\");\n}\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. querySelector",
        "desc": "Select elements with standard CSS selectors."
      },
      {
        "title": "2. textContent for Safety",
        "desc": "Prevent XSS by avoiding innerHTML for user data."
      },
      {
        "title": "3. classList API",
        "desc": "Add, remove, and toggle styling classes dynamically."
      },
      {
        "title": "4. Next: Events & Delegation",
        "desc": "In JS-29, we handle user clicks, inputs, and event bubbling."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-29: Events, Event Listeners & Event Delegation",
      "desc": "Respond to user actions with addEventListener and master Event Bubbling and Event Delegation."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why is 'textContent' preferred over 'innerHTML' when updating an element with user-provided text?",
      "options": [
        "textContent executes faster on older smartphones.",
        "textContent automatically escapes HTML characters, preventing Cross-Site Scripting (XSS) attacks.",
        "innerHTML is deprecated in HTML5.",
        "textContent changes the font to bold automatically."
      ],
      "correctIndex": 1,
      "explanation": "Setting textContent treats all inputs as plain text and escapes HTML entities, making it impossible for attackers to inject malicious script tags or HTML."
    }
  }
},

  "js29-events-and-delegation": {
  "slug": "js29-events-and-delegation",
  "code": "JS-29",
  "title": "Events, Event Listeners & Event Delegation",
  "subtitle": "Respond to user clicks, keyboard presses, and form submissions using addEventListener and Event Delegation.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Events, Event Listeners & Event Delegation. Think of this like A Building Concierge handling Deliveries — instead of stationing a security guard outside every single apartment door (attaching 500 listeners), you place one concierge in the lobby (Event Delegation) to handle packages for all apartments as residents pass by. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "addEventListener()",
        "desc": "Attaches a callback function triggered when a user event occurs."
      },
      {
        "title": "Event Bubbling",
        "desc": "Events bubble upward through the DOM hierarchy from child element to ancestors."
      },
      {
        "title": "Event Delegation",
        "desc": "Attach ONE listener to a parent container to manage hundreds of dynamic child elements."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Events, Event Listeners & Event Delegation:",
    "cards": [
      {
        "number": "01",
        "tag": "Listener",
        "title": "addEventListener('click', fn)",
        "description": "Listens for user actions (click, input, submit, keydown) non-destructively.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Flow",
        "title": "Event Bubbling",
        "description": "Target -> Parent -> Body -> Document. Event travels up the DOM tree.",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Pattern",
        "title": "Event Delegation",
        "description": "Single listener on parent checks event.target.matches('button') for dynamic lists.",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Always use Event Delegation for dynamic lists. Attach one listener to the parent <ul> rather than adding listeners to each <li>."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. event.preventDefault()",
        "content": "Stops the default browser action (e.g., stopping a form submit from reloading the page)."
      },
      {
        "title": "2. event.stopPropagation()",
        "content": "Halts event bubbling up to parent ancestor elements."
      },
      {
        "title": "3. event.target vs currentTarget",
        "content": "target is the exact element clicked; currentTarget is the element holding the listener."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Attaching individual listeners to hundreds of list items",
      "code": "// Attaching 1,000 separate listeners in memory:\ndocument.querySelectorAll(\".todo-item-btn\").forEach((btn) => {\n  btn.addEventListener(\"click\", () => handleDelete());\n});\n// When new items are added dynamically, they have NO listeners attached!",
      "explanation": "Attaching listeners to every child consumes memory and fails to work for dynamically added elements."
    },
    "good": {
      "title": "✅ Clean: Event Delegation with a single listener on parent",
      "code": "const listContainer = document.querySelector(\"#todo-list\");\n\nlistContainer.addEventListener(\"click\", (event) => {\n  const deleteBtn = event.target.closest(\".btn-delete\");\n  if (deleteBtn) {\n    const taskId = deleteBtn.dataset.taskId;\n    console.log(\"Deleted task ID:\", taskId);\n  }\n});",
      "explanation": "One listener on the parent handles clicks for all current and future dynamic items with zero memory waste."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Events, Event Listeners & Event Delegation directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-29: EVENTS & EVENT DELEGATION DEMO\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Simulating Event Delegation Logic:\nfunction handleContainerClick(event) {\n  console.log(\"🔔 Event received at container level!\");\n  console.log(\"Clicked Element Tag:\", event.target.tagName);\n\n  // Check if click originated from or inside a delete button:\n  if (event.target.tagName === \"BUTTON\" && event.target.dataset.action === \"delete\") {\n    const itemId = event.target.dataset.id;\n    console.log(`🗑️ [Action Verified] Deleted item with ID: ${itemId}`);\n  } else {\n    console.log(\"ℹ️ Click ignored: Not a delete action button.\");\n  }\n}\n\n// Test case 1: User clicks on the delete button\nconst clickEvent1 = {\n  target: { tagName: \"BUTTON\", dataset: { action: \"delete\", id: \"task_101\" } }\n};\nhandleContainerClick(clickEvent1);\n\n// Test case 2: User clicks somewhere else in the row\nconst clickEvent2 = {\n  target: { tagName: \"DIV\", dataset: {} }\n};\nhandleContainerClick(clickEvent2);\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. addEventListener",
        "desc": "Non-destructive event binding for user actions."
      },
      {
        "title": "2. Event Bubbling",
        "desc": "Events travel up from the target element to the document root."
      },
      {
        "title": "3. Event Delegation",
        "desc": "Manage dynamic lists with 1 listener on the parent."
      },
      {
        "title": "4. Next: Browser Storage & DevTools",
        "desc": "In JS-30, we persist state with localStorage and master debugging."
      }
    ],
    "nextLessonPreview": {
      "title": "JS-30: Browser Storage (localStorage) & DevTools Debugging",
      "desc": "Persist user preferences with localStorage, inspect state in DevTools, and set debugger breakpoints."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What is the primary architectural benefit of Event Delegation?",
      "options": [
        "It compiles JavaScript into C++ code.",
        "It allows a single parent event listener to handle events for hundreds of dynamic children, saving memory.",
        "It automatically prevents all network requests.",
        "It makes buttons appear larger on the screen."
      ],
      "correctIndex": 1,
      "explanation": "Event delegation leverages event bubbling to manage events for all existing and dynamically created child elements with a single listener on the parent container, conserving memory and simplifying code."
    }
  }
},

  "js30-browser-storage-and-debugging": {
  "slug": "js30-browser-storage-and-debugging",
  "code": "JS-30",
  "title": "Browser Storage (localStorage) & DevTools Debugging",
  "subtitle": "Persist user settings across page refreshes with localStorage and troubleshoot code using DevTools.",
  "sections": [
    {
      "id": "part1",
      "label": "Overview & Real-Life Analogy",
      "icon": "💡"
    },
    {
      "id": "part2",
      "label": "Core Concepts & Mechanics",
      "icon": "📖"
    },
    {
      "id": "part3",
      "label": "Mental Model & Structure",
      "icon": "🧠"
    },
    {
      "id": "part4",
      "label": "Bad Code vs Clean Code",
      "icon": "⚖️"
    },
    {
      "id": "part5",
      "label": "Interactive Code Sandbox",
      "icon": "💻"
    },
    {
      "id": "part6",
      "label": "Summary & Key Takeaways",
      "icon": "🎓"
    },
    {
      "id": "part7",
      "label": "Knowledge Check Quiz",
      "icon": "🎯"
    }
  ],
  "part1": {
    "title": "Overview & Real-Life Analogy",
    "bigPicture": "In this lesson, we master Browser Storage (localStorage) & DevTools Debugging. Think of this like A Notepad in the User's Pocket — whenever the user changes their settings, you write it on the notepad (localStorage). Even if they close the tab, turn off the computer, and return tomorrow, the notepad is still in their pocket. It provides a clear, reliable mental model for writing modern JavaScript.",
    "breakdownTitle": "Key Concepts in This Lesson:",
    "breakdownItems": [
      {
        "title": "localStorage API",
        "desc": "Key-value persistent storage that survives page refreshes and browser restarts."
      },
      {
        "title": "JSON Serialization",
        "desc": "localStorage only stores strings; use JSON.stringify() to save and JSON.parse() to load."
      },
      {
        "title": "Browser DevTools & Debugging",
        "desc": "Use console.table, debugger statements, and DevTools breakpoints to inspect live state."
      }
    ]
  },
  "part2": {
    "title": "Core Concepts & Mechanics",
    "intro": "Understanding the essential mechanics and rules of Browser Storage (localStorage) & DevTools Debugging:",
    "cards": [
      {
        "number": "01",
        "tag": "Save",
        "title": "setItem('key', str)",
        "description": "Saves a string value under a specific key name in browser storage.",
        "color": "purple"
      },
      {
        "number": "02",
        "tag": "Read",
        "title": "getItem('key')",
        "description": "Retrieves the saved string value, or null if the key does not exist.",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Diagnostics",
        "title": "debugger Statement",
        "description": "Triggers a breakpoint in browser DevTools, pausing execution for inspection.",
        "color": "amber"
      }
    ],
    "rule": {
      "title": "💡 Golden Rule",
      "content": "Never store sensitive data (passwords, JWT auth tokens with high privileges) in localStorage because it is vulnerable to XSS theft."
    }
  },
  "part3": {
    "title": "Mental Model & Structure",
    "intro": "Step-by-step breakdown of how JavaScript handles this concept internally:",
    "points": [
      {
        "title": "1. Strings Only",
        "content": "localStorage stores all data as strings. Storing an object directly stores '[object Object]'."
      },
      {
        "title": "2. Storage Capacity",
        "content": "localStorage typically allows ~5MB per origin. For larger databases, use IndexedDB."
      },
      {
        "title": "3. console.table()",
        "content": "Displays arrays of objects in a clean, sorted tabular format in DevTools."
      }
    ]
  },
  "part4": {
    "title": "Bad Code vs Clean Code",
    "bad": {
      "title": "❌ Bad: Storing raw objects in localStorage without JSON.stringify",
      "code": "const settings = { theme: \"dark\", fontSize: 16 };\n// Bug: Stores the literal string \"[object Object]\"!\nlocalStorage.setItem(\"settings\", settings);\n\nconst loaded = localStorage.getItem(\"settings\");\nconsole.log(loaded); // \"[object Object]\" (Corrupted data!)",
      "explanation": "localStorage calls toString() on values, turning objects into '[object Object]' unless serialized with JSON.stringify."
    },
    "good": {
      "title": "✅ Clean: Safe serialization and deserialization with fallbacks",
      "code": "const settings = { theme: \"dark\", fontSize: 16 };\nlocalStorage.setItem(\"settings\", JSON.stringify(settings));\n\nconst raw = localStorage.getItem(\"settings\");\nconst savedSettings = raw ? JSON.parse(raw) : { theme: \"light\" };\nconsole.log(\"Restored Theme:\", savedSettings.theme);",
      "explanation": "JSON serialization safely preserves object keys and types across page reloads."
    }
  },
  "part5": {
    "title": "Interactive Code Sandbox",
    "intro": "Experiment with Browser Storage (localStorage) & DevTools Debugging directly in the sandbox editor below:",
    "starterCode": "// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// JS-30: BROWSER STORAGE & DEBUGGING\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n// Universal Storage simulation with localStorage fallback:\nconst memoryStorage = {};\nconst storageAdapter = {\n  setItem(key, value) {\n    if (typeof localStorage !== \"undefined\") {\n      try { localStorage.setItem(key, value); return; } catch (e) {}\n    }\n    memoryStorage[key] = String(value);\n  },\n  getItem(key) {\n    if (typeof localStorage !== \"undefined\") {\n      try { return localStorage.getItem(key); } catch (e) {}\n    }\n    return memoryStorage[key] ?? null;\n  }\n};\n\n// 1. Storing complex preferences:\nconst userPreferences = {\n  theme: \"dark\",\n  accentColor: \"#8B5CF6\",\n  autoSave: true,\n  lastVisited: \"2026-10-17\"\n};\n\nstorageAdapter.setItem(\"user_pref\", JSON.stringify(userPreferences));\nconsole.log(\"💾 Saved user preferences to persistent storage!\");\n\n// 2. Retrieving and deserializing:\nconst serializedPref = storageAdapter.getItem(\"user_pref\");\nif (serializedPref) {\n  const loadedPref = JSON.parse(serializedPref);\n  console.log(\"🔄 Restored Theme:\", loadedPref.theme);\n  console.log(\"🎨 Accent Color:\", loadedPref.accentColor);\n}\n\n// 3. DevTools inspection tip:\nconsole.log(\"💡 Tip: Use 'console.table(object)' in DevTools for tabular inspection!\");\nconsole.log(\"🎉 Congratulations! You have completed all 30 JavaScript Curriculum Lessons!\");\n"
  },
  "part6": {
    "title": "Summary & Key Takeaways",
    "takeaways": [
      {
        "title": "1. Persistent Storage",
        "desc": "localStorage persists data across tab closures and restarts."
      },
      {
        "title": "2. Strings Only",
        "desc": "Always serialize objects with JSON.stringify before saving."
      },
      {
        "title": "3. DevTools Breakpoints",
        "desc": "Use debugger; and console.table for professional debugging."
      },
      {
        "title": "4. Curriculum Complete",
        "desc": "You are now ready for Module Quizzes and Interview Preparation!"
      }
    ],
    "nextLessonPreview": {
      "title": "JavaScript Interview Preparation & Capstone",
      "desc": "Prepare for frontend and full-stack technical interviews with our dedicated question bank."
    }
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What data format does `localStorage` store values in?",
      "options": [
        "Binary byte arrays",
        "Strings only (objects must be serialized with JSON.stringify)",
        "JavaScript Class instances",
        "SQL database tables"
      ],
      "correctIndex": 1,
      "explanation": "localStorage stores all keys and values strictly as strings. Storing objects requires serializing them with JSON.stringify(), and retrieving them requires JSON.parse()."
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
