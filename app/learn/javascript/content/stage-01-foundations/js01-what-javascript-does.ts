import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js01WhatJavascriptDoesContent: StandardLessonContent = {
  slug: "js01-what-javascript-does",
  code: "JS-01",
  title: "What JavaScript Does",
  subtitle: "Understand the role of JavaScript in web development and server-side execution.",
  difficulty: "Easy",
  scenario: {
    question: "You are building a sign-up page. The page needs to check whether an email field is empty when the user clicks Submit. What can JavaScript do here?",
    answer: "JavaScript can respond to the click, check the field's value, and show a message if the email is empty. HTML creates the field, CSS styles it, and JavaScript handles the behavior.",
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
    title: "What JavaScript Does",
    bigPicture: "JavaScript is a programming language used to make web pages respond to users. It can also run outside the browser, such as on a server with Node.js.",
    codeSnippet: "const buttonMessage = \"Welcome!\";\nconsole.log(buttonMessage);\n// Welcome!",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Interactivity",
            "desc": "Responds to user actions like button clicks, form typing, and scrolling."
      },
      {
            "title": "Browser & Server",
            "desc": "Runs directly inside web browsers and on servers using runtimes like Node.js."
      },
      {
            "title": "Behavior vs Markup",
            "desc": "HTML creates the structure, CSS adds styles, and JavaScript controls behavior."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Purpose of JavaScript",
      content: "JavaScript handles client-side events, form validation, dynamic UI updates, and backend API requests.",
    },
    cards: [
      {
            "number": "01",
            "tag": "CORE ROLE",
            "title": "Interactivity",
            "description": "Responds to user actions like button clicks, form typing, and scrolling.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "ENVIRONMENTS",
            "title": "Browser & Server",
            "description": "Runs directly inside web browsers and on servers using runtimes like Node.js.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "SEPARATION",
            "title": "Behavior vs Markup",
            "description": "HTML creates the structure, CSS adds styles, and JavaScript controls behavior.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Makes pages respond to people",
            "content": "Without JavaScript, a webpage is mostly static text and images. JavaScript listens for user interaction and changes the screen."
      },
      {
            "title": "2. Runs in two major places",
            "content": "JavaScript runs in every modern browser to power user interfaces, and on servers via Node.js to power backends and APIs."
      },
      {
            "title": "3. Coordinates with HTML and CSS",
            "content": "HTML builds the input fields, CSS makes them look good, and JavaScript verifies what the user typed before submitting."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Trying to handle user logic purely with CSS:\n/* CSS cannot inspect form values or send data to servers */\n.submit-btn:hover { color: green; }",
      explanation: "CSS can change colors on hover, but cannot validate values or stop empty form submissions.",
    },
    good: {
      title: "Recommended Approach",
      code: "function validateEmail(email) {\n  if (!email || email.trim() === \"\") {\n    return \"Email cannot be empty\";\n  }\n  return \"Valid\";\n}\n\nconsole.log(validateEmail(\"\")); // \"Email cannot be empty\"\nconsole.log(validateEmail(\"user@example.com\")); // \"Valid\"",
      explanation: "JavaScript inspects the input value and returns a clear validation message.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-01: What JavaScript Does\nconst buttonMessage = \"Welcome to LearnCraft!\";\nconsole.log(\"Status:\", buttonMessage);\n\nfunction handleUserAction(action) {\n  return `Action recorded: ${action}`;\n}\n\nconsole.log(handleUserAction(\"button_click\"));",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary role of JavaScript in web applications?",
      options: ["To define webpage structure and semantics","To add interactive behavior, validate user input, and handle dynamic updates","To compile code into machine binary before download","To define fonts and colors on screen"],
      correctIndex: 1,
      explanation: "HTML provides structure, CSS provides design, and JavaScript provides interactive behavior and logic.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Core Behavior",
            "desc": "JavaScript adds interactivity and responds to user actions."
      },
      {
            "title": "Universal Reach",
            "desc": "Runs inside browsers for UI and on servers with Node.js."
      },
      {
            "title": "Three Web Pillars",
            "desc": "HTML structures, CSS styles, and JavaScript animates and validates."
      }
],
    nextLessonPreview: {
      title: "Variables: const and let",
      desc: "Learn how to name values safely with const by default and let when variables must change.",
    },
  },
};
