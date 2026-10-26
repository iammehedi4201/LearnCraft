import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node17UseProcessAndExitCodesContent: StandardLessonContent = {
  slug: "node17-use-process-and-exit-codes",
  code: "NODE-17",
  title: "Use process and Exit Codes",
  subtitle: "The global process object provides runtime details and lets you signal success or failure with exit codes.",
  difficulty: "Easy",
  scenario: {
    question: "A script fails, but another tool still treats it as successful. What should you check?",
    answer: "Check whether the script sets a non-zero exit code when it fails and whether the error is being handled correctly.",
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
    title: "Use process and Exit Codes",
    bigPicture:
      "The global `process` object provides information about the running Node.js program. For example, `process.exitCode` can indicate whether a command completed successfully.\n\nAn exit code of `0` usually means success. A non-zero code usually signals a failure to the shell or another program. Setting `process.exitCode` lets Node.js finish its normal cleanup instead of forcing an immediate exit.",
    codeSnippet: `const taskSucceeded = false;

if (!taskSucceeded) {
  console.error("The task failed");
  process.exitCode = 1;
}`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Global process",
        desc: "The global `process` object provides runtime state, environment data, and exit codes.",
      },
      {
        title: "2. Success vs failure codes",
        desc: "An exit code of `0` usually means success; a non-zero code (such as `1`) signals failure to the terminal or parent process.",
      },
      {
        title: "3. Orderly teardown",
        desc: "Setting `process.exitCode = 1` lets Node.js finish ongoing cleanup, close file handles, and exit naturally.",
      },
    ],
  },
  part2: {
    title: "CI/CD Pipelines & Script Status Codes",
    intro:
      "An exit code of `0` usually means success. A non-zero code usually signals a failure to the shell or another program. Setting `process.exitCode` lets Node.js finish its normal cleanup instead of forcing an immediate exit.",
    rule: {
      title: "Exit Code Convention",
      content:
        "Prefer setting `process.exitCode = 1` instead of calling `process.exit(1)`. This allows pending streams, logs, and database disconnects to complete before the process closes.",
    },
    cards: [
      {
        number: "01",
        tag: "SUCCESS",
        title: "Exit Code 0",
        description:
          "Standard operating system code indicating the command or script finished without error.",
        color: "emerald",
      },
      {
        number: "02",
        tag: "FAILURE",
        title: "Non-Zero Exit Code",
        description:
          "Signals failure to shell runners, GitHub Actions, Docker, and CI/CD pipelines.",
        color: "rose",
      },
      {
        number: "03",
        tag: "CLEANUP",
        title: "process.exitCode",
        description:
          "Lets Node.js finish flushing pending console streams and closing connections gracefully.",
        color: "cyan",
      },
    ],
  },
  part3: {
    title: "Scenario & Automation Pipeline Failures",
    intro: "Why exit codes are critical for deployment scripts and automated testing:",
    points: [
      {
        title: "Silent Automation Failures",
        content:
          "If a deployment script encounters an error and logs a message to the console but still exits with code 0, CI/CD tools assume the step succeeded and deploy broken code.",
      },
      {
        title: "Signaling Parent Scripts",
        content:
          "Shell commands rely on `$?` (exit status) to decide whether to stop or continue execution in build pipelines.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Catching an error, printing a message, but leaving exit code 0 so CI/CD pipelines mark a failed task as green.",
    bad: {
      title: "Logging Error but Exiting with 0",
      code: `try {\n  runMigration();\n} catch (err) {\n  console.error("Migration failed:", err);\n  // Bug: Process exits with default code 0 (success)!\n}`,
      explanation:
        "The shell considers exit code 0 a success, allowing deployment to proceed despite the failed migration.",
    },
    good: {
      title: "Setting Non-Zero Exit Code on Failure",
      code: `try {\n  runMigration();\n} catch (err) {\n  console.error("Migration failed:", err);\n  process.exitCode = 1;\n}`,
      explanation:
        "Setting process.exitCode = 1 alerts the calling shell that the script failed.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated process exit logic:",
    starterCode: `function simulateTask(succeeded) {\n  if (!succeeded) {\n    return { status: "FAILED", exitCode: 1 };\n  }\n  return { status: "SUCCESS", exitCode: 0 };\n}\n\nconsole.log("Success run:", simulateTask(true));\nconsole.log("Failure run:", simulateTask(false));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A script fails, but another tool still treats it as successful. What should you check?",
      options: [
        "Check whether the script sets a non-zero exit code when it fails and whether the error is being handled correctly.",
        "Change the script file extension from .js to .txt.",
        "Delete package-lock.json and rebuild the node_modules folder.",
        "Restart the router to reset the network connection.",
      ],
      correctIndex: 0,
      explanation:
        "Other tools and CI/CD pipelines inspect the process exit code. If a script fails but exits with code 0, external tools treat it as a success.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "process Object",
        desc: "Provides runtime information and controls process lifecycle and exit status.",
      },
      {
        title: "Exit Code 0 vs Non-Zero",
        desc: "0 indicates success; non-zero (like 1) indicates failure to the calling shell or CI pipeline.",
      },
      {
        title: "Orderly Teardown",
        desc: "Setting process.exitCode lets Node finish ongoing I/O and flush logs before exiting.",
      },
    ],
  },
};
