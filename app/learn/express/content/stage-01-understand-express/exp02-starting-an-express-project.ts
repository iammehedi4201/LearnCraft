import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp02StartingAnExpressProjectContent: StandardLessonContent = {
  slug: "exp02-starting-an-express-project",
  code: "EXP-02",
  title: "Starting an Express Project",
  subtitle: "You can add Express to a Node.js project with a package manager to start building servers.",
  difficulty: "Easy",
  scenario: {
    question: "Your terminal says it cannot find the express package. What should you check first?",
    answer: "Check that Express was installed in this project by running npm install express in the project folder, and make sure you are running the file from the correct project.",
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
    title: "Starting an Express Project",
    bigPicture:
      "You can add Express to a Node.js project with a package manager.\n\nInitialize your project, install `express`, create your `server.js` file, and start it directly with Node.",
    codeSnippet: `// In your terminal:
// 1. Initialize project and install Express:
// npm init -y
// npm install express

// 2. In server.js:
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 3. Run the server:
// node server.js`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. npm init -y",
        desc: "`npm init -y` creates a basic `package.json` file.",
      },
      {
        title: "2. npm install express",
        desc: "`npm install express` adds Express to the project.",
      },
      {
        title: "3. node server.js",
        desc: "`node server.js` runs your server file.",
      },
    ],
  },
  part2: {
    title: "Project Configuration & Scripts",
    intro:
      "For a real project, add a start script to `package.json` so the command is easy to remember. You do not need to learn every npm command in this lesson.",
    rule: {
      title: "Dependency Installation Rule",
      content:
        "Express must be installed in the project directory using `npm install express`, recording it under `dependencies` in `package.json` before running `node server.js`.",
    },
    cards: [
      {
        number: "01",
        tag: "INIT",
        title: "npm init -y",
        color: "cyan",
        description: "Generates the project manifest (package.json) with default fields.",
      },
      {
        number: "02",
        tag: "INSTALL",
        title: "npm install express",
        color: "purple",
        description: "Downloads Express and records it under project dependencies.",
      },
      {
        number: "03",
        tag: "SCRIPTS",
        title: "Start Scripts",
        color: "emerald",
        description: "Add 'scripts: { start: \"node server.js\" }' to run your server with 'npm start'.",
      },
    ],
  },
  part3: {
    title: "Scenario & Setup Troubleshooting",
    intro: "Diagnosing 'Cannot find module express' errors during project setup:",
    points: [
      {
        title: "Missing Dependency",
        content:
          "If `npm install express` was not run, Node cannot resolve the `express` package inside `node_modules`.",
      },
      {
        title: "Wrong Working Directory",
        content:
          "Verify the terminal is opened inside the folder containing `package.json` and `node_modules` before running `node server.js`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Running `node server.js` in a folder that has not installed Express causes `Error: Cannot find module 'express'`.",
    bad: {
      title: "Running Without Installing Express",
      code: `# Creating server.js without npm install express\nnode server.js\n# Error: Cannot find module 'express'`,
      explanation:
        "Node cannot find the express package if it was never installed in this project folder.",
    },
    good: {
      title: "Installing in the Correct Folder",
      code: `# Run inside the project directory:\nnpm install express\nnode server.js\n# Server is running on port 3000`,
      explanation:
        "Always install dependencies before running your server file.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated project startup configurations:",
    starterCode: `const mockPackageJson = {\n  name: "my-express-api",\n  version: "1.0.0",\n  scripts: {\n    start: "node server.js"\n  },\n  dependencies: {\n    express: "^5.0.0"\n  }\n};\n\nconsole.log("Package setup ready:", mockPackageJson);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your terminal says it cannot find the express package. What should you check first?",
      options: [
        "Check that Express was installed in this project by running npm install express in the project folder, and make sure you are running the file from the correct project.",
        "Reinstall your computer operating system.",
        "Change the port number from 3000 to 8080.",
        "Delete server.js and recreate it as an HTML file.",
      ],
      correctIndex: 0,
      explanation:
        "Make sure Express was installed via `npm install express` in the current project directory.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Add with npm",
        desc: "Add Express to any Node project using 'npm init -y' and 'npm install express'.",
      },
      {
        title: "Entry File",
        desc: "Create server.js and start it using 'node server.js'.",
      },
      {
        title: "Start Script",
        desc: "Add a start script to package.json to make launching the server easy and standardized.",
      },
    ],
  },
};
