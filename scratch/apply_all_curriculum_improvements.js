const fs = require('fs');

const filePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let raw = fs.readFileSync(filePath, 'utf8');

// Normalize to LF for easy reliable replacements
const isCRLF = raw.includes('\r\n');
let content = raw.replace(/\r\n/g, '\n');

console.log('=== APPLYING CURRICULUM IMPROVEMENTS ===');

// 1. JS-02: Fix Part 3 points to teach the 7 primitive types
const js02Part3Old = `  "part3": {
    "title": "JavaScript's 7 Primitive Data Types",
    "intro": "The fundamental building blocks stored directly by value:",
    "points": [
      {
        "title": "1. Block Scoping",
        "content": "1. Curly Braces Keep Secrets: Variables created inside { } stay inside those braces. They cannot leak out into other parts of your code."
      },
      {
        "title": "2. Reading Before Creating",
        "content": "2. Create Before You Use: You must declare a variable before you try to read it. If you try to use it too early, JavaScript stops with an error."
      },
      {
        "title": "3. typeof Operator",
        "content": "3. Ask JavaScript for the Type: You can check what kind of data something is by writing typeof value (for example, typeof 'cat' returns 'string')."
      }
    ]
  },`;

const js02Part3New = `  "part3": {
    "title": "JavaScript's 7 Primitive Data Types",
    "intro": "The fundamental building blocks stored directly by value:",
    "points": [
      {
        "title": "1. Strings, Numbers & Booleans",
        "content": "Text inside quotes like 'LearnCraft' is a string. Numeric values like 42 or 3.14 are numbers. True or false switches (true / false) are booleans."
      },
      {
        "title": "2. null vs undefined",
        "content": "undefined means a variable was created but no value has been put in it yet. null is an intentional empty value that you assign on purpose."
      },
      {
        "title": "3. BigInt, Symbol & typeof",
        "content": "BigInt holds integers larger than normal numbers can handle. Symbol creates a guaranteed unique identifier. Use typeof (like typeof 'cat') to check any variable's type."
      }
    ]
  },`;

if (content.includes(js02Part3Old)) {
  content = content.replace(js02Part3Old, js02Part3New);
  console.log('✓ JS-02: Updated Part 3 with actual 7 primitive types');
} else {
  console.log('⚠️ JS-02 Part 3 target content not found');
}

// 2. JS-03: Fix Part 3 points to focus on Truthy and Falsy values
const js03Part3Old = `  "part3": {
    "title": "Understanding Truthy and Falsy Values",
    "intro": "How JavaScript evaluates any value in boolean expressions:",
    "points": [
      {
        "title": "1. Strict vs Loose",
        "content": "1. Double Equals Tries to Guess: Double equals (==) tries to convert different types automatically, which leads to strange and confusing surprises."
      },
      {
        "title": "2. Short-Circuiting",
        "content": "2. Quick Checks: JavaScript checks conditions from left to right and stops as soon as it knows the final answer."
      },
      {
        "title": "3. Truthiness",
        "content": "3. What Counts as False: In an if statement, almost everything is considered true except these 6 falsy values: false, 0, an empty string '', null, undefined, and NaN."
      }
    ]
  },`;

const js03Part3New = `  "part3": {
    "title": "Understanding Truthy and Falsy Values",
    "intro": "How JavaScript evaluates any value in boolean expressions:",
    "points": [
      {
        "title": "1. What Is Truthy and Falsy?",
        "content": "In JavaScript, any value can be used inside an if condition. Values that count as true are called truthy. Values that count as false are called falsy."
      },
      {
        "title": "2. The 6 Falsy Values",
        "content": "Only 6 values in JavaScript are falsy: false, 0, empty text '', null, undefined, and NaN. Every other value is truthy, including empty arrays [] and empty objects {}."
      },
      {
        "title": "3. Safe Boolean Conversion",
        "content": "You can turn any value into a real true or false boolean by passing it to Boolean(value) or writing double exclamation marks !!value."
      }
    ]
  },`;

