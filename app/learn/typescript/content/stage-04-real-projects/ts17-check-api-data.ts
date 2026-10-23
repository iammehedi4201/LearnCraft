import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts17CheckApiDataContent: StandardLessonContent = {
  slug: "ts20-check-api-data",
  code: "TS-20",
  title: "Check API Data Before Trusting It",
  subtitle: "Protect your app from runtime mismatches by validating untrusted external data.",
  difficulty: "Difficult",
  scenario: {
    question: "Your app expects an API response to contain `id` and `name`, but the server sometimes sends `id` as text. What could go wrong, and why is a TypeScript type alone not enough to verify the response?",
    answer: "Code may expect `id` to be a number and then fail or behave incorrectly when it receives text. TypeScript checks our code before it runs, but it does not automatically check the real API response. We must validate the data when it arrives.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Check API Data Before Trusting It",
    bigPicture: "TypeScript can describe the data you expect from an API, but it cannot guarantee that the server actually sent that data. Data from outside your application must be checked at runtime before you trust its shape.",
    codeSnippet: "type User = {\n  id: number;\n  name: string;\n};\n\nconst data: unknown = await response.json();\n\nif (\n  typeof data === \"object\" &&\n  data !== null &&\n  \"id\" in data &&\n  typeof data.id === \"number\" &&\n  \"name\" in data &&\n  typeof data.name === \"string\"\n) {\n  const user: User = {\n    id: data.id,\n    name: data.name,\n  };\n  console.log(user.name);\n}",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Compile-Time vs Runtime",
            "desc": "TypeScript checks your code at compile time, but external HTTP responses arrive at runtime."
      },
      {
            "title": "unknown Response Type",
            "desc": "Treating API responses as unknown forces runtime checks before accessing fields."
      },
      {
            "title": "Runtime Guards & Libraries",
            "desc": "Manual checks or validation libraries (like Zod) verify actual incoming data shapes."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "How Runtime Validation Works Step-by-Step",
      "content": "1. Treat the response as `unknown` because its contents have not been checked. 2. Check that it is an object and not `null`. 3. Check that `id` exists and is a number. 4. Check that `name` exists and is a string. 5. After those checks, create a value that matches `User`. For larger apps, a reusable validation function or a validation library can make these checks easier to maintain. Important: `data as User` does not validate an API response."
},
    cards: [
      {
        number: "01",
        tag: "CORE PRINCIPLE",
        title: "Compile-Time vs Runtime",
        description: "TypeScript checks your code at compile time, but external HTTP responses arrive at runtime.",
        color: "purple",
      },
      {
        number: "02",
        tag: "USAGE RULE",
        title: "unknown Response Type",
        description: "Treating API responses as unknown forces runtime checks before accessing fields.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PRACTICAL VALUE",
        title: "Runtime Guards & Libraries",
        description: "Manual checks or validation libraries (like Zod) verify actual incoming data shapes.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
          {
                "title": "1. Types disappear after compilation",
                "content": "TypeScript checks types in your editor and during build, but it does NOT check live data arriving over the internet at runtime."
          },
          {
                "title": "2. Live APIs can change unexpectedly",
                "content": "If an external API server changes its response or sends an error, TypeScript alone cannot stop it."
          },
          {
                "title": "3. Combine types with runtime checks",
                "content": "Use simple `if` checks or validation libraries (like Zod) to verify live data before assuming it matches your type."
          }
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      "title": "Blindly Casting External API Payloads",
      "code": "// Unsafe: if the server returns 404 or { error: 'Unauthorized' }, this crashes!\nconst user = (await res.json()) as User;\nconsole.log(user.name.toUpperCase());",
      "explanation": "Type assertions do not run any JavaScript checks on network data."
},
    good: {
      "title": "Validating Incoming Data Before Use",
      "code": "const data: unknown = await res.json();\nif (\n  typeof data === \"object\" && data !== null &&\n  \"id\" in data && typeof data.id === \"number\" &&\n  \"name\" in data && typeof data.name === \"string\"\n) {\n  const user: User = { id: data.id, name: data.name };\n  console.log(\"Validated user:\", user.name);\n}",
      "explanation": "Verifying properties at runtime guarantees your app never encounters unexpected data structures."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run this TypeScript code live in the editor:",
    starterCode: "// Lesson 17: Check API Data Before Trusting It\ntype User = {\n  id: number;\n  name: string;\n};\n\n// Simulated API response:\nconst rawApiResponse: unknown = { id: 42, name: \"Rina\" };\n\nif (\n  typeof rawApiResponse === \"object\" &&\n  rawApiResponse !== null &&\n  \"id\" in rawApiResponse &&\n  typeof rawApiResponse.id === \"number\" &&\n  \"name\" in rawApiResponse &&\n  typeof rawApiResponse.name === \"string\"\n) {\n  const user: User = {\n    id: rawApiResponse.id,\n    name: rawApiResponse.name,\n  };\n  console.log(\"Safely validated user:\", user.name);\n} else {\n  console.error(\"Invalid API payload received!\");\n}\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Why is `const user = (await res.json()) as User;` insufficient to ensure safe API data?",
      "options": [
            "Because `as User` is a compile-time assertion that does zero runtime validation on what the server actually returned",
            "Because the `as` keyword is slow and delays HTTP requests",
            "Because JSON.parse cannot read TypeScript interfaces",
            "Because fetch does not allow type assertions in JavaScript engines"
      ],
      "correctIndex": 0,
      "explanation": "`as User` only instructs the compiler to trust the type during build; it does not check or sanitize live network payloads at runtime."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Boundary Validation",
            "desc": "Always validate external data from APIs and user input at runtime."
      },
      {
            "title": "as is Not Validation",
            "desc": "Type assertions do not check or sanitize network data."
      },
      {
            "title": "Safe unknown",
            "desc": "Type API responses as unknown until their shape is verified."
      }
],
  },
};
