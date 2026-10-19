const fs = require('fs');

const filePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Applying targeted curriculum enhancements...');

// 1. JS-02: Fix Part 3 content to actually teach the 7 primitive types
const oldJs02Part3 = `"part3": {
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

const newJs02Part3 = `"part3": {
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

if (content.includes(oldJs02Part3)) {
  content = content.replace(oldJs02Part3, newJs02Part3);
  console.log('✓ Updated JS-02 Part 3 (7 Primitive Types)');
} else {
  console.log('⚠️ Could not match old JS-02 Part 3 directly; checking regex');
}

// 2. JS-03: Fix Part 3 points to genuinely focus on Truthy and Falsy values
const oldJs03Part3 = `"part3": {
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

const newJs03Part3 = `"part3": {
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

if (content.includes(oldJs03Part3)) {
  content = content.replace(oldJs03Part3, newJs03Part3);
  console.log('✓ Updated JS-03 Part 3 (Truthy & Falsy)');
}

// 3. JS-04: Update Part 3 title & points and include in sections array
const oldJs04Part3 = `"part3": {
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

const newJs04Part3 = `"part3": {
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

if (content.includes(oldJs04Part3)) {
  content = content.replace(oldJs04Part3, newJs04Part3);
  console.log('✓ Updated JS-04 Part 3 (Decision Structures)');
}

// Update JS-04 sections to include part3
const oldJs04Sections = `"js04-conditional-logic": {
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
            "id": "part4",
            "label": "Missing break Traps",
            "icon": "⚠️",
            "tag": "TRAPS"
        },`;

const newJs04Sections = `"js04-conditional-logic": {
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
            "id": "part4",
            "label": "Missing break Traps",
            "icon": "⚠️",
            "tag": "TRAPS"
        },`;

if (content.includes(oldJs04Sections)) {
  content = content.replace(oldJs04Sections, newJs04Sections);
  console.log('✓ Added part3 to JS-04 sections array');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Enhancements saved successfully.');