if (content.includes(js03Part3Old)) {
  content = content.replace(js03Part3Old, js03Part3New);
  console.log('✓ JS-03: Updated Part 3 with Truthy & Falsy concepts');
} else {
  console.log('⚠️ JS-03 Part 3 target content not found');
}

// 3. JS-04: Update Part 3 title & points and add to sections array
const js04Part3Old = `  "part3": {
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
  },`;

const js04Part3New = `  "part3": {
    "title": "How Decision Structures Evaluate Code",
    "intro": "Step-by-step breakdown of how JavaScript tests and branches through conditions:",
    "points": [
      {
        "title": "1. Top-Down Evaluation",
        "content": "JavaScript tests conditions in order from top to bottom. As soon as it finds a true condition, it runs that code block and skips all remaining else if blocks."
      },
      {
        "title": "2. Guard Clauses & Early Returns",
        "content": "Instead of nesting if statements inside other if statements, check for invalid or special cases first and return immediately. This keeps your main code flat and readable."
      },
      {
        "title": "3. The switch Statement & break",
        "content": "When checking one value against several exact matches, switch is cleaner than many if...else if lines. Always include 'break' so execution does not accidentally bleed into the next case."
      }
    ]
  },`;

if (content.includes(js04Part3Old)) {
  content = content.replace(js04Part3Old, js04Part3New);
  console.log('✓ JS-04: Updated Part 3 title and points');
}

// JS-04: Add part3 to sections array if not present
const js04SecOld = `  "js04-conditional-logic": {
  "slug": "js04-conditional-logic",
  "code": "JS-04",
  "title": "Conditional Logic: Decision Making with if/else & switch",
  "subtitle": "Control code execution paths using if/else statements, ternaries, and switch cases.",
  "sections": [
        {
            "id": "part1",
            "label": "Why Decisions Matter",
            "icon": "🚦",
            "tag": "LOGIC"
        },
        {
            "id": "part2",
            "label": "Branching Syntax",
            "icon": "🔀",
            "tag": "CONDITIONS"
        },
        {
            "id": "part4",`;

const js04SecNew = `  "js04-conditional-logic": {
  "slug": "js04-conditional-logic",
  "code": "JS-04",
  "title": "Conditional Logic: Decision Making with if/else & switch",
  "subtitle": "Control code execution paths using if/else statements, ternaries, and switch cases.",
  "sections": [
        {
            "id": "part1",
            "label": "Why Decisions Matter",
            "icon": "🚦",
            "tag": "LOGIC"
        },
        {
            "id": "part2",
            "label": "Branching Syntax",
            "icon": "🔀",
            "tag": "CONDITIONS"
        },
        {
            "id": "part3",
            "label": "Evaluation & Guard Clauses",
            "icon": "🛡️",
            "tag": "FLOW"
        },
        {
            "id": "part4",`;

if (content.includes(js04SecOld)) {
  content = content.replace(js04SecOld, js04SecNew);
  console.log('✓ JS-04: Added part3 to sections array');
}

// 4. JS-06: Functions - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Missing return statement`,
  `  "part4": {\n    "title": "Common Mistake: Forgetting to Return a Value",\n    "bad": {\n      "title": "❌ Bad: Missing return statement`
);

const js06SecOld = `  "js06-functions-and-arrow-syntax": {
  "slug": "js06-functions-and-arrow-syntax",
  "code": "JS-06",
  "title": "Functions: Parameters, Return Values & Arrow Syntax",
  "subtitle": "Write reusable functions: pass inputs in, perform operations, and return results.",
  "sections": [
        {
            "id": "part1",
            "label": "Packaging Logic",
            "icon": "📦",
            "tag": "REUSABILITY"
        },
        {
            "id": "part2",
            "label": "Parameters & Returns",
            "icon": "📥",
            "tag": "SYNTAX"
        },
        {
            "id": "part3",
            "label": "Arrow Functions",
            "icon": "🏹",
            "tag": "ARROWS"
        },
        {
            "id": "part5",`;

