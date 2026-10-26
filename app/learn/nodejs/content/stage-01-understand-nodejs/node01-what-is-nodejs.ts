import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node01WhatIsNodejsContent: StandardLessonContent = {
  slug: "node01-what-is-nodejs",
  code: "NODE-01",
  title: "What Is Node.js?",
  subtitle: "Node.js lets you run JavaScript outside a web browser to build backend services, command-line tools, and scripts.",
  difficulty: "Easy",
  scenario: {
    question: "You want to run a script that reads a file from your computer. Do you need a browser?",
    answer: "No. Node.js can run JavaScript directly on your computer and provides APIs for working with files.",
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
    title: "What Is Node.js?",
    bigPicture:
      "Node.js lets you run JavaScript outside a web browser. Developers often use it to build backend services, command-line tools, and scripts.\n\nA browser can use JavaScript to respond to clicks on a page. Node.js can use JavaScript to read files, communicate over a network, and run a server.",
    codeSnippet: `// hello.js\nconsole.log("Hello from Node.js!");\n\n// Run it in your terminal:\n// node hello.js`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Run command",
        desc: "`node hello.js` asks Node.js to run the file.",
      },
      {
        title: "2. Execution",
        desc: "Node.js reads and runs the JavaScript.",
      },
      {
        title: "3. Terminal output",
        desc: "`console.log()` prints the message in the terminal.",
      },
    ],
  },
  part2: {
    title: "When Is It Useful?",
    intro: "Use Node.js when JavaScript needs to run on the server or as a local tool.",
    rule: {
      title: "Core Purpose",
      content:
        "Node.js runs JavaScript directly on your computer and provides APIs for working with files, networks, and servers without needing a browser.",
    },
    cards: [
      {
        number: "01",
        tag: "BACKEND",
        title: "Backend Services",
        description:
          "Build web servers, API endpoints, and network services using JavaScript outside the browser.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "CLI TOOLS",
        title: "Command-Line Tools & Scripts",
        description:
          "Run automation scripts, file processors, and developer tooling directly from your terminal.",
        color: "purple",
      },
      {
        number: "03",
        tag: "SYSTEM APIS",
        title: "Operating System Access",
        description:
          "Access the local filesystem, network sockets, environment variables, and system processes.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Application",
    intro: "Understanding where Node.js fits compared to browser JavaScript:",
    points: [
      {
        title: "Browser vs. Node.js Capabilities",
        content:
          "A browser uses JavaScript to respond to clicks on a page and update the DOM. Node.js uses JavaScript to read files, communicate over a network, and run a server.",
      },
      {
        title: "Local Execution Without a Browser",
        content:
          "You do not need a browser to run scripts or automate tasks on your machine. Node.js runs directly on your computer with full system API support.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Attempting to use browser-specific globals (such as window or document) inside Node.js causes immediate ReferenceErrors because there is no browser DOM.",
    bad: {
      title: "Accessing Browser Globals in Node.js",
      code: `// Fails in Node.js\nconsole.log(window.location.href);\nconsole.log(document.title);`,
      explanation:
        "ReferenceError: window is not defined. Node.js runs outside the browser and has no DOM or window object.",
    },
    good: {
      title: "Using Node.js APIs and Globals",
      code: `// Correct in Node.js\nconsole.log("Running in Node.js:", process.version);\nconsole.log("Current working directory:", process.cwd());`,
      explanation:
        "Use standard JavaScript and Node.js globals like process, console, and core modules instead of DOM APIs.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run your first Node.js JavaScript program:",
    starterCode: `// hello.js\nconsole.log("Hello from Node.js!");\n\n// Node.js executes standard JavaScript directly\nconst app = "My Node.js App";\nconsole.log(\`Running \${app} outside the browser!\`);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You want to run a script that reads a file from your computer. Do you need a browser?",
      options: [
        "No. Node.js can run JavaScript directly on your computer and provides APIs for working with files.",
        "Yes. JavaScript can only execute inside a web browser.",
        "Yes. You must open a browser tab to start the Node.js runtime.",
        "No, but Node.js requires a DOM window to load JavaScript files.",
      ],
      correctIndex: 0,
      explanation:
        "Node.js runs JavaScript outside a web browser and provides APIs for working with files, network communication, and servers.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "JavaScript Outside the Browser",
        desc: "Node.js lets you run JavaScript outside a web browser to build backend services, command-line tools, and scripts.",
      },
      {
        title: "Direct System APIs",
        desc: "A browser responds to clicks; Node.js can read files, communicate over networks, and run servers.",
      },
      {
        title: "Terminal Execution",
        desc: "Run any JavaScript file directly using 'node filename.js' in your terminal.",
      },
    ],
  },
};
