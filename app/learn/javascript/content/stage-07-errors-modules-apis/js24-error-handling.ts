import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js24ErrorHandlingContent: StandardLessonContent = {
  slug: "js24-error-handling",
  code: "JS-24",
  title: "Handling Errors with try and catch",
  subtitle: "Intercept runtime exceptions gracefully with try/catch, run cleanup with finally, and throw descriptive Error objects.",
  sections: [
    {
      id: "part1",
      label: "Handling Errors",
      icon: "🛡️",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "try / catch Syntax",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Throwing Errors",
      icon: "⚠️",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "Silent Failure Bug",
      icon: "🕳️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Errors Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Intercepting Runtime Exceptions",
    bigPicture: "Uncaught errors crash JavaScript programs immediately. The try/catch statement allows your code to anticipate failures and recover gracefully without terminating execution.",
    analogy: "Like a safety net beneath an acrobat: if the acrobat slips (an error is thrown), the net catches them safely, allowing the show to continue.",
    diagram: "+-------------------------------------------+\n| try {                                     |\n|   riskyOperation(); // May throw an error |\n| } catch (err) {                           |\n|   handleError(err); // Safe recovery      |\n| } finally {                               |\n|   cleanup();        // Always runs        |\n+-------------------------------------------+",
    breakdownTitle: "Error Handling Components",
    breakdownItems: [
      {
        title: "try Block",
        desc: "Contains the statements that might throw an exception during execution."
      },
      {
        title: "catch (error) Block",
        desc: "Executes only if an error is thrown in the try block, receiving the Error object."
      },
      {
        title: "finally Block",
        desc: "Always executes after try and catch have completed, ideal for closing connections and cleaning up."
      }
    ]
  },
  part2: {
    title: "try, catch, and finally Syntax",
    intro: "The fundamental blocks for graceful exception management.",
    cards: [
      {
        number: "01",
        tag: "Safety",
        title: "try / catch Statement",
        description: "Catches runtime exceptions and prevents the script from crashing.",
        codeSnippet: "try {\n  const parsed = JSON.parse(\"{ invalid-json }\");\n} catch (err) {\n  console.log(\"Caught error:\", err.message);\n}\n// Output: Caught error: Expected property name or '}'...",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Throw",
        title: "throw new Error()",
        description: "Generate explicit error exceptions with descriptive messages.",
        codeSnippet: "function setAge(age) {\n  if (age < 0) throw new Error(\"Age cannot be negative\");\n  return age;\n}\n// setAge(-5); // Throws Error: Age cannot be negative",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Cleanup",
        title: "finally Block",
        description: "Guaranteed to run whether an error was thrown or not.",
        codeSnippet: "let loading = true;\ntry {\n  // fetch data\n} finally {\n  loading = false; // Guaranteed cleanup!\n}\nconsole.log(\"Loading complete:\", loading); // Output: false",
        color: "purple"
      }
    ],
    rule: {
      title: "Error Object Rule",
      content: "Always throw Error objects (throw new Error('msg')) rather than plain strings or numbers, so the runtime captures a complete stack trace."
    }
  },
  part3: {
    title: "Inspecting Error Objects",
    intro: "Properties available on standard Error instances.",
    points: [
      {
        title: "1. error.name and error.message",
        content: "Error objects contain the error type name (e.g. TypeError, ReferenceError) and a descriptive message.",
        codeSnippet: "try {\n  null.f();\n} catch (err) {\n  console.log(err.name);    // Output: TypeError\n  console.log(err.message); // Output: Cannot read properties of null\n}"
      },
      {
        title: "2. Re-throwing Errors",
        content: "If a catch block encounters an unexpected error it cannot handle, re-throw it so callers know.",
        codeSnippet: "try {\n  riskyWork();\n} catch (err) {\n  if (err instanceof TypeError) {\n    // Handle type error locally\n  } else {\n    throw err; // Re-throw unknown errors\n  }\n}"
      },
      {
        title: "3. Async Error Handling",
        content: "Wrap awaited asynchronous calls in try/catch to intercept rejected promises cleanly.",
        codeSnippet: "async function loadData() {\n  try {\n    const res = await Promise.reject(new Error(\"Timeout\"));\n  } catch (err) {\n    console.log(\"Async error:\", err.message);\n  }\n}\nloadData(); // Output: Async error: Timeout"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Empty Catch Blocks (Silent Swallowing)",
    bad: {
      title: "❌ Swallowing Errors Silently with an Empty Catch",
      code: "try {\n  const config = JSON.parse(rawServerData);\n} catch (err) {\n  // Bug: Empty catch block hides errors completely!\n  // System fails later without any error logs to diagnose\n}",
      explanation: "Empty catch blocks hide critical errors, making debugging impossible when data corruption occurs."
    },
    good: {
      title: "✅ Log or Handle the Error Explicitly",
      code: "try {\n  const config = JSON.parse(rawServerData);\n} catch (err) {\n  console.error(\"[Config Parse Failed]:\", err.message);\n  // Safe fallback default:\n  config = { env: \"production\" };\n}",
      explanation: "Always log the error message or assign a safe fallback value so system state remains healthy."
    }
  },
  part5: {
    title: "Error Handling Sandbox",
    intro: "Practice validating arguments and throwing custom errors with try/catch.",
    starterCode: "function transferMoney(sender, recipient, amount) {\n  if (!sender || !recipient) {\n    throw new Error(\"Both sender and recipient are required\");\n  }\n  if (amount <= 0) {\n    throw new Error(\"Transfer amount must be greater than 0\");\n  }\n  return `Transferred $${amount} from ${sender} to ${recipient}`;\n}\n\ntry {\n  console.log(transferMoney(\"Alice\", \"Bob\", 50));\n  console.log(transferMoney(\"Alice\", \"Bob\", -10)); // Will throw\n} catch (err) {\n  console.error(\"Transaction rejected:\", err.message);\n} finally {\n  console.log(\"Audit log updated.\");\n}\n"
  },
  part6: {
    title: "Key Takeaways: Error Handling",
    takeaways: [
      {
        title: "Prevent Fatal Crashes",
        desc: "try/catch intercepts runtime exceptions without halting program execution."
      },
      {
        title: "Always Throw Error Instances",
        desc: "Use throw new Error() so stack traces and error metadata are properly preserved."
      },
      {
        title: "finally Guarantees Cleanup",
        desc: "Use finally to close resources, reset spinners, or release locks."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which block in a try/catch/finally statement is guaranteed to run regardless of whether an error occurred?",
      options: [
        "The catch block",
        "The finally block",
        "The try block",
        "None of them"
      ],
      correctIndex: 1,
      explanation: "The finally block always executes after try and catch have finished, making it the ideal location for cleanup code like closing connections and resetting loading states."
    }
  }
};