const js06SecNew = `  "js06-functions-and-arrow-syntax": {
  "slug": "js06-functions-and-arrow-syntax",
  "code": "JS-06",
  "title": "Functions: Parameters, Return Values & Arrow Syntax",
  "subtitle": "Write reusable functions: pass inputs in, perform operations, and return results.",
  "sections": [
        {
            "id": "part1",
            "label": "Packaging Logic",
            "icon": "📦",
            "tag": "REUSABILITY"
        },
        {
            "id": "part2",
            "label": "Parameters & Returns",
            "icon": "📥",
            "tag": "SYNTAX"
        },
        {
            "id": "part3",
            "label": "Arrow Functions",
            "icon": "🏹",
            "tag": "ARROWS"
        },
        {
            "id": "part4",
            "label": "Missing return Trap",
            "icon": "⚠️",
            "tag": "PITFALL"
        },
        {
            "id": "part5",`;

if (content.includes(js06SecOld)) {
  content = content.replace(js06SecOld, js06SecNew);
  console.log('✓ JS-06: Added part4 to sections and updated title');
}

// 5. JS-09: Callbacks - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Duplicating entire functions`,
  `  "part4": {\n    "title": "Clean Code: Reusable Callbacks vs Duplicated Functions",\n    "bad": {\n      "title": "❌ Bad: Duplicating entire functions`
);

const js09SecOld = `  "js09-callbacks-and-higher-order-functions": {
  "slug": "js09-callbacks-and-higher-order-functions",
  "code": "JS-09",
  "title": "Callbacks & Higher-Order Functions: Functions as Data",
  "subtitle": "Treat functions as values: pass functions as arguments and return functions from functions.",
  "sections": [
        {
            "id": "part1",
            "label": "Functions as Values",
            "icon": "🎟️",
            "tag": "DATA"
        },
        {
            "id": "part2",
            "label": "Passing Callbacks",
            "icon": "📞",
            "tag": "CALLBACKS"
        },
        {
            "id": "part3",
            "label": "Higher-Order Functions",
            "icon": "🏭",
            "tag": "FACTORIES"
        },
        {
            "id": "part5",`;

const js09SecNew = `  "js09-callbacks-and-higher-order-functions": {
  "slug": "js09-callbacks-and-higher-order-functions",
  "code": "JS-09",
  "title": "Callbacks & Higher-Order Functions: Functions as Data",
  "subtitle": "Treat functions as values: pass functions as arguments and return functions from functions.",
  "sections": [
        {
            "id": "part1",
            "label": "Functions as Values",
            "icon": "🎟️",
            "tag": "DATA"
        },
        {
            "id": "part2",
            "label": "Passing Callbacks",
            "icon": "📞",
            "tag": "CALLBACKS"
        },
        {
            "id": "part3",
            "label": "Higher-Order Functions",
            "icon": "🏭",
            "tag": "FACTORIES"
        },
        {
            "id": "part4",
            "label": "Reusable Callbacks",
            "icon": "⚡",
            "tag": "CLEAN CODE"
        },
        {
            "id": "part5",`;

if (content.includes(js09SecOld)) {
  content = content.replace(js09SecOld, js09SecNew);
  console.log('✓ JS-09: Added part4 to sections and updated title');
}

// 6. JS-10: Arrays - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Off-by-one bug when reading the last element`,
  `  "part4": {\n    "title": "Common Mistake: Off-by-One Array Indexing",\n    "bad": {\n      "title": "❌ Bad: Off-by-one bug when reading the last element`
);

