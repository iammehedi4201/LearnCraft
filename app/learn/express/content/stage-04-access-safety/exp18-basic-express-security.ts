import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp18BasicExpressSecurityContent: StandardLessonContent = {
  slug: "exp18-basic-express-security",
  code: "EXP-18",
  title: "Basic Express Security",
  subtitle: "Harden your Express server against common web vulnerabilities using security headers, safe secrets, and input sanitation.",
  difficulty: "Moderate",
  scenario: {
    question: "Your API key is written directly in a file that you committed to a public repository. What should you do?",
    answer: "Remove the key from the code, move it to a secure environment variable, and rotate the exposed key. Deleting it from the latest file alone may not remove it from version history.",
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
    title: "Basic Express Security",
    bigPicture:
      "An API must treat client input as untrusted and avoid exposing secret information. Useful starting points include validating input, using HTTPS in production, keeping dependencies updated, limiting repeated login attempts where appropriate, and setting security headers with tools such as Helmet.",
    codeSnippet: `const helmet = require('helmet');
app.use(helmet());`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Install package",
        desc: "Install Helmet before using this example.",
      },
      {
        title: "2. Set HTTP headers",
        desc: "It sets several security-related HTTP headers automatically (Content-Security-Policy, X-Frame-Options, etc.).",
      },
      {
        title: "3. Defense in depth",
        desc: "It does not replace authentication, validation, safe database queries, or HTTPS.",
      },
    ],
  },
  part2: {
    title: "Why Defense in Depth Matters",
    intro:
      "Install Helmet before using this example. It sets several security-related HTTP headers. It does not replace authentication, validation, safe database queries, or HTTPS.\n\nNever send private keys or detailed internal errors to the frontend. Store secrets in environment variables and keep them out of source control.",
    rule: {
      title: "Secrets Hygiene Rule",
      content:
        "Never commit secrets, tokens, or private keys to git. If a secret is committed, immediately rotate/revoke the key, as git history preserves the commit indefinitely.",
    },
    cards: [
      {
        number: "01",
        tag: "HELMET",
        title: "Security Headers",
        description:
          "Hides `X-Powered-By: Express` and configures defense headers against clickjacking, sniffing, and XSS.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SECRETS",
        title: "Environment Variables",
        description:
          "Store database credentials, JWT secrets, and API keys strictly in environment variables.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RATE LIMITING",
        title: "Brute-Force Protection",
        description:
          "Limit repeated login attempts and spam requests using rate-limiting middleware.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Incident Response",
    intro: "Managing security breaches and securing credentials:",
    points: [
      {
        title: "Leaked API Key Remediation",
        content:
          "Merely deleting the key in a subsequent git commit leaves it visible in history. You must rotate the key immediately with your provider, purge git history if possible, and load secrets via process.env.",
      },
      {
        title: "HTTPS Enforcement",
        content:
          "Always terminate TLS/HTTPS in production so plaintext credentials and tokens are not intercepted over public networks.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Hardcoding secrets in source files or thinking helmet() alone makes an application fully secure.",
    bad: {
      title: "Hardcoded API Key",
      code: `// Danger: Hardcoded secret in repository!\nconst STRIPE_SECRET = "sk_live_9381029384019238";`,
      explanation:
        "Bots actively scrape public repositories for leaked secrets within seconds of a commit.",
    },
    good: {
      title: "Environment Variable Reference",
      code: `const stripeSecret = process.env.STRIPE_SECRET;\nif (!stripeSecret) throw new Error("STRIPE_SECRET is not configured");`,
      explanation:
        "Secrets are loaded dynamically at runtime without being checked into source control.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated security headers applied to responses:",
    starterCode: `const mockHeaders = {};\nfunction applySecurityHeaders(headers) {\n  headers['X-Content-Type-Options'] = 'nosniff';\n  headers['X-Frame-Options'] = 'DENY';\n  delete headers['X-Powered-By'];\n}\n\napplySecurityHeaders(mockHeaders);\nconsole.log("Applied security headers:", mockHeaders);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your API key is written directly in a file that you committed to a public repository. What should you do?",
      options: [
        "Remove the key from the code, move it to a secure environment variable, and rotate the exposed key. Deleting it from the latest file alone may not remove it from version history.",
        "Nothing, commit history cannot be viewed by other developers.",
        "Just delete the file in a new commit and the key is permanently safe.",
        "Change the project name so no one notices.",
      ],
      correctIndex: 0,
      explanation:
        "Git stores all historical revisions. You must immediately rotate the exposed key and store future secrets in environment variables.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Helmet Middleware",
        desc: "Sets standard HTTP security headers to protect against common web attacks.",
      },
      {
        title: "Secrets Isolation",
        desc: "Keep API keys and tokens in environment variables, never hardcoded in source control.",
      },
      {
        title: "Defense in Depth",
        desc: "Combine headers, input validation, HTTPS, and rate limiting for complete protection.",
      },
    ],
  },
};
