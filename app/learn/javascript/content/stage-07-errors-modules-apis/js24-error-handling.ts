import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js24ErrorHandlingContent: StandardLessonContent = {
  slug: "js24-error-handling",
  code: "JS-24",
  title: "Handling Errors with try and catch",
  subtitle: "Prevent crashes using try/catch/finally, throw custom errors, and inspect error messages.",
  sections: [
    {
      id: "part1",
      label: "try and catch Errors",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "try, catch & finally",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Throwing Custom Errors",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Empty Catch Blocks",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Handling Errors with try and catch",
    bigPicture: "Unhandled errors stop execution immediately. Use `try...catch` to handle exceptions gracefully, and `finally` to run mandatory cleanup code whether an error occurred or not.",
    breakdownTitle: "The Three Error Blocks",
    breakdownItems: [
      {
        title: "try Block",
        desc: "Contains risky code that might throw an error (like parsing JSON or fetching data)."
      },
      {
        title: "catch Block",
        desc: "Catches any thrown exception so the rest of your application keeps running."
      },
      {
        title: "finally Block",
        desc: "Guaranteed to run after try/catch completes, ideal for cleanup like hiding loading spinners."
      }
    ]
  },
  part2: {
    title: "try, catch, finally, and Error Objects",
    intro: "Step through how JavaScript catches errors and inspects their details.",
    cards: [
      {
        number: "01",
        tag: "Safety Net",
        title: "Basic try / catch",
        description: "Wraps risky code to prevent application crashes.",
        codeSnippet: "try {\n  const data = JSON.parse(\"{ invalid json }\");\n} catch (err) {\n  console.log(\"Handled gracefully:\", err.message);\n}\nconsole.log(\"Program continues running!\");",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Throwing",
        title: "Throwing with 'throw new Error'",
        description: "Trigger your own custom error when validation checks fail.",
        codeSnippet: "function setAge(age) {\n  if (age < 0) {\n    throw new Error(\"Age cannot be negative\");\n  }\n  return age;\n}",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Cleanup",
        title: "The finally Block",
        description: "Executes regardless of whether the try block succeeded or caught an error.",
        codeSnippet: "let isLoading = true;\ntry {\n  // fetch data...\n} finally {\n  isLoading = false; // Guaranteed cleanup!\n  console.log(\"Loading complete:\", isLoading);\n}",
        color: "purple"
      }
    ],
    rule: {
      title: "The Crash Prevention Rule",
      content: "Always wrap external inputs and unpredictable operations (like JSON.parse or network calls) in try...catch."
    }
  },
  part3: {
    title: "Throwing Custom Errors and Validation",
    intro: "Enforce business rules and inspect error details.",
    points: [
      {
        title: "1. The Error Object Properties",
        content: "Error objects come with built-in properties: error.message explains what happened, and error.name tells the category (e.g. TypeError, SyntaxError).",
        codeSnippet: "try {\n  throw new TypeError(\"Expected an array\");\n} catch (err) {\n  console.log(err.name);    // Output: TypeError\n  console.log(err.message); // Output: Expected an array\n}"
      },
      {
        title: "2. Validating User Inputs",
        content: "Throwing errors lets you reject bad inputs early before they corrupt database records.",
        codeSnippet: "function registerEmail(email) {\n  if (!email.includes(\"@\")) {\n    throw new Error(\"Invalid email format\");\n  }\n  return \"Registered: \" + email;\n}"
      },
      {
        title: "3. Re-throwing Unknown Errors",
        content: "If catch receives an unexpected error that it cannot handle, it can re-throw it up to a higher handler.",
        codeSnippet: "try {\n  processPayment();\n} catch (err) {\n  if (err.message.includes(\"Network\")) {\n    console.log(\"Retrying network request...\");\n  } else {\n    throw err; // Re-throw unknown error\n  }\n}"
      }
    ]
  },
  part4: {
    title: "Common Trap: Silent Failures with Empty Catch Blocks",
    bad: {
      title: "❌ Swallowing Errors Silently",
      code: "try {\n  loadUserDashboard();\n} catch (err) {\n  // BUG: Empty catch block!\n  // The error vanished with zero logs, leaving you with a blank screen!\n}",
      explanation: "Leaving catch blocks empty hides bugs completely. The application breaks silently, and developers have no clue what went wrong."
    },
    good: {
      title: "✅ Log or Handle the Error",
      code: "try {\n  loadUserDashboard();\n} catch (err) {\n  console.error(\"Failed to load user dashboard:\", err.message);\n  showFallbackErrorScreen();\n}",
      explanation: "Always log the error message or display fallback UI to the user so problems can be identified and fixed."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test error handling by parsing corrupt JSON and using a custom input validator.",
    starterCode: "// 1. Catching a JSON parsing error:\nfunction parseSafe(jsonString) {\n  try {\n    const parsed = JSON.parse(jsonString);\n    console.log(\"Successfully parsed data:\", parsed);\n    return parsed;\n  } catch (error) {\n    console.log(\"Caught parsing error:\", error.message);\n    return null;\n  } finally {\n    console.log(\"Validation check completed.\");\n  }\n}\n\n// Test with malformed JSON:\nparseSafe(\"{ badJsonString }\");\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "try / catch Prevents Crashes",
        desc: "Catch runtime exceptions to keep your application running smoothly."
      },
      {
        title: "finally Always Runs",
        desc: "Use finally for mandatory cleanup operations like resetting loading spinners."
      },
      {
        title: "Never Leave catch Empty",
        desc: "Always log error.message or display a user-friendly fallback state."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which block in a try...catch...finally statement is guaranteed to execute regardless of whether an error occurred or was caught?",
      options: [
        "finally",
        "catch",
        "try",
        "throw"
      ],
      correctIndex: 0,
      explanation: "The 'finally' block is guaranteed to execute 100% of the time, whether the try block completed cleanly or the catch block handled an error."
    }
  }
};
