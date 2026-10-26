import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node07WhyThePathModuleMattersContent: StandardLessonContent = {
  slug: "node07-why-the-path-module-matters",
  code: "NODE-07",
  title: "Why the path Module Matters",
  subtitle: "The node:path module helps you build file paths that work reliably across different operating systems.",
  difficulty: "Easy",
  scenario: {
    question: 'Your application builds a file path by joining strings with "/". Why might path.join() be better?',
    answer: "path.join() handles platform-specific separators more reliably. You still need to validate untrusted file names.",
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
    title: "Why the path Module Matters",
    bigPicture:
      "File paths look different on different operating systems. The `node:path` module helps you build paths in a way that works with the current operating system.",
    codeSnippet: `import path from "node:path";

const filePath = path.join("uploads", "photo.png");
console.log(filePath);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. path.join()",
        desc: "`path.join()` joins the path pieces.",
      },
      {
        title: "2. Platform Separators",
        desc: "Node.js uses the correct path separators for the operating system (`\\` on Windows, `/` on POSIX).",
      },
      {
        title: "3. Resulting Path",
        desc: "`filePath` contains the normalized resulting path.",
      },
    ],
  },
  part2: {
    title: "Cross-Platform Reliability & Path Security",
    intro:
      "Joining paths does not prove that a path is safe. When handling user input, validate it and make sure it cannot escape the directory you intend to use.",
    rule: {
      title: "Path Safety Rule",
      content:
        "Use `node:path` for cross-platform file paths, and always validate user-provided file names to prevent path traversal attacks (like `../../etc/passwd`).",
    },
    cards: [
      {
        number: "01",
        tag: "PLATFORMS",
        title: "Cross-Platform Compatibility",
        description:
          "Automatically uses Windows backslashes (`\\`) or Linux/macOS forward slashes (`/`).",
        color: "cyan",
      },
      {
        number: "02",
        tag: "NORMALIZATION",
        title: "Path Normalization",
        description:
          "Resolves redundant separators (`//`) and relative segments (`.` and `..`) cleanly.",
        color: "purple",
      },
      {
        number: "03",
        tag: "SECURITY",
        title: "Untrusted Input Validation",
        description:
          "Never pass unvalidated user filenames directly into path.join without checking directory bounds.",
        color: "rose",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Path Handling",
    intro: "Understanding platform differences and input validation:",
    points: [
      {
        title: "Platform-Specific Separators",
        content:
          "Hardcoding `/` breaks on Windows systems or causes inconsistent path comparisons. `path.join()` guarantees compatibility across developer operating systems and production Linux servers.",
      },
      {
        title: "Preventing Directory Escape",
        content:
          "Even with `path.join()`, untrusted input like `../../secret.txt` can escape your intended folder unless you validate the sanitized filename.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Joining paths with string concatenation (`folder + '/' + file`) leads to malformed double slashes or Windows separator bugs.",
    bad: {
      title: "String Concatenation for Paths",
      code: `// Brittle: Hardcodes forward slashes\nconst fullPath = "uploads" + "/" + filename;\n// Malformed if uploads ends with slash: "uploads//file.png"`,
      explanation:
        "Manual string concatenation does not normalize slashes or adapt to operating systems.",
    },
    good: {
      title: "Using path.join()",
      code: `import path from "node:path";\n\n// Reliable and normalized\nconst safeName = path.basename(filename);\nconst fullPath = path.join("uploads", safeName);`,
      explanation:
        "path.join normalizes separators, and path.basename prevents directory traversal.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Construct normalized file paths across directories:",
    starterCode: `// Simulating path normalization\nfunction mockJoin(...parts) {\n  return parts\n    .map(p => p.replace(/^\\/+|\\/+$/g, ''))\n    .filter(Boolean)\n    .join('/');\n}\n\nconst uploadDir = "var/data/uploads";\nconst file = "avatar.png";\nconst joined = mockJoin(uploadDir, file);\nconsole.log("Normalized Path:", joined);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        'Your application builds a file path by joining strings with "/". Why might path.join() be better?',
      options: [
        "path.join() handles platform-specific separators more reliably. You still need to validate untrusted file names.",
        "path.join() automatically encrypts the file contents on disk.",
        "path.join() eliminates the need to validate user input.",
        "path.join() converts files to ES modules automatically.",
      ],
      correctIndex: 0,
      explanation:
        "path.join() reliably handles platform-specific separators (Windows vs POSIX). Validation of untrusted filenames is still required.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "node:path",
        desc: "Builds file paths in a way that works with the current operating system.",
      },
      {
        title: "path.join()",
        desc: "Joins path pieces and uses the correct separators for the platform.",
      },
      {
        title: "Validate Input",
        desc: "Joining paths does not prove safety; validate user input to ensure it cannot escape intended directories.",
      },
    ],
  },
};
