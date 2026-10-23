import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js16TheThisKeywordContent: StandardLessonContent = {
  slug: "js16-the-this-keyword",
  code: "JS-16",
  title: "The this Keyword",
  subtitle: "this refers to the object that called the function: look to the left of the dot.",
  difficulty: "Difficult",
  scenario: {
    question: "A method works when called as user.greet(), but breaks after the function is stored in a separate variable and called alone. What should you check?",
    answer: "Check how the function is called. The separate call no longer has an object before the dot, so this is no longer user. Call it through the object (user.greet()) to keep this pointing to user.",
  },
  interviewQuestion: {
    question: "How does this behave in an arrow function compared with a normal function?",
    answer: "A normal function's this depends on who called it (the object before the dot). An arrow function does not create its own this; it borrows this from the surrounding code.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "The this Keyword",
    bigPicture: "Think of 'this' like the word 'me' or 'myself'. Inside an object method, 'this' refers to the object that called it. When you see user.greet(), look to the left of the dot: user called the method, so 'this' means user.",
    codeSnippet: `const user = {
  name: "Rina",
  hobbies: ["Coding", "Reading"],
  greet() {
    return \`Hello, my name is \${this.name}\`;
  },
  showHobbies() {
    // Arrow function keeps 'this' pointing to user!
    this.hobbies.forEach((hobby) => {
      console.log(\`\${this.name} likes \${hobby}\`);
    });
  }
};

console.log(user.greet());
user.showHobbies();`,
    breakdownTitle: "The Simple Rules for this",
    breakdownItems: [
      {
        title: "1. Look Before the Dot",
        desc: "In user.greet(), look to the left of the dot: user is calling it, so this is user.",
      },
      {
        title: "2. Called Alone (No Dot)",
        desc: "If you call a function alone like greet(), there is no dot, so this becomes undefined.",
      },
      {
        title: "3. Arrow Function Use Case",
        desc: "Callbacks inside methods (like forEach or setTimeout) lose 'this' if you use a normal function. Arrow functions fix this by keeping the object's 'this'!",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Left-of-the-Dot Rule",
      content: "To know what 'this' means, look to the left of the dot when calling the function: object.method() means this is object. Use arrow functions inside callbacks to keep this intact.",
    },
    cards: [
      {
        number: "01",
        tag: "THE MAIN RULE",
        title: "Look Before the Dot",
        description: "In user.greet(), user is before the dot. That means inside greet(), this refers to user.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CALLED ALONE",
        title: "No Dot = Lost this",
        description: "If you copy the function to a variable and call it alone with no dot, this becomes undefined.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "CALLBACK USE CASE",
        title: "Arrow Functions in Callbacks",
        description: "Inside loops and timers, arrow functions keep the outer object's 'this' so you don't lose it.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about 'this' in everyday code:",
    points: [
      {
        title: "1. The Object's 'Myself'",
        content: "Inside user.greet(), writing this.name is the object's way of reading its own name property.",
      },
      {
        title: "2. Who is before the dot changes this",
        content: "If you attach the same function to another object like admin.greet(), admin is now before the dot, so this becomes admin.",
      },
      {
        title: "3. The Big Use Case for Arrow Functions",
        content: "When passing a callback inside a method (like forEach or setTimeout), a normal function creates its own new 'this' (which is undefined). An arrow function doesn't create its own this, so it safely keeps the object's this intact!",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Losing this in a Callback",
      code: `const user = {\n  name: "Rina",\n  hobbies: ["Coding"],\n  show() {\n    // ❌ Normal function inside forEach loses 'this':\n    this.hobbies.forEach(function(hobby) {\n      // console.log(this.name); // TypeError: Cannot read property 'name' of undefined\n    });\n  }\n};`,
      explanation: "A normal function inside forEach gets called without an object before the dot, so this becomes undefined.",
    },
    good: {
      title: "Arrow Function Keeps this",
      code: `const user = {\n  name: "Rina",\n  hobbies: ["Coding"],\n  show() {\n    // ✅ Arrow function inherits 'this' from show():\n    this.hobbies.forEach((hobby) => {\n      console.log(\`\${this.name} likes \${hobby}\`); // "Rina likes Coding"\n    });\n  }\n};\nuser.show();`,
      explanation: "Arrow functions do not create their own this, so this remains the user object.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "See how arrow functions preserve 'this' inside callbacks:",
    starterCode: `// JS-16: The this Keyword & Arrow Function Use Case
const user = {
  name: "Rina",
  hobbies: ["Coding", "Reading", "Chess"],
  
  // 1. Regular method: 'this' is user (look before the dot)
  greet() {
    return \`Hello, I am \${this.name}\`;
  },

  // 2. Arrow function use case: keeps 'this' inside forEach callback!
  showHobbies() {
    this.hobbies.forEach((hobby) => {
      console.log(\`\${this.name} loves \${hobby}\`);
    });
  }
};

console.log(user.greet());
user.showHobbies();`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why do developers use arrow functions inside callbacks (like forEach or setTimeout) inside an object method?",
      options: [
        "Because arrow functions do not create their own this, keeping the outer object's this intact",
        "Because arrow functions run 10x faster than normal functions",
        "Because normal functions cannot be used as callbacks",
        "Because arrow functions always reset this to the global object",
      ],
      correctIndex: 0,
      explanation: "Arrow functions do not bind their own this. They inherit this from the enclosing method, preventing this from becoming undefined inside callbacks.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Left of the Dot",
        desc: "In object.method(), this is the object before the dot.",
      },
      {
        title: "No Dot = undefined",
        desc: "Calling a normal function alone loses its object context.",
      },
      {
        title: "Arrow Function Use Case",
        desc: "Use arrow functions inside callbacks (forEach, setTimeout) so you never lose the object's this.",
      },
    ],
    nextLessonPreview: {
      title: "Errors and Debugging",
      desc: "Learn how to find and handle runtime errors cleanly with try/catch.",
    },
  },
};
