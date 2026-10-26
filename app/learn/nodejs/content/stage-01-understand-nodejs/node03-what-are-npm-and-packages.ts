import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node03WhatAreNpmAndPackagesContent: StandardLessonContent = {
  slug: "node03-what-are-npm-and-packages",
  code: "NODE-03",
  title: "What Are npm and Packages?",
  subtitle: "npm is a tool commonly used to install JavaScript packages and run project scripts.",
  difficulty: "Easy",
  scenario: {
    question: "Your teammate shares a project that has package.json and package-lock.json. How do you install its packages?",
    answer: "Run npm install in the project folder. Do not delete the lockfile just to make installation easier.",
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
    title: "What Are npm and Packages?",
    bigPicture:
      "`npm` is a tool commonly used to install JavaScript packages and run project scripts. A package is reusable code that someone has published or that your project defines.\n\nFor example, after installing a package, your code can import it. Do not install packages just because they exist; use one when it solves a real need.",
    codeSnippet: `// 1. Install the package in terminal:
// npm install dayjs

// 2. Import and use the package in an ES module:
import dayjs from "dayjs";

console.log(dayjs().format("YYYY-MM-DD"));`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. npm install dayjs",
        desc: "`npm install dayjs` downloads the package and records it as a project dependency.",
      },
      {
        title: "2. import dayjs",
        desc: '`import dayjs from "dayjs"` makes the package available in this file.',
      },
      {
        title: "3. format()",
        desc: "`format()` returns the date in the requested format.",
      },
    ],
  },
  part2: {
    title: "Dependency Management & Lockfiles",
    intro:
      "`package.json` lists project information and dependencies. `package-lock.json` records the dependency versions selected for the install, helping the team install a consistent dependency tree.",
    rule: {
      title: "Lockfile Best Practice",
      content:
        "When joining an existing project, run `npm install`. Do not delete `package-lock.json` just to make installation easier, as it ensures exact reproducible dependency trees across machines.",
    },
    cards: [
      {
        number: "01",
        tag: "PACKAGE REGISTRY",
        title: "npm Package Registry",
        description:
          "Public catalog of open-source libraries and utilities reusable across Node.js projects.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PROJECT DEPENDENCIES",
        title: "package.json",
        description:
          "Declares high-level version ranges for packages needed to run or develop the project.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "VERSION LOCKING",
        title: "package-lock.json",
        description:
          "Pins exact resolved versions and sub-dependency trees for consistent installations.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Dependency Management",
    intro: "Managing dependencies cleanly in collaborative team environments:",
    points: [
      {
        title: "Installing from Shared Code",
        content:
          "When pulling a teammate's repository, `node_modules` is excluded via `.gitignore`. Running `npm install` recreates the exact environment specified by `package-lock.json`.",
      },
      {
        title: "Solving Real Needs",
        content:
          "Only install third-party packages when they solve a concrete requirement that standard Node.js libraries cannot conveniently handle.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Deleting `package-lock.json` when seeing dependency conflicts can silently upgrade sub-dependencies and introduce subtle breaking bugs.",
    bad: {
      title: "Deleting the Lockfile",
      code: `rm package-lock.json\nnpm install`,
      explanation:
        "Deleting package-lock.json allows npm to pull newer minor/patch versions, breaking version consistency across team members.",
    },
    good: {
      title: "Using Lockfile and npm install",
      code: `npm install\n# or for clean CI/CD installs:\nnpm ci`,
      explanation:
        "Keep package-lock.json committed to Git and run npm install to guarantee deterministic dependencies.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Format dates using standard JavaScript Date APIs:",
    starterCode: `// Simulating package date formatting logic\nconst now = new Date();\nconst year = now.getFullYear();\nconst month = String(now.getMonth() + 1).padStart(2, '0');\nconst day = String(now.getDate()).padStart(2, '0');\n\nconst formatted = \`\${year}-\${month}-\${day}\`;\nconsole.log("Formatted date:", formatted);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your teammate shares a project that has package.json and package-lock.json. How do you install its packages?",
      options: [
        "Run npm install in the project folder. Do not delete the lockfile just to make installation easier.",
        "Delete package-lock.json and run npm init.",
        "Manually download packages one by one from GitHub.",
        "Copy node_modules from another unrelated project on your computer.",
      ],
      correctIndex: 0,
      explanation:
        "Running `npm install` reads both package.json and package-lock.json to install the exact consistent dependency tree.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "npm and Packages",
        desc: "npm installs packages and runs scripts. Packages provide reusable code for real project needs.",
      },
      {
        title: "package-lock.json",
        desc: "Records exact dependency versions selected for install to keep dependency trees consistent.",
      },
      {
        title: "npm install",
        desc: "Run npm install in the project folder to install dependencies without deleting the lockfile.",
      },
    ],
  },
};
