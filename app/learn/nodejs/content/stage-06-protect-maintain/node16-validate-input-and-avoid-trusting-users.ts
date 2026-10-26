import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node16ValidateInputAndAvoidTrustingUsersContent: StandardLessonContent = {
  slug: "node16-validate-input-and-avoid-trusting-users",
  code: "NODE-16",
  title: "Validate Input and Avoid Trusting Users",
  subtitle: "Validation checks whether incoming data has the expected shape and values without blindly trusting users.",
  difficulty: "Moderate",
  scenario: {
    question: 'A client sends "admin": true in a request. Should the server trust it?',
    answer: "No. The server must check the logged-in user's identity and permissions itself. A client can change the data it sends.",
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
    title: "Validate Input and Avoid Trusting Users",
    bigPicture:
      "Data received from a user, a request, or an outside service should not be trusted automatically. Validation checks whether the data has the shape and values your app expects.",
    codeSnippet: `function validateAge(value) {
  const age = Number(value);

  if (!Number.isInteger(age) || age < 0 || age > 120) {
    return { valid: false, message: "Enter a valid age." };
  }

  return { valid: true, age };
}

console.log(validateAge("25"));
console.log(validateAge("hello"));`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Type conversion",
        desc: "`Number(value)` tries to turn the input into a number.",
      },
      {
        title: "2. Integer check",
        desc: "`Number.isInteger()` checks that it is a whole number.",
      },
      {
        title: "3. Range validation",
        desc: "The range check rejects negative ages and values over `120`.",
      },
      {
        title: "4. Return validation result",
        desc: "The function returns a clear result describing whether the input is valid.",
      },
    ],
  },
  part2: {
    title: "Validation vs Authorization & Safe Queries",
    intro:
      "This example validates one field. Real requests need validation for all required fields and must still use appropriate security controls for the action. Validation is not a replacement for authorization or safe database queries.",
    rule: {
      title: "Untrusted Client Input Rule",
      content:
        "Clients can manipulate any data they send (parameters, headers, JSON body). Never rely on client-asserted permissions (like `isAdmin: true`). Always validate inputs and independently authorize actions on the server.",
    },
    cards: [
      {
        number: "01",
        tag: "SHAPE & TYPES",
        title: "Input Validation",
        description:
          "Verifies that required fields exist, conform to expected types, and stay within valid bounds.",
        color: "amber",
      },
      {
        number: "02",
        tag: "SECURITY",
        title: "Server Authorization",
        description:
          "Checks the authenticated session or verified JWT token to determine if the user has permission.",
        color: "rose",
      },
      {
        number: "03",
        tag: "DATABASE",
        title: "Parameterized Queries",
        description:
          "Prevent SQL or NoSQL injection by using parameterized inputs alongside schema validation.",
        color: "purple",
      },
    ],
  },
  part3: {
    title: "Scenario & Client-Side Tampering",
    intro: "Why client-supplied privileges must never be trusted directly:",
    points: [
      {
        title: "Client-Side Tampering",
        content:
          "A malicious user can use tools like Postman or cURL to craft requests containing unauthorized role flags (`admin: true`, `role: 'superadmin'`).",
      },
      {
        title: "Server-Controlled State",
        content:
          "User roles must always be loaded from a secure database or cryptographically signed session token managed exclusively by the server.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Blindly passing client request bodies into database update queries without filtering or authorization checks.",
    bad: {
      title: "Blindly Trusting Client Body",
      code: `// Danger: User sends { "admin": true, "name": "Eve" }\napp.post("/profile", (req, res) => {\n  database.updateUser(req.userId, req.body);\n});`,
      explanation:
        "Allows users to elevate their privileges by submitting unauthorized fields.",
    },
    good: {
      title: "Whitelisting Allowed Fields",
      code: `app.post("/profile", (req, res) => {\n  // Safe: Only allow updating safe fields\n  const { name, bio } = req.body;\n  database.updateUser(req.userId, { name, bio });\n});`,
      explanation:
        "Explicitly pick allowed fields and never allow client data to alter permissions.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test validation rules against good and bad inputs:",
    starterCode: `function validateUsername(input) {\n  if (typeof input !== "string") return { valid: false, error: "Must be a string" };\n  const clean = input.trim();\n  if (clean.length < 3 || clean.length > 20) return { valid: false, error: "Length must be 3-20 chars" };\n  return { valid: true, username: clean };\n}\n\nconsole.log(validateUsername("  Alex99  "));\nconsole.log(validateUsername(""));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: 'A client sends "admin": true in a request. Should the server trust it?',
      options: [
        "No. The server must check the logged-in user's identity and permissions itself. A client can change the data it sends.",
        "Yes, as long as the request comes over an HTTPS connection.",
        "Yes, modern browsers prevent users from modifying HTTP request bodies.",
        "No, but only if the user is using Internet Explorer.",
      ],
      correctIndex: 0,
      explanation:
        "Clients can modify any data they transmit. The server must verify user identity and permissions independently.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Never Trust Input",
        desc: "Data from users or external services should not be trusted automatically.",
      },
      {
        title: "Validate Shape and Type",
        desc: "Check that incoming data has the expected types, lengths, and valid ranges.",
      },
      {
        title: "Authorization on Server",
        desc: "Validation is not authorization; the server must check user permissions itself.",
      },
    ],
  },
};