const js10SecOld = `  "js10-arrays-and-indexing": {
  "slug": "js10-arrays-and-indexing",
  "code": "JS-10",
  "title": "Arrays & Indexing: Managing Ordered Lists",
  "subtitle": "Store ordered collections, access elements with zero-based indices, and update lists.",
  "sections": [
        {
            "id": "part1",
            "label": "Ordered Lists",
            "icon": "📋",
            "tag": "STRUCTURE"
        },
        {
            "id": "part2",
            "label": "Zero-Based Indices",
            "icon": "🔢",
            "tag": "INDEXING"
        },
        {
            "id": "part3",
            "label": "Safe Array Slicing",
            "icon": "✂️",
            "tag": "MUTABILITY"
        },
        {
            "id": "part5",`;

const js10SecNew = `  "js10-arrays-and-indexing": {
  "slug": "js10-arrays-and-indexing",
  "code": "JS-10",
  "title": "Arrays & Indexing: Managing Ordered Lists",
  "subtitle": "Store ordered collections, access elements with zero-based indices, and update lists.",
  "sections": [
        {
            "id": "part1",
            "label": "Ordered Lists",
            "icon": "📋",
            "tag": "STRUCTURE"
        },
        {
            "id": "part2",
            "label": "Zero-Based Indices",
            "icon": "🔢",
            "tag": "INDEXING"
        },
        {
            "id": "part3",
            "label": "Safe Array Slicing",
            "icon": "✂️",
            "tag": "MUTABILITY"
        },
        {
            "id": "part4",
            "label": "Off-by-One Traps",
            "icon": "⚠️",
            "tag": "PITFALL"
        },
        {
            "id": "part5",`;

if (content.includes(js10SecOld)) {
  content = content.replace(js10SecOld, js10SecNew);
  console.log('✓ JS-10: Added part4 to sections and updated title');
}

// 7. JS-11: Array Methods - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Long manual loops that change variables directly`,
  `  "part4": {\n    "title": "Clean Code: Method Chaining vs Manual Loops",\n    "bad": {\n      "title": "❌ Bad: Long manual loops that change variables directly`
);

const js11SecOld = `  "js11-essential-array-methods": {
  "slug": "js11-essential-array-methods",
  "code": "JS-11",
  "title": "Essential Array Methods: map, filter, find & reduce",
  "subtitle": "Transform, filter, search, and aggregate data pipelines cleanly with array iteration methods.",
  "sections": [
        {
            "id": "part1",
            "label": "Transforming Data",
            "icon": "🔄",
            "tag": "TRANSFORMATION"
        },
        {
            "id": "part2",
            "label": "The Big Four Methods",
            "icon": "⚡",
            "tag": "PIPELINES"
        },
        {
            "id": "part3",
            "label": "Chaining Methods",
            "icon": "🔗",
            "tag": "CHAINING"
        },
        {
            "id": "part5",`;

const js11SecNew = `  "js11-essential-array-methods": {
  "slug": "js11-essential-array-methods",
  "code": "JS-11",
  "title": "Essential Array Methods: map, filter, find & reduce",
  "subtitle": "Transform, filter, search, and aggregate data pipelines cleanly with array iteration methods.",
  "sections": [
        {
            "id": "part1",
            "label": "Transforming Data",
            "icon": "🔄",
            "tag": "TRANSFORMATION"
        },
        {
            "id": "part2",
            "label": "The Big Four Methods",
            "icon": "⚡",
            "tag": "PIPELINES"
        },
        {
            "id": "part3",
            "label": "Chaining Methods",
            "icon": "🔗",
            "tag": "CHAINING"
        },
        {
            "id": "part4",
            "label": "Chaining Pipelines",
            "icon": "✨",
            "tag": "PATTERNS"
        },
        {
            "id": "part5",`;

if (content.includes(js11SecOld)) {
  content = content.replace(js11SecOld, js11SecNew);
  console.log('✓ JS-11: Added part4 to sections and updated title');
}

// 8. JS-12: Objects - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Using dot notation with dynamic variable keys`,
  `  "part4": {\n    "title": "Common Mistake: Dot Notation with Dynamic Variable Keys",\n    "bad": {\n      "title": "❌ Bad: Using dot notation with dynamic variable keys`
);

