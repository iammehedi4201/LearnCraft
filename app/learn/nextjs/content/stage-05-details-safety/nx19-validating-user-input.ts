import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx19ValidatingUserInputContent: StandardLessonContent = {
  slug: "nx19-validating-user-input",
  code: "NX-19",
  title: "Validating User Input",
  subtitle: "Validate all form data on the server before mutating databases to prevent corrupted state and exploits.",
  difficulty: "Moderate",
  scenario: {
    question: "A form requires a course title, but someone sends a request directly without using the form. Can you trust the value?",
    answer: "No. Validate the input on the server because requests can bypass browser-side checks.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Validating User Input",
    bigPicture: "Never assume form data is clean or safe just because an HTML input has 'required' or 'minLength' attributes. Anyone can inspect element in DevTools to delete those attributes, or send HTTP POST requests directly using curl or Postman. Server validation is the mandatory security gate that prevents invalid, empty, or malicious data from polluting your database.",
    analogy: "Browser HTML attributes (like 'required') are like a velvet rope in an airport line: polite travelers follow it, but anyone can easily step over it. Server-side validation is the actual metal detector and passport checkpoint: no passenger gets onto the airplane without passing through it.",
    codeSnippet: `// app/actions.ts
"use server";

export async function createCourse(formData: FormData) {
  // 1. Extract raw field value from FormData:
  const rawTitle = formData.get("title");

  // 2. Type-check: ensure the input is actually a string:
  if (typeof rawTitle !== "string") {
    return { ok: false, error: "Title must be a text value." };
  }

  // 3. Trim whitespace and validate business rules:
  const title = rawTitle.trim();
  if (title.length < 3) {
    return { ok: false, error: "Course title must be at least 3 characters long." };
  }
  if (title.length > 80) {
    return { ok: false, error: "Course title cannot exceed 80 characters." };
  }

  // 4. Safe to persist in database:
  const newCourse = await db.course.create({ data: { title } });
  return { ok: true, courseId: newCourse.id };
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. Extract the Raw FormData Entry",
        desc: "Using 'formData.get(\"title\")' extracts whatever the user submitted. In JavaScript, this can be a string, a File object, or null.",
      },
      {
        title: "2. Type Narrowing (typeof !== 'string')",
        desc: "Before calling string methods like .trim() or .length, verify the value is indeed a string. This eliminates runtime TypeError crashes.",
      },
      {
        title: "3. Business Rule Validation & Sanitization",
        desc: "Calling '.trim()' prevents users from submitting titles consisting entirely of blank spaces ('   '). Then check min and max length boundaries.",
      },
      {
        title: "4. Return Structured Feedback Before Persisting",
        desc: "If validation fails, return an early error object ({ ok: false, error: '...' }) to display in the UI. Only proceed to 'db.course.create' when all rules pass.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Server Security Boundary Rule",
      content: "All data originating from users or external APIs must be treated as untrusted and validated on the server before storage.",
    },
    cards: [
      {
        number: "01",
        tag: "DATA INTEGRITY",
        title: "Prevent DB Corruption",
        description: "Stops empty strings, invalid emails, negative prices, and malformed inputs from polluting tables.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CLIENT IS TRIVIAL",
        title: "Bypassable UI",
        description: "HTML required flags can be disabled in DevTools in seconds; server validation cannot be bypassed.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "FEEDBACK",
        title: "Clear Error Messages",
        description: "Returns structured validation error messages so users know exactly which field needs correcting.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to design server input validation:",
    points: [
      {
        title: "1. Type narrowing",
        content: "Check typeof value === 'string' before calling string methods like .trim() or .toLowerCase().",
      },
      {
        title: "2. Boundary and format checks",
        content: "Verify character lengths, number ranges (e.g. price > 0), and patterns like valid email formats.",
      },
      {
        title: "3. Returning friendly error states",
        content: "Return structured error objects like { errors: { title: 'Too short' } } to render next to form inputs.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Relying Exclusively on HTML <input required>",
      code: `// <input type="text" name="title" required minLength={5} />
// In Server Action:
export async function addCourse(formData: FormData) {
  const title = formData.get("title") as string;
  // ❌ Dangerous! Anyone using curl or disabling required in DevTools can send ""!
  await db.course.create({ data: { title } });
}`,
      explanation: "Browser validation can be easily bypassed using curl, Postman, or by editing the DOM in browser DevTools.",
    },
    good: {
      title: "Enforcing Validation on the Server",
      code: `export async function addCourse(formData: FormData) {
  const title = formData.get("title");
  if (typeof title !== "string" || title.trim().length < 5) {
    return { error: "Course title must be at least 5 characters long." };
  }
  // ✅ Safe, validated data
  await db.course.create({ data: { title: title.trim() } });
}`,
      explanation: "Ensures no invalid or empty data can ever enter the database, regardless of client environment.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a reusable server-side validation function:",
    starterCode: `function validateEmail(email: unknown): { ok: boolean; email?: string; error?: string } {
  if (typeof email !== "string") {
    return { ok: false, error: "Email must be a string." };
  }
  const trimmed = email.trim();
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  return { ok: true, email: trimmed.toLowerCase() };
}

console.log(validateEmail("user@example.com")); // { ok: true, email: 'user@example.com' }
console.log(validateEmail("not-an-email"));       // { ok: false, error: '...' }`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is browser-side form validation (such as HTML 'required' attributes) not sufficient on its own?",
      options: [
        "Because HTTP requests can easily be sent directly with curl or modified in browser DevTools to bypass HTML attributes",
        "Because HTML required tags only work on desktop computers",
        "Because JavaScript cannot read form inputs in the browser",
        "Because forms are completely deleted upon submission",
      ],
      correctIndex: 0,
      explanation: "Browser-side validation is a convenience for user experience, but network requests can be forged or modified directly. The server must validate every piece of incoming data.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Never Trust Input",
        desc: "All client input must be treated as untrusted until validated on the server.",
      },
      {
        title: "Sanitize & Trim",
        desc: "Clean string whitespace and ensure numbers fall within sensible business ranges.",
      },
      {
        title: "Structured Errors",
        desc: "Return clear field-specific error messages so users can fix invalid submissions.",
      },
    ],
    nextLessonPreview: {
      title: "Debugging Next.js Problems",
      desc: "Master a practical checklist to identify and fix common App Router errors and build issues.",
    },
  },
};
