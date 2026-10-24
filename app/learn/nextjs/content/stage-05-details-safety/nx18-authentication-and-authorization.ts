import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx18AuthenticationAndAuthorizationContent: StandardLessonContent = {
  slug: "nx18-authentication-and-authorization",
  code: "NX-18",
  title: "Authentication and Authorization",
  subtitle: "Understand the vital security distinction between identifying a user (AuthN) and verifying their permissions (AuthZ).",
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
    bigPicture: "Think of Authentication like showing your passport at the airport (it proves WHO you are). Authorization is like your boarding pass (it proves WHERE you are allowed to go). Just because someone is logged into your website does NOT mean they have permission to edit someone else's account! Hiding a button in the browser is only visual; the server must verify permissions on every single request.",
    codeSnippet: `// app/actions.ts
"use server";

export async function deleteCourseAction(courseId: string) {
  // Step 1: AUTHENTICATION (Who are you?)
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You must log in first.");
  }

  // Step 2: AUTHORIZATION (Are you allowed to delete this specific course?)
  // Check if the user is an admin OR the original creator of this course:
  const course = await db.course.findUnique({ where: { id: courseId } });
  if (!course) {
    throw new Error("Course not found.");
  }

  if (course.authorId !== user.id && user.role !== "ADMIN") {
    throw new Error("Access Denied: You do not own this course!");
  }

  // Step 3: Now it is safe to delete
  await db.course.delete({ where: { id: courseId } });
  return { success: true };
}`,
    breakdownTitle: "The Two Security Checks Step by Step",
    breakdownItems: [
      {
        title: "1. Authentication (AuthN) — Identity",
        desc: "Verifies the session or token. If user is null, stop immediately. The visitor has not signed in.",
      },
      {
        title: "2. Authorization (AuthZ) — Permission",
        desc: "Verifies resource ownership or role. Even though the user is logged in, do they actually own this specific record?",
      },
      {
        title: "3. Server Enforcement",
        desc: "Never rely on hiding buttons in HTML. Hackers can open DevTools or curl and send requests directly. Only server checks protect your database.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Server-Side Security Rule",
      content: "Hiding a button in the UI is just for user experience, NOT security. Every Server Component, Server Action, and Route Handler must independently verify user permissions.",
    },
    cards: [
      {
        number: "01",
        tag: "PASSPORT",
        title: "Authentication (AuthN)",
        description: "Answers: 'Who is this user?' Confirms identity through passwords, GitHub OAuth, or session cookies.",
        color: "purple",
      },
      {
        number: "02",
        tag: "BOARDING PASS",
        title: "Authorization (AuthZ)",
        description: "Answers: 'What can they do?' Confirms whether an authenticated user has permission to view or edit this resource.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "NO UI SECURITY",
        title: "Never Trust Client UI",
        description: "Hiding an 'Admin Settings' link in React stops honest users, but attackers can simply type the URL /admin directly.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "How to protect both pages and actions in Next.js:",
    points: [
      {
        title: "1. Protecting Pages (Server Components)",
        content: "In app/admin/page.tsx, read the session at the top: const session = await auth(); if (!session?.user?.isAdmin) redirect('/login').",
      },
      {
        title: "2. Protecting Server Actions (Mutations)",
        content: "Always check user.id === record.authorId inside your Server Action before calling db.update() or db.delete().",
      },
      {
        title: "3. Middleware for Edge redirects",
        content: "Use middleware.ts to redirect unauthenticated visitors away from entire folder sections like /dashboard/* before they even reach the server.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Relying on Hiding UI Buttons for Security",
      code: `// ❌ DANGEROUS MISTAKE: Hiding the button in the UI only!
// app/courses/page.tsx (Client UI)
{user.isAdmin && <button onClick={() => deleteCourse(id)}>Delete</button>}

// app/actions.ts (Server Action)
"use server";
export async function deleteCourse(id: string) {
  // 💥 DISASTER: No server-side check!
  // Any regular student can open DevTools console and run:
  // deleteCourse("123") and delete any course on the site!
  await db.course.delete({ where: { id } });
}`,
      explanation: "Anyone with DevTools or Postman can call the Server Action directly, bypassing your hidden button completely.",
    },
    good: {
      title: "Enforcing Authorization Inside the Server Action",
      code: `// ✅ SECURE: Server Action validates permissions every time!
"use server";

export async function deleteCourse(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Please log in.");

  // Check role or ownership on the server:
  if (session.user.role !== "ADMIN") {
    throw new Error("Access Denied: Admins only.");
  }

  await db.course.delete({ where: { id } });
}`,
      explanation: "Even if an attacker attempts to call the action directly, the server verifies their role and denies the request.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how a protected server action checks both authentication and role authorization:",
    starterCode: `// app/actions.ts
"use server";

type MockUser = { id: string; name: string; role: "STUDENT" | "INSTRUCTOR" | "ADMIN" };

export async function updateGradesAction(studentId: string, grade: string) {
  // Simulated logged-in user:
  const currentUser: MockUser = { id: "user-1", name: "Alex", role: "STUDENT" };

  // Step 1: AuthN Check
  if (!currentUser) {
    return { error: "Authentication required." };
  }

  // Step 2: AuthZ Check
  if (currentUser.role !== "INSTRUCTOR" && currentUser.role !== "ADMIN") {
    return { error: "Authorization failed: Only instructors can enter grades!" };
  }

  return { success: true, message: "Grade updated successfully." };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the difference between authentication and authorization in web security?",
      options: [
        "Authentication checks who the user is; authorization checks what that user is allowed to do",
        "Authentication is only for mobile phones, while authorization is for desktop browsers",
        "There is no difference; they are exact synonyms",
        "Authentication is for CSS styling, and authorization is for HTML tags",
      ],
      correctIndex: 0,
      explanation: "Authentication establishes and verifies identity (who you are), while authorization verifies permissions and access control (what you can do).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "AuthN = Who",
        desc: "Authentication verifies user identity via login credentials or session tokens.",
      },
      {
        title: "AuthZ = What",
        desc: "Authorization verifies whether an identified user is allowed to perform a specific action.",
      },
      {
        title: "Server Is Final Authority",
        desc: "Never rely on hiding UI buttons; always enforce authorization in Server Components and Actions.",
      },
    ],
    nextLessonPreview: {
      title: "Validating User Input",
      desc: "Learn how to validate form data on the server to prevent database corruption and malicious exploits.",
    },
  },
};
