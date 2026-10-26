import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node06ReadAndWriteFilesContent: StandardLessonContent = {
  slug: "node06-read-and-write-files",
  code: "NODE-06",
  title: "Read and Write Files",
  subtitle: "Node.js provides the node:fs module for file work with a promise-based API for common asynchronous file operations.",
  difficulty: "Moderate",
  scenario: {
    question: "A user uploads a file, and reading it fails. What should the app do?",
    answer: "Catch the error, log useful details for developers, and show a safe message to the user instead of crashing unexpectedly.",
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
    title: "Read and Write Files",
    bigPicture:
      "Node.js provides the `node:fs` module for file work. Prefer its promise-based API for common asynchronous file operations.",
    codeSnippet: `import { readFile, writeFile } from "node:fs/promises";

const text = await readFile("./notes.txt", "utf8");
console.log(text);

await writeFile("./copy.txt", text);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. readFile()",
        desc: "`readFile()` reads `notes.txt`.",
      },
      {
        title: "2. 'utf8' encoding",
        desc: 'The `"utf8"` option asks for text instead of a raw Buffer.',
      },
      {
        title: "3. await completion",
        desc: "`await` waits for the read to finish before using `text`.",
      },
      {
        title: "4. writeFile()",
        desc: "`writeFile()` writes the text to `copy.txt`.",
      },
    ],
  },
  part2: {
    title: "Top-Level Await & Error Handling",
    intro:
      "This example uses top-level `await`, which works in an ES module. In other setups, put these statements inside an `async` function. The files must exist or be writable as required; file operations can fail, so real applications should handle errors.",
    rule: {
      title: "File Operations Rule",
      content:
        "File I/O can always fail (file missing, permission denied, disk full). Always wrap asynchronous file operations in error handlers to prevent unhandled rejections from crashing your server.",
    },
    cards: [
      {
        number: "01",
        tag: "PROMISES",
        title: "node:fs/promises",
        description:
          "Modern promise-based API that avoids callback nesting and works smoothly with async/await.",
        color: "cyan",
      },
      {
        number: "02",
        tag: "ENCODING",
        title: '"utf8" String Option',
        description:
          "Passing 'utf8' returns a decoded string. Omitting the encoding returns a raw binary Buffer.",
        color: "purple",
      },
      {
        number: "03",
        tag: "SAFETY",
        title: "Error Handling",
        description:
          "Catch file system errors and respond with clear messages instead of terminating the process.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Safe Error Handling",
    intro: "Handling unexpected file operation failures in user-facing applications:",
    points: [
      {
        title: "Catching the Exception",
        content:
          "Wrap file reads and writes in `try...catch` so unexpected disk errors or missing files do not crash the running application.",
      },
      {
        title: "Developer Logging vs User Message",
        content:
          "Log full diagnostic details (error code, file name) to server logs, but present safe, sanitized messages to the user without exposing internal file paths.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Omitting error handling when reading files crashes the entire Node.js server with an unhandled rejection when a file is absent.",
    bad: {
      title: "Unprotected File Read",
      code: `import { readFile } from "node:fs/promises";\n\n// Crashes if missing.txt does not exist\nconst data = await readFile("./missing.txt", "utf8");`,
      explanation:
        "An unhandled rejection on a missing file will terminate the server in modern Node.js.",
    },
    good: {
      title: "Protected File Read with try...catch",
      code: `import { readFile } from "node:fs/promises";\n\ntry {\n  const data = await readFile("./missing.txt", "utf8");\n} catch (err) {\n  console.error("File read failed:", err.message);\n  // Return a safe response to the user\n}`,
      explanation:
        "Catching the error allows you to return an appropriate error status or fallback gracefully.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect text decoding and string manipulation:",
    starterCode: `// Simulating file content processing\nconst fileContent = "Title: LearnCraft Notes\\nAuthor: Node Learner\\nStatus: In Progress";\n\nconst lines = fileContent.split("\\n");\nconsole.log(\`Processed \${lines.length} lines of text:\`);\nlines.forEach((line, i) => console.log(\`  [\${i + 1}] \${line}\`));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "A user uploads a file, and reading it fails. What should the app do?",
      options: [
        "Catch the error, log useful details for developers, and show a safe message to the user instead of crashing unexpectedly.",
        "Silently pretend the file was read successfully and return empty data.",
        "Immediately crash the Node.js server process.",
        "Expose the full internal server stack trace directly to the client browser.",
      ],
      correctIndex: 0,
      explanation:
        "Catch the error, log diagnostic information for developers, and display a user-friendly, safe message to the user.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "node:fs/promises",
        desc: "Prefer the promise-based node:fs/promises API for common asynchronous file reading and writing.",
      },
      {
        title: "'utf8' Encoding",
        desc: "Specify 'utf8' to receive string data; omitting encoding returns a raw binary Buffer.",
      },
      {
        title: "Graceful Failure",
        desc: "File operations can fail. Always handle errors safely rather than crashing unexpectedly.",
      },
    ],
  },
};
