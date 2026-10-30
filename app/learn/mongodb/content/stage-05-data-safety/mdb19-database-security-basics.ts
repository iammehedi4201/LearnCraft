import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb19DatabaseSecurityBasicsContent: StandardLessonContent = {
  slug: "mdb19-database-security-basics",
  code: "MDB-19",
  title: "Database Security Basics",
  subtitle: "Protect sensitive data using authentication, least-privilege RBAC, environment secrets, and network isolation.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer puts a MongoDB password directly into a public GitHub repository. What is the problem?",
    answer: "Anyone who can see the code may get the password and access the database. The developer should remove the exposed secret, rotate the password, and load the new value from a secure environment variable.",
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
    title: "Database Security Basics",
    bigPicture:
      "A database can contain private information, so access must be controlled.\n\nRemember these basic rules:\n- Require authentication so users and applications must prove who they are.\n- Give each database user only the permissions they need.\n- Keep database passwords and connection strings out of public source code.\n- Do not expose database credentials in browser code or public repositories.\n- Restrict network access to trusted application servers where possible.\n- Use encrypted connections when supported by the deployment.",
    codeSnippet: `// Reading database connection string securely from environment (illustrative):
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing");
}

// This example reads a secret that was configured outside the source code.
// It does not connect to MongoDB by itself.`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Environment variable isolation",
        desc: "Credentials live in `.env` files or secret managers that are never committed to version control.",
      },
      {
        title: "2. Startup validation",
        desc: "Check for the presence of the environment variable on server boot; fail fast if missing.",
      },
      {
        title: "3. Role-Based Access Control (RBAC)",
        desc: "Grant application users minimum necessary roles (e.g. `readWrite` on `learncraft` instead of `root`).",
      },
      {
        title: "4. Network whitelisting",
        desc: "Restrict network ingress to trusted backend IPs or VPCs, never opening `0.0.0.0/0` publicly.",
      },
    ],
  },
  part2: {
    title: "Why Security Matters",
    intro:
      "If database credentials are exposed, someone else may be able to read, change, or delete your data.",
    rule: {
      title: "Least Privilege & Secret Isolation Rule",
      content:
        "Never hardcode credentials or connect strings in source code. Assign dedicated database users with the least privilege necessary, require TLS encryption in transit, and isolate network access.",
    },
    cards: [
      {
        number: "01",
        tag: "SECRETS",
        title: "No Hardcoded Secrets",
        color: "rose",
        description:
          "Add `.env` and credential files to `.gitignore`. Use secret vaults in CI/CD and deployment environments.",
      },
      {
        number: "02",
        tag: "RBAC",
        title: "Least Privilege Roles",
        color: "amber",
        description:
          "Create specific users with `readWrite` scoped strictly to the application database. Never run production apps as `root`.",
      },
      {
        number: "03",
        tag: "NETWORK",
        title: "Network Restrictions & TLS",
        color: "emerald",
        description:
          "Bind to internal private VPC subnets and enforce TLS 1.3 encryption on connection strings (`mongodb+srv://...`).",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Securing connections in enterprise deployments:",
    points: [
      {
        title: "Credential Leak Remediation",
        content:
          "If an API connection string is accidentally committed, immediately revoke and rotate the credentials on the MongoDB cluster, invalidate the Git history, and reload the secret from environment variables.",
      },
      {
        title: "Separate Read-Only Analytics Users",
        content:
          "Data analysts and reporting tools should connect with a `read` role user on specific collections, preventing any chance of accidental data corruption.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Hardcoding MongoDB connection strings with plaintext passwords in client-side code or public Git repositories.",
    bad: {
      title: "Hardcoding Secrets in Source Code",
      code: `// Severe security risk: hardcoded credentials committed to Git!
const uri = "mongodb+srv://admin:MyPassword123@cluster0.abc.mongodb.net/prod";
// If pushed to GitHub, bots will scrape the password within seconds!`,
      explanation:
        "Public repositories are actively crawled by automated bots that extract exposed credentials to ransom or delete databases.",
    },
    good: {
      title: "Loading from Process Environment Variables",
      code: `// Safe: environment variable loaded at runtime
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable must be defined");
}
// .env is safely excluded via .gitignore`,
      explanation:
        "Externalizing configuration keeps sensitive secrets out of version control and allows different credentials per environment.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of safe environment configuration parsing:",
    starterCode: `// Simulating secure environment configuration parsing
function loadMongoConfig(envVars) {
  const uri = envVars.MONGODB_URI;
  if (!uri) {
    throw new Error("FATAL: MONGODB_URI is missing from environment!");
  }

  // Mask password for safe logging
  const maskedUri = uri.replace(/:(.*)@/, ":*****@");
  return {
    uri,
    maskedUri,
    isSecure: uri.startsWith("mongodb+srv://") || uri.includes("ssl=true")
  };
}

try {
  const config = loadMongoConfig({
    MONGODB_URI: "mongodb+srv://app_user:s3cr3tP@ss@cluster0.mongodb.net/learncraft"
  });
  console.log("Database initialized safely.");
  console.log("Safe log uri:", config.maskedUri);
  console.log("TLS Enabled:", config.isSecure);
} catch (err) {
  console.error(err.message);
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A developer puts a MongoDB password directly into a public GitHub repository. What is the problem?",
      options: [
        "Anyone who can see the code may get the password and access the database. The developer should remove the exposed secret, rotate the password, and load the new value from a secure environment variable.",
        "There is no problem because public passwords make it easier for team members to collaborate.",
        "GitHub automatically encrypts all passwords in code files without any configuration.",
        "MongoDB automatically renames the database to prevent logins.",
      ],
      correctIndex: 0,
      explanation:
        "Hardcoded credentials in repositories can be read by anyone. The secret must be revoked, rotated, and managed through private environment variables.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Environment Variables",
        desc: "Always load database URIs and secrets from external environment variables, never hardcoded strings.",
      },
      {
        title: "Least Privilege RBAC",
        desc: "Assign minimal required roles to application users rather than sharing root accounts.",
      },
      {
        title: "Network and TLS",
        desc: "Enforce encrypted connections and whitelist IP access to protected VPCs.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 20: Backups, Replication, and Scaling - The Basic Idea",
      desc: "Complete the curriculum with essential high-availability concepts: backups, replica sets, and sharding.",
    },
  },
};