const js12SecOld = `  "js12-objects-and-methods": {
  "slug": "js12-objects-and-methods",
  "code": "JS-12",
  "title": "Objects: Key-Value Pairs, Methods & Property Access",
  "subtitle": "Structure real-world data with object properties, access dynamic keys, and define object methods.",
  "sections": [
        {
            "id": "part1",
            "label": "Key-Value Models",
            "icon": "🗄️",
            "tag": "STRUCTURE"
        },
        {
            "id": "part2",
            "label": "Dot vs Bracket Access",
            "icon": "🏷️",
            "tag": "ACCESS"
        },
        {
            "id": "part3",
            "label": "Methods & Keys",
            "icon": "⚙️",
            "tag": "METHODS"
        },
        {
            "id": "part5",`;

const js12SecNew = `  "js12-objects-and-methods": {
  "slug": "js12-objects-and-methods",
  "code": "JS-12",
  "title": "Objects: Key-Value Pairs, Methods & Property Access",
  "subtitle": "Structure real-world data with object properties, access dynamic keys, and define object methods.",
  "sections": [
        {
            "id": "part1",
            "label": "Key-Value Models",
            "icon": "🗄️",
            "tag": "STRUCTURE"
        },
        {
            "id": "part2",
            "label": "Dot vs Bracket Access",
            "icon": "🏷️",
            "tag": "ACCESS"
        },
        {
            "id": "part3",
            "label": "Methods & Keys",
            "icon": "⚙️",
            "tag": "METHODS"
        },
        {
            "id": "part4",
            "label": "Dynamic Key Traps",
            "icon": "🔑",
            "tag": "PITFALL"
        },
        {
            "id": "part5",`;

if (content.includes(js12SecOld)) {
  content = content.replace(js12SecOld, js12SecNew);
  console.log('✓ JS-12: Added part4 to sections and updated title');
}

// 9. JS-14: Destructuring - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Repetitive property access with long chains`,
  `  "part4": {\n    "title": "Clean Code: Parameter Destructuring with Defaults",\n    "bad": {\n      "title": "❌ Bad: Repetitive property access with long chains`
);

const js14SecOld = `  "js14-destructuring": {
  "slug": "js14-destructuring",
  "code": "JS-14",
  "title": "Destructuring: Unpacking Objects & Arrays with Ease",
  "subtitle": "Unpack properties and items into clean local variables with default values and renaming.",
  "sections": [
        {
            "id": "part1",
            "label": "Unpacking Values",
            "icon": "📦",
            "tag": "SYNTAX"
        },
        {
            "id": "part2",
            "label": "Object Destructuring",
            "icon": "🏷️",
            "tag": "OBJECTS"
        },
        {
            "id": "part3",
            "label": "Array Destructuring",
            "icon": "📋",
            "tag": "ARRAYS"
        },
        {
            "id": "part5",`;

const js14SecNew = `  "js14-destructuring": {
  "slug": "js14-destructuring",
  "code": "JS-14",
  "title": "Destructuring: Unpacking Objects & Arrays with Ease",
  "subtitle": "Unpack properties and items into clean local variables with default values and renaming.",
  "sections": [
        {
            "id": "part1",
            "label": "Unpacking Values",
            "icon": "📦",
            "tag": "SYNTAX"
        },
        {
            "id": "part2",
            "label": "Object Destructuring",
            "icon": "🏷️",
            "tag": "OBJECTS"
        },
        {
            "id": "part3",
            "label": "Array Destructuring",
            "icon": "📋",
            "tag": "ARRAYS"
        },
        {
            "id": "part4",
            "label": "Clean Destructuring",
            "icon": "📦",
            "tag": "CLEAN CODE"
        },
        {
            "id": "part5",`;

if (content.includes(js14SecOld)) {
  content = content.replace(js14SecOld, js14SecNew);
  console.log('✓ JS-14: Added part4 to sections and updated title');
}

