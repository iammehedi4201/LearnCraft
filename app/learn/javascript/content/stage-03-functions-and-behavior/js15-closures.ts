import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js15ClosuresContent: StandardLessonContent = {
  slug: "js15-closures",
  code: "JS-15",
  title: "Closures",
  subtitle: "Preserve private state across function calls through lexical environment retention.",
  difficulty: "Difficult",
  scenario: {
    question: "You need a counter that keeps its own count and does not let other code change the count directly. How can a closure help?",
    answer: "A function can create a local count variable and return another function that changes it. The returned function remembers count, but outside code cannot access that local variable directly.",
  },
  interviewQuestion: {
    question: "What is a closure?",
    answer: "A closure is a function that keeps access to variables from the scope where it was created. It can be used to remember data or keep some state private.",
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
    title: "Closures",
    bigPicture: "A closure happens when a function keeps access to variables from the scope where it was created, even after that outer function has finished running.",
    codeSnippet: "function createCounter() {\n  let count = 0;\n\n  return function () {\n    count += 1;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Lexical Environment",
            "desc": "Inner functions retain access to outer variables even after the outer function finishes."
      },
      {
            "title": "Private State",
            "desc": "Variables captured in closures cannot be touched or modified from the outside directly."
      },
      {
            "title": "Function Factories",
            "desc": "Generate tailored functions that hold specific configurations or initial state."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Closure Principle",
      content: "A closure bundles a function together with references to its surrounding state (lexical environment).",
    },
    cards: [
      {
            "number": "01",
            "tag": "PERSISTENCE",
            "title": "Lexical Environment",
            "description": "Inner functions retain access to outer variables even after the outer function finishes.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "ENCAPSULATION",
            "title": "Private State",
            "description": "Variables captured in closures cannot be touched or modified from the outside directly.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "FACTORIES",
            "title": "Function Factories",
            "description": "Generate tailored functions that hold specific configurations or initial state.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Remembers where it was born",
            "content": "An inner function remembers the variables from the outer function, even after the outer function has returned."
      },
      {
            "title": "2. True private state",
            "content": "The variable count cannot be modified by outside code. Only the returned counter() function has access to it."
      },
      {
            "title": "3. Each instance is separate",
            "content": "Calling createCounter() again creates a totally new count variable that does not affect the first counter."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Global counter easily corrupted:\nlet globalCount = 0;\nfunction increment() { return ++globalCount; }\n// Any file or script can accidentally reset or break it:\nglobalCount = -999;",
      explanation: "Global state is vulnerable to accidental overwrites from any part of the application.",
    },
    good: {
      title: "Recommended Approach",
      code: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst countA = makeCounter();\nconsole.log(countA()); // 1\nconsole.log(countA()); // 2",
      explanation: "The count variable is private and can only be updated through the returned function.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-15: Closures\nfunction makeCounter() {\n  let count = 0;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(\"Count 1:\", counter());\nconsole.log(\"Count 2:\", counter());",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is a closure in JavaScript?",
      options: ["A syntax error caused by an unclosed curly brace","A function that retains access to variables from its outer lexical scope after the outer function has returned","An API call that closes a database connection","A method to stop browser event bubbling"],
      correctIndex: 1,
      explanation: "A closure is created when an inner function retains access to variables from its enclosing scope, even after that parent function completes.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Lexical Memory",
            "desc": "Functions remember the variables defined in their outer scope."
      },
      {
            "title": "Data Privacy",
            "desc": "Protects state from accidental external modification."
      },
      {
            "title": "Independent Instances",
            "desc": "Each invocation of the parent function creates a distinct closed scope."
      }
],
    nextLessonPreview: {
      title: "The this Keyword",
      desc: "Learn how this is bound in normal functions versus arrow functions.",
    },
  },
};
