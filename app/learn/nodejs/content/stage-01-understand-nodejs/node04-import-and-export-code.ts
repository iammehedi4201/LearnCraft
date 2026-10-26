import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node04ImportAndExportCodeContent: StandardLessonContent = {
  slug: "node04-import-and-export-code",
  code: "NODE-04",
  title: "Import and Export Code Between Files",
  subtitle: "Modules let you split code into files and reuse functions or values with export and import syntax.",
  difficulty: "Moderate",
  scenario: {
    question: "A function is written in helpers.js, but another file cannot use it. What should you check?",
    answer: "Check that the function is exported, imported from the correct path, and that both files use a compatible module system.",
  },
  interviewQuestion: {
    question: "What is the purpose of modules?",
    answer: "Modules split code into reusable files and make a project easier to organize and maintain.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Import and Export Code Between Files",
    bigPicture:
      "Modules let you split code into files and reuse functions or values. In modern Node.js, you can use ES module `export` and `import` syntax when the project is configured for it.\n\nDefine your functions in a module file (like `math.js`) and export them. Then import them in your entry file (like `app.js`).",
    codeSnippet: `// In math.js:
export function add(a, b) {
  return a + b;
}

// In app.js:
import { add } from "./math.js";

console.log(add(2, 3)); // 5`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. export",
        desc: "`export` makes `add` available outside `math.js`.",
      },
      {
        title: "2. import",
        desc: "`import` brings `add` into `app.js`.",
      },
      {
        title: "3. add(2, 3)",
        desc: "`add(2, 3)` runs the function and returns `5`.",
      },
    ],
  },
  part2: {
    title: "Relative Paths & Module Systems",
    intro:
      "The `./` means “from a file near this file.” Include the file extension in relative ES module imports when required by the Node.js module setup.\n\nNode.js also supports CommonJS (`require` and `module.exports`). Recognize both styles, but avoid mixing them without understanding the project's configuration.",
    rule: {
      title: "Module System Consistency",
      content:
        "Recognize both ES modules (`import`/`export`) and CommonJS (`require`/`module.exports`). Follow your project's existing configuration rather than mixing both styles in the same file.",
    },
    cards: [
      {
        number: "01",
        tag: "RELATIVE PATHS",
        title: "./ Relative Resolution",
        description:
          "Always prefix local module imports with `./` or `../` and include the `.js` extension in Node ES modules.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ES MODULES",
        title: "import & export",
        description:
          "The modern standard in JavaScript and Node.js for clean, static code sharing across files.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "COMMONJS",
        title: "require & module.exports",
        description:
          "The legacy Node.js module format. Keep files consistent with whatever module system the project uses.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & Selected Interview Question",
    intro: "Applying module principles to real-world code organization and interviews:",
    points: [
      {
        title: "Export Verification",
        content:
          "Verify the target file exports the symbol (named export `export function` or default export `export default`).",
      },
      {
        title: "Path and Extension Check",
        content:
          "Confirm the import path points to the right directory and includes the file extension (`./helpers.js`) as required by Node ES module resolution.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Omitting `./` or the file extension `.js` in relative ES module imports causes Node.js to throw `ERR_MODULE_NOT_FOUND`.",
    bad: {
      title: "Missing Relative Prefix or Extension",
      code: `// Fails in Node.js ES modules\nimport { add } from "math"; // Looks in node_modules\nimport { add } from "./math"; // Missing .js extension`,
      explanation:
        "Node ES modules require relative specifiers to begin with ./ or ../ and include the explicit .js extension.",
    },
    good: {
      title: "Explicit Relative Import with Extension",
      code: `// Correct in Node.js ES modules\nimport { add } from "./math.js";`,
      explanation:
        "Providing the exact relative path with extension resolves directly without ambiguity.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Export and import modular functions:",
    starterCode: `// Simulating module export and import\nfunction add(a, b) {\n  return a + b;\n}\n\nfunction multiply(a, b) {\n  return a * b;\n}\n\n// Consuming modular math functions\nconsole.log("Add 2 + 3:", add(2, 3));\nconsole.log("Multiply 4 * 5:", multiply(4, 5));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A function is written in helpers.js, but another file cannot use it. What should you check?",
      options: [
        "Check that the function is exported, imported from the correct path, and that both files use a compatible module system.",
        "Restart the operating system to reset Node module cache.",
        "Rename the file to index.html so the browser can find it.",
        "Delete package.json and re-run npm init.",
      ],
      correctIndex: 0,
      explanation:
        "To use code across files, verify the function is exported, the import path is correct (including ./ and .js), and both files use a compatible module setup.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Purpose of Modules",
        desc: "Modules split code into reusable files and make a project easier to organize and maintain.",
      },
      {
        title: "import & export",
        desc: "Use export to make functions available and import to bring them into another file.",
      },
      {
        title: "Relative Imports",
        desc: "Use './' for files near the current file and include the file extension when required.",
      },
    ],
  },
};