// 10. JS-15: Spread & Rest - Rename Part 4 title (keep at 6 sections for layout variety)
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Using legacy arguments object`,
  `  "part4": {\n    "title": "Rest Parameters vs Legacy arguments Object",\n    "bad": {\n      "title": "❌ Bad: Using legacy arguments object`
);

// 11. JS-16: Optional Chaining - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Using || for numeric defaults`,
  `  "part4": {\n    "title": "Common Mistake: Using || When ?? Is Needed",\n    "bad": {\n      "title": "❌ Bad: Using || for numeric defaults`
);

const js16SecOld = `  "js16-optional-chaining-and-nullish-coalescing": {
  "slug": "js16-optional-chaining-and-nullish-coalescing",
  "code": "JS-16",
  "title": "Optional Chaining (?.) & Nullish Coalescing (??)",
  "subtitle": "Prevent runtime crashes when accessing deep properties and provide reliable default values.",
  "sections": [
        {
            "id": "part1",
            "label": "Defensive Access",
            "icon": "🛡️",
            "tag": "SAFETY"
        },
        {
            "id": "part2",
            "label": "Optional Chaining",
            "icon": "❓",
            "tag": "SYNTAX"
        },
        {
            "id": "part3",
            "label": "Nullish Coalescing",
            "icon": "✨",
            "tag": "DEFAULTS"
        },
        {
            "id": "part5",`;

const js16SecNew = `  "js16-optional-chaining-and-nullish-coalescing": {
  "slug": "js16-optional-chaining-and-nullish-coalescing",
  "code": "JS-16",
  "title": "Optional Chaining (?.) & Nullish Coalescing (??)",
  "subtitle": "Prevent runtime crashes when accessing deep properties and provide reliable default values.",
  "sections": [
        {
            "id": "part1",
            "label": "Defensive Access",
            "icon": "🛡️",
            "tag": "SAFETY"
        },
        {
            "id": "part2",
            "label": "Optional Chaining",
            "icon": "❓",
            "tag": "SYNTAX"
        },
        {
            "id": "part3",
            "label": "Nullish Coalescing",
            "icon": "✨",
            "tag": "DEFAULTS"
        },
        {
            "id": "part4",
            "label": "Nullish ?? vs OR ||",
            "icon": "🛡️",
            "tag": "PITFALL"
        },
        {
            "id": "part5",`;

if (content.includes(js16SecOld)) {
  content = content.replace(js16SecOld, js16SecNew);
  console.log('✓ JS-16: Added part4 to sections and updated title');
}

// 12. JS-19: Classes - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Accessing this before calling super()`,
  `  "part4": {\n    "title": "Common Mistake: Accessing this Before super() in Subclasses",\n    "bad": {\n      "title": "❌ Bad: Accessing this before calling super()`
);

const js19SecOld = `  "js19-classes-extends-and-super": {
  "slug": "js19-classes-extends-and-super",
  "code": "JS-19",
  "title": "Classes, Constructors, extends & super",
  "subtitle": "Build object blueprints using ES6 class syntax, constructors, inheritance, and method overriding.",
  "sections": [
        {
            "id": "part1",
            "label": "Class Blueprints",
            "icon": "🏛️",
            "tag": "OOP"
        },
        {
            "id": "part2",
            "label": "Constructors & Methods",
            "icon": "🏗️",
            "tag": "METHODS"
        },
        {
            "id": "part3",
            "label": "Inheritance with super",
            "icon": "🧬",
            "tag": "INHERITANCE"
        },
        {
            "id": "part5",`;

