import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx12FormsAndServerActionsContent: StandardLessonContent = {
  slug: "nx12-forms-and-server-actions",
  code: "NX-12",
  title: "Forms and Server Actions",
  subtitle: "Execute server-side mutations securely from forms without writing boilerplate API route handlers.",
  difficulty: "Difficult",
  scenario: {
    question: "A logged-in user submits a form to rename a course. What must the Server Action check before saving the new name?",
    answer: "It must validate the new name and check that this user is allowed to rename that course. Being logged in does not automatically mean the user has permission to change every course.",
  },
  interviewQuestion: {
    question: "What is a Server Action used for, and what security check must it include?",
    answer: "A Server Action runs on the server to handle work such as form submissions and data changes. It must validate the input and check the user's permission before changing data.",
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
    title: "Forms and Server Actions",
    bigPicture: "A Server Action is an async function that runs on the server. It can process a form submission, validate the input, and save changes. It must be treated as a server endpoint: check who is allowed to use it and validate the data.",
    codeSnippet: `// app/actions.ts
"use server";

export async function saveCourse(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || title.trim() === "") {
    return { error: "Enter a course title." };
  }

  // Validate the user's permission and save the title here.
  return { success: true };
}

// app/courses/new/page.tsx
import { saveCourse } from "@/app/actions";

export default function NewCourseForm() {
  return (
    <form action={saveCourse}>
      <label htmlFor="title">Course title</label>
      <input id="title" name="title" />
      <button type="submit">Save course</button>
    </form>
  );
}`,
    breakdownTitle: "Step-by-Step Execution",
    breakdownItems: [
      {
        title: "1. Form Submission",
        desc: "The user fills out the form and clicks submit. The form action invokes the Server Action.",
      },
      {
        title: "2. Server-Side Execution",
        desc: "Next.js sends a POST request behind the scenes, running saveCourse entirely on the server.",
      },
      {
        title: "3. Validation & Authorization",
        desc: "The action validates input fields and verifies that the calling user has permission to perform this update.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Server Action Security Rule",
      content: "Treat every Server Action as a public HTTP endpoint: always authenticate the user, check authorization permissions, and validate all inputs.",
    },
    cards: [
      {
        number: "01",
        tag: "NO API BOILERPLATE",
        title: "Direct Mutation",
        description: "Invoke server code directly from form actions without defining manual REST endpoints or fetching with Axios.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PROGRESSIVE",
        title: "Progressive Enhancement",
        description: "Forms wired to Server Actions can submit even before client JavaScript finishes downloading.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SECURITY CRITICAL",
        title: "Auth & Validation",
        description: "Never trust raw incoming form data; verify user ownership and sanitize fields before updating records.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to design safe, robust Server Actions:",
    points: [
      {
        title: "1. The 'use server' directive",
        content: "Place 'use server' at the top of an actions file or function body. This marks the exported functions as callable server endpoints.",
      },
      {
        title: "2. Input extraction and validation",
        content: "Extract fields via formData.get('fieldName') and check types and lengths before touching your database.",
      },
      {
        title: "3. Session & role verification",
        content: "Verify that the authenticated user actually owns the target entity. Never allow users to mutate arbitrary records by ID alone.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Trusting User Input and Authentication Blindly",
      code: `"use server";
export async function updateCourse(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  // ❌ Security vulnerability: Anyone can send any ID!
  // No auth check, no permission check, no string validation!
  await db.course.update({ where: { id }, data: { title } });
}`,
      explanation: "Without authorization and validation, any malicious user can forge requests to modify or delete other users' courses.",
    },
    good: {
      title: "Strict Validation & Authorization Checks",
      code: `"use server";
export async function updateCourse(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title");
  if (typeof title !== "string" || title.trim().length < 3) {
    return { error: "Title must be at least 3 characters." };
  }

  const isOwner = await checkCourseOwnership(user.id, formData.get("id"));
  if (!isOwner) throw new Error("Forbidden");

  await db.course.update({ where: { id: formData.get("id") }, data: { title } });
  return { success: true };
}`,
      explanation: "Verifies user identity, checks ownership permission, and validates input bounds before mutating data.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how a Server Action handles form data:",
    starterCode: `// app/actions.ts
"use server";

export async function createCourseAction(prevState: any, formData: FormData) {
  const title = formData.get("courseTitle");

  if (!title || typeof title !== "string" || title.trim() === "") {
    return { error: "Please enter a non-empty course title." };
  }

  // Simulate server database creation:
  console.log("Saving course to DB:", title);
  return { success: true, message: \`Course "\${title}" saved successfully!\` };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why must a Server Action always verify user permissions, even if the edit button is hidden from unauthorized users in the UI?",
      options: [
        "Because anyone can inspect network calls or forge HTTP POST requests directly to the Server Action endpoint",
        "Because Server Actions only work when the user is logged out",
        "Because Next.js deletes hidden buttons from the browser memory",
        "Because HTML forms cannot send text strings",
      ],
      correctIndex: 0,
      explanation: "Hiding a button in the UI is cosmetic. Server Actions are public network endpoints, so they must authenticate and authorize every request independently on the server.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Direct Server Mutations",
        desc: "Server Actions execute on the server and handle form submissions directly.",
      },
      {
        title: "Treat as Public Endpoints",
        desc: "Always validate input and verify user permissions inside every action.",
      },
      {
        title: "use server Directive",
        desc: "Declare 'use server' to expose async functions as callable mutation handlers.",
      },
    ],
    nextLessonPreview: {
      title: "Route Handlers",
      desc: "Learn when to use REST API route handlers in route.ts for external webhooks and custom HTTP responses.",
    },
  },
};
