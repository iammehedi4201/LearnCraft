import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node05ReadEnvironmentVariablesSafelyContent: StandardLessonContent = {
  slug: "node05-read-environment-variables-safely",
  code: "NODE-05",
  title: "Read Environment Variables Safely",
  subtitle: "Environment variables let you give a program settings from outside its source code for local development and production.",
  difficulty: "Moderate",
  scenario: {
    question: "Your app works locally but fails because process.env.API_KEY is missing. What should you check?",
    answer: "Check whether the variable is set in the environment where the app is running and whether the project loads its environment settings correctly. Never fix this by committing the real secret to Git.",
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
    title: "Read Environment Variables Safely",
    bigPicture:
      "Environment variables let you give a program settings from outside its source code. They are often used for values that change between local development and production.",
    codeSnippet: `const port = process.env.PORT || 3000;

console.log(\`The app will use port \${port}\`);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. process.env",
        desc: "`process.env` contains environment variables available to the running process.",
      },
      {
        title: "2. process.env.PORT",
        desc: "Reads the `PORT` setting, if one is supplied.",
      },
      {
        title: "3. || 3000 Fallback",
        desc: "`|| 3000` uses `3000` when the value is missing or empty.",
      },
    ],
  },
  part2: {
    title: "String Conversion & Secrets Security",
    intro:
      "Environment variable values are usually strings. Check and convert a value when you need a number. Keep passwords and API keys out of source code and version control. A `.env` file is only safe if it is kept out of Git and loaded using a tool or runtime feature configured for the project.",
    rule: {
      title: "Secrets Hygiene Rule",
      content:
        "Never commit API keys or production passwords to version control. Keep `.env` files in `.gitignore` and configure variables securely in each hosting environment.",
    },
    cards: [
      {
        number: "01",
        tag: "STRINGS",
        title: "String Conversion",
        description:
          "All environment variables arrive as strings. Use `Number()` or parsing when numeric values like ports are required.",
        color: "amber",
      },
      {
        number: "02",
        tag: "SECRETS",
        title: "Protecting Secrets",
        description:
          "Keep API keys, tokens, and database passwords in environment variables, never hardcoded in source files.",
        color: "rose",
      },
      {
        number: "03",
        tag: ".ENV FILES",
        title: "Local .env Files",
        description:
          "Use `.env` for local testing only. Ensure `.env` is listed in `.gitignore` so secrets are never pushed to Git.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Safe Configuration Troubleshooting",
    intro: "Diagnosing missing environment variable failures:",
    points: [
      {
        title: "Runtime Environment Settings",
        content:
          "Confirm the hosting provider, CI server, or local terminal has exported the variable before running the Node process.",
      },
      {
        title: "Never Commit Real Secrets",
        content:
          "When an environment variable is missing in production, set it in the deployment dashboard. Never commit the actual key to Git as a shortcut.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Hardcoding secret API keys in repository source code leaks credentials to anyone with read access to Git.",
    bad: {
      title: "Hardcoding Secrets in Code",
      code: `// Danger: Leaks secrets to version control\nconst apiKey = "sk-live-993821038291038";\nconst dbPassword = "super_secret_password";`,
      explanation:
        "Once committed to Git, secrets are compromised even if you delete them in a subsequent commit.",
    },
    good: {
      title: "Reading from process.env",
      code: `// Safe: Reads from external environment\nconst apiKey = process.env.API_KEY;\nif (!apiKey) {\n  throw new Error("Missing required API_KEY environment variable");\n}`,
      explanation:
        "Read variables from process.env and fail fast with a clear error message if mandatory variables are missing.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated environment variables and fallback logic:",
    starterCode: `// Simulating process.env readings\nconst mockEnv = {\n  PORT: "8080",\n  NODE_ENV: "production"\n};\n\nconst port = Number(mockEnv.PORT) || 3000;\nconst environment = mockEnv.NODE_ENV || "development";\n\nconsole.log(\`App running on port \${port} in \${environment} mode\`);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your app works locally but fails because process.env.API_KEY is missing. What should you check?",
      options: [
        "Check whether the variable is set in the environment where the app is running and whether the project loads its environment settings correctly. Never fix this by committing the real secret to Git.",
        "Hardcode the real secret directly into index.js so it works everywhere.",
        "Commit your local .env file to GitHub.",
        "Change the API_KEY variable name to lowercase api_key.",
      ],
      correctIndex: 0,
      explanation:
        "Verify the environment variable is configured in the target runtime. Never commit secrets or production credentials to Git.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Outside Settings",
        desc: "Environment variables give programs external settings that vary between development and production.",
      },
      {
        title: "String Conversion",
        desc: "Values are strings; convert to numbers or booleans when required.",
      },
      {
        title: "Keep Secrets Out of Git",
        desc: "A .env file is only safe if kept out of Git. Never commit real secrets to source control.",
      },
    ],
  },
};
