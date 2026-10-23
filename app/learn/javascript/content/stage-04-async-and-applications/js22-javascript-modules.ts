import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js22JavascriptModulesContent: StandardLessonContent = {
  slug: "js22-javascript-modules",
  code: "JS-22",
  title: "JavaScript Modules",
  subtitle: "Split code across files and reuse logic cleanly with export and import.",
  difficulty: "Moderate",
  scenario: {
    question: "Several parts of an application need to use the same price-calculation function. How can modules help?",
    answer: "Put the function in one module, export it, and import it wherever needed. This avoids copying the same code into several places.",
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
    title: "JavaScript Modules",
    bigPicture: "Modules let you split code into separate files and share functions or values using export and import.",
    codeSnippet: "// In math.js:\nexport function add(a, b) {\n  return a + b;\n}\n\n// In another module:\nimport { add } from \"./math.js\";\n\nconsole.log(add(2, 3)); // 5",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "export",
            "desc": "Makes functions, objects, or variables available to other files in your project."
      },
      {
            "title": "import",
            "desc": "Pulls in exported utilities from another file using explicit paths."
      },
      {
            "title": "Single Responsibility",
            "desc": "Keeps files focused, modular, and easy to maintain and test."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Modularity Rule",
      content: "Break large files into single-responsibility modules. Export reusable functions and import them where needed.",
    },
    cards: [
      {
            "number": "01",
            "tag": "SHARING",
            "title": "export",
            "description": "Makes functions, objects, or variables available to other files in your project.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "CONSUMING",
            "title": "import",
            "description": "Pulls in exported utilities from another file using explicit paths.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "ORGANIZATION",
            "title": "Single Responsibility",
            "description": "Keeps files focused, modular, and easy to maintain and test.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Modular architecture",
            "content": "Instead of dumping 5,000 lines into one massive file, modules break logic into clean, focused files."
      },
      {
            "title": "2. Explicit sharing with export and import",
            "content": "Only values with export can be seen by other files. Internal helper functions stay safely private."
      },
      {
            "title": "3. Avoids copy-paste duplication",
            "content": "Write a helper once (like calculateDiscount), export it, and import it across all pages that need it."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Copying the same function across multiple files:\n// In cart.js: function calcTotal(p) { return p * 1.1; }\n// In checkout.js: function calcTotal(p) { return p * 1.1; }\n// If the tax rate changes, you have to update multiple files and might miss one!",
      explanation: "Duplicating code leads to discrepancies when requirements or formulas change.",
    },
    good: {
      title: "Recommended Approach",
      code: "// In pricing.js:\nexport function calcTotal(p) { return p * 1.1; }\n\n// In cart.js & checkout.js:\nimport { calcTotal } from \"./pricing.js\";",
      explanation: "Centralizing shared logic into an exported module ensures consistency everywhere.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-22: JavaScript Modules (Simulation in Sandbox)\nconst mathModule = {\n  add(a, b) { return a + b; },\n  multiply(a, b) { return a * b; }\n};\n\nconsole.log(\"Exported Add:\", mathModule.add(10, 5));\nconsole.log(\"Exported Multiply:\", mathModule.multiply(4, 3));",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary benefit of using ES modules (export and import)?",
      options: ["It converts JavaScript code into HTML","It allows code to be organized into separate, reusable files with explicit dependencies","It forces all variables to be global","It eliminates the need for functions"],
      correctIndex: 1,
      explanation: "Modules split code into focused files, allowing explicit sharing of logic via export and import while keeping other variables private.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Clear Boundaries",
            "desc": "Isolates internal helper logic from exported APIs."
      },
      {
            "title": "Zero Duplication",
            "desc": "Import shared functions across multiple files."
      },
      {
            "title": "Maintainability",
            "desc": "Small, single-responsibility files are easier to test and debug."
      }
],
    nextLessonPreview: {
      title: "Interactive Web Application Capstone",
      desc: "Put all 22 JavaScript lessons into practice by building a full data-driven interactive application.",
    },
  },
};
