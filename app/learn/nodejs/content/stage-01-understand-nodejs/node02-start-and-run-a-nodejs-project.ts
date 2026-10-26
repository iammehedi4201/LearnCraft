import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node02StartAndRunANodejsProjectContent: StandardLessonContent = {
  slug: "node02-start-and-run-a-nodejs-project",
  code: "NODE-02",
  title: "Start and Run a Node.js Project",
  subtitle: "A Node.js project usually has a folder for its code and a package.json file that describes the project and its commands.",
  difficulty: "Easy",
  scenario: {
    question: "You type node app.js, but Node says it cannot find the file. What should you check first?",
    answer: "Check that the file exists, that its name is spelled correctly, and that the terminal is in the correct folder.",
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
    title: "Start and Run a Node.js Project",
    bigPicture:
      "A Node.js project usually has a folder for its code and a `package.json` file that describes the project and its commands.\n\nCreate a folder, open a terminal in it, and initialize your project using `npm init -y`. Then create your entry file `app.js` and start it with `node app.js`.",
    codeSnippet: `// 1. In your terminal, initialize package.json:
// npm init -y

// 2. Create app.js:
console.log("My Node.js app is running");

// 3. In your terminal, run the file:
// node app.js`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. npm init -y",
        desc: "`npm init -y` creates a basic `package.json` file.",
      },
      {
        title: "2. app.js",
        desc: "`app.js` contains the code to run.",
      },
      {
        title: "3. node app.js",
        desc: "`node app.js` starts that file.",
      },
    ],
  },
  part2: {
    title: "Module Configuration & Project Setup",
    intro:
      "In the following lessons, examples use ES modules. For a project that uses ES modules in `.js` files, configure its `package.json` with `\"type\": \"module\"`. Alternatively, use `.mjs` files. Do not change a project's module type without checking its current setup.",
    rule: {
      title: "Module Setup Rule",
      content:
        "For ES modules in `.js` files, set `\"type\": \"module\"` in `package.json`, or name files `.mjs`. Do not change a project's module type without checking its existing setup.",
    },
    cards: [
      {
        number: "01",
        tag: "PROJECT MANIFEST",
        title: "package.json",
        description:
          "Records metadata, project scripts (like start and test), and installed dependencies.",
        color: "purple",
      },
      {
        number: "02",
        tag: "MODULE TYPE",
        title: '"type": "module"',
        description:
          'Enables native ES module imports and exports in standard `.js` files across the project.',
        color: "cyan",
      },
      {
        number: "03",
        tag: "EXECUTION",
        title: "node <filename>",
        description:
          "Executes the file using the Node.js runtime from your current terminal working directory.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Troubleshooting",
    intro: "Troubleshooting common startup issues when running Node.js files:",
    points: [
      {
        title: "Checking Current Directory",
        content:
          "Verify your terminal is inside the project directory where `app.js` resides. Run `pwd` (macOS/Linux) or `cd` (Windows) to verify.",
      },
      {
        title: "Spelling and File Extensions",
        content:
          "Node.js requires exact file name matching. Confirm the file name is spelled accurately and includes the `.js` extension.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Typing `node app.js` from a different parent or sibling directory results in `Error: Cannot find module 'app.js'`.",
    bad: {
      title: "Running From the Wrong Directory",
      code: `# Terminal in /Users/dev/ (wrong folder)\nnode app.js\n# Error: Cannot find module '/Users/dev/app.js'`,
      explanation:
        "Node looks for app.js in your current working directory, not in subfolders automatically.",
    },
    good: {
      title: "Navigating to Project Folder First",
      code: `# Navigate to project folder\ncd my-node-project\nnode app.js\n# Output: My Node.js app is running`,
      explanation:
        "Ensure your terminal is in the folder containing app.js before running the command.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run a basic Node.js project entry point:",
    starterCode: `// app.js\nconsole.log("My Node.js app is running");\n\nconst project = {\n  name: "learncraft-node-demo",\n  version: "1.0.0",\n  status: "active"\n};\n\nconsole.log("Project Details:", project);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You type node app.js, but Node says it cannot find the file. What should you check first?",
      options: [
        "Check that the file exists, that its name is spelled correctly, and that the terminal is in the correct folder.",
        "Reinstall Node.js completely from scratch.",
        "Change the operating system environment variables.",
        "Delete package.json and recreate it.",
      ],
      correctIndex: 0,
      explanation:
        "When Node cannot find a file, verify the file exists, the filename is spelled correctly, and your terminal working directory is inside the right folder.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "npm init -y",
        desc: "Initializes a basic package.json file with default settings.",
      },
      {
        title: "Entry File",
        desc: "Create app.js containing your code and run it using 'node app.js'.",
      },
      {
        title: "ES Modules Setup",
        desc: "Set '\"type\": \"module\"' in package.json to use modern import/export syntax in .js files.",
      },
    ],
  },
};
