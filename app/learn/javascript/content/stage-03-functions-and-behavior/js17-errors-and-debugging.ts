import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js17ErrorsAndDebuggingContent: StandardLessonContent = {
  slug: "js17-errors-and-debugging",
  code: "JS-17",
  title: "Errors and Debugging",
  subtitle: "Catch, inspect, and handle errors predictably using Error objects and try/catch.",
  difficulty: "Moderate",
  scenario: {
    question: "Your page crashes because code tries to read name from undefined. What should you investigate first?",
    answer: "Find where that value comes from and why it is missing. Then decide whether to provide a value, check for a missing user, or handle the error. Do not just hide the error without fixing its cause.",
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
    title: "Errors and Debugging",
    bigPicture: "An error means something went wrong. The error message and stack trace can help you find where it happened. Do not fix an error by changing code at random; check the value, line, and reason first.",
    codeSnippet: "function getUserName(user) {\n  if (!user) {\n    throw new Error(\"User is required\");\n  }\n\n  return user.name;\n}\n\nconsole.log(getUserName({ name: \"Rina\" })); // Rina",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "try...catch",
            "desc": "Wraps hazardous operations so the application can recover gracefully from exceptions."
      },
      {
            "title": "throw new Error()",
            "desc": "Raises meaningful error messages when preconditions or validation rules fail."
      },
      {
            "title": "Stack Traces",
            "desc": "Inspect error.message and error.stack to trace the exact file and line number."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Debugging Rule",
      content: "Never silence errors with an empty catch block. Always log or handle the error reason so you can find and fix bugs.",
    },
    cards: [
      {
            "number": "01",
            "tag": "CRASH PREVENTION",
            "title": "try...catch",
            "description": "Wraps hazardous operations so the application can recover gracefully from exceptions.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "EXPLICIT ERRORS",
            "title": "throw new Error()",
            "description": "Raises meaningful error messages when preconditions or validation rules fail.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "INVESTIGATION",
            "title": "Stack Traces",
            "description": "Inspect error.message and error.stack to trace the exact file and line number.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Errors signal unexpected states",
            "content": "When code cannot proceed safely, throwing an error stops faulty execution before data gets corrupted."
      },
      {
            "title": "2. try...catch prevents app crashes",
            "content": "Wrapping risky operations (like parsing JSON or network calls) in try...catch keeps the rest of the application running."
      },
      {
            "title": "3. Read the message and line number",
            "content": "The stack trace tells you precisely which line failed. Inspect the actual values rather than guessing."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Empty catch block silences errors silently:\ntry {\n  doRiskyOperation();\n} catch (e) {\n  // Swallowed! You will never know why it failed!\n}",
      explanation: "Silencing errors without logging hides bugs and makes applications impossible to debug.",
    },
    good: {
      title: "Recommended Approach",
      code: "try {\n  getUserName(null);\n} catch (err) {\n  console.error(\"Failed to load user:\", err.message);\n}",
      explanation: "Catching and logging the error message informs developers and allows recovery.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-17: Errors and Debugging\nfunction parseScore(val) {\n  const num = Number(val);\n  if (isNaN(num)) {\n    throw new Error(\"Invalid score input\");\n  }\n  return num;\n}\n\ntry {\n  console.log(\"Parsed:\", parseScore(\"95\"));\n} catch (err) {\n  console.error(\"Error:\", err.message);\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the purpose of the try...catch block in JavaScript?",
      options: ["To speed up CPU execution","To catch errors thrown during execution and prevent the entire application from crashing","To convert JavaScript code into TypeScript","To prevent variables from being reassigned"],
      correctIndex: 1,
      explanation: "try...catch intercepts runtime exceptions thrown inside the try block, allowing the application to handle them gracefully in catch.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Graceful Recovery",
            "desc": "try...catch keeps applications functional despite errors."
      },
      {
            "title": "Meaningful Messages",
            "desc": "Throw descriptive Error objects to clarify failure conditions."
      },
      {
            "title": "Never Swallow",
            "desc": "Always log or inspect caught errors rather than ignoring them."
      }
],
    nextLessonPreview: {
      title: "Promises and async/await",
      desc: "Discover how JavaScript handles asynchronous operations and network calls.",
    },
  },
};
