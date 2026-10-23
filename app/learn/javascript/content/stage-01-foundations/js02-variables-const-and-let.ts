import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js02VariablesConstAndLetContent: StandardLessonContent = {
  slug: "js02-variables-const-and-let",
  code: "JS-02",
  title: "Variables: const and let",
  subtitle: "Store and name values using const by default and let when reassignment is needed.",
  difficulty: "Easy",
  scenario: {
    question: "A shopping cart starts with a total of 0, and the total changes whenever the user adds an item. Which declaration fits the total?",
    answer: "Use let total = 0, because the total must be reassigned as items are added. A name that does not need reassignment can usually use const.",
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
    title: "Variables: const and let",
    bigPicture: "Variables give names to values. Use const when you will not reassign the variable. Use let when you need to assign it a different value later.",
    codeSnippet: "const userName = \"Rina\";\nlet score = 0;\n\nscore = score + 10;\nconsole.log(userName, score);\n// Rina 10",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "const",
            "desc": "Prevents variable reassignment. Makes code predictable and easy to reason about."
      },
      {
            "title": "let",
            "desc": "Allows reassignment when a counter, accumulator, or state flag must change over time."
      },
      {
            "title": "Object Mutation",
            "desc": "const prevents reassigning the variable identifier, but object properties inside it can still change."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Declaration Rule",
      content: "Always declare variables with const by default. Switch to let only when you know the variable identifier must be reassigned.",
    },
    cards: [
      {
            "number": "01",
            "tag": "DEFAULT CHOICE",
            "title": "const",
            "description": "Prevents variable reassignment. Makes code predictable and easy to reason about.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "MUTABLE BINDING",
            "title": "let",
            "description": "Allows reassignment when a counter, accumulator, or state flag must change over time.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "KEY DISTINCTION",
            "title": "Object Mutation",
            "description": "const prevents reassigning the variable identifier, but object properties inside it can still change.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. const is your default",
            "content": "Using const tells anyone reading the code that this name will always point to the same value or object reference."
      },
      {
            "title": "2. let is for values that change",
            "content": "Counters, loops, and running totals need reassignment, so declare them with let."
      },
      {
            "title": "3. const objects can still change properties",
            "content": "Writing const user = { name: \"Rina\" } stops user = anotherUser, but user.name = \"Mehedi\" is completely valid."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const total = 0;\n// TypeError: Assignment to constant variable\ntotal = total + 50;",
      explanation: "Declaring a running counter with const causes a runtime crash when trying to reassign it.",
    },
    good: {
      title: "Recommended Approach",
      code: "let total = 0;\ntotal += 50;\ntotal += 25;\nconsole.log(\"Cart total:\", total); // 75",
      explanation: "Using let allows reassignment cleanly as the user adds items to the cart.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-02: Variables const and let\nconst appName = \"LearnCraft\";\nlet currentScore = 100;\n\ncurrentScore += 25;\nconsole.log(appName, \"User Score:\", currentScore);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you declare a variable using let instead of const?",
      options: ["Only when writing mathematical equations","Whenever you need to assign a different value to the variable later","Whenever the variable stores an object or array","Only in server-side Node.js code"],
      correctIndex: 1,
      explanation: "Use let when the variable identifier must be reassigned later. Use const by default for all other bindings.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Default to const",
            "desc": "Keeps bindings immutable and prevents accidental overwrites."
      },
      {
            "title": "Use let for Reassignment",
            "desc": "Ideal for loop counters, totals, and state switches."
      },
      {
            "title": "Property Mutation",
            "desc": "const protects the variable binding, not the internal properties of objects."
      }
],
    nextLessonPreview: {
      title: "Basic Values and Types",
      desc: "Explore JavaScript primitive types: strings, numbers, booleans, null, and undefined.",
    },
  },
};
