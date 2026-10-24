import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx12FormsAndServerActionsContent: StandardLessonContent = {
  slug: "nx12-forms-and-server-actions",
  code: "NX-12",
  title: "Forms and Server Actions",
  subtitle: "A Server Action is a backend function you attach directly to a form. Next.js runs it on the server when submitted — no API routes or fetch() needed!",
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
    bigPicture: "In traditional React, saving form data required creating a separate API endpoint (/api/courses), adding onSubmit to your form, calling e.preventDefault(), and writing a manual fetch() request. In Next.js, a Server Action lets you write a normal async server function with 'use server' and pass it directly to <form action={saveCourse}>. Next.js handles the network communication automatically!",
    codeSnippet: `// 1. app/actions.ts — The Server Action
"use server";

export async function saveCourse(formData: FormData) {
  // Read the input value using the input's "name" attribute:
  const title = formData.get("title");

  // Step 1: Always validate the input!
  if (typeof title !== "string" || title.trim() === "") {
    return { error: "Please enter a course title." };
  }

  // Step 2: Check user permission and save to database:
  console.log("Saving course title on the server:", title);
  return { success: true };
}

// 2. app/courses/new/page.tsx — The Form
import { saveCourse } from "@/app/actions";

export default function NewCourseForm() {
  // Pass the server action directly to the form's action prop!
  return (
    <form action={saveCourse}>
      <label htmlFor="title">Course Title</label>
      <input id="title" name="title" placeholder="e.g. Next.js App Router" />
      <button type="submit">Save Course</button>
    </form>
  );
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. The 'use server' Directive",
        desc: "Marks the function so Next.js knows it must execute strictly on your Node.js server, never in the browser.",
      },
      {
        title: "2. <form action={saveCourse}>",
        desc: "When the user clicks submit, Next.js intercepts the form submission and automatically sends a POST request behind the scenes.",
      },
      {
        title: "3. FormData Extraction",
        desc: "Your action receives a standard FormData object. You extract values with formData.get('inputName') and validate them before saving.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Server Action Security Rule",
      content: "Treat every Server Action as a public door: anyone with DevTools can trigger it! Always verify who the user is (authentication), check if they have permission (authorization), and validate all inputs.",
    },
    cards: [
      {
        number: "01",
        tag: "NO API BOILERPLATE",
        title: "No Manual API Routes",
        description: "You do not need to create route.ts files or write manual fetch('/api/...') POST handlers for simple form submissions.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PROGRESSIVE",
        title: "Works Instantly",
        description: "HTML forms connected to Server Actions can submit even on slow connections before heavy client JavaScript finishes downloading.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SECURITY",
        title: "Mandatory Validation",
        description: "Never trust raw incoming form data. Always check user ownership and sanitize field lengths before touching your database.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Follow these 3 simple rules whenever you write a Server Action:",
    points: [
      {
        title: "1. Reading vs Writing Data",
        content: "Use Server Components (Lesson 8) to READ data. Use Server Actions (Lesson 12) to WRITE or CHANGE data (create, update, delete).",
      },
      {
        title: "2. Input Name Matching",
        content: "Make sure your form input has a name attribute: <input name='email' />. In your action, read it with formData.get('email').",
      },
      {
        title: "3. Check Permissions (Not Just Logged In)",
        content: "Being logged in is not enough! If user Bob submits a form with courseId=42, verify that Bob actually owns course 42 before saving.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Insecure: Trusting User Inputs and Hidden IDs Blindly",
      code: `// ❌ INSECURE: Anyone can send any ID to edit someone else's data!
"use server";

export async function updateCourse(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");

  // DANGER: No authentication check!
  // DANGER: Anyone can pass id="999" and overwrite other users' courses!
  // DANGER: No check if title is empty!
  await db.course.update({
    where: { id: String(id) },
    data: { title: String(title) },
  });
}`,
      explanation: "Never trust incoming IDs or inputs blindly. A user could open browser DevTools, change the hidden ID to another course, and overwrite it.",
    },
    good: {
      title: "Secure: Authenticate User + Verify Ownership + Validate Input",
      code: `// ✅ SECURE: Authenticate user, check ownership, validate input
"use server";

export async function updateCourse(formData: FormData) {
  // 1. Verify who is calling this action
  const user = await getCurrentUser();
  if (!user) throw new Error("You must be logged in.");

  // 2. Validate the input fields
  const id = formData.get("id");
  const title = formData.get("title");
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Course title cannot be empty.");
  }

  // 3. Ensure the logged-in user owns this specific course
  await db.course.update({
    where: { id: String(id), authorId: user.id },
    data: { title: title.trim() },
  });
}`,
      explanation: "Verify user identity, enforce that they own the record, and validate input types before saving any changes to the database.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Here is a complete, working pattern showing the Server Action and the Form working together:",
    starterCode: `// app/actions.ts
"use server";

export async function addCommentAction(formData: FormData) {
  const author = formData.get("author");
  const comment = formData.get("comment");

  if (!author || !comment) {
    return { error: "Both author and comment are required." };
  }

  // Simulated database insert:
  console.log("New comment saved:", { author, comment });
  return { success: true };
}

// app/page.tsx
export default function CommentBox() {
  return (
    <form action={addCommentAction} style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "320px" }}>
      <label>Your Name:</label>
      <input name="author" placeholder="Jane Doe" required />

      <label>Comment:</label>
      <textarea name="comment" placeholder="Write feedback..." required />

      <button type="submit">Submit Feedback</button>
    </form>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is a Server Action used for, and what security check must it include?",
      options: [
        "A Server Action handles work like form submissions on the server, and it must validate inputs and verify user permissions",
        "A Server Action is only used for styling CSS animations in the browser",
        "A Server Action deletes the database when a user logs out",
        "A Server Action is a paid third-party plugin from Amazon",
      ],
      correctIndex: 0,
      explanation: "Server Actions execute on the server to handle form submissions and data mutations. Because anyone can call them, you must authenticate the user, verify permissions, and validate inputs.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Direct Form Binding",
        desc: "Pass server functions directly to <form action={myAction}> without manual fetch() or API endpoints.",
      },
      {
        title: "Server-Side Execution",
        desc: "Mark files or functions with 'use server' to ensure they execute safely on the server.",
      },
      {
        title: "Validate Everything",
        desc: "Treat Server Actions as public endpoints: always authenticate the user, check permissions, and validate input fields.",
      },
    ],
    nextLessonPreview: {
      title: "Route Handlers",
      desc: "Learn when to use custom HTTP REST endpoints in route.ts instead of Server Actions.",
    },
  },
};
