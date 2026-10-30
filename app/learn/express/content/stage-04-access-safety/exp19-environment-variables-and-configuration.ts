import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp19EnvironmentVariablesAndConfigurationContent: StandardLessonContent = {
  slug: "exp19-environment-variables-and-configuration",
  code: "EXP-19",
  title: "Environment Variables and Configuration",
  subtitle: "Configure runtime parameters using process.env to adapt to local, staging, and production environments cleanly.",
  difficulty: "Easy",
  scenario: {
    question: "Your app works locally but uses the wrong port in production. What should you check?",
    answer: "Check the deployment environment's PORT value and make sure the server reads it correctly.",
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
    title: "Environment Variables and Configuration",
    bigPicture:
      "Environment variables let an app read settings from its environment rather than hard-coding them in source files.",
    codeSnippet: `const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Check env value",
        desc: "The app checks whether `PORT` is set in `process.env`.",
      },
      {
        title: "2. Dynamic assignment",
        desc: "If it is set, the server uses that value.",
      },
      {
        title: "3. Safe fallback",
        desc: "If it is not set, the example uses port `4000` as a default fallback.",
      },
    ],
  },
  part2: {
    title: "Why Environment Configuration Matters",
    intro:
      "Environment variable values are commonly strings, so convert and validate them when a number or another format is required. Do not commit secret `.env` files to a public repository.\n\nEvery environment (development laptop, CI/CD runner, staging container, cloud production host) has different networking, ports, and database hosts.",
    rule: {
      title: "String Value Rule",
      content:
        "All values in process.env are strings or undefined. If you need a number or boolean, convert explicitly: Number(process.env.PORT) or process.env.DEBUG === 'true'.",
    },
    cards: [
      {
        number: "01",
        tag: "FALLBACKS",
        title: "Sensible Defaults",
        description:
          "Provide default fallbacks for local development (`process.env.PORT || 4000`) so dev setups boot smoothly.",
        color: "purple",
      },
      {
        number: "02",
        tag: "TYPE CASTING",
        title: "Strings to Numbers",
        description:
          "Remember that environment variables are strings; parse ports or timeouts before passing to math functions.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "GITIGNORE",
        title: ".env in .gitignore",
        description:
          "Always add `.env` to `.gitignore` to prevent secret leakage in public and private repositories.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Deployment Debugging",
    intro: "Managing port assignments and runtime configuration:",
    points: [
      {
        title: "Cloud Host Port Binding",
        content:
          "Cloud providers (like Render, Heroku, AWS) inject dynamic `$PORT` values. Hardcoding 4000 causes deployment health checks to fail.",
      },
      {
        title: "Configuration Validation",
        content:
          "Validate required environment variables when the app boots up, exiting early with an informative log if essential settings are missing.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Hardcoding port 3000 or 4000 without inspecting `process.env.PORT`, failing on cloud PaaS providers.",
    bad: {
      title: "Hardcoded Port Number",
      code: `// Fails in cloud deployments requiring dynamic port binding\napp.listen(3000, () => {\n  console.log("Listening on 3000");\n});`,
      explanation:
        "Cloud hosts set process.env.PORT dynamically. Ignoring it prevents the host from routing traffic.",
    },
    good: {
      title: "Dynamic Port with Fallback",
      code: `const port = process.env.PORT || 4000;\napp.listen(port, () => {\n  console.log(\`Server listening on port \${port}\`);\n});`,
      explanation:
        "Reads environment configuration when provided, and defaults to 4000 locally.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test dynamic environment port resolution:",
    starterCode: `function resolvePort(env) {\n  return env.PORT ? Number(env.PORT) : 4000;\n}\n\nconsole.log("Local development (no PORT):", resolvePort({}));\nconsole.log("Production hosting (PORT=8080):", resolvePort({ PORT: '8080' }));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your app works locally but uses the wrong port in production. What should you check?",
      options: [
        "Check the deployment environment's PORT value and make sure the server reads it correctly.",
        "Reinstall Windows or macOS on your local machine.",
        "Change all GET requests into POST requests.",
        "Delete package.json from the repository.",
      ],
      correctIndex: 0,
      explanation:
        "Cloud hosts configure the port via process.env.PORT. Ensure your code reads process.env.PORT and binds to that value.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "process.env",
        desc: "Global object providing access to system environment variables in Node.js.",
      },
      {
        title: "Port Binding",
        desc: "Use `process.env.PORT || 4000` to satisfy both local dev and cloud deployments.",
      },
      {
        title: "Never Commit .env",
        desc: "Keep .env files in .gitignore; provide an .env.example file for team members.",
      },
    ],
  },
};