const js19SecNew = `  "js19-classes-extends-and-super": {
  "slug": "js19-classes-extends-and-super",
  "code": "JS-19",
  "title": "Classes, Constructors, extends & super",
  "subtitle": "Build object blueprints using ES6 class syntax, constructors, inheritance, and method overriding.",
  "sections": [
        {
            "id": "part1",
            "label": "Class Blueprints",
            "icon": "🏛️",
            "tag": "OOP"
        },
        {
            "id": "part2",
            "label": "Constructors & Methods",
            "icon": "🏗️",
            "tag": "METHODS"
        },
        {
            "id": "part3",
            "label": "Inheritance with super",
            "icon": "🧬",
            "tag": "INHERITANCE"
        },
        {
            "id": "part4",
            "label": "The super() Rule",
            "icon": "🏗️",
            "tag": "PITFALL"
        },
        {
            "id": "part5",`;

if (content.includes(js19SecOld)) {
  content = content.replace(js19SecOld, js19SecNew);
  console.log('✓ JS-19: Added part4 to sections and updated title');
}

// 13. JS-25: ES Modules - Rename Part 4 title (keep at 6 sections for layout variety)
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Putting everything in one giant 5,000-line global file`,
  `  "part4": {\n    "title": "Modular Organization vs Giant Monolithic Files",\n    "bad": {\n      "title": "❌ Bad: Putting everything in one giant 5,000-line global file`
);

// 14. JS-26: JSON - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Calling JSON.parse without try/catch`,
  `  "part4": {\n    "title": "Common Mistake: Calling JSON.parse() Without Safe Fallbacks",\n    "bad": {\n      "title": "❌ Bad: Calling JSON.parse without try/catch`
);

const js26SecOld = `  "js26-working-with-json": {
  "slug": "js26-working-with-json",
  "code": "JS-26",
  "title": "Working with JSON: Parsing and Serializing Data",
  "subtitle": "Serialize JavaScript objects with JSON.stringify and deserialize API strings with JSON.parse.",
  "sections": [
        {
            "id": "part1",
            "label": "Universal Data",
            "icon": "📜",
            "tag": "FORMAT"
        },
        {
            "id": "part2",
            "label": "Stringify & Parse",
            "icon": "🔄",
            "tag": "SERIALIZATION"
        },
        {
            "id": "part3",
            "label": "Safe Parsing",
            "icon": "🛡️",
            "tag": "SAFETY"
        },
        {
            "id": "part5",`;

const js26SecNew = `  "js26-working-with-json": {
  "slug": "js26-working-with-json",
  "code": "JS-26",
  "title": "Working with JSON: Parsing and Serializing Data",
  "subtitle": "Serialize JavaScript objects with JSON.stringify and deserialize API strings with JSON.parse.",
  "sections": [
        {
            "id": "part1",
            "label": "Universal Data",
            "icon": "📜",
            "tag": "FORMAT"
        },
        {
            "id": "part2",
            "label": "Stringify & Parse",
            "icon": "🔄",
            "tag": "SERIALIZATION"
        },
        {
            "id": "part3",
            "label": "Safe Parsing",
            "icon": "🛡️",
            "tag": "SAFETY"
        },
        {
            "id": "part4",
            "label": "Safe JSON Parsing",
            "icon": "🛡️",
            "tag": "DEFENSIVE"
        },
        {
            "id": "part5",`;

if (content.includes(js26SecOld)) {
  content = content.replace(js26SecOld, js26SecNew);
  console.log('✓ JS-26: Added part4 to sections and updated title');
}

// 15. JS-27: Fetch API - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Assuming fetch throws errors on 404`,
  `  "part4": {\n    "title": "Common Mistake: Assuming fetch() Rejects on 404 or 500",\n    "bad": {\n      "title": "❌ Bad: Assuming fetch throws errors on 404`
);

