import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx18AuthenticationAndAuthorizationContent: StandardLessonContent = {
  slug: "nx18-authentication-and-authorization",
  code: "NX-18",
  title: "Authentication and Authorization",
  subtitle: "Understand the vital security distinction between identifying a user and verifying their permissions.",
  difficulty: "Difficult",
  scenario: {
    question: "A normal user changes the URL to an admin page. You already hide the admin link from normal users. Is that enough?",
    answer: "No. Hiding a link only changes what the user sees. The server must still check the user's permission before returning protected data or allowing an admin action.",
  },
  interviewQuestion: {
    question: "What is the difference between authentication and authorization?",
    answer: "Authentication checks who the user is. Authorization checks what that user is allowed to do.",
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
    title: "Authentication and Authorization",
    bigPicture: "Authentication and Authorization represent two distinct security checks. Authentication answers 'Who is this user?' (e.g. have they signed in?). Authorization answers 'What is this user allowed to do?' (e.g. can they delete this specific course?). Showing or hiding a button in the UI is never enough; the server must verify permissions on every request.",
    codeSnippet: `// app/actions.ts
"use server";

export async function deleteCourse(courseId: string) {
  // Step 1: Authentication — Who is making this request?
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must sign in.");
  }

  // Step 2: Authorization — Can this specific user delete this course?
  const isAllowed = await userCanDeleteCourse(user.id, courseId);
  if (!isAllowed) {
    throw new Error("You do not have permission to delete this course.");
  }

  // Step 3: Perform the action safely
  await removeCourse(courseId);
}`,
    breakdownTitle: "Security Pillars",
    breakdownItems: [
      {
        title: "1. Authentication (AuthN)",
        desc: "Verifying user identity via session cookies, passwords, OAuth providers, or JWT tokens.",
      },
      {
        title: "2. Authorization (AuthZ)",
        desc: "Verifying whether the authenticated user has roles or ownership permissions to perform the requested operation.",
      },
      {
        title: "3. Server Enforcement",
        desc: "All permission rules must be enforced strictly on the server in Server Components, Actions, and Route Handlers.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Defense in Depth Rule",
      content: "Never rely on client-side conditional rendering for security. Always authenticate and authorize operations on the server.",
    },
    cards: [
      {
        number: "01",
        tag: "IDENTITY",
        title: "Authentication (AuthN)",
        description: "Confirms identity. Ensures that requests originate from a verified, registered account.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PERMISSIONS",
        title: "Authorization (AuthZ)",
        description: "Controls access to resources. Being logged in does not mean a user can edit another person's data.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SERVER FIRST",
        title: "Server Enforcement",
        description: "Attackers can bypass browser UI controls completely; only server-side checks stop unauthorized actions.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to protect routes and mutations step by step:",
    points: [
      {
        title: "1. Incoming request arrives",
        content: "A user navigates to a protected route or invokes a Server Action to modify a database record.",
      },
      {
        title: "2. Identifying the session",
        content: "The server checks the incoming request session cookie. If missing or expired, it redirects to the login page.",
      },
      {
        title: "3. Permission verification",
        content: "The server queries whether user.role === 'ADMIN' or course.ownerId === user.id before running any database updates.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Hiding UI Elements Without Server Checks",
      code: `// In a Client Component:
{user.isAdmin && <button onClick={deleteCourse}>Delete</button>}
// But in app/actions.ts:
export async function deleteCourse(id: string) {
  // ❌ NO PERMISSION CHECK!
  // Any regular user can send a POST request directly to delete courses!
  await db.course.delete({ where: { id } });
}`,
      explanation: "Security by obscurity fails immediately. Hiding a button does not stop users from sending HTTP requests directly.",
    },
    good: {
      title: "Full Server-Side Permission Verification",
      code: `"use server";

export async function deleteCourse(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const course = await db.course.findUnique({ where: { id: courseId } });
  if (!course || course.authorId !== session.user.id) {
    throw new Error("Forbidden: You do not own this course");
  }

  await db.course.delete({ where: { id: courseId } });
  return { success: true };
}`,
      explanation: "Guarantees that only the genuine owner can delete the resource, regardless of how the request was sent.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how an authorization guard function evaluates access:",
    starterCode: `// Conceptual authorization checker
interface User {
  id: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

function canEditCourse(user: User, courseAuthorId: string): boolean {
  if (user.role === "ADMIN") return true; // Admins can edit anything
  if (user.role === "INSTRUCTOR" && user.id === courseAuthorId) return true; // Author can edit
  return false;
}

const student: User = { id: "u_1", role: "STUDENT" };
const author: User = { id: "u_2", role: "INSTRUCTOR" };

console.log("Student can edit course u_2:", canEditCourse(student, "u_2")); // false
console.log("Author can edit course u_2:", canEditCourse(author, "u_2"));   // true`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which of the following describes Authorization (as opposed to Authentication)?",
      options: [
        "Verifying whether a signed-in user has permission to edit or delete a specific resource",
        "Checking whether the user typed the correct password during login",
        "Validating that an email address has an '@' symbol",
        "Encrypting a hard drive with BitLocker",
      ],
      correctIndex: 0,
      explanation: "Authentication proves identity ('Who are you?'), while Authorization verifies permissions ('Are you allowed to do this?').",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "AuthN vs AuthZ",
        desc: "Authentication verifies identity; authorization verifies permissions.",
      },
      {
        title: "Server Enforcement",
        desc: "Never rely on hiding UI buttons; always check permissions in server code.",
      },
      {
        title: "Defense in Depth",
        desc: "Combine route guards with granular entity ownership checks in Server Actions.",
      },
    ],
    nextLessonPreview: {
      title: "Validating User Input",
      desc: "Learn why browser validation is not enough and how to validate form data strictly on the server.",
    },
  },
};