const js27SecOld = `  "js27-the-fetch-api": {
  "slug": "js27-the-fetch-api",
  "code": "JS-27",
  "title": "The Fetch API: Communicating with REST APIs",
  "subtitle": "Send HTTP GET and POST requests, unwrap JSON responses, and handle HTTP errors gracefully.",
  "sections": [
        {
            "id": "part1",
            "label": "HTTP Requests",
            "icon": "🌐",
            "tag": "NETWORKING"
        },
        {
            "id": "part2",
            "label": "GET & POST Syntax",
            "icon": "📡",
            "tag": "FETCH"
        },
        {
            "id": "part3",
            "label": "Response Headers",
            "icon": "📋",
            "tag": "HEADERS"
        },
        {
            "id": "part5",`;

const js27SecNew = `  "js27-the-fetch-api": {
  "slug": "js27-the-fetch-api",
  "code": "JS-27",
  "title": "The Fetch API: Communicating with REST APIs",
  "subtitle": "Send HTTP GET and POST requests, unwrap JSON responses, and handle HTTP errors gracefully.",
  "sections": [
        {
            "id": "part1",
            "label": "HTTP Requests",
            "icon": "🌐",
            "tag": "NETWORKING"
        },
        {
            "id": "part2",
            "label": "GET & POST Syntax",
            "icon": "📡",
            "tag": "FETCH"
        },
        {
            "id": "part3",
            "label": "Response Headers",
            "icon": "📋",
            "tag": "HEADERS"
        },
        {
            "id": "part4",
            "label": "The res.ok Guard",
            "icon": "🌐",
            "tag": "FETCH GUARD"
        },
        {
            "id": "part5",`;

if (content.includes(js27SecOld)) {
  content = content.replace(js27SecOld, js27SecNew);
  console.log('✓ JS-27: Added part4 to sections and updated title');
}

// 16. JS-29: Events & Delegation - Rename Part 4 title and add to sections
content = content.replace(
  `  "part4": {\n    "title": "Bad Code vs Clean Code",\n    "bad": {\n      "title": "❌ Bad: Attaching individual listeners to hundreds of list items`,
  `  "part4": {\n    "title": "Performance Pattern: Event Delegation on Dynamic Lists",\n    "bad": {\n      "title": "❌ Bad: Attaching individual listeners to hundreds of list items`
);

const js29SecOld = `  "js29-events-and-delegation": {
  "slug": "js29-events-and-delegation",
  "code": "JS-29",
  "title": "Events, Event Listeners & Event Delegation",
  "subtitle": "Handle user clicks, form submissions, and keyboard inputs with listeners and event delegation.",
  "sections": [
        {
            "id": "part1",
            "label": "User Interactions",
            "icon": "🖱️",
            "tag": "EVENTS"
        },
        {
            "id": "part2",
            "label": "Bubbling & Target",
            "icon": "🫧",
            "tag": "BUBBLING"
        },
        {
            "id": "part3",
            "label": "Event Delegation",
            "icon": "⚡",
            "tag": "DELEGATION"
        },
        {
            "id": "part5",`;

const js29SecNew = `  "js29-events-and-delegation": {
  "slug": "js29-events-and-delegation",
  "code": "JS-29",
  "title": "Events, Event Listeners & Event Delegation",
  "subtitle": "Handle user clicks, form submissions, and keyboard inputs with listeners and event delegation.",
  "sections": [
        {
            "id": "part1",
            "label": "User Interactions",
            "icon": "🖱️",
            "tag": "EVENTS"
        },
        {
            "id": "part2",
            "label": "Bubbling & Target",
            "icon": "🫧",
            "tag": "BUBBLING"
        },
        {
            "id": "part3",
            "label": "Event Delegation",
            "icon": "⚡",
            "tag": "DELEGATION"
        },
        {
            "id": "part4",
            "label": "Event Delegation Pattern",
            "icon": "⚡",
            "tag": "PERFORMANCE"
        },
        {
            "id": "part5",`;

if (content.includes(js29SecOld)) {
  content = content.replace(js29SecOld, js29SecNew);
  console.log('✓ JS-29: Added part4 to sections and updated title');
}

// Convert back to original line endings if needed
if (isCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('=== ALL IMPROVEMENTS COMMITTED SUCCESSFULLY ===');
